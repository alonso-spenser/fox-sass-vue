<template>
  <main>
    <fo-page-header
      :actions="crumbAction"
      @previous="previous"
    ></fo-page-header>
    <fo-page-loading
      :fo-page-loading="pageLoading"
      :page-is-valid="pageIsValid"
      :percentage="100"
    >
      <el-form
        :model="entity"
        :rules="formRules"
        ref="update"
        label-width="100px"
        label-position="top">
        <el-row :gutter="20">
          <el-col :span="18">
            <fo-page-section>
              <el-form-item
                prop="title"
                :label="$t('article.update.entity.title.label')">
                <el-input
                  show-word-limit
                  maxlength="200"
                  class="small-append"
                  v-model="entity.title"
                  @blur="setCapitalize"
                  :placeholder="$t('article.update.entity.title.placeholder')"
                >
                  <el-checkbox
                    v-model="autoSyncH1Title"
                    @change="setAutoSyncH1"
                    slot="append"
                    v-if="id">H1
                  </el-checkbox>
                </el-input>
              </el-form-item>
              <el-form-item prop="subtitle">
                <label class="el-form-item__label">
                  {{ $t('article.update.entity.subtitle.label') }}
                  <small class="text-warning">
                    {{ $t('article.update.entity.subtitle.tips') }}
                  </small>
                </label>
                <el-input
                  show-word-limit
                  type="textarea"
                  v-model="entity.subtitle"
                  maxlength="255"
                  :autosize="{ minRows: 2, maxRows: 5}"
                  :placeholder="$t('article.update.entity.subtitle.placeholder')"
                ></el-input>
              </el-form-item>
              <el-form-item prop="summary">
                <label class="el-form-item__label">
                  {{ $t('article.update.entity.summary.label') }}
                  <small class="text-warning">
                    {{ $t('article.update.entity.summary.tips') }}
                  </small>
                </label>
                <el-input
                  show-word-limit
                  type="textarea"
                  v-model="entity.summary"
                  maxlength="255"
                  :autosize="{ minRows: 3, maxRows: 5}"
                  :placeholder="$t('article.update.entity.summary.placeholder')"
                ></el-input>
              </el-form-item>
            </fo-page-section>
            <fo-page-section
              :heading="$t('article.update.entity.coverImage.label')"
            >
              <template slot="header">
                <el-button
                  type="text"
                  @click="resourceVisible = true"
                  icon="el-icon-picture-outline-round">
                  {{ $t('resourceSelector.lib') }}
                </el-button>
              </template>
              <fo-image-upload
                v-model="entity.imageList"
                :file-limit="10"
                :oss-bucket="resource.ossBucket"
                :server-address="utility.uploadURL()"
                :file-folder="siteId"
              ></fo-image-upload>
            </fo-page-section>
            <fo-page-section>
              <el-form-item
                prop="description"
                :label="$t('article.update.entity.description.label')">
                <fo-editor
                  v-model="entity.description"
                  :file-folder="siteId"
                  @upload="ossUpload"
                  :server-address="utility.uploadURL()"
                  :placeholder="$t('article.update.entity.description.placeholder')"
                ></fo-editor>
              </el-form-item>
            </fo-page-section>
            <!--扩展属性-->
            <fo-page-section v-if="false">
              <el-row>
                <el-col :span="18">
                  {{ $t("article.update.attribute.heading") }}
                  <div class="el-form-item__tips mt-2">
                    {{ $t("article.update.attribute.desc") }}
                  </div>
                </el-col>
                <el-col
                  :span="6"
                  class="text-right">
                  <el-button
                    size="small"
                    round
                    @click="attributeTabsEdit('', 'add')"
                    icon="el-icon-plus">
                    {{ $t("base.addition.button") }}
                  </el-button>
                </el-col>
              </el-row>
              <el-tabs
                v-model="attributeTabsValue"
                type="card"
                closable
                v-if="entity.blockList.length > 0"
                @edit="attributeTabsEdit">
                <el-tab-pane
                  :key="item.key"
                  v-for="(item, index) in entity.blockList"
                  :label="item.blockName"
                  :name="item.id"
                >
                  <div class="attribute-tabs">
                    <el-form-item
                      :prop="`blockList.${index}.blockName`"
                      :label="$t('article.update.attribute.title.label')"
                      :rules="formRules.specValue"
                    >
                      <el-input
                        size="small"
                        :maxlength="30"
                        show-word-limit
                        placeholder=""
                        v-model="item.blockName"
                      ></el-input>
                    </el-form-item>

                    <el-form-item
                      :label="$t('article.update.attribute.content.label')"
                      :prop="`blockList.${index}.blockDescription`"
                    >
                      <fo-editor
                        v-model="item.blockDescription"
                        model-type="simple"
                        :file-folder="siteId"
                        :server-address="utility.uploadURL()"
                        :placeholder="$t('article.update.entity.description.placeholder')"
                      ></fo-editor>
                    </el-form-item>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </fo-page-section>
            <search-engine-preview
              :temp-title="entity.title"
              :temp-desc="entity.description"
              :maxlength="320"
              catalog="item"
              v-model="seoEntity"
              @update="updateSEO"
            >
            </search-engine-preview>
          </el-col>
          <el-col :span="6">
            <!--<fo-page-section>-->
            <!--  <el-form-item :label="$t('article.update.entity.state.label')">-->
            <!--    <el-switch-->
            <!--      v-model="entity.state"-->
            <!--      active-color="#13ce66"-->
            <!--      :active-text="$t('article.update.entity.state.options.enable')"-->
            <!--      :active-value="0"-->
            <!--      inactive-color="#ff4949"-->
            <!--      :inactive-text="$t('article.update.entity.state.options.disable')"-->
            <!--      :inactive-value="1">-->
            <!--    </el-switch>-->
            <!--  </el-form-item>-->
            <!--</fo-page-section>-->
            <!--时间-->
            <fo-page-section>
              <el-form-item
                prop="createTime"
                :label="$t('article.update.entity.createTime.label')">
                <el-date-picker
                  v-model="entity.createTime"
                  type="datetime"
                  class="w-100"
                  value-format="timestamp"
                  :placeholder="$t('article.update.entity.createTime.placeholder')"
                >
                </el-date-picker>
              </el-form-item>
            </fo-page-section>
            <!--集合-->
            <collection-select
              :inlay="true"
              :info-type="resource.infoType.article"
              v-model="entity.collectionList"
            ></collection-select>
            <!--标签-->
            <tag-select
              :inlay="true"
              :info-type="resource.infoType.article"
              v-model="entity.tagList"
            >
            </tag-select>
            <!--附件-->
            <fo-page-section v-if="false">
              <fo-attachment-upload
                v-model="entity.attachmentList"
                :oss-bucket="resource.ossBucket"
                :server-address="utility.uploadURL()"
                :file-folder="siteId"
                :down-pass="true"
                :inactive-value="1"
                :active-value="0"
                :max-size="30"
                :file-limit="30"
                :size-limit="15"
                form-prop-name="attachmentList."
              >
              </fo-attachment-upload>
            </fo-page-section>
          </el-col>
        </el-row>
      </el-form>
      <fo-fixed-unsaved
        :unsaved.sync="unsaved"
        :loading="loading"
        @confirmed="formValidation"
      >
      </fo-fixed-unsaved>
      <resource-selector
        :visible.sync="resourceVisible"
        @close="resourceSelector"
        :info-type="1"></resource-selector>
    </fo-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import * as http from '@/plugins/api/article'
import collectionSelect from '@/components/article/collection-select'
import tagSelect from '@/components/article/tag-select'
import resourceSelector from '../goods/components/resource-selector'

import { fileUpload } from '@/plugins/api/core'
import { mapState } from 'vuex'

export default {
  name: 'articleUpdate',
  extends: extend,
  components: {
    collectionSelect,
    tagSelect,
    resourceSelector
  },
  data () {
    return {
      entity: {
        author: '',
        coverImage: '',
        coverVideo: '',
        createTime: new Date().getTime(),
        description: '',
        infoType: 1,
        initial: '',
        qrcode: '',
        region: '',
        seoDescription: '',
        seoKeywords: '',
        seoTitle: '',
        seoUrl: '',
        siteId: '',
        source: '',
        seoH1: '',
        specification: '',
        summary: '',
        title: '',
        visibilityTime: '',
        attachmentList: [],
        imageList: [],
        blockList: [],
        subtitle: '',
        tagList: [],
        collectionList: []
      },
      formRules: {
        description: [
          {
            required: true,
            message: this.$t('article.update.entity.description.required'),
            trigger: 'blur'
          }
        ],
        coverImage: [
          {
            required: true,
            message: this.$t('article.update.entity.coverImage.required'),
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: this.$t('article.update.entity.title.required'),
            trigger: 'blur'
          },
          {
            validator: this.utility.expression.checkLength,
            length: 200,
            trigger: 'blur'
          }
        ],
        subtitle: [
          {
            validator: this.utility.expression.checkLength,
            length: 255,
            trigger: 'blur'
          }
        ],
        specKey: [
          {
            required: true,
            message: '',
            trigger: 'blur'
          }
        ],
        specValue: [
          {
            required: true,
            message: ' ',
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
      },
      /**
       * 扩展属性
       */
      attributeTabsValue: '',
      resourceVisible: false
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
      this.pageValid()
    }
  },
  computed: {
    ...mapState(['globalRegionModel']),
    /**
     * 面包屑操作
     */
    crumbAction () {
      return [
        {
          label: this.$t('base.delete.button'),
          icon: 'el-icon-delete',
          visible: this.id,
          click: () => {
            this.deleteArticle()
          }
        },
        {
          label: this.$t('base.operate.preview'),
          icon: 'fo-eye-open',
          visible: this.id,
          click: () => {
            this.articlePreview()
          }
        }
      ]
    }
  },
  methods: {
    /**
     * 图片选择结果
     * @param list 图片
     */
    resourceSelector (list) {
      list.forEach((o) => {
        let s = this.entity.imageList.filter((sb) => {
          return o.url === sb.url
        })
        if (s.length === 0) {
          this.entity.imageList.push({
            'fileType': this.utility.fileType(o.url),
            'coverImage': '',
            'refType': 1,
            'title': o.alt,
            'needPass': 1,
            'url': o.url,
            'description': '',
            'suffix': this.utility.suffix(o.url)
          })
        }
      })
    },
    /**
     * OSS文件上传
     * @param formData 数据
     * @param func 回调
     */
    ossUpload (formData, func) {
      fileUpload(formData).then((result) => {
        if (func && typeof (func) === 'function') {
          func.call(this, result)
        }
      })
    },
    /**
     * 首字大写
     */
    setCapitalize () {
      this.entity.title = this.utility.charAtToUpperCase(this.entity.title)
    },
    /**
     * 文章预览
     */
    articlePreview () {
      this.utility.openSite(`${this.globalRegionModel.url}/item/${this.entity.seoUrl}`)
    },
    /**
     * 上一步
     */
    previous () {
      this.$router.push(`/site/${this.siteId}/article`)
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.utility.isEmpty(this.entity.summary)) {
            this.entity.summary = this.utility.extractText(this.entity.description, 255)
          }
          if (this.utility.isEmpty(this.entity.subtitle)) {
            this.entity.subtitle = this.utility.extractText(this.entity.summary, 255)
          }
          if (this.entity.imageList.length > 0) {
            this.entity.coverImage = this.entity.imageList[0].url
          }
          if (this.utility.isEmpty(this.entity.region)) {
            this.entity.region = this.regionCode
          }
          // this.entity.subtitle = this.utility.clearLineSymbol(this.entity.subtitle)
          this.entity.title = this.utility.clearLineSymbol(this.entity.title)
          this.entity.summary = this.utility.subString(this.entity.summary, 3000)
          this.loading = true
          if (this.id) {
            this.updateArticle()
          } else {
            this.addArticle()
          }
        } else {
          this.$message({
            type: 'error',
            message: this.$t('base.formValidation.inadequate').toString()
          })
        }
      })
    },
    /**
     * 获取详情
     */
    getDetail () {
      http.articleDetail({
        id: this.id
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity = {
                ...result.data,
                collectionList: result.data.collectionList.filter(item => item.collectionType === 1)
              }
              this.seoEntity = {
                description: result.data.seoDescription,
                keywords: this.utility.isEmpty(result.data.seoKeywords) ? [] : result.data.seoKeywords.split(','),
                title: result.data.seoTitle,
                url: result.data.seoUrl,
                heading: result.data.seoH1
              }
              // if (this.entity.imageList.length === 0 && this.utility.isNotEmpty(this.entity.coverImage)) {
              //   this.entity.imageList.push({
              //     url: this.entity.coverImage
              //   })
              // }
              if (result.data.blockList.length) {
                this.attributeTabsValue = result.data.blockList[0].id
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
    addArticle () {
      this.entity.siteId = this.siteId
      http.articleUpdate(this.entity)
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
    updateArticle () {
      this.entity.siteId = this.siteId
      if (this.autoSyncH1Title) {
        this.entity.seoH1 = this.entity.title
      }
      http.articleUpdate(this.entity)
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
    deleteArticle () {
      this.$confirm(this.$t('base.delete.subheading').toString(), this.$t('base.delete.heading').toString(), {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        closeOnClickModal: false,
        type: 'error',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            http.articleDelete({
              ids: [this.id],
              siteId: this.siteId
            })
              .then(result => {
                result.options = {
                  action: this.actionType.delete,
                  url: `/site/${this.siteId}/article`
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
     * 扩展属性事件
     * @param targetName
     * @param action
     */
    attributeTabsEdit (targetName, action) {
      if (action === 'add') {
        let newTabName = `New Tab ${this.entity.blockList.length + 1}`
        let key = `key-${this.entity.blockList.length + 1}`
        this.entity.blockList.push({
          blockName: newTabName,
          blockDescription: `New Tab content ${this.entity.blockList.length + 1}`,
          id: key
        })
        this.attributeTabsValue = key
      } else if (action === 'remove') {
        let activeName = this.attributeTabsValue
        if (activeName === targetName) {
          this.entity.blockList.forEach((tab, index) => {
            if (tab.id === targetName) {
              let nextTab = this.entity.blockList[index + 1] || this.entity.blockList[index - 1]
              if (nextTab) {
                activeName = nextTab.id
              }
            }
          })
        }
        this.attributeTabsValue = activeName
        this.entity.blockList = this.entity.blockList.filter(tab => tab.id !== targetName)
      }
    }
  }
}
</script>
<style lang="scss">
.el-tabs__header {
  margin-bottom: 0;
}

.attribute-tabs {
  border: 1px solid #E4E7ED;
  border-top: 0;
  padding: 20px;
}

.el-tag {
  //overflow: hidden;
}
</style>
