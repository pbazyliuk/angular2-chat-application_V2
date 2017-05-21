const express = require('express');
const http = require('http');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

const server = http.createServer(app);
const io = require('socket.io')(server);
const socketioJwt = require('socketio-jwt');
const config = require('./config');
const User = require('./models/user');
const path = require('path');

//DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

//App Setup
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }))

app.use(express.static(path.join(__dirname, '../client/dist')));

router(app);

//Root namespaces for socket.io
io
  .of('/root')
  .on('connection', socketioJwt.authorize({
    secret: config.secret,
    callback: false
  }))

  .on('authenticated', socket => {
    console.log('connect')
    var obj = {isLogged: true};
    User.findOneAndUpdate({_id: socket.decoded_token.sub}, obj , function(err, user) {
      io.of('/root').emit('join', {
        user: user.firstname,
        time: Date.now()
      }, console.log('join', user.firstname))    
    })

    socket
      .on('add-message', chatMessageHandler)
      .on('add-chat', chatHandler)
      .on('disconnect', disconnectHandler);

    function chatHandler(chat) {
      console.log('chat recieved from client - ', chat);
      io.of('/root').emit('chat', chat);
    }

    function chatMessageHandler(message) {
      io.of('/root').emit('message', 
      {
        userId: message.userId,
        text: message.text,
        timestamp: message.timestamp,
        userName: message.userName
      });
    }

    function disconnectHandler(val) {
      console.log('disconnect')
      var obj = {isLogged: false};
      User.findOneAndUpdate({_id: socket.decoded_token.sub}, obj , function(err, user) {
        return io.of('/root').emit('leave', {
          user: user.firstname,
          time: Date.now()
        }, console.log('leave', user.firstname))      
      })
    }
})

//Privatechat namespaces for socket.io
io.of('/privatechat')
  .on('connection', function(socket) {
    console.log('ws room connection')
    socket.on('room', function(room) {
      console.log('user joined room', room)
      socket.join(room);
    });

    socket.on('add-private-message', function(message, room) {
      console.log('private message', message)
      message.chatname = room;
      io.of('/privatechat').in(room).emit('add-private-message', message);
    });
    
    socket.on('disconnect', function(val) {
      console.log('disconnect user from room')
      socket.disconnect() 
      })
   });

//Server Setup
const port = process.env.PORT || 8090;

server.listen(port);
console.log('Server is listening on: ', port)