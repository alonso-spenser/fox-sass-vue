export default {
  enquiry: {
    /**
     * pane nav
     */
    tabPane: [
      {
        label: 'My inquiry',
        name: 'enquiry-record',
        service: false
      },
      {
        label: 'Recipients',
        name: 'enquiry-email',
        service: true
      }, {
        label: 'Form',
        name: 'enquiry-form',
        service: true
      }
    ],
    /**
     * 详情
     */
    paging: {
      title: 'Inquiry management'
    },
    export: 'Export',
    all: 'All',
    /**
     * 我的询盘记录
     */
    record: {
      title: 'Inquiry',
      description: 'Inquiry record',
      export: 'Export',
      clearAllFilter: 'Clean up',
      tableHeader: {
        createTime: 'Time',
        country: 'Country/Region',
        Name: 'Name',
        email: 'Email',
        phone: 'Phone',
        content: 'Content',
        sendUrl: 'URL',
        state: 'State',
        annex: 'Annex'
      },
      /**
       *  搜索类型
       */
      searchType: [
        {
          value: 1,
          label: 'NO.'
        }, {
          label: 'Client',
          value: 2
        }, {
          label: 'Form',
          value: 3
        }
      ],
      /**
       * 排序
       */
      recordOrderBy: [{
        label: 'CreateTime，DESC',
        value: 'createTime-DESC'
      },
      {
        label: 'CreateTime，ASC',
        value: 'createTime-ASC'
      },
      {
        label: 'ClientName，A-Z',
        value: 'clientName-ASC'
      },
      {
        label: 'ClientName，Z-A',
        value: 'clientName-DESC'
      },
      {
        label: 'FormName，A-Z',
        value: 'formName-ASC'
      },
      {
        label: 'FormName，Z-A',
        value: 'formName-DESC'
      }],

      /**
       * 轮盘查询状态
       */
      recordState: [
        {
          label: 'Pending',
          value: 1,
          type: 'success'
        },
        {
          label: 'Processing',
          value: 2,
          type: 'warning'
        },
        {
          label: 'Processed',
          value: 3,
          type: 'info'
        },
        {
          label: 'Abolished',
          value: 4,
          type: 'danger'
        },
        {
          label: 'Hang up',
          value: 5,
          type: 'hold'
        }
      ]
    },
    /**
     *  询盘详情
     */
    recordDetails: {
      title: 'Inquiry detail',
      change: 'Change state',
      userInfoLabel: {
        code: 'ID.',
        form: 'Form',
        ip: 'IP',
        time: 'Time',
        state: 'State',
        userSubmit: 'Inquiry quantity'
      }
    },
    /**
     * 设备类型列表
     */
    deviceTypeList: [{
      label: 'All',
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
    }],
    /**
     * 询盘邮箱
     */
    email: {
      title: 'Recipients',
      description: 'Enquiry recipient',
      entity: {
        exists: 'Recipients already exists'
      },
      update: {
        email: {
          label: 'Email',
          description: 'E-mail address',
          placeholder: 'Email',
          formatError: 'E-mail format error',
          required: 'Please input a email address'
        },
        userName: {
          label: 'Recipient',
          description: '',
          placeholder: 'Recipient',
          required: 'Please enter recipient'
        }
      }
    },
    /**
     * 询盘表单
     */
    form: {
      title: 'Form',
      description: 'Inquiry form',
      section: {
        source: {
          content: 'Content',
          heading: 'Source',
          refTitle: 'Title',
          refUrl: 'URL',
          userAgent: 'Browser',
          user: 'Client info'
        },
        record: {
          heading: 'Records'
        }
      },
      tableHeader: {
        buttonLabel: 'Button label',
        remark: 'Remark',
        title: 'Form name',
        updateTime: 'Update time'
      },
      // 更新表单 && 添加表单
      updateForm: {
        content: 'Form content',
        addForm: 'Add Form',
        editForm: 'Edit Form',
        info: 'Form information',
        fieldList: 'The form must contain: mail or phone or phone (including country/area code), and it is "required"',
        add: {
          button: 'Add Field',
          normal: 'Generic',
          custom: 'Customize',
          option: 'Add option'
        },
        entity: {
          title: {
            label: 'Name',
            tips: '',
            placeholder: 'Form name',
            required: 'Please enter a form name',
            custom: ''
          },
          buttonLabel: {
            label: 'Button',
            tips: '',
            placeholder: 'Button label',
            required: 'Please enter button label',
            custom: ''
          },
          remark: {
            label: 'Description',
            tips: '',
            placeholder: 'Form description',
            required: 'Please enter description',
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
            label: 'Phone(Include Country/Region code)',
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
            label: 'Position',
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
            placeholder: 'Please tell us the message',
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
            label: 'Attachment',
            fieldLabel: 'Attachment',
            placeholder: 'Upload file',
            required: false,
            filedType: 'file',
            tips: {
              fileType: 'Type：rar/zip/jpg/png',
              quantity: 'Quantity：1',
              size: 'Limit：10MB',
              notice: 'Note: Guest-submitted attachments take up space in your file'
            },
            quantity: 1,
            preset: true,
            custom: true
          },
          select: {
            label: 'Select',
            fieldLabel: '',
            placeholder: 'Please select',
            required: false,
            filedType: 'select',
            quantity: 0,
            custom: true,
            options: []
          },
          checkbox: {
            label: 'Checkbox',
            fieldLabel: '',
            placeholder: 'Please select',
            required: false,
            filedType: 'checkbox',
            quantity: 0,
            custom: true,
            options: []
          },
          radio: {
            label: 'Radio',
            fieldLabel: '',
            placeholder: 'Please select',
            required: false,
            filedType: 'radio',
            quantity: 0,
            custom: true,
            options: []
          },
          text: {
            label: 'Text',
            fieldLabel: '',
            placeholder: '',
            required: false,
            filedType: 'text',
            quantity: 0,
            custom: true
          },
          textarea: {
            label: 'Textarea',
            fieldLabel: '',
            placeholder: '',
            required: false,
            filedType: 'textarea',
            quantity: 0,
            custom: true
          }
        },
        option: {
          label: 'Label',
          value: 'Value',
          item: 'Option',
          default: 'Default'
        },
        field: {
          title: 'Name',
          required: 'Required',
          placeholder: 'Placeholder'
        }
      },
      paging: {
        empty: {
          content: '添加到网站中的表单会被列举在这里。您可以在这里管理所有表单，例如编辑修改。',
          buttonLabel: '添加表单'
        }
      }
    }
  }
}
