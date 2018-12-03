import Catcher from './Catcher';

const puppeteer = require('puppeteer');
const url = require('url');
const _ = require('lodash');

const getFilename = (site) => {
  // get url components
  let components = url.parse(site);
  // format the filename
  return site
    .replace(/^(?:(?:https?):\/\/(?:[w]{3}\.)?)/guism, '') // remove scheme and www.
    //.replace('?' + components.query, '') // remove query string
    .replace(/(?:\W+)+/guism, '-') // remove special characters with dash
    .substr(0, 55) // limit to 55 characters
    .replace(/(\W+)$/guism, '') // remove special characters from end
    .toLocaleLowerCase() // convert to lowercase
    .concat('.html'); // append file extension
};

let getHostname = (testUrl) => {
  return url.parse(testUrl).hostname.replace(/^(?:w{3}\.)/guism, '');
};

export default {
  async render(testUrl) {
    // init content holder
    let html = '';
    // init browser and page
    const browser = await puppeteer.launch({
      headless: false, // default is true
      ignoreHTTPSErrors: true, // default false
      timeout: 60000, // default to 30 seconds
    });
    const page = await browser.newPage();
    // set custom agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36');
    //await page.setViewport({width: 1920, height: 1080});

    // request handler
    /*await page.setRequestInterception(true);
    page.on('request', request => {
      //request.continue();
      let resources = ['document', 'eventsource', 'fetch', 'manifest', 'other', 'script', 'texttrack', 'websocket', 'xhr'];
      Catcher.console(request.resourceType());
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
