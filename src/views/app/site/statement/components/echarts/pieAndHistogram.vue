<template>
  <el-card
    v-loading="loading"
    shadow="hover">
    <div class="echarts-top-wrapper">
      <h3 class="title">{{ title }}</h3>
    </div>
    <el-row>
      <el-col :span="8">
        <echarts-pie
          :data="pieOptions"
          :legend-visible="false"
          v-if="pieOptions.rows.length>0"></echarts-pie>
        <empty-data v-if="pieOptions.rows.length===0"></empty-data>
      </el-col>
      <el-col :span="16">
        <e-charts-histogram
          :data="histogramOptions"
          :legend-visible="legendVisible"
          :settings="histogramSettings"
          v-if="histogramOptions.rows.length>0"></e-charts-histogram>
        <el-empty
          v-if="histogramOptions.rows.length===0"
          description="暂无数据"></el-empty>
      </el-col>
      <el-col
        :span="24"
        style="display: flex;justify-content: center">
        <el-radio
          v-model="radioSelect"
          @change="item.onChange"
          :label="item.label"
          v-for="(item,index) in radioGroup"
          :key="index">{{ item.name }}
        </el-radio>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>

import EchartsPie from 'v-charts/lib/pie'
import EChartsHistogram from 'v-charts/lib/histogram'
import units from '@/plugins/utility'

export default {
  name: 'pieAndHistogram',
  components: {
    EchartsPie,
    EChartsHistogram
  },
  data () {
    return {
      radioSelect: 1,
      histogramSettings: {
        yAxisType: ['KMB', 'percent'],
        axisSite: {
          right: ['uplevel']
        }
      }
    }
  },
  created () {
    if (this.radio) {
      this.radioSelect = this.radio
    }
  },
  watch: {
    pieOptions: {
      immediate: true,
      deep: true,
      handler (val) {
        units.deleteObjType(val.columns, 'type')
        units.deleteObjType(val.rows, 'type')
      }
    },
    histogramOptions: {
      immediate: true,
      deep: true,
      handler (val) {
        units.deleteObjType(val.columns, 'type')
        units.deleteObjType(val.rows, 'type')
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    radioGroup: {
      type: Array,
      default () {
        return []
      }
    },
    // 饼图数据
    pieOptions: {
      type: Object,
      default: () => {
        return {
          columns: [],
          rows: []
        }
      }
    },
    // 柱状图数据
    histogramOptions: {
      type: Object,
      default: () => {
        return {
          columns: [],
          rows: []
        }
      }
    },
    legendVisible: {
      type: Boolean,
      default: false
    },
    radio: {
      type: [String, Number],
      default: 1
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
