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
  ]
}
