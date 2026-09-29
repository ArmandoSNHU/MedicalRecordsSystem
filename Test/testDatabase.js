const assert = require('assert');
const { DatabaseSync } = require('node:sqlite');

const { seedDatabase } = require('../seed');

// Run against a throwaway in-memory database so the test never touches any real
// data file and always starts from a known, clean state.
function run() {
    const db = new DatabaseSync(':memory:');

    const seededCount = seedDatabase(db);

    // Every seeded record should be readable back.
    const rows = db.prepare('SELECT * FROM Patients ORDER BY PatientID').all();
    assert.strictEqual(rows.length, seededCount, 'row count matches seed count');

    // Records carry the expected columns.
    assert.ok(rows[0].Name, 'first patient has a name');
    assert.ok('DOB' in rows[0], 'records expose a DOB field');

    // Name search (the core API query) returns matches.
    const matches = db.prepare('SELECT * FROM Patients WHERE Name LIKE ?').all('%Johnson%');
    assert.ok(matches.length >= 1, 'name search returns a match');

    db.close();
    return rows.length;
}

try {
    const count = run();
    console.log(`PASS: database seed and query checks (${count} records verified).`);
    process.exit(0);
} catch (err) {
    console.error('FAIL:', err.message);
    process.exit(1);
}
