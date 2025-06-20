// DOM elements
const form = document.getElementById('form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const list = document.getElementById('transaction-list');
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');

// Load from localStorage or start with empty array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Format number as ₹
function formatRupee(num) {
  return '₹' + parseFloat(num).toFixed(2);
}

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  const desc = descriptionInput.value.trim();
  const amt = parseFloat(amountInput.value.trim());

  if (desc === '' || isNaN(amt)) {
    alert('Please enter valid description and amount');
    return;
  }

  const transaction = {
    id: Date.now(),
    description: desc,
    amount: amt
  };

  transactions.push(transaction);
  updateLocalStorage();
  renderTransactions();
  form.reset();
}

// Delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter(txn => txn.id !== id);
  updateLocalStorage();
  renderTransactions();
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Render all transactions
function renderTransactions() {
  list.innerHTML = '';

  transactions.forEach(txn => {
    const li = document.createElement('li');
    li.classList.add(txn.amount < 0 ? 'minus' : 'plus');
    li.innerHTML = `
      ${txn.description}
      <span>${txn.amount < 0 ? '-' : '+'}${formatRupee(Math.abs(txn.amount))}</span>
      <button class="delete-btn" onclick="deleteTransaction(${txn.id})">❌</button>
    `;
    list.appendChild(li);
  });

  updateBalance();
}

// Update balance summary
function updateBalance() {
  const amounts = transactions.map(txn => txn.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const income = amounts.filter(a => a > 0).reduce((a, b) => a + b, 0).toFixed(2);
  const expense = (
    amounts.filter(a => a < 0).reduce((a, b) => a + b, 0) * -1
  ).toFixed(2);

  balanceEl.innerText = formatRupee(total);
  incomeEl.innerText = `+${formatRupee(income)}`;
  expenseEl.innerText = `-${formatRupee(expense)}`;
}

// Initialize
form.addEventListener('submit', addTransaction);
renderTransactions();