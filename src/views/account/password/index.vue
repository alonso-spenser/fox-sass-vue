<template>
  <main class="editable">
    <div class="fo-page-header-editable">
      <section class="global-page-container">
        <section class="global-page-content">
          <section class="global-page-main">
            <fo-page-header></fo-page-header>
          </section>
        </section>
      </section>
    </div>
    <fo-page-loading>
      <div class="global-editable-container">
        <fo-page-section>
          <el-form
            :model="entity"
            :rules="formRules"
            ref="passwordForm"
            :hide-required-asterisk="true"
            label-position="top"
            label-width="100px"
            class="setting-form"
          >
            <el-form-item
              prop="oldPass"
              :label="$t('merchant.password.entity.oldPass.label')"
            >
              <el-input
                v-model="entity.oldPass"
                auto-complete="off"
                :maxlength="20"
                :placeholder="$t('merchant.password.entity.oldPass.placeholder')"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="newPass"
              :label="$t('merchant.password.entity.newPass.label')"
            >
              <el-input
                type="password"
                v-model="entity.newPass"
                auto-complete="new-password"
                :maxlength="20"
                :placeholder="$t('merchant.password.entity.newPass.placeholder')"
              ></el-input>
            </el-form-item>
            <el-form-item
              class="mb-7"
              prop="checkPass"
              :label="$t('merchant.password.entity.checkPass.label')"
            >
              <el-input
                type="password"
                v-model="entity.checkPass"
                auto-complete="new-password"
                :maxlength="20"
                :placeholder="$t('merchant.password.entity.checkPass.placeholder')"
              ></el-input>
            </el-form-item>
          </el-form>
        </fo-page-section>
        <fo-fixed-unsaved
          :unsaved.sync="unsaved"
          :loading="loading"
          :height="126"
          tips=""
          @confirmed="formValidation"
        >
        </fo-fixed-unsaved>
      </div>
    </fo-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import { fetchUpdatePassword } from '@/plugins/api/passport'
export default {
  name: 'account-change-password',
  extends: extend,
  data () {
    const checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('merchant.password.entity.checkPass.required').toString()))
      } else if (value !== this.entity.newPass) {
        callback(new Error(this.$t('merchant.password.entity.checkPass.custom').toString()))
      } else {
        callback()
      }
    }
    return {
      entity: {},
      formRules: {
        oldPass: [
          {
            required: true,
            message: this.$t('merchant.password.entity.oldPass.required'),
            trigger: 'blur'
          }
        ],
        newPass: [
          {
            required: true,
            message: this.$t('merchant.password.entity.newPass.required'),
            trigger: 'blur'
          },
          {
            pattern: /^[A-Za-z0-9~!@#\\$%^&\\*]{6,20}$/,
            message: this.$t('merchant.password.entity.newPass.required'),
            trigger: ['blur', 'change']
          }
        ],
        checkPass: [
          { validator: checkPass, trigger: 'blur' }
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
  methods: {
    formValidation () {
      const formName = 'passwordForm'
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updatePassword()
        }
      })
    },
    /**
     * 修改密码
     */
    updatePassword () {
      const { newPass, oldPass } = this.entity
      this.loading = true
      fetchUpdatePassword({
        password: newPass,
        original: oldPass
      })
        .then(result => {
          this.resultMessage(result, success => {
            if (success) {
              this.$message.success(this.$t('merchant.password.success').toString())
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
