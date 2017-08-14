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

if(process.env["DEBUG"] && process.env["DEBUG"] === true){
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



/*
 * Loads CSV files of essential data if not already in existance
 * within the database
 */
function migrate() {
    // call the genre.csv file and install Genre nodes
    let session = db.session();

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

exports.db = db;
exports.migrate = migrate;