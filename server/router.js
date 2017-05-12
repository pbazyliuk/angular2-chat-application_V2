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
const _ = require('lodash');

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

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
        // console.log(result);
          
          userMap.users.push(result);
      })
      res.send(userMap);  
    });
  });

  app.put('/api/users/:id', function(req, res) {
    // console.log('req.body', req.body);
      return User.findOne({_id: req.body._id})
      .then(user => {
          User.findOne({email: req.body.email, _id: { $ne: req.body._id }}, function(err, user1) {
            if (err) { return next(err); }
            if(user1) {
             return res.status(500).send({ message : 'Email in use' });
            }
            // console.log('User', user)
            // console.log('User1', user1)
            var isPasswordValid = bcrypt.compareSync(req.body.currentpassword, user.password);
            console.log('isPasswordValid', isPasswordValid)
            if(isPasswordValid) {

              var hash = bcrypt.hashSync(req.body.newpassword);
              const obj = Object.assign(user, req.body);
              // console.log('HASH', hash)
              // console.log('Object', obj)
              obj.password = hash;
              // console.log('Object NEW', obj)
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

    app.get('/api/chats', function(req, res) {
      //res.send({message: 'get all chats ok'});
      Chat.find({}, function(err, chats) {
        if(err) return err;
        console.log(chats)
        res.send(chats);
      })
    })

    app.post('/api/chats', function(req, res) {
      console.log(req.body);
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
              console.log('CHAT FIND', chats);
              if(!chats.length) {
                var chatObj = {
                  name: req.body.chatName,
                  messageIds: [],
                  usersIds: usersIds,
                  usersNames: usersNames
                }
                Chat.create(chatObj, function(err, chat) {
                  if (err) return err;
                  console.log('CHAT CREATED', chat)
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

    app.post('/api/messages', function(req, res) {
      console.log(req.body);
      Message.create(req.body, function(err, doc) {
        if (err) return err;
        res.send(doc);
      })
    })

     app.get('/api/messages', function(req, res) {
      console.log(req.body);
      Message.find({}, function(err, messages) {
        if (err) return err;
        res.send(messages);
      })
    })
}   

