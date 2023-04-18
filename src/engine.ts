import puppeteer from 'puppeteer';
import type { HeadlessConfig } from './types';

export const renderPage = async (configs: HeadlessConfig): Promise<string> => {
  // init content holder
  let html = '';
  // init browser and page
  const browser = await puppeteer.launch({
    headless: configs.headless, // default is true
    ignoreHTTPSErrors: true, // default false
    timeout: 60000, // default to 30 seconds
    args: [
      '--disable-infobars',
      '--disable-notifications',
      '--disable-remote-fonts',
      '--disable-web-security',
      '--hide-scrollbars',
      '--mute-audio',
      '--no-sandbox',
    ],
  });
  const page = await browser.newPage();
  // set custom agent
  await page.setUserAgent(configs.userAgent);
  await page.setViewport({ width: 1920, height: 1080 });

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
    await page.goto(configs.url, { waitUntil: 'networkidle2' });
    await page.waitForNavigation();
    // wait for seconds
    // await page.waitFor(configs.wait * 1000);

    // extract page content
    html = await page.content();
  } catch (error) {
    html = await page.content();
  }
  // close the browser
  await browser.close();
  return html;
};
