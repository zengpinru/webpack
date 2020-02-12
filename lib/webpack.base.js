const path = require('path');
const glob = require('glob');
const Autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const projetRoot = process.cwd(); // Node.js 进程的当前工作目录 即测试下的模板目录

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projetRoot, './src/*/index.js'));

  entryFiles.forEach((item) => {
    const entryFile = item;
    const pageName = entryFile.match(/^.*src\/(.*)\/index\.js$/)[1];
    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(projetRoot, `./src/${pageName}/index.html`), // 模板所在的位置
      filename: `${pageName}.html`, // 输出的html的文件名称
      chunks: [pageName], // 文件指纹 vendors是splitChunks插件分离出来的公共模块
      inject: true, // 打包后的js和css是否注入到html中
      minify: {
        html5: true,
        collapseWhitespace: true, // 是否去掉空格
        preserveLineBreaks: false, // 是否去掉换行符
        minifyCss: true, // 是否压缩css
        minifyJS: true, // 是否压缩js
        removeComments: false // 是否去掉注释
      }
    }));
  });

  return { entry, htmlWebpackPlugins };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.join(projetRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                Autoprefixer({
                  browsers: ['last 2 version', '>1%', 'ios 7']
                });
              }
            }
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    ...htmlWebpackPlugins,
    function errorsPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          process.exit(1);
        }
      });
    }
  ]
};
