'use strict'
import axios from 'axios'
import router from '../../router'
import passport from '../passport'
import i18n from '../../plugins/i18n/base'
import { Message } from 'element-ui'
import utility from './../utility'

axios.defaults.headers.post['Content-Type'] = 'application/json'
const http = axios.create({
  baseURL: utility.apiURL()
})
/**
 * 请求拦截器
 */

http.interceptors.request.use(
  (config) => {
    let admin = router.currentRoute.fullPath.indexOf('/main') === 0
    config.headers.version = '0.0.1'
    config.headers.timestamp = new Date().getTime()
    config.headers['fo-os'] = 0
    config.headers['fo-app'] = admin ? 3000 : 1000
    config.headers['fo-platform'] = '1400692472106991622'
    config.headers['fo-agent'] = '1400691824514842630'
    config.headers['fo-token'] = passport.token(admin)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
http.interceptors.response.use(
  (response) => {
    if (response.data.code === 13010000) {
      let admin = router.currentRoute.fullPath.indexOf('/main') === 0
      router.push({
        path: `${admin ? '/main' : ''}/passport`,
        query: {
          // redirect: router.currentRoute.fullPath
        }
      }).then(() => {
      })
    }
    return response.data
  },
  (error) => {
    Message({
      type: 'error',
      message: i18n.t('errorCode.networkError').toString()
    })
    return Promise.reject(error)
  }
)

export default http
