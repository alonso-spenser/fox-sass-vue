export default {
  /**
     * 表单选择器
     */
  inquiryFormPicker: {
    dataset: {
      buttonLabel: '',
      id: '',
      remark: '',
      title: 'Inquiry form'
    },
    default: {
      title: 'Contact us',
      buttonLabel: 'Submit',
      remark: 'This is the describe for inquiry form',
      fieldList: [
        {
          fieldName: 'lastName',
          defaultValue: '',
          fieldLabel: 'Last name',
          placeholder: 'Please enter last name',
          sort: '1',
          fieldType: 'text',
          required: false
        },
        {
          fieldName: 'firstName',
          defaultValue: '',
          fieldLabel: 'First name',
          placeholder: 'Please enter first name',
          sort: '2',
          fieldType: 'text',
          required: false
        },
        {
          fieldName: 'email',
          defaultValue: '',
          fieldLabel: 'Email',
          id: '1158289022079750146',
          placeholder: 'Please enter email',
          sort: '3',
          fieldType: 'email',
          required: true
        },
        {
          formId: '1157492648300646402',
          fieldName: 'phone',
          defaultValue: '',
          fieldLabel: 'Phone',
          placeholder: 'Please enter phone number',
          sort: '4',
          fieldType: 'tel',
          required: true
        },
        {
          formId: '1157492648300646402',
          fieldName: 'message',
          defaultValue: '',
          fieldLabel: 'Message',
          placeholder: 'Please tell us the message',
          sort: '5',
          fieldType: 'textarea',
          required: true
        }
      ]
    }
  },
  /**
     * 菜单
     */
  menuPicker: {
    dataset: {
      id: 3
    },
    default: {
      id: 3
    }
  },
  productCollectionPicker: {
    0: {
      dataset: {
        'id': '',
        'title': '',
        'image': 'https://theme.fomillesite.com/img/placeholder.jpg'
      },
      default: [
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'name': 'Apple iPhone XS Max (A2104) 256GB',
          'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
          'minPrice': 199.00,
          'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'name': 'Apple iPhone XS Max (A2104) 256GB',
          'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
          'minPrice': 199.00,
          'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'name': 'Apple iPhone XS Max (A2104) 256GB',
          'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
          'minPrice': 199.00,
          'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'name': 'Apple iPhone XS Max (A2104) 256GB',
          'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
          'minPrice': 199.00,
          'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        }
      ]
    },
    1: {
      dataset: {
        'id': '',
        'title': '',
        'image': 'https://theme.fomillesite.com/img/placeholder.jpg'
      },
      default: [
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'seoUrl': '',
          'title': '1 Example Collection Title',
          'content': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability,\nstyle, or even provide a review.'
        },
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'seoUrl': '',
          'title': '2 Example Collection Title',
          'content': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability,\nstyle, or even provide a review.'
        },
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'seoUrl': '',
          'title': '3 Example Collection Title',
          'content': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability,\nstyle, or even provide a review.'
        },
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'seoUrl': '',
          'title': '4 Example Collection Title',
          'content': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability,\nstyle, or even provide a review.'
        }
      ]
    },
    2: {
      dataset: {
        'id': '',
        'title': '',
        'image': 'https://theme.fomillesite.com/img/placeholder.jpg'
      },
      default: [
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'seoUrl': '',
          'title': '1 Example Collection Title',
          'content': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability,\nstyle, or even provide a review.',
          items: [
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'name': 'Apple iPhone XS Max (A2104) 256GB',
              'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
              'minPrice': 199.00,
              'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'name': 'Apple iPhone XS Max (A2104) 256GB',
              'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
              'minPrice': 199.00,
              'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'name': 'Apple iPhone XS Max (A2104) 256GB',
              'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
              'minPrice': 199.00,
              'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'name': 'Apple iPhone XS Max (A2104) 256GB',
              'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
              'minPrice': 199.00,
              'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
            }
          ]
        },
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'seoUrl': '',
          'title': '3 Example Collection Title',
          'content': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability,\nstyle, or even provide a review.',
          items: [
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'name': 'Apple iPhone XS Max (A2104) 256GB',
              'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
              'minPrice': 199.00,
              'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'name': 'Apple iPhone XS Max (A2104) 256GB',
              'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
              'minPrice': 199.00,
              'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'name': 'Apple iPhone XS Max (A2104) 256GB',
              'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
              'minPrice': 199.00,
              'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'name': 'Apple iPhone XS Max (A2104) 256GB',
              'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
              'minPrice': 199.00,
              'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
            }
          ]
        },
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'seoUrl': '',
          'title': '3 Example Collection Title',
          'content': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability,\nstyle, or even provide a review.',
          items: [
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'name': 'Apple iPhone XS Max (A2104) 256GB',
              'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
              'minPrice': 199.00,
              'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'name': 'Apple iPhone XS Max (A2104) 256GB',
              'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
              'minPrice': 199.00,
              'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'name': 'Apple iPhone XS Max (A2104) 256GB',
              'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
              'minPrice': 199.00,
              'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'name': 'Apple iPhone XS Max (A2104) 256GB',
              'seoUrl': 'apple-iphone-xs-max-a2104-256gb',
              'minPrice': 199.00,
              'summary': 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
            }
          ]
        }
      ]
    },
    schema: {
      collection: [
        {
          type: 'hidden',
          field: 'collectionCode',
          default: '',
          name: {
            en: 'Collection code',
            'zh-CN': '集合代码'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        },
        {
          type: 'hidden',
          field: 'seoUrl',
          default: '',
          name: {
            en: 'Link',
            'zh-CN': '链接地址'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        },
        {
          type: 'imagePicker',
          field: 'imageUrl',
          default: '',
          name: {
            en: 'Image',
            'zh-CN': '集合图片'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        },
        {
          type: 'text',
          field: 'collectionName',
          default: '',
          name: {
            en: 'Collection name',
            'zh-CN': '集合名名'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        }
      ],
      product: [
        {
          type: 'hidden',
          field: 'seoUrl',
          default: '',
          name: {
            en: 'Link',
            'zh-CN': '链接地址'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        },
        {
          type: 'imagePicker',
          field: 'goodsMainPicture',
          default: 'https://cdn.mybuckyshop.com/starit-buckyshop-site/2019/img/800.jpg',
          name: {
            en: 'Image',
            'zh-CN': '商品图片'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: [],
          altFiled: ''
        },
        {
          type: 'text',
          field: 'goodsName',
          default: 'Example product name',
          name: {
            en: 'Goods name',
            'zh-CN': '商品名称'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        },
        {
          type: 'text',
          field: 'minSalePrice',
          default: '1.99',
          name: {
            en: 'Price',
            'zh-CN': '价格'
          },
          info: {
            en: '',
            'zh-CN': ''
          },
          options: []
        }
      ]
    }
  },
  articleCollectionPicker: {
    0: {
      dataset: {
        'id': '',
        'title': '',
        'image': 'https://theme.fomillesite.com/img/placeholder.jpg'
      },
      default: [
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'createTime': 1562222541298,
          'seoUrl': '',
          'title': '1 Tesla is now the most valuable US automaker ever',
          'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
        },
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'createTime': 1562222541298,
          'seoUrl': '',
          'title': '2 Tesla is now the most valuable US automaker ever',
          'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
        },
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'createTime': 1562222541298,
          'seoUrl': '',
          'title': '3 Tesla is now the most valuable US automaker ever',
          'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
        },
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'createTime': 1562222541298,
          'seoUrl': '',
          'title': '4 Tesla is now the most valuable US automaker ever',
          'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
        }
      ]
    },
    1: {
      dataset: {
        'id': '',
        'title': '',
        'image': 'https://theme.fomillesite.com/img/placeholder.jpg'
      },
      default: [
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'seoUrl': '',
          'title': '1 Example Collection Title',
          'content': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability,\nstyle, or even provide a review.'
        },
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'seoUrl': '',
          'title': '2 Example Collection Title',
          'content': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability,\nstyle, or even provide a review.'
        },
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'seoUrl': '',
          'title': '3 Example Collection Title',
          'content': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability,\nstyle, or even provide a review.'
        },
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'seoUrl': '',
          'title': '4 Example Collection Title',
          'content': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability,\nstyle, or even provide a review.'
        }
      ]
    },
    2: {
      dataset: {
        'id': '',
        'title': '',
        'image': 'https://theme.fomillesite.com/img/placeholder.jpg'
      },
      default: [
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'seoUrl': '',
          'title': '1 Example Collection Title',
          'content': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability,\nstyle, or even provide a review.',
          items: [
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'createTime': 1562222541298,
              'seoUrl': '',
              'title': '1 Tesla is now the most valuable US automaker ever',
              'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'createTime': 1562222541298,
              'seoUrl': '',
              'title': '2 Tesla is now the most valuable US automaker ever',
              'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'createTime': 1562222541298,
              'seoUrl': '',
              'title': '3 Tesla is now the most valuable US automaker ever',
              'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'createTime': 1562222541298,
              'seoUrl': '',
              'title': '4 Tesla is now the most valuable US automaker ever',
              'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
            }
          ]
        },
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'seoUrl': '',
          'title': '2 Example Collection Title',
          'content': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability,\nstyle, or even provide a review.',
          items: [
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'createTime': 1562222541298,
              'seoUrl': '',
              'title': '1 Tesla is now the most valuable US automaker ever',
              'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'createTime': 1562222541298,
              'seoUrl': '',
              'title': '2 Tesla is now the most valuable US automaker ever',
              'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'createTime': 1562222541298,
              'seoUrl': '',
              'title': '3 Tesla is now the most valuable US automaker ever',
              'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'createTime': 1562222541298,
              'seoUrl': '',
              'title': '4 Tesla is now the most valuable US automaker ever',
              'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
            }
          ]
        },
        {
          'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
          'seoUrl': '',
          'title': '3 Example Collection Title',
          'content': 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability,\nstyle, or even provide a review.',
          items: [
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'createTime': 1562222541298,
              'seoUrl': '',
              'title': '1 Tesla is now the most valuable US automaker ever',
              'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'createTime': 1562222541298,
              'seoUrl': '',
              'title': '2 Tesla is now the most valuable US automaker ever',
              'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'createTime': 1562222541298,
              'seoUrl': '',
              'title': '3 Tesla is now the most valuable US automaker ever',
              'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
            },
            {
              'coverImage': 'https://theme.fomillesite.com/img/placeholder.jpg',
              'createTime': 1562222541298,
              'seoUrl': '',
              'title': '4 Tesla is now the most valuable US automaker ever',
              'summary': 'The budget is the most basic thing in financial planning. It is therefore especially important to be careful when compiling the budget. To start you have to draw up your own budget for the next month and only after it you may make a yearly budget'
            }
          ]
        }
      ]
    }
  },
  page: {
    articleDetail: {
      collection: [
        {
          coverImage: 'https://site-file.fomillesite.com/0/001/news/tesla.jpg',
          title: 'Apple has stopped letting contractors listen to Siri voice recordings',
          seoUrl: '',
          createTime: 1562222541298,
          summary: 'Apple has temporarily stopped a practice that allowed contractors to listen to user commands given to its voice assistant Siri.'
        },
        {
          coverImage: 'https://site-file.fomillesite.com/0/001/news/ford.jpg',
          title: 'Facebook announces first take down of influence campaign with ties to Saudi government',
          seoUrl: '',
          createTime: 1562222541298,
          summary: 'Facebook said Thursday it had found evidence of something cyber security and national security experts have long suspected: people tied to the government of Saudi Arabia have been running covert campaigns on Facebook and Instagram in a bid to prop up support for the kingdom and attack its enemies.'
        },
        {
          coverImage: 'https://site-file.fomillesite.com/0/001/news/neuralink.jpg',
          title: 'eBay claims Amazon managers illegally tried to recruit its top sellers',
          seoUrl: '',
          createTime: 1562222541298,
          summary: 'eBay (EBAY) is once again accusing Amazon managers of illegally conspiring to recruit its "high-value" sellers, according to a lawsuit filed on Wednesday.'
        },
        {
          coverImage: 'https://site-file.fomillesite.com/0/001/news/musk.jpg',
          title: "Samsung sees 'challenges' ahead after profit drops 56% in second quarter",
          seoUrl: '',
          createTime: 1562222541298,
          summary: "Samsung stock dropped on Wednesday after the world's biggest smartphone maker reported a 56% fall in its operating profit for the second quarter, citing price declines in its memory chip business."
        }
      ],
      collections: [
        {
          coverImage: 'https://theme.fomillesite.com/img/placeholder.jpg',
          seoUrl: 'javascript:void(0)',
          title: 'News'
        },
        {
          coverImage: 'https://site-file.fomillesite.com/0/001/img/placeholder.jpg',
          seoUrl: '',
          title: 'Cases'
        },
        {
          coverImage: 'https://site-file.fomillesite.com/0/001/img/placeholder.jpg',
          seoUrl: '',
          title: 'Article Collection Title'
        }
      ],
      data: {
        attachmentList: [
          {
            createTime: 0,
            fileType: 1,
            id: '1159777239366971394',
            title: 'alex-a-lai-si-shu-zhuo__0526853_PE645208_S3.webp',
            url: 'https://site-file.fomillesite.com/1128230638471409665/1565347414436.webp'
          }
        ],
        content: 'Article content',
        coverAlt: '',
        coverImage: 'https://site-file.fomillesite.com/0/001/news/musk.jpg',
        seoDescription: "San Francisco (CNN Business)This week Elon Musk unveiled his most sci-fi project thus far: a computer chip connected to exceptionally slender wires with electrodes on them, all of which is meant to be embedded in a person's brain by a surgical robot. The implant would connect wirelessly to a small behind-the-ear receiv",
        seoKeywords: '',
        seoTitle: 'Elon Musk hopes to put a computer chip in your brain. Who wants one?',
        seoUrl: 'Elon-Musk-hopes-to-put-a-computer-chip-in-your-brain-Who-wants-one-1-1',
        summary: "San Francisco (CNN Business)This week Elon Musk unveiled his most sci-fi project thus far: a computer chip connected to exceptionally slender wires with electrodes on them, all of which is meant to be embedded in a person's brain by a surgical robot. ",
        title: 'Our company was invited to participate in the 2019 Shanghai exhibition and achieved great success',
        createTime: 1564736957517
      }
    }
  },
  regionCode: {
    'en': {
      'lang': '英语'
    },
    'fr': {
      'lang': '法语'
    },
    'es': {
      'lang': '西班牙语'
    },
    'de': {
      'lang': '德语'
    },
    'ru': {
      'lang': '俄语'
    },
    'ar': {
      'lang': '阿拉伯语'
    },
    'ko': {
      'lang': '韩语'
    },
    'ja': {
      'lang': '日语'
    },
    'it': {
      'lang': '意大利语'
    },
    'pt': {
      'lang': '葡萄牙语'
    },
    'ga': {
      'lang': '爱尔兰语'
    },
    'da': {
      'lang': '丹麦语'
    },
    'id': {
      'lang': '印度尼西亚语'
    },
    'tr': {
      'lang': '土耳其语'
    },
    'sv': {
      'lang': '瑞典语'
    },
    'ro': {
      'lang': '罗马尼亚语'
    },
    'pl': {
      'lang': '波兰语'
    },
    'cs': {
      'lang': '捷克语'
    },
    'af': {
      'lang': '南非荷兰语'
    },
    'el': {
      'lang': '希腊语'
    },
    'ms': {
      'lang': '马来语'
    },
    'sr': {
      'lang': '塞尔维亚语'
    },
    'sw': {
      'lang': '斯瓦西里语'
    },
    'th': {
      'lang': '泰语'
    },
    'vi': {
      'lang': '越南语'
    },
    'sk': {
      'lang': '斯洛文尼亚语'
    },
    'lv': {
      'lang': '拉脱维亚语'
    },
    'mt': {
      'lang': '马其他语'
    },
    'hu': {
      'lang': '匈牙利语'
    },
    'gl': {
      'lang': '加利西亚语'
    },
    'et': {
      'lang': '爱沙尼亚语'
    },
    'bn': {
      'lang': '孟加拉语'
    },
    'sq': {
      'lang': '阿尔巴尼亚语'
    },
    'be': {
      'lang': '白俄罗斯语'
    },
    'nl': {
      'lang': '荷兰语'
    },
    'tl': {
      'lang': '菲律宾语'
    },
    'ka': {
      'lang': '格鲁吉亚语'
    },
    'lt': {
      'lang': '立陶宛语'
    },
    'no': {
      'lang': '挪威语'
    },
    'sl': {
      'lang': '斯洛文尼亚语'
    },
    'uk': {
      'lang': '乌克兰语'
    },
    'fa': {
      'lang': '波斯语'
    },
    'mk': {
      'lang': '马其顿语'
    },
    'fi': {
      'lang': '芬兰语'
    },
    'hr': {
      'lang': '克罗地亚语'
    },
    'bg': {
      'lang': '保加利亚语'
    },
    'az': {
      'lang': '阿塞拜疆语'
    },
    'hy': {
      'lang': '亚美尼亚语'
    },
    'bs': {
      'lang': '波斯尼亚语'
    },
    'ha': {
      'lang': '豪撒语'
    },
    'kk': {
      'lang': '哈萨克语'
    },
    'lo': {
      'lang': '菲律宾语'
    },
    'la': {
      'lang': '拉丁语'
    },
    'mg': {
      'lang': '马尔加什语'
    },
    'mi': {
      'lang': '毛利语'
    },
    'mr': {
      'lang': '马拉地语'
    },
    'mn': {
      'lang': '蒙古语'
    },
    'my': {
      'lang': '缅甸语'
    },
    'ne': {
      'lang': '尼泊尔语'
    },
    'pa': {
      'lang': '旁遮普语'
    },
    'st': {
      'lang': '塞索托语'
    },
    'si': {
      'lang': '僧伽罗语'
    },
    'so': {
      'lang': '索马里语'
    },
    'tg': {
      'lang': '塔吉克语'
    },
    'uz': {
      'lang': '乌兹别克语'
    },
    'yo': {
      'lang': '约鲁巴语'
    },
    'zu': {
      'lang': '祖鲁语'
    },
    'zh-CN': {
      'lang': '简体中文'
    },
    'zh-TW': {
      'lang': '繁体中文'
    }
  }
}
