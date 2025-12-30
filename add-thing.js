// Block page if not logged in
requireLogin();

const input = document.getElementById('inputAddThing');
const button = document.getElementById('buttonAddThing');

button.addEventListener('click', () => {
  const value = input.value.trim();
  if (!value) return;

  button.disabled = true;

  fetch(BACKEND_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({
      id_token: getIdToken(),
      action: 'addIfNotExists',
      value: value
    })
  });

  input.value = '';
  button.disabled = false;

  window.location.href = './add-thing.html';
});
