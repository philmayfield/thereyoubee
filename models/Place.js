const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PlaceSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  },
  address: {
    type: Schema.Types.String,
    required: true
  },
  suggestion: {
    type: Schema.Types.String,
    default: ""
  },
  place_id: {
    type: Schema.Types.String,
    requred: true
  },
  latLng: {
    lat: {
      type: Schema.Types.Number,
      required: true
    },
    lng: {
      type: Schema.Types.Number,
      required: true
    }
  }
});

let Place = mongoose.model("place", PlaceSchema);

module.exports = Place;
