// Block page if not logged in
requireLogin();

const input = document.getElementById('inputAddThing');
const button = document.getElementById('buttonAddThing');

button.addEventListener('click', () => {
  const value = input.value.trim();
  if (!value) return;

  button.disabled = true;

  addIfNotExists(value, 'things', 'A:A')
    .then(r => r.json())
    .then(result => {
      alert(result.message || 'No response, success unclear');
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
