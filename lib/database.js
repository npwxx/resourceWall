const db = require('../server.js');
const { Pool } = require('pg');


const pool = db.pool;
const getAllBoards = function () {

}


const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const pool = new Pool({user: 'vagrant', password: '123', host: 'localhost', database: 'lightbnb'});

/**
