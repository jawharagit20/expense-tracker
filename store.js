const expenses = [];
let nextId = 1;

function reset() {
  expenses.length = 0;
  nextId = 1;
}

function createExpense({ amount, category, description, date }) {
  const exp = {
    id: String(nextId++),
    amount: Number(amount),
    category,
    description: description || '',
    date: date || new Date().toISOString().slice(0, 10),
  };
  expenses.push(exp);
  return exp;
}

module.exports = { expenses, createExpense, reset };
