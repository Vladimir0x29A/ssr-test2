const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProd ? false : 'source-map',
  mode: isProd ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js',
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
      /*{
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      },*/
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
           'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      },
    ],
  },
  plugins: isProd
    ? [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ]
    : [
      new VueLoaderPlugin(),
      new FriendlyErrorsPlugin(),
    ]
};
