const express = require('express');
const { DatabaseSync } = require('node:sqlite');
const { seedDatabase, DB_PATH, CREATE_TABLE_SQL } = require('./seed');

const app = express(); // Initialize the Express app
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data in requests
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Connect to the SQLite database (created on first run if it does not exist).
// Uses Node's built-in SQLite driver, so no native build step is required.
const db = new DatabaseSync(DB_PATH);

// Make sure the schema exists, and load the sample data on an empty database
// so the app is usable immediately after a fresh clone.
db.exec(CREATE_TABLE_SQL);
const { count } = db.prepare('SELECT COUNT(*) AS count FROM Patients').get();
if (count === 0) {
    const seeded = seedDatabase(db);
    console.log(`Seeded ${seeded} sample patient records.`);
}
console.log('Connected to the database.');

// API: Search patients by name
app.get('/api/patients', (req, res) => {
    const name = req.query.name || '';
    try {
        const rows = db
            .prepare('SELECT * FROM Patients WHERE Name LIKE ?')
            .all(`%${name}%`);
        res.json(rows);
    } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Database query error' });
    }
});

// API: Get patient details by ID
app.get('/api/patients/:id', (req, res) => {
    try {
        const row = db
            .prepare('SELECT * FROM Patients WHERE PatientID = ?')
            .get(req.params.id);
        res.json(row || { error: 'Patient not found' });
    } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Database query error' });
    }
});

// API: Add a new patient
app.post('/api/patients', (req, res) => {
    const { name, dob, address, phone } = req.body;
    try {
        const info = db
            .prepare('INSERT INTO Patients (Name, DOB, Address, PhoneNumber) VALUES (?, ?, ?, ?)')
            .run(name, dob, address, phone);
        res.json({ message: 'Patient added successfully', id: Number(info.lastInsertRowid) });
    } catch (err) {
        console.error('Database insert error:', err.message);
        res.status(500).json({ error: 'Database insert error' });
    }
});

// API: Edit an existing patient
app.put('/api/patients', (req, res) => {
    const { id, name, dob, address, phone } = req.body;
    try {
        const info = db
            .prepare('UPDATE Patients SET Name = ?, DOB = ?, Address = ?, PhoneNumber = ? WHERE PatientID = ?')
            .run(name, dob, address, phone, id);
        if (Number(info.changes) === 0) {
            res.status(404).json({ error: 'Patient not found' });
        } else {
            res.json({ message: 'Patient updated successfully' });
        }
    } catch (err) {
        console.error('Database update error:', err.message);
        res.status(500).json({ error: 'Database update error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
