const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const userRouter = require('./src/routers/usersRouter')
const taskRouter = require('./src/routers/tasksRouter')
const { auth } = require('./src/utilities/middlewares');


// app.use(express.static('frontend'));
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/healthcheck', (_, res) => res.send("Still there..."))
app.use(userRouter);
app.use('/tasks', auth, taskRouter);



app.listen(3000, () => {
    console.log('server initiated on port 3000')
})


