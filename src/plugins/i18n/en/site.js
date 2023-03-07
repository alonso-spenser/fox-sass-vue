export default {
  startup: {
    title: 'Startup',
    pageTitle: 'Create a site',
    returnHome: 'Return to Home',
    mySites: 'My Sites',
    nextStep: 'Next',
    prevStep: 'Prev',
    create: 'Submit',
    chooseTemplate: 'Select Template',
    siteTheme: 'Website template',
    all: 'All',
    preview: 'Preview',
    original: 'Set default URL',
    empty: 'Please select a template',
    selected: 'Select',
    skip: 'Skip',
    siteType: {
      heading: 'Please select a site type',
      cod: {
        heading: 'B2C Single page',
        subheading: 'Applicable to <b>Similar COD product single page</b> business type',
        tips: 'The site will automatically generate a page based on the items you add. You can edit and modify these page, and your visitors can place orders directly through this page'
      },
      lp: {
        heading: 'B2B Single page',
        subheading: 'Suitable for <b>Single Page Impressions (Landing Pages) and Inquiry </b> business types',
        tips: 'You can create and edit multiple independent single pages on the site, and your visitors can directly submit forms such as registration and inquiry through this single page'
      },
      b2b: {
        heading: 'B2B Official website',
        subheading: 'Suitable for <b>Official website and Inquiry </b> business types',
        tips: 'You can create the official website of the enterprise and edit the entire website. Your visitors can browse the enterprise introduction, products, news and other content and make inquiries'
      },
      b2c: {
        heading: 'B2C Shop',
        subheading: 'Suitable Business Types for Selling Online',
        tips: 'No matter what kind of consumers your products are aimed at and which corner of the world they are sold to, we can help you realize them one by one, from "store", online transactions, social media, to point-to-point personal marketing。'
      }
    },
    initial: 'Default',
    tips: [
      'After a website is created, the original address <label class="text-primary"> cannot be modified </label>. Exercise caution when setting this parameter\n',
      'Your customers can view your website and pages by visiting this address in their browser\n',
      'You can then add your own domain name and set it as the site\'s main domain name\n'
    ],
    entity: {
      domain: {
        label: 'URL',
        placeholder: 'Please enter a URL',
        custom: 'URL cannot be empty',
        required: 'The URL is a string of 4 ~ 32 characters, including digits and hyphens (-)',
        async: 'URL already exists'
      },
      siteName: {
        label: 'Site name',
        placeholder: 'Please enter a site name',
        required: '',
        custom: ''
      },
      langCode: {
        label: 'Default language',
        placeholder: 'Please select the default language',
        required: '',
        custom: ''
      }
    },
    success: 'The program is being processed. It is expected to be completed within 5 minutes. Please check later',
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
