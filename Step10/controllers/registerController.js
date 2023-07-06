const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data}
}
const path = require('path');
const bcrypt = require('bcrypt');
const fsPromise = require('fs').promises;

const handleNewUser = async (req, res) => {
    const {user, pwd} = req.body;
    // Check if Data was given
    if (!user || !pwd) return res.status(400).json({'message': 'Username and Password are required.'});
    // Check if Username is already Taken
    const duplicate = usersDB.users.find((person) => person.username === user);
    if(duplicate) return res.sendStatus(409); // Thats a Conflict Response
    try{
        //encrypt the PW & Set it in the Data Base
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser= {'username': user, "password": hashedPwd};
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromise.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({'success': `New User ${newUser} was created`})
    }catch (err){
        res.status(500).json({'message': err.message});
    }

}

module.exports = {handleNewUser};