let db = require(__baseDir + '/server/db_api/Database.js');
let VenueModel = require(__baseDir + '/server/db_api/VenueModel.js');

module.exports = {
    searchResults: function (req, res) {
        "use strict";
        let responseArray = [];

        if (req.query['type'] === 'venue') {
            VenueModel.getByGenre(req.query['genre']).then(venues => {
                if (venues) {
                    venues.forEach(venue => {
                        responseArray.push(venue);
                    });
                }
                res.send(responseArray);
            });
        }
        else {
            // 501: Not implemented
            res.sendStatus(501);
        }

    }
};