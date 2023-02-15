<template>
  <main>
    <fox-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
    >
      <fox-page-header
        :previous="true"
        :actions="[
        {
          label: $t('base.delete.button'),
          icon: 'el-icon-delete',
          type: 'text',
          visible: true,
          click: () => {
            this.deleteTag()
          }
        }
    ]"
      >
      </fox-page-header>
      <el-form
        :model="entity"
        :rules="formRules"
        ref="update"
        label-width="100px"
        label-position="top"
      >
        <fox-page-section>
          <el-form-item
            prop="tagName"
            :label="$t('article.tag.update.entity.tagName.label')">
            <el-input
              v-model="entity.tagName"
              @blur="tagBlur"
              :placeholder="$t('article.tag.update.entity.tagName.placeholder')"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="tagUrl"
            :label="$t('article.tag.update.entity.tagUrl.label')">
            <el-input
              v-model="entity.tagUrl"
              @blur="urlBlur"
              :placeholder="urlPlaceholder"
            >
              <template slot="prepend">{{ requestProtocol }}{{ defaultDomain }}/tag/</template>
            </el-input>
          </el-form-item>
        </fox-page-section>
      </el-form>
      <fox-unsaved
        :unsaved.sync="unsaved"
        @confirmed="formValidation"
      >
      </fox-unsaved>
    </fox-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import * as http from '@/plugins/api/article'

export default {
  name: 'articleTagUpdate',
  extends: extend,
  data () {
    return {
      entity: {
        siteId: '',
        tagName: '',
        tagUrl: '',
        tagType: 1,
        region: ''
      },
      urlPlaceholder: '',
      formRules: {
        tagName: [
          {
            required: true,
            message: this.$t('article.tag.update.entity.tagName.required'),
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
    if (this.id) {
      this.getDetail()
    } else {
      this.urlPlaceholder = this.$t('article.tag.update.entity.tagUrl.placeholder')
      this.pageValid()
    }
  },
  methods: {
    /**
     * tag url 默认值
     */
    tagBlur () {
      this.entity.tagName = this.utility.charAtToUpperCase(this.entity.tagName)
      if (this.utility.isEmpty(this.entity.tagUrl)) {
        this.urlPlaceholder = this.utility.urlFilter(this.entity.tagName)
      }
      if (this.utility.isEmpty(this.urlPlaceholder)) {
        this.urlPlaceholder = this.$t('article.tag.update.entity.tagUrl.placeholder')
      }
    },
    /**
     * URL blur 事件
     */
    urlBlur () {
      this.entity.tagUrl = this.utility.urlFilter(this.entity.tagUrl)
    },
    /**
     * 上一步
     */
    previous () {
      this.$router.push(`/site/${this.siteId}/article/tag`)
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid, fields) => {
        if (valid) {
          this.loading = true
          this.entity.siteId = this.siteId
          this.entity.region = this.regionCode
          this.entity.tagType = this.resource.infoType.article

          if (this.id) {
            this.updateTag()
          } else {
            this.addTag()
          }
        } else {
          this.unverified(fields)
        }
      })
    },
    /**
     * 获取详情
     */
    getDetail () {
      http.articleTagDetail({
        id: this.id
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
     * 添加数据
     */
    addTag () {
      http.articleTagUpdate(this.entity)
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
    updateTag () {
      http.articleTagUpdate(this.entity)
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
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
     * 删除
     */
    deleteTag () {
      this.$confirm(this.$t('base.delete.subheading').toString(), this.$t('base.delete.heading').toString(), {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        closeOnClickModal: false,
        type: 'error',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            http.articleTagDelete({
              ids: [this.id],
              siteId: this.siteId
            })
              .then(result => {
                result.options = {
                  action: this.actionType.delete,
                  url: `/site/${this.siteId}/article/tag`
                }
                this.resultMessage(result, () => {
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
    }
  }
}
</script>
