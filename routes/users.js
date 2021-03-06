/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


const {
  getUserByEmail,
  getUserById,
  editUserName,
  editUserEmail,
  editUserPassword,
  addNewUser,
  deleteUser,
  getBoardByOwnerId,
  getLikedResourcesByOwnerId
} = require('../Queries-helpers/user-queries.js');
//GET /users/ route -> when a user arrives here we want to check if they're logged in
//If they are not logged in they see the main page with getAllBoards minus any 'my boards' links.

router.post("/login", (req, res) => {

  const emailString = req.body.email;
  const password = req.body.password;
  getUserByEmail(emailString)
    .then((response) => {
      console.log(response);
      if (!response) {
        res.status(400).send("We couldn't find an account with those details");
      } else {
        const userId = response.id;
        const hashPass = response.password;
        let passCompare = bcrypt.compareSync(password, hashPass);
        if (passCompare) {
          req.session.userId = userId;
          res.status(200).send(`Welcome back, ${response.name}`);
        } else {
          res.status(400).send('Invalid login credentials');
        }
      }
    });
});


router.get("/myboards", (req, res) => {
  let sessionOwnerId = req.session.userId;
  getBoardByOwnerId(sessionOwnerId)
    .then((boards) => {
      //console.log("sending boards", boards, boards[0].created, boards[0].created instanceof Date)
      res.json(boards);
    })
    .catch((e) => console.log("error uh ho", e));

});


router.get("/likedresources", (req, res) => {
  let sessionOwnerId = req.session.userId;
  getLikedResourcesByOwnerId(sessionOwnerId)
    .then((resources) => {
      //console.log("sending boards", boards, boards[0].created, boards[0].created instanceof Date)
      res.json(resources);
    })
    .catch((e) => console.log("error uh ho", e));

});

router.get("/me", (req, res) => {
  //CONSIDER what we want to do with this route
  const userId = req.session.userId;
  if (userId) {
    getUserById(userId)
      .then((user) => {
        res.json(user);
      });
  } else {
    res.json(null);
  }
});

router.post("/logout", (req, res) => {
  req.session = null;
  res.sendStatus(200);
});

router.post("/:userId/edit-name", (req, res) => {
  const userId = Number(req.params.userId);
  console.log("current user is", req.session.userId);
  console.log("type of", typeof userId);
  if (userId !== req.session.userId) {
    res.sendStatus(400);
  } else {
    const newNameString = req.body.newNameString; //frontend: textinput - newNameString - needs submit button
    // console.log(req.body);
    const userFields = { newNameString, userId };
    // console.log(userFields);
    editUserName(userFields)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((e) => console.log("error:", e));
  }

});

router.post("/:userId/edit-email", (req, res) => {
  const userId = Number(req.params.userId);
  if (userId !== req.session.userId) {
    res.sendStatus(400);
  } else {
    const newEmailString = req.body.newEmailString;
    const userFields = { newEmailString, userId };
    editUserEmail(userFields)
      .then(() => {
        res.sentStatus(200);
      })
      .catch((e) => console.log("error:", e));
  }
});

router.post("/:userId/edit-password", (req, res) => {
  const userId = Number(req.params.userId);
  if (userId !== req.session.userId) {
    res.sendStatus(400);
  } else {
    const password = bcrypt.hashSync(req.body.password, 10);
    const userFields = { password, userId };
    editUserPassword(userFields)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((e) => console.log("error:", e));
  }
});

router.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 10);
  const userFields = { name, email, password };
  if (!name || !email || !password) {
    res.status(400).send('Fields cannot be empty');
  } else {
    getUserByEmail(email)
      .then((response) => {
        if (!response) { //email isn't already being used
          addNewUser(userFields)
            .then((row) => {
              req.session.userId = row.id;
              res.status(200).send(`Welcome Aboard, ${name}`);
            });
        } else {
          res.status(400).send(`Sorry ${name}, you can't use that email`);
        }
      });
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
