/* eslint-disable no-undef */
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = process.env;
const passport = require('passport');
const validateRegisterInput = require('../../../validation/users/registration');
const validateLoginInput = require('../../../validation/users/login');
const User = require('../../../models/User');

//@route    GET api/users/register
// @desc    Register route
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: ['Email already exists'] });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(8, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user =>
              res
                .status(201)
                .json({ user, msg: 'You have successfully registered a user' })
            )
            // eslint-disable-next-line no-console
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route    GET api/users/login
// @desc    Login User
// @access  Public
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  await User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Password Matched
        const payload = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});
// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }, null),
  (req, res) => {
    res.json({
      email: req.user.email,
      msg: 'success'
    });
  }
);

module.exports = router;
