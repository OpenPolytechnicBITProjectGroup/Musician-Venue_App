var neo4j = require('neo4j-driver').v1;
var _ = require('lodash');
var Venue = require('./venue.js');

var url = (process.env['NEO4J_URL'] || process.env['GRAPHENEDB_URL'] ||
        'http://neo4j:neo4j2@localhost:7474')
var bolt_url = (process.env['NEO4J_BOLT_URL'] || process.env['GRAPHENEDB_BOLT_URL'] ||
        'bolt://localhost');
var bolt_user = (process.env['NEO4J_BOLT_USER'] || process.env['GRAPHENEDB_BOLT_USER'] ||
        'neo4j');
var bolt_pass = (process.env['NEO4J_BOLT_PASSWORD'] || process.env['GRAPHENEDB_BOLT_PASSWORD'] ||
        'neo4j2');


var db = neo4j.driver(bolt_url, neo4j.auth.basic(bolt_user, bolt_pass));

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
                venues.forEach(venue =>{
                    console.log("In Test: " ,venue);
                });
            }
        });
}

// Send a Venue object to here to create Venue in the database
function createVenue(venue) {
    var session = db.session();
    
    const resultPromise = session.writeTransaction(tx => tx.run(
        "MERGE (v:Venue {name: {name}, capacity: {capacity}, \
                location: {location}, genres: {genres}}) RETURN v",
        {name: venue.name,
        capacity: venue.capacity,
        location: venue.location,
        genres: venue.genres}));

    resultPromise.then(result => {
    session.close();
    /*
    const singleRecord = result.records[0];
    const oneVenue = singleRecord.get(0);

    console.log(oneVenue);
    */
    }).catch(error => {
        console.log(error);
    });
}

// Returns all the venues in the database
function getAllVenues() {
   
    var session = db.session();
    
    const resultPromise = session.readTransaction(tx => tx.run(
        'MATCH (v:Venue) RETURN v'
        ));

    return resultPromise.then(result => {
    session.close();

    return result.records.map(record => {
        return new Venue.NodeVenue(record.get('v'));
        });
    }).catch(error => {
        console.log(error);
    });
}


function createBand(band) {

}

function getAllBands() {

}

function getAllGenres() {
    var session = db.session();
    
    const resultPromise = session.readTransaction(tx => tx.run(
        'MATCH (g:Genre) RETURN g.name AS name'
        ));

    return resultPromise.then(result => {
    session.close();

    return result.records.map(record => {
        return record.get(['name']);
        });
    }).catch(error => {
        console.log(error);
    });
}

/*
 * Loads CSV files of essential data if not already in existance
 * within the database
 */
function initialise() {
    // call the genre.csv file and install Genre nodes
    var session = db.session();
    
    const resultPromise = session.writeTransaction(tx => tx.run(
        'LOAD CSV FROM "https://raw.githubusercontent.com/OpenPolytechnicBITProjectGroup/Resources/master/Database_files/genres.csv" \
        as csvLine \
        MERGE (g:Genre {name: csvLine}) RETURN g')); // if the genre exists it wont be added

    resultPromise.then(result => {
    session.close();

    const singleRecord = result.records[0];
    const oneGenre = singleRecord.get(0);

    console.log(oneGenre);

    }).catch(error => {
        console.log(error);
    });
    
}

exports.test = test;
exports.db = db;
exports.neo4j = neo4j;
exports.createBand = createBand;
exports.createVenue = createVenue;
exports.getAllBands = getAllBands;
exports.getAllVenues = getAllVenues;
exports.getAllGenres = getAllGenres;
exports.initialise = initialise;

module.exports = {test, db, neo4j, createBand,
     createVenue, getAllBands,getAllVenues,getAllGenres, initialise};
