<template>
  <main>
    <fo-page-header
      :previous="true"
    ></fo-page-header>
    <fo-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
      :fullScreen="true"
    >
      <fo-page-section
        :content="$t('enquiry.email.desc')"
      >
        <el-form
          :model="entity"
          :rules="formRules"
          ref="update"
          label-position="top"
        >
          <draggable
            handle=".el-move"
            :list="entity.data">
            <el-row :gutter="10">
              <el-col :span="10">
                <small class="text-secondary">
                  {{ $t('enquiry.email.update.email.label') }}
                </small>
              </el-col>
              <el-col :span="10">
                <small class="text-secondary">
                  {{ $t('enquiry.email.update.userName.label') }}
                </small>
              </el-col>
            </el-row>
            <el-row
              v-for="(o, index) in entity.data"
              :key="`spec-${index}`"
              :class="index === 0 ? 'mt-2' : 'mt-5'"
              :gutter="10"
            >
              <el-col :span="10">
                <el-form-item
                  :prop="`data.${index}.email`"
                  :rules="formRules.email"
                >
                  <el-input
                    :placeholder="$t('enquiry.email.update.email.placeholder')"
                    v-model="o.email"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  :prop="`data.${index}.name`"
                  :rules="formRules.userName"
                >
                  <el-input
                    :maxlength="255"
                    show-word-limit
                    :placeholder="$t('enquiry.email.update.userName.placeholder')"
                    v-model="o.name"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col
                class="text-right"
                :span="4"
                v-show="entity.data.length > 1"
              >
                <el-button
                  class="el-move"
                  icon="el-icon-rank"
                  circle
                  size="small"
                ></el-button>
                <el-button
                  class="no-border"
                  icon="el-icon-delete"
                  circle
                  size="small"
                  @click="removeItem(index)"
                ></el-button>
              </el-col>
            </el-row>
          </draggable>
          <p
            v-if="entity.data.length < 5"
            class="mt-7 text-right"
          >
            <el-button
              size="small"
              @click="addItem()"
            >
              {{ $t("base.operate.add") }}
            </el-button>
          </p>
        </el-form>
      </fo-page-section>
      <!--保存按钮-->
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
import Draggable from 'vuedraggable'
import { fetchEnquiryEmailList, fetchEnquiryReceiverUpdate } from '@/plugins/api/enquiry'

export default {
  name: 'enquiryEmail',
  extends: extend,
  components: {
    Draggable
  },
  data () {
    /**
     * 邮箱是否存在
     * @param rule
     * @param value
     * @param callback
     */
    let validateEmail = (rule, value, callback) => {
      let m = this.entity.data.filter((o) => {
        return o.email === value
      })
      if (m.length > 1) {
        callback(new Error(this.$t('enquiry.email.entity.exists')))
      } else {
        callback()
      }
    }
    return {
      entity: {
        data: [
          {
            email: '',
            name: ''
          }
        ]
      },
      formRules: {
        email: [
          {
            required: true,
            message: this.$t('enquiry.email.update.email.required'),
            trigger: 'blur'
          },
          {
            type: 'email',
            message: this.$t('enquiry.email.update.email.formatError'),
            trigger: 'blur'
          },
          {
            validator: validateEmail,
            trigger: 'blur'
          }
        ],
        userName: [
          {
            required: true,
            message: this.$t('enquiry.email.update.userName.required'),
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
    // this.pageValid()
    this.getData()
  },
  methods: {
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateReceiver()
        } else {
          this.$message({
            type: 'error',
            message: this.$t('base.formValidation.inadequate')
          })
        }
      })
    },
    /**
     * 分页
     */
    getData () {
      fetchEnquiryEmailList({
        siteId: this.siteId
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity.data = result.data
              if (result.data.length === 0) {
                this.addItem()
              }
              this.$nextTick(() => {
                this.unsaved = false
              })
            }
          })
        })
        .catch(error => {
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    /**
     * 更新数据
     */
    updateReceiver () {
      this.loading = true
      fetchEnquiryReceiverUpdate({
        emailList: this.entity.data,
        siteId: this.siteId
      })
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 添加一项
     */
    addItem () {
      this.entity.data.push({
        email: '',
        name: ''
      })
    },
    /**
     * 删除一项
     * @param index
     */
    removeItem (index) {
      this.entity.data.splice(index, 1)
    }
  }
}
</script>
