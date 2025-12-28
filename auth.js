function getIdToken() {
    return localStorage.getItem('id_token');
}

function requireLogin() {
    if (!getIdToken()) {
        window.location.href = './index.html';
    }
}

function logout() {
    localStorage.removeItem('id_token');
    window.location.href = './index.html';
}