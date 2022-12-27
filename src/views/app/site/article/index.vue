<template>
  <main>
    <fo-page-header
      :actions="headerAction"
      :drop-actions="dropAction"
    >
    </fo-page-header>
    <fo-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
      :percentage="100"
      :full-screen="true"
    >
      <fo-paging-table
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
          <el-row
            class="dataset-search"
            :gutter="20">
            <el-col :span="10">
              <el-input
                :placeholder="$t('base.placeholder.search')"
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
                    :label="$t('article.searchType.name')"
                    :value="1"
                  ></el-option>
                  <el-option
                    :label="$t('article.searchType.collection')"
                    :value="2"
                  ></el-option>
                  <el-option
                    :label="$t('article.searchType.tag')"
                    :value="3"
                  ></el-option>
                </el-select>
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  :loading="loading"
                  @click="getData(false)"
                ></el-button>
              </el-input>
            </el-col>
            <el-col
              :span="10"
              :offset="4"
              class="text-right">
              <label>
                {{ $t("base.orderBy") }}
              </label>
              <el-select
                class="ml-2"
                v-model="searchConditions.orderBy"
                :placeholder="$t('base.placeholder.search')"
                @change="getData(false)"
              >
                <el-option
                  :label="$t('article.orderBy.updateTimeASC')"
                  value="updateTime-ASC"
                ></el-option>
                <el-option
                  :label="$t('article.orderBy.updateTimeDESC')"
                  value="updateTime-DESC"
                ></el-option>
                <el-option
                  :label="$t('article.orderBy.createTimeASC')"
                  value="createTime-ASC"
                ></el-option>
                <el-option
                  :label="$t('article.orderBy.createTimeDESC')"
                  value="createTime-DESC"
                ></el-option>
                <el-option
                  :label="$t('article.orderBy.initialASC')"
                  value="initial-ASC"
                ></el-option>
                <el-option
                  :label="$t('article.orderBy.initialDESC')"
                  value="initial-DESC"
                ></el-option>
                <el-option
                  :label="$t('article.orderBy.sortDesc')"
                  value="sortIndex-DESC"
                ></el-option>
              </el-select>
              <el-button
                icon="el-icon-refresh"
                class="ml-2"
                :loading="refresherLoading"
                :title="$t('app.refresher.button')"
                @click="sortRefresher(1)"
              >
              </el-button>
              <el-button
                icon="el-icon-brush"
                class="ml-2"
                :loading="refresherLoading"
                :title="$t('app.refresher.init')"
                @click="sortRefresher(0)"
              >
              </el-button>
            </el-col>
          </el-row>
        </template>
      </fo-paging-table>
      <collection-multiple-selector
        :info-type="resource.infoType.article"
        :articles="selectedItems"
        :display="collectionVisible"
        @close="updateCollection"
      ></collection-multiple-selector>
      <tags-multiple-selector
        :tag-type="resource.infoType.article"
        :articles="selectedItems"
        :display="tagsVisible"
        @close="updateTag"
      ></tags-multiple-selector>
    </fo-page-loading>
  </main>
</template>

<script>
import collectionMultipleSelector from '@/components/article/collection-multiple-selector'
import tagsMultipleSelector from '@/components/article/tags-multiple-selector'
import extend from '@/plugins/page/paging'
import * as http from '@/plugins/api/article'
import { mapState } from 'vuex'
import { fetchIncreaseTranslate } from '@/plugins/api/site'

export default {
  name: 'article',
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
            onClick: row => {
              this.updateArticle(row)
            }
          },
          disable: {
            label: this.$t('article.paging.actions.disable'),
            onClick: rows => {
              this.articleDisable(rows)
            }
          },
          enable: {
            label: this.$t('article.paging.actions.enable'),
            onClick: rows => {
              this.articleEnable(rows)
            }
          },
          sticky: {
            divided: true,
            label: this.$t('article.paging.actions.sticky'),
            onClick: rows => {
              this.batchSticky(rows, 0)
            }
          },
          cancelSticky: {
            label: this.$t('article.paging.actions.cancelSticky'),
            onClick: rows => {
              this.batchSticky(rows, 1)
            }
          },
          addCollection: {
            divided: true,
            label: this.$t('article.paging.actions.addCollection'),
            onClick: rows => {
              if (rows.length > 0) {
                this.selectedItems = rows
                this.collectionVisible = true
              }
            }
          },
          addTag: {
            label: this.$t('article.paging.actions.addTag'),
            onClick: rows => {
              if (rows.length > 0) {
                this.selectedItems = rows
                this.tagsVisible = true
              }
            }
          },
          clone: {
            divided: true,
            label: this.$t('article.paging.actions.clone.button'),
            onClick: rows => {
              console.log('articleClone clicked')
              this.articleClone(rows)
            }
          },
          delete: {
            label: this.$t('base.delete.button'),
            onClick: rows => {
              this.deleteArticle(rows)
            }
          }
        },
        columns: [
          {
            prop: 'coverImage',
            label: this.$t('article.paging.tableHeader.coverImage'),
            image: true,
            width: 80
          },
          {
            prop: 'title',
            label: this.$t('article.paging.tableHeader.title'),
            render: (row) => {
              return (
                <p class="text-truncate">
                  {row.hasAnnex === 0 ? <i class="el-icon-paperclip" /> : ''}
                  {row.title}
                </p>
              )
            }
          },
          {
            prop: 'createTime',
            label: this.$t('article.paging.tableHeader.createTime'),
            width: 150,
            dataType: 'datetime',
            dataFormat: 'yyyy-MM-dd hh:mm'
          },
          {
            prop: 'sortIndex',
            label: this.$t('article.paging.tableHeader.sortIndex'),
            width: 60
          },
          {
            prop: 'sticky',
            label: this.$t('article.paging.tableHeader.sticky'),
            width: 60,
            switch: true,
            switchActive: 0,
            switchInactive: 1,
            onClick: row => {
              this.articleSticky([row.id], row.sticky, true)
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
              this.articleState([row.id], row.state, true)
            }
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('article.paging.empty.content'),
          buttonLabel: this.$t('article.paging.empty.buttonLabel'),
          onClick: () => {
            this.addArticle()
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
          prop: 'state',
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
      translateVisible: false,
      headerAction: [
        {
          label: this.$t('article.paging.add'),
          icon: 'el-icon-plus',
          type: 'primary',
          visible: true,
          click: () => {
            this.addArticle()
          }
        }
      ],
      dropAction: [],
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
    // http.taskDetail({
    //   'id': '1418132334128750593'
    // })
  },
  methods: {
    /**
     * 单个翻译
     * @param row 数据
     * @param translate 是否翻译
     */
    singleTranslate (row, translate) {
      fetchIncreaseTranslate({
        catalog: 0,
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
      http.articlePaging({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        orderBy: this.searchConditions.orderBy,
        params: {
          siteId: this.siteId,
          infoType: this.resource.infoType.article,
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
     * 禁用
     */
    articleDisable (rows) {
      const ids = []
      rows.forEach(o => {
        ids.push(o.id)
      })
      this.articleState(ids, 1, true)
    },
    /**
     * 启用
     */
    articleEnable (rows) {
      const ids = []
      rows.forEach(o => {
        ids.push(o.id)
      })
      this.articleState(ids, 0, true)
    },
    /**
     * 禁用
     */
    batchSticky (rows, state) {
      const ids = []
      rows.forEach(o => {
        ids.push(o.id)
      })
      this.articleSticky(ids, state, true)
    },
    /**
     * 添加跳转
     */
    addArticle () {
      this.$router.push(`/site/${this.siteId}/article/add`)
    },
    /**
     * 修改跳转
     */
    updateArticle (row) {
      this.$router.push(`/site/${this.siteId}/article/update/${row.id}`)
    },
    /**
     * 刷新排序
     */
    sortRefresher (initial) {
      this.refresherLoading = true
      http.articleSortRefresher({
        siteId: this.siteId,
        region: this.regionCode,
        infoType: this.resource.infoType.article,
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
     * 文章状态
     * @param ids
     * @param state
     * @param load 是否再次加载数据
     */
    articleState (ids, state, load) {
      http.articleState({
        ids: ids,
        state: state,
        siteId: this.siteId
      })
        .then(result => {
          this.resultMessage(result, success => {
            if (success && load) {
              this.getData(false)
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 文章置顶
     * @param ids
     * @param state
     * @param load 是否再次加载数据
     */
    articleSticky (ids, state, load) {
      http.articleSticky({
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
     * 克隆文章
     */
    articleClone (rows) {
      const ids = []
      rows.forEach(o => {
        ids.push(o.id)
      })
      this.$confirm(
        this.$t('article.paging.actions.clone.tips').toString().replace('{0}', ids.length),
        this.$t('article.paging.actions.clone.button').toString(),
        {
          confirmButtonText: this.$t('base.operate.confirm'),
          cancelButtonText: this.$t('base.operate.cancel'),
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              http.articleClone({
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
    },
    /**
     * 删除
     */
    deleteArticle (rows) {
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
              http.articleDelete({
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
    }
  }
}
</script>
