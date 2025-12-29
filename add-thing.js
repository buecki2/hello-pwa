requireLogin();

const input = document.getElementById('inputAddThing');
const button = document.getElementById('buttonAddThing');

button.addEventListener('click', () => {
  const value = input.value.trim();
  if (!value) return;

  fetch(BACKEND_URL, {
    method: 'POST',
    body: JSON.stringify({
      id_token: getIdToken(),
      action: 'addIfNotExists',
      value
    })
  })
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
});