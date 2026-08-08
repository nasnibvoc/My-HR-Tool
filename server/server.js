const express = require('express');
const cors = require('cors');
const pool = require('./database');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Helper to check DB health
app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'healthy', database: 'PostgreSQL connected' });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

// GET entire DB state
app.get('/api/db', async (req, res) => {
    try {
        // Query all tables
        const employeesRes = await pool.query('SELECT * FROM employees ORDER BY id ASC');
        const attendanceRes = await pool.query('SELECT * FROM attendance ORDER BY id DESC');
        const leaveRequestsRes = await pool.query('SELECT * FROM leave_requests ORDER BY id DESC');
        const correctionRequestsRes = await pool.query('SELECT * FROM correction_requests ORDER BY id DESC');
        const holidaysRes = await pool.query('SELECT * FROM holidays ORDER BY id ASC');
        const payrollRecordsRes = await pool.query('SELECT * FROM payroll_records ORDER BY id DESC');
        const jobsRes = await pool.query('SELECT * FROM jobs ORDER BY id ASC');
        const candidatesRes = await pool.query('SELECT * FROM candidates ORDER BY id DESC');
        const performanceReviewsRes = await pool.query('SELECT * FROM performance_reviews ORDER BY id DESC');
        
        // Parse database tables into the client state format
        const employees = employeesRes.rows.map(row => {
            const extraData = row.data ? row.data : {};
            return { ...row, ...extraData, data: undefined };
        });

        // Format dates & structures for client
        const leaveRequests = leaveRequestsRes.rows.map(r => ({
            id: r.id,
            empId: r.empId,
            name: r.name,
            type: r.type,
            dates: r.dates,
            days: r.days,
            status: r.status,
            managerApproval: r.managerApproval,
            hrApproval: r.hrApproval
        }));

        const attendance = attendanceRes.rows.map(a => ({
            empId: a.empId,
            name: a.name,
            avatar: a.avatar,
            clockIn: a.clockIn,
            clockOut: a.clockOut,
            hours: a.hours,
            breakTime: a.breakTime,
            status: a.status,
            source: a.source,
            location: a.location,
            date: a.date
        }));

        const correctionRequests = correctionRequestsRes.rows.map(c => ({
            id: c.id,
            empId: c.empId,
            name: c.name,
            reason: c.reason,
            status: c.status
        }));

        const holidays = holidaysRes.rows.map(h => ({
            date: h.date,
            name: h.name
        }));

        const payrollRecords = payrollRecordsRes.rows.map(p => ({
            id: p.id,
            empId: p.empId,
            empName: p.empName,
            period: p.period,
            netPay: Number(p.netPay),
            status: p.status
        }));

        const jobs = jobsRes.rows.map(j => ({
            id: j.id,
            title: j.title,
            department: j.department,
            status: j.status
        }));

        const candidates = candidatesRes.rows.map(c => ({
            id: c.id,
            name: c.name,
            email: c.email,
            phone: c.phone,
            jobId: c.jobId,
            status: c.status,
            notes: c.notes || []
        }));

        const performanceReviews = performanceReviewsRes.rows.map(p => ({
            id: p.id,
            empId: p.empId,
            cycle: p.cycle,
            status: p.status,
            rating: p.rating
        }));

        // Default structures for metadata/organization if not customized in DB
        const settings = {
            roles: ['Admin', 'HR Manager', 'Manager', 'Employee'],
            modules: ['CRM', 'POS', 'Inventory', 'Payroll'],
            leaveTypes: ['Annual Leave', 'Sick Leave', 'Casual Leave', 'Maternity/Paternity', 'Unpaid Leave']
        };

        const organization = {
            departments: ['Engineering', 'Product', 'HR', 'Marketing', 'Design', 'Sales'],
            designations: ['CEO', 'HR Director', 'Lead Engineer', 'Software Engineer', 'Product Manager', 'Designer', 'Marketing Lead', 'Sales Executive'],
            locations: ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Chicago, IL', 'London, UK'],
            teams: [
                { id: 1, name: 'Core Platform', leadId: 1, members: [1, 4] },
                { id: 2, name: 'Growth', leadId: 2, members: [2, 5] }
            ]
        };

        res.json({
            settings,
            organization,
            employees,
            leaveRequests,
            attendance,
            correctionRequests,
            holidays,
            payrollRecords,
            jobs,
            candidates,
            performanceReviews
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SYNC entire DB state
app.post('/api/db/sync', async (req, res) => {
    const { employees, leaveRequests, attendance, correctionRequests, holidays, payrollRecords, jobs, candidates, performanceReviews } = req.body;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Sync Employees
        if (employees) {
            // Delete existing that aren't in incoming
            const incomingIds = employees.map(e => e.id).filter(id => typeof id === 'number');
            if (incomingIds.length > 0) {
                await client.query('DELETE FROM employees WHERE id NOT IN (' + incomingIds.join(',') + ')');
            } else {
                await client.query('DELETE FROM employees');
            }

            for (const emp of employees) {
                const { id, name, email, phone, department, role, status, joinDate, avatar, employmentType, location, managerId, ...extraData } = emp;
                
                // If it's a temp client-side ID or missing, let DB assign or use provided id
                const hasRealId = typeof id === 'number' && id < 1e11;
                
                if (hasRealId) {
                    const check = await client.query('SELECT id FROM employees WHERE id = $1', [id]);
                    if (check.rows.length > 0) {
                        await client.query(
                            'UPDATE employees SET name=$1, email=$2, phone=$3, department=$4, role=$5, status=$6, "joinDate"=$7, avatar=$8, "employmentType"=$9, location=$10, "managerId"=$11, data=$12 WHERE id=$13',
                            [name, email, phone, department, role, status, joinDate, avatar, employmentType, location, managerId, extraData, id]
                        );
                    } else {
                        await client.query(
                            'INSERT INTO employees (id, name, email, phone, department, role, status, "joinDate", avatar, "employmentType", location, "managerId", data) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
                            [id, name, email, phone, department, role, status, joinDate, avatar, employmentType, location, managerId, extraData]
                        );
                    }
                } else {
                    await client.query(
                        'INSERT INTO employees (name, email, phone, department, role, status, "joinDate", avatar, "employmentType", location, "managerId", data) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
                        [name, email, phone, department, role, status, joinDate, avatar, employmentType, location, managerId, extraData]
                    );
                }
            }
        }

        // Sync Attendance
        if (attendance) {
            await client.query('DELETE FROM attendance');
            for (const a of attendance) {
                await client.query(
                    'INSERT INTO attendance ("empId", name, avatar, "clockIn", "clockOut", hours, "breakTime", status, source, location, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
                    [a.empId, a.name, a.avatar, a.clockIn, a.clockOut, a.hours, a.breakTime, a.status, a.source, a.location, a.date]
                );
            }
        }

        // Sync Leave Requests
        if (leaveRequests) {
            await client.query('DELETE FROM leave_requests');
            for (const l of leaveRequests) {
                await client.query(
                    'INSERT INTO leave_requests (id, "empId", name, type, dates, days, status, "managerApproval", "hrApproval") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                    [l.id, l.empId, l.name, l.type, l.dates, l.days, l.status, l.managerApproval, l.hrApproval]
                );
            }
        }

        // Sync Correction Requests
        if (correctionRequests) {
            await client.query('DELETE FROM correction_requests');
            for (const c of correctionRequests) {
                await client.query(
                    'INSERT INTO correction_requests (id, "empId", name, reason, status) VALUES ($1, $2, $3, $4, $5)',
                    [c.id, c.empId, c.name, c.reason, c.status]
                );
            }
        }

        // Sync Holidays
        if (holidays) {
            await client.query('DELETE FROM holidays');
            for (const h of holidays) {
                await client.query(
                    'INSERT INTO holidays (date, name) VALUES ($1, $2)',
                    [h.date, h.name]
                );
            }
        }

        // Sync Payroll
        if (payrollRecords) {
            await client.query('DELETE FROM payroll_records');
            for (const p of payrollRecords) {
                await client.query(
                    'INSERT INTO payroll_records (id, "empId", "empName", period, "netPay", status) VALUES ($1, $2, $3, $4, $5, $6)',
                    [p.id, p.empId, p.empName, p.period, p.netPay, p.status]
                );
            }
        }

        // Sync Jobs
        if (jobs) {
            await client.query('DELETE FROM jobs');
            for (const j of jobs) {
                await client.query(
                    'INSERT INTO jobs (id, title, department, status) VALUES ($1, $2, $3, $4)',
                    [j.id, j.title, j.department, j.status]
                );
            }
        }

        // Sync Candidates
        if (candidates) {
            await client.query('DELETE FROM candidates');
            for (const c of candidates) {
                await client.query(
                    'INSERT INTO candidates (id, name, email, phone, "jobId", status, notes) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                    [c.id, c.name, c.email, c.phone, c.jobId, c.status, JSON.stringify(c.notes)]
                );
            }
        }

        // Sync Performance
        if (performanceReviews) {
            await client.query('DELETE FROM performance_reviews');
            for (const p of performanceReviews) {
                await client.query(
                    'INSERT INTO performance_reviews (id, "empId", cycle, status, rating) VALUES ($1, $2, $3, $4, $5)',
                    [p.id, p.empId, p.cycle, p.status, p.rating]
                );
            }
        }

        await client.query('COMMIT');
        res.json({ success: true, message: 'Database state synchronized successfully' });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
});

const path = require('path');
// Serve static files from the parent directory (root directory of project)
app.use(express.static(path.join(__dirname, '..')));

// Fallback to index.html for frontend requests
app.get('/*', (req, res, next) => {
    // Avoid intercepting API routes
    if (req.path.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(port, () => {
    console.log(`MyHRTool Backend API running on http://localhost:${port}`);
});

