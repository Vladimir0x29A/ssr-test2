const merge = require('webpack-merge');
const base = require('./base');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const client = merge(base, {
  entry: {
    app: './src/entry-client.js',
  },
  plugins: [
    new VueSSRClientPlugin(),
  ],
});

module.exports = new Promise(resolve => {
  resolve(client);
});
