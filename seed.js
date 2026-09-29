const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'medical_records.db');
const MOCK_DATA_PATH = path.join(__dirname, 'mockData.json');

const CREATE_TABLE_SQL = `
    CREATE TABLE IF NOT EXISTS Patients (
        PatientID   INTEGER PRIMARY KEY,
        Name        TEXT NOT NULL,
        DOB         TEXT,
        Address     TEXT,
        PhoneNumber TEXT
    )
`;

// Create the Patients table (if needed) and load it with the sample records
// from mockData.json. Existing rows are cleared first so seeding is repeatable.
// `db` is a node:sqlite DatabaseSync instance; returns the number of rows loaded.
function seedDatabase(db) {
    const patients = JSON.parse(fs.readFileSync(MOCK_DATA_PATH, 'utf8'));

    db.exec(CREATE_TABLE_SQL);
    db.exec('DELETE FROM Patients');

    const insert = db.prepare(
        'INSERT INTO Patients (PatientID, Name, DOB, Address, PhoneNumber) VALUES (?, ?, ?, ?, ?)'
    );
    for (const p of patients) {
        insert.run(p.PatientID, p.Name, p.DOB, p.Address, p.PhoneNumber);
    }
    return patients.length;
}

module.exports = { seedDatabase, DB_PATH, CREATE_TABLE_SQL };

// When run directly (`npm run seed`), build a fresh database from the sample data.
if (require.main === module) {
    const { DatabaseSync } = require('node:sqlite');
    const db = new DatabaseSync(DB_PATH);
    try {
        const count = seedDatabase(db);
        console.log(`Seeded ${count} patient records into ${DB_PATH}`);
    } catch (err) {
        console.error('Error seeding database:', err.message);
        process.exitCode = 1;
    } finally {
        db.close();
    }
}
