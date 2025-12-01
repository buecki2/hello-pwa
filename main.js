const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwWdGfRWufhuuKMB1qgIw0uiIYKzcNiz3BZ9OGJuJZJkrNDdnEjKWDKwx4tmCkZXMtV0g/exec'; // from Apps Script deployment
const allowed = []; // not used client-side but helpful for debugging

let currentIdToken = null;

// Initialize the Google Identity Services button
window.onload = function() {
  // Render a "Sign in with Google" button
  google.accounts.id.initialize({
    client_id: 'PASTE_YOUR_OAUTH_CLIENT_ID.apps.googleusercontent.com', // see below how to get this
    callback: handleCredentialResponse,
    auto_select: false,
    cancel_on_tap_outside: true
  });

  google.accounts.id.renderButton(
    document.getElementById('g_signin'),
    { theme: 'outline', size: 'large' }  // customization
  );

  // Optionally prompt if user is already signed in (silent)
  google.accounts.id.prompt(); // may show nothing if user already has an active session
};

function handleCredentialResponse(response) {
  // response.credential is the ID token
  currentIdToken = response.credential;
  document.getElementById('status').innerText = 'Signed in';
  document.getElementById('refresh').style.display = 'inline';
  fetchGreeting();
}

document.getElementById('refresh').addEventListener('click', fetchGreeting);

async function fetchGreeting() {
  if (!currentIdToken) {
    document.getElementById('output').innerText = 'Please sign in first.';
    return;
  }
  const url = APPS_SCRIPT_URL + '?id_token=' + encodeURIComponent(currentIdToken);
  try {
    const r = await fetch(url);
    const j = await r.json();
    if (j.error) {
      document.getElementById('output').innerText = 'Error: ' + JSON.stringify(j);
    } else {
      document.getElementById('output').innerText = j.hello;
    }
  } catch (err) {
    document.getElementById('output').innerText = 'Fetch failed: ' + err;
  }
}
