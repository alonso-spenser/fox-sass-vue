<template>
  <div v-loading="loading">
    <el-card shadow="hover">
      <template slot="header">
        <div class="echarts-top-wrapper">
          <h3 class="title">{{ title }}</h3>
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
        <el-empty
          v-if="option.rows.length===0"
          description="暂无数据"></el-empty>
        <div style="display: flex;justify-content: center">
          <div
            v-for="(item ,index) in equipment"
            :key="index">
            <div class="list">
              <small> {{ $t('statement.equipment')[item['deviceCategory']] }} </small>
              <div class="list-center"> {{ item['deviceRate'] * 100 + '%' }}</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>

</template>

<script>
import EchartsPie from 'v-charts/lib/ring'
import units from '@/plugins/utility'

export default {
  name: 'reportDevice',
  components: {
    EchartsPie
  },
  data () {
    return {
      radioSelect: 1,
      settings: {
        radius: [140, 180]
      },
      option: {
        columns: [],
        rows: []
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.option = this.optio
    })
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
    equipment: {
      type: Array,
      default: () => {
        return []
      }
    },
    keyWords: {
      type: Object,
      default: () => {
        return {}
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
    },
    radio: {
      type: [String, Number],
      default: 1
    }
  }
}
</script>
<style
  lang="scss"
  scoped>
.list {
  text-align: center;
  margin-right: 20px;

  .list-center {
    margin: 5px 0;
  }
}
</style>
