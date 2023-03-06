<template>
  <div class="passport-content">
    <div class="passport-form">
      <img
        class="logo"
        :src="agentModel.logo || resource.logoSVG"
        :alt="agentModel.shortForm">
      <h1>
        {{ $t('passport.login.title') }}
      </h1>
      <p class="text-secondary">
        {{ $t('passport.login.tips') }}
      </p>
      <el-form
        :model="entity"
        :rules="formRules"
        ref="ruleForm">
        <el-form-item prop="account">
          <fox-input
            shrink
            maxlength="64"
            v-model="entity.account"
            @blur="accountBlur"
            :placeholder="$t('passport.login.entity.account.label')"
            :description="$t('passport.login.entity.account.placeholder')"
            auto-complete="off">
          </fox-input>
        </el-form-item>
        <el-form-item prop="password">
          <fox-input
            shrink
            maxlength="30"
            type="password"
            v-model="entity.password"
            :placeholder="$t('passport.login.entity.password.label')"
            :description="$t('passport.login.entity.password.placeholder')"
            auto-complete="off">
          </fox-input>
        </el-form-item>
        <el-form-item class="mt-7 mb-0">
          <el-button
            type="primary"
            :loading="loading"
            class="el-submit"
            @click="formValidation('ruleForm')"
          >
            {{ $t('passport.login.button') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import extend from '@/plugins/page/base'
import { fetchMerchantLogin } from '@/plugins/api/passport'
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  name: 'mainPassportLogin',
  extends: extend,
  data () {
    return {
      entity: {
        account: '',
        password: '',
        areaCode: '',
        captcha: ''
      },
      formRules: {
        account: [
          { required: true, message: this.$t('passport.login.entity.account.required'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('passport.login.entity.password.required'), trigger: 'blur' }
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
    ...mapState(['masterModel', 'agentModel'])
  },
  created () {
    // this.setDefaultRegion()
  },
  methods: {
    ...mapMutations(['setMasterModel']),
    /**
     * 首页
     */
    redirectDashboard () {
      if (this.$route.query.redirect) {
        location.href = this.$route.query.redirect
      } else {
        this.redirectURL('/main')
      }
    },
    /**
     * 登录
     */
    formValidation () {
      const formName = 'ruleForm'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          fetchMerchantLogin(this.entity)
            .then(result => {
              this.resultMessage(result, (success) => {
                if (success) {
                  this.setMasterModel(result.data)
                  this.redirectDashboard()
                }
              })
            })
            .catch(error => {
              this.networkMistake(error)
            })
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
     * 退出登录
     */
    logout () {
      this.setMasterModel({})
    }
  }
}
</script>
