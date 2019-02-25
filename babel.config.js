module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: process.env.npm_package_node_version || 'current'
        }
      }
    ],
  ],
  ignore: ['dist/*', 'output/*', 'playground/*', 'public/*']
};
