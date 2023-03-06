export default {
  title: 'SUPER CMS',
  agreement: {
    updateBrowser: {
      heading: '您使用的浏览器版本较低',
      content: '这可能会导致您在使用过程中出现异常。请更新您的浏览器，以便您享受完整的体验。推荐使用以下的浏览器：',
      button: '立即更新',
      chrome: 'Google Chrome',
      firefox: 'Mozilla Firefox',
      safari: 'Apple Safari',
      opera: 'Opera'
    },
    desktopBrowser: {
      title: '温馨提示',
      content: '为了获得更好的使用体验，请使用电脑上进行网站的管理！'
    }
  },
  pageAborted: {
    heading: '抱歉，您访问的页面出错了',
    subheading: '可能的原因是：',
    c1: '网站正在进行维护',
    c2: '网站有程序错误',
    attempt: '您可以尝试以下操作：',
    a1: '返回到上一级',
    a2: '重新进入到本页面',
    a3: '稍后再重试'
  },
  base: {
    datePlaceholder: '请选择时间',
    query: 'SEARCH',
    home: 'HOME',
    dataEmpty: 'no data',
    leave: {
      unsaved: 'UNSAVED CHANGES',
      content: 'The content of the current page has not been saved, leaving will lose the unsaved content. Are you sure?',
      button: 'Leave'
    },
    cancel: 'Cancel',
    change: 'Change',
    language: 'Language',
    save: 'Save',
    oops: 'OOPS',
    orderBy: 'Order by',
    notData: 'No data',
    upload: 'Upload',
    startTime: 'Starting time',
    endTime: 'End time',
    operate: {
      add: 'Add',
      setting: 'Setting',
      label: 'Operate',
      loading: 'Loading',
      complete: 'Complete',
      edit: 'Edit',
      more: 'More',
      back: 'Return',
      paste: 'Paste',
      duplicate: 'Duplicate',
      confirm: 'Confirm',
      cancel: 'Cancel',
      discard: 'Discard',
      save: 'Save',
      reset: 'Reset',
      view: 'View',
      copy: 'Copy',
      rename: 'rename',
      preview: 'Preview',
      publish: 'Publish',
      remove: 'Remove',
      apply: 'Apply',
      lookup: 'Lookup',
      startUse: 'StartUse',
      stopUse: 'StopUse'
    },
    file: {
      size: 'Limit {size} M'
    },
    placeholder: {
      label: 'Keyword',
      input: 'Content',
      search: 'Please enter a keyword',
      select: 'Select',
      date: 'Time'
    },
    addition: {
      button: 'Add',
      success: 'Add success',
      failed: 'Add failed'
    },
    update: {
      button: 'Update',
      success: 'Update success',
      failed: 'Update failed'
    },
    saveOpt: {
      button: 'Save',
      success: 'Save success',
      failed: 'Save failed'
    },
    delete: {
      button: 'Delete',
      heading: 'OOPS',
      subheading: 'Are you sure you want to delete the current record?？',
      multiple: 'Are you sure you want to delete {0} items?',
      success: 'Delete complete',
      failed: 'Failed to delete'
    },
    select: {
      button: '查找',
      multiple: '已选中 {0} 个'
    },
    formValidation: {
      inadequate: 'Please complete the form content'
    }
  },
  header: {
    password: 'Password',
    personal: 'Personal info',
    employee: 'Employee management',
    out: 'Signed out',
    region: {
      'en': 'English',
      'zh-CN': '简体中文'
    }
  },
  /**
   * 组件
   */
  components: {
    /**
     * 倒计时
     */
    countdown: {
      tip: ['\u5929', '\u65f6', '\u5206', '\u79d2'],
      unit: [8.64E+7, 3.6E+6, 6E+4, 1E+3]
    }
  },
  /**
   * 站点类型
   */
  siteType: {
    '1': '商品单页',
    '2': '企业单页',
    '3': '企业网站',
    '4': '在线商店',
    '11': '视频B2B',
    '12': '视频B2C'
  }
}
