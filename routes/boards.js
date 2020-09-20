/*
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getAllBoards } = require('../Queries-helpers/board-queries.js');


router.get("/", (req, res) => {
    getAllBoards()
      .then((boards) => {
        res.json(boards);
      })
      .catch((e) => console.log("error:", e));

});


router.get("/:boardid", (req, res) => {
    //go to a specific board given the board id
    //resources are embedded. Likes, comments, ratings are shown
    //if user does not own this board, edit links are hidden
});

router.post("/:boardid/create", (req, res) => {
    //add a new board
});

router.delete("/:boardid/delete", (req, res) => {
    //delete a board given an id
});

  //get rid of /create - here for illustrative purposes
router.put("/:boardid/edit", (req, res) => {
    //edit the board details - name, cats, desc etc.
});


module.exports = router;
