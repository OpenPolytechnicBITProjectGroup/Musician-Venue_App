var db = require(__baseDir + '/server/db_api/db_api.js');

module.exports = {
    "index": function (req, res) {
        "use strict";
        let send = [];
        db.getAllGenres().then(genres => {
            if (genres) {
                genres.forEach(genre => {
                    send.push(genre[0]);
                });
            }
            res.send(send);
        });
    }
};