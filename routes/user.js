const express = require('express');  // importation du paquet express
const router = express.Router();     // création du router
const sha512 = require("crypto-js/sha512");
const pwdValidator = require('../middleware/password');

const userCtrl = require('../controllers/user');  // importation du controller user

router.post('/signup', pwdValidator, userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;     // on export le router du fichier