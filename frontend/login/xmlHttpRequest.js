function xhRequest(method, url, title = null, newTitle = null, token = null) {
    return fetch({
        method,
        url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        if (token) {
            xhr.setRequestHeader('Authorization', token)
        }
        let data = null;
        if (method === 'POST') {
            data = JSON.stringify({ title })
        }
        if (method === 'PUT') {

            data = JSON.stringify({ title, newTitle })
        }
        if (method === 'DELETE') {
            data = JSON.stringify({ title })
        }

        xhr.send(data);

        xhr.addEventListener('readystatechange', () => {

        });

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status)
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response)
                }
                else {
                    reject({ message: 'cannot load data', status: xhr.status })
                }
            }
        }
    })
}

async function fetchData(url ,method, title , newTitle, token){
    const options = {
        headers:{
            'Content-Type':'application/json',
        }
    }
    let data = null;
    if (method == 'POST')
        data = JSON.stringify({title})
    if (method == 'PUT')
        data = JSON.stringify({title,newTitle})
    if (method == 'DELETE')
        data = JSON.stringify({title})
    if (method != 'GET'){
        options.body = data;
    }
    if (token){
        options.headers.Authorization = token;
    }

    // return
    // return Promise.resolve()

    // throw
    // return Promise.reject()
    try{
        let response = await fetch (`${url}/tasks`,options);
        let responseJsonData = await response.json();
        if (response.ok){
    
            return responseJsonData;
        }
        else {
    
            return {message : 'Cannot load data ' , status: response.status}
        }
        
    }    
    catch(exc){
        console.log('unknown error occurred while fetching data', exc)
    }
}