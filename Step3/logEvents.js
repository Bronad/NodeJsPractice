console.log('Bla!');
const { format } = require('date-fns');

// v4 as a UUID is imported here.
// uuid is a uniqe Id here
const { v4: uuid} = require('uuid');

const fs = require('fs');
const fspromises = require('fs').promises;
const path = require('path');

const logEvent = async (message) => {
    const dateTime = `${format(new Date, 'dd.MM.yyyy\tHH:mm:ss')}`;
    const logItem =  `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fspromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fspromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);
    } catch(err){
        console.log(err);
    }
}
module.exports = logEvent;

// console.log(format(new Date(), 'dd.MM.yyyy\tHH:mm:ss'));

// console.log(uuid());