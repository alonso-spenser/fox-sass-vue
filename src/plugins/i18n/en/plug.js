import appRanking from './app.ranking'
import appRefresher from './app.refresher'
import appCustoms from './app.customs'

export default {
  title: 'App marketplace',
  content: 'Use professional tools from the app marketplace to improve website content, SEO, and conversions',
  refresher: {
    name: 'Automatic content refresh',
    active: 'Automatic updates',
    inactive: 'Default order'
  },
  owen: 'My apps',
  market: 'App marketplace',
  empty: {
    heading: 'You have not subscribed to any apps',
    market: 'App marketplace',
    subscribe: 'Subscribe'
  },
  status: {
    active: 'In use',
    inactive: 'Disable',
    enable: 'Enable app',
    open: 'Open app',
    disable: 'Disable app'
  },
  app: { ...appCustoms, ...appRefresher, ...appRanking }
}
