export default {
  sorting: {
    title: 'Organize',
    conditions: {
      timeDesc: 'Created, newest first'
    }
  },
  infoType: {
    1: 'Article',
    2: 'Product',
    3: 'Download'
  },
  conditionSizer: [
    {
      field: 'art.title',
      fieldLabel: '{label} name',
      type: 'String',
      conditions: [
        {
          operateLabel: 'Equals',
          operate: '='
        },
        {
          operateLabel: 'Does not equal',
          operate: '!='
        },
        {
          operateLabel: 'Contains',
          operate: 'LIKE'
        },
        {
          operateLabel: 'Does not contain',
          operate: 'NOT LIKE'
        }
      ]
    },
    {
      field: 'tag.tag_name',
      fieldLabel: '{label} tags',
      type: 'String',
      conditions: [
        {
          operateLabel: 'Equals',
          operate: '='
        }
      ]
    },
    {
      field: 'art.summary',
      fieldLabel: '{label} summary',
      type: 'String',
      conditions: [
        {
          operateLabel: 'Equals',
          operate: '='
        },
        {
          operateLabel: 'Does not equal',
          operate: '!='
        },
        {
          operateLabel: 'Contains',
          operate: 'LIKE'
        },
        {
          operateLabel: 'Does not contain',
          operate: 'NOT LIKE'
        }
      ]
    }
  ],
  tagsManager: {
    article: {
      heading: 'Manage article tags',
      subheading: 'All article tags are listed below. Deleting a tag from this library also removes it from any articles that use it.'
    },
    product: {
      heading: 'Manage product tags',
      subheading: 'All product tags are listed below. Deleting a tag from this library also removes it from any products that use it.'
    }
  },
  orderBy: {
    updateTimeASC: 'Modified, oldest first',
    updateTimeDESC: 'Modified, newest first',
    createTimeASC: 'Created, oldest first',
    createTimeDESC: 'Created, newest first',
    initialASC: 'Name, A–Z',
    initialDESC: 'Name, Z–A'
  },
  collectionSelector: {
    heading: 'Manage collections',
    loadingText: 'Loading',
    noMatchText: 'No matches found',
    noDataText: 'No data',
    remove: 'Remove from collections',
    join: 'Add to collections',
    tips: 'For the selected',
    item: 'items'
  },
  tagSelect: {
    manage: 'Manage tags',
    goods: {
      title: 'Product tags',
      label: 'Product',
      add: 'Add product'
    },
    article: {
      title: 'Article tags',
      label: 'Article',
      add: 'Add article'
    },
    download: {
      title: 'Download tags',
      label: 'Download',
      add: 'Add file'
    }
  },
  tagsMultipleSelector: {
    heading: 'Tag management',
    loadingText: 'Loading',
    noMatchText: 'No matches found',
    noDataText: 'No data',
    remove: 'Remove tags',
    join: 'Add tags',
    tips: 'For the selected',
    item: 'items'
  },
  article: {
    translate: {
      action: 'Translate',
      clone: 'Duplicate',
      label: 'Languages'
    },
    orderBy: {
      updateTimeASC: 'Modified, oldest first',
      updateTimeDESC: 'Modified, newest first',
      createTimeASC: 'Created, oldest first',
      createTimeDESC: 'Created, newest first',
      initialASC: 'Name, A–Z',
      initialDESC: 'Name, Z–A',
      sortDesc: 'Sequence number, descending'
    },
    searchType: {
      name: 'Article name',
      collection: 'Article collections',
      tag: 'Article tags'
    },
    paging: {
      title: 'All articles',
      heading: '',
      subheading: '',
      add: 'Add article',
      actions: {
        disable: 'Disable',
        enable: 'Enable',
        addCollection: 'Add to / remove from collections',
        addTag: 'Add / remove tags',
        sticky: 'Pin to top',
        cancelSticky: 'Unpin',
        clone: {
          button: 'Duplicate article',
          tips: 'Are you sure you want to duplicate the {0} selected articles?'
        }
      },
      empty: {
        content: 'Articles you add will appear here. You can edit, delete, and manage them in bulk.',
        buttonLabel: 'Add article'
      },
      tableHeader: {
        comments: 'Comments',
        coverImage: 'Cover image',
        coverVideo: 'Video URL',
        createTime: 'Created at',
        description: 'Article content',
        hits: 'Views',
        seoUrl: 'URL',
        sortIndex: 'Sort by',
        state: 'Status',
        sticky: 'Pin to top',
        title: 'Title',
        updateTime: 'Updated at',
        visibilityTime: 'Published at'
      },
      description: ''
    },
    update: {
      addTitle: 'Add article',
      updateTitle: 'Edit article',
      attribute: {
        heading: 'Additional attributes',
        desc: 'Add more product information, such as detailed specifications, applications, and shipping.',
        title: {
          label: 'Attribute title',
          placeholder: 'Attribute title',
          required: 'Enter an attribute title',
          custom: ''
        },
        content: {
          label: 'Attribute content',
          placeholder: 'Attribute content',
          required: 'Enter attribute content',
          custom: ''
        }
      },
      entity: {
        subtitle: {
          label: 'Subtitle',
          tips: 'Displayed in page listings',
          placeholder: 'Subtitle',
          required: 'Enter a subtitle',
          custom: ''
        },
        summary: {
          label: 'Summary',
          tips: 'Displayed on the article detail page',
          placeholder: 'Summary',
          required: 'Enter a summary',
          custom: ''
        },
        author: {
          label: 'Author',
          tips: '',
          placeholder: 'Author',
          required: 'Enter an author',
          custom: ''
        },
        coverImage: {
          label: 'Image',
          tips: '',
          placeholder: 'Image',
          required: 'Upload an image',
          custom: ''
        },
        coverVideo: {
          label: 'Video URL',
          tips: '',
          placeholder: 'Video URL',
          required: 'Enter a video URL',
          custom: ''
        },
        createTime: {
          label: 'Created at',
          tips: '',
          placeholder: 'Created at',
          required: 'Enter the creation time',
          custom: ''
        },
        description: {
          label: 'Article content',
          tips: '',
          placeholder: 'Article content',
          required: 'Enter article content',
          custom: ''
        },
        initial: {
          label: 'Initial letter',
          tips: '',
          placeholder: 'Initial letter',
          required: 'Enter the initial letter',
          custom: ''
        },
        source: {
          label: 'Source',
          tips: '',
          placeholder: 'Source',
          required: 'Enter a source',
          custom: ''
        },
        specification: {
          label: 'Specifications',
          tips: '',
          placeholder: 'Specifications',
          required: 'Enter specifications',
          custom: ''
        },
        title: {
          label: 'Title',
          tips: '',
          placeholder: 'Title',
          required: 'Enter a title',
          custom: ''
        },
        visibilityTime: {
          label: 'Published at',
          tips: '',
          placeholder: 'Published at',
          required: 'Enter the publication time',
          custom: ''
        }
      },
      collection: {
        label: 'Article collections',
        placeholder: 'Enter a collection name',
        exist: 'This collection has already been added',
        add: 'Add collection',
        manage: 'Manage collections',
        loadingText: 'Loading',
        noMatchText: 'No matches found',
        noDataText: 'No data'
      },
      tags: {
        label: 'Article tags',
        placeholder: 'Enter a tag name',
        exist: 'This tag has already been added',
        add: 'Add tags',
        manage: 'Manage tags',
        loadingText: 'Loading',
        noMatchText: 'No matches found',
        noDataText: 'No data'
      }
    },
    collection: {
      all: 'All collections',
      goods: {
        title: 'Product collections',
        label: 'Product',
        add: 'Add product'
      },
      article: {
        title: 'Article collections',
        label: 'Article',
        add: 'Add article'
      },
      download: {
        title: 'Download collections',
        label: 'Download',
        add: 'Add file'
      },
      paging: {
        title: 'Article collections',
        heading: '',
        subheading: '',
        add: 'Add article collection',
        actions: {
          disable: 'Disable',
          enable: 'Enable'
        },
        empty: {
          content: 'Article collections you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add article collection'
        },
        tableHeader: {
          banner: 'Banner image',
          collectionType: 'Type',
          coverImage: 'Cover image',
          refCount: 'References',
          state: 'Status',
          title: 'Title',
          updateTime: 'Updated at'
        }
      },
      update: {
        addTitle: 'Add collection',
        updateTitle: 'Edit collection',
        selectArticle: 'Select articles',
        entity: {
          banner: {
            label: 'Banner image',
            tips: '',
            placeholder: 'Banner image',
            required: 'Enter a banner image',
            custom: ''
          },
          coverImage: {
            label: 'Cover image',
            tips: '',
            placeholder: 'Cover image',
            required: 'Enter a cover image',
            custom: ''
          },
          coverVideo: {
            label: 'Video URL',
            tips: '',
            placeholder: 'Video URL',
            required: 'Enter a video URL',
            custom: ''
          },
          description: {
            label: 'Description',
            tips: '',
            placeholder: 'Description',
            required: 'Enter a description',
            custom: ''
          },
          accessPassword: {
            label: 'Access password',
            tips: '',
            placeholder: 'Access password',
            required: 'Enter an access password',
            custom: ''
          },
          title: {
            label: 'Collection name',
            tips: '',
            placeholder: 'Collection name',
            required: 'Enter a collection name',
            custom: ''
          }
        }
      }
    },
    conditionFilter: {
      collectionType: {
        label: 'Collection type',
        tips: 'The collection type cannot be changed after creation.',
        manual: {
          label: 'Manual',
          article: 'Add articles to this collection manually',
          goods: 'Add products to this collection manually',
          download: 'Add download files to this collection manually'
        },
        auto: {
          label: 'Automatic',
          article: 'Articles matching the rules will be added to this collection automatically',
          goods: 'Products matching the rules will be added to this collection automatically',
          download: 'Download files matching the rules will be added to this collection automatically'
        }
      },
      productType: {
        label: 'Collection type',
        tips: 'The collection type cannot be changed after creation.',
        manual: {
          label: 'Manual',
          tips: 'Add products to this collection manually'
        },
        auto: {
          label: 'Automatic',
          tips: 'Products matching the rules will be added to this collection automatically'
        }
      },
      rule: {
        label: 'Rules',
        one: {
          label: 'Match any condition'
        },
        all: {
          label: 'Match all conditions'
        }
      }
    },
    tag: {
      paging: {
        title: 'Tags',
        heading: '',
        subheading: '',
        add: 'Add tags',
        empty: {
          content: 'Tags you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add tags'
        },
        tableHeader: {
          tagName: 'Tag name'
        }
      },
      update: {
        addTitle: 'Add tags',
        updateTitle: 'Edit tag',
        entity: {
          sortIndex: {
            label: 'Sort by',
            tips: '',
            placeholder: 'Sort by',
            required: 'Enter a sort order',
            custom: ''
          },
          tagName: {
            label: 'Tag name',
            tips: '',
            placeholder: 'Tag name',
            required: 'Enter a tag name',
            custom: ''
          },
          tagUrl: {
            label: 'Custom URL',
            tips: '',
            placeholder: 'Custom URL',
            required: 'Enter a custom URL',
            custom: ''
          }
        }
      }
    }
  }
}
