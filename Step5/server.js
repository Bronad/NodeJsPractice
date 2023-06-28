const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('../Step3/logEvents.js');
const EventEmitter = require('events');
const { fi, ca, deAT } = require('date-fns/locale');
class Emitter extends EventEmitter {};

// Initilize an class
const myEmitter = new Emitter();
myEmitter.on('log', (msg, filename) => logEvents(msg, filename));

// Chooses the Processesd Port or Port 3500 in this case.
const PORT = process.env.PORT || 3500;

// Here we define a function for the default case of 404
const serveFile = async (filePath, contentType, response) => {
    try {
        const rawdata = await fsPromises.readFile(filePath, !contentType.includes('image')?'utf-8': '');// The Empty String will allow the Image to load
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawdata;
        response.writeHead(
            filePath.includes('404.html') ? 404:200,
            { 'Content-Type': contentType}
            );
        response.end(
            contentType === 'application/json' ? JSON.stringify(data): data 
        );
    } catch(err){
        console.log(err);
        myEmitter.emit('log', `${err.name} \t${err.message}`, 'reqLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

//creating the Sever. Starts with the http req = request, res = response
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url} \t${req.method}`, 'reqLog.txt');
    

    // This is one way to Grab an URL and reqponse with html
    // downside is u its only for one url & only answers in one html
    /*  if(req.url === '/' || req.url === 'index.html'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        path = path.join(__dirname, 'views', 'index.html');
        fs.readFile(path, 'utf-8', (err, data) => {
            res.end(data);
        })
    } */

    // There is another way, with Switch Statements that check the URL
    /* switch(req.URL) {
        case'/':
            res.statusCode = 200;
            path = path.join(__dirname, 'views', 'index.html');
            fs.readFile(path, 'utf-8', (err, data) => {
                res.end(data);
            })
            break
    } */

    // Best Ways here 
    //first get the Extension
    const extension = path.extname(req.url);
    let contentType;

    switch(extension){
        case '.css':
            contentType = 'text.css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    // Checks FilePath and tries to get the right html folder
    let filePath = 
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url)
    // makes the html extension not requiered in the Browser
    if(!extension && req.url.slice(-1) !== '/'){
        filePath += '.html';
    }

    const fileExist = fs.existsSync(filePath);
    if (fileExist){
        // serve the File
        serveFile(filePath, contentType, res);
    }else{
        //serve an error or an redirect
        // 404 error 
        // 301 redirect
        switch(path.parse(filePath).base){
            // Thats a redirected case. ThePath ist not know and ist redirected to the new Page
            case 'old-page.html':
                res.writeHead(301, {'Location' : '/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, {'Location': '/'})
                res.end();
                break;
            //Here we serve the 404, the normal case.
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        };
    }

});

//
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


