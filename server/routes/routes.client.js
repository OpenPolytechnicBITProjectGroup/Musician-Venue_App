/**
 * This file currently contains all the routes for the public files such as css, html, images and js.
 * @type {router}
 */
const express = require('express');
const router = express.Router();
const path = require('path');

/*
 * Static paths
 *
 * Any files within these directories will be made available to the corresponding URI.
 * Ensure any files routed this way have NO sensitive information such as passwords as they will be available
 * to the public
 */
router.use('/css', express.static(__baseDir + '/client/css'));
router.use('/js', express.static(__baseDir + '/client/js'));

// Route the root url to the index.html file.
router.get('/', function (req, res) {
    res.sendFile(__baseDir + '/client/views/index.html');
});


// Temporary fixed routes to HTML files. We'll probably be using Angular routing instead.
router.get('/venues', function (req, res) {
    res.sendFile(__baseDir + '/client/views/venues.html');
});
router.get('/artists', function (req, res) {
    res.sendFile(__baseDir + '/client/views/artists.html');
});
router.get('/members', function (req, res) {
    res.sendFile(__baseDir + '/client/views/members.html');
});


module.exports = router;