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
//DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

//App Setup
app.use(cors());
app.use(morgan('combined')); //login request framework
app.use(bodyParser.json({ type: '*/*' })) //parser incoming request
router(app);


io.on('connection', (socket) => {
  console.log('user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('add-message', (message) => {
    io.emit('message', {type:'new-message', text: message});    
  });
});

//Server Setup
const port = process.env.PORT || 8090;

server.listen(port);
console.log('Server is listening on: ', port)