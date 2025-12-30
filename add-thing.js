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
    body: JSON.stringify({
      action: 'addIfNotExists',
      value: value,
      id_token: getIdToken()
    })
  })
    .then(r => r.json())
    .then(result => {
      alert(result.message || 'Done');
      if (result.added) {
        input.value = '';
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
