<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
  >
    <fox-header-ops
      :title="$t('enquiry.form.title')"
      :description="id ? $t('enquiry.form.updateForm.editForm') : $t('enquiry.form.updateForm.addForm')"
      divider
    >
      <div class="header-ops-item">
        <el-button
          type="text"
          icon="el-icon-delete"
          v-if="id"
          :loading="loading"
          @click="deleteForm"
        >
        </el-button>
      </div>
    </fox-header-ops>
    <fox-form
      :model="entity"
      :rules="formRules"
      ref="update">
      <fox-section
        :heading="$t('enquiry.form.updateForm.info')"
      >
        <el-form-item
          prop="title">
          <fox-input
            shrink
            maxlength="100"
            show-word-limit
            v-model="entity.title"
            :placeholder="$t('enquiry.form.updateForm.entity.title.label')"
            :description="$t('enquiry.form.updateForm.entity.title.placeholder')"
          ></fox-input>
        </el-form-item>
        <el-form-item
          prop="buttonLabel">
          <fox-input
            shrink
            maxlength="50"
            show-word-limit
            v-model="entity.buttonLabel"
            :placeholder="$t('enquiry.form.updateForm.entity.buttonLabel.label')"
            :description="$t('enquiry.form.updateForm.entity.buttonLabel.placeholder')"
          ></fox-input>
        </el-form-item>
        <el-form-item
          prop="remark">
          <fox-input
            shrink
            type="textarea"
            maxlength="255"
            show-word-limit
            :rows="3"
            v-model="entity.remark"
            :placeholder="$t('enquiry.form.updateForm.entity.remark.label')"
            :description="$t('enquiry.form.updateForm.entity.remark.placeholder')"
          ></fox-input>
        </el-form-item>
      </fox-section>
      <fox-section
        :heading="$t('enquiry.form.updateForm.content')"
        :description="$t('enquiry.form.updateForm.fieldList')"
      >
        <template slot="header">
          <el-popover
            placement="top-end"
            width="600"
            trigger="hover"
          >
            <div class="el-popover__title">
              {{ $t('enquiry.form.updateForm.add.normal') }}
            </div>
            <div class="preset-button">
              <template
                v-for="(o, key) in $t('enquiry.form.updateForm.fieldType')"
              >
                <el-button
                  :key="key"
                  v-if="o.preset"
                  size="mini"
                  @click="addElement(key, true)"
                >
                  {{ o.label }}
                </el-button>
              </template>
            </div>
            <div class="el-popover__title mt-5">
              {{ $t('enquiry.form.updateForm.add.custom') }}
            </div>
            <div class="preset-button">
              <template
                v-for="(o, key) in $t('enquiry.form.updateForm.fieldType')"
              >
                <el-button
                  :key="key"
                  v-if="o.custom"
                  size="small"
                  @click="addElement(key, false)"
                >
                  {{ o.label }}
                </el-button>
              </template>
            </div>
            <el-button
              type="text"
              size="mini"
              icon="el-icon-plus"
              slot="reference">
              {{ $t('enquiry.form.updateForm.add.button') }}
            </el-button>
          </el-popover>
        </template>
        <draggable
          handle=".element-sort"
          :list="entity.fieldList"
        >
          <div
            class="field-list"
            v-for="(o, index) in entity.fieldList"
            :key="index">
            <el-row
              v-if="false"
              :gutter="20">
              <el-col :span="5">
                {{ $t('enquiry.form.updateForm.field.title') }}
              </el-col>
              <el-col :span="14">
                {{ $t('enquiry.form.updateForm.field.placeholder') }}
              </el-col>
              <el-col :span="3">
                {{ $t('enquiry.form.updateForm.field.required') }}
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="isOption(o.fieldType) ? 20 : 5">
                <el-form-item
                  :prop="`fieldList.${index}.fieldLabel`"
                  :rules="formRules.type">
                  <fox-input
                    shrink
                    v-model="o.fieldLabel"
                    maxlength="32"
                    show-word-limit
                    size="small"
                    :placeholder="$t('enquiry.form.updateForm.field.title')"
                  ></fox-input>
                </el-form-item>
              </el-col>
              <el-col
                v-if="!isOption(o.fieldType)"
                :span="14">
                <el-form-item
                  :prop="`fieldList.${index}.placeholder`"
                  :rules="formRules.type">
                  <fox-input
                    shrink
                    show-word-limit
                    :maxlength="o.fieldType === 'textarea' ? 200 : 50"
                    rows="4"
                    size="small"
                    v-model="o.placeholder"
                    :placeholder="$t('enquiry.form.updateForm.field.placeholder')"
                  ></fox-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-switch v-model="o.required"></el-switch>
              </el-col>
              <el-col
                :span="3"
                class="text-right">
                <el-button
                  class="element-sort"
                  style="margin-top: 5px"
                  size="small"
                  icon="el-icon-rank"
                  circle></el-button>
                <el-button
                  style="margin-top: 5px"
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  circle
                  @click="removeElement(index, o)"></el-button>
              </el-col>
            </el-row>
            <el-row
              v-if="isOption(o.fieldType)"
              class="field-list-option no-flex"
              :gutter="20">
              <el-col :span="5">
                <el-row
                  :gutter="20"
                  v-for="(option, optionIndex) in o.options">
                  <el-col
                    :span="24"
                    class="text-right field-option-label">
                    <small>
                      {{ $t('enquiry.form.updateForm.option.item') }} {{ optionIndex + 1 }}
                    </small>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="19">
                <draggable
                  handle=".option-sort"
                  class="field-option-drag"
                  :list="o.options"
                >
                  <el-row
                    :gutter="20"
                    v-for="(option, optionIndex) in o.options"
                    :key="optionIndex">
                    <el-col :span="18">
                      <el-form-item
                        :prop="`fieldList.${index}.options.${optionIndex}.value`"
                        :rules="formRules.type">
                        <fox-input
                          shrink
                          show-word-limit
                          size="small"
                          maxlength="100"
                          v-model="option.value"
                          :placeholder="$t('enquiry.form.updateForm.option.value')"
                        ></fox-input>
                      </el-form-item>
                    </el-col>
                    <el-col
                      :span="1"
                      v-if="o.options.length > 1">
                      <label
                        class="el-radio"
                        :class="option.checked ? 'is-checked' : ''">
                        <label
                          class="el-radio__input"
                          :class="option.checked ? 'is-checked' : ''">
                          <label class="el-radio__inner"></label>
                          <input
                            type="checkbox"
                            class="el-radio__original"
                            :name="`option-${index}`"
                            @click="setChecked(optionIndex, o)"
                            v-model="option.checked">
                        </label>
                      </label>
                    </el-col>
                    <el-col
                      :span="5"
                      v-if="o.options.length > 1">
                      <el-button
                        class="option-sort"
                        size="small"
                        icon="el-icon-rank"
                        circle></el-button>
                      <el-button
                        type="danger"
                        size="small"
                        icon="el-icon-delete"
                        circle
                        @click="removeOption(optionIndex, o)"></el-button>
                    </el-col>
                  </el-row>
                </draggable>
                <el-button
                  class="mt-3"
                  size="small"
                  icon="el-icon-plus"
                  @click="addOption(index, o)">
                  {{ $t('enquiry.form.updateForm.add.option') }}
                </el-button>
              </el-col>
            </el-row>
          </div>
        </draggable>
      </fox-section>
    </fox-form>
    <fox-unsaved
      :unsaved.sync="unsaved"
      :loading="loading"
      @confirmed="formValidation"
    >
    </fox-unsaved>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import Draggable from 'vuedraggable'
import { fetchEnquiryFormDelete, fetchEnquiryFormDetail, fetchEnquiryFormUpdate } from '@/plugins/api/enquiry'

export default {
  name: 'enquiryFormUpdate',
  extends: extend,
  components: {
    Draggable
  },
  data () {
    return {
      entity: {
        remark: '',
        title: '',
        displayLabel: '',
        buttonLabel: 'Submit',
        fieldList: [],
        siteId: ''
      },
      formRules: {
        type: [
          {
            required: true,
            message: ''
          }
        ],
        title: [
          {
            required: true,
            message: this.$t('enquiry.form.updateForm.entity.title.required'),
            trigger: 'blur'
          }
        ],
        buttonLabel: [
          {
            required: true,
            message: this.$t('enquiry.form.updateForm.entity.buttonLabel.required'),
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
      this.pageValid()
    }
  },
  methods: {
    isOption (value) {
      return 'select|checkbox|radio'.indexOf(value) !== -1
    },
    /**
     * 上一步
     */
    previous () {
      this.redirectURL(`/site/${this.siteId}/enquiry/form`)
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.formValidate(formName, (valid) => {
        if (valid) {
          let isEmailOrPhone = false
          this.entity.fieldList.forEach((o) => {
            if ((o.fieldType === 'email' || o.fieldType === 'tel' || o.fieldType === 'countryRegion') && o.required) {
              isEmailOrPhone = true
            }
          })
          if (!isEmailOrPhone) {
            this.$message({
              type: 'error',
              message: this.$t('enquiry.form.updateForm.fieldList').toString()
            })
          } else {
            if (!this.id) {
              this.entity.siteId = this.siteId
            }
            if (this.utility.isEmpty(this.entity.region)) {
              this.entity.region = this.regionCode
            }
            this.updateForm()
          }
        }
      })
    },
    /**
     * 获取详情
     */
    getDetail () {
      fetchEnquiryFormDetail({ id: this.id })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity = result.data
              this.entity.fieldList.forEach((o) => {
                o.options = JSON.parse(o.options || '[]')
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
     * 更新数据
     */
    updateForm () {
      let fieldList = []
      this.entity.fieldList.forEach((item) => {
        fieldList.push({
          ...item,
          options: JSON.stringify(item.options)
        })
      })
      this.loading = true
      fetchEnquiryFormUpdate({
        ...this.entity,
        fieldList: fieldList
      })
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
    /**
     * 删除
     */
    deleteForm () {
      this.$confirm(this.$t('base.delete.subheading').toString(), this.$t('base.delete.heading').toString(), {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        closeOnClickModal: false,
        type: 'error',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            fetchEnquiryFormDelete({
              ids: [this.id]
            })
              .then(result => {
                result.options = {
                  action: this.actionType.delete,
                  url: `/site/${this.siteId}/enquiry/form`
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
     * 添加一个元素
     * @param filedType 类型
     * @param preset 是否为预设
     */
    addElement (filedType, preset) {
      let schema = this.$t('enquiry.form.updateForm.fieldType')[filedType]
      if (!schema) {
        return false
      }
      // 判断限制数量字段是否已添加过
      if (schema.quantity > 0) {
        let rows = this.entity.fieldList.filter((o) => {
          return o.fieldType === filedType
        })

        if (rows.length > 0) {
          return false
        }
      }
      let options = []
      if (filedType === 'select' || filedType === 'radio' || filedType === 'checkbox') {
        options.push({
          label: '',
          value: '',
          checked: true
        })
      }
      if (filedType === 'tel' || filedType === 'countryRegion') {
        let rows = this.entity.fieldList.filter((o) => {
          return o.fieldType === 'tel' || o.fieldType === 'countryRegion'
        })
        if (rows.length > 0) {
          return false
        }
      }
      this.entity.fieldList.push({
        displayLabel: schema.label,
        defaultValue: '',
        fieldLabel: preset ? schema.fieldLabel === 'countryRegion' ? 'Phone' : schema.fieldLabel : '',
        fieldName: filedType,
        fieldType: schema.filedType,
        placeholder: preset ? schema.placeholder : '',
        required: schema.required,
        options: options
      })
    },
    /**
     *
     * @param index
     * @param row
     */
    removeElement (index, row) {
      this.entity.fieldList.splice(index, 1)
    },
    /**
     * 移除选项
     * @param index
     * @param row
     */
    removeOption (index, row) {
      row.options.splice(index, 1)
    },
    /**
     * 添加选项
     * @param index
     */
    addOption (index) {
      this.entity.fieldList[index].options.push({
        label: '',
        value: '',
        checked: false
      })
    },
    setChecked (index, row) {
      if (row.fieldType !== 'checkbox') {
        row.options.forEach((o, rowIndex) => {
          o.checked = index === rowIndex
        })
      }
    }
  }
}
</script>
<style lang="scss">
.field-list {
  .el-form-item {
    margin-bottom: 0;
  }

  .el-row {
    &:not(.no-flex) {
      display: flex;
      align-items: center;
    }

    .el-col {
      .element-sort {
        cursor: move;
      }
    }
  }

  .field-list-option {
    padding-top: 0.5rem;
    padding-bottom: 1rem;

    .field-option-label {
      line-height: 40px
    }
  }

  .el-form-item__error {
    display: none !important;
  }
}

.preset-button {
  .el-button {
    &:first-child,
    & + .el-button {
      margin: 0 6px 6px 0;
    }
  }
}
</style>
