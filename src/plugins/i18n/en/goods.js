export default {
  variant: {
    heading: 'Product variants',
    subheading: 'Add variants if this product comes in different versions, such as colors or sizes',
    entity: {
      value: {
        label: 'Attribute value',
        placeholder: 'Enter an attribute value',
        required: 'Attribute value is required'
      },
      name: {
        label: 'Attribute',
        placeholder: 'Enter an attribute',
        required: 'Attribute is required'
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
    attrKey: 'Attribute name',
    attrValue: 'Attribute value',
    tips: 'Create the selected product variants below',
    sku: 'SKU code',
    skuContent: 'Enter an SKU code',
    quickSelect: 'Quick select',
    button: {
      addKey: 'Add attribute',
      addValue: 'Add value',
      single: {
        label: 'Single product',
        english: {
          label: 'English version',
          key: 'Default',
          value: 'Default'
        },
        chinese: {
          label: 'Chinese version',
          key: 'Default',
          value: 'Default'
        }
      }
    },
    batch: {
      title: 'Bulk actions',
      image: 'SKU image',
      params: 'Price & specifications',
      remove: 'Delete SKU'
    },
    edit: {
      heading: 'Edit attributes'
    },
    avatar: {
      heading: 'Update product images',
      remove: 'Remove image'
    },
    update: {
      sort: 'Reorder',
      edit: 'Edit attributes',
      add: 'Add & edit specifications'
    }
  },
  specSelector: {
    heading: 'Specifications',
    subheading: 'Add a specification table for visitors to this product page',
    paste: 'Paste specifications',
    tips: 'Array containing 3 parameters',
    button: {
      title: 'Add heading',
      item: 'Add item',
      clear: 'Clear'
    },
    entity: {
      key: {
        placeholder: 'Attribute name'
      },
      value: {
        placeholder: 'Attribute value'
      },
      title: {
        placeholder: 'Title'
      }
    }
  },
  specPresetSave: {
    dropdown: {
      label: 'Presets',
      save: 'Save as preset',
      select: 'Select preset',
      digit: 'Convert fields',
      manage: 'Manage presets'
    },
    product: {
      heading: 'Save as preset',
      subheading: 'Save these specifications as a preset to reuse the table format and content when editing other products'
    },
    entity: {
      title: {
        label: 'Preset name',
        placeholder: 'Enter a preset name',
        required: 'Preset name is required',
        description: ''
      },
      isDefault: {
        label: 'Set as default preset',
        placeholder: '',
        required: '',
        description: 'New products will use the default specification preset'
      }
    }
  },
  specPresetSelect: {
    heading: 'Select preset',
    subheading: 'Select a preset to apply to this product'
  },
  specPresetManage: {
    heading: 'Manage presets',
    subheading: 'You can edit or delete presets and change the default preset',
    title: {
      label: 'Preset name',
      placeholder: 'Enter a preset name',
      required: 'Preset name is required',
      description: ''
    },
    tableHeader: {
      title: 'Preset name',
      isDefault: 'Default'
    }
  },
  buyButton: {
    title: 'Purchase buttons',
    subheading: 'This purchase button will appear on the product detail page',
    buttonLabel: {
      label: 'Button name',
      tips: '',
      placeholder: 'For example: Amazon, Alibaba, Buy now',
      required: 'Enter a button name',
      custom: ''
    },
    buttonLink: {
      label: 'Link URL',
      tips: '',
      placeholder: 'Enter a link URL',
      required: 'Enter a button link',
      custom: 'Enter a valid URL'
    }
  },
  ladderPrice: {
    button: 'Edit price',
    heading: 'Edit tiered pricing',
    subheading: 'The combined quantity of all SKUs purchased for the same product determines the applicable price tier',
    step: 'Tier',
    add: 'Add price tier',
    piece: 'pieces',
    entity: {
      price: {
        label: 'Price',
        placeholder: 'Sale price',
        required: 'Enter a sale price',
        custom: 'Enter a valid sale price'
      }
    }
  },
  goods: {
    variant: {
      title: 'Product details',
      updateTitle: 'Edit variant',
      add: 'Add variant',
      delete: 'Delete variant',
      edit: 'Edit product variant'
    },
    shelves: {
      on: 'Publish',
      off: 'Unpublish'
    },
    addition: {
      currency: '￥',
      shelfLife: 'months'
    },
    priceType: {
      0: 'No price displayed',
      1: 'Standard pricing',
      2: 'Tiered pricing'
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
      name: 'Product name',
      collection: 'Product collections',
      tag: 'Product tags'
    },
    paging: {
      title: 'All products',
      heading: '',
      subheading: '',
      add: 'Add product',
      actions: {
        disable: 'Disable',
        enable: 'Enable',
        addCollection: 'Add to / remove from collections',
        addTag: 'Add / remove tags',
        sticky: 'Pin to top',
        cancelSticky: 'Unpin',
        clone: {
          button: 'Duplicate product',
          tips: 'Are you sure you want to duplicate the {0} selected products?'
        }
      },
      empty: {
        content: 'Products you add will appear here. You can edit, delete, and manage them in bulk.',
        buttonLabel: 'Add product'
      },
      tableHeader: {
        comments: 'Comments',
        coverImage: 'Image',
        coverVideo: 'Video URL',
        createTime: 'Created at',
        hits: 'Views',
        seoUrl: 'URL',
        minPrice: 'Sale price',
        sortIndex: 'Sort by',
        state: 'Status',
        sticky: 'Pin to top',
        sales: 'Units sold',
        skuCount: 'SKU',
        title: 'Title',
        updateTime: 'Updated at',
        visibilityTime: 'Published at'
      }
    },
    update: {
      addTitle: 'Add product',
      updateTitle: 'Edit product',
      info: 'Basic information',
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
      attachment: 'Attachments',
      pricePlan: 'Pricing method',
      entity: {
        barcode: {
          label: 'Barcode',
          tips: '',
          placeholder: 'Barcode',
          required: 'Enter a barcode',
          custom: ''
        },
        hsCode: {
          label: 'HS code',
          tips: '',
          placeholder: 'HS code',
          required: 'Enter an HS code',
          custom: ''
        },
        skuId: {
          label: 'SKU ID',
          tips: '',
          placeholder: 'SKU ID',
          required: 'Enter an SKU ID',
          custom: ''
        },
        skuImage: {
          label: 'Image',
          tips: '',
          placeholder: 'Image',
          required: 'Enter an image',
          custom: ''
        },
        skuName: {
          label: 'Name',
          tips: '',
          placeholder: 'Name',
          required: 'Enter a name',
          custom: ''
        },
        surplusStock: {
          label: 'Stock',
          tips: '',
          placeholder: 'Stock',
          required: 'Enter stock quantity',
          custom: 'Stock quantity must be greater than 0'
        },
        marketPrice: {
          label: 'Market price',
          tips: '',
          placeholder: 'Market price',
          required: 'Enter a market price',
          custom: 'Market price must be greater than 0'
        },
        salePrice: {
          label: 'Sale price',
          tips: '',
          placeholder: 'Sale price',
          required: 'Enter a sale price',
          custom: 'Sale price must be greater than 0'
        },
        shelfLife: {
          label: 'Shelf life',
          tips: '',
          placeholder: 'Shelf life',
          required: 'Enter the shelf life',
          custom: 'Shelf life must be greater than 0'
        },
        weight: {
          label: 'Weight',
          tips: '',
          placeholder: 'Weight',
          required: 'Enter a weight',
          custom: ''
        },
        width: {
          label: 'Width',
          tips: '',
          placeholder: 'Width',
          required: 'Enter a width',
          custom: 'Width must be greater than 0'
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
          label: 'Product details',
          tips: '',
          placeholder: 'Product details',
          required: 'Enter product details',
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
        subtitle: {
          label: 'Subtitle',
          tips: 'Displayed in page listings',
          placeholder: 'Subtitle',
          required: 'Enter a subtitle',
          custom: ''
        },
        summary: {
          label: 'Summary',
          tips: 'Displayed on the detail page',
          placeholder: 'Summary',
          required: 'Enter a summary',
          custom: ''
        },
        title: {
          label: 'Product name',
          tips: '',
          placeholder: 'Product name',
          required: 'Enter a product name',
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
        label: 'Product collections',
        placeholder: 'Enter a collection name',
        exist: 'This collection has already been added',
        add: 'Add collection',
        manage: 'Manage collections',
        loadingText: 'Loading',
        noMatchText: 'No matches found',
        noDataText: 'No data'
      },
      tags: {
        label: 'Product tags',
        placeholder: 'Enter a tag name',
        exist: 'This tag has already been added',
        add: 'Add tags',
        manage: 'Manage tags',
        loadingText: 'Loading',
        noMatchText: 'No matches found',
        noDataText: 'No data'
      },
      design: {
        title: 'Custom product details',
        design: 'Design details',
        save: 'Save design',
        content: 'Preview only. Refer to the page designer for the final appearance.',
        tips: 'Click Design details to customize your product introduction page'
      }
    },
    collection: {
      paging: {
        title: 'Product collections',
        heading: '',
        subheading: '',
        add: 'Add product collection',
        actions: {
          disable: 'Disable',
          enable: 'Enable'
        },
        empty: {
          content: 'Product collections you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add product collection'
        },
        tableHeader: {
          coverImage: 'Image',
          refCount: 'Product count',
          state: 'Status',
          title: 'Collection name',
          updateTime: 'Updated at'
        }
      },
      update: {
        addTitle: 'Add product collection',
        updateTitle: 'Edit product collection',
        selectArticle: 'Select products',
        dataHeading: 'Product',
        addToCollection: 'Add product',
        entity: {
          banner: {
            label: 'Banner image',
            tips: '',
            placeholder: 'Banner image',
            required: 'Enter a banner image',
            custom: ''
          },
          collectionType: {
            label: 'Collection type: 1 for manual, 2 for automatic',
            tips: '',
            placeholder: 'Collection type: 1 for manual, 2 for automatic',
            required: 'Enter a collection type: 1 for manual or 2 for automatic',
            custom: ''
          },
          conditionData: {
            label: 'Query conditions (JSON)',
            tips: '',
            placeholder: 'Query conditions (JSON)',
            required: 'Enter query conditions as JSON',
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
          createTime: {
            label: 'Created at',
            tips: '',
            placeholder: 'Created at',
            required: 'Enter the creation time',
            custom: ''
          },
          deleteFlag: {
            label: 'Deletion status',
            tips: '',
            placeholder: 'Deletion status',
            required: 'Enter a deletion status',
            custom: ''
          },
          description: {
            label: 'Description',
            tips: '',
            placeholder: 'Description',
            required: 'Enter a description',
            custom: ''
          },
          infoType: {
            label: 'Business type',
            tips: '',
            placeholder: 'Business type',
            required: 'Enter a business type',
            custom: ''
          },
          joinType: {
            label: 'Condition operator: 1 for OR, 2 for AND',
            tips: '',
            placeholder: 'Condition operator: 1 for OR, 2 for AND',
            required: 'Enter a condition operator: 1 for OR or 2 for AND',
            custom: ''
          },
          refCount: {
            label: 'Product count',
            tips: '',
            placeholder: 'Product count',
            required: 'Enter a product count',
            custom: ''
          },
          refId: {
            label: 'Reference ID',
            tips: '',
            placeholder: 'Reference ID',
            required: 'Enter a reference ID',
            custom: ''
          },
          region: {
            label: 'Language code',
            tips: '',
            placeholder: 'Language code',
            required: 'Enter a language code',
            custom: ''
          },
          seoDescription: {
            label: 'Meta description',
            tips: '',
            placeholder: 'Meta description',
            required: 'Enter a meta description',
            custom: ''
          },
          seoKeywords: {
            label: 'Meta keywords',
            tips: '',
            placeholder: 'Meta keywords',
            required: 'Enter meta keywords',
            custom: ''
          },
          seoTitle: {
            label: 'Page title',
            tips: '',
            placeholder: 'Page title',
            required: 'Enter a page title',
            custom: ''
          },
          seoUrl: {
            label: 'URL',
            tips: '',
            placeholder: 'URL',
            required: 'Enter a URL',
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
            label: '0: Enabled, 1: Disabled',
            tips: '',
            placeholder: '0: Enabled, 1: Disabled',
            required: 'Enter 0 to enable or 1 to disable',
            custom: ''
          },
          title: {
            label: 'Title',
            tips: '',
            placeholder: 'Title',
            required: 'Enter a title',
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
    conditionFilter: {
      collectionType: {
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
        title: 'Product tags',
        heading: '',
        subheading: '',
        add: 'Add product tag',
        empty: {
          content: 'Product tags you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add product tag'
        },
        tableHeader: {
          tagName: 'Tag name'
        }
      },
      update: {
        addTitle: 'Add product tag',
        updateTitle: 'Edit product tag',
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
    },
    sku: {
      paging: {
        title: 'Product SKUs',
        heading: '',
        subheading: '',
        empty: {
          content: 'Product SKUs you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add product SKU'
        },
        tableHeader: {
          barcode: 'Barcode',
          costPrice: 'Cost price',
          deleteFlag: 'Deletion flag',
          goodsPrice: 'Product price',
          height: 'Height',
          hsCode: 'HS code',
          length: 'Length',
          lockStock: 'Reserved stock',
          marketPrice: 'Market price',
          salePrice: 'Sale price',
          servicePrice: 'Service fee',
          shelfLife: 'Shelf life',
          skuId: 'SKU ID',
          skuImage: 'Image',
          skuName: 'Name',
          soldStock: 'Sold quantity',
          spuId: 'SPU ID',
          storageSkuId: 'Warehouse SKU ID',
          surplusStock: 'Stock',
          vipPrice: 'Member price',
          weight: 'Weight',
          width: 'Width'
        }
      },
      update: {
        addTitle: 'Add product SKU',
        updateTitle: 'Edit product SKU',
        entity: {
          barcode: {
            label: 'Barcode',
            tips: '',
            placeholder: 'Barcode',
            required: 'Enter a barcode',
            custom: ''
          },
          costPrice: {
            label: 'Cost price',
            tips: '',
            placeholder: 'Cost price',
            required: 'Enter a cost price',
            custom: 'Cost price must be greater than 0'
          },
          goodsPrice: {
            label: 'Product price',
            tips: '',
            placeholder: 'Product price',
            required: 'Enter a product price',
            custom: 'Product price must be greater than 0'
          },
          height: {
            label: 'Height',
            tips: '',
            placeholder: 'Height',
            required: 'Enter a height',
            custom: ''
          },
          hsCode: {
            label: 'HS code',
            tips: '',
            placeholder: 'HS code',
            required: 'Enter an HS code',
            custom: ''
          },
          length: {
            label: 'Length',
            tips: '',
            placeholder: 'Length',
            required: 'Enter a length',
            custom: 'Length must be greater than 0'
          },
          lockStock: {
            label: 'Reserved stock',
            tips: '',
            placeholder: 'Reserved stock',
            required: 'Enter reserved stock quantity',
            custom: ''
          },
          marketPrice: {
            label: 'Market price',
            tips: '',
            placeholder: 'Market price',
            required: 'Enter a market price',
            custom: 'Market price must be greater than 0'
          },
          salePrice: {
            label: 'Sale price',
            tips: '',
            placeholder: 'Sale price',
            required: 'Enter a sale price',
            custom: 'Sale price must be greater than 0'
          },
          servicePrice: {
            label: 'Service fee',
            tips: '',
            placeholder: 'Service fee',
            required: 'Enter a service fee',
            custom: 'Service fee must be greater than 0'
          },
          shelfLife: {
            label: 'Shelf life',
            tips: '',
            placeholder: 'Shelf life',
            required: 'Enter the shelf life',
            custom: 'Shelf life must be greater than 0'
          },
          skuId: {
            label: 'SKU ID',
            tips: '',
            placeholder: 'SKU ID',
            required: 'Enter an SKU ID',
            custom: ''
          },
          skuImage: {
            label: 'Image',
            tips: '',
            placeholder: 'Image',
            required: 'Enter an image',
            custom: ''
          },
          skuName: {
            label: 'Name',
            tips: '',
            placeholder: 'Name',
            required: 'Enter a name',
            custom: ''
          },
          soldStock: {
            label: 'Sold quantity',
            tips: '',
            placeholder: 'Sold quantity',
            required: 'Enter sold quantity',
            custom: ''
          },
          spuId: {
            label: 'SPU ID',
            tips: '',
            placeholder: 'SPU ID',
            required: 'Enter an SPU ID',
            custom: ''
          },
          storageSkuId: {
            label: 'Warehouse SKU ID',
            tips: '',
            placeholder: 'Warehouse SKU ID',
            required: 'Enter a warehouse SKU ID',
            custom: ''
          },
          surplusStock: {
            label: 'Stock',
            tips: '',
            placeholder: 'Stock',
            required: 'Enter stock quantity',
            custom: 'Stock quantity must be greater than 0'
          },
          vipPrice: {
            label: 'Member price',
            tips: '',
            placeholder: 'Member price',
            required: 'Enter a member price',
            custom: 'Member price must be greater than 0'
          },
          weight: {
            label: 'Weight',
            tips: '',
            placeholder: 'Weight',
            required: 'Enter a weight',
            custom: ''
          },
          width: {
            label: 'Width',
            tips: '',
            placeholder: 'Width',
            required: 'Enter a width',
            custom: 'Width must be greater than 0'
          }
        }
      }
    }
  }
}
