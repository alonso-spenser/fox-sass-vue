/**
 * 未保存页面
 */
import extend from './paging'
import passport from '../passport'
import {
  mapState
} from 'vuex'

export default {
  extends: extend,
  data () {
    return {
      updating: false,
      unsaved: false,
      autoSyncH1Title: false
    }
  },
  computed: {
    ...mapState(['autoSyncH1'])
  },
  created () {
    this.autoSyncH1Title = this.autoSyncH1
  },
  methods: {
    /**
     * 页面离开事件
     * @param next
     */
    pageLeave (next) {
      if (this.unsaved && passport.status()) {
        this.$confirm(this.$t('base.leave.content').toString(), this.$t('base.oops').toString(), {
          confirmButtonText: this.$t('base.leave.button'),
          cancelButtonText: this.$t('base.operate.cancel')
        }).then(() => {
          next()
        }).catch(() => {
          next(false)
        })
      } else {
        next()
      }
    },
    /**
     * 表单未校验
     * @param fields
     */
    unverified (fields) {
      let s = []
      for (let key in fields) {
        if (fields[key].length > 0) {
          let tips = fields[key][0].message
          if (this.utility.isNotEmpty(tips)) {
            s.push(s.length === 1 ? tips.replace('请输入', '').replace('Please input', '') : tips)
          }
        }
      }
      if (s.length > 0) {
        this.$message({
          type: 'error',
          message: s.join(',')
        })
      }
    }
  },
  /**
   * 页面离开确认事件
   * @param to
   * @param from
   * @param next
   */
  beforeRouteLeave (to, from, next) {
    this.pageLeave(next)
  },
  /**
   * 页面更新确认事件
   * @param to
   * @param from
   * @param next
   */
  beforeRouteUpdate (to, from, next) {
    this.id = this.$route.params.id
    this.pageLeave(next)
  }
}
