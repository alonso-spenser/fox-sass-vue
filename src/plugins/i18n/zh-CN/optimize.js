export default {
  seo: {
    paging: {
      title: 'SEO设置',
      keyWordExplain: 'Meta关键词批量添加以逗号添加'
    },
    step: {
      one: '1.选择页面',
      two: '2.设置SEO元信息',
      three: '3.发布'
    },
    tabPane: {
      goods: '产品',
      goodsCollect: '产品集合',
      article: '文章',
      articleCollection: '文章集合',
      customPage: '自定义页面',
      page: '页面'
    },
    tableHeader: {
      preview: '预览',
      coverImage: '图片'
    },
    entity: {
      seoDescription: {
        label: 'Description',
        tips: '',
        placeholder: 'Meta描述',
        required: '请输入Meta描述',
        custom: ''
      },
      seoH1: {
        label: 'H1 标题',
        tips: '',
        placeholder: 'H1 标题',
        required: '请输入H1 标题',
        custom: ''
      },
      seoKeywords: {
        label: 'Meta关键词',
        tips: '',
        placeholder: 'Meta关键词',
        required: '请输入Meta关键词',
        custom: ''
      },
      seoTitle: {
        label: '页面标题',
        tips: '',
        placeholder: '页面标题',
        required: '请输入页面标题',
        custom: ''
      },
      seoUrl: {
        label: 'URL地址',
        tips: '',
        placeholder: 'URL地址',
        required: '请输入URL地址',
        custom: ''
      },
      title: {
        label: '文章标题',
        tips: '',
        placeholder: '文章标题',
        required: '请输入文章标题',
        custom: ''
      }
    },
    update: {
      title: '更新SEO',
      addKey: '添加关键词'
    }
  },
  /**
   * 搜索引擎优化组件
   */
  searchEngine: {
    heading: 'SEO',
    tips: '设置该页面的SEO元信息',
    engine: '搜索引擎列表预览',
    edit: '编辑SEO信息',
    visible: '添加标题和说明，以了解此页面在搜索引擎列表中的显示方式',
    title: {
      goods: {
        label: '产品名称',
        placeholder: '产品名称',
        required: '',
        description: '请输入产品名称'
      },
      goodsCollection: {
        label: '集合名称',
        placeholder: '集合名称',
        required: '',
        description: '请输入集合名称'
      },
      article: {
        label: '文章标题',
        placeholder: '文章标题',
        required: '',
        description: '请输入文章标题'
      },
      articleCollection: {
        label: '集合名称',
        placeholder: '集合名称',
        required: '',
        description: '请输入集合名称'
      },
      customPage: {
        label: '页面名称',
        placeholder: '页面名称',
        required: '',
        description: '页面名称'
      },
      commonPage: {
        label: '页面名称',
        placeholder: '页面名称',
        required: '',
        description: '页面名称'
      }
    },
    entity: {
      seoTitle: {
        label: '页面标题',
        placeholder: '请输入标题',
        required: '页面标题不能为空',
        description: '重要，该部分内容会显示在搜索引擎的搜索结果当中'
      },
      seoDesc: {
        label: '页面描述',
        placeholder: '页面描述',
        required: '',
        description: '建议填写，该部分内容会显示在搜索引擎的搜索结果当中'
      },
      seoUrl: {
        label: 'URL',
        placeholder: '请输入语义化的URL',
        required: ''
      },
      seoKeywords: {
        label: 'Meta关键字',
        placeholder: '请输入关键词',
        required: '',
        description: '除谷歌以外的部分搜索引擎会抓取这部分内容（例如百度），按需填写，不宜过多',
        addTag: '+ 新增关键词',
        batchAddTag: '+ 批量添加',
        batchInfo: '多个关键词用逗号分隔',
        batchUpdate: '更新关键词'
      },
      seoH1: {
        label: 'H1标题',
        placeholder: 'H1标题',
        required: '',
        description: '建议填写，该部分内容会显示在搜索引擎的搜索结果以及浏览器的页签当中'
      }
    }
  }
}
