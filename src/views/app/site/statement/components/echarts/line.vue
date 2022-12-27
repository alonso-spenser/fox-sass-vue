<template>
  <div v-loading="loading">
    <el-card shadow="hover">
      <template slot="header">
        <div class="echarts-top-wrapper">
          <h3 class="title">{{ title }}</h3>
          <slot name="topRight"></slot>
        </div>
      </template>
      <el-row class="data-list">
        <el-col :span="4">
          <div
            class="list-top"
            @click="changes(1)">
            <small :style="{'color': (dataList===1? 'black':'')}"> 用户 </small>
            <h4>{{ legends.users }}</h4>

          </div>
        </el-col>
        <el-col :span="4">
          <div
            class="list-top"
            @click="changes(2)">
            <small :style="{'color': (dataList===2? 'black':'')}"> 会话 </small>
            <h4>{{ legends.hit }} </h4>
            <!--          <span style="color: green"><i class="el-icon-bottom"></i>0.5%</span>-->
          </div>
        </el-col>
        <el-col :span="4">
          <div
            class="list-top"
            @click="changes(3)">
            <small :style="{'color': (dataList===3? 'black':'')}"> 跳出率 </small>
            <h4>{{ legends.exitRate }}</h4>
            <!--          <span style="color: green"><i class="el-icon-bottom"></i>0.5%</span>-->
          </div>
        </el-col>
        <el-col :span="4">
          <div
            class="list-top"
            @click="changes(4)">
            <small :style="{'color': (dataList===4? 'black':'')}"> 会话时长 </small>
            <h4>{{ legends.avgTimeOnPage }}</h4>
            <!--          <span style="color: green"><i class="el-icon-bottom"></i>0.5%</span>-->
          </div>
        </el-col>
      </el-row>
      <echarts-line
        :data="option"
        :settings='settings'
        v-if="option.rows.length>0"
        :legend-visible="legendVisible"
      ></echarts-line>
      <el-empty
        v-if="option.rows.length===0"
        description="暂无数据"></el-empty>
      <div
        style="display: flex;justify-content: center"
        v-if="radioGroup.length>0">
        <el-radio
          v-model="radioSelect"
          @change="item.onChange"
          :label="item.label"
          v-for="(item,index) in radioGroup"
          :key="index">{{ item.name }}
        </el-radio>
      </div>
    </el-card>
  </div>
</template>
<script>
import EchartsLine from 'v-charts/lib/line'
// import units from '@/plugins/utility'
export default {
  name: 'lineTemp',
  data () {
    return {
      option: {
        columns: [],
        rows: []
      },
      radioSelect: 1,
      dataList: 1
    }
  },
  computed: {
    settings () {
      return {
        yAxisName: [`${this.legends.year}年`],
        xAxis: {
          axisLabel: {
            interval: 0, //
            rotate: 45 // 旋转的度数
          }
        },
        // 指标，默认是第二项开始展示
        metrics: [
          'users',
          'hit'
        ],
        // area: true,
        dimension: ['day'],
        xAxisType: 'category',
        labelMap: {
          hit: '会话数',
          users: '用户'
        }
      }
    }
  },
  components: {
    EchartsLine
  },
  methods: {
    changes (a) {
      this.dataList = a
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    radioGroup: {
      type: Array,
      default: () => {
        return []
      }
    },
    radio: {
      type: [String, Number],
      default: ''
    },
    // 是否显示图例
    legendVisible: {
      type: Boolean,
      default: false
    },
    legends: {
      type: [Object, Array],
      default: () => {
        return {
          users: '', // 用户
          sessionNum: '', // 会话
          sessionSize: '',
          exitRate: '', // 跳出率
          avgTimeOnPage: '', // 会话时长
          year: '',
          month: ''
        }
      }
    },
    optio: {
      type: Object,
      default: () => {
        return {
          columns: [],
          rows: []
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.option = this.optio
      this.option.rows.forEach((o, index) => {
        this.option.rows[index].day = o.month + '/' + o.day
      })
    })
  },

  created () {
    this.radioSelect = this.radio
  }
}
</script>
<style
  lang="scss"
  scoped>
.data-list {
  .list-top {
    cursor: pointer;
  }

  .el-col {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;

    small {
      color: #909399;
    }

    h4 {
      //margin-top: 15px;
      margin-bottom: 0;
      font-size: 20px;
    }

  }
}
</style>
