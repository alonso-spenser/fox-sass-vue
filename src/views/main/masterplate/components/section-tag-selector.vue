<template>
  <div>
    <el-dialog
      :show-close="false"
      :visible="visible"
      title="SECTION TAG"
      width="450px"
      @close="dialogClose"
    >
      <el-select
        class="w-100"
        multiple
        v-model="currentTagList"
        placeholder="请选择"
      >
        <el-option
          v-for="item in tagList"
          :key="item.id"
          :label="item.tagName"
          :value="item.id"
        ></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogClose">{{$t('base.operate.cancel')}}</el-button>
        <el-button size="small" @click="addSection">{{$t('base.operate.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import { fetchThemeSectionTagList } from '@/plugins/api/theme'

export default {
  name: 'sectionTagSelector',
  extends: extend,
  data () {
    return {
      currentTagList: [],
      tagList: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    /**
     * 监控窗口显示状态
     */
    visible (val) {
      if (val) {
        this.getData()
      }
    }
  },
  methods: {
    /**
     * 分页
     */
    getData () {
      fetchThemeSectionTagList()
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.tagList = result.data
              this.$nextTick(() => {
                this.unsaved = false
              })
            }
          })
        })
        .catch(error => {
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    addSection () {
      this.$emit('update', this.currentTagList)
    },
    /**
     * 关闭
     */
    dialogClose () {
      this.$emit('update:visible', false)
    },
    /**
     * 绑定组件
     */
    updatePageSection () {
    }
  }
}
</script>
