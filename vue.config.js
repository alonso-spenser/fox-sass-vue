process.env.AppVersion = require('./package.json').version
const WebpackAlisunOss = require('webpack-aliyun-oss')
const loadOssCredentials = require('./scripts/oss-config')
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
  // transpileDependencies: [
  //   'vue-echarts',
  //   'resize-detector'
  // ],
  configureWebpack: (config) => {
    if (process.env.VUE_APP_SUPER === 'fox' || process.env.VUE_APP_SUPER === 'junen' || process.env.VUE_APP_SUPER === 'fomille') {
      let fun = []
      if (process.env.NODE_ENV === 'production') {
        const credentials = loadOssCredentials(process.env.VUE_APP_SUPER)
        fun.push(new WebpackAlisunOss({
          // 上传那个文件或文件夹  可以是字符串或数组
          from: ['./dist/**', '!**.map'],
          // 需要上传到oss上的给定文件目录
          dist: '/',
          region: process.env.VUE_APP_OSS_REGION,
          accessKeyId: credentials.accessKeyId,
          accessKeySecret: credentials.accessKeySecret,
          bucket: process.env.VUE_APP_OSS_BUCKET,
          setOssPath: filePath => {
            let index = filePath.lastIndexOf('dist')
            let Path = filePath.substring(index + 4, filePath.length)
            return Path.replace(/\\/g, '/')
          },
          setHeaders: filePath => {
            return {
              'Cache-Control': 'max-age=31536000'
            }
          }
        }))
      }
      config.plugins = [...config.plugins, ...fun]
    }
  }
}
