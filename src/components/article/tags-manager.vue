<template>
  <el-dialog
    :title="tagType === 1 ? $t('tagsManager.article.heading') : $t('tagsManager.product.heading')"
    :visible.sync="display"
    :show-close="true"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    top="100px"
    width="600px">
    <p v-if="tagType===1">
      {{ $t('tagsManager.article.subheading') }}
    </p>
    <p v-else>
      {{ $t('tagsManager.product.subheading') }}
    </p>
    <el-tag
      :key="item.id"
      v-for="(item, index) in dataset"
      closable
      type="info"
      :disable-transitions="false"
      @close="closeTag(item.id, index)">
      {{item.tagName}}
    </el-tag>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogClose">
        {{ $t('base.operate.cancel') }}
      </el-button>
      <el-button size="small" :loading="loading" type="primary" @click="removeTags">
        {{ $t('base.operate.save') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import { articleTagList } from '@/plugins/api/article'

/**
 * 标签管理器
 */
export default {
  name: 'tags-manager',
  extends: extend,
  data () {
    return {
      dataset: [],
      ids: []
    }
  },
  computed: {
    /**
     * 站点信息
     */
    siteModel () {
      return this.$store.state.siteModel
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
    }
  },
  watch: {
    /**
     * 监控窗口显示状态
     */
    display (val) {
      if (val) {
        this.getData()
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
     * 选择使用并关闭窗体
     */
    removeTags () {
      this.loading = true
      this.$emit('close', this.ids, () => {
        this.loading = false
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
     * 获取数据
     */
    getData () {
      this.ids = []
      this.loading = true
      articleTagList({
        siteId: this.siteId,
        tagType: this.tagType,
        region: this.regionCode
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.dataset = result.data
              this.loading = false
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
