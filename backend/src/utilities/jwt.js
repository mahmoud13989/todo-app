const jwt = require('jsonwebtoken');
const secretKey = '13462432453497984232';
const refreshSecretKey = '36973234875412354614';

const grantToken = (key, expiresIn = '20m') => (data) => jwt.sign(data, key, { expiresIn });
const verify_Token = (key) => (token) => jwt.verify(token, key);

const verifyToken = verify_Token(secretKey);
const verifyRefreshToken = verify_Token(refreshSecretKey);
const getToken = (data) => grantToken(secretKey, '1m')(data); //curring
const getRefreshToken = (data) => grantToken(refreshSecretKey, '1m')(data);

module.exports = {
    verifyToken,
    verifyRefreshToken,
    getToken,
    getRefreshToken
}

