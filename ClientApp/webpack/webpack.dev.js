const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const fs = require('fs')
const path = require('path')
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
      hot: true,
      open: false,
      port: 44408,
      disableHostCheck: true,
      https: true,
      key: fs.readFileSync(path.resolve(__dirname, "../https/private.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "../https/cert.pem")),
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Vishwas'),
    }),
  ],
}
