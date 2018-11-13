const path = require('path');
module.exports = {
  contentBase: path.resolve(__dirname, 'dist'),
  host: '0.0.0.0',
  useLocalIp: true,
  port: '3000',
  open: true,
  hot: true,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000',
      pathRewrite: {'^/api' : ''},
      secure: false
    }
  }
}