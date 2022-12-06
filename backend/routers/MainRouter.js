const express = require('express');
const router = express.Router();

const { registratioValidation, loginValidation } = require('../middleware/validation');

const { registerUser, loginUser } = require('../middleware/validation');

router.post('/auth/register', registratioValidation, registerUser);
router.post('/auth/login', loginValidation, loginUser);

module.exports = router;
