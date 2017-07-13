const express = require('express');
const app = express();
const routes = require('./app/routes/routes.js');


/*
 * Morgan logs HTTP requests.
 */
try {
    var morgan = require('morgan');
    app.use(morgan("dev"));
}
catch (e) {
    if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
        console.log("Morgan not found. Continuing without loading.");
    else
        throw e;
}


app.set('port', (process.env.PORT || 5000));

app.use(routes);

app.listen(app.get('port'), function () {
    var db = require('./app/db_api/db_api.js');
    // these tests will only work if neo4j is running (locally or on heroku)
    // otherwise remove before running
    db.test();

    console.log('Started Server. Listening on ' + app.get('port'));
});