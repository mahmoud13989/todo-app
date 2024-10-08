function navigateToLoginPage() {
    window.location.href = "login/login.html";
    window.localStorage.removeItem('access-token')
    window.localStorage.removeItem('refresh-token');
}

function updateLocalStorage(data) {
    if (data.access_token !== null && data.refreshToken !== null){
        window.localStorage.setItem('access_token', data.access_token);
        window.localStorage.setItem('refresh_token', data.access_token);
    }
}