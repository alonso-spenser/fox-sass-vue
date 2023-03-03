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
      title: 'Dashboard',
      code: ['dashboard'],
      url: '/main',
      submenu: []
    },
    {
      title: 'Client',
      code: ['agent', 'site'],
      submenu: [
        {
          title: 'Client',
          code: ['client-list'],
          url: '/main/client'
        },
        {
          title: 'Site',
          url: '/main/site',
          code: ['site-all'],
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
      title: 'Theme development',
      code: ['theme'],
      submenu: [
        {
          title: 'Theme Tag',
          code: ['theme-tag'],
          url: '/main/masterplate/tag',
          submenu: []
        },
        {
          title: 'Section Tag',
          code: ['theme-element-tag'],
          url: '/main/masterplate/element-tag',
          submenu: []
        },
        {
          title: 'Global Parameters',
          code: ['theme-element-schema'],
          url: '/main/masterplate/schema',
          submenu: []
        },
        {
          title: 'Theme',
          url: '/main/masterplate',
          code: ['theme-masterplate'],
          submenu: []
        },
        {
          title: 'Page',
          code: ['theme-page'],
          url: '/main/masterplate/page',
          submenu: []
        },
        {
          title: 'Section',
          code: ['theme-element'],
          url: '/main/masterplate/element',
          submenu: []
        }
      ]
    }
  ]
}
