<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
    :percentage="80"
  >
    <fox-form
      :model="entity"
      :rules="formRules"
      ref="update">
      <el-row :gutter="20">
        <el-col :span="18">
          <fox-section
            :heading="$t('goods.update.info')"
          >
            <el-button
              slot="header"
              size="mini"
              @click="removeArticle"
              icon="el-icon-delete"
              type="text"
              v-if="id"
            >
              {{ $t('base.delete.button') }}
            </el-button>
            <el-form-item
              prop="title">
              <fox-input
                show-word-limit
                shrink
                maxlength="200"
                class="small-append"
                v-model="entity.title"
                @blur="setCapitalize"
                :placeholder="$t('article.update.entity.title.label')"
                :description="$t('article.update.entity.title.placeholder')"
              >
                <el-checkbox
                  v-model="autoSyncH1Title"
                  @change="setAutoSyncH1"
                  slot="append"
                  v-if="id">H1
                </el-checkbox>
              </fox-input>
            </el-form-item>
            <el-form-item prop="subtitle">
              <fox-input
                show-word-limit
                shrink
                type="textarea"
                v-model="entity.subtitle"
                maxlength="255"
                :autosize="{ minRows: 2, maxRows: 5}"
                :description="$t('article.update.entity.subtitle.tips')"
                :placeholder="$t('article.update.entity.subtitle.placeholder')"
              ></fox-input>
            </el-form-item>
            <el-form-item prop="summary">
              <fox-input
                show-word-limit
                shrink
                type="textarea"
                :description="$t('article.update.entity.summary.tips')"
                :placeholder="$t('article.update.entity.summary.placeholder')"
                v-model="entity.summary"
                maxlength="255"
                :autosize="{ minRows: 3, maxRows: 5}"
              ></fox-input>
            </el-form-item>
          </fox-section>
          <fox-section
            :heading="$t('article.update.entity.coverImage.label')"
          >
            <template slot="header">
              <el-button
                type="text"
                size="mini"
                @click="resourceVisible = true"
                icon="el-icon-picture-outline-round">
                {{ $t('resourceSelector.lib') }}
              </el-button>
            </template>
            <fox-image-upload
              v-model="entity.imageList"
              :file-limit="10"
              :oss-bucket="resource.ossBucket"
              :server-address="utility.uploadURL()"
              :file-folder="siteId"
            ></fox-image-upload>
          </fox-section>
          <fox-section
            :heading="$t('article.update.entity.description.label')"
          >
            <el-form-item prop="description">
              <fox-editor
                v-model="entity.description"
                :file-folder="siteId"
                @upload="ossUpload"
                :server-address="utility.uploadURL()"
                :placeholder="$t('article.update.entity.description.placeholder')"
              ></fox-editor>
            </el-form-item>
          </fox-section>
          <!--扩展属性-->
          <fox-section v-if="false">
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
                    <fox-editor
                      v-model="item.blockDescription"
                      model-type="simple"
                      :file-folder="siteId"
                      :server-address="utility.uploadURL()"
                      :placeholder="$t('article.update.entity.description.placeholder')"
                    ></fox-editor>
                  </el-form-item>
                </div>
              </el-tab-pane>
            </el-tabs>
          </fox-section>
          <fox-section heading="关联产品">
            <el-button
              slot="header"
              size="mini"
              @click="goodsVisible = true"
              icon="el-icon-plus"
              type="text"
              v-if="entity.refList.length < 12"
            >
              添加
            </el-button>
            <el-table
              :data="entity.refList"
              :show-header="false"
              class="no-last-border"
            >
              <el-table-column
                width="80">
                <template slot-scope="scope">
                  <img
                    style="width: 50px;"
                    :src="scope.row.coverImage || resource.image.placeholder">
                </template>
              </el-table-column>
              <el-table-column
                prop="title"
              >
              </el-table-column>
              <el-table-column
                width="110">
                <template slot-scope="scope">
                  <div>
                    <el-button
                      size="small"
                      circle
                      class="vertical-button"
                      @click="articleResort(scope.row.id, -1)"
                      v-if="scope.$index < entity.refList.length - 1">
                      <i class="el-icon-arrow-down"></i>
                    </el-button>
                    <el-button
                      size="small"
                      circle
                      class="vertical-button"
                      @click="articleResort(scope.row.id, 1)"
                      v-if="scope.$index > 0">
                      <i class="el-icon-arrow-up"></i>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                width="60"
                align="right">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    circle
                    class="vertical-button"
                    @click="articleRemove(scope.row.id)"
                  >
                    <i class="el-icon-delete"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </fox-section>
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
          <!--<fox-section>-->
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
          <!--</fox-section>-->
          <!--时间-->
          <fox-section
            :heading="$t('article.update.entity.createTime.placeholder')"
          >
            <el-form-item
              prop="createTime">
              <fox-date-picker
                shrink
                v-model="entity.createTime"
                type="datetime"
                class="w-100"
                value-format="timestamp"
                :placeholder="$t('article.update.entity.createTime.placeholder')"
              >
              </fox-date-picker>
            </el-form-item>
          </fox-section>
          <!--集合-->
          <collection-select
            :inlay="true"
            :info-type="resource.infoType.article"
            v-model="entity.collectionList"
          ></collection-select>
          <!--标签-->
          <tag-select
            :info-type="resource.infoType.article"
            v-model="entity.tagList"
          >
          </tag-select>
          <!--附件-->
          <fox-section v-if="false">
            <fox-attachment-upload
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
            </fox-attachment-upload>
          </fox-section>
        </el-col>
      </el-row>
    </fox-form>
    <fox-unsaved
      :unsaved.sync="unsaved"
      :loading="loading"
      @confirmed="formValidation"
    >
    </fox-unsaved>
    <resource-selector
      :visible.sync="resourceVisible"
      @close="resourceSelector"
      :info-type="1"></resource-selector>
    <available-goods
      :display.sync="goodsVisible"
      :ref-list="entity.refList"
      @close="getRefList"
    ></available-goods>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import * as http from '@/plugins/api/article'
import collectionSelect from '@/components/article/collection-select'
import tagSelect from '@/components/article/tag-select'
import resourceSelector from '../goods/components/resource-selector'

import { fetchFileUpload } from '@/plugins/api/core'
import { mapState } from 'vuex'
import availableGoods from '@/components/article/available-goods'

export default {
  name: 'articleUpdate',
  extends: extend,
  components: {
    collectionSelect,
    tagSelect,
    resourceSelector,
    availableGoods
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
        refList: [],
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
      goodsVisible: false,
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
    ...mapState(['globalRegionModel'])
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
      fetchFileUpload(formData).then((result) => {
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
      this.redirectURL(`/site/${this.siteId}/article`)
    },
    /**
     * 从集合删除文章
     * @param articleId
     */
    articleRemove (articleId) {
      this.entity.refList.forEach((o, index) => {
        if (o.id === articleId) {
          this.entity.refList[index].remove()
        }
      })
    },
    /**
     * 选择产品回调
     * @param rows
     */
    getRefList (rows) {
      this.entity.refList = this.entity.refList.concat(rows)
    },
    /**
     * 表单校验
     */
    formValidation () {
      this.formValidate('update', (valid) => {
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
              // this.previous()
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
    removeArticle () {
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

.el-date-editor--datetime {
  width: 100% !important
}
</style>
