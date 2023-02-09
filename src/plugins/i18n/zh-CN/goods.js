export default {
  variant: {
    heading: '变体商品',
    subheading: '如果该商品有多个不同的版本，例如颜色、尺寸等，您可以添加变体商品',
    // tips: '如果该商品有多个属性，例如颜色、尺寸等，您可以',
    entity: {
      value: {
        label: '属性值',
        placeholder: '请输入属性值',
        required: '属性值不能为空'
      },
      name: {
        label: '属性',
        placeholder: '请输入属性',
        required: '属性不能为空'
      }
    },
    defaultValue: [
      {
        variantName: 'Color',
        valueList: []
      },
      {
        variantName: 'Size',
        valueList: []
      },
      {
        variantName: 'Material',
        valueList: []
      }
    ],
    attrKey: '属性名',
    attrValue: '属性值',
    tips: '创建以下选中的变体商品',
    sku: 'SKU编号',
    skuContent: '请输入 SKU 编号',
    quickSelect: '快速选择',
    button: {
      addKey: '添加属性',
      addValue: '添加属性值',
      single: {
        label: '单品',
        english: {
          label: '英文版',
          key: 'Default',
          value: 'Default'
        },
        chinese: {
          label: '中文版',
          key: '默认',
          value: '默认'
        }
      }
    },
    batch: {
      title: '批量操作',
      image: 'SKU 图片',
      params: '价格 & 参数',
      remove: '删除 SKU'
    },
    edit: {
      heading: '修改属性'
    },
    /**
     * 批量图片
     */
    avatar: {
      heading: '更新商品图片',
      remove: '移除图片'
    },
    update: {
      sort: '调整顺序',
      edit: '修改属性',
      add: '添加 & 修改规格'
    }
  },
  specSelector: {
    heading: '规格参数',
    subheading: '为商品添加规格参数表，这部分内容会在网站展示给您的访客',
    paste: '参数粘帖',
    tips: '数组，包含3个参数',
    button: {
      title: '添加标题',
      item: '添加一项',
      clear: '清空'
    },
    entity: {
      key: {
        placeholder: '属性名'
      },
      value: {
        placeholder: '属性值'
      },
      title: {
        placeholder: '标题'
      }
    }
  },
  /**
   * 规格参数预设保存
   */
  specPresetSave: {
    dropdown: {
      label: '预设',
      save: '存为预设',
      select: '选择预设',
      digit: '字段转换',
      manage: '管理预设'
    },
    product: {
      heading: '保存为预设',
      subheading: '将当前规格参数表保存为预设，在编辑其他商品的的时候可以直接使用该表格格式内容'
    },
    entity: {
      title: {
        label: '预设名称',
        placeholder: '请输入预设名称',
        required: '预设名称不能为空',
        description: ''
      },
      isDefault: {
        label: '设为默认预设',
        placeholder: '',
        required: '',
        description: '创建新的商品时，规格参数表会使用默认预设'
      }
    }
  },
  /**
   * 规格参数预设选择
   */
  specPresetSelect: {
    heading: '选择预设',
    subheading: '选择一个预设，应用到本商品中'
  },
  /**
   * 规格参数预设管理
   */
  specPresetManage: {
    heading: '管理预设',
    subheading: '您可以修改、删除预设以及变更默认预设',
    title: {
      label: '预设名称',
      placeholder: '请输入预设名称',
      required: '预设名称不能为空',
      description: ''
    },
    tableHeader: {
      title: '预设名称',
      isDefault: '默认'
    }
  },
  /**
   * 购买按钮
   */
  buyButton: {
    title: '购买按钮',
    subheading: '在商品详情页中，会显示该购买按钮',
    buttonLabel: {
      label: '按钮名称',
      tips: '',
      placeholder: '例如 Amazon，Alibaba，Buy now 等',
      required: '请输入按钮名称',
      custom: ''
    },
    buttonLink: {
      label: '链接地址',
      tips: '',
      placeholder: '输入链接地址',
      required: '请输入按钮链接',
      custom: '请输入正确的链接地址'
    }
  },
  ladderPrice: {
    button: '编辑价格',
    heading: '编辑阶梯价格',
    subheading: '客户购买同一个商品下的各个SKU数量总和在指定阶梯范围内，将能享受对应阶梯价',
    step: '阶梯',
    add: '添加阶梯价',
    piece: '件',
    entity: {
      price: {
        label: '价格',
        placeholder: '销售价格',
        required: '请输入销售价格',
        custom: '请输入正确的销售价格'
      }
    }
  },
  goods: {
    variant: {
      title: '商品详情',
      updateTitle: '修改规格',
      add: '添加新规格',
      delete: '删除规格',
      edit: '编辑商品规格'
    },
    shelves: {
      on: '上架',
      off: '下架'
    },
    addition: {
      currency: '￥',
      shelfLife: '月'
    },
    priceType: {
      '0': '不报价',
      '1': '正常价格',
      '2': '阶梯价格'
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
      name: '产品名称',
      collection: '产品集合',
      tag: '产品标签'
    },
    paging: {
      title: '所有产品',
      heading: '',
      subheading: '',
      add: '添加产品',
      actions: {
        disable: '停用',
        enable: '启用',
        addCollection: '加入 & 移除集合',
        addTag: '加入 & 移除标签',
        sticky: '置顶',
        cancelSticky: '取消置顶',
        clone: {
          button: '复制产品',
          tips: '确定要复制选中的 {0} 个产品吗?？'
        }
      },
      empty: {
        content: '添加的产品信息会被列举在这里。您可以在这里管理所有产品信息，例如批量删除、修改等。',
        buttonLabel: '添加产品信息'
      },
      tableHeader: {
        comments: '评论数',
        coverImage: '图片',
        coverVideo: '视频地址',
        createTime: '创建时间',
        hits: '阅读次数',
        seoUrl: 'URL地址',
        minPrice: '销售价',
        sortIndex: '排序',
        state: '状态',
        sticky: '置顶',
        sales: '销量',
        skuCount: 'SKU',
        title: '标题',
        updateTime: '更新时间',
        visibilityTime: '上架时间'
      }
    },
    update: {
      addTitle: '添加产品',
      updateTitle: '编辑产品',
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
      attachment: '附件',
      pricePlan: '报价方式',
      entity: {
        barcode: {
          label: '条码',
          tips: '',
          placeholder: '条码',
          required: '请输入条码',
          custom: ''
        },
        hsCode: {
          label: '海关编码',
          tips: '',
          placeholder: '海关编码',
          required: '请输入海关编码',
          custom: ''
        },
        skuId: {
          label: 'SKU Id',
          tips: '',
          placeholder: 'SKU Id',
          required: '请输入SKU Id',
          custom: ''
        },
        skuImage: {
          label: '图片',
          tips: '',
          placeholder: '图片',
          required: '请输入图片',
          custom: ''
        },
        skuName: {
          label: '名称',
          tips: '',
          placeholder: '名称',
          required: '请输入名称',
          custom: ''
        },
        surplusStock: {
          label: '库存',
          tips: '',
          placeholder: '库存',
          required: '请输入库存',
          custom: '库存数量应该大于0'
        },
        marketPrice: {
          label: '市场价',
          tips: '',
          placeholder: '市场价',
          required: '请输入市场价',
          custom: '市场价应该大于0'
        },
        salePrice: {
          label: '销售价',
          tips: '',
          placeholder: '销售价',
          required: '请输入销售价',
          custom: '销售价应该大于0'
        },
        shelfLife: {
          label: '保质期',
          tips: '',
          placeholder: '保质期',
          required: '请输入保质期',
          custom: '保质期应该大于0'
        },
        weight: {
          label: '重量',
          tips: '',
          placeholder: '重量',
          required: '请输入重量',
          custom: ''
        },
        width: {
          label: '宽度',
          tips: '',
          placeholder: '宽度',
          required: '请输入宽度',
          custom: '宽度应该大于0'
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
          label: '产品详情',
          tips: '',
          placeholder: '产品详情',
          required: '请输入产品详情',
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
        subtitle: {
          label: '副标题',
          tips: '显示在网页列表中',
          placeholder: '副标题',
          required: '请输入副标题',
          custom: ''
        },
        summary: {
          label: '摘要',
          tips: '显示在详情页面中',
          placeholder: '摘要',
          required: '请输入摘要',
          custom: ''
        },
        title: {
          label: '产品名称',
          tips: '',
          placeholder: '产品名称',
          required: '请输入产品名称',
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
        label: '产品集合',
        placeholder: '输入集合名称',
        exist: '该集合已被添加',
        add: '添加集合',
        manage: '管理集合',
        loadingText: '加载中',
        noMatchText: '无匹配数据',
        noDataText: '无数据'
      },
      tags: {
        label: '产品标签',
        placeholder: '输入标签名称',
        exist: '该标签已被添加',
        add: '添加标签',
        manage: '管理标签',
        loadingText: '加载中',
        noMatchText: '无匹配数据',
        noDataText: '无数据'
      },
      design: {
        title: '个性化详情',
        design: '设计详情',
        save: '保存设计',
        content: '效果预览，实际的效果以界面设计器为准',
        tips: '点击设计详情，为您的产品介绍页面个性化设计吧'
      }
    },
    collection: {
      paging: {
        title: '产品集合',
        heading: '',
        subheading: '',
        add: '添加产品集合',
        actions: {
          disable: '停用',
          enable: '启用'
        },
        empty: {
          content: '添加的产品集合会被列举在这里。您可以在这里管理所有产品集合，例如批量删除、修改等。',
          buttonLabel: '添加产品集合'
        },
        tableHeader: {
          coverImage: '图片',
          refCount: '产品数量',
          state: '状态',
          title: '集合名称',
          updateTime: '更新时间'
        }
      },
      update: {
        addTitle: '添加产品集合',
        updateTitle: '编辑产品集合',
        selectArticle: '选择产品',
        dataHeading: '产品',
        addToCollection: '添加产品',
        entity: {
          banner: {
            label: '横幅图片',
            tips: '',
            placeholder: '横幅图片',
            required: '请输入横幅图片',
            custom: ''
          },
          collectionType: {
            label: '集合类型，1为手动，2为自动',
            tips: '',
            placeholder: '集合类型，1为手动，2为自动',
            required: '请输入集合类型，1为手动，2为自动',
            custom: ''
          },
          conditionData: {
            label: '查询条件的JSON',
            tips: '',
            placeholder: '查询条件的JSON',
            required: '请输入查询条件的JSON',
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
          createTime: {
            label: '创建时间',
            tips: '',
            placeholder: '创建时间',
            required: '请输入创建时间',
            custom: ''
          },
          deleteFlag: {
            label: '删除状态',
            tips: '',
            placeholder: '删除状态',
            required: '请输入删除状态',
            custom: ''
          },
          description: {
            label: '说明',
            tips: '',
            placeholder: '说明',
            required: '请输入说明',
            custom: ''
          },
          infoType: {
            label: '业务类型',
            tips: '',
            placeholder: '业务类型',
            required: '请输入业务类型',
            custom: ''
          },
          joinType: {
            label: '连接方式，1OR;2AND',
            tips: '',
            placeholder: '连接方式，1OR;2AND',
            required: '请输入连接方式，1OR;2AND',
            custom: ''
          },
          refCount: {
            label: '产品数量',
            tips: '',
            placeholder: '产品数量',
            required: '请输入产品数量',
            custom: ''
          },
          refId: {
            label: '引用Id',
            tips: '',
            placeholder: '引用Id',
            required: '请输入引用Id',
            custom: ''
          },
          region: {
            label: '语言标识',
            tips: '',
            placeholder: '语言标识',
            required: '请输入语言标识',
            custom: ''
          },
          seoDescription: {
            label: 'Meta描述',
            tips: '',
            placeholder: 'Meta描述',
            required: '请输入Meta描述',
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
          siteId: {
            label: '站点ID',
            tips: '',
            placeholder: '站点ID',
            required: '请输入站点ID',
            custom: ''
          },
          state: {
            label: '0启用，1停用',
            tips: '',
            placeholder: '0启用，1停用',
            required: '请输入0启用，1停用',
            custom: ''
          },
          title: {
            label: '标题',
            tips: '',
            placeholder: '标题',
            required: '请输入标题',
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
    /**
     * 商品 & 产品集合条件筛选器
     */
    conditionFilter: {
      collectionType: {
        label: '集合类型',
        tips: 'Tips: 集合创建后，类型将无法再变更',
        manual: {
          label: '手动',
          tips: '将产品手动逐个添加到本集合中'
        },
        auto: {
          label: '自动',
          tips: '设置规则，符合规则的产品将会自动归集到本集合中'
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
        title: '产品标签',
        heading: '',
        subheading: '',
        add: '添加产品标签',
        empty: {
          content: '添加的产品标签会被列举在这里。您可以在这里管理所有产品标签，例如批量删除、修改等。',
          buttonLabel: '添加产品标签'
        },
        tableHeader: {
          tagName: '标签名称'
        }
      },
      update: {
        addTitle: '添加产品标签',
        updateTitle: '编辑产品标签',
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
    },
    sku: {
      paging: {
        title: '商品SKU',
        heading: '',
        subheading: '',
        empty: {
          content: '添加的商品SKU会被列举在这里。您可以在这里管理所有商品SKU，例如批量删除、修改等。',
          buttonLabel: '添加商品SKU'
        },
        tableHeader: {
          barcode: '条码',
          costPrice: '成本价',
          deleteFlag: '删除标识',
          goodsPrice: '商品价',
          height: '高度',
          hsCode: '海关编码',
          length: '长度',
          lockStock: '锁定库存',
          marketPrice: '市场价',
          salePrice: '销售价',
          servicePrice: '服务费',
          shelfLife: '保质期',
          skuId: 'SKU Id',
          skuImage: '图片',
          skuName: '名称',
          soldStock: '已售库存',
          spuId: 'SPU Id',
          storageSkuId: '仓储SKU ID',
          surplusStock: '库存',
          vipPrice: '会员价',
          weight: '重量',
          width: '宽度'
        }
      },
      update: {
        addTitle: '添加商品SKU',
        updateTitle: '编辑商品SKU',
        entity: {
          barcode: {
            label: '条码',
            tips: '',
            placeholder: '条码',
            required: '请输入条码',
            custom: ''
          },
          costPrice: {
            label: '成本价',
            tips: '',
            placeholder: '成本价',
            required: '请输入成本价',
            custom: '成本价应该大于0'
          },
          goodsPrice: {
            label: '商品价',
            tips: '',
            placeholder: '商品价',
            required: '请输入商品价',
            custom: '商品价应该大于0'
          },
          height: {
            label: '高度',
            tips: '',
            placeholder: '高度',
            required: '请输入高度',
            custom: ''
          },
          hsCode: {
            label: '海关编码',
            tips: '',
            placeholder: '海关编码',
            required: '请输入海关编码',
            custom: ''
          },
          length: {
            label: '长度',
            tips: '',
            placeholder: '长度',
            required: '请输入长度',
            custom: '长度应该大于0'
          },
          lockStock: {
            label: '锁定库存',
            tips: '',
            placeholder: '锁定库存',
            required: '请输入锁定库存',
            custom: ''
          },
          marketPrice: {
            label: '市场价',
            tips: '',
            placeholder: '市场价',
            required: '请输入市场价',
            custom: '市场价应该大于0'
          },
          salePrice: {
            label: '销售价',
            tips: '',
            placeholder: '销售价',
            required: '请输入销售价',
            custom: '销售价应该大于0'
          },
          servicePrice: {
            label: '服务费',
            tips: '',
            placeholder: '服务费',
            required: '请输入服务费',
            custom: '服务费应该大于0'
          },
          shelfLife: {
            label: '保质期',
            tips: '',
            placeholder: '保质期',
            required: '请输入保质期',
            custom: '保质期应该大于0'
          },
          skuId: {
            label: 'SKU Id',
            tips: '',
            placeholder: 'SKU Id',
            required: '请输入SKU Id',
            custom: ''
          },
          skuImage: {
            label: '图片',
            tips: '',
            placeholder: '图片',
            required: '请输入图片',
            custom: ''
          },
          skuName: {
            label: '名称',
            tips: '',
            placeholder: '名称',
            required: '请输入名称',
            custom: ''
          },
          soldStock: {
            label: '已售库存',
            tips: '',
            placeholder: '已售库存',
            required: '请输入已售库存',
            custom: ''
          },
          spuId: {
            label: 'SPU Id',
            tips: '',
            placeholder: 'SPU Id',
            required: '请输入SPU Id',
            custom: ''
          },
          storageSkuId: {
            label: '仓储SKU ID',
            tips: '',
            placeholder: '仓储SKU ID',
            required: '请输入仓储SKU ID',
            custom: ''
          },
          surplusStock: {
            label: '库存',
            tips: '',
            placeholder: '库存',
            required: '请输入库存',
            custom: '库存数量应该大于0'
          },
          vipPrice: {
            label: '会员价',
            tips: '',
            placeholder: '会员价',
            required: '请输入会员价',
            custom: '会员价应该大于0'
          },
          weight: {
            label: '重量',
            tips: '',
            placeholder: '重量',
            required: '请输入重量',
            custom: ''
          },
          width: {
            label: '宽度',
            tips: '',
            placeholder: '宽度',
            required: '请输入宽度',
            custom: '宽度应该大于0'
          }
        }
      }
    }
  }
}
