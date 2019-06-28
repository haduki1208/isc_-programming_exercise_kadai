const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  entry: resolve(__dirname, 'src', 'index.ts'),

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'public')
  },

  resolve: {
    extensions: ['.js', '.json', '.ts', '.css']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: { url: false }
          }
        ]
      }
    ]
  },

  devServer: {
    open: true,
    openPage: 'index.html',
    contentBase: resolve(__dirname, 'public'),
    watchContentBase: true,
    host: '127.0.0.1',
    port: 3000
  }
};
