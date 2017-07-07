const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('<h1>Yay it works!</h1><p>Express.js Example App</p>')
})
app.set('port', (process.env.PORT || 5000));

app.listen((app.get('port'), function () {
  console.log('We have lift-off!!')
})