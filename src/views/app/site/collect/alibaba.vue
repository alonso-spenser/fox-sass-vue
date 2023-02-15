<template>
  <main>
    <fox-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
    >
      <div class="fox-page-header previous">
        <div class="fox-page-header-back">
          <p class="el-icon-arrow-left go-back">所有产品</p>
          <h3>阿里国际站产品</h3>
        </div>
        <div class="fox-page-header-item"></div>
      </div>
      <div class="fox-fixed-action">
        <div class="fox-fixed-action-label">
          采集使用异步方式执行，不会直接返回结果。
        </div>
        <div class="fox-fixed-action-button">
          <el-button
            type="danger"
            size="small"
            @click="formValidation(false)"
            :disabled="loading">提交
          </el-button>
        </div>
      </div>
      <el-form
        :model="entity"
        :rules="formRules"
        ref="update"
        label-width="100px"
        label-position="top"
      >
        <fox-page-section
          content="基础数据"
        >
          <el-form-item
            prop="goodsIdList"
            :label="$t('collect.alibaba.ids.label')">
            <el-input
              type="textarea"
              :rows="10"
              v-model="entity.goodsId"
              :placeholder="$t('collect.alibaba.ids.placeholder')"
            >
            </el-input>
          </el-form-item>
        </fox-page-section>
        `
        <collection-select
          :inlay="true"
          :info-type.sync="infoType"
          v-model="entity.collectionList"
        ></collection-select>
      </el-form>
    </fox-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import collectionSelect from '@/components/article/collection-select'

import {
  fetchCollectOnebound
} from '@/plugins/api/collect'
import {
  mapState
} from 'vuex'

export default {
  name: 'collectSpider',
  extends: extend,
  components: {
    collectionSelect
  },
  data () {
    return {
      entity: {
        siteId: '',
        region: '',
        goodsId: '',
        goodsIdList: [],
        collectionList: []
      },
      formRules: {
        goodsId: [
          {
            required: true,
            message: this.$t('collect.alibaba.ids.required'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(['siteModel']),
    infoType () {
      return 2
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
  },
  methods: {
    collectTypeChange () {
      this.entity.collectionList = []
    },
    /**
     * 上一步
     */
    previous () {
      this.$router.push('/collect/rule')
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      if (this.entity.collectionList.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择集合'
        })
        return false
      }
      this.$refs[formName].validate((valid, fields) => {
        if (valid) {
          this.entity.goodsIdList = this.entity.goodsId.split(',')
          fetchCollectOnebound({
            ...this.entity,
            siteId: this.siteModel.id,
            region: this.regionCode
          })
            .then(result => {
              this.resultMessage(result, (success) => {
                if (success) {
                  this.unsaved = false
                  this.entity.goodsId = ''
                  this.entity.collectionList = []
                  this.entity.goodsIdList = []
                  this.$message({
                    type: 'success',
                    message: '采集任务已提交，系统会静默执行，请不要重提交，过段时间刷新地应列表查看'
                  })
                }
              })
            })
            .catch(error => {
              this.unsaved = false
              this.networkMistake(error)
            })
        } else {
          this.unverified(fields)
        }
      })
    }
  }
}
</script>
