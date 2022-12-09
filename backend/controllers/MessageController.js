const messageSchema = require('../schemas/MessageSchema');

const addNewMessage = async (request) => {
  const { body, sender, receiver, createdAt } = request;

  const message = new messageSchema({ body, sender, receiver, createdAt });
  await message.save();

  if (!message) return { error: true, data: [{ message: 'Failed to add a new message' }] };
  return { error: false, data: [{ message: 'Message added successfully', data: message }] };
};

const getMessagesBySender = async (request) => {
  const { senderId, receiverId } = request;

  const sentMessages = await messageSchema.find({ sender: receiverId, receiver: senderId });

  if (!sentMessages) return { error: true, data: [{ message: 'No messages found' }] };

  return sentMessages;
};

const getChatMessages = async (request) => {
  const { senderId, receiverId } = request;

  const receivedMessages = await messageSchema.find({ sender: senderId, receiver: receiverId });
  if (!receivedMessages) return { error: true, data: [{ message: 'No messages found' }] };

  return receivedMessages;
};

module.exports = {
  addNewMessage,
  getMessagesBySender,
  getChatMessages,
};
