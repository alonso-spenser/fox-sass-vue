<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    :percentage="100"
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
              @click="addApi"
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
    <edit-api
      :visible.sync="updateVisible"
      :theme-id="updateId"
      @close="editGoogleApi"></edit-api>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/paging'
import {
  fetchSiteGoogleApiPaging,
  fetchSiteGoogleApiDelete
} from '@/plugins/api/main/base'
import EditApi from './components/edit-api'

export default {
  name: 'SiteGoogleApi',
  extends: extend,
  components: {
    EditApi
  },
  data () {
    return {
      dataConfig: {
        actions: {
          delete: {
            icon: 'el-icon-delete',
            label: this.$t('base.delete.button'),
            onClick: (rows) => {
              this.deleteApi(rows)
            }
          }
        },
        columns: [
          {
            prop: 'gmail',
            label: this.$t('googleApi.paging.tableHeader.gmail')
          },
          {
            prop: 'quantity',
            label: this.$t('googleApi.paging.tableHeader.quantity')
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('googleApi.paging.empty.content'),
          buttonLabel: this.$t('googleApi.paging.empty.buttonLabel'),
          onClick: () => {
            this.addApi()
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
      },
      updateVisible: false,
      updateId: ''
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
            this.addApi()
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
     * 添加 & 修改回调
     */
    editGoogleApi () {
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
      fetchSiteGoogleApiPaging({
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
    },
    /**
     * 添加跳转
     */
    addApi () {
      this.updateVisible = true
    },
    /**
     * 修改跳转
     */
    updateApi (row) {
      this.$router.push(`/site/google-api/update/${row.id}`)
    },
    /**
     * 删除
     */
    deleteApi (rows) {
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
              fetchSiteGoogleApiDelete({
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
