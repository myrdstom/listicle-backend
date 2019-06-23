const express = require("express");
const router = express.Router();
const passport = require("passport");
const ValidateProfileInput = require("../../../validation/profile/profile");
const Profile = require("../../../models/Profile");

//@route    GET api/profile/
// @desc    Get current user's profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }, null),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.error = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route    POST api/profile/
// @desc    Create and Edit current user's profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }, null),
  (req, res) => {
      const {errors, isValid} = ValidateProfileInput(req.body);
      //Check Validation
      if(!isValid){
          return res.status(400).json(errors)
      }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.username) profileFields.username = req.body.username;
    if (req.body.bio) profileFields.bio = req.body.bio;
    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
      } else {
        // Create

        // Check if username exists
        Profile.findOne({ username: profileFields.username }).then(profile => {
          if (profile) {
            errors.username = "That username already exists";
            res.status(400).json(errors);
          }
          // Save profile
          new Profile(profileFields)
            .save()
            .then(profile => res.status(201).json(profile));
        });
      }
    });
  }
);

module.exports = router;
