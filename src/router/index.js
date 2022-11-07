import Vue from 'vue'
import Router from 'vue-router'
import PassportRouter from '../layout/passport-router'
import i18n from '../plugins/i18n/base'
import lib from '../plugins/utility'
import store from '../store'
import checkPermission from '../plugins/permission'

Vue.use(Router)
const routes = [
  {
    path: '/passport',
    component: PassportRouter,
    children: [
      {
        path: '',
        name: 'passport-login',
        component: () => import('../views/passport/index'),
        meta: {
          css: 'fixed'
        }
      },
      {
        path: 'login',
        name: 'passport-login-app',
        component: () => import('../views/passport/index'),
        meta: {
          css: 'fixed'
        }
      }
    ]
  },
  {
    path: '*',
    name: 'all-not-found',
    redirect: '/404'
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

/**
 * 排除浏览器验证路由
 * @type {string[]}
 */
const excludeRouters = [
  'agreement-major-browser',
  'passport-register',
  'agreement-desktop-browser'
]
/**
 * 主流浏览器
 * @type {*|boolean}
 */
const majorBrowser = lib.majorBrowser()

/**
 * 移动浏览器
 * @type {*|boolean}
 */
const mobileBrowser = lib.mobile()
/**
 * 鉴权
 */

router.beforeEach((to, from, next) => {
  setTitle(to.meta)
  // console.log(to.name)
  if (mobileBrowser) {
    if (excludeRouters.indexOf(to.name) === -1) {
      next({
        path: '/agreement/desktop-browser'
      })
    } else {
      next()
    }
  } else if (!majorBrowser && to.name !== 'agreement-major-browser') {
    next({
      path: '/agreement/major-browser',
      query: {
        redirect: to.fullPath
      }
    })
  } else if (to.meta['requireAuth']) {
    if (store.state.merchantModel && lib.isNotEmpty(store.state.merchantModel.token)) {
      if (checkPermission([to.name])) {
        next()
      } else {
        next({
          path: '/404',
          query: {
            redirect: to.fullPath
          }
        })
      }
    } else {
      next({
        path: '/passport',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

/**
 * 设置页面标题
 * @param meta
 */
const setTitle = (meta) => {
  const titles = []
  if (lib.isNotEmpty(meta.title)) {
    titles.push(meta.title)
  }
  if (meta.parent && meta.parent.title && titles.indexOf(meta.parent.title) === -1) {
    titles.push(meta.parent.title)
  }
  titles.push(i18n.t('title'))
  document.title = titles.join('-')
}

router.onError((error) => {
  console.log('router error', error)
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})

let s = []
s.push('DELETE FROM security_function WHERE app_type = 7000;')
routes.forEach((o) => {
  let pid = `7000${o.name}`
  if (o.meta && o.meta.requireAuth !== undefined && o.meta.requireAuth === true) {
    s.push(`INSERT INTO security_function (id, app_type, function_code, function_name, parent_id, router_name ) VALUES('7000${o.name}', 7000, '${o.name}', '${(o.meta && o.meta.title) || ''}', '0', '' );`)
    if (o.children && typeof (o.children) === 'object') {
      o.children.forEach((sb) => {
        if (sb.meta.children) {
          sb.meta.children.forEach((m) => {
            s.push(`INSERT INTO security_function ( id, app_type, function_code, function_name, parent_id, router_name ) VALUES('7000${m.name}', 7000, '${m.name}', '${m.title}', '${pid}', '' );`)
          })
        }
        if (sb.meta && sb.meta.requireAuth === true) {
          s.push(`INSERT INTO security_function ( id, app_type, function_code, function_name, parent_id, router_name ) VALUES('7000${sb.name}', 7000, '${sb.name}', '${(sb.meta && sb.meta.title) || ''}', '${pid}', '' );`)
          if (sb.children && sb.children.length > 0) {
            sb.children.forEach((sbb) => {
              if (sbb.meta && sbb.meta.requireAuth === true) {
                s.push(`INSERT INTO security_function ( id, app_type, function_code, function_name, parent_id, router_name ) VALUES('7000${sbb.name}', 7000, '${sbb.name}', '${(sbb.meta && sbb.meta.title) || ''}', '${pid}', '' );`)
              }
            })
          }
        }
      })
    }
  }
})
// console.log(s.join('\n'))
export default router
