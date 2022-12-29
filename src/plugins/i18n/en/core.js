export default {
  core: {
    title: '基础数据',
    appTypeList: [
      {
        label: 'Merchant',
        name: '商户运营平台',
        type: 1000
      },
      {
        label: 'Backstage',
        name: '系统运营平台',
        type: 3000
      },
      {
        label: 'Official',
        name: 'MyTask',
        type: 7000
      }
    ],
    base: {
      lang: {
        paging: {
          title: '语言',
          heading: '',
          subheading: '',
          add: '添加语言',
          empty: {
            content: '添加的语言会被列举在这里。您可以在这里管理所有语言，例如批量删除、修改等。',
            buttonLabel: '添加语言'
          },
          tableHeader: {
            aliCode: '阿里翻译代码',
            aliNo: '阿里翻译序号',
            code: '语言标识',
            icon: '图标',
            languageName: '标准名称',
            nativeName: '本地名称',
            state: '状态'
          }
        },
        update: {
          addTitle: '添加语言',
          updateTitle: '编辑语言',
          entity: {

            aliCode: {
              label: '阿里翻译代码',
              tips: '',
              placeholder: '阿里翻译代码',
              required: '请输入阿里翻译代码',
              custom: ''
            },
            aliNo: {
              label: '阿里翻译序号',
              tips: '',
              placeholder: '阿里翻译序号',
              required: '请输入阿里翻译序号',
              custom: ''
            },
            code: {
              label: '语言标识',
              tips: '',
              placeholder: '语言标识',
              required: '请输入语言标识',
              custom: ''
            },
            icon: {
              label: '图标',
              tips: '',
              placeholder: '图标',
              required: '请输入图标',
              custom: ''
            },
            languageName: {
              label: '标准名称',
              tips: '',
              placeholder: '标准名称',
              required: '请输入标准名称',
              custom: ''
            },
            nativeName: {
              label: '本地名称',
              tips: '',
              placeholder: '本地名称',
              required: '请输入本地名称',
              custom: ''
            },
            state: {
              label: '状态',
              tips: '',
              placeholder: '状态',
              required: '请输入状态',
              custom: ''
            }
          }
        }
      }
    },
    security: {
      paging: {
        title: '权限'
      },
      role: {
        title: '角色管理',
        empty: {
          content: '添加的角色会被列举在这里。您可以在这里管理所有角色，例如批量删除、修改等。',
          buttonLabel: '添加角色'
        },
        update: {
          addTitle: '添加角色',
          updateTitle: '编辑角色',
          selectAppType: '请选择appType',
          notAddRole: '平台角色管理已满',
          roleName: '超级管理员',
          entity: {
            functionAuthority: {
              label: '功能权限设置',
              tips: '',
              placeholder: '功能权限设置',
              required: '请选择功能权限'
            },
            dataAccess: {
              label: '数据权限',
              tips: '',
              placeholder: '0自己的,1本部门,2全部',
              required: '请输入0自己的,1本部门,2全部',
              custom: ''
            },
            isDelete: {
              label: '是否删除 0:未删除 1：已删除',
              tips: '',
              placeholder: '是否删除 0:未删除 1：已删除',
              required: '请输入是否删除 0:未删除 1：已删除',
              custom: ''
            },
            keepValue: {
              label: '保留客户最大值',
              tips: '',
              placeholder: '保留客户最大值',
              required: '请输入保留客户最大值',
              custom: ''
            },
            appTypeName: {
              label: '功能名称',
              tips: '',
              placeholder: '功能名称',
              required: '请选择入功能名称',
              custom: ''
            },
            roleName: {
              label: '角色名称',
              tips: '',
              placeholder: '角色名称',
              required: '请输入角色名称',
              custom: ''
            },
            roleRemark: {
              label: '角色描述',
              tips: '',
              placeholder: '角色描述',
              required: '请输入角色描述',
              custom: ''
            }
          }
        },
        delete: {
          msg: '删除角色{role},将导致关联的员工无法登录，确定删除吗?'
        },
        tableHeader: {
          roleName: '角色名称',
          roleRemark: '角色描述',
          keepValue: '保留客户最大值'
        }
      },
      function: {
        paging: {
          title: '应用功能'
        },
        update: {
          add: '添加一项',
          title: '编辑应用功能',
          saveSuccess: '保存成功',
          form: {
            functionName: 'functionName',
            functionCode: 'functionCode'
          }
        },
        delete: {
          deleteParent: '删除当前父级，连同子级？',
          deleteChild: '删除当前子级配置?'
        },
        tableHeader: {
          name: '功能名称',
          type: '代码',
          typeCode: '应用ID',
          role: '',
          mg: '系统角色'
        }
      }
    },
    bumeng: [
      {
        name: '自己的',
        type: '0'
      },
      {
        name: '本部门',
        type: '1'
      },
      {
        name: '全部',
        type: '2'
      }
    ],
    dictType: [
      {
        value: 'service_category',
        label: '服务商品类型',
        url: '/service/category',
        alias: 'service'
      }
    ],
    dict: {
      remark: {
        label: '备注',
        tips: '',
        placeholder: '备注',
        required: '请输入备注',
        custom: ''
      },
      sort: {
        label: '排序',
        tips: '',
        placeholder: '越大越前',
        required: '请输入排序',
        custom: ''
      },
      dicType: {
        label: '字典类型',
        tips: '',
        placeholder: '字典类型',
        required: '',
        custom: ''
      },
      title: {
        label: '名称',
        tips: '',
        placeholder: '请输入名称',
        required: '请输入名称',
        custom: ''
      }
    }
  },
  googleApi: {
    paging: {
      title: 'GOOGLE API KEY',
      heading: '',
      subheading: '',
      add: '添加GOOGLE API KEY',
      empty: {
        content: '添加的GOOGLE API KEY会被列举在这里。您可以在这里管理所有GOOGLE API KEY，例如批量删除、修改等。',
        buttonLabel: '添加GOOGLE API KEY'
      },
      tableHeader: {

        gamKey: 'GAM KEY',
        gmail: 'GMAIL',
        merchantId: '商户Id',
        quantity: '已绑定网站数量'
      }
    },
    update: {
      addTitle: '添加GOOGLE API KEY',
      updateTitle: '编辑GOOGLE API KEY',
      entity: {

        gamKey: {
          label: 'GAM KEY',
          tips: '',
          placeholder: 'GAM KEY',
          required: '请输入GAM KEY',
          custom: ''
        },
        gmail: {
          label: 'GMAIL',
          tips: '',
          placeholder: 'GMAIL',
          required: '请输入GMAIL',
          custom: ''
        },
        merchantId: {
          label: '商户Id',
          tips: '',
          placeholder: '商户Id',
          required: '请输入商户Id',
          custom: ''
        },
        quantity: {
          label: '已绑定网站数量',
          tips: '',
          placeholder: '已绑定网站数量',
          required: '请输入已绑定网站数量',
          custom: ''
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
          appType: {
            label: '场景',
            tips: '',
            placeholder: 'APP TYPE',
            required: '请输入APP TYPE',
            custom: ''
          },
          name: {
            label: '名称',
            tips: '',
            placeholder: '名称',
            required: '请输入名称',
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
