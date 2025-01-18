const sqlite3 = require('sqlite3').verbose();

// Use the absolute path to the database
const db = new sqlite3.Database('D:/VSC/MedicalRecordsSystem/sqlite-dll-win-x64-3480000/medical_records.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
        return;
    }
    console.log('Connected to the database.');

    // Test query
    db.all('SELECT * FROM Patients', [], (err, rows) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return;
        }
        console.log('Patients:', rows);
    });

    // Close the database
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
});
