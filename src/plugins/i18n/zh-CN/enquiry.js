export default {
  enquiry: {
    /**
     * pane nav
     */
    tabPane: [
      {
        label: '我的询盘',
        name: 'enquiry-record',
        service: false
      },
      // {
      //   label: '询盘分析',
      //   name: 'enquiry-dashboard'
      // },
      {
        label: '询盘邮件',
        name: 'enquiry-email',
        service: true
      }, {
        label: '询盘表单',
        name: 'enquiry-form',
        service: true
      }
    ],
    /**
     * 详情
     */
    paging: {
      title: '询盘管理'
    },
    export: '导出',
    all: '全选',
    /**
     * 我的询盘记录
     */
    record: {
      title: '询盘',
      description: '询盘记录',
      export: '导出',
      clearAllFilter: '清空全部条件',
      tableHeader: {
        createTime: '时间',
        country: '国家',
        Name: '姓名',
        email: '邮件',
        phone: '电话',
        content: '询盘内容',
        sendUrl: '发送地址',
        annex: '附件',
        state: '状态'
      },
      /**
       *  搜索类型
       */
      searchType: [
        {
          value: 1,
          label: '编号'
        }, {
          label: '客户',
          value: 2
        }, {
          label: '表单名称',
          value: 3
        }
      ],
      /**
       * 排序
       */
      recordOrderBy: [{
        label: '创建时间，新到旧',
        value: 'createTime-DESC'
      },
      {
        label: '创建时间，旧到新',
        value: 'createTime-ASC'
      },
      {
        label: '客户，A-Z',
        value: 'clientName-ASC'
      },
      {
        label: '客户，Z-A',
        value: 'clientName-DESC'
      },
      {
        label: '表单名称，A-Z',
        value: 'formName-ASC'
      },
      {
        label: '表单名称，Z-A',
        value: 'formName-DESC'
      }],

      /**
       * 轮盘查询状态
       */
      recordState: [
        {
          label: '待处理',
          value: 1,
          type: 'success'
        },
        {
          label: '处理中',
          value: 2,
          type: 'warning'
        },
        {
          label: '已处理',
          value: 3,
          type: 'info'
        },
        {
          label: '已作废',
          value: 4,
          type: 'danger'
        },
        {
          label: '挂起',
          value: 5,
          type: 'hold'
        }
      ]
    },
    /**
     *  询盘详情
     */
    recordDetails: {
      title: '询盘详情',
      change: '更新状态',
      userInfoLabel: {
        code: '编号',
        form: '表单',
        ip: 'IP',
        time: '时间',
        state: '状态',
        userSubmit: '询盘与提交数量'
      }
    },
    /**
     * 设备类型列表
     */
    deviceTypeList: [{
      label: '所有设备',
      icon: 'fo-all_devices',
      value: ''
    },
    {
      label: '移动端',
      icon: 'el-icon-mobile-phone',
      value: 1
    },
    {
      label: 'PC端',
      icon: 'el-icon-monitor',
      value: 2
    }],
    /**
     * 询盘邮件
     */
    email: {
      title: '收件人',
      description: '询盘收件人',
      entity: {
        exists: '邮件已存在'
      },
      update: {
        email: {
          label: '邮件',
          description: '邮件地址',
          tips: '',
          placeholder: '邮件地址',
          formatError: '邮件格式错误',
          required: '请输入邮件地址'
        },
        userName: {
          label: '收件人',
          tips: '',
          placeholder: '收件人',
          required: '请输入收件人名'
        }
      }
    },

    /**
     * 询盘表单
     */
    form: {
      title: '询盘',
      description: '询盘表单',
      section: {
        source: {
          content: '询盘内容',
          heading: '询盘来源',
          refTitle: '页面标题',
          refUrl: '页面地址',
          userAgent: '浏览器信息',
          user: '客户信息'
        },
        record: {
          heading: '处理记录'
        }
      },
      tableHeader: {
        buttonLabel: '提交按钮',
        remark: '表单备注',
        title: '表单名称',
        updateTime: '更新时间'
      },
      // 更新表单 && 添加表单
      updateForm: {
        content: '表单内容',
        addForm: '添加表单',
        editForm: '编辑表单',
        info: '表单信息',
        fieldList: '表单中表必包含：邮件 或 电话 或 电话(含国家/区域代码)，且为"必填"',
        add: {
          button: '添加字段',
          normal: '常用输入项',
          custom: '自定义类型',
          option: '添加选项'
        },
        entity: {
          title: {
            label: '名称',
            tips: '',
            placeholder: '表单名称',
            required: '请输入表单名称',
            custom: ''
          },
          buttonLabel: {
            label: '按钮',
            tips: '',
            placeholder: '提交按钮文本',
            required: '请输入提交按钮文本',
            custom: ''
          },
          remark: {
            label: '备注',
            tips: '',
            placeholder: '表单备注',
            required: '请输入表单备注',
            custom: ''
          }
        },
        fieldType: {
          email: {
            label: '邮件',
            fieldLabel: 'Email',
            placeholder: 'Please enter email',
            required: true,
            filedType: 'email',
            quantity: 1,
            preset: true,
            custom: true
          },
          phone: {
            label: '电话',
            fieldLabel: 'Phone',
            placeholder: 'Please enter phone number',
            required: true,
            filedType: 'tel',
            quantity: 1,
            preset: true,
            custom: true
          },
          countryRegion: {
            label: '电话(含国家/区域代码)',
            fieldLabel: 'Phone',
            placeholder: 'Please enter phone number',
            required: true,
            filedType: 'countryRegion',
            quantity: 1,
            preset: true,
            custom: true
          },
          lastName: {
            label: '姓',
            fieldLabel: 'Last name',
            placeholder: 'Please enter last name',
            required: false,
            filedType: 'text',
            quantity: 1,
            preset: true,
            custom: true
          },
          firstName: {
            label: '名字',
            fieldLabel: 'First name',
            placeholder: 'Please enter first name',
            required: false,
            filedType: 'text',
            quantity: 1,
            preset: true,
            custom: true
          },
          company: {
            label: '公司',
            fieldLabel: 'Company',
            placeholder: 'Please enter company name',
            required: false,
            filedType: 'text',
            quantity: 0,
            preset: true
          },
          position: {
            label: '职位',
            fieldLabel: 'Position',
            placeholder: 'Please enter position',
            required: false,
            filedType: 'text',
            quantity: 0,
            preset: true
          },
          message: {
            label: '消息内容',
            fieldLabel: 'Message',
            placeholder: 'Please tell us the message',
            required: true,
            filedType: 'textarea',
            preset: true
          },
          address: {
            label: '地址',
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
            label: '附件',
            fieldLabel: 'Attachment',
            placeholder: 'Upload file',
            required: false,
            filedType: 'file',
            tips: {
              fileType: '附件类型：rar/zip/jpg/png',
              quantity: '附件数量：1',
              size: '附件最大容量：10MB',
              notice: '注意：访客提交的附件会占用您的文件空间'
            },
            quantity: 1,
            preset: true,
            custom: true
          },
          // number: {
          //   label: '数字',
          //   fieldLabel: 'Number',
          //   placeholder: '',
          //   required: false,
          //   filedType: 'number',
          //   quantity: 0,
          //   custom: true
          // },
          select: {
            label: '下拉框',
            fieldLabel: '',
            placeholder: 'Please select',
            required: false,
            filedType: 'select',
            quantity: 0,
            custom: true,
            options: []
          },
          checkbox: {
            label: '多选框',
            fieldLabel: '',
            placeholder: 'Please select',
            required: false,
            filedType: 'checkbox',
            quantity: 0,
            custom: true,
            options: []
          },
          radio: {
            label: '单选框',
            fieldLabel: '',
            placeholder: 'Please select',
            required: false,
            filedType: 'radio',
            quantity: 0,
            custom: true,
            options: []
          },
          text: {
            label: '单行文本',
            fieldLabel: '',
            placeholder: '',
            required: false,
            filedType: 'text',
            quantity: 0,
            custom: true
          },
          textarea: {
            label: '多行行文本',
            fieldLabel: '',
            placeholder: '',
            required: false,
            filedType: 'textarea',
            quantity: 0,
            custom: true
          }
        },
        option: {
          label: '标签',
          value: '值',
          item: '选项',
          default: '默认'
        },
        field: {
          title: '标题',
          required: '必填',
          placeholder: '背景提示语'
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
