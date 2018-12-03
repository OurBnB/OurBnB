//webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: require.resolve('babel-loader')
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: 'static/'
            }
          },
          // this is commented out because it wouldn't build and threw this error 
          // Error: pngquant failed to build, make sure that libpng is installed at Promise.all.then.arr
          // alternative is to use https://www.npmjs.com/package/img-loader
          
          // {
          //   loader: 'image-webpack-loader',
          //   options: {
          //     bypassOnDebug: true, // webpack@1.x
          //     disable: true, // webpack@2.x and newer
          //   },
          // },
        ],
      },
      {
  test: /\.scss$/,
  use: [
        {
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }
      ]
    }
    ]
  }
};
