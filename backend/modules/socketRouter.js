module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.on('like', (data) => {});
  });
};
