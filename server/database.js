const { Pool } = require('pg');

// If no connection string is provided, try connecting to a local default Postgres instance
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/myhrtool';

const pool = new Pool({
    connectionString: connectionString,
});

const initializeDB = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL database.');
        
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

        // Check if employees exist
        const result = await client.query('SELECT count(*) as count FROM employees');
        if (parseInt(result.rows[0].count) === 0) {
            const insert = `
                INSERT INTO employees (name, email, phone, department, role, status, "joinDate", avatar, "employmentType", location, data) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            `;
            
            const defaultData1 = JSON.stringify({
                tags: ['High Performer', 'First Aid'],
                leaves: { total: 24, used: 4, accrualRate: 2 },
                salaryStructure: { basic: 80000, allowances: 15000, hourlyRate: 800 },
                statutory: { pan: '', uan: '', pfEnabled: true, esiEnabled: false, bankAccount: '', ifsc: '', ptEnabled: true, tdsPercentage: 10, taxRegime: 'New Regime' },
                onboarding: { status: 'Completed', progress: 100, checklist: [], assets: [{name: 'MacBook Pro', serial: 'MBP-001'}] }
            });
            
            const defaultData2 = JSON.stringify({
                tags: ['Product'],
                leaves: { total: 24, used: 12, accrualRate: 2 },
                salaryStructure: { basic: 70000, allowances: 10000, hourlyRate: 700 },
                statutory: { pan: '', uan: '', pfEnabled: true, esiEnabled: false, bankAccount: '', ifsc: '', ptEnabled: true, tdsPercentage: 10, taxRegime: 'New Regime' },
                onboarding: { status: 'Completed', progress: 100, checklist: [], assets: [] }
            });

            await client.query(insert, ['Sarah Connor', 'sarah@myhrtool.com', '+1 555-0101', 'Engineering', 'Lead Engineer', 'Active', '2023-01-15', 'https://i.pravatar.cc/150?u=1', 'Full-Time', 'San Francisco, CA', defaultData1]);
            await client.query(insert, ['John Smith', 'john@myhrtool.com', '+1 555-0201', 'Product', 'Product Manager', 'Active', '2022-11-01', 'https://i.pravatar.cc/150?u=2', 'Full-Time', 'New York, NY', defaultData2]);
            
            console.log('Seeded database with initial employees.');
        }
        client.release();
    } catch (err) {
        console.error('\\n======================================================');
        console.error('DATABASE CONNECTION ERROR:');
        console.error('Failed to initialize PostgreSQL database.');
        console.error('Please ensure the PostgreSQL server is running locally on port 5432,');
        console.error('or set the DATABASE_URL environment variable to a cloud Postgres instance.');
        console.error('Error Details:', err.message);
        console.error('======================================================\\n');
    }
};

initializeDB();

module.exports = pool;
