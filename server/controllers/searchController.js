let db = require(__baseDir + '/server/db_api/db_api.js');
let Venue = require(__baseDir + '/server/db_api/venue.js');

module.exports = {
    "index": function (req, res) {
        "use strict";
        let send = [];
        
        db.searchVenueByGenre(req.query[0]).then(venues => {
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
    }
}