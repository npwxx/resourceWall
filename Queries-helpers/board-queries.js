// PG database client/connection setup
//Is this the correct way to connect ^^ can we ust require db like andy did?

const { db } = require('../server.js');

/* ### QUERY IDEAS ###

## BROWSE/READ OPERATIONS
-- Get all boards [X]
-- Get board by owner name
-- Get board by owner id
-- Get board by board id
-- Get board by categories
-- Get board by title
-- Get all boards (order by highest/lowest rated)
-- Get all boards (order by most commented)
-- Get all boards (order by date posted)

## ADD OPERATIONS
-- Insert new board into db

## EDIT OPERATIONS
-- Change board title
-- Change board description
-- (best handled in resources queries) Add resource to board (can also be done via from a resource that already exists in other board, in this case clone it then insert as normal)
-- Add category to board

## DELETE OPERATIONS
-- delete a board and all its contents

*** NOTE: Inserting a resource into my board from somebody else's board will require generating a new instance of the resource.
          This is probably not a very efficient use of space in the db but we want to give owners full autonomy and ownership of every resource in every board they own.
*/
// Define helper functions for retrieving, editing, deleting boards
const getAllBoards = function() {

  //We should also handle the ORDER BY filters in this function call
  return db.query(`
  SELECT name, boards.title, boards.description
  FROM boards
  JOIN users ON users.id = boards.owner_id
  LIMIT 4;`)
    .then((response) => {
      return response.rows;
    });
};

const getBoardByOwnerName = function() {
  return db.query(`
  `)
    .then((response) => {
      return response.rows;
    });
};

const getBoardByOwnerId = function() {
  return db.query(`
  `)
    .then((response) => {
      return response.rows;
    });
};

const getBoardById = function() {
  return db.query(`
  `)
    .then((response) => {
      return response.rows;
    });
};

const getBoardByCategories = function() {
  return db.query(`
  `)
    .then((response) => {
      return response.rows;
    });
};

const getBoardByTitle = function() {
  return db.query(`
  `)
    .then((response) => {
      return response.rows;
    });
};

const addNewBoard = function() {
  return db.query(`
  `)
    .then((response) => {
      return response.rows;
    });
};



const editBoardTitle = function() {
  return db.query(`
  `)
    .then((response) => {
      return response.rows;
    });
};

const editBoardCategories = function() {
  return db.query(`
  `)
    .then((response) => {
      return response.rows;
    });
};

const editBoardDescription = function() {
  return db.query(`
  `)
    .then((response) => {
      return response.rows;
    });
};

const deleteBoard = function() {
  return db.query(`
  `)
    .then((response) => {
      return response.rows;
    });


};



module.exports = {
  //throw in here every function name you want to export
  getAllBoards
};
