// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();
module.exports = { db };

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



//Bring in helper modules - functions returned on a helper to query the data
const userHelper = require('./Queries-helpers/user-queries.js');
const boardHelper = require('./Queries-helpers/board-queries.js');
const resourceHelper = require('./Queries-helpers/resource-queries.js');


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRouter = require("./routes/users.js");
const boardsRouter = require("./routes/boards.js");
const resourcesRouter = require("./routes/resources.js");
const commentsRouter = require("./routes/comments.js");



// Mount all resource routes
/* 1. 'user page' - sees collection of own boards, and 'liked resources'
    'profile maintenance area' drop down box to update user details.
   If user not logged in, redirect to viewAllBoards page with message to log in
*/
app.use("/users/", usersRouter); // handle user routes - e.g. view my boards, view a user's boards given user id,
app.use("/boards", boardsRouter); // handle board routes - view a particular board given a board id, add, edit, delete, update boards
app.use("/resources", resourcesRouter); // handle routes within a particular board -  add, edit, delete, resources from boards, add a comment, rate a resource
app.use("/resources/comments", commentsRouter); // handle routes within a particular board -  add, edit, delete, resources from boards, add a comment, rate a resource

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
