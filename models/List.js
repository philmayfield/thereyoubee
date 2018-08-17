const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ListSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: Schema.Types.String,
    required: true
  }
});

let List = mongoose.model("list", ListSchema);

module.exports = List;
