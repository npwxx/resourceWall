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

const getResourcesByHighestRated = function () {
  return db.query(`
  SELECT
    title,
    left(description, 35) as description,
    left(resource_url, 20) as link,
    round(avg(resource_ratings.rating), 2) as average_rating
  FROM resources
  JOIN resource_ratings ON resources.id = resource_ratings.resource_id
  GROUP BY resources.title, resources.description, resources.resource_url
  ORDER BY average_rating DESC;
`)
    .then((response) => {
    return response.rows;
  });
}
module.exports =  {
  getResourcesByBoardId,
  getResourcesByHighestRated
}
