requireLogin();

const input = document.getElementById('inputAddThing');
const button = document.getElementById('buttonAddThing');

button.addEventListener('click', () => {
  const value = input.value.trim();

  if (!value) {
    return;
  }

  fetch(BACKEND_URL, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + getIdToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action: 'addIfNotExists',
      value: value
    })
  })
  .then(r => r.json())
  .then(result => {
    console.log(result.message);
    if (result.added) {
      input.value = '';
    }
  });
});