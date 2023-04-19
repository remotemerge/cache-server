# CacheServer - Efficient Web Page Extractor

[![Package](https://img.shields.io/npm/v/@sapkotamadan/cache-server?logo=npm)](https://www.npmjs.com/package/@sapkotamadan/cache-server)
![Build](https://img.shields.io/github/actions/workflow/status/remotemerge/cache-server/production.yml?logo=github)
![Downloads](https://img.shields.io/npm/dt/@sapkotamadan/cache-server)
![License](https://img.shields.io/npm/l/@remotemerge/cache-server)

CacheServer is a tool designed to provide an efficient and streamlined method for extracting web page content. By offering an API that returns the HTML source code of webpages, CacheServer enables users to perform various automated tasks, such as web page extraction, data mining, and content analysis, etc.

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

`--headless`: Launch the Chromium browser in headless mode. The default is `true`; set to `false` to run the browser in non-headless mode, with a visible window.

For example, to run CacheServer with the customized settings, use the command like below:

```bash
cache-server --host=localhost --port=8095 --wait=5 --headless=false
```

### Web Page Extraction

To extract a web page using the CacheServer API, send the following GET request:

```
http://localhost:8095/v1/cache?url=...&userAgent=...&wait=...&headless=...
```

#### Parameters:

`url`: (Required) The URL of the web page to be extracted.

`userAgent`: (Optional) The user agent to be used for the request. If not specified, the default user agent will be used.

The `wait` and `headless` parameters function the same as in the server configuration and are optional for the request. Specify these parameters if you want to override the server settings for a particular request.

#### Response:

The response will be a JSON object with the following properties:

```json
{
  "content": "<!DOCTYPE html><html...</html>"
}
```