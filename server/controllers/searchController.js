let db = require(__baseDir + '/server/db_api/Database.js');
let VenueModel = require(__baseDir + '/server/db_api/VenueModel.js');

module.exports = {
    searchResults: function (req, res) {
        "use strict";
        let responseArray = [];

        if (req.query['type'] === 'venue') {
            // If the search is for venues matching a specified genre
            if(req.query['genre']){
                VenueModel.getByGenre(req.query['genre']).then(venues => {
                    if (venues) {
                        venues.forEach(venue => {
                            responseArray.push(venue);
                        });
                    }
                    res.send(responseArray);
                });
            }
            // If the search is for venues matching a query string for their name
            else if (req.query['query']){
                // 501: Not implemented
                res.sendStatus(501);
            }
            // If the search is for venues matching a location
            else if (req.query['location']){
                VenueModel.getByLocation(req.query['location']).then(venues => {
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
        else {
            // 501: Not implemented
            res.sendStatus(501);
        }

    }
};