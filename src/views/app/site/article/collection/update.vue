<template>
  <main>
    <fox-page-header
      :actions="crumbAction"
      :previous="true"
    >
      <el-breadcrumb
        class="breadcrumb-wrap"
        separator="/">
        <el-breadcrumb-item
          :to="`/site/${this.siteId}/dashboard`"
        >{{ $t('site.dashboard.title') }}
        </el-breadcrumb-item>
        <el-breadcrumb-item
          :to="`/site/${this.siteId}/${collectionType}`"
        >{{ $t(`${collectionType}.paging.title`) }}
        </el-breadcrumb-item>
        <el-breadcrumb-item
          :to="`/site/${this.siteId}/${collectionType}/collection`"
        >{{ $t(`article.collection.${collectionType}.title`) }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          {{
            entity.title ? entity.title : id ? $t('article.collection.update.updateTitle') : $t('article.collection.update.addTitle')
          }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </fox-page-header>
    <fox-page-loading
      :fo-page-loading="pageLoading"
      :page-is-valid="pageIsValid"
      :percentage="90"
    >
      <el-form
        :model="entity"
        :rules="formRules"
        ref="update"
        label-width="100px"
        label-position="top">
        <fox-page-section>
          <el-row
            :gutter="20"
            type="flex"
            justify="space-between">
            <el-col>
              <el-row
                class="mb-4"
                :gutter="20">
                <el-col :span="infoType === 3 ? 18 : 24">
                  <el-form-item
                    prop="title">
                    <fox-input
                      show-word-limit
                      maxlength="100"
                      shrink
                      v-model="entity.title"
                      @blur="setCapitalize"
                      class="small-append"
                      :placeholder="$t('article.collection.update.entity.title.placeholder')"
                    >
                      <div
                        class="small-append-split"
                        slot="append">
                        <el-checkbox
                          v-model="autoSyncH1Title"
                          @change="setAutoSyncH1"
                          v-if="id">H1
                        </el-checkbox>
                      </div>
                    </fox-input>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="6"
                  v-if="infoType === 3">
                  <el-form-item
                    prop="accessPassword">
                    <fox-input
                      shrink
                      show-word-limit
                      maxlength="6"
                      v-model="entity.accessPassword"
                      :placeholder="$t('article.collection.update.entity.accessPassword.placeholder')"
                    >
                    </fox-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item
                prop="description">
                <fox-input
                  shrink
                  v-model="entity.description"
                  maxlength="3000"
                  type="textarea"
                  rows="4"
                  :placeholder="$t('article.collection.update.entity.description.placeholder')"
                ></fox-input>
              </el-form-item>
            </el-col>
            <el-col style="width: 186px">
              <div class="el-form-item">
                <div class="d-flex justify-space-between align-items-center mb-10">
                  <label class="el-form-item__label p-0">{{
                      $t('article.collection.update.entity.coverImage.label')
                                                         }}</label>
                  <label
                    class="text-primary cursor-pointer"
                    @click="loadGallery('coverImage')"
                    :title="$t('resourceSelector.lib')">
                    <i class="el-icon-picture-outline-round"></i>
                    <!--                    {{ $t('resourceSelector.lib') }}-->
                  </label>
                </div>
                <div class="el-form-item__content">
                  <fox-image-single
                    v-model="entity.coverImage"
                    :width="180"
                    :alt="entity.coverAlt"
                    :size-limit="10"
                    :oss-bucket="resource.ossBucket"
                    :server-address="utility.uploadURL()"
                    :file-folder="siteId"
                    @updateAlt="updateCoverAlt"
                  ></fox-image-single>
                </div>
              </div>
            </el-col>
            <el-col style="width: 186px;margin-left: 20px;margin-right: 20px">
              <div class="el-form-item">
                <div class="d-flex justify-space-between align-items-center mb-10">
                  <label class="el-form-item__label p-0">{{
                      $t('article.collection.update.entity.banner.label')
                                                         }}</label>
                  <label
                    class="text-primary cursor-pointer"
                    @click="loadGallery('banner')"
                    :title="$t('resourceSelector.lib')">
                    <i class="el-icon-picture-outline-round"></i>
                    <!--                    {{ $t('resourceSelector.lib') }}-->
                  </label>
                </div>
                <div class="el-form-item__content">
                  <fox-image-single
                    v-model="entity.banner"
                    :width="180"
                    :alt="entity.bannerAlt"
                    :size-limit="10"
                    :oss-bucket="resource.ossBucket"
                    :server-address="utility.uploadURL()"
                    :file-folder="siteId"
                    :alt-visible="false"
                    @updateAlt="updateBannerAlt"
                  ></fox-image-single>
                </div>
              </div>
            </el-col>
          </el-row>
        </fox-page-section>
        <fox-page-section
          :heading="$t('article.conditionFilter.collectionType.label')"
          :content="$t('article.conditionFilter.collectionType.tips')"
        >
          <template v-if="!id">
            <p class="mt-0">
              {{ $t('article.conditionFilter.collectionType.label') }}
              <label class="text-secondary ml-4">
                {{ $t(`article.conditionFilter.collectionType.tips`) }}
              </label>
            </p>
            <p class="mt-5">
              <el-radio
                v-model="entity.collectionType"
                @change="initCache"
                :label="1">
                {{ $t('article.conditionFilter.collectionType.manual.label') }}
              </el-radio>
            </p>
            <p class="text-indent text-secondary">
              {{ $t(`article.conditionFilter.collectionType.manual.${collectionType}`) }}
            </p>
            <p>
              <el-radio
                @change="initCache"
                v-model="entity.collectionType"
                :label="2">
                {{ $t('article.conditionFilter.collectionType.auto.label') }}
              </el-radio>
            </p>
            <p class="text-indent text-secondary">
              {{ $t(`article.conditionFilter.collectionType.auto.${collectionType}`) }}
            </p>
          </template>
          <template v-else>
            <p class="mt-0">
              {{ $t('article.conditionFilter.collectionType.label') }}
            </p>
            <template v-if="entity.collectionType===1">
              <p class="text-primary">
                {{ $t('article.conditionFilter.collectionType.manual.label') }}
              </p>
              <p class="text-indent text-secondary">
                {{ $t(`article.conditionFilter.collectionType.manual.${collectionType}`) }}
              </p>
            </template>
            <template v-else>
              <p class="text-primary">
                {{ $t('article.conditionFilter.collectionType.auto.label') }}
              </p>
              <p class="text-indent text-secondary">
                {{ $t(`article.conditionFilter.collectionType.auto.${collectionType}`) }}
              </p>
            </template>
          </template>
          <div v-if="entity.collectionType===2">
            <hr>
            <p>
              {{ $t('article.conditionFilter.rule.label') }}
            </p>
            <p class="mt-5">
              <el-radio
                v-model="entity.joinType"
                :label="1">
                {{ $t('article.conditionFilter.rule.one.label') }}
              </el-radio>
              <el-radio
                v-model="entity.joinType"
                :label="2">
                {{ $t('article.conditionFilter.rule.all.label') }}
              </el-radio>
            </p>
            <el-table
              :show-header="false"
              :data="entity.conditionData"
              class="no-last-border"
            >
              <el-table-column>
                <template slot-scope="scope">
                  <el-select
                    class="w-100"
                    v-model="scope.row.field"
                    @change="filedChange(scope.$index)"
                    :ref="`filed${scope.$index}`"
                    :placeholder="$t('base.placeholder.search')">
                    <el-option
                      v-for="item in conditions"
                      :key="`field-${item.field}-${scope.$index}`"
                      :label="item.fieldLabel"
                      :value="item.field"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-select
                    class="w-100"
                    :ref="`rule${scope.$index}`"
                    v-model="scope.row.operate"
                    @change="ruleChange(scope.$index)"
                    :placeholder="$t('base.placeholder.search')">
                    <el-option
                      v-for="item in conditionCache[scope.$index].conditions"
                      :key="`operate-${item.operate}-${scope.$index}`"
                      :label="item.operateLabel"
                      :value="item.operate"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-form-item
                    :key="`variant-${scope.$index}`"
                    :prop="`conditionData.${scope.$index}.value`"
                    :rules="formRules.ruleValue"
                  >
                    <el-input
                      v-model="scope.row.value"
                      :placeholder="$t('base.placeholder.input')"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                align="right"
                width="80"
                v-if="entity.conditionData.length > 1"
              >
                <template slot-scope="scope">
                  <el-button
                    icon="el-icon-delete"
                    circle
                    @click.stop="removeRow(scope.$index)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              @click="addRow"
              class="mt-3 ml-3"
              icon="el-icon-plus"
            >
            </el-button>
          </div>
        </fox-page-section>
        <fox-page-section
          v-if="id"
          :heading="$t(`article.collection.${collectionType}.label`)"
        >
          <p
            v-if="entity.collectionType===1"
            class="text-right">
            <el-button
              round
              size="small"
              :disabled="this.collectionData.length < 2"
              @click="sortingVisible=true"
            >
              {{ $t('sorting.title') }}
            </el-button>
            <el-button
              round
              type="primary"
              size="small"
              @click="articleSearchDialogVisible=true"
            >
              {{ $t(`article.collection.${collectionType}.add`) }}
            </el-button>
          </p>
          <el-table
            :data="collectionData"
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
              width="110"
              v-if="entity.collectionType === 1">
              <template slot-scope="scope">
                <div>
                  <el-button
                    size="small"
                    circle
                    class="vertical-button"
                    @click="articleResort(scope.row.id, -1)"
                    v-if="scope.$index < collectionData.length - 1">
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
              align="right"
              v-if="entity.collectionType === 1">
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
        </fox-page-section>
        <search-engine-preview
          :temp-title="entity.title"
          :temp-desc="entity.description"
          :maxlength="320"
          catalog="collection"
          v-model="seoEntity"
          @update="updateSEO"
        >
        </search-engine-preview>
      </el-form>
      <fox-unsaved
        :unsaved.sync="unsaved"
        :loading="loading"
        @confirmed="formValidation"
      >
      </fox-unsaved>
      <add-to-collection
        :collection-type="infoType"
        :collection-id="id"
        :display="articleSearchDialogVisible"
        @close="addToCollectionClose"
      >
      </add-to-collection>
      <sorting
        @close="updateSort"
        :info-type="infoType"
        :visible="sortingVisible"
      ></sorting>
    </fox-page-loading>
    <resource-selector
      :visible.sync="gallery.visible"
      @close="resourceSelector"
      :info-type="0"></resource-selector>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import * as http from '@/plugins/api/article'
import { resourceCollectionData } from '@/plugins/api/resource'
import ResourceSelector from '../../goods/components/resource-selector'
import { mapState } from 'vuex'

export default {
  name: 'articleCollectionUpdate',
  extends: extend,
  data () {
    return {
      entity: {
        collectionType: 1,
        conditionData: [],
        description: '',
        coverAlt: '',
        coverImage: '',
        joinType: 1,
        seoDescription: '',
        seoKeywords: '',
        seoTitle: '',
        seoUrl: '',
        title: '',
        region: ''
      },
      formRules: {
        coverImage: [
          {
            required: true,
            message: this.$t('article.collection.update.entity.coverImage.required'),
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: this.$t('article.collection.update.entity.title.required'),
            trigger: 'blur'
          },
          {
            validator: this.utility.expression.checkLength,
            length: 100,
            trigger: 'blur'
          }
        ],
        description: [
          {
            validator: this.utility.expression.checkLength,
            length: 3000,
            trigger: 'blur'
          }
        ],
        ruleValue: [
          {
            required: true,
            message: this.$t('variant.entity.name.required'),
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
       * 条件缓存
       */
      conditionCache: [],
      /**
       * SQL条件
       */
      conditions: [],
      /**
       * 集合数据
       */
      collectionData: [],
      /**
       * 文章搜索弹窗
       */
      articleSearchDialogVisible: false,
      sortingVisible: false,
      collectionType: 'article',
      infoType: 1,
      gallery: {
        visible: false,
        field: ''
      }
    }
  },
  components: {
    ResourceSelector
  },
  watch: {
    entity: {
      deep: true,
      handler () {
        this.unsaved = true
      }
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
          label: this.$t('base.operate.preview'),
          icon: 'fo-eye-open',
          visible: this.id,
          click: () => {
            this.collectionPreview()
          }
        }
      ]
    }
  },
  created () {
    this.getCondition()
    this.collectionType = this.$route.params.collectionType
    let infoType = this.resource.infoType[this.collectionType]
    if (infoType !== undefined) {
      this.infoType = infoType
    }
    if (this.id) {
      this.getDetail()
      this.getCollectionData()
    } else {
      this.initCache()
      this.pageValid()
    }
  },
  methods: {
    /**
     * 加载图库
     */
    loadGallery (field) {
      this.gallery.field = field
      this.gallery.visible = true
    },
    /**
     * 图片选择结果
     * @param list 图片
     */
    resourceSelector (list) {
      if (list.length > 0) {
        this.entity[this.gallery.field] = list[0].url
      }
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
    collectionPreview () {
      this.utility.openSite(`${this.globalRegionModel.url}/collection/${this.entity.seoUrl}`)
    },
    /**
     * 上一步
     */
    previous () {
      this.$router.push(`/site/${this.siteId}/${this.collectionType}/collection`)
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.entity.infoType = this.infoType
          if (this.utility.isEmpty(this.entity.region)) {
            this.entity.region = this.regionCode
          }
          this.loading = true
          if (this.id) {
            this.updateCollection()
          } else {
            this.addCollection()
          }
        }
      })
    },
    /**
     * 获取详情
     */
    getDetail () {
      http.articleCollectionDetail({
        id: this.id
      }).then(result => {
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
            this.initCache()
            this.$nextTick(() => {
              this.unsaved = false
            })
          }
        })
      })
        .catch((e) => {
          this.pageInvalid(e)
        })
    },
    /**
     * 更新封面图ALT
     */
    updateCoverAlt (value) {
      this.entity.coverAlt = value
    },
    /**
     * 更新banner图ALT
     */
    updateBannerAlt (value) {
      this.entity.bannerAlt = value
    },
    /**
     * 添加数据
     */
    addCollection () {
      http.articleCollectionUpdate({
        ...this.entity,
        siteId: this.siteId
      })
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
    updateCollection () {
      if (this.autoSyncH1Title) {
        this.entity.seoH1 = this.title
      }
      http.articleCollectionUpdate(this.entity)
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.getDetail()
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
    deleteCollection () {
      this.$confirm(this.$t('base.delete.subheading').toString(), this.$t('base.delete.heading').toString(), {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        closeOnClickModal: false,
        type: 'error',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            http.articleCollectionDelete({
              ids: [this.id],
              siteId: this.siteId
            })
              .then(result => {
                result.options = {
                  action: this.actionType.delete,
                  url: `/site/${this.siteId}/${this.collectionType}/collection`
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
     * 新增一行(校验条件数据）
     */
    addRow () {
      if (this.conditions.length < 1) {
        this.getCondition(() => {
          this.addNewRow()
        })
      } else {
        this.addNewRow()
      }
    },
    /**
     * 添加一行
     */
    addNewRow () {
      this.entity.conditionData.push({
        field: this.conditions[0].field,
        fieldLabel: this.conditions[0].fieldLabel,
        type: this.conditions[0].type,
        operateLabel: this.conditions[0].conditions[0].operateLabel,
        operate: this.conditions[0].conditions[0].operate,
        value: ''
      })
      this.conditionCache.push(this.conditions[0])
    },
    /**
     * 字段改变
     */
    filedChange (index) {
      let value = this.entity.conditionData[index].field
      const rows = this.conditions.filter((o) => {
        return o.field === value
      })
      if (rows.length > 0) {
        this.conditionCache.splice(index, 1, rows[0])
        this.entity.conditionData[index].fieldLabel = rows[0].fieldLabel
        this.entity.conditionData[index].operate = rows[0].conditions[0].operate
        this.entity.conditionData[index].operateLabel = rows[0].conditions[0].operateLabel
      }
    },
    /**
     * 连接条件变更
     */
    ruleChange (index) {
      let value = this.entity.conditionData[index].operate
      const rows = this.conditionCache[index].conditions.filter((o) => {
        return o.operate === value
      })
      if (rows.length > 0) {
        this.entity.conditionData[index].operateLabel = rows[0].operateLabel
      }
    },
    /**
     * 删除一行
     * @param index
     */
    removeRow (index) {
      this.entity.conditionData.splice(index, 1)
      this.conditionCache.splice(index, 1)
    },
    /**
     * 条件缓存数据
     */
    initCache () {
      if (this.entity.collectionType === 2 && this.entity.conditionData.length === 0) {
        this.addRow()
      } else if (this.entity.conditionData.length !== this.conditionCache.length) {
        this.conditionCache = []
        this.entity.conditionData.forEach((o) => {
          const rows = this.conditions.filter((sub) => {
            return sub.field === o.field
          })
          if (rows.length > 0) {
            this.conditionCache.push(rows[0])
          }
        })
      }
    },
    /**
     * 获取SQL查询数据
     * @param func
     */
    getCondition (func) {
      this.conditions = this.$t('conditionSizer')
      this.conditions.forEach((o) => {
        o.fieldLabel = o.fieldLabel.replace('{label}', this.$t(`article.collection.${this.collectionType}.label`))
      })
      if (func && typeof (func) === 'function') {
        func.call(this)
      }
    },
    /**
     * 获取集合数据
     */
    getCollectionData () {
      if (this.infoType === this.resource.infoType.download) {
        this.getResourceData()
      } else {
        http.articleCollectionData({
          collectionId: this.id,
          region: this.regionCode,
          siteId: this.siteId
        })
          .then(result => {
            this.resultMessage(result, (success) => {
              if (success) {
                this.collectionData = result.data
              }
            })
          })
          .catch(error => {
            this.networkMistake(error)
          })
      }
    },
    /**
     * 获取集合数据
     */
    getResourceData () {
      resourceCollectionData({
        collectionId: this.id,
        region: this.regionCode,
        siteId: this.siteId
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.collectionData = result.data
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 文章排序
     * @param articleId
     * @param sort
     */
    articleResort (articleId, sort) {
      http.articleCollectionResort({
        articleId: articleId,
        collectionId: this.id,
        sort: sort,
        siteId: this.siteId
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.getCollectionData()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 从集合删除文章
     * @param articleId
     */
    articleRemove (articleId) {
      if (!this.utility.isEmpty(articleId)) {
        http.articleRemoveFromCollection({
          article: [articleId],
          collection: [this.id],
          siteId: this.siteId
        })
          .then(result => {
            this.resultMessage(result, (success) => {
              if (success) {
                this.getCollectionData()
              }
            })
          })
          .catch(error => {
            this.networkMistake(error)
          })
      }
    },
    /**
     * 添加文章到集合
     * @param ids
     * @param func
     */
    addToCollectionClose () {
      this.articleSearchDialogVisible = false
      this.getCollectionData()
    },
    /**
     * 更新排序
     */
    updateSort (value) {
      this.sortingVisible = false
      if (!this.utility.isEmpty(value)) {
        http.articleCollectionAutoResort({
          orderBy: value,
          collectionId: this.id,
          siteId: this.siteId,
          infoType: this.infoType
        })
          .then(result => {
            this.resultMessage(result, (success) => {
              if (success) {
                this.getCollectionData()
              }
            })
          })
          .catch(error => {
            this.networkMistake(error)
          })
      }
    }
  }
}
</script>
