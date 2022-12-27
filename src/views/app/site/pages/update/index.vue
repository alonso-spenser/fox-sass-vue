<template>
  <main>
    <fo-page-header
      :previous="true"
      :actions="id ? headerActions : []"
    ></fo-page-header>
    <fo-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
    >
      <el-form
        :model="entity"
        :rules="formRules"
        ref="update"
        label-width="100px"
        label-position="top">
        <fo-page-section>
          <el-form-item
            prop="title"
            :label="`${$t('customizePage.update.entity.title.label')} <H1>`">
            <el-input
              v-model="entity.title"
              show-word-limit
              :placeholder="$t('customizePage.update.entity.title.placeholder')"
              :maxlength="100"
            >
              <el-checkbox
                v-model="autoSyncH1Title"
                @change="setAutoSyncH1"
                slot="append"
                v-if="id">H1
              </el-checkbox>
            </el-input>
          </el-form-item>
        </fo-page-section>
        <el-alert
          class="mt-5 mb-5"
          :title="$t('customizePage.update.tips')"
          type="warning">
        </el-alert>
        <search-engine-preview
          :temp-title="entity.title"
          :temp-desc="entity.content"
          :maxlength="320"
          catalog="pages"
          v-model="seoEntity"
          @update="updateSEO"
        >
        </search-engine-preview>
      </el-form>
      <fo-fixed-unsaved
        :unsaved.sync="unsaved"
        :loading="loading"
        @confirmed="formValidation"
      >
      </fo-fixed-unsaved>
    </fo-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import {
  fetchAddPage,
  fetchDeletePage,
  fetchGetPageDetail,
  fetchUpdatePage
} from '@/plugins/api/customizePage'
import { mapState } from 'vuex'

export default {
  name: 'siteCustomizeUpdate',
  extends: extend,
  data () {
    return {
      headerActions: [
        {
          label: this.$t('base.operate.view'),
          // icon: 'icon iconfont fo-ico-chakan',
          type: 'primary',
          visible: true,
          click: () => {
            this.openUrl()
          }
        },
        {
          label: this.$t('base.delete.button'),
          // icon: 'icon iconfont fo-ico-shanchu',
          type: 'danger',
          visible: true,
          click: () => {
            this.deletePages()
          }
        }
      ],
      entity: {
        title: '',
        content: '',
        seoTitle: '',
        seoDesc: '',
        seoUrl: '',
        seoH1: '',
        visible: 0,
        region: ''
      },
      formRules: {
        title: [
          {
            required: true,
            message: this.$t('customizePage.update.entity.title.required'),
            trigger: 'blur'
          }
        ]
      },
      /**
       * SEO组件返回值实体
       */
      seoEntity: {
        description: '',
        keywords: [],
        title: '',
        url: '',
        heading: ''
      }
    }
  },
  computed: {
    ...mapState(['siteModel', 'globalRegionModel'])
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
    if (this.id) {
      this.getDetail()
    } else {
      this.pageValid()
    }
  },
  methods: {
    /**
     * 上一步
     */
    previous () {
      this.$router.push(`/site/${this.siteId}/pages`)
    },
    formValidation () {
      let formName = 'update'
      if (this.utility.isEmpty(this.entity.seoDescription)) {
        this.entity.seoDescription = this.entity.title
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.utility.isEmpty(this.entity.region)) {
            this.entity.region = this.regionCode
          }
          this.loading = true
          if (this.id) {
            this.updatePages()
          } else {
            this.addPages()
          }
        }
      })
    },
    /**
     * search-engine-preview 组件数据同步
     * @param placeholder
     */
    updateSEO (placeholder) {
      this.entity.seoKeywords = placeholder.keywords
      this.entity.seoDescription = placeholder.description
      this.entity.seoTitle = placeholder.title
      this.entity.seoUrl = placeholder.url
      this.entity.seoH1 = placeholder.heading
    },
    /**
     * 获取详情
     */
    getDetail () {
      fetchGetPageDetail({
        id: this.id
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity = result.data
              this.seoEntity = {
                description: result.data.seoDescription,
                keywords: this.utility.isEmpty(result.data.seoKeywords) ? [] : result.data.seoKeywords.split(','),
                title: result.data.seoTitle,
                url: result.data.seoUrl,
                heading: result.data.seoH1
              }
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
     * 添加数据
     */
    addPages () {
      this.entity.isCustom = true
      this.entity.pageType = 'custom'
      this.entity.siteId = this.siteId
      fetchAddPage(this.entity)
        .then(result => {
          result.options = {
            action: this.actionType.addition,
            formName: 'update'
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.previous()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 更新数据
     */
    updatePages () {
      if (this.autoSyncH1Title) {
        this.entity.seoH1 = this.entity.title
      }
      fetchUpdatePage(this.entity)
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
    },
    /**
     * 删除页面
     */
    deletePages () {
      this.$confirm(this.$t('base.delete.subheading').toString(), {
        confirmButtonText: this.$t('base.operate.confirm').toString(),
        cancelButtonText: this.$t('base.operate.cancel').toString(),
        closeOnClickModal: false,
        type: 'error',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            fetchDeletePage({
              ids: [this.id]
            })
              .then(result => {
                result.options = {
                  action: this.actionType.delete
                }
                this.resultMessage(result, (success) => {
                  if (success) {
                    this.previous()
                  }
                  done()
                  instance.confirmButtonLoading = false
                })
              })
              .catch(error => {
                this.networkMistake(error)
                done()
                instance.confirmButtonLoading = false
              })
          } else {
            instance.confirmButtonLoading = false
            done()
          }
        }
      })
    },
    /**
     * 打开新页面
     */
    openUrl () {
      this.utility.openSite(`${this.globalRegionModel.url}/page/${this.entity.seoUrl}`)
    }
  }
}
</script>
<style lang="scss">
.nav-wrapper {
  margin-bottom: 16px;
}

.icon-container {
  text-align: right;

  .icon {
    cursor: pointer;
    font-size: 14px;
    display: inline-block;

    &:hover {
      color: #46a0fc;
    }

    span {
      font-size: 14px;
      margin-left: 10px;
      margin-right: 30px;
    }
  }
}
</style>
