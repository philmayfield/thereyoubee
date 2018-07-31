const express = require("express");
const router = express.Router();
const passport = require("passport");
const notEmpty = require("../../validation/empty").notEmpty;

// load validations
const validatePlaceInput = require("../../validation/place");

// load models
const Place = require("../../models/Place");

// ROUTES --------------------------------------------

// @route   GET api/recipe/all
// @desc    Read all recipes
// @access  Public
// router.get("/all", (req, res) => {
//   const errors = {};

//   Recipe.find()
//     .then(recipes => {
//       if (notEmpty(recipes)) {
//         // found some recipes, return with 200 status
//         return res.json(recipes);
//       }

//       // no recipes found
//       errors.recipesError =
//         "Hey, there arent any recipes here yet.  Why dont you add some!";
//       return res.status(404).json(errors);
//     })
//     .catch(err => {
//       errors.req = req;
//       errors.err = err;
//       errors.recipeError = "There was a problem fetching the recipes :(";
//       return res.status(404).json(errors);
//     });
// });

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
    console.log("body", body);
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
        console.log("err", err);
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

// @route   DELETE api/recipe/:recipe_id
// @desc    Delete a recipe
// @access  Private
// router.delete(
//   "/:recipe_id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const recipeId = req.params.recipe_id;

//     Recipe.findByIdAndDelete(recipeId)
//       .then(recipe => {
//         if (notEmpty(recipe)) {
//           // deleted the recipe - now delete the associated versions, brews and gravities
//           Version.find({ recipe: recipe._id })
//             .then(versions => {
//               versions.forEach(version => {
//                 Version.findByIdAndDelete(version._id)
//                   .then(version => {
//                     Brew.find({ version: version._id }).then(brews => {
//                       brews.forEach(brew => {
//                         Brew.findByIdAndDelete(brew._id)
//                           .then(brew => {
//                             Gravity.deleteMany({ brew: brew._id }).catch(err =>
//                               console.log("g dm err >", err)
//                             );
//                           })
//                           .catch(err => console.log("b fd err >", err));
//                       });
//                     });
//                   })
//                   .catch(err => console.log("v fd err >", err));
//               });
//             })
//             .catch(err => res.status(400).json(err));
//           return res.json({ deleted: true });
//         }
//         return res.json({
//           deleted: "That recipe was not found or already deleted!"
//         });
//       })
//       .catch(err => res.status(400).json(err));
//   }
// );

module.exports = router;
