<template>
  <main>
    <fox-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
    >
      <fox-page-header
        :actions="[
        {
          label: $t('base.addition.button'),
          icon: 'el-icon-plus',
          type: 'primary',
          visible: true,
          click: () => {
            this.updateTheme('', true)
          }
        }
      ]"
      >
      </fox-page-header>
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
      </fox-paging-table>
      <edit-template
        :visible.sync="updateVisible"
        :theme-id="updateId"
        @close="editThemeUpdate"></edit-template>
    </fox-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/paging'
import * as http from '@/plugins/api/theme'
import EditTemplate from './components/edit-theme'

export default {
  name: 'theme',
  extends: extend,
  components: {
    EditTemplate
  },
  data () {
    return {
      dataConfig: {
        actions: {},
        columns: [
          {
            prop: 'screenshot',
            label: this.$t('theme.paging.tableHeader.screenshot'),
            image: true,
            width: 80
          },
          {
            prop: 'name',
            label: this.$t('theme.paging.tableHeader.name'),
            render: (row) => {
              return (
                <p class="text-truncate">
                  <a
                    href={row['demoUrl']}
                    target="_blank"
                    class="text-primary"> {row.name}</a>
                </p>
              )
            }
          },
          {
            prop: 'siteType',
            label: this.$t('theme.paging.tableHeader.siteType'),
            width: 80,
            render: (row) => {
              return (
                <p class="text-truncate">
                  {this.getSiteType(row['siteType'])}
                </p>
              )
            }
          },
          {
            prop: 'version',
            width: 80,
            label: this.$t('theme.paging.tableHeader.version'),
            align: 'center'
          },
          {
            prop: 'updateTime',
            label: this.$t('theme.paging.tableHeader.updateTime'),
            width: 150,
            dataType: 'datetime',
            dataFormat: 'yyyy-MM-dd hh:mm'
          },
          {
            prop: 'sortIndex',
            label: this.$t('theme.paging.tableHeader.sortIndex'),
            width: 60,
            align: 'center'
          },
          {
            prop: 'state',
            label: this.$t('theme.paging.tableHeader.state'),
            width: 100,
            align: 'center',
            switch: true,
            switchActive: 1,
            switchInactive: 0,
            onClick: row => {
              this.themeState([row.id], row.state, false)
            }
          },
          {
            button: true,
            label: '',
            width: 80,
            fixed: 'right',
            group: [
              {
                type: 'text',
                icon: 'el-icon-edit',
                size: 'medium',
                disabled: false,
                onClick: (row) => {
                  this.updateTheme(row.id, true)
                }
              },
              {
                type: 'text',
                icon: 'el-icon-delete',
                size: 'medium',
                disabled: false,
                onClick: (row) => {
                  this.deleteTheme([row])
                }
              }
            ]
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('theme.paging.empty.content'),
          buttonLabel: this.$t('theme.paging.empty.buttonLabel'),
          onClick: () => {
            this.updateTheme('', true)
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
      siteType: {},
      updateVisible: false,
      updateId: ''
    }
  },
  created () {
    this.pagingCache((success) => {
      this.getData(success)
    })
    this.siteType = this.$t('enumerate.siteType')
  },
  methods: {
    /**
     * 添加 & 修改回调
     */
    editThemeUpdate () {
      this.getData(true)
    },
    /**
     * 站点类型
     */
    getSiteType (index) {
      let s = this.siteType.filter((o) => {
        return o.id === index
      })
      return s.length > 0 ? s[0].label : ''
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
      this.tableOptions.multiSelect = false
      http.themePaging({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
          name: this.searchConditions.keyword
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
     * 修改跳转
     */
    updateTheme (id, visible) {
      this.updateId = id
      this.updateVisible = visible
    },
    /**
     * 主题状态
     * @param ids
     * @param state
     * @param load 是否再次加载数据
     */
    themeState (ids, state, load) {
      http.themeState({
        ids: ids,
        state: state
      })
        .then(result => {
          result.options = {
            action: this.actionType.update,
            formName: 'update'
          }
          this.resultMessage(result, (success) => {
            if (success) {
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
    deleteTheme (rows) {
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
              http.themeDelete({
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
