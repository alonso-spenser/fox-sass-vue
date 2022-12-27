<template>
  <div class="schema-editor" v-if="visible">
    <div class="schema-editor-toolbar">
      <h3>
        语言编辑
      </h3>
      <hr>
      <el-form
        :model="entity"
        :rules="fieldRules"
        ref="fieldForm"
        label-width="100px"
        label-position="top"
      >
        <el-form-item prop="fieldName" label="字段名称">
          <el-input
            v-model="entity.fieldName"
            placeholder="请输入字段名称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="fieldValue" label="默认值">
          <el-input
            v-model="entity.fieldValue"
            placeholder="请输入默认值"
          ></el-input>
        </el-form-item>
        <el-button class="w-100 mt-5" round plain type="primary" size="small" @click="fieldValidation()">添加字段</el-button>
      </el-form>

      <div class="schema-editor-save text-center">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-button class="w-100" round size="small" @click="formValidation(false)">{{ $t("base.operate.cancel") }}</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="w-100" round type="primary" size="small" @click="formValidation(true)">{{ $t("base.operate.save") }}</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="schema-editor-section">
      <a
        class="anchor-item el-icon-right"
        v-for="(o, index) in dataset"
        :key="`anchor${index}`"
        :href="`#anchor${index}`"
      >
        {{o.lang}}
      </a>
    </div>
    <div class="schema-editor-content">
      <el-form :model="dataset" :rules="formRules" ref="schemaItems" label-position="top">
        <div
          v-for="(o, langCode) in dataset"
          :key="`group${langCode}`"
          :id="`anchor${langCode}`"
          class="schema-group"
        >
          <h4 style="clear:both;overflow:hidden">
            <el-button type="text" class="float-right p-0 mr-6" size="small" @click="translatePreset(langCode)" icon="el-icon-refresh"></el-button>
            {{o.lang}}
          </h4>
          <el-card
            shadow="hover"
            class="filed-list"
          >
            <el-row :gutter="10">
              <el-col :span="6" v-for="(value, key) in dataset[langCode]" :key="`filed${langCode}${key}`"  v-if="key !== 'lang'">
                <el-form-item label="中文分组名" :prop="`${langCode}.${key}`" :rules="formRules.type">
                  <el-input
                    size="small"
                    v-model="dataset[langCode][key]"
                    placeholder="eg: 全局设置"
                  >
                    <template slot="prepend">
                      {{ key }}
                    </template>
                    <el-button
                      slot="append"
                      icon="el-icon-delete"
                      @click="removeField(key)"
                    ></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import copyToClipboard from 'copy-to-clipboard'
import defaultSettings from '../../components/js/default'
import '@/assets/schema.scss'
import * as http from '@/plugins/api/theme'
import { fetchTranslatePreset } from '@/plugins/api/theme'

export default {
  name: 'schemaEditor',
  extends: extend,
  data () {
    /**
     * 字段校验
     * @param rule
     * @param value
     * @param callback
     */
    let validateKey = (rule, value, callback) => {
      let s = []
      this.entity.sectionSchema.group.forEach((o) => {
        o.elements.forEach((b) => {
          if (b.field === value) {
            s.push(value)
          }
        })
      })
      if (s.length === 1) {
        callback()
      } else {
        callback(new Error('字段名重复'))
      }
    }
    /**
     * 列表字段
     * @param rule
     * @param value
     * @param callback
     */
    let validateTag = (rule, value, callback) => {
      let s = []
      this.entity.sectionSchema.group.forEach((o) => {
        o.elements.forEach((b) => {
          if (b.field === value) {
            s.push(value)
          }
        })
      })
      if (s.length === 0) {
        callback()
      } else {
        callback(new Error('字段名重复'))
      }
    }
    /**
     * 列表字段
     * @param rule
     * @param value
     * @param callback
     */
    let validateField = (rule, value, callback) => {
      let s = this.dataset.en
      if (!s) {
        callback()
      } else if (s.hasOwnProperty(this.entity.fieldName)) {
        callback(new Error('字段名重复'))
      } else {
        callback()
      }
    }
    return {
      formRules: {
        type: [
          {
            required: true,
            message: '必填'
          }
        ],
        english: [
          {
            required: true,
            message: '必填'
          },
          {
            pattern: this.utility.expression.EngAndNum,
            message: ''
          }
        ],
        number: [
          {
            required: true,
            message: '必填'
          },
          {
            pattern: /^[1-9]\d*$/,
            message: '正整数'
          }
        ],
        uniqueKey: [
          {
            pattern: this.utility.expression.EngAndNum,
            message: '字段名为英文'
          },
          {
            required: true,
            message: '必填'
          },
          {
            validator: validateKey,
            trigger: 'blur'
          }
        ],
        uniqueTag: [
          {
            pattern: this.utility.expression.EngAndNum,
            message: '字段名为英文'
          },
          {
            required: true,
            message: '必填'
          },
          {
            validator: validateTag,
            trigger: 'blur'
          }
        ]
      },
      fieldRules: {
        fieldValue: [
          {
            required: true,
            message: '必填'
          }
        ],
        fieldName: [
          {
            required: true,
            message: '必填'
          },
          {
            pattern: this.utility.expression.English,
            message: '字段名为英文'
          },
          {
            validator: validateField,
            trigger: 'blur'
          }
        ]
      },
      languages: {},
      dataset: {},
      entity: {
        fieldName: '',
        fieldValue: ''
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    schemaId: {
      type: String,
      default: () => {
        return ''
      }
    },
    value: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    visible (value) {
      if (value) {
        this.dataset = this.value
      }
    }
  },
  created () {
    this.dataset = this.value
    this.languages = defaultSettings.regionCode
  },
  methods: {
    /**
     * 添加字段
     */
    fieldValidation () {
      this.$refs.fieldForm.validate((valid, fields) => {
        if (valid) {
          this.addField()
        }
      })
    },
    getField (value) {
      let m = []
      value.replace(/[^a-zA-Z\d]/g, ' ').trim().replace(/\s+/g, '-').split('-').forEach((s, index) => {
        m.push(index === 0 ? s.toLowerCase() : this.utility.capitalize(s))
      })
      return m.join('')
    },
    /**
     * 添加字段
     */
    addField () {
      this.entity.fieldName = this.getField(this.entity.fieldName)
      for (let key in this.dataset) {
        this.dataset[key][this.entity.fieldName] = this.entity.fieldValue
      }
      this.dataset = JSON.parse(JSON.stringify(this.dataset))
      this.entity.fieldName = ''
      this.entity.fieldValue = ''
    },
    /**
     * 删除字段
     * @param field
     */
    removeField (field) {
      this.$confirm(this.$t('base.delete.subheading').toString(),
        this.$t('base.delete.heading').toString(), {
          confirmButtonText: this.$t('base.operate.confirm'),
          cancelButtonText: this.$t('base.operate.cancel'),
          closeOnClickModal: false,
          type: 'error',
          beforeClose: (action, instance, done) => {
            for (let key in this.dataset) {
              delete this.dataset[key][field]
            }
            this.dataset = JSON.parse(JSON.stringify(this.dataset))
            done()
          }
        })
    },
    /**
     * 保存
     * @param save 是否保存
     */
    formValidation (save) {
      if (!save) {
        this.$emit('close', null)
        this.$emit('update:visible', false)
      } else {
        this.updateSection()
      }
    },
    /**
     * 更新数据
     */
    updateSection () {
      http.themeSchemaUpdate({
        id: this.schemaId,
        globalLanguage: JSON.stringify(this.dataset)
      })
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.$emit('update:visible', false)
              copyToClipboard(JSON.stringify(this.dataset))
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 翻译预设
     */
    translatePreset (code) {
      fetchTranslatePreset({
        content: code
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.$message({
                type: 'success',
                message: '翻译成交成功'
              })
              this.dataset[code] = result.data
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    }
  }
}
</script>

<style lang="scss">
.filed-list {
  .el-input-group__append,
  .el-input-group__prepend {
    padding: 0 8px;
  }
}
</style>
