<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
    :percentage="100"
  >
    <fox-page-header
      v-if="false"
      :actions="crumbAction"
      slot="header">
      <el-breadcrumb
        class="breadcrumb-wrap"
        separator="/">
        <el-breadcrumb-item
          :to="`/site/${this.siteId}/dashboard`"
        >{{ $t('site.dashboard.title') }}
        </el-breadcrumb-item>
        <el-breadcrumb-item
          :to="`/site/${this.siteId}/${collectionType}`"
        >{{ $t(`${collectionType}.paging.title`) }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t(`article.collection.${collectionType}.title`) }}</el-breadcrumb-item>
      </el-breadcrumb>
    </fox-page-header>
    <div class="neighbor fox-google-style percent-100" slot="header">
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
          <div class="filter-params-element ml-7">
            <el-button
              icon="el-icon-plus"
              type="primary"
              plain
              class="el-material-button"
              @click="addCollection"
            >
            </el-button>
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
      stripe
      size="small"
      @paging="getData"
    >
    </fox-paging-table>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/paging'
import * as http from '@/plugins/api/article'

export default {
  name: 'articleCollection',
  extends: extend,
  data () {
    return {
      dataConfig: {
        actions: {
          update: {
            invisible: true,
            label: this.$t('base.update.button'),
            onClick: (row) => {
              this.updateCollection(row)
            }
          },
          disable: {
            label: this.$t('article.collection.paging.actions.disable'),
            onClick: (rows) => {
              this.collectionState(rows, 1, true)
            }
          },
          enable: {
            label: this.$t('article.collection.paging.actions.enable'),
            onClick: (rows) => {
              this.collectionState(rows, 0, true)
            }
          },
          delete: {
            label: this.$t('base.delete.button'),
            onClick: (rows) => {
              this.deleteCollection(rows)
            }
          }
        },
        columns: [
          {
            prop: 'coverImage',
            label: this.$t('article.collection.paging.tableHeader.coverImage'),
            image: true,
            width: 80
          },
          {
            prop: 'title',
            label: this.$t('article.collection.paging.tableHeader.title')
          },
          {
            prop: 'collectionType',
            width: 100,
            label: this.$t('article.collection.paging.tableHeader.collectionType'),
            render: (row) => {
              return (
                <label>
                  {row.collectionType === 1
                    ? this.$t('article.conditionFilter.collectionType.manual.label')
                    : this.$t('article.conditionFilter.collectionType.auto.label')}
                </label>
              )
            }
          },
          {
            prop: 'refCount',
            width: 100,
            align: 'center',
            label: this.$t('article.collection.paging.tableHeader.refCount')
          },
          {
            prop: 'updateTime',
            label: this.$t('article.collection.paging.tableHeader.updateTime'),
            width: 150,
            dataType: 'datetime',
            dataFormat: 'yyyy-MM-dd hh:mm'
          },
          {
            prop: 'state',
            label: this.$t('article.collection.paging.tableHeader.state'),
            switch: true,
            switchActive: 0,
            switchInactive: 1,
            align: 'right',
            width: 100,
            onClick: (row) => {
              this.collectionState([row], row.state, false)
            }
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('article.collection.paging.empty.content'),
          buttonLabel: this.$t('article.collection.paging.empty.buttonLabel'),
          onClick: () => {
            this.addCollection()
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
      collectionType: 'article',
      infoType: 1,
      /**
       * 面包屑操作
       */
      crumbAction: [
        {
          label: this.$t('base.addition.button'),
          icon: 'el-icon-plus',
          visible: true,
          click: () => {
            this.addCollection()
          }
        }
      ]
    }
  },
  watch: {
    '$route' () {
      this.initAllType()
    }
  },
  created () {
    this.initAllType()
  },
  methods: {
    initAllType () {
      this.collectionType = this.$route.params.collectionType
      let infoType = this.resource.infoType[this.collectionType]
      if (infoType !== undefined) {
        this.infoType = infoType
      }
      this.pagingCache((success) => {
        this.getData(success)
      })
      document.title = this.$t(`${this.collectionType}.paging.title`).toString() + ' - ' + this.$t(`article.collection.${this.collectionType}.title`)
    },
    /**
     * 集合状态
     * @param ids
     * @param state
     * @param load 是否再次加载数据
     */
    collectionState (rows, state, load) {
      const ids = []
      rows.forEach(o => {
        ids.push(o.id)
      })
      http.articleCollectionState({
        ids: ids,
        state: state,
        siteId: this.siteId
      })
        .then(result => {
          this.resultMessage(result, success => {
            if (success && load) {
              this.getData()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
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
      http.articleCollectionPaging({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
          siteId: this.siteId,
          region: this.regionCode,
          infoType: this.infoType,
          title: this.searchConditions.keyword
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
    addCollection () {
      this.redirectURL(`/site/${this.siteId}/${this.collectionType}/collection/add`)
    },
    /**
     * 修改跳转
     */
    updateCollection (row) {
      this.redirectURL(`/site/${this.siteId}/${this.collectionType}/collection/update/${row.id}`)
    },
    /**
     * 删除
     */
    deleteCollection (rows) {
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
              http.articleCollectionDelete({
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
