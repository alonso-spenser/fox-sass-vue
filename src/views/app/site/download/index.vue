<template>
  <main>
    <fox-page-header
      :actions="crumbAction"
    >
    </fox-page-header>
    <fox-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
      :percentage="100"
    >
      <fox-paging-table
        :columns="dataConfig.columns"
        :actions="dataConfig.actions"
        :dataset="pagingOptions.dataset"
        :loading="false"
        :multi-select="true"
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
        <template slot="header">
          <el-row class="dataset-search" :gutter="20">
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
      <collection-multiple-selector
        :info-type="resource.infoType.download"
        :articles="selectedItems"
        :display="collectionVisible"
        @close="updateCollection"
      ></collection-multiple-selector>
    </fox-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/paging'
import collectionMultipleSelector from '@/components/article/collection-multiple-selector'
import * as http from '@/plugins/api/resource'

export default {
  name: 'resourceDown',
  extends: extend,
  components: {
    collectionMultipleSelector
  },
  data () {
    return {
      dataConfig: {
        actions: {
          update: {
            label: this.$t('base.update.button'),
            invisible: true,
            onClick: row => {
              this.updateDown(row)
            }
          },
          addCollection: {
            label: this.$t('article.paging.actions.addCollection'),
            onClick: rows => {
              if (rows.length > 0) {
                this.selectedItems = rows
                this.collectionVisible = true
              }
            }
          },
          delete: {
            label: this.$t('base.delete.button'),
            onClick: rows => {
              this.deleteDown(rows)
            }
          }
        },
        columns: [
          {
            prop: 'coverImage',
            label: this.$t('site.resource.paging.tableHeader.coverImage'),
            image: true,
            placeholder: 'https://code.fomille.cn/default/179.jpg',
            width: 80
          },
          {
            prop: 'title',
            label: this.$t('site.resource.paging.tableHeader.title')
          },
          {
            label: this.$t('site.resource.paging.tableHeader.url'),
            width: 120,
            button: true,
            align: 'center',
            group: [{
              name: this.$t('site.resource.paging.tableHeader.visit'),
              plain: true,
              onClick: (row) => {
                this.utility.openSite(row.url)
              }
            }]
          },
          {
            prop: 'suffix',
            label: this.$t('site.resource.paging.tableHeader.suffix'),
            width: 60,
            align: 'center'
          },
          {
            prop: 'createTime',
            label: this.$t('site.resource.paging.tableHeader.createTime'),
            width: 150,
            dataType: 'datetime',
            dataFormat: 'yyyy-MM-dd hh:mm'
          }
        ],
        /**
         * 行高亮
         * @param row 行数据
         */
        rowsClassName: row => {
          return row.state === 0 ? 'row-text-enable' : ''
        },
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('site.resource.paging.empty.content'),
          buttonLabel: this.$t('site.resource.paging.empty.buttonLabel'),
          onClick: () => {
            this.addDown()
          }
        }
      },
      /**
       * 标签弹窗
       */
      tagsVisible: false,
      /**
       * 集合弹窗
       */
      collectionVisible: false,
      /**
       * 选中的项
       */
      selectedItems: [],
      /**
       * 搜索条件
       */
      searchConditions: {
        searchType: 1
      },
      refresherLoading: false
    }
  },
  computed: {
    /**
     * 面包屑操作
     */
    crumbAction () {
      return [
        {
          label: this.$t('article.collection.download.title'),
          icon: 'el-icon-setting',
          type: 'primary',
          visible: true,
          click: () => {
            this.$router.push(`/site/${this.siteId}/download/collection`)
          }
        },
        {
          label: this.$t('site.resource.paging.addButton'),
          icon: 'el-icon-plus',
          type: 'primary',
          visible: true,
          click: () => {
            this.addDown()
          }
        }
      ]
    }
  },
  created () {
    this.pagingOptions.pageSize = 40
    this.pagingCache(() => {
      this.getData(true)
    })
  },
  methods: {
    /**
     * 数据搜索
     */
    searchData () {
      this.pagingOptions.pageIndex = 1
      this.getData(false)
    },
    /**
     * 清空搜索条件
     */
    clearSearchCondition () {
      this.loading = true
      this.searchConditions.keyword = ''
      this.pagingOptions.pageIndex = 1
      this.searchConditions.clearVisible = false
      this.searchConditions.searchType = 1
      this.getData(true)
    },
    /**
     * 分页
     */
    getData (firstLoading) {
      this.loading = true
      this.tableOptions.loading = true
      http.resourcePaging({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        orderBy: 'createTime-DESC',
        params: {
          title: this.searchConditions.keyword,
          refType: 9,
          region: this.regionCode,
          siteId: this.siteId
        }
      })
        .then((result) => {
          this.pageValid()
          this.tableOptions.loading = false
          this.resultMessage(result, (success) => {
            if (success) {
              this.pagingOptions.recordCount = result.data.total
              this.pagingOptions.dataset = result.data['records']
              this.pagingOptions.firstLoading = firstLoading
            }
          })
        })
        .catch(error => {
          this.tableOptions.loading = false
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    /**
     * 添加跳转
     */
    addDown () {
      this.$router.push(`/site/${this.siteId}/download/add`)
    },
    /**
     * 修改跳转
     */
    updateDown (row) {
      this.$router.push(`/site/${this.siteId}/download/update/${row.id}`)
    },
    /**
     * 删除
     */
    deleteDown (rows) {
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
              http.resourceDelete({
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
    },
    /**
     * 刷新排序
     */
    sortRefresher () {
      // this.refresherLoading = true
      // http.articleSortRefresher({
      //   siteId: this.siteId,
      //   region: this.regionCode,
      //   infoType: this.resource.infoType.article
      // })
      //   .then(result => {
      //     this.refresherLoading = false
      //     this.resultMessage(result, (success) => {
      //       if (success) {
      //         this.getData(true)
      //       }
      //     })
      //   })
      //   .catch(error => {
      //     this.refresherLoading = false
      //     this.networkMistake(error)
      //   })
    },
    /**
     * 更新集合
     */
    updateCollection () {
      this.collectionVisible = false
    }
  }
}
</script>
