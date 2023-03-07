export default {
  /**
   * youtube
   */
  videoPicker: {
    placeholder: '请输入Youtube视频的分享链接'
  },
  theme: {
    paging: {
      title: '主题风格',
      heading: '',
      subheading: '',
      add: '添加主题',
      empty: {
        content: '添加的主题会被列举在这里。您可以在这里管理所有主题，例如批量删除、修改等。',
        buttonLabel: '添加主题'
      },
      tableHeader: {
        author: '作者',
        description: '主题介绍',
        longImage: '主题长图',
        mobileImage: '手机版截图',
        name: '主题名称',
        screenshot: '主题小图',
        siteType: '模版类型',
        sortIndex: '排序',
        state: '状态',
        synopsis: '主题简介',
        updateTime: '更新时间',
        version: '版本号'
      }
    },
    update: {
      addTitle: '添加主题',
      updateTitle: '编辑主题',
      entity: {
        author: {
          label: '作者',
          tips: '',
          placeholder: '作者',
          required: '请输入作者',
          custom: ''
        },
        sourceType: {
          label: '类型',
          option: [
            {
              id: 0,
              label: '系统默认'
            },
            {
              id: 1,
              label: '网站模版'
            }
          ]
        },
        tagList: {
          label: '主题分类',
          tips: '',
          placeholder: '请选择主题分类',
          required: '请选择主题分类',
          custom: ''
        },
        demoUrl: {
          label: '演示站URL',
          tips: '',
          placeholder: '演示站URL',
          required: '请输入演示站URL',
          custom: ''
        },
        description: {
          label: '详情',
          tips: '',
          placeholder: '详情',
          required: '请输入详情',
          custom: ''
        },
        longImage: {
          label: '主题长图',
          tips: '',
          placeholder: '主题长图',
          required: '请输入主题长图',
          custom: ''
        },
        mobileImage: {
          label: '手机版截图',
          tips: '',
          placeholder: '手机版截图',
          required: '请输入手机版截图',
          custom: ''
        },
        name: {
          label: '主题名称',
          tips: '',
          placeholder: '主题名称',
          required: '请输入主题名称',
          custom: ''
        },
        screenshot: {
          label: '主题小图',
          tips: '',
          placeholder: '主题小图',
          required: '请输入主题小图',
          custom: ''
        },
        siteId: {
          label: '模版站Id',
          tips: '',
          placeholder: '模版站Id',
          required: '请输入模版站Id',
          custom: ''
        },
        siteType: {
          label: '模版类型',
          tips: '',
          placeholder: '请选择模版类型',
          required: '请选择模版类型',
          custom: ''
        },
        sortIndex: {
          label: '排序',
          tips: '',
          placeholder: '排序',
          required: '请输入排序',
          custom: ''
        },
        state: {
          label: '是否启用',
          tips: '',
          placeholder: '是否启用',
          required: '请输入是否启用',
          custom: ''
        },
        synopsis: {
          label: '简介',
          tips: '',
          placeholder: '主题简介',
          required: '请输入主题简介',
          custom: ''
        },
        updateTime: {
          label: '更新时间',
          tips: '',
          placeholder: '更新时间',
          required: '请输入更新时间',
          custom: ''
        },
        version: {
          label: '版本号',
          tips: '',
          placeholder: '版本号',
          required: '请输入版本号',
          custom: ''
        }
      }
    },
    tag: {
      title: '主题标签',
      tips: '为主题模版归类',
      entity: {
        tagName: {
          label: '标签名称',
          tips: '',
          placeholder: '标签名称',
          required: '请输入标签名称',
          custom: ''
        }
      }
    },
    sectionTag: {
      title: '组件标签',
      tips: '为功能组件（SECTION）归类',
      entity: {
        tagName: {
          label: '标签名称',
          tips: '',
          placeholder: '标签名称',
          required: '请输入标签名称',
          custom: ''
        }
      }
    },
    page: {
      paging: {
        title: '模板页面',
        heading: '',
        subheading: '',
        add: '添加模板页面',
        empty: {
          content: '添加的模板页面会被列举在这里。您可以在这里管理所有模板页面，例如批量删除、修改等。',
          buttonLabel: '添加模板页面'
        },
        tableHeader: {
          addSection: '组件添加',
          bindSection: '默认组件',
          hasFloatMenu: '悬浮菜单',
          hasFooter: '页脚',
          hasHeader: '页头',
          menuVisible: '菜单可见',
          pageType: '页面类型',
          siteType: '适用网站',
          title: '页面名称',
          section: 'SECTION'
        }
      },
      update: {
        addTitle: '添加模板页面',
        updateTitle: '编辑模板页面',
        entity: {
          addSection: {
            label: '添加组件',
            tips: '',
            placeholder: '添加组件',
            required: '请输入添加组件',
            custom: ''
          },
          bindSection: {
            label: '默认组件',
            tips: '',
            placeholder: '默认组件',
            required: '请输入默认组件',
            custom: ''
          },
          hasFloatMenu: {
            label: '悬浮菜单',
            tips: '',
            placeholder: '悬浮菜单',
            required: '请输入悬浮菜单',
            custom: ''
          },
          hasFooter: {
            label: '页脚',
            tips: '',
            placeholder: '页脚',
            required: '请输入页脚',
            custom: ''
          },
          hasHeader: {
            label: '页头',
            tips: '',
            placeholder: '页头',
            required: '请输入页头',
            custom: ''
          },
          menuVisible: {
            label: '菜单可见',
            tips: '',
            placeholder: '菜单可见',
            required: '请输入菜单可见',
            custom: ''
          },
          pageType: {
            label: '页面类型',
            tips: '',
            placeholder: '页面类型',
            required: '请输入页面类型',
            custom: ''
          },
          siteType: {
            label: '网站类型',
            tips: '',
            placeholder: '网站类型',
            required: '请输入网站类型',
            custom: ''
          },
          title: {
            label: '页面名称',
            tips: '',
            placeholder: '页面名称',
            required: '请输入页面名称',
            custom: ''
          }
        }
      }
    },
    section: {
      paging: {
        title: '组件',
        heading: '',
        subheading: '',
        add: '添加组件',
        empty: {
          content: '添加的组件会被列举在这里。您可以在这里管理所有组件，例如批量删除、修改等。',
          buttonLabel: '添加组件'
        },
        tableHeader: {
          author: '作者',
          description: '组件介绍',
          dynamic: '数据组件',
          sectionGroup: '类型',
          sectionImage: '示意图',
          sectionIcon: 'SVG图标',
          sectionName: 'Section名称',
          sectionType: '组件类型',
          updateTime: '更新时间',
          tag: 'TAG',
          salt: '盐值',
          sectionSchema: 'SCHEMA'
        }
      },
      update: {
        addTitle: '添加组件',
        updateTitle: '编辑组件',
        entity: {
          sectionIcon: {
            label: '图标',
            tips: '',
            placeholder: '图标',
            required: '请输入图标',
            custom: ''
          },
          state: {
            label: '是否开放',
            tips: '',
            placeholder: '是否开放',
            required: '请输入是否开放',
            custom: ''
          },
          salt: {
            label: '盐值',
            tips: '',
            placeholder: '盐值',
            required: '请输入盐值',
            custom: ''
          },
          tag: {
            label: 'TAG',
            tips: '',
            placeholder: 'TAG',
            required: '请选择TAG',
            custom: ''
          },
          scriptCode: {
            label: '脚本代码',
            tips: '',
            placeholder: '脚本代码\n请使用packed压缩',
            required: '请输入脚本代码: https://tool.lu/js',
            custom: ''
          },
          variableCss: {
            label: '变量 CSS',
            tips: '',
            placeholder: '变量 CSS',
            required: '请输入变量 CSS',
            custom: ''
          },
          ampCss: {
            label: 'AMP CSS',
            tips: '',
            placeholder: 'AMP CSS',
            required: '请输入AMP CSS',
            custom: ''
          },
          ampTemplate: {
            label: 'AMP模板',
            tips: '',
            placeholder: 'AMP模板',
            required: '请输入AMP模板',
            custom: ''
          },
          artTemplate: {
            label: 'ART模板',
            tips: '',
            placeholder: 'ART模板',
            required: '请输入ART模板',
            custom: ''
          },
          author: {
            label: '作者',
            tips: '',
            placeholder: '作者',
            required: '请输入作者',
            custom: ''
          },
          baseCss: {
            label: '基础 CSS',
            tips: '',
            placeholder: '基础 CSS',
            required: '请输入基础 CSS',
            custom: ''
          },
          description: {
            label: '组件介绍',
            tips: '',
            placeholder: '组件介绍',
            required: '请输入组件介绍',
            custom: ''
          },
          dynamic: {
            label: '数据组件',
            tips: '',
            placeholder: '数据组件',
            required: '请输入数据组件',
            custom: ''
          },
          language: {
            label: '语言包',
            tips: '',
            placeholder: '语言包',
            required: '请输入语言包',
            custom: ''
          },
          sectionData: {
            label: '默认设置',
            tips: '',
            placeholder: '默认设置',
            required: '请输入默认设置',
            custom: ''
          },
          sectionGroup: {
            label: '类型',
            tips: '',
            placeholder: '类型',
            required: '请输入类型',
            custom: ''
          },
          sectionImage: {
            label: '示意图',
            tips: '',
            placeholder: '示意图',
            required: '请输入示意图',
            custom: ''
          },
          sectionName: {
            label: 'Section名称',
            tips: '',
            placeholder: 'Section名称',
            required: '请输入Section名称',
            custom: ''
          },
          sectionSchema: {
            label: 'SCHEMA',
            tips: '',
            placeholder: 'SCHEMA',
            required: '请输入SCHEMA',
            custom: ''
          },
          sectionType: {
            label: '组件类型',
            tips: '',
            placeholder: '组件类型',
            required: '请输入组件类型',
            custom: ''
          },
          thymeleafTemplate: {
            label: 'Thymeleaf模板',
            tips: '',
            placeholder: 'Thymeleaf模板',
            required: '请输入Thymeleaf模板',
            custom: ''
          },
          updateTime: {
            label: '更新时间',
            tips: '',
            placeholder: '更新时间',
            required: '请输入更新时间',
            custom: ''
          }
        }
      }
    },
    schema: {
      title: '主题设置',
      globalColorsSchema: '颜色',
      globalFaviconSchema: '收藏图标',
      globalGeneralSchema: '通用设置',
      globalSocialSchema: '社交媒体',
      globalTypographySchema: '字体',
      globalCss: {
        label: '基础CSS',
        tips: '',
        placeholder: '基础CSS',
        required: '请输入基础CSS',
        custom: ''
      },
      globalLanguage: {
        label: '基础语言包',
        tips: '',
        placeholder: '基础语言包',
        required: '请输入基础语言包',
        custom: ''
      },
      pageLayout: {
        label: '基础页面HTML',
        tips: '',
        placeholder: '基础页面HTML',
        required: '请输入内容',
        custom: ''
      }
    },
    pageSection: {
      paging: {
        title: '模板页面Section',
        heading: '',
        subheading: '',
        add: '添加模板页面Section',
        empty: {
          content: '添加的模板页面Section会被列举在这里。您可以在这里管理所有模板页面Section，例如批量删除、修改等。',
          buttonLabel: '添加模板页面Section'
        },
        tableHeader: {

          pageId: '页面id',
          pageType: '页面类型',
          sectionData: '数据源',
          sectionId: 'SECTION ID',
          sectionType: '关联的模块',
          sortIndex: '排序，越大越靠前',
          visible: '0为可见，1为隐藏'
        }
      },
      update: {
        addTitle: '添加模板页面Section',
        updateTitle: '编辑模板页面Section',
        entity: {
          pageType: {
            label: '页面类型',
            tips: '',
            placeholder: '页面类型',
            required: '请输入页面类型',
            custom: ''
          },
          sortIndex: {
            label: '排序，越大越靠前',
            tips: '',
            placeholder: '排序，越大越靠前',
            required: '请输入排序，越大越靠前',
            custom: ''
          }
        }
      }
    }
  },
  pageType: [
    {
      title: '首页',
      pageType: 'homePage',
      seoUrl: '/',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [2, 3, 4],
      dynamic: 0
    },
    {
      title: '文章集合页',
      pageType: 'articleCollectionPage',
      seoUrl: '/collection/article',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [3, 4],
      dynamic: 0,
      params: {
        multiple: 0,
        dataType: false,
        subs: 1,
        max: 0,
        removable: 0,
        name: {
          en: 'Standard',
          'zh-CN': '基础'
        },
        placeholder: {
          en: '',
          'zh-CN': ''
        },
        tips: {
          en: '',
          'zh-CN': ''
        },
        elements: [
          {
            'type': 'slider',
            'field': 'globalPageSize',
            'default': 10,
            'name': {
              'en': 'Page size',
              'zh-CN': '每页显示数量'
            },
            'info': {
              'en': '',
              'zh-CN': ''
            },
            'options': [],
            'min': 4,
            'max': 100,
            'step': 1
          }
        ]
      }
    },
    {
      title: '文章分页',
      pageType: 'articlePaginationPage',
      seoUrl: '/collection/{collectionId}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [3, 4],
      dynamic: 0,
      params: {
        multiple: 0,
        dataType: false,
        subs: 1,
        max: 0,
        removable: 0,
        name: {
          en: 'Standard',
          'zh-CN': '基础'
        },
        placeholder: {
          en: '',
          'zh-CN': ''
        },
        tips: {
          en: '',
          'zh-CN': ''
        },
        elements: [
          {
            'type': 'slider',
            'field': 'globalPageSize',
            'default': 10,
            'name': {
              'en': 'Page size',
              'zh-CN': '每页显示数量'
            },
            'info': {
              'en': '',
              'zh-CN': ''
            },
            'options': [],
            'min': 4,
            'max': 100,
            'step': 1
          }
        ]
      }
    },
    {
      title: '文章详情页',
      pageType: 'articleDetailPage',
      seoUrl: '/item/{url}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [3, 4],
      dynamic: 0
    },
    {
      title: '产品集合页',
      pageType: 'productCollectionPage',
      seoUrl: '/collection',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [3, 4],
      dynamic: 0,
      params: {
        multiple: 0,
        dataType: false,
        subs: 1,
        max: 0,
        removable: 0,
        name: {
          en: 'Standard',
          'zh-CN': '基础'
        },
        placeholder: {
          en: '',
          'zh-CN': ''
        },
        tips: {
          en: '',
          'zh-CN': ''
        },
        elements: [
          {
            'type': 'slider',
            'field': 'globalPageSize',
            'default': 10,
            'name': {
              'en': 'Page size',
              'zh-CN': '每页显示数量'
            },
            'info': {
              'en': '',
              'zh-CN': ''
            },
            'options': [],
            'min': 4,
            'max': 100,
            'step': 1
          }
        ]
      }
    },
    {
      title: '产品分页',
      pageType: 'productPaginationPage',
      seoUrl: '/collection/{collectionId}}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [3, 4],
      dynamic: 0,
      params: {
        multiple: 0,
        dataType: false,
        subs: 1,
        max: 0,
        removable: 0,
        name: {
          en: 'Standard',
          'zh-CN': '基础'
        },
        placeholder: {
          en: '',
          'zh-CN': ''
        },
        tips: {
          en: '',
          'zh-CN': ''
        },
        elements: [
          {
            'type': 'slider',
            'field': 'globalPageSize',
            'default': 10,
            'name': {
              'en': 'Page size',
              'zh-CN': '每页显示数量'
            },
            'info': {
              'en': '',
              'zh-CN': ''
            },
            'options': [],
            'min': 4,
            'max': 100,
            'step': 1
          }
        ]
      }
    },
    {
      title: '产品详情页',
      pageType: 'productDetailPage',
      seoUrl: '/item/{url}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [3, 4],
      dynamic: 0
    },
    {
      title: '下载分页',
      pageType: 'downloadPaginationPage',
      seoUrl: '/collection/download',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [3, 4],
      dynamic: 0,
      params: {
        multiple: 0,
        dataType: false,
        subs: 1,
        max: 0,
        removable: 0,
        name: {
          en: 'Standard',
          'zh-CN': '基础'
        },
        placeholder: {
          en: '',
          'zh-CN': ''
        },
        tips: {
          en: '',
          'zh-CN': ''
        },
        elements: [
          {
            'type': 'slider',
            'field': 'globalPageSize',
            'default': 10,
            'name': {
              'en': 'Page size',
              'zh-CN': '每页显示数量'
            },
            'info': {
              'en': '',
              'zh-CN': ''
            },
            'options': [],
            'min': 4,
            'max': 100,
            'step': 1
          }
        ]
      }
    },
    {
      title: 'TAG页',
      pageType: 'tagPage',
      seoUrl: '/tag',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [3, 4],
      dynamic: 0
    },
    {
      title: 'TAG信息页',
      pageType: 'tagPaginationPage',
      seoUrl: '/tag/{tagUrl}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [3, 4],
      dynamic: 0
    },
    {
      title: 'Search',
      pageType: 'searchPage',
      seoUrl: '/search',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [3, 4],
      dynamic: 0
    },
    {
      title: '404',
      pageType: 'pageNotFoundPage',
      seoUrl: '/404',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [2, 3, 4],
      dynamic: 0
    },
    {
      title: '自定义页',
      pageType: 'customPage',
      seoUrl: '/page/{url}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [2, 3, 4],
      dynamic: 0
    },
    {
      title: '感谢页',
      pageType: 'thanksPage',
      seoUrl: '/thanks',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [2, 3, 4],
      dynamic: 0
    },
    {
      title: '服务到期页',
      pageType: 'outOfServicePage',
      seoUrl: '/out-of-service',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [2, 3, 4],
      dynamic: 0
    },
    {
      title: '法律条款页',
      pageType: 'legalPage',
      seoUrl: '/legal/{code}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [2, 3, 4],
      dynamic: 0
    },
    {
      title: '通行证',
      pageType: 'passportPage',
      seoUrl: '/passport',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [2, 3, 4],
      dynamic: 0
    },
    {
      title: '修改密码',
      pageType: 'changePasswordPage',
      seoUrl: '/passport/change-password',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [2, 3, 4],
      dynamic: 0
    },
    {
      title: '重置密码',
      pageType: 'resetPasswordPage',
      seoUrl: '/passport/reset-password',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [2, 3, 4],
      dynamic: 0
    },
    {
      title: '购物车',
      pageType: 'shoppingCartPage',
      seoUrl: '/cart',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [3, 4],
      dynamic: 0
    },
    {
      title: '结算',
      pageType: 'checkoutPage',
      seoUrl: '/checkout',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [3, 4],
      dynamic: 0
    },
    {
      title: '收银台',
      pageType: 'cashierPage',
      seoUrl: '/cashier',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [3, 4],
      dynamic: 0
    },
    {
      title: '支付结果',
      pageType: 'paymentResultPage',
      seoUrl: '/payment/{id}/{status}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [3, 4],
      dynamic: 0
    },
    {
      title: '用户中心-订单',
      pageType: 'mineOrderPage',
      seoUrl: '/mine/orders',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [3, 4],
      dynamic: 0
    },
    {
      title: '用户中心-订单详情',
      pageType: 'mineOrderDetailPage',
      seoUrl: '/mine/orders/item/{id}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      siteType: [3, 4],
      dynamic: 0
    },
    {
      title: '用户中心-询盘',
      pageType: 'mineInquiryPage',
      seoUrl: '/mine/inquiry',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      siteType: [2, 3, 4],
      dynamic: 0
    },
    {
      title: '用户中心-询盘详情',
      pageType: 'mineInquiryDetailPage',
      seoUrl: '/mine/inquiry/item/{id}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      siteType: [2, 3, 4],
      dynamic: 0
    },
    {
      title: '用户中心-评论',
      pageType: 'mineCommentPage',
      seoUrl: '/mine/comment',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      siteType: [3, 4],
      dynamic: 0
    },
    {
      title: '用户中心-收藏',
      pageType: 'mineCollectPage',
      seoUrl: '/mine/collect',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      siteType: [3, 4],
      dynamic: 0
    },
    {
      title: '用户中心-优惠券',
      pageType: 'mineCouponPage',
      seoUrl: '/mine/coupon',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      siteType: [3, 4],
      dynamic: 0
    }
  ],
  globalSection: [
    {
      title: '网站页头',
      sectionType: 'header',
      sectionGroup: 2000,
      icon: '<svg t="1625644302660" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21364"><path d="M893.3960565 471.27278826H145.65042881v-209.36877569h747.74562769v209.36877569zM310.1544667 763.72607303V680.64156396h83.09946409v83.08450909H310.1544667z m333.99304722 2e-8V680.64156396h83.0994641v83.08450909H644.14751392z m-86.38954473 0H474.65850511V680.64156396h83.09946408v83.08450909z m333.99304722-232.63363474V614.1919024H808.65155232V531.09243833h83.0994641z m-83.09946409 149.54912565h83.09946409V763.74102802H808.65155232V680.64156396z m-579.90165942-149.54912565V614.1919024H145.65042881V531.09243833h83.09946409zM145.65042881 680.64156396h83.09946409V763.74102802H145.65042881V680.64156396z" p-id="21365"></path></svg>'
    },
    {
      title: '网站页脚',
      sectionType: 'footer',
      sectionGroup: 2000,
      icon: '<svg t="1625644315079" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21491"><path d="M130.6039435 552.72721174L878.34957119 552.72721174l0 209.36877569-747.74562769 0 0-209.36877569zM713.8455333 260.27392697L713.84553329 343.35843604l-83.09946408 0 0-83.08450909L713.84553329 260.27392695z m-333.99304721-2e-8L379.85248608 343.35843603l-83.0994641 1e-8 0-83.08450909L379.85248609 260.27392695z m86.38954472 0L549.34149489 260.27392695 549.34149489 343.35843604l-83.09946408 0 0-83.08450909z m-333.99304722 232.63363474L132.24898358 409.8080976 215.34844768 409.80809761 215.34844768 492.90756167l-83.0994641 0z m83.09946409-149.54912565l-83.09946409 0L132.24898359 260.25897198 215.34844768 260.25897198 215.34844768 343.35843604z m579.90165942 149.54912565L795.2501071 409.8080976 878.34957119 409.8080976 878.34957119 492.90756167l-83.09946409 0zM878.34957119 343.35843604l-83.09946409 0L795.2501071 260.25897198 878.34957119 260.25897198 878.34957119 343.35843604z" p-id="21492"></path></svg>'
    },
    {
      title: '悬浮菜单',
      sectionType: 'floatMenu',
      sectionGroup: 2000,
      icon: '<svg t="1625644279731" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21237"><path d="M552.727 893.396L552.727 145.65 762.096 145.65l0 747.746-209.369 0zM260.27399999 310.154l83.08400001 0 0 83.1-83.084 0-1e-8-83.1z m1e-8 333.994l83.084 0 0 83.099-83.084 0 0-83.1z m0-86.39l0-83.1 83.084 0 0 83.1-83.084 0z m232.634 333.993l-83.1 0 0-83.1 83.1 0 0 83.1z m-149.55-83.1l0 83.1-83.099 0 0-83.1 83.1 0zM492.90799999 228.75l-83.09999999 0 0-83.1 83.1 0-1e-8 83.1z m-149.54999999-83.1l0 83.1-83.099 0 0-83.1 83.1 0z" p-id="21238"></path></svg>'
    }
  ]
}
