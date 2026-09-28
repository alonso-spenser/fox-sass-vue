export default {
  merchant: {
    heading: 'Settings',
    menuList: [
      {
        title: 'Personal information',
        abbr: 'Personal',
        submenu: [],
        icon: 'icon-shouye_o',
        url: '/account/personal',
        siteType: [
          2,
          3,
          4
        ]
      },
      {
        title: 'Company information',
        abbr: 'Company',
        submenu: [],
        icon: 'icon-zhexiantu_o',
        url: '/site/:siteId:/analytics/data',
        siteType: [
          2,
          3,
          4
        ]
      }
    ],
    welcome: 'Welcome, ',
    manage: 'Manage your information, privacy, and security to get more from Fomille',
    paging: {
      title: 'Merchants',
      heading: '',
      subheading: '',
      add: 'Add merchant',
      empty: {
        content: 'Merchants you add will appear here. You can edit, delete, and manage them in bulk.',
        buttonLabel: 'Add merchant'
      },
      tableHeader: {
        address: 'Street address',
        contact: 'Contact person',
        createTime: 'Created at',
        email: 'Email address',
        merchantId: 'Merchant ID',
        mobile: 'Mobile',
        name: 'Merchant name',
        shortForm: 'Merchant short name',
        signTime: 'Contract date',
        updateTime: 'Updated at',
        webQuantity: 'Number of websites',
        agentId: 'Agent ID',
        breakTime: 'Contract termination date',
        cityId: 'City ID',
        cityName: 'City',
        claimTime: 'Claimed at',
        contactTime: 'Last contacted at',
        countryId: 'Country ID',
        countryName: 'Country name',
        entryId: 'Created by (ID)',
        entryName: 'Created by',
        industryId: 'Industry ID',
        industryName: 'Industry',
        isAgent: 'Account type: 0 for agent, 1 for merchant',
        lastSellerId: 'Previous salesperson ID',
        levelId: 'Customer level',
        levelName: 'Customer level',
        mainBusiness: 'Main business',
        mobileArea: 'Country calling code',
        ownerId: 'Original user',
        platformId: 'Platform ID',
        provinceId: 'Province/state ID',
        provinceName: 'Province/state',
        referralCode: 'Referral code',
        remark: 'Notes',
        sellerId: 'Salesperson ID',
        sellerName: 'Salesperson',
        skype: 'Skype',
        sourceId: 'Customer source',
        sourceName: 'Customer source',
        state: '0: Unreviewed, 1: Approved',
        synced: 'Business registration information sync',
        website: 'Website',
        wechat: 'WeChat',
        whatsapp: 'WhatsApp'
      }
    },
    corp: 'Company information',
    employeeState: [
      {
        value: 0,
        label: 'Active'
      },
      {
        value: 1,
        label: 'Disabled'
      }
    ],
    personal: {
      title: 'Personal information'
    },
    account: {
      dashboard: 'Management home'
    },
    update: {
      addTitle: 'Add merchant',
      updateTitle: 'Edit merchant',
      entity: {
        name: {
          label: 'Company name',
          tips: '',
          placeholder: 'Company name',
          required: 'Enter a company name',
          custom: ''
        },
        shortForm: {
          label: 'Company short name',
          tips: '',
          placeholder: 'Company short name',
          required: 'Enter a company short name',
          custom: ''
        },
        cityName: {
          label: 'City',
          tips: '',
          placeholder: 'City',
          required: 'Select a city',
          custom: ''
        },
        contact: {
          label: 'Contact person',
          tips: '',
          placeholder: 'Contact person',
          required: 'Enter a contact person',
          custom: ''
        },
        email: {
          label: 'Contact email',
          tips: '',
          placeholder: 'Contact email',
          required: 'Enter a contact email',
          custom: ''
        },
        phone: {
          label: 'Mobile number',
          tips: '',
          placeholder: 'Mobile number',
          required: 'Enter a mobile number',
          custom: '',
          formatError: 'Invalid mobile number format'
        },
        provinceName: {
          label: 'Province/state',
          tips: '',
          placeholder: 'Province/state',
          required: 'Select a province/state',
          custom: ''
        },
        address: {
          label: 'Company address',
          tips: '',
          placeholder: 'Company address',
          required: 'Enter a company address',
          custom: ''
        }
      }
    },
    password: {
      title: 'Change password',
      success: 'Password changed. Use your new password the next time you sign in.',
      entity: {
        oldPass: {
          label: 'Current password',
          placeholder: 'Current sign-in password',
          required: 'Enter your current password'
        },
        newPass: {
          label: 'New password',
          placeholder: 'New password (6–20 letters, numbers, or underscores)',
          required: 'Enter a new password using 6–20 letters, numbers, or underscores'
        },
        checkPass: {
          label: 'Confirm password',
          placeholder: 'Enter your new password again',
          required: 'Enter the password again',
          custom: 'Passwords do not match'
        }
      }
    },
    employee: {
      paging: {
        title: 'Employee management',
        heading: 'Employees',
        subheading: '',
        add: 'Add employee',
        empty: {
          content: 'Employees you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add employee'
        },
        tableHeader: {
          name: 'Full name',
          roleName: 'Role',
          departmentName: 'Department',
          mobile: 'Mobile/phone number',
          email: 'Email',
          keepValue: 'Maximum retained customers',
          state: 'Disabled',
          account: 'Sign-in account'
        },
        search: {
          label: 'Keyword search',
          placeholder: 'Search by employee name'
        }
      },
      update: {
        addTitle: 'Add employee',
        updateTitle: 'Edit employee',
        entity: {
          avatar: {
            label: 'Avatar',
            tips: '',
            placeholder: '',
            required: '',
            custom: ''
          },
          account: {
            label: 'Account',
            placeholder: 'Mobile/email',
            required: 'Enter a mobile number or email address',
            custom: 'Enter a valid mobile number or email address',
            exists: 'No account found for this email address'
          },
          name: {
            label: 'First name',
            tips: '',
            placeholder: 'First name',
            required: 'Enter a first name',
            custom: ''
          },
          firstName: {
            label: 'Last name',
            tips: '',
            placeholder: 'Last name',
            required: 'Enter a last name',
            custom: ''
          },
          lastName: {
            label: 'First name',
            tips: '',
            placeholder: 'First name',
            required: 'Enter a first name',
            custom: ''
          },
          role: {
            label: 'Role',
            tips: '',
            placeholder: 'Role',
            required: 'Select a role',
            custom: ''
          },
          email: {
            label: 'Email address',
            tips: '',
            placeholder: "Enter an email address to use as the employee's sign-in account",
            required: 'Enter an email address',
            custom: ''
          },
          mobile: {
            label: 'Mobile number',
            tips: '',
            placeholder: 'Mobile number',
            required: 'Enter a mobile number',
            error: 'Invalid mobile number',
            custom: ''
          },
          phone: {
            label: 'Phone',
            tips: '',
            placeholder: 'Enter a phone number',
            required: 'Enter a phone number',
            custom: ''
          },
          password: {
            label: 'Sign-in password',
            placeholder: 'Password (6–20 letters, numbers, or underscores)',
            required: 'Enter a password',
            custom: 'Use 6–20 letters, numbers, or underscores'
          },
          passAgain: {
            label: 'Confirm password',
            placeholder: 'Confirm password',
            required: 'Confirm your password',
            custom: 'The passwords do not match'
          },
          state: {
            label: 'Status',
            tips: '',
            placeholder: '',
            required: '',
            custom: ''
          }
        },
        tips: [
          {
            content: 'If no password is entered, the default is 123456. Ask the employee to sign in and change it as soon as possible.'
          }
        ]
      }
    },
    role: {
      title: 'Role features',
      paging: {
        title: 'Role management',
        heading: '',
        subheading: '',
        add: 'Add role',
        empty: {
          content: 'Roles you add will appear here. You can edit, delete, and manage them in bulk.',
          buttonLabel: 'Add role'
        },
        tableHeader: {
          roleName: 'Role name',
          roleRemark: 'Role description',
          keepValue: 'Maximum retained customers'
        }
      },
      update: {
        addTitle: 'Add role',
        updateTitle: 'Edit role',
        entity: {
          functionList: {
            label: 'Features',
            tips: '',
            placeholder: 'Features',
            required: 'Select feature permissions'
          },
          roleRemark: {
            label: 'Notes',
            tips: '',
            placeholder: "Notes about this role's features",
            required: '',
            custom: ''
          },
          roleName: {
            label: 'Role name',
            tips: '',
            placeholder: 'Role name',
            required: 'Enter a role name',
            custom: ''
          }
        }
      },
      delete: {
        msg: 'Deleting the role {role} will prevent associated employees from signing in. Delete this role?'
      }
    }
  }
}
