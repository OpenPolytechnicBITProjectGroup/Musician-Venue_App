/*
 * Require node modules and define some constant variables.
 */
const express = require('express');

//TODO: Isn't this line overwritten by the last line?
const app = module.exports = express();
require('dotenv').config();
const db = require('./server/db_api/Database.js');
let bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Use this global var to avoid long relative paths :)
global.__baseDir = __dirname;

/*
 * Morgan logs HTTP requests and responses to the console, making it easy to see when requests are made
 * and if they're correct.
 * Since it's only a devDependency and therefore not available on Heroku, it's loaded in a try/catch block
 * to handle it not being found in a production environment.
 */
try {
    let morgan = require('morgan');
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan("dev"));
    }

}
catch (e) {
    if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
        console.log("Morgan not found. Continuing without loading.");
    else
        throw e;
}


/*
 * Routes
 *
 * Each http request is passed through to the corresponding routes file.
 * If the URI begins with /api it is passed to the server routes file, otherwise
 * it will fall back to the client routes file.
 */
let serverRoutes = require('./server/routes/routes.server.js');
app.use("/api", serverRoutes);
let clientRoutes = require('./server/routes/routes.client.js');
app.use("/", clientRoutes);


/*
 * Starting the Server
 *
 * This section creates an HTTP server and starts listening on the port specified.
 * By default, the port will be 5000. Access the site at http://localhost:5000/ or similar.
 *
 * You can change the port by renaming example.env to .env and setting the port variable there.
 * When running on heroku, the port is automatically mapped to 80 (default for http)
 */
app.set('port', (process.env.PORT || 5000));
if (!module.parent) { // conditional to make sure tests are not trying to call listen twice
    app.listen(app.get('port'), function () {
        console.log('Started Server. Listening on ' + app.get('port'));
        // initialise the database
        db.initialise();
    });
}
module.exports = {app, routes: {serverRoutes, clientRoutes}};
