export default {
  enquiry: {
    tabPane: [
      {
        label: 'My enquiries',
        name: 'enquiry-record',
        service: false
      },
      {
        label: 'Enquiry emails',
        name: 'enquiry-email',
        service: true
      },
      {
        label: 'Enquiry forms',
        name: 'enquiry-form',
        service: true
      }
    ],
    paging: {
      title: 'Enquiry management'
    },
    export: 'Export',
    all: 'Select all',
    record: {
      title: 'Enquiry',
      description: 'Enquiry records',
      export: 'Export',
      clearAllFilter: 'Clear all filters',
      tableHeader: {
        createTime: 'Time',
        country: 'Country',
        Name: 'Full name',
        email: 'Email',
        phone: 'Phone',
        content: 'Enquiry content',
        sendUrl: 'Submission URL',
        annex: 'Attachments',
        state: 'Status'
      },
      searchType: [
        {
          value: 1,
          label: 'Number'
        },
        {
          label: 'Customers',
          value: 2
        },
        {
          label: 'Form name',
          value: 3
        }
      ],
      recordOrderBy: [
        {
          label: 'Created, newest first',
          value: 'createTime-DESC'
        },
        {
          label: 'Created, oldest first',
          value: 'createTime-ASC'
        },
        {
          label: 'Customer, A–Z',
          value: 'clientName-ASC'
        },
        {
          label: 'Customer, Z–A',
          value: 'clientName-DESC'
        },
        {
          label: 'Form name, A–Z',
          value: 'formName-ASC'
        },
        {
          label: 'Form name, Z–A',
          value: 'formName-DESC'
        }
      ],
      recordState: [
        {
          label: 'Pending',
          value: 1,
          type: 'success'
        },
        {
          label: 'In progress',
          value: 2,
          type: 'warning'
        },
        {
          label: 'Processed',
          value: 3,
          type: 'info'
        },
        {
          label: 'Voided',
          value: 4,
          type: 'danger'
        },
        {
          label: 'On hold',
          value: 5,
          type: 'hold'
        }
      ]
    },
    recordDetails: {
      title: 'Enquiry details',
      change: 'Update status',
      userInfoLabel: {
        code: 'Number',
        form: 'Form',
        ip: 'IP',
        time: 'Time',
        state: 'Status',
        userSubmit: 'Enquiries and submissions'
      }
    },
    deviceTypeList: [
      {
        label: 'All devices',
        icon: 'fo-all_devices',
        value: ''
      },
      {
        label: 'Mobile',
        icon: 'el-icon-mobile-phone',
        value: 1
      },
      {
        label: 'Desktop',
        icon: 'el-icon-monitor',
        value: 2
      }
    ],
    email: {
      title: 'Recipient',
      description: 'Enquiry recipients',
      entity: {
        exists: 'This email address already exists'
      },
      update: {
        email: {
          label: 'Email',
          description: 'Email address',
          tips: '',
          placeholder: 'Email address',
          formatError: 'Invalid email address',
          required: 'Enter an email address'
        },
        userName: {
          label: 'Recipient',
          tips: '',
          placeholder: 'Recipient',
          required: "Enter the recipient's name",
          description: ''
        }
      }
    },
    form: {
      title: 'Enquiry',
      description: 'Enquiry forms',
      section: {
        source: {
          content: 'Enquiry content',
          heading: 'Enquiry sources',
          refTitle: 'Page title',
          refUrl: 'Page URL',
          userAgent: 'Browser information',
          user: 'Customer information'
        },
        record: {
          heading: 'Activity records'
        }
      },
      tableHeader: {
        buttonLabel: 'Submit button',
        remark: 'Form notes',
        title: 'Form name',
        updateTime: 'Updated at'
      },
      updateForm: {
        content: 'Form content',
        addForm: 'Add form',
        editForm: 'Edit form',
        info: 'Form information',
        fieldList: 'The form must include a required email, phone, or phone with country/region code field.',
        add: {
          button: 'Add field',
          normal: 'Common fields',
          custom: 'Custom field types',
          option: 'Add option'
        },
        entity: {
          title: {
            label: 'Name',
            tips: '',
            placeholder: 'Form name',
            required: 'Enter a form name',
            custom: ''
          },
          buttonLabel: {
            label: 'Button',
            tips: '',
            placeholder: 'Submit button text',
            required: 'Enter submit button text',
            custom: ''
          },
          remark: {
            label: 'Notes',
            tips: '',
            placeholder: 'Form notes',
            required: 'Enter form notes',
            custom: ''
          }
        },
        fieldType: {
          email: {
            label: 'Email',
            fieldLabel: 'Email',
            placeholder: 'Please enter email',
            required: true,
            filedType: 'email',
            quantity: 1,
            preset: true,
            custom: true
          },
          phone: {
            label: 'Phone',
            fieldLabel: 'Phone',
            placeholder: 'Please enter phone number',
            required: true,
            filedType: 'tel',
            quantity: 1,
            preset: true,
            custom: true
          },
          countryRegion: {
            label: 'Phone (with country/region code)',
            fieldLabel: 'Phone',
            placeholder: 'Please enter phone number',
            required: true,
            filedType: 'countryRegion',
            quantity: 1,
            preset: true,
            custom: true
          },
          lastName: {
            label: 'Last name',
            fieldLabel: 'Last name',
            placeholder: 'Please enter last name',
            required: false,
            filedType: 'text',
            quantity: 1,
            preset: true,
            custom: true
          },
          firstName: {
            label: 'First name',
            fieldLabel: 'First name',
            placeholder: 'Please enter first name',
            required: false,
            filedType: 'text',
            quantity: 1,
            preset: true,
            custom: true
          },
          company: {
            label: 'Company',
            fieldLabel: 'Company',
            placeholder: 'Please enter company name',
            required: false,
            filedType: 'text',
            quantity: 0,
            preset: true
          },
          position: {
            label: 'Job title',
            fieldLabel: 'Position',
            placeholder: 'Please enter position',
            required: false,
            filedType: 'text',
            quantity: 0,
            preset: true
          },
          message: {
            label: 'Message',
            fieldLabel: 'Message',
            placeholder: 'Enter your message',
            required: true,
            filedType: 'textarea',
            preset: true
          },
          address: {
            label: 'Address',
            fieldLabel: 'Address',
            placeholder: 'Please enter address',
            required: false,
            filedType: 'text',
            quantity: 0,
            preset: true
          },
          facebook: {
            label: 'Facebook',
            fieldLabel: 'Facebook',
            placeholder: 'Please enter Facebook ID',
            required: false,
            filedType: 'text',
            quantity: 0,
            preset: true
          },
          instagram: {
            label: 'Instagram',
            fieldLabel: 'Instagram',
            placeholder: 'Please enter Instagram ID',
            required: false,
            filedType: 'text',
            quantity: 0,
            preset: true
          },
          attachment: {
            label: 'Attachments',
            fieldLabel: 'Attachment',
            placeholder: 'Upload file',
            required: false,
            filedType: 'file',
            tips: {
              fileType: 'Allowed file types: rar/zip/jpg/png',
              quantity: 'Maximum attachments: 1',
              size: 'Maximum attachment size: 10 MB',
              notice: 'Attachments submitted by visitors count toward your storage usage'
            },
            quantity: 1,
            preset: true,
            custom: true
          },
          select: {
            label: 'Dropdown',
            fieldLabel: '',
            placeholder: 'Please select',
            required: false,
            filedType: 'select',
            quantity: 0,
            custom: true,
            options: []
          },
          checkbox: {
            label: 'Checkboxes',
            fieldLabel: '',
            placeholder: 'Please select',
            required: false,
            filedType: 'checkbox',
            quantity: 0,
            custom: true,
            options: []
          },
          radio: {
            label: 'Radio buttons',
            fieldLabel: '',
            placeholder: 'Please select',
            required: false,
            filedType: 'radio',
            quantity: 0,
            custom: true,
            options: []
          },
          text: {
            label: 'Single-line text',
            fieldLabel: '',
            placeholder: '',
            required: false,
            filedType: 'text',
            quantity: 0,
            custom: true
          },
          textarea: {
            label: 'Multiline text',
            fieldLabel: '',
            placeholder: '',
            required: false,
            filedType: 'textarea',
            quantity: 0,
            custom: true
          }
        },
        option: {
          label: 'Tags',
          value: 'Value',
          item: 'Options',
          default: 'Default'
        },
        field: {
          title: 'Title',
          required: 'Required',
          placeholder: 'Placeholder'
        }
      },
      paging: {
        empty: {
          content: 'Forms added to your website will appear here. You can edit and manage them here.',
          buttonLabel: 'Add form'
        }
      }
    }
  }
}
