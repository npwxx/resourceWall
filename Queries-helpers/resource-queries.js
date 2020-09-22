const { db } = require('../server.js');

const getResourcesByBoardId = function(boardId) {
  return db.query(`
  SELECT id, title, description, resource_url
  FROM resources
  WHERE board_id = $1;`, [boardId])
  .then((response) => {
    console.log("res", response);
    return response.rows;
  });
}

const getResourcesById = function(resourceId) {
  return db.query(`
  SELECT id, title, description, resource_url
  FROM resources
  WHERE id = $1;`, [resourceId])
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

const editResourceTitle = function(newTitleString, resourceId) {
return db.query(`
  UPDATE resources
  SET title = $1
  WHERE id = $2;
`, [newTitleString, resourceId])
    .then((response) => {
      console.log(response);
    return response.rows;
  });
}

const editResourceUrl = function(newUrlString, resourceId) {
return db.query(`
  UPDATE resources
  SET resource_url = $1
  WHERE id = $2;
`, [newUrlString, resourceId])
    .then((response) => {
    return response.rows;
  });
}

const editResourceDescription = function(newText, resourceId) {
return db.query(`
  UPDATE resources
  SET description = $1
  WHERE id = $2;
`, [newText, resourceId])
    .then((response) => {
    return response.rows;
  });
}

const addNewResource = function(newResourceFields) {
  const fields = newResourceFields;
  return db.query(`
  INSERT INTO resources (
    board_id,
    title,
    resource_url,
    description,
    date_posted
    )
  VALUES(
    $1,
    $2,
    $3,
    $4,
    now()
  );
`,[fields.boardId, fields.resourceTitle, fields.resourceUrl, fields.resourceDescription])
    .then((response) => {
    return response.rows;
  });
}

const addNewComment = function(newCommentFields) {
  const fields = newCommentFields;
  console.log(fields);
  return db.query(`
  INSERT INTO comments (
    author_id,
    resource_id,
    text,
    date_posted
    )
  VALUES(
    $1,
    $2,
    $3,
    now()
  );
`,[fields.authorId, fields.resourceId, fields.commentText])
    .then((response) => {
    return response.rows;
  });
}

const addNewRating= function(newRatingFields) {
  const fields = newRatingFields;
  return db.query(`
  INSERT INTO resource_ratings (
  rater_id,
  resource_id,
  rating
    )
  VALUES(
    $1,
    $2,
    $3,
  );
`,[fields.raterId, fields.resourceId, fields.rating])
    .then((response) => {
    return response.rows;
  });
}

const addNewLike = function(likeFields) {
  const fields = likeFields;
  return db.query(`
  INSERT INTO resource_likes (
  user_id,
  resource_id,
    )
  VALUES(
    $1,
    $2,
  );
`,[fields.userId, fields.resourceId])
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
  getResourcesByOldest,
  editResourceTitle,
  getResourcesById,
  editResourceUrl,
  editResourceDescription,
  addNewResource,
  addNewComment,
  addNewRating,
  addNewLike
}
