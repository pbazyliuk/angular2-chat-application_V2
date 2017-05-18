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

//DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

//App Setup
app.use(cors());
app.use(morgan('combined')); //login request framework
app.use(bodyParser.json({ type: '*/*' })) //parser incoming request
router(app);


// io.on('connection', (socket) => {
//   console.log('user connected');
  
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
  
//   socket.on('add-message', (message, author) => {
//       console.log('message received')
//     io.emit('message', {type:'new-message', name: author, text: message});


//   });
// });

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
      //.on('unauthorized', unauthorizedHandler)
      .on('add-message', chatMessageHandler)
      .on('add-chat', chatHandler)
      .on('disconnect', disconnectHandler);

     

    //   .on('room', function(room) {
    //         socket.join(room);
    //         console.log('join room', room)
    //         //room = "abc123";
    //         io.sockets.in(room).emit('messageRoom', 'what is going on, party people?');
    //     });

    function chatHandler(chat) {
        console.log('chat recieved from client - ', chat);
         io.of('/root').emit('chat', chat);
    }

    function chatMessageHandler(message) {

        // if(rootSocket) { console.log('room disconnect'); rootSocket.disconnect() }
        io.of('/root').emit('message', {userId: message.userId, text: message.text, timestamp: message.timestamp, userName: message.userName});
    }

    function disconnectHandler(val) {
      console.log('disconnect')
        console.log(val)
       var obj = {isLogged: false};
       User.findOneAndUpdate({_id: socket.decoded_token.sub}, obj , function(err, user) {
        return   io.of('/root').emit('leave', {
                    user: user.firstname,
                    time: Date.now()
                }, console.log('leave', user.firstname))      
       })
    }
})



io.of('/privatechat')
       .on('connection', function(socket) {
            console.log('ws room connection')
                   //rootSocket = socket;
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        console.log('user joined room', room)
        socket.join(room);
        //room = "abc123";
        
    });
    socket.on('add-private-message', function(message, room) {
       console.log('private message', message)
       message.chatname = room;
       console.log(message)
        io.of('/privatechat').in(room).emit('add-private-message', message);
    });
    
     socket.on('disconnect', function(val) {
        console.log(val)
        console.log('disconnect user from room')
        //room = "abc123";
        socket.disconnect() 
        // io.of('/namespace').emit('leave', 'user leave room')     
        //socket.leave(room);
        // socket.packet({type: 'disconnect'});
       })
        // io.of('/namespace').emit('message', 'user disconnected from room');
        // socket.leave(room);
        
        //room = "abc123";
        //io.of('/namespace').emit('leave', 'leave user from room')      
        
    });

      


//Server Setup
const port = process.env.PORT || 8090;

server.listen(port);
console.log('Server is listening on: ', port)