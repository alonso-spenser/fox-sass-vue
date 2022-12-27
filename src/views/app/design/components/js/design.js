export default {
  designSection: {
    'default': {
      'dataset': {
        'imageList': {
          'type': 'normal',
          'data': [
            {
              'url': 'https://theme.fomillesite.com/img/image-with-text.jpg',
              'alt': '',
              'heading': 'This is a heading',
              'subheading': 'This is a subheading',
              'description': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability, style, or even provide a review.',
              'buttonLabel': 'Button',
              'buttonLink': '',
              'buttonStyle': 'invisible',
              'contentPosition': 'left-center',
              'textColor': '',
              'maskColor': '',
              'textAlign': 'text-center',
              'marginTop': false,
              'marginBottom': false,
              'paddingTop': false,
              'paddingBottom': false,
              'backgroundColor': '',
              'backgroundImage': '',
              'backgroundPosition': '',
              'backgroundRepeat': '',
              'backgroundSize': ''
            }
          ]
        }
      },
      'sectionAlias': '设计详情',
      'wideScreen': false,
      'symbol': 'normal',
      'firstLayout': 'left',
      'imageScale': '5by4',
      'imagePercentage': '6'
    },
    'onlyOnce': false,
    'removable': true,
    'multiple': 0,
    'name': {
      'en': 'Design section',
      'zh-CN': '设计详情'
    },
    'global': false,
    'duplicate': true,
    'type': 'designSection',
    'group': [
      {
        'subs': 1,
        'max': 99,
        'dataType': false,
        'elements': [
          {
            'default': 'https://theme.fomillesite.com/img/image-with-text.jpg',
            'field': 'url',
            'name': {
              'en': 'Image',
              'zh-CN': '图片'
            },
            'options': [

            ],
            'type': 'imagePicker',
            'altFiled': 'alt',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          },
          {
            'default': '',
            'field': 'alt',
            'name': {
              'en': 'ALT',
              'zh-CN': 'ALT'
            },
            'options': [

            ],
            'type': 'hidden',
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
            'options': [

            ],
            'type': 'divider',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          },
          {
            'default': 'This is a heading',
            'field': 'heading',
            'name': {
              'en': 'Heading',
              'zh-CN': '标题'
            },
            'options': [

            ],
            'type': 'text',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          },
          {
            'default': 'This is a subheading',
            'field': 'subheading',
            'name': {
              'en': 'Subheading',
              'zh-CN': '副标题'
            },
            'options': [

            ],
            'type': 'text',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          },
          {
            'default': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability, style, or even provide a review.',
            'field': 'description',
            'name': {
              'en': 'Text',
              'zh-CN': '正文'
            },
            'options': [

            ],
            'type': 'textarea',
            'info': {
              'en': 'Use enter to wrap',
              'zh-CN': '回车键换行'
            }
          },
          {
            'default': 'Button',
            'field': 'buttonLabel',
            'name': {
              'en': 'Button label',
              'zh-CN': '按钮文字'
            },
            'options': [

            ],
            'type': 'text',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          },
          {
            'default': '',
            'field': 'buttonLink',
            'name': {
              'en': 'Button link',
              'zh-CN': '按钮链接'
            },
            'options': [

            ],
            'type': 'linkPicker',
            'info': {
              'en': '',
              'zh-CN': ''
            }
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
          },
          {
            'default': '',
            'field': '',
            'name': {
              'en': '',
              'zh-CN': ''
            },
            'options': [

            ],
            'type': 'divider',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          },
          {
            'type': 'select',
            'field': 'contentPosition',
            'default': 'left-center',
            'name': {
              'en': 'Content position',
              'zh-CN': '文本位置'
            },
            'info': {
              'en': 'Effective when the picture width is 100%',
              'zh-CN': '图片宽度为100%时生效'
            },
            'options': [
              {
                'value': 'left-top',
                'name': {
                  'en': 'Left top',
                  'zh-CN': '左上'
                }
              },
              {
                'value': 'left-center',
                'name': {
                  'en': 'Left center',
                  'zh-CN': '左中'
                }
              },
              {
                'value': 'left-bottom',
                'name': {
                  'en': 'Left bottom',
                  'zh-CN': '左下'
                }
              },
              {
                'value': 'center-top',
                'name': {
                  'en': 'Center top',
                  'zh-CN': '正上'
                }
              },
              {
                'value': 'center',
                'name': {
                  'en': 'Center',
                  'zh-CN': '正中'
                }
              },
              {
                'value': 'center-bottom',
                'name': {
                  'en': 'Center bottom',
                  'zh-CN': '正下'
                }
              },
              {
                'value': 'right-top',
                'name': {
                  'en': 'Right top',
                  'zh-CN': '右上'
                }
              },
              {
                'value': 'right-center',
                'name': {
                  'en': 'Right center',
                  'zh-CN': '右中'
                }
              },
              {
                'value': 'right-bottom',
                'name': {
                  'en': 'Right bottom',
                  'zh-CN': '右下'
                }
              }
            ]
          },
          {
            'default': '',
            'field': 'textColor',
            'name': {
              'en': 'Text Color',
              'zh-CN': '文本颜色'
            },
            'options': [

            ],
            'type': 'colorPicker',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          },
          {
            'type': 'colorPicker',
            'field': 'maskColor',
            'default': '',
            'name': {
              'en': 'Mask color',
              'zh-CN': '蒙板层颜色'
            },
            'info': {
              'en': '',
              'zh-CN': ''
            },
            'options': [

            ]
          },
          {
            'type': 'select',
            'field': 'textAlign',
            'default': 'text-center',
            'name': {
              'en': 'Text align',
              'zh-CN': '文本对齐'
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
            'type': 'select',
            'field': 'contentAlign',
            'default': 'text-left',
            'name': {
              'en': 'Content align',
              'zh-CN': '正文对齐'
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
            'default': 'normal',
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
              en: 'When content align "center"',
              'zh-CN': '正文对齐为 "左"的时候，段落符号生效'
            }
          },
          {
            'default': '',
            'field': '',
            'name': {
              'en': '',
              'zh-CN': ''
            },
            'options': [

            ],
            'type': 'divider',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          },
          {
            'default': false,
            'field': 'marginTop',
            'name': {
              'en': 'Margin top',
              'zh-CN': '外边距（上）'
            },
            'options': [

            ],
            'type': 'switch',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          },
          {
            'default': false,
            'field': 'marginBottom',
            'name': {
              'en': 'Margin bottom',
              'zh-CN': '外边距（下）'
            },
            'options': [

            ],
            'type': 'switch',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          },
          {
            'default': false,
            'field': 'paddingTop',
            'name': {
              'en': 'Padding top',
              'zh-CN': '内边距（上）'
            },
            'options': [

            ],
            'type': 'switch',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          },
          {
            'default': false,
            'field': 'paddingBottom',
            'name': {
              'en': 'Padding bottom',
              'zh-CN': '内边距（下）'
            },
            'options': [

            ],
            'type': 'switch',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          },
          {
            'default': '',
            'field': 'backgroundColor',
            'name': {
              'en': 'Background color',
              'zh-CN': '背景色'
            },
            'options': [

            ],
            'type': 'colorPicker',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          },
          {
            'default': '',
            'field': 'backgroundImage',
            'name': {
              'en': 'Background image',
              'zh-CN': '背景图'
            },
            'options': [

            ],
            'type': 'imagePicker',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          },
          {
            'default': '',
            'field': 'backgroundPosition',
            'name': {
              'en': 'Background Position',
              'zh-CN': '背景图位置'
            },
            'options': [
              {
                'name': {
                  'en': 'top left',
                  'zh-CN': '左上'
                },
                'value': 'top left'
              },
              {
                'name': {
                  'en': 'top center',
                  'zh-CN': '中上'
                },
                'value': 'top center'
              },
              {
                'name': {
                  'en': 'top right',
                  'zh-CN': '右上'
                },
                'value': 'top right'
              },
              {
                'name': {
                  'en': 'center left',
                  'zh-CN': '左中'
                },
                'value': 'center left'
              },
              {
                'name': {
                  'en': 'center center',
                  'zh-CN': '正中'
                },
                'value': 'center center'
              },
              {
                'name': {
                  'en': 'center right',
                  'zh-CN': '右中'
                },
                'value': 'center right'
              },
              {
                'name': {
                  'en': 'bottom left',
                  'zh-CN': '左下'
                },
                'value': 'bottom left'
              },
              {
                'name': {
                  'en': 'bottom center',
                  'zh-CN': '正下'
                },
                'value': 'bottom center'
              },
              {
                'name': {
                  'en': 'bottom right',
                  'zh-CN': '右下'
                },
                'value': 'bottom right'
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
            'field': 'backgroundRepeat',
            'name': {
              'en': 'Background Repeat',
              'zh-CN': '背景填充'
            },
            'options': [
              {
                'name': {
                  'en': 'Repeat',
                  'zh-CN': '重复'
                },
                'value': 'repeat'
              },
              {
                'name': {
                  'en': 'Repeat X',
                  'zh-CN': '水平填充'
                },
                'value': 'repeat-x'
              },
              {
                'name': {
                  'en': 'Repeat Y',
                  'zh-CN': '垂直填充'
                },
                'value': 'repeat-y'
              },
              {
                'name': {
                  'en': 'No repeat',
                  'zh-CN': '填充一次'
                },
                'value': 'no-repeat'
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
            'field': 'backgroundSize',
            'name': {
              'en': 'Background Size',
              'zh-CN': '背景图大小'
            },
            'options': [
              {
                'name': {
                  'en': 'Cover',
                  'zh-CN': '短边填满'
                },
                'value': 'cover'
              },
              {
                'name': {
                  'en': 'Contain',
                  'zh-CN': '长边填满'
                },
                'value': 'contain'
              },
              {
                'name': {
                  'en': 'Default',
                  'zh-CN': '默认'
                },
                'value': 'auto'
              }
            ],
            'type': 'select',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          }
        ],
        'multiple': 1,
        'name': {
          'en': 'Image',
          'zh-CN': '图片'
        },
        'placeholder': {
          'en': 'Image',
          'zh-CN': '图片'
        },
        'tag': 'imageList',
        'tips': {
          'en': '',
          'zh-CN': ''
        }
      },
      {
        'max': 0,
        'dataType': false,
        'elements': [
          {
            'default': false,
            'field': 'wideScreen',
            'name': {
              'en': 'Wide screen',
              'zh-CN': '宽屏模式'
            },
            'options': [

            ],
            'type': 'switch',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          },
          {
            'type': 'select',
            'field': 'firstLayout',
            'default': 'left',
            'name': {
              'en': 'First position',
              'zh-CN': '首图位置'
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
                'value': 'right',
                'name': {
                  'en': 'Right',
                  'zh-CN': '右'
                }
              }
            ]
          },
          {
            'default': '5by4',
            'field': 'imageScale',
            'name': {
              'en': 'Picture scale',
              'zh-CN': '图片比例'
            },
            'options': [
              {
                'name': {
                  'en': '1:1',
                  'zh-CN': '1:1'
                },
                'value': '1by1'
              },
              {
                'name': {
                  'en': '21:9',
                  'zh-CN': '21:9'
                },
                'value': '21by9'
              },
              {
                'name': {
                  'en': '16:9',
                  'zh-CN': '16:9'
                },
                'value': '16by9'
              },
              {
                'name': {
                  'en': '5:4',
                  'zh-CN': '5:4'
                },
                'value': '5by4'
              },
              {
                'name': {
                  'en': '4:3',
                  'zh-CN': '4:3'
                },
                'value': '4by3'
              },
              {
                'name': {
                  'en': '9:21',
                  'zh-CN': '9:21'
                },
                'value': '9by21'
              },
              {
                'name': {
                  'en': '9:16',
                  'zh-CN': '9:16'
                },
                'value': '9by16'
              },
              {
                'name': {
                  'en': '4:5',
                  'zh-CN': '4:5'
                },
                'value': '4by5'
              },
              {
                'name': {
                  'en': '3:4',
                  'zh-CN': '3:4'
                },
                'value': '3by4'
              },
              {
                'name': {
                  'en': 'Normal',
                  'zh-CN': '原始比例'
                },
                'value': 'normal'
              }
            ],
            'type': 'select',
            'info': {
              'en': '',
              'zh-CN': ''
            }
          },
          {
            'default': '6',
            'field': 'imagePercentage',
            'name': {
              'en': 'Picture percentage',
              'zh-CN': '图片占比'
            },
            'options': [
              {
                'name': {
                  'en': '8%',
                  'zh-CN': '8%'
                },
                'value': '1'
              },
              {
                'name': {
                  'en': '16%',
                  'zh-CN': '16%'
                },
                'value': '2'
              },
              {
                'name': {
                  'en': '25%',
                  'zh-CN': '25%'
                },
                'value': '3'
              },
              {
                'name': {
                  'en': '33%',
                  'zh-CN': '33%'
                },
                'value': '4'
              },
              {
                'name': {
                  'en': '40%',
                  'zh-CN': '40%'
                },
                'value': '5'
              },
              {
                'name': {
                  'en': '50%',
                  'zh-CN': '50%'
                },
                'value': '6'
              },
              {
                'name': {
                  'en': '60%',
                  'zh-CN': '60%'
                },
                'value': '7'
              },
              {
                'name': {
                  'en': '67%',
                  'zh-CN': '67%'
                },
                'value': '8'
              },
              {
                'name': {
                  'en': '75%',
                  'zh-CN': '75%'
                },
                'value': '9'
              },
              {
                'name': {
                  'en': '83%',
                  'zh-CN': '83%'
                },
                'value': '10'
              },
              {
                'name': {
                  'en': '100%',
                  'zh-CN': '100%'
                },
                'value': '12'
              }
            ],
            'type': 'select',
            'info': {
              'en': 'When the picture width is 100%, the text will be covered on the layer',
              'zh-CN': '图片宽度为100%的时候，文字将覆盖在图层上面'
            }
          }
        ],
        'multiple': 0,
        'name': {
          'en': 'Settings',
          'zh-CN': '设置'
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
    ]
  }
}
