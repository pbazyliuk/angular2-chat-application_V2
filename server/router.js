const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const User = require('./models/user');
const Message = require('./models/message');
const Chat = require('./models/chat');
const mongoose = require('mongoose');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  // app.get('/', requireAuth, function(req, res) {
  //   res.send({ message: 'Super secret code is ABC123' });
  // });

  //Signin route
  app.post('/signin', requireSignin, Authentication.signin);

  //Signup route
  app.post('/signup', Authentication.signup);

  //Get all registered users route
  app.get('/api/users', function(req, res) {
    const userModel = {
      _id: null,
      firstname: null,
      lastname: null,
      email: null,
      isLogged: false
    }

    User.find({}, function(err, users) {
      let userMap = {};
      userMap.users = [];
      users.forEach(function(user) {
        let result = Object.keys(userModel).reduce(function(obj, key) {
          obj[key] = user[key];
          return obj;
        }, {});
         
          userMap.users.push(result);
      })
      res.send(userMap);  
      });
  });

  //Update user profile route
  app.put('/api/users/:id', function(req, res) {
      return User.findOne({_id: req.body._id})
      .then(user => {
          User.findOne({email: req.body.email, _id: { $ne: req.body._id }}, function(err, user1) {
            if (err) { return next(err); }
            if(user1) {
             return res.status(500).send({ message : 'Email in use' });
            }
            var isPasswordValid = bcrypt.compareSync(req.body.currentpassword, user.password);
            if(isPasswordValid) {

              var hash = bcrypt.hashSync(req.body.newpassword);
              const obj = Object.assign(user, req.body);
              obj.password = hash;
              Authentication.updateProfile(obj, res);
            }
            else {
              return res.status(500).send({ message : 'Bad password' });
            }
          })
      })
      .catch(err => {
        res.status(500).json({ message : 'Error' });
      });
  })

  //Get all saved chats route
  app.get('/api/chats', function(req, res) {
    Chat.find({}, function(err, chats) {
      if(err) return err;
      console.log(chats)
      res.send(chats);
    })
  })

  //Create private chat route
  app.post('/api/chats', function(req, res) {
    var usersNames = [];
    var usersIds = [];

    Chat.find({name: req.body.chatName})
      .then((chat) => {
        if(chat.length) {
          res.send({message: 'this chat name is already been taken'})
        }
        else {
          req.body.users.forEach((user) => {
            for(var key in user) {
              if(key === '_id') {
                usersIds.push(user[key]);
              }
              if(key === 'firstname') {
                usersNames.push(user[key]);
              }
            }
          })
          Chat.find({usersNames: usersNames}, function(err, chats) {
            if(err) return err;
            if(!chats.length) {
              var chatObj = {
                name: req.body.chatName,
                messageIds: [],
                usersIds: usersIds,
                usersNames: usersNames
              }
              Chat.create(chatObj, function(err, chat) {
                if (err) return err;
                res.send(chat);
              })
            }
            else {
                res.send({message: 'these users have been already connected to private chat'})
            }
            })
          }
      })
  })

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

