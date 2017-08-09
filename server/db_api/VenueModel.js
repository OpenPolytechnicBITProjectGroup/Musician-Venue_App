let _ = require('lodash');
let db = require('./Database.js').db;

module.exports = {
    Venue: function (name, capacity, location, genres) {
        this.name = name;
        this.capacity = capacity;
        this.location = location;
        this.genres = [];
        if (genres) {
            this.genres = _.concat(this.genres, genres);
        }
    },
    create: function (venue) {
        let session = db.session();
        let resultPromise = session.writeTransaction(tx => tx.run(
            "MERGE (v:Venue {name: {name}, capacity: {capacity}, \
                    location: {location}, genres: {genres}}) \
                    FOREACH (genreName in {genres}| MERGE (g:Genre \
                        {name: genreName}) MERGE(v)-[:LIKES_GENRES]-(g)) \
                        RETURN v",
            {
                name: venue.name,
                capacity: venue.capacity,
                location: venue.location,
                genres: venue.genres
            }));

        return resultPromise.then(result => {
            session.close();

            const singleRecord = result.records[0];
            const oneVenue = singleRecord.get(0);

            if (process.env.NODE_ENV !== 'test') {
                console.log(oneVenue);
            }

        }).catch(error => {
            console.log(error);
        });
    },
    getAll: function () {
        let session = db.session();

        const resultPromise = session.readTransaction(tx => tx.run(
            'MATCH (venue:Venue) RETURN venue'
        ));

        return resultPromise.then(result => {
            session.close();

            return result.records.map(record => {
                let v = record.get("venue").properties;
                return new this.Venue(v.name, v.capacity, v.location, v.genres)
            });
        }).catch(error => {
            console.log(error);
        });
    },
    getByGenre: function (genre) {
        let session = db.session();
        let resultPromise = session.readTransaction(tx => tx.run(
            'MATCH (v:Venue)-[:LIKES_GENRES]->(g:Genre) \
            WHERE (g.name) = {genre} \
            RETURN v AS venue',
            {
                genre: genre
            }
        ));
        return resultPromise.then(result => {
            session.close();

            return result.records.map(record => {
                let v = record.get("venue").properties;
                return new this.Venue(v.name, v.capacity, v.location, v.genres)
            });
        }).catch(error => {
            console.log(error);
        });

    },
    getByLocation: function (location) {
        let session = db.session();
        let resultPromise = session.readTransaction(tx => tx.run(
            'MATCH (v:Venue) \
            WHERE (v.location) = {location} \
            RETURN v AS venue',
            {
                location: location
            }
        ));
        return resultPromise.then(result => {
            session.close();

            return result.records.map(record => {
                let v = record.get("venue").properties;
                return new this.Venue(v.name, v.capacity, v.location, v.genres)
            });
        }).catch(error => {
            console.log(error);
        });

    }

};
