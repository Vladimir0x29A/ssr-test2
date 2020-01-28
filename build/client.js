const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./base');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const client = merge(base, {
  entry: {
    app: './src/entry-client.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin(),
  ],
});

module.exports = new Promise(resolve => {
  resolve(client);
});
