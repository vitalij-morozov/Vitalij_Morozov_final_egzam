const userSchema = require('../schemas/UserSchema');
const bcrypt = require('bcrypt');
const { uid } = require('uid');

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
    dislikes: [],
    city: city,
    gender: gender,
    age: age,
    secret: userId,
  };
  const newUser = new userSchema(userObject);

  await newUser.save();

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
    const user = await userSchema.findOneAndUpdate({ secret: userId }, { $push: { images: req.body.image } });
    return res.status(201).json({ error: false, data: user });
  } catch (error) {
    return res.status(400).json({ error: true, data: [{ message: 'Incorrect data', error_info: error }] });
  }
};

const removeUserImage = async (req, res) => {
  try {
    const { userId, image } = req.body;
    const updatedImages = await userSchema.findOneAndUpdate({ secret: userId }, { $pull: { images: image } });
    return res.status(201).json({ error: false, data: updatedImages });
  } catch (error) {
    return res
      .status(400)
      .json({ error: true, data: [{ message: 'Failed to remove image from images array', error_info: error }] });
  }
};

const getFilteredUsers = async (req, res) => {
  try {
    const { city, age, gender } = req.params;
    const filteredUsers = await userSchema.find({
      city: city,
      gender: gender,
      age: age,
      'images.1': { $exists: true },
    });
    return res.status(200).json({ error: false, message: 'Ok', data: filteredUsers });
  } catch (error) {
    return res.status(400).json({ error: true, data: [{ message: 'No users found', error_info: error }] });
  }
};

const getUserById = async (request) => {
  try {
    const user = await userSchema.findOne({ secret: request });
    return user;
  } catch (error) {
    if (!user) return { error: true, data: [{ message: 'User not found', error_info: error }] };
  }
};

const updateUserLikes = async (request) => {
  try {
    const { userWhoLikes, userWhoIsLiked } = request;
    const updatedUser = await userSchema.findOneAndUpdate(
      { secret: userWhoIsLiked },
      { $push: { likes: userWhoLikes } }
    );
    return { error: false, data: updatedUser };
  } catch (error) {
    return { error: true, data: [{ message: 'Failed to update user likes', error_info: error }] };
  }
};

const updateUserLiked = async (request) => {
  try {
    const { userWhoLikes, userWhoIsLiked } = request;
    const updatedUser = await userSchema.findOneAndUpdate(
      { secret: userWhoLikes },
      { $push: { liked: userWhoIsLiked } }
    );
    return { error: false, data: updatedUser };
  } catch (error) {
    return { error: true, data: [{ message: 'Failed to update user', error_info: error }] };
  }
};

const getUserLiked = async (request) => {
  try {
    const likedUsers = await userSchema.find({ secret: { $in: request } });
    return likedUsers;
  } catch (error) {
    return { error: true, data: [{ message: 'liked users not found', error_info: error }] };
  }
};

const getUserLikes = async (request) => {
  try {
    const likesUsers = await userSchema.find({ secret: { $in: request } });
    return likesUsers;
  } catch (error) {
    return { error: true, data: [{ message: 'likes users not found', error_info: error }] };
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserImages,
  removeUserImage,
  getFilteredUsers,
  updateUserLikes,
  updateUserLiked,
  getUserById,
  getUserLiked,
  getUserLikes,
};
