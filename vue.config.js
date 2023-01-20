process.env.AppVersion = require('./package.json').version
module.exports = {
  devServer: {
    port: 9500,
    open: true,
    host: 'localhost',
    hot: true,
    proxy: {
      '/cdn': {
        target: process.env.VUE_APP_IMAGE,
        changeOrigin: true,
        pathRewrite: {
          '^/cdn': ''
        }
      },
      '/ntp': {
        target: process.env.VUE_APP_NTP,
        changeOrigin: true,
        pathRewrite: {
          '^/ntp': ''
        }
      },
      '/css': {
        target: process.env.VUE_APP_THEME,
        changeOrigin: true,
        pathRewrite: {
          '^/css': ''
        }
      }
    }
  },
  assetsDir: 'static',
  publicPath: '/',
  productionSourceMap: false,
  lintOnSave: false,
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
