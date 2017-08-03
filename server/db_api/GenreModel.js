let _ = require('lodash');
let db = require('./Database.js').db;

module.exports = {
    Genre: function (name) {
        this.name = name;
    },
    getAll: function () {
        let session = db.session();

        let resultPromise = session.readTransaction(tx => tx.run(
            'MATCH (g:Genre) RETURN g.name AS name'
        ));

        return resultPromise.then(result => {
            session.close();

            return result.records.map(record => {
                return new this.Genre(record.get('name')[0]);
            });
        }).catch(error => {
            console.log(error);
        });
    },

};
