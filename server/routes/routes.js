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
    res.sendFile(__baseDir + '/client/views/test.html');
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

router.get('/send_venue', function (req, res) {
    // the params sent by client retrieved by req.query[0]
    //console.log("Got a request:", (req.query[0]|| req.query['venue']));
    // parse the JSON then create object
    var jvenue = JSON.parse((req.query[0]|| JSON.stringify(req.query['venue'])));
    //console.log("this is the jvenue:", jvenue);
    db.createVenue(new Venue.Venue(jvenue.name, jvenue.capacity,
                                    jvenue.location, jvenue.genres));
    // send a response to tell client to update the view
    res.send('OK');
})

module.exports = router;