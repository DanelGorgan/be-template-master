const jwt = require('jsonwebtoken');

require('dotenv').config('../../config');

function generateAccessToken(user) {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn : 60*60 });
}

console.log(generateAccessToken({ id: '1', role: 'admin' }));

module.exports = {
    generateAccessToken
}