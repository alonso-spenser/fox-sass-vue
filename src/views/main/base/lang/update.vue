<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    :percentage="30"
    google-style
  >
    <el-form
      :model="entity"
      :rules="formRules"
      ref="update"
    >
      <fox-section>
        <el-form-item
          prop="languageName">
          <fox-input
            shrink
            v-model="entity.languageName"
            :placeholder="$t('core.base.lang.update.entity.languageName.label')"
            :description="$t('core.base.lang.update.entity.languageName.placeholder')"
          ></fox-input>
        </el-form-item>

        <el-form-item
          prop="nativeName">
          <fox-input
            shrink
            v-model="entity.nativeName"
            :placeholder="$t('core.base.lang.update.entity.nativeName.label')"
            :description="$t('core.base.lang.update.entity.nativeName.placeholder')"
          ></fox-input>
        </el-form-item>
        <el-form-item
          prop="code">
          <fox-input
            shrink
            v-model="entity.code"
            :placeholder="$t('core.base.lang.update.entity.code.label')"
            :description="$t('core.base.lang.update.entity.code.placeholder')"
          ></fox-input>
        </el-form-item>
        <el-form-item
          prop="aliCode">
          <fox-input
            shrink
            v-model="entity.aliCode"
            :placeholder="$t('core.base.lang.update.entity.aliCode.label')"
            :description="$t('core.base.lang.update.entity.aliCode.placeholder')"
          ></fox-input>
        </el-form-item>

        <el-form-item
          prop="aliNo">
          <fox-input
            shrink
            v-model="entity.aliNo"
            :placeholder="$t('core.base.lang.update.entity.aliNo.label')"
            :description="$t('core.base.lang.update.entity.aliNo.placeholder')"
          ></fox-input>
        </el-form-item>
        <el-form-item
          prop="icon"
          v-if="false">
          <fox-input
            v-model="entity.icon"
            shrink
            :placeholder="$t('core.base.lang.update.entity.icon.label')"
            :description="$t('core.base.lang.update.entity.icon.placeholder')"
          ></fox-input>
        </el-form-item>

        <el-form-item
          prop="state">
          <el-switch
            v-model="entity.state"
            :active-value="0"
            :active-text="$t('core.base.lang.update.entity.state.label')"
            inactive-color="#ff4949"
            :inactive-value="1">
          </el-switch>
        </el-form-item>

      </fox-section>
    </el-form>
    <fox-unsaved
      :unsaved.sync="unsaved"
      :loading="loading"
      @confirmed="formValidation"
    >
    </fox-unsaved>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import { fetchLangUpdate, fetchLangDelete, fetchLangDetail } from '@/plugins/api/main/core'

export default {
  name: 'mainBaseLangUpdate',
  extends: extend,
  data () {
    return {
      entity: {

        code: '',
        icon: '',
        name: '',
        state: 0
      },
      formRules: {
        code: [
          {
            required: true,
            message: this.$t('core.base.lang.update.entity.code.required'),
            trigger: 'blur'
          }
        ],
        languageName: [
          {
            required: true,
            message: this.$t('core.base.lang.update.entity.languageName.required'),
            trigger: 'blur'
          }
        ],
        nativeName: [
          {
            required: true,
            message: this.$t('core.base.lang.update.entity.nativeName.required'),
            trigger: 'blur'
          }
        ],
        state: [
          {
            required: true,
            message: this.$t('core.base.lang.update.entity.state.required'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    entity: {
      deep: true,
      handler () {
        this.unsaved = true
      }
    }
  },
  created () {
    if (this.id) {
      this.getDetail()
    } else {
      this.pageValid()
    }
  },
  methods: {
    /**
     * 上一步
     */
    previous () {
      this.$router.push('/base/lang')
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid, fields) => {
        if (valid) {
          this.loading = true
          if (this.id) {
            this.updateLang()
          } else {
            this.addLang()
          }
        } else {
          this.unverified(fields)
        }
      })
    },
    /**
     * 获取详情
     */
    getDetail () {
      fetchLangDetail({
        id: this.id
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity = result.data
              this.$nextTick(() => {
                this.unsaved = false
              })
            }
          })
        })
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 添加数据
     */
    addLang () {
      fetchLangUpdate(this.entity)
        .then(result => {
          result.options = {
            action: this.actionType.addition,
            formName: 'update'
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.previous()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 更新数据
     */
    updateLang () {
      fetchLangUpdate(this.entity)
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.previous()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 删除
     */
    deleteLang () {
      this.$confirm(this.$t('base.delete.subheading').toString(), this.$t('base.delete.heading').toString(), {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        closeOnClickModal: false,
        type: 'error',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            fetchLangDelete({
              ids: [this.id]
            })
              .then(result => {
                result.options = {
                  action: this.actionType.delete,
                  url: '/main/base/lang'
                }
                this.resultMessage(result, () => {
                  done()
                  instance.confirmButtonLoading = false
                })
              })
              .catch(error => {
                this.networkMistake(error)
                done()
                instance.confirmButtonLoading = false
              })
          } else {
            instance.confirmButtonLoading = false
            done()
          }
        }
      })
    }
  }
}
</script>
