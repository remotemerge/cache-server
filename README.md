# CacheServer - Efficient Web Page Extractor

[![Package](https://img.shields.io/npm/v/@sapkotamadan/cache-server?logo=npm)](https://www.npmjs.com/package/@sapkotamadan/cache-server)
![Build](https://img.shields.io/github/actions/workflow/status/remotemerge/cache-server/production.yml?logo=github)
![Downloads](https://img.shields.io/npm/dt/@sapkotamadan/cache-server)
![License](https://img.shields.io/npm/l/@remotemerge/cache-server)

CacheServer offers an API for loading webpages and returning their HTML source code. Utilizing Puppeteer behind the scenes, it launches a headless browser to fetch the content. The CacheServer API streamlines various automated tasks, such as web page extraction, data mining, and content analysis, by providing a seamless and efficient interface.

<h2>Requirements</h2>
<p>The cache server works best on the latest versions of Node and NPM. The minimum requirements are:</p>
<p>
  <a href="https://nodejs.org/en/download"><img src="https://img.shields.io/badge/node-%3E=8.16-brightgreen.svg?style=for-the-badge" alt="node"></a>
  <a href="https://www.npmjs.com/get-npm"><img src="https://img.shields.io/badge/yarn-%3E=1.19-brightgreen.svg?style=for-the-badge" alt="npm"></a>
</p>
<i>*.* make sure node and npm are available in PATH environment variable. *.*</i>
<h2>Installation</h2>

```bash
npm i @sapkotamadan/cache-server -g
```

<h2>Start Server</h2>
<p>Run the command from command line tools like <a href="https://git-scm.com/downloads" target"_blank">Git Bash</a>, <a href="http://cmder.net/" target="_blank">Cmder</a> and/or terminal, cmd ... etc.</p>

```bash
cache-server
```

<p>The cache server starts on <a href="#">http://localhost:8095</a> by default. Few optional parameters are supported.</p>

```bash
cache-server --host=localhost --port=8095 --wait=1 --headless=false
```

<h5>params defination</h5>

```--host``` The computer address *localhost*, *127.0.0.1* etc.

```--port``` The unused port *8080*, *8095* ... etc.

```--wait``` The maximum time to wait in seconds after the page is rendered, default is *1* second.

```--headless``` Starts on non-headless mode by default and launch the chromium web browser. Change the value to *true* to run in headless mode.

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
