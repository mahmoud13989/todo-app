const express = require('express');
const userRouter = express.Router();

const { registerUser, getAllUsers, deleteUser, updateUser } = require('../users/registeration')
const { validateUser } = require('../users/validateUser')
const { login } = require('../users/login');
const { refreshToken } = require('../users/refreshToken');

userRouter.post('/signup', validateUser, registerUser);
// Wrong GET http://localhost:3000/register(?) --> getAllUsers
// Right GET http://localhost:3000/user --> getAllUsers
userRouter.get('/register', getAllUsers);
userRouter.delete('/user', deleteUser)
userRouter.put('/user', updateUser)
userRouter.post('/login', login);
userRouter.post('/refresh-token', refreshToken)
module.exports = userRouter;