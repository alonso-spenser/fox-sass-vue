export default {
  settings: {
    taskType: {
      paging: {
        title: 'Task type',
        heading: '',
        subheading: '',
        add: 'Add task type',
        empty: {
          content: 'Task type empty',
          buttonLabel: 'Add task type'
        },
        tableHeader: {
          clientAudit: 'Client audit',
          enName: 'English name',
          name: 'Chinese name',
          tag: 'TAG',
          projectName: 'System project name'
        }
      },
      update: {
        addTitle: 'Add task type',
        updateTitle: 'Edit task type',
        entity: {
          clientAudit: {
            label: 'Client audit',
            tips: '',
            placeholder: 'Client audit',
            required: '',
            custom: ''
          },
          enName: {
            label: 'English name',
            tips: '',
            placeholder: 'English name',
            required: 'Please enter english name',
            custom: ''
          },
          name: {
            label: 'Chinese name',
            tips: '',
            placeholder: 'Chinese name',
            required: 'Please enter chinese name',
            custom: ''
          },
          tag: {
            label: 'TAG',
            tips: '',
            placeholder: 'TAG',
            required: 'Please enter tag',
            custom: ''
          }
        }
      }
    },
    cost: {
      paging: {
        title: 'Pricing scheme',
        heading: '',
        subheading: '',
        add: 'Add pricing scheme',
        empty: {
          content: 'Pricing scheme empty',
          buttonLabel: 'Add pricing scheme'
        },
        tableHeader: {
          name: 'Name',
          level: 'Content quality',
          currency: 'Currency',
          maxPrice: 'Price range',
          price: 'Price',
          remark: 'Remark',
          wordage: 'Wordage'
        }
      },
      update: {
        addTitle: 'Add pricing scheme',
        updateTitle: 'Edit pricing scheme',
        entity: {
          taskTypeId: {
            label: 'Task type',
            tips: '',
            placeholder: 'Task type',
            required: 'Please select task type',
            custom: ''
          },
          currency: {
            label: 'Currency code',
            tips: '',
            placeholder: 'Currency code',
            required: 'Please enter currency code',
            custom: ''
          },
          enRemark: {
            label: 'English remark',
            tips: '',
            placeholder: 'English remark',
            required: 'Please enter English remark',
            custom: ''
          },
          level: {
            label: 'Content quality',
            tips: '',
            placeholder: 'Content quality',
            required: 'Please enter content quality',
            custom: ''
          },
          maxPrice: {
            label: 'Max price',
            tips: '',
            placeholder: 'Max price',
            required: 'Please enter max price',
            custom: ''
          },
          minPrice: {
            label: 'Min price',
            tips: '',
            placeholder: 'Min price',
            required: 'Please enter min price',
            custom: ''
          },
          price: {
            label: 'Default settlement price',
            tips: '',
            placeholder: 'Default settlement price',
            required: 'Please enter default settlement price',
            custom: ''
          },
          remark: {
            label: 'Chinese remark',
            tips: '',
            placeholder: 'Chinese remark',
            required: 'Please enter chinese remark',
            custom: ''
          },
          wordage: {
            label: 'Wordage',
            tips: '',
            placeholder: 'Wordage',
            required: 'Please enter Wordage',
            custom: ''
          }
        }
      }
    }
  },
  audit: {
    project: {
      paging: {
        title: '审批流程配置',
        heading: '',
        subheading: '',
        add: '添加审批流程配置',
        empty: {
          content: '添加的审批流程配置会被列举在这里。您可以在这里管理所有审批流程配置，例如批量删除、修改等。',
          buttonLabel: '添加审批流程配置'
        },
        tableHeader: {
          name: '名称',
          tag: 'TAG'
        }
      },
      update: {
        addTitle: '添加审批流程配置',
        updateTitle: '编辑审批流程配置',
        entity: {
          name: {
            label: '名称',
            tips: '',
            placeholder: '名称',
            required: '请输入名称',
            custom: ''
          },
          enName: {
            label: '英文名称',
            tips: '',
            placeholder: '英文名称',
            required: '请输入英文名称',
            custom: ''
          },
          tag: {
            label: 'TAG',
            tips: '',
            placeholder: 'TAG',
            required: '请输入TAG',
            custom: ''
          }
        }
      }
    },
    config: {
      paging: {
        title: '审批流程配置',
        heading: '',
        subheading: '',
        add: '添加审批流程配置',
        empty: {
          content: '添加的审批流程配置会被列举在这里。您可以在这里管理所有审批流程配置，例如批量删除、修改等。',
          buttonLabel: '添加审批流程配置'
        },
        tableHeader: {
          agentId: '代理商ID',
          goodsId: '代理商产品id',
          goodsName: '代理商产品id',
          name: '名称',
          serviceGoodsId: '系统产品ID',
          tag: 'TAG'
        }
      },
      update: {
        addTitle: '添加审批流程配置',
        updateTitle: '编辑审批流程配置',
        entity: {

          agentId: {
            label: '代理商ID',
            tips: '',
            placeholder: '代理商ID',
            required: '请输入代理商ID',
            custom: ''
          },
          goodsId: {
            label: '代理商产品id',
            tips: '',
            placeholder: '代理商产品id',
            required: '请输入代理商产品id',
            custom: ''
          },
          goodsName: {
            label: '代理商产品id',
            tips: '',
            placeholder: '代理商产品id',
            required: '请输入代理商产品id',
            custom: ''
          },
          name: {
            label: '名称',
            tips: '',
            placeholder: '名称',
            required: '请输入名称',
            custom: ''
          },
          serviceGoodsId: {
            label: '系统产品ID',
            tips: '',
            placeholder: '系统产品ID',
            required: '请输入系统产品ID',
            custom: ''
          },
          tag: {
            label: 'TAG',
            tips: '',
            placeholder: 'TAG',
            required: '请输入TAG',
            custom: ''
          }
        }
      }
    }
  }
}
