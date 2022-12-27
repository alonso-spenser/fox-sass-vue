<template>
  <div class="pie-wrapper"  v-loading="loading" >
    <el-card shadow="hover">
      <template slot="header">
        <div class="echarts-top-wrapper">
          <h3 class="title">{{title}}</h3>
          <slot name="topRight"></slot>
        </div>
      </template>
      <div class="charts-container">
        <echarts-pie
          :data="option"
          v-if="option.rows.length>0"
          :settings="settings"
          :legend-visible="false"
        ></echarts-pie>
        <empty-data v-if="option.rows.length===0"></empty-data>
        <div style="display: flex;justify-content: center">
          <el-radio
            v-model="radioSelect"
            @change="item.onChange"
            :label="item.label" v-for="(item,index) in radioGroup"
            :key="index">{{item.name}}</el-radio>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import EchartsPie from 'v-charts/lib/pie'
import EmptyData from '../dataEmpty'
import units from '@/plugins/utility'
export default {
  name: 'pie',
  data () {
    return {
      radioSelect: 1,
      settings: {
        radius: 150
      }
    }
  },
  components: {
    EchartsPie,
    EmptyData
  },
  created () {
    if (this.radio) {
      this.radioSelect = this.radio
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
    option: {
      type: Object,
      default: () => {
        return {
          columns: [],
          rows: []
        }
      }
    },
    radio: {
      type: [String, Number],
      default: 1
    }
  }
}
</script>
