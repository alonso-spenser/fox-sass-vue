<template>
  <el-dialog
    :title="$t('specPresetSelect.heading')"
    :visible.sync="display"
    :show-close="true"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    top="100px"
    width="600px">
    {{ $t('specPresetSelect.subheading') }}
    <el-table
      :data="dataset"
      :show-header="false"
      max-height="500"
      style="width: 100%">
      <el-table-column prop="title">
        <template slot-scope="scope">
          <el-radio @change="radioChange(scope.row.jsonData)" v-model="settings" :label="scope.row.id">
            {{scope.row.title}}
          </el-radio>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogClose">
        {{ $t("base.operate.cancel") }}
      </el-button>
      <el-button size="small" :loading="loading" type="primary" @click="saveData">
        {{ $t("base.operate.confirm") }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/base'
import { articleSpecList } from '@/plugins/api/article'

/**
 * 规格参数预设选择
 */
export default {
  name: 'spec-preset-select',
  extends: extend,
  data () {
    return {
      dataset: [],
      settings: '',
      presetData: []
    }
  },
  props: {
    display: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    /**
     * 监控窗口显示状态
     */
    display (val) {
      if (val) {
        this.getData()
      }
    }
  },
  methods: {
    /**
     * 调用父级关闭事件，关闭窗体
     */
    dialogClose () {
      this.$emit('close')
    },
    /**
     * radio 值改变
     */
    radioChange (value) {
      if (!this.utility.isEmpty(value)) {
        this.presetData = JSON.parse(value)
      }
    },
    /**
     * 保存
     */
    saveData () {
      this.$emit('close', this.presetData)
    },
    /**
     * 获取数据
     */
    getData () {
      this.presetData = []
      this.settings = ''
      articleSpecList({
        siteId: this.siteId,
        region: this.regionCode
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.dataset = result.data
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

<style scoped>

</style>
