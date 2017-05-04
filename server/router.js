const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const User = require('./models/user');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

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
      email: null
    }
    User.find({}, function(err, users) {
      let userMap = {};
      userMap.users = [];
      users.forEach(function(user) {
        let result = Object.keys(userModel).reduce(function(obj, key) {
          obj[key] = user[key];
          return obj;
        }, {});
        console.log(result);
          
          userMap.users.push(result);
      })
      res.send(userMap);  
    });
  });
}