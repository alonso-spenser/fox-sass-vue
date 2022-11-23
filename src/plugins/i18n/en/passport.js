export default {
  passport: {
    logout: {
      title: 'Logout'
    },
    login: {
      pageTitle: 'Sign in',
      title: 'Sign in',
      registerTip: 'Create an account',
      forgetTip: 'Forgot password?',
      button: 'Sign in',
      tips: 'Continue to MySite',
      noAccount: 'New to MySite?',
      register: 'Get started',
      mine: '我的网站',
      logout: 'log out',
      create: '创建一个新网站',
      other: '登录其它帐号',
      entity: {
        password: {
          label: 'Password',
          placeholder: 'Password',
          required: 'Please enter a password.'
        },
        account: {
          label: 'Account',
          placeholder: 'Email',
          required: 'Please enter your account',
          custom: 'Please enter the correct email address'
        }
      }
    },
    register: {
      pageTitle: 'Create A ID',
      haveAccount: 'Already have a ID？',
      login: 'Log in',
      h1: 'Create ID',
      tips: 'One last step before starting your free trial.',
      getCode: 'Get A Code',
      firstCode: 'Please get a code first',
      button: 'Register',
      loginTips: 'Email has already been taken.',
      entity: {
        name: {
          label: 'Company / Studio Name',
          tips: '',
          placeholder: 'Company / Studio Name',
          required: 'Please enter Company / Studio Name',
          custom: ''
        },
        firstName: {
          label: 'First name',
          tips: '',
          placeholder: 'First name',
          required: 'Please enter first name',
          custom: ''
        },
        lastName: {
          label: 'Last name',
          tips: '',
          placeholder: 'Last name',
          required: 'Please enter last name',
          custom: ''
        },
        password: {
          label: 'Password',
          placeholder: 'Password(6-20 digit,numbers or underscores)',
          required: 'Please enter Password',
          custom: 'Password format error'
        },
        confirmPassword: {
          label: 'Confirm new password',
          placeholder: 'Confirm new password',
          required: 'Please enter password',
          custom: 'Password confirmation does not match.'
        },
        account: {
          label: 'Email',
          placeholder: 'Please enter email',
          required: 'Please enter email',
          custom: 'Email format error',
          exists: 'Email has already been taken.',
          validationFailed: '手机号验证失败'
        },
        captcha: {
          label: '验证码',
          placeholder: 'Please enter验证码',
          required: 'Please enter验证码',
          custom: '',
          tip: '数字运算结果'
        },
        code: {
          label: 'Verification Code',
          placeholder: 'Verification Code',
          required: 'Please enter verification Code',
          custom: 'Please get a code first'
        }
      },
      success: {
        heading: 'Register was successful',
        tips: '请使用电脑登录以下网址创建或管理您的网站'
      }
    },
    forget: {
      pageTitle: 'Forgot Password',
      nextStep: 'Next',
      tips: 'Please enter your email',
      entity: {
        account: {
          label: 'Email',
          placeholder: 'Email',
          required: 'Please enter your email',
          custom: 'Email format error',
          exists: 'Sorry, we could not find your account.'
        }
      }
    },
    reset: {
      pageTitle: 'Reset Password',
      success: 'Reset succeeded, please login again',
      entity: {
        password: {
          label: 'Password',
          placeholder: 'Password(6-20 digit,numbers or underscores)',
          required: 'Please enter Password',
          custom: 'Password format error'
        },
        passAgain: {
          label: 'Confirm new password',
          placeholder: 'Confirm new password',
          required: 'Please enter password',
          custom: 'Password confirmation does not match.'
        }
      }
    },
    codeExpired: {
      pageTitle: 'Link has expired',
      tips: 'This link has expired, please click to resend'
    },
    emailSendSuccess: {
      pageTitle: 'Rest password mail has been sent.',
      h1: 'The reset mail has been sent. ',
      tips: 'We have sent your email {email} with a link to reset your password.',
      p: 'This may take several minutes, please be patient. After you receive the email, please click the link in the email to complete the password reset. The link is valid for 24 hours from the time you send the email. Please click the link within the valid time.',
      p1: 'If you did not receive an email:',
      p2: '• Please check your junk mailbox',
      p3: '• Please check your email address',
      resend: 'Resend',
      login: 'Back to Login'
    }
  }
}
