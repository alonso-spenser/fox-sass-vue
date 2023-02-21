<template>
  <main>
    <fox-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
      :fullScreen="true"
    >
      <fox-page-header></fox-page-header>
      <fox-section>
        <el-form
          :model="entity"
          :rules="formRules"
          ref="update"
          label-position="top"
        >
          <el-form-item
            prop="masterId"
            :label="$t('core.dict.dicType.label')">
            <el-select
              class="block w-100"
              v-model="entity.dicType"
              filterable>
              <el-option
                v-for="item in dictType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <draggable
            handle=".el-move"
            :list="entity.dictList">
            <el-row :gutter="10">
              <el-col :span="7">
                <small class="text-secondary">
                  {{ $t('core.dict.title.label') }}
                </small>
              </el-col>
              <el-col :span="3">
                <small class="text-secondary">
                  {{ $t('core.dict.sort.label') }}
                </small>
              </el-col>
              <el-col :span="11">
                <small class="text-secondary">
                  {{ $t('core.dict.remark.label') }}
                </small>
              </el-col>
            </el-row>
            <el-row
              v-for="(o, index) in entity.dictList"
              :key="`spec-${index}`"
              :class="index === 0 ? 'mt-2' : 'mt-5'"
              :gutter="10"
            >
              <el-col :span="7">
                <el-form-item
                  :prop="`dictList.${index}.title`"
                  :rules="formRules.title">
                  <el-input
                    :placeholder="$t('core.dict.title.placeholder')"
                    :maxlength="100"
                    show-word-limit
                    v-model="o.title"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item
                  :prop="`dictList.${index}.sort`"
                  :rules="formRules.sort"
                >
                  <el-input
                    :maxlength="2"
                    :placeholder="$t('core.dict.sort.placeholder')"
                    v-model="o.sort"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item :prop="`dictList.${index}.remark`">
                  <el-input
                    :placeholder="$t('core.dict.remark.placeholder')"
                    :maxlength="100"
                    show-word-limit
                    v-model="o.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col
                class="text-right"
                :span="3"
                v-show="entity.dictList.length > 1"
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
            v-if="entity.dictList.length < 5"
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
      </fox-section>
      <!--保存按钮-->
      <fox-unsaved
        :unsaved.sync="unsaved"
        :loading="loading"
        @confirmed="formValidation"
      >
      </fox-unsaved>
    </fox-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import Draggable from 'vuedraggable'
import { fetchAgentDictBatchAdd } from '@/plugins/api/core'

export default {
  name: 'enquiryEmail',
  extends: extend,
  components: {
    Draggable
  },
  data () {
    return {
      entity: {
        dicType: 'merchant_industry',
        dictList: [
          {
            dicValue: '',
            remark: '',
            sort: 1,
            title: ''
          }
        ]
      },
      formRules: {
        title: [
          {
            required: true,
            message: ' ',
            trigger: 'blur'
          }
        ],
        sort: [
          {
            required: true,
            message: ' ',
            trigger: 'blur'
          }
        ]
      },
      dictType: []
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
    this.pageValid()
    this.dictType = this.$t('core.dictType')
    let alias = this.$route.params.alias || 'contact'
    let s = this.dictType.filter((o) => {
      return o.alias === alias
    })
    this.entity.dicType = s.length > 0 ? s[0].value : 'contact_way'
  },
  methods: {
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addDict()
        } else {
          this.$message({
            type: 'error',
            message: this.$t('base.formValidation.inadequate')
          })
        }
      })
    },
    /**
     * 更新数据
     */
    addDict () {
      this.loading = true
      fetchAgentDictBatchAdd(this.entity)
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.redirectToPage()
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
      this.entity.dictList.push({
        dicValue: '',
        remark: '',
        sort: this.entity.dictList.length + 1,
        title: ''
      })
    },
    /**
     * 跳转
     */
    redirectToPage () {
      let s = this.dictType.filter((o) => {
        return o.value === this.entity.dicType
      })
      if (s.length > 0) {
        this.$router.push(s[0].url)
      }
    },
    /**
     * 删除一项
     * @param index
     */
    removeItem (index) {
      this.entity.dictList.splice(index, 1)
    }
  }
}
</script>
