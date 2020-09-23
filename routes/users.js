/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const bcrypt = require('bcrypt');
const express = require('express');
const router  = express.Router();
const {userAuthenticate} = require('../public/scripts/util-functions.js');

const {
  getUserByEmail,
  getUserById,
  getUserByName,
  editUserName,
  editUserEmail,
  addNewUser,
  deleteUser,
  getPasswordById
} = require('../Queries-helpers/user-queries.js');
//GET /users/ route -> when a user arrives here we want to check if they're logged in
//If they are not logged in they see the main page with getAllBoards minus any 'my boards' links.

router.post("/login", (req, res) => {

  const emailString = req.body.email;
  const password = req.body.password;
  const userId = getUserByEmail(emailString);

  if (userId) {
    const hashPass = getPasswordById(userId);
    let passCompare = bcrypt.compareSync(password, hashPass);
    if (passCompare) {
      /* Assign cookie corresponding to userId */
      req.session.userId = userId;
      res.redirect("/");
    } else {
      res.send("Login credentials incorrect");
    }
  } else {
    res.send("Login credentials incorrect");
  }
});

router.get("/:userId", (req, res) => {
  //CONSIDER what we want to do with this route
  const userId = req.session.userId;
  getUserById(userId)
    .then(() => {

    });
});


router.patch("/:userId/edit-name", (req, res) => {
  const userId = req.params.userId;
  console.log("current user is", req.session.userId);
  if (!userAuthenticate(userId)) {
    res.redirect("/");
  } else {
    const newNameString = req.body.newNameString; //frontend: textinput - newNameString - needs submit button
    const userId = req.params.userId;
    const userFields = { newNameString, userId };
    editUserName(userFields)
      .then(() => {
        res.redirect("/:userId");
      })
      .catch((e) => console.log("error:", e));
  }

});

router.patch("/:userId/edit-email", (req, res) => {
  const userId = req.params.userId;
  if (!userAuthenticate(userId)) {
    res.redirect("/");
  } else {
    const newEmailString = req.body.newEmailString;
    const userId = req.params.userId;
    const userFields = { newEmailString, userId};
    editUserEmail(userFields)
      .then(() => {
        res.status(200).send('Welcome Aboard!')
      })
      .catch((e) => console.log("error:", e));
  }
});

router.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  if (name, email, password) { //all fields are filled in
    if (!getUserByEmail(email)) { //if the email doesn't already exist
      const passHash = bcrypt.hashSync(password, 10);
      const newUserFields = { name, email, passHash };
      console.log("functiondef", addNewUser);
      addNewUser(newUserFields)
        .then(async (response) => {
          console.log("hello");
          console.log(response); //grab user id from this and redirect to either their boards or account page
        });
    } else {
      //alert invalid creds
      res.redirect("/");
    }
  } else {
    res.send("Those credentials are invalid, sorry.")
  }

});


router.delete("/:userId/delete", (req, res) => {
  const userId = req.params.userId;
  if (!userAuthenticate(userId)) {
    res.redirect("/");
  } else {
    deleteUser(userId)
      .then(() => {
        res.redirect("/");
      })
      .catch((e) => console.log("error:", e));
  }
});




module.exports = router;
