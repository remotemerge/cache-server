const puppeteer = require('puppeteer');
//const _ = require('lodash');

export default {
  async render(configs) {
    // init content holder
    let html = '';
    // init browser and page
    const browser = await puppeteer.launch({
      headless: configs.headless, // default is true
      ignoreHTTPSErrors: true, // default false
      timeout: 60000, // default to 30 seconds
      args: [
        '--disable-notifications',
        '--hide-scrollbars',
        '--mute-audio'
      ]
    });
    const page = await browser.newPage();
    // set custom agent
    await page.setUserAgent(configs.userAgent);
    await page.setViewport({width: 1920, height: 1080});

    // request handler
    /*await page.setRequestInterception(true);
    page.on('request', request => {
      // support resource types // updated
      // document, eventsource, fetch, font, image, manifest, media, other, script, stylesheet, texttrack, websocket, xhr
      let resources = ['document', 'eventsource', 'fetch', 'manifest', 'other', 'script', 'texttrack', 'websocket', 'xhr'];
      if (_.includes(resources, request.resourceType())) {
        request.continue();
      } else {
        request.abort();
      }
    });*/

    // handle the errors
    page.on('error', (error) => {
      return error;
    });

    // handle the errors
    page.on('pageerror', (pageerror) => {
      return pageerror;
    });

    try {
      // load page and wait for redirects
      await page.goto(configs.url, {waitUntil: 'networkidle2'});
      await page.waitForNavigation();
      // wait for seconds
      await page.waitFor(configs.wait * 1000);

      // extract page content
      html = await page.content();
    } catch (error) {
      html = await page.content();
    }
    // close the browser
    await browser.close();
    return html;
  }
};
