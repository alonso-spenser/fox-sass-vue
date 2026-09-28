export default {
  enumerate: {
    contentQuality: {
      0: 'High quality',
      1: 'Medium quality',
      2: 'Low quality'
    },
    auditState: {
      0: 'Confirmed',
      1: 'Awaiting confirmation',
      2: 'Rejected'
    },
    stateClassName: {
      0: 'text-success',
      1: 'text-warning',
      2: 'text-danger',
      3: 'text-secondary'
    },
    worksheetState: {
      0: 'Under review',
      1: 'In progress',
      2: 'Paused',
      7: 'Rejected',
      9: 'Completed',
      '-1': 'All'
    },
    worksheetClassName: {
      0: 'text-info',
      1: 'text-success',
      2: 'text-warning',
      7: 'text-danger',
      9: 'text-secondary'
    },
    urgentState: {
      0: 'Normal',
      1: 'Urgent',
      2: 'Very urgent'
    },
    siteType: [
      {
        id: 1,
        label: 'B2C single page'
      },
      {
        id: 2,
        label: 'B2B single page'
      },
      {
        id: 3,
        label: 'Business website'
      },
      {
        id: 4,
        label: 'Online store'
      }
    ],
    sectionGroup: [
      {
        id: 1000,
        label: 'Page section'
      },
      {
        id: 2000,
        label: 'Global section'
      },
      {
        id: 3000,
        label: 'Standard section'
      },
      {
        id: 4000,
        label: 'Product detail design'
      }
    ],
    siteState: [
      {
        value: 0,
        label: 'Active'
      },
      {
        value: 1,
        label: 'Disabled'
      },
      {
        value: 2,
        label: 'Frozen'
      }
    ]
  }
}
