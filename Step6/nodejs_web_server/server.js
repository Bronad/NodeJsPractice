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
})
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); // Express will Send a 302 by deafault (might not reload)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));