var express = require('express')
var logger = require('morgan')
var mongoose = require('mongoose')


var app = express()

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

mongoose.connect(
  'mongodb://localhost/newsSites',
  { useNewUrlParser: true }
)

require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)

//fs read then send

app.listen(3000, function() {
  console.log('App running on port 3000!')
})

module.exports = app