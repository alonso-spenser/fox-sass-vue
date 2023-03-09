<template>
  <div style="width:60%">
    <fox-page-header></fox-page-header>
    <fox-section v-show="inputVisible">
      <el-form
        :model="entity"
        :rules="formRules"
        ref="ruleForm"
        label-width="100px"
        label-position="top"
        @keydown.native.enter.prevent
      >
        <el-form-item
          prop="domain"
          :label="$t('settings.domain.connect.entity.domain.label')">
          <el-input
            @blur="domainCapital"
            v-model="entity.domain"
            :placeholder="$t('settings.domain.connect.entity.domain.placeholder')"
          ></el-input>
        </el-form-item>
        <el-form-item class="text-right">
          <el-button
            type="primary"
            size="small"
            @click="formValidation('ruleForm')"
          >{{ $t("settings.domain.connect.nextStep") }}
          </el-button>
        </el-form-item>
      </el-form>
    </fox-section>
    <fox-section
      v-show="verifyVisible"
      v-loading="verifyLoading">
      <h4>{{ $t("settings.domain.connect.domainName") }}</h4>
      <p>
        <el-button
          @click="switchStep(1)"
          class="float-right"
          type="text"
        >{{ $t("settings.domain.connect.edit") }}
        </el-button>
        <label class="text-info">{{ entity.domain }}</label>
      </p>
      <h4 class="mt-7">{{ $t("settings.domain.connect.settings") }}</h4>
      <p class="text-info">
        {{ $t("settings.domain.connect.settingTips") }}
        <!-- <router-link to="/" class="text-primary">
          {{ $t("settings.domain.connect.guide") }}
          <i class="fox-help"></i>
        </router-link> -->
        <el-link
          href="/support/page-1163370602154270722.html"
          type="primary"
          :underline="false"
          target="_blank"
          v-if="false">
          {{ $t("settings.domain.connect.guide") }}
          <i class="fox-help"></i>
        </el-link>
      </p>
      <p class="text-info">
        <label v-html="$t('settings.domain.connect.cname')"></label>
        <b class="text-danger ml-3">{{ cname }}</b>
      </p>
      <h4 class="mt-7">{{ $t("settings.domain.connect.verify") }}</h4>
      <p class="text-info">{{ $t("settings.domain.connect.checkTips") }}</p>
      <p class="text-right">
        <el-button
          size="small"
          :loading="loading"
          @click="domainVerify"
        >{{ $t("settings.domain.connect.verify") }}
        </el-button>
      </p>
    </fox-section>
    <fox-section
      v-show="verifyFailed"
      v-loading="verifyLoading">
      <h4>{{ $t("settings.domain.connect.validate.failed.heading") }}</h4>
      <p>
        <label class="text-info">{{ $t("settings.domain.connect.validate.failed.subheading") }}</label>
      </p>
      <h4 class="mt-7">{{ $t("settings.domain.connect.validate.record") }}</h4>
      <p class="text-info">
        {{ $t("settings.domain.connect.validate.current") }}
        <b class="text-danger">{{ currentIP }}</b>
      </p>
      <p class="text-info">
        {{ $t("settings.domain.connect.validate.required") }}
        <b>{{ cname }}</b>
      </p>
      <h4 class="mt-7">{{ $t("settings.domain.connect.setting.heading") }}</h4>
      <p class="text-info">
        {{ $t("settings.domain.connect.setting.subheading") }}
        <a
          class="text-primary"
          href="/support/page-1163370602154270722.html"
          target="_blank"
          v-if="false"
        >
          {{ $t("settings.domain.connect.setting.guide") }}
          <i class="fox-help"></i>
        </a>
      </p>
      <p class="text-right">
        <el-button
          @click="switchStep(1)"
          type="text"
        >{{ $t("settings.domain.connect.edit") }}
        </el-button>
        <el-button
          size="small"
          :loading="loading"
          @click="domainVerify"
        >{{ $t("settings.domain.connect.verifyAgain") }}
        </el-button>
      </p>
    </fox-section>
    <fox-section v-show="verifySuccess">
      <h4>{{ $t("settings.domain.connect.validate.success.heading") }}</h4>
      <p>
        <label class="text-info">{{ $t("settings.domain.connect.validate.success.subheading") }}</label>
      </p>
      <h4 class="mt-7">
        {{ $t("settings.domain.connect.validate.record") }}
        <label class="text-success">
          <i class="fox-checked"></i>
        </label>
      </h4>
      <p class="text-info">
        {{ $t("settings.domain.connect.validate.current") }}
        <b class="text-success">{{ currentIP }}</b>
      </p>
      <p class="text-info">
        {{ $t("settings.domain.connect.validate.required") }}
        <b>{{ cname }}</b>
      </p>
      <p class="text-right">
        <el-button
          size="small"
          :loading="loading"
          @click="finishVerify">{{ $t("base.operate.complete") }}
        </el-button>
      </p>
    </fox-section>
  </div>
</template>

<script>
import extend from '@/plugins/page/base'
import { fetchDomainIsExistence, fetchDomainValidate } from '@/plugins/api/settings'

export default {
  name: 'siteDomain',
  extends: extend,
  data () {
    /**
     * 域名是否可注册校验
     * @param rule
     * @param value
     * @param callback
     */
    let validateDomain = (rule, value, callback) => {
      fetchDomainIsExistence({
        domain: value.toLowerCase(),
        siteId: this.siteId
      })
        .then(result => {
          if (result.success) {
            callback()
          } else {
            callback(new Error(this.$t('settings.domain.status.exists')))
          }
        })
        .catch(error => {
          this.networkMistake(error)
        })
    }
    return {
      inputVisible: true,
      verifyVisible: false,
      verifySuccess: false,
      verifyFailed: false,
      verifyLoading: false,
      currentIP: '127.0.0.1',
      cname: `dns.${process.env.VUE_APP_DESIGN_DOMAIN}`,
      entity: {
        domain: ''
      },
      formRules: {
        domain: [
          {
            required: true,
            message: this.$t('settings.domain.connect.entity.domain.required'),
            trigger: 'blur'
          },
          {
            pattern: /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
            message: this.$t('settings.domain.connect.entity.domain.custom'),
            trigger: ['blur', 'change']
          },
          {
            validator: validateDomain,
            trigger: 'blur'
          }
        ]
      },
      unpaidVisible: false
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
  methods: {
    /**
     * 域名校验
     */
    formValidation (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.switchStep(2)
        }
      })
    },
    /**
     * 步骤切换
     */
    switchStep (step) {
      this.inputVisible = false
      this.verifyVisible = false
      this.verifyFailed = false
      this.verifySuccess = false
      switch (step) {
        case 1:
          this.inputVisible = true
          break
        case 2:
          this.verifyVisible = true
          break
        case 3:
          this.verifySuccess = true
          break
        case 4:
          this.verifyFailed = true
          break
      }
    },
    domainCapital () {
      this.entity.domain = this.entity.domain.toLowerCase()
    },
    /**
     * 解析验证
     */
    domainVerify () {
      this.loading = true
      this.verifyLoading = true
      fetchDomainValidate({
        domain: this.entity.domain.toLowerCase(),
        siteId: this.siteId
      })
        .then(result => {
          this.verifyLoading = false
          this.loading = false
          result.data = result.data || {
            ip: ''
          }
          this.currentIP = result.success ? this.$t('settings.domain.connect.success') : result.data.ip
          if (result.success) {
            this.switchStep(3)
          } else {
            this.switchStep(4)
          }
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 完成验证并跳转到列表
     */
    finishVerify () {
      this.redirectURL(`/site/${this.siteId}/settings/domain`)
    },
    /**
     * 关闭付费弹窗
     * @param pay 是否点击了支付按钮
     */
    unpaidClose (pay) {
      this.unpaidVisible = false
      if (pay) {
        this.redirectURL(`/site/${this.siteModel.id}/${this.siteModel.siteType + 1000}/renew`)
      }
    }
  }
}
</script>
