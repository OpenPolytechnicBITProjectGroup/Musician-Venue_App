const express = require('express')
const app = express()

app.use('/', express.static(__dirname + '/public'));

app.get('/working', function (req, res) {
  res.send('<h1>Yay it works!</h1><p>Express.js Example App</p>')
})
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
  console.log('We have lift-off!!')
})