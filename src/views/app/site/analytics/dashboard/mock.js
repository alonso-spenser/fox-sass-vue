import echartsConfig from './components/echarts/echarts.config'
// 数据mock
let dataMap = []
let i = 0
for (let key in echartsConfig) {
  dataMap.push({
    name: key,
    value: 0
  })
}
let flowRanking = [
  {
    country: '美国',
    visit: 100,
    progress: '30%'
  },
  {
    country: '美国',
    visit: 100,
    progress: '30%'
  },
  {
    country: '美国',
    visit: 100,
    progress: '30%'
  },
  {
    country: '美国',
    visit: 100,
    progress: '70%'
  },
  {
    country: '美国',
    visit: 100,
    progress: '70%'
  }, {
    country: '美国',
    visit: 100,
    progress: '70%'
  },
  {
    country: '美国',
    visit: 100,
    progress: '70%'
  },
  {
    country: '美国',
    visit: 100,
    progress: '70%'
  },
  {
    country: '美国',
    visit: 100,
    progress: '70%'
  }
]
let wordEcharts = dataMap
export default {
  flowRanking, // 理论分布排行
  wordEcharts // 世界地图数据
}
