// Block page if not logged in
requireLogin();

//Eventlistener: Go to add thing
document.getElementById('buttonGoToAddThing').addEventListener('click', () => {
  window.location.href = './add-thing.html';
});

document.getElementById('buttonGoToAddUser').addEventListener('click', () => {
  window.location.href = './add-user.html';
});