import type { CliConfigType } from './types';
import { argv } from 'process';

const cliArgs: CliConfigType = {
  host: 'localhost',
  port: 8080,
  wait: 1, // wait for 1 second
  headless: false,
};

for (const arg of argv.slice(2)) {
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
        cliArgs.headless = value === 'true';
        break;
    }
  }
}
export default cliArgs;
