<template>
  <el-row>
    <el-col :span="24">
      <div :class="className" :id="id" :style="{height:height,width:width}" ref="chartCanvas"></div>
    </el-col>
    <el-col :span="24">
      <div style="display: flex;justify-content: center" v-if="radioGroup.length > 0">
        <el-radio
          v-model="radio"
          @change="item.onChange"
          :label="item.label"
          v-for="(item,index) in radioGroup"
          :key="index">
          {{ item.name }}
        </el-radio>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import country from './echarts.config'
import echarts from 'echarts'
import 'echarts/map/js/world'

export default {
  name: 'word',
  data () {
    return {
      radio: 1
    }
  },
  props: {

    radioGroup: {
      type: Array,
      default: () => {
        return []
      }
    },
    className: {
      type: String,
      default: 'yourClassName'
    },
    id: {
      type: String,
      default: 'yourID'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '600px'
    },
    dataMap: {
      type: [Array, Object],
      default: () => {
        return []
      }
    },
    // 是否设置中文
    setChina: {
      type: Boolean,
      default: false
    },
    radioSelect: {
      type: [String, Number],
      default: ''
    }
  },
  created () {
    if (this.radioSelect) {
      this.radio = this.radioSelect
    }
  },
  mounted () {
    this.$nextTick(() => {
      let dataList = []
      this.dataMap.forEach(o => {
        dataList.push(
          { name: o.country, value: o.users }
        )
      })
      this.initChart(dataList)
    })
  },
  watch: {
    dataMap: {
      deep: true,
      handler (val) {
        this.$forceUpdate()
        // console.log(val)
      }
    }
  },

  methods: {
    initChart (o) {
      let that = this
      that.chart = echarts.init(this.$refs.chartCanvas)
      window.onresize = echarts.init(this.$refs.chartCanvas).resize
      // 把配置和数据放这里
      this.chart.setOption({
        backgroundColor: 'white',
        title: {
          left: '40%',
          top: '0px',
          textStyle: {
            color: '#fff',
            opacity: 0.7
          }
        },
        dataRange: {
          show: false,
          min: 0,
          max: 100,
          color: ['#39BEEF', '#BADDF0']
        },
        tooltip: {
          trigger: 'item'
        },
        geo: {
          map: 'world',
          name: '分布情况',
          left: 0,
          layoutCenter: ['50%', '50%'],
          layoutSize: 100,
          aspectScale: 1,
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false,
          silent: true
        },
        series: [{
          type: 'map',
          mapType: 'world',
          name: '分布情况',
          zoom: 1.2,
          nameMap: this.setChina ? country : '',
          // data: that.dataMap,
          data: o,
          symbolSize: 12,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              borderColor: '#fff',
              borderWidth: 1
            }
          }
        }]
      })
    }
  }
}
</script>
