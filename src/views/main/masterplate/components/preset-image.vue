<template>
  <div>
    <div
      @click="imageVisible=true"
      class="embed-responsive embed-responsive-1by1"
      style="width: 30px;margin-top:5px;cursor: pointer;border: 1px solid #e6e6e6;overflow: hidden;border-radius: 4px">
      <img
        v-if="defaultValue"
        class="embed-responsive-item"
        :src="defaultValue">
      <div
        v-else
        class="embed-responsive-item text-center text-primary">
        <i class="el-icon-edit"></i>
      </div>
    </div>
    <fo-dialog
      :visible="imageVisible"
      @close="dialogClose"
    >
      <div class="schema-image-content">
        <div
          @click="getDefaultImage('')"
          class="schema-image"
          style="background-color: #fdf6ec;cursor: pointer">
          <i
            class="el-icon-delete"
            style="color: #e6a23c"></i>
        </div>
        <div
          v-for="(img, index) in images"
          :key="index"
          class="schema-image">
          <img :src="img">
          <div class="schema-image-action">
            <a
              :href="img"
              target="_blank">
              <i class="el-icon-zoom-in"></i>
            </a>
            <a
              @click="getDefaultImage(img)"
              href="javascript:void(0)">
              <i class="el-icon-check"></i>
            </a>
          </div>
        </div>
      </div>
    </fo-dialog>
  </div>
</template>

<script>
import FoDialog from './fo-dialog'

export default {
  name: 'presetImage',
  components: {
    FoDialog
  },
  data () {
    return {
      images: [
        '/theme/webp/image-with-text.webp',
        '/css/img/8b.jpg',
        '/css/img/8g.jpg',
        '/css/img/8r.jpg',
        '/css/img/email.png',
        '/theme/webp/inquiry.webp',
        '/css/img/placeholder.jpg',
        '/css/img/quote.png',
        '/css/img/slide.jpg',
        '/css/img/logo-white.png',
        '/css/img/logo.png',
        '/css/img/favorite.png',
        '/css/img/map-bg.png'
      ],
      defaultValue: '',
      imageVisible: false
    }
  },
  props: {
    value: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  watch: {
    defaultValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.defaultValue = val
    }
  },
  created () {
    this.defaultValue = this.value
  },
  methods: {
    /**
     * 设置值
     */
    getDefaultImage (url) {
      this.defaultValue = url
      this.imageVisible = false
    },
    /**
     * 关闭
     */
    dialogClose () {
      this.imageVisible = false
    }
  }
}
</script>
