const usersRepo = require('./usersStorage');
// const {encrypt} = require('../utilities/crypto');
const { getToken, getRefreshToken } = require('../utilities/jwt');

const loginResposeDto = (access_token, refresh_token) => ({ access_token, refresh_token });
module.exports = {
    async login(req, res) {
        const credentials = req.body;
        console.log({credentials})
        const user = await usersRepo.getOneBy({ email: credentials.email })
        if (!user) {
            return res.status(401).send({ message: 'Invalid Email or Password' })
        }
        const checkedPassword = await usersRepo.comparePasswords(credentials.password, user.password)
        if (checkedPassword) {
            // console.log("login: Successful, sending response...");
            const access_token = getToken({ email: user.email });
            const refresh_token = getRefreshToken({ email: user.email })
            // console.log(access_token)
            // console.log({ access_token, refresh_token })
            return res.status(200).send(loginResposeDto(access_token, refresh_token));
        }

        return res.status(401).send({ message: 'Invalid Email or Password' })
    }

}