<template>
  <div v-loading="pageLoading">
    <fo-paging-table
      :columns="dataConfig.columns"
      :actions="dataConfig.actions"
      :dataset="pagingOptions.dataset"
      :loading="tableOptions.loading"
      :multi-select="false"
      :index-number="false"
      :stripe="false"
      :first-loading="pagingOptions.firstLoading"
      :empty="dataConfig.empty"
      :page-index.sync="pagingOptions.pageIndex"
      :page-size.sync="pagingOptions.pageSize"
      :record-count="pagingOptions.recordCount"
      :rows-class-name="dataConfig.rowsClassName"
      @paging="getData"
    >
    </fo-paging-table>
  </div>
</template>

<script>
import extend from '@/plugins/page/paging'
import { fetchEnquiry } from '@/plugins/api/dashboard'

export default {
  name: 'visit',
  extends: extend,
  data () {
    return {
      dataConfig: {
        actions: {
          update: {
            label: this.$t('base.update.button'),
            invisible: true,
            onClick: row => {

            }
          }
        },
        columns: [
          {
            prop: 'visitTime',
            label: this.$t('dashboard.analytics.visit.tableHeader.visitTime')
          },
          {
            prop: 'country',
            width: '80',
            label: this.$t('dashboard.analytics.visit.tableHeader.country')
          },
          {
            prop: 'source',
            width: '80',
            label: this.$t('dashboard.analytics.visit.tableHeader.source')
          },
          {
            prop: 'keyWord',
            label: this.$t('dashboard.analytics.visit.tableHeader.keyWord')
          },
          {
            prop: 'url',
            label: this.$t('dashboard.analytics.visit.tableHeader.url')
          },
          {
            prop: 'duration',
            label: this.$t('dashboard.analytics.visit.tableHeader.duration')
          },
          {
            prop: 'depth',
            label: this.$t('dashboard.analytics.visit.tableHeader.depth')
          },
          {
            prop: 'terminal',
            label: this.$t('dashboard.analytics.visit.tableHeader.terminal')
          },
          {
            prop: 'ip',
            label: this.$t('dashboard.analytics.visit.tableHeader.ip')
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {

        },
        /**
         * 行高亮
         * @param row 行数据
         */
        rowsClassName: (row) => {
          return ''
        }
      }
    }
  },
  props: {
    daterange: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    daterange: {
      deep: true,
      handler () {
        this.getDate()
      }
    }
  },
  created () {
    this.tableOptions.loading = false
    // this.pagingCache((success) => {
    //   this.getData(success)
    // })
  },
  methods: {
    /**
     * 分页
     * @param first 首次加载
     */
    getData (first) {
      let request = function () {

      }
      this.tableOptions.loading = true
      this.pagingOptions.firstLoading = first
      request({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
        }
      }).then(result => {
        this.pageValid()
        this.resultMessage(result, (success) => {
          if (success) {
            this.pageLoading = false
            this.pagingOptions.recordCount = result.data.total
            this.pagingOptions.dataset = result.data['records']
            this.tableOptions.loading = false
            if (result.data.records.length > 0) {
              this.pagingOptions.firstLoading = !first
            }
            this.batchActions = !(this.pagingOptions.dataset.length === 0 && this.pagingOptions.firstLoading)
          }
        })
      })
        .catch(error => {
          this.pageInvalid()
          this.networkMistake(error)
        })
    }
  }
}
</script>

<style scoped>
</style>
