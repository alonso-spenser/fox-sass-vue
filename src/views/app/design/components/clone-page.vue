<template>
  <div
    class="fox-section"
    style="margin-top: 5px">
    <el-row>
      <el-col
        :span="3"
        :offset="1"
        @click.native="clonePage"
      >
        <svg
          t="1637727051566"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="14034">
          <path
            d="M682.666667 341.333333h128v469.333334H341.333333v-128H213.333333V213.333333h469.333334v128z m0 85.333334v256h-256v42.666666h298.666666v-298.666666h-42.666666zM298.666667 298.666667v298.666666h298.666666V298.666667H298.666667z"
            p-id="14035"></path>
        </svg>
      </el-col>
      <el-col
        @click.native="clonePage"
        class="text-truncate"
        :span="13">
        {{ $t('design.clonePage.title') }}
      </el-col>
      <el-col
        class="text-center"
        :span="6"
        @click.native="pasteFormClipboard"
        v-if="pasteVisible"
      >
        <el-button
          size="small"
          round
          type="primary"
          plain>{{ $t('base.operate.paste') }}
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>
<style
  lang='scss'
  src="@/assets/design.scss"></style>
<script>
export default {
  name: 'clone-page',
  data () {
    return {}
  },
  props: {
    /**
     * 粘贴组件按钮
     */
    pasteVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  methods: {
    /**
     * 从剪贴板中粘贴
     */
    clonePage () {
      this.$emit('clone')
    },
    /**
     * 从剪贴板中粘贴
     */
    pasteFormClipboard () {
      this.$emit('paste')
    }
  }
}
</script>
