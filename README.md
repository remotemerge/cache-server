# CacheServer - Efficient Web Page Extractor

[![Package](https://img.shields.io/npm/v/@sapkotamadan/cache-server?logo=npm)](https://www.npmjs.com/package/@sapkotamadan/cache-server)
![Build](https://img.shields.io/github/actions/workflow/status/remotemerge/cache-server/production.yml?logo=github)
![Downloads](https://img.shields.io/npm/dt/@sapkotamadan/cache-server)
![License](https://img.shields.io/npm/l/@remotemerge/cache-server)

CacheServer offers an API for loading webpages and returning their HTML source code. Utilizing Puppeteer behind the scenes, it launches a headless browser to fetch the content. The CacheServer API streamlines various automated tasks, such as web page extraction, data mining, and content analysis, by providing a seamless and efficient interface.

### System Requirements

CacheServer is compatible with Node.js v8 and above, although using the latest version of Node.js is highly recommended to ensure access to all features and optimal performance.

**Note:** Ensure that Node.js is properly installed and accessible in system PATH.

### Installation

To install CacheServer, run the following command in your terminal:

```bash
npm i -g @sapkotamadan/cache-server
```

This command will globally install the CacheServer package, making it available for use across your system.

### Start CacheServer:

To start CacheServer, execute the following command in your terminal:

```bash
cache-server
```

By default, the server will be accessible at `http://localhost:8080`. You can customize the configuration using optional parameters:

`--host`: Set the host, such as `localhost` or `127.0.0.1`. The default is `localhost`.

`--port`: Specify an available port, like `8080` or `8095`. The default is `8080`.

`--wait`: Define the maximum wait time in seconds after the page has loaded. The default is `1` second.

`--headless`: Launch the Chromium browser in headless mode. The default is `true`; set to `false` for non-headless mode.

For example, to run CacheServer with the customized settings, use the command like below:

```bash
cache-server --host=localhost --port=8095 --wait=5 --headless=false
```

<h2>Usage</h2>

<p>Make a GET request on the cache server.</p>

```
http://localhost:8095/v1/cache?url=[remote url]&wait=[time in seconds]&headless=[true|false]
```

<h5>request specific params</h5>

```url``` Required. The remote url to be rendered.

```u``` alias of *url*. Required if *url* is absent, remote url must be Base64 encoded.

```wait``` and ```headless``` Optional. Works same as server params.

<h1>Roadmap</h1>
<ul>
  <li>Support proxy and/or IP rotation.</li>
  <li>Render the image.</li>
  <li>Render the PDF.</li>
  <li>The height of sky is ∞ miles.</li>
</li>
