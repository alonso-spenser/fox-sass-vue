<template>
  <div class="passport-content">
    <div class="passport-form">
      <svg
        class="logo"
        viewBox="0 0 186 37"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd">
          <g
            transform="translate(-323.000000, -410.000000)"
            fill="#67C23A"
            fill-rule="nonzero">
            <g
              id="MY-TASK"
              transform="translate(323.456000, 410.864000)">
              <polygon
                id="M"
                points="4.416 35.136 0 35.136 0 0.768 4.416 0.768 16.368 21.696 16.56 21.696 28.512 0.768 32.928 0.768 32.928 35.136 28.512 35.136 28.512 14.736 28.704 8.976 28.512 8.976 17.76 27.84 15.168 27.84 4.416 8.976 4.224 8.976 4.416 14.736"></polygon>
              <polygon
                id="Y"
                points="52.944 19.152 52.944 35.136 48.528 35.136 48.528 19.152 36.96 0.768 42.144 0.768 50.64 14.736 50.832 14.736 59.136 0.768 64.32 0.768"></polygon>
              <polygon
                id="T"
                points="88.704 4.992 88.704 35.136 84.288 35.136 84.288 4.992 74.688 4.992 74.688 0.768 98.304 0.768 98.304 4.992"></polygon>
              <path
                d="M112.272,6.192 L106.656,21.696 L118.08,21.696 L112.464,6.192 L112.272,6.192 Z M101.808,35.136 L96.912,35.136 L109.872,0.768 L114.864,0.768 L127.824,35.136 L122.928,35.136 L119.616,25.824 L105.168,25.824 L101.808,35.136 Z"
                id="A"></path>
              <path
                d="M153.072,25.968 C153.072,28.976 151.968,31.392 149.76,33.216 C147.52,35.008 144.8,35.904 141.6,35.904 C138.752,35.904 136.24,35.072 134.064,33.408 C131.888,31.744 130.384,29.472 129.552,26.592 L133.776,24.864 C134.064,25.888 134.464,26.816 134.976,27.648 C135.488,28.48 136.088,29.192 136.776,29.784 C137.464,30.376 138.224,30.84 139.056,31.176 C139.888,31.512 140.768,31.68 141.696,31.68 C143.712,31.68 145.36,31.16 146.64,30.12 C147.92,29.08 148.56,27.696 148.56,25.968 C148.56,24.528 148.032,23.296 146.976,22.272 C145.984,21.28 144.128,20.32 141.408,19.392 C138.656,18.4 136.944,17.728 136.272,17.376 C132.624,15.52 130.8,12.784 130.8,9.168 C130.8,6.64 131.808,4.48 133.824,2.688 C135.872,0.896 138.384,0 141.36,0 C143.984,0 146.256,0.672 148.176,2.016 C150.096,3.328 151.376,4.976 152.016,6.96 L147.888,8.688 C147.504,7.408 146.744,6.344 145.608,5.496 C144.472,4.648 143.088,4.224 141.456,4.224 C139.728,4.224 138.272,4.704 137.088,5.664 C135.904,6.56 135.312,7.728 135.312,9.168 C135.312,10.352 135.776,11.376 136.704,12.24 C137.728,13.104 139.952,14.128 143.376,15.312 C146.864,16.496 149.352,17.944 150.84,19.656 C152.328,21.368 153.072,23.472 153.072,25.968 Z"
                id="S"></path>
              <polygon
                id="K"
                points="178.128 0.768 183.84 0.768 183.84 0.96 171.072 15.696 184.704 34.944 184.704 35.136 179.28 35.136 168.096 19.104 162.816 25.2 162.816 35.136 158.4 35.136 158.4 0.768 162.816 0.768 162.816 18.48 163.008 18.48"></polygon>
            </g>
          </g>
        </g>
      </svg>
      <h1>
        {{ $t('passport.login.title') }}
      </h1>
      <el-form
        :model="entity"
        :rules="formRules"
        ref="ruleForm">
        <p class="clearfix mb-2">
          {{ $t('passport.login.entity.account.label') }}
        </p>
        <el-form-item prop="account">
          <el-input
            maxlength="64"
            v-model="entity.account"
            @blur="accountBlur"
            :placeholder="$t('passport.login.entity.account.placeholder')"
            auto-complete="off">
          </el-input>
        </el-form-item>
        <p class="mb-2">
          {{ $t('passport.login.entity.password.label') }}
        </p>
        <el-form-item prop="password">
          <el-input
            maxlength="30"
            type="password"
            v-model="entity.password"
            :placeholder="$t('passport.login.entity.password.placeholder')"
            auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item class="mt-7 mb-0">
          <el-button
            type="success"
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
import { fetchMerchantLogin, fetchMerchantLogout } from '@/plugins/api/passport'
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  name: 'passport-login',
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
        callback(new Error(this.$t('passport.login.entity.account.custom')))
      }
    }
    return {
      entity: {
        account: '',
        password: '',
        areaCode: '',
        captcha: ''
      },
      formRules: {
        account: [
          { required: true, message: this.$t('passport.login.entity.account.required'), trigger: 'blur' },
          {
            validator: accountValidity,
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: this.$t('passport.login.entity.password.required'), trigger: 'blur' }
        ]
      },
      siteList: [
        {
          systemDomain: ''
        }
      ],
      signed: true
    }
  },
  mounted () {
    this.keyboardEvents(() => {
      this.formValidation()
    })
  },
  computed: {
    ...mapState(['merchantModel'])
  },
  created () {
  },
  methods: {
    ...mapMutations(['setMerchantModel']),
    /**
     * 首页
     */
    redirectDashboard () {
      if (this.$route.query.redirect) {
        location.href = this.$route.query.redirect
      } else {
        this.$router.push('/dashboard')
      }
    },
    /**
     * 退出登录
     */
    logout () {
      fetchMerchantLogout()
      this.setMerchantModel({})
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
                  this.setMerchantModel(result.data)
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
    }
  }
}
</script>
