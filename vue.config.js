const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('~api', resolve('src/api'))
      .set('~css', resolve('src/assets/css'))
      .set('@', resolve('src'))
      .set('@discover', resolve('src/views/discover'))
      .set('@friend', resolve('src/views/friend'))
      .set('@my', resolve('src/views/my'));
  },
};
