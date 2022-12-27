<template>
  <main>
    <fo-page-header
      :actions="crumbAction"
      :drop-actions="crumbDropAction"
    >
    </fo-page-header>
    <fo-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
      :percentage="100"
    >
      <fo-paging-table
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
        <template slot="header">
          <el-row
            class="dataset-search"
            :gutter="20">
            <el-col :span="14">
              <el-input
                :placeholder="$t('base.placeholder.search')"
                v-model="searchConditions.keyword"
                clearable
                @change="searchConditionChange"
                @clear="clearSearchCondition"
                class="input-with-select">
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  :loading="loading"
                  @click="getData(false)"
                ></el-button>
              </el-input>
            </el-col>
          </el-row>
        </template>
      </fo-paging-table>
    </fo-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/paging'
import {
  fetchIpPaging,
  fetchIpDelete
} from '@/plugins/api/main/base'

export default {
  name: 'BaseIpRepository',
  extends: extend,
  data () {
    return {
      dataConfig: {
        actions: {
          update: {
            icon: 'el-icon-edit',
            label: this.$t('base.update.button'),
            onClick: (row) => {
              this.updateRepository(row)
            }
          },
          delete: {
            icon: 'el-icon-delete',
            label: this.$t('base.delete.button'),
            onClick: (rows) => {
              this.deleteRepository(rows)
            }
          }
        },
        columns: [
          {
            prop: 'ipAddress',
            label: this.$t('backstage.ip.paging.tableHeader.ipAddress')
          },
          {
            prop: 'icp',
            align: 'center',
            label: this.$t('backstage.ip.paging.tableHeader.icp'),
            render: (row) => {
              return (<label class={row['icp'] === 0 ? 'el-icon-check' : ''}></label>)
            }
          },
          {
            prop: 'idc',
            label: this.$t('backstage.ip.paging.tableHeader.idc')
          },
          {
            prop: 'ipLocation',
            label: this.$t('backstage.ip.paging.tableHeader.ipLocation')
          },
          {
            prop: 'merchantName',
            label: this.$t('backstage.ip.paging.tableHeader.merchantName')
          },
          {
            prop: 'ossCatalog',
            label: this.$t('backstage.ip.paging.tableHeader.ossCatalog')
          },
          {
            prop: 'quantity',
            align: 'center',
            label: this.$t('backstage.ip.paging.tableHeader.quantity')
          },
          {
            prop: 'status',
            align: 'center',
            label: this.$t('backstage.ip.paging.tableHeader.status'),
            render: (row) => {
              return (<label class={row['status'] === 0 ? 'el-icon-check' : ''}></label>)
            }
          },
          {
            prop: 'createTime',
            width: 100,
            dataType: 'datetime',
            dataFormat: 'yyyy-MM-dd',
            label: this.$t('backstage.ip.paging.tableHeader.createTime')
          },
          {
            prop: 'deadline',
            width: 100,
            dataType: 'datetime',
            dataFormat: 'yyyy-MM-dd',
            label: this.$t('backstage.ip.paging.tableHeader.deadline')
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('backstage.ip.paging.empty.content'),
          buttonLabel: this.$t('backstage.ip.paging.empty.buttonLabel'),
          onClick: () => {
            this.addRepository()
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
            this.addRepository()
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
      fetchIpPaging({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {}
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
    addRepository () {
      this.$router.push('/main/base/ip/add')
    },
    /**
     * 修改跳转
     */
    updateRepository (row) {
      this.$router.push(`/main/base/ip/update/${row.id}`)
    },
    /**
     * 删除
     */
    deleteRepository (rows) {
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
              instance.confirmButtonLoading = true
              fetchIpDelete({
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
