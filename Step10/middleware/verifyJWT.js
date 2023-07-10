
const jwt = require('jsonwebtoken');
require('dotenv').config();

// This middleware will check for autherization
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['autherization'];
    if(!authHeader) return res.sendStatus(401);
    console.log(authHeader);
    const token = authHeader.spilt('')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            if(err) return res.sendStatus(403); // invalid Token
            req.user = decoded.username;
            next();
        }
    )
}

module.exports = verifyJWT;