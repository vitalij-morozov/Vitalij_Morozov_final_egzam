const messageSchema = require('../schemas/MessageSchema');

const addNewMessage = async (request) => {
  try {
    const { body, sender, senderUsername, receiver, createdAt } = request;
    const message = new messageSchema({ body, sender, senderUsername, receiver, createdAt });
    await message.save();
    return { error: false, data: [{ message: 'Message added successfully', data: message }] };
  } catch (error) {
    return { error: true, data: [{ message: 'Failed to add a new message', error_data: error }] };
  }
};

const getMessagesByReceiver = async (request) => {
  try {
    const { receiverId } = request;
    const messages = await messageSchema.find({ receiver: receiverId });
    return messages;
  } catch (error) {
    return { error: true, data: [{ message: 'No messages found', error_data: error }] };
  }
};

const getMessagesBySender = async (request) => {
  try {
    const { senderId, receiverId } = request;
    const sentMessages = await messageSchema.find({ sender: receiverId, receiver: senderId });
    return sentMessages;
  } catch (error) {
    return { error: true, data: [{ message: 'No messages found', error_data: error }] };
  }
};

const getChatMessages = async (request) => {
  try {
    const { senderId, receiverId } = request;
    const receivedMessages = await messageSchema.find({ sender: senderId, receiver: receiverId });
    return receivedMessages;
  } catch (error) {
    return { error: true, data: [{ message: 'No messages found', error_data: error }] };
  }
};

module.exports = {
  addNewMessage,
  getMessagesBySender,
  getChatMessages,
  getMessagesByReceiver,
};
