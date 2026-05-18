# Codex Guide

## Project Purpose

Medical Records System is a portfolio CRUD prototype for a healthcare-style records workflow. It demonstrates Express routes, SQLite persistence, and a static browser interface.

## Repository Layout

- `app.js` - Express server and API routes.
- `index.html`, `patient-details.html` - frontend views.
- `script.js` - frontend behavior.
- `style.css` - styling.
- `data/` - sample JSON data.
- `Test/` - test script area.
- `package.json` - dependencies.

## Common Commands

Run from the repository root:

```powershell
npm install
node app.js
```

If tests are formalized later, add an `npm test` script to `package.json` and document it here.

## Important Hygiene Notes

- Do not commit `node_modules/`.
- Do not commit local SQLite databases that may contain real or sensitive records.
- Do not commit SQLite DLL folders or generated binaries.
- Keep this project sample-data-only.
- If changing API request/response shapes, update the README API reference.

## Security Notes

This is not production-ready healthcare software. Before any real deployment, the app would need authentication, authorization, audit logging, input validation, encryption decisions, secure configuration, and privacy review.

## Verification

Start the server and manually test:

```powershell
node app.js
```

Then confirm the UI loads at `http://localhost:3000` and the patient search endpoint returns JSON.

