requireLogin();

const input = document.getElementById('inputAddUser');
const button = document.getElementById('buttonAddUser');
const tableBody = document.getElementById('userTableBody');

loadUsers();

function loadUsers() {
  fetch(BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id_token: getIdToken(),
      action: 'listUsers'
    })
  })
  .then(r => r.json())
  .then(data => {
    tableBody.innerHTML = '';

    data.users.forEach(user => {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.textContent = user;
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });
  })
  .catch(err => {
    console.error('Failed to load users', err);
  });
}

// 🔹 add user
button.addEventListener('click', () => {
  const value = input.value.trim();
  if (!value) return;

  button.disabled = true;

  fetch(BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id_token: getIdToken(),
      action: 'addUser',
      value
    })
  })
  .then(() => {
    input.value = '';
    loadUsers(); // 🔁 refresh table
  })
  .finally(() => {
    button.disabled = false;
  });
});
