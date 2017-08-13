let _ = require('lodash');
let db = require('./Database.js').db;

module.exports = {
    Artist: function (name, location, bio, genres, rating) {
        this.name = name;
        this.location = location;
        this.bio = bio;
        this.genres = [];
        this.rating = rating;

        if (genres) {
            this.genres = _.concat(this.genres, genres);
        }
    },
    create: function (artist) {
        let session = db.session();
        let resultPromise = session.writeTransaction(tx => tx.run(
            "MERGE (a:Artist {name: {name}, location: {location}, \
                    bio: {bio}, genres: {genres}, rating: {rating}}) \
                    FOREACH (genreName in {genres}| MERGE (g:Genre \
                        {name: genreName}) MERGE(a)-[:PLAYS_GENRES]-(g)) \
                        RETURN a",
            {
                name: artist.name,
                location: artist.location,
                bio: artist.bio,
                rating: artist.rating,
                genres: artist.genres
            }));

        return resultPromise.then(result => {
            session.close();

            const singleRecord = result.records[0];
            const oneArtist = singleRecord.get(0);

            if (process.env.NODE_ENV !== 'test') {
                console.log(oneArtist);
            }

        }).catch(error => {
            console.log(error);
        });
    },
    getAll: function () {
        let session = db.session();

        const resultPromise = session.readTransaction(tx => tx.run(
            'MATCH (artist:Artist) RETURN artist'
        ));

        return resultPromise.then(result => {
            session.close();

            return result.records.map(record => {
                let artist = record.get("artist").properties;
                return new this.Artist(artist.name, artist.location, artist.bio, artist.genres, artist.rating)
            });
        }).catch(error => {
            console.log(error);
        });
    },
    getByGenre: function (genre) {
        let session = db.session();
        let resultPromise = session.readTransaction(tx => tx.run(
            'MATCH (a:Artist)-[:PLAYS_GENRES]->(g:Genre) \
            WHERE (g.name) = {genre} \
            RETURN a AS artist',
            {
                genre: genre
            }
        ));
        return resultPromise.then(result => {
            session.close();

            return result.records.map(record => {
                let artist = record.get("artist").properties;
                return new this.Artist(artist.name, artist.location, artist.bio, artist.genres, artist.rating)
            });
        }).catch(error => {
            console.log(error);
        });

    },
    getByLocation: function (location) {
        let session = db.session();
        let resultPromise = session.readTransaction(tx => tx.run(
            'MATCH (a:Artist) \
            WHERE (a.location) = {location} \
            RETURN a AS artist',
            {
                location: location
            }
        ));
        return resultPromise.then(result => {
            session.close();

            return result.records.map(record => {
                let artist = record.get("artist").properties;
                return new this.Artist(artist.name, artist.location, artist.bio, artist.genres, artist.rating)
            });
        }).catch(error => {
            console.log(error);
        });

    }

};
