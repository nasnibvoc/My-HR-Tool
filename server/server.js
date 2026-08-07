const express = require('express');
const cors = require('cors');
const pool = require('./database');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Get all employees
app.get('/api/employees', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM employees");
        
        // Parse the JSONB 'data' column back into the object for the frontend
        const employees = result.rows.map(row => {
            const extraData = row.data ? row.data : {}; // pg parses JSONB automatically
            return { ...row, ...extraData, data: undefined };
        });
        
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new employee
app.post('/api/employees', async (req, res) => {
    const { name, email, phone, department, role, status, joinDate, avatar, employmentType, location, managerId, ...extraData } = req.body;
    
    const insert = `
        INSERT INTO employees (name, email, phone, department, role, status, "joinDate", avatar, "employmentType", location, "managerId", data) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
        RETURNING id
    `;
    const params = [name, email, phone, department, role, status || 'Active', joinDate, avatar, employmentType, location, managerId, extraData];
    
    try {
        const result = await pool.query(insert, params);
        res.json({ id: result.rows[0].id, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an employee
app.put('/api/employees/:id', async (req, res) => {
    const id = req.params.id;
    const { name, email, phone, department, role, status, joinDate, avatar, employmentType, location, managerId, ...extraData } = req.body;
    
    const update = `
        UPDATE employees 
        SET name=$1, email=$2, phone=$3, department=$4, role=$5, status=$6, "joinDate"=$7, avatar=$8, "employmentType"=$9, location=$10, "managerId"=$11, data=$12 
        WHERE id=$13
    `;
    const params = [name, email, phone, department, role, status, joinDate, avatar, employmentType, location, managerId, extraData, id];
    
    try {
        await pool.query(update, params);
        res.json({ id: id, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an employee
app.delete('/api/employees/:id', async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM employees WHERE id = $1", [req.params.id]);
        res.json({ success: true, deleted: result.rowCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`MyHRTool Backend API running on http://localhost:${port}`);
});
