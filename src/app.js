import express from 'express';
import cors from 'cors';
import '@babel/polyfill';
import headless from './headless';
import Catcher from './Catcher';
import cli from './cli';

// configs from cli
const configs = cli.reader();

// configs from web request
const runtimeConfigs = {
  headless: configs.headless,
  wait: configs.wait,
  userAgent: ''
};

// init express
const app = express();

// allow cross-origin requests
app.use(cors({origin: true}));

// request parser
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// handle cache request
app.get('/cache', (req, res) => {

  // set headless from request
  if (req.query.headless !== undefined) {
    runtimeConfigs.headless = (typeof Boolean(req.query.headless) === 'boolean') ? JSON.parse(req.query.headless) : configs.headless;
  }

  // set wait from request
  if (req.query.wait) {
    runtimeConfigs.wait = !isNaN(req.query.wait) ? JSON.parse(req.query.wait) : configs.wait;
  }

  // set user agent from request
  runtimeConfigs.userAgent = req.headers['user-agent'];
  if (req.query.userAgent) {
    runtimeConfigs.userAgent = req.query.userAgent;
  }

  if (req.query.u) {
    let testUrl = Buffer.from(req.query.u, 'base64').toString('ascii');
    headless.render(testUrl, runtimeConfigs).then((response) => {
      res.send(response);
    }).catch(() => {
      res.send('Failed to render the Url.');
    });
  } else {
    res.send('Invalid Url and params!');
  }
});

// handle all requests
app.get('*', (req, res) => {
  res.send('Cache server is Running!');
});

// start app in port 8095
const port = process.env.PORT || configs.port;
app.listen(port, () => Catcher.console('Server started', 'http://localhost:' + port));
