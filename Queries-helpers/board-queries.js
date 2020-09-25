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
  return db.query(`
  SELECT
    boards.id,
    boards.title,
    boards.description,
    date(boards.date_posted) as date_posted,
    count(DISTINCT resources.id) AS resources_count,
    avg(resource_ratings.rating) AS avg_rating
  FROM boards
  JOIN resources ON resources.board_id = boards.id
  JOIN resource_ratings ON resource_ratings.resource_id = resources.id
  GROUP BY boards.id
  ORDER BY avg_rating DESC
  LIMIT 6;`)
    .then((response) => {
      return response.rows;
    });
};

const getAllBoardCategories = function() {
  return db.query(`
  SELECT DISTINCT type
  FROM board_categories
  `)
    .then((response) => {
      return response.rows;
    });
};

const getBoardsByCategoryType = function(type) {
  return db.query(`
  SELECT
    boards.date_posted,
    boards.id,
    boards.title,
    boards.description,
    count(DISTINCT resources.id) AS resources_count,
    avg(resource_ratings.rating) AS avg_rating
  FROM boards
  JOIN board_categories ON board_categories.board_id = boards.id
  JOIN resources ON resources.board_id = boards.id
  JOIN resource_ratings on resource_id = resources.id
  WHERE board_categories.type = $1
  GROUP BY boards.id;`, [type])
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


const deleteBoard = function(boardFields) {
  const fields = boardFields;
  return db.query(`
  DELETE FROM boards
  WHERE user_id = $1 AND board_id = $2;
  `, [fields.user_id, fields.boardId])
    .then((response) => {
      return response.rows;
    });
};

const addNewBoard = function(newBoardFields) {
  const fields = newBoardFields;
  return db.query(`
  INSERT INTO boards (
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
      `, [fields.ownerId, fields.boardTitle, fields.boardDescription])
    .then((response) => {
      return response.rows;
    });
};

const addBoardCategory = function(categoryFields) {
  const fields = categoryFields;
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
  const fields = categoryFields;
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
  getAllBoardCategories,
  getBoardsByCategoryType,
  getBoardByOwnerName,
  getBoardById,
  getBoardByTitle,
  getBoardByCategories,
  editBoardTitle,
  editBoardDescription,
  deleteBoard,
  addNewBoard,
  addBoardCategory,
  deleteBoardCategory
};
