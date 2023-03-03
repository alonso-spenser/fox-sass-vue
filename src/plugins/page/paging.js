/**
 * 未保存页面
 */
import extend from './base'

export default {
  extends: extend,
  data () {
    return {
      /**
       * 表格参数
       */
      tableOptions: {
        multiSelect: true,
        index: false,
        loading: true,
        initTable: true,
        stripe: false
      },
      /**
       * 分页参数
       */
      pagingOptions: {
        pageIndex: 1,
        pageSize: 10,
        pageSizes: [5, 10, 20, 30, 40, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
        recordCount: 0,
        dataset: [],
        firstLoading: false,
        visible: true
      },
      batchActions: false,
      /**
       * 搜索条件
       */
      searchConditions: {
        /**
         * 搜索框焦点时，清空关键词按钮
         */
        clearVisible: false,
        /**
         * 搜索关键词
         */
        keyword: '',
        /**
         * 排序
         */
        orderBy: 'createTime-DESC'
      },
      /**
       * 缓存
       */
      cacheKey: {
        /**
         * 分页条件
         */
        paging: '',
        /**
         * 搜索条件
         */
        search: ''
      }
    }
  },
  watch: {
    /**
     * 分页条件缓存
     */
    pagingOptions: {
      deep: true,
      handler (newVal) {
        this.initCache(() => {
          localStorage.setItem(this.cacheKey.paging, JSON.stringify(newVal))
        })
      }
    },
    /**
     * 搜索条件缓存
     */
    searchConditions: {
      deep: true,
      handler (newVal) {
        this.initCache(() => {
          localStorage.setItem(this.cacheKey.search, JSON.stringify(newVal))
        })
      }
    }
  },
  methods: {
    /**
     * 搜索焦点
     */
    searchConditionChange (value) {
      this.searchConditions.clearVisible = !this.utility.isEmpty(value)
    },
    /**
     * 清空搜索条件
     */
    clearCondition (func) {
      this.loading = false
      this.searchConditions.keyword = ''
      this.pagingOptions.pageIndex = 1
      this.searchConditions.clearVisible = false
      if (func && typeof (func)) {
        func.call(this)
      }
    },
    /**
     * 设置缓存key
     */
    initCache (func) {
      if (!this.cacheKey.search) {
        const routeName = this.$route.name.replace(/-/ig, '')
        this.cacheKey.search = `search${routeName}`
        this.cacheKey.paging = `paging${routeName}`
      }
      if (func && typeof (func)) {
        func.call(this)
      }
    },
    /**
     * 分页缓存加载
     * @param func 回调涵数
     */
    pagingCache (func) {
      this.initCache(() => {
        let pagingOptions = localStorage.getItem(this.cacheKey.paging)
        let searchConditions = localStorage.getItem(this.cacheKey.search)
        if (pagingOptions) {
          this.pagingOptions = JSON.parse(pagingOptions)
        }
        if (searchConditions) {
          this.searchConditions = JSON.parse(searchConditions)
        }
        if (func && typeof (func)) {
          func.call(this, Boolean(searchConditions))
        }
      })
    }
  }
}
