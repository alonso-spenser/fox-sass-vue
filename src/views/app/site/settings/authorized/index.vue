<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
  >
    <fox-form
      :model="entity"
      :rules="formRules"
      ref="update"
    >
      <fox-section>

        <fox-form-item prop="applicationName">
          <fox-input
            v-model="entity.applicationName"
            shrink
            :placeholder="$t('settings.authorizedLogin.entity.applicationName.label')"
            :description="$t('settings.authorizedLogin.entity.applicationName.placeholder')"
          ></fox-input>
        </fox-form-item>

        <fox-form-item prop="clientId">
          <fox-input
            v-model="entity.clientId"
            shrink
            :placeholder="$t('settings.authorizedLogin.entity.clientId.label')"
            :description="$t('settings.authorizedLogin.entity.clientId.placeholder')"
          ></fox-input>
        </fox-form-item>

        <fox-form-item prop="clientSecret">
          <fox-input
            v-model="entity.clientSecret"
            shrink
            :placeholder="$t('settings.authorizedLogin.entity.clientSecret.label')"
            :description="$t('settings.authorizedLogin.entity.clientSecret.placeholder')"
          ></fox-input>
        </fox-form-item>

        <fox-form-item prop="tag" v-if="false">
          <fox-input
            v-model="entity.tag"
            shrink
            :placeholder="$t('settings.authorizedLogin.entity.tag.label')"
            :description="$t('settings.authorizedLogin.entity.tag.placeholder')"
          ></fox-input>
        </fox-form-item>

      </fox-section>
    </fox-form>
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
import {
  fetchSiteAuthorizedLoginDetail,
  fetchSiteAuthorizedLoginUpdate
} from '@/plugins/api/site'

export default {
  name: 'SiteAuthorizedLoginUpdate',
  extends: extend,
  data () {
    return {
      entity: {
        applicationName: '',
        clientId: '',
        clientSecret: '',
        region: '',
        scope: 'openid email profile',
        siteId: '',
        tag: 'google'
      },
      formRules: {

        applicationName: [
          {
            required: true,
            message: this.$t('settings.authorizedLogin.entity.applicationName.required'),
            trigger: 'blur'
          }
        ],
        clientId: [
          {
            required: true,
            message: this.$t('settings.authorizedLogin.entity.clientId.required'),
            trigger: 'blur'
          }
        ],
        clientSecret: [
          {
            required: true,
            message: this.$t('settings.authorizedLogin.entity.clientSecret.required'),
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
    this.getDetail()
  },
  methods: {
    /**
     * 上一步
     */
    previous () {
      this.redirectURL('/site/authorized-login')
    },
    /**
     * 表单校验
     */
    formValidation () {
      this.formValidate('update', (valid, fields) => {
        if (valid) {
          this.loading = true
          this.updateLogin()
        } else {
          this.unverified(fields)
        }
      })
    },
    /**
     * 获取详情
     */
    getDetail () {
      fetchSiteAuthorizedLoginDetail({
        siteId: this.siteId
      })
        .then((result) => {
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
     * 更新数据
     */
    updateLogin () {
      fetchSiteAuthorizedLoginUpdate({
        ...this.entity,
        siteId: this.siteId
      })
        .then((result) => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              // this.previous()
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
