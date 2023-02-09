export default {
  dashboard: {
    title: 'Home',
    /**
     *首页
     */
    tabPane: [
      {
        label: '流量分布',
        name: 'flow'
      },
      {
        label: '询盘分布',
        name: 'inquiry'
      }
    ],
    // 统计
    aggregate: {
      inquiry: {
        label: '累积询盘数',
        currentMonth: '本月询盘数: '
      },
      visit: {
        label: '累积访问量(PV)',
        currentMonth: '本月访问量: '
      },
      visitor: {
        label: '累积访客数(IP)',
        currentMonth: '本月访问客人数: '
      }
    },
    // 时间选择
    selectDay: {
      seven: '近七天',
      thirty: '近三十'
    },
    // 流量分布
    flow: {
      title: '流量排名',
      trend: '流量趋势',
      source: '流量来源',
      ranking: {
        // 所属排名流量
        header: [
          {
            name: '国家/地区'
          },
          {
            name: '访问(PV)'
          }, {
            name: '占比'
          }
        ]
      }
    },
    // 询盘分布
    inquiry: {
      title: '询盘排名',
      ranking: {
        // 所属排名流量
        header: [
          {
            name: '国家/地区'
          },
          {
            name: '询盘数'
          }, {
            name: '占比'
          }
        ]
      }

    },
    /**
     * 数据中心
     */
    analytics: {
      title: '数据看板',
      /**
       * pane nav
       */
      tabPane: [
        {
          label: '询盘分析',
          name: 'inquiry'
        },
        {
          label: '流量分析',
          name: 'flow'
        }
        // , {
        //   label: '访问明细',
        //   name: 'visit'
        // }
      ],
      /**
       * 询盘分析
       */
      inquiry: {
        radio: {
          'mobile': '移动端',
          'pc': '桌面端'
        },
        aggregate: {
          nowMonth: '本月询盘数',
          previousMonth: '上月询盘数',
          total: '累积询盘数'
        },
        // 分布
        distribution: {
          title: '询盘分布'
        },
        // 来源
        source: {
          title: '询盘来源'
        },
        // 趋势
        trend: {
          title: '询盘趋势'
        },
        terminal: {
          title: '终端占比'
        }
      },

      /**
       * 流量分析
       */
      flow: {
        aggregate: {
          nowMonthVisit: '本月访问数',
          nowMonthVisitNumber: '本月访问量',
          totalPeopleVisit: '累积访客数',
          totalVisitNumber: '累积访问量'
        },
        radio: {
          'visitor': '访客（IP）',
          'visits': '访问量(PV)'
        },
        // 分布
        distribution: {
          title: '流量分布'
        },
        // 来源
        source: {
          title: '流量来源'
        },
        // 趋势
        trend: {
          title: '流量趋势'
        },
        // 终端
        terminal: {
          title: '访问终端'
        }

      },

      /**
       * 访问明细
       */
      visit: {
        tableHeader: {
          visitTime: '访问时间',
          country: '国家/地区',
          source: '访问来源',
          keyWord: '关键词',
          url: '访问页面',
          duration: '访问时长',
          depth: '访问深度',
          terminal: '终端',
          ip: '访问IP'

        }
      }
    },
    ga: {
      title: 'Google Analytics 同步设置',
      tips: '通过同步Google Analytics的账号，获取并展示更详尽的网站数据',
      setting: 'GA 同步设置'
    }
  },
  pageNotFund: {
    denied: '您的访问被拒绝',
    a1: '原因1：系统上线了全新的权限系统，请点击退出登录后，再次登录即可。',
    a2: '原因2：管理员未授与您访问权限。',
    a3: '点击本页面任何地方重新登录'
  }
}
