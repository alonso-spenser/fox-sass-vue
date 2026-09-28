export default {
  menuList: [
    {
      title: 'Home',
      abbr: 'Home',
      submenu: [],
      icon: 'fo-ico-home',
      code: [
        'dashboard-startup'
      ],
      url: '/dashboard',
      siteType: [
        2,
        3,
        4
      ]
    },
    {
      title: 'Enquiry management',
      abbr: 'Enquiry',
      icon: '',
      url: '/site/:siteId:/enquiry',
      code: [
        'site-enquiry-record'
      ],
      siteType: [
        2,
        3,
        4
      ],
      submenu: [
        {
          title: 'My enquiries',
          icon: 'fo-ico-message',
          code: [
            'site-enquiry-record'
          ],
          url: '/site/:siteId:/enquiry',
          siteType: [
            2,
            3,
            4
          ]
        },
        {
          title: 'Enquiry forms',
          icon: 'fo-ico-info',
          code: [
            'site-enquiry-form'
          ],
          url: '/site/:siteId:/enquiry/form',
          siteType: [
            2,
            3,
            4
          ]
        },
        {
          title: 'Recipient email addresses',
          icon: 'fo-ico-email',
          code: [
            'site-enquiry-email'
          ],
          url: '/site/:siteId:/enquiry/email',
          siteType: [
            2,
            3,
            4
          ]
        }
      ]
    },
    {
      title: 'Analytics dashboard',
      abbr: 'Data',
      submenu: [],
      icon: 'fo-ico-pie',
      code: [
        'site-analytics'
      ],
      url: '/site/:siteId:/analytics',
      siteType: [
        2,
        3,
        4
      ]
    },
    {
      title: 'SEO settings',
      abbr: 'SEO',
      submenu: [],
      icon: 'fo-ico-sorting',
      code: [
        'site-optimize'
      ],
      url: '/site/:siteId:/optimize',
      siteType: [
        2,
        3,
        4
      ]
    },
    {
      title: 'Customer management',
      abbr: 'Customers',
      submenu: [],
      icon: 'fo-ico-smile',
      code: [
        'site-client'
      ],
      url: '/site/:siteId:/client',
      siteType: [
        2,
        3,
        4
      ]
    },
    {
      title: 'Website management',
      abbr: 'Websites',
      icon: 'fo-ico-wangzhanshezhi',
      url: '/site/:siteId:/dashboard',
      siteType: [
        2,
        3,
        4
      ],
      code: [
        'site'
      ],
      submenu: [
        {
          title: 'My websites',
          icon: 'fo-ico-english',
          code: [
            'dashboard-site'
          ],
          url: '/owned',
          siteType: [
            2,
            3,
            4
          ]
        },
        {
          title: 'Product collections',
          abbr: 'Product',
          submenu: [],
          icon: 'fo-ico-package',
          code: [
            'site-article-collection'
          ],
          url: '/site/:siteId:/goods/collection',
          siteType: [
            3,
            4
          ]
        },
        {
          title: 'All products',
          icon: 'fo-ico-app',
          code: [
            'site-goods'
          ],
          url: '/site/:siteId:/goods',
          siteType: [
            3,
            4
          ]
        },
        {
          title: 'Article collections',
          abbr: 'Article',
          submenu: [],
          code: [
            'site-article-collection'
          ],
          icon: 'fo-ico-package',
          url: '/site/:siteId:/article/collection',
          siteType: [
            3,
            4
          ]
        },
        {
          title: 'All articles',
          abbr: 'Article',
          submenu: [],
          code: [
            'site-article'
          ],
          icon: 'fo-ico-article',
          url: '/site/:siteId:/article',
          siteType: [
            3,
            4
          ]
        },
        {
          title: 'Page management',
          abbr: 'Pages',
          submenu: [],
          code: [
            'site-page'
          ],
          icon: 'fo-ico-frame',
          url: '/site/:siteId:/pages',
          siteType: [
            3,
            4
          ]
        },
        {
          title: 'Navigation menus',
          abbr: 'Menus',
          submenu: [],
          icon: 'fo-ico-menu',
          code: [
            'site-navigation'
          ],
          url: '/site/:siteId:/navigation',
          siteType: [
            3,
            4
          ]
        },
        {
          title: 'Downloads',
          abbr: 'Download',
          submenu: [],
          icon: 'fo-ico-download',
          code: [
            'site-download'
          ],
          url: '/site/:siteId:/download',
          siteType: [
            3,
            4
          ]
        },
        {
          title: 'Themes',
          abbr: 'Theme',
          submenu: [],
          code: [
            'site-masterplate'
          ],
          icon: 'fo-ico-palette',
          url: '/site/:siteId:/masterplate',
          siteType: [
            2,
            3,
            4
          ]
        },
        {
          title: 'Website settings',
          abbr: 'Settings',
          submenu: [],
          code: [
            'site-settings'
          ],
          icon: 'fo-ico-setting',
          url: '/site/:siteId:/settings',
          siteType: [
            2,
            3,
            4
          ]
        }
      ]
    }
  ],
  mainMenuList: [
    {
      title: 'Home',
      code: [
        'dashboard'
      ],
      url: '/main/dashboard',
      submenu: []
    },
    {
      title: 'Customer management',
      code: [
        'agent',
        'site'
      ],
      submenu: [
        {
          title: 'Customer list',
          code: [
            'client-list'
          ],
          url: '/main/merchant'
        },
        {
          title: 'Website list',
          url: '/main/site',
          code: [
            'site-all'
          ],
          submenu: []
        },
        {
          title: 'Website migration',
          url: '/main/tool/transfer',
          code: [
            'tool-transfer'
          ],
          submenu: []
        }
      ]
    },
    {
      title: 'Reference data',
      code: [
        'base'
      ],
      submenu: [
        {
          title: 'System',
          code: [
            ''
          ],
          url: '/main/base/super',
          submenu: []
        },
        {
          title: 'Language',
          code: [
            'base-lang'
          ],
          url: '/main/base/lang',
          submenu: []
        },
        {
          title: 'IP address database',
          code: [
            'ip-repository'
          ],
          url: '/main/base/ip',
          submenu: []
        },
        {
          title: 'Help documentation',
          code: [
            'base-support'
          ],
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
          title: 'Application features & default roles',
          code: [
            'security-function'
          ],
          url: '/main/base/security/function',
          submenu: []
        }
      ]
    },
    {
      title: 'Theme',
      code: [
        'theme'
      ],
      submenu: [
        {
          title: 'Template tags',
          code: [
            'theme-tag'
          ],
          url: '/main/masterplate/tag',
          submenu: []
        },
        {
          title: 'Section tags',
          code: [
            'theme-element-tag'
          ],
          url: '/main/masterplate/element-tag',
          submenu: []
        },
        {
          title: 'Global settings',
          code: [
            'theme-element-schema'
          ],
          url: '/main/masterplate/schema',
          submenu: []
        },
        {
          title: 'Themes',
          url: '/main/masterplate',
          code: [
            'theme-masterplate'
          ],
          submenu: []
        },
        {
          title: 'Pages',
          code: [
            'theme-page'
          ],
          url: '/main/masterplate/page',
          submenu: []
        },
        {
          title: 'Sections',
          code: [
            'theme-element'
          ],
          url: '/main/masterplate/element',
          submenu: []
        }
      ]
    }
  ]
}
