const userSchema = require('../schemas/UserSchema');
const bcrypt = require('bcrypt');
const { uid } = require('uid');
const jwt = require('jsonwebtoken');
const UserSchema = require('../schemas/UserSchema');

const registerUser = async (req, res) => {
  try {
    const { username, passwordOne: password, city, age, gender } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const userId = uid(20);
    const userObject = {
      username,
      password: hashedPass,
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png'],
      likes: [],
      info: { city, age, gender },
      secret: userId,
    };
    const newUser = new UserSchema(userObject);
    await newUser.save();
    const token = jwt.sign(username, newUser, {
      expiresIn: 60,
    });

    return res.status(201).json({ error: false, message: 'Registration is ok', data: { userId, username, token } });
  } catch (error) {
    return res.status(400).json({ error: true, message: 'Error in user registration', data: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await userSchema.findOne({ username });
    const token = jwt.sign(user, username, {
      expiresIn: 60,
    });
    const success = {
      error: false,
      message: 'Login successful',
      data: { token, userId: user.secret, username: user.username },
    };
    return res.status(201).json(success);
  } catch (error) {
    return res.status(400).json({ error: true, message: 'Incorrect data', data: error.details });
  }
};

const updateUserImages = async (req, res) => {
  try {
    const { username, images } = req.body;
    const user = await userSchema.findOneAndUpdate({ username }, { $push: { images: images } });
    return res.status(201).json({ error: false, message: 'Images updated successfully' });
  } catch (error) {}
};

const updateUserLikes = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  updateUserImages,
};
