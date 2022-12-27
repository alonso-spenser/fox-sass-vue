<template>
  <div class="flow-table-wraper">
    <h3>{{title}} <label class="ml-1">TOP10</label></h3>
    <div class="top-nav mt-2">
      <template v-for="(item,index) in rankingHeader">
        <div class="table-content" :class="index === 1 ? 'center': index === 2 ? 'right' : ''"   :key="index">
          {{item.name}}
        </div>
      </template>
    </div>
    <template v-if="contentList.length > 0">
      <div class="top-nav" v-for="(item,index) in contentList " :key="index">
        <div class="table-content">
          <label class="table-index" :class="getClass(index)">{{ index + 1 }}</label>
          {{ item.country }}
        </div>
        <div class="table-content center">
          {{ item.totalNum }}
        </div>
        <div class="table-content right">
          {{ item.ratio }}%
        </div>
<!--        <div class="progress" :style="{width: item.progress +'%'}"></div>-->
      </div>
    </template>
    <empty-data v-if="contentList.length === 0"></empty-data>
  </div>
</template>

<script>
import EmptyData from './dataEmpty'
export default {
  name: 'tableRanking',
  data () {
    return {
    }
  },
  components: {
    EmptyData
  },
  props: {
    title: {

    },
    rankingHeader: {
      type: Array,
      default: () => {
        return []
      }
    },
    contentList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    /**
     * 获取样式
     * @param index
     * @returns {string|string}
     */
    getClass (index) {
      let s = ['text-danger', 'text-warning', 'text-success']
      return index < s.length ? s[index] : ''
    }
  }
}
</script>

<style scoped lang="scss">
.flow-table-wraper {
  .top-nav {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: solid 1px #EBEEF5;
    position: relative;

    .progress {
      position: absolute;
      bottom: -2px;
      height: 2px;
      background: #38BEEF;
    }

    .table-content {
      &:first-child {
        flex: 1;
      }

      .table-index {
        margin-right: 6px;
      }

      &.right {
        text-align: right;
        width: 70px;
      }

      &.center {
        width: 70px;
        text-align: center;
      }
    }
  }
}
</style>
