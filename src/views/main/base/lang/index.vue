<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
  >
    <div class="neighbor fox-google-style percent-100"
         slot="header">
      <div class="fox-page-content">
        <div
          class="filter-params">
          <div class="filter-params-element">
            <fox-input
              shrink
              :placeholder="$t('base.placeholder.label')"
              :description="$t('base.placeholder.search')"
              v-model="searchConditions.keyword"
              clearable
              @change="searchConditionChange"
              @clear="clearSearchCondition"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                :loading="loading"
                @click="getData(false)"
              ></el-button>
            </fox-input>
          </div>
          <div class="filter-params-element">
            <el-button
              icon="el-icon-plus"
              type="primary"
              plain
              class="el-material-button"
              @click="addLang"
            >
            </el-button>
          </div>
          <div class="filter-params-element">
          </div>
        </div>
      </div>
    </div>
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
      @paging="getData"
    >
    </fox-paging-table>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/paging'
import { fetchLangPaging, fetchLangDelete, fetchLangUpdate } from '@/plugins/api/main/core'

export default {
  name: 'mainBaseLang',
  extends: extend,
  data () {
    return {
      dataConfig: {
        actions: {
          update: {
            icon: 'el-icon-edit',
            label: this.$t('base.update.button'),
            onClick: (row) => {
              this.updateLang(row)
            }
          },
          delete: {
            icon: 'el-icon-delete',
            label: this.$t('base.delete.button'),
            onClick: (rows) => {
              this.deleteLang(rows)
            }
          }
        },
        columns: [
          {
            prop: 'languageName',
            label: this.$t('core.base.lang.paging.tableHeader.languageName')
          },
          {
            prop: 'nativeName',
            label: this.$t('core.base.lang.paging.tableHeader.nativeName')
          },
          {
            prop: 'code',
            label: this.$t('core.base.lang.paging.tableHeader.code')
          },
          {
            prop: 'state',
            label: this.$t('core.base.lang.paging.tableHeader.state'),
            width: 100,
            switch: true,
            switchActive: 0,
            switchInactive: 1,
            onClick: row => {
              this.langState(row.id, row.state, true)
            }
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('core.base.lang.paging.empty.content'),
          buttonLabel: this.$t('core.base.lang.paging.empty.buttonLabel'),
          onClick: () => {
            this.addLang()
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
  created () {
    this.pagingCache((success) => {
      this.getData(success)
    })
  },
  methods: {
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
      fetchLangPaging({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
          q: this.searchConditions.keyword
        }
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.pagingOptions.recordCount = result.data.total
              this.pagingOptions.dataset = result.data['records']
              this.tableOptions.loading = false
              if (result.data.records.length === 0) {
                this.clearCondition()
              }
            }
          })
        })
        .catch(error => {
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    /**
     * 添加跳转
     */
    addLang () {
      this.$router.push('/main/base/lang/add')
    },
    /**
     * 修改跳转
     */
    updateLang (row) {
      this.$router.push(`/main/base/lang/update/${row.id}`)
    },
    /**
     * 状态
     */
    langState (id, state) {
      fetchLangUpdate({
        id: id,
        state: state
      })
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.getData()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 删除
     */
    deleteLang (rows) {
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
              fetchLangDelete({
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
