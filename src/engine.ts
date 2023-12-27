import puppeteer from 'puppeteer';
import type { EngineConfigType } from './types';

export const renderPage = async (
  configs: EngineConfigType,
): Promise<string> => {
  // init content holder
  let html = '';

  // init browser and configure and launch
  const browser = await puppeteer.launch({
    headless: configs.headless ?? 'new', // default is new
    ignoreHTTPSErrors: true, // default false
    timeout: 60000, // default to 30 seconds
    args: [
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-dev-shm-usage',
      '--disable-extensions',
      '--disable-gpu',
      '--disable-infobars',
      '--disable-notifications',
      '--disable-remote-fonts',
      '--disable-setuid-sandbox',
      '--disable-software-rasterizer',
      '--disable-sync',
      '--disable-web-security',
      '--hide-scrollbars',
      '--mute-audio',
      '--no-sandbox',
    ],
  });

  // start a new page
  const page = await browser.newPage();
  // set custom user agent
  await page.setUserAgent(configs.userAgent);
  // set viewport size
  await page.setViewport({ width: 1080, height: 1024 });

  // intercept requests
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    const resourceType = request.resourceType();

    // resource types to abort
    const abortResourceTypes = ['image', 'stylesheet', 'media', 'font'];

    if (abortResourceTypes.includes(resourceType)) {
      request.abort();
    } else {
      request.continue();
    }
  });

  // handle the errors
  page.on('error', (error) => error);
  page.on('pageerror', (pageerror) => pageerror);

  try {
    await page.goto(configs.url, { waitUntil: 'networkidle2' });
    await page.waitForNavigation({ timeout: configs.wait * 1000 });
    html = await page.content();
  } catch (error) {
    html = await page.content();
  } finally {
    await browser.close();
  }

  return html;
};
