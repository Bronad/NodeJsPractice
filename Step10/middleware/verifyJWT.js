
const jwt = require('jsonwebtoken');
require('dotenv').config();

// This middleware will check for autherization
const verifyJWT = (req, res, next) => {
    // In here we have the header that 
    const authHeader = req.headers['autherization'];
    // no Header no Auth, No Access
    if(!authHeader) return res.sendStatus(401);
    console.log(authHeader);
    // getting the Token -> clearing it of the Spacebar at the beginnig
    const token = authHeader.spilt(' ')[1];
    // The Actual token Check happens here
    jwt.verify(
        // The Token we got
        token,
        // The token we Check against
        process.env.ACCESS_TOKEN_SECRET, 
        //Decoded is the user token that is decoded, Err happens when its invalid 
        (err, decoded) => {
            if(err) return res.sendStatus(403); // invalid Token
            req.user = decoded.username;
            next();
        }
    )
}

module.exports = verifyJWT;