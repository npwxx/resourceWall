/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

//GET /users/ route -> when a user arrives here we want to check if they're logged in
//If they are not logged in they see the main page with getAllBoards minus any 'my boards' links.
router.get("/", (req, res) => {
  console.log(req.session);
});

router.get("/:boardid", (req, res) => {

  //get the myBoards page of the user with id :userid
  //if not logged in as correct user, hide edit options
  //user also sees their 'liked' resources

});

router.put("/:userid/edit", (req, res) => { //put is changing info about an existing entry, post is a new entry
  //the user is able to edit their profile information

});

module.exports = router;
