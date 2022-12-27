<template>
  <el-dialog
    :title="$t('specPresetSave.product.heading')"
    :visible.sync="display"
    :show-close="true"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    top="100px"
    width="600px">
    {{ $t('specPresetSave.product.subheading') }}
    <el-form class="mt-5" :model="entity" :rules="formRules" ref="update" label-width="100px" label-position="top">
      <el-form-item prop="title" :label="$t('specPresetSave.entity.title.label')">
        <el-input
          :maxlength="32"
          show-word-limit
          v-model="entity.title"
          :placeholder="$t('specPresetSave.entity.title.placeholder')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="entity.isDefault">
          {{$t('specPresetSave.entity.isDefault.label')}}
        </el-checkbox>
        <label class="text-secondary">
          {{$t('specPresetSave.entity.isDefault.description')}}
        </label>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogClose">
        {{ $t("base.operate.cancel") }}
      </el-button>
      <el-button size="small" :loading="loading" type="primary" @click="formValidation">
        {{ $t("base.operate.save") }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/base'
import { articleSpecUpdate } from '@/plugins/api/article'

/**
 * 规格参数预设保存
 */
export default {
  name: 'spec-preset-save',
  extends: extend,
  data () {
    return {
      entity: {
        isDefault: true,
        title: ''
      },
      formRules: {
        title: [
          {
            required: true,
            message: this.$t('specPresetSave.entity.title.required'),
            trigger: 'blur'
          }
        ]
      }
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
    dataset: {
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
        this.entity.title = ''
      }
    }
  },
  methods: {
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateSpec()
        }
      })
    },
    /**
     * 调用父级关闭事件，关闭窗体
     */
    dialogClose () {
      this.$emit('close')
    },
    /**
     * 更新数据
     */
    updateSpec () {
      this.loading = true
      articleSpecUpdate({
        ...this.entity,
        siteId: this.siteId,
        region: this.regionCode,
        isDefault: this.entity ? 0 : 1,
        jsonData: JSON.stringify(this.dataset)
      })
        .then(result => {
          result.options = {
            action: this.actionType.addition,
            formName: 'update'
          }
          this.resultMessage(result, () => {
            this.dialogClose()
          })
        })
        .catch(error => {
          this.dialogClose()
          this.networkMistake(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
