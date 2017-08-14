const express = require('express');
require('dotenv').config();
const db = require('./server/db_api/Database.js');
// Use this global var to avoid long relative paths :)
global.__baseDir = __dirname;

// initialise the database

db.migrate();
