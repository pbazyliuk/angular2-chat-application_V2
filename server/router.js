const Authentication = require('./controllers/authentication');
const Profile = require('./controllers/profile');
const Chats = require('./controllers/chats');
const Messages = require('./controllers/messages');

const passportService = require('./services/passport');
const passport = require('passport');

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
  app.get('/api/users', Authentication.getAllUsers);

  //Update user profile route
  app.put('/api/users/:id', Profile.updateProfile);

  //Get all private chats route
  app.get('/api/chats', Chats.getAllChats);

  //Create private chat route
  app.post('/api/chats', Chats.createChat);

  //Save message to private chat route
  app.post('/api/chats/:id', Chats.createPrivateMessage);

  //Get all messages from private chat route
  app.get('/api/chats/:id', Chats.getPrivateMessages);

  //Create message in main chat route
  app.post('/api/messages', Messages.createMessage);

  //Get all messages from main chat route
  app.get('/api/messages', Messages.getAllMessages);
}   

