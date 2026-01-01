requireLogin();

const input = document.getElementById('inputAddUser');
const button = document.getElementById('buttonAddUser');
const tableBody = document.getElementById('userTableBody');

loadUsers();

function loadUsers() {
  fetch(BACKEND_URL, {
        method: 'POST',
        body: JSON.stringify({
          id_token: getIdToken(),
          action: 'listUsers'
        })
      })
    .then(r => r.json())
  .then(data => {
    for (user of data.users) {
        var row = tableBody.insertRow();
        var cell0 = row.insertCell(0);
        cell0.innerHTML = user;
    }
  })
  .catch(err => {
    console.error('Failed to load users', err);
  });
}

button.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) return;
  
    button.disabled = true;
  
    addIfNotExists(value, 'users', 'A:A')
      .then(r => r.json())
      .then(result => {
        if (result.added) {
          input.value = '';
          loadUsers();
        }
      })
      .catch(err => {
        alert('Network error while saving');
        console.error(err);
      })
      .finally(() => {
        button.disabled = false;
      });
  });
