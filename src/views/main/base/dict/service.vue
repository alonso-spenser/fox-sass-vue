<template>
  <main>
    <fox-page-header :actions="crumbAction"></fox-page-header>
    <fox-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
      :percentage="100"
    >
      <fox-paging-table
        :columns="dataConfig.columns"
        :actions="dataConfig.actions"
        :dataset="pagingOptions.dataset"
        :loading="tableOptions.loading"
        :first-loading="pagingOptions.firstLoading"
        :empty="dataConfig.empty"
        :page-index.sync="pagingOptions.pageIndex"
        :page-size.sync="pagingOptions.pageSize"
        :record-count="pagingOptions.recordCount"
        :rows-class-name="dataConfig.rowsClassName"
        @paging="getData">
      </fox-paging-table>
      <update-dialog v-if="dialogVisible" @close="dialogClose" :model="model"></update-dialog>
    </fox-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/paging'
import { fetchAgentDictDelete, fetchAgentDictPaging } from '@/plugins/api/core'
import updateDialog from './components/update-dialog'

export default {
  /**
   * 客户行业
   */
  name: 'dictService',
  components: { updateDialog },
  extends: extend,
  data () {
    return {
      dialogVisible: false,
      options: [],
      value: '',
      model: {
        title: this.$t('service.category.title'),
        name: this.$t('service.category.name'),
        placeholder: this.$t('service.category.entity.placeholder'),
        dicType: 'service_category',
        id: ''
      },
      dataConfig: {
        actions: {
          update: {
            icon: 'el-icon-edit',
            label: this.$t('base.update.button'),
            onClick: (row) => {
              this.model.id = row.id
              this.dialogVisible = true
            }
          },
          delete: {
            icon: 'el-icon-delete',
            label: this.$t('base.delete.button'),
            onClick: (rows) => {
              this.deleteDict(rows)
            }
          }
        },
        columns: [
          {
            prop: 'title',
            label: this.$t('service.category.tableHeader.name')
          },
          {
            prop: 'remark',
            label: this.$t('service.category.tableHeader.flag')
          },
          {
            label: '',
            button: true,
            width: 100,
            group: [
              {
                type: 'text',
                name: this.$t('base.delete.button'),
                onClick: (row) => {
                  this.deleteDict([row])
                }
              }
            ]
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('service.category.empty.content'),
          buttonLabel: this.$t('service.category.empty.buttonLabel'),
          onClick: () => {
            this.addIndustry()
          }
        },
        /**
         * 行高亮
         * @param row 行数据
         */
        rowsClassName: (row) => {
          // return row.state === 0 ? 'row-text-enable' : ''
          return ''
        }
      }
    }
  },
  computed: {
    /**
     * 面包屑操作
     */
    crumbAction () {
      return [
        {
          label: this.$t('base.addition.button'),
          icon: 'el-icon-plus',
          type: 'primary',
          visible: true,
          click: () => {
            this.$router.push('/base/dict/creation/service')
          }
        }
      ]
    },
    /**
     * 面包屑下拉操作
     */
    crumbDropAction () {
      return []
    }
  },
  created () {
    this.pagingCache((success) => {
      this.getData(success)
    })
  },
  methods: {
    /**
     * 关闭窗口
     * @param a
     */
    dialogClose (a) {
      this.dialogVisible = a
      this.getData(false)
    },
    /**
     * 改变触发
     */
    changeFocus () {
      this.getData(true)
    },
    /**
     * 清空搜索条件
     */
    clearSearchCondition () {
      this.clearCondition(() => {
        this.getData(true)
      })
    },
    /**
     * 分页
     * @param first 首次加载
     */
    getData (first) {
      this.tableOptions.loading = true
      this.pagingOptions.firstLoading = first
      fetchAgentDictPaging({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
          dicType: this.model.dicType,
          startTime: this.searchConditions.dateRange ? this.$moment(this.searchConditions.dateRange[0]).valueOf() : null,
          endTime: this.searchConditions.dateRange ? this.$moment(this.searchConditions.dateRange[1]).valueOf() : null
        }
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
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
          this.pageInvalid(error)
        })
    },
    /**
     * 添加
     */
    addIndustry () {
      this.dialogVisible = true
    },
    /**
     * 删除
     */
    deleteDict (rows) {
      const ids = []
      rows.forEach((o) => {
        ids.push(o.id)
      })
      this.$confirm(this.$t('base.delete.multiple').toString().replace('{0}', ids.length.toString()),
        this.$t('base.delete.heading').toString(), {
          confirmButtonText: this.$t('base.operate.confirm'),
          cancelButtonText: this.$t('base.operate.cancel'),
          closeOnClickModal: false,
          type: 'error',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              fetchAgentDictDelete({
                ids: ids
              })
                .then(result => {
                  result.options = {
                    action: this.actionType.delete
                  }
                  this.resultMessage(result, (success) => {
                    done()
                    instance.confirmButtonLoading = false
                    if (success) {
                      this.getData(true)
                    }
                  })
                })
                .catch(error => {
                  this.networkMistake(error)
                  done()
                  instance.confirmButtonLoading = false
                })
            } else {
              instance.confirmButtonLoading = false
              done()
            }
          }
        })
    }
  }
}
</script>
