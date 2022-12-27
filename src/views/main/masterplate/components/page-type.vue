<template>
  <div>
    <el-dialog
      :show-close="false"
      :visible="visible"
      title="适用网站类型"
      width="450px"
      @close="dialogClose"
    >
      <el-select
        class="w-100"
        multiple
        v-model="currentSiteType"
        :placeholder="$t('theme.page.update.entity.pageType.placeholder')"
      >
        <el-option
          v-for="item in siteType"
          :key="item.pageType"
          :label="item.label"
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

export default {
  name: 'sectionPageType',
  extends: extend,
  data () {
    return {
      currentSiteType: [],
      siteType: []
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
        // this.getPageSection()
      }
    }
  },
  created () {
    this.siteType = this.resource.siteType
  },
  methods: {
    addSection () {
      this.$emit('update', this.currentSiteType)
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
