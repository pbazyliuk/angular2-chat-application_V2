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

io.sockets
  .on('connection', socketioJwt.authorize({
    secret: config.secret,
    callback: false
  }))
  .on('authenticated', socket => {
       console.log('connect')
       //console.log(socket.decoded_token.sub);
       
    //    User.findOne({_id: socket.decoded_token.sub}, function(err, user) {
    //        if (err) { return err; }
    //         if(user) {
    //             console.log(user)
    //          io.emit('join', {
    //             user: user.firstname,
    //             time: Date.now()
    //         })
    //          return;
    //         }
    //    })
       var obj = {isLogged: true};
       User.findOneAndUpdate({_id: socket.decoded_token.sub}, obj , function(err, user) {
        return   io.emit('join', {
                    user: user.firstname,
                    time: Date.now()
                }, console.log('join', user.firstname))      
                
       })
       
 

          
             
            
    
    

    socket
      //.on('unauthorized', unauthorizedHandler)
      .on('add-message', chatMessageHandler)
      .on('disconnect', disconnectHandler)
      .on('room', function(room) {
            socket.join(room);
            console.log('join room', room)
            //room = "abc123";
            io.sockets.in(room).emit('messageRoom', 'what is going on, party people?');
        });

    // function unauthorizedHandler(error) {
    //   if (error.data.type == 'UnauthorizedError' || error.data.code == 'invalid_token') {
    //     // redirect user to login page perhaps?
    //     console.log("User's token has expired");
    //   }
    // }

    function chatMessageHandler(message) {
        io.emit('message', {userId: message.userId, text: message.text, timestamp: message.timestamp, userName: message.userName});
    //   console.log('message received')
    //   const msgObj = {
    //     msg,
    //     user: socket.decoded_token.sub,
    //     time: Date.now()
    //   }

    //   io.emit('message', msgObj)

    //   mongoConnected.then(db => {
    //     db
    //       .collection('messages')
    //       .insert(msgObj, err => {
    //         if (err) io.emit('error', err)
    //       })
    //   })
    }

    function disconnectHandler() {
      console.log('disconnect')
       var obj = {isLogged: false};
       User.findOneAndUpdate({_id: socket.decoded_token.sub}, obj , function(err, user) {
        return   io.emit('leave', {
                    user: user.firstname,
                    time: Date.now()
                }, console.log('leave', user.firstname))      
       })
        // User.findOne({_id: socket.decoded_token.sub}, function(err, user) {
        //     if (err) { return err; }
        //     if(user) {
        //         console.log(user.firstname)
        //         io.emit('leave', {
        //             user: user.firstname,
        //             time: Date.now()
        //         })
        //         return;
        //     }
        // })
    //   io.emit('leave', {
    //     user: socket.decoded_token.sub,
    //     time: Date.now()
    //   })
    }
  })



//Server Setup
const port = process.env.PORT || 8090;

server.listen(port);
console.log('Server is listening on: ', port)