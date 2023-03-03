<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
  >
    <div class="neighbor fox-google-style percent-100" slot="header">
      <div class="fox-page-content">
        <div
          class="filter-params">
          <div class="filter-params-element">
            <fox-select
              shrink
              v-model="searchConditions.orderBy"
              :placeholder="$t('base.orderBy')"
              :description="$t('base.placeholder.search')"
              @change="getData(false)"
            >
              <el-option
                :label="$t('orderBy.updateTimeASC')"
                value="updateTime-ASC"></el-option>
              <el-option
                :label="$t('orderBy.updateTimeDESC')"
                value="updateTime-DESC"></el-option>
              <el-option
                :label="$t('orderBy.createTimeASC')"
                value="createTime-ASC"></el-option>
              <el-option
                :label="$t('orderBy.createTimeDESC')"
                value="createTime-DESC"></el-option>
            </fox-select>
          </div>
          <div class="filter-params-element">
            <fox-input
              shrink
              :placeholder="$t('base.placeholder.label')"
              :description="$t('base.placeholder.search')"
              v-model="searchConditions.keyword"
              clearable
              @change="searchConditionChange"
              @clear="clearSearchCondition"
              class="input-with-select"
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
              class="el-material-button"
              icon="el-icon-refresh"
              :title="$t('app.refresher.button')"
              @click="clearSearchCondition"
            >
            </el-button>
            <el-button
              icon="el-icon-plus"
              type="primary"
              plain
              class="ml-7"
              :title="$t('article.paging.add')"
              @click="addForm"
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
      :multi-select="false"
      @paging="getData"
    >
    </fox-paging-table>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/paging'
import { fetchEnquiryFormDelete, fetchEnquiryFormPaging } from '@/plugins/api/enquiry'

export default {
  name: 'enquiryForm',
  extends: extend,
  data () {
    return {
      dataConfig: {
        actions: {
          update: {
            icon: 'el-icon-edit',
            label: this.$t('base.update.button'),
            onClick: (row) => {
              this.updateForm(row)
            }
          },
          delete: {
            icon: 'el-icon-delete',
            label: this.$t('base.delete.button'),
            onClick: (rows) => {
              this.deleteForm(rows)
            }
          }
        },
        columns: [
          {
            prop: 'title',
            label: this.$t('enquiry.form.tableHeader.title')
          },
          {
            prop: 'remark',
            label: this.$t('enquiry.form.tableHeader.remark')
          },
          {
            prop: 'updateTime',
            label: this.$t('enquiry.form.tableHeader.updateTime'),
            sortable: true,
            width: 150,
            dataType: 'datetime',
            dataFormat: 'yyyy-MM-dd hh:mm'
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('enquiry.form.paging.empty.content'),
          buttonLabel: this.$t('enquiry.form.paging.empty.buttonLabel'),
          onClick: () => {
            this.addForm()
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
     * 开始搜索
     */
    searchData (first) {
      this.pagingOptions.pageIndex = 1
      this.getData(first)
    },
    /**
     * 分页
     * @param first 首次加载
     */
    getData (first) {
      this.tableOptions.loading = true
      this.pagingOptions.firstLoading = first
      const { searchConditions } = this
      fetchEnquiryFormPaging({
        orderBy: searchConditions.orderBy,
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
          title: searchConditions.keyword,
          siteId: this.siteId,
          region: this.regionCode
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
    addForm () {
      this.redirectURL(`/site/${this.siteId}/enquiry/form/add`)
    },
    /**
     * 修改跳转
     */
    updateForm (row) {
      this.redirectURL(`/site/${this.siteId}/enquiry/form/${row.id}`)
    },
    /**
     * 删除
     */
    deleteForm (rows) {
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
              fetchEnquiryFormDelete({
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
<style
  lang="scss"
  scoped>
.enquiry-form-header-label {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;

  > div {
    &:last-child {
      text-align: right;
    }
  }
}

</style>
