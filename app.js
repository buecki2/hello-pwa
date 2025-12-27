// Block page if not logged in
requireLogin();

// Now safe to load data
fetch(BACKEND_URL, {
  headers: {
    Authorization: 'Bearer ' + getIdToken()
  }
})
.then(r => r.json())
.then(data => {
  document.getElementById('content').textContent = data.greeting;
});

//Eventlistener: Go to add thing
document.getElementById('goToAddThing').addEventListener('click', () => {
  window.location.href = './add-thing.html';
});
