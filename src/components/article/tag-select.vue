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
        @click="tagsManagerVisible=true"
        type="text">
        {{ $t('tagSelect.manage') }}
      </el-button>
    </div>
    <template
      slot="header"
      v-else>
      <el-button
        @click="tagsManagerVisible=true"
        type="text">
        {{ $t('tagSelect.manage') }}
      </el-button>
    </template>
    <el-select
      v-model="tagList"
      multiple
      filterable
      remote
      reserve-keyword
      allow-create
      :loading-text="$t('tagsMultipleSelector.loadingText')"
      :no-match-text="$t('tagsMultipleSelector.noMatchText')"
      :no-data-text="$t('tagsMultipleSelector.noDataText')"
      default-first-option
      :placeholder="$t('base.placeholder.select')"
      :remote-method="tagsSearch"
      class="w-100"
      value-key="id"
      :disabled="tagDisabled"
      @visible-change="tagsSearch"
      @change="tagsChange"
      style="overflow: hidden"
      :loading="loading">
      <el-option
        v-for="(item, index) in tagsResult"
        :key="`tag-${item.id}-${index}`"
        :label="item.tagName"
        :value="item">
        {{ item.tagName }}
      </el-option>
    </el-select>
    <tags-manager
      :tag-type="infoType"
      :display="tagsManagerVisible"
      @close="tagsRemove"
    >
    </tags-manager>
  </fox-page-section>
</template>

<script>
import extend from '@/plugins/page/base'
import * as http from '@/plugins/api/article'
import tagsManager from './tags-manager'

/**
 * 添加到集合
 */
export default {
  name: 'tagSelect',
  extends: extend,
  components: {
    tagsManager
  },
  data () {
    return {
      tagList: [],
      heading: '',
      catalog: 'article',
      /**
       * 标签搜索结果数据
       */
      tagsResult: [],
      /**
       * 添加标签时，标签下拉框状态
       */
      tagDisabled: false,
      /**
       * 标签管理器弹窗
       */
      tagsManagerVisible: false
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
        this.tagList = val
        if (this.tagsResult.length === 0) {
          this.tagsResult = val
        }
      }
    },
    tagList: {
      deep: true,
      handler (val) {
        this.$emit('input', val)
      }
    }
  },
  created () {
    for (let key in this.resource.infoType) {
      if (this.resource.infoType[key] === this.infoType) {
        this.catalog = key
      }
    }
    this.heading = this.$t(`tagSelect.${this.catalog}.title`)
  },
  methods: {
    /**
     * 搜索TAG
     * @param value
     */
    tagsSearch (value) {
      if (!this.utility.isEmpty(value)) {
        this.loading = true
        http.articleTagList({
          siteId: this.siteId,
          tagName: typeof value === 'string' ? value : '',
          region: this.regionCode,
          tagType: this.infoType
        })
          .then(result => {
            this.resultMessage(result, (success) => {
              this.tagsResult = result.data
            })
            this.loading = false
          })
          .catch(error => {
            this.networkMistake(error)
          })
      }
    },
    /**
     * tags 选项改变时
     * @param rows
     */
    tagsChange (rows) {
      this.tagList.forEach((o, index) => {
        if (typeof (o) === 'string') {
          this.tagDisabled = true
          http.articleTagQuickly({
            siteId: this.siteId,
            tagType: this.infoType,
            tagName: o,
            region: this.regionCode
          })
            .then(result => {
              this.resultMessage(result, (success) => {
                if (success) {
                  this.tagList.splice(index, 1, result.data)
                  this.tagsResult = this.tagList
                  this.tagsSearch(true)
                }
              })
              this.tagDisabled = false
            })
            .catch(error => {
              this.tagDisabled = false
              this.networkMistake(error)
            })
        }
      })
    },
    /**
     * 标签移出
     */
    tagsRemove (ids, func) {
      if (ids && ids.length > 0) {
        http.articleTagDelete({
          siteId: this.siteId,
          ids: ids
        })
          .then(result => {
            this.resultMessage(result, () => {
              this.tagList.forEach((o, index) => {
                if (ids.indexOf(o.id) !== -1) {
                  this.tagList.splice(index, 1)
                }
              })
              this.tagsResult.forEach((o, index) => {
                if (ids.indexOf(o.id) !== -1) {
                  this.tagsResult.splice(index, 1)
                }
              })
              this.tagsDialogClose(func)
            })
          })
          .catch(error => {
            this.networkMistake(error)
            this.tagsDialogClose(func)
          })
      } else {
        this.tagsDialogClose(func)
      }
    },
    /**
     * 标签管理弹窗关闭
     */
    tagsDialogClose (func) {
      this.tagsManagerVisible = false
      if (func && typeof (func) === 'function') {
        func.call(this)
      }
    }
  }
}
</script>
