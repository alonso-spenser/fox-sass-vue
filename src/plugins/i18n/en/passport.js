export default {
  passport: {
    logout: {
      title: 'Sign out'
    },
    login: {
      pageTitle: 'Sign in',
      title: 'Sign in',
      forgetTip: 'Forgot password?',
      button: 'Sign in',
      tips: 'Continue managing your website',
      ops: 'Operations center',
      noAccount: "Don't have an account?",
      register: 'Register now',
      mine: 'My websites',
      logout: 'Sign out',
      create: 'Create a website',
      other: 'Sign in to another account',
      entity: {
        password: {
          label: 'Password',
          placeholder: 'Password',
          required: 'Enter a password'
        },
        account: {
          label: 'Account',
          placeholder: 'Mobile number / email address',
          required: 'Enter your account',
          custom: ''
        }
      }
    },
    register: {
      pageTitle: 'Create an account',
      haveAccount: 'Already have an account?',
      login: 'Sign in now',
      h1: 'Register now',
      tips: 'Try the SaaS platform, create a website for free, and start your business journey',
      getCode: 'Get verification code',
      firstCode: 'Get a verification code first',
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
          placeholder: 'Your first name',
          required: 'Enter your first name',
          custom: ''
        },
        lastName: {
          label: 'Last name',
          tips: '',
          placeholder: 'Your last name',
          required: 'Enter your last name',
          custom: ''
        },
        password: {
          label: 'Password',
          placeholder: '6–20 letters, numbers, or underscores',
          required: 'Enter a password',
          custom: 'Invalid password format'
        },
        confirmPassword: {
          label: 'Confirm new password',
          placeholder: 'Enter a new password',
          required: 'Enter a new password',
          custom: 'The passwords do not match'
        },
        account: {
          label: 'Email',
          placeholder: 'Email address',
          required: 'Enter an email address',
          custom: 'Invalid email address',
          exists: 'This email address is already registered. Use another address or sign in.',
          validationFailed: 'Email verification failed'
        },
        code: {
          label: 'Verification code',
          placeholder: 'Get a verification code first',
          required: 'Enter the verification code',
          custom: 'Get a verification code first'
        }
      },
      success: {
        heading: 'Registration successful',
        tips: 'Open the following website on a desktop computer to create or manage your website'
      }
    },
    forget: {
      pageTitle: 'Forgot password',
      nextStep: 'Next',
      tips: 'Enter an email address',
      entity: {
        account: {
          label: 'Email',
          placeholder: 'Email address',
          required: 'Enter an email address',
          custom: 'Invalid email address',
          exists: 'No account found for this email address'
        }
      }
    },
    reset: {
      pageTitle: 'Reset password',
      success: 'Password changed. Sign in again.',
      entity: {
        password: {
          label: 'New password',
          placeholder: '6–20 letters, numbers, or underscores',
          required: 'Enter a password',
          custom: 'Use 6–20 letters, numbers, or underscores'
        },
        passAgain: {
          label: 'Confirm password',
          placeholder: 'Confirm password',
          required: 'Confirm your password',
          custom: 'The passwords do not match'
        }
      }
    },
    emailSendSuccess: {
      pageTitle: 'Email sent successfully',
      h1: 'Email sent',
      tips: 'We have sent an email with a password reset link to {email}',
      p: 'The email may take a few minutes to arrive. Click the link in the email to reset your password. The link expires 10 minutes after the email is sent.',
      p1: 'If you have not received the email',
      p2: '• Check your spam folder',
      p3: '• Check your email address for typos',
      resend: 'Resend',
      login: 'Back to sign in'
    },
    codeExpired: {
      pageTitle: 'This link has expired',
      tips: 'This link has expired. Click Resend to request a new password reset link.'
    }
  }
}
