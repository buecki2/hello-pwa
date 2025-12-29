// Block page if not logged in
requireLogin();

const input = document.getElementById('inputAddThing');
const button = document.getElementById('buttonAddThing');

button.addEventListener('click', () => {
  const value = input.value.trim();

  if (!value) {
    return;
  }

  // Optional: prevent double clicks
  button.disabled = true;

  fetch(BACKEND_URL, {
    method: 'POST',
    body: JSON.stringify({
      id_token: getIdToken(),
      action: 'addIfNotExists',
      value: value
    })
  })
  .then(() => {
    // We assume success if the request was sent
    input.value = '';
    console.log('Request sent successfully');
  })
  .catch(err => {
    console.error('Network error', err);
    alert('Network error while saving');
  })
  .finally(() => {
    button.disabled = false;
  });
});
