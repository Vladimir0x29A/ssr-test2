const webpack = require('webpack')
const merge = require('webpack-merge');
const base = require('./base');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const server = merge(base, {
  entry: './src/entry-server.js',
  target: 'node',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin(),
  ],
});

module.exports = new Promise(resolve => {
  resolve(server);
});
