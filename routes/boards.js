const express = require('express');
const router  = express.Router();
const {
  getAllBoards,
  getBoardByOwnerName,
  getBoardByOwnerId,
  getBoardById
} = require('../Queries-helpers/board-queries.js');


router.get("/", (req, res) => {
    getAllBoards()
      .then((boards) => {
        res.json(boards);
      })
      .catch((e) => console.log("error:", e));

});


router.get("/:boardId", (req, res) => {
  const boardId = req.params.boardId;
  getBoardById(boardId)
  .then((boards) => {
    res.json(boards)
  })
  .catch((e) => console.log("error", e))
});

router.get("/:boardId", (req, res) => {
  const boardId = req.params.boardId;
  getBoardById(boardId)
  .then((boards) => {
    res.json(boards)
  })
  .catch((e) => console.log("error", e))
});


router.get("/search-owner/:nameString", (req, res) => {
  const nameString = req.params.nameString;
  getBoardByOwnerName(nameString)
  .then((boards) => {
    res.json(boards)
  })
  .catch((e) => console.log("error", e))
});

router.get("/search-owner/:ownerId", (req, res) => {
  const ownerId = req.params.ownerId;
  getBoardByOwnerId(ownerId)
  .then((boards) => {
    res.json(boards)
  })
  .catch((e) => console.log("error", e))
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


module.exports = { router };
