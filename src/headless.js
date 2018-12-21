const puppeteer = require('puppeteer');
const _ = require('lodash');

export default {
  async render(testUrl, timeout) {
    // init content holder
    let html = '';
    // init browser and page
    const browser = await puppeteer.launch({
      headless: false, // default is true
      ignoreHTTPSErrors: true, // default false
      timeout: (timeout !== undefined) ? timeout : 60000, // default to 30 seconds
      args: [
        '--disable-notifications',
        '--hide-scrollbars',
        '--mute-audio'
      ]
    });
    const page = await browser.newPage();
    // set custom agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36');
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
      await page.goto(testUrl, {waitUntil: 'networkidle2'});
      await page.waitForNavigation();
      // extract page content
      //await page.waitFor(6000);
      html = await page.content();
    } catch (error) {
      html = await page.content();
    }
    // close the browser
    await browser.close();
    return html;
  }
};
