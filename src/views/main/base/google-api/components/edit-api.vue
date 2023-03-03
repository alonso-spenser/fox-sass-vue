<template>
  <el-dialog
    title="上传"
    width="640px"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :before-close="dialogClose"
    v-loading="loading"
  >
    <fox-file-single
      v-model="entity.file"
      :width="300"
      :auto-upload="false"
      :server-address="utility.uploadURL()"
      file-folder="test"
      :extra-parameters="entity"
      ref="uploadControl"
      @success="uploadSuccess"
    ></fox-file-single>
    <div slot="footer" class="dialog-footer clearfix">
      <el-button @click="dialogClose">
        {{ $t('base.operate.cancel') }}
      </el-button>
      <el-button type="primary" :loading="loading" @click="formValidation">
        {{ $t('base.operate.save') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import * as http from '@/plugins/api/theme'

export default {
  name: 'themeUpdate',
  extends: extend,
  data () {
    return {
      entity: {
        file: ''
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible (val) {
    }
  },
  created () {
  },
  methods: {
    /**
     * 表单校验
     */
    formValidation () {
      this.$refs.uploadControl.formSubmit()
    },
    /**
     * 关闭窗体
     * @param done
     */
    dialogClose (done) {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
    uploadSuccess (data) {
      console.log(JSON.stringify(data))
    }
  }
}
</script>
