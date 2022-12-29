import cnAppRanking from './app.ranking'
import cnAppRefresher from './app.refresher'
import cnAppCustoms from './app.customs'
export default {
  title: '应用市场',
  content: '利用应用市场提供的专业工具，来提升完善网站内容、改善SEO品质，以达到更好的转换效果。',
  refresher: {
    name: '网页内容自动刷新',
    active: '自动更新',
    inactive: '正常排序'
  },
  owen: '我的应用',
  market: '应用市场',
  empty: {
    heading: '您尚未订阅任何应用',
    market: '应用市场',
    subscribe: '订阅'
  },
  status: {
    active: '使中用',
    inactive: '停用',
    enable: '启用应用',
    open: '打开应用',
    disable: '停用应用'
  },
  app: {
    ...cnAppCustoms,
    ...cnAppRefresher,
    ...cnAppRanking
  }
}
