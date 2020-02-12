const merge = require('webpack-merge');
const cssnano = require('cssnano');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const OptimzeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimzeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'vue',
          entry: 'https://unpkg.com/vue@2.6.11/dist/vue.js',
          global: 'Vue'
        }
      ]
    })
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'vendors',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },
  stats: 'errors-only'
};

module.exports = merge(baseConfig, prodConfig);
