export default {
  navigation: {
    aside: 'Navigation menus',
    async: 'Sync menus',
    asyncTips: 'Request submitted. The system will process it automatically.',
    menuType: [
      {
        value: 1,
        title: 'Header menu',
        limit: 4,
        subheading: 'Set up the header navigation. Drag to reorder items or change nesting (up to 3 levels).',
        describe: 'Global menu displayed in the website header'
      },
      {
        value: 2,
        limit: 1,
        title: 'Footer menu 1',
        subheading: 'Set up the footer navigation. Drag to reorder items.',
        describe: 'Global menu displayed in the website footer'
      },
      {
        value: 8,
        title: 'Footer menu 2',
        limit: 1,
        subheading: 'Set up the footer navigation. Drag to reorder items.',
        describe: 'Global menu displayed in the website footer'
      },
      {
        value: 9,
        limit: 1,
        title: 'Footer menu 3',
        subheading: 'Set up the footer navigation. Drag to reorder items.',
        describe: 'Global menu displayed in the website footer'
      },
      {
        value: 3,
        limit: 3,
        title: 'Product listing sidebar menu',
        subheading: 'Set up the product listing sidebar menu. Drag to reorder items (up to 3 levels).',
        describe: 'Global menu displayed on product collection detail pages (product listings)'
      },
      {
        value: 4,
        limit: 3,
        title: 'Article listing sidebar menu',
        subheading: 'Set up the article listing sidebar menu. Drag to reorder items (up to 3 levels).',
        describe: 'Global menu displayed on article collection detail pages (article listings)'
      }
    ],
    paging: {
      title: 'Website navigation',
      tableHeader: {
        title: 'Menu name',
        describe: 'Description'
      }
    },
    update: {
      pageTitle: 'Website navigation',
      heading: '',
      subheading: '',
      add: 'Add menu',
      tableHeader: {
        level: 'Menu level',
        link: 'Link URL',
        navType: 'Navigation type: 1 for header, 2 for footer',
        parentId: 'Parent code',
        refId: 'Linked data ID',
        refType: 'Linked data type',
        siteId: 'Website code',
        sort: 'Menu sort order',
        templateId: 'Template ID',
        title: 'Navigation name'
      },
      header: {
        heading: 'Header navigation',
        subheading: 'Set up the header navigation. Drag to reorder items or change nesting.'
      },
      footer: {
        heading: 'Footer navigation',
        subheading: 'Set up the footer navigation. Drag to reorder items (nested menus are not supported).'
      },
      dialog: {
        heading: 'Edit menu'
      },
      entity: {
        title: {
          label: 'Navigation name',
          tips: '',
          placeholder: 'Navigation name',
          required: 'Enter a navigation name',
          custom: ''
        },
        link: {
          label: 'Link URL',
          tips: '',
          placeholder: 'Link URL',
          required: 'Enter a link URL',
          custom: ''
        },
        target: {
          label: 'Open in',
          tips: '',
          placeholder: 'Link target',
          required: '',
          custom: ''
        },
        avatar: {
          label: 'Promotional image',
          tips: '',
          placeholder: '',
          required: '',
          custom: ''
        }
      }
    },
    navigationUpdate: {
      paging: {
        title: 'Navigation menus'
      },
      target: {
        _blank: 'New window',
        _self: 'Current window'
      },
      linkPicker: {
        placeholder: 'Search or paste a link',
        records: 'records',
        menu: {
          2: [
            {
              label: 'Home',
              id: 0,
              sub: false
            },
            {
              label: 'Form',
              id: 6,
              sub: true
            },
            {
              label: 'Legal policies',
              id: 8,
              sub: true
            },
            {
              label: 'No link',
              id: 99,
              sub: false
            }
          ],
          3: [
            {
              label: 'Home',
              id: 0,
              sub: false
            },
            {
              label: 'Product',
              id: 1,
              sub: true,
              all: {
                title: 'All products',
                url: '/products#All products'
              }
            },
            {
              label: 'Product collections',
              id: 2,
              sub: true,
              all: {
                title: 'All product collections',
                url: '/products/collection#All product collections'
              }
            },
            {
              label: 'Article',
              id: 3,
              sub: true,
              all: {
                title: 'All articles',
                url: '/articles#All articles'
              }
            },
            {
              label: 'Article collections',
              id: 4,
              sub: true,
              all: {
                title: 'All article collections',
                url: '/articles/collection#All article collections'
              }
            },
            {
              label: 'Custom page',
              id: 5,
              sub: true
            },
            {
              label: 'Form',
              id: 6,
              sub: true
            },
            {
              label: 'Download collections',
              id: 7,
              sub: true
            },
            {
              label: 'Legal policies',
              id: 8,
              sub: true
            },
            {
              label: 'No link',
              id: 99,
              sub: false
            }
          ],
          4: [
            {
              label: 'Home',
              id: 0,
              sub: false
            },
            {
              label: 'Product',
              id: 1,
              sub: true,
              all: {
                title: 'All products',
                url: '/products#All products'
              }
            },
            {
              label: 'Product collections',
              id: 2,
              sub: true,
              all: {
                title: 'All product collections',
                url: '/products/collection#All product collections'
              }
            },
            {
              label: 'Article',
              id: 3,
              sub: true,
              all: {
                title: 'All articles',
                url: '/articles#All articles'
              }
            },
            {
              label: 'Article collections',
              id: 4,
              sub: true,
              all: {
                title: 'All article collections',
                url: '/articles/collection#All article collections'
              }
            },
            {
              label: 'Custom page',
              id: 5,
              sub: true
            },
            {
              label: 'Form',
              id: 6,
              sub: true
            },
            {
              label: 'Download collections',
              id: 7,
              sub: true
            },
            {
              label: 'Legal policies',
              id: 8,
              sub: true
            },
            {
              label: 'No link',
              id: 99,
              sub: false
            }
          ]
        }
      }
    },
    errorCode: {
      1507002: 'Delete the child sections first'
    }
  }
}
