<template>
  <fox-page-section
    :heading="inlay ? '' : heading"
  >
    <div
      class="fox-page-section-header negative"
      v-if="inlay">
      <div class="el-form-item__label">
        {{ heading }}
      </div>
      <el-button
        @click="manageCollection"
        type="text">
        {{ $t('article.update.collection.manage') }}
      </el-button>
    </div>
    <template
      slot="header"
      v-else>
      <el-button
        @click="manageCollection"
        type="text">
        {{ $t('article.update.collection.manage') }}
      </el-button>
    </template>
    <el-select
      shrink
      v-model="collectionList"
      multiple
      filterable
      remote
      reserve-keyword
      allow-create
      :loading-text="$t('article.update.collection.loadingText')"
      :no-match-text="$t('article.update.collection.noMatchText')"
      :no-data-text="$t('article.update.collection.noDataText')"
      default-first-option
      :placeholder="$t('base.placeholder.select')"
      :remote-method="collectionSearch"
      class="w-100"
      value-key="id"
      :disabled="collectionsDisabled"
      @visible-change="collectionSearch"
      @change="collectionChange"
      :loading="loading">
      <el-option
        v-for="(item, index) in collectionsResult"
        :key="`tag-${item.id}-${index}`"
        :label="item.title"
        :value="item">
        {{ item.title }}
      </el-option>
    </el-select>
  </fox-page-section>
</template>

<script>
import extend from '@/plugins/page/base'
import * as http from '@/plugins/api/article'

/**
 * 添加到集合
 */
export default {
  name: 'collectionSelect',
  extends: extend,
  data () {
    return {
      collectionList: [],
      /**
       * 集合搜索结果
       */
      collectionsResult: [],
      /**
       * 添加集合时，标签下拉框状态
       */
      collectionsDisabled: false,
      heading: '',
      catalog: 'article'
    }
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     * 集合类型
     */
    infoType: {
      type: Number,
      default: () => {
        return 1
      }
    },
    inlay: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  watch: {
    value: {
      deep: true,
      handler (val) {
        this.collectionList = val
        if (this.collectionsResult.length === 0) {
          this.collectionsResult = val
        }
      }
    },
    collectionList: {
      deep: true,
      handler (val) {
        this.$emit('input', val)
      }
    },
    infoType (val, newVal) {
      if (val !== newVal) {
        this.collectionList = []
        this.collectionsResult = []
        this.getCatalog()
      }
    }
  },
  created () {
    this.getCatalog()
  },
  methods: {
    /**
     * KEY
     */
    getCatalog () {
      for (let key in this.resource.infoType) {
        if (this.resource.infoType[key] === this.infoType) {
          this.catalog = key
        }
      }
      this.heading = this.$t(`article.collection.${this.catalog}.title`)
    },
    /**
     * 集合 选项改变时
     * 快速添加集合
     * @param rows
     */
    collectionChange (rows) {
      this.collectionList.forEach((o, index) => {
        if (typeof (o) === 'string') {
          this.collectionsDisabled = true
          http.articleCollectionQuickly({
            siteId: this.siteId,
            title: o,
            region: this.regionCode,
            infoType: this.infoType
          })
            .then(result => {
              this.resultMessage(result, (success) => {
                if (success) {
                  this.collectionList.splice(index, 1, result.data)
                  this.collectionsResult = this.collectionList
                  this.collectionSearch(true)
                }
              })
              this.collectionsDisabled = false
            })
            .catch(error => {
              this.collectionsDisabled = false
              this.networkMistake(error)
            })
        }
      })
    },
    /**
     * 管理集合
     */
    manageCollection () {
      this.utility.openSite(`/site/${this.siteId}/${this.catalog}/collection`)
    },
    /**
     * 集合搜索
     * @param value
     */
    collectionSearch (value) {
      if (!this.utility.isEmpty(value)) {
        this.loading = true
        http.articleCollectionList({
          siteId: this.siteId,
          title: typeof value === 'string' ? value : '',
          infoType: this.infoType,
          region: this.regionCode,
          collectionType: 1
        })
          .then(result => {
            this.resultMessage(result, (success) => {
              this.collectionsResult = result.data
              this.unsaved = true
            })
            this.loading = false
          })
          .catch(error => {
            this.networkMistake(error)
          })
      }
    }
  }
}
</script>
