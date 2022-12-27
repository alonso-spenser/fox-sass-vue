<template>
  <div>
    <div
      @click="imageVisible=true"
      class="embed-responsive embed-responsive-1by1"
      style="width: 30px;margin-top:5px;cursor: pointer;border: 1px solid #e6e6e6;overflow: hidden;border-radius: 4px">
      <img v-if="defaultValue" class="embed-responsive-item" :src="defaultValue">
      <div v-else class="embed-responsive-item text-center text-primary">
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
          class="schema-image" style="background-color: #fdf6ec;cursor: pointer">
          <i class="el-icon-delete" style="color: #e6a23c"></i>
        </div>
        <div
          v-for="(img, index) in images"
          :key="index"
          class="schema-image">
          <img :src="img">
          <div class="schema-image-action">
            <a :href="img" target="_blank">
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
        '/theme/img/8b.jpg',
        '/theme/img/8g.jpg',
        '/theme/img/8r.jpg',
        '/theme/img/email.png',
        '/theme/webp/inquiry.webp',
        '/theme/img/placeholder.jpg',
        '/theme/img/quote.png',
        '/theme/img/slide.jpg',
        '/theme/img/logo-white.png',
        '/theme/img/logo.png',
        '/theme/img/favorite.png',
        '/theme/img/map-bg.png'
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
