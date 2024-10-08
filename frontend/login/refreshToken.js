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
async function refreshToken() {
    const currentRefreshToken = localStorage.getItem('refresh_token');
    const response = await fetch(`${config.url}/refresh_token`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ refresh_token: currentRefreshToken })
    });
    if (response.ok) {
        const data = await response.json(); // parsing body of the response object
        // console.log(data)
        updateLocalStorage(data);
        access_token = data.access_token;
        response = await fetch(`${config.url}/tasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${access_token}`
            }
        })

    }
    else if (response.status === 401) {
        return null;
    }
    return { access_token: data.access_token, refresh_token: data.refresh_access_token }
}