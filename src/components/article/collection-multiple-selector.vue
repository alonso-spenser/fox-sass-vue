<template>
  <el-dialog
    :title="$t('collectionSelector.heading')"
    :visible.sync="display"
    :show-close="true"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    top="100px"
    width="600px">
    <div class="mt-4">
      <el-select
        v-model="selectedItems"
        multiple
        filterable
        remote
        reserve-keyword
        allow-create
        :loading-text="$t('collectionSelector.loadingText')"
        :no-match-text="$t('collectionSelector.noMatchText')"
        :no-data-text="$t('collectionSelector.noDataText')"
        default-first-option
        :placeholder="$t('base.placeholder.select')"
        :remote-method="collectionSearch"
        class="w-100"
        value-key="id"
        :disabled="disabled"
        @change="collectionChange"
        @visible-change="collectionSearch"
        :loading="loading">
        <el-option
          v-for="(item, index) in dataset"
          :key="`tag-${item.id}-${index}`"
          :label="item.title"
          :value="item">
          {{item.title}}
        </el-option>
      </el-select>
    </div>
    <div slot="footer" class="dialog-footer">
      <label class="text-secondary mr-5">
        {{ $t('collectionSelector.tips') }} <b>{{articles.length}}</b> {{ $t('collectionSelector.item') }}
      </label>
      <el-button size="small" :disabled="selectedItems.length === 0" :loading="loading" @click="removeData">
        {{ $t('collectionSelector.remove') }}
      </el-button>
      <el-button size="small" :disabled="selectedItems.length === 0" :loading="loading" type="primary" @click="joinToData">
        {{ $t('collectionSelector.join') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import * as http from '@/plugins/api/article'

/**
 * 新闻集合多选器
 */
export default {
  name: 'collection-multiple-selector',
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
    infoType: {
      type: Number,
      default: () => {
        return 1
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
      http.articleRemoveFromCollection({
        article: this.articles.map((o) => {
          return o.id
        }),
        collection: this.selectedItems.map((o) => {
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
      http.articleJoinToCollection({
        article: this.articles.map((o) => {
          return o.id
        }),
        collection: this.selectedItems.map((o) => {
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
    collectionSearch (value) {
      if (!this.utility.isEmpty(value)) {
        this.loading = true
        http.articleCollectionList({
          siteId: this.siteId,
          title: typeof value === 'string' ? value : '',
          region: this.regionCode,
          infoType: this.infoType,
          collectionType: 1
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
    collectionChange (rows) {
      this.selectedItems.forEach((o, index) => {
        if (typeof (o) === 'string') {
          this.disabled = true
          http.articleCollectionQuickly({
            siteId: this.siteId,
            title: o,
            region: this.regionCode,
            infoType: this.infoType,
            collectionType: 1
          })
            .then(result => {
              if (result.success) {
                this.selectedItems.splice(index, 1, result.data)
                this.dataset = this.selectedItems
                this.collectionSearch(true)
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
<style lang="scss">
.collection-selector-item {
  overflow: hidden;
  border: 1px solid red;
  label {
    float: right;
  }
}
</style>
