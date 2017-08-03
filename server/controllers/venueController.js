let VenueModel = require(__baseDir + '/server/db_api/VenueModel.js');

module.exports = {
    index: function (req, res) {
        "use strict";
        let responseArray = [];
        VenueModel.getAll().then(venues => {
            if (venues) {
                venues.forEach(venue => {
                    responseArray.push(venue);
                });
            }
            res.send(responseArray);
        });
    },
    store: function (req, res) {
        //TODO: Validate data before submitting into DB!
        // Validate client side first
        v = req.body[0];
        let venue = new VenueModel.Venue(v.name, v.capacity, v.location, v.genres);
        console.log(venue);

        VenueModel.create(venue).then(function () {
            res.sendStatus(201);
        });

        // TODO: Come up with a global function to send json messages via HTTP like res.send(message.OK)

        // send a response to tell client to update the view

    }
};