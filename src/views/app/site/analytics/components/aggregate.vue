<template>
  <el-card shadow="hover">
    <el-row type="flex" class="inquiry-top">
      <el-col class="inquiry-top-col" :span="item.span" v-for="(item,index) in aggregate" :key="index">
        <span class="icon iconfont" :class="item.icon" :style="{color:item.color}"></span>
        <span class="text">{{ item.name }}:</span>
        <span class="data">{{ item.data }}</span>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'aggregate',
  data () {
    return {

    }
  },
  props: {
    aggregate: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style scoped lang="scss">
.inquiry-top {
  .inquiry-top-col {
    padding: 20px 0;
    .icon {
      font-size: 16px;
      font-weight: bold;
      margin-right: 6px;
    }
    .text {
      font-size: 16px;
    }

    .data {
      font-size: 18px;
      font-weight: bold;
      margin-left: 6px;
    }
  }
}
</style>
