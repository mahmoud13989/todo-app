const formElement = document.getElementById('signup-form')
const firstNameInput = document.querySelector('#first-name-input');
const lastNameInput = document.querySelector('#last-name-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const passwordConfirmationInput = document.querySelector('#passwordConfirmation-input');
const submitBtn = document.querySelector('#submit-all-inputs');
const errorMessagesBox = document.getElementById('error-messages')

function validateUserObj(userObj) {
    if (userObj.firstName === '')
        return 'you must enter a first name'
    if (userObj.lastName === '')
        return 'you must enter last name'
    if (userObj.email === '')
        return 'you must enter email'
    if (userObj.password === '')
        return 'you must enter password'
    if (userObj.password !== userObj.passwordConfirmation)
        return 'password must match'
    return null;
}

formElement.addEventListener('submit', async function (e) {
    e.preventDefault();
    // if you want to start after port use absoulate path starts with "/"
    // if you want to change the end of the url use relative path that doesn't start with "/"
    // window.location.href= '/src/application/login/login.html'
    // window.location.href= 'login.html'

    const userObj = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        passwordConfirmation: passwordConfirmationInput.value
    };
    const error = validateUserObj(userObj);
    if (error) {
        errorMessagesBox.innerHTML = `<p style = "color : red ;">${error}</p>`
        return;
    }
    console.log(userObj)

    const response = await sendXMLHttpRequest(`${config.url}/signup`, 'POST', userObj);
    console.log('redirectiong to logIn page')
    window.location.href = "/frontend/login/login.html";

})

async function sendXMLHttpRequest(url, method, data = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // The operation is complete
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const response = JSON.parse(xhr.responseText); // Parse JSON response
                        resolve(response);
                    } catch (error) {
                        reject(new Error('Error parsing response: ' + error.message));
                    }
                } else {
                    reject(new Error(`HTTP error! Status: ${xhr.status}, Response: ${xhr.responseText}`));
                     errorMessagesBox.innerHTML = `<p style = "color : red ;">${JSON.parse(xhr.responseText).message}</p>`
                }
            }
        };

        xhr.onerror = function () {
            reject(new Error('Network Error'));
        };

        if (data) {
            xhr.send(JSON.stringify(data)); // Send data as JSON if provided
        } else {
            xhr.send();
        }
    });
}


