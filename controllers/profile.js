const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');
const bcrypt = require('bcrypt-nodejs');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.updateProfile = function(req, res) {
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
              User.update({_id: obj._id}, obj, function(err, user) {
                if (err) { return err; }
                res.json({ token: tokenForUser(obj), user: user});
              })
            }
            else {
              return res.status(500).send({ message : 'Bad password' });
            }
          })
      })
      .catch(err => {
        res.status(500).json({ message : 'Error' });
      });
  }