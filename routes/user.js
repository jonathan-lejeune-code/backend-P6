const express = require('express');
const router = express.Router();
const sha512 = require("crypto-js/sha512");

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;