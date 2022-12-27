<template>
  <el-dialog
    :title="model.title"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="dialogClose"
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="mt-5">
      <el-form-item :label="model.name" prop="title">
        <el-input v-model="ruleForm.title" :placeholder="model.placeholder"></el-input>
      </el-form-item>
      <el-form-item :label="$t('core.dict.sort.label')" prop="sort">
        <el-input v-model.number="ruleForm.sort" :placeholder="$t('core.dict.sort.placeholder')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('core.dict.remark.label')" prop="remark">
        <el-input type="textarea" :rows="2"
                  :placeholder="$t('core.dict.remark.placeholder')"
                  maxlength="255"
                  show-word-limit
                  v-model="ruleForm.remark">
        </el-input>
      </el-form-item>
    </el-form>
    <p slot="footer" class="dialog-footer">
      <el-button type="primary" plain @click="dialogClose">
        {{ $t('base.operate.cancel') }}
      </el-button>
      <el-button type="primary"  @click="formValidation('ruleForm')">
        {{ $t('base.operate.save') }}
      </el-button>
    </p>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/paging'
import { fetchAgentDictDetail, fetchAgentDictUpdate } from '@/plugins/api/core'
export default {
  extends: extend,
  name: 'dict-update',
  props: {
    model: {
      type: [Object],
      required: true
    }
  },
  data () {
    return {
      dialogVisible: true,
      ruleForm: {
        title: '',
        sort: 0,
        remark: '',
        dicType: this.model.dicType
      },
      rules: {
        title: [
          {
            required: true,
            message: ' ',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    if (this.model.id) {
      this.getDetail()
    }
  },
  methods: {
    /**
     * 关闭窗口
     * @param done
     */
    dialogClose (done) {
      this.ruleForm = {
        title: '',
        sort: '',
        remark: '',
        dicType: ''
      }
      this.model.id = ''
      this.$emit('close', false)
    },
    /**
     * 表单校验
     * @param formName
     */
    formValidation (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateDict()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * 表单重设
     * @param formName
     */
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    /**
     * 详情
     */
    getDetail () {
      fetchAgentDictDetail({
        id: this.model.id
      }).then(result => {
        this.resultMessage(result, (success) => {
          if (success) {
            this.ruleForm = result.data
          }
        })
      }).catch(error => {
        this.networkMistake(error)
      })
    },
    /**
     * 添加 & 修改
     */
    updateDict () {
      fetchAgentDictUpdate(this.ruleForm).then(result => {
        result.options = {
          action: this.model.id ? this.actionType.update : this.actionType.addition,
          formName: 'ruleForm'
        }
        this.resultMessage(result, (success) => {
          if (success) {
            this.resetForm('ruleForm')
            this.dialogClose()
          }
        })
      }).catch(error => {
        this.networkMistake(error)
      })
    }
  }
}
</script>
