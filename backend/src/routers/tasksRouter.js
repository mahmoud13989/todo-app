const express = require('express');
const taskRouter = express.Router()
const {getAllTasks,createTask,updateTask,deleteTask} = require('../tasks/controlTasks');

taskRouter.get('',getAllTasks);
taskRouter.post('',createTask);
taskRouter.put('/:id' ,updateTask);
taskRouter.delete('/:id',deleteTask);


module.exports = taskRouter;