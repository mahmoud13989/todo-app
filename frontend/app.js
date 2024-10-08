const taskListElements = document.querySelector('#task-list');
const taskInputId = document.querySelector('#task-input-id');
const taskBtn = document.querySelector('#task-button-id')
const logoutBtn = document.querySelector('#log-out')
const appElement = document.querySelector('#root');
const query = window.location.search
    .replace('?', '')
    .split('&')
    .map(q => {
        const splitted = q.split('=');
        return { [splitted[0]]: splitted[1] }
    })
    .reduce((state, item) => {
        return { ...state, ...item };
    })
let access_token = localStorage.getItem('access_token');
let currentUser = access_token != null ? parseJwt(access_token).email : null;

console.log({ currentUser })

async function updateLi(taskId, newTitle) {
    var taskID = taskId;
    const updateInput = document.getElementById(taskId);
    const liElement = document.getElementById(`li${taskId}`)
    const updateBtn = document.getElementById(`update${taskId}`)
    const cancelBtn = document.getElementById(`cancel${taskId}`)
    const editBtn = document.getElementById(`editBtn${taskId}`)
    const deleteBtn = document.getElementById(`delete.${taskId}`)
    const oldTitle = updateInput.value;
    editBtn.classList.add('hidden')
    liElement.classList.add('hidden');
    updateInput.classList.remove('hidden')
    updateBtn.classList.remove('hidden')
    cancelBtn.classList.remove('hidden')
    deleteBtn.classList.remove('hidden')
    updateInput.addEventListener('input', function (event) {
        newTitle = event.target.value;

    })
    updateBtn.addEventListener('click', async function () {
        const userConfirmed = confirm('Are You Sure to update this task ?');
        if (userConfirmed) {
            updateInput.value = '';
            const updateLi = await xhRequest('PUT', `${config.url}/tasks/${taskID}`, oldTitle, newTitle, access_token);
            console.log(updateLi)
            await getAllTasks();
            return;
        }
        else {
            await getAllTasks();
        }
    })
    cancelBtn.addEventListener('click', async function () {
        await getAllTasks();
    })
    deleteBtn.addEventListener('click', async function () {
        const confirmDeletion = confirm('Are you sure you want to delete this task title ?');
        if (confirmDeletion) {
            await xhRequest('DELETE', `${config.url}/tasks/${taskID}`, null, null, access_token)
            await getAllTasks();
        }
        else {
            await getAllTasks();
        }
    })
}
async function createTask() {
    let newTaskTitle = taskInputId.value;
    if (!newTaskTitle) {
        alert('You need to enter  task title');
        return;
    }
    const addTotaskList = await xhRequest('POST', `${config.url}/tasks`, newTaskTitle, null, access_token);
    taskInputId.value = '';
    getAllTasks();
}
async function getAllTasks() {
    if (currentUser === null) {
        appElement.innerHTML = `<h1>You Must Login To use the application</h1><a href="login/login.html">login</a> or <a href="signup/signup.html">register</a>`
    }
    try {
        let response = await fetch(`${config.url}/tasks`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${access_token}`
                }
            }
        )
        if (response.status === 401) {
           const refreshTokenResult = await refreshToken();
            if (refreshTokenResult === null){
                navigateToLoginPage();
                return;
            }
        }
        if (response.ok) {
            const state = await response.json();
            taskListElements.innerHTML = state.reduce((state, task) => `${state}<li id="li${task.id}">${task.title} <button  onclick = "updateLi('${task.id}','newTitle')"  id="editBtn${task.id}" >Edit</button></li>
                    <input id="${task.id}" class="hidden gowun-batang-bold" value="${task.title}"> <button class="hidden" id="cancel${task.id}">Cancel</button><button class="hidden" id="update${task.id}">Update</button> <button class="hidden" id='delete.${task.id}'>Delete Task</button>`, '')
        }

    }
    catch (exc) {
        console.error(`Error occured while fetching data: `, exc);
        taskListElements.innerHTML = `<li>Erorr Cannot load data<li>`
    }
}

getAllTasks();
taskBtn.addEventListener('click', createTask);
logoutBtn.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('access_token')
    location.reload();
})
