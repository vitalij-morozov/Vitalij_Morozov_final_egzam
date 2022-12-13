const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  body: { type: String, required: true },
  sender: { type: String, required: true },
  senderUsername: { type: String, required: true },
  receiver: { type: String, required: true },
  createdAt: { type: String, required: true },
});

module.exports = mongoose.model('Type12FinalMessages', messageSchema);
