<template>
  <div
    v-loading="pageLoading"
  >
    <el-form
      :model="entity"
      :rules="formRules"
      ref="update"
    >
      <el-tabs
        v-model="activeName"
        type="card">
        <el-tab-pane
          :label="$t('settings.legal.update.entity.privacyPolicy.label')"
          name="privacyPolicy">
          <fox-section
            :heading="$t('settings.legal.update.entity.privacyPolicy.label')"
          >
            <template slot="header">
              <el-button
                type="text"
                size="mini"
                @click="redirectPreview('privacy-policy')">{{ $t('base.operate.preview') }}
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="replaceTemplate('privacyPolicy')">{{ $t('settings.legal.update.template') }}
              </el-button>
            </template>
            <el-form-item prop="privacyPolicy">
              <fox-editor
                v-model="entity.privacyPolicy"
                model-type="simple"></fox-editor>
            </el-form-item>
          </fox-section>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('settings.legal.update.entity.termsOfService.label')"
          name="termsOfService">
          <fox-section
            :heading="$t('settings.legal.update.entity.termsOfService.label')"
            class="section-container">
            <template slot="header">
              <el-button
                type="text"
                size="mini"
                @click="redirectPreview('terms-of-service')">{{ $t('base.operate.preview') }}
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="replaceTemplate('termsOfService')">{{ $t('settings.legal.update.template') }}
              </el-button>
            </template>
            <el-form-item prop="termsOfService">
              <fox-editor
                v-model="entity.termsOfService"
                model-type="simple"></fox-editor>
            </el-form-item>
          </fox-section>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('settings.legal.update.entity.refundPolicy.label')"
          name="refundPolicy">
          <fox-section
            :heading="$t('settings.legal.update.entity.refundPolicy.label')"
            class="section-container">
            <template slot="header">
              <el-button
                type="text"
                size="mini"
                @click="redirectPreview('refund-policy')">{{ $t('base.operate.preview') }}
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="replaceTemplate('refundPolicy')">{{ $t('settings.legal.update.template') }}
              </el-button>
            </template>
            <el-form-item prop="refundPolicy">
              <fox-editor
                v-model="entity.refundPolicy"
                model-type="simple"></fox-editor>
            </el-form-item>
          </fox-section>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('settings.legal.update.entity.shippingPolicy.label')"
          name="shippingPolicy">
          <fox-section
            :heading="$t('settings.legal.update.entity.shippingPolicy.label')"
            class="section-container">
            <template
              slot="header"
              v-if="false">
              <el-button
                type="text"
                size="mini"
                @click="redirectPreview('shipping-policy')">{{ $t('base.operate.preview') }}
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="replaceTemplate('shippingPolicy')">{{ $t('settings.legal.update.template') }}
              </el-button>
            </template>
            <el-form-item prop="shippingPolicy">
              <fox-editor
                v-model="entity.shippingPolicy"
                model-type="simple"></fox-editor>
            </el-form-item>
          </fox-section>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <!--save-->
    <fox-unsaved
      :unsaved.sync="unsaved"
      :loading="loading"
      offset="0px"
      @confirmed="formValidation"
    >
    </fox-unsaved>
  </div>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import { fetchLegalDetail, fetchUpdateLega } from '@/plugins/api/settings'
import tempConfig from './tempConfig'
import { mapState } from 'vuex'

export default {
  name: 'siteLegalUpdate',
  extends: extend,
  data () {
    return {
      entity: {
        id: '',
        privacyPolicy: '',
        refundPolicy: '',
        shippingPolicy: '',
        termsOfService: ''
      },
      formRules: {},
      activeName: 'privacyPolicy'
    }
  },
  computed: {
    ...mapState(['siteModel'])
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
     * 预览
     * @param url
     */
    redirectPreview (url) {
      this.utility.openSite(`//${this.siteModel.mainDomain}/legal/${url}`)
    },
    /**
     * 从模版中替换
     */
    replaceTemplate (name) {
      if (tempConfig.legal[name]) {
        this.entity[name] = tempConfig.legal[name].replaceAll('{siteName}', this.siteModel.title)
          .replaceAll('{domain}', this.siteModel.domain)
          .replaceAll('{email}', this.siteModel.email)
      }
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.updateLegal()
        }
      })
    },
    /**
     * 获取详情
     */
    getDetail () {
      fetchLegalDetail({
        siteId: this.siteId,
        region: this.regionCode
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
     * 更新数据
     */
    updateLegal () {
      this.entity.id = this.siteId
      this.entity.siteId = this.siteId
      fetchUpdateLega(this.entity)
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result)
        })
        .catch(error => {
          this.networkMistake(error)
        })
    }
  }
}
</script>
