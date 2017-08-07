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

const launchData = request({
    url: 'https://launchlibrary.net/1.2/launch/2017-08-07',
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'request'
    }
  }, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
  });

app.listen(3000);
console.log('Server is running at post 3000');

module.exports = router;
