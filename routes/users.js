/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //GET /users/ route -> when a user arrives here we want to check if they're logged in
  //If they are logged in and view
  router.get("/", (req, res) => {
    console.log(req.session);
  });

  router.get("/:userid", (req, res) => {
    //get the myBoards page of the user with id :userid
    //if not logged in as correct user, hide edit options
    //user also sees their 'liked' resources

  });

  router.post("/:userid/edit", (req, res) => {
    //the user is able to edit their profile information

  });
  return router;
};
