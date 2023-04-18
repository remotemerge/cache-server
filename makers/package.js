#!/usr/bin/env node

import { copyFile, mkdir, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

// use vars from package config
import pc from './../package.json' assert { type: 'json' };

// configs for npm deployment
const configs = {
  name: '@sapkotamadan/cache-server',
  version: pc.version,
  description: pc.description,
  private: pc.private,
  license: pc.license,
  author: pc.author,
  repository: pc.repository,
  bugs: pc.bugs,
  keywords: ['cache', 'headless', 'puppeteer', 'server', 'stdlib', 'util'],
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
