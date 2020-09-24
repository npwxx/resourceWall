const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
router.use(cookieSession({ name: 'session', keys: ['userId'] }));
/* This route starts at resources/comments */
const {
  getCommentsForResource
} = require('../Queries-helpers/comment-queries.js');

router.get("/:resourceId", (req, res) => {
  console.log("getting cookies", req.params)
  getCommentsForResource(req.params.resourceId)
    .then((comments) => {
      console.log("sending comments: ", comments);
      res.json(comments);
    })
    .catch((e) => console.log("error:", e));
});







module.exports = router;
