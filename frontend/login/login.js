const emailInput = document.getElementById('email-login-input')
const passwordInput = document.getElementById('password-login-input')
const submitBtn = document.getElementById('submit-login-btn')
const errorMessageBox = document.getElementById("error-box")

function validateCredentials(credentials) {
    if (credentials.email === '')
        return 'must enter an email'

    if (credentials.password === '')
        return 'must enter a password'
    return null;
}








submitBtn.addEventListener('click', async function (event) {
    event.preventDefault()
    console.log('clicked')
    const credentials = {
        email: emailInput.value,
        password: passwordInput.value
    }

    const error = validateCredentials(credentials);

    if (error) {
        errorMessageBox.innerHTML = `<p style ="color:red;">${error}</p>`
        return
    }
    let response;

    response = await fetch(`${config.url}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials) // 
    })

    const responseJsonData = await response.json();

    if (response.status === 200) {
       
        window.localStorage.setItem('access_token', responseJsonData.access_token)
        window.localStorage.setItem('refresh_token', responseJsonData.refresh_token)
        window.location.href = `/frontend/index.html?`;
    }
    else {
        errorMessageBox.innerHTML = `<p style ="color:red;">${responseJsonData?.message}</p>`
    }
})
