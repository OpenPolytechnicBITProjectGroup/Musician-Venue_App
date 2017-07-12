const express = require('express');
const app = express();

var Venue = require('./db_api/venue.js');
var db = require('./db_api/db_api.js');

/*
 * Make sure this line stays above all other routes as they will override it for their specific URL.
 * Otherwise, urls that should be routed using express may be trying to find actual files in ./public
 */
app.use('/', express.static(__dirname + '/public'));

// Gets request from client and activates api call
app.get('/other_venues', function (req, res) {

    console.log("Received request from client");
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

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('We have lift-off!!');
    // these tests will only work if neo4j is running (locally or on heroku)
    // otherwise remove before running
    db.test();
});