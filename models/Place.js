const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PlaceSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

let Place = mongoose.model("place", PlaceSchema);

module.exports = Place;
