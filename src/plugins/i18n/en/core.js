export default {
  core: {
    title: 'Reference data',
    appTypeList: [
      {
        label: 'Merchant',
        name: 'Merchant operations platform',
        type: 1000
      },
      {
        label: 'Backstage',
        name: 'System operations platform',
        type: 3000
      }
    ],
    base: {
      lang: {
        paging: {
          title: 'Language',
          heading: '',
          subheading: '',
          add: 'Add language',
          empty: {
            content: 'Languages you add will appear here. You can edit, delete, and manage them in bulk.',
            buttonLabel: 'Add language'
          },
          tableHeader: {
            aliCode: 'Alibaba translation code',
            aliNo: 'Alibaba translation sequence number',
            code: 'Language code',
            icon: 'Icon',
            languageName: 'Standard name',
            nativeName: 'Local name',
            state: 'Status'
          }
        },
        update: {
          addTitle: 'Add language',
          updateTitle: 'Edit language',
          entity: {
            aliCode: {
              label: 'Alibaba translation code',
              tips: '',
              placeholder: 'Alibaba translation code',
              required: 'Enter an Alibaba translation code',
              custom: ''
            },
            aliNo: {
              label: 'Alibaba translation sequence number',
              tips: '',
              placeholder: 'Alibaba translation sequence number',
              required: 'Enter an Alibaba translation sequence number',
              custom: ''
            },
            code: {
              label: 'Language code',
              tips: '',
              placeholder: 'Language code',
              required: 'Enter a language code',
              custom: ''
            },
            icon: {
              label: 'Icon',
              tips: '',
              placeholder: 'Icon',
              required: 'Enter an icon',
              custom: ''
            },
            languageName: {
              label: 'Standard name',
              tips: '',
              placeholder: 'Standard name',
              required: 'Enter a standard name',
              custom: ''
            },
            nativeName: {
              label: 'Local name',
              tips: '',
              placeholder: 'Local name',
              required: 'Enter a local name',
              custom: ''
            },
            state: {
              label: 'Status',
              tips: '',
              placeholder: 'Status',
              required: 'Enter a status',
              custom: ''
            }
          }
        }
      }
    },
    security: {
      paging: {
        title: 'Permissions'
      },
      role: {
        title: 'Role management',
        empty: {
          content: 'Roles you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add role'
        },
        update: {
          addTitle: 'Add role',
          updateTitle: 'Edit role',
          selectAppType: 'Select an application type',
          notAddRole: 'The platform role limit has been reached',
          roleName: 'Super administrator',
          entity: {
            functionAuthority: {
              label: 'Feature permissions',
              tips: '',
              placeholder: 'Feature permissions',
              required: 'Select feature permissions'
            },
            dataAccess: {
              label: 'Data permissions',
              tips: '',
              placeholder: '0: Own data, 1: Department data, 2: All data',
              required: 'Enter a data scope: 0 for own data, 1 for department data, or 2 for all data',
              custom: ''
            },
            isDelete: {
              label: 'Deletion status: 0 for active, 1 for deleted',
              tips: '',
              placeholder: 'Deletion status: 0 for active, 1 for deleted',
              required: 'Enter a deletion status: 0 for active or 1 for deleted',
              custom: ''
            },
            keepValue: {
              label: 'Maximum retained customers',
              tips: '',
              placeholder: 'Maximum retained customers',
              required: 'Enter the maximum number of retained customers',
              custom: ''
            },
            appTypeName: {
              label: 'Feature name',
              tips: '',
              placeholder: 'Feature name',
              required: 'Select a feature name',
              custom: ''
            },
            roleName: {
              label: 'Role name',
              tips: '',
              placeholder: 'Role name',
              required: 'Enter a role name',
              custom: ''
            },
            roleRemark: {
              label: 'Role description',
              tips: '',
              placeholder: 'Role description',
              required: 'Enter a role description',
              custom: ''
            }
          }
        },
        delete: {
          msg: 'Deleting the role {role} will prevent associated employees from signing in. Delete this role?'
        },
        tableHeader: {
          roleName: 'Role name',
          roleRemark: 'Role description',
          keepValue: 'Maximum retained customers'
        }
      },
      function: {
        paging: {
          title: 'Application features'
        },
        update: {
          add: 'Add item',
          title: 'Edit application feature',
          saveSuccess: 'Saved successfully',
          form: {
            functionName: 'functionName',
            functionCode: 'functionCode'
          }
        },
        delete: {
          deleteParent: 'Delete this parent and all its children?',
          deleteChild: 'Delete this child configuration?'
        },
        tableHeader: {
          name: 'Feature name',
          type: 'Code',
          typeCode: 'Application ID',
          role: '',
          mg: 'System role'
        }
      }
    },
    bumeng: [
      {
        name: 'Own data',
        type: '0'
      },
      {
        name: 'Department data',
        type: '1'
      },
      {
        name: 'All',
        type: '2'
      }
    ],
    dictType: [
      {
        value: 'service_category',
        label: 'Service product type',
        url: '/service/category',
        alias: 'service'
      }
    ],
    dict: {
      remark: {
        label: 'Notes',
        tips: '',
        placeholder: 'Notes',
        required: 'Enter notes',
        custom: ''
      },
      sort: {
        label: 'Sort by',
        tips: '',
        placeholder: 'Higher values appear first',
        required: 'Enter a sort order',
        custom: ''
      },
      dicType: {
        label: 'Dictionary type',
        tips: '',
        placeholder: 'Dictionary type',
        required: '',
        custom: ''
      },
      title: {
        label: 'Name',
        tips: '',
        placeholder: 'Enter a name',
        required: 'Enter a name',
        custom: ''
      }
    },
    agent: {
      title: 'System configuration',
      entity: {
        address: {
          label: 'Contact address',
          tips: '',
          placeholder: 'Contact address',
          required: 'Enter a contact address',
          custom: ''
        },
        name: {
          label: 'Name',
          tips: '',
          placeholder: 'Name',
          required: 'Enter a name',
          custom: ''
        },
        contact: {
          label: 'Contact person',
          tips: '',
          placeholder: 'Contact person',
          required: 'Enter a contact person',
          custom: ''
        },
        domain: {
          label: 'Website management domain',
          tips: '',
          placeholder: 'Website management domain',
          required: 'Enter a website management domain',
          custom: ''
        },
        email: {
          label: 'Email address',
          tips: '',
          placeholder: 'Email address',
          required: 'Enter an email address',
          custom: ''
        },
        icp: {
          label: 'ICP registration number',
          tips: '',
          placeholder: 'ICP registration number',
          required: 'Enter an ICP registration number',
          custom: ''
        },
        logo: {
          label: 'LOGO',
          tips: '',
          placeholder: 'LOGO',
          required: 'Enter a logo',
          custom: ''
        },
        mobile: {
          label: 'Contact mobile number',
          tips: '',
          placeholder: 'Contact mobile number',
          required: 'Enter a contact mobile number',
          custom: ''
        },
        shortForm: {
          label: 'Short name',
          tips: '',
          placeholder: 'Short name',
          required: 'Enter a short name',
          custom: ''
        },
        website: {
          label: 'Official website domain',
          tips: '',
          placeholder: 'Official website domain',
          required: 'Enter an official website domain',
          custom: ''
        }
      }
    }
  },
  googleApi: {
    paging: {
      title: 'GOOGLE API KEY',
      heading: '',
      subheading: '',
      add: 'Add Google API key',
      empty: {
        content: 'Google API keys you add will appear here. You can edit, delete, and manage them in bulk.',
        buttonLabel: 'Add Google API key'
      },
      tableHeader: {
        gamKey: 'GAM KEY',
        gmail: 'GMAIL',
        merchantId: 'Merchant ID',
        quantity: 'Linked websites'
      }
    },
    update: {
      addTitle: 'Add Google API key',
      updateTitle: 'Edit Google API key',
      entity: {
        gamKey: {
          label: 'GAM KEY',
          tips: '',
          placeholder: 'GAM KEY',
          required: 'Enter a GAM key',
          custom: ''
        },
        gmail: {
          label: 'GMAIL',
          tips: '',
          placeholder: 'GMAIL',
          required: 'Enter a Gmail address',
          custom: ''
        },
        merchantId: {
          label: 'Merchant ID',
          tips: '',
          placeholder: 'Merchant ID',
          required: 'Enter a merchant ID',
          custom: ''
        },
        quantity: {
          label: 'Linked websites',
          tips: '',
          placeholder: 'Linked websites',
          required: 'Enter the number of linked websites',
          custom: ''
        }
      }
    }
  },
  audit: {
    project: {
      paging: {
        title: 'Approval workflow configuration',
        heading: '',
        subheading: '',
        add: 'Add approval workflow',
        empty: {
          content: 'Approval workflows you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add approval workflow'
        },
        tableHeader: {
          name: 'Name',
          tag: 'TAG'
        }
      },
      update: {
        addTitle: 'Add approval workflow',
        updateTitle: 'Edit approval workflow',
        entity: {
          appType: {
            label: 'Scenario',
            tips: '',
            placeholder: 'APP TYPE',
            required: 'Enter an application type',
            custom: ''
          },
          name: {
            label: 'Name',
            tips: '',
            placeholder: 'Name',
            required: 'Enter a name',
            custom: ''
          },
          tag: {
            label: 'TAG',
            tips: '',
            placeholder: 'TAG',
            required: 'Enter a tag',
            custom: ''
          }
        }
      }
    },
    config: {
      paging: {
        title: 'Approval workflow configuration',
        heading: '',
        subheading: '',
        add: 'Add approval workflow',
        empty: {
          content: 'Approval workflows you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add approval workflow'
        },
        tableHeader: {
          agentId: 'Agent ID',
          goodsId: 'Agent product ID',
          goodsName: 'Agent product ID',
          name: 'Name',
          serviceGoodsId: 'System product ID',
          tag: 'TAG'
        }
      },
      update: {
        addTitle: 'Add approval workflow',
        updateTitle: 'Edit approval workflow',
        entity: {
          agentId: {
            label: 'Agent ID',
            tips: '',
            placeholder: 'Agent ID',
            required: 'Enter an agent ID',
            custom: ''
          },
          goodsId: {
            label: 'Agent product ID',
            tips: '',
            placeholder: 'Agent product ID',
            required: 'Enter an agent product ID',
            custom: ''
          },
          goodsName: {
            label: 'Agent product ID',
            tips: '',
            placeholder: 'Agent product ID',
            required: 'Enter an agent product ID',
            custom: ''
          },
          name: {
            label: 'Name',
            tips: '',
            placeholder: 'Name',
            required: 'Enter a name',
            custom: ''
          },
          serviceGoodsId: {
            label: 'System product ID',
            tips: '',
            placeholder: 'System product ID',
            required: 'Enter a system product ID',
            custom: ''
          },
          tag: {
            label: 'TAG',
            tips: '',
            placeholder: 'TAG',
            required: 'Enter a tag',
            custom: ''
          }
        }
      }
    }
  }
}
