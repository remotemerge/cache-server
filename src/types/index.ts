/**
 * @typedef {Object} CommonConfigType
 * @property {boolean} headless - Whether to run browser in headless mode
 * @property {number} wait - Time to wait before rendering the page
 */
type CommonConfigType = {
  headless: boolean | string;
  wait: number;
};

/**
 * @typedef {Object} EngineConfigType
 * @property {string} url - The URL to render
 * @property {string} userAgent - The user agent to use
 */
export type EngineConfigType = CommonConfigType & {
  url: string;
  userAgent: string;
};

/**
 * @typedef {Object} CliConfigType
 * @property {string} host - The host to listen on
 * @property {number} port - The port to listen on
 */
export type CliConfigType = CommonConfigType & {
  host: string;
  port: number;
};
