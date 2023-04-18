import express, { Request, Response } from 'express';
import { URL } from 'url';

import { EngineConfigType } from './types';
import cliArgs from './cli';
import { renderPage } from './engine';

// set configs for page rendering
const configs: EngineConfigType = {
  headless: cliArgs.headless,
  wait: cliArgs.wait,
  url: '',
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
};

// init express
const app = express();

app.get('/v1/cache', async (req: Request, res: Response) => {
  if (!req.query.url) {
    return res.status(400).send('The rendering url is required!');
  }

  // set url for page rendering
  configs.url = req.query.url as string;

  // validate rendering url
  try {
    new URL(configs.url);
  } catch {
    return res.status(400).send('The rendering url must be a valid!');
  }

  // set wait time
  configs.wait = Number(req.query.wait) ?? cliArgs.wait;

  // set headless mode
  configs.headless = req.query.headless === 'true' ?? cliArgs.headless;

  // set user agent
  configs.userAgent = (req.query.userAgent as string) ?? configs.userAgent;

  // process for page rendering
  renderPage(configs)
    .then((html) => {
      return res.json({
        status: 'ok',
        cookies: [],
        html,
      });
    })
    .catch((e) => {
      return res.status(400).send(`'Failed! Error: ${e.message || 'Unknown error has been occurred.'}`);
    });
});

// handle all requests
app.get('*', (req: Request, res: Response) => {
  res.send('CacheServer is Running!');
});

// set port and start the server
const port = process.env.PORT || cliArgs.port;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
