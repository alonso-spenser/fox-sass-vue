<template>
  <el-dialog
    title="CSS VARIABLE REPLACE"
    width="640px"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :before-close="dialogClose"
  >
    <el-input
      type="textarea"
      v-model="cssValue"
      :rows="10"
    ></el-input>
    <div slot="footer" class="dialog-footer clearfix">
      <el-button @click="formatCSS" size="small">
        FORMAT
      </el-button>
      <el-button @click="dialogClose" size="small">
        {{ $t('base.operate.cancel') }}
      </el-button>
      <el-button type="primary" size="small" @click="formValidation">
        {{ $t('base.operate.save') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import cssbeautify from 'cssbeautify'
export default {
  name: 'css-variable',
  data () {
    return {
      cssValue: ''
    }
  },
  props: {
    value: {
      type: String,
      default: () => ''
    },
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  watch: {
    cssValue (val) {
      this.$emit('input', this.cssValue)
    },
    value () {
      this.cssValue = this.value
    }
  },
  created () {
    this.cssValue = this.value
  },
  methods: {
    /**
     * CSS FORMAT
     */
    formatCSS () {
      if (this.utility.isNotEmpty(this.cssValue)) {
        this.cssValue = cssbeautify(this.cssValue.replace(/\/\*(\s|.)*?\*\//g, ''), {
          indent: '\t',
          openbrace: 'end-of-line',
          autosemicolon: false
        })
      }
    },
    /**
     * 关闭窗体
     * @param done
     */
    dialogClose (done) {
      this.$emit('update:visible', false)
    },
    formValidation () {
      this.formatCSS()
      this.$emit('change', this.utility.clearCSSVariable(cssbeautify(this.cssValue.replace(/\/\*(\s|.)*?\*\//g, ''), {
        indent: '\t',
        openbrace: 'end-of-line',
        autosemicolon: false
      })))
      this.$emit('update:visible', false)
    }
  }
}
</script>
