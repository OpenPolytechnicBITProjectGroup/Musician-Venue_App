var neo4j = require('neo4j-driver').v1;
var _ = require('lodash');

var url = (process.env['NEO4J_URL'] || process.env['GRAPHENEDB_URL'] ||
    'http://neo4j:neo4j2@localhost:7474');
var bolt_url = (process.env['NEO4J_BOLT_URL'] || process.env['GRAPHENEDB_BOLT_URL'] ||
    'bolt://localhost');
var bolt_user = (process.env['NEO4J_BOLT_USER'] || process.env['GRAPHENEDB_BOLT_USER'] ||
    'neo4j');
var bolt_pass = (process.env['NEO4J_BOLT_PASSWORD'] || process.env['GRAPHENEDB_BOLT_PASSWORD'] ||
    'neo4j2');

if (process.env["DEBUG"] && process.env["DEBUG"] === true) {
    console.log("Connecting to DB: " + bolt_url);
    console.log("User:" + bolt_user);
    console.log("Pass:" + bolt_pass);
}


db = neo4j.driver(bolt_url, neo4j.auth.basic(bolt_user, bolt_pass));

// Tester function to make sure DB is going
function test() {
    var session = db.session();

    const resultPromise = session.writeTransaction(tx => tx.run(
        'MERGE (n:Test {name: {testName}}) RETURN n ',
        {testName: 'Bob'}));

    resultPromise.then(result => {
        session.close();

        const singleRecord = result.records[0];
        const greeting = singleRecord.get(0);

        console.log(greeting);

    }).catch(error => {
        console.log("In Test: ", error);
    });

    venue = new Venue.Venue("The Grand", 500, "Wellington", ["Cheese", "Slapper"]);
    createVenue(venue);

    getAllVenues().then(venues => {
        if (venues) {
            venues.forEach(venue => {
                console.log("In Test: ", venue);
            });
        }
    });
}

function migrate() {
    "use strict";
    migrateGenres();
    //migrateArtists();
    //migrateVenues();
}

function migrateGenres() {
    let session = db.session();

    let resultPromise = session.writeTransaction(tx => tx.run(
        'LOAD CSV FROM "https://raw.githubusercontent.com/OpenPolytechnicBITProjectGroup/Resources/master/Database_files/genres.csv" \
    as csvLine \
    MERGE (g:Genre {name: csvLine}) RETURN g')); // if the genre exists it wont be added

    return resultPromise.then(result => {
        session.close();
        console.log("Created " + result.records.length + " records for Genre");
        // link to the artist and venue migration scripts.
        migrateArtists();
        migrateVenues();
    }).catch(error => {
        console.log(error);
    });
}

function migrateArtists() {
    let session = db.session();
    let resultPromise = session.writeTransaction(tx => tx.run(
        'LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/OpenPolytechnicBITProjectGroup/Resources/master/Database_files/artists.csv" \
        as csvLine \
        MERGE (a:Artist {\
            name: csvLine.name,\
            location: csvLine.location,\
            rating: csvLine.rating,\
            bio: csvLine.bio,\
            genres: split(csvLine.genres, ";")\
        }) \
        FOREACH (genreName in a.genres| MERGE (g:Genre\
         {name: genreName}) MERGE(a)-[:PLAYS_GENRES]-(g)) \
        RETURN a')); // if the artist exists it wont be added

    return resultPromise.then(result => {
        session.close();
        console.log("Created " + result.records.length + " records for Artist");
    }).catch(error => {
        console.log(error);
    });
}

function migrateVenues() {
    let session = db.session();
    let resultPromise = session.writeTransaction(tx => tx.run(
        'LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/OpenPolytechnicBITProjectGroup/Resources/master/Database_files/venues.csv" \
        as csvLine \
        MERGE (v:Venue {\
            name: csvLine.name,\
            location: csvLine.location,\
            capacity: csvLine.capacity,\
            genres: split(csvLine.genres, ";")\
        }) \
        FOREACH (genreName in v.genres| MERGE (g:Genre\
         {name: genreName}) MERGE(v)-[:LIKES_GENRES]-(g)) \
        RETURN v')); // if the venue exists it wont be added

    return resultPromise.then(result => {
        session.close();
        console.log("Created " + result.records.length + " records for Venue");
        process.exit();
    }).catch(error => {
        console.log(error);
    });
}

exports.db = db;
exports.migrate = migrate;