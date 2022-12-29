import logoSVG from '../assets/image/logo.svg'

export default {
  logoSVG,
  image: {
    avatar: '/theme/img/avator.png'
  },
  env: {
    api: {
      development: 'http://127.0.0.1:9721',
      production: 'https://api.6fox.com'
    },
    upload: {
      development: 'http://127.0.0.1:9721/common/api/oss/upload',
      production: 'https://api.6fox.com/common/api/oss/upload'
    },
    excelAddress: {
      development: 'http://127.0.0.1:9721/stat/api/report/submit-report',
      production: '/api/stat/api/report/submit-report'
    }
  },
  domain: '.11af.com',
  keepDomain: 'theme|verification|www|design|fomille|fomile|file|devin|jason|admin|console|agent|sass|shop|shopify|nginx|phone|jenkins|site|zabbix|nacos|code|test',
  /**
   * 信息类型
   */
  infoType: {
    article: 1,
    goods: 2,
    download: 3,
    custom: 9
  },
  /**
   * 资源类型
   */
  resourceType: {
    articleImage: 1,
    articleAttachment: 2,
    theme: 4,
    goodsVideo: 5,
    download: 9
  },
  /**
   * 文件类型
   */
  fileType: {}
}
