const express = require('express');
const router = express.Router();
const store = require('../store');

router.post('/', (req, res) => {
  const { amount, category, description, date } = req.body;
  const amt = Number(amount);
  if (!category || typeof category !== 'string' || category.trim() === '') {
    return res.status(400).json({ error: 'Invalid category' });
  }
  if (!Number.isFinite(amt) || amt <= 0) {
    return res.status(400).json({ error: 'Amount must be > 0' });
  }
  const exp = store.createExpense({ amount: amt, category: category.trim(), description, date });
  res.status(201).json(exp);
});

router.get('/total', (req, res) => {
  const total = store.expenses.reduce((s, e) => s + Number(e.amount), 0);
  res.json({ total });
});

router.get('/', (req, res) => {
  res.json(store.expenses);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const exp = store.expenses.find((e) => e.id === id);
  if (!exp) return res.status(404).json({ error: 'Not found' });
  const { amount, category, description, date } = req.body;
  if (amount !== undefined) {
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) return res.status(400).json({ error: 'Amount must be > 0' });
    exp.amount = amt;
  }
  if (category !== undefined) {
    if (!category || category.trim() === '') return res.status(400).json({ error: 'Invalid category' });
    exp.category = category.trim();
  }
  if (description !== undefined) exp.description = description;
  if (date !== undefined) exp.date = date;
  res.json(exp);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const idx = store.expenses.findIndex((e) => e.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  store.expenses.splice(idx, 1);
  res.json({ ok: true });
});

module.exports = router;
