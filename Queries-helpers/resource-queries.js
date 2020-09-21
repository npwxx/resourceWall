const { db } = require('../server.js');

const getResourcesByBoardId = function(boardId) {
  return db.query(`
  SELECT title, desription, resource_url
  FROM resources
  WHERE board_id = $1;`, [boardId])
    .then((response) => {
    return response.rows;
  });
}

module.exports =  {

}
