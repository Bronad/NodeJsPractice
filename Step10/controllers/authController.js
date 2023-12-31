const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    // Check if Data was given
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    // Check if Username is already Taken
    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401); // Unauthorized

    const match = await bcrypt.compare(pwd, foundUser.password);

    if(match){
        // create of JWTs -> for Safety
        const accessToken = jwt.sign(
            // Here u should never Use Passwords as they would easyly be optainable
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            // Here u should never Use Passwords as they would easyly be optainable
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Array without the current user
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        // Current User and the fitting refresh token
        const currentUser = { ...foundUser, refreshToken };
        // Add User & refresh Token in an Array in the big User List Array
        usersDB.setUsers([...otherUsers, currentUser]);
        
        // Writing that to a User File, our Database substitution
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );

            //Cookies & local Storage is not safe for the Tokens.
            // Best case in Memory
            //  Still gonna Try in Cookies tho
            // Making a cookie here. httponly is not available in JS
            // Best call here, not really safe tho
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        // This is to Grab by the FrontEnd Dev
        // Best to Safe in Memory
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };