const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  publicPath: './',
  assetsDir: 'static',
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://zwlife.top:3000',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': '/',
  //       },
  //     },
  //   },
  // },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
}
