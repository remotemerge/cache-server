import type { CliConfigType } from './types';

const cliArgs: CliConfigType = {
  host: 'localhost',
  port: 8080,
  wait: 1, // wait for 1 second
  headless: 'new',
};

// extract args
const args = process.argv.slice(2);

// set cli args in the config
for (const arg of args) {
  const match = arg.match(/--(?<key>[a-z]+)=(?<value>\w+)/i);
  if (match && match.groups) {
    const { key, value } = match.groups;
    switch (key) {
      case 'host':
        cliArgs.host = value;
        break;
      case 'port':
        cliArgs.port = Number(value);
        break;
      case 'wait':
        cliArgs.wait = Number(value);
        break;
      case 'headless':
        cliArgs.headless = ['true', 'new'].includes(value) ? value : false;
        break;
    }
  }
}

// export the cli args
export default cliArgs;
