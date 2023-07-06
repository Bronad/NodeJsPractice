const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data}
}
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const {user, pwd} = req.body;
    // Check if Data was given
    if (!user || !pwd) return res.status(400).json({'message': 'Username and Password are required.'});
    // Check if Username is already Taken
    const foundUser = usersDB.users.find((person) => person.username === user);
    if(!foundUser) return res.sendStatus(401); // Unauthorized

    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        // create of JWTs -> for Safety 
        res.json({'success': `User ${user} is logged in! `})
    }else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };