const express = require('express');
const app = express();

var db = require('./db_api/db_api.js');

app.use('/', express.static(__dirname + '/public'));
app.use('/css/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.get('/working', function (req, res) {
  res.send('<h1>Yay it works!</h1><p>Express.js Example App</p>');
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
  console.log('We have lift-off!!');
  // these tests will only work if neo4j is running (locally or on heroku)
  // otherwise remove before running
  db.test();
});