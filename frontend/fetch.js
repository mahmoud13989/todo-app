
const originalFetch = window.fetch.bind(window);


async function refreshToken() {
    const currentRefreshToken = localStorage.getItem('refresh_token');
    const response = await originalFetch(`${config.url}/refresh_token`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ refresh_token: currentRefreshToken })
    });
    if (response.ok) {
        const data = await response.json(); // parsing body of the response object
        // console.log(data)
        updateLocalStorage(data);
        access_token = data.access_token;
        response = await originalFetch(`${config.url}/tasks`, {
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

window.fetch = async function (...args) {
    let response = await originalFetch(...args);

    if (response.status == 401) {
        const refreshTokenResult = await refreshToken();
        if (refreshTokenResult == null) {
            navigateToLoginPage();
            return;
        }
        if (typeof args[0] == 'string') {
            // fetch('sdfsdfs', { headers: { Authorization: 'sdfsdf' } });
            // args[0] // url
            args[1].headers.Authorization = `Bearer ${refreshTokenResult.access_token}`;
        } else {
            // fetch({ url: 'sdfdsfsd', headers: { Authorization: 'dsf' } });
            args[0].headers.Authorization = `Bearer ${refreshTokenResult.access_token}`;
        }
        response = await originalFetch(...args);
    }
    return response;
}


