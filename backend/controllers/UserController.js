const userSchema = require('../schemas/UserSchema');
const bcrypt = require('bcrypt');
const { uid } = require('uid');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, password1: password, city, age, gender } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  const userId = uid(20);
  const userObject = {
    username,
    password: hashedPass,
    images: [],
    likes: [],
    liked: [],
    info: { city, age, gender },
    secret: userId,
  };
  const newUser = new userSchema(userObject);
  console.log('newUser ===', newUser);
  await newUser.save();
  console.log('userObject ===', userObject);
  // const token = jwt.sign(
  //   {
  //     alg: 'secretttt',
  //     typ: 'JWT',
  //   },
  //   { user: newUser },
  //   {
  //     expiresIn: 24 * 60,
  //   }
  // );

  if (!newUser) {
    return res.status(400).json({ error: true, data: [{ message: 'Error in user registration' }] });
  }
  return res
    .status(201)
    .json({ error: false, message: 'Registration is ok', data: { userId: newUser.secret, username } });
};

const loginUser = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await userSchema.findOne({ username });
    // const token = jwt.sign(user, username, {
    //   expiresIn: 60,
    // });
    const success = {
      error: false,
      message: 'Login successful',
      data: { user, userId: user.secret, username: user.username },
    };
    return res.status(201).json(success);
  } catch (error) {
    return res.status(400).json({ error: true, message: 'Incorrect data', data: error.details });
  }
};

const updateUserImages = async (req, res) => {
  try {
    const { userId } = req.params;
    // const images = req.body;
    console.log('req.body ===', req.body);
    const user = await userSchema.findOneAndUpdate({ secret: userId }, { $push: { images: req.body.image } });
    console.log('user ===', user);
    return res.status(201).json({ error: false, message: 'Images updated successfully' });
  } catch (error) {
    return res.status(400).json({ error: true, data: [{ message: 'Incorrect data', error_info: error }] });
  }
};

const getFilteredUsers = async (req, res) => {
  const { filteredCity, filteredGender, filteredAge } = req.body;

  const filteredUsers = await userSchema.find({
    city: filteredCity,
    gender: filteredGender,
    age: filteredAge,
    images: { $size: 2 },
  });
  console.log('filteredUsers ===', filteredUsers);

  if (!filteredUsers) return res.status(400).json({ error: true, data: [{ message: 'No users found' }] });
  return res.status(200).json({ error: false, message: 'Ok', data: filteredUsers });
};

const getUserById = async (req, res) => {
  const { userId } = req.params;

  const user = await userSchema.findOne({ secret: userId });

  if (!user) return res.status(400).json({ error: true, data: [{ message: 'User not found' }] });

  return res.status(200).json({ error: false, data: user });
};

const updateUserLikes = async (request) => {
  const { likeUsername, userWhoLiked } = request;

  const update = await userSchema.findOneAndUpdate({ username: likeUsername }, { $push: { likes: userWhoLiked } });

  return update;
};

const updateUserLiked = async (request) => {
  const { likedUsername, likedUser } = request;

  const update = await userSchema.findOneAndUpdate({ username: likedUsername }, { $push: { liked: likedUser } });
  return update;
};

module.exports = {
  registerUser,
  loginUser,
  updateUserImages,
  getFilteredUsers,
  updateUserLikes,
  updateUserLiked,
  getUserById,
};
