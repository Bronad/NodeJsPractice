const exp = require('express');
const router = exp.Router();
const path = require('path');
// Doesnt use the public folder when it comes to a 404 in the subdir Route

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
});

router.get('/test(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
});



module.exports = router;