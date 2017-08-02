/**
 * This file currently contains all the routes for server/API.
 * It may eventually be split up into modules.
 * @type {router}
 */
const express = require('express');
const router = express.Router();
const path = require('path');

let venueController = require(__baseDir + "/server/controllers/venueController.js");
let genreController = require(__baseDir + "/server/controllers/genreController.js");
let searchController = require(__baseDir + "/server/controllers/searchController.js");

router.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

router.get('/venues', venueController.index);
router.post('/venues', venueController.store);


// Gets the list of genres from the database
// This list will be installed on server start up if not already done
router.get('/genres', genreController.index);

// searched for genres
router.get('/search', searchController.searchResults);

module.exports = router;