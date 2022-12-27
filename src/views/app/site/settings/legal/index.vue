<template>
  <fo-page-loading
    :page-loading="pageLoading"
    :page-is-valid="pageIsValid"
  >
    <!--      <fo-page-header></fo-page-header>-->
    <el-form
      :model="entity"
      :rules="formRules"
      ref="update"
      label-width="100px"
      label-position="top"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane
          :label="$t('settings.legal.update.entity.privacyPolicy.label')"
          name="privacyPolicy">
          <fo-page-section class="section-container">
            <template slot="header">
              <el-button
                type="text"
                size="small"
                @click="replaceTemplate('privacyPolicy')">{{ $t('settings.legal.update.template') }}
              </el-button>
            </template>
            <el-form-item prop="privacyPolicy">
              <fo-editor
                v-model="entity.privacyPolicy"
                model-type="simple"></fo-editor>
            </el-form-item>
          </fo-page-section>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('settings.legal.update.entity.termsOfService.label')"
          name="termsOfService">
          <fo-page-section class="section-container">
            <template slot="header">
              <el-button
                type="text"
                size="small"
                @click="replaceTemplate('termsOfService')">{{ $t('settings.legal.update.template') }}
              </el-button>
            </template>
            <el-form-item prop="termsOfService">
              <fo-editor
                v-model="entity.termsOfService"
                model-type="simple"></fo-editor>
            </el-form-item>
          </fo-page-section>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('settings.legal.update.entity.refundPolicy.label')"
          name="refundPolicy">
          <fo-page-section class="section-container">
            <template slot="header">
              <el-button
                type="text"
                size="small"
                @click="replaceTemplate('refundPolicy')">{{ $t('settings.legal.update.template') }}
              </el-button>
            </template>
            <el-form-item prop="refundPolicy">
              <fo-editor
                v-model="entity.refundPolicy"
                model-type="simple"></fo-editor>
            </el-form-item>
          </fo-page-section>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('settings.legal.update.entity.shippingPolicy.label')"
          name="shippingPolicy">
          <fo-page-section class="section-container">
            <template
              slot="header"
              v-if="false">
              <el-button
                type="text"
                size="small"
                @click="replaceTemplate('shippingPolicy')">{{ $t('settings.legal.update.template') }}
              </el-button>
            </template>
            <el-form-item prop="shippingPolicy">
              <fo-editor
                v-model="entity.shippingPolicy"
                model-type="simple"></fo-editor>
            </el-form-item>
          </fo-page-section>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <!--save-->
    <fo-fixed-unsaved
      :unsaved.sync="unsaved"
      :loading="loading"
      offset="0px"
      @confirmed="formValidation"
    >
    </fo-fixed-unsaved>
  </fo-page-loading>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import { fetchLegalDetail, fetchUpdateLega } from '@/plugins/api/settings'
import tempConfig from './tempConfig'

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
      formRules: {
        // privacyPolicy: [
        //   {
        //     required: true,
        //     message: this.$t('settings.legal.update.entity.privacyPolicy.required'),
        //     trigger: 'blur'
        //   }
        // ],
        // refundPolicy: [
        //   {
        //     required: true,
        //     message: this.$t('settings.legal.update.entity.refundPolicy.required'),
        //     trigger: 'blur'
        //   }
        // ],
        // shippingPolicy: [
        //   {
        //     required: true,
        //     message: this.$t('settings.legal.update.entity.shippingPolicy.required'),
        //     trigger: 'blur'
        //   }
        // ],
        // termsOfService: [
        //   {
        //     required: true,
        //     message: this.$t('settings.legal.update.entity.termsOfService.required'),
        //     trigger: 'blur'
        //   }
        // ]
      },
      activeName: 'privacyPolicy'
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
