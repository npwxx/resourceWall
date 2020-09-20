// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

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

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRouter = require("./routes/users.js");
const boardsRouter = require("./routes/boards.js");
const resourcesRouter = require("./routes/resources.js");

// Mount all resource routes
// I have written these in as prompts for future implementation - James

/* 1. 'user page' - sees collection of own boards, and 'liked resources'
    'profile maintenance area' drop down box to update user details.
   If user not logged in, redirect to viewAllBoards page with message to log in

*/

app.use("/users/", usersRouter(db)); // handle user routes - e.g. view my boards, view a user's boards given user id,

/* 2. 'home page' - big main page, lots of space, maybe 4 elements represeting user boxes - option to scroll down and see more boxes * /
/*  'search/filter capaity ' - users can organise by e.g. populatrity, category, name, date posted etc. avg overall rating, number of ratings * /
*/

app.use("/boards", boardsRouter(db)); // handle board routes - view a particular board given a board id, add, edit, delete, update boards

/* 3. Where we a see a specific board containing all resources
    Logged in owners of a board see edit, delete, add options
    GET ADVICE:  we want specfic boards to 'expand' from the board elements on the display boards page -
    does this require using the same endpoint? How do we set up routes for this?
*/ //1 can our routes handle it? Tiny app was SSR, this will be client side - jquery determined. Hit routes with ajax calls,
// but instead of res render or redirect do res send of json data

app.use("/boards/:boardid/resources", resourcesRouter(db)); // handle routes within a particular board -  add, edit, delete, resources from boards, add a comment, rate a resource

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
