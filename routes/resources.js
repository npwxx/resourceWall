/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/create", (req, res) => {
    //create a resource within a board
    //user must own the board
    //in here need to do multipe db queries - an insert to create the item,  and an edit to add the resouroce to a board.
  });

  router.post("/edit", (req, res) => {
    //edit a resource within a board
    //user must own the board
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

  return router;
};


