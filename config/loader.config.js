const ExtractTextPlugin = require('extract-text-webpack-plugin');
const loaderlist = {
  rules: [{
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader',
      publicPath: '../'
    })
  }, {
    test: /\.styl$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'postcss-loader', 'stylus-loader'],
      publicPath: '../' //背景图路径 
    })
  }, {
    test: /\.ejs$/,
    use: [{
      loader: 'ejs-loader'
    }]
  }, {
    test: /\.(png|jpg|gif)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 50,
        outputPath: 'front/images/icon/',
        publicPath: '../images/icon',
        name: '[name].[ext]'
      }
    }]
  }]
}

module.exports = loaderlist