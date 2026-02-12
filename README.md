# Expense Tracker

Take control of your finances — simple, fast, reliable.

Simple Expense Tracker (Node.js + Express) with a minimal, professional front-end.

Quick start

1. Install dependencies

```bash
npm install
```

2. Start server (port 3000)

```bash
npm start
```

Optional: open browser automatically

```bash
OPEN_BROWSER=1 npm start
```

3. Run tests

```bash
npm test
```

Files
- `server.js` - entrypoint that starts the server
- `app.js` - Express application (exported for tests)
- `routes/expenses.js` - API endpoints
- `store.js` - in-memory store for expenses
- `public/` - front-end (HTML/CSS/JS)
- `tests/` - Jest + Supertest tests
