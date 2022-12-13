const express = require('express');
const router = express.Router();

const { registratioValidation, loginValidation } = require('../middleware/validation');

const {
  registerUser,
  loginUser,
  getFilteredUsers,
  updateUserImages,
  removeUserImage,
} = require('../controllers/UserController');

router.post('/auth/register', registratioValidation, registerUser);
router.post('/auth/login', loginValidation, loginUser);
router.post('/users/removeImage', removeUserImage);

router.patch('/users/:userId', updateUserImages);

router.get('/filtered/:city&:age&:gender', getFilteredUsers);

module.exports = router;
