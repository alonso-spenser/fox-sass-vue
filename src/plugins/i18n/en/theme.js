export default {
  videoPicker: {
    placeholder: 'Enter a YouTube share link'
  },
  theme: {
    paging: {
      title: 'Themes',
      heading: '',
      subheading: '',
      add: 'Add theme',
      empty: {
        content: 'Themes you add will appear here. You can edit, delete, and manage them in bulk.',
        buttonLabel: 'Add theme'
      },
      tableHeader: {
        author: 'Author',
        description: 'Theme description',
        longImage: 'Full-length theme screenshot',
        mobileImage: 'Mobile screenshot',
        name: 'Theme name',
        screenshot: 'Theme thumbnail',
        siteType: 'Template type',
        sortIndex: 'Sort by',
        state: 'Status',
        synopsis: 'Theme summary',
        updateTime: 'Updated at',
        version: 'Version number'
      }
    },
    update: {
      addTitle: 'Add theme',
      updateTitle: 'Edit theme',
      entity: {
        author: {
          label: 'Author',
          tips: '',
          placeholder: 'Author',
          required: 'Enter an author',
          custom: ''
        },
        sourceType: {
          label: 'Type',
          option: [
            {
              id: 0,
              label: 'System default'
            },
            {
              id: 1,
              label: 'Website template'
            }
          ]
        },
        tagList: {
          label: 'Theme category',
          tips: '',
          placeholder: 'Select a theme category',
          required: 'Select a theme category',
          custom: ''
        },
        demoUrl: {
          label: 'Demo website URL',
          tips: '',
          placeholder: 'Demo website URL',
          required: 'Enter a demo website URL',
          custom: ''
        },
        description: {
          label: 'Details',
          tips: '',
          placeholder: 'Details',
          required: 'Enter details',
          custom: ''
        },
        longImage: {
          label: 'Full-length theme screenshot',
          tips: '',
          placeholder: 'Full-length theme screenshot',
          required: 'Enter a full-length theme screenshot',
          custom: ''
        },
        mobileImage: {
          label: 'Mobile screenshot',
          tips: '',
          placeholder: 'Mobile screenshot',
          required: 'Enter a mobile screenshot',
          custom: ''
        },
        name: {
          label: 'Theme name',
          tips: '',
          placeholder: 'Theme name',
          required: 'Enter a theme name',
          custom: ''
        },
        screenshot: {
          label: 'Theme thumbnail',
          tips: '',
          placeholder: 'Theme thumbnail',
          required: 'Enter a theme thumbnail',
          custom: ''
        },
        siteId: {
          label: 'Template website ID',
          tips: '',
          placeholder: 'Template website ID',
          required: 'Enter a template website ID',
          custom: ''
        },
        siteType: {
          label: 'Template type',
          tips: '',
          placeholder: 'Select a template type',
          required: 'Select a template type',
          custom: ''
        },
        sortIndex: {
          label: 'Sort by',
          tips: '',
          placeholder: 'Sort by',
          required: 'Enter a sort order',
          custom: ''
        },
        state: {
          label: 'Enabled',
          tips: '',
          placeholder: 'Enabled',
          required: 'Specify whether it is enabled',
          custom: ''
        },
        synopsis: {
          label: 'Summary',
          tips: '',
          placeholder: 'Theme summary',
          required: 'Enter a theme summary',
          custom: ''
        },
        updateTime: {
          label: 'Updated at',
          tips: '',
          placeholder: 'Updated at',
          required: 'Enter an update time',
          custom: ''
        },
        version: {
          label: 'Version number',
          tips: '',
          placeholder: 'Version number',
          required: 'Enter a version number',
          custom: ''
        }
      }
    },
    tag: {
      title: 'Theme tags',
      tips: 'Categorize theme templates',
      entity: {
        tagName: {
          label: 'Tag name',
          tips: '',
          placeholder: 'Tag name',
          required: 'Enter a tag name',
          custom: ''
        }
      }
    },
    sectionTag: {
      title: 'Section tags',
      tips: 'Categorize sections',
      siteType: 'Website type',
      entity: {
        tagName: {
          label: 'Tag name',
          tips: '',
          placeholder: 'Tag name',
          required: 'Enter a tag name',
          custom: ''
        }
      }
    },
    page: {
      paging: {
        title: 'Template pages',
        heading: '',
        subheading: '',
        add: 'Add template page',
        empty: {
          content: 'Template pages you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add template page'
        },
        tableHeader: {
          addSection: 'Section additions',
          bindSection: 'Default section',
          hasFloatMenu: 'Floating menu',
          hasFooter: 'Footer',
          hasHeader: 'Header',
          menuVisible: 'Menu visibility',
          pageType: 'Page type',
          siteType: 'Applicable website',
          title: 'Page name',
          section: 'SECTION'
        }
      },
      update: {
        addTitle: 'Add template page',
        updateTitle: 'Edit template page',
        entity: {
          addSection: {
            label: 'Add section',
            tips: '',
            placeholder: 'Add section',
            required: 'Enter sections to add',
            custom: ''
          },
          bindSection: {
            label: 'Default section',
            tips: '',
            placeholder: 'Default section',
            required: 'Enter a default section',
            custom: ''
          },
          hasFloatMenu: {
            label: 'Floating menu',
            tips: '',
            placeholder: 'Floating menu',
            required: 'Enter a floating menu',
            custom: ''
          },
          hasFooter: {
            label: 'Footer',
            tips: '',
            placeholder: 'Footer',
            required: 'Enter a footer',
            custom: ''
          },
          hasHeader: {
            label: 'Header',
            tips: '',
            placeholder: 'Header',
            required: 'Enter a header',
            custom: ''
          },
          menuVisible: {
            label: 'Menu visibility',
            tips: '',
            placeholder: 'Menu visibility',
            required: 'Enter menu visibility',
            custom: ''
          },
          pageType: {
            label: 'Page type',
            tips: '',
            placeholder: 'Page type',
            required: 'Enter a page type',
            custom: ''
          },
          siteType: {
            label: 'Website type',
            tips: '',
            placeholder: 'Website type',
            required: 'Enter a website type',
            custom: ''
          },
          title: {
            label: 'Page name',
            tips: '',
            placeholder: 'Page name',
            required: 'Enter a page name',
            custom: ''
          }
        }
      }
    },
    section: {
      paging: {
        title: 'Sections',
        heading: '',
        subheading: '',
        add: 'Add section',
        empty: {
          content: 'Sections you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add section'
        },
        tableHeader: {
          author: 'Author',
          description: 'Section description',
          dynamic: 'Data component',
          sectionGroup: 'Type',
          sectionImage: 'Preview image',
          sectionIcon: 'SVG icon',
          sectionName: 'Section name',
          sectionType: 'Section type',
          updateTime: 'Updated at',
          tag: 'TAG',
          salt: 'Salt',
          sectionSchema: 'SCHEMA'
        }
      },
      update: {
        addTitle: 'Add section',
        updateTitle: 'Edit section',
        entity: {
          sectionIcon: {
            label: 'Icon',
            tips: '',
            placeholder: 'Icon',
            required: 'Enter an icon',
            custom: ''
          },
          state: {
            label: 'Available',
            tips: '',
            placeholder: 'Available',
            required: 'Specify whether it is available',
            custom: ''
          },
          salt: {
            label: 'Salt',
            tips: '',
            placeholder: 'Salt',
            required: 'Enter a salt value',
            custom: ''
          },
          tag: {
            label: 'TAG',
            tips: '',
            placeholder: 'TAG',
            required: 'Select a tag',
            custom: ''
          },
          scriptCode: {
            label: 'Script code',
            tips: '',
            placeholder: 'Script code — use packed compression',
            required: 'Enter script code: https://tool.lu/js',
            custom: ''
          },
          variableCss: {
            label: 'CSS variables',
            tips: '',
            placeholder: 'CSS variables',
            required: 'Enter CSS variables',
            custom: ''
          },
          ampCss: {
            label: 'AMP CSS',
            tips: '',
            placeholder: 'AMP CSS',
            required: 'Enter AMP CSS',
            custom: ''
          },
          ampTemplate: {
            label: 'AMP template',
            tips: '',
            placeholder: 'AMP template',
            required: 'Enter an AMP template',
            custom: ''
          },
          artTemplate: {
            label: 'ART template',
            tips: '',
            placeholder: 'ART template',
            required: 'Enter an ART template',
            custom: ''
          },
          author: {
            label: 'Author',
            tips: '',
            placeholder: 'Author',
            required: 'Enter an author',
            custom: ''
          },
          baseCss: {
            label: 'Base CSS',
            tips: '',
            placeholder: 'Base CSS',
            required: 'Enter base CSS',
            custom: ''
          },
          description: {
            label: 'Section description',
            tips: '',
            placeholder: 'Section description',
            required: 'Enter a section description',
            custom: ''
          },
          dynamic: {
            label: 'Data component',
            tips: '',
            placeholder: 'Data component',
            required: 'Enter a data component',
            custom: ''
          },
          language: {
            label: 'Language pack',
            tips: '',
            placeholder: 'Language pack',
            required: 'Enter a language pack',
            custom: ''
          },
          sectionData: {
            label: 'Default settings',
            tips: '',
            placeholder: 'Default settings',
            required: 'Enter default settings',
            custom: ''
          },
          sectionGroup: {
            label: 'Type',
            tips: '',
            placeholder: 'Type',
            required: 'Enter a type',
            custom: ''
          },
          sectionImage: {
            label: 'Preview image',
            tips: '',
            placeholder: 'Preview image',
            required: 'Enter a preview image',
            custom: ''
          },
          sectionName: {
            label: 'Section name',
            tips: '',
            placeholder: 'Section name',
            required: 'Enter a section name',
            custom: ''
          },
          sectionSchema: {
            label: 'SCHEMA',
            tips: '',
            placeholder: 'SCHEMA',
            required: 'Enter a schema',
            custom: ''
          },
          sectionType: {
            label: 'Section type',
            tips: '',
            placeholder: 'Section type',
            required: 'Enter a section type',
            custom: ''
          },
          thymeleafTemplate: {
            label: 'Thymeleaf template',
            tips: '',
            placeholder: 'Thymeleaf template',
            required: 'Enter a Thymeleaf template',
            custom: ''
          },
          updateTime: {
            label: 'Updated at',
            tips: '',
            placeholder: 'Updated at',
            required: 'Enter an update time',
            custom: ''
          }
        }
      }
    },
    schema: {
      title: 'Theme settings',
      globalColorsSchema: 'Colors',
      globalFaviconSchema: 'Favicon',
      globalGeneralSchema: 'General settings',
      globalSocialSchema: 'Social media',
      globalTypographySchema: 'Typography',
      globalCss: {
        label: 'Base CSS',
        tips: '',
        placeholder: 'Base CSS',
        required: 'Enter base CSS',
        custom: ''
      },
      globalLanguage: {
        label: 'Base language pack',
        tips: '',
        placeholder: 'Base language pack',
        required: 'Enter a base language pack',
        custom: ''
      },
      pageLayout: {
        label: 'Base page HTML',
        tips: '',
        placeholder: 'Base page HTML',
        required: 'Enter content',
        custom: ''
      }
    },
    pageSection: {
      paging: {
        title: 'Template page sections',
        heading: '',
        subheading: '',
        add: 'Add template page section',
        empty: {
          content: 'Template page sections you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add template page section'
        },
        tableHeader: {
          pageId: 'Page ID',
          pageType: 'Page type',
          sectionData: 'Data source',
          sectionId: 'SECTION ID',
          sectionType: 'Linked section',
          sortIndex: 'Sort order (higher values appear first)',
          visible: '0: Visible, 1: Hidden'
        }
      },
      update: {
        addTitle: 'Add template page section',
        updateTitle: 'Edit template page section',
        entity: {
          pageType: {
            label: 'Page type',
            tips: '',
            placeholder: 'Page type',
            required: 'Enter a page type',
            custom: ''
          },
          sortIndex: {
            label: 'Sort order (higher values appear first)',
            tips: '',
            placeholder: 'Sort order (higher values appear first)',
            required: 'Enter a sort order; higher values appear first',
            custom: ''
          }
        }
      }
    }
  },
  pageType: [
    {
      title: 'Home',
      pageType: 'homePage',
      seoUrl: '/',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        2,
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Article collection page',
      pageType: 'articleCollectionPage',
      seoUrl: '/collection/article',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0,
      params: {
        multiple: 0,
        dataType: false,
        subs: 1,
        max: 0,
        removable: 0,
        name: {
          en: 'Standard',
          'zh-CN': 'Basic'
        },
        placeholder: {
          en: '',
          'zh-CN': ''
        },
        tips: {
          en: '',
          'zh-CN': ''
        },
        elements: [
          {
            type: 'slider',
            field: 'globalPageSize',
            default: 10,
            name: {
              en: 'Page size',
              'zh-CN': 'Items per page'
            },
            info: {
              en: '',
              'zh-CN': ''
            },
            options: [],
            min: 4,
            max: 100,
            step: 1
          }
        ]
      }
    },
    {
      title: 'Article listing',
      pageType: 'articlePaginationPage',
      seoUrl: '/collection/{collectionId}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0,
      params: {
        multiple: 0,
        dataType: false,
        subs: 1,
        max: 0,
        removable: 0,
        name: {
          en: 'Standard',
          'zh-CN': 'Basic'
        },
        placeholder: {
          en: '',
          'zh-CN': ''
        },
        tips: {
          en: '',
          'zh-CN': ''
        },
        elements: [
          {
            type: 'slider',
            field: 'globalPageSize',
            default: 10,
            name: {
              en: 'Page size',
              'zh-CN': 'Items per page'
            },
            info: {
              en: '',
              'zh-CN': ''
            },
            options: [],
            min: 4,
            max: 100,
            step: 1
          }
        ]
      }
    },
    {
      title: 'Author page',
      pageType: 'articleColumnistPage',
      seoUrl: '/writer/{id}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0,
      params: {
        multiple: 0,
        dataType: false,
        subs: 1,
        max: 0,
        removable: 0,
        name: {
          en: 'Standard',
          'zh-CN': 'Basic'
        },
        placeholder: {
          en: '',
          'zh-CN': ''
        },
        tips: {
          en: '',
          'zh-CN': ''
        },
        elements: [
          {
            type: 'slider',
            field: 'globalPageSize',
            default: 10,
            name: {
              en: 'Page size',
              'zh-CN': 'Items per page'
            },
            info: {
              en: '',
              'zh-CN': ''
            },
            options: [],
            min: 4,
            max: 100,
            step: 1
          }
        ]
      }
    },
    {
      title: 'Article detail page',
      pageType: 'articleDetailPage',
      seoUrl: '/item/{url}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Product collection page',
      pageType: 'productCollectionPage',
      seoUrl: '/collection',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0,
      params: {
        multiple: 0,
        dataType: false,
        subs: 1,
        max: 0,
        removable: 0,
        name: {
          en: 'Standard',
          'zh-CN': 'Basic'
        },
        placeholder: {
          en: '',
          'zh-CN': ''
        },
        tips: {
          en: '',
          'zh-CN': ''
        },
        elements: [
          {
            type: 'slider',
            field: 'globalPageSize',
            default: 10,
            name: {
              en: 'Page size',
              'zh-CN': 'Items per page'
            },
            info: {
              en: '',
              'zh-CN': ''
            },
            options: [],
            min: 4,
            max: 100,
            step: 1
          }
        ]
      }
    },
    {
      title: 'Product listing',
      pageType: 'productPaginationPage',
      seoUrl: '/collection/{collectionId}}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0,
      params: {
        multiple: 0,
        dataType: false,
        subs: 1,
        max: 0,
        removable: 0,
        name: {
          en: 'Standard',
          'zh-CN': 'Basic'
        },
        placeholder: {
          en: '',
          'zh-CN': ''
        },
        tips: {
          en: '',
          'zh-CN': ''
        },
        elements: [
          {
            type: 'slider',
            field: 'globalPageSize',
            default: 10,
            name: {
              en: 'Page size',
              'zh-CN': 'Items per page'
            },
            info: {
              en: '',
              'zh-CN': ''
            },
            options: [],
            min: 4,
            max: 100,
            step: 1
          }
        ]
      }
    },
    {
      title: 'Product detail page',
      pageType: 'productDetailPage',
      seoUrl: '/item/{url}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Download listing',
      pageType: 'downloadPaginationPage',
      seoUrl: '/collection/download',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0,
      params: {
        multiple: 0,
        dataType: false,
        subs: 1,
        max: 0,
        removable: 0,
        name: {
          en: 'Standard',
          'zh-CN': 'Basic'
        },
        placeholder: {
          en: '',
          'zh-CN': ''
        },
        tips: {
          en: '',
          'zh-CN': ''
        },
        elements: [
          {
            type: 'slider',
            field: 'globalPageSize',
            default: 10,
            name: {
              en: 'Page size',
              'zh-CN': 'Items per page'
            },
            info: {
              en: '',
              'zh-CN': ''
            },
            options: [],
            min: 4,
            max: 100,
            step: 1
          }
        ]
      }
    },
    {
      title: 'Tag page',
      pageType: 'tagPage',
      seoUrl: '/tag',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Tag information page',
      pageType: 'tagPaginationPage',
      seoUrl: '/tag/{tagUrl}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Search',
      pageType: 'searchPage',
      seoUrl: '/search',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: '404',
      pageType: 'pageNotFoundPage',
      seoUrl: '/404',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        2,
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Custom page',
      pageType: 'customPage',
      seoUrl: '/page/{url}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        2,
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Thank-you page',
      pageType: 'thanksPage',
      seoUrl: '/thanks',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        2,
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Service expired page',
      pageType: 'outOfServicePage',
      seoUrl: '/out-of-service',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        2,
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Legal terms page',
      pageType: 'legalPage',
      seoUrl: '/legal/{code}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        2,
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Authentication',
      pageType: 'passportPage',
      seoUrl: '/passport',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        2,
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Change password',
      pageType: 'changePasswordPage',
      seoUrl: '/passport/change-password',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        2,
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Reset password',
      pageType: 'resetPasswordPage',
      seoUrl: '/passport/reset-password',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        2,
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Cart',
      pageType: 'shoppingCartPage',
      seoUrl: '/cart',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Checkout',
      pageType: 'checkoutPage',
      seoUrl: '/checkout',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Payment',
      pageType: 'cashierPage',
      seoUrl: '/cashier',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Payment result',
      pageType: 'paymentResultPage',
      seoUrl: '/payment/{id}/{status}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Account – home',
      pageType: 'mineOverviewPage',
      seoUrl: '/mine/overview',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Account – orders',
      pageType: 'mineOrderPage',
      seoUrl: '/mine/orders',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      menuVisible: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Account – order details',
      pageType: 'mineOrderDetailPage',
      seoUrl: '/mine/orders/item/{id}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Account – enquiries',
      pageType: 'mineInquiryPage',
      seoUrl: '/mine/inquiry',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      siteType: [
        2,
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Account – enquiry details',
      pageType: 'mineInquiryDetailPage',
      seoUrl: '/mine/inquiry/item/{id}',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      siteType: [
        2,
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Account – reviews',
      pageType: 'mineCommentPage',
      seoUrl: '/mine/comment',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Account – favorites',
      pageType: 'mineCollectPage',
      seoUrl: '/mine/collect',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0
    },
    {
      title: 'Account – coupons',
      pageType: 'mineCouponPage',
      seoUrl: '/mine/coupon',
      addSection: 0,
      bindSection: 0,
      hasFloatMenu: 0,
      hasFooter: 0,
      hasHeader: 0,
      siteType: [
        3,
        4
      ],
      dynamic: 0
    }
  ],
  globalSection: [
    {
      title: 'Website header',
      sectionType: 'header',
      sectionGroup: 2000,
      icon: '<svg t="1625644302660" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21364"><path d="M893.3960565 471.27278826H145.65042881v-209.36877569h747.74562769v209.36877569zM310.1544667 763.72607303V680.64156396h83.09946409v83.08450909H310.1544667z m333.99304722 2e-8V680.64156396h83.0994641v83.08450909H644.14751392z m-86.38954473 0H474.65850511V680.64156396h83.09946408v83.08450909z m333.99304722-232.63363474V614.1919024H808.65155232V531.09243833h83.0994641z m-83.09946409 149.54912565h83.09946409V763.74102802H808.65155232V680.64156396z m-579.90165942-149.54912565V614.1919024H145.65042881V531.09243833h83.09946409zM145.65042881 680.64156396h83.09946409V763.74102802H145.65042881V680.64156396z" p-id="21365"></path></svg>'
    },
    {
      title: 'Website footer',
      sectionType: 'footer',
      sectionGroup: 2000,
      icon: '<svg t="1625644315079" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21491"><path d="M130.6039435 552.72721174L878.34957119 552.72721174l0 209.36877569-747.74562769 0 0-209.36877569zM713.8455333 260.27392697L713.84553329 343.35843604l-83.09946408 0 0-83.08450909L713.84553329 260.27392695z m-333.99304721-2e-8L379.85248608 343.35843603l-83.0994641 1e-8 0-83.08450909L379.85248609 260.27392695z m86.38954472 0L549.34149489 260.27392695 549.34149489 343.35843604l-83.09946408 0 0-83.08450909z m-333.99304722 232.63363474L132.24898358 409.8080976 215.34844768 409.80809761 215.34844768 492.90756167l-83.0994641 0z m83.09946409-149.54912565l-83.09946409 0L132.24898359 260.25897198 215.34844768 260.25897198 215.34844768 343.35843604z m579.90165942 149.54912565L795.2501071 409.8080976 878.34957119 409.8080976 878.34957119 492.90756167l-83.09946409 0zM878.34957119 343.35843604l-83.09946409 0L795.2501071 260.25897198 878.34957119 260.25897198 878.34957119 343.35843604z" p-id="21492"></path></svg>'
    },
    {
      title: 'Floating menu',
      sectionType: 'floatMenu',
      sectionGroup: 2000,
      icon: '<svg t="1625644279731" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21237"><path d="M552.727 893.396L552.727 145.65 762.096 145.65l0 747.746-209.369 0zM260.27399999 310.154l83.08400001 0 0 83.1-83.084 0-1e-8-83.1z m1e-8 333.994l83.084 0 0 83.099-83.084 0 0-83.1z m0-86.39l0-83.1 83.084 0 0 83.1-83.084 0z m232.634 333.993l-83.1 0 0-83.1 83.1 0 0 83.1z m-149.55-83.1l0 83.1-83.099 0 0-83.1 83.1 0zM492.90799999 228.75l-83.09999999 0 0-83.1 83.1 0-1e-8 83.1z m-149.54999999-83.1l0 83.1-83.099 0 0-83.1 83.1 0z" p-id="21238"></path></svg>'
    }
  ]
}
