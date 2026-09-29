# Medical Records System

[![Node.js](https://img.shields.io/badge/Node.js-22.5%2B-339933)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/API-Express-000000)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-SQLite-044a64)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

A full-stack patient records management prototype. It demonstrates a healthcare-style
CRUD workflow with an Express REST API, SQLite storage, and a browser-based interface
for searching, viewing, adding, and updating patient records.

> **Sample data only.** This is a portfolio and learning project. It ships with
> fictional records and must not be used with real patient information, protected
> health information (PHI), credentials, or production medical data.

## Features

- Search patient records by name.
- View a patient's demographic details.
- Add new patient records through the API / web form.
- Update existing patient records.
- Serve the static front end directly from the Express application.
- Store structured records in SQLite, seeded from `mockData.json` on first run.

## Tech Stack

| Layer     | Technology                                             |
| --------- | ------------------------------------------------------ |
| Frontend  | HTML, CSS, vanilla JavaScript                          |
| Backend   | Node.js, Express                                       |
| Database  | SQLite via Node's built-in `node:sqlite` driver        |
| Testing   | Node assertion script (`Test/testDatabase.js`)         |

There is no native build step: the app uses the SQLite driver that ships with
Node.js (available in Node 22.5+), so the only runtime dependency is Express.

## Architecture

```text
Browser UI (index.html / script.js)
        |
        |  HTTP (fetch) requests
        v
Express server (app.js)
        |
        |  SQL queries
        v
SQLite database (medical_records.db, generated locally)
```

## Requirements

- Node.js 22.5 or newer (for the built-in `node:sqlite` module).

## How to Run

From the repository root:

```bash
npm install
npm start
```

Then open <http://localhost:3000> in a browser.

On first launch the app creates `medical_records.db` and seeds it with the sample
records from `mockData.json`. The listening port can be overridden with the `PORT`
environment variable.

To rebuild the database from the sample data at any time:

```bash
npm run seed
```

## How to Test

```bash
npm test
```

The test seeds an in-memory database from `mockData.json` and asserts that records
can be read back and searched by name. It exits non-zero on failure.

## API Reference

### Search patients

```http
GET /api/patients?name=<searchTerm>
```

Returns patient records whose names match the search term.

### Get patient by ID

```http
GET /api/patients/:id
```

Returns a single patient record.

### Create patient

```http
POST /api/patients
Content-Type: application/json

{
  "name": "Jane Doe",
  "dob": "1990-01-01",
  "address": "123 Main St",
  "phone": "555-0100"
}
```

### Update patient

```http
PUT /api/patients
Content-Type: application/json

{
  "id": 1,
  "name": "Jane Doe",
  "dob": "1990-01-01",
  "address": "456 Oak Ave",
  "phone": "555-0199"
}
```

## Data Model

Records live in the `Patients` table. Each record has the following fields:

| Field         | Type    | Description                                  |
| ------------- | ------- | -------------------------------------------- |
| `PatientID`   | INTEGER | Primary key (auto-assigned on insert).       |
| `Name`        | TEXT    | Patient full name (required).                |
| `DOB`         | TEXT    | Date of birth, `YYYY-MM-DD`.                 |
| `Address`     | TEXT    | Mailing address.                             |
| `PhoneNumber` | TEXT    | Contact phone number.                        |

The sample records in `mockData.json` are entirely fictional.

## Project Structure

```text
MedicalRecordsSystem/
├── app.js                 # Express server and REST API routes
├── seed.js                # Builds/seeds the SQLite database from mockData.json
├── mockData.json          # Fictional sample patient records (seed data)
├── index.html             # Patient search and details UI
├── patient-details.html   # Standalone patient detail view
├── script.js              # Front-end behavior for the API-backed UI
├── style.css              # Application styling
├── Test/
│   └── testDatabase.js    # Seed-and-query test
├── package.json           # Metadata, scripts, and dependencies
├── LICENSE                # MIT license
└── README.md
```

## Security and Privacy

- Use fictional sample data only.
- Do not commit real patient information or database files containing sensitive data.
- Add authentication, authorization, input validation, and audit logging before any
  real-world use.
- Treat this project as a prototype, not a production medical records platform.

## Roadmap

- Add authentication and role-based access control.
- Add request validation and consistent error responses.
- Add pagination for large record sets.
- Expand the automated test suite to cover the HTTP API layer.

## License

Released under the [MIT License](LICENSE).

## Author

Armando Gomez
GitHub: [@ArmandoSNHU](https://github.com/ArmandoSNHU)
