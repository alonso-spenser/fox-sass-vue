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
    leave: {
      unsaved: '未保存的更改',
      content: '当前页面内容尚未保存，离开将会丢失未保存的内容。是否确认离开？',
      button: '离开'
    },
    cancel: 'Cancel',
    change: 'Change',
    language: 'Language',
    save: 'Save',
    oops: 'Oops',
    orderBy: 'Order by',
    notData: 'No data',
    upload: 'Upload',
    operate: {
      add: 'Add',
      setting: 'Setting',
      label: 'Operate',
      loading: 'Loading',
      complete: 'Complete',
      edit: 'Edit',
      more: 'More',
      back: 'Return',
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
      size: '文件不可以超过{size}M'
    },
    placeholder: {
      input: '请输入内容',
      search: '请输入关键词',
      select: 'Select',
      date: '请选择时间'
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
      heading: 'Oops',
      subheading: '您确认要删除当前记录吗？',
      multiple: '确定要删除 {0} 项吗?',
      success: '删除完成',
      failed: '删除失败'
    },
    select: {
      button: '查找',
      multiple: '已选中 {0} 个'
    },
    formValidation: {
      inadequate: '请完善内容信息'
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
  startup: {
    pageTitle: '创建站点',
    returnHome: '返回首页',
    mySites: '我的网站',
    nextStep: '下一步',
    prevStep: '上一步',
    create: '创建站点',
    chooseTemplate: '选择模板',
    siteTheme: '网站模版',
    all: '全部',
    preview: '预览',
    original: '设置初始地址',
    empty: '请选择一个模版',
    selected: '选择',
    skip: '跳过',
    siteType: {
      heading: '请选择网站类型',
      cod: {
        heading: '商品单页',
        subheading: '适用于<b>类似COD商品单页</b>投放的业务类型',
        tips: '站点会根据您添加的商品自动生成单页，您可以对这些商品单页进行编辑修改，您的访客可以通过该单页直接下单'
      },
      lp: {
        heading: 'B2B企业单页',
        subheading: '适用于<b>单页展示 ( 着陆页 ) 以及询盘 </b>的业务类型',
        tips: '您可以在站点中创建多个独立的单页并进行编辑修改，您的访客可以通过该单页直接进行报名、询盘等表单提交操作'
      },
      b2b: {
        heading: 'B2B企业网站',
        subheading: '适用于<b>官网以及询盘</b>的业务类型',
        tips: '您可以创建企业的官网，并对整个网站进行编辑修改，您的访客可以浏览企业介绍、商品、新闻等内容以及进行询盘操作'
      },
      b2c: {
        heading: 'B2C在线商城',
        subheading: '适用于<b>在线销售</b>的业务类型',
        tips: '无论您的产品是面向哪种消费者、销往世界的哪一个角落，从“店”商、 在线交易、社交媒体，到点对点个人营销，我们都可以帮您一一实现。'
      }
    },
    tips: [
      '创建网站后，原始地址<label class="text-primary">不可修改</label>，请谨慎设置',
      '您的客户可以通过浏览器访问该地址来查看您的网站和页面',
      '您可以在之后添加绑定自己的域名并将其设置为网站的主域名'
    ],
    entity: {
      domain: {
        label: '网址',
        placeholder: '请输入网址',
        custom: '网址不能为空',
        required: '网址为4~32位，数字、英文或中划线组成',
        async: '网址已存在，请更换'
      }
    },
    duplicate: {
      pageTitle: '复制站点',
      source: '来源网站',
      tips: '复制以上网站的全部设置，以创建一个新的站点',
      siteName: '网站名称',
      siteDomain: '网站域名',
      siteType: '网站类型',
      submit: '复制站点',
      error: '原网站信息不存在'
    }
  }
}
