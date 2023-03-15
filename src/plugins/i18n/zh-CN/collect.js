export default {
  collect: {
    rule: {
      paging: {
        title: '采集规则',
        heading: '',
        subheading: '',
        add: '添加采集规则',
        empty: {
          content: '添加的采集规则会被列举在这里。您可以在这里管理所有采集规则，例如批量删除、修改等。',
          buttonLabel: '添加采集规则'
        },
        tableHeader: {
          brandSelector: '品牌 CSS选择器',
          detailDescriptionSelector: '详情页 内容CSS选择器',
          detailImgSrcSelector: '详情页 图片地址 CSS选择器',
          detailSummarySelector: '详情页 摘要CSS选择器',
          detailTitleSelector: '详情页 标题CSS选择器',
          domain: '域名',
          firstPage: '首页',
          itemLink: '详情链接 CSS选择器',
          imgListSelector: '多图 CSS选择器',
          imgListSrcSelector: '图片地址 CSS选择器',
          itemImgSelector: '图片CSS选择器',
          itemImgSrcRemoveSelector: '图片需要移除部分CSS选择器',
          itemImgSrcSelector: '图片地址 CSS选择器',
          itemSelector: '项目CSS选择器',
          itemSummarySelector: '摘要 CSS选择器',
          itemTitleSelector: '标题CSS选择器',
          lastPage: '末页',
          pageDetailPrefix: '详情页URL前缀',
          pagingUrl: '分页URL，页码用{page}',
          platformCode: '第三方平台代号',
          siteId: '网站ID',
          skuListImgSelector: 'SKU 图片 CSS选择器',
          skuListSelector: 'SKU CSS选择器',
          skuListSrcSelector: '图片地址 CSS选择器',
          skuListValueSelector: 'SKU 属性值 CSS选择器',
          skuListKeySelector: 'SKU 属性名 CSS选择器',
          specKeySelector: '规格参数 KEY CSS选择器',
          specSelector: '规格参数 CSS选择器',
          specValueSelector: '规格参数 VALUE CSS选择器',
          startPage: '第二页',
          imgSeparator: '图片分隔符',
          timeFormat: '时间格式化',
          timePattern: '时间提取正则',
          timeSelector: '时间选择器',
          itemSubtitleSelector: '副标题CSS选择器',
          title: '网站标题'
        }
      },
      update: {
        article: '文章采集',
        updateTitle: '编辑采集规则',
        entity: {
          itemSubtitleSelector: {
            label: '副标题',
            tips: '',
            placeholder: '副标题CSS选择器',
            required: '请输入副标题CSS选择器',
            custom: ''
          },
          timeFormat: {
            label: '格式化',
            tips: '',
            placeholder: '时间格式化',
            required: '请输入时间格式化',
            custom: ''
          },
          timePattern: {
            label: '提取正则',
            tips: '',
            placeholder: '时间提取正则',
            required: '请输入时间提取正则',
            custom: ''
          },
          timeSelector: {
            label: '选择器',
            tips: '',
            placeholder: '时间选择器',
            required: '请输入时间选择器',
            custom: ''
          },
          imgSeparator: {
            label: '图片分隔符',
            tips: '',
            placeholder: '图片分隔符',
            required: '请输入图片分隔符',
            custom: ''
          },
          itemLink: {
            label: '详情链接',
            tips: '',
            placeholder: '详情链接 CSS选择器',
            required: '请输入详情链接 CSS选择器',
            custom: ''
          },
          brandSelector: {
            label: '品牌',
            tips: '',
            placeholder: '品牌 CSS选择器',
            required: '请输入品牌 CSS选择器',
            custom: ''
          },
          detailDescriptionSelector: {
            label: '内容',
            tips: '',
            placeholder: '详情页 内容CSS选择器',
            required: '请输入详情页 内容CSS选择器',
            custom: ''
          },
          detailImgSrcSelector: {
            label: '图片地址',
            tips: '',
            placeholder: '详情页 图片地址 CSS选择器',
            required: '请输入详情页 图片地址 CSS选择器',
            custom: ''
          },
          detailSummarySelector: {
            label: '摘要',
            tips: '',
            placeholder: '详情页 摘要CSS选择器',
            required: '请输入详情页 摘要CSS选择器',
            custom: ''
          },
          detailTitleSelector: {
            label: '标题',
            tips: '',
            placeholder: '详情页 标题CSS选择器',
            required: '请输入详情页 标题CSS选择器',
            custom: ''
          },
          domain: {
            label: '域名',
            tips: '',
            placeholder: 'eg. www.domain.com',
            required: '请输入域名',
            custom: ''
          },
          firstPage: {
            label: '首页URL',
            tips: '',
            placeholder: 'eg. https://www.domain.com/singing-and-dancing-plush-toys/',
            required: '首页URL',
            custom: ''
          },
          imgListSelector: {
            label: '多图',
            tips: '',
            placeholder: '多图 CSS选择器',
            required: '请输入多图 CSS选择器',
            custom: ''
          },
          imgListSrcSelector: {
            label: '图片地址',
            tips: '',
            placeholder: '图片地址 CSS选择器',
            required: '请输入图片地址 CSS选择器',
            custom: ''
          },
          itemImgSelector: {
            label: '图片',
            tips: '',
            placeholder: '图片CSS选择器',
            required: '请输入图片CSS选择器',
            custom: ''
          },
          itemImgSrcRemoveSelector: {
            label: '图片需要移除部分CSS选择器',
            tips: '',
            placeholder: '图片需要移除部分CSS选择器',
            required: '图片需要移除部分CSS选择器',
            custom: ''
          },
          itemImgSrcSelector: {
            label: '图片地址',
            tips: '',
            placeholder: '图片地址 CSS选择器',
            required: '请输入图片地址 CSS选择器',
            custom: ''
          },
          itemSelector: {
            label: '项目',
            tips: '',
            placeholder: '项目CSS选择器',
            required: '请输入项目CSS选择器',
            custom: ''
          },
          itemSummarySelector: {
            label: '摘要',
            tips: '',
            placeholder: '摘要 CSS选择器',
            required: '请输入摘要 CSS选择器',
            custom: ''
          },
          itemTitleSelector: {
            label: '标题',
            tips: '',
            placeholder: '标题CSS选择器',
            required: '请输入标题CSS选择器',
            custom: ''
          },
          lastPage: {
            label: '末页',
            tips: '',
            placeholder: '末页',
            required: '请输入末页',
            custom: '请输入正整数'
          },
          pageDetailPrefix: {
            label: '详情页URL前缀',
            tips: '',
            placeholder: 'https://www.hayidaiusa.com/',
            required: '请输入详情页URL前缀',
            custom: ''
          },
          pagingUrl: {
            label: '分页URL 页码变量：{page}',
            tips: '',
            placeholder: 'https://www.domain.com/products/{page}/',
            required: '请输入分页URL，页码用{page}',
            custom: ''
          },
          platformCode: {
            label: '第三方平台代号',
            tips: '',
            placeholder: '第三方平台代号',
            required: '请输入第三方平台代号',
            custom: ''
          },
          skuListImgSelector: {
            label: '图片',
            tips: '',
            placeholder: 'SKU 图片 CSS选择器',
            required: '请输入SKU 图片 CSS选择器',
            custom: ''
          },
          skuListSelector: {
            label: 'SKU',
            tips: '',
            placeholder: 'SKU CSS选择器',
            required: '请输入SKU CSS选择器',
            custom: ''
          },
          skuListSrcSelector: {
            label: '图片地址',
            tips: '',
            placeholder: '图片地址 CSS选择器',
            required: '请输入图片地址 CSS选择器',
            custom: ''
          },
          skuListValueSelector: {
            label: 'SKU 属性值',
            tips: '',
            placeholder: 'SKU 属性值 CSS选择器',
            required: '请输入SKU 属性值 CSS选择器',
            custom: ''
          },
          skuListKeySelector: {
            label: 'SKU 属性名',
            tips: '',
            placeholder: 'SKU 属性名 CSS选择器',
            required: '请输入SKU 属性名 CSS选择器',
            custom: ''
          },
          specKeySelector: {
            label: '规格参数 KEY',
            tips: '',
            placeholder: '规格参数 KEY CSS选择器',
            required: '请输入规格参数 KEY CSS选择器',
            custom: ''
          },
          specSelector: {
            label: '规格参数',
            tips: '',
            placeholder: '规格参数 CSS选择器',
            required: '请输入规格参数 CSS选择器',
            custom: ''
          },
          specSelectorGroup: {
            label: '规格参数分组',
            tips: '',
            placeholder: '规格参数分组 CSS选择器',
            required: '请输入规格参数分组 CSS选择器',
            custom: ''
          },
          specTitleSelector: {
            label: '规格参数分组标题 KEY',
            tips: '',
            placeholder: '规格参数分组标题 KEY CSS选择器',
            required: '请输入规格参数分组标题 KEY CSS选择器',
            custom: ''
          },
          specValueSelector: {
            label: '规格参数 VALUE',
            tips: '',
            placeholder: '规格参数 VALUE CSS选择器',
            required: '请输入规格参数 VALUE CSS选择器',
            custom: ''
          },
          startPage: {
            label: '第二页',
            tips: '',
            placeholder: '第二页',
            required: '请输入第二页',
            custom: '请输入正整数'
          },
          title: {
            label: '网站标题',
            tips: '',
            placeholder: '网站标题',
            required: '请输入网站标题',
            custom: ''
          },
          domainRoot: {
            label: '域名 (http或https开始）结尾不要 / ',
            tips: '',
            placeholder: 'eg: https://www.domain.com',
            required: '请输入域名',
            custom: ''
          }
        }
      }
    },
    alibaba: {
      title: '阿里国际站产品导入',
      ids: {
        label: '阿里国际站产品ID列表',
        tips: '',
        placeholder: '阿里国际站产品ID列表，多个ID以半角逗号相分割',
        required: '请输入阿里国际站产品ID列表',
        custom: ''
      }
    }
  }
}
