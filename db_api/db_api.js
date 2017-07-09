var neo4j = require('neo4j');
var _ = require('lodash');
var Venue = require('./venue.js');

var db = new neo4j.GraphDatabase({
    // Support specifiying database info via enviroment variables
    // but assume Neo4j installation defaults
    url: process.env['NEO4J_URL'] || process.env['GRAPHENEDB_URL'] ||
        'http://neo4j:neo4j2@localhost:7474',
    auth: process.env['NEO4J_AUTH'],
});

// Tester function to make sure DB is going
function test() {
    db.cypher({
        query: 'MERGE (n:Test {name: {testName}}) RETURN n',
        params: {
            testName: 'Bob'
        }
    }, function(err, results){
        var result = results[0];
        if (err) {
            console.error('Error saving new node to database:', err);
        } else {
            console.log('Node saved to database with id:', result['n']['_id']);
        }
    }); 
    venue = new Venue.Venue("The Grand", 500, "Wellington", ["Cheese", "Slapper"]);
    createVenue(venue);
    getAllVenues();

}

// Send a Venue object to here to create Venue in the database
function createVenue(venue) {
    db.cypher({
        query: "MERGE (v:Venue {name: {name}, capacity: {capacity}, \
                location: {location}, genres: {genres}}) RETURN v",
        params: {
            name: venue.name,
            capacity: venue.capacity,
            location: venue.location,
            genres: venue.genres
        }
    }, function(err, results){
        var result = results[0];
        if (err) {
            console.error('Error saving new venue to database:', err);
        } else {
            console.log('Successfully saved new venue with id:', result['v']['_id']);
        }
    });
}

// Returns all the venues in the database
function getAllVenues() {
    db.cypher({
        query: 'MATCH (v:Venue) RETURN v'
    }, function (err, request) {
        var result = request[0];
        if (err) {
            console.error('Error saving new venue to database:', err);
        } else {
            if (_.isEmpty(result)) {
                console.log("Empty search result");
                return null;
            }
            console.log('Success getting matches:', result['v']['_id']);
            return request;
        }
    });
}

function createBand(band) {

}

function getAllBands() {

}

exports.test = test;
exports.db = db;
exports.neo4j = neo4j;
exports.createBand = createBand;
exports.createVenue = createVenue;
exports.getAllBands = getAllBands;
exports.getAllVenues = getAllVenues;

module.exports = {test, db, neo4j, createBand,
     createVenue, getAllBands,getAllVenues};