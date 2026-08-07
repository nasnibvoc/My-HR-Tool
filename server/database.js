const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/myhrtool';

const pool = new Pool({
    connectionString: connectionString,
});

const initializeDB = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL database.');
        
        // 1. Employees Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS employees (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE,
                phone VARCHAR(50),
                department VARCHAR(100),
                role VARCHAR(100),
                status VARCHAR(50) DEFAULT 'Active',
                "joinDate" VARCHAR(50),
                avatar TEXT,
                "employmentType" VARCHAR(50),
                location VARCHAR(100),
                "managerId" INTEGER,
                data JSONB
            )
        `);

        // 2. Attendance Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS attendance (
                id SERIAL PRIMARY KEY,
                "empId" INTEGER,
                name VARCHAR(255),
                avatar TEXT,
                "clockIn" VARCHAR(50),
                "clockOut" VARCHAR(50),
                hours VARCHAR(50),
                "breakTime" VARCHAR(50),
                status VARCHAR(50),
                source VARCHAR(100),
                location VARCHAR(255),
                date VARCHAR(50)
            )
        `);

        // 3. Leave Requests Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS leave_requests (
                id SERIAL PRIMARY KEY,
                "empId" INTEGER,
                name VARCHAR(255),
                type VARCHAR(100),
                dates VARCHAR(100),
                days INTEGER,
                status VARCHAR(50),
                "managerApproval" VARCHAR(50),
                "hrApproval" VARCHAR(50)
            )
        `);

        // 4. Correction Requests Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS correction_requests (
                id SERIAL PRIMARY KEY,
                "empId" INTEGER,
                name VARCHAR(255),
                reason TEXT,
                status VARCHAR(50)
            )
        `);

        // 5. Holidays Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS holidays (
                id SERIAL PRIMARY KEY,
                date VARCHAR(50),
                name VARCHAR(255)
            )
        `);

        // 6. Payroll Records Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS payroll_records (
                id SERIAL PRIMARY KEY,
                "empId" INTEGER,
                "empName" VARCHAR(255),
                period VARCHAR(100),
                "netPay" NUMERIC,
                status VARCHAR(50)
            )
        `);

        // 7. Jobs Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS jobs (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255),
                department VARCHAR(100),
                status VARCHAR(50)
            )
        `);

        // 8. Candidates Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS candidates (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255),
                phone VARCHAR(50),
                "jobId" INTEGER,
                status VARCHAR(50),
                notes JSONB
            )
        `);

        // 9. Performance Reviews Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS performance_reviews (
                id SERIAL PRIMARY KEY,
                "empId" INTEGER,
                cycle VARCHAR(100),
                status VARCHAR(50),
                rating INTEGER
            )
        `);

        // Seed default employees if table is empty
        const empCountResult = await client.query('SELECT count(*) as count FROM employees');
        if (parseInt(empCountResult.rows[0].count) === 0) {
            const insertEmp = `
                INSERT INTO employees (name, email, phone, department, role, status, "joinDate", avatar, "employmentType", location, data) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            `;
            
            const defaultData1 = JSON.stringify({
                tags: ['High Performer', 'First Aid'],
                leaves: { total: 24, used: 4, accrualRate: 2 },
                salaryStructure: { basic: 80000, allowances: 15000, hourlyRate: 800 },
                statutory: { pan: '', uan: '', pfEnabled: true, esiEnabled: false, bankAccount: '', ifsc: '', ptEnabled: true, tdsPercentage: 10, taxRegime: 'New Regime' },
                onboarding: { status: 'Completed', progress: 100, checklist: [], assets: [{name: 'MacBook Pro', serial: 'MBP-001'}] },
                timeline: [{date: '2023-01-15', event: 'Joined as Senior Engineer'}, {date: '2024-05-10', event: 'Promoted to Lead Engineer'}],
                activityHistory: [{date: '2024-10-20', action: 'Updated profile picture'}],
                goals: []
            });
            
            const defaultData2 = JSON.stringify({
                tags: ['Product'],
                leaves: { total: 24, used: 12, accrualRate: 2 },
                salaryStructure: { basic: 70000, allowances: 10000, hourlyRate: 700 },
                statutory: { pan: '', uan: '', pfEnabled: true, esiEnabled: false, bankAccount: '', ifsc: '', ptEnabled: true, tdsPercentage: 10, taxRegime: 'New Regime' },
                onboarding: { status: 'Completed', progress: 100, checklist: [], assets: [] },
                timeline: [{date: '2022-11-01', event: 'Joined as Product Manager'}],
                activityHistory: [],
                goals: []
            });

            await client.query(insertEmp, ['Sarah Connor', 'sarah@myhrtool.com', '+1 555-0101', 'Engineering', 'Lead Engineer', 'Active', '2023-01-15', 'https://i.pravatar.cc/150?u=1', 'Full-Time', 'San Francisco, CA', defaultData1]);
            await client.query(insertEmp, ['John Smith', 'john@myhrtool.com', '+1 555-0201', 'Product', 'Product Manager', 'Active', '2022-11-01', 'https://i.pravatar.cc/150?u=2', 'Full-Time', 'New York, NY', defaultData2]);
            
            console.log('Seeded database with initial employees.');
        }

        // Seed default holidays if empty
        const holidayCountResult = await client.query('SELECT count(*) as count FROM holidays');
        if (parseInt(holidayCountResult.rows[0].count) === 0) {
            await client.query("INSERT INTO holidays (date, name) VALUES ('Nov 28', 'Thanksgiving')");
            await client.query("INSERT INTO holidays (date, name) VALUES ('Dec 25', 'Christmas Day')");
            await client.query("INSERT INTO holidays (date, name) VALUES ('Jan 01', 'New Year''s Day')");
            console.log('Seeded database with default holidays.');
        }

        client.release();
    } catch (err) {
        console.error('\n======================================================');
        console.error('DATABASE CONNECTION ERROR:');
        console.error('Failed to initialize PostgreSQL database.');
        console.error('Please ensure the PostgreSQL server is running locally on port 5432,');
        console.error('or set the DATABASE_URL environment variable to a cloud Postgres instance.');
        console.error('Error Details:', err.message);
        console.error('======================================================\n');
    }
};

initializeDB();

module.exports = pool;
