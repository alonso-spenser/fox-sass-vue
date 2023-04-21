<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    :percentage="100"
    google-style
  >
    <fox-section
      heading="网站数据复制"
      content="数据复制只限于同一个商户的两个不同网站之间进行，不可以跨商户复制。复制数据为：文章 & 文章集合 | 产品 & 产品集合 | 装修资源"
      class="mt-5"
    >
      <el-form
        :model="cloneModel"
        :rules="formRules"
        ref="cloneForm"
        label-width="100px"
        label-position="top"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              prop="original"
              label="原网站ID">
              <el-input
                v-model="cloneModel.original"
                placeholder="请输入原网站ID"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="target"
              label="新网站ID">
              <el-input
                v-model="cloneModel.target"
                placeholder="请输入新网站ID"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="4"
            class="mt-5"
            v-if="false">
            <el-form-item
              prop="article"
              label="文章">
              <el-switch
                v-model="cloneModel.article"
                active-color="#13ce66"
                :active-value="1"
                inactive-color="#ff4949"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col
            :span="4"
            class="mt-5"
            v-if="false">
            <el-form-item
              prop="product"
              label="产品">
              <el-switch
                v-model="cloneModel.product"
                active-color="#13ce66"
                :active-value="1"
                inactive-color="#ff4949"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col
            :span="4"
            class="mt-5"
            v-if="false">
            <el-form-item
              prop="inquiry"
              label="询盘">
              <el-switch
                v-model="cloneModel.inquiry"
                active-color="#13ce66"
                :active-value="1"
                inactive-color="#ff4949"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <p class="mt-6">
          <el-switch
            inactive-text="文章"
            class="mr-5"
            v-model="cloneModel.article">
          </el-switch>
          <el-switch
            inactive-text="产品"
            class="mr-5"
            v-model="cloneModel.product">
          </el-switch>
          <el-switch
            inactive-text="询盘"
            v-model="cloneModel.inquiry">
          </el-switch>
        </p>
        <p class="mt-6">
          <el-button
            type="danger"
            @click="cloneValidation">复制数据
          </el-button>
        </p>
      </el-form>
    </fox-section>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import {
  fetchCloneSiteData
} from '@/plugins/api/main/site'

export default {
  name: 'MerchantEmployeeUpdate',
  extends: extend,
  data () {
    return {
      formRules: {
        account: [
          {
            required: true,
            message: '请输入帐号',
            trigger: 'blur'
          }
        ],
        agentId: [
          {
            required: true,
            message: '请选择代理商',
            trigger: 'blur'
          }
        ],
        original: [
          {
            required: true,
            message: '原网站ID必填',
            trigger: 'blur'
          }
        ],
        target: [
          {
            required: true,
            message: '新网站ID',
            trigger: 'blur'
          }
        ]
      },
      cloneModel: {
        original: '1209760082859032577',
        target: '1526473858977128450',
        article: true,
        product: true,
        inquiry: false
      }
    }
  },
  watch: {
    cloneModel: {
      deep: true,
      handler () {
        this.unsaved = true
      }
    }
  },
  created () {
    this.pageValid()
  },
  methods: {
    /**
     * 复制数据
     */
    cloneValidation () {
      let formName = 'cloneForm'
      this.$refs[formName].validate((valid, fields) => {
        if (valid) {
          this.loading = true
          this.cloneSiteData()
        } else {
          this.unverified(fields)
        }
      })
    },
    /**
     * 复制数据
     */
    cloneSiteData () {
      fetchCloneSiteData(this.cloneModel)
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.$message({
                type: 'success',
                message: '网站数据复制任务已开始，预计5分钟左右执行完毕，请用稍后查询数据。'
              })
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
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
