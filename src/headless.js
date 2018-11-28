// @flow
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

let isBlockedUrl = (testUrl): boolean => {
    let blacklist = [
        'connect.facebook.net',
        'connect.facebook.net',
        'google-analytics.com',
        'googletagmanager.com',
        'googleadservices.com',
        'googleads.g.doubleclick.net',
        'syndication.twitter.com',
        'platform.twitter.com',
        'px.ads.linkedin.com',
        's.sharethis.com', 'l.sharethis.com',
        'js.stripe.com', 'm.stripe.com'
    ];
    return _.includes(blacklist, getHostname(testUrl));
};

export default {
    async render(testUrl) {
        // init content holder
        let html = '';
        // init browser and page
        const browser = await puppeteer.launch({
            headless: true, // default is true
            ignoreHTTPSErrors: true, // default false
            timeout: 60000, // default to 30 seconds
        });
        const page = await browser.newPage();
        // set custom agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36');
        await page.setViewport({width: 1920, height: 1080});

        // request handler
        await page.setRequestInterception(true);
        page.on('request', request => {
            // accepted resources
            /*let resources = ['document', 'eventsource', 'fetch', 'manifest', 'other', 'script', 'texttrack', 'websocket', 'xhr'];
            if (_.includes(resources, request.resourceType()) && !isBlockedUrl(request._url)) {
                request.continue();
            } else {
                request.abort();
            }*/
            request.continue();
        });

        // response handler
        page.on('response', response => {
            const status = response.status();
        });

        //page.waitFor(100);

        // handle the errors
        page.on('error', (error) => {
            // console.log(error.message);
        });

        // handle the errors
        page.on('pageerror', (error) => {
            // console.log(error.message);
        });

        try {
            // load page and wait for redirects
            await page.goto(testUrl, {waitUntil: 'networkidle2'});
            await page.waitForNavigation();
            // extract page content
            await page.waitFor(6000);
            html = await page.content();
        } catch (e) {
            await page.waitFor(12000);
            html = await page.content();
        }
        // close the browser
        await browser.close();
        return html;
    }
};
