export default {
  startup: {
    title: '开始',
    pageTitle: '创建站点',
    returnHome: '返回首页',
    mySites: '我的网站',
    nextStep: '下一步',
    prevStep: '上一步',
    create: '创建站点',
    chooseTemplate: '选择模板',
    siteTheme: '网站模版',
    all: '全部',
    preview: '预览',
    original: '设置初始地址',
    empty: '请选择一个模版',
    selected: '选择',
    skip: '跳过',
    siteType: {
      heading: '请选择网站类型',
      cod: {
        heading: '商品单页',
        subheading: '适用于<b>类似COD商品单页</b>投放的业务类型',
        tips: '站点会根据您添加的商品自动生成单页，您可以对这些商品单页进行编辑修改，您的访客可以通过该单页直接下单'
      },
      lp: {
        heading: 'B2B企业单页',
        subheading: '适用于<b>单页展示 ( 着陆页 ) 以及询盘 </b>的业务类型',
        tips: '您可以在站点中创建多个独立的单页并进行编辑修改，您的访客可以通过该单页直接进行报名、询盘等表单提交操作'
      },
      b2b: {
        heading: 'B2B企业网站',
        subheading: '适用于<b>官网以及询盘</b>的业务类型',
        tips: '您可以创建企业的官网，并对整个网站进行编辑修改，您的访客可以浏览企业介绍、商品、新闻等内容以及进行询盘操作'
      },
      b2c: {
        heading: 'B2C在线商城',
        subheading: '适用于<b>在线销售</b>的业务类型',
        tips: '无论您的产品是面向哪种消费者、销往世界的哪一个角落，从“店”商、 在线交易、社交媒体，到点对点个人营销，我们都可以帮您一一实现。'
      }
    },
    initial: '空白主题',
    tips: [
      '创建网站后，原始地址<label class="text-primary">不可修改</label>，请谨慎设置',
      '您的客户可以通过浏览器访问该地址来查看您的网站和页面',
      '您可以在之后添加绑定自己的域名并将其设置为网站的主域名'
    ],
    entity: {
      domain: {
        label: '网址',
        placeholder: '请输入网址',
        custom: '网址不能为空',
        required: '网址为4~32位，数字、英文或中划线组成',
        async: '网址已存在，请更换'
      },
      siteName: {
        label: '网站名称',
        placeholder: '请输入网站名称',
        required: '网站名称不能为空',
        custom: ''
      },
      langCode: {
        label: '默认语言',
        placeholder: '请选择默认语言',
        required: '默认语不能为空',
        custom: ''
      }
    },
    success: '程序处理中，预计5分内钟内处理完成，请稍后查看',
    clone: {
      pageTitle: '复制站点',
      source: '来源网站',
      tips: '复制以上网站的全部设置，以创建一个新的站点',
      siteName: '网站名称',
      siteDomain: '网站域名',
      siteType: '网站类型',
      submit: '复制站点',
      error: '原网站信息不存在',
      success: '复制程序处理中，预计5分内钟内处理完成，请稍后查看'
    }
  },
  /**
   * 站点导航菜单
   */
  siteAside: {
    menu: {
      'home': '首页',
      'enquiry': '询盘管理',
      'ranking': '排名管理',
      'site-dashboard': '网站数据',
      'site-product-root': '商品',
      'site-product': '全部商品',
      'site-product-collection': '商品集合',
      'site-article-root': '文章',
      'site-article': '全部文章',
      'site-tag': 'TAG',
      'site-article-collection': '文章集合',
      'site-customer': '客户',
      'site-setting-root': '网站设置',
      'site-theme': '主题',
      'site-settings': '通用',
      'site-legal': '法律政策',
      'site-navigation': '导航菜单',
      'site-domain': '域名绑定',
      'site-pages': '自定义页面',
      'site-tracking': '追踪与分析',
      'site-enquiry': '我的询盘',
      'enquiry-form': '询盘表单',
      'enquiry-email': '询盘邮件',
      'site-seo': '页面SEO',
      'site-down-root': '下载',
      'site-content': '内容',
      'site-down': '全部下载',
      'site-down-collection': '下载集合',
      'site-order': '订单',
      'plugs': '应用市场',
      'seo_plug': 'SEO API'
    },
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
            title: 'Mailbox',
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
      {
        title: 'Ranking',
        abbr: '排名',
        submenu: [],
        code: ['site-ranking'],
        icon: 'fo-ico-line-chart',
        url: '/site/:siteId:/ranking',
        siteType: []
      },
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
      // {
      //   title: '海关数据',
      //   abbr: '海关',
      //   submenu: [],
      //   icon: 'icon-haiguan_o',
      //   url: '/site/:siteId:/customs',
      //   siteType: [2, 3, 4]
      // }
    ],
    aside: {
      builder: '网站设置',
      mainMenu: '主菜单',
      admin: '管理网站',
      mySites: '我的网站',
      tips: '商品、文章、下载、表单、界面排版及有任何内容更新时，点此发布网站更新。请不要频繁点击'
    }
  },
  siteStatus: {
    '0': 'Enable',
    '1': 'Deactivate',
    '2': 'Frozen'
  },
  /**
   * 站点类型
   */
  siteType: {
    '1': '商品单页',
    '2': '企业单页',
    '3': 'B2B',
    '4': 'Mall',
    '11': 'Video B2B',
    '12': 'Video B2C'
  },
  site: {
    title: '网站管理',
    pass: {
      title: '下载密码',
      setPass: '下载密码',
      content: '"通用下载密码" 用于产品附件、文章附件等通用附件下载（有设置为需要密码时）',
      downPass: {
        label: '下载密码',
        tips: '',
        placeholder: '下载密码',
        required: '密码为英文和数字的组合',
        custom: '4 ~ 10 英文和数字的组合'
      }
    },
    dashboard: {
      title: 'My site',
      createNew: 'New',
      editButton: 'Manage site',
      subscription: 'Renew',
      clone: 'Duplicate',
      expired: 'Expired',
      trial: {
        label: 'extended trial period',
        tips: 'Unpaid sites can extend the trial time up to 5 times at a time, each time adding 7 days. Clicking "Extend Trial" consecutively will not add up to the time. But it will consume 1 operation times, please don\'t click continuously.',
        keep: 'You can only keep one trial site, and you can create a new trial site for a fee.'
      },
      remove: {
        label: 'Remove',
        tips: 'Deleting the website will completely delete all the data you uploaded: products, articles, forms, website decoration, etc., and the data cannot be recovered. '
      },
      paging: {
        administrationButton: '管理网站',
        addButton: '添加网站',
        addLanguage: '添加语言',
        endTime: '到期时间',
        onLineTime: '上线时间',
        setSite: '设计网站'
      },
      statistics: {
        languageType: 'Multilingual',
        products: 'Products',
        articles: 'Articles',
        inquiry: 'Inquiries',
        online: 'Online',
        usable: 'Usable'
      },
      tableHeader: {
        languageName: 'Language',
        nativeName: 'Native language',
        onlineTime: 'Online time',
        state: 'State'
      },
      state: {
        stop: 'Disable',
        enable: 'Enable'
      },
      language: {
        heading: 'Tips',
        translate: 'Translate and save',
        clone: 'Copy data only',
        tips: 'The content is provided by the translation tool. If you need more accurate translation, please go to this site to edit the sub-language site. There is no such product.'
      }
    },
    resource: {
      paging: {
        title: '下载中心',
        heading: '',
        subheading: '',
        addCollection: '添加集合',
        addButton: '添加下载资源',
        empty: {
          content: '添加的下载资源会被列举在这里。您可以在这里管理所有下载资源，例如批量删除、修改等。',
          buttonLabel: '添加下载资源'
        },
        tableHeader: {
          coverImage: '封面图片',
          createTime: '上传时间',
          title: '文件名称',
          url: '文件地址',
          visit: '查看文件',
          suffix: '后缀'
        }
      },
      update: {
        addTitle: '添加下载',
        updateTitle: '编辑下载',
        entity: {
          coverImage: {
            label: '封面图片',
            tips: '',
            placeholder: '封面图片',
            required: '请输入封面图片',
            custom: ''
          },
          title: {
            label: '文件名称',
            tips: '',
            placeholder: '文件名称',
            required: '请输入文件名称',
            custom: ''
          },
          url: {
            label: '文件地址',
            tips: '',
            placeholder: '文件地址',
            required: '请输入文件地址',
            custom: ''
          },
          description: {
            label: '简要介绍',
            tips: '',
            placeholder: '简要介绍',
            required: '请输入简要介绍',
            custom: ''
          }
        }
      }
    },
    down: {
      /**
       * 上传附件
       */
      fileUpload: {
        label: '下载中心',
        remove: '移除',
        placeholder: '上传文件',
        maxSize: '文件最大 {size} MB',
        drag: '将文件拖到此处，或',
        fileName: '文件名称',
        content: '资源介绍'
      },
      update: {
        collection: {
          label: '下载集合',
          placeholder: '输入集合名称',
          exist: '该集合已被添加',
          add: '添加集合',
          manage: '管理集合',
          loadingText: '加载中',
          noMatchText: '无匹配数据',
          noDataText: '无数据'
        }
      },
      /**
       * 集合多选器
       */
      multipleSelector: {
        heading: '添加集合',
        subheading: '将选中的资源添加以下集合',
        placeholder: '输入集合名称',
        loadingText: '加载中',
        noMatchText: '无匹配数据',
        noDataText: '无数据'
      }
    },
    theme: {
      current: {
        heading: '默认主题',
        subheading: '当前用户访问您的网站时，他们看到的是这个主题'
      },
      design: 'Design',
      preview: 'Visit',
      active: 'Using',
      edit: 'Manage',
      get: 'Add theme',
      owned: {
        heading: 'Theme',
        subheading: 'Manage all themes for this site. You can add or modify more themes, and choose one to publish as the current theme.'
      },
      publish: {
        title: 'Publish',
        content: 'Publishing your website will bring all unpublished content online where your visitors will see it. Are you sure ?',
        success: 'Published successfully'
      },
      rename: {
        title: 'Rename',
        content: 'Modify the name. Your visitors won\'t see this part.',
        placeholder: 'Please enter a name',
        error: 'Limit 32 characters'
      },
      duplicate: {
        title: '复制主题',
        content: '复制此主题的内容，并以此创建一个新的主题'
      },
      paging: {
        title: '主题',
        empty: {
          content: '添加的网站主题会被列举在这里。您可以在这里管理所有网站主题，例如批量删除、修改等。',
          buttonLabel: '添加网站主题'
        },
        tableHeader: {
          name: 'Name',
          state: 'Default',
          version: 'Version'
        }
      }
    },
    lang: {
      title: '网站多语言'
    },
    statement: {
      title: '数据报表'
    }
  },
  resourceSelector: {
    heading: '资源选择器',
    lib: '图库',
    infoType: {
      article: '文章',
      goods: '产品',
      design: '资源'
    }
  }
}
