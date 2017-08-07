const express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      morgan = require('morgan'),
      restful = require('node-restful'),
      mongoose = restful.mongoose;
const app = express();

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

app.listen(3000);
console.log('Server is running at post 3000');
