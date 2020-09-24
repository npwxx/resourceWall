const { db } = require('../server.js');

const getAllResourceCategories = function(categories) {
  return db.query(`
  SELECT DISTINCT type
  FROM resource_categories
  `)
    .then((response) => {
      return response.rows;
    });
};

const getResourcesByCategoryType = function(type) {
  return db.query(`
  SELECT resources.id, title, description, resource_url, avg(resource_ratings.rating) AS avg_rating
  FROM resources
  LEFT JOIN resource_ratings ON resource_ratings.resource_id = resources.id
  JOIN resource_categories ON resource_categories.resource_id = resources.id
  WHERE resource_categories.type = $1
  GROUP BY resources.id`, [type])
    .then((response) => {
      return response.rows;
    });
};

const getResourcesByBoardId = function(boardId) {
  return db.query(`
  SELECT resources.id, title, description, resource_url, avg(resource_ratings.rating) AS avg_rating
  FROM resources
  LEFT JOIN resource_ratings ON resource_ratings.resource_id = resources.id
  WHERE board_id = $1
  GROUP BY resources.id`, [boardId])
    .then((response) => {
      return response.rows;
    });
};

const getResourcesById = function(resourceId) {
  return db.query(`
  SELECT id, title, description, resource_url
  FROM resources
  WHERE id = $1;`, [resourceId])
    .then((response) => {
      return response.rows;
    });
};

const getResourcesByHighestRated = function() {
  return db.query(`
  SELECT
    title,
    left(description, 35) as description,
    left(resource_url, 20) as link,
    round(avg(resource_ratings.rating), 2) as avg_rating
  FROM resources
  JOIN resource_ratings ON resources.id = resource_ratings.resource_id
  GROUP BY resources.title, resources.description, resources.resource_url
  ORDER BY avg_rating DESC
  LIMIT 6;
`)
    .then((response) => {
      return response.rows;
    });
};

const getResourcesByLowestRated = function() {
  return db.query(`
  SELECT
    title,
    left(description, 35) as description,
    left(resource_url, 20) as link,
    round(avg(resource_ratings.rating), 2) as avg_rating
  FROM resources
  JOIN resource_ratings ON resources.id = resource_ratings.resource_id
  GROUP BY resources.title, resources.description, resources.resource_url
  ORDER BY avg_rating ASC;
`)
    .then((response) => {
      return response.rows;
    });
};

const getResourcesByMostLiked = function() {
  return db.query(`
  SELECT 
    resources.title,
    resources.description,
    resource_url,
    count(*) AS likes_count,
    avg(resource_ratings.rating) AS avg_rating
  FROM resources
  JOIN resource_likes ON resource_likes.resource_id = resources.id
  LEFT JOIN resource_ratings ON resources.id = resource_ratings.resource_id
  GROUP BY resources.id
  ORDER BY likes_count DESC
  LIMIT 6;
`)
    .then((response) => {
      return response.rows;
    });
};

const getResourcesByLeastLiked = function() {
  return db.query(`
  SELECT 
    resources.title,
    resources.description,
    resource_url,
    count(*) AS likes_count,
    avg(resource_ratings.rating) AS avg_rating
  FROM resources
  JOIN resource_likes ON resource_likes.resource_id = resources.id
  LEFT JOIN resource_ratings ON resources.id = resource_ratings.resource_id
  GROUP BY resources.id
  ORDER BY likes_count
  LIMIT 6;
`)
    .then((response) => {
      return response.rows;
    });
};

const getResourcesByMostCommented = function() {
  return db.query(`
  SELECT
    resources.title,
    resources.description,
    resource_url,
    users.name as author,
    count(comments),
    avg(resource_ratings.rating) AS avg_rating
  FROM resources
  JOIN comments ON comments.resource_id = resources.id
  JOIN users on users.id = comments.author_id
  LEFT JOIN resource_ratings ON resources.id = resource_ratings.resource_id
  GROUP BY resources.title, resources.description, resource_url, author
  ORDER BY count(comments) DESC
  LIMIT 6;
`)
    .then((response) => {
      return response.rows;
    });
};

const getResourcesByLeastCommented = function() {
  return db.query(`
  SELECT
    resources.title,
    resources.description,
    resource_url,
    users.name as author,
    count(comments),
    avg(resource_ratings.rating) AS avg_rating
  FROM resources
  JOIN comments ON comments.resource_id = resources.id
  JOIN users on users.id = comments.author_id
  LEFT JOIN resource_ratings ON resources.id = resource_ratings.resource_id
  GROUP BY resources.title, resources.description, resource_url, author
  ORDER BY count(comments) ASC;
`)
    .then((response) => {
      return response.rows;
    });
};

const getResourcesByNewest = function() {
  return db.query(`
  SELECT
    resources.title,
    resources.description,
    resource_url,
    users.name as author,
    resources.date_posted,
    avg(resource_ratings.rating) AS avg_rating
  FROM resources
  JOIN comments ON comments.resource_id = resources.id
  JOIN users on users.id = comments.author_id
  LEFT JOIN resource_ratings ON resources.id = resource_ratings.resource_id
  GROUP BY resources.date_posted, resources.title, resources.description, resource_url, author
  ORDER BY date_posted DESC
  LIMIT 6;
`)
    .then((response) => {
      return response.rows;
    });
};

const getResourcesByOldest = function() {
  return db.query(`
  SELECT
    resources.title,
    resources.description,
    resource_url,
    users.name as author,
    resources.date_posted,
    avg(resource_ratings.rating) AS avg_rating
  FROM resources
  JOIN comments ON comments.resource_id = resources.id
  JOIN users on users.id = comments.author_id
  LEFT JOIN resource_ratings ON resources.id = resource_ratings.resource_id
  GROUP BY resources.date_posted, resources.title, resources.description, resource_url, author
  ORDER BY date_posted DESC;
`)
    .then((response) => {
      return response.rows;
    });
};

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
};

const editResourceUrl = function(newUrlString, resourceId) {
  return db.query(`
  UPDATE resources
  SET resource_url = $1
  WHERE id = $2;
`, [newUrlString, resourceId])
    .then((response) => {
      return response.rows;
    });
};

const editResourceDescription = function(newText, resourceId) {
  return db.query(`
  UPDATE resources
  SET description = $1
  WHERE id = $2;
`, [newText, resourceId])
    .then((response) => {
      return response.rows;
    });
};

const addNewCategory = function(categoryFields) {
  const fields = categoryFields;
  return db.query(`
  INSERT INTO resource_categories (
    type,
    resource_id
    )
  VALUES(
    $1,
    $2,
  );
`, [fields.newCategoryString, fields.resourceId])
    .then((response) => {
      return response.rows;
    });
};

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
`, [fields.boardId, fields.resourceTitle, fields.resourceUrl, fields.resourceDescription])
    .then((response) => {
      return response.rows;
    });
};

const addNewComment = function(newCommentFields) {
  const fields = newCommentFields;
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
`, [fields.authorId, fields.resourceId, fields.commentText])
    .then((response) => {
      return response.rows;
    });
};

const deleteComment = function(commentFields) {
  const fields = commentFields;
  return db.query(`
  DELETE FROM comments
  WHERE author_id = $1 AND resource_id = $2 AND comments.id = $3;
`, [fields.authorId, fields.resourceId, fields.commentId])
    .then((response) => {
      return response.rows;
    });
};

const addNewRating = function(newRatingFields) {
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
`, [fields.raterId, fields.resourceId, fields.rating])
    .then((response) => {
      return response.rows;
    });
};

const deleteRating = function(ratingFields) {
  const fields = ratingFields;
  return db.query(`
  DELETE FROM ratings
  WHERE rater_id = $1 AND resourceId = $2;
`, [fields.raterId, fields.resourceId])
    .then((response) => {
      return response.rows;
    });
};

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
`, [fields.userId, fields.resourceId])
    .then((response) => {
      return response.rows;
    });
};

const deleteLike = function(likeFields) {
  const fields = likeFields;
  return db.query(`
  DELETE
  FROM resource_likes
  WHERE user_id = $1 AND resource_id = $2;
`, [fields.userId, fields.resourceId])
    .then((response) => {
      return response.rows;
    });
};

const deleteResource = function(resourceFields) {
  const fields = resourceFields;
  return db.query(`
  DELETE
  FROM resources
  WHERE user_id = $1 AND resource_id = $2;
`, [fields.userId, fields.resourceId])
    .then((response) => {
      return response.rows;
    });
};


const deleteCategory = function(categoryFields) {
  const fields = categoryFields;
  return db.query(`
  DELETE FROM resource_categories WHERE id = $1 AND resource_id = $2;
`, [fields.categoryId, fields.resourceId])
    .then((response) => {
      return response.rows;
    });
};


module.exports = {
  getAllResourceCategories,
  getResourcesByCategoryType,
  getResourcesByBoardId,
  getResourcesByHighestRated,
  getResourcesByLowestRated,
  getResourcesByMostLiked,
  getResourcesByLeastLiked,
  getResourcesByMostCommented,
  getResourcesByLeastCommented,
  getResourcesByNewest,
  getResourcesByOldest,
  editResourceTitle,
  getResourcesById,
  editResourceUrl,
  editResourceDescription,
  addNewCategory,
  addNewResource,
  addNewComment,
  addNewRating,
  addNewLike,
  deleteLike,
  deleteRating,
  deleteComment,
  deleteResource,
  deleteCategory
};
