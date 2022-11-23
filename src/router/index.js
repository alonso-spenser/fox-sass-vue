import Vue from 'vue'
import Router from 'vue-router'
import PassportRouter from '../layout/passport-router'
import blankRouter from '../layout/blank-router'
import accountLayout from '../views/account/layout'
import i18n from '../plugins/i18n/base'
import lib from '../plugins/utility'
import store from '../store'
import checkPermission from '../plugins/permission'

Vue.use(Router)
const routes = [
  {
    path: '/startup',
    component: blankRouter,
    redirect: '/startup/create-site',
    name: 'startup',
    meta: {
      title: i18n.t('startup.title'),
      requireAuth: true
    },
    children: [
      {
        path: 'create-site',
        name: 'startup-create-site',
        meta: {
          siteType: [1, 2, 3, 4],
          requireAuth: true,
          title: i18n.t('startup.pageTitle'),
          crumbs: [
            {
              title: i18n.t('startup.pageTitle'),
              path: '/shop/shop'
            }
          ]
        },
        component: () => import('../views/startup/create-site')
      },
      {
        path: 'clone/:cloneId',
        name: 'startup-clone-site',
        component: () => import('../views/startup/clone.vue'),
        meta: {
          title: i18n.t('startup.clone.pageTitle'),
          siteType: [1, 2, 3, 4],
          header: false,
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/passport',
    component: PassportRouter,
    children: [
      {
        path: '',
        name: 'passport-login',
        component: () => import('../views/passport/index'),
        meta: {
          title: i18n.t('passport.login.pageTitle'),
          css: 'fixed'
        }
      },
      {
        path: 'login',
        name: 'passport-login-app',
        component: () => import('../views/passport/index'),
        meta: {
          title: i18n.t('passport.login.pageTitle'),
          css: 'fixed'
        }
      },
      {
        path: 'register',
        name: 'passport-register',
        component: () => import('../views/passport/register'),
        meta: {
          title: i18n.t('passport.register.pageTitle'),
          siteType: [1, 2, 3, 4],
          css: 'register'
        }
      },
      {
        path: 'forget',
        name: 'passport-forget',
        component: () => import('../views/passport/forget'),
        meta: {
          siteType: [1, 2, 3, 4],
          title: i18n.t('passport.forget.pageTitle')
        }
      },
      {
        path: 'email-send-success',
        name: 'passport-email-send-success',
        component: () => import('../views/passport/email-send-success'),
        meta: {
          siteType: [1, 2, 3, 4],
          title: i18n.t('passport.emailSendSuccess.pageTitle')
        }
      },
      {
        path: 'reset/:code/:key',
        name: 'passport-reset-password',
        component: () => import('../views/passport/reset'),
        meta: {
          siteType: [1, 2, 3, 4],
          title: i18n.t('passport.reset.pageTitle')
        }
      }
    ]
  },
  {
    path: '/account',
    component: accountLayout,
    name: 'account',
    meta: {
      requireAuth: true,
      siteType: [1, 2, 3, 4],
      title: i18n.t('merchant.paging.title')
    },
    children: [
      {
        path: '',
        name: 'account-dashboard',
        component: () => import('../views/account/index'),
        meta: {
          requireAuth: true,
          siteType: [1, 2, 3, 4],
          title: i18n.t('merchant.account.dashboard')
        }
      },
      {
        path: 'corp',
        name: 'account-corp',
        component: () => import('../views/account/corp'),
        meta: {
          editable: true,
          requireAuth: true,
          siteType: [1, 2, 3, 4],
          title: i18n.t('merchant.corp'),
          parent: {
            title: i18n.t('merchant.heading'),
            url: '/account/corp',
            previous: '/account'
          }
        }
      },
      {
        path: 'personal',
        name: 'account-personal',
        component: () => import('../views/account/personal'),
        meta: {
          requireAuth: true,
          siteType: [1, 2, 3, 4],
          editable: true,
          title: i18n.t('merchant.personal.title'),
          parent: {
            title: i18n.t('merchant.heading'),
            url: '/account/password',
            previous: '/account'
          }
        }
      },
      {
        path: 'role',
        name: 'account-role',
        component: () => import('../views/account/role'),
        meta: {
          requireAuth: true,
          editable: true,
          siteType: [1, 2, 3, 4],
          title: i18n.t('merchant.role.paging.title'),
          parent: {
            title: i18n.t('merchant.employee.paging.heading'),
            url: '/account/role',
            previous: '/account/employee'
          }
        }
      },
      {
        path: 'employee',
        name: 'account-employee',
        component: () => import('../views/account/employee'),
        meta: {
          requireAuth: true,
          siteType: [1, 2, 3, 4],
          editable: true,
          title: i18n.t('merchant.employee.paging.title'),
          parent: {
            title: i18n.t('merchant.heading'),
            url: '/account/password',
            previous: '/account'
          }
        }
      },
      {
        path: 'password',
        name: 'account-password',
        component: () => import('../views/account/password'),
        meta: {
          requireAuth: true,
          siteType: [1, 2, 3, 4],
          editable: true,
          title: i18n.t('merchant.password.title'),
          parent: {
            title: i18n.t('merchant.heading'),
            url: '/account/password',
            previous: '/account'
          }
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
  titles.push('Hey!MySite')
  // titles.push(store.state.agentModel.shortForm || store.state.agentModel.agentName)
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
