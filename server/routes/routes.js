/**
 * This file currently contains all the routes for the app.
 * It may eventually be split up into modules.
 * @type {router}
 */
const express = require('express');
const router = express.Router();
const path = require('path');

var db = require(__baseDir + '/server/db_api/db_api.js');
var Venue = require(__baseDir + '/server/db_api/venue.js');

// Static paths for css and js
router.use('/css', express.static(__baseDir + '/client/css'));

router.use('/js', express.static(__baseDir + '/client/js'));

router.get('/', function(req, res){
    res.sendFile(__baseDir + '/client/views/index.html');
});

// Gets request from client and activates api call
router.get('/other_venues', function (req, res) {
    var send = [];
    db.getAllVenues().then(venues => {
        if (venues) {
            venues.forEach(venue => {
                send.push(new Venue.Venue(
                    venue.name, venue.capacity,
                    venue.location, venue.genres
                ));

            });
        }
        res.send(send)
    });
});

module.exports = router;