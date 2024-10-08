const { verifyToken } = require("./jwt");

module.exports = {
    auth(req ,res, next){
       const access_token =  req.headers.authorization;
       if (!access_token){
        return res.status(401).send({message: 'unauthorized'})
       }
       let currentUser = null;
       try{
           currentUser = verifyToken(access_token);
       } catch (err){
        return res.status(401).send({message: 'unauthorized'})
       }
       req.currentUser = currentUser;
       next();
    }
}