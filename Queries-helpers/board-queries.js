// PG database client/connection setup
//Is this the correct way to connect ^^ can we ust require db like andy did?

const { db } = require('../server.js');

// Define helper functions for retrieving, editing, deleting boards
const getAllBoards = function() {
  return db.query(`
  SELECT name, boards.title, boards.description
  FROM boards
  JOIN users ON users.id = boards.owner_id
  LIMIT 4;`)
    .then((response) => {
      return response.rows;
    });
};


module.exports = {
  //throw in here every function name you want to export
  getAllBoards
};
