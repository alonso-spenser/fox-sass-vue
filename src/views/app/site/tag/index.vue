<template>
  <main>
    <fo-page-header
      :actions="[
        {
          label: $t('base.addition.button'),
          icon: 'el-icon-plus',
          type: 'primary',
          visible: true,
          click: () => {
            this.addTag()
          }
        }
      ]"
    >
      <el-breadcrumb class="breadcrumb-wrap" separator="/">
        <el-breadcrumb-item
          :to="`/site/${this.siteId}/dashboard`"
        >{{ $t('site.dashboard.title') }}</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="`/site/${this.siteId}/${tagType}`"
        >{{ $t(`${tagType}.paging.title`) }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('article.tag.paging.title') }}</el-breadcrumb-item>
      </el-breadcrumb>
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
      </fo-paging-table>
    </fo-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/paging'
import * as http from '@/plugins/api/article'

export default {
  name: 'articleTag',
  extends: extend,
  data () {
    return {
      dataConfig: {
        actions: {
          update: {
            icon: 'el-icon-edit',
            label: this.$t('base.update.button'),
            onClick: (row) => {
              this.updateTag(row)
            }
          },
          delete: {
            icon: 'el-icon-delete',
            label: this.$t('base.delete.button'),
            onClick: (rows) => {
              this.deleteTag(rows)
            }
          }
        },
        columns: [
          {
            prop: 'tagName',
            label: this.$t('article.tag.paging.tableHeader.tagName')
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('article.tag.paging.empty.content'),
          buttonLabel: this.$t('article.tag.paging.empty.buttonLabel'),
          onClick: () => {
            this.addTag()
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
      tagType: 'article',
      infoType: 1
    }
  },
  created () {
    this.tagType = this.$route.params.tagType
    let infoType = this.resource.infoType[this.tagType]
    if (infoType !== undefined) {
      this.infoType = infoType
    }
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
      http.articleTagPaging({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
          siteId: this.siteId,
          region: this.regionCode,
          tagType: this.infoType,
          tagName: this.searchConditions.keyword
        }
      })
        .then(result => {
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
    addTag () {
      this.$router.push(`/site/${this.siteId}/article/tag/add`)
    },
    /**
     * 修改跳转
     */
    updateTag (row) {
      this.$router.push(`/site/${this.siteId}/article/tag/update/${row.id}`)
    },
    /**
     * 删除
     */
    deleteTag (rows) {
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
              http.articleTagDelete({
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
