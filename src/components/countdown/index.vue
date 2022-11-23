<template>
  <div class="fo-countdown" v-html="timeLabel">
  </div>
</template>

<script>
export default {
  name: 'countdown',
  data () {
    return {
      timeLabel: '',
      cnTips: [],
      unit: [],
      ev: null,
      deadDate: null
    }
  },
  props: {
    /**
     * 时间格式化 D M H S
     */
    dateFormat: {
      type: String,
      default: () => {
        return 'D'
      }
    },
    /**
     * 截止时间
     */
    deadline: {
      type: Date,
      default: () => {
        return null
      }
    }
  },
  created () {
    let cnTips = this.$t('components.countdown.tip').reverse()
    let unit = this.$t('components.countdown.unit').reverse()
    let length = {
      S: 1,
      M: 2,
      H: 3,
      D: 4
    }
    cnTips.length = length[this.dateFormat]
    unit.length = length[this.dateFormat]
    cnTips.reverse()
    unit.reverse()
    this.cnTips = cnTips
    this.unit = unit
    if (this.deadline) {
      this.ev = setInterval(() => {
        this.diff(this.deadline - new Date(), false)
      }, 1000)
    }
  },
  methods: {
    /**
     * .
     * @param num
     * @param cn
     */
    diff (num, cn) {
      let __ = this
      if (num < 1) {
        clearInterval(__.ev)
        this.$emit('finish')
      } else {
        let date = []
        let cnDate = []
        for (let i = 0, l = __.unit.length; i < l; i++) {
          let val = parseInt(num / this.unit[i])
          if (__.less && val < 10) {
            val = `0${val}`
          }
          date.push(`<label>${val}</label>`)
          cnDate.push(`<label>${val}</label><label>${this.cnTips[i]}</label>`)
          num %= this.unit[i]
        }
        this.timeLabel = (cn ? cnDate : date).join('')
      }
    }
  }
}
</script>

<style scoped>

</style>
