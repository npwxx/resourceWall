const { db } = require('../server.js');
/*
### User Queries ###

--get account details by email
--get account details by user name
--get account details by user id

--change email
--change name
--change user name
--change password


*/
const getUserByEmail = function(emailString) {
  return db.query(`
  SELECT *
  FROM users
  WHERE email = $1;`, [emailString])
    .then(res => {
      if (!res.rows.length) {
        return null;
      } else {
        return res.rows[0];
      }
    })
    .catch(e => {
      console.error(e);
    });
};

const getPasswordById = function(userId) {
  return db.query(`
  SELECT password
  FROM users
  WHERE id = $1;`, [userId])
    .then(res => {
      if (!res.rows.length) {
        return null;
      } else {
        return res.rows[0];
      }
    })
    .catch(e => {
      console.error(e);
    });
};

const getUserById = function(userId) {
  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1`;
  return db.query(queryString, [userId])
    .then(res => {
      if (!res.rows.length) {
        return null;
      } else {
        return res.rows[0];
      }
    })
    .catch(e => {
      console.error(e);
    });
};

const getUserByName = function(nameString) {
  return db.query(`
  SELECT *
  FROM users
  WHERE name = $1;`, [nameString])
    .then((response) => {
      return response.rows;
    });
};

const editUserName = function(userFields) {
  const fields = userFields;
  return db.query(`
  UPDATE users
  SET name = $1
  WHERE id = $2;
`, [fields.newNameString, fields.userId])
    .then((response) => {
      return response.rows;
    });
};

const editUserEmail = function(userFields) {
  const fields = userFields;
  return db.query(`
  UPDATE users
  SET email = $1
  WHERE id = $2;
`, [fields.newEmailString, fields.userId])
    .then((response) => {
      return response.rows;
    });
};

const addNewUser = function(userFields) {
  const fields = userFields;
  return db.query(`
  INSERT INTO users (
    name,
    email,
    password
    )
  VALUES(
    $1,
    $2,
    $3
  ) RETURNING id;
`, [fields.name, fields.email, fields.password])
    .then((response) => {
      return response.rows[0];
    });
};

const deleteUser = function(userId) {
  return db.query(`
  DELETE FROM users
  WHERE user_id = $1;
  `, [userId])
    .then(() => {
      return;
    });
};


const getBoardByOwnerId = function(ownerId) {
  return db.query(`
  SELECT
    boards.id as id,
    boards.title as title,
    boards.description as description,
    date(boards.date_posted) as created,
    board_categories.type as categories
  FROM boards
  JOIN resources ON resources.board_id = boards.id
  FULL OUTER JOIN board_categories ON board_categories.board_id = boards.id
  WHERE boards.owner_id = $1
  GROUP BY boards.id, owner_id, boards.date_posted, boards.title, boards.description, categories
  `, [ownerId])
    .then((response) => {
      return response.rows;
    });
};

const getLikedBoardsByOwnerId = function(ownerId) {
  return db.query(`
  SELECT
  resources.title,
  resources.description,
  resources.resource_url,
  boards.title as parent_board,
  round(avg(resource_ratings.rating), 2) as average_rating,
  resources.id
FROM resource_likes
JOIN resources ON resources.id = resource_likes.resource_id
FULL OUTER JOIN resource_ratings ON resource_ratings.resource_id = resource_likes.resource_id
JOIN boards ON boards.id = resources.board_id
WHERE user_id = $1
GROUP BY resources.title, resources.description, resources.resource_url, boards.title, resources.id;
  `, [ownerId])
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getUserByEmail,
  getUserById,
  getUserByName,
  editUserName,
  editUserEmail,
  addNewUser,
  deleteUser,
  getPasswordById,
  getBoardByOwnerId,
  getLikedBoardsByOwnerId
};
