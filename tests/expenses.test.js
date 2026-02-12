const request = require('supertest');
const app = require('../app');
const store = require('../store');

beforeEach(() => {
  store.reset();
});

test('Add valid expense', async () => {
  const res = await request(app)
    .post('/expenses')
    .send({ amount: 10, category: 'Food', description: 'Lunch', date: '2026-02-09' });
  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty('id');
  expect(res.body.amount).toBe(10);
});

test('Reject invalid expense', async () => {
  const res = await request(app).post('/expenses').send({ amount: 0, category: '', description: '' });
  expect(res.statusCode).toBe(400);
});

test('Calculate total correctly', async () => {
  await request(app).post('/expenses').send({ amount: 10, category: 'A' });
  await request(app).post('/expenses').send({ amount: 20, category: 'B' });
  const res = await request(app).get('/expenses/total');
  expect(res.statusCode).toBe(200);
  expect(res.body.total).toBe(30);
});

test('Delete an expense', async () => {
  const r = await request(app).post('/expenses').send({ amount: 5, category: 'X' });
  const id = r.body.id;
  const del = await request(app).delete(`/expenses/${id}`);
  expect(del.statusCode).toBe(200);
  const list = await request(app).get('/expenses');
  expect(list.body).toEqual([]);
});
