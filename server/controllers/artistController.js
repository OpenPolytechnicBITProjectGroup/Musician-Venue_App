let ArtistModel = require(__baseDir + '/server/db_api/ArtistModel.js');

module.exports = {
    index: function (req, res) {
        "use strict";
        let responseArray = [];
        ArtistModel.getAll().then(artists => {
            if (artists) {
                artists.forEach(artist => {
                    console.log(artist);
                    responseArray.push(artist);
                });
            }
            res.send(responseArray);
        });
    },
    store: function (req, res) {
        //TODO: Validate data before submitting into DB!
        data = req.body[0];
        let artist = new ArtistModel.Artist(data.name, data.location, data.bio, data.genres, data.rating);
        console.log(artist);

        ArtistModel.create(artist).then(function () {
            res.sendStatus(201);
        });
    }
};

/**

 I've set up artists to handle the following data.
 I have ignored starred items for now as they will require more work.

 Unique ID
 Band name
 *Band members/instruments
 Home town
 Genres
 Bio
 *Song list
 *Reviews
 *Has own PA/sound engineer
 *Will play for (Amount in $. May be different amounts for time played/event type/travel costs)
 *Pictures/audio files/videos
 *Links to other social media sites/website
 Rating (1 to 5 stars)
**/