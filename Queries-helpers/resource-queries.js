const { db } = require('../server.js');

const getResourcesByBoardId = function(boardId) {
  return db.query(`
  SELECT title, description, resource_url
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

const getResourcesByLowestRated = function () {
  return db.query(`
  SELECT
    title,
    left(description, 35) as description,
    left(resource_url, 20) as link,
    round(avg(resource_ratings.rating), 2) as average_rating
  FROM resources
  JOIN resource_ratings ON resources.id = resource_ratings.resource_id
  GROUP BY resources.title, resources.description, resources.resource_url
  ORDER BY average_rating ASC;
`)
    .then((response) => {
    return response.rows;
  });
}

const getResourcesByMostCommented = function () {
  return db.query(`
  SELECT
    resources.title,
    resources.description,
    resource_url,
    users.name as author,
    count(comments)
  FROM resources
  JOIN comments ON comments.resource_id = resources.id
  JOIN users on users.id = comments.author_id
  GROUP BY resources.title, resources.description, resource_url, author
  ORDER BY count(comments) DESC;
`)
    .then((response) => {
    return response.rows;
  });
}

const getResourcesByLeastCommented = function () {
  return db.query(`
  SELECT
    resources.title,
    resources.description,
    resource_url,
    users.name as author,
    count(comments)
  FROM resources
  JOIN comments ON comments.resource_id = resources.id
  JOIN users on users.id = comments.author_id
  GROUP BY resources.title, resources.description, resource_url, author
  ORDER BY count(comments) ASC;
`)
    .then((response) => {
    return response.rows;
  });
}

const getResourcesByNewest = function () {
  return db.query(`
  SELECT
    resources.title,
    resources.description,
    resource_url,
    users.name as author,
    resources.date_posted
  FROM resources
  JOIN comments ON comments.resource_id = resources.id
  JOIN users on users.id = comments.author_id
  GROUP BY resources.date_posted, resources.title, resources.description, resource_url, author
  ORDER BY date_posted DESC;
`)
    .then((response) => {
    return response.rows;
  });
}

const getResourcesByOldest = function () {
  return db.query(`
  SELECT
    resources.title,
    resources.description,
    resource_url,
    users.name as author,
    resources.date_posted
  FROM resources
  JOIN comments ON comments.resource_id = resources.id
  JOIN users on users.id = comments.author_id
  GROUP BY resources.date_posted, resources.title, resources.description, resource_url, author
  ORDER BY date_posted DESC;
`)
    .then((response) => {
    return response.rows;
  });
}
module.exports =  {
  getResourcesByBoardId,
  getResourcesByHighestRated,
  getResourcesByLowestRated,
  getResourcesByMostCommented,
  getResourcesByLeastCommented,
  getResourcesByNewest,
  getResourcesByOldest
}
