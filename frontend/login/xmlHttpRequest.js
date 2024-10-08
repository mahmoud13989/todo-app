function xhRequest(method, url, title = null, newTitle = null, token = null) {
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