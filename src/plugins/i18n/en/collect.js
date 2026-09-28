export default {
  collect: {
    rule: {
      paging: {
        title: 'Scraping rules',
        heading: '',
        subheading: '',
        add: 'Add scraping rule',
        empty: {
          content: 'Scraping rules you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add scraping rule'
        },
        tableHeader: {
          brandSelector: 'Brand CSS selector',
          detailDescriptionSelector: 'Detail page content CSS selector',
          detailImgSrcSelector: 'Detail page image URL CSS selector',
          detailSummarySelector: 'Detail page summary CSS selector',
          detailTitleSelector: 'Detail page title CSS selector',
          domain: 'Domain',
          firstPage: 'Home',
          itemLink: 'Detail link CSS selector',
          imgListSelector: 'Image gallery CSS selector',
          imgListSrcSelector: 'Image URL CSS selector',
          itemImgSelector: 'Image CSS selector',
          itemImgSrcRemoveSelector: 'CSS selector for image elements to remove',
          itemImgSrcSelector: 'Image URL CSS selector',
          itemSelector: 'Item CSS selector',
          itemSummarySelector: 'Summary CSS selector',
          itemTitleSelector: 'Title CSS selector',
          lastPage: 'Last page',
          pageDetailPrefix: 'Detail page URL prefix',
          pagingUrl: 'Pagination URL, using {page} for the page number',
          platformCode: 'Third-party platform code',
          siteId: 'Website ID',
          skuListImgSelector: 'SKU image CSS selector',
          skuListSelector: 'SKU CSS selector',
          skuListSrcSelector: 'Image URL CSS selector',
          skuListValueSelector: 'SKU attribute value CSS selector',
          skuListKeySelector: 'SKU attribute name CSS selector',
          specKeySelector: 'Specification key CSS selector',
          specSelector: 'Specification CSS selector',
          specValueSelector: 'Specification value CSS selector',
          startPage: 'Second page',
          imgSeparator: 'Image separator',
          timeFormat: 'Date format',
          timePattern: 'Date extraction regex',
          timeSelector: 'Date selector',
          itemSubtitleSelector: 'Subtitle CSS selector',
          title: 'Website title'
        }
      },
      update: {
        article: 'Article scraping',
        updateTitle: 'Edit scraping rule',
        entity: {
          itemSubtitleSelector: {
            label: 'Subtitle',
            tips: '',
            placeholder: 'Subtitle CSS selector',
            required: 'Enter a subtitle CSS selector',
            custom: ''
          },
          timeFormat: {
            label: 'Format',
            tips: '',
            placeholder: 'Date format',
            required: 'Enter a date format',
            custom: ''
          },
          timePattern: {
            label: 'Extraction regex',
            tips: '',
            placeholder: 'Date extraction regex',
            required: 'Enter a date extraction regex',
            custom: ''
          },
          timeSelector: {
            label: 'Selector',
            tips: '',
            placeholder: 'Date selector',
            required: 'Enter a date selector',
            custom: ''
          },
          imgSeparator: {
            label: 'Image separator',
            tips: '',
            placeholder: 'Image separator',
            required: 'Enter an image separator',
            custom: ''
          },
          itemLink: {
            label: 'Detail link',
            tips: '',
            placeholder: 'Detail link CSS selector',
            required: 'Enter a detail link CSS selector',
            custom: ''
          },
          brandSelector: {
            label: 'Brand',
            tips: '',
            placeholder: 'Brand CSS selector',
            required: 'Enter a brand CSS selector',
            custom: ''
          },
          detailDescriptionSelector: {
            label: 'Content',
            tips: '',
            placeholder: 'Detail page content CSS selector',
            required: 'Enter a detail page content CSS selector',
            custom: ''
          },
          detailImgSrcSelector: {
            label: 'Image URL',
            tips: '',
            placeholder: 'Detail page image URL CSS selector',
            required: 'Enter a detail page image URL CSS selector',
            custom: ''
          },
          detailSummarySelector: {
            label: 'Summary',
            tips: '',
            placeholder: 'Detail page summary CSS selector',
            required: 'Enter a detail page summary CSS selector',
            custom: ''
          },
          detailTitleSelector: {
            label: 'Title',
            tips: '',
            placeholder: 'Detail page title CSS selector',
            required: 'Enter a detail page title CSS selector',
            custom: ''
          },
          domain: {
            label: 'Domain',
            tips: '',
            placeholder: 'eg. www.domain.com',
            required: 'Enter a domain',
            custom: ''
          },
          firstPage: {
            label: 'Homepage URL',
            tips: '',
            placeholder: 'eg. https://www.domain.com/singing-and-dancing-plush-toys/',
            required: 'Homepage URL',
            custom: ''
          },
          imgListSelector: {
            label: 'Image gallery',
            tips: '',
            placeholder: 'Image gallery CSS selector',
            required: 'Enter an image gallery CSS selector',
            custom: ''
          },
          imgListSrcSelector: {
            label: 'Image URL',
            tips: '',
            placeholder: 'Image URL CSS selector',
            required: 'Enter an image URL CSS selector',
            custom: ''
          },
          itemImgSelector: {
            label: 'Image',
            tips: '',
            placeholder: 'Image CSS selector',
            required: 'Enter an image CSS selector',
            custom: ''
          },
          itemImgSrcRemoveSelector: {
            label: 'CSS selector for image elements to remove',
            tips: '',
            placeholder: 'CSS selector for image elements to remove',
            required: 'CSS selector for image elements to remove',
            custom: ''
          },
          itemImgSrcSelector: {
            label: 'Image URL',
            tips: '',
            placeholder: 'Image URL CSS selector',
            required: 'Enter an image URL CSS selector',
            custom: ''
          },
          itemSelector: {
            label: 'Item',
            tips: '',
            placeholder: 'Item CSS selector',
            required: 'Enter an item CSS selector',
            custom: ''
          },
          itemSummarySelector: {
            label: 'Summary',
            tips: '',
            placeholder: 'Summary CSS selector',
            required: 'Enter a summary CSS selector',
            custom: ''
          },
          itemTitleSelector: {
            label: 'Title',
            tips: '',
            placeholder: 'Title CSS selector',
            required: 'Enter a title CSS selector',
            custom: ''
          },
          lastPage: {
            label: 'Last page',
            tips: '',
            placeholder: 'Last page',
            required: 'Enter the last page',
            custom: 'Enter a positive integer'
          },
          pageDetailPrefix: {
            label: 'Detail page URL prefix',
            tips: '',
            placeholder: 'https://www.hayidaiusa.com/',
            required: 'Enter a detail page URL prefix',
            custom: ''
          },
          pagingUrl: {
            label: 'Pagination URL; page number variable: {page}',
            tips: '',
            placeholder: 'https://www.domain.com/products/{page}/',
            required: 'Enter a pagination URL, using {page} for the page number',
            custom: ''
          },
          platformCode: {
            label: 'Third-party platform code',
            tips: '',
            placeholder: 'Third-party platform code',
            required: 'Enter a third-party platform code',
            custom: ''
          },
          skuListImgSelector: {
            label: 'Image',
            tips: '',
            placeholder: 'SKU image CSS selector',
            required: 'Enter an SKU image CSS selector',
            custom: ''
          },
          skuListSelector: {
            label: 'SKU',
            tips: '',
            placeholder: 'SKU CSS selector',
            required: 'Enter an SKU CSS selector',
            custom: ''
          },
          skuListSrcSelector: {
            label: 'Image URL',
            tips: '',
            placeholder: 'Image URL CSS selector',
            required: 'Enter an image URL CSS selector',
            custom: ''
          },
          skuListValueSelector: {
            label: 'SKU attribute value',
            tips: '',
            placeholder: 'SKU attribute value CSS selector',
            required: 'Enter an SKU attribute value CSS selector',
            custom: ''
          },
          skuListKeySelector: {
            label: 'SKU attribute name',
            tips: '',
            placeholder: 'SKU attribute name CSS selector',
            required: 'Enter an SKU attribute name CSS selector',
            custom: ''
          },
          specKeySelector: {
            label: 'Specification key',
            tips: '',
            placeholder: 'Specification key CSS selector',
            required: 'Enter a specification key CSS selector',
            custom: ''
          },
          specSelector: {
            label: 'Specifications',
            tips: '',
            placeholder: 'Specification CSS selector',
            required: 'Enter a specification CSS selector',
            custom: ''
          },
          specSelectorGroup: {
            label: 'Specification group',
            tips: '',
            placeholder: 'Specification group CSS selector',
            required: 'Enter a specification group CSS selector',
            custom: ''
          },
          specTitleSelector: {
            label: 'Specification group title key',
            tips: '',
            placeholder: 'Specification group title key CSS selector',
            required: 'Enter a specification group title key CSS selector',
            custom: ''
          },
          specValueSelector: {
            label: 'Specification value',
            tips: '',
            placeholder: 'Specification value CSS selector',
            required: 'Enter a specification value CSS selector',
            custom: ''
          },
          startPage: {
            label: 'Second page',
            tips: '',
            placeholder: 'Second page',
            required: 'Enter the second page',
            custom: 'Enter a positive integer'
          },
          title: {
            label: 'Website title',
            tips: '',
            placeholder: 'Website title',
            required: 'Enter a website title',
            custom: ''
          },
          domainRoot: {
            label: 'Domain (starting with http or https), without a trailing slash',
            tips: '',
            placeholder: 'eg: https://www.domain.com',
            required: 'Enter a domain',
            custom: ''
          },
          imgListSelectorOriginal: {
            label: 'Image URL string',
            tips: '',
            placeholder: 'eg: -300x300',
            required: '',
            custom: ''
          },
          imgListSelectorReplacement: {
            label: 'Image URL replacement string',
            tips: '',
            placeholder: 'eg: -800x800',
            required: '',
            custom: ''
          }
        }
      }
    },
    alibaba: {
      title: 'Import products from Alibaba.com',
      ids: {
        label: 'Alibaba.com product IDs',
        tips: '',
        placeholder: 'Alibaba.com product IDs, separated by commas',
        required: 'Enter Alibaba.com product IDs',
        custom: ''
      }
    }
  }
}
