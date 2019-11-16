const fs = require('fs');

// configs for npm deployment
let configs = {
  'name': process.env.npm_package_name,
  'version': process.env.npm_package_version,
  'description': process.env.npm_package_description,
  'main': 'js/app.js',
  'license': process.env.npm_package_license,
  'author': {
    'name': process.env.npm_package_author_name,
    'email': process.env.npm_package_author_email,
    'url': process.env.npm_package_author_url
  },
  'repository': {
    'type': 'git',
    'url': process.env.npm_package_repository_url
  },
  'bugs': {
    'url': process.env.npm_package_bugs_url
  },
  'keywords': [
    'cache',
    'headless',
    'puppeteer',
    'server',
    'stdlib',
    'util'
  ],
  'os': [
    'darwin',
    'win32',
    'linux'
  ],
  'engines': {
    'node': process.env.npm_package_engines_node,
    'yarn': process.env.npm_package_engines_yarn
  },
  'scripts': {
    'start': 'node .',
    'test': 'echo "Error: no test specified" && exit 1'
  },
  'bin': {
    'cache-server': './js/app.js'
  },
  'dependencies': {
    'body-parser': process.env.npm_package_dependencies_body_parser,
    'cors': process.env.npm_package_dependencies_cors,
    'express': process.env.npm_package_dependencies_express,
    'lodash': process.env.npm_package_dependencies_lodash,
    'puppeteer': process.env.npm_package_dependencies_puppeteer
  },
  'devDependencies': {}
};

fs.writeFile('./dist/package.json', JSON.stringify(configs), function (err) {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err.message);
  }
  // eslint-disable-next-line no-console
  console.log('The package.json is created!');
});
