export default {
  /**
   * 排序
   */
  sorting: {
    title: '整理',
    conditions: {
      timeDesc: '按创建时间，从新到旧'
    }
  },
  infoType: {
    '1': '文章',
    '2': '产品',
    '3': '下载'
  },
  conditionSizer: [
    {
      'field': 'art.title',
      'fieldLabel': '{label}名称',
      'type': 'String',
      'conditions': [
        {
          'operateLabel': '等于',
          'operate': '='
        },
        {
          'operateLabel': '不等于',
          'operate': '!='
        },
        {
          'operateLabel': '包含',
          'operate': 'LIKE'
        },
        {
          'operateLabel': '不包含',
          'operate': 'NOT LIKE'
        }
      ]
    },
    {
      'field': 'tag.tag_name',
      'fieldLabel': '{label}标签',
      'type': 'String',
      'conditions': [
        {
          'operateLabel': '等于',
          'operate': '='
        }
      ]
    },
    {
      'field': 'art.summary',
      'fieldLabel': '{label}摘要',
      'type': 'String',
      'conditions': [
        {
          'operateLabel': '等于',
          'operate': '='
        },
        {
          'operateLabel': '不等于',
          'operate': '!='
        },
        {
          'operateLabel': '包含',
          'operate': 'LIKE'
        },
        {
          'operateLabel': '不包含',
          'operate': 'NOT LIKE'
        }
      ]
    }
  ],
  /**
   * 标签管理器
   */
  tagsManager: {
    article: {
      heading: '管理文章标签',
      subheading: '以下是标签库中的全部文章标签，您可以将其从库中删除。标签如果已被应用到文章中，删除库中标签后将自动从文章中移除。'
    },
    product: {
      heading: '管理商品标签',
      subheading: '以下是标签库中的全部商品标签，您可以将其从库中删除。标签如果已被应用到商品中，删除库中标签后将自动从商品中移除。'
    }
  },
  orderBy: {
    updateTimeASC: '修改时间，旧到新',
    updateTimeDESC: '修改时间，新到旧',
    createTimeASC: '创建时间，旧到新',
    createTimeDESC: '创建时间，新到旧',
    initialASC: '名称，A-Z',
    initialDESC: '名称，Z-A'
  },
  /**
   * 新闻集合多选器
   */
  collectionSelector: {
    heading: '集合管理',
    loadingText: '加载中',
    noMatchText: '无匹配数据',
    noDataText: '无数据',
    remove: '移除集合',
    join: '加入集合',
    tips: '为选中的',
    item: '项'
  },
  /**
   * 添加到集合
   */
  tagSelect: {
    manage: '管理标签',
    goods: {
      title: '产品标签',
      label: '产品',
      add: '添加产品'
    },
    article: {
      title: '文章标签',
      label: '文章',
      add: '添加文章'
    },
    download: {
      title: '下载标签',
      label: '下载',
      add: '添加文件'
    }
  },
  /**
   * 标签多选器
   */
  tagsMultipleSelector: {
    heading: '标签管理',
    loadingText: '加载中',
    noMatchText: '无匹配数据',
    noDataText: '无数据',
    remove: '移除标签',
    join: '添加标签',
    tips: '为选中的',
    item: '项'
  },
  article: {
    translate: {
      action: '翻译',
      clone: '复制',
      label: '多语言'
    },
    orderBy: {
      updateTimeASC: '修改时间，旧到新',
      updateTimeDESC: '修改时间，新到旧',
      createTimeASC: '创建时间，旧到新',
      createTimeDESC: '创建时间，新到旧',
      initialASC: '名称，A-Z',
      initialDESC: '名称，Z-A',
      sortDesc: '序号倒序'
    },
    searchType: {
      name: '文章名称',
      collection: '文章集合',
      tag: '文章标签'
    },
    paging: {
      title: '所有文章',
      heading: '',
      subheading: '',
      add: '添加文章',
      actions: {
        disable: '停用',
        enable: '启用',
        addCollection: '加入 & 移除集合',
        addTag: '加入 & 移除标签',
        sticky: '置顶',
        cancelSticky: '取消置顶',
        clone: {
          button: '复制文章',
          tips: '确定要复制选中的 {0} 篇文章吗?？'
        }
      },
      empty: {
        content: '添加的文章信息会被列举在这里。您可以在这里管理所有文章信息，例如批量删除、修改等。',
        buttonLabel: '添加文章信息'
      },
      tableHeader: {
        comments: '评论数',
        coverImage: '封面图片',
        coverVideo: '视频地址',
        createTime: '创建时间',
        description: '文章内容',
        hits: '阅读次数',
        seoUrl: 'URL地址',
        sortIndex: '排序',
        state: '状态',
        sticky: '置顶',
        title: '标题',
        updateTime: '更新时间',
        visibilityTime: '上架时间'
      }
    },
    update: {
      addTitle: '添加文章',
      updateTitle: '编辑文章',
      attribute: {
        heading: '扩展属性',
        desc: '为商品添加更多的属性介绍，如：详细规格参数、应用场景、物流等',
        title: {
          label: '属性标题',
          placeholder: '属性标题',
          required: '请填写属性标题',
          custom: ''
        },
        content: {
          label: '属性内容',
          placeholder: '属性内容',
          required: '请填写属性内容',
          custom: ''
        }
      },
      entity: {
        subtitle: {
          label: '副标题',
          tips: '显示在网页列表中',
          placeholder: '副标题',
          required: '请输入副标题',
          custom: ''
        },
        summary: {
          label: '摘要',
          tips: '显示在新闻详情页面中',
          placeholder: '摘要',
          required: '请输入摘要',
          custom: ''
        },
        author: {
          label: '作者',
          tips: '',
          placeholder: '作者',
          required: '请输入作者',
          custom: ''
        },
        coverImage: {
          label: '图片',
          tips: '',
          placeholder: '图片',
          required: '请上传图片',
          custom: ''
        },
        coverVideo: {
          label: '视频地址',
          tips: '',
          placeholder: '视频地址',
          required: '请输入视频地址',
          custom: ''
        },
        createTime: {
          label: '创建时间',
          tips: '',
          placeholder: '创建时间',
          required: '请输入创建时间',
          custom: ''
        },
        description: {
          label: '文章内容',
          tips: '',
          placeholder: '文章内容',
          required: '请输入文章内容',
          custom: ''
        },
        initial: {
          label: '首字母',
          tips: '',
          placeholder: '首字母',
          required: '请输入首字母',
          custom: ''
        },
        source: {
          label: '来源',
          tips: '',
          placeholder: '来源',
          required: '请输入来源',
          custom: ''
        },
        specification: {
          label: '规格参数',
          tips: '',
          placeholder: '规格参数',
          required: '请输入规格参数',
          custom: ''
        },
        title: {
          label: '标题',
          tips: '',
          placeholder: '标题',
          required: '请输入标题',
          custom: ''
        },
        visibilityTime: {
          label: '上架时间',
          tips: '',
          placeholder: '上架时间',
          required: '请输入上架时间',
          custom: ''
        }
      },
      collection: {
        label: '文章集合',
        placeholder: '输入集合名称',
        exist: '该集合已被添加',
        add: '添加集合',
        manage: '管理集合',
        loadingText: '加载中',
        noMatchText: '无匹配数据',
        noDataText: '无数据'
      },
      tags: {
        label: '文章标签',
        placeholder: '输入标签名称',
        exist: '该标签已被添加',
        add: '添加标签',
        manage: '管理标签',
        loadingText: '加载中',
        noMatchText: '无匹配数据',
        noDataText: '无数据'
      }
    },
    collection: {
      all: '所有集合',
      goods: {
        title: '产品集合',
        label: '产品',
        add: '添加产品'
      },
      article: {
        title: '文章集合',
        label: '文章',
        add: '添加文章'
      },
      download: {
        title: '下载集合',
        label: '下载',
        add: '添加文件'
      },
      paging: {
        title: '文章集合',
        heading: '',
        subheading: '',
        add: '添加文章集合',
        actions: {
          disable: '停用',
          enable: '启用'
        },
        empty: {
          content: '添加的文章集合会被列举在这里。您可以在这里管理所有文章集合，例如批量删除、修改等。',
          buttonLabel: '添加文章集合'
        },
        tableHeader: {
          banner: '横幅图片',
          collectionType: '类型',
          coverImage: '封面图片',
          refCount: '引用数量',
          state: '状态',
          title: '标题',
          updateTime: '更新时间'
        }
      },
      update: {
        addTitle: '添加集合',
        updateTitle: '编辑集合',
        selectArticle: '选择文章',
        entity: {
          banner: {
            label: '横幅图片',
            tips: '',
            placeholder: '横幅图片',
            required: '请输入横幅图片',
            custom: ''
          },
          coverImage: {
            label: '封面图片',
            tips: '',
            placeholder: '封面图片',
            required: '请输入封面图片',
            custom: ''
          },
          coverVideo: {
            label: '视频地址',
            tips: '',
            placeholder: '视频地址',
            required: '请输入视频地址',
            custom: ''
          },
          description: {
            label: '说明',
            tips: '',
            placeholder: '说明',
            required: '请输入说明',
            custom: ''
          },
          accessPassword: {
            label: '访问密码',
            tips: '',
            placeholder: '访问密码',
            required: '请输入访问密码',
            custom: ''
          },
          title: {
            label: '集合名称',
            tips: '',
            placeholder: '集合名称',
            required: '请输入集合名称',
            custom: ''
          }
        }
      }
    },
    /**
     * 商品 & 文章集合条件筛选器
     */
    conditionFilter: {
      collectionType: {
        label: '集合类型',
        tips: 'Tips: 集合创建后，类型将无法再变更',
        manual: {
          label: '手动',
          article: '将文章手动逐个添加到本集合中',
          goods: '将产品手动逐个添加到本集合中',
          download: '将下载文件手动逐个添加到本集合中'
        },
        auto: {
          label: '自动',
          article: '设置规则，符合规则的文章将会自动归集到本集合中',
          goods: '设置规则，符合规则的产品将会自动归集到本集合中',
          download: '设置规则，符合规则的下载文件将会自动归集到本集合中'
        }
      },
      productType: {
        label: '集合类型',
        tips: 'Tips: 集合创建后，类型将无法再变更',
        manual: {
          label: '手动',
          tips: '将商品手动逐个添加到本集合中'
        },
        auto: {
          label: '自动',
          tips: '设置规则，符合规则的商品将会自动归集到本集合中'
        }
      },
      rule: {
        label: '规则',
        one: {
          label: '满足任意一个条件'
        },
        all: {
          label: '满足全部条件'
        }
      }
    },
    tag: {
      paging: {
        title: '标签',
        heading: '',
        subheading: '',
        add: '添加标签',
        empty: {
          content: '添加的标签会被列举在这里。您可以在这里管理所有标签，例如批量删除、修改等。',
          buttonLabel: '添加标签'
        },
        tableHeader: {
          tagName: '标签名称'
        }
      },
      update: {
        addTitle: '添加标签',
        updateTitle: '编辑标签',
        entity: {
          sortIndex: {
            label: '排序',
            tips: '',
            placeholder: '排序',
            required: '请输入排序',
            custom: ''
          },
          tagName: {
            label: '标签名称',
            tips: '',
            placeholder: '标签名称',
            required: '请输入标签名称',
            custom: ''
          },
          tagUrl: {
            label: '自定义URL',
            tips: '',
            placeholder: '自定义URL',
            required: '请输入自定义URL',
            custom: ''
          }
        }
      }
    }
  }
}
