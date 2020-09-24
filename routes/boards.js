const express = require('express');
const router = express.Router();
const {
  getAllBoardCategories,
  getBoardsByCategoryType,
  getBoardByOwnerName,
  getBoardById,
  getAllBoards,
  editBoardTitle,
  editBoardDescription,
  deleteBoard,
  addBoardCategory,
  deleteBoardCategory,
  addNewBoard
} = require('../Queries-helpers/board-queries.js');
const {
  getResourcesByBoardId,
  addNewResource
} = require('../Queries-helpers/resource-queries.js');



router.get("/categories", (req, res) => {
  getAllBoardCategories()
    .then((categories) => {
      res.json(categories);
    })
    .catch((e) => console.log("error:", e));
});

router.get("/categories/:type", (req, res) => {
  getBoardsByCategoryType(req.params.type)
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));
});

router.get("/:boardId", (req, res) => {
  const boardId = req.params.boardId;
  getBoardById(boardId)
    .then((boards) => {
      res.json(boards);
    })
    .catch((e) => console.log("error", e));
});

router.get("/:boardId/resources", (req, res) => {
  const boardId = req.params.boardId;
  getResourcesByBoardId(boardId)
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));
});

router.get("/", (req, res) => {
  const resourcesArray = [];
  let resourcesObject;
  getAllBoards()
  .then((boards) => {
    for (board of boards) {
      getResourcesByBoardId(board.id)
      .then((resources) => {
        resourcesArray.push(resources[0])
      }).then((resourcesArray) => {
        resourcesObject.resourcesArray = resourcesArray;
        console.log("resobjmew", resourcesObject)
        res.send(resourcesObject);
      })
    }
  })
    .catch((e) => console.log("error:", e));
});



router.get("/search-owner/:nameString", (req, res) => {
  const nameString = req.params.nameString;
  getBoardByOwnerName(nameString)
    .then((boards) => {
      res.json( boards );
    })
    .catch((e) => console.log("error", e));
});

router.post("/:boardId/resources/add-new-resource", (req, res) => {
  const boardId = req.params.boardId;
  const resourceTitle = req.body.resourceTitle;
  const resourceUrl = req.body.resourceUrl;
  const resourceDescription = req.body.resourceDescription;
  const newResourceFields = { boardId, resourceTitle, resourceUrl, resourceDescription };
  addNewResource(newResourceFields)
    .then((resources) => {
      res.redirect("/");
    })
    .catch((e) => console.log("error:", e));
});

router.post("/:boardId/add-category", (req, res) => {
  const newCategoryString = req.body.newCategoryString;
  const boardId = req.params.boardId;
  const categoryFields = { boardId, newCategoryString };
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
      res.redirect("/");
    });

});

router.delete("/:boardId/delete", (req, res) => {
  const userId = req.session.userId;
  const boardId = req.params.boardId;
  const boardFields = { userId, boardId };
  deleteBoard(boardFields)
    .then(() => {
      res.redirect("/");
    })
    .catch((e) => console.log("error:", e));
});

router.delete("/:boardId/delete-category/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  const boardId = req.params.boardId;
  const categoryFields = { categoryId, boardId };
  deleteBoardCategory(categoryFields)
    .then(() => {
      res.redirect("/");
    })
    .catch((e) => console.log("error:", e));
});

//get rid of /create - here for illustrative purposes
router.put("/:boardid/edit", (req, res) => {
  //edit the board details - name, cats, desc etc.
});


module.exports = router;
