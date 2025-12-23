function handleLogin(response) {
    localStorage.setItem('id_token', response.credential);

    window.location.href = './app.html'
}