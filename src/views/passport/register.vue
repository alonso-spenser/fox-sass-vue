<template>
  <div class="passport-content">
    <div class="passport-form">
      <img
        class="logo"
        :src="agentModel.logo || resource.logoSVG"
        :alt="agentModel.shortForm">
      <h1>
        {{ $t('passport.register.h1') }}
      </h1>
      <p class="text-secondary">
        {{ $t('passport.register.tips') }}
      </p>
      <fox-form
        :model="entity"
        :rules="formRules"
        ref="ruleForm">
        <el-row
          class="el-form-item gutter-less"
          :gutter="20">
          <el-col :span="12">
            <fox-form-item prop="lastName">
              <fox-input
                shrink
                maxlength="30"
                v-model="entity.lastName"
                :placeholder="$t('passport.register.entity.lastName.label')"
                :description="$t('passport.register.entity.lastName.placeholder')"
                auto-complete="off">
              </fox-input>
            </fox-form-item>
          </el-col>
          <el-col :span="12">
            <fox-form-item prop="firstName">
              <fox-input
                shrink
                maxlength="30"
                v-model="entity.firstName"
                :placeholder="$t('passport.register.entity.firstName.label')"
                :description="$t('passport.register.entity.firstName.placeholder')"
                auto-complete="off">
              </fox-input>
            </fox-form-item>
          </el-col>
        </el-row>
        <fox-form-item
          prop="name"
          v-if="false">
          <fox-input
            shrink
            maxlength="100"
            v-model="entity.name"
            :placeholder="$t('passport.register.entity.name.label')"
            auto-complete="off">
          </fox-input>
        </fox-form-item>
        <fox-form-item prop="account">
          <fox-input
            shrink
            maxlength="64"
            v-model="entity.account"
            @blur="accountBlur"
            :placeholder="$t('passport.register.entity.account.label')"
            :description="$t('passport.register.entity.account.placeholder')"
            auto-complete="off">
          </fox-input>
        </fox-form-item>
        <fox-form-item prop="code">
          <fox-input
            shrink
            maxlength="64"
            v-model="entity.code"
            :class="`passport-code${counting.visible ? ' counting' : ''}`"
            @blur="accountBlur"
            :placeholder="$t('passport.register.entity.code.label')"
            :description="$t('passport.register.entity.code.placeholder')"
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
          </fox-input>
        </fox-form-item>
        <fox-form-item prop="password">
          <fox-input
            shrink
            maxlength="30"
            type="password"
            v-model="entity.password"
            :placeholder="$t('passport.register.entity.password.label')"
            :description="$t('passport.register.entity.password.placeholder')"
            auto-complete="off">
          </fox-input>
        </fox-form-item>
        <fox-form-item prop="confirmPassword">
          <fox-input
            shrink
            maxlength="30"
            type="password"
            v-model="entity.confirmPassword"
            :placeholder="$t('passport.register.entity.confirmPassword.label')"
            :description="$t('passport.register.entity.confirmPassword.placeholder')"
            auto-complete="off">
          </fox-input>
        </fox-form-item>
        <fox-form-item class="mt-7">
          <el-button
            class="el-submit"
            type="primary"
            :loading="loading"
            @click="formValidation('ruleForm')">
            {{ $t("passport.register.button") }}
          </el-button>
        </fox-form-item>
      </fox-form>
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
import { fetchAccountCheck, fetchCodeForRegister, fetchMerchantRegister } from '@/plugins/api/passport'
import extend from '@/plugins/page/unsaved'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'passport-register',
  extends: extend,
  data () {
    /**
     * 帐号
     * @param rule
     * @param value
     * @param callback
     */
    let validateAccount = (rule, value, callback) => {
      fetchAccountCheck({
        account: value,
        areaCode: this.entity.areaCode
      })
        .then((result) => {
          if (result['success']) {
            callback()
          } else {
            if (result['code'] === 13010001) {
              this.confirmLogin()
            }
            callback(new Error(this.$t('errorCode')[result['code']]))
          }
        })
        .catch(error => {
          this.networkMistake(error)
        })
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
        callback(new Error(this.$t('passport.register.entity.code.custom')))
      }
    }
    let rePassword = (rule, value, callback) => {
      if (this.utility.isNotEmpty(value) && value === this.entity.password) {
        callback()
      } else {
        callback(new Error(this.$t('passport.register.entity.confirmPassword.custom')))
      }
    }
    return {
      entity: {
        account: '',
        password: '',
        confirmPassword: '',
        captcha: '',
        captchaKey: '',
        code: '',
        areaCode: '',
        firstName: '',
        lastName: '',
        name: '',
        os: 0,
        referralCode: ''
      },
      formRules: {
        account: [
          {
            required: true,
            message: this.$t('passport.register.entity.account.required'),
            trigger: 'blur'
          },
          {
            pattern: this.utility.expression.Email,
            message: this.$t('passport.register.entity.account.custom'),
            trigger: 'blur'
          },
          {
            validator: validateAccount,
            trigger: 'blur'
          }
        ],
        captcha: [
          {
            required: true,
            message: this.$t('passport.register.entity.captcha.required'),
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
        firstName: [
          {
            required: true,
            message: this.$t('passport.register.entity.firstName.required'),
            trigger: 'blur'
          }
        ],
        lastName: [
          {
            required: true,
            message: this.$t('passport.register.entity.lastName.required'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('passport.register.entity.password.required'),
            trigger: 'blur'
          },
          {
            pattern: /^[A-Za-z0-9~!@#\\$%^&\\*]{6,20}$/,
            message: this.$t('passport.register.entity.password.custom'),
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: this.$t('passport.register.entity.confirmPassword.required'),
            trigger: 'blur'
          },
          {
            validator: rePassword,
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: this.$t('passport.register.entity.name.required'),
            trigger: 'blur'
          }
        ]
      },
      isMobile: false,
      captcha: {
        key: '',
        url: '',
        sent: true
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
    this.isMobile = this.utility.mobile()
    this.entity.referralCode = this.$route.query.referral || ''
  },
  methods: {
    getRegion () {
      return this.utility.getLanguage()
    },
    ...mapMutations(['setMerchantModel', 'setMySite', 'setSiteModel']),
    /**
     * 帐号和权限都在的时候，确认登录
     */
    confirmLogin () {
      let that = this
      this.notifyElement = this.$notify({
        title: this.$t('base.oops'),
        duration: 1000 * 10,
        position: 'bottom-right',
        message: this.$createElement('div', null,
          [
            this.$createElement('div', null, [
              this.$createElement('span', null, this.$t('errorCode.13010001').toString()),
              this.$createElement(
                'button',
                {
                  class: 'el-button el-button--text el-button--primary',
                  on: {
                    click: () => {
                      if (this.notifyElement) {
                        this.notifyElement.close()
                      }
                      this.redirectLogin()
                    }
                  }
                },
                that.$t('passport.register.login')
              )
            ])
            // this.$createElement('div', null,
            //   [
            //     this.$createElement(
            //       'button',
            //       {
            //         class: 'el-button el-button--default el-button--small mt-3',
            //         on: {
            //           click: () => {
            //             if (this.notifyElement) {
            //               this.notifyElement.close()
            //             }
            //             this.redirectLogin()
            //           }
            //         }
            //       },
            //       that.$t('passport.register.login')
            //     )
            //   ]
            // )
          ]
        )
      })
    },
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
      // this.refreshCaptcha()
    },
    /**
     * 获取验证码
     */
    getCode () {
      let that = this
      Promise.all(['firstName', 'lastName', 'account'].map(item => {
        return new Promise((resolve, reject) => {
          that.$refs['ruleForm'].$children[0].validateField(item, (error) => {
            resolve(error)
          })
        })
      })).then((data) => {
        let m = data.filter((s) => {
          return this.utility.isNotEmpty(s)
        })
        if (m.length === 0) {
          this.sendCode()
        }
      })
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
      fetchCodeForRegister({
        userName: `${this.entity.firstName} ${this.entity.lastName}`,
        account: this.entity.account,
        areaCode: '',
        content: this.$t('email.register.success'),
        title: this.$t('email.register.title'),
        region: this.utility.getLanguage()
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.$message({
                type: 'success',
                message: this.$t('email.register.success').toString()
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
     * 创建站点
     */
    redirectDashboard () {
      this.$router.push('/startup/create-site')
    },
    /**
     * 登录
     */
    formValidation () {
      const formName = 'ruleForm'
      this.formValidate(formName, (valid) => {
        if (valid) {
          this.entity.captchaKey = this.captcha.key
          if (!this.captcha.sent) {
            this.$message({
              type: 'error',
              message: this.$t('passport.register.firstCode').toString()
            })
            this.loading = false
          } else {
            this.loading = true
            fetchMerchantRegister(this.entity)
              .then(result => {
                this.resultMessage(result, (success) => {
                  if (success) {
                    this.setMerchantModel(result.data)
                    this.setMySite([])
                    this.setSiteModel({
                      id: '',
                      createTime: 1625018655524,
                      expiryTime: 1629114091117,
                      langCode: 'en',
                      langName: '',
                      logo: '',
                      siteName: '',
                      thumbnail: '',
                      siteType: 3,
                      state: 0,
                      systemDomain: '',
                      mainDomain: '',
                      freeRenewal: 0,
                      firstOnline: 1625018655524,
                      payMonth: 0,
                      isExpired: false,
                      bindDomain: false
                    })
                    this.redirectDashboard()
                  }
                })
              })
              .catch(error => {
                this.networkMistake(error)
              })
          }
        }
      })
    },
    /**
     * 删除帐号中的空格
     */
    accountBlur () {
      this.entity.account = this.utility.removeAllSpace(this.entity.account)
    }
  }
}
</script>

<style lang="scss" scoped>
.gutter-less {
  &.el-row {
    margin-bottom: 0.625rem;
  }
}
</style>
