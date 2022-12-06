const express = require('express');
const router = express.Router();

const { registratioValidation, loginValidation } = require('../middleware/validation');

const { registerUser, loginUser, getFilteredUsers } = require('../controllers/UserController');

router.post('/auth/register', registratioValidation, registerUser);
router.post('/auth/login', loginValidation, loginUser);

router.get('/filtered', getFilteredUsers);

module.exports = router;
