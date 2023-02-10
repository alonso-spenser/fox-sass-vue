export default {
  menuList: [
    {
      title: 'Job offers',
      code: ['offer'],
      submenu: [],
      icon: 'el-icon-menu',
      url: '/offer'
    },
    {
      title: 'Task',
      code: ['task-index'],
      submenu: [
        {
          title: 'My jobs',
          code: ['task-index'],
          url: '/task'
        },
        {
          title: 'Income',
          code: ['task-play'],
          url: '/task/play'
        }
      ]
    },
    {
      title: 'Workbench',
      code: ['workspace'],
      icon: '',
      submenu: [
        {
          title: 'Worksheet',
          code: ['worksheet-dashboard'],
          url: '/worksheet'
        },
        {
          title: 'Keywords ranking',
          code: ['worksheet-keywords-ranking'],
          url: '/worksheet/ranking'
        }
      ]
    },
    {
      title: 'Settings',
      code: ['settings'],
      icon: '',
      submenu: [
        {
          title: 'Task type',
          code: ['settings-task-type'],
          url: '/settings/task-type'
        },
        {
          title: 'Pricing scheme',
          code: ['settings-cost'],
          url: '/settings/cost'
        },
        {
          title: 'Audit project',
          code: ['audit-project'],
          url: '/settings/audit/project',
          submenu: []
        },
        {
          title: 'Audit config',
          code: ['audit-config'],
          url: '/settings/audit/config',
          submenu: []
        }
      ]
    }
  ],
  mainMenuList: [
    {
      title: 'dashboard',
      code: ['dashboard'],
      submenu: [
        {
          code: ['dashboard-startup'],
          title: '整体趋势',
          url: '/main/dashboard',
          submenu: []
        }
      ]
    },
    {
      title: '客户管理',
      code: ['agent', 'site'],
      submenu: [
        {
          title: '客户列表',
          code: ['client-list'],
          url: '/main/client'
        },
        {
          title: '网站列表',
          url: '/main/site',
          code: ['site-all'],
          submenu: []
        },
        {
          title: '网站迁移',
          url: '/main/tool/transfer',
          code: ['tool-transfer'],
          submenu: []
        }
      ]
    },
    {
      title: '订单管理',
      submenu: [
        {
          title: '采购订单',
          url: '/main/financial/purchase',
          // code: ['finance-purchase'],
          submenu: []
        },
        {
          title: '订单退回审核',
          code: ['order-audit'],
          url: '/main/order/audit',
          submenu: []
        }
      ]
    },
    {
      title: '财务管理',
      code: ['finance'],
      submenu: [
        {
          code: ['agent-bank'],
          title: '收款帐户',
          url: '/main/financial/bank'
        },
        {
          title: '账单列表',
          code: ['finance-bill'],
          url: '/main/financial/bill'
        },
        {
          title: '收入统计',
          code: ['finance-statistics'],
          url: '/main/financial/statistics',
          submenu: []
        }
      ]
    },
    {
      title: 'Basic data',
      code: ['base'],
      submenu: [
        {
          title: 'System',
          // code: ['main-base-super'],
          code: [''],
          url: '/main/base/super',
          submenu: []
        },
        {
          title: 'Language',
          code: ['base-lang'],
          url: '/main/base/lang',
          submenu: []
        },
        {
          title: 'IP Address',
          code: ['ip-repository'],
          url: '/main/base/ip',
          submenu: []
        },
        {
          title: 'Support',
          code: ['base-support'],
          url: '/main/base/support',
          submenu: []
        },
        {
          title: 'Google API',
          code: [],
          url: '/main/base/google-api',
          submenu: []
        },
        {
          title: 'Function & Role',
          code: ['security-function'],
          url: '/main/base/security/function',
          submenu: []
        }
      ]
    },
    {
      title: '主题',
      code: ['theme'],
      submenu: [
        {
          title: '模版标签',
          code: ['theme-tag'],
          url: '/main/masterplate/tag',
          submenu: []
        },
        {
          title: '组件标签',
          code: ['theme-element-tag'],
          url: '/main/masterplate/element-tag',
          submenu: []
        },
        {
          title: '全局参数',
          code: ['theme-element-schema'],
          url: '/main/masterplate/schema',
          submenu: []
        },
        {
          title: '主题风格',
          url: '/main/masterplate',
          code: ['theme-masterplate'],
          submenu: []
        },
        {
          title: '页面',
          code: ['theme-page'],
          url: '/main/masterplate/page',
          submenu: []
        },
        {
          title: '组件',
          code: ['theme-element'],
          url: '/main/masterplate/element',
          submenu: []
        }
      ]
    }
  ]
}
