<template>
  <div class="passport-content">
    <div class="passport-form">
      <img
        class="logo"
        :src="agentModel.logo || resource.logoSVG"
        :alt="agentModel.shortForm">
      <h1>
        {{ $t('passport.emailSendSuccess.h1') }}
      </h1>
      <p>
        {{ $t('passport.emailSendSuccess.tips').replace('{email}', email) }}
      </p>
      <p class="mt-3">
        {{ $t('passport.emailSendSuccess.p') }}
      </p>
      <h3 class="mt-5">
        <b>{{ $t('passport.emailSendSuccess.p1') }}</b>
      </h3>
      <p>
        {{ $t('passport.emailSendSuccess.p2') }}
      </p>
      <p>
        {{ $t('passport.emailSendSuccess.p3') }}
      </p>
      <p class="mt-5">
        <el-button
          type="text"
          icon="el-icon-refresh"
          @click="redirectForget">
          {{ $t("passport.emailSendSuccess.resend") }}
        </el-button>
      </p>
      <p>
        <el-button
          type="text"
          icon="el-icon-arrow-left"
          @click="redirectLogin">
          {{ $t("passport.emailSendSuccess.login") }}
        </el-button>
      </p>
    </div>
  </div>
</template>

<script>
import extend from '../../plugins/page/base'
import {
  mapState
} from 'vuex'

export default {
  name: 'passport-forget',
  extends: extend,
  data () {
    return {
      email: '',
      isMobile: false
    }
  },
  created () {
    this.email = localStorage.getItem('forget')
    this.isMobile = this.utility.mobile()
    this.pageValid()
  },
  computed: {
    ...mapState(['merchantModel', 'agentModel'])
  },
  methods: {
    /**
     * 找回密码
     */
    redirectForget () {
      this.$router.push('/passport/forget')
    },
    /**
     * 登录
     */
    redirectLogin () {
      this.$router.push('/passport')
    }
  }
}
</script>
