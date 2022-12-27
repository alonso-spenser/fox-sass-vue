<template>
  <div>
    <el-popover
      placement="top-start"
      width="450"
      trigger="hover"
      v-model="popVisible"
      >
      <div class="icon-picker">
        <div class="icon-picker-icon" @click="iconSelect(item)" v-for="(item, index) in dataset" :key="`icon-${index}`">
          <i :class="item"></i>
        </div>
        <div class="icon-picker-icon clear" @click="iconSelect('')" key="icon-clear">
          <i class="el-icon-close"></i>
        </div>
      </div>
    </el-popover>
    <el-button class="icon-picker-button" size="small" @click="popVisible=true" :icon="iconValue || 'el-icon-edit'"></el-button>
  </div>
</template>

<script>
import './font/iconfont.scss'
export default {
  name: 'video-picker',
  data () {
    return {
      dataset: ['ic-play', 'ic-home', 'ic-facebook', 'ic-fancy', 'ic-jd', 'ic-google-plus', 'ic-linkedin', 'ic-amazon', 'ic-instagram', 'ic-qq', 'ic-skype', 'ic-success', 'ic-line', 'ic-pinterest', 'ic-snapchat', 'ic-tmall', 'ic-vimeo', 'ic-taobao', 'ic-twitter', 'ic-whatsapp', 'ic-youtube', 'ic-tumblr', 'ic-weibo', 'ic-wechat', 'ic-align-left', 'ic-circle-check', 'ic-clock', 'ic-circle-cross', 'ic-graph-bar', 'ic-pie', 'ic-move', 'ic-cloud-upload', 'ic-download', 'ic-about', 'ic-classes', 'ic-camera', 'ic-left', 'ic-comment', 'ic-album', 'ic-location', 'ic-mine', 'ic-search', 'ic-right', 'ic-message-headset', 'ic-message', 'ic-video-file', 'ic-phone', 'ic-reload', 'ic-close', 'ic-affix', 'ic-email', 'ic-fax', 'ic-cart', 'ic-down', 'ic-delete', 'ic-loading', 'ic-mobile', 'ic-menu', 'ic-microphone', 'ic-shopping-bag', 'ic-qrcode', 'ic-share', 'ic-up', 'ic-setting'],
      iconValue: '',
      popVisible: false
    }
  },
  props: {
    value: {
      type: String,
      default: () => ''
    }
  },
  watch: {
    iconValue (val) {
      this.$emit('input', this.iconValue)
    },
    value () {
      this.iconValue = this.value
    }
  },
  created () {
    this.iconValue = this.value
  },
  methods: {
    iconSelect (value) {
      this.popVisible = false
      this.iconValue = value
    }
  }
}
</script>
