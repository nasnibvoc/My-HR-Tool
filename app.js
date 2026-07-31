// --- Mock Database (Simulated API Optimization) ---
const defaultDB = {
    employees: [
        { id: 1, name: 'Sarah Connor', role: 'Lead Engineer', department: 'Engineering', email: 'sarah@myhrtool.com', status: 'Active', joinDate: '2023-01-15', avatar: 'https://i.pravatar.cc/150?u=1', leaves: { total: 24, used: 4 }, notes: 'Excellent leadership skills. Leading the Q4 refactor.', timeline: [{date: '2023-01-15', event: 'Joined as Senior Engineer'}, {date: '2024-05-10', event: 'Promoted to Lead Engineer'}] },
        { id: 2, name: 'John Smith', role: 'Product Manager', department: 'Product', email: 'john@myhrtool.com', status: 'On Leave', joinDate: '2022-11-01', avatar: 'https://i.pravatar.cc/150?u=2', leaves: { total: 24, used: 12 }, notes: 'Needs to finalize the roadmap for next year.', timeline: [{date: '2022-11-01', event: 'Joined as Product Manager'}] },
        { id: 3, name: 'Emily Chen', role: 'HR Director', department: 'HR', email: 'emily@myhrtool.com', status: 'Active', joinDate: '2021-05-20', avatar: 'https://i.pravatar.cc/150?u=3', leaves: { total: 24, used: 2 }, notes: 'Reviewing Q3 performance bonuses.', timeline: [{date: '2021-05-20', event: 'Joined as HR Manager'}, {date: '2023-01-01', event: 'Promoted to HR Director'}] },
        { id: 4, name: 'Michael Ross', role: 'Designer', department: 'Design', email: 'michael@myhrtool.com', status: 'Active', joinDate: '2024-02-10', avatar: 'https://i.pravatar.cc/150?u=4', leaves: { total: 24, used: 0 }, notes: 'Working on the new design system components.', timeline: [{date: '2024-02-10', event: 'Joined as UI/UX Designer'}] },
        { id: 5, name: 'David Kim', role: 'Marketing Lead', department: 'Marketing', email: 'david@myhrtool.com', status: 'Active', joinDate: '2023-08-05', avatar: 'https://i.pravatar.cc/150?u=5', leaves: { total: 24, used: 5 }, notes: 'Campaign launched successfully.', timeline: [{date: '2023-08-05', event: 'Joined as Marketing Lead'}] }
    ],
    leaveRequests: [
        { id: 101, empId: 2, name: 'John Smith', type: 'Annual Leave', dates: 'Oct 25 - Oct 28', days: 4, status: 'Approved' },
        { id: 102, empId: 1, name: 'Sarah Connor', type: 'Sick Leave', dates: 'Oct 29 - Oct 30', days: 2, status: 'Pending' },
        { id: 103, empId: 4, name: 'Michael Ross', type: 'Personal', dates: 'Nov 01 - Nov 01', days: 1, status: 'Pending' }
    ],
    attendance: [],
    holidays: [
        { date: 'Nov 28', name: 'Thanksgiving' },
        { date: 'Dec 25', name: 'Christmas Day' },
        { date: 'Jan 01', name: 'New Year\'s Day' }
    ]
};

let DB = localStorage.getItem('MyHRTool_DB') ? JSON.parse(localStorage.getItem('MyHRTool_DB')) : defaultDB;
window.saveDB = function() {
    localStorage.setItem('MyHRTool_DB', JSON.stringify(DB));
};

if (!localStorage.getItem('MyHRTool_DB')) {
    // Generate Mock Attendance Logs (Late logic implemented)
    DB.employees.forEach(emp => {
        let clockInHour = 8 + Math.floor(Math.random() * 2);
        let clockInMin = Math.floor(Math.random() * 60);
        let isLate = clockInHour === 9 && clockInMin > 15;
        let clockOutHour = 17 + Math.floor(Math.random() * 2);
        let status = isLate ? 'Late Arrival' : 'Present';
        if (emp.status === 'On Leave') status = 'Absent';
        
        DB.attendance.push({
            empId: emp.id,
            name: emp.name,
            avatar: emp.avatar,
            clockIn: status === 'Absent' ? '--:--' : `0${clockInHour}:${clockInMin.toString().padStart(2, '0')} AM`,
            clockOut: status === 'Absent' ? '--:--' : `0${clockOutHour - 12}:30 PM`,
            hours: status === 'Absent' ? '0h' : '8h 30m',
            status: status
        });
    });
    saveDB();
}

// --- State & Router ---
let currentView = 'dashboard';
let currentEmpTab = 'directory';
let chartInstances = {};

const views = {
    // 1. DASHBOARD
    dashboard: () => {
        let pendingLeaves = DB.leaveRequests.filter(r => r.status === 'Pending').length;
        let activeEmps = DB.employees.filter(e => e.status === 'Active').length;
        
        return `
            <div class="page-header fade-in">
                <div>
                    <h1 class="page-title">Dashboard</h1>
                    <p class="page-subtitle">Welcome back! Here's what's happening today.</p>
                </div>
                <div class="header-actions">
                    <button class="primary-btn" onclick="exportData('dashboard')"><i class="fa-solid fa-download"></i> Export Overview</button>
                </div>
            </div>
            
            <div class="grid-4 fade-in" style="animation-delay: 0.1s; margin-bottom: 24px;">
                <div class="card stat-card" style="padding: 20px;">
                    <div class="stat-icon purple" style="width: 48px; height: 48px;"><i class="fa-solid fa-users"></i></div>
                    <div class="stat-info"><h3>Total Employees</h3><p>${DB.employees.length}</p></div>
                </div>
                <div class="card stat-card" style="padding: 20px;">
                    <div class="stat-icon green" style="width: 48px; height: 48px;"><i class="fa-solid fa-user-check"></i></div>
                    <div class="stat-info"><h3>Active Today</h3><p>${activeEmps}</p></div>
                </div>
                <div class="card stat-card" style="padding: 20px;">
                    <div class="stat-icon orange" style="width: 48px; height: 48px;"><i class="fa-solid fa-clock-rotate-left"></i></div>
                    <div class="stat-info"><h3>Pending Leaves</h3><p>${pendingLeaves}</p></div>
                </div>
                <div class="card stat-card" style="padding: 20px;">
                    <div class="stat-icon blue" style="width: 48px; height: 48px;"><i class="fa-solid fa-calendar-day"></i></div>
                    <div class="stat-info"><h3>Next Holiday</h3><p>${DB.holidays[0].date}</p></div>
                </div>
            </div>
            
            <div class="grid-3 fade-in" style="animation-delay: 0.2s;">
                <div class="card col-span-2">
                    <h3 style="margin-bottom: 20px; font-size: 16px;">Department Statistics</h3>
                    <div style="height: 300px; position: relative;">
                        <canvas id="deptChart"></canvas>
                    </div>
                </div>
                <div class="card">
                    <h3 style="margin-bottom: 20px; font-size: 16px;"><i class="fa-solid fa-cake-candles" style="color: var(--warning); margin-right: 8px;"></i> Celebrations</h3>
                    <div class="timeline">
                        <div class="timeline-item">
                            <h4 style="font-size: 14px;">Sarah Connor</h4>
                            <p style="font-size: 12px; color: var(--text-muted);">Work Anniversary (3 Years) • Tomorrow</p>
                        </div>
                        <div class="timeline-item">
                            <h4 style="font-size: 14px;">Michael Ross</h4>
                            <p style="font-size: 12px; color: var(--text-muted);">Birthday • Next Week</p>
                        </div>
                    </div>
                    
                    <h3 style="margin-top: 30px; margin-bottom: 20px; font-size: 16px;"><i class="fa-solid fa-umbrella-beach" style="color: var(--secondary); margin-right: 8px;"></i> Upcoming Holidays</h3>
                    <ul style="display: flex; flex-direction: column; gap: 12px;">
                        ${DB.holidays.map(h => `
                            <li style="display: flex; justify-content: space-between; font-size: 14px; padding-bottom: 8px; border-bottom: 1px solid var(--border-color);">
                                <span>${h.name}</span><span style="color: var(--text-muted);">${h.date}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    },

    // 2. EMPLOYEES
    employees: () => {
        let html = `
            <div class="page-header fade-in">
                <div>
                    <h1 class="page-title">Employee Directory</h1>
                    <p class="page-subtitle">Profiles, timelines, and organizational hierarchy.</p>
                </div>
                <div class="header-actions">
                    <button class="btn btn-secondary" onclick="exportData('employees')"><i class="fa-solid fa-download"></i> Export Data</button>
                    <button class="primary-btn" onclick="showAddEmployeeModal()"><i class="fa-solid fa-user-plus"></i> Add Employee</button>
                </div>
            </div>
            
            <div class="tabs-container fade-in" style="animation-delay: 0.1s;">
                <div class="tab ${currentEmpTab === 'directory' ? 'active' : ''}" onclick="switchEmpTab('directory')">Directory Grid</div>
                <div class="tab ${currentEmpTab === 'list' ? 'active' : ''}" onclick="switchEmpTab('list')">List View</div>
                <div class="tab ${currentEmpTab === 'hierarchy' ? 'active' : ''}" onclick="switchEmpTab('hierarchy')">Reporting Hierarchy</div>
            </div>
            
            <div style="margin-bottom: 24px; display: flex; gap: 16px;" class="fade-in" style="animation-delay: 0.2s;">
                <div class="search-bar" style="width: 300px; background: var(--bg-panel);">
                    <i class="fa-solid fa-search"></i>
                    <input type="text" id="empSearch" placeholder="Search employees..." onkeyup="filterEmployees()">
                </div>
                <select id="deptFilter" class="form-control" style="width: 200px;" onchange="filterEmployees()">
                    <option value="all">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="HR">HR</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                </select>
            </div>
        `;

        if (currentEmpTab === 'directory') {
            html += `<div class="grid-4 fade-in" id="empGridContainer" style="animation-delay: 0.3s;">`;
            DB.employees.forEach(e => {
                html += `
                <div class="card emp-card" data-dept="${e.department}" data-name="${e.name.toLowerCase()}" style="text-align: center; padding: 32px 20px; cursor: pointer;" onclick="viewEmployeeProfile(${e.id})">
                    <img src="${e.avatar}" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid var(--primary); margin-bottom: 16px; box-shadow: 0 10px 20px rgba(0,0,0,0.3);">
                    <h3 style="font-size: 18px; margin-bottom: 4px;">${e.name}</h3>
                    <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 12px;">${e.role}</p>
                    <span class="status-badge ${e.status === 'Active' ? 'active' : 'pending'}">${e.status}</span>
                </div>`;
            });
            html += `</div>`;
        } else if (currentEmpTab === 'list') {
            html += `
            <div class="table-container fade-in" style="animation-delay: 0.3s;">
                <table id="empTable">
                    <thead><tr><th>Employee</th><th>Role</th><th>Department</th><th>Join Date</th><th>Status</th></tr></thead>
                    <tbody>
                        ${DB.employees.map(e => `
                        <tr class="emp-row" data-dept="${e.department}" data-name="${e.name.toLowerCase()}">
                            <td>
                                <div class="user-cell" style="cursor:pointer;" onclick="viewEmployeeProfile(${e.id})">
                                    <img src="${e.avatar}"><div class="user-cell-info"><span class="user-cell-name">${e.name}</span><span class="user-cell-email">${e.email}</span></div>
                                </div>
                            </td>
                            <td>${e.role}</td><td>${e.department}</td><td>${e.joinDate}</td>
                            <td><span class="status-badge ${e.status === 'Active' ? 'active' : 'pending'}">${e.status}</span></td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>`;
        } else if (currentEmpTab === 'hierarchy') {
            html += `
            <div class="card fade-in hierarchy-container" style="animation-delay: 0.3s;">
                <div class="hierarchy-node">
                    <img src="${DB.employees[2].avatar}">
                    <h4>Emily Chen</h4><p>CEO / HR Director</p>
                </div>
                <div style="height: 40px; width: 2px; background: var(--primary); margin: 0 auto;"></div>
                <div style="display: flex; justify-content: center; position: relative;">
                    <div style="position: absolute; top: 0; left: calc(50% - 150px); right: calc(50% - 150px); height: 2px; background: var(--primary);"></div>
                    <div style="display: flex; gap: 40px; margin-top: 2px;">
                        <div style="position: relative; padding-top: 40px;">
                            <div style="position: absolute; top: 0; left: 50%; width: 2px; height: 40px; background: var(--primary);"></div>
                            <div class="hierarchy-node"><img src="${DB.employees[0].avatar}"><h4>Sarah Connor</h4><p>Lead Engineer</p></div>
                        </div>
                        <div style="position: relative; padding-top: 40px;">
                            <div style="position: absolute; top: 0; left: 50%; width: 2px; height: 40px; background: var(--primary);"></div>
                            <div class="hierarchy-node"><img src="${DB.employees[1].avatar}"><h4>John Smith</h4><p>Product Manager</p></div>
                        </div>
                    </div>
                </div>
            </div>`;
        }
        return html;
    },

    // 3. ATTENDANCE
    attendance: () => {
        return `
            <div class="page-header fade-in">
                <div>
                    <h1 class="page-title">Attendance Tracking</h1>
                    <p class="page-subtitle">Monitor daily logs and monthly trends.</p>
                </div>
                <button class="btn btn-secondary" onclick="exportData('attendance')"><i class="fa-solid fa-download"></i> Export Logs</button>
            </div>
            
            <div class="grid-3 fade-in" style="animation-delay: 0.1s; margin-bottom: 24px;">
                <div class="card col-span-2">
                    <h3 style="margin-bottom: 20px; font-size: 16px;">Attendance Trends (Monthly)</h3>
                    <div style="height: 300px; position: relative;">
                        <canvas id="attChart"></canvas>
                    </div>
                </div>
                <div class="card stat-card" style="flex-direction: column; justify-content: center; text-align: center;">
                    <div class="stat-icon blue" style="width: 80px; height: 80px; font-size: 32px; margin-bottom: 16px;"><i class="fa-solid fa-clock"></i></div>
                    <h3>Average On-Time Rate</h3>
                    <p style="font-size: 48px; font-weight: 700; color: var(--primary);">92%</p>
                    <span class="trend-up"><i class="fa-solid fa-arrow-trend-up"></i> +2.4% this month</span>
                </div>
            </div>

            <div class="card fade-in" style="animation-delay: 0.15s; margin-bottom: 24px;">
                <h3 style="margin-bottom: 20px; font-size: 16px;"><i class="fa-solid fa-calendar-days" style="color: var(--primary); margin-right: 8px;"></i> Attendance Calendar</h3>
                <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; text-align: center;">
                    ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => `<div style="font-weight: 600; color: var(--text-muted); font-size: 13px;">${d}</div>`).join('')}
                    ${Array(31).fill(0).map((_, i) => {
                        let isWeekend = (i + 1) % 7 === 0 || (i + 1) % 7 === 1;
                        let statusCol = Math.random() > 0.1 ? '16, 185, 129' : '239, 68, 68'; // 90% present
                        let bg = isWeekend ? 'rgba(255,255,255,0.02)' : `rgba(${statusCol}, 0.1)`;
                        let border = isWeekend ? 'transparent' : `rgba(${statusCol}, 0.3)`;
                        let textColor = isWeekend ? 'var(--text-muted)' : 'white';
                        return `<div style="padding: 10px; border-radius: 8px; background: ${bg}; border: 1px solid ${border}; color: ${textColor}; font-weight: 500;">${i + 1}</div>`;
                    }).join('')}
                </div>
            </div>

            <div class="table-container fade-in" style="animation-delay: 0.2s;">
                <div class="table-header">
                    <h2 class="table-title">Today's Logs (Oct 27)</h2>
                </div>
                <table>
                    <thead><tr><th>Employee</th><th>Clock In</th><th>Clock Out</th><th>Total Hours</th><th>Status</th></tr></thead>
                    <tbody>
                        ${DB.attendance.map(a => `
                        <tr>
                            <td><div class="user-cell"><img src="${a.avatar}"><span class="user-cell-name">${a.name}</span></div></td>
                            <td><span style="font-family: monospace;">${a.clockIn}</span></td>
                            <td><span style="font-family: monospace;">${a.clockOut}</span></td>
                            <td>${a.hours}</td>
                            <td><span class="status-badge ${a.status === 'Present' ? 'active' : (a.status === 'Absent' ? 'inactive' : 'pending')}">${a.status}</span></td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    // 4. LEAVE
    leave: () => {
        let pending = DB.leaveRequests.filter(r => r.status === 'Pending').length;
        
        return `
            <div class="page-header fade-in">
                <div>
                    <h1 class="page-title">Leave Management</h1>
                    <p class="page-subtitle">Approve requests and view balances.</p>
                </div>
                <button class="primary-btn" onclick="exportData('leave')"><i class="fa-solid fa-download"></i> Export Leave Report</button>
            </div>
            
            <div class="grid-3 fade-in" style="animation-delay: 0.1s; margin-bottom: 24px;">
                <div class="card stat-card">
                    <div class="stat-icon purple"><i class="fa-solid fa-envelope-open-text"></i></div>
                    <div class="stat-info"><h3>Pending Requests</h3><p>${pending}</p></div>
                </div>
                <div class="card stat-card">
                    <div class="stat-icon green"><i class="fa-solid fa-check-double"></i></div>
                    <div class="stat-info"><h3>Approved This Month</h3><p>12</p></div>
                </div>
                <div class="card stat-card">
                    <div class="stat-icon orange"><i class="fa-solid fa-scale-unbalanced"></i></div>
                    <div class="stat-info"><h3>Avg Balance Remaining</h3><p>18 Days</p></div>
                </div>
            </div>
            
            <div class="table-container fade-in" style="animation-delay: 0.2s;">
                <div class="table-header">
                    <h2 class="table-title">Leave Approval Workflow</h2>
                </div>
                <table>
                    <thead><tr><th>Employee</th><th>Leave Type</th><th>Dates</th><th>Days</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        ${DB.leaveRequests.map(l => `
                        <tr>
                            <td><span style="font-weight: 500;">${l.name}</span></td>
                            <td><span style="padding: 4px 10px; background: rgba(255,255,255,0.05); border-radius: 4px; font-size: 12px;">${l.type}</span></td>
                            <td>${l.dates}</td>
                            <td>${l.days}</td>
                            <td><span class="status-badge ${l.status === 'Approved' ? 'active' : (l.status === 'Rejected' ? 'inactive' : 'pending')}">${l.status}</span></td>
                            <td>
                                ${l.status === 'Pending' ? `
                                <button class="action-btn success" onclick="processLeave(${l.id}, 'Approved', ${l.empId}, ${l.days})"><i class="fa-solid fa-check"></i></button>
                                <button class="action-btn danger" onclick="processLeave(${l.id}, 'Rejected', ${l.empId}, ${l.days})"><i class="fa-solid fa-xmark"></i></button>
                                ` : '<span style="color: var(--text-muted); font-size: 12px;">Processed</span>'}
                            </td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    // 5. REPORTS
    reports: () => {
        return `
            <div class="page-header fade-in">
                <div>
                    <h1 class="page-title">HR Reports</h1>
                    <p class="page-subtitle">Advanced analytics and visualizations.</p>
                </div>
            </div>
            
            <div class="grid-3 fade-in" style="animation-delay: 0.1s; margin-bottom: 24px;">
                <div class="card" style="text-align: center;">
                    <i class="fa-solid fa-chart-pie" style="font-size: 48px; color: var(--primary); margin-bottom: 16px;"></i>
                    <h3 style="margin-bottom: 8px;">Employee Demographics</h3>
                    <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">Headcount and department distribution.</p>
                    <button class="btn btn-secondary" onclick="renderReportChart('employee')">Generate Chart</button>
                </div>
                <div class="card" style="text-align: center;">
                    <i class="fa-solid fa-chart-line" style="font-size: 48px; color: var(--secondary); margin-bottom: 16px;"></i>
                    <h3 style="margin-bottom: 8px;">Attendance Trends</h3>
                    <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">Monthly clock-in and overtime data.</p>
                    <button class="btn btn-secondary" onclick="renderReportChart('attendance')">Generate Chart</button>
                </div>
                <div class="card" style="text-align: center;">
                    <i class="fa-solid fa-chart-column" style="font-size: 48px; color: var(--success); margin-bottom: 16px;"></i>
                    <h3 style="margin-bottom: 8px;">Leave Utilization</h3>
                    <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">Historical leave balances and usage.</p>
                    <button class="btn btn-secondary" onclick="renderReportChart('leave')">Generate Chart</button>
                </div>
            </div>
            
            <div id="report-view-container" class="card fade-in" style="animation-delay: 0.2s; height: 400px; display: flex; align-items: center; justify-content: center;">
                <div style="text-align: center; color: var(--text-muted);">
                    <i class="fa-solid fa-wand-magic-sparkles" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i>
                    <h3>Select a report type to visualize data</h3>
                </div>
            </div>
        `;
    },

    // 6. ORGANIZATION
    organization: () => {
        return `
            <div class="page-header fade-in">
                <div>
                    <h1 class="page-title">Organization Chart</h1>
                    <p class="page-subtitle">View company structure and reporting lines.</p>
                </div>
            </div>
            <div class="card fade-in hierarchy-container" style="animation-delay: 0.1s; padding: 40px;">
                <div class="hierarchy-node">
                    <img src="${DB.employees[2].avatar}">
                    <h4>Emily Chen</h4><p>CEO / HR Director</p>
                </div>
                <div style="height: 40px; width: 2px; background: var(--primary); margin: 0 auto;"></div>
                <div style="display: flex; justify-content: center; position: relative;">
                    <div style="position: absolute; top: 0; left: calc(50% - 150px); right: calc(50% - 150px); height: 2px; background: var(--primary);"></div>
                    <div style="display: flex; gap: 40px; margin-top: 2px;">
                        <div style="position: relative; padding-top: 40px;">
                            <div style="position: absolute; top: 0; left: 50%; width: 2px; height: 40px; background: var(--primary);"></div>
                            <div class="hierarchy-node"><img src="${DB.employees[0].avatar}"><h4>Sarah Connor</h4><p>Lead Engineer</p></div>
                        </div>
                        <div style="position: relative; padding-top: 40px;">
                            <div style="position: absolute; top: 0; left: 50%; width: 2px; height: 40px; background: var(--primary);"></div>
                            <div class="hierarchy-node"><img src="${DB.employees[1].avatar}"><h4>John Smith</h4><p>Product Manager</p></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // 7. DOCUMENTS
    documents: () => {
        return `
            <div class="page-header fade-in">
                <div>
                    <h1 class="page-title">Document Library</h1>
                    <p class="page-subtitle">Company policies, templates, and guides.</p>
                </div>
                <button class="primary-btn" onclick="Swal.fire({title: 'Upload Document', text: 'Select a file to upload to the library', input: 'file', background: '#0f172a', color: 'white'})"><i class="fa-solid fa-upload"></i> Upload</button>
            </div>
            <div class="grid-4 fade-in" style="animation-delay: 0.1s;">
                <div class="card" style="text-align: center; cursor: pointer;" onclick="Swal.fire({title: 'Employee Handbook.pdf', icon: 'info', background: '#0f172a', color: 'white'})">
                    <i class="fa-solid fa-file-pdf" style="font-size: 48px; color: #ef4444; margin-bottom: 16px;"></i>
                    <h4>Employee Handbook</h4><p style="font-size: 12px; color: var(--text-muted);">Updated Jan 2024</p>
                </div>
                <div class="card" style="text-align: center; cursor: pointer;" onclick="Swal.fire({title: 'Code of Conduct.pdf', icon: 'info', background: '#0f172a', color: 'white'})">
                    <i class="fa-solid fa-file-pdf" style="font-size: 48px; color: #ef4444; margin-bottom: 16px;"></i>
                    <h4>Code of Conduct</h4><p style="font-size: 12px; color: var(--text-muted);">Updated Mar 2023</p>
                </div>
                <div class="card" style="text-align: center; cursor: pointer;" onclick="Swal.fire({title: 'Holiday Policy.pdf', icon: 'info', background: '#0f172a', color: 'white'})">
                    <i class="fa-solid fa-file-pdf" style="font-size: 48px; color: #ef4444; margin-bottom: 16px;"></i>
                    <h4>Holiday Policy</h4><p style="font-size: 12px; color: var(--text-muted);">Updated Sep 2024</p>
                </div>
                <div class="card" style="text-align: center; cursor: pointer;" onclick="Swal.fire({title: 'Tax Forms.zip', icon: 'info', background: '#0f172a', color: 'white'})">
                    <i class="fa-solid fa-file-zipper" style="font-size: 48px; color: #f59e0b; margin-bottom: 16px;"></i>
                    <h4>Tax Forms</h4><p style="font-size: 12px; color: var(--text-muted);">Updated Feb 2024</p>
                </div>
            </div>
        `;
    },

    // 8. SETTINGS
    settings: () => {
        return `
            <div class="page-header fade-in">
                <div>
                    <h1 class="page-title">HR Settings</h1>
                    <p class="page-subtitle">Configure platform preferences.</p>
                </div>
                <button class="primary-btn" onclick="Swal.fire({title: 'Settings Saved', icon: 'success', timer: 2000, showConfirmButton: false, background: '#0f172a', color: 'white'})"><i class="fa-solid fa-floppy-disk"></i> Save</button>
            </div>
            <div class="card fade-in" style="animation-delay: 0.1s; max-width: 600px;">
                <div style="margin-bottom: 16px;">
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Company Name</label>
                    <input class="form-control" value="Acme Corp" />
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Default Work Hours</label>
                    <input class="form-control" value="09:00 AM - 05:00 PM" />
                </div>
                <div style="margin-bottom: 24px;">
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Timezone</label>
                    <select class="form-control">
                        <option>America/New_York (EST)</option>
                        <option>America/Los_Angeles (PST)</option>
                        <option>Europe/London (GMT)</option>
                    </select>
                </div>
                <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px;">
                    <h4 style="margin-bottom: 16px; font-size: 15px;">Notification Preferences</h4>
                    <label style="display: flex; align-items: center; gap: 12px; cursor: pointer; margin-bottom: 12px; color: var(--text-muted);">
                        <input type="checkbox" checked /> Email alerts for leave requests
                    </label>
                    <label style="display: flex; align-items: center; gap: 12px; cursor: pointer; margin-bottom: 12px; color: var(--text-muted);">
                        <input type="checkbox" checked /> Weekly summary reports
                    </label>
                </div>
            </div>
        `;
    }
};

// --- Core Functions ---
window.renderView = function(viewName) {
    currentView = viewName;
    document.getElementById('view-container').innerHTML = views[viewName]();
    
    // Update active nav
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelector(`.nav-item[data-target="${viewName}"]`)?.classList.add('active');
    
    updateNotifications();

    // Init Charts safely
    setTimeout(() => {
        if (viewName === 'dashboard') {
            initChart('deptChart', 'bar', {
                labels: ['Engineering', 'Product', 'HR', 'Design', 'Marketing'],
                datasets: [{ label: 'Headcount', data: [1, 1, 1, 1, 1], backgroundColor: '#8b5cf6', borderRadius: 6 }]
            });
        }
        if (viewName === 'attendance') {
            initChart('attChart', 'line', {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{ label: 'On-Time %', data: [90, 92, 89, 95], borderColor: '#3b82f6', tension: 0.4, fill: true, backgroundColor: 'rgba(59, 130, 246, 0.1)' }]
            });
        }
        if (viewName === 'reports') {
            renderReportChart('employee');
        }
    }, 100);
};

window.initChart = function(canvasId, type, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    if (chartInstances[canvasId]) chartInstances[canvasId].destroy();
    chartInstances[canvasId] = new Chart(ctx, {
        type: type,
        data: data,
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: true, position: 'bottom', labels: { color: 'white', font: { size: 13, family: 'Outfit' } } } },
            scales: {
                y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
            }
        }
    });
};

window.updateNotifications = function() {
    const pendingCount = DB.leaveRequests.filter(l => l.status === 'Pending').length;
    const badges = document.querySelectorAll('.badge');
    badges.forEach(b => {
        b.textContent = pendingCount;
        b.style.display = pendingCount > 0 ? 'flex' : 'none';
    });
};

// --- Feature Implementations ---

// Employee Profile Module
window.switchEmpTab = function(tabName) {
    currentEmpTab = tabName;
    renderView('employees');
};

window.filterEmployees = function() {
    let search = document.getElementById('empSearch')?.value.toLowerCase() || '';
    let dept = document.getElementById('deptFilter')?.value || 'all';
    
    document.querySelectorAll('.emp-card, .emp-row').forEach(el => {
        let matchSearch = el.dataset.name.includes(search);
        let matchDept = dept === 'all' || el.dataset.dept === dept;
        el.style.display = (matchSearch && matchDept) ? '' : 'none';
    });
};

window.viewEmployeeProfile = function(id, tab = 'overview') {
    const emp = DB.employees.find(e => e.id === id);
    if (!emp) return;
    
    const remainingLeaves = emp.leaves.total - emp.leaves.used;

    let tabContent = '';
    if (tab === 'overview') {
        tabContent = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; animation: fadeIn 0.3s forwards;">
                <div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                    <p style="color: #94a3b8; font-size: 12px; margin-bottom: 4px;">Email</p>
                    <p style="color: white; font-size: 14px;">${emp.email}</p>
                </div>
                <div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                    <p style="color: #94a3b8; font-size: 12px; margin-bottom: 4px;">Join Date</p>
                    <p style="color: white; font-size: 14px;">${emp.joinDate}</p>
                </div>
            </div>
            
            <h3 style="color: white; font-size: 18px; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">Leave Balance</h3>
            <div style="display: flex; gap: 16px; margin-bottom: 24px;">
                <div style="flex: 1; text-align: center; background: rgba(139,92,246,0.1); padding: 16px; border-radius: 12px; border: 1px solid rgba(139,92,246,0.2);"><p style="font-size: 24px; color: white; font-weight: 700;">${emp.leaves.total}</p><p style="color: #a78bfa; font-size: 12px;">Total</p></div>
                <div style="flex: 1; text-align: center; background: rgba(245,158,11,0.1); padding: 16px; border-radius: 12px; border: 1px solid rgba(245,158,11,0.2);"><p style="font-size: 24px; color: white; font-weight: 700;">${emp.leaves.used}</p><p style="color: #fbbf24; font-size: 12px;">Used</p></div>
                <div style="flex: 1; text-align: center; background: rgba(16,185,129,0.1); padding: 16px; border-radius: 12px; border: 1px solid rgba(16,185,129,0.2);"><p style="font-size: 24px; color: white; font-weight: 700;">${remainingLeaves}</p><p style="color: #34d399; font-size: 12px;">Remaining</p></div>
            </div>
            
            <h3 style="color: white; font-size: 18px; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">Documents</h3>
            <div style="display: flex; gap: 12px;">
                <button class="btn btn-secondary" onclick="Swal.fire({title: 'Offer Letter.pdf', html: '<div style=\'height: 300px; display:flex; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8;\'><i class=\'fa-solid fa-file-pdf fa-3x\'></i></div>'})"><i class="fa-solid fa-file-pdf"></i> Offer Letter</button>
                <button class="btn btn-secondary" onclick="Swal.fire({title: 'ID Verification.jpg', html: '<div style=\'height: 300px; display:flex; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8;\'><i class=\'fa-solid fa-image fa-3x\'></i></div>'})"><i class="fa-solid fa-image"></i> ID Scan</button>
            </div>
        `;
    } else if (tab === 'timeline') {
        tabContent = `
            <div style="animation: fadeIn 0.3s forwards; padding-top: 8px;">
                <div class="timeline">
                    ${emp.timeline.map(t => `
                        <div class="timeline-item">
                            <h4 style="font-size: 15px; color: white; margin-bottom: 2px;">${t.event}</h4>
                            <p style="font-size: 13px; color: var(--text-muted);">${t.date}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else if (tab === 'notes') {
        tabContent = `
            <div style="animation: fadeIn 0.3s forwards; padding-top: 8px;">
                <textarea id="empNoteBox" class="form-control" style="height: 150px; resize: none; margin-bottom: 16px;" placeholder="Add private HR notes here...">${emp.notes || ''}</textarea>
                <button class="primary-btn" style="width: 100%; justify-content: center;" onclick="
                    const msg = document.getElementById('saveMsg');
                    const emp = DB.employees.find(e => e.id === ${id});
                    if(emp) { emp.notes = document.getElementById('empNoteBox').value; saveDB(); }
                    msg.style.opacity = '1';
                    setTimeout(() => msg.style.opacity = '0', 2000);
                ">Save Notes</button>
                <p id="saveMsg" style="text-align: center; color: var(--success); font-size: 13px; margin-top: 12px; font-weight: 500; opacity: 0; transition: opacity 0.3s;">Notes saved successfully!</p>
            </div>
        `;
    }

    Swal.fire({
        title: false,
        html: `
            <div style="text-align: left; padding-top: 20px;">
                <div style="display: flex; gap: 24px; align-items: center; margin-bottom: 24px;">
                    <img src="${emp.avatar}" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #8b5cf6;">
                    <div>
                        <h2 style="color: white; margin: 0; font-size: 24px;">${emp.name}</h2>
                        <p style="color: #94a3b8; font-size: 14px; margin-bottom: 6px;">${emp.role} • ${emp.department}</p>
                        <span style="padding: 4px 10px; background: rgba(16,185,129,0.1); color: #34d399; border-radius: 20px; font-size: 12px; font-weight: 600;">${emp.status}</span>
                    </div>
                </div>
                
                <div style="display: flex; gap: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px; padding-bottom: 8px;">
                    <button style="color: ${tab === 'overview' ? 'var(--primary)' : 'var(--text-muted)'}; font-weight: 600; font-size: 15px; background: none; border: none; cursor: pointer; border-bottom: ${tab === 'overview' ? '2px solid var(--primary)' : '2px solid transparent'}; padding-bottom: 6px;" onclick="viewEmployeeProfile(${id}, 'overview')">Overview</button>
                    <button style="color: ${tab === 'timeline' ? 'var(--primary)' : 'var(--text-muted)'}; font-weight: 600; font-size: 15px; background: none; border: none; cursor: pointer; border-bottom: ${tab === 'timeline' ? '2px solid var(--primary)' : '2px solid transparent'}; padding-bottom: 6px;" onclick="viewEmployeeProfile(${id}, 'timeline')">Timeline</button>
                    <button style="color: ${tab === 'notes' ? 'var(--primary)' : 'var(--text-muted)'}; font-weight: 600; font-size: 15px; background: none; border: none; cursor: pointer; border-bottom: ${tab === 'notes' ? '2px solid var(--primary)' : '2px solid transparent'}; padding-bottom: 6px;" onclick="viewEmployeeProfile(${id}, 'notes')">Notes</button>
                </div>
                
                ${tabContent}
            </div>
        `,
        width: 600,
        background: '#0f172a',
        showCloseButton: true,
        showConfirmButton: false
    });
};

// Leave Workflow
window.processLeave = function(id, status, empId, days) {
    const req = DB.leaveRequests.find(r => r.id === id);
    if (req) {
        req.status = status;
        
        // Complex Leave Balance Calculation Logic
        if (status === 'Approved') {
            const emp = DB.employees.find(e => e.id === empId);
            if (emp) {
                emp.leaves.used += days;
                if (emp.leaves.used > emp.leaves.total) emp.leaves.used = emp.leaves.total;
            }
        }
        
        saveDB();
        renderView('leave'); 
        
        Swal.fire({
            toast: true, position: 'top-end', icon: status === 'Approved' ? 'success' : 'error',
            title: `Request ${status}`,
            text: `Leave request for ${req.name} was ${status.toLowerCase()}.`,
            showConfirmButton: false, timer: 3000,
            background: 'var(--bg-panel)', color: 'white'
        });
    }
};

// Add Employee Validation Workflow
window.showAddEmployeeModal = function() {
    Swal.fire({
        title: 'Add New Employee',
        background: '#0f172a',
        color: 'white',
        html: `
            <div style="text-align: left;">
                <div style="margin-bottom: 16px;">
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Profile Picture</label>
                    <input id="swal-input-avatar" type="file" accept="image/*" class="form-control" onchange="
                        const file = this.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = e => window.newEmpAvatar = e.target.result;
                            reader.readAsDataURL(file);
                        }
                    ">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Full Name *</label>
                    <input id="swal-input1" class="form-control" placeholder="e.g. Alice Wonderland">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Email *</label>
                    <input id="swal-input2" type="email" class="form-control" placeholder="e.g. alice@myhrtool.com">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Department</label>
                    <select id="swal-input3" class="form-control">
                        <option>Engineering</option>
                        <option>Product</option>
                        <option>HR</option>
                        <option>Marketing</option>
                        <option>Design</option>
                    </select>
                </div>
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Save Employee',
        confirmButtonColor: '#8b5cf6',
        preConfirm: () => {
            const name = document.getElementById('swal-input1').value.trim();
            const email = document.getElementById('swal-input2').value.trim();
            const dept = document.getElementById('swal-input3').value;
            const avatar = window.newEmpAvatar || `https://i.pravatar.cc/150?u=${DB.employees.length + 1}`;
            window.newEmpAvatar = null; // reset
            
            if (!name) { Swal.showValidationMessage('Error: Name is required'); return false; }
            if (!email || !email.includes('@')) { Swal.showValidationMessage('Error: Valid email is required'); return false; }
            return { name, email, dept, avatar };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            DB.employees.push({
                id: DB.employees.length + 1,
                name: result.value.name, role: 'New Hire', department: result.value.dept,
                email: result.value.email, status: 'Active', joinDate: new Date().toISOString().split('T')[0],
                avatar: result.value.avatar, leaves: { total: 24, used: 0 }, notes: 'New employee.', timeline: [{date: new Date().toISOString().split('T')[0], event: 'Joined Company'}]
            });
            saveDB();
            renderView('employees');
            Swal.fire({ title: 'Success!', text: `${result.value.name} has been added to the directory.`, icon: 'success', background: '#0f172a', color: 'white', confirmButtonColor: '#8b5cf6' });
        }
    });
};

// Report Charts & Exports
window.renderReportChart = function(type) {
    const container = document.getElementById('report-view-container');
    if (!container) return;
    container.innerHTML = '<div style="position: relative; width: 100%; height: 100%; padding: 20px;"><canvas id="hrReportChart"></canvas></div>';
    
    let config = { type: 'bar', data: {}, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: {color:'white'} } }, scales: { y: {ticks:{color:'#94a3b8'}}, x:{ticks:{color:'#94a3b8'}} } } };
    
    if (type === 'employee') {
        config.type = 'doughnut';
        config.data = { labels: ['Engineering (12)', 'Product (5)', 'HR (3)', 'Design (4)'], datasets: [{ data: [12, 5, 3, 4], backgroundColor: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'], borderWidth: 0 }] };
        delete config.options.scales;
    } else if (type === 'attendance') {
        config.type = 'line';
        config.data = { labels: ['Week 1 (40h)', 'Week 2 (45h)', 'Week 3 (30h)', 'Week 4 (50h)'], datasets: [{ label: 'Overtime Hours', data: [40, 45, 30, 50], borderColor: '#3b82f6', tension: 0.4 }] };
    } else if (type === 'leave') {
        config.type = 'bar';
        config.data = { labels: ['Jan (15)', 'Feb (10)', 'Mar (25)', 'Apr (5)'], datasets: [{ label: 'Leaves Taken', data: [15, 10, 25, 5], backgroundColor: '#10b981' }] };
    }
    
    setTimeout(() => initChart('hrReportChart', config.type, config.data), 50);
};

window.exportData = function(type) {
    let csv = '';
    let filename = `${type}_export.csv`;

    if (type === 'employees' || type === 'dashboard') {
        csv = 'ID,Name,Role,Department,Email,Status,Join Date,Total Leaves,Used Leaves\n';
        DB.employees.forEach(e => csv += `${e.id},${e.name},${e.role},${e.department},${e.email},${e.status},${e.joinDate},${e.leaves.total},${e.leaves.used}\n`);
    } else if (type === 'attendance') {
        csv = 'EmpID,Name,Clock In,Clock Out,Total Hours,Status\n';
        DB.attendance.forEach(a => csv += `${a.empId},${a.name},${a.clockIn},${a.clockOut},${a.hours},${a.status}\n`);
    } else if (type === 'leave') {
        csv = 'ID,Employee,Type,Dates,Days,Status\n';
        DB.leaveRequests.forEach(l => csv += `${l.id},${l.name},${l.type},${l.dates},${l.days},${l.status}\n`);
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Export Downloaded', showConfirmButton: false, timer: 3000, background: 'var(--bg-panel)', color: 'white' });
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => { e.preventDefault(); renderView(item.dataset.target); });
    });
    renderView('dashboard');
});

// --- Header Interactivity ---
window.globalSearch = function(val) {
    const resBox = document.getElementById('searchResults');
    if(!resBox) return;
    if(!val) { resBox.style.display = 'none'; return; }
    
    val = val.toLowerCase();
    const emps = DB.employees.filter(e => e.name.toLowerCase().includes(val) || e.department.toLowerCase().includes(val) || e.role.toLowerCase().includes(val));
    
    if (emps.length === 0) {
        resBox.innerHTML = '<div style="padding:16px; color:var(--text-muted); text-align:center;">No results found</div>';
    } else {
        resBox.innerHTML = emps.map(e => `
            <div style="padding: 12px 16px; display:flex; align-items:center; gap:12px; border-bottom:1px solid var(--border-color); cursor:pointer;" onclick="document.getElementById('searchResults').style.display='none'; document.querySelector('.search-bar input').value=''; renderView('employees'); setTimeout(() => viewEmployeeProfile(${e.id}), 100);">
                <img src="${e.avatar}" style="width:32px; height:32px; border-radius:50%; border: 1px solid var(--primary);">
                <div>
                    <div style="font-size:14px; font-weight:600; color:var(--text-main);">${e.name}</div>
                    <div style="font-size:12px; color:var(--text-muted);">${e.role} • ${e.department}</div>
                </div>
            </div>
        `).join('');
    }
    resBox.style.display = 'block';
};

// Close global search when clicking outside
document.addEventListener('click', (e) => {
    const resBox = document.getElementById('searchResults');
    if (resBox && !e.target.closest('.search-bar')) {
        resBox.style.display = 'none';
    }
});

window.showNotifications = function() {
    Swal.fire({
        title: 'Notifications',
        html: '<div style="text-align:left; color:#94a3b8; font-size:14px;">' +
              '<p style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">🔴 Pending leave request from John Smith</p>' +
              '<p style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">🟢 System backup completed successfully</p>' +
              '<p style="padding: 12px;">🟡 Sarah Connor Work Anniversary tomorrow!</p>' +
              '</div>',
        background: '#0f172a', color: 'white',
        showConfirmButton: false, showCloseButton: true
    });
};

window.showMessages = function() {
    Swal.fire({
        title: 'Messages',
        text: 'You have 0 new messages.',
        icon: 'info',
        background: '#0f172a', color: 'white',
        confirmButtonColor: '#8b5cf6'
    });
};

window.showQuickAdd = function() {
    if (window.showAddEmployeeModal) {
        window.showAddEmployeeModal();
    }
};
