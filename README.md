# Medical Records System

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/API-Express-000000)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-SQLite-044a64)](https://www.sqlite.org/)

Medical Records System is a full-stack patient record management prototype. It demonstrates a basic healthcare-style CRUD workflow with an Express API, SQLite storage, and a browser-based interface for searching, viewing, adding, and updating records.

This is a portfolio and learning project. It must use sample data only and should not be used with real patient records, protected health information, credentials, or production medical data.

## Features

- Search patient records by name.
- View patient demographic details.
- Add new patient records through a web form.
- Update existing records through API-backed UI actions.
- Serve static frontend assets from the Express application.
- Store structured records in SQLite for local development.

## Architecture

```text
Browser UI
   |
   | HTTP requests
   v
Express server (app.js)
   |
   | SQL queries
   v
SQLite database
```

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express |
| Database | SQLite |
| Testing | Node-based test script under `Test/` |

## Quick Start

Run from the repository root:

```powershell
npm install
node app.js
```

Then open:

```text
http://localhost:3000
```

## API Reference

### Search Patients

```http
GET /api/patients?name=<searchTerm>
```

Returns patient records whose names match the provided search term.

### Get Patient By ID

```http
GET /api/patients/:id
```

Returns a single patient record.

### Create Patient

```http
POST /api/patients
Content-Type: application/json
```

```json
{
  "name": "Jane Doe",
  "dob": "1990-01-01",
  "address": "123 Main St",
  "phone": "555-0100"
}
```

### Update Patient

```http
PUT /api/patients
Content-Type: application/json
```

```json
{
  "id": 1,
  "name": "Jane Doe",
  "dob": "1990-01-01",
  "address": "456 Oak Ave",
  "phone": "555-0199"
}
```

## Repository Structure

```text
MedicalRecordsSystem/
├── app.js                    # Express server and API routes
├── index.html                # Main patient search and entry UI
├── patient-details.html      # Patient detail view
├── script.js                 # Frontend behavior
├── style.css                 # Application styling
├── data/                     # Sample JSON data
├── Test/                     # Test scripts
├── package.json              # Node dependencies
└── README.md
```

## Repository Hygiene Notice

This repository currently contains generated dependency and binary artifacts, including `node_modules/` and SQLite DLL files. For a cleaner public portfolio repository, those should be removed from version control and regenerated locally with `npm install`.

The added `.gitignore` prevents future commits of dependency folders, local databases, logs, and environment files.

## Security And Privacy

- Use sample data only.
- Do not commit real patient information.
- Do not commit database files containing sensitive data.
- Add authentication and authorization before any real deployment scenario.
- Treat this project as a prototype, not a production medical records platform.

## Roadmap

- Add authentication and role-based access control.
- Move database path and server port into environment configuration.
- Add request validation and consistent error responses.
- Add pagination for large record sets.
- Add automated API tests.

## Author

Armando Gomez  
GitHub: [@ArmandoSNHU](https://github.com/ArmandoSNHU)
