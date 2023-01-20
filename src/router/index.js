import Vue from 'vue'
import Router from 'vue-router'
import mainRouter from '../views/main/layout/router'
import blankRouter from '../layout/blank-router'
import layout from '../layout/index'
import accountLayout from '../views/account/layout'
import i18n from '../plugins/i18n/base'
import lib from '../plugins/utility'
import checkPermission from '../plugins/permission'

Vue.use(Router)
const routes = [
  {
    path: '/',
    component: layout,
    redirect: '/dashboard',
    name: 'dashboard',
    meta: {
      siteType: [1, 2, 3, 4],
      title: '首页',
      requireAuth: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard-startup',
        meta: {
          siteType: [1, 2, 3, 4],
          sidebar: true,
          header: true,
          title: i18n.t('dashboard.title'),
          requireAuth: true
        },
        component: () => import('../views/app/site/analytics/dashboard/index')
      },
      {
        path: 'owned',
        name: 'dashboard-site',
        component: () => import('../views/app/site/owned'),
        meta: {
          siteType: [1, 2, 3, 4],
          title: i18n.t('site.dashboard.title'),
          sidebar: true,
          header: true,
          requireAuth: true
        }
      }
    ]
  },
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
    component: layout,
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
    path: '/site/:siteId',
    component: layout,
    name: 'site',
    redirect: '/site/:siteId/owned',
    meta: {
      siteType: [1, 2, 3, 4],
      title: i18n.t('site.title'),
      requireAuth: true
    },
    children: [
      {
        path: 'analytics',
        name: 'site-analytics',
        meta: {
          siteType: [1, 2, 3, 4],
          sidebar: true,
          header: true,
          requireAuth: true,
          title: i18n.t('dashboard.analytics.title')
        },
        component: () => import('../views/app/site/analytics/data')
      },
      {
        path: 'analytics/ga',
        name: 'site-analytics-ga-bind',
        meta: {
          siteType: [1, 2, 3, 4],
          sidebar: true,
          header: true,
          requireAuth: true,
          title: i18n.t('dashboard.ga.title'),
          parent: {
            title: i18n.t('dashboard.analytics.title'),
            url: '/site/:siteId:/analytics',
            previous: '/site/:siteId:/analytics'
          }
        },
        component: () => import('../views/app/site/analytics/ga')
      },
      {
        path: 'goods',
        name: 'site-goods',
        component: () => import('../views/app/site/goods/index'),
        meta: {
          siteType: [3, 4],
          title: i18n.t('goods.paging.title'),
          sidebar: true,
          header: true,
          requireAuth: true,
          parent: {
            title: i18n.t('goods.paging.title'),
            url: '/site/:siteId:/goods'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            }
          ]
        }
      },
      {
        path: 'goods/add',
        name: 'site-goods-add',
        component: () => import('../views/app/site/goods/update'),
        meta: {
          siteType: [3, 4],
          sidebar: true,
          header: true,
          requireAuth: true,
          title: i18n.t('goods.update.addTitle'),
          parent: {
            title: i18n.t('goods.paging.title'),
            url: '/site/:siteId:/goods',
            previous: '/site/:siteId:/goods'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            },
            {
              title: i18n.t('goods.paging.title'),
              path: '/site/:siteId:/goods'
            }
          ]
        }
      },
      {
        path: 'goods/update/:id',
        name: 'site-goods-update',
        component: () => import('../views/app/site/goods/update'),
        meta: {
          siteType: [3, 4],
          sidebar: true,
          header: true,
          requireAuth: true,
          title: i18n.t('goods.update.updateTitle'),
          parent: {
            title: i18n.t('goods.paging.title'),
            url: '/site/:siteId:/goods',
            previous: '/site/:siteId:/goods'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            },
            {
              title: i18n.t('goods.paging.title'),
              path: '/site/:siteId:/goods'
            }
          ]
        }
      },
      {
        path: 'goods/variant/:spuId',
        name: 'site-goods-variant-add',
        component: () => import('../views/app/site/goods/variant/index'),
        meta: {
          siteType: [3, 4],
          sidebar: true,
          header: true,
          requireAuth: true,
          title: i18n.t('goods.variant.add'),
          parent: {
            title: i18n.t('goods.variant.title'),
            url: '/site/:siteId:/goods',
            previous: '/site/:siteId:/goods/update/:spuId:'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            },
            {
              title: i18n.t('goods.paging.title'),
              path: '/site/:siteId:/goods'
            },
            {
              title: i18n.t('goods.variant.title'),
              path: '/site/:siteId:/goods/update/:spuId:'
            }
          ]
        }
      },
      {
        path: 'goods/variant/:spuId/:skuId',
        name: 'site-goods-variant-update',
        component: () => import('../views/app/site/goods/variant/index'),
        meta: {
          siteType: [3, 4],
          sidebar: true,
          header: true,
          requireAuth: true,
          title: i18n.t('goods.variant.updateTitle'),
          parent: {
            title: i18n.t('goods.variant.title'),
            url: '/site/:siteId:/goods',
            previous: '/site/:siteId:/goods/update/:spuId:'
          },
          crumbs: [
            {
              title: i18n.t('goods.variant.title'),
              path: '/:siteId:/goods/update/:spuId:'
            }
          ]
        }
      },
      {
        path: 'settings',
        component: () => import('../views/app/site/settings/index'),
        name: 'site-settings',
        meta: {
          siteType: [1, 2, 3, 4],
          sidebar: true,
          header: true,
          title: i18n.t('settings.heading'),
          requireAuth: true
        },
        children: [
          {
            path: '',
            name: 'site-setting-general',
            component: () => import('../views/app/site/settings/general'),
            meta: {
              siteType: [1, 2, 3, 4],
              sidebar: true,
              header: true,
              requireAuth: true,
              title: i18n.t('settings.title'),
              parent: {
                title: i18n.t('goods.variant.title'),
                url: '/site/:siteId:/settings'
              },
              crumbs: [
                {
                  title: i18n.t('site.dashboard.title'),
                  path: '/site/:siteId:/dashboard'
                }
              ]
            }
          },
          {
            path: 'domain',
            name: 'site-setting-domain',
            component: () => import('../views/app/site/settings/domain'),
            meta: {
              siteType: [1, 2, 3, 4],
              sidebar: true,
              header: true,
              requireAuth: true,
              title: i18n.t('settings.domain.title'),
              parent: {
                title: i18n.t('settings.heading'),
                url: '/site/:siteId:/domain',
                previous: '/site/:siteId:/settings/'
              }
            }
          },
          {
            path: 'domain/connect',
            name: 'site-setting-domain-connect',
            component: () => import('../views/app/site/settings/domain/connect'),
            meta: {
              siteType: [1, 2, 3, 4],
              sidebar: true,
              header: true,
              requireAuth: true,
              title: i18n.t('settings.connect.paging.title'),
              parent: {
                title: i18n.t('settings.domain.title'),
                url: '/site/:siteId:/settings',
                previous: '/site/:siteId:/settings/domain'
              },
              crumbs: [
                {
                  title: i18n.t('site.dashboard.title'),
                  path: '/site/:siteId:/dashboard'
                },
                {
                  title: i18n.t('settings.domain.title'),
                  path: '/site/:siteId:/settings/domain'
                }
              ]
            }
          },
          {
            path: 'legal',
            name: 'site-setting-legal',
            component: () => import('../views/app/site/settings/legal'),
            meta: {
              siteType: [1, 2, 3, 4],
              sidebar: true,
              header: true,
              requireAuth: true,
              parent: '/site/:siteId:/dashboard',
              title: i18n.t('settings.legal.paging.title'),
              crumbs: [
                {
                  title: i18n.t('site.dashboard.title'),
                  path: '/site/:siteId:/dashboard'
                }
              ]
            }
          },
          {
            path: 'tracking',
            name: 'site-setting-tracking',
            component: () => import('../views/app/site/settings/tracking'),
            meta: {
              siteType: [1, 2, 3, 4],
              sidebar: true,
              header: true,
              requireAuth: true,
              parent: '/site/:siteId:/dashboard',
              title: i18n.t('settings.tracking.paging.title'),
              crumbs: [
                {
                  title: i18n.t('site.dashboard.title'),
                  path: '/site/:siteId:/dashboard'
                }
              ]
            }
          },
          {
            path: 'route',
            name: 'site-setting-route',
            component: () => import('../views/app/site/settings/route'),
            meta: {
              siteType: [1, 2, 3, 4],
              sidebar: true,
              header: true,
              requireAuth: true,
              parent: '/site/:siteId:/dashboard',
              title: i18n.t('settings.route.paging.title'),
              crumbs: [
                {
                  title: i18n.t('site.dashboard.title'),
                  path: '/site/:siteId:/dashboard'
                }
              ]
            }
          }
        ]
      },
      {
        path: 'settings/lang',
        name: 'site-settings-lang',
        component: () => import('../views/app/site/settings/lang'),
        meta: {
          siteType: [3, 4],
          sidebar: true,
          header: true,
          requireAuth: true,
          title: i18n.t('site.lang.title'),
          // parent: '/:siteId:/goods',
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            }
          ]
        }
      },
      {
        path: 'masterplate',
        name: 'site-masterplate',
        component: () => import('../views/app/site/masterplate/index'),
        meta: {
          siteType: [1, 2, 3, 4],
          sidebar: true,
          header: true,
          requireAuth: true,
          title: i18n.t('site.theme.owned.heading'),
          parent: {
            title: i18n.t('site.dashboard.title'),
            url: '/site/:siteId:/masterplate',
            previous: '/owned'
          }
        }
      },
      // {
      //   path: 'order',
      //   name: 'mall-order-paging',
      //   component: () => import('../views/app/site/order/index'),
      //   meta: {
      //     siteType: [1, 2, 3, 4],
      //     sidebar: true,
      //     header: true,
      //     // requireAuth: true,
      //     title: i18n.t('goods.variant.updateTitle'),
      //     crumbs: [
      //       {
      //         title: i18n.t('goods.variant.title'),
      //         path: '/:siteId:/goods/update/:spuId:'
      //       }
      //     ]
      //   }
      // },
      // {
      //   path: 'order/item/:id',
      //   name: 'mall-order-paging-detail',
      //   component: () => import('../views/app/site/order/detail'),
      //   meta: {
      //     siteType: [1, 2, 3, 4],
      //     sidebar: true,
      //     header: true,
      //     // requireAuth: true,
      //     title: i18n.t('goods.variant.updateTitle'),
      //     crumbs: [
      //       {
      //         title: i18n.t('goods.variant.title'),
      //         path: '/:siteId:/goods/update/:spuId:'
      //       }
      //     ]
      //   }
      // },
      {
        path: 'article',
        name: 'site-article',
        component: () => import('../views/app/site/article/index'),
        meta: {
          siteType: [3, 4],
          title: i18n.t('article.paging.title'),
          sidebar: true,
          header: true,
          requireAuth: true,
          parent: {
            title: i18n.t('article.paging.title'),
            url: '/site/:siteId:/article'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            }
          ]
        }
      },
      {
        path: 'article/add',
        name: 'site-article-add',
        component: () => import('../views/app/site/article/update'),
        meta: {
          siteType: [3, 4],
          sidebar: true,
          header: true,
          requireAuth: true,
          title: i18n.t('article.update.addTitle'),
          parent: {
            title: i18n.t('article.paging.title'),
            url: '/site/:siteId:/article',
            previous: '/site/:siteId:/article'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            },
            {
              title: i18n.t('article.paging.title'),
              path: '/site/:siteId:/article'
            }
          ]
        }
      },
      {
        path: 'article/update/:id',
        name: 'site-article-update',
        component: () => import('../views/app/site/article/update'),
        meta: {
          siteType: [3, 4],
          sidebar: true,
          header: true,
          requireAuth: true,
          title: i18n.t('article.update.updateTitle'),
          parent: {
            title: i18n.t('article.paging.title'),
            url: '/site/:siteId:/article',
            previous: '/site/:siteId:/article'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            },
            {
              title: i18n.t('article.paging.title'),
              path: '/site/:siteId:/article'
            }
          ]
        }
      },
      {
        path: ':collectionType/collection',
        name: 'site-article-collection',
        component: () => import('../views/app/site/article/collection/index.vue'),
        meta: {
          siteType: [3, 4],
          title: i18n.t('article.collection.paging.title'),
          sidebar: true,
          header: true,
          requireAuth: true,
          parent: {
            title: i18n.t('article.collection.all'),
            url: '/site/:siteId:/:collectionType:/collection',
            previous: ''
          }
        }
      },
      {
        path: ':collectionType/collection/add',
        name: 'site-article-collection-add',
        component: () => import('../views/app/site/article/collection/update.vue'),
        meta: {
          siteType: [3, 4],
          sidebar: true,
          header: true,
          requireAuth: true,
          title: i18n.t('article.collection.update.addTitle'),
          parent: {
            title: i18n.t('article.collection.all'),
            url: '/site/:siteId:/:collectionType:/collection',
            previous: '/site/:siteId:/:collectionType:/collection'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            },
            {
              title: i18n.t('article.paging.title'),
              path: '/site/:siteId:/article'
            }
          ]
        }
      },
      {
        path: ':collectionType/collection/update/:id',
        name: 'site-article-collection-update',
        component: () => import('../views/app/site/article/collection/update.vue'),
        meta: {
          siteType: [3, 4],
          sidebar: true,
          header: true,
          requireAuth: true,
          title: i18n.t('article.collection.update.updateTitle'),
          // parent: '/site/:siteId:/article/collection',
          parent: {
            title: i18n.t('article.collection.all'),
            url: '/site/:siteId:/:collectionType:/collection',
            previous: '/site/:siteId:/:collectionType:/collection'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            },
            {
              title: i18n.t('article.paging.title'),
              path: '/site/:siteId:/article'
            }
          ]
        }
      },
      {
        path: ':tagType/tag',
        name: 'site-article-tag',
        component: () => import('../views/app/site/tag/index.vue'),
        meta: {
          siteType: [3, 4],
          title: i18n.t('article.tag.paging.title'),
          sidebar: true,
          header: true,
          requireAuth: true,
          parent: {
            title: i18n.t('article.tag.paging.title'),
            url: '/site/:siteId:/:tagType:'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            },
            {
              title: i18n.t('article.paging.title'),
              path: '/site/:siteId:/article'
            }
          ]
        }
      },
      {
        path: ':tagType/tag/add',
        name: 'site-article-tag-add',
        component: () => import('../views/app/site/tag/update.vue'),
        meta: {
          siteType: [3, 4],
          sidebar: true,
          header: true,
          requireAuth: true,
          title: i18n.t('article.tag.update.addTitle'),
          parent: {
            title: i18n.t('article.tag.paging.title'),
            url: '/site/:siteId:/:tagType:'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            },
            {
              title: i18n.t('article.paging.title'),
              path: '/site/:siteId:/article'
            },
            {
              title: i18n.t('article.tag.paging.title'),
              path: '/site/:siteId:/:tagType:/tag'
            }
          ]
        }
      },
      {
        path: ':tagType/tag/update/:id',
        name: 'site-article-tag-update',
        component: () => import('../views/app/site/tag/update.vue'),
        meta: {
          siteType: [3, 4],
          sidebar: true,
          header: true,
          requireAuth: true,
          title: i18n.t('article.tag.update.updateTitle'),
          parent: {
            title: i18n.t('article.tag.paging.title'),
            url: '/site/:siteId:/:tagType:',
            previous: '/site/:siteId:/:tagType:/tag'
          }
        }
      },
      {
        path: 'download',
        name: 'site-download',
        component: () => import('../views/app/site/download/index'),
        meta: {
          siteType: [3, 4],
          title: i18n.t('download.paging.title'),
          sidebar: true,
          header: true,
          requireAuth: true,
          parent: '/site/:siteId:/download',
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            }
          ]
        }
      },
      {
        path: 'download/add',
        name: 'site-download-add',
        component: () => import('../views/app/site/download/add'),
        meta: {
          siteType: [3, 4],
          sidebar: true,
          header: true,
          requireAuth: true,
          title: i18n.t('site.resource.update.addTitle'),
          parent: {
            title: i18n.t('site.resource.paging.title'),
            url: '/site/:siteId:/download',
            previous: '/site/:siteId:/download'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            },
            {
              title: i18n.t('site.resource.paging.title'),
              path: '/site/:siteId:/download'
            }
          ]
        }
      },
      {
        path: 'download/update/:id',
        name: 'site-download-update',
        component: () => import('../views/app/site/download/update'),
        meta: {
          siteType: [3, 4],
          sidebar: true,
          header: true,
          requireAuth: true,
          title: i18n.t('site.resource.update.updateTitle'),
          parent: {
            title: i18n.t('site.resource.paging.title'),
            url: '/site/:siteId:/download',
            previous: '/site/:siteId:/download'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            },
            {
              title: i18n.t('site.resource.paging.title'),
              path: '/site/:siteId:/download'
            }
          ]
        }
      },
      {
        path: 'enquiry',
        name: 'site-enquiry-record',
        component: () => import('../views/app/enquiry/record'),
        meta: {
          siteType: [1, 2, 3, 4],
          header: true,
          sidebar: true,
          requireAuth: true,
          title: i18n.t('enquiry.record.title'),
          parent: {
            // title: i18n.t('enquiry.record.title'),
            url: '/site/:siteId:/enquiry',
            previous: '/site/:siteId:/enquiry'
          }
        }
      },
      {
        path: 'enquiry/record/:id',
        name: 'site-enquiry-record-update',
        component: () => import('../views/app/enquiry/record/update'),
        meta: {
          siteType: [1, 2, 3, 4],
          header: true,
          sidebar: true,
          requireAuth: true,
          title: i18n.t('enquiry.recordDetails.title'),
          parent: {
            title: i18n.t('enquiry.record.title'),
            url: '/site/:siteId:/enquiry',
            previous: '/site/:siteId:/enquiry'
          },
          crumbs: [
            {
              title: i18n.t('enquiry.record.title'),
              path: '/site/:siteId:/enquiry/record'
            }
          ]
        }
      },
      {
        path: 'enquiry/email',
        name: 'site-enquiry-email',
        component: () => import('../views/app/enquiry/email'),
        meta: {
          siteType: [1, 2, 3, 4],
          header: true,
          sidebar: true,
          requireAuth: true,
          title: i18n.t('enquiry.email.title'),
          parent: {
            title: i18n.t('enquiry.record.title'),
            url: '/site/:siteId:/enquiry/form',
            previous: '/site/:siteId:/enquiry'
          }
        }
      },
      {
        path: 'enquiry/form',
        name: 'site-enquiry-form',
        component: () => import('../views/app/enquiry/fom'),
        meta: {
          siteType: [1, 2, 3, 4],
          header: true,
          sidebar: true,
          requireAuth: true,
          title: i18n.t('enquiry.form.title'),
          parent: {
            title: i18n.t('enquiry.record.title'),
            url: '/site/:siteId:/enquiry/form',
            previous: '/site/:siteId:/enquiry'
          }
        }
      },
      {
        path: 'enquiry/form/add',
        name: 'site-enquiry-form-add',
        component: () => import('../views/app/enquiry/fom/update'),
        meta: {
          siteType: [1, 2, 3, 4],
          title: i18n.t('enquiry.form.updateForm.addForm'),
          header: true,
          sidebar: true,
          requireAuth: true,
          parent: {
            title: i18n.t('enquiry.form.title'),
            url: '/site/:siteId:/enquiry/form',
            previous: '/site/:siteId:/enquiry/form'
          },
          crumbs: [
            {
              title: i18n.t('enquiry.form.title'),
              path: '/site/:siteId:/enquiry/form'
            }
          ]
        }
      },
      {
        path: 'enquiry/form/:id',
        name: 'site-enquiry-form-detail',
        component: () => import('../views/app/enquiry/fom/update'),
        meta: {
          siteType: [1, 2, 3, 4],
          requireAuth: true,
          title: i18n.t('enquiry.form.updateForm.editForm'),
          header: true,
          sidebar: true,
          parent: {
            title: i18n.t('enquiry.form.title'),
            url: '/site/:siteId:/enquiry/form',
            previous: '/site/:siteId:/enquiry/form'
          },
          crumbs: [
            {
              title: i18n.t('enquiry.form.title'),
              path: '/site/:siteId:/enquiry/form'
            }
          ]
        }
      },
      {
        path: 'navigation',
        name: 'site-navigation',
        component: () => import('../views/app/site/navigation'),
        meta: {
          siteType: [1, 2, 3, 4],
          title: i18n.t('navigation.paging.title'),
          header: true,
          sidebar: true,
          requireAuth: true,
          parent: '/site/:siteId:/navigation',
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            }
          ]
        }
      },
      {
        path: 'navigation/:menuType/update',
        name: 'site-navigation-update',
        component: () => import('../views/app/site/navigation/update'),
        meta: {
          requireAuth: true,
          siteType: [1, 2, 3, 4],
          title: i18n.t('navigation.navigationUpdate.paging.title'),
          header: true,
          sidebar: true,
          parent: {
            title: i18n.t('navigation.paging.title'),
            url: '/site/:siteId:/navigation',
            previous: '/site/:siteId:/navigation'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            },
            {
              title: i18n.t('navigation.paging.title'),
              path: '/site/:siteId:/navigation/'
            }
          ]
        }
      },
      {
        path: 'pages',
        name: 'site-page',
        component: () => import('../views/app/site/pages'),
        meta: {
          requireAuth: true,
          siteType: [3, 4],
          header: true,
          sidebar: true,
          title: i18n.t('customizePage.paging.title'),
          parent: {
            title: i18n.t('customizePage.paging.title'),
            url: '/site/:siteId:/pages'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            }
          ]
        }
      },
      {
        path: 'pages/add',
        name: 'site-page-add',
        component: () => import('../views/app/site/pages/update'),
        meta: {
          requireAuth: true,
          siteType: [3, 4],
          title: i18n.t('customizePage.update.addTitle'),
          header: true,
          sidebar: true,
          parent: {
            title: i18n.t('customizePage.paging.title'),
            url: '/site/:siteId:/pages',
            previous: '/site/:siteId:/pages'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            },
            {
              title: i18n.t('customizePage.paging.title'),
              path: '/site/:siteId:/pages/'
            }
          ]
        }
      },
      {
        path: 'pages/:id',
        name: 'site-page-update',
        component: () => import('../views/app/site/pages/update'),
        meta: {
          requireAuth: true,
          siteType: [3, 4],
          title: i18n.t('customizePage.update.updateTitle'),
          header: true,
          sidebar: true,
          parent: {
            title: i18n.t('customizePage.paging.title'),
            url: '/site/:siteId:/pages',
            previous: '/site/:siteId:/pages'
          },
          crumbs: [
            {
              title: i18n.t('site.dashboard.title'),
              path: '/site/:siteId:/dashboard'
            },
            {
              title: i18n.t('customizePage.paging.title'),
              path: '/site/:siteId:/pages/'
            }
          ]
        }
      },
      {
        path: 'client',
        name: 'site-client',
        component: () => import('../views/app/site/client'),
        meta: {
          requireAuth: true,
          siteType: [1, 2, 3, 4],
          title: i18n.t('client.paging.title'),
          header: true,
          sidebar: true,
          parent: {
            title: i18n.t('client.paging.title'),
            url: '/site/:siteId:/client'
          }
        }
      },
      {
        path: 'client/update/:id',
        name: 'site-client-update',
        component: () => import('../views/app/site/client/update'),
        meta: {
          requireAuth: true,
          siteType: [1, 2, 3, 4],
          title: i18n.t('client.update.title'),
          header: true,
          sidebar: true,
          parent: {
            title: i18n.t('client.paging.title'),
            url: '/site/:siteId:/client',
            previous: '/site/:siteId:/client'
          },
          crumbs: [
            {
              title: i18n.t('client.paging.title'),
              path: '/site/:siteId:/client/'
            }
          ]
        }
      },
      {
        path: 'report',
        name: 'site-statement',
        component: () => import('../views/app/site/statement'),
        meta: {
          title: i18n.t('site.statement.title'),
          header: true,
          sidebar: true,
          siteType: [1, 2, 3, 4],
          requireAuth: true,
          parent: {
            title: i18n.t('client.paging.title'),
            url: '/site/:siteId:/report'
          }
        }
      },
      {
        path: 'ranking',
        name: 'site-ranking',
        component: () => import('../views/app/ranking'),
        meta: {
          requireAuth: true,
          siteType: [1, 2, 3, 4],
          header: true,
          sidebar: true,
          title: i18n.t('app.ranking.title')
        }
      },
      {
        path: 'optimize',
        name: 'site-optimize',
        component: () => import('../views/app/site/optimize'),
        meta: {
          siteType: [1, 2, 3, 4],
          header: true,
          sidebar: true,
          requireAuth: true,
          title: i18n.t('seo.paging.title'),
          parent: {
            title: i18n.t('site.dashboard.title'),
            url: '/site/:siteId:/optimize',
            previous: '/owned'
          }
        }
      },
      {
        path: 'collect',
        name: 'collect-spider',
        component: () => import('../views/app/site/collect/spider'),
        meta: {
          exclude: true,
          siteType: [3, 4],
          sidebar: true,
          header: true,
          // requireAuth: true,
          title: i18n.t('collect.rule.update.article'),
          parent: {
            title: i18n.t('article.paging.title'),
            url: '/site/:siteId:/article',
            previous: '/site/:siteId:/article'
          }
        }
      },
      {
        path: 'collect/alibaba',
        name: 'collect-spider-alibaba',
        component: () => import('../views/app/site/collect/alibaba'),
        meta: {
          exclude: true,
          siteType: [3, 4],
          sidebar: true,
          header: true,
          // requireAuth: true,
          title: i18n.t('collect.alibaba.title'),
          parent: {
            title: i18n.t('article.paging.title'),
            url: '/site/:siteId:/article',
            previous: '/site/:siteId:/article'
          }
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
    path: '/main',
    component: mainRouter,
    name: 'main',
    meta: {
      title: i18n.t('backstage.base.title')
    },
    children: [
      {
        path: '',
        name: 'main-dashboard',
        component: () => import('../views/main/index'),
        meta: {
          title: i18n.t('passport.login.pageTitle')
        }
      },
      {
        path: 'passport',
        name: 'main-passport-login',
        component: () => import('../views/main/passport/index'),
        meta: {
          title: i18n.t('passport.login.pageTitle'),
          css: 'fixed'
        }
      },
      {
        path: 'base/google-api',
        name: 'main-site-google-api',
        component: () => import('../views/main/base/google-api/index.vue'),
        meta: {
          title: i18n.t('googleApi.paging.title'),
          // requireAuth: true,
          parent: {
            title: i18n.t('googleApi.paging.title'),
            url: '/main/base/google-api',
            previous: ''
          }
        }
      },
      {
        path: 'base/support',
        name: 'main-base-support',
        component: () => import('../views/main/base/support/index'),
        meta: {
          title: '帮助文档',
          requireAuth: true,
          parent: {
            // title: i18n.t('core.base.lang.paging.title'),
            url: '/main/base/support',
            previous: '/main/base/support'
          }
        }
      },
      {
        path: 'base/lang',
        name: 'main-base-lang',
        component: () => import('../views/main/base/lang/index.vue'),
        meta: {
          title: i18n.t('core.base.lang.paging.title'),
          aside: true,
          header: true,
          container: true,
          requireAuth: true,
          parent: {
            // title: i18n.t('core.base.lang.paging.title'),
            url: '/main/base/lang',
            previous: '/main/base/lang'
          }
        }
      },
      {
        path: 'base/lang/add',
        name: 'main-base-lang-add',
        component: () => import('../views/main/base/lang/update.vue'),
        meta: {
          aside: true,
          header: true,
          container: true,
          requireAuth: true,
          title: i18n.t('core.base.lang.update.addTitle'),
          parent: {
            title: i18n.t('core.base.lang.paging.title'),
            url: '/main/base/lang',
            previous: '/main/base/lang'
          },
          crumbs: [
            {
              title: i18n.t('core.base.lang.paging.title'),
              path: '/main/base/lang'
            }
          ]
        }
      },
      {
        path: 'base/lang/update/:id',
        name: 'main-base-lang-update',
        component: () => import('../views/main/base/lang/update.vue'),
        meta: {
          aside: true,
          header: true,
          container: true,
          requireAuth: true,
          title: i18n.t('core.base.lang.update.updateTitle'),
          parent: {
            title: i18n.t('core.base.lang.paging.title'),
            url: '/main/base/lang',
            previous: '/main/base/lang'
          },
          crumbs: [
            {
              title: i18n.t('core.base.lang.paging.title'),
              path: '/main/base/lang'
            }
          ]
        }
      },
      {
        path: 'base/security/function',
        name: 'main-security-function',
        component: () => import('../views/main/base/security/function'),
        meta: {
          aside: true,
          header: true,
          container: true,
          requireAuth: true,
          title: i18n.t('core.security.function.paging.title'),
          parent: {
            title: i18n.t('core.security.paging.title'),
            url: '/main/base/security/function',
            previous: ''
          }
        }
      },
      {
        path: 'base/security/function/:type',
        name: 'main-security-function-update',
        component: () => import('../views/main/base/security/function/update'),
        meta: {
          aside: true,
          header: true,
          container: true,
          requireAuth: true,
          title: i18n.t('core.security.function.update.title'),
          parent: {
            title: i18n.t('core.security.function.paging.title'),
            url: '/main/base/security/function',
            previous: '/main/base/security/function'
          }
        }
      },
      {
        path: 'base/ip',
        name: 'main-ip',
        component: () => import('../views/main/base/ip/index'),
        meta: {
          requireAuth: true,
          title: i18n.t('backstage.ip.paging.title'),
          parent: {
            title: i18n.t('backstage.ip.paging.title'),
            url: '/main/base/ip',
            previous: ''
          }
        }
      },
      {
        path: 'base/ip/add',
        name: 'main-ip-add',
        component: () => import('../views/main/base/ip/update'),
        meta: {
          requireAuth: true,
          title: i18n.t('backstage.ip.update.addTitle'),
          parent: {
            title: i18n.t('backstage.ip.paging.title'),
            url: '/main/base/ip',
            previous: '/main/base/ip'
          }
        }
      },
      {
        path: 'base/ip/update/:id',
        name: 'main-ip-update',
        component: () => import('../views/main/base/ip/update'),
        meta: {
          requireAuth: true,
          title: i18n.t('backstage.ip.update.updateTitle'),
          parent: {
            title: i18n.t('backstage.ip.paging.title'),
            url: '/main/base/ip',
            previous: '/main/base/ip'
          }
        }
      },
      {
        path: 'base/dict/creation/:alias',
        name: 'main-dict-creation',
        component: () => import('../views/main/base/dict/creation'),
        meta: {
          requireAuth: true,
          title: '批量添加',
          parent: {
            title: i18n.t('core.title'),
            url: '/dict/:alias:',
            previous: '/client'
          }
        }
      },
      {
        path: 'masterplate/tag',
        name: 'theme-tag',
        component: () => import('../views/main/masterplate/tag/index.vue'),
        meta: {
          title: i18n.t('theme.tag.title'),
          requireAuth: true,
          parent: {
            title: i18n.t('theme.paging.title'),
            url: '/main/masterplate/tag',
            previous: '/main/masterplate'
          },
          crumbs: [
            {
              title: i18n.t('theme.paging.title'),
              path: '/main/masterplate'
            }
          ]
        }
      },
      {
        path: 'masterplate/element-tag',
        name: 'theme-element-tag',
        component: () => import('../views/main/masterplate/section-tag/index.vue'),
        meta: {
          title: i18n.t('theme.sectionTag.title'),
          requireAuth: true,
          parent: {
            title: i18n.t('theme.section.paging.title'),
            url: '/main/masterplate/element-tag',
            previous: '/main/masterplate/section'
          },
          crumbs: [
            {
              title: i18n.t('theme.paging.title'),
              path: '/main/masterplate'
            }
          ]
        }
      },
      {
        path: 'masterplate',
        name: 'theme-masterplate',
        component: () => import('../views/main/masterplate/index.vue'),
        meta: {
          title: i18n.t('theme.paging.title'),
          requireAuth: true,
          parent: {
            title: i18n.t('theme.section.paging.title'),
            url: '/main/masterplate',
            previous: '/main/masterplate/section'
          }
        }
      },
      {
        path: 'masterplate/page',
        name: 'theme-page',
        component: () => import('../views/main/masterplate/page/index.vue'),
        meta: {
          title: i18n.t('theme.page.paging.title'),
          requireAuth: true,
          parent: {
            title: i18n.t('theme.paging.title'),
            url: '/main/masterplate/page',
            previous: ''
          }
        }
      },
      {
        path: 'masterplate/page/add',
        name: 'theme-page-add',
        component: () => import('../views/main/masterplate/page/update.vue'),
        meta: {
          requireAuth: true,
          title: i18n.t('theme.page.update.addTitle'),
          parent: {
            title: i18n.t('theme.page.paging.title'),
            url: '/main/masterplate/page',
            previous: '/main/masterplate/page'
          }
        }
      },
      {
        path: 'masterplate/page/update/:id',
        name: 'theme-page-update',
        component: () => import('../views/main/masterplate/page/update.vue'),
        meta: {
          requireAuth: true,
          title: i18n.t('theme.page.update.updateTitle'),
          parent: '/main/masterplate/page',
          crumbs: [
            {
              title: i18n.t('theme.page.paging.title'),
              path: '/main/masterplate/page'
            }
          ]
        }
      },
      {
        path: 'masterplate/element',
        name: 'theme-element',
        component: () => import('../views/main/masterplate/section/index.vue'),
        meta: {
          title: i18n.t('theme.section.paging.title'),
          requireAuth: true
        }
      },
      {
        path: 'masterplate/element/add',
        name: 'theme-element-add',
        component: () => import('../views/main/masterplate/section/update.vue'),
        meta: {
          requireAuth: true,
          title: i18n.t('theme.section.update.addTitle'),
          parent: {
            title: i18n.t('theme.section.paging.title'),
            url: '/main/masterplate/element',
            previous: '/main/masterplate/element'
          },
          crumbs: [
            {
              title: i18n.t('theme.section.paging.title'),
              path: '/main/masterplate/section'
            }
          ]
        }
      },
      {
        path: 'masterplate/element/update/:id',
        name: 'theme-element-update',
        component: () => import('../views/main/masterplate/section/update.vue'),
        meta: {
          requireAuth: true,
          title: i18n.t('theme.section.update.updateTitle'),
          parent: {
            title: i18n.t('theme.section.paging.title'),
            url: '/main/masterplate/element',
            previous: '/main/masterplate/element'
          },
          crumbs: [
            {
              title: i18n.t('theme.section.paging.title'),
              path: '/main/masterplate/element'
            }
          ]
        }
      },
      {
        path: 'masterplate/schema',
        name: 'theme-element-schema',
        component: () => import('../views/main/masterplate/schema/index.vue'),
        meta: {
          requireAuth: true,
          title: i18n.t('theme.schema.title'),
          parent: {
            title: i18n.t('theme.paging.title'),
            url: '/main/masterplate/schema',
            previous: '/main/masterplate'
          },
          crumbs: [
            {
              title: i18n.t('theme.paging.title'),
              path: '/main/masterplate'
            }
          ]
        }
      }
    ]
  },
  {
    path: '/design/:siteId/:themeId',
    name: 'site-design',
    meta: {
      siteType: [1, 2, 3, 4],
      requireAuth: true,
      title: i18n.t('design.title')
    },
    component: () => import('../views/app/design/index')
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
  let admin = router.currentRoute.fullPath.indexOf('/main') === 0
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
    if (checkPermission([to.name], admin)) {
      next()
    } else {
      next({
        path: `${admin ? '/main' : ''}/passport`,
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

// let s = []
// s.push('DELETE FROM security_function WHERE app_type = 7000;')
// routes.forEach((o) => {
//   let pid = `7000${o.name}`
//   if (o.meta && o.meta.requireAuth !== undefined && o.meta.requireAuth === true) {
//     s.push(`INSERT INTO security_function (id, app_type, function_code, function_name, parent_id, router_name ) VALUES('7000${o.name}', 7000, '${o.name}', '${(o.meta && o.meta.title) || ''}', '0', '' );`)
//     if (o.children && typeof (o.children) === 'object') {
//       o.children.forEach((sb) => {
//         if (sb.meta.children) {
//           sb.meta.children.forEach((m) => {
//             s.push(`INSERT INTO security_function ( id, app_type, function_code, function_name, parent_id, router_name ) VALUES('7000${m.name}', 7000, '${m.name}', '${m.title}', '${pid}', '' );`)
//           })
//         }
//         if (sb.meta && sb.meta.requireAuth === true) {
//           s.push(`INSERT INTO security_function ( id, app_type, function_code, function_name, parent_id, router_name ) VALUES('7000${sb.name}', 7000, '${sb.name}', '${(sb.meta && sb.meta.title) || ''}', '${pid}', '' );`)
//           if (sb.children && sb.children.length > 0) {
//             sb.children.forEach((sbb) => {
//               if (sbb.meta && sbb.meta.requireAuth === true) {
//                 s.push(`INSERT INTO security_function ( id, app_type, function_code, function_name, parent_id, router_name ) VALUES('7000${sbb.name}', 7000, '${sbb.name}', '${(sbb.meta && sbb.meta.title) || ''}', '${pid}', '' );`)
//               }
//             })
//           }
//         }
//       })
//     }
//   }
// })
// console.log(s.join('\n'))
export default router
