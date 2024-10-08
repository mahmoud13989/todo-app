// const crypto = require('crypto');
// const secretKey = '0123456789abcDEF';
// const iv = crypto.randomBytes(16);
// function encrypt (text){
//     const key = crypto.createHash('sha256').update(secretKey).digest();
//     const cipher = crypto.createCipheriv('aes-256-cbc',key,iv);
//     let encrypted = cipher.update(text,'utf8' , 'hex');
//     encrypted += cipher.final('hex');
//     return encrypted;
// }
// function decrypt (encryptedData){
//     const key = crypto.createHash('sha256').update(secretKey).digest();
//     const parts = encryptedData.split(':');
//     // const iv = Buffer.from(parts.shift(),'hex');
//     const encryptedText = parts.join(':');
//     const decipher = crypto.createDecipheriv('aes-256-cbc',key,iv);
//     let decrypted = decipher.update(encryptedText,'hex' , 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }
// const decrypted = decrypt("2bf3622e4aba1234e55341399d402a8a9b32d4933a8675d5ec848b8a4564c471b05aa304702876a8d693b5c216ee0069");
// module.exports = {
//     encrypt,
//     decrypt
// }
// const crypto = require('crypto');
// const secretKey = '0123456789abcDEF';

// function encrypt(text) {
//     const key = crypto.createHash('sha256').update(secretKey).digest();
//     const iv = crypto.randomBytes(16); // Generate a random IV

//     const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
//     let encrypted = cipher.update(text, 'utf8', 'hex');
//     encrypted += cipher.final('hex');

//     // Concatenate the IV with the encrypted data (separated by ':')
//     return iv.toString('hex') + ':' + encrypted;
// }

// function decrypt(encryptedData) {
//     const key = crypto.createHash('sha256').update(secretKey).digest();

//     // Split the IV and encrypted text
//     const parts = encryptedData.split(':');
//     const iv = Buffer.from(parts.shift(), 'hex'); // Extract the IV from the data
//     const encryptedText = parts.join(':');

//     const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    
//     let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');

//     return decrypted;
// }

// Test with encrypt and decrypt
const CryptoJS= require('crypto-js');
const secretKey = '0123456789abcDEF'

function encrypt (text){
    return CryptoJS.AES.encrypt(text,secretKey).toString();    
}
function decrypt(encryptedData){
    const bytes = CryptoJS.AES.decrypt(encryptedData , key);
    const originalTest = bytes.toString(Crypto.enc.Utf8);
    return originalTest;
}
module.exports = {
    encrypt,
    decrypt
};
