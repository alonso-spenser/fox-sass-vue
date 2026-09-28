export default {
  client: {
    paging: {
      title: 'Customers'
    },
    orderBy: {
      createTimeDESC: 'Created, newest first',
      createTimeASC: 'Created, oldest first',
      lastNameASC: 'Last name, A–Z',
      lastNameDESC: 'Last name, Z–A',
      firstNameASC: 'Name, A–Z',
      firstNameDESC: 'Name, Z–A'
    },
    searchType: {
      email: 'Email',
      mobile: 'Phone',
      enquiry: 'Enquiry number',
      lastName: 'Last name',
      firstName: 'Name'
    },
    tableHeader: {
      name: 'Full name',
      enquires: 'Enquiries',
      remark: 'Notes'
    },
    update: {
      title: 'Customer details',
      heading: 'Contact information',
      tableHeader: {
        code: 'Code',
        createTime: 'Submitted at',
        customer: 'Customers',
        form: 'Form',
        terminal: 'Device',
        state: 'Status'
      },
      entity: {
        email: {
          label: 'Email',
          tips: '',
          placeholder: 'User email address',
          required: 'Enter the user email address',
          custom: ''
        },
        firstName: {
          label: 'First name',
          tips: '',
          placeholder: 'First name',
          required: 'Enter a first name',
          custom: ''
        },
        lastName: {
          label: 'Last name',
          tips: '',
          placeholder: 'Last name',
          required: 'Enter a last name',
          custom: ''
        },
        mobile: {
          label: 'Phone',
          tips: '',
          placeholder: 'User mobile number',
          required: 'Enter the user mobile number',
          custom: ''
        },
        remark: {
          label: 'Notes',
          tips: '',
          placeholder: 'Enter content',
          required: 'Enter content',
          custom: ''
        }
      }
    }
  }
}
