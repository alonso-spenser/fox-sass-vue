<template>
  <div class="passport-content">
    <div class="passport-form">
      <img
        class="logo"
        :src="agentModel.logo || resource.logoSVG"
        :alt="agentModel.shortForm">
      <h1>
        {{ $t('passport.forget.pageTitle') }}
      </h1>
      <p class="text-secondary">
        {{ $t('passport.forget.tips') }}
      </p>
      <el-form
        :model="entity"
        :rules="formRules"
        ref="ruleForm">
        <el-form-item
          prop="account"
          v-if="!isMobile">
          <fox-input
            shrink
            maxlength="64"
            v-model="entity.account"
            @blur="accountBlur"
            :placeholder="$t('passport.forget.entity.account.label')"
            :description="$t('passport.forget.entity.account.placeholder')"
            auto-complete="off">
          </fox-input>
        </el-form-item>
        <el-form-item
          prop="code"
          v-if="isMobile">
          <p>{{ entity.account }}</p>
          <el-input
            maxlength="64"
            v-model="entity.code"
            :class="`passport-code${counting.visible ? ' counting' : ''}`"
            @blur="accountBlur"
            :placeholder="$t('passport.register.entity.code.placeholder')"
            auto-complete="off">
            <template slot="append">
              <el-button
                type="primary"
                plain
                v-if="!counting.visible"
                @click="getCode"
              >
                {{ $t('passport.register.getCode') }}
              </el-button>
              <countdown
                :deadline.sync="counting.data"
                date-format="S"
                v-if="counting.visible"
                @finish="resendCode"
              >00
              </countdown>
            </template>
          </el-input>
        </el-form-item>
        <template v-if="captcha.sent && isMobile">
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="entity.password"
              :placeholder="$t('passport.reset.entity.password.placeholder')"
              auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="passAgain">
            <el-input
              type="password"
              v-model="entity.passAgain"
              :placeholder="$t('passport.reset.entity.passAgain.placeholder')"
              auto-complete="off"></el-input>
          </el-form-item>
        </template>

        <el-form-item v-if="!isMobile">
          <el-button
            class="el-submit"
            type="primary"
            :loading="loading"
            @click="formValidation('ruleForm')">
            {{ $t("passport.forget.nextStep") }}
          </el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button
            v-if="isMobile && captcha.sent"
            class="el-submit"
            type="primary"
            :loading="loading"
            @click="changePassword('ruleForm')">
            {{ $t("passport.forget.edit") }}
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
import { fetchForgetEmailCode } from '@/plugins/api/passport'
import extend from '@/plugins/page/base'
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  name: 'passport-register',
  extends: extend,
  data () {
    /**
     * 帐户是否可注册校验
     * @param rule
     * @param value
     * @param callback
     */
    let accountValidity = (rule, value, callback) => {
      if (this.utility.accountValidity(value)) {
        callback()
      } else {
        callback(new Error(this.$t('passport.forget.entity.account.custom').toString()))
      }
    }
    /**
     * 帐号
     * @param rule
     * @param value
     * @param callback
     */
    let validateCode = (rule, value, callback) => {
      if (this.captcha.sent) {
        callback()
      } else {
        callback(new Error(this.$t('passport.forget.entity.code.custom').toString()))
      }
    }
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
        account: '',
        code: '',
        password: '',
        passAgain: ''
      },
      formRules: {
        account: [
          {
            required: true,
            message: this.$t('passport.forget.entity.account.required'),
            trigger: 'blur'
          },
          {
            validator: accountValidity,
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: this.$t('passport.register.entity.code.required'),
            trigger: 'blur'
          },
          {
            validator: validateCode,
            trigger: 'blur'
          }
        ],
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
      },
      isMobile: false,
      captcha: {
        key: '',
        url: '',
        sent: false
      },
      counting: {
        visible: false,
        data: ''
      },
      notifyElement: null
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
  },
  methods: {
    ...mapMutations(['setMerchantModel', 'setMySite', 'setSiteModel']),
    /**
     * 刷新验证码
     */
    refreshCaptcha () {
      this.captcha = this.utility.captcha()
    },
    /**
     * 倒计时结束
     */
    resendCode () {
      this.counting.visible = false
      this.refreshCaptcha()
    },
    /**
     * 获取验证码
     */
    getCode () {
      if (this.utility.expression.Mobile.test(this.entity.account)) {
        this.sendCode()
      }
    },
    /**
     * 发送短信
     */
    sendCode () {
      let dt = new Date()
      dt.setSeconds(dt.getSeconds() + 60)
      this.counting.data = dt
      this.counting.visible = true
      this.captcha.sent = false
      fetchForgetSMS({
        mobile: this.entity.account
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.$message({
                type: 'success',
                message: this.$t('passport.register.code.success').toString()
              })
              this.captcha.sent = true
            } else {
              this.captcha.sent = false
              this.resendCode()
            }
            if (result.code === 10010012) {
              this.refreshCaptcha()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 登录
     */
    redirectLogin () {
      this.$router.push(`/passport`)
    },
    /**
     * 登录
     */
    formValidation () {
      const formName = 'ruleForm'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.utility.expression.Email.test(this.entity.account)) {
            this.sendEmail(formName)
          } else {
            this.isMobile = true
          }
        }
      })
    },
    /**
     * 删除帐号中的空格
     */
    accountBlur () {
      this.entity.account = this.utility.removeAllSpace(this.entity.account)
    },
    /**
     * 发送密码找回邮件
     * @param formName
     */
    sendEmail (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          fetchForgetEmailCode({
            account: this.entity.account
          })
            .then(result => {
              this.resultMessage(result, (success) => {
                if (success) {
                  localStorage.setItem('forget', this.entity.account)
                  this.$router.push('/passport/email-send-success')
                }
                this.resetForm('ruleForm')
              })
            })
            .catch(error => {
              this.networkMistake(error)
            })
        }
      })
    },
    /**
     * 修改密码
     */
    changePassword () {
      const formName = 'ruleForm'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          fetchResetMobilePassword(this.entity)
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
