export default {
  passport: {
    logout: {
      title: 'Logout'
    },
    login: {
      pageTitle: '登录',
      title: '登录',
      registerTip: 'Create an account',
      forgetTip: '忘记密码 ?',
      button: '登录',
      tips: '助力企业 营销全球',
      noAccount: '没有帐号？',
      register: '立即注册',
      mine: '我的网站',
      logout: '退出登录',
      create: '创建一个新网站',
      other: '登录其它帐号',
      entity: {
        password: {
          label: '密码',
          placeholder: '密码（6-20位字母、数字或下划线）',
          required: '请输入密码'
        },
        account: {
          label: '帐号',
          placeholder: '手机 / 邮箱',
          required: '请输入帐号',
          custom: '请输入正确的手机或邮箱'
        }
      }
    },
    register: {
      pageTitle: '注册',
      haveAccount: '已有帐号？',
      login: '立即登录',
      getCode: '发送验证码',
      firstCode: '请先获取手机验证码',
      button: '注册',
      loginTips: '帐号已注册，',
      entity: {
        name: {
          label: '公司 / 个人名称',
          tips: '',
          placeholder: '公司 / 个人名称',
          required: '请输入公司 / 个人名称',
          custom: ''
        },
        firstName: {
          label: '名字',
          tips: '',
          placeholder: '名字',
          required: '请输入名字',
          custom: ''
        },
        lastName: {
          label: '姓氏',
          tips: '',
          placeholder: '姓氏',
          required: '请输入姓氏',
          custom: ''
        },
        password: {
          label: '密码',
          placeholder: '密码（6-20位字母、数字或下划线）',
          required: '请输入密码',
          custom: '密码格式为（6-20位字母、数字或下划线的组合）'
        },
        confirmPassword: {
          label: '确认密码',
          placeholder: '密码（6-20位字母、数字或下划线）',
          required: '请输入确认密码',
          custom: '两次密码不一样'
        },
        account: {
          label: '手机',
          placeholder: '请输入手机号',
          required: '请输入手机号',
          custom: '请输入有效的手机号',
          exists: '此手机号已被注册',
          validationFailed: '手机号验证失败'
        },
        captcha: {
          label: '验证码',
          placeholder: '请输入验证码',
          required: '请输入验证码',
          custom: '',
          tip: '数字运算结果'
        },
        mobile: {
          label: '手机',
          placeholder: '请输入手机号码',
          required: '请输入手机号码',
          custom: '请输入正确的手机号码'
        },
        code: {
          label: '手机验证码',
          placeholder: '请输入手机验证码',
          required: '请输入手机验证码',
          custom: '请先获取手机验证码'
        }
      },
      success: {
        heading: '注册成功',
        tips: '请使用电脑登录以下网址创建或管理您的网站'
      }
    }
  }
}
