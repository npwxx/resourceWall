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
      return null
    } else {
      return res.rows[0];
    }
  })
  .catch(e => {
    console.error(e)
  });
};

const getUserById = function(userId) {
  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1`
  return pool.query(queryString, [id])
  .then(res => {
    if (!res.rows.length) {
      return null
    } else {
      return res.rows[0];
    }
  })
  .catch(e => {
    console.error(e)
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
}
