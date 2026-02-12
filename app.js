const express = require('express');
const path = require('path');
const expensesRouter = require('./routes/expenses');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/expenses', expensesRouter);

module.exports = app;
