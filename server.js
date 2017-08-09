const express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      morgan = require('morgan'),
      restful = require('node-restful'),
      mongoose = restful.mongoose;
const app = express();
const router = express.Router();
const request = require('request');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect('mongodb://localhost/ReadyForLaunch');

const LaunchSchema = mongoose.Schema({
  name: String,
  agency: String,
  location: String,
  time: Date
});
const Launches = restful.model('launches', LaunchSchema);
Launches.methods(['get', 'put', 'post', 'delete']);
Launches.register(app, '/api/launches');
const Launch = mongoose.model('Launch', LaunchSchema);

let date = new Date();
date = date.toISOString().slice(0, 10);

const launchData = request({
    url: `https://launchlibrary.net/1.2/launch/${date}?limit=200`,
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'request'
    }
  }, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
    let length = JSON.parse(body).count;
    Launch.remove({}, function (err, small) {
      if (err) { return handleError(err) };
    });
    for (let i = 0; i < length; i++) {
      let launchInfo = {
        name: JSON.parse(body).launches[i].name,
        agency: JSON.parse(body).launches[i].rocket.agencies[0].name,
        location: JSON.parse(body).launches[i].location.name,
        time: JSON.parse(body).launches[i].windowstart
      }
      let launch = new Launch(launchInfo);
      launch.save(function (err) {
        if (err) {
          return handleError(err);
        }
      });
    }
  });

app.listen(3001);
console.log('Server is running at post 3001');

module.exports = router;
