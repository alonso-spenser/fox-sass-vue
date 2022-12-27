<template xmlns:el-col="http://www.w3.org/1999/html">
  <page-loading
    :loading="pageLoading"
    :invalid="pageIsValid"
    v-title="$t('site.settings.pass.title')"
  >
    <page-header
      :heading="$t('site.settings.pass.title')"
      :previous="{
        label: $t('site.settings.pageTitle'),
        click: () => {
          this.previous()
        }
      }"
    >
    </page-header>
    <el-form
      class="site-setting-page"
      :model="entity"
      :rules="formRules"
      ref="update"
      label-width="100px"
      label-position="top"
    >
      <page-block
        :subheading="$t('site.settings.pass.content')"
      >
        <el-row :gutter="20" class="el-form-row">
          <el-col :span="6">
            <el-form-item
              prop="downPass"
              :label="$t('site.settings.entity.downPass.label')"
            >
              <el-input
                :maxlength="10"
                show-word-limit
                v-model="entity.downPass"
                :placeholder="$t('site.settings.entity.downPass.placeholder')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </page-block>

      <div class="fixed-action" v-show="unsaved">
        <div class="fixed-action-label">
          {{ $t("base.unsaved") }}
        </div>
        <div class="fixed-action-button">
          <el-button
            type="info"
            :disabled="loading"
            size="small"
            @click="unsaved = false"
            >{{ $t("base.cancel") }}</el-button
          >
          <el-button
            :loading="loading"
            type="primary"
            size="small"
            @click="formValidation"
            >{{ $t("base.save") }}</el-button
          >
        </div>
      </div>
    </el-form>
  </page-loading>
</template>

<script>
import extend from '@/plugins/page/unsaved'

export default {
  name: 'siteSettings',
  extends: extend,
  data () {
    return {
      entity: {
        downPass: ''
      },
      searchAddress: '',
      formRules: {
        downPass: [
          {
            required: true,
            message: this.$t('site.settings.entity.downPass.required'),
            trigger: 'blur'
          },
          {
            pattern: /^[A-Za-z0-9]{6,20}$/,
            message: this.$t('site.settings.entity.downPass.custom'),
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
    this.getData()
  },
  methods: {
    /**
     * 上一步
     */
    previous () {
      this.$router.push(`/site/${this.siteId}/settings`)
    },
    /**
     * 验证
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateSite()
        } else {
          this.$message({
            type: 'error',
            message: this.$t('base.formValidation.inadequate')
          })
        }
      })
    },
    /**
     * 数据获取
     */
    getData () {
      this.axios
        .all([
          this.datasource.siteDetail({
            id: this.siteId
          })
        ])
        .then(
          this.axios.spread((result) => {
            this.pageValid()
            this.resultMessage(result, success => {
              if (success) {
                this.entity = result.data
                this.$nextTick(() => {
                  this.unsaved = false
                })
              }
            })
          })
        )
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 保存设置
     */
    updateSite () {
      this.datasource
        .siteUpdate({
          id: this.siteId,
          downPass: this.entity.downPass
        })
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.$store.state.siteModel.title = this.entity.title
          this.resultMessage(result)
        })
        .catch(error => {
          this.networkMistake(error)
        })
    }
  }
}
</script>
