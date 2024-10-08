const express = require('express');
const userRouter = express.Router();

const { registerUser, getAllUsers, deleteUser, updateUser } = require('../users/registeration')
const { validateUser } = require('../users/validateUser')
const { login } = require('../users/login');
const { refreshToken } = require('../users/refreshToken');

userRouter.post('/signup', validateUser, registerUser);
userRouter.get('/register', getAllUsers);
userRouter.delete('/register', deleteUser)
userRouter.put('/register', updateUser)
userRouter.post('/login', login);
userRouter.post('/refresh_token',refreshToken)
module.exports = userRouter;