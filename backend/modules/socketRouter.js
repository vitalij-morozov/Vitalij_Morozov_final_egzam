const {
  updateUserLikes,
  updateUserLiked,
  getUserLiked,
  getUserLikes,
  getUserById,
} = require('../controllers/UserController');

const {
  addNewMessage,
  getMessagesBySender,
  getChatMessages,
  getMessagesByReceiver,
} = require('../controllers/MessageController');

let loggedUsers = [];

module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.on('like', async (data) => {
      await updateUserLikes(data);
      await updateUserLiked(data);
      const u = await getUserById(data.userWhoIsLiked);
      const u2 = await getUserById(data.userWhoLikes);
      const targetUser = loggedUsers.find((lUser) => lUser.userId === u.secret);
      socket.emit('gu2', u2);
      targetUser && io.to(targetUser.socketId).emit('gu', u);
    });

    socket.on('userLoggedIn', (data) => {
      loggedUsers.push({ userId: data, socketId: socket.id });
    });

    socket.on('user', async (data) => {
      const user = await getUserById(data);
      socket.emit('getUser', user);
    });

    socket.on('likes', async (data) => {
      const likedUsers = await getUserLiked(data);
      socket.emit('getLikes', likedUsers);
    });

    socket.on('matches', async (data) => {
      const matchedUsers = await getUserLikes(data);
      socket.emit('getMatches', matchedUsers);
    });

    socket.on('messages', async (data) => {
      const receiverMessages = await getMessagesByReceiver(data);
      socket.emit('getMessages', receiverMessages);
    });

    socket.on('chatMessages', async (data) => {
      const messages = await getChatMessages(data);
      const messages2 = await getMessagesBySender(data);
      io.emit('getChatMessages', [messages, messages2]);
    });

    socket.on('newMessage', async (data) => {
      const addMessageData = await addNewMessage(data);
      io.emit('getNewMessageData', data);
    });

    socket.on('disconnect', () => {
      loggedUsers = loggedUsers.filter((lUser) => lUser.socketId !== socket.id);
    });
  });
};
