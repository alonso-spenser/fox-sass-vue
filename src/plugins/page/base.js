import resource from '@/plugins/resource'

import {
  mapMutations,
  mapState
} from 'vuex'
import router from '@/router'
import { fetchMySite } from '@/plugins/api/site'

/**
 * 页面基类
 */
export default {
  data () {
    return {
      id: '',
      /**
       * 按钮事件状态
       */
      loading: false,
      /**
       * 页面加载状态(true 显示loading加载图片，隐藏页面内容)
       */
      pageLoading: true,
      /**
       * 页面校验状态
       * 页面异步数据加载失败，显示页面加载失败信息
       */
      pageIsValid: false,
      /**
       * 操作类型
       */
      actionType: {
        delete: 97,
        addition: 98,
        update: 99
      },
      siteId: '',
      requestProtocol: 'https://',
      resource: resource
    }
  },
  computed: {
    ...mapState(['agentModel', 'agentId', 'siteModel', 'globalRegionModel']),
    /**
     * 语言
     * @returns {*|string}
     */
    language () {
      return this.utility.getLanguage()
    },
    regionCode () {
      if (!this.globalRegionModel) {
        return 'en'
      }
      return this.globalRegionModel.code
    },
    defaultDomain () {
      return this.siteModel ? (this.siteModel.mainDomain || this.siteModel.systemDomain) : ''
    }
  },
  methods: {
    ...mapMutations(['setAgentModel', 'setAgentId', 'setMySite', 'setAutoSyncH1']),
    /**
     * 键盘事件
     * @param func 回调事件
     * @param keyCode 按键
     */
    keyboardEvents (func, keyCode) {
      keyCode = keyCode || 13
      if (func && typeof (func) === 'function') {
        document.onkeydown = (e) => {
          if (e.keyCode === keyCode) {
            func.call(this)
          }
        }
      }
    },
    /**
     * 重置表单初并移除校验结果
     * @param formName
     */
    resetForm (formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields()
      }
    },
    /**
     * 移除该表单项的校验结果
     * @param formName
     */
    clearValidate (formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].clearValidate()
      }
    },
    /**
     * 网络错误提示
     */
    networkMistake (error) {
      // this.unsaved = false
      this.loading = false
      console.log(error)
    },
    /**
     * 页面通过
     */
    pageValid () {
      this.pageIsValid = false
      this.pageLoading = false
      this.unsaved = false
      this.loading = false
    },
    /**
     * 页面未通过校验
     * @param error
     */
    pageInvalid (error) {
      this.pageIsValid = true
      this.pageLoading = false
      this.unsaved = false
      this.loading = false
      console.log(error)
    },
    /**
     * 操作结果消息通知
     * @param result
     * @param func 回调方法
     */
    resultMessage (result, func) {
      let admin = router.currentRoute.fullPath.indexOf('/main') === 0
      if (result.code === 13010000) {
        this.$message({
          type: 'error',
          message: this.$t('errorCode.timeOut')
        })
        this.$router.push({
          path: `${admin ? '/main' : ''}/passport`,
          query: {
            redirect: location.href
          }
        }).then(() => {
        })
        return false
      }

      result.options = result.options || {
        action: 0,
        error: '',
        success: ''
      }

      result.options = {
        updateId: true,
        ...result.options
      }
      this.pageValid()
      // 错误信息：options > 错误码 > 默认
      let error = result.options.error
      let success = result.options.success
      // 表单清除验证状态
      if (result.options.action === this.actionType.update || result.options.action === this.actionType.addition) {
        if (this.$refs[result.options.formName || 'update']) {
          this.$refs[result.options.formName || 'update'].clearValidate()
        }
      }
      if (result.success) {
        if (this.utility.isEmpty(success)) {
          if (result.options.action === this.actionType.save) {
            success = this.$t('base.saveOpt.success')
          } else if (result.options.action === this.actionType.delete) {
            success = this.$t('base.delete.success')
          } else if (result.options.action === this.actionType.addition) {
            success = this.$t('base.addition.success')
          } else if (result.options.action === this.actionType.update) {
            success = this.$t('base.update.success')
          }
        }
        if (result.data && result.data.id && result.options.updateId) {
          this.id = result.data.id
        }
        if (!this.utility.isEmpty(success)) {
          this.$message({
            type: 'success',
            message: success
          })
        }
      } else {
        if (this.utility.isEmpty(error) && this.utility.isNotEmpty(result.code)) {
          error = this.$t('errorCode')[result.code]
        }
        if (this.utility.isEmpty(error)) {
          if (result.options.action === this.actionType.delete) {
            error = this.$t('base.delete.failed')
          } else if (result.options.action === this.actionType.addition) {
            error = this.$t('base.addition.failed')
          } else if (result.options.action === this.actionType.update) {
            error = this.$t('base.update.failed')
          }
        }
        if (this.utility.isNotEmpty(error)) {
          this.$message({
            type: 'error',
            message: error
          })
        }
      }
      if (func && typeof (func) === 'function') {
        func.call(this, result.success)
      }
      if (!this.utility.isEmpty(result.options.url)) {
        this.$router.push({
          path: result.options.url
        }).then(() => {
        })
      }
    },
    /**
     * 退出
     */
    logout () {
      window.localStorage.clear()
      this.setMerchantModel({
        avatar: '',
        firstName: '',
        lastName: '',
        name: ''
      })
    },
    /**
     * 我的站点
     */
    getMySite (func) {
      fetchMySite()
        .then((result) => {
          if (result['success']) {
            if (func && typeof (func) === 'function') {
              this.setMySite(result.data)
              func.call(this, result.data)
            }
          } else if (result['code'] === 13010000) {
            this.logout()
            func.call(this, [])
          }
        })
        .catch((e) => {
          this.logout()
          func.call(this, [])
        })
    }
  },
  created () {
    this.id = this.$route.params.id
    this.siteId = this.$route.params.siteId || ''
  }
}
