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
    mode: 'no-cors', // 🔥 THIS IS THE KEY
    body: JSON.stringify({
      id_token: getIdToken(),
      action: 'addIfNotExists',
      value: value
    })
  });

  // 🚨 Do NOT wait for .then() or .catch()
  // We assume success if the request was sent

  input.value = '';
  button.disabled = false;

  console.log('Request sent (fire-and-forget)');
});
