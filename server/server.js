var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  fs = require("fs"),
  path = require("path"),
  haste = require("./models/index.model");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://AdminSammy:jannyburzinski123456@meeting.burzinski.de'); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var hasteRoutes = require('./routes/index.routes');
hasteRoutes(app);

app.use(function(req, res) {
  res.status(404).send({error: 'Not Authorized'})
});

app.listen(port);

console.log('API Server started on: ' + port);