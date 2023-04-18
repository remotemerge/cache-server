import type { CliConfig } from './types';
import { argv } from 'process';

/**
 * Set the default CLI arguments values
 * @property {string} host - The host to listen on
 * @property {number} port - The port to listen on
 * @property {number} wait - The wait time in seconds
 * @property {boolean} headless - The headless mode flag (true/false)
 */
const cliArgs: CliConfig = {
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
