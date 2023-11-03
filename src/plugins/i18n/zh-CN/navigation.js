export default {
  navigation: {
    aside: '导航菜单',
    async: '同步菜单',
    asyncTips: '请求已提交，系统会自动处理',
    menuType: [
      {
        value: 1,
        title: 'Header 顶栏菜单',
        limit: 4,
        subheading: '设置网站页头的导航菜单，通过拖动可以调整排序以及父子菜单关系（最多支持 3 级菜单）',
        describe: '显示在网站页头的全局菜单'
      },
      {
        value: 2,
        limit: 1,
        title: 'Footer 1 底栏菜单',
        subheading: '设置网站页脚的导航菜单，通过拖动可以调整排序',
        describe: '显示在网站页脚的全局菜单'
      },
      {
        value: 8,
        title: 'Footer 2 底栏菜单',
        limit: 1,
        subheading: '设置网站页脚的导航菜单，通过拖动可以调整排序',
        describe: '显示在网站页脚的全局菜单'
      },
      {
        value: 9,
        limit: 1,
        title: 'Footer 3 底栏菜单',
        subheading: '设置网站页脚的导航菜单，通过拖动可以调整排序',
        describe: '显示在网站页脚的全局菜单'
      },
      {
        value: 3,
        limit: 3,
        title: '商品列表页侧栏菜单',
        subheading: '设置商品列表页侧栏菜单，通过拖动可以调整排序（最多支持 3 级菜单）',
        describe: '显示在商品集合详情（即商品列表页）的全局菜单'
      },
      {
        value: 4,
        limit: 3,
        title: '文章列表页侧栏菜单',
        subheading: '设置文章列表页侧栏菜单，通过拖动可以调整排序（最多支持 3 级菜单）',
        describe: '显示在文章集合详情（即文章列表页）的全局菜单'
      }
    ],
    paging: {
      title: '网站导航',
      tableHeader: {
        title: '菜单名称',
        describe: '说明'
      }
    },
    update: {
      pageTitle: '网站导航',
      heading: '',
      subheading: '',
      add: '添加菜单',
      tableHeader: {
        level: '导航菜单级别',
        link: '链接地址',
        navType: '导航类型，1为顶部导航，2为底部',
        parentId: '上级编码',
        refId: '关联数据ID',
        refType: '关联数据类型',
        siteId: '网站编码',
        sort: '菜单排序',
        templateId: '模板ID',
        title: '导航名称'
      },
      header: {
        heading: 'Header顶栏导航',
        subheading: '设置网站页头的导航菜单，通过拖动可以调整排序以及父子菜单关系'
      },
      footer: {
        heading: 'Footer 底栏导航',
        subheading: '设置网站页脚的导航菜单，通过拖动可以调整排序（底栏导航不支持父子菜单）'
      },
      dialog: {
        heading: '编辑菜单'
      },
      entity: {
        title: {
          label: '导航名称',
          tips: '',
          placeholder: '导航名称',
          required: '请输入导航名称',
          custom: ''
        },
        link: {
          label: '链接地址',
          tips: '',
          placeholder: '链接地址',
          required: '请输入链接地址',
          custom: ''
        },
        target: {
          label: '打开方式',
          tips: '',
          placeholder: '链接打开方式',
          required: '',
          custom: ''
        },
        avatar: {
          label: '广告图片',
          tips: '',
          placeholder: '',
          required: '',
          custom: ''
        }
      }
    },
    /**
     * 导航更新
     */
    navigationUpdate: {
      paging: {
        title: '导航菜单'
      },
      target: {
        '_blank': '新窗口',
        '_self': '本窗口'
      },
      /**
       * 接链选择器
       */
      linkPicker: {
        placeholder: '查找或粘贴链接',
        records: '条记录',
        menu: {
          '3': [
            {
              label: '首页',
              id: 0,
              sub: false
            },
            {
              label: '商品',
              id: 1,
              sub: true,
              all: {
                title: '全部商品',
                url: '/products#全部商品'
              }
            },
            {
              label: '商品集合',
              id: 2,
              sub: true,
              all: {
                title: '全部商品集合',
                url: '/products/collection#全部商品集合'
              }
            },
            {
              label: '文章',
              id: 3,
              sub: true,
              all: {
                title: '全部文章',
                url: '/articles#全部文章'
              }
            },
            {
              label: '文章集合',
              id: 4,
              sub: true,
              all: {
                title: '全部文章集合',
                url: '/articles/collection#全部文章集合'
              }
            },
            {
              label: '自定义页',
              id: 5,
              sub: true
            },
            {
              label: '表单',
              id: 6,
              sub: true
            },
            {
              label: '下载集合',
              id: 7,
              sub: true
            },
            {
              label: '法律政策',
              id: 8,
              sub: true
            },
            {
              label: '不跳转',
              id: 99,
              sub: false
            }
          ],
          '2': [
            {
              label: '首页',
              id: 0,
              sub: false
            },
            {
              label: '表单',
              id: 6,
              sub: true
            },
            {
              label: '法律政策',
              id: 8,
              sub: true
            },
            {
              label: '不跳转',
              id: 99,
              sub: false
            }
          ],
          '4': [
            {
              label: '首页',
              id: 0,
              sub: false
            },
            {
              label: '商品',
              id: 1,
              sub: true,
              all: {
                title: '全部商品',
                url: '/products#全部商品'
              }
            },
            {
              label: '商品集合',
              id: 2,
              sub: true,
              all: {
                title: '全部商品集合',
                url: '/products/collection#全部商品集合'
              }
            },
            {
              label: '文章',
              id: 3,
              sub: true,
              all: {
                title: '全部文章',
                url: '/articles#全部文章'
              }
            },
            {
              label: '文章集合',
              id: 4,
              sub: true,
              all: {
                title: '全部文章集合',
                url: '/articles/collection#全部文章集合'
              }
            },
            {
              label: '自定义页',
              id: 5,
              sub: true
            },
            {
              label: '表单',
              id: 6,
              sub: true
            },
            {
              label: '下载集合',
              id: 7,
              sub: true
            },
            {
              label: '法律政策',
              id: 8,
              sub: true
            },
            {
              label: '不跳转',
              id: 99,
              sub: false
            }
          ]
        }
      }
    },
    /**
     * 错误提示
     */
    errorCode: {
      1507002: '请先删除子模块'
    }
  }
}
