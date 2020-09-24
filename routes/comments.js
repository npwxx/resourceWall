const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
router.use(cookieSession({ name: 'session', keys: ['userId'] }));


const {

} = require('../Queries-helpers/comment-queries.js');







module.exports = router;
