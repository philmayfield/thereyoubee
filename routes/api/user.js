const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const notEmpty = require("../../validation/empty").notEmpty;

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Loat User model
const User = require("../../models/User");

// ROUTES --------------------------------------------

// @route   POST api/user/register
// @desc    Register a new user
// @access  Public
router.post("/register", (req, res) => {
  // validate request
  const { errors, isValid } = validateRegisterInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      // username already in the db, reject

      const { username } = req.body;

      errors.username = `Sorry, the username ${username} already exist 😢`;

      return res.status(400).json(errors);
    } else {
      // username does not exist - generate new user

      const newUser = new User({
        username: req.body.username,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
        });
      });
    }
  });
});

// @route   POST api/user/login
// @desc    Login user, Returning token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  const { username, password } = req.body;

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find user by username
  User.findOne({ username }).then(user => {
    const notFoundMsg = "Sorry, invalid username and password combination";

    // check for user
    if (!user) {
      // user not found, reject
      errors.username = notFoundMsg;
      return res.status(404).json(errors);
    }

    // user found, check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // password matches
        const key = keys.secretOrKey;

        // create jwt payload
        const payload = {
          id: user.id,
          username: user.username
        };

        // sign token
        const expiration = 86400; // 24 hours

        jwt.sign(payload, key, { expiresIn: expiration }, (err, token) => {
          if (err) throw err;

          // signed in, return token
          return res.json({
            success: true,
            token: `Bearer ${token}`
          });
        });
      } else {
        // password does not match
        errors.password = notFoundMsg;

        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/user/current
// @desc    Return the current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username
    });
  }
);

// @route   GET api/user/:user_id
// @desc    Find a user by id
// @access  Private
router.get(
  "/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    User.findOne({ _id: req.params.user_id })
      .then(user => {
        if (notEmpty(user)) {
          // user was found, return it with 200 status
          return res.json(user);
        }

        // user was not found
        errors.nouser = "Sorry, we couldnt find that user :(";
        return res.status(404).json(errors);
      })
      .catch(err => {
        errors.nouser = "Sorry, we couldnt find that user :(";
        return res.status(404).json({ err, errors });
      });
  }
);

// @route   GET api/user/username/:user_id
// @desc    Find a username by id, limited info for public use
// @access  Public
router.get("/username/:user_id", (req, res) => {
  const errors = {};

  User.findOne({ _id: req.params.user_id })
    .then(user => {
      if (notEmpty(user)) {
        // user was found, return it with 200 status
        return res.json({
          _id: user._id,
          username: user.username
        });
      }

      // user was not found
      errors.nouser = "Sorry, we couldnt find that user :(";
      return res.status(404).json(errors);
    })
    .catch(err => {
      errors.nouser = "Sorry, we couldnt find that user :(";
      return res.status(404).json({ err, errors });
    });
});

module.exports = router;
