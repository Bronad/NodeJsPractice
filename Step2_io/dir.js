// Its about Dirs.
const fs = require('fs');

if(!fs.existsSync('./Step2_io/new')){
fs.mkdir('./Step2_io/new', (err) => {
    if(err) throw err;
    console.log('Directory created');
})
}else{
    console.log('Dir Already Exsists, will be Deleted');
    fs.rmdir('./Step2_io/new', (err) => {
        if(err) throw err;
        console.log('Directory deleted');
    })
}