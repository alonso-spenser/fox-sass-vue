<template>
  <div v-loading="loading">
    <el-card shadow="hover">
      <template slot="header">
        <div class="echarts-top-wrapper">
          <h3 class="title">{{title}}</h3>
          <slot name="topRight"></slot>
        </div>
      </template>
      <echarts-line
        :data="option"
        :settings='settings'
        v-if="option.rows.length>0"
        :legend-visible="legendVisible"
      ></echarts-line>
      <empty-data  v-if="option.rows.length===0"></empty-data>
      <div style="display: flex;justify-content: center" v-if="radioGroup.length>0">
        <el-radio
          v-model="radioSelect" @change="item.onChange"
          :label="item.label"
          v-for="(item,index) in radioGroup"
          :key="index">{{item.name}}</el-radio>
      </div>
    </el-card>
  </div>
</template>

<script>
import EchartsLine from 'v-charts/lib/line'
import EmptyData from '../dataEmpty'
import units from '@/plugins/utility'
export default {
  name: 'lineTemp',
  data () {
    return {
      settings: {
        area: true,
        xAxisType: 'category'
      },
      radioSelect: 1
    }
  },
  components: {
    EmptyData,
    EchartsLine
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
    option: {
      type: Object,
      default: () => {
        return {
          columns: [],
          rows: []
        }
      }
    }
  },
  watch: {
    option: {
      immediate: true,
      deep: true,
      handler (val) {
        units.deleteObjType(val.columns, 'type')
        units.deleteObjType(val.rows, 'type')
      }
    }
  },
  created () {
    this.radioSelect = this.radio
  }
}
</script>
