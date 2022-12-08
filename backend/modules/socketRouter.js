const { updateUserLikes, updateUserLiked, getUserLiked } = require('../controllers/UserController');

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
      console.log('matches data ===', data);
      const matchedUsers = await getUserLiked(data);

      socket.emit('getMatches', matchedUsers);
    });
  });
};
