const express = require("express");
const router = express.Router();
const passport = require("passport");
const notEmpty = require("../../validation/empty").notEmpty;

// load validations
const validateListInput = require("../../validation/list");

// load models
const List = require("../../models/List");

// ROUTES --------------------------------------------

// @route   GET api/list/all
// @desc    Read all lists for a user
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    List.find({ author: req.user._id })
      .sort("name")
      .then(lists => {
        if (notEmpty(lists)) {
          // found some lists, return with 200 status
          return res.json(lists);
        }

        // no lists found
        errors.listsError =
          "Hey, there arent any lists here yet.  Why dont you add some!";
        return res.status(404).json(errors);
      })
      .catch(err => {
        errors.req = req;
        errors.err = err;
        errors.listsError = "There was a problem fetching the lists 😢";
        return res.status(404).json(errors);
      });
  }
);

// @route   POST api/list
// @desc    Create a list
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validate request
    const author = req.user.id;
    const { body } = req;
    const { errors, isValid } = validateListInput(body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // check to see if that list name already exists for a user
    List.findOne({ author: author, name: req.body.name }).then(list => {
      if (list) {
        // list name already exists

        const { name } = req.body;

        errors.listName = `You've already got a list named ${name} 😎`;

        return res.status(400).json(errors);
      } else {
        // list name does not exist, make a new one

        // get fields
        const listFields = {};
        listFields.author = author ? author : "";
        listFields.name = body.name ? body.name : "";
        listFields.color = body.color ? body.color : "";

        // save list to db
        new List(listFields)
          .save()
          .then(list => res.json(list))
          .catch(err => {
            errors.listError = "We ran into a problem saving this list.";
            res.status(400).json(errors);
          });
      }
    });
  }
);

// @route   POST api/list/:id
// @desc    Update a list
// @access  Private
router.post(
  "/:list_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validate request
    const listId = req.params.list_id;
    const { body } = req;
    const { errors, isValid } = validateListInput(body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const listFields = {
      name: body.name,
      color: body.color
    };

    // check to see if that list name already exists
    List.findOneAndUpdate(
      { _id: listId }, // query
      { $set: listFields }, // set data
      { new: true } // return updated object
    )
      .then(list => {
        if (notEmpty(list)) {
          return res.json(list);
        }
        errors.listError = "Could not find that list to update";
        return res.status(404).json(errors);
      })
      .catch(err => {
        errors.listError = "Could not find that list to update";
        errors.err = err;
        return res.status(404).json(errors);
      });
  }
);

// @route   DELETE api/list/:id
// @desc    Delete a list
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.params;

    List.findByIdAndDelete(id)
      .then(list => {
        if (notEmpty(list)) {
          return res.json({
            list,
            deleted: true
          });
        }
        return res.json({
          deleted: "That list was not found or already deleted!"
        });
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
