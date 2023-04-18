import express, { Request, Response } from 'express';
import validator from 'validator';
import cliArgs from './cli';

// set default user agent
const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36';

// set configs for page rendering
const configs = {
  url: '',
  userAgent,
  headless: cliArgs.headless,
  wait: cliArgs.wait,
};

// init express
const app = express();

app.get('/v1/cache', (req: Request, res: Response) => {
  // set rendering url
  if (req.query.url) {
    configs.url = req.query.url as string;
  } else {
    return res.status(400).send('The rendering url is required!');
  }

  // validate the URL
  if (!validator.isURL(configs.url)) {
    return res.status(400).send('The rendering url must be a valid!');
  }

  // set wait time
  if (req.query.wait) {
    configs.wait = Number(req.query.wait) || cliArgs.wait;
  }

  // set headless
  if (req.query.headless) {
    configs.headless = req.query.headless === 'true';
  } else {
    configs.headless = cliArgs.headless;
  }
});

// handle all requests
app.get('*', (req: Request, res: Response) => {
  res.send('Cache server is Running!');
});

// set port and start the server
const port = process.env.PORT || cliArgs.port;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
