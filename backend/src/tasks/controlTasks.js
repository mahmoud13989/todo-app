const taskRepo = require('./toDosStorage');

const responseDto = {
    create(title){
        return {
            message:'Task Created',
            status: 'OK',
            task:{title}
        }
    },
    delete(title){
        return {
            message: 'Task Deleted',
            status: 'ok',
            task:{title}
        }
    },
    update(title,newtitle){
        return {
            message: 'Task updated',
            status: 'ok',
            oldtask:{title},
            updatedtask:{newtitle}
        }
    },
    allTasksList(tasks){
        return tasks.map( task => {
            return {
                id : task.id,
                title:task.title,
                status:'Ok'
            }
        })
    } 
}
module.exports = {
    async getAllTasks(req, res) {
        const tasks = await taskRepo.getAll();
        const filteredTasks = tasks.filter(task => task.user === req.currentUser.email) 
        res.send(responseDto.allTasksList(filteredTasks));
    },
    async updateTask(req, res) {
        const {body,params} = req;
        const { title, newTitle } = body;
        const {id} = params;
        const task = await taskRepo.getOneBy({title});
        const taskById = await taskRepo.getOneBy({id});
        // console.log(req.currentUser.email);
        const updateProcess = await taskRepo.update(title, newTitle);
        if (taskById.user !== task.user){
            return res.status(409).send({message: 'you must choose the corresponding task to update'})
        }
        else{
            if (task.user !== req.currentUser.email){
                return res.status(409).send({message: 'this task does not belong to you'})
            }
            if (!updateProcess)
                return res.status(400).send('Can not update this task');
        }

        res.send(responseDto.update(title,newTitle))
    },
    async deleteTask(req, res) {
        const task  = await taskRepo.getOneBy({id:req.params.id});
        const deleteProcess = await taskRepo.delete({ id:req.params.id});
        if (task.user !== req.currentUser.email){
            return res.status(409).send({message: 'this task does not belong to you'})
        }
        if (!deleteProcess)
            return res.status(400).send('Can not delete this task');

        res.status(200).send(responseDto.delete(task.title));
    },
    async createTask(req, res) {
        const title = req.body.title;
        const user = req.currentUser.email;
        const creatingTask = await taskRepo.create({ title, user });
        if (!creatingTask) {
            return res.status(400).send('Can not create new Task');
        }
        console.log(creatingTask.title)
        res.status(200).send(responseDto.create(creatingTask.title))
    }
}

