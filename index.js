const express = require('express');
const app = module.exports = express();
require('dotenv').config();
const db = require('./server/db_api/db_api.js');

/*
 * Morgan logs HTTP requests.
 */
try {
    var morgan = require('morgan');
    if(process.env.NODE_ENV !== 'test'){
        app.use(morgan("dev")); 
    }
    
}
catch (e) {
    if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
        console.log("Morgan not found. Continuing without loading.");
    else
        throw e;
}
// Use this global var to avoid long relative paths :)
global.__baseDir = __dirname;

const routes = require('./server/routes/routes.js');
app.use(routes);

// Set the express server to whatever is in .evn or default back to 5000.
app.set('port', (process.env.PORT || 5000));

// Start HTTP server at specified port.
if(!module.parent) { // conditional to make sure tests are not trying to call listen twice
    app.listen(app.get('port'), function () {
    console.log('Started Server. Listening on ' + app.get('port'));
    // initialise the database
    db.initialise();
    });
}
module.exports = {app, routes};