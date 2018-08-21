const express = require("express");
const router = express.Router();
const passport = require("passport");
const notEmpty = require("../../validation/empty").notEmpty;

// load validations
const validatePlaceInput = require("../../validation/place");

// load models
const Place = require("../../models/Place");

// ROUTES --------------------------------------------

// @route   GET api/place/all
// @desc    Read all places for a user
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.params;
    const errors = {};
    const conditions = {
      author: req.user._id
    };

    if (id !== "all") {
      conditions.list_id = id;
    }

    Place.find(conditions)
      .then(places => {
        if (notEmpty(places)) {
          // found some places, return with 200 status
          return res.json(places);
        }

        // no places found
        errors.placesError =
          "Hey, there arent any places here yet.  Why dont you add some!";
        return res.status(404).json(errors);
      })
      .catch(err => {
        errors.req = req;
        errors.err = err;
        errors.placesError = "There was a problem fetching the places 😢";
        return res.status(404).json(errors);
      });
  }
);

// @route   POST api/place
// @desc    Create a place
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validate request
    const author = req.user.id;
    const { body } = req;
    const { errors, isValid } = validatePlaceInput(body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const placeFields = {};
    placeFields.author = author ? author : "";
    placeFields.list_id = body.list_id ? body.list_id : "";
    placeFields.address = body.address ? body.address : "";
    placeFields.suggestion = body.suggestion ? body.suggestion : "";
    placeFields.place_id = body.place_id ? body.place_id : "";
    placeFields.latLng = {
      lat: body.lat ? body.lat : "",
      lng: body.lng ? body.lng : ""
    };

    // save place to db
    new Place(placeFields)
      .save()
      .then(place => res.json(place))
      .catch(() => {
        errors.placeError = "We ran into a problem saving this place.";
        res.status(400).json(errors);
      });
  }
);

// @route   DELETE api/place/:id
// @desc    Delete a place
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.params;

    Place.findByIdAndDelete(id)
      .then(place => {
        if (notEmpty(place)) {
          return res.json({
            place,
            deleted: true
          });
        }
        return res.json({
          deleted: "That place was not found or already deleted!"
        });
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
