const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  target: 'node',
  mode: 'production',
  context: path.resolve(__dirname, 'src'),
  entry: './main.ts',
  output: {
    filename: 'myApp.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.sh', '.sql', '.ts'],
    alias: {
      '@modes': path.resolve(__dirname, 'src/appModes'),
      '@database': path.resolve(__dirname, 'src/database'),
      '@domain': path.resolve(__dirname, 'src/domain'),
      '@': path.resolve(__dirname, 'src')
    },
    fallback: {
      fs: false,
      path: false,
      pg: false,
      child_process: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-typescript']
            }
          }
        ]
      },
      {
        test: /\.sh$/,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.sql$/,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false
            }
          }
        ]
      }
    ]
  }
};
