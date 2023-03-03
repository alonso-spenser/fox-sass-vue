<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
    :percentage="100"
  >
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
              <el-select
                v-model="searchConditions.searchType"
                slot="prepend"
                :placeholder="$t('base.placeholder.search')"
              >
                <el-option
                  :label="$t('goods.searchType.name')"
                  :value="1"
                ></el-option>
                <el-option
                  :label="$t('goods.searchType.collection')"
                  :value="2"
                ></el-option>
                <el-option
                  :label="$t('goods.searchType.tag')"
                  :value="3"
                ></el-option>
              </el-select>
              <el-button
                slot="append"
                icon="el-icon-search"
                :loading="loading"
                @click="getData(false)"
              ></el-button>
            </fox-input>
          </div>
          <div class="filter-params-element">
            <fox-select
              shrink
              v-model="searchConditions.orderBy"
              :placeholder="$t('base.orderBy')"
              :description="$t('base.placeholder.search')"
              @change="getData(false)"
            >
              <el-option
                :label="$t('goods.orderBy.updateTimeASC')"
                value="updateTime-ASC"
              ></el-option>
              <el-option
                :label="$t('goods.orderBy.updateTimeDESC')"
                value="updateTime-DESC"
              ></el-option>
              <el-option
                :label="$t('goods.orderBy.createTimeASC')"
                value="createTime-ASC"
              ></el-option>
              <el-option
                :label="$t('goods.orderBy.createTimeDESC')"
                value="createTime-DESC"
              ></el-option>
              <el-option
                :label="$t('goods.orderBy.initialASC')"
                value="initial-ASC"
              ></el-option>
              <el-option
                :label="$t('goods.orderBy.initialDESC')"
                value="initial-DESC"
              ></el-option>
              <el-option
                :label="$t('goods.orderBy.sortDesc')"
                value="sortIndex-DESC"
              ></el-option>
            </fox-select>
          </div>
          <div class="filter-params-element">
            <el-button
              class="el-material-button"
              icon="el-icon-refresh"
              :loading="refresherLoading"
              :title="$t('app.refresher.button')"
              @click="sortRefresher(1)"
            >
            </el-button>
            <el-button
              class="el-material-button"
              icon="el-icon-brush"
              :loading="refresherLoading"
              :title="$t('app.refresher.init')"
              @click="sortRefresher(0)"
            >
            </el-button>
            <el-button
              icon="el-icon-plus"
              type="primary"
              plain
              class="ml-7"
              :title="$t('goods.paging.add')"
              @click="addGoods"
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
      :loading="false"
      :multi-select="true"
      :index-number="false"
      :stripe="true"
      :card-style="true"
      :border="false"
      :first-loading="pagingOptions.firstLoading"
      :empty="dataConfig.empty"
      :page-index.sync="pagingOptions.pageIndex"
      :page-size.sync="pagingOptions.pageSize"
      :record-count="pagingOptions.recordCount"
      :rows-class-name="dataConfig.rowsClassName"
      size="small"
      @paging="getData"
    >
    </fox-paging-table>
    <collection-multiple-selector
      :info-type="resource.infoType.goods"
      :articles="selectedItems"
      :display="collectionVisible"
      @close="updateCollection"
    ></collection-multiple-selector>
    <tags-multiple-selector
      :tag-type="resource.infoType.goods"
      :articles="selectedItems"
      :display="tagsVisible"
      @close="updateTag"
    ></tags-multiple-selector>
  </fox-layout-main>
</template>

<script>
import collectionMultipleSelector from '@/components/article/collection-multiple-selector'
import tagsMultipleSelector from '@/components/article/tags-multiple-selector'
import extend from '@/plugins/page/paging'
import * as http from '@/plugins/api/goods'
import * as articleApi from '@/plugins/api/article'
import {
  articleSort,
  articleState,
  articleSticky
} from '@/plugins/api/article'
import { mapState } from 'vuex'
import { fetchIncreaseTranslate } from '@/plugins/api/site'

export default {
  name: 'goodsSpu',
  extends: extend,
  components: {
    tagsMultipleSelector,
    collectionMultipleSelector
  },
  computed: {
    ...mapState(['siteModel']),
    /**
     * 面包屑下拉操作
     */
    dataConfig () {
      let data = {
        actions: {
          update: {
            label: this.$t('base.update.button'),
            invisible: true,
            onClick: (row) => {
              this.updateGoods(row)
            }
          },
          disable: {
            label: this.$t('article.paging.actions.disable'),
            onClick: (rows) => {
              this.goodsDisable(rows)
            }
          },
          enable: {
            label: this.$t('article.paging.actions.enable'),
            onClick: (rows) => {
              this.goodsEnable(rows)
            }
          },
          sticky: {
            divided: true,
            label: this.$t('article.paging.actions.sticky'),
            onClick: (rows) => {
              this.batchSticky(rows, 0)
            }
          },
          cancelSticky: {
            label: this.$t('article.paging.actions.cancelSticky'),
            onClick: (rows) => {
              this.batchSticky(rows, 1)
            }
          },
          addCollection: {
            divided: true,
            label: this.$t('article.paging.actions.addCollection'),
            onClick: (rows) => {
              if (rows.length > 0) {
                this.selectedItems = rows
                this.collectionVisible = true
              }
            }
          },
          addTag: {
            label: this.$t('article.paging.actions.addTag'),
            onClick: (rows) => {
              if (rows.length > 0) {
                this.selectedItems = rows
                this.tagsVisible = true
              }
            }
          },
          clone: {
            divided: true,
            label: this.$t('goods.paging.actions.clone.button'),
            onClick: (rows) => {
              this.goodsClone(rows)
            }
          },
          delete: {
            label: this.$t('base.delete.button'),
            onClick: (rows) => {
              this.deleteGoods(rows)
            }
          }
        },
        columns: [
          {
            prop: 'coverImage',
            label: this.$t('goods.paging.tableHeader.coverImage'),
            image: true,
            width: 80
          },
          {
            prop: 'title',
            label: this.$t('goods.paging.tableHeader.title'),
            render: (row) => {
              return (
                <p class="text-truncate">
                  {row['hasAnnex'] === 0 ? <i class="el-icon-paperclip"/> : ''}
                  {row['title']}
                </p>
              )
            }
          },
          {
            prop: 'minPrice',
            width: 200,
            align: 'center',
            label: this.$t('goods.paging.tableHeader.minPrice'),
            render: (row) => {
              return (
                <label>
                  {
                    row['minPrice'].toFixed(2)
                  }
                  {
                    row['maxPrice'] === row['minPrice'] ? '' : ` ~ ${row['maxPrice'].toFixed(2)}`
                  }
                </label>
              )
            }
          },
          {
            prop: 'sortIndex',
            label: this.$t('article.paging.tableHeader.sortIndex'),
            width: 80,
            align: 'center',
            render: (row, index, ctx, h) => {
              return h('input', {
                'class': 'el-input__inner small text-center',
                domProps: {
                  value: row['sortIndex']
                },
                on: {
                  click: (e) => {
                    e.stopPropagation()
                  },
                  blur: (e) => {
                    this.updateSortIndex(row, e)
                  }
                }
              })
            }
          },
          {
            prop: 'skuCount',
            width: 100,
            align: 'center',
            label: this.$t('goods.paging.tableHeader.skuCount')
          },
          {
            prop: 'sticky',
            label: this.$t('article.paging.tableHeader.sticky'),
            width: 60,
            switch: true,
            switchActive: 0,
            switchInactive: 1,
            onClick: row => {
              this.goodsSticky([row.id], row.sticky, true)
            }
          },
          {
            prop: 'state',
            label: this.$t('article.paging.tableHeader.state'),
            width: 60,
            switch: true,
            switchActive: 0,
            switchInactive: 1,
            onClick: row => {
              this.goodsState([row.id], row.state, true)
            }
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('goods.paging.empty.content'),
          buttonLabel: this.$t('goods.paging.empty.buttonLabel'),
          onClick: () => {
            this.addGoods()
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
      if (this.siteModel.maxLang > 1 && this.regionCode === this.siteModel.langCode) {
        data.columns.push({
          prop: 'translated',
          label: '',
          align: 'center',
          width: 60,
          visible: 'translated',
          visibleValue: 1,
          render: (row, index, ctx, h) => {
            return h('el-popover', {
              props: {
                placement: 'bottom',
                title: '',
                popperClass: 'el-popover-table',
                trigger: 'hover'
              }
            }, [
              h('div', { style: { width: 80, textAlign: 'center' } }, [
                h('el-button', {
                  props: {
                    type: 'text'
                  },
                  class: 'text-primary',
                  on: {
                    click: (e) => {
                      this.singleTranslate(row, 1)
                      e.stopPropagation()
                    }
                  }
                }, this.$t('article.translate.clone')),
                h('el-button', {
                  props: {
                    type: 'text'
                  },
                  class: 'text-primary',
                  on: {
                    click: (e) => {
                      this.singleTranslate(row, 0)
                      e.stopPropagation()
                    }
                  }
                }, this.$t('article.translate.action'))
              ]),
              h('el-button', {
                slot: 'reference',
                class: 'text-secondary',
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: (e) => {
                    e.stopPropagation()
                  }
                }
              }, this.$t('article.translate.label'))
            ])
          }
        })
      }
      return data
    }
  },
  data () {
    return {
      refresherLoading: false,
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
      searchConditions: {
        ...this.searchConditions,
        searchType: 1
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
     * 更新INDEX
     * @param row
     * @param value
     */
    updateSortIndex (row, e) {
      let value = e.target.value
      if (!/^\+?[1-9]\d*$/.test(value)) {
        e.target.value = row.sortIndex
        return
      }
      value = parseInt(value)
      if (value === row.sortIndex) {
        return
      }
      articleSort({
        spuId: row.id,
        sortIndex: value
      }).then(result => {
        result.options = {
          action: this.actionType.update
        }
        this.resultMessage(result, (success) => {
          if (success) {
            this.getData(true)
          }
        })
      })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 单个翻译
     * @param row 数据
     * @param translate 是否翻译
     */
    singleTranslate (row, translate) {
      fetchIncreaseTranslate({
        catalog: 1,
        id: row.id,
        siteId: this.siteId,
        translate: translate
      }).then(result => {
        result.options = {
          formName: 'update',
          action: this.actionType.addition,
          success: '提交成功，系统会处理内容的翻译工作，预计用时 60 分钟左右，请稍后查看。'
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
      http.goodsPaging({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        orderBy: this.searchConditions.orderBy,
        params: {
          siteId: this.siteId,
          infoType: this.resource.infoType.goods,
          searchType: this.searchConditions.searchType,
          keyword: this.searchConditions.keyword,
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
    addGoods () {
      this.$router.push(`/site/${this.siteId}/goods/add`)
    },
    /**
     * 修改跳转
     */
    updateGoods (row) {
      this.$router.push(`/site/${this.siteId}/goods/update/${row.id}`)
    },
    /**
     * 禁用
     */
    goodsDisable (rows) {
      const ids = []
      rows.forEach(o => {
        ids.push(o.id)
      })
      this.goodsState(ids, 1, true)
    },
    /**
     * 启用
     */
    goodsEnable (rows) {
      const ids = []
      rows.forEach(o => {
        ids.push(o.id)
      })
      this.goodsState(ids, 0, true)
    },
    /**
     * 禁用
     */
    batchSticky (rows, state) {
      const ids = []
      rows.forEach(o => {
        ids.push(o.id)
      })
      this.goodsSticky(ids, state, true)
    },
    /**
     * 文章状态
     * @param ids
     * @param state
     * @param load 是否再次加载数据
     */
    goodsState (ids, state, load) {
      articleState({
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
     * 置顶
     * @param ids
     * @param state
     * @param load 是否再次加载数据
     */
    goodsSticky (ids, state, load) {
      articleSticky({
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
     * 刷新排序
     */
    sortRefresher (initial) {
      this.refresherLoading = true
      articleApi.articleSortRefresher({
        siteId: this.siteId,
        region: this.regionCode,
        infoType: this.resource.infoType.goods,
        initial: initial
      })
        .then(result => {
          this.refresherLoading = false
          this.resultMessage(result, (success) => {
            if (success) {
              this.getData(true)
            }
          })
        })
        .catch(error => {
          this.refresherLoading = false
          this.networkMistake(error)
        })
    },
    /**
     * 删除
     */
    deleteGoods (rows) {
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
              http.goodsDelete({
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
     * 更新集合
     */
    updateCollection () {
      this.collectionVisible = false
    },
    updateTag () {
      this.tagsVisible = false
    },
    /**
     * 克隆产品
     */
    goodsClone (rows) {
      const ids = []
      rows.forEach(o => {
        ids.push(o.id)
      })
      this.$confirm(
        this.$t('goods.paging.actions.clone.tips').toString().replace('{0}', ids.length),
        this.$t('goods.paging.actions.clone.button').toString(),
        {
          confirmButtonText: this.$t('base.operate.confirm'),
          cancelButtonText: this.$t('base.operate.cancel'),
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              articleApi.articleClone({
                ids: ids,
                siteId: this.siteId
              })
                .then(result => {
                  this.resultMessage(result, () => {
                    done()
                    instance.confirmButtonLoading = false
                    this.getData()
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
        }
      )
    }
  }
}
</script>
