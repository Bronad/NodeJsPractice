const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenConroller');

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;