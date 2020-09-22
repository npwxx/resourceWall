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
  SELECT
    boards.id,
    boards.title,
    boards.description
  FROM boards
  JOIN users ON users.id = boards.owner_id
  LIMIT 4;`)
    .then((response) => {
      return response.rows;
    });
};

const getBoardByOwnerName = function(nameString) {
  return db.query(
    `SELECT
    boards.id,
    boards.title as title,
    boards.description as description,
    boards.date_posted as created
    FROM boards
    WHERE boards.title LIKE $1;
  `, [nameString])
    .then((response) => {
      return response.rows;
    });
};

const getBoardByOwnerId = function(ownerId) {
  return db.query(`
    SELECT
      boards.owner_id as owner_id,
      boards.title as title,
      boards.description as description,
      boards.date_posted as created
    FROM boards
    WHERE boards.owner_id = $1
  `, [ownerId])
    .then((response) => {
      return response.rows;
    });
};

const getBoardById = function(boardId) {
  return db.query(`
    SELECT
      boards.id,
      boards.owner_id as owner_id,
      boards.title as title,
      boards.description as description,
      boards.date_posted as created
    FROM boards
    WHERE boards.id = $1
  `, [boardId])
    .then((response) => {
      return response.rows;
    });
};

const getBoardByCategories = function(title) {
  return db.query(`

  `, [title])
    .then((response) => {
      return response.rows;
    });
};

const getBoardByTitle = function(titleString) {
  return db.query(`
  SELECT
    boards.owner_id as owner_id,
    boards.title as title,
    boards.description as description,
    boards.date_posted as created
  FROM boards
  WHERE boards.title = $1
  `, [titleString])
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



const editBoardTitle = function(newTitleString, boardId) {
  return db.query(`
  UPDATE boards
  SET title = $1
  WHERE id = $2;
  `, [newTitleString, boardId])
    .then((response) => {
      return response.rows;
    });
};

const editBoardDescription = function(newText, boardId) {
  console.log(newText, boardId);
  return db.query(`
  UPDATE boards
  SET description = $1
  WHERE id = $2;
  `, [newText, boardId])
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

const deleteBoard = function(boardFields) {
  const fields = boardFields
  return db.query(`
  DELETE FROM boards
  WHERE user_id = $1 AND board_id = $2;
  `, [fields.user_id, fields.boardId])
    .then((response) => {
      return response.rows;
    });
};

const addNewBoard = function(newBoardFields) {
  const fields = newBoardFields
  return db.query(`
  INSERT INTO resources (
    owner_id,
    title,
    description,
    date_posted
    )
  VALUES(
    $1,
    $2,
    $3,
    now()
  );
`, [fields.ownerID, fields.boardTitle, fields.boardDescription])
    .then((response) => {
      return response.rows;
    });
};

const addBoardCategory = function(categoryFields) {
  const fields = categoryFields
  return db.query(`
  INSERT INTO board_categories (
    type,
    board_id
    )
  VALUES(
    $1,
    $2,
  );
`, [fields.newCategoryString, fields.boardId])
    .then((response) => {
      return response.rows;
    });
};

const deleteBoardCategory = function(categoryFields) {
  const fields = categoryFields
  return db.query(`
  DELETE FROM board_categories WHERE id = $1 AND board_id = $2;
`, [fields.categoryId, fields.boardId])
    .then((response) => {
      return response.rows;
    });
};



module.exports = {
  //throw in here every function name you want to export
  getAllBoards,
  getBoardByOwnerName,
  getBoardByOwnerId,
  getBoardById,
  editBoardTitle,
  editBoardDescription,
  deleteBoard,
  addNewBoard,
  addBoardCategory,
  deleteBoardCategory
};
