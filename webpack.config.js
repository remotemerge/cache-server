const path = require('path');
const webpack = require('webpack');

// terser minify plugin
const TerserPlugin = require('terser-webpack-plugin');
// webpack externals
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => ({
  entry: {
    'app': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, '../cache-server-shadow'),
    publicPath: '/',
    filename: 'js/[name].js'
  },
  plugins: [
    // define global variables
    new webpack.DefinePlugin({
      'mode': JSON.stringify(argv.mode)
    }),
    // update banner for files
    new webpack.BannerPlugin({
      banner: (options) => options.basename === 'app.js' ? '#!/usr/bin/env node' : '',
      raw: true
    })
  ],
  module: {
    noParse: /lodash/,
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|otf|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './bundle/'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './bundle/'
        }
      }
    ]
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, './'),
      '@': path.join(__dirname, './')
    },
    extensions: ['*', '.js', '.json', '.scss']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    overlay: true,
    noInfo: false,
    host: '127.0.0.1',
    port: 8090,
    proxy: {
      '/api/': 'http://127.0.0.1:8080'
    }
  },
  performance: {
    hints: false
  },
  optimization: {
    runtimeChunk: false,
    minimize: (argv.mode === 'production' && (argv.minify === undefined || argv.minify === 'true')),
    minimizer: (argv.mode === 'production' && (argv.minify === undefined || argv.minify === 'true')) ? [
      new TerserPlugin({
        test: /\.js($|\?)/i,
        cache: false,
        parallel: true,
        sourceMap: true,
      })
    ] : []
  },
  watch: argv.mode !== 'production' || (argv.watch !== undefined && argv.watch === 'true'),
  target: 'node',
  externals: [nodeExternals()],
  devtool: (argv.mode === 'production') ? '' : '#source-map'
});
