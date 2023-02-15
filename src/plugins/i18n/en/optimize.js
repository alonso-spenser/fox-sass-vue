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
    tips: 'SEO meta information',
    engine: 'Google search result preview',
    edit: 'Edit SEO information',
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
        label: 'Page title',
        placeholder: 'Page title',
        required: 'Page title can\'t be empty',
        description: 'Important, page title will be displayed in the search results of the search engine'
      },
      seoDesc: {
        label: 'Page description',
        placeholder: 'Page description',
        required: '',
        description: 'Important, page description will be displayed in the search results of the search engine'
      },
      seoUrl: {
        label: 'URL',
        placeholder: 'Please enter a semantic URL',
        required: ''
      },
      seoKeywords: {
        label: 'Meta Keywords',
        placeholder: '请输入关键词',
        required: '',
        description: 'Most of the search engines except Google will include keywords (such as Baidu), fill in as needed, 3~5 keywords',
        addTag: '+ Add keyword',
        batchAddTag: '+ Batch add',
        batchInfo: 'Multiple keywords are separated by commas',
        batchUpdate: 'Update keywords'
      },
      seoH1: {
        label: 'H1 title',
        placeholder: 'H1 title',
        required: '',
        description: 'Important, h1 title will be displayed in the search results of the search engine and in the tab of the browser'
      }
    }
  }
}
