const { updateUserLikes, updateUserLiked } = require('../controllers/UserController');

module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.on('like', async (data) => {
      console.log('data ===', data);
      // const updateLikes = await updateUserLikes(data);
      // const updateLiked = await updateUserLiked(data);
      // console.log('updateLikes ===', updateLikes);
      // socket.emit('getUpdatedLikesData', update);
    });
  });
};
