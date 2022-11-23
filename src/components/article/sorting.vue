<template>
  <el-dialog
    :title="$t('sorting.title')"
    :visible.sync="visible"
    :show-close="true"
    :before-close="dialogClose"
    width="400px">
    <template v-for="(o, key) in $t('orderBy')">
      <p :key="key" v-if="!(infoType === 3 && ('updateTimeASC|updateTimeDESC'.indexOf(key) > -1))">
        <el-radio v-model="orderBy" :label="key" border class="w-100">{{o}}</el-radio>
      </p>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogClose">{{ this.$t('base.operate.cancel') }}</el-button>
      <el-button size="small" v-if="orderBy !== ''" type="primary" @click="getCondition">{{ this.$t('base.operate.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'sorting',
  data: function () {
    return {
      orderBy: ''
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    /**
     * 信息类型
     */
    infoType: {
      type: Number,
      default: () => {
        return 1
      }
    }
  },
  methods: {
    /**
     * 调用父级关闭事件，关闭窗体
     */
    dialogClose () {
      this.$emit('close', '')
    },
    /**
     * 条件
     */
    getCondition () {
      this.$emit('close', this.orderBy)
    }
  }
}
</script>

<style scoped>

</style>
