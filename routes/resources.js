/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {



  router.put("/:resourceid/create", (req, res) => {
    //create a resource within a board
    //user must own the board
  });

  router.post("/:resourceid/edit", (req, res) => {
    //edit a resource within a board
    //user must own the board
  });

  router.delete("/:resourceid/delete", (req, res) => {
    //delete a resource from a board
    //user must own the board
  });

  router.post("/:resourceid/comment", (req, res) => {
    //comment on a resource

  });

  router.post("/:resourceid/rate", (req, res) => {
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
