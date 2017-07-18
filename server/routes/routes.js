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

router.get('/index.html', function(req, res){
    res.sendFile(__baseDir + '/client/views/index.html');
});

router.get('/blog.html', function(req, res){
    res.sendFile(__baseDir + '/client/views/blog.html');
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

// Receives a venue as an object and sends to database
router.get('/send_venue', function (req, res) {
    // the params sent by client retrieved by req.query[0]
    //console.log("Got a request:", (req.query[0]|| req.query['venue']));
    // parse the JSON then create object
    var jvenue = JSON.parse((req.query[0]|| JSON.stringify(req.query['venue'])));
    //console.log("this is the jvenue:", jvenue);
    var resp = function() {
        db.createVenue(new Venue.Venue(jvenue.name, jvenue.capacity,
                                    jvenue.location, jvenue.genres));
        res.send('OK');
    }
    
    // send a response to tell client to update the view
    resp();
        
    
        
});

// Gets the list of genres from the database
// This list will be installed on server start up if not already done
router.get('/genres', function (req, res) {
    var send = [];
    db.getAllGenres().then(genres => {
        if (genres) {
            genres.forEach(genre => {
                send.push(genre[0]);
            });
        }
        res.send(send);
    });
})

module.exports = router;