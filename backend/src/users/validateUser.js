
module.exports = {
    validateUser(req , res, next){
        const user = req.body;
        console.log('USER : ',user)
        if (user.firstName === '')
            return res.send({message: 'must enter first name'});
        if (user.lastName === '')
            return res.send({message: 'must enter last name'});
        if (user.email === '')
            return res.send({message: 'must enter email'})
        if (user.password === '')
            return res.send({message: 'you must enter a password'})
        if (user.passwordConfirmation === '')
            return res.send({message: 'you must confirm password'})
         next();
    }
}