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
}

const getUserByName = function(emailString) {
  return db.query(`
  SELECT *
  FROM users
  WHERE board_id = $1;`, [emailString])
    .then((response) => {
    return response.rows;
  });
}
