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
    city: city,
    gender: gender,
    age: age,
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
    return res.status(201).json({ error: false, data: user });
  } catch (error) {
    return res.status(400).json({ error: true, data: [{ message: 'Incorrect data', error_info: error }] });
  }
};

const getFilteredUsers = async (req, res) => {
  const { city, age, gender } = req.params;
  console.log('req.params ===', req.params);
  const filteredUsers = await userSchema.find({
    city: city,
    gender: gender,
    age: age,
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
  const { userWhoLikes, userWhoIsLiked } = request;

  const updatedUser = await userSchema.findOneAndUpdate({ secret: userWhoIsLiked }, { $push: { likes: userWhoLikes } });

  if (!updatedUser) return { error: true, data: [{ message: 'Failed to update user likes' }] };

  return { error: false, data: updatedUser };
};

const updateUserLiked = async (request) => {
  const { userWhoLikes, userWhoIsLiked } = request;
  console.log('request ===', request);
  const updatedUser = await userSchema.findOneAndUpdate({ secret: userWhoLikes }, { $push: { liked: userWhoIsLiked } });
  if (!updatedUser) return { error: true, data: [{ message: 'Failed to update user' }] };
  return { error: false, data: updatedUser };
};

const getUserLiked = async (request) => {
  const likedUsers = await userSchema.find({ secret: { $in: request } });
  console.log('likedUsers ===', likedUsers);
  if (!likedUsers) return { error: true, data: [{ message: 'liked users not found' }] };

  return { error: false, data: likedUsers };
};

module.exports = {
  registerUser,
  loginUser,
  updateUserImages,
  getFilteredUsers,
  updateUserLikes,
  updateUserLiked,
  getUserById,
  getUserLiked,
};
