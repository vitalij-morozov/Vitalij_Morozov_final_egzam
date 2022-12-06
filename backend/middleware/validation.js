const Joi = require('joi');
const userSchema = require('../schemas/UserSchema');
const bcrypt = require('bcrypt');

const registratioValidation = async (req, res, next) => {
  const { username } = req.body;

  const isTaken = await userSchema.findOne({ username });

  if (isTaken) return res.status(400).json({ error: true, message: 'Username is already taken' });

  const joiSchema = Joi.object({
    username: Joi.string().trim().min(4).max(35).required(),
    password1: Joi.string().trim().min(4).max(20).required(),
    password2: Joi.any().valid(Joi.ref('password1')).required(),
    gender: Joi.string().required(),
    city: Joi.string().required(),
    age: Joi.number().required(),
  });

  try {
    const validationResult = await joiSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({ error: true, message: 'Field validation error', data: error.details });
  }
};

const loginValidation = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await userSchema.findOne({ username });

  const joiSchema = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  });

  if (!user) return res.status(400).json({ error: true, message: 'User not found' });

  try {
    const validationResult = await joiSchema.validateAsync(req.body, { abortEarly: false });
    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) return res.status(400).json({ error: true, message: 'Incorrect password or username' });
    next();
  } catch (error) {
    return res.status(400).json({ error: true, message: 'Field validation error', data: error.details });
  }
};

module.exports = {
  registratioValidation,
  loginValidation,
};
