const express = require('express');
const router  = express.Router();
const {
  getAllBoards,
  getBoardByOwnerName,
  getBoardByOwnerId,
  getBoardById,
  editBoardTitle,
  editBoardDescription,
  deleteBoard,
  addBoardCategory,
  deleteBoardCategory
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

router.post("/:boardId/add-category", (req, res) => {
  const newCategoryString = req.body.newCategoryString;
  const boardId = req.params.boardId;
  const categoryFields = { boardId, newCategoryString }
  addBoardCategory(categoryFields)
    .then((boards) => {
        res.json(boards);
      })
    .catch((e) => console.log("error:", e));
});

router.put("/:boardId/edit-title", (req, res) => {
  const newTitleString = req.body.newTitleString;
  const boardId = req.params.boardId;
  editBoardTitle(newTitleString, boardId)
    .then((boards) => {
        res.json(boards);
      })
    .catch((e) => console.log("error:", e));
});

router.patch("/:boardId/edit-description", (req, res) => {
  const newText = req.body.newText;
  const boardId = req.params.boardId;
  editBoardDescription(newText, boardId)
    .then(() => {
        res.redirect("/");
      })
    .catch((e) => console.log("error:", e));
});

router.post("/create", (req, res) => {
    const ownerId = req.session.userId;
    const boardTitle = req.body.boardTitle;
    const boardDescription = req.body.boardDescription;
    const newBoardFields = { ownerId, boardTitle, boardDescription };
    addNewBoard(newBoardFields)
      .then((response) => {
        console.log(response);
        res.redirect("/")
      })

});

router.delete("/:boardid/delete", (req, res) => {
  const userId = req.session.userId;
  const boardId = req.params.boardId;
  const boardFields = { userId, boardId };
  deleteBoard(resourceFields)
    .then(() => {
      res.redirect("/")
    })
    .catch((e) => console.log("error:", e));
});

router.delete("/:boardid/delete-category/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  const boardId = req.params.boardId;
  const categoryFields = { categoryId, boardId };
  deleteBoard(categoryFields)
    .then(() => {
      res.redirect("/")
    })
    .catch((e) => console.log("error:", e));
});

  //get rid of /create - here for illustrative purposes
router.put("/:boardid/edit", (req, res) => {
    //edit the board details - name, cats, desc etc.
});


module.exports = router;
