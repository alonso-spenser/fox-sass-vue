<template>
  <div class="passport-content">
    <div class="passport-form">
      <img
        class="logo"
        :src="agentModel.logo || resource.logoSVG"
        :alt="agentModel.shortForm">
      <h1>
        {{ $t('passport.reset.pageTitle') }}
      </h1>
      <el-form
        :model="entity"
        :rules="formRules"
        ref="ruleForm">
        <el-form-item prop="password">
          <fox-input
            shrink
            type="text"
            v-model="entity.password"
            :placeholder="$t('passport.reset.entity.password.label')"
            :description="$t('passport.reset.entity.password.placeholder')"
            auto-complete="off"></fox-input>
        </el-form-item>
        <el-form-item prop="passAgain">
          <fox-input
            shrink
            type="password"
            v-model="entity.passAgain"
            :placeholder="$t('passport.reset.entity.passAgain.label')"
            :description="$t('passport.reset.entity.passAgain.placeholder')"
            auto-complete="off"></fox-input>
        </el-form-item>

        <el-form-item>
          <el-button
            class="el-submit"
            type="primary"
            :loading="loading"
            @click="formValidation('ruleForm')">
            {{ $t("base.operate.save") }}
          </el-button>
        </el-form-item>
      </el-form>
      <p>
        <label class="text-secondary">
          {{ $t('passport.register.haveAccount') }}
        </label>
        <el-button
          type="text"
          class="text-link"
          @click="redirectLogin"
        >
          {{ $t('passport.register.login') }}
        </el-button>
      </p>
    </div>
  </div>
</template>

<script>
import { fetchResetEmailPassword } from '@/plugins/api/passport'
import extend from '@/plugins/page/base'
import {
  mapState
} from 'vuex'

export default {
  name: 'passport-register',
  extends: extend,
  data () {
    /**
     * 密码验证
     * @param rule
     * @param value
     * @param callback
     */
    let validatePass = (rule, value, callback) => {
      if (value !== this.entity.password) {
        callback(new Error(this.$t('passport.reset.entity.passAgain.custom').toString()))
      } else {
        callback()
      }
    }
    return {
      entity: {
        code: '',
        key: '',
        password: '',
        passAgain: ''
      },
      formRules: {
        password: [
          {
            required: true,
            message: this.$t('passport.reset.entity.password.required'),
            trigger: 'blur'
          },
          {
            pattern: /^[A-Za-z0-9~!@#\\$%^&\\*]{6,20}$/,
            message: this.$t('passport.reset.entity.password.custom'),
            trigger: 'blur'
          }
        ],
        passAgain: [
          {
            required: true,
            message: this.$t('passport.reset.entity.passAgain.required'),
            trigger: 'blur'
          },
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    this.keyboardEvents(() => {
      this.formValidation()
    })
  },
  computed: {
    ...mapState(['merchantModel', 'agentModel'])
  },
  created () {
    this.entity.code = this.$route.params.code
    this.entity.key = this.$route.params.key
  },
  methods: {
    /**
     * 登录
     */
    redirectLogin () {
      this.$router.push(`/passport`)
    },
    /**
     * 修改密码
     */
    formValidation () {
      const formName = 'ruleForm'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          fetchResetEmailPassword(this.entity)
            .then(result => {
              this.loading = false
              this.resultMessage(result, (success) => {
                if (success) {
                  this.$message({
                    type: 'success',
                    message: this.$t('passport.reset.success')
                  })
                  this.$router.push({
                    path: '/passport'
                  })
                }
              })
            })
            .catch(error => {
              this.networkMistake(error)
            })
        }
      })
    }
  }
}
</script>
