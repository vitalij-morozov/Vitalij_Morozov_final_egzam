require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const socketIo = require('socket.io');

const socketRouter = require('./modules/socketRouter');

const app = express();

const router = require('./routers/MainRouter');

mongoose
  .connect(process.env.MONGO_DB_KEY)
  .then(() => {
    console.log('mongoose connection is established');
  })
  .catch((error) => {
    console.warn('mongoose connection error: ' + error);
  });

const http = require('http').createServer(app);

const port = process.env.PORT || 5000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/', router);

const io = socketIo(http, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

socketRouter(io);

app.set('socketIo', io);

http.listen(port, () => {
  console.log('http app listen on port ' + port);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found 404' });
});
