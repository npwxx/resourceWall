const express = require('express');
const router  = express.Router();
const {
  getResourcesByBoardId,
  getResourcesByHighestRated,
  getResourcesByLowestRated,
  getResourcesByMostCommented,
  getResourcesByLeastCommented,
  getResourcesByNewest,
  getResourcesByOldest
} = require('../Queries-helpers/resource-queries.js');

router.get("/", (req, res) => {
  getResourcesByBoardId(boardId)
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));

});

router.get("/ratings-descending", (req, res) => {
  getResourcesByHighestRated()
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));

});

router.get("/ratings-ascending", (req, res) => {
  getResourcesByLowestRated()
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));

});

router.get("/most-commented", (req, res) => {
  getResourcesByMostCommented()
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));

});

router.get("/least-commented", (req, res) => {
  getResourcesByLeastCommented()
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));

});

router.get("/sort-newest", (req, res) => {
  getResourcesByNewest()
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));

});

router.get("/sort-oldest", (req, res) => {
  getResourcesByOldest()
    .then((resources) => {
      res.json(resources);
    })
    .catch((e) => console.log("error:", e));

});

router.get("/create", (req, res) => {
  //create a resource within a board
  //user must own the board
  //in here need to do multipe db queries - an insert to create the item,  and an edit to add the resouroce to a board.

});

router.patch("/edit-title", (req, res) => {
  const newTitleString = req.body.newTitle
  replaceBoardTitle(newTitleString)
    .then(() => {
      res.redirect("/");
    })
    .catch((e) => console.log("error:", e));
});

router.delete("/delete", (req, res) => {
  //delete a resource from a board
  //user must own the board
});

router.post("/comment", (req, res) => {
  //comment on a resource

});

router.put("/rate", (req, res) => {
  //rate a resource
  //user must NOT own the board
  //user may have rated this resource before but recent rating is the one that persists.

});

router.post("/:resourceid/like", (req, res) => {
  //user can like a resource
  //user may or may not own the resource

});

module.exports = router;


