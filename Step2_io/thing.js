//import the file System
const fsPromises = require('fs').promises;
const path = require('path');



// Works Async Reads File as Callback
// fs.readFile(path.join(__dirname, 'files', 'moreData.txt'),'utf-8' , (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })


// Creates and Writes to a file
// This is an Example for "Callback Hell" . Not a Best Practice

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'),'This is the Reply' , (err) => {
//     if (err) throw err;
//     console.log('Append in Write Sucsess');

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'),'\n\nThis is the Extra' , (err) => {
//         if (err) throw err;
//         console.log('Write Sucsess');

//         fs.rename(path.join(__dirname, 'files', 'reply.txt'),path.join(__dirname, 'files', 'newReply.txt'), (err) => {
//             if (err) throw err;
//             console.log('rename Sucsess');
//         })
//     })
// })

// Here is an Example to avoid Callback Hell
const flieOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'moreData.txt'),'utf-8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, 'files', 'appendTest.txt'))

        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'),data)
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'),'\n\n Thats the Additional')
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'),path.join(__dirname, 'files', 'promiseRename.txt'))
        const newdata = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseRename.txt'),'utf-8');
        console.log(newdata);
    } catch(err){
        console.error(err);
    }
}

flieOps();

// Modifes a File, also creates it in Case of not being there
// Best used inside Write so to not Collide in Nodes Async functions
// fs.appendFile(path.join(__dirname, 'files', 'appendTest.txt'),'testing Text' , (err) => {
//     if (err) throw err;
//     console.log('append Sucsess');
// })

process.on('uncaughtException' , err =>{
    console.log(`There has been an uncaught error : ${err}`);
    process.exit(1);
})