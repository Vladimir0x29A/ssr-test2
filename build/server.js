const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const base = require('./base');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const server = merge(base, {
  entry: './src/entry-server.js',
  target: 'node',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
  },
  externals: nodeExternals({
    whitelist: /\.css$/,
  }),
  plugins: [
    new VueSSRServerPlugin(),
  ],
});

module.exports = new Promise(resolve => {
  resolve(server);
});
