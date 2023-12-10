export default {
  dataType: [
    {
      value: 0,
      title: '集合包含数据/询盘详情'
    },
    {
      value: 1,
      title: '集合列表'
    },
    {
      value: 2,
      title: '集合 & 数据列表'
    },
    {
      value: 3,
      title: '菜单'
    }
  ],
  /**
     * 基本组件
     */
  section: {
    multiple: 0,
    dataType: false,
    /**
         * 如果节点为循环
         */
    subs: 1,
    max: 0,
    name: {
      en: '',
      'zh-CN': ''
    },
    placeholder: {
      en: '',
      'zh-CN': ''
    },
    tips: {
      en: '',
      'zh-CN': ''
    },
    elements: []
  },
  /**
     * 基本元素
     */
  element: {
    standard: {
      type: 'text',
      field: '',
      default: '',
      translate: 1,
      name: {
        en: '',
        'zh-CN': ''
      },
      info: {
        en: '',
        'zh-CN': ''
      },
      options: []
    },
    option: {
      value: '',
      name: {
        en: '',
        'zh-CN': ''
      }
    }
  },
  /**
     * 预设置
     */
  sections: [
    {
      target: {
        label: '链接方式',
        dataType: false,
        schema: {
          type: 'select',
          field: 'target',
          default: '_self',
          translate: 1,
          name: {
            en: 'Target',
            'zh-CN': '打开方式'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: [
            {
              value: '_self',
              name: {
                en: 'Self',
                'zh-CN': '本窗口'
              }
            },
            {
              value: '_blank',
              name: {
                en: 'Blank',
                'zh-CN': '新窗口'
              }
            }
          ]
        }
      },
      buttonLink: {
        label: '按钮链接',
        dataType: false,
        schema: {
          type: 'linkPicker',
          field: 'buttonLink',
          default: '',
          translate: 1,
          name: {
            en: 'Button link',
            'zh-CN': '按钮链接'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        }
      },
      buttonStyle: {
        label: '按钮样式',
        dataType: false,
        schema: {
          type: 'select',
          field: 'buttonStyle',
          default: 'invisible',
          translate: 1,
          name: {
            en: 'button style',
            'zh-CN': '按钮样式'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: [
            {
              value: 'btn-primary',
              name: {
                en: 'Primary',
                'zh-CN': '主按钮填充'
              }
            },
            {
              value: 'btn-outline-primary',
              name: {
                en: 'Outline Primary',
                'zh-CN': '主按钮描边'
              }
            },
            {
              value: 'btn-dark',
              name: {
                en: 'Dark',
                'zh-CN': '深色填充'
              }
            },
            {
              value: 'btn-outline-dark',
              name: {
                en: 'Outline Dark',
                'zh-CN': '深色描边'
              }
            },
            {
              value: 'btn-light',
              name: {
                en: 'Light',
                'zh-CN': '浅色填充'
              }
            },
            {
              value: 'btn-outline-light',
              name: {
                en: 'Outline Light',
                'zh-CN': '浅色描边'
              }
            },
            {
              value: 'btn-secondary',
              name: {
                en: 'Secondary',
                'zh-CN': '灰色填充'
              }
            },
            {
              value: 'btn-outline-secondary',
              name: {
                en: 'Outline Secondary',
                'zh-CN': '灰色描边'
              }
            },
            {
              value: 'btn-success',
              name: {
                en: 'Success',
                'zh-CN': '绿色填充'
              }
            },
            {
              value: 'btn-outline-success',
              name: {
                en: 'Outline Success',
                'zh-CN': '绿色描边'
              }
            },
            {
              value: 'btn-danger',
              name: {
                en: 'Danger',
                'zh-CN': '红色填充'
              }
            },
            {
              value: 'btn-outline-danger',
              name: {
                en: 'Outline Danger',
                'zh-CN': '红色描边'
              }
            },
            {
              value: 'btn-warning',
              name: {
                en: 'Warning',
                'zh-CN': '警告色填充'
              }
            },
            {
              value: 'btn-outline-warning',
              name: {
                en: 'Outline Warning',
                'zh-CN': '警告色描边'
              }
            },
            {
              value: 'btn-info',
              name: {
                en: 'Warning',
                'zh-CN': '青色填充'
              }
            },
            {
              value: 'btn-outline-info',
              name: {
                en: 'Outline Warning',
                'zh-CN': '青色描边'
              }
            },
            {
              value: 'invisible',
              name: {
                en: 'Invisible',
                'zh-CN': '不显示'
              }
            }
          ]
        }
      },
      paragraphSymbol: {
        label: '段落符号',
        dataType: false,
        schema: {
          default: 'list-demical',
          field: 'symbol',
          translate: 1,
          name: {
            en: 'Paragraph symbol',
            'zh-CN': '段落符号'
          },
          options: [
            {
              name: {
                en: 'Digit',
                'zh-CN': '数字'
              },
              value: 'list-demical'
            },
            {
              name: {
                en: 'Circle',
                'zh-CN': '空心圆'
              },
              value: 'list-circle'
            },
            {
              name: {
                en: 'Disc',
                'zh-CN': '实心圆'
              },
              value: 'list-disc'
            },
            {
              name: {
                en: 'Square',
                'zh-CN': '实心方块'
              },
              value: 'list-square'
            },
            {
              name: {
                en: 'Lower-roman',
                'zh-CN': '小写罗马数字'
              },
              value: 'list-lower-roman'
            },
            {
              name: {
                en: 'Upper-roman',
                'zh-CN': '大写罗马数字'
              },
              value: 'list-upper-roman'
            },
            {
              name: {
                en: 'Lower-alpha',
                'zh-CN': '小写英文字母'
              },
              value: 'list-lower-alpha'
            },
            {
              name: {
                en: 'Upper-alpha',
                'zh-CN': '大写英文字母'
              },
              value: 'list-upper-alpha'
            },
            {
              name: {
                en: 'Normal',
                'zh-CN': '无'
              },
              value: 'normal'
            }
          ],
          type: 'select',
          info: {
            en: '',
            'zh-CN': ''
          }
        }
      },
      videoPicker: {
        label: '视频选择器',
        dataType: false,
        schema: {
          type: 'videoPicker',
          field: 'videoURL',
          translate: 1,
          default: '',
          name: {
            en: 'Video',
            'zh-CN': '视频'
          },
          info: {
            en: 'Enter YouTube\'s or Tencent\'s video Sharing Link',
            'zh-CN': '请输入Youtube视频的分享链接'
          },
          options: []
        }
      }
    },
    {
      buttonLabel: {
        label: '铵钮文本',
        dataType: false,
        schema: {
          type: 'text',
          field: 'buttonLabel',
          default: 'Button',
          translate: 0,
          name: {
            en: 'Button label',
            'zh-CN': '按钮文字'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        }
      },
      buttonLink: {
        label: '按钮链接',
        dataType: false,
        schema: {
          type: 'linkPicker',
          field: 'buttonLink',
          default: '',
          translate: 1,
          name: {
            en: 'Button link',
            'zh-CN': '按钮链接'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        }
      },
      buttonStyle: {
        label: '按钮样式',
        dataType: false,
        schema: {
          type: 'select',
          field: 'buttonStyle',
          default: 'invisible',
          translate: 1,
          name: {
            en: 'button style',
            'zh-CN': '按钮样式'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: [
            {
              value: 'btn-primary',
              name: {
                en: 'Primary',
                'zh-CN': '主按钮填充'
              }
            },
            {
              value: 'btn-outline-primary',
              name: {
                en: 'Outline Primary',
                'zh-CN': '主按钮描边'
              }
            },
            {
              value: 'btn-dark',
              name: {
                en: 'Dark',
                'zh-CN': '深色填充'
              }
            },
            {
              value: 'btn-outline-dark',
              name: {
                en: 'Outline Dark',
                'zh-CN': '深色描边'
              }
            },
            {
              value: 'btn-light',
              name: {
                en: 'Light',
                'zh-CN': '浅色填充'
              }
            },
            {
              value: 'btn-outline-light',
              name: {
                en: 'Outline Light',
                'zh-CN': '浅色描边'
              }
            },
            {
              value: 'btn-secondary',
              name: {
                en: 'Secondary',
                'zh-CN': '灰色填充'
              }
            },
            {
              value: 'btn-outline-secondary',
              name: {
                en: 'Outline Secondary',
                'zh-CN': '灰色描边'
              }
            },
            {
              value: 'btn-success',
              name: {
                en: 'Success',
                'zh-CN': '绿色填充'
              }
            },
            {
              value: 'btn-outline-success',
              name: {
                en: 'Outline Success',
                'zh-CN': '绿色描边'
              }
            },
            {
              value: 'btn-danger',
              name: {
                en: 'Danger',
                'zh-CN': '红色填充'
              }
            },
            {
              value: 'btn-outline-danger',
              name: {
                en: 'Outline Danger',
                'zh-CN': '红色描边'
              }
            },
            {
              value: 'btn-warning',
              name: {
                en: 'Warning',
                'zh-CN': '警告色填充'
              }
            },
            {
              value: 'btn-outline-warning',
              name: {
                en: 'Outline Warning',
                'zh-CN': '警告色描边'
              }
            },
            {
              value: 'btn-info',
              name: {
                en: 'Warning',
                'zh-CN': '青色填充'
              }
            },
            {
              value: 'btn-outline-info',
              name: {
                en: 'Outline Warning',
                'zh-CN': '青色描边'
              }
            },
            {
              value: 'invisible',
              name: {
                en: 'Invisible',
                'zh-CN': '不显示'
              }
            }
          ]
        }
      },
      paragraphSymbol: {
        label: '段落符号',
        dataType: false,
        schema: {
          default: 'list-demical',
          field: 'symbol',
          translate: 0,
          name: {
            en: 'Paragraph symbol',
            'zh-CN': '段落符号'
          },
          options: [
            {
              name: {
                en: 'Digit',
                'zh-CN': '数字'
              },
              value: 'list-demical'
            },
            {
              name: {
                en: 'Circle',
                'zh-CN': '空心圆'
              },
              value: 'list-circle'
            },
            {
              name: {
                en: 'Disc',
                'zh-CN': '实心圆'
              },
              value: 'list-disc'
            },
            {
              name: {
                en: 'Square',
                'zh-CN': '实心方块'
              },
              value: 'list-square'
            },
            {
              name: {
                en: 'Lower-roman',
                'zh-CN': '小写罗马数字'
              },
              value: 'list-lower-roman'
            },
            {
              name: {
                en: 'Upper-roman',
                'zh-CN': '大写罗马数字'
              },
              value: 'list-upper-roman'
            },
            {
              name: {
                en: 'Lower-alpha',
                'zh-CN': '小写英文字母'
              },
              value: 'list-lower-alpha'
            },
            {
              name: {
                en: 'Upper-alpha',
                'zh-CN': '大写英文字母'
              },
              value: 'list-upper-alpha'
            },
            {
              name: {
                en: 'Normal',
                'zh-CN': '无'
              },
              value: 'normal'
            }
          ],
          type: 'select',
          info: {
            en: '',
            'zh-CN': ''
          }
        }
      },
      videoPicker: {
        label: '视频选择器',
        dataType: false,
        schema: {
          type: 'videoPicker',
          field: 'videoURL',
          translate: 1,
          default: '',
          name: {
            en: 'Video',
            'zh-CN': '视频'
          },
          info: {
            en: 'Enter YouTube\'s or Tencent\'s video Sharing Link',
            'zh-CN': '请输入Youtube视频的分享链接'
          },
          options: []
        }
      }
    },
    {
      heading: {
        label: '标题',
        dataType: false,
        schema: {
          type: 'text',
          field: 'heading',
          default: 'This is a heading',
          translate: 0,
          name: {
            en: 'Heading',
            'zh-CN': '标题'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        }
      },
      subheading: {
        label: '副标题',
        dataType: false,
        schema: {
          type: 'text',
          field: 'subheading',
          default: 'This is a subheading',
          translate: 0,
          name: {
            en: 'Subheading',
            'zh-CN': '副标题'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        }
      },
      content: {
        label: '正文',
        dataType: false,
        schema: {
          type: 'textarea',
          field: 'content',
          translate: 0,
          default: 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability, style, or even provide a review.',
          name: {
            en: 'Text',
            'zh-CN': '正文'
          },
          info: {
            en: 'Use enter to wrap',
            'zh-CN': '回车键换行'
          },
          options: []
        }
      },
      textColor: {
        label: '文本颜色',
        dataType: false,
        schema: {
          type: 'colorPicker',
          field: 'textColor',
          default: '',
          translate: 1,
          name: {
            en: 'Text Color',
            'zh-CN': '文本颜色'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        }
      }
    },
    {
      icon: {
        label: '图标选择器',
        dataType: false,
        schema: {
          'type': 'iconPicker',
          'field': 'icon',
          'default': '',
          translate: 1,
          'name': {
            'en': 'ICON',
            'zh-CN': '图标'
          },
          'info': {
            'en': 'ICON first',
            'zh-CN': '图标优先'
          },
          'options': []
        }
      },
      image: {
        label: '图片',
        dataType: false,
        schema: {
          type: 'imagePicker',
          field: 'image',
          altFiled: 'alt',
          default: '',
          translate: 1,
          name: {
            en: 'Image',
            'zh-CN': '图片'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        }
      },
      alt: {
        label: 'ALT',
        dataType: false,
        schema: {
          type: 'hidden',
          field: 'alt',
          default: '',
          translate: 0,
          name: {
            en: 'ALT',
            'zh-CN': 'ALT'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        }
      },
      imageScale: {
        label: '图片比例',
        dataType: false,
        schema: {
          type: 'select',
          field: 'imageScale',
          default: '1by1',
          translate: 1,
          name: {
            en: 'Picture scale',
            'zh-CN': '图片比例'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: [
            {
              value: 'normal',
              name: {
                en: 'Normal',
                'zh-CN': '原始比例'
              }
            },
            {
              value: '1by1',
              name: {
                en: '1:1',
                'zh-CN': '1:1'
              }
            },
            {
              value: '21by9',
              name: {
                en: '21:9',
                'zh-CN': '21:9'
              }
            },
            {
              value: '16by9',
              name: {
                en: '16:9',
                'zh-CN': '16:9'
              }
            },
            {
              value: '5by4',
              name: {
                en: '5:4',
                'zh-CN': '5:4'
              }
            },
            {
              value: '4by3',
              name: {
                en: '4:3',
                'zh-CN': '4:3'
              }
            },
            {
              value: '9by21',
              name: {
                en: '9:21',
                'zh-CN': '9:21'
              }
            },
            {
              value: '9by16',
              name: {
                en: '9:16',
                'zh-CN': '9:16'
              }
            },
            {
              value: '4by5',
              name: {
                en: '4:5',
                'zh-CN': '4:5'
              }
            },
            {
              value: '3by4',
              name: {
                en: '3:4',
                'zh-CN': '3:4'
              }
            }
          ]
        }
      }
    },
    {
      productCollection: {
        label: '商品集合',
        dataType: true,
        translate: 1,
        schema: {
          type: 'productCollectionPicker',
          field: 'collectionList',
          translate: 1,
          default: {
            id: '',
            title: '',
            coverImage: ''
          },
          name: {
            en: 'Collection',
            'zh-CN': '集合'
          },
          info: {
            en: '',
            'zh-CN': ''
          }
        }
      },
      articleCollection: {
        label: '文章集合',
        dataType: true,
        schema: {
          type: 'articleCollectionPicker',
          field: 'collectionList',
          translate: 1,
          default: {
            id: '',
            title: '',
            coverImage: ''
          },
          name: {
            en: 'Collection',
            'zh-CN': '集合'
          },
          info: {
            en: '',
            'zh-CN': ''
          }
        }
      },
      inquiryFormPicker: {
        label: '表单',
        dataType: true,
        schema: {
          type: 'inquiryFormPicker',
          field: 'formData',
          translate: 1,
          default: {
            id: '',
            title: ''
          },
          name: {
            en: 'Form',
            'zh-CN': '表单'
          },
          info: {
            en: '',
            'zh-CN': ''
          }
        }
      },
      menuPicker: {
        label: '菜单',
        dataType: true,
        schema: {
          type: 'menuPicker',
          field: 'menuType',
          translate: 1,
          default: {
            id: 3
          },
          name: {
            en: 'Menu',
            'zh-CN': '菜单'
          },
          info: {
            en: '',
            'zh-CN': ''
          }
        }
      },
      verticalAlignment: {
        label: '垂直对齐',
        dataType: false,
        schema: {
          type: 'select',
          field: 'verticalAlignment',
          default: 'align-items-stretch',
          translate: 1,
          name: {
            en: 'Vertical alignment',
            'zh-CN': '垂直对齐'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: [
            {
              value: 'align-items-start',
              name: {
                en: 'Top',
                'zh-CN': '上'
              }
            },
            {
              value: 'align-items-center',
              name: {
                en: 'Middle',
                'zh-CN': '中'
              }
            },
            {
              value: 'align-items-end',
              name: {
                en: 'Bottom',
                'zh-CN': '下'
              }
            },
            {
              value: 'align-items-stretch',
              name: {
                en: 'Equal height',
                'zh-CN': '等高'
              }
            }
          ]
        }
      },
      textAlign: {
        label: '文本对齐',
        dataType: false,
        schema: {
          type: 'select',
          field: 'textAlign',
          default: 'text-center',
          translate: 1,
          name: {
            en: 'Text align',
            'zh-CN': '文本对齐'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: [
            {
              value: 'text-left',
              name: {
                en: 'Left',
                'zh-CN': '左'
              }
            },
            {
              value: 'text-center',
              name: {
                en: 'Center',
                'zh-CN': '中'
              }
            },
            {
              value: 'text-right',
              name: {
                en: 'Right',
                'zh-CN': '右'
              }
            }
          ]
        }
      },
      sidebar: {
        label: '侧边栏',
        dataType: false,
        schema: {
          type: 'select',
          field: 'sidebar',
          default: 'invisible',
          translate: 1,
          name: {
            en: 'Sidebar',
            'zh-CN': '侧边栏'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: [
            {
              value: 'left',
              name: {
                en: 'Left',
                'zh-CN': '左'
              }
            },
            {
              value: 'right',
              name: {
                en: 'Right',
                'zh-CN': '右'
              }
            },
            {
              value: 'invisible',
              name: {
                en: 'Invisible',
                'zh-CN': '无'
              }
            }
          ]
        }
      },
      divider: {
        label: '分隔线',
        dataType: false,
        schema: {
          type: 'divider',
          field: '',
          default: '',
          name: {
            en: '',
            'zh-CN': ''
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        }
      },
      dividerImage: {
        label: '分割图片',
        dataType: false,
        schema: {
          type: 'imagePicker',
          field: 'dividerImage',
          translate: 1,
          default: '',
          name: {
            en: 'Divider Image',
            'zh-CN': '分割图片'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: [],
          altFiled: ''
        }
      },
      dividerWidth: {
        label: '分割长度',
        dataType: false,
        schema: {
          type: 'slider',
          field: 'dividerWidth',
          default: 10,
          translate: 1,
          'min': 0,
          'max': 100,
          'step': 5,
          name: {
            en: 'DividerWidth',
            'zh-CN': '分割长度'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        }
      }
    },
    {
      secondButtonLabel: {
        label: '副按钮文字',
        dataType: false,
        translate: 0,
        schema: {
          default: 'Button',
          field: 'secondButtonLabel',
          translate: 0,
          name: {
            en: 'Button label',
            'zh-CN': '按钮文字'
          },
          options: [],
          type: 'text',
          info: {
            en: '',
            'zh-CN': ''
          }
        }
      },
      secondButtonLink: {
        label: '副按钮链接',
        dataType: false,
        schema: {
          default: '',
          field: 'secondButtonLink',
          translate: 1,
          name: {
            en: 'Button link',
            'zh-CN': '按钮链接'
          },
          options: [],
          type: 'linkPicker',
          info: {
            en: '',
            'zh-CN': ''
          }
        }
      },
      secondButtonStyle: {
        label: '副按钮样式',
        dataType: false,
        schema: {
          default: 'invisible',
          field: 'secondButtonStyle',
          translate: 1,
          name: {
            en: 'button style',
            'zh-CN': '按钮样式'
          },
          options: [
            {
              value: 'btn-primary',
              name: {
                en: 'Primary',
                'zh-CN': '主按钮填充'
              }
            },
            {
              value: 'btn-outline-primary',
              name: {
                en: 'Outline Primary',
                'zh-CN': '主按钮描边'
              }
            },
            {
              value: 'btn-dark',
              name: {
                en: 'Dark',
                'zh-CN': '深色填充'
              }
            },
            {
              value: 'btn-outline-dark',
              name: {
                en: 'Outline Dark',
                'zh-CN': '深色描边'
              }
            },
            {
              value: 'btn-light',
              name: {
                en: 'Light',
                'zh-CN': '浅色填充'
              }
            },
            {
              value: 'btn-outline-light',
              name: {
                en: 'Outline Light',
                'zh-CN': '浅色描边'
              }
            },
            {
              value: 'btn-secondary',
              name: {
                en: 'Secondary',
                'zh-CN': '灰色填充'
              }
            },
            {
              value: 'btn-outline-secondary',
              name: {
                en: 'Outline Secondary',
                'zh-CN': '灰色描边'
              }
            },
            {
              value: 'btn-success',
              name: {
                en: 'Success',
                'zh-CN': '绿色填充'
              }
            },
            {
              value: 'btn-outline-success',
              name: {
                en: 'Outline Success',
                'zh-CN': '绿色描边'
              }
            },
            {
              value: 'btn-danger',
              name: {
                en: 'Danger',
                'zh-CN': '红色填充'
              }
            },
            {
              value: 'btn-outline-danger',
              name: {
                en: 'Outline Danger',
                'zh-CN': '红色描边'
              }
            },
            {
              value: 'btn-warning',
              name: {
                en: 'Warning',
                'zh-CN': '警告色填充'
              }
            },
            {
              value: 'btn-outline-warning',
              name: {
                en: 'Outline Warning',
                'zh-CN': '警告色描边'
              }
            },
            {
              value: 'btn-info',
              name: {
                en: 'Warning',
                'zh-CN': '青色填充'
              }
            },
            {
              value: 'btn-outline-info',
              name: {
                en: 'Outline Warning',
                'zh-CN': '青色描边'
              }
            },
            {
              value: 'invisible',
              name: {
                en: 'Invisible',
                'zh-CN': '不显示'
              }
            }
          ],
          type: 'select',
          info: {
            en: '',
            'zh-CN': ''
          }
        }
      },
      contentWidth: {
        label: '内容宽度',
        dataType: false,
        schema: {
          type: 'select',
          field: 'contentWidth',
          default: '8',
          translate: 1,
          name: {
            en: 'Content Width',
            'zh-CN': '内容宽度'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: [
            {
              value: '1',
              name: {
                en: '8%',
                'zh-CN': '8%'
              }
            },
            {
              value: '2',
              name: {
                en: '16%',
                'zh-CN': '16%'
              }
            },
            {
              value: '3',
              name: {
                en: '25%',
                'zh-CN': '25%'
              }
            },
            {
              value: '4',
              name: {
                en: '33%',
                'zh-CN': '33%'
              }
            },
            {
              value: '5',
              name: {
                en: '41%',
                'zh-CN': '41%'
              }
            },
            {
              value: '6',
              name: {
                en: '50%',
                'zh-CN': '50%'
              }
            },
            {
              value: '7',
              name: {
                en: '58%',
                'zh-CN': '58%'
              }
            },
            {
              value: '8',
              name: {
                en: '66%',
                'zh-CN': '66%'
              }
            },
            {
              value: '9',
              name: {
                en: '75%',
                'zh-CN': '75%'
              }
            },
            {
              value: '10',
              name: {
                en: '83%',
                'zh-CN': '83%'
              }
            },
            {
              value: '11',
              name: {
                en: '91%',
                'zh-CN': '91%'
              }
            },
            {
              value: '12',
              name: {
                en: '100%',
                'zh-CN': '100%'
              }
            }
          ]
        }
      },
      offsetLeft: {
        label: '左边距',
        dataType: false,
        schema: {
          type: 'select',
          field: 'offsetLeft',
          default: '2',
          translate: 1,
          name: {
            en: 'Offset left',
            'zh-CN': '左边距'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: [
            {
              value: '0',
              name: {
                en: '0',
                'zh-CN': '0'
              }
            },
            {
              value: '1',
              name: {
                en: '8%',
                'zh-CN': '8%'
              }
            },
            {
              value: '2',
              name: {
                en: '16%',
                'zh-CN': '16%'
              }
            },
            {
              value: '3',
              name: {
                en: '25%',
                'zh-CN': '25%'
              }
            },
            {
              value: '4',
              name: {
                en: '33%',
                'zh-CN': '33%'
              }
            },
            {
              value: '5',
              name: {
                en: '41%',
                'zh-CN': '41%'
              }
            },
            {
              value: '6',
              name: {
                en: '50%',
                'zh-CN': '50%'
              }
            },
            {
              value: '7',
              name: {
                en: '58%',
                'zh-CN': '58%'
              }
            },
            {
              value: '8',
              name: {
                en: '66%',
                'zh-CN': '66%'
              }
            },
            {
              value: '9',
              name: {
                en: '75%',
                'zh-CN': '75%'
              }
            },
            {
              value: '10',
              name: {
                en: '83%',
                'zh-CN': '83%'
              }
            }
          ]
        }
      },
      objectFit: {
        label: '图片剪切',
        dataType: false,
        schema: {
          'type': 'select',
          'field': 'objectFit',
          'default': 'cover',
          translate: 1,
          'name': {
            'en': 'Fit mode',
            'zh-CN': '剪切方式'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': [
            {
              'value': 'fill',
              'name': {
                'en': 'fill',
                'zh-CN': '拉伸填满'
              }
            },
            {
              'value': 'contain',
              'name': {
                'en': ' contain',
                'zh-CN': '等比缩放'
              }
            },
            {
              'value': 'cover',
              'name': {
                'en': 'cover',
                'zh-CN': '封面模式'
              }
            }
          ]
        }
      },
      carouselDivider: {
        label: '轮播分隔线',
        dataType: false,
        schema: {
          type: 'divider',
          field: '',
          default: '',
          name: {
            en: '',
            'zh-CN': ''
          },
          info: {
            en: 'When style is "slide"',
            'zh-CN': '以下在样式为“横向切换时”生效'
          },
          options: []
        }
      },
      carouselAutoPlay: {
        label: '轮播间隔',
        dataType: false,
        schema: {
          'default': '5000',
          'field': 'carouselAutoPlay',
          'name': {
            'en': 'Slide changes every',
            'zh-CN': '轮播间隔'
          },
          'options': [
            {
              'name': {
                'en': '3 seconds',
                'zh-CN': '3 秒'
              },
              'value': '3000'
            },
            {
              'name': {
                'en': '4 seconds',
                'zh-CN': '4 秒'
              },
              'value': '4000'
            },
            {
              'name': {
                'en': '5 seconds',
                'zh-CN': '5 秒'
              },
              'value': '5000'
            },
            {
              'name': {
                'en': '6 seconds',
                'zh-CN': '6 秒'
              },
              'value': '6000'
            },
            {
              'name': {
                'en': '7 seconds',
                'zh-CN': '7 秒'
              },
              'value': '7000'
            },
            {
              'name': {
                'en': '8 seconds',
                'zh-CN': '8 秒'
              },
              'value': '8000'
            },
            {
              'name': {
                'en': '9 seconds',
                'zh-CN': '9 秒'
              },
              'value': '9000'
            },
            {
              'name': {
                'en': '10 seconds',
                'zh-CN': '10 秒'
              },
              'value': '10000'
            },
            {
              'name': {
                'en': 'Not autoplay',
                'zh-CN': '不自动轮播'
              },
              'value': '0'
            }
          ],
          'type': 'select',
          'info': {
            'en': '',
            'zh-CN': ''
          }
        }
      },
      carouselEffect: {
        label: '动画效果',
        dataType: false,
        schema: {
          'default': 'slide',
          'field': 'carouselEffect',
          'name': {
            'en': 'Animation',
            'zh-CN': '动画效果'
          },
          'options': [
            {
              'name': {
                'en': 'Fade-in and fade-out',
                'zh-CN': '淡入淡出'
              },
              'value': 'fade'
            },
            {
              'name': {
                'en': 'Horizontal slide',
                'zh-CN': '水平滑动'
              },
              'value': 'slide'
            }
          ],
          'type': 'select',
          'info': {
            'en': '',
            'zh-CN': ''
          }
        }
      },
      carouselArrowStyle: {
        label: '箭头风格',
        dataType: false,
        schema: {
          'default': 'dark',
          'field': 'carouselArrowStyle',
          'name': {
            'en': 'Arrow',
            'zh-CN': '箭头风格'
          },
          'options': [
            {
              'value': 'light',
              'name': {
                'en': 'Light',
                'zh-CN': '浅色'
              }
            },
            {
              'value': 'dark',
              'name': {
                'en': 'Dark',
                'zh-CN': '深色'
              }
            },
            {
              'name': {
                'en': 'Invisible',
                'zh-CN': '不显示'
              },
              'value': 'invisible'
            }
          ],
          'type': 'select',
          'info': {
            'en': '',
            'zh-CN': ''
          }
        }
      },
      carouselNavStyle: {
        label: '分页风格',
        dataType: false,
        schema: {
          'default': 'dark',
          'field': 'carouselNavStyle',
          'name': {
            'en': 'Navigation',
            'zh-CN': '分页风格'
          },
          'options': [
            {
              'name': {
                'en': 'Light',
                'zh-CN': '浅色'
              },
              'value': 'light'
            },
            {
              'value': 'dark',
              'name': {
                'en': 'Dark',
                'zh-CN': '深色'
              }
            },
            {
              'name': {
                'en': 'Invisible',
                'zh-CN': '不显示'
              },
              'value': 'invisible'
            }
          ],
          'type': 'select',
          'info': {
            'en': '',
            'zh-CN': ''
          }
        }
      },
      cardColor: {
        label: '卡片文本',
        dataType: false,
        schema: {
          type: 'colorPicker',
          field: 'cardColor',
          default: '',
          translate: 1,
          name: {
            en: 'Card text',
            'zh-CN': '卡片文本'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        }
      },
      cardBackground: {
        label: '卡片背景',
        dataType: false,
        schema: {
          type: 'colorPicker',
          field: 'cardBackground',
          default: '',
          translate: 1,
          name: {
            en: 'Card background',
            'zh-CN': '卡片背景'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        }
      },
      elementSpace: {
        label: '元素间隔',
        dataType: false,
        schema: {
          'type': 'slider',
          'field': 'elementSpace',
          'default': 50,
          'translate': 1,
          'name': {
            'en': 'Element Space',
            'zh-CN': '元素间隔'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': [],
          'min': 0,
          'max': 100,
          'step': 5
        }
      },
      elementLayout: {
        label: '元素位置',
        dataType: false,
        schema: {
          'default': 'left',
          'field': 'elementLayout',
          'name': {
            'en': 'Element layout',
            'zh-CN': '元素位置'
          },
          'options': [
            {
              'name': {
                'en': 'Left',
                'zh-CN': '左'
              },
              'value': 'left'
            },
            {
              'name': {
                'en': 'Right',
                'zh-CN': '右'
              },
              'value': 'right'
            }
          ],
          'type': 'select',
          'info': {
            'en': '',
            'zh-CN': ''
          }
        }
      }
    }
  ],
  /**
     * 组件
     */
  controls: [
    {
      label: '正整数',
      value: 'positiveInteger',
      dataType: false,
      default: 0,
      translate: 1
    },
    {
      label: '文本框',
      value: 'text',
      dataType: false,
      default: '',
      translate: 0
    },
    {
      label: '多行文本框',
      value: 'textarea',
      dataType: false,
      default: '',
      translate: 0
    },
    {
      label: 'SVG图标',
      value: 'svgIcon',
      dataType: false,
      default: '',
      translate: 1
    },
    {
      label: 'Google地图',
      value: 'googleMapPicker',
      dataType: false,
      default: '',
      translate: 1
    },
    {
      label: '下拉框',
      value: 'select',
      dataType: false,
      default: '',
      translate: 1
    },
    {
      label: '拾色器',
      value: 'colorPicker',
      dataType: false,
      default: '',
      translate: 1
    },
    {
      label: '链接选择器',
      value: 'linkPicker',
      dataType: false,
      default: '',
      translate: 1
    },
    {
      label: '图片选择器',
      value: 'imagePicker',
      dataType: false,
      default: '',
      translate: 1
    },
    {
      label: '视频选择器',
      value: 'videoPicker',
      dataType: false,
      default: '',
      translate: 1
    },
    {
      label: '表单选择器',
      value: 'inquiryFormPicker',
      dataType: true,
      multiple: [0],
      translate: 1
    },
    {
      label: '菜单选择器',
      value: 'menuPicker',
      dataType: true,
      default: 'product',
      multiple: [3],
      translate: 1
    },
    {
      label: '商品集合选择器',
      value: 'productCollectionPicker',
      dataType: true,
      multiple: [0, 1, 2],
      translate: 1
    },
    {
      label: '文章集合选择器',
      value: 'articleCollectionPicker',
      dataType: true,
      multiple: [0, 1, 2],
      translate: 1
    },
    {
      label: '语言选择器',
      value: 'languagePicker',
      dataType: false,
      default: '',
      translate: 1
    },
    {
      label: '站点选择器',
      value: 'sitePicker',
      dataType: false,
      default: '',
      translate: 1
    },
    {
      label: 'Slider',
      value: 'slider',
      dataType: false,
      default: '',
      translate: 1
    },
    {
      label: 'Switch',
      value: 'switch',
      dataType: false,
      default: 0,
      translate: 1
    },
    {
      label: '图标选择器',
      value: 'iconPicker',
      dataType: false,
      default: '',
      translate: 1
    },
    {
      label: '富文本',
      value: 'richText',
      dataType: false,
      default: '',
      translate: 0
    },
    {
      label: '隐藏域',
      value: 'hidden',
      dataType: false,
      default: '',
      translate: 1
    },
    {
      label: '分隔线',
      value: 'divider',
      dataType: false,
      translate: 1
    }
  ],
  /**
     * 预设组
     */
  group: {
    /**
         * 边框 & 背景
         */
    borderAndBackground: {
      'multiple': 0,
      'dataType': false,
      'max': 0,
      'name': {
        'en': 'Border & Background',
        'zh-CN': '边框 & 背景'
      },
      'placeholder': {
        'en': '',
        'zh-CN': ''
      },
      'elements': [
        {
          'type': 'switch',
          'field': 'wideScreen',
          'default': false,
          translate: 1,
          'name': {
            'en': 'Wide screen',
            'zh-CN': '宽屏模式'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': []
        },
        {
          'type': 'switch',
          'field': 'marginTop',
          'default': false,
          translate: 1,
          'name': {
            'en': 'Margin top',
            'zh-CN': '外边距（上）'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': []
        },
        {
          'type': 'switch',
          'field': 'marginBottom',
          'default': false,
          translate: 1,
          'name': {
            'en': 'Margin bottom',
            'zh-CN': '外边距（下）'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': []
        },
        {
          'type': 'switch',
          'field': 'paddingTop',
          'default': true,
          translate: 1,
          'name': {
            'en': 'Padding top',
            'zh-CN': '内边距（上）'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': []
        },
        {
          'type': 'switch',
          'field': 'paddingBottom',
          'default': true,
          translate: 1,
          'name': {
            'en': 'Padding bottom',
            'zh-CN': '内边距（下）'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': []
        },
        {
          'type': 'colorPicker',
          'field': 'backgroundColor',
          translate: 1,
          'default': '',
          'name': {
            'en': 'Background color',
            'zh-CN': '背景色'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': []
        },
        {
          'type': 'imagePicker',
          'field': 'backgroundImage',
          'default': '',
          translate: 1,
          'name': {
            'en': 'Background image',
            'zh-CN': '背景图'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': []
        },
        {
          'type': 'select',
          'field': 'backgroundPosition',
          'default': '',
          translate: 1,
          'name': {
            'en': 'Background Position',
            'zh-CN': '背景图位置'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': [
            {
              'value': 'top left',
              'name': {
                'en': 'top left',
                'zh-CN': '左上'
              }
            },
            {
              'value': 'top center',
              'name': {
                'en': 'top center',
                'zh-CN': '中上'
              }
            },
            {
              'value': 'top right',
              'name': {
                'en': 'top right',
                'zh-CN': '右上'
              }
            },
            {
              'value': 'center left',
              'name': {
                'en': 'center left',
                'zh-CN': '左中'
              }
            },
            {
              'value': 'center center',
              'name': {
                'en': 'center center',
                'zh-CN': '正中'
              }
            },
            {
              'value': 'center right',
              'name': {
                'en': 'center right',
                'zh-CN': '右中'
              }
            },
            {
              'value': 'bottom left',
              'name': {
                'en': 'bottom left',
                'zh-CN': '左下'
              }
            },
            {
              'value': 'bottom center',
              'name': {
                'en': 'bottom center',
                'zh-CN': '正下'
              }
            },
            {
              'value': 'bottom right',
              'name': {
                'en': 'bottom right',
                'zh-CN': '右下'
              }
            }
          ]
        },
        {
          'type': 'select',
          'field': 'backgroundRepeat',
          'default': '',
          translate: 1,
          'name': {
            'en': 'Background Repeat',
            'zh-CN': '背景填充'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': [
            {
              'value': 'repeat',
              'name': {
                'en': 'Repeat',
                'zh-CN': '重复'
              }
            },
            {
              'value': 'repeat-x',
              'name': {
                'en': 'Repeat X',
                'zh-CN': '水平填充'
              }
            },
            {
              'value': 'repeat-y',
              'name': {
                'en': 'Repeat Y',
                'zh-CN': '垂直填充'
              }
            },
            {
              'value': 'no-repeat',
              'name': {
                'en': 'No repeat',
                'zh-CN': '填充一次'
              }
            }
          ]
        },
        {
          'type': 'select',
          'field': 'backgroundSize',
          'default': '',
          translate: 1,
          'name': {
            'en': 'Background Size',
            'zh-CN': '背景图大小'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': [
            {
              'value': 'cover',
              'name': {
                'en': 'Cover',
                'zh-CN': '短边填满'
              }
            },
            {
              'value': 'contain',
              'name': {
                'en': 'Contain',
                'zh-CN': '长边填满'
              }
            },
            {
              'value': 'auto',
              'name': {
                'en': 'Default',
                'zh-CN': '默认'
              }
            }
          ]
        }
      ],
      'tips': {
        'en': '',
        'zh-CN': ''
      }
    },
    /**
         * 标题 & 按钮
         */
    titleAndButton: {
      'multiple': 0,
      'dataType': false,
      'max': 0,
      'name': {
        'en': 'Title & Button',
        'zh-CN': '标题 & 按钮'
      },
      'placeholder': {
        'en': '',
        'zh-CN': ''
      },
      'elements': [
        {
          'type': 'text',
          'field': 'heading',
          'default': 'Title with button',
          'name': {
            'en': 'Heading',
            'zh-CN': '标题'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': []
        },
        {
          'type': 'text',
          'field': 'subheading',
          'default': 'this is a new beginning',
          'name': {
            'en': 'Subheading',
            'zh-CN': '副标题'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': []
        },
        {
          'type': 'select',
          'field': 'textAlign',
          'default': 'center',
          'name': {
            'en': 'Heading align',
            'zh-CN': '标题对齐'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': [
            {
              'value': 'left',
              'name': {
                'en': 'Left',
                'zh-CN': '左'
              }
            },
            {
              'value': 'center',
              'name': {
                'en': 'Center',
                'zh-CN': '中'
              }
            },
            {
              'value': 'right',
              'name': {
                'en': 'Right',
                'zh-CN': '右'
              }
            }
          ]
        },
        {
          'type': 'colorPicker',
          'field': 'textColor',
          'default': '',
          'name': {
            'en': 'Text Color',
            'zh-CN': '文本颜色'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': []
        },
        {
          'type': 'divider',
          'field': '',
          'default': '',
          'name': {
            'en': '',
            'zh-CN': ''
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': []
        },
        {
          'type': 'textarea',
          'field': 'content',
          'default': 'We provide all your needed for starting your own online business, and even easier. Establish an online store, Oceans of Products Supply, Integrate Logistics Solution & Comprehensive After-sale Services.',
          'name': {
            'en': 'Content',
            'zh-CN': '内容'
          },
          'info': {
            'en': 'Use enter to wrap',
            'zh-CN': '回车键换行'
          },
          'options': []
        },
        {
          'type': 'slider',
          'field': 'textWidth',
          'default': 100,
          'name': {
            'en': 'Width of content container',
            'zh-CN': '内容宽度'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': [
            {
              'value': '25',
              'name': {
                'en': '25%',
                'zh-CN': '25%'
              }
            },
            {
              'value': '50',
              'name': {
                'en': '50%',
                'zh-CN': '50%'
              }
            },
            {
              'value': '75',
              'name': {
                'en': '75%',
                'zh-CN': '75%'
              }
            },
            {
              'value': '100',
              'name': {
                'en': '100%',
                'zh-CN': '100%'
              }
            }
          ],
          'min': 20,
          'max': 100,
          'step': 10
        },
        {
          'type': 'select',
          'field': 'contentAlign',
          'default': 'text-center',
          'translate': 1,
          'name': {
            'en': 'Content align',
            'zh-CN': '内容对齐'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': [
            {
              'value': 'text-left',
              'name': {
                'en': 'Left',
                'zh-CN': '左'
              }
            },
            {
              'value': 'text-center',
              'name': {
                'en': 'Center',
                'zh-CN': '中'
              }
            },
            {
              'value': 'text-right',
              'name': {
                'en': 'Right',
                'zh-CN': '右'
              }
            }
          ]
        },
        {
          'default': 'list-demical',
          'field': 'symbol',
          'translate': 0,
          'name': {
            'en': 'Paragraph symbol',
            'zh-CN': '段落符号'
          },
          'options': [
            {
              'name': {
                'en': 'Digit',
                'zh-CN': '数字'
              },
              'value': 'list-demical'
            },
            {
              'name': {
                'en': 'Circle',
                'zh-CN': '空心圆'
              },
              'value': 'list-circle'
            },
            {
              'name': {
                'en': 'Disc',
                'zh-CN': '实心圆'
              },
              'value': 'list-disc'
            },
            {
              'name': {
                'en': 'Square',
                'zh-CN': '实心方块'
              },
              'value': 'list-square'
            },
            {
              'name': {
                'en': 'Lower-roman',
                'zh-CN': '小写罗马数字'
              },
              'value': 'list-lower-roman'
            },
            {
              'name': {
                'en': 'Upper-roman',
                'zh-CN': '大写罗马数字'
              },
              'value': 'list-upper-roman'
            },
            {
              'name': {
                'en': 'Lower-alpha',
                'zh-CN': '小写英文字母'
              },
              'value': 'list-lower-alpha'
            },
            {
              'name': {
                'en': 'Upper-alpha',
                'zh-CN': '大写英文字母'
              },
              'value': 'list-upper-alpha'
            },
            {
              'name': {
                'en': 'Normal',
                'zh-CN': '无'
              },
              'value': 'normal'
            }
          ],
          'type': 'select',
          'info': {
            'en': 'Effect by content align left',
            'zh-CN': '内容左对齐生效'
          }
        },
        {
          'type': 'divider',
          'field': '',
          'default': '',
          'name': {
            'en': '',
            'zh-CN': ''
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': []
        },
        {
          'type': 'slider',
          'field': 'dividerWidth',
          'default': 5,
          'name': {
            'en': 'Width',
            'zh-CN': '宽度'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': [],
          'min': 0,
          'max': 100,
          'step': 5
        },
        {
          'type': 'select',
          'field': 'dividerStyle',
          'default': 'line',
          'name': {
            'en': 'Style',
            'zh-CN': '样式'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': [
            {
              'value': 'line',
              'name': {
                'en': 'Line',
                'zh-CN': '线条'
              }
            },
            {
              'value': 'image',
              'name': {
                'en': 'Image',
                'zh-CN': '图片'
              }
            }
          ]
        },
        {
          'type': 'imagePicker',
          'field': 'dividerImage',
          'default': '',
          'name': {
            'en': 'Picture',
            'zh-CN': '图片'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': [],
          'altFiled': ''
        },
        {
          'type': 'divider',
          'field': '',
          'default': '',
          'name': {
            'en': '',
            'zh-CN': ''
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': []
        },
        {
          'type': 'text',
          'field': 'buttonLabel',
          'default': 'Button label',
          'name': {
            'en': 'Button label',
            'zh-CN': '按钮文字'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': []
        },
        {
          'type': 'linkPicker',
          'field': 'buttonLink',
          'default': '',
          'name': {
            'en': 'Button link',
            'zh-CN': '按钮链接'
          },
          'info': {
            'en': 'When the link is empty, the button will not be displayed',
            'zh-CN': ''
          },
          'options': []
        },
        {
          'type': 'select',
          'field': 'buttonStyle',
          'default': 'invisible',
          'name': {
            'en': 'button style',
            'zh-CN': '按钮样式'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': [
            {
              'value': 'btn-primary',
              'name': {
                'en': 'Primary',
                'zh-CN': '主按钮填充'
              }
            },
            {
              'value': 'btn-outline-primary',
              'name': {
                'en': 'Outline Primary',
                'zh-CN': '主按钮描边'
              }
            },
            {
              'value': 'btn-dark',
              'name': {
                'en': 'Dark',
                'zh-CN': '深色填充'
              }
            },
            {
              'value': 'btn-outline-dark',
              'name': {
                'en': 'Outline Dark',
                'zh-CN': '深色描边'
              }
            },
            {
              'value': 'btn-light',
              'name': {
                'en': 'Light',
                'zh-CN': '浅色填充'
              }
            },
            {
              'value': 'btn-outline-light',
              'name': {
                'en': 'Outline Light',
                'zh-CN': '浅色描边'
              }
            },
            {
              'value': 'btn-secondary',
              'name': {
                'en': 'Secondary',
                'zh-CN': '灰色填充'
              }
            },
            {
              'value': 'btn-outline-secondary',
              'name': {
                'en': 'Outline Secondary',
                'zh-CN': '灰色描边'
              }
            },
            {
              'value': 'btn-success',
              'name': {
                'en': 'Success',
                'zh-CN': '绿色填充'
              }
            },
            {
              'value': 'btn-outline-success',
              'name': {
                'en': 'Outline Success',
                'zh-CN': '绿色描边'
              }
            },
            {
              'value': 'btn-danger',
              'name': {
                'en': 'Danger',
                'zh-CN': '红色填充'
              }
            },
            {
              'value': 'btn-outline-danger',
              'name': {
                'en': 'Outline Danger',
                'zh-CN': '红色描边'
              }
            },
            {
              'value': 'btn-warning',
              'name': {
                'en': 'Warning',
                'zh-CN': '警告色填充'
              }
            },
            {
              'value': 'btn-outline-warning',
              'name': {
                'en': 'Outline Warning',
                'zh-CN': '警告色描边'
              }
            },
            {
              'value': 'btn-info',
              'name': {
                'en': 'Warning',
                'zh-CN': '青色填充'
              }
            },
            {
              'value': 'btn-outline-info',
              'name': {
                'en': 'Outline Warning',
                'zh-CN': '青色描边'
              }
            },
            {
              'value': 'invisible',
              'name': {
                'en': 'Invisible',
                'zh-CN': '不显示'
              }
            }
          ]
        }
      ],
      'tips': {
        'en': '',
        'zh-CN': ''
      }
    },
    /**
         * H1 & 面包屑
         */
    h1AndBreadCrumb: {
      'max': 0,
      'dataType': false,
      'elements': [
        {
          'default': true,
          'field': 'enableCrumb',
          translate: 1,
          'name': {
            'en': 'Bread crumbs',
            'zh-CN': '面包屑'
          },
          'options': [],
          'type': 'switch',
          'info': {
            'en': '',
            'zh-CN': ''
          }
        },
        {
          'default': '',
          'field': '',
          'name': {
            'en': '',
            'zh-CN': ''
          },
          'options': [],
          'type': 'divider',
          'info': {
            'en': '',
            'zh-CN': ''
          }
        },
        {
          'default': 'left',
          'field': 'h1Layout',
          translate: 1,
          'name': {
            'en': 'H1',
            'zh-CN': 'H1'
          },
          'options': [
            {
              'name': {
                'en': 'Left',
                'zh-CN': '左'
              },
              'value': 'left'
            },
            {
              'name': {
                'en': 'Center',
                'zh-CN': '中上'
              },
              'value': 'center'
            },
            {
              'name': {
                'en': 'Right',
                'zh-CN': '右'
              },
              'value': 'right'
            },
            {
              'value': 'bottom',
              'name': {
                'en': 'Bottom',
                'zh-CN': '中下'
              }
            },
            {
              'value': 'invisible',
              'name': {
                'en': 'Invisible',
                'zh-CN': '不可见'
              }
            }
          ],
          'type': 'select',
          'info': {
            'en': '',
            'zh-CN': ''
          }
        },
        {
          'default': '',
          'field': 'h1Color',
          translate: 1,
          'name': {
            'en': 'Text',
            'zh-CN': '文本'
          },
          'options': [],
          'type': 'colorPicker',
          'info': {
            'en': '',
            'zh-CN': ''
          }
        },
        {
          'type': 'colorPicker',
          'field': 'h1Background',
          translate: 1,
          'default': '',
          'name': {
            'en': 'Background',
            'zh-CN': '背景色'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': []
        },
        {
          'type': 'switch',
          'field': 'h1Wide',
          'default': false,
          translate: 1,
          'name': {
            'en': 'Wide',
            'zh-CN': '宽屏'
          },
          'info': {
            'en': '',
            'zh-CN': ''
          },
          'options': []
        }
      ],
      'multiple': 0,
      'name': {
        'en': 'H1 & Bread crumbs',
        'zh-CN': 'H1 & 面包屑'
      },
      'placeholder': {
        'en': '',
        'zh-CN': ''
      },
      'tips': {
        'en': '',
        'zh-CN': ''
      }
    }
  },
  /**
     * 数据
     */
  dataSource: {
    /**
         * 商品
         */
    product: {
      /**
             * 商品
             */
      entity: {
        'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
        'name': 'Apple iPhone XS Max (A2104) 256GB',
        'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
        'minPrice': 199.00,
        'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
      },
      /**
             * 集合
             */
      collection: {
        'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
        'seoUrl': '',
        'title': 'Example Collection Title',
        'content': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability,\nstyle, or even provide a review.'
      }
    },
    /**
         * 文章
         */
    article: {
      /**
             * 文章
             */
      entity: {
        'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
        'createTime': 1562222541298,
        'seoUrl': '',
        'title': 'Tesla is now the most valuable US automaker ever',
        'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
      },
      /**
             * 集合
             */
      collection: {
        'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
        'seoUrl': '',
        'title': 'Example Collection Title',
        'content': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability,\nstyle, or even provide a review.'
      }
    }
  }
}
