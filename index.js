const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('<h1>Yay it works!</h1><p>Express.js Example App</p>')
})

app.listen(3000, function () {
  console.log('We have lift-off!!')
})