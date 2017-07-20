var db = require(__baseDir + '/server/db_api/db_api.js');
var Venue = require(__baseDir + '/server/db_api/venue.js');

module.exports = {
    "index": function (req, res) {
        "use strict";
        let send = [];
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
    },
    "store": function (req, res) {
        // the params sent by client retrieved by req.query[0]
        //console.log("Got a request:", (req.query[0]|| req.query['venue']));
        // parse the JSON then create object
        let jvenue = JSON.parse((req.query[0] || JSON.stringify(req.query['venue'])));
        //console.log("this is the jvenue:", jvenue);
        let resp = function () {
            db.createVenue(new Venue.Venue(jvenue.name, jvenue.capacity,
                jvenue.location, jvenue.genres));
            res.send('OK');
            // TODO: Come up with a global function to send json messages via HTTP like res.send(message.OK)
        };

        // send a response to tell client to update the view
        resp();

    }
};