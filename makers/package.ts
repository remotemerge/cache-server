import { readFileSync } from 'fs';
import { copyFile, mkdir, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

// use vars from package config
const pc = JSON.parse(readFileSync(`${resolve()}/package.json`, 'utf8'));

// configs for npm deployment
const configs = {
  name: pc.name,
  version: pc.version,
  description: pc.description,
  private: pc.private,
  license: pc.license,
  author: pc.author,
  keywords: [
    'API',
    'automation',
    'cache-server',
    'content-analysis',
    'data-mining',
    'headless-browser',
    'html-source',
    'page-render',
    'puppeteer',
    'web-crawler',
    'web-fetcher',
    'web-page-extractor',
    'web-scraping',
  ],
  repository: pc.repository,
  bugs: pc.bugs,
  engines: {
    node: '>=14',
  },
  type: pc.type,
  main: 'js/app.js',
  scripts: {
    start: 'node .',
    test: 'echo "Error: no test specified" && exit 1',
  },
  bin: {
    'cache-server': './js/app.js',
  },
  dependencies: {
    express: '*',
    puppeteer: '*',
  },
};

// generate package.json in dist
const publicPath = join(resolve(), 'dist');
await mkdir(publicPath, { recursive: true });
await writeFile(join(publicPath, 'package.json'), JSON.stringify(configs), 'utf-8');

// copy README.md to dist
await copyFile('README.md', `${publicPath}/README.md`);
