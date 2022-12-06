const { updateUserLikes } = require('../controllers/UserController');

module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.on('like', async (data) => {
      const update = await updateUserLikes(data);
      socket.emit('getUpdatedLikesData', update);
    });
  });
};
