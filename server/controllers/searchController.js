let db = require(__baseDir + '/server/db_api/db_api.js');
let Venue = require(__baseDir + '/server/db_api/venue.js');

module.exports = {
    searchResults: function (req, res) {
        "use strict";
        let send = [];
        
        if (req.query['type'] === 'venue') {
            db.searchVenueByGenre(req.query['genre']).then(venues => {
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
        else {
            // 501: Not implemented
            res.sendStatus(501);
        }
        
    }
}