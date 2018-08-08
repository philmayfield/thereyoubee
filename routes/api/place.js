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
// @desc    Read all places
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Place.find()
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
});

// @route   GET api/recipe/:recipe_id
// @desc    Read recipe by ID
// @access  Public
// router.get("/:recipe_id", (req, res) => {
//   const errors = {};

//   Recipe.findOne({ _id: req.params.recipe_id })
//     .then(recipe => {
//       if (notEmpty(recipe)) {
//         // recipe was found, return it with 200 status
//         return res.json(recipe);
//       }

//       // recipe was not found
//       errors.recipeError = "Sorry, we couldnt find that recipe :(";
//       return res.status(404).json(errors);
//     })
//     .catch(() => {
//       errors.recipeError = "Sorry, we couldnt find that recipe :(";
//       return res.status(404).json(errors);
//     });
// });

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
      .catch(err => {
        errors.placeError = "We ran into a problem saving this place.";
        res.status(400).json(errors);
      });
  }
);

// @route   POST api/recipe/:recipe_id
// @desc    Update a recipe
// @access  Private
// router.post(
//   "/:recipe_id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     // validate request
//     const recipeId = req.params.recipe_id;
//     const { body } = req;
//     const { errors, isValid } = validateRecipeInput(body);

//     // check validation
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }

//     // get fields
//     const recipeFields = {};
//     recipeFields.name = body.name ? body.name : "";
//     recipeFields.style = body.style ? body.style : "";

//     Recipe.findOneAndUpdate(
//       { _id: recipeId }, // object to find and update
//       { $set: recipeFields }, // data
//       { new: true } // new option returns the updated object
//     )
//       .then(recipe => {
//         if (notEmpty(recipe)) {
//           return res.json(recipe);
//         }
//         errors.recipeError = "Could not find that recipe to update :(";
//         return res.status(404).json(errors);
//       })
//       .catch(() => {
//         errors.recipeError = "Could not find that recipe to update :(";
//         return res.status(404).json(errors);
//       });
//   }
// );

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
          // deleted the place - now delete the associated versions, brews and gravities
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
