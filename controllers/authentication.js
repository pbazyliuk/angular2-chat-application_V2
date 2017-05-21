const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {

  const userModel = {
      _id: null,
      firstname: null,
      lastname: null,
      email: null
  }
  User.findOne({'email': req.user.email}, function(err, user) {
    if (err) { return next(err); }

    if (user) {
    let result = Object.keys(userModel).reduce(function(obj, key) {
        obj[key] = user[key];
        return obj;
      }, {});
     res.send({ token: tokenForUser(req.user), user: result });
    }
   });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    });

     const userModel = {
        _id: null,
        firstname: null,
        lastname: null,
        email: null
    }

    let result = Object.keys(userModel).reduce(function(obj, key) {
        obj[key] = user[key];
        return obj;
      }, {});

    user.save(function(err) {
      if (err) { return next(err); }
      
      console.log(user)
      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user), user: result});
    });
  });
}

exports.getAllUsers = function(req, res, next) {
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
  }