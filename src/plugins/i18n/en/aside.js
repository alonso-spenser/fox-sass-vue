export default {
  menuList: [
    {
      title: 'Dashboard',
      abbr: 'Dashboard',
      submenu: [],
      icon: 'fo-ico-home',
      code: ['dashboard-startup'],
      url: '/dashboard',
      siteType: [2, 3, 4]
    },
    {
      title: 'Enquiries',
      abbr: '询盘',
      icon: '',
      url: '/site/:siteId:/enquiry',
      code: ['site-enquiry-record'],
      siteType: [2, 3, 4],
      submenu: [
        {
          title: 'Inquiry',
          icon: 'fo-ico-message',
          code: ['site-enquiry-record'],
          url: '/site/:siteId:/enquiry',
          siteType: [2, 3, 4]
        },
        {
          title: 'Form',
          icon: 'fo-ico-info',
          code: ['site-enquiry-form'],
          url: '/site/:siteId:/enquiry/form',
          siteType: [2, 3, 4]
        },
        {
          title: 'Recipients',
          icon: 'fo-ico-email',
          code: ['site-enquiry-email'],
          url: '/site/:siteId:/enquiry/email',
          siteType: [2, 3, 4]
        }
      ]
    },
    {
      title: 'Data board',
      abbr: '数据',
      submenu: [],
      icon: 'fo-ico-pie',
      code: ['site-analytics'],
      url: '/site/:siteId:/analytics',
      siteType: [2, 3, 4]
    },
    // {
    //   title: 'Ranking',
    //   abbr: '排名',
    //   submenu: [],
    //   code: ['site-ranking'],
    //   icon: 'fo-ico-line-chart',
    //   url: '/site/:siteId:/ranking',
    //   siteType: []
    // },
    {
      title: 'SEO',
      abbr: 'SEO',
      submenu: [],
      icon: 'fo-ico-sorting',
      code: ['site-optimize'],
      url: '/site/:siteId:/optimize',
      siteType: [2, 3, 4]
    },
    {
      title: 'Client',
      abbr: '客户',
      submenu: [],
      icon: 'fo-ico-smile',
      code: ['site-client'],
      url: '/site/:siteId:/client',
      siteType: [2, 3, 4]
    },
    {
      title: 'Content',
      abbr: '网站',
      icon: 'fo-ico-wangzhanshezhi',
      url: '/site/:siteId:/dashboard',
      siteType: [2, 3, 4],
      code: ['site'],
      submenu: [
        {
          title: 'My site',
          icon: 'fo-ico-english',
          code: ['dashboard-site'],
          url: '/owned',
          siteType: [2, 3, 4]
        },
        {
          title: 'Product collection',
          abbr: 'Product',
          submenu: [],
          icon: 'fo-ico-package',
          code: ['site-article-collection'],
          url: '/site/:siteId:/goods/collection',
          siteType: [3, 4]
        },
        {
          title: 'Products',
          icon: 'fo-ico-app',
          code: ['site-goods'],
          url: '/site/:siteId:/goods',
          siteType: [3, 4]
        },
        {
          title: 'Article collection',
          abbr: 'Article',
          submenu: [],
          code: ['site-article-collection'],
          icon: 'fo-ico-package',
          url: '/site/:siteId:/article/collection',
          siteType: [3, 4]
        },
        {
          title: 'Articles',
          abbr: 'Articles',
          submenu: [],
          code: ['site-article'],
          icon: 'fo-ico-article',
          url: '/site/:siteId:/article',
          siteType: [3, 4]
        },
        {
          title: 'Pages',
          abbr: 'Pages',
          submenu: [],
          code: ['site-page'],
          icon: 'fo-ico-frame',
          url: '/site/:siteId:/pages',
          siteType: [3, 4]
        },
        {
          title: 'Menu',
          abbr: 'Menu',
          submenu: [],
          icon: 'fo-ico-menu',
          code: ['site-navigation'],
          url: '/site/:siteId:/navigation',
          siteType: [3, 4]
        },
        {
          title: 'Download',
          abbr: 'Download',
          submenu: [],
          icon: 'fo-ico-download',
          code: ['site-download'],
          url: '/site/:siteId:/download',
          siteType: [3, 4]
        },
        {
          title: 'Theme',
          abbr: 'Theme',
          submenu: [],
          code: ['site-masterplate'],
          icon: 'fo-ico-palette',
          url: '/site/:siteId:/masterplate',
          siteType: [2, 3, 4]
        },
        {
          title: 'Settings',
          abbr: 'Settings',
          submenu: [],
          code: ['site-settings'],
          icon: 'fo-ico-setting',
          url: '/site/:siteId:/settings',
          siteType: [2, 3, 4]
        }
      ]
    }
  ],
  mainMenuList: [
    {
      title: 'Dashboard',
      code: ['dashboard'],
      url: '/main',
      submenu: []
    },
    {
      title: 'Client',
      code: ['agent', 'site'],
      submenu: [
        {
          title: 'Client',
          code: ['client-list'],
          url: '/main/client'
        },
        {
          title: 'Site',
          url: '/main/site',
          code: ['site-all'],
          submenu: []
        }
      ]
    },
    {
      title: 'Basic data',
      code: ['base'],
      submenu: [
        {
          title: 'System',
          // code: ['main-base-super'],
          code: [''],
          url: '/main/base/super',
          submenu: []
        },
        {
          title: 'Language',
          code: ['base-lang'],
          url: '/main/base/lang',
          submenu: []
        },
        {
          title: 'IP Address',
          code: ['ip-repository'],
          url: '/main/base/ip',
          submenu: []
        },
        {
          title: 'Support',
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
          title: 'Function & Role',
          code: ['security-function'],
          url: '/main/base/security/function',
          submenu: []
        }
      ]
    },
    {
      title: 'Theme development',
      code: ['theme'],
      submenu: [
        {
          title: 'Theme Tag',
          code: ['theme-tag'],
          url: '/main/masterplate/tag',
          submenu: []
        },
        {
          title: 'Section Tag',
          code: ['theme-element-tag'],
          url: '/main/masterplate/element-tag',
          submenu: []
        },
        {
          title: 'Global Parameters',
          code: ['theme-element-schema'],
          url: '/main/masterplate/schema',
          submenu: []
        },
        {
          title: 'Theme',
          url: '/main/masterplate',
          code: ['theme-masterplate'],
          submenu: []
        },
        {
          title: 'Page',
          code: ['theme-page'],
          url: '/main/masterplate/page',
          submenu: []
        },
        {
          title: 'Section',
          code: ['theme-element'],
          url: '/main/masterplate/element',
          submenu: []
        }
      ]
    }
  ]
}
