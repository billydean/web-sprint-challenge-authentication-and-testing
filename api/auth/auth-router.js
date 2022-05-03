const router = require('express').Router();
const { jwtSecret } = require('../secrets/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uniqueUser = require('../middleware/uniqueUser');
const validateUser = require('../middleware/validateUser');
const checkCredentials = require('../middleware/checkCredentials');
const User = require('./user-model.js');


router.post('/register', validateUser, uniqueUser, (req, res, next) => {
  const {password, username} = req.body;
  const hash = bcrypt.hashSync(password, 6);
  User.add({username, password: hash})
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(next);
});

router.post('/login', validateUser, checkCredentials, (req, res, next) => {
  function makeToken(user) {
    const payload = {
      subject: user.id,
      username: user.username
    };
    const options = {
      expiresIn: '1d',
    };
    return jwt.sign(payload, jwtSecret, options);
  };
  const { password } = req.body;
 if (bcrypt.compareSync(password, req.user.password)) {
   const token = makeToken(req.user);   
    res.status(200).json({
      message: `welcome, ${req.user.username}`,
      token
    })
  } else {
    next({
      status:401,
      message: "invalid credentials"
    })
  }
});

module.exports = router;
