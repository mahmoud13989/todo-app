
const originalFetch = window.fetch.bind(window);


window.fetch = async function(...args) {
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
