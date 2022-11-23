<template>
  <el-dialog
    :title="$t('tagsMultipleSelector.heading')"
    :visible.sync="display"
    :show-close="true"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    top="100px"
    width="600px">
    {{ heading }}

    <div class="mt-4">
      <el-select
        v-model.trim="selectedItems"
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
        :disabled="disabled"
        @visible-change="tagsSearch"
        @change="tagsChange"
        :loading="loading">
        <el-option
          v-for="(item, index) in dataset"
          :key="`${item.id}-${index}`"
          :label="item.tagName"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <div slot="footer" class="dialog-footer">
      <label class="text-secondary mr-5">
        {{ $t('tagsMultipleSelector.tips') }} <b>{{articles.length}}</b> {{ $t('tagsMultipleSelector.item') }}
      </label>
      <el-button size="small" :disabled="selectedItems.length === 0" :loading="loading" @click="removeData">
        {{ $t('tagsMultipleSelector.remove') }}
      </el-button>
      <el-button size="small" :disabled="selectedItems.length === 0" :loading="loading" type="primary" @click="joinToData">
        {{ $t('tagsMultipleSelector.join') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import * as http from '@/plugins/api/article'

/**
 * 标签多选器
 */
export default {
  name: 'tags-multiple-selector',
  extends: extend,
  data () {
    return {
      dataset: [],
      disabled: false,
      selectedItems: []
    }
  },
  props: {
    display: {
      type: Boolean,
      default: false
    },
    tagType: {
      type: Number,
      default: () => {
        return 1
      }
    },
    heading: {
      type: String,
      default: () => {
        return ''
      }
    },
    articles: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    /**
     * 监控窗口显示状态
     */
    display (val) {
      if (val) {
        this.dataset = []
        this.selectedItems = []
      }
    }
  },
  methods: {
    /**
     * 调用父级关闭事件，关闭窗体
     */
    dialogClose () {
      this.$emit('close', [])
    },
    /**
     * 移除
     */
    removeData () {
      this.loading = true
      http.articleRemoveFromTag({
        article: this.articles.map((o) => {
          return o.id
        }),
        tag: this.selectedItems.map((o) => {
          return o.id
        }),
        siteId: this.siteId
      })
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, () => {
            this.$emit('close')
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 选择使用并关闭窗体
     */
    joinToData () {
      this.loading = true
      http.articleJoinToTag({
        article: this.articles.map((o) => {
          return o.id
        }),
        tag: this.selectedItems.map((o) => {
          return o.id
        }),
        siteId: this.siteId
      })
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, () => {
            this.$emit('close')
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 关闭单个标签
     */
    closeTag (id, index) {
      this.dataset.splice(index, 1)
      this.ids.push(id)
    },
    /**
     * 搜索标签
     * @param value
     */
    tagsSearch (value) {
      if (!this.utility.isEmpty(value)) {
        this.loading = true
        http.articleTagList({
          siteId: this.siteId,
          tagType: this.tagType,
          region: this.regionCode,
          tagName: typeof value === 'string' ? value : ''
        })
          .then(result => {
            this.resultMessage(result, (success) => {
              if (success) {
                this.dataset = result.data
              }
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
     * 快速添加新标签
     * @param rows
     */
    tagsChange (rows) {
      this.selectedItems.forEach((o, index) => {
        if (typeof (o) === 'string') {
          this.disabled = true
          http.articleTagQuickly({
            siteId: this.siteId,
            tagType: this.tagType,
            tagName: o,
            region: this.regionCode
          })
            .then(result => {
              if (result.success) {
                this.selectedItems.splice(index, 1, result.data)
                this.dataset = this.selectedItems
                this.tagsSearch(true)
              }
              this.disabled = false
            })
            .catch(error => {
              this.disabled = false
              this.networkMistake(error)
            })
        }
      })
    }
  }
}
</script>
