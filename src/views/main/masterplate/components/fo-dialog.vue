<template>
  <div
    v-if="visible"
    class="fo-dialog middle">
    <div class="fo-dialog-container">
      <div class="fo-dialog-header">
        <span class="el-icon-close" @click="close"></span>
        {{heading || 'OOPS'}}
      </div>
      <div class="fo-dialog-content">
        <slot></slot>
      </div>
      <div class="fo-dialog-footer" v-if="false">
        <button
          type="button"
          class="fo-dialog-button"
        >
          {{$t('base.cancel')}}
        </button>
        <button
          type="button"
          class="fo-dialog-button active"
        >
          {{$t('base.save')}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/dialog.scss'

export default {
  name: 'page-block',
  data () {
    return {
    }
  },
  props: {
    heading: {
      type: String,
      default: ''
    },
    subheading: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  created () {
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
