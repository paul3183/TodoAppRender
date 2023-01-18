const { Router } = require('express');
const { userLogin } = require('../controllers/auth.controllers');

const router = Router(); //una instancia

router.post('/auth/login', userLogin);

module.exports = router;