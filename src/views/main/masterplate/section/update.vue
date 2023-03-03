<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    :percentage="80"
    google-style
  >
    <el-form
      :model="entity"
      :rules="formRules"
      ref="update"
    >

      <fox-section>
        <el-row :gutter="20">
          <el-col :span="4">
            <fox-section
              :heading="$t('theme.section.update.entity.sectionImage.label')">
              <fox-image-single
                v-model="entity.sectionImage"
                :alt-visible="false"
                :size-limit="10"
                :oss-bucket="resource.themeBucket"
                :server-address="utility.uploadURL()"
                file-folder="section"
              ></fox-image-single>
            </fox-section>
          </el-col>
          <el-col :span="18">
            <el-row :gutter="20">
              <el-col :span="9">
                <fox-form-item
                  :show-message="false"
                  prop="sectionName">
                  <fox-input
                    v-model="entity.sectionName"
                    shrink
                    :placeholder="$t('theme.section.update.entity.sectionName.label')"
                    :description="$t('theme.section.update.entity.sectionName.placeholder')"
                  ></fox-input>
                </fox-form-item>
              </el-col>
              <el-col :span="9">
                <fox-form-item :show-message="false"
                  prop="sectionType">
                  <fox-input
                    v-model="entity.sectionType"
                    shrink
                    @blur="sectionTypeBlur"
                    :placeholder="$t('theme.section.update.entity.sectionType.label')"
                    :description="$t('theme.section.update.entity.sectionType.placeholder')"
                  >
                    <template slot="append">
                      <el-select
                        style="width: 108px"
                        v-model="pageSectionType"
                        size="small"
                        v-if="entity.sectionGroup === 1000"
                        @change="sectionTypeChange"
                        :placeholder="$t('theme.page.update.entity.pageType.placeholder')"
                      >
                        <el-option
                          v-for="item in pageSection"
                          :key="item.pageType"
                          :label="item.title"
                          :value="item.pageType"
                        ></el-option>
                      </el-select>
                      <el-select
                        style="width: 108px"
                        v-model="globalSectionType"
                        size="small"
                        v-if="entity.sectionGroup === 2000"
                        @change="globalSectionTypeChange"
                        :placeholder="$t('theme.section.update.entity.sectionType.placeholder')"
                      >
                        <el-option
                          v-for="item in globalSection"
                          :key="item.sectionType"
                          :label="item.title"
                          :value="item.sectionType"
                        ></el-option>
                      </el-select>
                    </template>
                  </fox-input>
                </fox-form-item>
              </el-col>
              <el-col
                :span="6">
                <fox-form-item :show-message="false"
                  prop="state">
                  <el-switch
                    v-model="entity.state"
                    :inactive-value="1"
                    :active-value="0"
                    :active-text="$t('theme.section.update.entity.state.label')"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </fox-form-item>
              </el-col>
              <el-col
                :span="9">
                <fox-form-item :show-message="false"
                  prop="sectionGroup">
                  <fox-select
                    shrink
                    v-model="entity.sectionGroup"
                    :placeholder="$t('theme.section.update.entity.sectionGroup.label')"
                    :description="$t('theme.section.update.entity.sectionGroup.placeholder')"
                  >
                    <el-option
                      v-for="item in sectionGroup"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"
                    ></el-option>
                  </fox-select>
                </fox-form-item>
              </el-col>
              <el-col
                :span="9"
                v-if="id">
                <fox-form-item :show-message="false"
                  prop="salt">
                  <fox-input
                    v-model="entity.salt"
                    shrink
                    disabled
                    :placeholder="$t('theme.section.update.entity.salt.label')"
                    :description="$t('theme.section.update.entity.salt.placeholder')"
                  >
                    <template slot="append">
                      <el-button
                        icon="el-icon-view"
                        size="small"
                        @click="designSection"></el-button>
                    </template>
                  </fox-input>
                </fox-form-item>
              </el-col>
              <el-col
                :span="6">
                <fox-form-item :show-message="false"
                  prop="dynamic">
                  <el-switch
                    v-model="entity.dynamic"
                    :inactive-value="1"
                    :active-value="0"
                    :active-text="$t('theme.section.update.entity.dynamic.label')"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </fox-form-item>
              </el-col>
            </el-row>
            <el-row
              :gutter="20">
              <el-col :span="18">
                <fox-form-item :show-message="false"
                  prop="tagList">
                  <fox-select
                    shrink
                    v-model="entity.tagList"
                    multiple
                    filterable
                    :placeholder="$t('theme.section.update.entity.tag.label')"
                    :description="$t('theme.section.update.entity.tag.placeholder')"
                  >
                    <el-option
                      v-for="item in tagList"
                      :key="item.id"
                      :label="item.tagName"
                      :value="item.id"
                    ></el-option>
                  </fox-select>
                </fox-form-item>
              </el-col>
              <el-col :span="6">
                <fox-form-item :show-message="false"
                  prop="once">
                  <el-switch
                    v-model="entity.once"
                    :inactive-value="1"
                    :active-value="0"
                    active-text="仅添加一次"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </fox-form-item>
              </el-col>
              <el-col :span="18">
                <fox-form-item :show-message="false"
                  prop="tagList">
                  <fox-select
                    shrink
                    multiple
                    v-model="entity.siteTypeList"
                    placeholder="适合网站类型"
                    description="请选择"
                  >
                    <el-option
                      v-for="item in siteTypeList"
                      :key="item.pageType"
                      :label="item.label"
                      :value="item.id"
                    ></el-option>
                  </fox-select>
                </fox-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </fox-section>
      <fox-section
        heading="AMP"
        v-if="false">
        <fox-form-item :show-message="false" prop="ampCss">
          <label class="fox-form-item :show-message="false"__label">{{ $t('theme.section.update.entity.ampCss.label') }}</label>
          <el-button
            type="text"
            class="fox-form-item :show-message="false"__label ml-4"
            @click="loadCSSVariable('ampCss')">PASTE
          </el-button>
          <el-input
            v-model="entity.ampCss"
            :placeholder="$t('theme.section.update.entity.ampCss.placeholder')"
          ></el-input>
        </fox-form-item>
        <fox-form-item :show-message="false"
          prop="ampTemplate"
          :label="$t('theme.section.update.entity.ampTemplate.label')">
          <el-input
            v-model="entity.ampTemplate"
            :placeholder="$t('theme.section.update.entity.ampTemplate.placeholder')"
          ></el-input>
        </fox-form-item>
      </fox-section>
      <fox-section :heading="$t('theme.section.update.entity.baseCss.label')">
        <el-button
          type="text"
          size="mini"
          slot="header"
          @click="loadCSSVariable('baseCss')">PASTE
        </el-button>
        <fox-form-item :show-message="false" prop="baseCss">
          <el-input
            v-model="entity.baseCss"
            type="textarea"
            :rows="6"
            :placeholder="$t('theme.section.update.entity.baseCss.placeholder')"
          ></el-input>
        </fox-form-item>
      </fox-section>
      <fox-section :heading="$t('theme.section.update.entity.variableCss.label')">
        <el-button
          type="text"
          size="mini"
          slot="header"
          @click="loadCSSVariable('variableCss')">PASTE
        </el-button>
        <fox-form-item :show-message="false" prop="variableCss">
          <el-input
            v-model="entity.variableCss"
            type="textarea"
            :rows="6"
            :placeholder="$t('theme.section.update.entity.variableCss.placeholder')"
          ></el-input>
        </fox-form-item>
      </fox-section>
      <fox-section heading="JAVASCRIPT">
        <fox-form-item :show-message="false"
          prop="scriptCode">
          <fox-input
            v-model="entity.scriptCode"
            shrink
            type="textarea"
            :rows="6"
            :placeholder="$t('theme.section.update.entity.scriptCode.label')"
            :description="$t('theme.section.update.entity.scriptCode.placeholder')"
          ></fox-input>
        </fox-form-item>
      </fox-section>
      <fox-section heading="TEMPLATE">
        <fox-form-item :show-message="false"
          prop="artTemplate"
          v-if="false">
          <fox-input
            v-model="entity.artTemplate"
            shrink
            type="textarea"
            :rows="6"
            :placeholder="$t('theme.section.update.entity.artTemplate.label')"
            :description="$t('theme.section.update.entity.artTemplate.placeholder')"
          ></fox-input>
        </fox-form-item>
        <fox-form-item :show-message="false"
          prop="thymeleafTemplate">
          <fox-input
            shrink
            v-model="entity.thymeleafTemplate"
            type="textarea"
            :rows="20"
            :placeholder="$t('theme.section.update.entity.thymeleafTemplate.label')"
            :description="$t('theme.section.update.entity.thymeleafTemplate.placeholder')"
          ></fox-input>
        </fox-form-item>
      </fox-section>
      <fox-section heading="LANGUAGE">
        <fox-form-item :show-message="false"
          prop="language">
          <fox-input
            shrink
            v-model="entity.language"
            type="textarea"
            :rows="6"
            :placeholder="$t('theme.section.update.entity.language.label')"
            :description="$t('theme.section.update.entity.language.placeholder')"
          ></fox-input>
        </fox-form-item>
      </fox-section>
      <fox-section heading="INFO">
        <fox-form-item :show-message="false"
          prop="description">
          <fox-input
            shrink
            v-model="entity.description"
            type="textarea"
            :placeholder="$t('theme.section.update.entity.description.label')"
            :description="$t('theme.section.update.entity.description.placeholder')"
          ></fox-input>
        </fox-form-item>
        <fox-form-item :show-message="false"
          prop="sectionIcon">
          <fox-input
            v-model="entity.sectionIcon"
            type="textarea"
            :rows="6"
            :placeholder="$t('theme.section.update.entity.sectionIcon.label')"
            :description="$t('theme.section.update.entity.sectionIcon.placeholder')"
          ></fox-input>
        </fox-form-item>
      </fox-section>
    </el-form>
    <fox-unsaved
      :unsaved.sync="unsaved"
      :loading="loading"
      @confirmed="formValidation"
    >
    </fox-unsaved>
    <css-variable
      v-model="cssData.value"
      :visible.sync="cssData.visible"
      @change="callCSSVariable"
    ></css-variable>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import * as http from '@/plugins/api/theme'
import cssVariable from '../components/css-variable'

export default {
  name: 'themeSectionUpdate',
  extends: extend,
  components: {
    cssVariable
  },
  data () {
    return {
      entity: {
        ampCss: '',
        ampTemplate: '',
        artTemplate: '',
        baseCss: '',
        language: '{}',
        description: '',
        dynamic: 1,
        state: 0,
        sectionGroup: 3000,
        sectionImage: '/css/img/placeholder.jpg',
        sectionIcon: '/css/img/section.svg',
        sectionName: '',
        sectionType: '',
        thymeleafTemplate: '',
        variableCss: '',
        scriptCode: '',
        siteType: '',
        once: 1,
        siteTypeList: []
      },
      formRules: {
        sectionName: [
          {
            required: true,
            message: this.$t('theme.section.update.entity.sectionName.required'),
            trigger: 'blur'
          }
        ],
        sectionType: [
          {
            required: true,
            message: this.$t('theme.section.update.entity.sectionType.required'),
            trigger: 'blur'
          }
        ]
      },
      sectionGroup: [],
      pageSection: [],
      pageSectionType: '',
      tagList: [],
      globalSection: [],
      globalSectionType: '',
      cssData: {
        visible: false,
        value: '',
        field: ''
      },
      siteTypeList: []
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
    this.siteTypeList = this.$t('enumerate.siteType')
    this.sectionGroup = this.$t('enumerate.sectionGroup')
    this.pageSection = this.$t('pageType')
    this.globalSection = this.$t('globalSection')
    this.getTag()
    if (this.id) {
      this.getDetail()
    } else {
      this.pageValid()
    }
  },
  methods: {
    designSection () {
      this.utility.openSite(`http://www.theme.com/section/${this.entity.sectionType}/${this.entity.salt}`)
    },
    /**
     * 加载CSS变量
     * @param field
     */
    loadCSSVariable (field) {
      this.cssData.value = ''
      this.cssData.field = field
      this.cssData.visible = true
    },
    /**
     * 加载CSS变量
     * @param value
     */
    callCSSVariable (value) {
      this.cssData.visible = false
      this.entity[this.cssData.field] = value
    },
    /**
     * 分页
     */
    getTag () {
      http.fetchThemeSectionTagList()
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.tagList = result.data
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 上一步
     */
    previous () {
      this.$router.push('/main/masterplate/element')
    },
    /**
     * 系统默读类型切换
     */
    sectionTypeChange (value) {
      if (this.utility.isEmpty(value)) {
        return false
      }
      let s = this.pageSection.filter((o) => {
        return o.pageType === value
      })
      if (s.length > 0) {
        this.entity.sectionType = s[0].pageType
        this.entity.sectionName = s[0].title
        this.entity.sectionGroup = 1000
        this.pageSectionType = ''
        this.entity.dynamic = s[0].dynamic
      }
    },
    /**
     * 全局组件
     */
    globalSectionTypeChange (value) {
      if (this.utility.isEmpty(value)) {
        return false
      }
      let s = this.globalSection.filter((o) => {
        return o.sectionType === value
      })
      if (s.length > 0) {
        this.entity.sectionType = s[0].sectionType
        this.entity.sectionName = s[0].title
        this.entity.sectionGroup = 2000
        this.globalSectionType = ''
        this.entity.dynamic = 0
        this.entity.sectionIcon = s[0].icon
      }
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid, fields) => {
        if (valid) {
          this.loading = true
          if (this.utility.isNotEmpty(this.entity.sectionIcon)) {
            this.entity.sectionIcon = this.utility.filterHTML(this.entity.sectionIcon, 'svg', 'width|height|class|fill')
          } else {
            this.entity.sectionIcon = '<svg t="1625628597671" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24602"><path d="M285.866667 392.533333l234.666666 136.533334 226.133334-132.266667L512 264.533333l-226.133333 128z m-29.866667 85.333334V640l213.333333 123.733333v-157.866666l-213.333333-128z m512 4.266666l-213.333333 123.733334v153.6l213.333333-123.733334v-153.6zM512 170.666667l341.333333 196.266666V682.666667l-341.333333 196.266666L170.666667 682.666667V366.933333L512 170.666667z" p-id="24603"></path></svg>'
          }
          this.entity.siteType = this.entity.siteTypeList.join(',')
          if (this.id) {
            this.updateSection()
          } else {
            this.addSection()
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
      http.themeSectionDetail({
        id: this.id
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity = result.data
              this.entity = {
                ...result.data,
                tagList: result.data.tagList.map(({ id }) => id)
              }
              this.entity.siteTypeList.forEach((value, index) => {
                this.entity.siteTypeList[index] = parseInt(value)
              })
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
    addSection () {
      this.entity.sectionSchema = {
        icon: 'fo-ico',
        type: this.entity.sectionType,
        multiple: false,
        removable: true,
        global: false,
        onlyOnce: false,
        duplicate: true,
        name: {
          en: this.entity.sectionName,
          'zh-CN': this.entity.sectionName
        },
        group: [],
        default: {
          sectionAlias: this.entity.sectionName,
          dataset: {}
        }
      }
      let s = this.pageSection.filter((o) => {
        return o.pageType === this.entity.sectionType && o.params !== undefined
      })
      this.entity.language = '{}'
      this.entity.sectionData = {
        sectionAlias: this.entity.sectionName,
        dataset: {}
      }
      if (s.length > 0) {
        this.entity.sectionSchema.group.push(s[0].params)
        s[0].params.elements.forEach((filed) => {
          this.entity.sectionData[filed.field] = filed.default
          this.entity.sectionSchema.default[filed.field] = filed.default
        })
      }
      this.entity = {
        ...this.entity,
        sectionSchema: JSON.stringify(this.entity.sectionSchema),
        sectionData: JSON.stringify(this.entity.sectionData)
      }
      // console.log(this.entity.sectionSchema)
      // console.log(this.entity.sectionData)
      // return false
      http.themeSectionUpdate(this.entity)
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
    updateSection () {
      delete this.entity.sectionSchema
      // delete this.entity.language
      delete this.entity.sectionData
      http.themeSectionUpdate(this.entity)
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
     * SECTION TYPE
     */
    sectionTypeBlur () {
      if (this.utility.isEmpty(this.entity.sectionType)) {
        return false
      }
      let sectionType = this.entity.sectionType
      let s = []
      sectionType.replace(/[^a-zA-Z\d]/g, ' ').trim().replace(/\s+/g, '-').split('-').forEach((value, index) => {
        s.push(index === 0 ? this.utility.firstLowerCase(value) : this.utility.capitalize(value.toLowerCase()))
      })
      this.entity.sectionType = s.join('')
    },
    /**
     * 删除
     */
    deleteSection () {
      this.$confirm(this.$t('base.delete.subheading').toString(), this.$t('base.delete.heading').toString(), {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        closeOnClickModal: false,
        type: 'error',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            http.themeSectionDelete({
              ids: [this.id]
            })
              .then(result => {
                result.options = {
                  action: this.actionType.delete,
                  url: '/main/masterplate/element'
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
