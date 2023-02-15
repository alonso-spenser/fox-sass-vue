<template>
  <main>
    <fox-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
    >
      <fox-page-header
        :previous="true"
      ></fox-page-header>
      <fox-page-section>
        <el-button @click="loadSchemeEditor('globalColorsSchema', 'globalColorsData')">
          {{ $t('theme.schema.globalColorsSchema') }}
        </el-button>
        <el-button @click="loadSchemeEditor('globalTypographySchema', 'globalTypographyData')">
          {{ $t('theme.schema.globalTypographySchema') }}
        </el-button>
        <el-button @click="loadSchemeEditor('globalSocialSchema', 'globalSocialData')">
          {{ $t('theme.schema.globalSocialSchema') }}
        </el-button>
        <el-button @click="loadSchemeEditor('globalGeneralSchema', 'globalGeneralData')">
          {{ $t('theme.schema.globalGeneralSchema') }}
        </el-button>
        <el-button @click="loadSchemeEditor('globalFaviconSchema', 'globalFaviconData')">
          {{ $t('theme.schema.globalFaviconSchema') }}
        </el-button>
        <el-button @click="langData.visible = true">
          系统语言
        </el-button>
      </fox-page-section>
      <el-form
        :model="entity"
        :rules="formRules"
        ref="update"
        label-width="100px"
        label-position="top"
      >
        <fox-page-section>
          <el-form-item
            prop="pageLayout"
            :label="$t('theme.schema.pageLayout.label')">
            <el-input
              type="textarea"
              :rows="30"
              v-model="entity.pageLayout"
              :placeholder="$t('theme.schema.pageLayout.placeholder')"
            ></el-input>
          </el-form-item>
        </fox-page-section>
        <fox-page-section>
          <el-form-item prop="globalCss">
            <label class="el-form-item__label">{{ $t('theme.schema.globalCss.label') }}</label>
            <el-button
              type="text"
              class="el-form-item__label ml-4"
              @click="loadCSSVariable('globalCss')">PASTE
            </el-button>
            <el-input
              type="textarea"
              :rows="20"
              v-model="entity.globalCss"
              :placeholder="$t('theme.schema.globalCss.placeholder')"
            ></el-input>
          </el-form-item>
        </fox-page-section>
      </el-form>
      <fox-unsaved
        :unsaved.sync="unsaved"
        @confirmed="formValidation"
      >
      </fox-unsaved>
      <schema-editor
        :visible.sync="schemaData.visible"
        :dataset="schemaData.entity"
        @close="schemaUpdate"
      ></schema-editor>
      <css-variable
        v-model="cssData.value"
        :visible.sync="cssData.visible"
        @change="callCSSVariable"
      ></css-variable>
      <global-language
        :visible.sync="langData.visible"
        @translate="getDetail"
        :schema-id="entity.id"
        v-model="langData.data"></global-language>
    </fox-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import * as http from '@/plugins/api/theme'
import schemaEditor from '../components/schema-editor'
import cssVariable from '../components/css-variable'
import globalLanguage from './components/global-lang'

export default {
  name: 'themeSchemaUpdate',
  extends: extend,
  components: {
    schemaEditor,
    cssVariable,
    globalLanguage
  },
  data () {
    return {
      cssData: {
        visible: false,
        value: '',
        field: ''
      },
      langData: {
        visible: false,
        data: {}
      },
      entity: {
        globalColorsData: '',
        globalColorsSchema: '',
        globalFaviconData: '',
        globalFaviconSchema: '',
        globalGeneralData: '',
        globalGeneralSchema: '',
        globalSocialData: '',
        globalSocialSchema: '',
        globalTypographyData: '',
        globalTypographySchema: '',
        globalLanguage: '',
        pageLayout: '',
        globalCss: ''
      },
      /**
       * SCHEMA
       */
      schemaData: {
        visible: false,
        schemaFiled: '',
        dataField: '',
        entity: {
          sectionSchema: {},
          sectionData: {}
        }
      },
      formRules: {
        pageLayout: [
          {
            required: true,
            message: this.$t('theme.schema.pageLayout.required'),
            trigger: 'blur'
          }
        ],
        globalCss: [
          {
            required: true,
            message: this.$t('theme.schema.globalCss.required'),
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
     * 更新
     */
    schemaUpdate (data) {
      if (data === null) {
        return false
      }
      let entity = {
        id: this.entity.id
      }
      entity[this.schemaData.schemaFiled] = data.sectionSchema
      entity[this.schemaData.dataField] = data.sectionData
      http.themeSchemaUpdate(entity)
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
      //   console.log(this.schemaData.dataField, this.schemaData.schemaFiled)
    },
    /**
     * 上一步
     */
    previous () {
      this.$router.push('/main/masterplate/schema')
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid, fields) => {
        if (valid) {
          this.loading = true
          this.updateSchema()
        } else {
          this.unverified(fields)
        }
      })
    },
    /**
     * 获取详情
     */
    getDetail () {
      http.themeSchemaDetail()
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity = result.data
              try {
                this.langData.data = JSON.parse(this.entity.globalLanguage)
              } catch (e) {
                this.langData.data = {}
                console.log(e)
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
     * 更新数据
     */
    updateSchema () {
      http.themeSchemaUpdate({
        id: this.entity.id,
        pageLayout: this.entity.pageLayout,
        globalCss: this.entity.globalCss
      })
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
     * 加载schema编辑器
     */
    loadSchemeEditor (schemaFiled, dataField) {
      this.schemaData.entity.sectionData = JSON.parse(this.entity[dataField])
      this.schemaData.entity.sectionSchema = JSON.parse(this.entity[schemaFiled])
      this.schemaData.schemaFiled = schemaFiled
      this.schemaData.dataField = dataField
      this.schemaData.visible = true
    }
  }
}
</script>
