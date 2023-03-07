export default {
  menuList: [
    {
      title: '首页',
      abbr: '首页',
      submenu: [],
      icon: 'fo-ico-home',
      code: ['dashboard-startup'],
      url: '/dashboard',
      siteType: [2, 3, 4]
    },
    {
      title: '询盘管理',
      abbr: '询盘',
      icon: '',
      url: '/site/:siteId:/enquiry',
      code: ['site-enquiry-record'],
      siteType: [2, 3, 4],
      submenu: [
        {
          title: '我的询盘',
          icon: 'fo-ico-message',
          code: ['site-enquiry-record'],
          url: '/site/:siteId:/enquiry',
          siteType: [2, 3, 4]
        },
        {
          title: '询盘表单',
          icon: 'fo-ico-info',
          code: ['site-enquiry-form'],
          url: '/site/:siteId:/enquiry/form',
          siteType: [2, 3, 4]
        },
        {
          title: '收件邮箱',
          icon: 'fo-ico-email',
          code: ['site-enquiry-email'],
          url: '/site/:siteId:/enquiry/email',
          siteType: [2, 3, 4]
        }
      ]
    },
    {
      title: '数据看板',
      abbr: '数据',
      submenu: [],
      icon: 'fo-ico-pie',
      code: ['site-analytics'],
      url: '/site/:siteId:/analytics',
      siteType: [2, 3, 4]
    },
    {
      title: '排名管理',
      abbr: '排名',
      submenu: [],
      code: ['site-ranking'],
      icon: 'fo-ico-line-chart',
      url: '/site/:siteId:/ranking',
      siteType: [2, 3, 4]
    },
    {
      title: 'SEO设置',
      abbr: 'SEO',
      submenu: [],
      icon: 'fo-ico-sorting',
      code: ['site-optimize'],
      url: '/site/:siteId:/optimize',
      siteType: [2, 3, 4]
    },
    {
      title: '客户管理',
      abbr: '客户',
      submenu: [],
      icon: 'fo-ico-smile',
      code: ['site-client'],
      url: '/site/:siteId:/client',
      siteType: [2, 3, 4]
    },
    {
      title: '数据报表',
      abbr: '报表',
      submenu: [],
      code: ['site-statement'],
      icon: 'fo-ico-article',
      url: '/site/:siteId:/report',
      siteType: [2, 3, 4]
    },
    {
      title: '网站管理',
      abbr: '网站',
      icon: 'fo-ico-wangzhanshezhi',
      url: '/site/:siteId:/dashboard',
      siteType: [2, 3, 4],
      code: ['site'],
      submenu: [
        {
          title: '我的网站',
          icon: 'fo-ico-english',
          code: ['dashboard-site'],
          url: '/owned',
          siteType: [2, 3, 4]
        },
        {
          title: '产品集合',
          abbr: '产品',
          submenu: [],
          icon: 'fo-ico-package',
          code: ['site-article-collection'],
          url: '/site/:siteId:/goods/collection',
          siteType: [3, 4]
        },
        {
          title: '所有产品',
          icon: 'fo-ico-app',
          code: ['site-goods'],
          url: '/site/:siteId:/goods',
          siteType: [3, 4]
        },
        {
          title: '文章集合',
          abbr: '文章',
          submenu: [],
          code: ['site-article-collection'],
          icon: 'fo-ico-package',
          url: '/site/:siteId:/article/collection',
          siteType: [3, 4]
        },
        {
          title: '所有文章',
          abbr: '文章',
          submenu: [],
          code: ['site-article'],
          icon: 'fo-ico-article',
          url: '/site/:siteId:/article',
          siteType: [3, 4]
        },
        {
          title: '页面管理',
          abbr: '页面',
          submenu: [],
          code: ['site-page'],
          icon: 'fo-ico-frame',
          url: '/site/:siteId:/pages',
          siteType: [3, 4]
        },
        {
          title: '导航菜单',
          abbr: '菜单',
          submenu: [],
          icon: 'fo-ico-menu',
          code: ['site-navigation'],
          url: '/site/:siteId:/navigation',
          siteType: [3, 4]
        },
        {
          title: '下载中心',
          abbr: '下载',
          submenu: [],
          icon: 'fo-ico-download',
          code: ['site-download'],
          url: '/site/:siteId:/download',
          siteType: [3, 4]
        },
        {
          title: '主题风格 ',
          abbr: '主题',
          submenu: [],
          code: ['site-masterplate'],
          icon: 'fo-ico-palette',
          url: '/site/:siteId:/masterplate',
          siteType: [2, 3, 4]
        },
        {
          title: '网站设置',
          abbr: '设置',
          submenu: [],
          code: ['site-settings'],
          icon: 'fo-ico-setting',
          url: '/site/:siteId:/settings',
          siteType: [2, 3, 4]
        }
      ]
    }
    // {
    //   title: '海关数据',
    //   abbr: '海关',
    //   submenu: [],
    //   icon: 'icon-haiguan_o',
    //   url: '/site/:siteId:/customs',
    //   siteType: [2, 3, 4]
    // }
  ],
  mainMenuList: [
    {
      title: '首页',
      code: ['dashboard'],
      url: '/main/dashboard',
      submenu: []
    },
    {
      title: '客户管理',
      code: ['agent', 'site'],
      submenu: [
        {
          title: '客户列表',
          code: ['client-list'],
          url: '/main/client'
        },
        {
          title: '网站列表',
          url: '/main/site',
          code: ['site-all'],
          submenu: []
        },
        {
          title: '网站迁移',
          url: '/main/tool/transfer',
          code: ['tool-transfer'],
          submenu: []
        }
      ]
    },
    {
      title: '基础数据',
      code: ['base'],
      submenu: [
        {
          title: '系统',
          // code: ['main-base-super'],
          code: [''],
          url: '/main/base/super',
          submenu: []
        },
        {
          title: '语言',
          code: ['base-lang'],
          url: '/main/base/lang',
          submenu: []
        },
        {
          title: 'IP地址库',
          code: ['ip-repository'],
          url: '/main/base/ip',
          submenu: []
        },
        {
          title: '帮助文档',
          code: ['base-support'],
          url: '/main/base/support',
          submenu: []
        },
        {
          title: 'Google API',
          code: [],
          url: '/main/base/google-api',
          submenu: []
        },
        {
          title: '应用功能 & 初始角色',
          code: ['security-function'],
          url: '/main/base/security/function',
          submenu: []
        }
      ]
    },
    {
      title: '主题',
      code: ['theme'],
      submenu: [
        {
          title: '模版标签',
          code: ['theme-tag'],
          url: '/main/masterplate/tag',
          submenu: []
        },
        {
          title: '组件标签',
          code: ['theme-element-tag'],
          url: '/main/masterplate/element-tag',
          submenu: []
        },
        {
          title: '全局参数',
          code: ['theme-element-schema'],
          url: '/main/masterplate/schema',
          submenu: []
        },
        {
          title: '主题风格',
          url: '/main/masterplate',
          code: ['theme-masterplate'],
          submenu: []
        },
        {
          title: '页面',
          code: ['theme-page'],
          url: '/main/masterplate/page',
          submenu: []
        },
        {
          title: '组件',
          code: ['theme-element'],
          url: '/main/masterplate/element',
          submenu: []
        }
      ]
    }
  ]
}
