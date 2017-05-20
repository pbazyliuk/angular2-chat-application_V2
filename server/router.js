const Authentication = require('./controllers/authentication');
const Profile = require('./controllers/profile');
const Chats = require('./controllers/chats');

const passportService = require('./services/passport');
const passport = require('passport');
// const bcrypt = require('bcrypt-nodejs');
const User = require('./models/user');
const Message = require('./models/message');
const Chat = require('./models/chat');
const mongoose = require('mongoose');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const config = require('./config.js');
// const jwt = require('jwt-simple');
// function tokenForUser(user) {
//   const timestamp = new Date().getTime();
//   return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
// }


module.exports = function(app) {

  // app.get('/', requireAuth, function(req, res) {
  //   res.send({ message: 'Super secret code is ABC123' });
  // });

  //Signin route
  app.post('/signin', requireSignin, Authentication.signin);

  //Signup route
  app.post('/signup', Authentication.signup);

  //Get all registered users route
  app.get('/api/users', Authentication.getAllUsers);

  //Update user profile route
  app.put('/api/users/:id', Profile.updateProfile )

  //Get all private chats route
  app.get('/api/chats', Chats.getAllChats)

  //Create private chat route
  app.post('/api/chats', Chats.createChat)

  //Save message to private chat route
  app.post('/api/chats/:id', function(req, res) {
    var messagesObj = {};
    messagesObj.messageIds = [];
    messagesObj.messageIds.push(req.body)
    Chat.findOneAndUpdate({name: req.params.id},  {$push: {messageIds: req.body}}, function(err, chat) {
      if(err) return err;
      res.send({message: `message added to chat: ${req.params.id}`});
    })
  })

  //Get all messages from private chat route
  app.get('/api/chats/:id', function(req, res) {
    Chat.findOne({name: req.params.id}, function(err, chat) {
      if(err) return err;
      res.send(chat);
    })
  })

  //Create message in main chat route
  app.post('/api/messages', function(req, res) {
    Message.create(req.body, function(err, message) {
      if (err) return err;
      res.send(message);
    })
  })

  //Get all messages from main chat route
  app.get('/api/messages', function(req, res) {
    Message.find({}, function(err, messages) {
      if (err) return err;
      res.send(messages);
    })
  })
}   

