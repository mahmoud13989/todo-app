const { verifyRefreshToken, getToken ,getRefreshToken } = require("../utilities/jwt");

function refreshTokenResponseDto (access_token , refresh_access_token){
    return {
        access_token,
        refresh_access_token
    }
}
function refreshToken (req , res){
    const {refresh_token} = req.body;
    // refresh-access-token : ''
    let user = null; // user is obj
    try{
      user =   verifyRefreshToken(refresh_token);
    } catch (exc){
        // token invalid
        // token expired 
        return res.status(401).send({message: 'unauthorized'});
    }
    // if try{ user} succeeded ... >> user.email  **** user = {email: 'test@test.com'}
    const access_token = getToken({email:user.email});
    const new_refresh_access_token = getRefreshToken({email: user.email})

    return res.status(200).send(refreshTokenResponseDto(access_token , new_refresh_access_token));
}

module.exports = {
    refreshToken
}