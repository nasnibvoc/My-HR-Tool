// --- Mock Database (Simulated API Optimization) ---
const defaultDB = {
    settings: {
        roles: ['Admin', 'HR Manager', 'Manager', 'Employee'],
        modules: ['CRM', 'POS', 'Inventory', 'Payroll'],
        leaveTypes: ['Annual Leave', 'Sick Leave', 'Casual Leave', 'Maternity/Paternity', 'Unpaid Leave']
    },
    organization: {
        departments: ['Engineering', 'Product', 'HR', 'Marketing', 'Design', 'Sales'],
        designations: ['CEO', 'HR Director', 'Lead Engineer', 'Software Engineer', 'Product Manager', 'Designer', 'Marketing Lead', 'Sales Executive'],
        locations: ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Chicago, IL', 'London, UK'],
        teams: [
            { id: 1, name: 'Core Platform', leadId: 1, members: [1, 4] },
            { id: 2, name: 'Growth', leadId: 2, members: [2, 5] }
        ]
    },
    employees: [
        { id: 1, name: 'Sarah Connor', role: 'Lead Engineer', department: 'Engineering', email: 'sarah@myhrtool.com', phone: '+1 555-0101', emergencyContact: 'John Connor (+1 555-0102)', address: '123 Tech Lane, CA', dob: '1985-04-12', employmentType: 'Full-Time', location: 'San Francisco, CA', status: 'Active', joinDate: '2023-01-15', avatar: 'https://i.pravatar.cc/150?u=1', managerId: 3, tags: ['High Performer', 'First Aid'], documents: [{id: 1, name: 'Contract.pdf', category: 'Contract', expiry: '2025-01-15'}], leaves: { total: 24, used: 4, accrualRate: 2 }, notes: 'Excellent leadership skills. Leading the Q4 refactor.', timeline: [{date: '2023-01-15', event: 'Joined as Senior Engineer'}, {date: '2024-05-10', event: 'Promoted to Lead Engineer'}], activityHistory: [{date: '2024-10-20', action: 'Updated profile picture'}], attendanceSettings: { checkInTime: '09:00', checkOutTime: '17:00' }, integrations: { crm: true, pos: false, inventory: false } },
        { id: 2, name: 'John Smith', role: 'Product Manager', department: 'Product', email: 'john@myhrtool.com', phone: '+1 555-0201', emergencyContact: 'Jane Smith (+1 555-0202)', address: '456 Product St, NY', dob: '1990-08-22', employmentType: 'Full-Time', location: 'New York, NY', status: 'On Leave', joinDate: '2022-11-01', avatar: 'https://i.pravatar.cc/150?u=2', managerId: 3, tags: ['Product'], documents: [], leaves: { total: 24, used: 12, accrualRate: 2 }, notes: 'Needs to finalize the roadmap for next year.', timeline: [{date: '2022-11-01', event: 'Joined as Product Manager'}], activityHistory: [], attendanceSettings: { checkInTime: '09:00', checkOutTime: '17:00' }, integrations: { crm: true, pos: false, inventory: false } },
        { id: 3, name: 'Emily Chen', role: 'HR Director', department: 'HR', email: 'emily@myhrtool.com', phone: '+1 555-0301', emergencyContact: 'Michael Chen (+1 555-0302)', address: '789 People Ave, TX', dob: '1982-11-05', employmentType: 'Full-Time', location: 'Austin, TX', status: 'Active', joinDate: '2021-05-20', avatar: 'https://i.pravatar.cc/150?u=3', managerId: null, tags: ['Management', 'Admin'], documents: [], leaves: { total: 24, used: 2, accrualRate: 2 }, notes: 'Reviewing Q3 performance bonuses.', timeline: [{date: '2021-05-20', event: 'Joined as HR Manager'}, {date: '2023-01-01', event: 'Promoted to HR Director'}], activityHistory: [], attendanceSettings: { checkInTime: '09:00', checkOutTime: '17:00' }, integrations: { crm: false, pos: false, inventory: false } },
        { id: 4, name: 'Michael Ross', role: 'Designer', department: 'Design', email: 'michael@myhrtool.com', phone: '+1 555-0401', emergencyContact: 'Harvey Specter (+1 555-0402)', address: '101 Creative Blvd, CA', dob: '1995-02-14', employmentType: 'Part-Time', location: 'San Francisco, CA', status: 'Active', joinDate: '2024-02-10', avatar: 'https://i.pravatar.cc/150?u=4', managerId: 1, tags: ['Creative'], documents: [], leaves: { total: 24, used: 0, accrualRate: 2 }, notes: 'Working on the new design system components.', timeline: [{date: '2024-02-10', event: 'Joined as UI/UX Designer'}], activityHistory: [], attendanceSettings: { checkInTime: '09:00', checkOutTime: '17:00' }, integrations: { crm: false, pos: false, inventory: false } },
        { id: 5, name: 'David Kim', role: 'Marketing Lead', department: 'Marketing', email: 'david@myhrtool.com', phone: '+1 555-0501', emergencyContact: 'Sarah Kim (+1 555-0502)', address: '202 Market Square, IL', dob: '1988-07-30', employmentType: 'Contract', location: 'Chicago, IL', status: 'Active', joinDate: '2023-08-05', avatar: 'https://i.pravatar.cc/150?u=5', managerId: 3, tags: [], documents: [], leaves: { total: 24, used: 5, accrualRate: 2 }, notes: 'Campaign launched successfully.', timeline: [{date: '2023-08-05', event: 'Joined as Marketing Lead'}], activityHistory: [], attendanceSettings: { checkInTime: '09:00', checkOutTime: '17:00' }, integrations: { crm: true, pos: false, inventory: false } }
    ],
    leaveRequests: [
        { id: 101, empId: 2, name: 'John Smith', type: 'Annual Leave', dates: 'Oct 25 - Oct 28', days: 4, status: 'Approved', managerApproval: 'Approved', hrApproval: 'Approved' },
        { id: 102, empId: 1, name: 'Sarah Connor', type: 'Sick Leave', dates: 'Oct 29 - Oct 30', days: 2, status: 'Pending', managerApproval: 'Pending', hrApproval: 'Pending' },
        { id: 103, empId: 4, name: 'Michael Ross', type: 'Personal', dates: 'Nov 01 - Nov 01', days: 1, status: 'Pending', managerApproval: 'Approved', hrApproval: 'Pending' }
    ],
    attendance: [],
    correctionRequests: [],
    holidays: [
        { date: 'Nov 28', name: 'Thanksgiving' },
        { date: 'Dec 25', name: 'Christmas Day' },
        { date: 'Jan 01', name: 'New Year\'s Day' }
    ]
};

const API_URL = 'http://localhost:3000/api';
window.isBackendConnected = false;

function updateConnectionStatusBadge() {
    let headerActions = document.querySelector('.header-actions');
    if (!headerActions) return;
    let badge = document.getElementById('db-connection-badge');
    if (!badge) {
        badge = document.createElement('div');
        badge.id = 'db-connection-badge';
        badge.style.display = 'flex';
        badge.style.alignItems = 'center';
        badge.style.gap = '6px';
        badge.style.fontSize = '12px';
        badge.style.fontWeight = '500';
        badge.style.padding = '6px 12px';
        badge.style.borderRadius = '20px';
        badge.style.marginRight = '12px';
        headerActions.insertBefore(badge, headerActions.firstChild);
    }
    if (window.isBackendConnected) {
        badge.innerHTML = `<span style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; display: inline-block;"></span> <span style="color: #10b981;">PostgreSQL Connected</span>`;
        badge.style.background = 'rgba(16, 185, 129, 0.1)';
        badge.style.border = '1px solid rgba(16, 185, 129, 0.2)';
    } else {
        badge.innerHTML = `<span style="width: 8px; height: 8px; background: #f59e0b; border-radius: 50%; display: inline-block;"></span> <span style="color: #f59e0b;">Local Mode</span>`;
        badge.style.background = 'rgba(245, 158, 11, 0.1)';
        badge.style.border = '1px solid rgba(245, 158, 11, 0.2)';
    }
}

let DB = localStorage.getItem('MyHRTool_DB') ? JSON.parse(localStorage.getItem('MyHRTool_DB')) : defaultDB;
if (!DB.payrollRecords) DB.payrollRecords = [];
DB.employees.forEach(emp => {
    if (!emp.salaryStructure) emp.salaryStructure = { basic: 50000, allowances: 10000, hourlyRate: 500 };
    if (!emp.statutory) emp.statutory = { pan: '', uan: '', pfEnabled: true, esiEnabled: false, bankAccount: '', ifsc: '', ptEnabled: true, tdsPercentage: 0, taxRegime: 'New Regime' };
    if (!emp.onboarding) emp.onboarding = { status: 'Completed', progress: 100, checklist: [{task: 'Submit ID Documents', done: true}, {task: 'Sign NDA', done: true}, {task: 'Read Employee Handbook', done: true}, {task: 'IT Setup', done: true}], assets: [] };
    if (!emp.goals) emp.goals = [];
});
if (!DB.jobs) DB.jobs = [];
if (!DB.candidates) DB.candidates = [];
if (!DB.performanceReviews) DB.performanceReviews = [];

window.saveDB = async function() {
    localStorage.setItem('MyHRTool_DB', JSON.stringify(DB));
    if (window.isBackendConnected) {
        try {
            const res = await fetch(`${API_URL}/db/sync`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(DB)
            });
            if (!res.ok) throw new Error('Sync failed');
        } catch (err) {
            console.error('Failed to sync to PostgreSQL backend:', err);
            window.isBackendConnected = false;
            updateConnectionStatusBadge();
        }
    }
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
        let totalEmployees = DB.employees.length;
        let activeEmps = DB.employees.filter(e => e.status === 'Active').length;
        let onLeaveEmps = DB.employees.filter(e => e.status === 'On Leave').length;
        // Mock new joiners (assume joined in the last year for mock data)
        let newJoiners = DB.employees.filter(e => new Date(e.joinDate) >= new Date('2023-01-01')).length || 2; 

        // Attendance stats
        let presentToday = DB.attendance.filter(a => a.status === 'Present').length;
        let lateArrivals = DB.attendance.filter(a => a.status === 'Late Arrival').length;
        let absentToday = DB.attendance.filter(a => a.status === 'Absent').length;
        let pendingLeaves = DB.leaveRequests.filter(r => r.status === 'Pending').length;
        
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
            
            <h3 style="margin-bottom: 16px; font-size: 16px; color: var(--text-muted);">Workforce Overview</h3>
            <div class="grid-4 fade-in" style="animation-delay: 0.1s; margin-bottom: 24px;">
                <div class="card stat-card" style="padding: 20px;">
                    <div class="stat-icon purple" style="width: 48px; height: 48px;"><i class="fa-solid fa-users"></i></div>
                    <div class="stat-info"><h3>Total Employees</h3><p>${totalEmployees}</p></div>
                </div>
                <div class="card stat-card" style="padding: 20px;">
                    <div class="stat-icon green" style="width: 48px; height: 48px;"><i class="fa-solid fa-user-check"></i></div>
                    <div class="stat-info"><h3>Active Employees</h3><p>${activeEmps}</p></div>
                </div>
                <div class="card stat-card" style="padding: 20px;">
                    <div class="stat-icon blue" style="width: 48px; height: 48px;"><i class="fa-solid fa-user-plus"></i></div>
                    <div class="stat-info"><h3>New Joiners</h3><p>${newJoiners}</p></div>
                </div>
                <div class="card stat-card" style="padding: 20px;">
                    <div class="stat-icon orange" style="width: 48px; height: 48px;"><i class="fa-solid fa-plane"></i></div>
                    <div class="stat-info"><h3>Employees on Leave</h3><p>${onLeaveEmps}</p></div>
                </div>
            </div>

            <h3 style="margin-bottom: 16px; font-size: 16px; color: var(--text-muted);">Attendance & Leave</h3>
            <div class="grid-4 fade-in" style="animation-delay: 0.15s; margin-bottom: 24px;">
                <div class="card stat-card" style="padding: 20px;">
                    <div class="stat-icon success" style="width: 48px; height: 48px; background: rgba(16, 185, 129, 0.1); color: var(--success);"><i class="fa-solid fa-clipboard-check"></i></div>
                    <div class="stat-info"><h3>Attendance Summary</h3><p>${presentToday} Present</p></div>
                </div>
                <div class="card stat-card" style="padding: 20px;">
                    <div class="stat-icon warning" style="width: 48px; height: 48px; background: rgba(245, 158, 11, 0.1); color: var(--warning);"><i class="fa-solid fa-clock"></i></div>
                    <div class="stat-info"><h3>Late Arrivals</h3><p>${lateArrivals}</p></div>
                </div>
                <div class="card stat-card" style="padding: 20px;">
                    <div class="stat-icon danger" style="width: 48px; height: 48px; background: rgba(239, 68, 68, 0.1); color: var(--danger);"><i class="fa-solid fa-user-xmark"></i></div>
                    <div class="stat-info"><h3>Absence Summary</h3><p>${absentToday} Absent</p></div>
                </div>
                <div class="card stat-card" style="padding: 20px;">
                    <div class="stat-icon orange" style="width: 48px; height: 48px;"><i class="fa-solid fa-calendar-day"></i></div>
                    <div class="stat-info"><h3>Pending Leaves</h3><p>${pendingLeaves}</p></div>
                </div>
            </div>
            
            <div class="grid-3 fade-in" style="animation-delay: 0.2s; margin-bottom: 24px;">
                <div class="card col-span-2">
                    <h3 style="margin-bottom: 20px; font-size: 16px;">Department Overview</h3>
                    <div style="height: 300px; position: relative;">
                        <canvas id="deptChart"></canvas>
                    </div>
                </div>
                
                <div class="card">
                    <h3 style="margin-bottom: 20px; font-size: 16px;"><i class="fa-solid fa-bolt" style="color: var(--primary); margin-right: 8px;"></i> Quick Actions</h3>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <button class="btn" style="width: 100%; text-align: left; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 12px; display: flex; align-items: center; gap: 12px; border: 1px solid var(--border-color); cursor: pointer;" onclick="if(window.showAddEmployeeModal) showAddEmployeeModal()"><div style="background: var(--primary-glow); color: #fff; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-user-plus"></i></div> Add Employee</button>
                        <button class="btn" style="width: 100%; text-align: left; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 12px; display: flex; align-items: center; gap: 12px; border: 1px solid var(--border-color); cursor: pointer;" onclick="document.querySelector('[data-target=attendance]').click()"><div style="background: rgba(16,185,129,0.2); color: var(--success); width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center;"><i class="fa-regular fa-calendar-check"></i></div> Mark Attendance</button>
                        <button class="btn" style="width: 100%; text-align: left; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 12px; display: flex; align-items: center; gap: 12px; border: 1px solid var(--border-color); cursor: pointer;" onclick="document.querySelector('[data-target=leave]').click()"><div style="background: rgba(245,158,11,0.2); color: var(--warning); width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-plane-departure"></i></div> Apply Leave</button>
                        <button class="btn" style="width: 100%; text-align: left; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 12px; display: flex; align-items: center; gap: 12px; border: 1px solid var(--border-color); cursor: pointer;" onclick="Swal.fire({title:'Payroll', text:'Payroll module coming soon.', icon:'info'})"><div style="background: rgba(59,130,246,0.2); color: var(--secondary); width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-file-invoice-dollar"></i></div> Process Payroll</button>
                    </div>
                </div>
            </div>

            <div class="grid-3 fade-in" style="animation-delay: 0.25s;">
                <div class="card">
                    <h3 style="margin-bottom: 20px; font-size: 16px;"><i class="fa-solid fa-money-bill-wave" style="color: var(--success); margin-right: 8px;"></i> Payroll Summary</h3>
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div style="background: rgba(255,255,255,0.03); padding: 16px; border-radius: 12px; border: 1px solid var(--border-color);">
                            <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">Total Payroll (This Month)</p>
                            <h2 style="font-size: 24px; color: var(--text-main);">$142,500</h2>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 14px; padding: 0 8px;">
                            <span style="color: var(--text-muted);">Processed</span>
                            <span style="color: var(--success); font-weight: 500;">92%</span>
                        </div>
                        <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                            <div style="width: 92%; height: 100%; background: var(--success);"></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h3 style="margin-bottom: 20px; font-size: 16px;"><i class="fa-solid fa-arrow-right-arrow-left" style="color: var(--secondary); margin-right: 8px;"></i> Employee Turnover</h3>
                    <div style="display: flex; gap: 20px; height: calc(100% - 40px); align-items: center;">
                        <div style="flex: 1; text-align: center; border-right: 1px solid var(--border-color);">
                            <div style="font-size: 32px; font-weight: 700; color: var(--success); margin-bottom: 4px;">${newJoiners}</div>
                            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Joined</div>
                            <div style="font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 4px;">Last 30 Days</div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <div style="font-size: 32px; font-weight: 700; color: var(--danger); margin-bottom: 4px;">0</div>
                            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Left</div>
                            <div style="font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 4px;">Last 30 Days</div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h3 style="margin-bottom: 20px; font-size: 16px;"><i class="fa-solid fa-cake-candles" style="color: var(--warning); margin-right: 8px;"></i> Upcoming Events</h3>
                    
                    <h4 style="font-size: 13px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Upcoming Birthdays</h4>
                    <div class="timeline" style="margin-bottom: 20px;">
                        <div class="timeline-item">
                            <h4 style="font-size: 14px;">Michael Ross</h4>
                            <p style="font-size: 12px; color: var(--text-muted);">Birthday • Next Week</p>
                        </div>
                    </div>
                    
                    <h4 style="font-size: 13px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Upcoming Holidays</h4>
                    <ul style="display: flex; flex-direction: column; gap: 12px;">
                        ${DB.holidays.slice(0, 2).map(h => `
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
                    <button class="btn btn-secondary" onclick="importEmployees()"><i class="fa-solid fa-upload"></i> Import</button>
                    <button class="primary-btn" onclick="showAddEmployeeModal()"><i class="fa-solid fa-user-plus"></i> Add Employee</button>
                </div>
            </div>
            
            <div class="tabs-container fade-in" style="animation-delay: 0.1s;">
                <div class="tab ${currentEmpTab === 'directory' ? 'active' : ''}" onclick="switchEmpTab('directory')">Directory Grid</div>
                <div class="tab ${currentEmpTab === 'list' ? 'active' : ''}" onclick="switchEmpTab('list')">List View</div>
                <div class="tab ${currentEmpTab === 'hierarchy' ? 'active' : ''}" onclick="switchEmpTab('hierarchy')">Reporting Hierarchy</div>
            </div>
            
            <div style="margin-bottom: 24px; display: flex; gap: 16px; flex-wrap: wrap;" class="fade-in" style="animation-delay: 0.2s;">
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
                <select id="statusFilter" class="form-control" style="width: 200px;" onchange="filterEmployees()">
                    <option value="all">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Terminated">Terminated</option>
                    <option value="Resigned">Resigned</option>
                </select>
                <select id="typeFilter" class="form-control" style="width: 200px;" onchange="filterEmployees()">
                    <option value="all">All Types</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Intern">Intern</option>
                </select>
            </div>
        `;

        if (currentEmpTab === 'directory') {
            html += `<div class="grid-4 fade-in" id="empGridContainer" style="animation-delay: 0.3s;">`;
            DB.employees.forEach(e => {
                html += `
                <div class="card emp-card" data-dept="${e.department}" data-name="${e.name.toLowerCase()}" data-status="${e.status}" data-type="${e.employmentType || ''}" style="text-align: center; padding: 32px 20px; cursor: pointer;" onclick="viewEmployeeProfile(${e.id})">
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
                        <tr class="emp-row" data-dept="${e.department}" data-name="${e.name.toLowerCase()}" data-status="${e.status}" data-type="${e.employmentType || ''}">
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

    // 2.5 ORGANIZATION
    organization: () => {
        let html = `
            <div class="page-header fade-in">
                <div>
                    <h1 class="page-title">Organization Structure</h1>
                    <p class="page-subtitle">Manage departments, roles, locations, and teams.</p>
                </div>
            </div>
            
            <div class="grid-3 fade-in" style="animation-delay: 0.1s; margin-bottom: 24px;">
                <div class="card">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
                        <h3 style="font-size:16px;">Departments</h3>
                        <button class="btn btn-secondary" onclick="addDepartment()" style="padding: 4px 8px; font-size:12px;"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <ul style="list-style:none; padding:0; margin:0; max-height:200px; overflow-y:auto;">
                        ${DB.organization.departments.map(d => `<li style="padding: 10px 0; border-bottom: 1px solid var(--border-color); color:var(--text-main); display:flex; justify-content:space-between;"><span>${d}</span> <span class="badge" style="background:var(--primary); color:white; font-size:11px; padding:2px 6px; border-radius:4px;">${DB.employees.filter(e=>e.department===d).length} Emp</span></li>`).join('')}
                    </ul>
                </div>
                
                <div class="card">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
                        <h3 style="font-size:16px;">Locations</h3>
                        <button class="btn btn-secondary" onclick="addLocation()" style="padding: 4px 8px; font-size:12px;"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <ul style="list-style:none; padding:0; margin:0; max-height:200px; overflow-y:auto;">
                        ${DB.organization.locations.map(l => `<li style="padding: 10px 0; border-bottom: 1px solid var(--border-color); color:var(--text-main);"><i class="fa-solid fa-location-dot" style="color:var(--text-muted); margin-right:8px;"></i>${l}</li>`).join('')}
                    </ul>
                </div>

                <div class="card">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
                        <h3 style="font-size:16px;">Designations</h3>
                        <button class="btn btn-secondary" onclick="addDesignation()" style="padding: 4px 8px; font-size:12px;"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div style="display:flex; flex-wrap:wrap; gap:8px;">
                        ${DB.organization.designations.map(d => `<span style="background:var(--bg-panel); border:1px solid var(--border-color); padding:4px 8px; border-radius:4px; font-size:12px;">${d}</span>`).join('')}
                    </div>
                </div>
            </div>

            <div class="grid-3 fade-in" style="animation-delay: 0.2s; margin-bottom: 24px;">
                <div class="card col-span-2">
                    <h3 style="font-size:16px; margin-bottom: 16px;">Organization Chart</h3>
                    <div class="hierarchy-container" style="background: var(--bg-panel); border-radius:8px; padding:20px; overflow-x:auto;">
                        ${generateOrgChartHTML()}
                    </div>
                </div>
                
                <div class="card">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
                        <h3 style="font-size:16px;">Cross-Functional Teams</h3>
                        <button class="btn btn-secondary" onclick="addTeam()" style="padding: 4px 8px; font-size:12px;"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        ${DB.organization.teams.map(t => {
                            const lead = DB.employees.find(e => e.id == t.leadId);
                            return `
                            <div style="border:1px solid var(--border-color); border-radius:6px; padding:12px;">
                                <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                                    <strong style="color:var(--primary); font-size:14px;">${t.name}</strong>
                                    <span style="font-size:12px; color:var(--text-muted);">${t.members.length} Members</span>
                                </div>
                                <div style="font-size:12px; color:var(--text-muted);">Lead: <span style="color:white;">${lead ? lead.name : 'Unassigned'}</span></div>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
        return html;
    },

    // 3. ATTENDANCE
    attendance: () => {
        const isClockedIn = !!localStorage.getItem('MyHRTool_ClockedIn');
        const clockTime = localStorage.getItem('MyHRTool_ClockTime') || '--:--';
        const isOnBreak = !!localStorage.getItem('MyHRTool_OnBreak');
        
        return `
            <div class="page-header fade-in">
                <div>
                    <h1 class="page-title">Attendance Tracking</h1>
                    <p class="page-subtitle">Monitor daily logs and monthly trends.</p>
                </div>
                <div class="header-actions">
                    ${!isClockedIn 
                        ? `<button class="primary-btn" style="background: var(--success);" onclick="window.clockIn()"><i class="fa-solid fa-arrow-right-to-bracket"></i> Clock In</button>`
                        : (isOnBreak 
                            ? `<button class="btn btn-secondary" style="border-color: #f59e0b; color: #f59e0b;" onclick="window.endBreak()"><i class="fa-solid fa-play"></i> End Break</button>`
                            : `<button class="btn btn-secondary" style="border-color: #f59e0b; color: #f59e0b;" onclick="window.startBreak()"><i class="fa-solid fa-pause"></i> Start Break</button>
                               <button class="btn btn-secondary" style="border-color: var(--danger); color: var(--danger);" onclick="window.clockOut()"><i class="fa-solid fa-arrow-right-from-bracket"></i> Clock Out (In since ${clockTime})</button>`)
                    }
                    <button class="btn btn-secondary" onclick="exportData('attendance')"><i class="fa-solid fa-download"></i> Export Logs</button>
                </div>
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

            <div class="grid-2 fade-in" style="animation-delay: 0.2s; align-items: start;">
                <div class="table-container">
                    <div class="table-header">
                        <h2 class="table-title">Today's Logs</h2>
                        <button class="btn btn-secondary" style="font-size:12px; padding:4px 8px;" onclick="window.manualAttendance()"><i class="fa-solid fa-plus"></i> Manual Entry</button>
                    </div>
                    <table style="font-size: 13px;">
                        <thead><tr><th>Employee</th><th>Source/Loc</th><th>Clock In/Out</th><th>Breaks</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            ${DB.attendance.map(a => `
                            <tr>
                                <td><div class="user-cell"><img src="${a.avatar}"><span class="user-cell-name" style="font-size:13px;">${a.name}</span></div></td>
                                <td>
                                    <div style="color:var(--text-main); font-weight:500;">${a.source || 'Web'}</div>
                                    <div style="color:var(--text-muted); font-size:11px;">${a.location || 'Office'}</div>
                                </td>
                                <td><span style="font-family: monospace; font-size:12px;">${a.clockIn} - ${a.clockOut}</span></td>
                                <td>${a.breakTime || '0m'}</td>
                                <td>${a.hours}</td>
                                <td><span class="status-badge ${a.status === 'Present' || a.status === 'Overtime' ? 'active' : (a.status === 'Absent' ? 'inactive' : 'pending')}">${a.status}</span></td>
                                <td><button class="action-btn" style="background:var(--bg-panel); color:var(--text-main);" onclick="window.requestCorrection('${a.empId}', '${a.name}')"><i class="fa-solid fa-pen-to-square"></i></button></td>
                            </tr>`).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h2 class="table-title">Correction Requests</h2>
                    </div>
                    <table>
                        <thead><tr><th>Employee</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            ${(DB.correctionRequests || []).length > 0 ? DB.correctionRequests.map(r => `
                            <tr>
                                <td><span style="font-weight: 500;">${r.name}</span></td>
                                <td><span style="font-size:12px; color:var(--text-muted);">${r.reason}</span></td>
                                <td><span class="status-badge pending">Pending</span></td>
                                <td>
                                    <button class="action-btn success" onclick="processCorrection(${r.id}, 'Approved')"><i class="fa-solid fa-check"></i></button>
                                </td>
                            </tr>`).join('') : '<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">No pending requests</td></tr>'}
                        </tbody>
                    </table>
                </div>
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
                <div class="header-actions">
                    <button class="primary-btn" onclick="window.applyLeave()"><i class="fa-solid fa-plus"></i> Apply Leave</button>
                    <button class="btn btn-secondary" onclick="window.runLeaveAccrual()"><i class="fa-solid fa-calculator"></i> Run Accrual</button>
                    <button class="btn btn-secondary" onclick="exportData('leave')"><i class="fa-solid fa-download"></i> Export Leave Report</button>
                </div>
            </div>
            
            <div class="grid-4 fade-in" style="animation-delay: 0.1s; margin-bottom: 24px;">
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
                <div class="card" style="padding:16px;">
                    <h3 style="font-size:14px; margin-bottom:12px; color:var(--primary);"><i class="fa-solid fa-gift"></i> Upcoming Holidays</h3>
                    <ul style="list-style:none; padding:0; margin:0; font-size:13px; color:var(--text-main);">
                        ${DB.holidays.slice(0,3).map(h => `<li style="display:flex; justify-content:space-between; margin-bottom:8px; border-bottom:1px solid var(--border-color); padding-bottom:4px;"><span>${h.name}</span><span style="color:var(--text-muted);">${h.date}</span></li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="card fade-in" style="animation-delay: 0.15s; margin-bottom: 24px;">
                <h3 style="margin-bottom: 20px; font-size: 16px;"><i class="fa-solid fa-calendar-alt" style="color: var(--primary); margin-right: 8px;"></i> Department Leave Calendar (Upcoming)</h3>
                <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; text-align: center;">
                    ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => `<div style="font-weight: 600; color: var(--text-muted); font-size: 13px;">${d}</div>`).join('')}
                    ${Array(14).fill(0).map((_, i) => {
                        let isWeekend = (i + 1) % 7 === 0 || (i + 1) % 7 === 1;
                        let onLeave = Math.random() > 0.85 ? DB.employees[Math.floor(Math.random() * DB.employees.length)] : null;
                        let bg = isWeekend ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)';
                        let content = onLeave ? `<div style="font-size:10px; background:var(--primary); color:white; padding:2px 4px; border-radius:4px; margin-top:4px;">${onLeave.name}</div>` : '';
                        return `<div style="padding: 10px; border-radius: 8px; background: ${bg}; border: 1px solid rgba(255,255,255,0.1); color: var(--text-main); font-weight: 500; height: 60px;">${i + 1}${content}</div>`;
                    }).join('')}
                </div>
            </div>
            <div class="table-container fade-in" style="animation-delay: 0.2s;">
                <div class="table-header">
                    <h2 class="table-title">Leave Approval Workflow (Multi-level)</h2>
                </div>
                <table>
                    <thead><tr><th>Employee</th><th>Leave Type</th><th>Dates</th><th>Days</th><th>Manager</th><th>HR</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        ${DB.leaveRequests.map(l => `
                        <tr>
                            <td><span style="font-weight: 500;">${l.name}</span></td>
                            <td><span style="padding: 4px 10px; background: rgba(255,255,255,0.05); border-radius: 4px; font-size: 12px;">${l.type}</span></td>
                            <td>${l.dates}</td>
                            <td>${l.days}</td>
                            <td>
                                ${l.managerApproval === 'Approved' ? '<span class="status-badge active">Approved</span>' : (l.managerApproval === 'Rejected' ? '<span class="status-badge inactive">Rejected</span>' : `<button class="action-btn" style="background:var(--bg-panel); color:var(--text-main); font-size:11px; padding:4px 8px; width:auto;" onclick="processLeave(${l.id}, 'Manager', 'Approved')">Approve</button>`)}
                            </td>
                            <td>
                                ${l.hrApproval === 'Approved' ? '<span class="status-badge active">Approved</span>' : (l.hrApproval === 'Rejected' ? '<span class="status-badge inactive">Rejected</span>' : `<button class="action-btn" style="background:var(--bg-panel); color:var(--text-main); font-size:11px; padding:4px 8px; width:auto;" onclick="processLeave(${l.id}, 'HR', 'Approved')">Approve</button>`)}
                            </td>
                            <td><span class="status-badge ${l.status === 'Approved' ? 'active' : (l.status === 'Rejected' ? 'inactive' : (l.status === 'Cancelled' ? 'inactive' : 'pending'))}">${l.status}</span></td>
                            <td>
                                ${l.status === 'Approved' ? `<button class="action-btn" style="background:var(--bg-panel); color:var(--danger); font-size:11px; padding:4px 8px; width:auto;" onclick="window.cancelLeave(${l.id})">Cancel</button>` : ''}
                            </td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    // 5. PAYROLL
    payroll: () => {
        let totalExpense = DB.employees.reduce((sum, e) => sum + (e.salaryStructure ? e.salaryStructure.basic + e.salaryStructure.allowances : 0), 0);
        
        return `
            <div class="page-header fade-in">
                <div>
                    <h1 class="page-title">Payroll Processing</h1>
                    <p class="page-subtitle">Manage salary structures, statutory deductions, and process monthly payroll.</p>
                </div>
                <div class="header-actions">
                    <button class="primary-btn" onclick="window.exportPayrollTaxReport()"><i class="fa-solid fa-download"></i> Export Tax Report</button>
                </div>
            </div>
            
            <div class="grid-3 fade-in" style="animation-delay: 0.1s; margin-bottom: 24px;">
                <div class="card stat-card">
                    <div class="stat-icon purple"><i class="fa-solid fa-money-bill-wave"></i></div>
                    <div class="stat-info"><h3>Total Monthly Base</h3><p>₹${totalExpense.toLocaleString('en-IN')}</p></div>
                </div>
                <div class="card stat-card">
                    <div class="stat-icon green"><i class="fa-solid fa-building-columns"></i></div>
                    <div class="stat-info"><h3>Processed This Month</h3><p>${DB.payrollRecords.filter(r => r.period === 'Current Month').length}</p></div>
                </div>
                <div class="card stat-card">
                    <div class="stat-icon orange"><i class="fa-solid fa-receipt"></i></div>
                    <div class="stat-info"><h3>Total Employees</h3><p>${DB.employees.length}</p></div>
                </div>
            </div>
            
            <div class="grid-2 fade-in" style="animation-delay: 0.2s; align-items: start;">
                <div class="table-container">
                    <div class="table-header">
                        <h2 class="table-title">Employee Salary Configurations</h2>
                    </div>
                    <table>
                        <thead><tr><th>Employee</th><th>Base Salary</th><th>Statutory (PF/ESI)</th><th>Actions</th></tr></thead>
                        <tbody>
                            ${DB.employees.map(e => `
                            <tr>
                                <td><div class="user-cell"><img src="${e.avatar}"><span class="user-cell-name">${e.name}</span></div></td>
                                <td>₹${e.salaryStructure.basic.toLocaleString('en-IN')}</td>
                                <td>
                                    <span class="status-badge ${e.statutory.pfEnabled ? 'active' : 'inactive'}">PF</span>
                                    <span class="status-badge ${e.statutory.esiEnabled ? 'active' : 'inactive'}">ESI</span>
                                </td>
                                <td>
                                    <button class="action-btn" style="background:var(--bg-panel); color:var(--text-main);" onclick="window.editSalaryStructure(${e.id})" title="Edit Salary Structure"><i class="fa-solid fa-pen"></i></button>
                                    <button class="action-btn" style="background:var(--primary); color:white;" onclick="window.processPayroll(${e.id})" title="Run Payroll"><i class="fa-solid fa-play"></i> Run</button>
                                </td>
                            </tr>`).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h2 class="table-title">Payroll History</h2>
                    </div>
                    <table>
                        <thead><tr><th>Employee</th><th>Period</th><th>Net Pay</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            ${DB.payrollRecords.length > 0 ? DB.payrollRecords.map(r => `
                            <tr>
                                <td><span style="font-weight: 500;">${r.empName}</span></td>
                                <td>${r.period}</td>
                                <td>₹${r.netPay.toLocaleString('en-IN')}</td>
                                <td><span class="status-badge ${r.status === 'Paid' ? 'active' : 'pending'}">${r.status}</span></td>
                                <td>
                                    ${r.status === 'Processed' ? `<button class="action-btn" style="background:var(--bg-panel); color:var(--success); font-size:11px; padding:4px 8px; width:auto;" onclick="window.markPayrollPaid(${r.id})">Mark Paid</button>` : ''}
                                    <button class="action-btn" style="background:var(--bg-panel); color:var(--primary); font-size:11px; padding:4px 8px; width:auto;" onclick="window.downloadPayslip(${r.id})"><i class="fa-solid fa-file-pdf"></i> Slip</button>
                                </td>
                            </tr>`).join('') : '<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">No payroll records found.</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    // 5.5 RECRUITMENT
    recruitment: () => {
        let openJobs = DB.jobs.filter(j => j.status === 'Open').length;
        let totalCandidates = DB.candidates.length;
        let activeInterviews = DB.candidates.filter(c => c.status === 'Interview').length;
        
        return `
            <div class="page-header fade-in">
                <div>
                    <h1 class="page-title">Recruitment Dashboard</h1>
                    <p class="page-subtitle">Manage job postings and track candidates.</p>
                </div>
                <div class="header-actions">
                    <button class="secondary-btn" onclick="window.exportRecruitmentReport()"><i class="fa-solid fa-download"></i> Export</button>
                    <button class="primary-btn" onclick="window.addJob()"><i class="fa-solid fa-plus"></i> Post Job</button>
                    <button class="primary-btn" onclick="window.addCandidate()"><i class="fa-solid fa-user-plus"></i> Add Candidate</button>
                </div>
            </div>
            
            <div class="grid-3 fade-in" style="animation-delay: 0.1s; margin-bottom: 24px;">
                <div class="card stat-card">
                    <div class="stat-icon purple"><i class="fa-solid fa-briefcase"></i></div>
                    <div class="stat-info"><h3>Open Positions</h3><p>${openJobs}</p></div>
                </div>
                <div class="card stat-card">
                    <div class="stat-icon blue"><i class="fa-solid fa-users"></i></div>
                    <div class="stat-info"><h3>Total Candidates</h3><p>${totalCandidates}</p></div>
                </div>
                <div class="card stat-card">
                    <div class="stat-icon orange"><i class="fa-solid fa-calendar-day"></i></div>
                    <div class="stat-info"><h3>Active Interviews</h3><p>${activeInterviews}</p></div>
                </div>
            </div>
            
            <div class="grid-2 fade-in" style="animation-delay: 0.2s; align-items: start;">
                <div class="table-container">
                    <div class="table-header">
                        <h2 class="table-title">Job Postings</h2>
                    </div>
                    <table>
                        <thead><tr><th>Job Title</th><th>Department</th><th>Status</th></tr></thead>
                        <tbody>
                            ${DB.jobs.length > 0 ? DB.jobs.map(j => `
                            <tr>
                                <td><span style="font-weight: 500;">${j.title}</span></td>
                                <td>${j.department}</td>
                                <td><span class="status-badge ${j.status === 'Open' ? 'active' : 'inactive'}">${j.status}</span></td>
                            </tr>`).join('') : '<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">No jobs posted.</td></tr>'}
                        </tbody>
                    </table>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h2 class="table-title">Candidate Pipeline</h2>
                    </div>
                    <table>
                        <thead><tr><th>Candidate</th><th>Job Applied</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            ${DB.candidates.length > 0 ? DB.candidates.map(c => `
                            <tr>
                                <td>
                                    <div style="font-weight: 500;">${c.name}</div>
                                    <div style="font-size: 11px; color:var(--text-muted);">${c.email}</div>
                                </td>
                                <td>${DB.jobs.find(j => j.id === c.jobId)?.title || 'Unknown'}</td>
                                <td><span class="status-badge ${c.status === 'Selected' ? 'active' : (c.status === 'Rejected' ? 'inactive' : 'pending')}">${c.status}</span></td>
                                <td>
                                    <button class="action-btn" style="background:var(--bg-panel); color:var(--primary); font-size:11px; padding:4px 8px; width:auto;" onclick="window.viewCandidate(${c.id})"><i class="fa-solid fa-eye"></i> View</button>
                                </td>
                            </tr>`).join('') : '<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">No candidates found.</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    // 5.75 ONBOARDING
    onboarding: () => {
        let activeOnboards = DB.employees.filter(e => e.onboarding && e.onboarding.status !== 'Completed');
        let completedThisMonth = DB.employees.filter(e => e.onboarding && e.onboarding.status === 'Completed' && new Date(e.joinDate).getMonth() === new Date().getMonth());
        let totalAssets = DB.employees.reduce((sum, e) => sum + (e.onboarding && e.onboarding.assets ? e.onboarding.assets.length : 0), 0);
        
        return `
            <div class="page-header fade-in">
                <div>
                    <h1 class="page-title">Onboarding Tracker</h1>
                    <p class="page-subtitle">Manage new hire checklists and asset assignments.</p>
                </div>
            </div>
            
            <div class="grid-3 fade-in" style="animation-delay: 0.1s; margin-bottom: 24px;">
                <div class="card stat-card">
                    <div class="stat-icon purple"><i class="fa-solid fa-person-walking-arrow-right"></i></div>
                    <div class="stat-info"><h3>Pending Onboards</h3><p>${activeOnboards.length}</p></div>
                </div>
                <div class="card stat-card">
                    <div class="stat-icon green"><i class="fa-solid fa-check-double"></i></div>
                    <div class="stat-info"><h3>Completed (This Month)</h3><p>${completedThisMonth.length}</p></div>
                </div>
                <div class="card stat-card">
                    <div class="stat-icon blue"><i class="fa-solid fa-laptop"></i></div>
                    <div class="stat-info"><h3>Total Assets Assigned</h3><p>${totalAssets}</p></div>
                </div>
            </div>
            
            <div class="table-container fade-in" style="animation-delay: 0.2s;">
                <div class="table-header">
                    <h2 class="table-title">Recent Hires & Onboarding Status</h2>
                </div>
                <table>
                    <thead><tr><th>Employee</th><th>Join Date</th><th>Progress</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        ${activeOnboards.length > 0 ? activeOnboards.map(e => `
                        <tr>
                            <td>
                                <div class="user-cell">
                                    <img src="${e.avatar}" alt="avatar">
                                    <div style="display:flex; flex-direction:column;">
                                        <span class="user-cell-name">${e.name}</span>
                                        <span style="font-size:11px; color:var(--text-muted);">${e.role}</span>
                                    </div>
                                </div>
                            </td>
                            <td>${e.joinDate}</td>
                            <td style="width:200px;">
                                <div style="display:flex; align-items:center; gap:10px;">
                                    <div style="flex:1; height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
                                        <div style="width:${e.onboarding.progress}%; height:100%; background:var(--primary); transition:width 0.3s;"></div>
                                    </div>
                                    <span style="font-size:11px; color:var(--text-muted); min-width:30px;">${e.onboarding.progress}%</span>
                                </div>
                            </td>
                            <td><span class="status-badge ${e.onboarding.status === 'Completed' ? 'active' : (e.onboarding.status === 'In Progress' ? 'pending' : 'inactive')}">${e.onboarding.status}</span></td>
                            <td>
                                <button class="action-btn" style="background:var(--bg-panel); color:var(--primary); font-size:11px; padding:4px 8px; width:auto;" onclick="window.manageOnboarding(${e.id})"><i class="fa-solid fa-tasks"></i> Manage</button>
                            </td>
                        </tr>`).join('') : '<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">No pending onboards.</td></tr>'}
                    </tbody>
                </table>
            </div>
            
            <div class="table-container fade-in" style="animation-delay: 0.3s; margin-top:24px;">
                <div class="table-header">
                    <h2 class="table-title">Recently Completed</h2>
                </div>
                <table>
                    <thead><tr><th>Employee</th><th>Join Date</th><th>Status</th></tr></thead>
                    <tbody>
                        ${completedThisMonth.length > 0 ? completedThisMonth.map(e => `
                        <tr>
                            <td><div class="user-cell"><img src="${e.avatar}"><span class="user-cell-name">${e.name}</span></div></td>
                            <td>${e.joinDate}</td>
                            <td><span class="status-badge active">Completed</span></td>
                        </tr>`).join('') : '<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">No completions this month.</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    },

    // 5.8 PERFORMANCE
    performance: () => {
        let activeReviews = DB.performanceReviews.filter(r => r.status !== 'Completed');
        let avgRating = 0;
        let ratedReviews = DB.performanceReviews.filter(r => r.rating > 0);
        if (ratedReviews.length > 0) {
            avgRating = (ratedReviews.reduce((sum, r) => sum + r.rating, 0) / ratedReviews.length).toFixed(1);
        }
        
        let totalGoals = 0;
        let completedGoals = 0;
        DB.employees.forEach(e => {
            if(e.goals) {
                totalGoals += e.goals.length;
                completedGoals += e.goals.filter(g => g.status === 'Completed').length;
            }
        });

        return `
            <div class="page-header fade-in">
                <div>
                    <h1 class="page-title">Performance Management</h1>
                    <p class="page-subtitle">Track reviews, goals, and feedback.</p>
                </div>
                <div class="header-actions">
                    <button class="primary-btn" onclick="window.startReviewCycle()"><i class="fa-solid fa-play"></i> Start Review</button>
                </div>
            </div>
            
            <div class="grid-3 fade-in" style="animation-delay: 0.1s; margin-bottom: 24px;">
                <div class="card stat-card">
                    <div class="stat-icon purple"><i class="fa-solid fa-comments"></i></div>
                    <div class="stat-info"><h3>Active Reviews</h3><p>${activeReviews.length}</p></div>
                </div>
                <div class="card stat-card">
                    <div class="stat-icon orange"><i class="fa-solid fa-star"></i></div>
                    <div class="stat-info"><h3>Avg Company Rating</h3><p>${avgRating} / 5</p></div>
                </div>
                <div class="card stat-card">
                    <div class="stat-icon green"><i class="fa-solid fa-bullseye"></i></div>
                    <div class="stat-info"><h3>Goals Completed</h3><p>${completedGoals} / ${totalGoals}</p></div>
                </div>
            </div>
            
            <div class="grid-2 fade-in" style="animation-delay: 0.2s; align-items: start;">
                <div class="table-container">
                    <div class="table-header">
                        <h2 class="table-title">Performance Reviews</h2>
                    </div>
                    <table>
                        <thead><tr><th>Employee</th><th>Cycle</th><th>Status</th><th>Rating</th><th>Actions</th></tr></thead>
                        <tbody>
                            ${DB.performanceReviews.length > 0 ? DB.performanceReviews.map(r => {
                                const emp = DB.employees.find(e => e.id === r.empId);
                                if(!emp) return '';
                                return `
                                <tr>
                                    <td><div class="user-cell"><img src="${emp.avatar}"><span class="user-cell-name">${emp.name}</span></div></td>
                                    <td>${r.cycle}</td>
                                    <td><span class="status-badge ${r.status === 'Completed' ? 'active' : 'pending'}">${r.status}</span></td>
                                    <td>${r.rating ? `<span style="color:#f59e0b;"><i class="fa-solid fa-star"></i> ${r.rating}</span>` : '-'}</td>
                                    <td><button class="action-btn" style="background:var(--bg-panel); color:var(--primary); font-size:11px; padding:4px 8px; width:auto;" onclick="window.manageReview(${r.id})">Manage</button></td>
                                </tr>
                                `;
                            }).join('') : '<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">No reviews found.</td></tr>'}
                        </tbody>
                    </table>
                </div>

                <div class="table-container">
                    <div class="table-header">
                        <h2 class="table-title">Employee Goals</h2>
                    </div>
                    <table>
                        <thead><tr><th>Employee</th><th>Active Goals</th><th>Actions</th></tr></thead>
                        <tbody>
                            ${DB.employees.map(e => `
                            <tr>
                                <td><div class="user-cell"><img src="${e.avatar}"><span class="user-cell-name">${e.name}</span></div></td>
                                <td>${e.goals ? e.goals.filter(g => g.status !== 'Completed').length : 0}</td>
                                <td><button class="action-btn" style="background:var(--bg-panel); color:var(--primary); font-size:11px; padding:4px 8px; width:auto;" onclick="window.manageGoals(${e.id})">Goals</button></td>
                            </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    // 6. DOCUMENTS
    documents: () => {
        let allDocs = [];
        let expiries = [];
        const today = new Date();
        
        DB.employees.forEach(emp => {
            if (emp.documents) {
                emp.documents.forEach(doc => {
                    if (doc.expiry && doc.expiry !== 'N/A') {
                        const expiryDate = new Date(doc.expiry);
                        const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                        if (daysLeft < 30) expiries.push({...doc, empName: emp.name, daysLeft});
                    }
                    allDocs.push({...doc, empName: emp.name});
                });
            }
        });

        return `
            <div class="page-header fade-in">
                <div>
                    <h1 class="page-title">Document Hub</h1>
                    <p class="page-subtitle">Manage employee records and compliance.</p>
                </div>
                <div class="header-actions">
                    <button class="primary-btn" onclick="window.uploadDocument()"><i class="fa-solid fa-cloud-arrow-up"></i> Upload Document</button>
                </div>
            </div>
            
            <div class="grid-3 fade-in" style="animation-delay: 0.1s; margin-bottom: 24px;">
                <div class="card stat-card">
                    <div class="stat-icon blue"><i class="fa-solid fa-folder-tree"></i></div>
                    <div class="stat-info"><h3>Total Documents</h3><p>${allDocs.length}</p></div>
                </div>
                <div class="card stat-card">
                    <div class="stat-icon orange"><i class="fa-solid fa-triangle-exclamation"></i></div>
                    <div class="stat-info"><h3>Expiring Soon (30d)</h3><p>${expiries.length}</p></div>
                </div>
                <div class="card stat-card">
                    <div class="stat-icon green"><i class="fa-solid fa-shield-halved"></i></div>
                    <div class="stat-info"><h3>Secure Vaults</h3><p>Active</p></div>
                </div>
            </div>

            ${expiries.length > 0 ? `
            <div class="card fade-in" style="animation-delay: 0.15s; margin-bottom: 24px; border: 1px solid var(--danger);">
                <h3 style="margin-bottom: 16px; font-size: 16px; color: var(--danger);"><i class="fa-solid fa-bell"></i> Expiry Notifications</h3>
                <ul style="list-style: none; padding: 0;">
                    ${expiries.map(e => `
                    <li style="padding: 12px; background: rgba(239, 68, 68, 0.1); border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <span style="font-weight: 600; color: white;">${e.name}</span>
                            <span style="color: var(--text-muted); font-size: 13px; margin-left: 8px;">(${e.empName})</span>
                        </div>
                        <span style="color: var(--danger); font-size: 13px; font-weight: 500;">Expires in ${e.daysLeft} days</span>
                    </li>
                    `).join('')}
                </ul>
            </div>
            ` : ''}

            <div class="table-container fade-in" style="animation-delay: 0.2s;">
                <div class="table-header">
                    <h2 class="table-title">Employee Records</h2>
                </div>
                <table>
                    <thead><tr><th>Employee</th><th>Document</th><th>Category</th><th>Permissions</th><th>Expiry Date</th><th>Actions</th></tr></thead>
                    <tbody>
                        ${allDocs.map(d => `
                        <tr>
                            <td><span style="font-weight: 500;">${d.empName}</span></td>
                            <td><i class="fa-solid fa-file-pdf" style="color:var(--primary); margin-right:8px;"></i> ${d.name}</td>
                            <td><span style="padding: 4px 10px; background: rgba(255,255,255,0.05); border-radius: 4px; font-size: 12px;">${d.category}</span></td>
                            <td><span style="color: var(--text-muted); font-size: 12px;"><i class="fa-solid fa-lock" style="margin-right:4px;"></i> HR, Manager, Emp</span></td>
                            <td>${d.expiry}</td>
                            <td>
                                <button class="action-btn" onclick="Swal.fire({title: '${d.name}', html: '<div style=\\'height: 200px; display:flex; align-items:center; justify-content:center;\\'><i class=\\'fa-solid fa-file-pdf fa-3x\\'></i></div>', background:'#0f172a', color:'white'})"><i class="fa-solid fa-eye"></i></button>
                            </td>
                        </tr>`).join('')}
                        ${allDocs.length === 0 ? '<tr><td colspan="6" style="text-align:center; padding:20px;">No documents found.</td></tr>' : ''}
                    </tbody>
                </table>
            </div>
        `;
    },

    // 6. REPORTS
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
                    <div style="display:flex; gap:10px; justify-content:center;">
                        <button class="btn btn-secondary" onclick="renderReportChart('employee')">Generate Chart</button>
                        <button class="action-btn" style="background:var(--bg-panel); color:var(--primary); padding:4px 8px; width:auto;" onclick="window.exportCSV('employee')"><i class="fa-solid fa-download"></i> CSV</button>
                    </div>
                </div>
                <div class="card" style="text-align: center;">
                    <i class="fa-solid fa-chart-line" style="font-size: 48px; color: var(--secondary); margin-bottom: 16px;"></i>
                    <h3 style="margin-bottom: 8px;">Attendance Trends</h3>
                    <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">Monthly clock-in and overtime data.</p>
                    <div style="display:flex; gap:10px; justify-content:center;">
                        <button class="btn btn-secondary" onclick="renderReportChart('attendance')">Generate Chart</button>
                        <button class="action-btn" style="background:var(--bg-panel); color:var(--primary); padding:4px 8px; width:auto;" onclick="window.exportCSV('attendance')"><i class="fa-solid fa-download"></i> CSV</button>
                    </div>
                </div>
                <div class="card" style="text-align: center;">
                    <i class="fa-solid fa-chart-column" style="font-size: 48px; color: var(--success); margin-bottom: 16px;"></i>
                    <h3 style="margin-bottom: 8px;">Leave Utilization</h3>
                    <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">Historical leave balances and usage.</p>
                    <div style="display:flex; gap:10px; justify-content:center;">
                        <button class="btn btn-secondary" onclick="renderReportChart('leave')">Generate Chart</button>
                        <button class="action-btn" style="background:var(--bg-panel); color:var(--primary); padding:4px 8px; width:auto;" onclick="window.exportCSV('leave')"><i class="fa-solid fa-download"></i> CSV</button>
                    </div>
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



    // 8. SETTINGS
    settings: () => {
        return `
            <div class="page-header fade-in">
                <div>
                    <h1 class="page-title">HR Settings & Integrations</h1>
                    <p class="page-subtitle">Configure platform preferences and third-party tools.</p>
                </div>
                <button class="primary-btn" onclick="Swal.fire({title: 'Settings Saved', icon: 'success', timer: 2000, showConfirmButton: false, background: '#0f172a', color: 'white'})"><i class="fa-solid fa-floppy-disk"></i> Save Changes</button>
            </div>
            
            <div class="grid-2 fade-in" style="animation-delay: 0.1s; align-items: start;">
                <div class="card">
                    <h3 style="margin-bottom: 20px; font-size: 16px;"><i class="fa-solid fa-building" style="color:var(--primary); margin-right:8px;"></i> General Preferences</h3>
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

                <div class="card">
                    <h3 style="margin-bottom: 20px; font-size: 16px;"><i class="fa-solid fa-plug" style="color:var(--success); margin-right:8px;"></i> Active Integrations</h3>
                    
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:16px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:8px; margin-bottom:12px;">
                        <div style="display:flex; align-items:center; gap:16px;">
                            <i class="fa-brands fa-slack" style="font-size:32px; color:#E01E5A;"></i>
                            <div><div style="font-weight:600; color:white;">Slack API</div><div style="font-size:12px; color:var(--text-muted);">Syncs leave status to Slack profile</div></div>
                        </div>
                        <div class="toggle-switch active"></div>
                    </div>
                    
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:16px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:8px; margin-bottom:12px;">
                        <div style="display:flex; align-items:center; gap:16px;">
                            <i class="fa-brands fa-google" style="font-size:32px; color:#f59e0b;"></i>
                            <div><div style="font-weight:600; color:white;">Google Workspace</div><div style="font-size:12px; color:var(--text-muted);">Automated GSuite account provisioning</div></div>
                        </div>
                        <div class="toggle-switch"></div>
                    </div>
                    
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:16px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:8px;">
                        <div style="display:flex; align-items:center; gap:16px;">
                            <i class="fa-solid fa-money-check-dollar" style="font-size:32px; color:#10b981;"></i>
                            <div><div style="font-weight:600; color:white;">Gusto Payroll</div><div style="font-size:12px; color:var(--text-muted);">Export attendance & timesheets</div></div>
                        </div>
                        <div class="toggle-switch active"></div>
                    </div>
                    
                    <h3 style="margin-top: 32px; margin-bottom: 20px; font-size: 16px;"><i class="fa-solid fa-shield-halved" style="color:var(--secondary); margin-right:8px;"></i> Role Permissions Architecture</h3>
                    <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">Manage granular access control.</p>
                    <button class="btn btn-secondary" style="width: 100%; justify-content:center;" onclick="Swal.fire({title:'Permission Matrix', html:'<div style=\\'text-align:left; color:#94a3b8; font-size:14px;\\'>Admin: Full Access<br>HR: View/Edit All<br>Manager: View/Edit Team<br>Employee: View Own</div>', background:'#0f172a', color:'white'})">View Permission Matrix</button>
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
    const manager = emp.managerId ? DB.employees.find(e => e.id === emp.managerId)?.name : 'None';

    let tabContent = '';
    if (tab === 'overview') {
        tabContent = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; animation: fadeIn 0.3s forwards;">
                <div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                    <p style="color: #94a3b8; font-size: 12px; margin-bottom: 4px;">Email</p>
                    <p style="color: white; font-size: 14px;">${emp.email}</p>
                </div>
                <div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                    <p style="color: #94a3b8; font-size: 12px; margin-bottom: 4px;">Join Date</p>
                    <p style="color: white; font-size: 14px;">${emp.joinDate}</p>
                </div>
                <div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                    <p style="color: #94a3b8; font-size: 12px; margin-bottom: 4px;">Reporting To</p>
                    <p style="color: white; font-size: 14px;">${manager}</p>
                </div>
                <div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                    <p style="color: #94a3b8; font-size: 12px; margin-bottom: 4px;">Tags</p>
                    <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                        ${(emp.tags && emp.tags.length > 0) ? emp.tags.map(t => `<span style="background: var(--primary); padding: 2px 8px; border-radius: 12px; font-size: 11px; color: white;">${t}</span>`).join('') : '<span style="color: #64748b; font-size: 13px;">No tags</span>'}
                    </div>
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
                ${(emp.documents && emp.documents.length > 0) ? emp.documents.map(d => `<button class="btn btn-secondary" onclick="Swal.fire({title: '${d.name}', html: '<div style=\'height: 300px; display:flex; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8;\'><i class=\'fa-solid fa-file-pdf fa-3x\'></i></div>'})"><i class="fa-solid fa-file-pdf"></i> ${d.name}</button>`).join('') : '<p style="color: #94a3b8; font-size: 14px;">No documents.</p>'}
            </div>
        `;
    } else if (tab === 'timeline') {
        tabContent = `
            <div style="animation: fadeIn 0.3s forwards; padding-top: 8px;">
                <h3 style="color: white; font-size: 16px; margin-bottom: 16px;">Career Timeline</h3>
                <div class="timeline" style="margin-bottom: 32px;">
                    ${emp.timeline.map(t => `
                        <div class="timeline-item">
                            <h4 style="font-size: 15px; color: white; margin-bottom: 2px;">${t.event}</h4>
                            <p style="font-size: 13px; color: var(--text-muted);">${t.date}</p>
                        </div>
                    `).join('')}
                </div>
                
                <h3 style="color: white; font-size: 16px; margin-bottom: 16px;">Recent Activity</h3>
                <div class="timeline">
                    ${emp.activityHistory && emp.activityHistory.length > 0 ? emp.activityHistory.map(a => `
                        <div class="timeline-item" style="border-left-color: var(--secondary);">
                            <h4 style="font-size: 14px; color: var(--text-main); margin-bottom: 2px;">${a.action}</h4>
                            <p style="font-size: 12px; color: var(--text-muted);">${a.date}</p>
                        </div>
                    `).join('') : '<p style="color: #94a3b8; font-size: 14px;">No recent activity.</p>'}
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
    } else if (tab === 'actions') {
        tabContent = `
            <div style="animation: fadeIn 0.3s forwards; padding-top: 8px;">
                <h3 style="color: white; font-size: 16px; margin-bottom: 16px;">HR Workflows</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <button class="btn btn-secondary" onclick="window.triggerWorkflow(${id}, 'promote')" style="justify-content: flex-start;"><i class="fa-solid fa-arrow-up-right-dots" style="width:20px; color: #10b981;"></i> Promote Employee</button>
                    <button class="btn btn-secondary" onclick="window.triggerWorkflow(${id}, 'transfer')" style="justify-content: flex-start;"><i class="fa-solid fa-right-left" style="width:20px; color: #3b82f6;"></i> Transfer Department</button>
                    <button class="btn btn-secondary" onclick="window.triggerWorkflow(${id}, 'manager')" style="justify-content: flex-start;"><i class="fa-solid fa-user-tie" style="width:20px; color: #f59e0b;"></i> Reassign Manager</button>
                    <button class="btn btn-secondary" onclick="window.triggerWorkflow(${id}, 'resign')" style="justify-content: flex-start;"><i class="fa-solid fa-door-open" style="width:20px; color: #ef4444;"></i> Process Resignation</button>
                </div>
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
                    <button style="color: ${tab === 'actions' ? 'var(--primary)' : 'var(--text-muted)'}; font-weight: 600; font-size: 15px; background: none; border: none; cursor: pointer; border-bottom: ${tab === 'actions' ? '2px solid var(--primary)' : '2px solid transparent'}; padding-bottom: 6px;" onclick="viewEmployeeProfile(${id}, 'actions')">Actions</button>
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

window.triggerWorkflow = function(id, type) {
    const emp = DB.employees.find(e => e.id === id);
    if (!emp) return;

    let title = '';
    let html = '';
    let confirmBtn = '';
    
    if (type === 'promote') {
        title = 'Promote Employee';
        html = '<input id="wf-input" class="form-control" placeholder="New Role Title">';
        confirmBtn = 'Confirm Promotion';
    } else if (type === 'transfer') {
        title = 'Transfer Department';
        html = '<select id="wf-input" class="form-control"><option>Engineering</option><option>Product</option><option>HR</option><option>Marketing</option><option>Design</option></select>';
        confirmBtn = 'Confirm Transfer';
    } else if (type === 'manager') {
        title = 'Reassign Manager';
        html = '<select id="wf-input" class="form-control">' + DB.employees.filter(e => e.id !== id).map(e => `<option value="${e.id}">${e.name} (${e.role})</option>`).join('') + '</select>';
        confirmBtn = 'Reassign';
    } else if (type === 'resign') {
        title = 'Process Resignation';
        html = '<input id="wf-input" type="date" class="form-control" placeholder="Last Working Day">';
        confirmBtn = 'Initiate Offboarding';
    }

    Swal.fire({
        title: title,
        html: html,
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: confirmBtn, confirmButtonColor: '#8b5cf6',
        preConfirm: () => document.getElementById('wf-input').value
    }).then(res => {
        if (res.isConfirmed) {
            const dateStr = new Date().toISOString().split('T')[0];
            if (type === 'promote') {
                emp.role = res.value;
                emp.timeline.push({ date: dateStr, event: `Promoted to ${res.value}` });
            } else if (type === 'transfer') {
                emp.department = res.value;
                emp.timeline.push({ date: dateStr, event: `Transferred to ${res.value}` });
            } else if (type === 'manager') {
                emp.managerId = parseInt(res.value);
                const mName = DB.employees.find(e => e.id === emp.managerId)?.name;
                emp.timeline.push({ date: dateStr, event: `Manager reassigned to ${mName}` });
            } else if (type === 'resign') {
                emp.status = 'Resigned';
                emp.timeline.push({ date: dateStr, event: `Resignation initiated. Last day: ${res.value}` });
            }
            saveDB();
            renderView('employees');
            Swal.fire({ title: 'Success', icon: 'success', background: '#0f172a', color: 'white', showConfirmButton: false, timer: 2000 });
        }
    });
};

// Attendance Workflow
window.clockIn = function() {
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    localStorage.setItem('MyHRTool_ClockedIn', 'true');
    localStorage.setItem('MyHRTool_ClockTime', time);
    localStorage.setItem('MyHRTool_TotalBreakMinutes', '0');
    
    // Add to DB
    const emp = DB.employees[0];
    const isLate = parseInt(time.split(':')[0]) >= 9 && parseInt(time.split(':')[1]) > 15 && time.includes('AM');
    
    DB.attendance.unshift({
        empId: emp.id, name: emp.name, avatar: emp.avatar,
        clockIn: time, clockOut: '--:--', hours: '--', breakTime: '0m',
        source: 'Web', location: 'Office IP',
        status: isLate ? 'Late Arrival' : 'Present'
    });
    saveDB();
    renderView('attendance');
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Clocked In', showConfirmButton: false, timer: 2000, background: 'var(--bg-panel)', color: 'white' });
};

window.startBreak = function() {
    localStorage.setItem('MyHRTool_OnBreak', 'true');
    localStorage.setItem('MyHRTool_BreakStartTime', new Date().getTime().toString());
    renderView('attendance');
    Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: 'Break Started', showConfirmButton: false, timer: 2000, background: 'var(--bg-panel)', color: 'white' });
};

window.endBreak = function() {
    localStorage.removeItem('MyHRTool_OnBreak');
    const start = parseInt(localStorage.getItem('MyHRTool_BreakStartTime') || '0');
    if(start) {
        let currentTotal = parseInt(localStorage.getItem('MyHRTool_TotalBreakMinutes') || '0');
        let sessionMinutes = Math.floor((new Date().getTime() - start) / 60000);
        // For testing/mock purposes, if they end break immediately, let's mock it to 45 mins so they can see the feature working
        if (sessionMinutes === 0) sessionMinutes = 45; 
        
        currentTotal += sessionMinutes;
        localStorage.setItem('MyHRTool_TotalBreakMinutes', currentTotal.toString());
        
        // Update DB
        const log = DB.attendance.find(a => a.empId === DB.employees[0].id && a.clockOut === '--:--');
        if (log) {
            log.breakTime = currentTotal + 'm';
            saveDB();
        }
    }
    renderView('attendance');
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Break Ended', showConfirmButton: false, timer: 2000, background: 'var(--bg-panel)', color: 'white' });
};

window.clockOut = function() {
    const outTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    // Convert a "HH:MM AM/PM" string to Date for diffing
    const parseTime = (tStr) => {
        const [time, modifier] = tStr.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') hours = '00';
        if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
        const d = new Date();
        d.setHours(hours, minutes, 0, 0);
        return d;
    };

    const inStr = localStorage.getItem('MyHRTool_ClockTime');
    let totalMinutes = 0;
    if (inStr) {
        const inD = parseTime(inStr);
        const outD = new Date();
        totalMinutes = Math.floor((outD - inD) / 60000);
        // If testing and clicking out immediately, mock to 8.5 hours (510 mins)
        if (totalMinutes < 5) totalMinutes = 510;
    }
    
    const breakMins = parseInt(localStorage.getItem('MyHRTool_TotalBreakMinutes') || '0');
    const workMins = Math.max(0, totalMinutes - breakMins);
    
    const hrs = Math.floor(workMins / 60);
    const mins = workMins % 60;
    
    localStorage.removeItem('MyHRTool_ClockedIn');
    localStorage.removeItem('MyHRTool_ClockTime');
    localStorage.removeItem('MyHRTool_OnBreak');
    localStorage.removeItem('MyHRTool_BreakStartTime');
    localStorage.removeItem('MyHRTool_TotalBreakMinutes');
    
    const log = DB.attendance.find(a => a.empId === DB.employees[0].id && a.clockOut === '--:--');
    if (log) {
        log.clockOut = outTime;
        log.hours = `${hrs}h ${mins}m`;
        
        // Status calculations based on 8hr work day
        if (hrs < 4) log.status = 'Half-Day';
        else if (hrs < 8) log.status = 'Early Exit';
        else if (hrs >= 9) log.status = 'Overtime';
        else if (log.status !== 'Late Arrival') log.status = 'Present'; // preserve Late Arrival if it was set in clockIn and they hit 8 hrs
        
        saveDB();
    }
    
    renderView('attendance');
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Clocked Out', text: `Session ended at ${outTime}`, showConfirmButton: false, timer: 3000, background: 'var(--bg-panel)', color: 'white' });
};

window.requestCorrection = function(empId, name) {
    Swal.fire({
        title: 'Request Correction',
        html: '<textarea id="corr-reason" class="form-control" style="height:100px; resize:none;" placeholder="Reason for correction (e.g. Forgot to clock out)"></textarea>',
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Submit Request', confirmButtonColor: '#8b5cf6',
        preConfirm: () => document.getElementById('corr-reason').value
    }).then(res => {
        if (res.isConfirmed && res.value) {
            DB.correctionRequests = DB.correctionRequests || [];
            DB.correctionRequests.push({ id: Date.now(), empId, name, reason: res.value, status: 'Pending' });
            saveDB();
            renderView('attendance');
            Swal.fire({ title: 'Submitted', text: 'Manager will review your request.', icon: 'success', background: '#0f172a', color: 'white', showConfirmButton: false, timer: 2000 });
        }
    });
};

window.processCorrection = function(reqId, status) {
    const req = DB.correctionRequests.find(r => r.id === reqId);
    if (req) {
        DB.correctionRequests = DB.correctionRequests.filter(r => r.id !== reqId);
        saveDB();
        renderView('attendance');
        Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Correction Approved', showConfirmButton: false, timer: 2000, background: 'var(--bg-panel)', color: 'white' });
    }
};

// Leave Workflow
window.runLeaveAccrual = function() {
    let accrued = 0;
    DB.employees.forEach(emp => {
        const rate = emp.leaves.accrualRate || 2;
        emp.leaves.total += rate;
        accrued += rate;
    });
    saveDB();
    renderView('leave');
    Swal.fire({ title: 'Accrual Complete', text: `Added ${accrued} total leave days across all employees.`, icon: 'success', background: '#0f172a', color: 'white', confirmButtonColor: '#8b5cf6' });
};

window.processLeave = function(id, role, action) {
    const req = DB.leaveRequests.find(r => r.id === id);
    if (req) {
        if (role === 'Manager') req.managerApproval = action;
        if (role === 'HR') req.hrApproval = action;
        
        if (req.managerApproval === 'Rejected' || req.hrApproval === 'Rejected') {
            req.status = 'Rejected';
        } else if (req.managerApproval === 'Approved' && req.hrApproval === 'Approved') {
            req.status = 'Approved';
            // Complex Leave Balance Calculation Logic
            const emp = DB.employees.find(e => e.id === req.empId);
            if (emp) {
                emp.leaves.used += req.days;
                if (emp.leaves.used > emp.leaves.total) emp.leaves.used = emp.leaves.total;
            }
        }
        
        saveDB();
        renderView('leave'); 
        
        Swal.fire({
            toast: true, position: 'top-end', icon: 'success',
            title: `Request Updated`,
            text: `Leave request for ${req.name} updated by ${role}.`,
            showConfirmButton: false, timer: 2000, background: 'var(--bg-panel)', color: 'white'
        });
    }
};

window.uploadDocument = function() {
    Swal.fire({
        title: 'Upload Document',
        html: `
            <select id="doc-emp" class="form-control" style="margin-bottom: 12px;">
                ${DB.employees.map(e => `<option value="${e.id}">${e.name}</option>`).join('')}
            </select>
            <input id="doc-name" class="form-control" placeholder="Document Name (e.g. ID Scan.jpg)" style="margin-bottom: 12px;">
            <select id="doc-category" class="form-control" style="margin-bottom: 12px;">
                <option>Contract</option><option>ID Verification</option><option>Performance</option><option>Policy</option>
            </select>
            <input id="doc-expiry" type="date" class="form-control" placeholder="Expiry Date">
        `,
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Upload', confirmButtonColor: '#8b5cf6',
        preConfirm: () => {
            return {
                empId: document.getElementById('doc-emp').value,
                name: document.getElementById('doc-name').value,
                category: document.getElementById('doc-category').value,
                expiry: document.getElementById('doc-expiry').value || 'N/A'
            };
        }
    }).then(res => {
        if (res.isConfirmed && res.value.name) {
            const emp = DB.employees.find(e => e.id == res.value.empId);
            if (emp) {
                emp.documents = emp.documents || [];
                emp.documents.push({ id: Date.now(), ...res.value });
                saveDB();
                renderView('documents');
                Swal.fire({ title: 'Uploaded!', icon: 'success', showConfirmButton: false, timer: 1500, background: '#0f172a', color: 'white' });
            }
        }
    });
};

// Add Employee Validation Workflow
window.showAddEmployeeModal = function(emp = null) {
    const isEdit = !!emp;
    Swal.fire({
        title: isEdit ? 'Edit Employee' : 'Add New Employee',
        background: '#0f172a',
        color: 'white',
        width: '600px',
        html: `
            <div style="text-align: left; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div style="grid-column: span 2; margin-bottom: 8px;">
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Profile Picture</label>
                    <input id="emp-avatar" type="file" accept="image/*" class="form-control" onchange="
                        const file = this.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = e => window.tempEmpAvatar = e.target.result;
                            reader.readAsDataURL(file);
                        }
                    ">
                </div>
                <div>
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Full Name *</label>
                    <input id="emp-name" class="form-control" placeholder="e.g. Alice Wonderland" value="${isEdit ? emp.name : ''}">
                </div>
                <div>
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Email *</label>
                    <input id="emp-email" type="email" class="form-control" placeholder="e.g. alice@myhrtool.com" value="${isEdit ? emp.email : ''}">
                </div>
                <div>
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Phone</label>
                    <input id="emp-phone" class="form-control" placeholder="+1 555-0000" value="${isEdit ? (emp.phone || '') : ''}">
                </div>
                <div>
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Emergency Contact</label>
                    <input id="emp-emergency" class="form-control" placeholder="Name (Phone)" value="${isEdit ? (emp.emergencyContact || '') : ''}">
                </div>
                <div style="grid-column: span 2;">
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Address</label>
                    <input id="emp-address" class="form-control" placeholder="123 Main St, City, ST" value="${isEdit ? (emp.address || '') : ''}">
                </div>
                <div>
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Date of Birth</label>
                    <input id="emp-dob" type="date" class="form-control" value="${isEdit ? (emp.dob || '') : ''}">
                </div>
                <div>
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Department</label>
                    <select id="emp-dept" class="form-control">
                        ${['Engineering','Product','HR','Marketing','Design'].map(d => `<option ${isEdit && emp.department === d ? 'selected' : ''}>${d}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Designation</label>
                    <input id="emp-role" class="form-control" placeholder="e.g. Software Engineer" value="${isEdit ? emp.role : ''}">
                </div>
                <div>
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Employment Type</label>
                    <select id="emp-type" class="form-control">
                        ${['Full-Time','Part-Time','Contract','Intern'].map(t => `<option ${isEdit && emp.employmentType === t ? 'selected' : ''}>${t}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Status</label>
                    <select id="emp-status" class="form-control">
                        ${['Active','On Leave','Resigned','Terminated'].map(s => `<option ${isEdit && emp.status === s ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label style="color: #94a3b8; font-size: 13px; margin-bottom: 6px; display: block;">Work Location</label>
                    <input id="emp-location" class="form-control" placeholder="e.g. New York, NY" value="${isEdit ? (emp.location || '') : ''}">
                </div>
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: isEdit ? 'Update Employee' : 'Save Employee',
        confirmButtonColor: '#8b5cf6',
        didOpen: () => { window.tempEmpAvatar = null; },
        preConfirm: () => {
            const name = document.getElementById('emp-name').value.trim();
            const email = document.getElementById('emp-email').value.trim();
            if (!name) { Swal.showValidationMessage('Error: Name is required'); return false; }
            if (!email || !email.includes('@')) { Swal.showValidationMessage('Error: Valid email is required'); return false; }
            
            return {
                name, email,
                phone: document.getElementById('emp-phone').value,
                emergencyContact: document.getElementById('emp-emergency').value,
                address: document.getElementById('emp-address').value,
                dob: document.getElementById('emp-dob').value,
                department: document.getElementById('emp-dept').value,
                role: document.getElementById('emp-role').value,
                employmentType: document.getElementById('emp-type').value,
                status: document.getElementById('emp-status').value,
                location: document.getElementById('emp-location').value,
                avatar: window.tempEmpAvatar || (isEdit ? emp.avatar : `https://i.pravatar.cc/150?u=${DB.employees.length + 1}`)
            };
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            const val = result.value;
            try {
                if (isEdit) {
                    const res = await fetch(`http://localhost:3000/api/employees/${emp.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(val)
                    });
                    const updatedEmp = await res.json();
                    Object.assign(emp, updatedEmp);
                    if(!emp.timeline) emp.timeline = [];
                    emp.timeline.unshift({date: new Date().toISOString().split('T')[0], event: 'Profile Updated'});
                } else {
                    const newEmpPayload = {
                        joinDate: new Date().toISOString().split('T')[0],
                        leaves: { total: 24, used: 0, accrualRate: 2 },
                        notes: '', timeline: [{date: new Date().toISOString().split('T')[0], event: 'Joined Company'}],
                        activityHistory: [], attendanceSettings: { checkInTime: '09:00', checkOutTime: '17:00' }, integrations: {},
                        ...val
                    };
                    const res = await fetch(`http://localhost:3000/api/employees`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newEmpPayload)
                    });
                    const newEmp = await res.json();
                    DB.employees.push(newEmp);
                }
                saveDB();
                if (typeof currentView !== 'undefined' && currentView === 'employeeProfile' && isEdit) {
                    viewEmployeeProfile(emp.id);
                } else {
                    renderView('employees');
                }
                Swal.fire({ title: 'Success!', text: isEdit ? 'Employee updated.' : 'Employee added.', icon: 'success', background: '#0f172a', color: 'white', confirmButtonColor: '#8b5cf6' });
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Failed to save to backend API.', 'error');
            }
        }
    });
};

window.editEmployee = function(id) {
    const emp = DB.employees.find(e => e.id === id);
    if (emp) showAddEmployeeModal(emp);
};

window.importEmployees = function() {
    Swal.fire({
        title: 'Import Employees',
        html: '<div style="text-align:left; color:#94a3b8; font-size:14px;"><p style="margin-bottom:12px;">Upload a CSV or Excel file to bulk import employees.</p><input type="file" accept=".csv, .xlsx" class="form-control"></div>',
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Import', confirmButtonColor: '#8b5cf6',
    }).then(result => {
        if (result.isConfirmed) {
            Swal.fire({ title: 'Importing...', html: 'Processing file data.', timer: 1500, showConfirmButton: false, background: '#0f172a', color: 'white' }).then(() => {
                Swal.fire({ title: 'Success', text: 'Imported new employees successfully.', icon: 'success', background: '#0f172a', color: 'white', confirmButtonColor: '#8b5cf6' });
            });
        }
    });
};

window.viewEmployeeProfile = function(id) {
    const emp = DB.employees.find(e => e.id === id);
    if (!emp) return;
    
    const container = document.getElementById('view-container');
    container.innerHTML = `
        <div class="page-header fade-in">
            <div>
                <button class="btn btn-secondary" style="margin-bottom: 12px; padding: 6px 12px; font-size: 13px;" onclick="renderView('employees')"><i class="fa-solid fa-arrow-left"></i> Back to Directory</button>
                <h1 class="page-title">Employee Profile</h1>
                <p class="page-subtitle">Detailed information for ${emp.name}.</p>
            </div>
            <div class="header-actions">
                <button class="btn btn-secondary" onclick="editEmployee(${emp.id})"><i class="fa-solid fa-pen"></i> Edit Profile</button>
            </div>
        </div>
        
        <div class="grid-3 fade-in" style="animation-delay: 0.1s; margin-bottom: 24px;">
            <div class="card" style="text-align: center; padding: 32px 20px;">
                <img src="${emp.avatar}" style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid var(--primary); margin-bottom: 16px; box-shadow: 0 10px 20px rgba(0,0,0,0.3);">
                <h2 style="font-size: 24px; margin-bottom: 4px;">${emp.name}</h2>
                <p style="color: var(--primary); font-weight: 500; font-size: 15px; margin-bottom: 12px;">${emp.role}</p>
                <div style="margin-bottom: 16px;"><span class="status-badge ${emp.status === 'Active' ? 'active' : 'pending'}">${emp.status}</span></div>
                <p style="color: var(--text-muted); font-size: 13px;"><i class="fa-solid fa-envelope" style="margin-right:6px;"></i>${emp.email}</p>
                <p style="color: var(--text-muted); font-size: 13px; margin-top:6px;"><i class="fa-solid fa-phone" style="margin-right:6px;"></i>${emp.phone || 'N/A'}</p>
            </div>
            
            <div class="card col-span-2">
                <h3 style="margin-bottom: 20px; font-size: 16px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">Employment Details</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div><span style="color: var(--text-muted); font-size: 12px; display: block;">Employee ID</span><strong style="font-size: 15px;">EMP-${emp.id.toString().padStart(4, '0')}</strong></div>
                    <div><span style="color: var(--text-muted); font-size: 12px; display: block;">Department</span><strong style="font-size: 15px;">${emp.department}</strong></div>
                    <div><span style="color: var(--text-muted); font-size: 12px; display: block;">Employment Type</span><strong style="font-size: 15px;">${emp.employmentType || 'N/A'}</strong></div>
                    <div><span style="color: var(--text-muted); font-size: 12px; display: block;">Joining Date</span><strong style="font-size: 15px;">${emp.joinDate}</strong></div>
                    <div><span style="color: var(--text-muted); font-size: 12px; display: block;">Work Location</span><strong style="font-size: 15px;">${emp.location || 'N/A'}</strong></div>
                    <div><span style="color: var(--text-muted); font-size: 12px; display: block;">Reporting Manager</span><strong style="font-size: 15px;">${emp.managerId ? DB.employees.find(e=>e.id===emp.managerId)?.name : 'None'}</strong></div>
                </div>
                
                <h3 style="margin-top: 30px; margin-bottom: 20px; font-size: 16px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">Personal Details</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div><span style="color: var(--text-muted); font-size: 12px; display: block;">Date of Birth</span><strong style="font-size: 15px;">${emp.dob || 'N/A'}</strong></div>
                    <div><span style="color: var(--text-muted); font-size: 12px; display: block;">Emergency Contact</span><strong style="font-size: 15px;">${emp.emergencyContact || 'N/A'}</strong></div>
                    <div style="grid-column: span 2;"><span style="color: var(--text-muted); font-size: 12px; display: block;">Address</span><strong style="font-size: 15px;">${emp.address || 'N/A'}</strong></div>
                </div>
            </div>
        </div>
    `;
    currentView = 'employeeProfile';
};

window.filterEmployees = function() {
    const searchVal = document.getElementById('empSearch')?.value.toLowerCase() || '';
    const deptVal = document.getElementById('deptFilter')?.value || 'all';
    const statusVal = document.getElementById('statusFilter')?.value || 'all';
    const typeVal = document.getElementById('typeFilter')?.value || 'all';
    
    document.querySelectorAll('.emp-card, .emp-row').forEach(el => {
        const empName = el.getAttribute('data-name') || '';
        const empDept = el.getAttribute('data-dept') || '';
        const empStatus = el.getAttribute('data-status') || '';
        const empType = el.getAttribute('data-type') || '';
        
        const matchSearch = empName.includes(searchVal);
        const matchDept = deptVal === 'all' || empDept === deptVal;
        const matchStatus = statusVal === 'all' || empStatus === statusVal;
        const matchType = typeVal === 'all' || empType === typeVal;
        
        if (matchSearch && matchDept && matchStatus && matchType) {
            el.style.display = '';
        } else {
            el.style.display = 'none';
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
        csv = 'ID,Name,Role,Department,Employment Type,Email,Phone,Emergency Contact,Address,DOB,Location,Status,Join Date,Total Leaves,Used Leaves\n';
        DB.employees.forEach(e => csv += `${e.id},"${e.name}","${e.role}","${e.department}","${e.employmentType || ''}","${e.email}","${e.phone || ''}","${e.emergencyContact || ''}","${e.address || ''}","${e.dob || ''}","${e.location || ''}","${e.status}","${e.joinDate}",${e.leaves.total},${e.leaves.used}\n`);
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
document.addEventListener('DOMContentLoaded', async () => {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => { e.preventDefault(); renderView(item.dataset.target); });
    });
    
    try {
        const response = await fetch(`${API_URL}/db`);
        if (response.ok) {
            const data = await response.json();
            // Merge with default/local fields in case structure differs
            DB = { ...defaultDB, ...data };
            window.isBackendConnected = true;
            localStorage.setItem('MyHRTool_DB', JSON.stringify(DB));
            console.log("Successfully connected to PostgreSQL backend and loaded state.");
        } else {
            throw new Error('Database response not OK');
        }
    } catch (err) {
        console.warn('Failed to load database from PostgreSQL backend, using local storage fallback.', err);
        window.isBackendConnected = false;
        DB = localStorage.getItem('MyHRTool_DB') ? JSON.parse(localStorage.getItem('MyHRTool_DB')) : defaultDB;
    }
    
    updateConnectionStatusBadge();
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

window.renderReportChart = function(type) {
    const container = document.getElementById('report-view-container');
    if (!container) return;
    
    container.innerHTML = '<div style="width: 100%; height: 100%; padding: 20px;"><canvas id="dynamicReportChart"></canvas></div>';
    const ctx = document.getElementById('dynamicReportChart').getContext('2d');
    
    // Destroy previous chart instance if exists
    if (window.currentReportChart) {
        window.currentReportChart.destroy();
    }
    
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Outfit', sans-serif";

    let config = {};

    if (type === 'employee') {
        const depts = {};
        DB.employees.forEach(e => { depts[e.department] = (depts[e.department] || 0) + 1; });
        config = {
            type: 'doughnut',
            data: {
                labels: Object.keys(depts),
                datasets: [{
                    data: Object.values(depts),
                    backgroundColor: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
                    borderWidth: 0
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' }, title: { display: true, text: 'Headcount by Department', color: 'white', font: { size: 16 } } } }
        };
    } else if (type === 'attendance') {
        config = {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    label: 'On-Time (%)',
                    data: [95, 92, 88, 96, 90],
                    backgroundColor: '#3b82f6',
                    borderRadius: 4
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Weekly Attendance Trends', color: 'white', font: { size: 16 } } } }
        };
    } else if (type === 'leave') {
        const leaveData = { total: 0, used: 0 };
        DB.employees.forEach(e => { leaveData.total += e.leaves.total; leaveData.used += e.leaves.used; });
        config = {
            type: 'pie',
            data: {
                labels: ['Used Leaves', 'Remaining Leaves'],
                datasets: [{
                    data: [leaveData.used, leaveData.total - leaveData.used],
                    backgroundColor: ['#f59e0b', '#10b981'],
                    borderWidth: 0
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Overall Leave Utilization', color: 'white', font: { size: 16 } } } }
        };
    }

    window.currentReportChart = new Chart(ctx, config);
};

// --- Organization Functions ---
window.generateOrgChartHTML = function() {
    const buildNode = (managerId) => {
        const children = DB.employees.filter(e => e.managerId === managerId);
        if (children.length === 0) return '';
        
        let html = `<div style="display:flex; gap:20px; justify-content:center; position:relative; margin-top:20px; padding-top:20px;">`;
        if (children.length > 1) {
            html += `<div style="position:absolute; top:0; left:25%; right:25%; height:2px; background:var(--primary);"></div>`;
        }
        
        children.forEach(c => {
            html += `
                <div style="position:relative; text-align:center;">
                    <div style="position:absolute; top:0; left:50%; width:2px; height:20px; background:var(--primary); transform:translateY(-100%);"></div>
                    <div class="hierarchy-node" style="display:inline-block; margin-bottom: 0;">
                        <img src="${c.avatar}">
                        <h4 style="font-size:14px; margin:4px 0;">${c.name}</h4>
                        <p style="font-size:11px;">${c.role}</p>
                    </div>
                    ${buildNode(c.id)}
                </div>
            `;
        });
        html += `</div>`;
        return html;
    };

    const tops = DB.employees.filter(e => !e.managerId);
    if (tops.length === 0) return '<p style="color:var(--text-muted); text-align:center;">No reporting structure defined. Assign managers in employee profiles.</p>';

    let html = `<div style="text-align:center; white-space:nowrap; padding-bottom: 20px;">`;
    tops.forEach(t => {
        html += `
            <div style="display:inline-block; margin:0 20px; vertical-align: top;">
                <div class="hierarchy-node" style="display:inline-block; margin-bottom: 0;">
                    <img src="${t.avatar}">
                    <h4 style="font-size:14px; margin:4px 0;">${t.name}</h4>
                    <p style="font-size:11px;">${t.role}</p>
                </div>
                ${buildNode(t.id)}
            </div>
        `;
    });
    html += `</div>`;
    return html;
};

window.addDepartment = function() {
    Swal.fire({
        title: 'Add Department',
        input: 'text',
        inputPlaceholder: 'e.g. Research & Development',
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Add', confirmButtonColor: '#8b5cf6',
    }).then(res => {
        if (res.isConfirmed && res.value) {
            DB.organization.departments.push(res.value);
            saveDB(); renderView('organization');
        }
    });
};

window.addLocation = function() {
    Swal.fire({
        title: 'Add Location',
        input: 'text',
        inputPlaceholder: 'e.g. Seattle, WA',
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Add', confirmButtonColor: '#8b5cf6',
    }).then(res => {
        if (res.isConfirmed && res.value) {
            DB.organization.locations.push(res.value);
            saveDB(); renderView('organization');
        }
    });
};

window.addDesignation = function() {
    Swal.fire({
        title: 'Add Designation',
        input: 'text',
        inputPlaceholder: 'e.g. QA Tester',
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Add', confirmButtonColor: '#8b5cf6',
    }).then(res => {
        if (res.isConfirmed && res.value) {
            DB.organization.designations.push(res.value);
            saveDB(); renderView('organization');
        }
    });
};

window.addTeam = function() {
    Swal.fire({
        title: 'Create Team',
        html: `
            <input id="swal-team-name" class="form-control" placeholder="Team Name (e.g. Project Alpha)" style="margin-bottom:12px;">
            <select id="swal-team-lead" class="form-control">
                <option value="">Select Team Lead...</option>
                ${DB.employees.map(e => `<option value="${e.id}">${e.name}</option>`).join('')}
            </select>
        `,
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Create', confirmButtonColor: '#8b5cf6',
        preConfirm: () => {
            const name = document.getElementById('swal-team-name').value;
            const leadId = document.getElementById('swal-team-lead').value;
            if(!name) { Swal.showValidationMessage('Team name is required'); return false; }
            return { name, leadId: leadId ? parseInt(leadId) : null };
        }
    }).then(res => {
        if (res.isConfirmed) {
            DB.organization.teams.push({
                id: Date.now(),
                name: res.value.name,
                leadId: res.value.leadId
            });
            saveDB(); renderView('organization');
        }
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

window.renderReportChart = function(type) {
    const container = document.getElementById('report-view-container');
    if (!container) return;
    
    container.innerHTML = '<div style="width: 100%; height: 100%; padding: 20px;"><canvas id="dynamicReportChart"></canvas></div>';
    const ctx = document.getElementById('dynamicReportChart').getContext('2d');
    
    // Destroy previous chart instance if exists
    if (window.currentReportChart) {
        window.currentReportChart.destroy();
    }
    
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Outfit', sans-serif";

    let config = {};

    if (type === 'employee') {
        const depts = {};
        DB.employees.forEach(e => { depts[e.department] = (depts[e.department] || 0) + 1; });
        config = {
            type: 'doughnut',
            data: {
                labels: Object.keys(depts),
                datasets: [{
                    data: Object.values(depts),
                    backgroundColor: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
                    borderWidth: 0
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' }, title: { display: true, text: 'Headcount by Department', color: 'white', font: { size: 16 } } } }
        };
    } else if (type === 'attendance') {
        config = {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    label: 'On-Time (%)',
                    data: [95, 92, 88, 96, 90],
                    backgroundColor: '#3b82f6',
                    borderRadius: 4
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Weekly Attendance Trends', color: 'white', font: { size: 16 } } } }
        };
    } else if (type === 'leave') {
        const leaveData = { total: 0, used: 0 };
        DB.employees.forEach(e => { leaveData.total += e.leaves.total; leaveData.used += e.leaves.used; });
        config = {
            type: 'pie',
            data: {
                labels: ['Used Leaves', 'Remaining Leaves'],
                datasets: [{
                    data: [leaveData.used, leaveData.total - leaveData.used],
                    backgroundColor: ['#f59e0b', '#10b981'],
                    borderWidth: 0
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Overall Leave Utilization', color: 'white', font: { size: 16 } } } }
        };
    }

    window.currentReportChart = new Chart(ctx, config);
};

// --- Organization Functions ---
window.generateOrgChartHTML = function() {
    const buildNode = (managerId) => {
        const children = DB.employees.filter(e => e.managerId === managerId);
        if (children.length === 0) return '';
        
        let html = `<div style="display:flex; gap:20px; justify-content:center; position:relative; margin-top:20px; padding-top:20px;">`;
        if (children.length > 1) {
            html += `<div style="position:absolute; top:0; left:25%; right:25%; height:2px; background:var(--primary);"></div>`;
        }
        
        children.forEach(c => {
            html += `
                <div style="position:relative; text-align:center;">
                    <div style="position:absolute; top:0; left:50%; width:2px; height:20px; background:var(--primary); transform:translateY(-100%);"></div>
                    <div class="hierarchy-node" style="display:inline-block; margin-bottom: 0;">
                        <img src="${c.avatar}">
                        <h4 style="font-size:14px; margin:4px 0;">${c.name}</h4>
                        <p style="font-size:11px;">${c.role}</p>
                    </div>
                    ${buildNode(c.id)}
                </div>
            `;
        });
        html += `</div>`;
        return html;
    };

    const tops = DB.employees.filter(e => !e.managerId);
    if (tops.length === 0) return '<p style="color:var(--text-muted); text-align:center;">No reporting structure defined. Assign managers in employee profiles.</p>';

    let html = `<div style="text-align:center; white-space:nowrap; padding-bottom: 20px;">`;
    tops.forEach(t => {
        html += `
            <div style="display:inline-block; margin:0 20px; vertical-align: top;">
                <div class="hierarchy-node" style="display:inline-block; margin-bottom: 0;">
                    <img src="${t.avatar}">
                    <h4 style="font-size:14px; margin:4px 0;">${t.name}</h4>
                    <p style="font-size:11px;">${t.role}</p>
                </div>
                ${buildNode(t.id)}
            </div>
        `;
    });
    html += `</div>`;
    return html;
};

window.addDepartment = function() {
    Swal.fire({
        title: 'Add Department',
        input: 'text',
        inputPlaceholder: 'e.g. Research & Development',
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Add', confirmButtonColor: '#8b5cf6',
    }).then(res => {
        if (res.isConfirmed && res.value) {
            DB.organization.departments.push(res.value);
            saveDB(); renderView('organization');
        }
    });
};

window.addLocation = function() {
    Swal.fire({
        title: 'Add Location',
        input: 'text',
        inputPlaceholder: 'e.g. Seattle, WA',
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Add', confirmButtonColor: '#8b5cf6',
    }).then(res => {
        if (res.isConfirmed && res.value) {
            DB.organization.locations.push(res.value);
            saveDB(); renderView('organization');
        }
    });
};

window.addDesignation = function() {
    Swal.fire({
        title: 'Add Designation',
        input: 'text',
        inputPlaceholder: 'e.g. QA Tester',
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Add', confirmButtonColor: '#8b5cf6',
    }).then(res => {
        if (res.isConfirmed && res.value) {
            DB.organization.designations.push(res.value);
            saveDB(); renderView('organization');
        }
    });
};

window.addTeam = function() {
    Swal.fire({
        title: 'Create Team',
        html: `
            <input id="swal-team-name" class="form-control" placeholder="Team Name (e.g. Project Alpha)" style="margin-bottom:12px;">
            <select id="swal-team-lead" class="form-control">
                <option value="">Select Team Lead...</option>
                ${DB.employees.map(e => `<option value="${e.id}">${e.name}</option>`).join('')}
            </select>
        `,
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Create', confirmButtonColor: '#8b5cf6',
        preConfirm: () => {
            const name = document.getElementById('swal-team-name').value;
            const leadId = document.getElementById('swal-team-lead').value;
            if(!name) { Swal.showValidationMessage('Team name is required'); return false; }
            return { name, leadId: leadId ? parseInt(leadId) : null };
        }
    }).then(res => {
        if (res.isConfirmed) {
            DB.organization.teams.push({
                id: DB.organization.teams.length + 1,
                name: res.value.name,
                leadId: res.value.leadId,
                members: res.value.leadId ? [parseInt(res.value.leadId)] : []
            });
            saveDB(); renderView('organization');
        }
    });
};

// --- Leave Management Functions ---
window.applyLeave = function() {
    Swal.fire({
        title: 'Apply for Leave',
        html: `
            <select id="leave-emp" class="form-control" style="margin-bottom:12px;">
                <option value="">Select Employee...</option>
                ${DB.employees.map(e => `<option value="${e.id}">${e.name}</option>`).join('')}
            </select>
            <select id="leave-type" class="form-control" style="margin-bottom:12px;">
                ${DB.settings.leaveTypes.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
            <div style="display:flex; gap:12px; margin-bottom:12px;">
                <input id="leave-start" type="date" class="form-control" placeholder="Start Date">
                <input id="leave-end" type="date" class="form-control" placeholder="End Date">
            </div>
        `,
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Submit Request', confirmButtonColor: '#8b5cf6',
        preConfirm: () => {
            const empId = document.getElementById('leave-emp').value;
            const type = document.getElementById('leave-type').value;
            const start = document.getElementById('leave-start').value;
            const end = document.getElementById('leave-end').value;
            if(!empId || !start || !end) { Swal.showValidationMessage('All fields required'); return false; }
            
            // Calculate days (simple mock)
            const s = new Date(start);
            const e = new Date(end);
            const diffTime = Math.abs(e - s);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            
            return { empId, type, dates: `${s.toLocaleDateString('en-US',{month:'short',day:'numeric'})} - ${e.toLocaleDateString('en-US',{month:'short',day:'numeric'})}`, days: diffDays };
        }
    }).then(res => {
        if (res.isConfirmed) {
            const emp = DB.employees.find(e => e.id == res.value.empId);
            DB.leaveRequests.unshift({
                id: Date.now(),
                empId: emp.id,
                name: emp.name,
                type: res.value.type,
                dates: res.value.dates,
                days: res.value.days,
                status: 'Pending',
                managerApproval: 'Pending',
                hrApproval: 'Pending'
            });
            saveDB(); renderView('leave');
            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Leave Applied', showConfirmButton: false, timer: 2000, background: 'var(--bg-panel)', color: 'white' });
        }
    });
};

window.processLeave = function(id, role, status) {
    const req = DB.leaveRequests.find(r => r.id === id);
    if (!req) return;
    
    if (role === 'Manager') req.managerApproval = status;
    if (role === 'HR') req.hrApproval = status;
    
    // Check if fully approved
    if (req.managerApproval === 'Approved' && req.hrApproval === 'Approved') {
        req.status = 'Approved';
        // Deduct from balance
        const emp = DB.employees.find(e => e.id === req.empId);
        if (emp && emp.leaves) {
            emp.leaves.used += req.days;
        }
    } else if (req.managerApproval === 'Rejected' || req.hrApproval === 'Rejected') {
        req.status = 'Rejected';
    }
    
    saveDB(); renderView('leave');
};

window.cancelLeave = function(id) {
    const req = DB.leaveRequests.find(r => r.id === id);
    if (!req) return;
    
    if (req.status === 'Approved') {
        req.status = 'Cancelled';
        // Refund balance
        const emp = DB.employees.find(e => e.id === req.empId);
        if (emp && emp.leaves) {
            emp.leaves.used = Math.max(0, emp.leaves.used - req.days);
        }
        saveDB(); renderView('leave');
        Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: 'Leave Cancelled', showConfirmButton: false, timer: 2000, background: 'var(--bg-panel)', color: 'white' });
    }
};

window.runLeaveAccrual = function() {
    Swal.fire({
        title: 'Run Accrual?',
        text: 'This will add earned leave days to all active employees and apply Carry-Forward logic.',
        icon: 'warning', background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Run', confirmButtonColor: '#8b5cf6'
    }).then(res => {
        if(res.isConfirmed) {
            DB.employees.forEach(emp => {
                if(emp.status === 'Active' && emp.leaves) {
                    // Accrue days
                    emp.leaves.total += (emp.leaves.accrualRate || 2);
                    
                    // Example Carry Forward calculation
                    const maxCarry = 5;
                    const balance = emp.leaves.total - emp.leaves.used;
                    if (balance > maxCarry) {
                        emp.leaves.total = emp.leaves.used + maxCarry; // Cap it
                    }
                }
            });
            saveDB(); renderView('leave');
            Swal.fire({ title: 'Success', text: 'Accrual run successfully.', icon: 'success', background: '#0f172a', color: 'white' });
        }
    });
};

// --- Payroll Functions ---
window.editSalaryStructure = function(empId) {
    const emp = DB.employees.find(e => e.id === empId);
    if(!emp) return;
    
    Swal.fire({
        title: `Salary & Statutory Config - ${emp.name}`,
        html: `
            <div style="text-align:left; margin-bottom:15px;">
                <label style="color:var(--text-muted); font-size:12px;">Basic Salary (Monthly ₹)</label>
                <input id="pay-basic" type="number" class="form-control" value="${emp.salaryStructure.basic}" style="margin-bottom:10px;">
                <label style="color:var(--text-muted); font-size:12px;">Allowances (Monthly ₹)</label>
                <input id="pay-allowances" type="number" class="form-control" value="${emp.salaryStructure.allowances}" style="margin-bottom:10px;">
                <label style="color:var(--text-muted); font-size:12px;">Hourly Rate (₹) - For Overtime</label>
                <input id="pay-hourly" type="number" class="form-control" value="${emp.salaryStructure.hourlyRate}" style="margin-bottom:15px;">
                
                <hr style="border-color:var(--border-color); margin-bottom:15px;">
                <h4 style="color:var(--primary); font-size:14px; margin-bottom:10px;">Statutory Details (India)</h4>
                
                <label style="color:var(--text-muted); font-size:12px;">PAN Number</label>
                <input id="pay-pan" type="text" class="form-control" value="${emp.statutory.pan}" placeholder="ABCDE1234F" style="margin-bottom:10px;">
                <label style="color:var(--text-muted); font-size:12px;">UAN Number (EPF)</label>
                <input id="pay-uan" type="text" class="form-control" value="${emp.statutory.uan}" placeholder="100XXXXXXXXX" style="margin-bottom:10px;">
                <label style="color:var(--text-muted); font-size:12px;">Bank Account</label>
                <input id="pay-bank" type="text" class="form-control" value="${emp.statutory.bankAccount}" placeholder="Acc No" style="margin-bottom:10px;">
                <label style="color:var(--text-muted); font-size:12px;">IFSC Code</label>
                <input id="pay-ifsc" type="text" class="form-control" value="${emp.statutory.ifsc}" placeholder="SBIN000XXXX" style="margin-bottom:10px;">
                
                <div style="display:flex; gap:20px; align-items:center; margin-top:10px;">
                    <label style="display:flex; align-items:center; gap:5px; font-size:13px; color:white;">
                        <input type="checkbox" id="pay-pf" ${emp.statutory.pfEnabled ? 'checked' : ''}> Enable PF (12%)
                    </label>
                    <label style="display:flex; align-items:center; gap:5px; font-size:13px; color:white;">
                        <input type="checkbox" id="pay-esi" ${emp.statutory.esiEnabled ? 'checked' : ''}> Enable ESI (0.75%)
                    </label>
                    <label style="display:flex; align-items:center; gap:5px; font-size:13px; color:white;">
                        <input type="checkbox" id="pay-pt" ${emp.statutory.ptEnabled !== false ? 'checked' : ''}> Enable PT (₹200)
                    </label>
                </div>
                <div style="display:flex; gap:20px; align-items:center; margin-top:10px;">
                    <div style="flex:1;">
                        <label style="color:var(--text-muted); font-size:12px;">Tax Regime</label>
                        <select id="pay-regime" class="form-control">
                            <option value="New Regime" ${emp.statutory.taxRegime === 'New Regime' ? 'selected' : ''}>New Regime</option>
                            <option value="Old Regime" ${emp.statutory.taxRegime === 'Old Regime' ? 'selected' : ''}>Old Regime</option>
                        </select>
                    </div>
                    <div style="flex:1;">
                        <label style="color:var(--text-muted); font-size:12px;">TDS Deduction (%)</label>
                        <input id="pay-tds" type="number" class="form-control" value="${emp.statutory.tdsPercentage || 0}">
                    </div>
                </div>
            </div>
        `,
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Save Config', confirmButtonColor: '#8b5cf6',
        preConfirm: () => {
            return {
                basic: parseFloat(document.getElementById('pay-basic').value) || 0,
                allowances: parseFloat(document.getElementById('pay-allowances').value) || 0,
                hourlyRate: parseFloat(document.getElementById('pay-hourly').value) || 0,
                pan: document.getElementById('pay-pan').value,
                uan: document.getElementById('pay-uan').value,
                bankAccount: document.getElementById('pay-bank').value,
                ifsc: document.getElementById('pay-ifsc').value,
                pfEnabled: document.getElementById('pay-pf').checked,
                esiEnabled: document.getElementById('pay-esi').checked,
                ptEnabled: document.getElementById('pay-pt').checked,
                tdsPercentage: parseFloat(document.getElementById('pay-tds').value) || 0,
                taxRegime: document.getElementById('pay-regime').value
            };
        }
    }).then(res => {
        if(res.isConfirmed) {
            emp.salaryStructure = { basic: res.value.basic, allowances: res.value.allowances, hourlyRate: res.value.hourlyRate };
            emp.statutory = { 
                pan: res.value.pan, uan: res.value.uan, 
                bankAccount: res.value.bankAccount, ifsc: res.value.ifsc, 
                pfEnabled: res.value.pfEnabled, esiEnabled: res.value.esiEnabled,
                ptEnabled: res.value.ptEnabled, tdsPercentage: res.value.tdsPercentage, taxRegime: res.value.taxRegime 
            };
            saveDB(); renderView('payroll');
            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Config Saved', showConfirmButton: false, timer: 2000, background: 'var(--bg-panel)', color: 'white' });
        }
    });
};

window.processPayroll = function(empId) {
    const emp = DB.employees.find(e => e.id === empId);
    if(!emp) return;
    
    // Aggregate this month's data
    let overtimeHours = 0;
    let absentDays = 0;
    
    DB.attendance.forEach(a => {
        if(a.empId === empId) {
            if(a.status === 'Overtime') overtimeHours += 2; // Mocking 2 hrs per overtime log
            if(a.status === 'Absent' || a.status === 'Half-Day' || a.status === 'Early Exit') absentDays += (a.status === 'Absent' ? 1 : 0.5);
        }
    });
    
    const basic = emp.salaryStructure.basic;
    const allow = emp.salaryStructure.allowances;
    const grossBase = basic + allow;
    const dailyRate = grossBase / 30; // approx
    
    const overtimePay = overtimeHours * (emp.salaryStructure.hourlyRate * 1.5);
    const unpaidLeaveDeduction = absentDays * dailyRate;
    const adjustedGross = grossBase + overtimePay - unpaidLeaveDeduction;
    
    // Statutory
    let pfDeduction = 0;
    let esiDeduction = 0;
    let ptDeduction = 0;
    let tdsDeduction = 0;
    
    if (emp.statutory.pfEnabled) pfDeduction = basic * 0.12;
    if (emp.statutory.esiEnabled && adjustedGross <= 21000) esiDeduction = adjustedGross * 0.0075;
    else if (emp.statutory.esiEnabled) esiDeduction = adjustedGross * 0.0075;
    
    if (emp.statutory.ptEnabled !== false) ptDeduction = 200; // Mock PT
    if (emp.statutory.tdsPercentage > 0) tdsDeduction = adjustedGross * (emp.statutory.tdsPercentage / 100);
    
    const totalDeductions = pfDeduction + esiDeduction + ptDeduction + tdsDeduction;
    const netPay = adjustedGross - totalDeductions;
    
    Swal.fire({
        title: 'Payroll Preview',
        html: `
            <div style="text-align:left; font-size:13px;">
                <p><strong>Employee:</strong> ${emp.name}</p>
                <table style="width:100%; border-collapse:collapse; margin-top:10px;">
                    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:4px 0;">Basic Salary</td><td style="text-align:right;">₹${basic.toFixed(2)}</td></tr>
                    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:4px 0;">Allowances</td><td style="text-align:right;">₹${allow.toFixed(2)}</td></tr>
                    <tr style="border-bottom:1px solid var(--border-color); color:var(--success);"><td style="padding:4px 0;">Overtime (1.5x, ${overtimeHours}hrs)</td><td style="text-align:right;">+₹${overtimePay.toFixed(2)}</td></tr>
                    <tr style="border-bottom:1px solid var(--border-color); color:var(--danger);"><td style="padding:4px 0;">Absences (${absentDays} days)</td><td style="text-align:right;">-₹${unpaidLeaveDeduction.toFixed(2)}</td></tr>
                    <tr style="border-bottom:1px solid var(--border-color); background:rgba(255,255,255,0.05); font-weight:bold;"><td style="padding:4px 0;">Gross Earnings</td><td style="text-align:right;">₹${adjustedGross.toFixed(2)}</td></tr>
                    
                    <tr style="border-bottom:1px solid var(--border-color); color:var(--warning); margin-top:10px;"><td style="padding:4px 0;">PF Deduction (12%)</td><td style="text-align:right;">-₹${pfDeduction.toFixed(2)}</td></tr>
                    <tr style="border-bottom:1px solid var(--border-color); color:var(--warning);"><td style="padding:4px 0;">ESI Deduction (0.75%)</td><td style="text-align:right;">-₹${esiDeduction.toFixed(2)}</td></tr>
                    <tr style="border-bottom:1px solid var(--border-color); color:var(--warning);"><td style="padding:4px 0;">Professional Tax (PT)</td><td style="text-align:right;">-₹${ptDeduction.toFixed(2)}</td></tr>
                    <tr style="border-bottom:1px solid var(--border-color); color:var(--warning);"><td style="padding:4px 0;">TDS (${emp.statutory.tdsPercentage || 0}%)</td><td style="text-align:right;">-₹${tdsDeduction.toFixed(2)}</td></tr>
                    
                    <tr style="border-bottom:1px solid var(--border-color); font-weight:bold; font-size:16px; color:var(--primary);"><td style="padding:8px 0;">Net Pay</td><td style="text-align:right;">₹${netPay.toFixed(2)}</td></tr>
                </table>
            </div>
        `,
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Approve & Save', confirmButtonColor: '#10b981'
    }).then(res => {
        if (res.isConfirmed) {
            DB.payrollRecords.unshift({
                id: Date.now(),
                empId: emp.id,
                empName: emp.name,
                period: 'Current Month',
                basic, allow, overtimePay, unpaidLeaveDeduction, adjustedGross, pfDeduction, esiDeduction, ptDeduction, tdsDeduction, netPay,
                status: 'Processed'
            });
            saveDB(); renderView('payroll');
            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Payroll Processed', showConfirmButton: false, timer: 2000, background: 'var(--bg-panel)', color: 'white' });
        }
    });
};

window.markPayrollPaid = function(id) {
    const rec = DB.payrollRecords.find(r => r.id === id);
    if(rec) {
        rec.status = 'Paid';
        saveDB(); renderView('payroll');
        Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Marked as Paid', showConfirmButton: false, timer: 2000, background: 'var(--bg-panel)', color: 'white' });
    }
};

window.downloadPayslip = function(id) {
    const rec = DB.payrollRecords.find(r => r.id === id);
    if(!rec) return;
    const emp = DB.employees.find(e => e.id === rec.empId);
    
    const slipHTML = `
        <div id="payslip-print" style="text-align:left; color:black; background:white; padding:20px; font-family:sans-serif; border:1px solid #ccc;">
            <h2 style="text-align:center; color:#333; margin-bottom:5px;">MyHRTool Pvt Ltd</h2>
            <p style="text-align:center; font-size:14px; color:#666; margin-top:0;">Payslip for ${rec.period}</p>
            <hr>
            <table style="width:100%; font-size:12px; margin-bottom:20px;">
                <tr><td><strong>Employee:</strong> ${emp.name}</td><td><strong>PAN:</strong> ${emp.statutory.pan || 'N/A'}</td></tr>
                <tr><td><strong>Designation:</strong> ${emp.role}</td><td><strong>UAN:</strong> ${emp.statutory.uan || 'N/A'}</td></tr>
                <tr><td><strong>Department:</strong> ${emp.department}</td><td><strong>Bank/IFSC:</strong> ${emp.statutory.bankAccount || 'N/A'} / ${emp.statutory.ifsc || 'N/A'}</td></tr>
                <tr><td><strong>Tax Regime:</strong> ${emp.statutory.taxRegime || 'N/A'}</td><td></td></tr>
            </table>
            <table style="width:100%; border-collapse:collapse; font-size:12px;" border="1">
                <tr style="background:#f3f4f6;"><th style="padding:5px;">Earnings</th><th style="padding:5px;">Amount (₹)</th><th style="padding:5px;">Deductions</th><th style="padding:5px;">Amount (₹)</th></tr>
                <tr>
                    <td style="padding:5px;">Basic Salary</td><td style="padding:5px; text-align:right;">${rec.basic.toFixed(2)}</td>
                    <td style="padding:5px;">Provident Fund (PF)</td><td style="padding:5px; text-align:right;">${rec.pfDeduction.toFixed(2)}</td>
                </tr>
                <tr>
                    <td style="padding:5px;">Allowances</td><td style="padding:5px; text-align:right;">${rec.allow.toFixed(2)}</td>
                    <td style="padding:5px;">ESI</td><td style="padding:5px; text-align:right;">${rec.esiDeduction.toFixed(2)}</td>
                </tr>
                <tr>
                    <td style="padding:5px;">Overtime</td><td style="padding:5px; text-align:right;">${rec.overtimePay.toFixed(2)}</td>
                    <td style="padding:5px;">Professional Tax (PT)</td><td style="padding:5px; text-align:right;">${(rec.ptDeduction || 0).toFixed(2)}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"></td><td style="padding:5px; text-align:right;"></td>
                    <td style="padding:5px;">TDS</td><td style="padding:5px; text-align:right;">${(rec.tdsDeduction || 0).toFixed(2)}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"></td><td style="padding:5px; text-align:right;"></td>
                    <td style="padding:5px;">Unpaid Leave</td><td style="padding:5px; text-align:right;">${rec.unpaidLeaveDeduction.toFixed(2)}</td>
                </tr>
                <tr style="font-weight:bold; background:#f9fafb;">
                    <td style="padding:5px;">Gross Earnings</td><td style="padding:5px; text-align:right;">${rec.adjustedGross.toFixed(2)}</td>
                    <td style="padding:5px;">Total Deductions</td><td style="padding:5px; text-align:right;">${(rec.pfDeduction+rec.esiDeduction+rec.unpaidLeaveDeduction+(rec.ptDeduction||0)+(rec.tdsDeduction||0)).toFixed(2)}</td>
                </tr>
            </table>
            <h3 style="text-align:right; margin-top:20px; color:#111;">Net Pay: ₹${rec.netPay.toFixed(2)}</h3>
        </div>
    `;

    Swal.fire({
        html: slipHTML,
        width: 600,
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-print"></i> Print/Save PDF',
        confirmButtonColor: '#8b5cf6',
        cancelButtonText: 'Close',
        background: '#fff'
    }).then(res => {
        if(res.isConfirmed) {
            const w = window.open('', '_blank');
            w.document.write(slipHTML);
            w.document.close();
            w.focus();
            setTimeout(() => { w.print(); w.close(); }, 500);
        }
    });
};

window.exportPayrollTaxReport = function() {
    let reportHTML = `
        <div style="text-align:left; color:white; font-size:13px; max-height:400px; overflow-y:auto;">
            <p style="margin-bottom:15px; color:var(--text-muted);">Form 16 / Payroll Tax Data Summary for Current Month</p>
            <table style="width:100%; border-collapse:collapse; font-size:12px;">
                <thead>
                    <tr style="border-bottom:1px solid var(--border-color); color:var(--primary);">
                        <th style="padding:8px 4px; text-align:left;">Employee</th>
                        <th style="padding:8px 4px; text-align:left;">PAN</th>
                        <th style="padding:8px 4px; text-align:right;">Gross</th>
                        <th style="padding:8px 4px; text-align:right;">PF</th>
                        <th style="padding:8px 4px; text-align:right;">ESI</th>
                        <th style="padding:8px 4px; text-align:right;">PT</th>
                        <th style="padding:8px 4px; text-align:right;">TDS</th>
                        <th style="padding:8px 4px; text-align:left;">Regime</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    DB.payrollRecords.forEach(r => {
        const emp = DB.employees.find(e => e.id === r.empId);
        if(!emp) return;
        reportHTML += `
            <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                <td style="padding:6px 4px;">${emp.name}</td>
                <td style="padding:6px 4px;">${emp.statutory.pan || '-'}</td>
                <td style="padding:6px 4px; text-align:right;">₹${r.adjustedGross.toFixed(0)}</td>
                <td style="padding:6px 4px; text-align:right;">₹${r.pfDeduction.toFixed(0)}</td>
                <td style="padding:6px 4px; text-align:right;">₹${r.esiDeduction.toFixed(0)}</td>
                <td style="padding:6px 4px; text-align:right;">₹${(r.ptDeduction || 0).toFixed(0)}</td>
                <td style="padding:6px 4px; text-align:right;">₹${(r.tdsDeduction || 0).toFixed(0)}</td>
                <td style="padding:6px 4px;">${emp.statutory.taxRegime || 'N/A'}</td>
            </tr>
        `;
    });
    
    reportHTML += `</tbody></table></div>`;
    
    Swal.fire({
        title: 'Payroll Tax Summary',
        html: reportHTML,
        width: 700,
        background: '#0f172a', color: 'white',
        confirmButtonText: 'Close',
        confirmButtonColor: '#8b5cf6'
    });
};

// --- Recruitment Functions ---
window.addJob = function() {
    Swal.fire({
        title: 'Post New Job',
        html: `
            <input id="job-title" class="form-control" placeholder="Job Title" style="margin-bottom:10px;">
            <input id="job-dept" class="form-control" placeholder="Department" style="margin-bottom:10px;">
            <textarea id="job-desc" class="form-control" placeholder="Job Description" rows="3" style="margin-bottom:10px; resize:vertical;"></textarea>
        `,
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Post Job', confirmButtonColor: '#8b5cf6',
        preConfirm: () => {
            return {
                title: document.getElementById('job-title').value,
                department: document.getElementById('job-dept').value,
                desc: document.getElementById('job-desc').value
            };
        }
    }).then(res => {
        if(res.isConfirmed && res.value.title) {
            DB.jobs.push({
                id: Date.now(),
                title: res.value.title,
                department: res.value.department,
                description: res.value.desc,
                status: 'Open'
            });
            saveDB(); renderView('recruitment');
            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Job Posted', showConfirmButton: false, timer: 2000, background: 'var(--bg-panel)', color: 'white' });
        }
    });
};

window.addCandidate = function() {
    let jobOptions = DB.jobs.filter(j => j.status === 'Open').map(j => `<option value="${j.id}">${j.title}</option>`).join('');
    
    Swal.fire({
        title: 'Add Candidate',
        html: `
            <input id="cand-name" class="form-control" placeholder="Candidate Name" style="margin-bottom:10px;">
            <input id="cand-email" type="email" class="form-control" placeholder="Email Address" style="margin-bottom:10px;">
            <input id="cand-phone" type="tel" class="form-control" placeholder="Phone Number" style="margin-bottom:10px;">
            <select id="cand-job" class="form-control" style="margin-bottom:10px;">
                <option value="">Select Job Applied For</option>
                ${jobOptions}
            </select>
            <input id="cand-resume" class="form-control" placeholder="Resume Link / File Name" style="margin-bottom:10px;">
        `,
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Add Candidate', confirmButtonColor: '#8b5cf6',
        preConfirm: () => {
            return {
                name: document.getElementById('cand-name').value,
                email: document.getElementById('cand-email').value,
                phone: document.getElementById('cand-phone').value,
                jobId: parseInt(document.getElementById('cand-job').value),
                resume: document.getElementById('cand-resume').value
            };
        }
    }).then(res => {
        if(res.isConfirmed && res.value.name) {
            DB.candidates.push({
                id: Date.now(),
                name: res.value.name,
                email: res.value.email,
                phone: res.value.phone,
                jobId: res.value.jobId,
                resume: res.value.resume,
                status: 'Applied',
                interviews: [],
                notes: []
            });
            saveDB(); renderView('recruitment');
            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Candidate Added', showConfirmButton: false, timer: 2000, background: 'var(--bg-panel)', color: 'white' });
        }
    });
};

window.viewCandidate = function(id) {
    const c = DB.candidates.find(x => x.id === id);
    if(!c) return;
    const j = DB.jobs.find(job => job.id === c.jobId);
    
    let interviewsHTML = c.interviews && c.interviews.length > 0 ? c.interviews.map(i => `<div style="padding:8px; background:rgba(255,255,255,0.05); border-radius:4px; margin-bottom:5px;"><strong>${i.date}</strong> - ${i.type}</div>`).join('') : '<span style="color:var(--text-muted); font-size:12px;">No interviews scheduled.</span>';
    let notesHTML = c.notes && c.notes.length > 0 ? c.notes.map(n => `<div style="padding:8px; background:rgba(255,255,255,0.05); border-radius:4px; margin-bottom:5px; font-size:12px;">${n}</div>`).join('') : '<span style="color:var(--text-muted); font-size:12px;">No notes yet.</span>';

    Swal.fire({
        title: 'Candidate Profile',
        html: `
            <div style="text-align:left; font-size:14px;">
                <p><strong>Name:</strong> ${c.name}</p>
                <p><strong>Email:</strong> ${c.email} | <strong>Phone:</strong> ${c.phone}</p>
                <p><strong>Job:</strong> ${j ? j.title : 'Unknown'} | <strong>Status:</strong> <span class="status-badge" style="display:inline-block;">${c.status}</span></p>
                <p><strong>Resume:</strong> ${c.resume || 'Not Provided'}</p>
                
                <div style="margin-top:15px; display:flex; gap:10px;">
                    <select id="new-status" class="form-control" style="flex:1;">
                        <option value="Applied" ${c.status==='Applied'?'selected':''}>Applied</option>
                        <option value="Screening" ${c.status==='Screening'?'selected':''}>Screening</option>
                        <option value="Interview" ${c.status==='Interview'?'selected':''}>Interview</option>
                        <option value="Selected" ${c.status==='Selected'?'selected':''}>Selected</option>
                        <option value="Rejected" ${c.status==='Rejected'?'selected':''}>Rejected</option>
                    </select>
                    <button class="primary-btn" style="flex:none; padding:8px 12px; font-size:12px;" onclick="window.updateCandidateStatus(${c.id})">Update Status</button>
                </div>
                
                <hr style="border-color:var(--border-color); margin:15px 0;">
                <h4 style="color:var(--primary); font-size:14px; margin-bottom:10px;">Interviews & Notes</h4>
                <div style="margin-bottom:10px;">${interviewsHTML}</div>
                <div style="margin-bottom:15px;">${notesHTML}</div>
                
                <div style="display:flex; gap:10px;">
                    <button class="secondary-btn" style="flex:1; font-size:12px; padding:8px;" onclick="window.scheduleInterview(${c.id})"><i class="fa-solid fa-calendar"></i> Schedule</button>
                    <button class="secondary-btn" style="flex:1; font-size:12px; padding:8px;" onclick="window.addNote(${c.id})"><i class="fa-solid fa-pen"></i> Add Note</button>
                    ${c.status === 'Selected' ? `<button class="primary-btn" style="flex:1; font-size:12px; padding:8px; background:var(--success);" onclick="window.convertCandidate(${c.id})"><i class="fa-solid fa-user-check"></i> Hire Employee</button>` : ''}
                </div>
            </div>
        `,
        background: '#0f172a', color: 'white',
        showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Close'
    });
};

window.updateCandidateStatus = function(id) {
    const c = DB.candidates.find(x => x.id === id);
    if(c) {
        c.status = document.getElementById('new-status').value;
        saveDB(); renderView('recruitment');
        window.viewCandidate(id); // reload modal
    }
};

window.scheduleInterview = function(id) {
    Swal.fire({
        title: 'Schedule Interview',
        html: `
            <input type="datetime-local" id="int-date" class="form-control" style="margin-bottom:10px;">
            <input id="int-type" class="form-control" placeholder="Interview Type (e.g. Technical Round 1)" style="margin-bottom:10px;">
        `,
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Schedule', confirmButtonColor: '#8b5cf6',
        preConfirm: () => {
            return {
                date: document.getElementById('int-date').value,
                type: document.getElementById('int-type').value
            };
        }
    }).then(res => {
        if(res.isConfirmed && res.value.date) {
            const c = DB.candidates.find(x => x.id === id);
            if(c) {
                if(!c.interviews) c.interviews = [];
                const formattedDate = new Date(res.value.date).toLocaleString('en-IN');
                c.interviews.push({ date: formattedDate, type: res.value.type || 'Interview' });
                saveDB();
                window.viewCandidate(id);
            }
        }
    });
};

window.addNote = function(id) {
    Swal.fire({
        title: 'Add Interview Note',
        input: 'textarea',
        inputPlaceholder: 'Enter feedback or notes...',
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Save Note', confirmButtonColor: '#8b5cf6',
    }).then(res => {
        if(res.isConfirmed && res.value) {
            const c = DB.candidates.find(x => x.id === id);
            if(c) {
                if(!c.notes) c.notes = [];
                c.notes.push(res.value);
                saveDB();
                window.viewCandidate(id);
            }
        }
    });
};

window.convertCandidate = function(id) {
    const c = DB.candidates.find(x => x.id === id);
    if(!c) return;
    
    const tempId = Date.now();
    Swal.fire({
        title: 'Convert to Employee',
        html: `
            <div style="text-align:left;">
                <p style="color:var(--text-muted); font-size:12px; margin-bottom:15px;">Review details before converting candidate to an active employee.</p>
                <input id="new-emp-name" class="form-control" value="${c.name}" placeholder="Full Name" style="margin-bottom:10px;">
                <input id="new-emp-email" type="email" class="form-control" value="${c.email}" placeholder="Email Address" style="margin-bottom:10px;">
                <input id="new-emp-role" class="form-control" placeholder="Job Role (e.g. Developer)" style="margin-bottom:10px;">
                <input id="new-emp-dept" class="form-control" placeholder="Department" style="margin-bottom:10px;">
                <input id="new-emp-join" type="date" class="form-control" style="margin-bottom:10px;">
            </div>
        `,
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Convert', confirmButtonColor: '#10b981',
        preConfirm: () => {
            return {
                name: document.getElementById('new-emp-name').value,
                email: document.getElementById('new-emp-email').value,
                role: document.getElementById('new-emp-role').value,
                department: document.getElementById('new-emp-dept').value,
                joinDate: document.getElementById('new-emp-join').value
            };
        }
    }).then(res => {
        if(res.isConfirmed && res.value.name) {
            DB.employees.push({
                id: tempId,
                name: res.value.name,
                role: res.value.role || 'Employee',
                department: res.value.department || 'General',
                status: 'Active',
                email: res.value.email,
                phone: c.phone,
                joinDate: res.value.joinDate || new Date().toISOString().split('T')[0],
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(res.value.name)}&background=random`,
                onboarding: { status: 'Pending', progress: 0, checklist: [{task: 'Submit ID Documents', done: false}, {task: 'Sign NDA', done: false}, {task: 'Read Employee Handbook', done: false}, {task: 'IT Setup', done: false}], assets: [] }
            });
            
            c.status = 'Hired';
            saveDB();
            Swal.fire({ title: 'Success!', text: `${res.value.name} is now an active employee.`, icon: 'success', background: '#0f172a', color: 'white' }).then(() => {
                renderView('dashboard');
            });
        }
    });
};

window.exportRecruitmentReport = function() {
    let reportHTML = `
        <div style="text-align:left; color:white; font-size:13px;">
            <p style="margin-bottom:15px; color:var(--text-muted);">Candidate Pipeline Summary</p>
            <table style="width:100%; border-collapse:collapse; font-size:12px;">
                <thead>
                    <tr style="border-bottom:1px solid var(--border-color); color:var(--primary);">
                        <th style="padding:8px 4px; text-align:left;">Job</th>
                        <th style="padding:8px 4px; text-align:center;">Applied</th>
                        <th style="padding:8px 4px; text-align:center;">Interviewing</th>
                        <th style="padding:8px 4px; text-align:center;">Selected</th>
                        <th style="padding:8px 4px; text-align:center;">Hired</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    DB.jobs.forEach(j => {
        let applied = DB.candidates.filter(c => c.jobId === j.id && c.status === 'Applied').length;
        let interviewing = DB.candidates.filter(c => c.jobId === j.id && (c.status === 'Screening' || c.status === 'Interview')).length;
        let selected = DB.candidates.filter(c => c.jobId === j.id && c.status === 'Selected').length;
        let hired = DB.candidates.filter(c => c.jobId === j.id && c.status === 'Hired').length;
        
        reportHTML += `
            <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                <td style="padding:6px 4px;">${j.title}</td>
                <td style="padding:6px 4px; text-align:center;">${applied}</td>
                <td style="padding:6px 4px; text-align:center;">${interviewing}</td>
                <td style="padding:6px 4px; text-align:center;">${selected}</td>
                <td style="padding:6px 4px; text-align:center;">${hired}</td>
            </tr>
        `;
    });
    
    reportHTML += `</tbody></table></div>`;
    
    Swal.fire({
        title: 'Recruitment Summary',
        html: reportHTML,
        width: 600,
        background: '#0f172a', color: 'white',
        confirmButtonText: 'Close',
        confirmButtonColor: '#8b5cf6'
    });
};

// --- Onboarding Functions ---
window.manageOnboarding = function(empId) {
    const e = DB.employees.find(x => x.id === empId);
    if (!e || !e.onboarding) return;
    
    let checklistHTML = e.onboarding.checklist.map((t, idx) => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px; background:rgba(255,255,255,0.05); border-radius:6px; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:10px;">
                <input type="checkbox" ${t.done ? 'checked' : ''} onchange="window.toggleOnboardingTask(${empId}, ${idx})">
                <span style="font-size:13px; color: ${t.done ? 'var(--text-muted)' : 'white'}; text-decoration: ${t.done ? 'line-through' : 'none'};">${t.task}</span>
            </div>
            <span class="status-badge ${t.done ? 'active' : 'pending'}" style="font-size:10px;">${t.done ? 'Done' : 'Pending'}</span>
        </div>
    `).join('');
    
    let assetsHTML = e.onboarding.assets && e.onboarding.assets.length > 0 ? e.onboarding.assets.map((a, idx) => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:rgba(255,255,255,0.05); border-radius:6px; margin-bottom:6px;">
            <div style="font-size:12px;"><strong style="color:white;">${a.name}</strong> <span style="color:var(--text-muted);">(${a.serial})</span></div>
            <button style="background:transparent; border:none; color:var(--danger); cursor:pointer;" onclick="window.removeAsset(${empId}, ${idx})"><i class="fa-solid fa-trash"></i></button>
        </div>
    `).join('') : '<p style="color:var(--text-muted); font-size:12px; margin-bottom:10px;">No assets assigned yet.</p>';

    Swal.fire({
        title: `Onboarding: ${e.name}`,
        html: `
            <div style="text-align:left;">
                <div style="margin-bottom:20px; display:flex; align-items:center; gap:15px;">
                    <div style="flex:1; height:8px; background:rgba(255,255,255,0.1); border-radius:4px; overflow:hidden;">
                        <div style="width:${e.onboarding.progress}%; height:100%; background:var(--primary); transition:width 0.3s;"></div>
                    </div>
                    <span style="font-size:13px; font-weight:bold; color:var(--primary);">${e.onboarding.progress}%</span>
                </div>
                
                <h4 style="color:white; font-size:14px; margin-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:5px;">Required Tasks</h4>
                <div id="ob-checklist" style="margin-bottom:20px; max-height:180px; overflow-y:auto;">
                    ${checklistHTML}
                </div>
                
                <h4 style="color:white; font-size:14px; margin-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:5px;">Assigned Assets</h4>
                <div id="ob-assets" style="margin-bottom:15px; max-height:150px; overflow-y:auto;">
                    ${assetsHTML}
                </div>
                <button class="secondary-btn" style="width:100%; font-size:12px; padding:8px;" onclick="window.assignAsset(${empId})"><i class="fa-solid fa-laptop-medical"></i> Assign New Asset</button>
            </div>
        `,
        background: '#0f172a', color: 'white',
        showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Close'
    });
};

window.toggleOnboardingTask = function(empId, taskIndex) {
    const e = DB.employees.find(x => x.id === empId);
    if (!e || !e.onboarding) return;
    
    e.onboarding.checklist[taskIndex].done = !e.onboarding.checklist[taskIndex].done;
    
    const total = e.onboarding.checklist.length;
    const completed = e.onboarding.checklist.filter(t => t.done).length;
    e.onboarding.progress = Math.round((completed / total) * 100);
    
    if(e.onboarding.progress === 100) {
        e.onboarding.status = 'Completed';
    } else if(e.onboarding.progress > 0) {
        e.onboarding.status = 'In Progress';
    } else {
        e.onboarding.status = 'Pending';
    }
    
    saveDB();
    renderView('onboarding');
    window.manageOnboarding(empId);
};

window.assignAsset = function(empId) {
    Swal.fire({
        title: 'Assign Asset',
        html: `
            <input id="asset-name" class="form-control" placeholder="Asset Name (e.g. MacBook Pro)" style="margin-bottom:10px;">
            <input id="asset-serial" class="form-control" placeholder="Serial Number or Asset Tag">
        `,
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Assign', confirmButtonColor: '#8b5cf6',
        preConfirm: () => {
            return {
                name: document.getElementById('asset-name').value,
                serial: document.getElementById('asset-serial').value || 'N/A'
            };
        }
    }).then(res => {
        if(res.isConfirmed && res.value.name) {
            const e = DB.employees.find(x => x.id === empId);
            if(e && e.onboarding) {
                if(!e.onboarding.assets) e.onboarding.assets = [];
                e.onboarding.assets.push(res.value);
                saveDB();
                window.manageOnboarding(empId);
            }
        }
    });
};

window.removeAsset = function(empId, assetIndex) {
    const e = DB.employees.find(x => x.id === empId);
    if(e && e.onboarding && e.onboarding.assets) {
        e.onboarding.assets.splice(assetIndex, 1);
        saveDB();
        window.manageOnboarding(empId);
    }
};

window.triggerWorkflow = function(empId, action) {
    if(action === 'resign') {
        Swal.close();
        window.offboardEmployee(empId);
    } else {
        Swal.fire({
            title: 'Under Construction',
            text: 'This workflow is not fully implemented in the prototype.',
            icon: 'info',
            background: '#0f172a',
            color: 'white'
        });
    }
};

// --- Settings & Integrations ---
window.exportCSV = function(type) {
    let csv = '';
    if (type === 'employee') {
        csv = 'ID,Name,Email,Department,Role,Status,JoinDate\n';
        DB.employees.forEach(e => {
            csv += `${e.id},"${e.name}","${e.email}","${e.department}","${e.role}","${e.status}","${e.joinDate}"\n`;
        });
    } else if (type === 'attendance') {
        csv = 'Employee,Date,Status,ClockIn,ClockOut\n';
        DB.attendance.forEach(a => {
            const emp = DB.employees.find(e => e.id === a.empId);
            csv += `"${emp ? emp.name : 'Unknown'}","${a.date}","${a.status}","${a.clockIn||''}","${a.clockOut||''}"\n`;
        });
    } else if (type === 'leave') {
        csv = 'Employee,Type,StartDate,EndDate,Status\n';
        DB.leaveRequests.forEach(l => {
            const emp = DB.employees.find(e => e.id === l.empId);
            csv += `"${emp ? emp.name : 'Unknown'}","${l.type}","${l.startDate}","${l.endDate}","${l.status}"\n`;
        });
    }
    
    if(!csv) return;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `MyHRTool_${type}_report_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

window.globalSearch = function(query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!query || query.length < 2) {
        resultsContainer.style.display = 'none';
        return;
    }
    
    query = query.toLowerCase();
    let resultsHTML = '';
    
    // Search Employees
    const empMatches = DB.employees.filter(e => e.name.toLowerCase().includes(query) || e.department.toLowerCase().includes(query) || e.role.toLowerCase().includes(query));
    if (empMatches.length > 0) {
        resultsHTML += `<div style="padding:8px 12px; background:rgba(0,0,0,0.2); font-size:11px; font-weight:bold; color:var(--text-muted); text-transform:uppercase;">Employees</div>`;
        empMatches.forEach(e => {
            resultsHTML += `
                <div style="padding:10px 12px; border-bottom:1px solid var(--border-color); cursor:pointer; display:flex; align-items:center; gap:10px;" onclick="document.getElementById('searchResults').style.display='none'; window.viewEmployeeProfile(${e.id})">
                    <img src="${e.avatar}" style="width:24px; height:24px; border-radius:50%;">
                    <div><div style="font-size:13px; color:white;">${e.name}</div><div style="font-size:11px; color:var(--text-muted);">${e.role} - ${e.department}</div></div>
                </div>
            `;
        });
    }
    
    // Search Candidates
    const candMatches = DB.candidates.filter(c => c.name.toLowerCase().includes(query) || c.position.toLowerCase().includes(query));
    if (candMatches.length > 0) {
        resultsHTML += `<div style="padding:8px 12px; background:rgba(0,0,0,0.2); font-size:11px; font-weight:bold; color:var(--text-muted); text-transform:uppercase;">Candidates</div>`;
        candMatches.forEach(c => {
            resultsHTML += `
                <div style="padding:10px 12px; border-bottom:1px solid var(--border-color); cursor:pointer;" onclick="document.getElementById('searchResults').style.display='none'; window.viewCandidate(${c.id})">
                    <div style="font-size:13px; color:white;">${c.name}</div><div style="font-size:11px; color:var(--text-muted);">${c.position} (${c.status})</div>
                </div>
            `;
        });
    }
    
    if (resultsHTML) {
        resultsContainer.innerHTML = resultsHTML;
        resultsContainer.style.display = 'block';
    } else {
        resultsContainer.innerHTML = `<div style="padding:15px; text-align:center; color:var(--text-muted); font-size:13px;">No results found for "${query}"</div>`;
        resultsContainer.style.display = 'block';
    }
};

window.offboardEmployee = function(empId) {
    const e = DB.employees.find(x => x.id === empId);
    if (!e) return;
    
    Swal.fire({
        title: `Offboard: ${e.name}`,
        html: `
            <div style="text-align:left;">
                <label style="font-size:12px; color:var(--primary);">Resignation/Termination Date</label>
                <input id="off-date" type="date" class="form-control" value="${new Date().toISOString().split('T')[0]}" style="margin-bottom:10px;">
                
                <label style="font-size:12px; color:var(--primary);">Status Change</label>
                <select id="off-status" class="form-control" style="margin-bottom:10px;">
                    <option value="Resigned">Resigned</option>
                    <option value="Terminated">Terminated</option>
                </select>
                
                <label style="font-size:12px; color:var(--primary);">Exit Interview Notes</label>
                <textarea id="off-notes" class="form-control" rows="3" placeholder="Reason for leaving, feedback, etc."></textarea>
            </div>
        `,
        background: '#0f172a', color: 'white',
        showCancelButton: true, confirmButtonText: 'Confirm Offboarding', confirmButtonColor: '#ef4444',
        preConfirm: () => {
            return {
                date: document.getElementById('off-date').value,
                status: document.getElementById('off-status').value,
                notes: document.getElementById('off-notes').value
            };
        }
    }).then(res => {
        if(res.isConfirmed) {
            e.status = res.value.status;
            e.exitDate = res.value.date;
            e.exitNotes = res.value.notes;
            
            // Reclaim all assets
            if(e.onboarding && e.onboarding.assets) {
                e.onboarding.assets = [];
            }
            
            saveDB();
            Swal.fire('Offboarded', `${e.name} has been marked as ${e.status}. All assigned assets have been logged as returned.`, 'success').then(() => {
                if (document.querySelector('.page-title') && document.querySelector('.page-title').innerText === 'Employee Directory') {
                    renderView('employees');
                } else {
                    renderView('dashboard');
                }
            });
        }
    });
};
