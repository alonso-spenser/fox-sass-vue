<template>
  <main>
    <fox-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
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
                <el-select
                  v-model="refType"
                  slot="prepend"
                  @change="getData"
                >
                  <el-option
                    :value="9"
                    :label="$t('settings.route.refType')['9']"></el-option>
                  <el-option
                    :value="0"
                    :label="$t('settings.route.refType')['0']"></el-option>
                </el-select>
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  :loading="loading"
                  @click="getData(false)"
                ></el-button>
              </el-input>
            </el-col>
            <el-col :span="10">
              <el-button @click="routeVisible = true">{{ $t('base.operate.paste') }}</el-button>
            </el-col>
          </el-row>
          <fox-page-section
            class="mt-5"
            v-if="routeVisible">
            <el-alert
              type="warning">
              {{ $t('settings.route.tips') }}
            </el-alert>
            <el-input
              v-model="routeValue"
              type="textarea"
              :rows="6"
              class="mt-3"
              :placeholder="placeholder"></el-input>
            <el-button
              class="mt-5"
              @click="analyseRoute">
              {{ $t('base.operate.save') }}
            </el-button>
            </fox-page-section>
        </template>
        </fox-paging-table>
        </fox-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/paging'
import {
  fetchSiteRoutePaging,
  fetchSiteRouteDelete,
  fetchSiteRouteUpdate
} from '@/plugins/api/site'

export default {
  name: 'siteRoute',
  extends: extend,
  data () {
    return {
      dataConfig: {
        actions: {
          delete: {
            icon: 'el-icon-delete',
            label: this.$t('base.delete.button'),
            onClick: (rows) => {
              this.deleteRoute(rows)
            }
          }
        },
        columns: [
          {
            prop: 'original',
            label: this.$t('settings.route.paging.tableHeader.original')
          },
          {
            prop: 'target',
            label: this.$t('settings.route.paging.tableHeader.target')
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('settings.route.paging.empty.content'),
          buttonLabel: this.$t('settings.route.paging.empty.buttonLabel'),
          onClick: () => {
            this.addRoute()
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
      routeVisible: false,
      routeValue: '',
      refType: 9,
      placeholder: '/item/contact\t/page/123\n' +
        '/products/details/this-is-a-apple\t/item/this-is-a-apple'
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
            this.addRoute()
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
      this.pagingOptions.firstLoading = false
      fetchSiteRoutePaging({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
          siteId: this.siteId,
          region: this.regionCode,
          refType: this.refType,
          url: this.searchConditions.keyword
        }
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.pagingOptions.recordCount = result.data.total
              this.pagingOptions.dataset = result.data['records']
              this.tableOptions.loading = false
            }
          })
        })
        .catch(error => {
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    analyseRoute () {
      if (this.utility.isEmpty(this.routeValue)) {
        return
      }
      this.routeValue = this.routeValue.replace(/\t/gi, ' ')
      let list = []
      this.routeValue.split('\n').forEach((value) => {
        if (value.indexOf('http') === -1) {
          let s = value.split(' ')
          if (s.length > 1) {
            let original = s[0]
            let target = s[1]
            if (original.indexOf('/') > 0 || original.indexOf('/') === -1) {
              original = '/' + original
            }
            if (target.indexOf('/') > 0 || target.indexOf('/') === -1) {
              target = '/' + target
            }
            list.push({
              original,
              target
            })
          }
        }
      })
      fetchSiteRouteUpdate({
        region: this.regionCode,
        siteId: this.siteId,
        urlList: list
      })
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.routeValue = ''
              this.routeVisible = false
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
    deleteRoute (rows) {
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
              fetchSiteRouteDelete({
                ids: ids,
                siteId: this.siteId
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
