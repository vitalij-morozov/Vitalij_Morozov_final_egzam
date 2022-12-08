const express = require('express');
const router = express.Router();

const { registratioValidation, loginValidation, imageUpdateValidation } = require('../middleware/validation');

const {
  registerUser,
  loginUser,
  getFilteredUsers,
  updateUserImages,
  getUserById,
} = require('../controllers/UserController');

router.post('/auth/register', registratioValidation, registerUser);
router.post('/auth/login', loginValidation, loginUser);

router.patch('/users/:userId', updateUserImages);

router.get('/users/:userId', getUserById);
router.get('/filtered/:city&:age&:gender', getFilteredUsers);

module.exports = router;
