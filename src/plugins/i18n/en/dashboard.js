export default {
  dashboard: {
    title: 'Home',
    tabPane: [
      {
        label: 'Traffic distribution',
        name: 'flow'
      },
      {
        label: 'Enquiry distribution',
        name: 'inquiry'
      }
    ],
    aggregate: {
      inquiry: {
        label: 'Total enquiries',
        currentMonth: 'Enquiries this month: '
      },
      visit: {
        label: 'Total page views (PV)',
        currentMonth: 'Page views this month: '
      },
      visitor: {
        label: 'Total visitors (IP)',
        currentMonth: 'Visitors this month: '
      }
    },
    selectDay: {
      seven: 'Last 7 days',
      thirty: 'Last 30 days'
    },
    flow: {
      title: 'Traffic ranking',
      trend: 'Traffic trends',
      source: 'Traffic sources',
      ranking: {
        header: [
          {
            name: 'Country/region'
          },
          {
            name: 'Page views (PV)'
          },
          {
            name: 'Share'
          }
        ]
      }
    },
    inquiry: {
      title: 'Enquiry ranking',
      ranking: {
        header: [
          {
            name: 'Country/region'
          },
          {
            name: 'Enquiries'
          },
          {
            name: 'Share'
          }
        ]
      }
    },
    analytics: {
      title: 'Analytics dashboard',
      tabPane: [
        {
          label: 'Enquiry analytics',
          name: 'inquiry'
        },
        {
          label: 'Traffic analytics',
          name: 'flow'
        }
      ],
      inquiry: {
        radio: {
          mobile: 'Mobile',
          pc: 'Desktop'
        },
        aggregate: {
          nowMonth: 'Enquiries this month',
          previousMonth: 'Enquiries last month',
          total: 'Total enquiries'
        },
        distribution: {
          title: 'Enquiry distribution'
        },
        source: {
          title: 'Enquiry sources'
        },
        trend: {
          title: 'Enquiry trends'
        },
        terminal: {
          title: 'Device share'
        }
      },
      flow: {
        aggregate: {
          nowMonthVisit: 'Visits this month',
          nowMonthVisitNumber: 'Page views this month',
          totalPeopleVisit: 'Total visitors',
          totalVisitNumber: 'Total page views'
        },
        radio: {
          visitor: 'Visitors (IP)',
          visits: 'Page views (PV)'
        },
        distribution: {
          title: 'Traffic distribution'
        },
        source: {
          title: 'Traffic sources'
        },
        trend: {
          title: 'Traffic trends'
        },
        terminal: {
          title: 'Visitor devices'
        }
      },
      visit: {
        tableHeader: {
          visitTime: 'Visit time',
          country: 'Country/region',
          source: 'Traffic source',
          keyWord: 'Keyword',
          url: 'Visited page',
          duration: 'Visit duration',
          depth: 'Pages per visit',
          terminal: 'Device',
          ip: 'Visitor IP'
        }
      }
    },
    ga: {
      title: 'Google Analytics sync settings',
      tips: 'Connect your Google Analytics account to view more detailed website analytics',
      setting: 'GA sync settings'
    }
  },
  pageNotFund: {
    denied: 'Access denied',
    a1: 'Reason 1: The permissions system has been updated. Sign out and sign in again.',
    a2: 'Reason 2: Your administrator has not granted you access.',
    a3: 'Click anywhere on this page to sign in again'
  }
}
