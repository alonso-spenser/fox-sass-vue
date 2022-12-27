<template>
  <div style="height:55vh;">
    <echarts-line
      :data="option"
      :settings='settings'
    />
  </div>
</template>

<script>
import EchartsLine from 'v-charts/lib/line'
export default {
  components: { EchartsLine },
  props: {
    optio: {
      type: [Object, Array],
      default: () => {
        return {
          columns: [],
          rows: []
        }
      }
    }
  },
  data () {
    return {
      settings: {
        dimension: ['month'],
        // 指标，默认是第二项开始展示
        metrics: [
          'fiveRankNum',
          // 'highQualityNum',
          'hit',
          'iPNum',
          // 'includedNum',
          'indexRankNum',
          'inquiryNum'
          // 'multiplePageNum'
        ],
        // 指标的别名 -- 后台数据给的指标大多时候不为中文，但是给用户看的肯定是中文的
        labelMap: {
          fiveRankNum: '前五版排关键词个数',
          // highQualityNum: '高质量访客数',
          hit: '会话数',
          iPNum: '独立IP个数',
          // includedNum: '网站收录量',
          indexRankNum: '首页排名关键词个数',
          inquiryNum: '询盘数'
          // multiplePageNum: '多页面访问数'
        }
        // scale: true,
        // labelMap: { indexRankNum: '还有谁' }, // 指定提示图框中的别名
        // legendName: { indexRankNum: '还有谁' } // 图标上方的别名
        // area: true
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
      this.option.rows.forEach((o, index) => {
        this.option.rows[index].month = o.month + '月'
      })
    })
  },
  methods: {

  }
}
</script>
