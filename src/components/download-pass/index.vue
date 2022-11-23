<template>
  <el-dialog
    :title="$t('site.pass.title')"
    :visible.sync="visible"
    :show-close="true"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    top="100px"
    width="500px">
    {{ $t('site.pass.content') }}
    <el-form
      class="mt-4"
      :model="entity"
      :rules="formRules"
      ref="update"
      label-width="100px"
      label-position="top"
    >
      <el-form-item prop="downPass">
        <el-input
          :maxlength="10"
          show-word-limit
          v-model="entity.downPass"
          :placeholder="$t('site.pass.downPass.placeholder')"
        ></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button size="small" :loading="loading" type="primary" @click="formValidation">
        {{ $t('base.operate.save') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import {
  fetchDownloadPass,
  fetchGetDownloadPass
} from '@/plugins/api/site'
export default {
  name: 'siteSettings',
  extends: extend,
  data () {
    return {
      entity: {
        downPass: ''
      },
      searchAddress: '',
      formRules: {
        downPass: [
          {
            required: true,
            message: this.$t('site.pass.downPass.required'),
            trigger: 'blur'
          },
          {
            pattern: /^[A-Za-z0-9]{4,10}$/,
            message: this.$t('site.pass.downPass.custom'),
            trigger: 'blur'
          }
        ]
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
    entity: {
      deep: true,
      handler () {
        this.unsaved = true
      }
    },
    visible (val) {
      if (val) {
        this.getData()
      }
    }
  },
  methods: {
    getData () {
      fetchGetDownloadPass({
        siteId: this.siteId
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity.downPass = result.data
            }
          })
        })
    },
    /**
     * 调用父级关闭事件，关闭窗体
     */
    dialogClose () {
      this.$emit('update:visible', false)
    },
    /**
     * 验证
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateSite()
        } else {
          this.$message({
            type: 'error',
            message: this.$t('base.formValidation.inadequate').toString()
          })
        }
      })
    },
    /**
     * 保存设置
     */
    updateSite () {
      fetchDownloadPass({
        siteId: this.siteId,
        downPass: this.entity.downPass
      })
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            this.dialogClose()
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    }
  }
}
</script>
