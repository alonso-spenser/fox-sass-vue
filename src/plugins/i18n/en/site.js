export default {
  startup: {
    title: 'Get started',
    pageTitle: 'Create website',
    returnHome: 'Back to home',
    mySites: 'My websites',
    nextStep: 'Next',
    prevStep: 'Previous',
    create: 'Create website',
    chooseTemplate: 'Select template',
    siteTheme: 'Website template',
    all: 'All',
    preview: 'Preview',
    original: 'Set the initial address',
    empty: 'Select a template',
    selected: 'Select',
    skip: 'Skip',
    siteType: {
      heading: 'Select a website type',
      cod: {
        heading: 'Product landing page',
        subheading: 'Suitable for <b>single-product campaigns, such as cash on delivery (COD)</b>',
        tips: 'A landing page is generated for each product you add. You can edit these pages, and visitors can place orders directly from them.'
      },
      lp: {
        heading: 'B2B landing page',
        subheading: 'Suitable for <b>landing pages and enquiry generation</b>',
        tips: 'Create and edit multiple standalone pages. Visitors can submit registrations, enquiries, and other forms directly from these pages.'
      },
      b2b: {
        heading: 'B2B business website',
        subheading: 'Suitable for <b>company websites and enquiries</b>',
        tips: 'Create and customize your company website. Visitors can browse company information, products, and news, and submit enquiries.'
      },
      b2c: {
        heading: 'B2C online store',
        subheading: 'Suitable for <b>online sales</b>',
        tips: 'Reach customers anywhere in the world through online stores, transactions, social media, and personalized marketing.'
      }
    },
    initial: 'Blank theme',
    tips: [
      'The original address <label class="text-primary">cannot be changed</label> after the website is created. Choose it carefully.',
      'Customers can visit this address in their browser to view your website and pages',
      'You can connect your own domain later and set it as the primary domain'
    ],
    entity: {
      domain: {
        label: 'Website address',
        placeholder: 'Enter a website address',
        custom: 'Website address is required',
        required: 'Use 4–32 letters, numbers, or hyphens for the website address',
        async: 'This website address is already in use. Choose another.'
      },
      siteName: {
        label: 'Website name',
        placeholder: 'Enter a website name',
        required: 'Website name is required',
        custom: ''
      },
      langCode: {
        label: 'Default language',
        placeholder: 'Select a default language',
        required: 'Default language is required',
        custom: ''
      }
    },
    success: 'Your request is being processed and should finish within 5 minutes. Check back shortly.',
    clone: {
      pageTitle: 'Duplicate website',
      source: 'Source website',
      tips: 'Copy all settings from the website above to create a new website',
      siteName: 'Website name',
      siteDomain: 'Website domain',
      siteType: 'Website type',
      submit: 'Duplicate website',
      error: 'Source website information not found',
      success: 'The website is being copied and should be ready within 5 minutes. Check back shortly.'
    }
  },
  siteAside: {
    menu: {
      home: 'Home',
      enquiry: 'Enquiry management',
      ranking: 'Rank tracking',
      'site-dashboard': 'Website data',
      'site-product-root': 'Product',
      'site-product': 'All products',
      'site-product-collection': 'Product collections',
      'site-article-root': 'Article',
      'site-article': 'All articles',
      'site-tag': 'TAG',
      'site-article-collection': 'Article collections',
      'site-customer': 'Customers',
      'site-setting-root': 'Website settings',
      'site-theme': 'Theme',
      'site-settings': 'General',
      'site-legal': 'Legal policies',
      'site-navigation': 'Navigation menus',
      'site-domain': 'Domain connections',
      'site-pages': 'Custom pages',
      'site-tracking': 'Tracking & analytics',
      'site-enquiry': 'My enquiries',
      'enquiry-form': 'Enquiry forms',
      'enquiry-email': 'Enquiry emails',
      'site-seo': 'Page SEO',
      'site-down-root': 'Download',
      'site-content': 'Content',
      'site-down': 'All downloads',
      'site-down-collection': 'Download collections',
      'site-order': 'Orders',
      plugs: 'App marketplace',
      seo_plug: 'SEO API'
    },
    aside: {
      builder: 'Website settings',
      mainMenu: 'Main menu',
      admin: 'Manage website',
      mySites: 'My websites',
      tips: 'Click here to publish changes to products, articles, downloads, forms, layouts, or other website content. Avoid clicking repeatedly.'
    }
  },
  siteStatus: {
    0: 'Enable',
    1: 'Disable',
    2: 'Frozen'
  },
  siteType: {
    1: 'Product landing page',
    2: 'Business landing page',
    3: 'Business website',
    4: 'Online store',
    11: 'Video B2B',
    12: 'Video B2C'
  },
  site: {
    title: 'Website management',
    pass: {
      title: 'Download password',
      setPass: 'Set download password >',
      content: 'The shared download password protects product, article, and other attachments marked as requiring a password',
      downPass: {
        label: 'Download password',
        tips: '',
        placeholder: 'Download password',
        required: 'Use a combination of letters and numbers',
        custom: '4–10 letters and numbers'
      }
    },
    dashboard: {
      title: 'My websites',
      createNew: 'Add website',
      editButton: 'Manage website',
      subscription: 'Renew',
      clone: 'Duplicate website',
      expired: 'Expired',
      trial: {
        label: 'Extend trial',
        tips: 'Unpaid websites can extend their trial up to 5 times, for 7 days each time. Repeated clicks do not add more days, but each click uses one extension. Do not click repeatedly.',
        keep: 'You can have only one trial website at a time. Upgrade it to a paid plan before creating another trial website.'
      },
      remove: {
        label: 'Delete website',
        tips: 'Deleting this website permanently removes all products, articles, forms, designs, and other data. This cannot be undone. Continue?'
      },
      paging: {
        administrationButton: 'Manage website',
        addButton: 'Add website',
        addLanguage: 'Add language',
        endTime: 'Expires at',
        onLineTime: 'Published at',
        setSite: 'Design website'
      },
      statistics: {
        languageType: 'Language versions',
        products: 'Product count',
        articles: 'Article count',
        inquiry: 'Enquiries',
        online: 'Online',
        usable: 'Usable'
      },
      tableHeader: {
        languageName: 'Language name',
        nativeName: 'Native language',
        onlineTime: 'Published at',
        state: 'Status'
      },
      state: {
        stop: 'Disable',
        enable: 'Enable'
      },
      language: {
        heading: 'Notice',
        translate: 'Translate and save',
        clone: 'Copy data only',
        tips: 'Translations are generated automatically. For greater accuracy, edit the content on the target language website. Related data is synced only if the product does not already exist; existing data is not overwritten.'
      }
    },
    resource: {
      paging: {
        title: 'Downloads',
        heading: '',
        subheading: '',
        addCollection: 'Add collection',
        addButton: 'Add download resource',
        empty: {
          content: 'Download resources you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add download resource'
        },
        tableHeader: {
          coverImage: 'Cover image',
          createTime: 'Uploaded at',
          title: 'File name',
          url: 'File URL',
          visit: 'View file',
          suffix: 'File extension'
        }
      },
      update: {
        addTitle: 'Add download',
        updateTitle: 'Edit download',
        entity: {
          coverImage: {
            label: 'Cover image',
            tips: '',
            placeholder: 'Cover image',
            required: 'Enter a cover image',
            custom: ''
          },
          title: {
            label: 'File name',
            tips: '',
            placeholder: 'File name',
            required: 'Enter a file name',
            custom: ''
          },
          url: {
            label: 'File URL',
            tips: '',
            placeholder: 'File URL',
            required: 'Enter a file URL',
            custom: ''
          },
          description: {
            label: 'Brief introduction',
            tips: '',
            placeholder: 'Brief introduction',
            required: 'Enter a brief introduction',
            custom: ''
          }
        }
      }
    },
    down: {
      fileUpload: {
        label: 'Downloads',
        remove: 'Remove',
        placeholder: 'Upload file',
        maxSize: 'Maximum file size: {size} MB',
        drag: 'Drop files here, or',
        fileName: 'File name',
        content: 'Resource description'
      },
      update: {
        collection: {
          label: 'Download collections',
          placeholder: 'Enter a collection name',
          exist: 'This collection has already been added',
          add: 'Add collection',
          manage: 'Manage collections',
          loadingText: 'Loading',
          noMatchText: 'No matches found',
          noDataText: 'No data'
        }
      },
      multipleSelector: {
        heading: 'Add collection',
        subheading: 'Add the selected resources to the following collections',
        placeholder: 'Enter a collection name',
        loadingText: 'Loading',
        noMatchText: 'No matches found',
        noDataText: 'No data'
      }
    },
    theme: {
      current: {
        heading: 'Default theme',
        subheading: 'Visitors currently see this theme on your website'
      },
      design: 'Design page',
      preview: 'View website',
      active: 'In use',
      edit: 'Content management',
      get: 'Add theme',
      owned: {
        heading: 'My themes',
        subheading: 'Manage all themes for this website. Add or edit themes, then publish one as the active theme.'
      },
      publish: {
        title: 'Publish website',
        content: 'Publishing makes all unpublished changes visible to visitors. Publish now?',
        success: 'Published successfully'
      },
      rename: {
        title: 'Rename',
        content: "Change this theme's name. Visitors will not see it.",
        placeholder: 'Enter a theme name',
        error: 'Theme names must not exceed 32 characters'
      },
      duplicate: {
        title: 'Duplicate theme',
        content: "Copy this theme's content to create a new theme"
      },
      paging: {
        title: 'Theme',
        empty: {
          content: 'Website themes you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add website theme'
        },
        tableHeader: {
          name: 'Theme name',
          state: 'Default',
          version: 'Version'
        }
      }
    },
    lang: {
      title: 'Website languages'
    },
    statement: {
      title: 'Reports'
    },
    cloudflare: {
      title: 'Cloudflare configuration',
      add: 'Add Cloudflare configuration',
      edit: 'Edit Cloudflare configuration',
      addTitle: 'Add Cloudflare configuration',
      updateTitle: 'Edit Cloudflare configuration',
      empty: {
        content: 'Cloudflare configurations you add will appear here. You can edit, delete, and manage them in bulk.',
        buttonLabel: 'Add Cloudflare configuration'
      },
      tableHeader: {
        accountId: 'Cloudflare account ID',
        domain: 'Domain',
        email: 'Cloudflare account email',
        globalApiKey: 'Global API Key',
        siteId: 'Website ID',
        state: 'State',
        updateTime: 'Modified at',
        zoneId: 'Cloudflare Zone ID'
      },
      entity: {
        accountId: {
          label: 'Cloudflare account ID',
          tips: '',
          placeholder: 'Cloudflare account ID',
          required: 'Enter a Cloudflare account ID',
          custom: ''
        },
        domain: {
          label: 'Domain',
          tips: '',
          placeholder: 'Domain',
          required: 'Enter a domain',
          custom: ''
        },
        email: {
          label: 'Cloudflare account email',
          tips: '',
          placeholder: 'Cloudflare account email',
          required: 'Enter a Cloudflare account email',
          custom: ''
        },
        globalApiKey: {
          label: 'Global API Key',
          tips: '',
          placeholder: 'Global API Key',
          required: 'Please enter Global API Key',
          custom: ''
        },
        siteId: {
          label: 'Website ID',
          tips: '',
          placeholder: 'Website ID',
          required: 'Enter a website ID',
          custom: ''
        },
        state: {
          label: 'State',
          tips: '',
          placeholder: 'State',
          required: 'Please enter State',
          custom: ''
        },
        updateTime: {
          label: 'Modified at',
          tips: '',
          placeholder: 'Modified at',
          required: 'Enter a modification time',
          custom: ''
        },
        zoneId: {
          label: 'Cloudflare Zone ID',
          tips: '',
          placeholder: 'Cloudflare Zone ID',
          required: 'Please enter Cloudflare Zone ID',
          custom: ''
        }
      }
    }
  },
  resourceSelector: {
    heading: 'Resource picker',
    lib: 'Image library',
    infoType: {
      article: 'Article',
      goods: 'Product',
      design: 'Resources'
    }
  }
}
