<template>
  <fox-page-loading
    :loading="pageLoading"
    :invalid="pageIsValid">
    <el-form
      :model="entity"
      :rules="formRules"
      ref="update"
      label-width="100px"
      label-position="top">
      <fox-page-section
        :heading="$t('settings.tracking.update.entity.scriptHead.label')"
      >
        <el-form-item prop="scriptHead">
          <el-input
            type="textarea"
            :rows="12"
            v-model="entity.scriptHead"
            :placeholder="$t('settings.tracking.update.entity.scriptHead.placeholder')"
          ></el-input>
          <p
            class="text-secondary mt-2"
            v-html="$t('settings.tracking.update.entity.scriptHead.info')">
            {{ $t('settings.tracking.update.entity.scriptHead.info') }}
          </p>
        </el-form-item>
      </fox-page-section>
      <fox-page-section
        :heading="$t('settings.tracking.update.entity.scriptBottom.label')"
      >
        <el-form-item prop="scriptBottom">
          <el-input
            type="textarea"
            :rows="12"
            v-model="entity.scriptBottom"
            :placeholder="$t('settings.tracking.update.entity.scriptBottom.placeholder')"
          ></el-input>
          <p
            class="text-secondary mt-2"
            v-html="$t('settings.tracking.update.entity.scriptBottom.info')">
            {{ $t('settings.tracking.update.entity.scriptBottom.info') }}
          </p>
        </el-form-item>
      </fox-page-section>
      <!--save-->
      <fox-unsaved
        :unsaved.sync="unsaved"
        @confirmed="formValidation"
      >
      </fox-unsaved>
    </el-form>
  </fox-page-loading>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import { fetchSiteTracking, fetchSiteTrackingUpdate } from '@/plugins/api/settings'

export default {
  name: 'siteSettings',
  extends: extend,
  data () {
    return {
      entity: {
        facebookPixel: '',
        scriptHead: '',
        scriptBottom: ''
      },
      formRules: {
        facebookPixel: [
          {
            required: true,
            message: this.$t('settings.tracking.update.entity.facebookPixel.required'),
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
    this.pageValid()
    this.getDetail()
  },
  methods: {
    /**
     * 验证
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateSite()
        }
      })
    },
    /**
     * 获取详情
     */
    getDetail () {
      fetchSiteTracking({
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
    updateSite () {
      fetchSiteTrackingUpdate({
        id: this.siteId,
        scriptHead: this.entity.scriptHead,
        scriptBottom: this.entity.scriptBottom
      })
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
