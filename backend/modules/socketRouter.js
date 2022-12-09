const { updateUserLikes, updateUserLiked, getUserLiked } = require('../controllers/UserController');

const { addNewMessage, getMessagesBySender, getChatMessages } = require('../controllers/MessageController');

module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.on('like', async (data) => {
      console.log('socket data ===', data);
      const updatedLikesUser = await updateUserLikes(data);
      const updateLiked = await updateUserLiked(data);
      console.log('updateLikes ===', updatedLikesUser);
      socket.emit('getUpdatedLikesData', updatedLikesUser);
    });
    socket.on('likes', async (data) => {
      const matchedUsers = await getUserLiked(data);

      socket.emit('getMatches', matchedUsers);
    });

    socket.on('messages', async (data) => {
      const receiverMessages = await getMessagesByReceiver(data);

      socket.emit('getMessages', receiverMessages);
    });

    socket.on('chatMessages', async (data) => {
      const messages = await getChatMessages(data);
      const messages2 = await getMessagesBySender(data);
      socket.emit('getChatMessages', [messages, messages2]);
    });

    socket.on('newMessage', async (data) => {
      const addMessageData = await addNewMessage(data);
      console.log('addMessageData ===', addMessageData);
      socket.emit('getNewMessageData', data);
    });
  });
};
