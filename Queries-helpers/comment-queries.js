const { db } = require('../server.js');


const getCommentsForResource = function(resourceId) {
  console.log("querying with", resourceId)
  return db.query(`
    SELECT
      comments.id as comment_id,
      author_id,
      users.name as author,
      resource_id,
      text as comment,
      date_posted
    FROM comments
    JOIN users on users.id = author_id
    WHERE resource_id = $1;
  `, [resourceId])
    .then((response) => {
      return response.rows;
    });
}





module.exports = {
  getCommentsForResource
};
