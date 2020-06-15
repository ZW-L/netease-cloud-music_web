const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  publicPath: './',
  assetsDir: 'static',
  devServer: {
    proxy: 'http://localhost:3000',
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
}
