export default {
  settings: {
    /**
     * pane nav
     */
    tabPane: [
      {
        label: '网站信息',
        name: 'site-setting-general'
      },
      {
        label: '域名绑定',
        name: 'site-setting-domain'
      },
      {
        label: '法律政策',
        name: 'site-setting-legal'
      },
      {
        label: '追踪与分析',
        name: 'site-setting-tracking'
      },
      {
        label: '路由',
        name: 'site-setting-route'
      }
    ],
    heading: '网站设置',
    title: '网站信息',
    /**
     * 网站基本信息
     */
    basic: {
      paging: {
        title: '网站信息',
        desc: '平台以及您的用户会通过这些信息来联系您'
      },
      entity: {
        title: {
          label: '网站名称',
          placeholder: '请输入网站名称',
          required: '请输入网站名称'
        },
        addOnHeader: {
          label: '网站附加标题',
          tips: '',
          placeholder: '网站附加标题',
          required: '请输入网站附加标题',
          custom: ''
        },
        email: {
          label: '联系邮箱',
          placeholder: '请输入邮箱',
          required: '请输入邮箱地址',
          custom: '请输入有效邮箱'
        },
        currencyId: {
          label: '币种',
          placeholder: '请选择币种',
          required: '请选择币种'
        },
        langId: {
          label: '网站语言',
          placeholder: '请选择网站语言',
          required: '请选择网站语言'
        },
        timeZone: {
          label: '时区',
          placeholder: '请选择时区',
          required: '请选择时区'
        },
        lengthUnit: {
          label: '长度单位',
          placeholder: '请选择长度单位',
          required: '请选择长度单位'
        },
        weightUnit: {
          label: '重量单位',
          placeholder: '请选择重量单位',
          required: '请选择重量单位'
        },
        unitSystem: {
          label: '系统单位',
          placeholder: '请选择系统单位',
          required: '请选择系统单位'
        },
        address: {
          label: '公司完整地址（用于网页展示）',
          tips: '',
          placeholder: '公司完整地址（用于网页展示）',
          required: '请输入公司完整地址'
        },
        coordinate: {
          label: '公司坐标',
          tips: '',
          placeholder: '请输入公司地址关键词',
          required: '请输入公司地址',
          custom: ''
        },
        company: {
          label: '公司',
          tips: '',
          placeholder: '公司名称',
          required: '请输入公司名称',
          custom: ''
        },
        contact: {
          label: '联系人',
          tips: '',
          placeholder: '联系人',
          required: '请输入联系人',
          custom: ''
        },
        phone: {
          label: '联系电话',
          tips: '',
          placeholder: '联系电话',
          required: '请输入联系电话',
          custom: ''
        },
        cityName: {
          label: '城市',
          tips: '',
          placeholder: '城市',
          required: '请输入城市名称',
          custom: ''
        },
        targetMarket: {
          label: '目标市场',
          tips: '',
          placeholder: '目标市场',
          required: '请选择目标市场',
          custom: ''
        },
        longitude: {
          label: '经度',
          placeholder: '请填写经度',
          required: '请填写经度',
          custom: '请填写正确的经度'
        },
        latitude: {
          label: '纬度',
          placeholder: '请填写纬度',
          required: '请填写纬度',
          custom: '请填写正确的纬度'
        },
        freePhone: {
          label: '400电话',
          tips: '',
          placeholder: '400电话',
          required: '',
          custom: ''
        },
        mobile: {
          label: '手机号码',
          tips: '',
          placeholder: '手机号码',
          required: '',
          custom: ''
        },
        location: {
          label: '公司所在区域',
          tips: '',
          placeholder: '公司所在区域',
          required: '',
          custom: ''
        },
        downPass: {
          label: '通用下载密码',
          tips: '通用下载密码（产品附件）',
          placeholder: '请输入下载密码(数字 & 英文)',
          required: '请输入下载密码',
          custom: '密码由数字、英文组成'
        }
      },
      map: {
        title: '地图标记',
        searchSelect: [
          {
            label: '通过地址查找',
            value: 1
          }, {
            label: '通过经纬度查找',
            value: 2
          }

        ],
        explain: {
          label: '通过关键词搜索公司地址，并获取定位信息',
          content: '由于 "Google地图" 需要翻墙，编辑时使用百度地图用于获取定位，中文版的网页会自动使用"百度地图"，非中文版的网页会自动调用 "Google地图"',
          primary: '点击地图获取更准确的定位'
        }
      },
      langAndCurrency: {
        heading: '语言和币种',
        subheading: '网站展示的语言以及商品计价的币种单位',
        change: '变更币种',
        dialog: {
          heading: '选择币种',
          subheading: '您的网站中所有关于价格的地方都会使用该币种进行展示和记录，当您的客户下了第一笔订单之后，网站的币种不再支持变更。'
        },
        tableHeader: {
          countryName: '国家或地区',
          cnName: '中文名称',
          enName: '英文名称',
          code: '简写代码',
          symbol: '符号'
        }
      },
      timeAndUnit: {
        heading: '时间与单位',
        subheading: '用于计算您的商品价格、物流重量、订单时间'
      },
      unit: {
        heading: '度量衡'
      },
      siteStatus: {
        heading: '网站状态',
        normal: {
          label: '启用中',
          tips: '网站启用期间，用户可正常访问网站',
          button: '停用网站',
          affirm: '网站停用期间，您的访客将暂时无法访问网站。确认停用？',
          success: '网站已启用'
        },
        inactive: {
          label: '已停用',
          tips: '网站停用期间，用户将暂时无法访问网站',
          button: '启用网站',
          expiredButton: '网站已过期，请续费',
          affirm: '启用网站后，您的访客可以正常访问网站',
          success: '网站已停用'
        },
        freeze: {
          label: '冻结中',
          tips: '您的网站已被冻结，请联系我们进行解冻'
        }
      }

    },
    unpaid: {
      heading: '未激活',
      subheading: '该功能需要购买正式服务后才可使用',
      content: '如果您需要了解更详细的情况请联系我们',
      cancel: '我知道了',
      payment: '续费'
    },
    /**
     * 域名
     */
    domain: {
      add: '添加域名',
      title: '域名绑定',
      reConnect: '重连',
      primary: {
        title: '主域名',
        content: '当您的访客访问所有已连接的域名都会被重定向到此域名'
      },
      original: {
        title: '原始域名',
        content: '网站创建时系统分配的域名'
      },
      thirdParty: {
        title: '第三方域名',
        content: '第三方提供商提供的域名'
      },
      tableHeader: {
        name: '域名',
        status: '状态',
        ssl: 'SSL',
        date: '添加日期',
        provider: '提供商',
        reconnect: '重连'
      },
      status: {
        unconnected: '未连接',
        connected: '已连接',
        exists: '域名已存在，请更换其它域名'
      },
      delete: {
        heading: '删除域名',
        content: '您确认要删除该域名吗？'
      },
      change: {
        button: '变更',
        heading: '变更主域名',
        content: '您确认变更主域名吗？您的访客以及搜索引擎将会看到这个域名？'
      },
      /**
       *
       * 添加域名
       */
      connect: {
        title: '添加域名',
        nextStep: '下一步',
        domain: '网站域名',
        domainName: '域名',
        edit: '返回修改',
        verify: '验证',
        cname: '使用 <b class="text-primary">CNAME</b> 将域名解析到',
        guide: '域名设置指引',
        verifyAgain: '再次验证',
        settings: '第三方域名设置',
        settingTips: '您需要登录到您的域名提供商账户后台进行域名连接的设置。',
        checkTips: '验证连接以确保您的域名设置是正确的（请您完成第三方域名设置后再进行验证） ',
        reconnectSuccess: '重连完成，现已可以通过该域名正常访问网站',
        reconnectFailed: '重连失败，请联系您的域名提供商以定位异常问题',
        success: '解析正确',
        entity: {
          domain: {
            label: '域名',
            placeholder: `例如 www.${process.env.VUE_APP_DESIGN_DOMAIN}`,
            required: '请输入您需要连接的域名',
            custom: '域名格式不正确'
          }
        },
        validate: {
          record: 'CNAME 记录（@）',
          current: '当前值：',
          required: '要求值：',
          success: {
            heading: '验证完成',
            subheading: '您的域名已完成添加'
          },
          failed: {
            heading: '验证失败',
            subheading: '请检查您需要设置的参数并确认无误后再进行验证'
          }
        },
        setting: {
          heading: '第三方域名设置',
          subheading: '您需要登录到您的域名提供商账户后台进行域名连接的设置。',
          guide: '域名设置指引'
        }
      }
    },
    /**
     * 添加域名
     */
    connect: {
      paging: {
        title: '添加域名'
      }
    },
    /**
     * 法律政策
     */
    legal: {
      paging: {
        title: '法律政策'
      },
      update: {
        title: '法律政策',
        template: '从模版中替换',
        entity: {
          privacyPolicy: {
            label: '隐私政策',
            tips: '',
            placeholder: '隐私政策',
            required: '请输入隐私政策',
            custom: ''
          },
          refundPolicy: {
            label: '退款政策',
            tips: '',
            placeholder: '退款政策',
            required: '请输入退款政策',
            custom: ''
          },
          shippingPolicy: {
            label: '运输政策',
            tips: '',
            placeholder: '运输政策',
            required: '请输入运输政策',
            custom: ''
          },
          termsOfService: {
            label: '服务条款',
            tips: '',
            placeholder: '服务条款',
            required: '请输入服务条款',
            custom: ''
          }
        }
      }
    },

    /***
     * 追踪 && 分析
     */
    tracking: {
      paging: {
        title: '追踪与分析'
      },
      update: {
        facebook: {
          heading: 'Facebook像素',
          subheading: 'Facebook 像素帮助您创建广告活动，以找到最像您的买家的新客户。<a class="text-primary" target="_blank" href="https://www.facebook.com/business/help/651294705016616">前往Facebook官网进一步了解Facebook 像素</a>'
        },
        gtag: {
          heading: 'Google Analytics 谷歌分析',
          subheading: 'Google Analytics 可以帮助您追踪网站的访问数据并且能够生成帮助您做市场分析的报告。<a class="text-primary" target="_blank" href="https://www.facebook.com/business/help/651294705016616">如何设置？</a>'
        },
        entity: {
          facebookPixel: {
            label: 'Facebook像素ID',
            placeholder: '请输入Facebook像素ID',
            required: '请输入Facebook像素ID'
          },
          scriptHead: {
            label: '跟踪代码 <Head>',
            placeholder: '请输入或粘贴代码',
            required: '',
            info: '此处可以放置 Google Analytics, Google Tag Manager, Facebook像素等三方代码。<p class="m-0">也可以放置如 Google 域名验证 &lt;meta name="google-site-verification" content="验证码"&gt; </p> <p class="m-0">不同的代码按回车键换行放置。此段代码将放置于网页 <b class="text-primary">Head</b> 中</p>'
          },
          scriptBottom: {
            label: '跟踪代码 <Body>',
            placeholder: '请输入或粘贴代码',
            required: '',
            info: '此处可放置客户自定义代码，Google Tag Manager 第二段代码，第三方客服代码等。<p class="m-0">此段代码将放置于网页 <b class="text-primary">Body</b> 结尾处</p>'
          }
        }
      }
    },
    route: {
      tips: '一条跳转记录一行，旧网址与新网址间用空格间隔。网址使用绝对路径，以 / 开始，不带域名',
      refType: {
        '0': '系统',
        '9': '自定义'
      },
      paging: {
        title: '网站路由',
        heading: '',
        subheading: '',
        add: '添加网站路由',
        empty: {
          content: '添加的网站路由会被列举在这里。您可以在这里管理所有网站路由，例如批量删除、修改等。',
          buttonLabel: '添加网站路由'
        },
        tableHeader: {
          original: '源地址',
          refId: '原始ID',
          refType: '类型',
          siteId: '网站ID',
          state: '状态',
          target: '目标地址'
        }
      },
      update: {
        addTitle: '添加网站路由',
        updateTitle: '编辑网站路由',
        entity: {
          original: {
            label: '源地址',
            tips: '',
            placeholder: '源地址',
            required: '请输入源地址',
            custom: ''
          },
          target: {
            label: '目标地址',
            tips: '',
            placeholder: '目标地址',
            required: '请输入目标地址',
            custom: ''
          }
        }
      }
    }
  }
}
