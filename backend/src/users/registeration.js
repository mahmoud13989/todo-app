const usersRepo = require('./usersStorage');

module.exports = {
    async getAllUsers(req, res) {
        const users = await usersRepo.getAll();
        return res.status(200).send(users)
    },
    async registerUser(req, res) {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await usersRepo.getOneBy({ email });
        console.log('checking existingUser before sending response 409: ', req.body);
        if (existingUser) {
            console.log('checking existingUser before returning response 409: ', req.body);
            res.status(409).send({ message: 'this user aleady exists' });
            return;
        }
        console.log('after if condition ', req.body.email)
        const newUser = await usersRepo.create({ firstName, lastName, email, password })
        console.log(newUser)
        return res.status(200).send({ message: 'request object had been received sucessfully' })
    },
    async deleteUser(req, res) {
        const { email } = req.body;
        const checkExistence = await usersRepo.getOneBy({ email });
        if (checkExistence) {
            const deleteProcess = await usersRepo.delete(email);
            if (deleteProcess)
                return res.status(200).send({ message: `user with email: ${req.body.email} has been deleted from the records successfully ...` })
        }
        return res.status(409).send({ message: `Can't delete this user` })
    },
    async updateUser(req, res) {
        const { email, update } = req.body;
        const currentUserInfo = await usersRepo.getOneBy({ email });
        if (currentUserInfo) {
            const updateProcess = await usersRepo.update(email, update);
            if (updateProcess) {
                return res.status(200).send({ message: 'Email updated successfully' })
            }
        }
        return res.status(409).send({ message: 'Erorr: Updating Failed' })
    }

}