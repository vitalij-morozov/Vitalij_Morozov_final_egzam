const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  images: { type: Array, required: true },
  likes: { type: Array, required: true },
  liked: { type: Array, required: true },
  dislikes: { type: Array, required: true },
  city: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  secret: { type: String, required: true },
});

module.exports = mongoose.model('Type12FinalUsers2', userSchema);
