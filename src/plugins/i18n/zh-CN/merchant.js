export default {
  merchant: {
    heading: '设置',
    menuList: [
      {
        title: '个人信息',
        abbr: '个人',
        submenu: [],
        icon: 'icon-shouye_o',
        // icon: 'fo-ico-wangzhanshezhi',
        url: '/account/personal',
        siteType: [2, 3, 4]
      },
      {
        title: '公司信息',
        abbr: '公司',
        submenu: [],
        icon: 'icon-zhexiantu_o',
        url: '/site/:siteId:/analytics/data',
        siteType: [2, 3, 4]
      }
      // {
      //   title: '询盘管理',
      //   abbr: '询盘',
      //   icon: '',
      //   url: '/site/:siteId:/enquiry',
      //   siteType: [2, 3, 4],
      //   submenu: [
      //     {
      //       title: '我的询盘',
      //       icon: 'icon-xiaoxi_o',
      //       url: '/site/:siteId:/enquiry',
      //       siteType: [2, 3, 4]
      //     },
      //     {
      //       title: '询盘表单',
      //       icon: 'icon-jieshaoxinxi_o',
      //       url: '/site/:siteId:/enquiry/form',
      //       siteType: [2, 3, 4]
      //     },
      //     {
      //       title: '收件邮箱',
      //       icon: 'icon-youjian_o',
      //       url: '/site/:siteId:/enquiry/email',
      //       siteType: [2, 3, 4]
      //     }
      //   ]
      // }
    ],
    welcome: '欢迎您：',
    manage: '管理您的信息、隐私和安全，让弗米乐更好地为您服务。',
    paging: {
      title: '公司信息'
    },
    corp: '公司信息',
    employeeState: [
      {
        value: 0,
        label: '正常'
      },
      {
        value: 1,
        label: '禁用'
      }
    ],
    personal: {
      title: '个人信息'
    },
    account: {
      dashboard: '管理首页'
    },
    update: {
      addTitle: '添加商户',
      updateTitle: '编辑商户',
      entity: {
        name: {
          label: '公司名',
          tips: '',
          placeholder: '公司名',
          required: '请输入公司名',
          custom: ''
        },
        shortForm: {
          label: '公司简称',
          tips: '',
          placeholder: '公司简称',
          required: '请输入公司简称',
          custom: ''
        },
        cityName: {
          label: '城市名称',
          tips: '',
          placeholder: '城市名称',
          required: '请选择城市名称',
          custom: ''
        },
        contact: {
          label: '联系人',
          tips: '',
          placeholder: '联系人',
          required: '请输入联系人',
          custom: ''
        },
        email: {
          label: '联系邮件',
          tips: '',
          placeholder: '联系邮件',
          required: '请输入联系邮件',
          custom: ''
        },
        phone: {
          label: '手机号码',
          tips: '',
          placeholder: '手机号码',
          required: '请输入手机号码',
          custom: '',
          formatError: '手机格式错误'
        },
        provinceName: {
          label: '省份名称',
          tips: '',
          placeholder: '省份名称',
          required: '请选择省份名称',
          custom: ''
        },
        address: {
          label: '公司地址',
          tips: '',
          placeholder: '公司地址',
          required: '请输入公司地址',
          custom: ''
        }
      }
    },
    password: {
      title: '修改密码',
      success: '密码修改成功，下次登录请用新密码',
      entity: {
        oldPass: {
          label: '原密码',
          placeholder: '当前登录密码',
          required: '请输入原密码'
        },
        newPass: {
          label: '新密码',
          placeholder: '新密码（6-20位字母、数字或下划线）',
          required: '请输入新密码/ 6-20位字母、数字或下划线'
        },
        checkPass: {
          label: '确认密码',
          placeholder: '再次输入新密码',
          required: '请再次输入密码',
          custom: '密码不一致'
        }
      }
    },
    /**
     * 员工管理
     */
    employee: {
      paging: {
        title: '员工管理',
        heading: '员工',
        subheading: '',
        add: '新增员工',
        empty: {
          content: '新增员工会被列举在这里。您可以在这里管理所有员工，例如批量删除、修改等。',
          buttonLabel: '新增员工'
        },
        tableHeader: {
          name: '姓名',
          roleName: '角色',
          departmentName: '部门',
          mobile: '手机/电话号码',
          email: '邮箱',
          keepValue: '保留客户最大值',
          state: '禁用',
          account: '登录帐号'
        },
        search: {
          label: '关键字搜索',
          placeholder: '输入员工名称关键字进行搜索'
        }
      },
      update: {
        addTitle: '添加员工',
        updateTitle: '编辑员工',
        entity: {
          avatar: {
            label: '头像',
            tips: '',
            placeholder: '',
            required: '',
            custom: ''
          },
          account: {
            label: '帐号',
            placeholder: '手机/邮箱',
            required: '请输入手机/邮箱',
            custom: '请输入正确的手机或邮箱',
            exists: '邮箱帐号不存在'
          },
          name: {
            label: '名字',
            tips: '',
            placeholder: '名字',
            required: '请输入名字',
            custom: ''
          },
          firstName: {
            label: '姓',
            tips: '',
            placeholder: '姓',
            required: '请输入姓',
            custom: ''
          },
          lastName: {
            label: '名',
            tips: '',
            placeholder: '名',
            required: '请输入名',
            custom: ''
          },
          role: {
            label: '角色',
            tips: '',
            placeholder: '角色',
            required: '请选择角色',
            custom: ''
          },
          email: {
            label: '邮箱地址',
            tips: '',
            placeholder: '请输入邮箱，将作为员工登录本系统的账号',
            required: '请输入邮箱地址',
            custom: ''
          },
          mobile: {
            label: '手机号码',
            tips: '',
            placeholder: '手机号码',
            required: '请输入手机号码',
            error: '手机号码错误',
            custom: ''
          },
          phone: {
            label: '电话',
            tips: '',
            placeholder: '请输入电话',
            required: '请输入电话',
            custom: ''
          },
          password: {
            label: '登录密码',
            placeholder: '密码（6-20位字母、数字或下划线）',
            required: '请输入密码',
            custom: '密码格式为（6-20位字母、数字或下划线的组合）'
          },
          passAgain: {
            label: '确认密码',
            placeholder: '确认密码',
            required: '请输入确认密码',
            custom: '两次密码不一样'
          },
          state: {
            label: '状态',
            tips: '',
            placeholder: '',
            required: '',
            custom: ''
          }
        },
        tips: [{
          content: '如果没输入登录密码，则默认为： 123456 请提醒员工尽快登录本系统修改密码'
        }]
      }
    },
    /**
     * 角色管理
     */
    role: {
      title: '角色功能',
      paging: {
        title: '角色管理',
        heading: '',
        subheading: '',
        add: '添加角色',
        empty: {
          content: '添加的角色会被列举在这里。您可以在这里管理所有角色，例如批量删除、修改等。',
          buttonLabel: '添加角色'
        },
        tableHeader: {
          roleName: '角色名称',
          roleRemark: '角色描述',
          keepValue: '保留客户最大值'
        }
      },
      update: {
        addTitle: '添加角色',
        updateTitle: '编辑角色',
        entity: {
          functionList: {
            label: '功能',
            tips: '',
            placeholder: '功能',
            required: '请选择功能权限'
          },
          roleRemark: {
            label: '备注',
            tips: '',
            placeholder: '角色的功能备注信息',
            required: '',
            custom: ''
          },
          roleName: {
            label: '角色名称',
            tips: '',
            placeholder: '角色名称',
            required: '请输入角色名称',
            custom: ''
          }
        }
      },
      delete: {
        msg: '删除角色{role},将导致关联的员工无法登录，确定删除吗?'
      }
    }
  }
}
