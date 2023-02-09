<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="closeDialog"
  >
    <h3>{{ $t('site.dashboard.language.heading') }}</h3>
    <p style="font-size: 14px">{{ $t('site.dashboard.language.tips') }}</p>
    <div style="margin-top: 16px;padding-bottom: 16px">
      <el-checkbox-group
        class="lang-group"
        v-model="langList"
        size="small"
        :max="siteInfo.surplusLang"
        @change="langChange">
        <template v-for="o in dataset">
          <el-checkbox
            :label="o.id"
            border
            :key="o.id"
            :value="o.id"
            :title="o.languageName"
            v-if="hasOwned(o.code)">
            {{ o.nativeName }}
          </el-checkbox>
        </template>
      </el-checkbox-group>
    </div>
    <div
      slot="footer"
      class="dialog-footer">
      <el-button
        size="small"
        @click="closeDialog">
        {{ $t('base.operate.cancel') }}
      </el-button>
      <el-button
        size="small"
        :loading="loading"
        type="primary"
        @click="cloneOrTranslate(false)"
        :disabled="langList.length === 0">
        {{ $t('site.dashboard.language.clone') }}
      </el-button>
      <el-button
        size="small"
        :loading="loading"
        type="danger"
        @click="cloneOrTranslate(true)"
        :disabled="langList.length === 0">
        {{ $t('site.dashboard.language.translate') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/paging'
import { fetchTranslateSite } from '@/plugins/api/site'
import { fetchBaseLanguage } from '@/plugins/api/core'
import { mapState } from 'vuex'

export default {
  name: 'languageDialog',
  extends: extend,
  data () {
    return {
      langList: [],
      dataset: []
    }
  },
  computed: {
    ...mapState(['siteModel'])
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    siteInfo: {
      type: Object,
      default: () => {
        return {
          languageList: [],
          keepLang: 0,
          articleQuantity: 0,
          goodsQuantity: 0,
          formQuantity: 0,
          surplusLang: 0
        }
      }
    }
  },
  watch: {
    dialogVisible (val) {
      if (val) {
        this.langList = []
        this.getData()
      } else {
        this.pagingOptions.recordCount = 0
        this.pagingOptions.dataset = []
        this.tableOptions.loading = true
      }
    }
  },
  methods: {
    hasOwned (code) {
      return this.siteInfo.languageList.filter((o) => {
        return o.code === code
      }).length === 0
    },
    getData () {
      this.tableOptions.loading = true
      fetchBaseLanguage()
        .then((result) => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.dataset = result.data
            }
          })
        }).catch(error => {
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    /**
     * 语言选中
     * @param val
     */
    langChange (val) {
      console.log(val, this.langList)
    },
    /**
     * 复制或翻译
     * @param val
     */
    cloneOrTranslate (val) {
      this.formValidation(val)
    },
    /**
     * 校验表单
     * @param translate 是否需要翻译
     */
    formValidation (translate) {
      fetchTranslateSite({
        siteId: this.siteModel.id,
        translate: translate,
        langList: this.langList
      }).then(result => {
        result.options = {
          formName: 'update',
          action: this.actionType.addition,
          success: '提交成功，系统会处理整站内容的翻译工作，预计用时 120 分钟左右，请稍后查看。'
        }
        this.resultMessage(result, (success) => {
          if (success) {
            this.$emit('translate')
            this.closeDialog()
          }
        })
      }).catch(error => {
        this.pageInvalid()
        this.networkMistake(error)
      })
    },
    closeDialog () {
      this.langList = []
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style
  scoped
  lang="scss">
.lang-group {
  overflow: hidden;

  .el-checkbox {
    display: inline-block;
    width: 20%;
    margin: 0;
    float: left;

    & + .el-checkbox {
      margin: 0;
    }
  }
}
</style>
