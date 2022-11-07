export default {
  merchant: {
    heading: 'Account',
    welcome: 'Welcome：',
    manage: 'Manage your info, privacy, and security to make US work better for you. ',
    paging: {
      title: 'Account'
    },
    password: {
      title: 'Change Password',
      success: 'The password has been changed successfully, please use the new password next time',
      tips: 'Change your password regularly to protect your account security',
      entity: {
        oldPass: {
          label: 'Old password',
          placeholder: 'Please enter the old password',
          required: 'Please enter the old password'
        },
        newPass: {
          label: 'New password',
          placeholder: 'New password（6-20 letters, numbers or underscores）',
          required: 'Please enter a new password'
        },
        checkPass: {
          label: 'Confirm password',
          placeholder: 'Please enter new password again',
          required: 'Please enter new password again',
          custom: 'Password does not match'
        }
      }
    },
    employeeState: [
      {
        value: 0,
        label: 'Normal'
      },
      {
        value: 1,
        label: 'Disable'
      }
    ],
    /**
     * 员工管理
     */
    employee: {
      heading: 'Employee',
      title: 'Employees',
      tips: 'Administrator accounts and permissions allow different employees to manage different website information.',
      paging: {
        title: 'Employee management',
        heading: 'Employees',
        subheading: '',
        add: 'Add new employee',
        empty: {
          content: '新增员工会被列举在这里。您可以在这里管理所有员工，例如批量删除、修改等。',
          buttonLabel: '新增员工'
        },
        tableHeader: {
          name: 'Name',
          roleName: 'Role',
          departmentName: 'Department',
          mobile: 'Mobile',
          email: 'Employee',
          state: 'State',
          account: 'Account'
        },
        search: {
          label: '关键字搜索',
          placeholder: '输入员工名称关键字进行搜索'
        }
      },
      update: {
        addTitle: 'Add new employee',
        updateTitle: 'Edit employee information',
        entity: {
          account: {
            label: 'Email',
            placeholder: 'Email address',
            required: 'Please enter a valid email address',
            custom: '',
            exists: 'Email address does not exists'
          },
          firstName: {
            label: 'First Name',
            tips: '',
            placeholder: 'First Name',
            required: 'Please enter first name',
            custom: ''
          },
          lastName: {
            label: 'Last Name',
            tips: '',
            placeholder: 'Last Name',
            required: 'Please enter last name',
            custom: ''
          },
          email: {
            label: 'Email',
            tips: '',
            placeholder: 'Email address',
            required: 'Please enter email address',
            custom: ''
          },
          avatar: {
            label: 'Profile picture',
            tips: '',
            placeholder: 'Profile picture',
            required: '',
            custom: ''
          },
          role: {
            label: 'Role',
            tips: '',
            placeholder: 'Role',
            required: 'Please select an role',
            custom: ''
          },
          mobile: {
            label: 'Cellphone',
            tips: '',
            placeholder: 'Please enter a cellphone',
            required: 'Please enter a cellphone',
            error: '',
            custom: ''
          },
          phone: {
            label: 'Phone',
            tips: '',
            placeholder: 'Please enter a phone',
            required: 'Please enter a phone',
            custom: ''
          },
          password: {
            label: 'New password',
            placeholder: 'New password（6-20 letters, numbers or underscores）',
            required: 'Please enter a new password'
          },
          passAgain: {
            label: 'Confirm password',
            placeholder: 'Please enter new password again',
            required: 'Please enter new password again',
            custom: 'Password does not match'
          },
          state: {
            label: 'State',
            tips: '',
            placeholder: '',
            required: '',
            custom: ''
          }
        },
        tips: [{
          content: 'If password is empty, the default is: 123456'
        }]
      }
    },
    /**
     * 角色管理
     */
    role: {
      title: 'Role',
      tableHeader: {
        roleName: 'Role name',
        roleRemark: 'Description'
      },
      empty: {
        content: '添加的角色会被列举在这里。您可以在这里管理所有角色，例如批量删除、修改等。',
        buttonLabel: 'Add role'
      },
      update: {
        addTitle: 'Add role',
        updateTitle: 'Edit role',
        entity: {
          functionList: {
            label: 'Function list',
            tips: '',
            placeholder: 'function list',
            required: 'Function list'
          },
          isDelete: {
            label: '是否删除 0:未删除 1：已删除',
            tips: '',
            placeholder: '是否删除 0:未删除 1：已删除',
            required: '请输入是否删除 0:未删除 1：已删除',
            custom: ''
          },
          roleName: {
            label: 'Role name',
            tips: '',
            placeholder: 'Role name',
            required: 'Please enter an role name',
            custom: ''
          },
          roleRemark: {
            label: 'Description',
            tips: '',
            placeholder: 'Description',
            required: 'Please enter an role description',
            custom: ''
          }
        }
      },
      delete: {
        msg: 'Delete role [ {role} ] will let employee can\'t be login ，Are you sure?'
      }
    },
    personal: {
      title: 'Personal profile'
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
    }
  }
}
