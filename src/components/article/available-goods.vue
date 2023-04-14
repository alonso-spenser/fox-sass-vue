<template>
  <el-dialog
    :title="heading"
    :visible.sync="display"
    :show-close="true"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    top="100px"
    width="60%">
    <div>
      <el-input
        :placeholder="$t('base.placeholder.search')"
        v-model="keyword"
        clearable
        @blur="getData(false)"
        @clear="clearCondition"
        class="input-with-select">
        <el-button
          slot="append"
          icon="el-icon-search"
          :loading="loading"
          @click="getData()"
        ></el-button>
      </el-input>
    </div>
    <el-table
      ref="multipleTable"
      :data="dataset"
      :show-header="false"
      max-height="500"
      @selection-change="multiSelect"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        width="80">
        <template slot-scope="scope">
          <img style="width: 50px;" :src="defaultImage(scope.row.coverImage)">
        </template>
      </el-table-column>
      <el-table-column prop="title"></el-table-column>
    </el-table>

    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogClose">
        {{ this.$t('base.operate.cancel') }}
      </el-button>
      <el-button size="small" :loading="loading" type="primary" @click="saveData">
        {{ this.$t('base.operate.save') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/base'
import { fetchAvailableGoods } from '@/plugins/api/article'

/**
 * 添加到集合
 */
export default {
  name: 'add-to-collection',
  extends: extend,
  data () {
    return {
      dataset: [],
      ids: [],
      keyword: '',
      selectedItems: [],
      heading: '',
      hasIds: []
    }
  },
  computed: {
    /**
     * 站点信息
     */
    siteModel () {
      return this.$store.state.siteModel
    }
  },
  props: {
    display: {
      type: Boolean,
      default: false
    },
    /**
     * 集合ID
     */
    refList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    /**
     * 监控窗口显示状态
     */
    display (val) {
      if (val) {
        this.dataset = []
        this.selectedItems = []
        this.hasIds = []
        this.getData()
      }
    }
  },
  methods: {
    /**
     * 默认图
     */
    defaultImage (img) {
      return this.utility.isEmpty(img) ? this.resource.image.placeholder : img
    },
    /**
     * 清空搜索条件
     */
    clearCondition () {
      this.keyword = ''
      this.loading = true
      this.getData()
    },
    /**
     * 调用父级关闭事件，关闭窗体
     */
    dialogClose () {
      this.$emit('close', [])
      this.$emit('update:display', false)
    },
    /**
     * 选择使用并关闭窗体
     */
    saveData () {
      this.$emit('close', this.selectedItems)
      this.$emit('update:display', false)
    },
    /**
     * 关闭单个标签
     */
    closeTag (id, index) {
      this.dataset.splice(index, 1)
      this.ids.push(id)
    },
    /**
     * 获取数据
     */
    getData () {
      let s = this.refList.map((o) => {
        return o.id
      })
      this.hasIds = s
      fetchAvailableGoods({
        keyword: this.keyword,
        region: this.regionCode,
        siteId: this.siteId,
        ids: s
      })
        .then(result => {
          this.pageValid()
          this.loading = false
          this.resultMessage(result, (success) => {
            if (success) {
              this.dataset = result.data
              this.dataset = this.dataset.filter((o) => {
                return this.hasIds.indexOf(o.id) === -1
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
     * 多行选择
     * @param rows
     */
    multiSelect (rows) {
      this.selectedItems = rows
    },
    /**
     * 选中列
     */
    toggleSelection () {
      if (this.selectedItems.length > 0) {
        this.selectedItems.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
