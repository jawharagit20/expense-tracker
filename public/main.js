async function fetchExpenses() {
  const res = await fetch('/expenses');
  return res.json();
}

function formatAmount(a) {
  return Number(a).toFixed(2);
}

async function render() {
  const tbody = document.getElementById('expenses-list');
  tbody.innerHTML = '';
  const expenses = await fetchExpenses();
  let total = 0;

  expenses.forEach((e) => {
    total += Number(e.amount);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="badge category">${escapeHtml(e.category)}</span></td>
      <td><span class="amount ${Number(e.amount) < 0 ? 'negative' : ''}">${formatAmount(e.amount)} €</span></td>
      <td>${escapeHtml(e.date || '')}</td>
      <td>${escapeHtml(e.description || '')}</td>
      <td class="actions">
        <button data-id="${e.id}" class="edit">Edit</button>
        <button data-id="${e.id}" class="delete">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('total').textContent = formatAmount(total);

  document.querySelectorAll('.delete').forEach((btn) => {
    btn.addEventListener('click', async (ev) => {
      const id = ev.target.dataset.id;
      await fetch(`/expenses/${id}`, { method: 'DELETE' });
      render();
    });
  });

  document.querySelectorAll('.edit').forEach((btn) => {
    btn.addEventListener('click', async (ev) => {
      const id = ev.target.dataset.id;
      const exp = (await fetchExpenses()).find((x) => x.id === id);
      if (!exp) return;
      document.getElementById('expense-id').value = exp.id;
      document.getElementById('amount').value = exp.amount;
      document.getElementById('category').value = exp.category;
      document.getElementById('description').value = exp.description;
      document.getElementById('date').value = exp.date;
    });
  });
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, (s)=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"
  }[s]));
}

document.getElementById('expense-form').addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const id = document.getElementById('expense-id').value;
  const payload = {
    amount: Number(document.getElementById('amount').value),
    category: document.getElementById('category').value,
    description: document.getElementById('description').value,
    date: document.getElementById('date').value || undefined,
  };
  if (id) {
    await fetch(`/expenses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } else {
    await fetch('/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }
  document.getElementById('expense-form').reset();
  document.getElementById('expense-id').value = '';
  render();
});

document.getElementById('cancel-edit').addEventListener('click', () => {
  document.getElementById('expense-form').reset();
  document.getElementById('expense-id').value = '';
});

window.addEventListener('load', () => {
  // default date to today
  const date = new Date().toISOString().slice(0, 10);
  document.getElementById('date').value = date;
  render();
});
