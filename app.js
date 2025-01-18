const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express(); // Initialize the Express app
const PORT = 3000;

// Middleware to parse JSON data in requests
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Connect to SQLite database
const db = new sqlite3.Database('./sqlite-dll-win-x64-3480000/medical_records.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the database.');
    }
});

// API: Search patients by name
app.get('/api/patients', (req, res) => {
    const name = req.query.name || '';
    const query = 'SELECT * FROM Patients WHERE Name LIKE ?';
    const params = [`%${name}%`];

    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Database query error:', err.message);
            res.status(500).json({ error: 'Database query error' });
        } else {
            res.json(rows);
        }
    });
});

// API: Get patient details by ID
app.get('/api/patients/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Patients WHERE PatientID = ?';

    db.get(query, [id], (err, row) => {
        if (err) {
            console.error('Database query error:', err.message);
            res.status(500).json({ error: 'Database query error' });
        } else {
            res.json(row || { error: 'Patient not found' });
        }
    });
});

// API: Add a new patient
app.post('/api/patients', (req, res) => {
    const { name, dob, address, phone } = req.body;

    const query = 'INSERT INTO Patients (Name, DOB, Address, PhoneNumber) VALUES (?, ?, ?, ?)';
    const params = [name, dob, address, phone];

    db.run(query, params, function (err) {
        if (err) {
            console.error('Database insert error:', err.message);
            res.status(500).json({ error: 'Database insert error' });
        } else {
            res.json({ message: 'Patient added successfully', id: this.lastID });
        }
    });
});

// API: Edit an existing patient
app.put('/api/patients', (req, res) => {
    const { id, name, dob, address, phone } = req.body;

    const query = 'UPDATE Patients SET Name = ?, DOB = ?, Address = ?, PhoneNumber = ? WHERE PatientID = ?';
    const params = [name, dob, address, phone, id];

    db.run(query, params, function (err) {
        if (err) {
            console.error('Database update error:', err.message);
            res.status(500).json({ error: 'Database update error' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Patient not found' });
        } else {
            res.json({ message: 'Patient updated successfully' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
