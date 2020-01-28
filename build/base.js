const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  devtool: '#source-map',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        loader: 'babel-loader',
        exclude: '/node_modules',
      },
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
      },
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js',
    },
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
