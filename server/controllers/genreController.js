let GenreModel = require(__baseDir + '/server/db_api/GenreModel.js');

module.exports = {
    index: function (req, res) {
        "use strict";
        let responseArray = [];
        GenreModel.getAll().then(genres => {
            if (genres) {
                genres.forEach(genre => {
                    responseArray.push(genre.name);
                });

            }
            res.send(responseArray);
        });
    }
};