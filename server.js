// packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

// routes
const user = require("./routes/api/user");
const place = require("./routes/api/place");
const list = require("./routes/api/list");

// init express
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config - get mongoURI from from config/keys
const db = require("./config/keys").mongoURI;

// Connect to MongoDB with mongoose
mongoose
  .connect(db)
  .then(() => console.log("> MongoDB connected"))
  .catch(e => console.error("Error connecting to DB:", e));

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

// Use Routes
app.use("/api/user", user);
app.use("/api/place", place);
app.use("/api/list", list);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// set express port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`> Server running on port ${port}`));
