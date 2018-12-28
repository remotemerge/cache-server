export default {
  reader() {
    // base configs
    let configs = {
      host: 'localhost',
      port: 8095,
      wait: 1, // wait for 1 second
      headless: false
    };

    // regex match holder
    let match;
    // pattern to match params
    const regex = /--(?<param>\w+)=(?<value>\w+)/gmi;

    // read the command arguments
    const [, , ...args] = process.argv;

    const validate = (param, val) => {

      // validate numbers
      if (param === 'wait' || param === 'port') {
        if (!isNaN(val)) {
          return JSON.parse(val);
        }
        return configs[param];
      }

      // validate booleans
      if (param === 'headless') {
        if (typeof Boolean(val) === 'boolean') {
          return JSON.parse(val);
        }
        return configs[param];
      }
      return val;
    };

    while ((match = regex.exec(args)) !== null) {
      // overwrite the defaults
      if (configs[match.groups.param] !== undefined) {
        configs[match.groups.param] = validate(match.groups.param, match.groups.value);
      }
    }
    return configs;
  }
};
