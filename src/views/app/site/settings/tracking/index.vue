<template>
  <fox-form
    :model="entity"
    :rules="formRules"
    v-loading="pageLoading"
    borderless
    ref="update">
    <fox-section
      :heading="$t('settings.tracking.update.entity.scriptHead.label')"
    >
      <el-form-item prop="scriptHead">
        <el-input
          type="textarea"
          :rows="12"
          v-model="entity.scriptHead"
          :placeholder="$t('settings.tracking.update.entity.scriptHead.placeholder')"
        ></el-input>
        <div
          class="text-secondary script-tips mt-2"
          v-html="$t('settings.tracking.update.entity.scriptHead.info')">
          {{ $t('settings.tracking.update.entity.scriptHead.info') }}
        </div>
      </el-form-item>
    </fox-section>
    <fox-section
      :heading="$t('settings.tracking.update.entity.scriptBottom.label')"
    >
      <el-form-item prop="scriptBottom">
        <el-input
          type="textarea"
          :rows="12"
          v-model="entity.scriptBottom"
          :placeholder="$t('settings.tracking.update.entity.scriptBottom.placeholder')"
        ></el-input>
        <div
          class="text-secondary script-tips mt-2"
          v-html="$t('settings.tracking.update.entity.scriptBottom.info')">
          {{ $t('settings.tracking.update.entity.scriptBottom.info') }}
        </div>
      </el-form-item>
    </fox-section>
    <!--save-->
    <fox-unsaved
      :unsaved.sync="unsaved"
      @confirmed="formValidation"
    >
    </fox-unsaved>
  </fox-form>
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
    this.getDetail()
  },
  methods: {
    /**
     * 验证
     */
    formValidation () {
      this.formValidate('update', (valid) => {
        if (valid) {
          this.updateSite()
        }
      })
    },
    /**
     * 获取详情
     */
    getDetail () {
      this.pageLoading = true
      fetchSiteTracking({
        siteId: this.siteId,
        region: this.regionCode
      })
        .then(result => {
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
