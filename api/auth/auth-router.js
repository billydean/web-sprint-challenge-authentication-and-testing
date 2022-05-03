const router = require('express').Router();
const { jwtSecret } = require('../secrets/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uniqueUser = require('../middleware/uniqueUser');
const validateUser = require('../middleware/validateUser');
const User = require('./user-model.js');


router.post('/register', uniqueUser, validateUser, async (req, res, next) => {
  const {password, username} = req.body;
  const hash = bcrypt.hashSync(password, 6);
  User.add({username, password: hash})
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(next);
  /*

});

router.post('/login', (req, res) => {
  res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
