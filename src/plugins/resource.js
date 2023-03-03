import logoSVG from '../assets/image/logo.svg'

export default {
  logoSVG,
  image: {
    avatar: '/css/img/avator.png'
  },
  domain: `.${process.env.VUE_APP_DESIGN_DOMAIN}`,
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
