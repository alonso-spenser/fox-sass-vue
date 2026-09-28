export default {
  settings: {
    tabPane: [
      {
        label: 'Website information',
        name: 'site-setting-general',
        siteType: [
          1,
          2,
          3,
          4
        ]
      },
      {
        label: 'Domain connections',
        name: 'site-setting-domain',
        siteType: [
          1,
          2,
          3,
          4
        ]
      },
      {
        label: 'Legal policies',
        name: 'site-setting-legal',
        siteType: [
          1,
          2,
          3,
          4
        ]
      },
      {
        label: 'Tracking & analytics',
        name: 'site-setting-tracking',
        siteType: [
          1,
          2,
          3,
          4
        ]
      },
      {
        label: 'Routes',
        name: 'site-setting-route',
        siteType: [
          1,
          2,
          3,
          4
        ]
      }
    ],
    heading: 'Website settings',
    title: 'Website information',
    basic: {
      paging: {
        title: 'Website information',
        desc: 'The platform and your customers use this information to contact you'
      },
      entity: {
        title: {
          label: 'Website name',
          placeholder: 'Enter a website name',
          required: 'Enter a website name'
        },
        addOnHeader: {
          label: 'Website title suffix',
          tips: '',
          placeholder: 'Website title suffix',
          required: 'Enter a website title suffix',
          custom: ''
        },
        emailSender: {
          label: 'Email sender',
          tips: '',
          placeholder: 'Email sender',
          required: 'Enter an email sender',
          custom: ''
        },
        email: {
          label: 'Contact email',
          placeholder: 'Enter an email address',
          required: 'Enter an email address',
          custom: 'Enter a valid email address'
        },
        currencyId: {
          label: 'Currency',
          placeholder: 'Select a currency',
          required: 'Select a currency'
        },
        langId: {
          label: 'Website language',
          placeholder: 'Select a website language',
          required: 'Select a website language'
        },
        timeZone: {
          label: 'Time zone',
          placeholder: 'Select a time zone',
          required: 'Select a time zone'
        },
        lengthUnit: {
          label: 'Length unit',
          placeholder: 'Select a length unit',
          required: 'Select a length unit'
        },
        weightUnit: {
          label: 'Weight unit',
          placeholder: 'Select a weight unit',
          required: 'Select a weight unit'
        },
        unitSystem: {
          label: 'Unit system',
          placeholder: 'Select a unit system',
          required: 'Select a unit system'
        },
        address: {
          label: 'Full company address (displayed on the website)',
          tips: '',
          placeholder: 'Full company address (displayed on the website)',
          required: 'Enter the full company address'
        },
        coordinate: {
          label: 'Company coordinates',
          tips: '',
          placeholder: 'Search for the company address',
          required: 'Enter a company address',
          custom: ''
        },
        currencyCode: {
          label: 'Currency code, such as CNY',
          tips: '',
          placeholder: 'Currency code, such as CNY',
          required: 'Enter a currency code, such as CNY',
          custom: ''
        },
        currencyName: {
          label: 'Currency name',
          tips: '',
          placeholder: 'Currency name',
          required: 'Enter a currency name',
          custom: ''
        },
        currencySymbol: {
          label: 'Currency symbol',
          tips: '',
          placeholder: 'Currency symbol',
          required: 'Enter a currency symbol',
          custom: ''
        },
        company: {
          label: 'Company',
          tips: '',
          placeholder: 'Company name',
          required: 'Enter a company name',
          custom: ''
        },
        contact: {
          label: 'Contact person',
          tips: '',
          placeholder: 'Contact person',
          required: 'Enter a contact person',
          custom: ''
        },
        phone: {
          label: 'Contact phone',
          tips: '',
          placeholder: 'Contact phone',
          required: 'Enter a contact phone number',
          custom: ''
        },
        cityName: {
          label: 'City',
          tips: '',
          placeholder: 'City',
          required: 'Enter a city name',
          custom: ''
        },
        targetMarket: {
          label: 'Target market',
          tips: '',
          placeholder: 'Target market',
          required: 'Select a target market',
          custom: ''
        },
        longitude: {
          label: 'Longitude',
          placeholder: 'Enter a longitude',
          required: 'Enter a longitude',
          custom: 'Enter a valid longitude'
        },
        latitude: {
          label: 'Latitude',
          placeholder: 'Enter a latitude',
          required: 'Enter a latitude',
          custom: 'Enter a valid latitude'
        },
        freePhone: {
          label: '400 service number',
          tips: '',
          placeholder: '400 service number',
          required: '',
          custom: ''
        },
        mobile: {
          label: 'Mobile number',
          tips: '',
          placeholder: 'Mobile number',
          required: '',
          custom: ''
        },
        location: {
          label: 'Company region',
          tips: '',
          placeholder: 'Company region',
          required: '',
          custom: ''
        },
        downPass: {
          label: 'Shared download password',
          tips: 'Shared download password (product attachments)',
          placeholder: 'Enter a download password (letters and numbers)',
          required: 'Enter a download password',
          custom: 'Use letters and numbers for the password'
        }
      },
      map: {
        title: 'Map marker',
        searchSelect: [
          {
            label: 'Find by address',
            value: 1
          },
          {
            label: 'Find by coordinates',
            value: 2
          }
        ],
        explain: {
          label: 'Search for your company address to find its location',
          content: 'Google Maps access is restricted in mainland China, so the editor uses Baidu Maps to select locations. Chinese website pages use Baidu Maps; other languages use Google Maps.',
          primary: 'Click the map to choose a more precise location'
        }
      },
      langAndCurrency: {
        heading: 'Language & currency',
        subheading: 'The language displayed on your website and the currency used for product prices',
        change: 'Change currency',
        dialog: {
          heading: 'Select a currency',
          subheading: 'All prices on your website are displayed and recorded in this currency. The currency cannot be changed after your first customer order.'
        },
        tableHeader: {
          countryName: 'Country or region',
          cnName: 'Chinese name',
          enName: 'English name',
          code: 'Abbreviation',
          symbol: 'Symbol'
        }
      },
      timeAndUnit: {
        heading: 'Time & units',
        subheading: 'Used for product pricing, shipping weights, and order times'
      },
      unit: {
        heading: 'Measurement system'
      },
      siteStatus: {
        heading: 'Website status',
        normal: {
          label: 'Enabled',
          tips: 'Visitors can access your website while it is enabled',
          button: 'Disable website',
          affirm: 'Visitors will not be able to access your website while it is disabled. Disable it?',
          success: 'Website enabled'
        },
        inactive: {
          label: 'Disabled',
          tips: 'Visitors cannot access your website while it is disabled',
          button: 'Enable website',
          expiredButton: 'Your website has expired. Renew your subscription.',
          affirm: 'Visitors will be able to access your website once it is enabled',
          success: 'Website disabled'
        },
        freeze: {
          label: 'Frozen',
          tips: 'Your website is frozen. Contact us to restore access.'
        }
      }
    },
    unpaid: {
      heading: 'Not activated',
      subheading: 'Purchase a paid subscription to use this feature',
      content: 'Contact us for more information',
      cancel: 'Got it',
      payment: 'Renew'
    },
    domain: {
      add: 'Add domain',
      title: 'Domain connections',
      reConnect: 'Reconnect',
      primary: {
        title: 'Primary domain',
        content: 'Visitors to any connected domain will be redirected to this domain'
      },
      original: {
        title: 'Original domain',
        content: 'The domain assigned by the system when the website was created'
      },
      thirdParty: {
        title: 'Third-party domains',
        content: 'Domains from third-party providers'
      },
      tableHeader: {
        name: 'Domain',
        status: 'Status',
        ssl: 'SSL',
        date: 'Added on',
        provider: 'Provider',
        reconnect: 'Reconnect'
      },
      status: {
        unconnected: 'Not connected',
        connected: 'Connected',
        exists: 'This domain already exists. Use a different domain.'
      },
      delete: {
        heading: 'Delete domain',
        content: 'Are you sure you want to delete this domain?'
      },
      change: {
        button: 'Change',
        heading: 'Change primary domain',
        content: 'Change the primary domain? Visitors and search engines will see this domain.'
      },
      connect: {
        title: 'Add domain',
        nextStep: 'Next',
        domain: 'Website domain',
        domainName: 'Domain',
        edit: 'Back to edit',
        verify: 'Verify',
        cname: 'Use a <b class="text-primary">CNAME</b> record to point your domain to',
        guide: 'Domain setup guide',
        verifyAgain: 'Verify again',
        settings: 'Third-party domain settings',
        settingTips: "Sign in to your domain provider's account to configure the domain connection",
        checkTips: 'Verify the connection after configuring your domain with your provider to confirm the settings are correct',
        reconnectSuccess: 'Reconnected. Your website is now accessible through this domain.',
        reconnectFailed: 'Reconnection failed. Contact your domain provider for help.',
        success: 'DNS configured correctly',
        entity: {
          domain: {
            label: 'Domain',
            placeholder: `For example, www.${process.env.VUE_APP_DESIGN_DOMAIN}`,
            required: 'Enter the domain you want to connect',
            custom: 'Invalid domain format'
          }
        },
        validate: {
          record: 'CNAME record (@)',
          current: 'Current value:',
          required: 'Required value:',
          success: {
            heading: 'Verification complete',
            subheading: 'Your domain has been added'
          },
          failed: {
            heading: 'Verification failed',
            subheading: 'Check the required settings and try verifying again'
          }
        },
        setting: {
          heading: 'Third-party domain settings',
          subheading: "Sign in to your domain provider's account to configure the domain connection",
          guide: 'Domain setup guide'
        }
      }
    },
    connect: {
      paging: {
        title: 'Add domain'
      }
    },
    legal: {
      paging: {
        title: 'Legal policies'
      },
      update: {
        title: 'Legal policies',
        template: 'Replace with a template',
        entity: {
          privacyPolicy: {
            label: 'Privacy policy',
            tips: '',
            placeholder: 'Privacy policy',
            required: 'Enter a privacy policy',
            custom: ''
          },
          refundPolicy: {
            label: 'Refund policy',
            tips: '',
            placeholder: 'Refund policy',
            required: 'Enter a refund policy',
            custom: ''
          },
          shippingPolicy: {
            label: 'Shipping policy',
            tips: '',
            placeholder: 'Shipping policy',
            required: 'Enter a shipping policy',
            custom: ''
          },
          termsOfService: {
            label: 'Terms of service',
            tips: '',
            placeholder: 'Terms of service',
            required: 'Enter terms of service',
            custom: ''
          }
        }
      }
    },
    tracking: {
      paging: {
        title: 'Tracking & analytics'
      },
      update: {
        facebook: {
          heading: 'Facebook Pixel',
          subheading: 'Facebook Pixel helps you create ad campaigns to reach people similar to your customers. <a class="text-primary" target="_blank" href="https://www.facebook.com/business/help/651294705016616">Learn more about Facebook Pixel</a>'
        },
        gtag: {
          heading: 'Google Analytics',
          subheading: 'Google Analytics tracks website traffic and generates reports for marketing analysis. <a class="text-primary" target="_blank" href="https://www.facebook.com/business/help/651294705016616">How do I set it up?</a>'
        },
        entity: {
          facebookPixel: {
            label: 'Facebook Pixel ID',
            placeholder: 'Enter a Facebook Pixel ID',
            required: 'Enter a Facebook Pixel ID'
          },
          scriptHead: {
            label: 'Tracking code <Head>',
            placeholder: 'Enter or paste code',
            required: '',
            info: 'Add third-party code such as Google Analytics, Google Tag Manager, or Facebook Pixel here.<p class="m-0">You can also add Google domain verification: &lt;meta name="google-site-verification" content="verification-code"&gt; </p> <p class="m-0">Place each snippet on a new line. This code is inserted into the page <b class="text-primary">Head</b>.</p>'
          },
          scriptBottom: {
            label: 'Tracking code <Body>',
            placeholder: 'Enter or paste code',
            required: '',
            info: 'Add custom code, the second Google Tag Manager snippet, or third-party chat code here.<p class="m-0">This code is inserted at the end of the page <b class="text-primary">Body</b>.</p>'
          }
        }
      }
    },
    route: {
      tips: 'Enter one redirect per line, separating the old and new URLs with a space. Use absolute paths starting with /, without a domain.',
      refType: {
        0: 'System',
        9: 'Custom'
      },
      paging: {
        title: 'Website routes',
        heading: '',
        subheading: '',
        add: 'Add website route',
        empty: {
          content: 'Website routes you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add website route'
        },
        tableHeader: {
          original: 'Source URL',
          refId: 'Original ID',
          refType: 'Type',
          siteId: 'Website ID',
          state: 'Status',
          target: 'Destination URL'
        }
      },
      update: {
        addTitle: 'Add website route',
        updateTitle: 'Edit website route',
        entity: {
          original: {
            label: 'Source URL',
            tips: '',
            placeholder: 'Source URL',
            required: 'Enter a source URL',
            custom: ''
          },
          target: {
            label: 'Destination URL',
            tips: '',
            placeholder: 'Destination URL',
            required: 'Enter a destination URL',
            custom: ''
          }
        }
      }
    },
    authorizedLogin: {
      title: 'Google sign-in',
      entity: {
        applicationName: {
          label: 'Application Name',
          tips: '',
          placeholder: 'Application Name',
          required: 'Enter an application name',
          custom: ''
        },
        clientId: {
          label: 'Client ID',
          tips: '',
          placeholder: 'Client ID',
          required: 'Enter a client ID',
          custom: ''
        },
        clientSecret: {
          label: 'Client Secret',
          tips: '',
          placeholder: 'Client Secret',
          required: 'Enter a client secret',
          custom: ''
        },
        scope: {
          label: 'Scope',
          tips: '',
          placeholder: 'openid email profile',
          required: 'Enter openid email profile',
          custom: ''
        },
        tag: {
          label: 'Platform',
          tips: '',
          placeholder: 'Platform',
          required: 'Enter a platform',
          custom: ''
        }
      }
    }
  }
}
