
const Repository = require('./Repository');
class TasksRepository  extends Repository{}
module.exports = new TasksRepository('tasks.json')