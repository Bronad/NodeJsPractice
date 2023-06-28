const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

// In Express an ^ Means it should start with -> $ is the End of that
// In Express an | Means or
// In Express an ()? Means that whatever is inside the Brackets ist Optinal
app.get('^/$|/index(.html)?', (req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname});
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); // Express will Send a 302 by deafault (might not reload)
});

// Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Blaaa');
    next();
}// could be a next request / respons here: ,(req, res)
,(req, res) => {res.send('Hello World')}
);

// Here are 3 Functions displayed, all of them shall be called in a Request
const one = (req, res, next) => {
    console.log('one');
    next();
}
const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res) => {
    console.log('three');
    res.send('Finished!');
}
// here is the request, Just give a array of the Funtions that follow each other
// the order in witch is Binding, Next has to be there 
app.get('/chain(.html)?', [one,two,three]);


// Thats Baisclly a custom 404 as * Means anything that behind it wont matter
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));