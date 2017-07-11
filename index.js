const express = require('express');
const app = express();

var Venue = require('./db_api/venue.js');
var db = require('./db_api/db_api.js');

app.use('/', express.static(__dirname + '/public'));
app.use('/css/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.get('/working', function (req, res) {
  console.log('Working recieved');
  res.send('<h1>Yay it works!</h1><p>Express.js Example App</p>');
});

// Gets request from client and activates api call
app.get('/other_venues', function (req, res) {
  
  console.log("Received request from client");
  var send = [];
  db.getAllVenues().then(venues => {
            if (venues) {
                venues.forEach(venue =>{
                    send.push(new Venue.Venue(
                        venue.name, venue.capacity,
                        venue.location, venue.genres
                    ));
                
                });
            }
            res.send(send)
        });
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
  console.log('We have lift-off!!');
  // these tests will only work if neo4j is running (locally or on heroku)
  // otherwise remove before running
  db.test();
});