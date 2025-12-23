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