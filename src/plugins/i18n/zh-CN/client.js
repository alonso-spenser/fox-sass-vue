export default {
  client: {
    paging: {
      title: '客户'
    },
    orderBy: {
      createTimeDESC: '创建时间，新到旧',
      createTimeASC: '创建时间，旧到新',
      lastNameASC: '姓氏，A-Z',
      lastNameDESC: '姓氏，Z-A',
      firstNameASC: '名称，A-Z',
      firstNameDESC: '名称，Z-A'
    },
    searchType: {
      email: '邮箱',
      mobile: '电话',
      enquiry: '询盘编号',
      lastName: '姓氏',
      firstName: '名称'
    },
    tableHeader: {
      name: '姓名',
      enquires: '询盘数量',
      remark: '备注'
    },
    /**
     * 客户更新
     */
    update: {
      title: '客户详情',
      heading: '联系信息',
      tableHeader: {
        code: '编码',
        createTime: '提交时间',
        customer: '客户',
        form: '表单',
        terminal: '终端',
        state: '状态'
      },
      entity: {
        email: {
          label: '邮箱',
          tips: '',
          placeholder: '用户邮箱账号',
          required: '请输入用户邮箱账号',
          custom: ''
        },
        firstName: {
          label: '名',
          tips: '',
          placeholder: '名',
          required: '请输入名',
          custom: ''
        },
        lastName: {
          label: '姓',
          tips: '',
          placeholder: '姓',
          required: '请输入姓',
          custom: ''
        },
        mobile: {
          label: '电话',
          tips: '',
          placeholder: '用户手机账号',
          required: '请输入用户手机账号',
          custom: ''
        },
        remark: {
          label: '备注',
          tips: '',
          placeholder: '请输入内容',
          required: '请输入内容',
          custom: ''
        }
      }
    }
  }
}
