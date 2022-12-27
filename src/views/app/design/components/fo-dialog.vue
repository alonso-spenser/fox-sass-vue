<template>
  <div
    v-if="visible"
    class="fo-dialog middle">
    <div class="fo-dialog-container" :style="cssText">
      <div class="fo-dialog-header">
        <span class="el-icon-close" @click="close"></span>
        {{heading || 'OOPS'}}
      </div>
      <div class="fo-dialog-content">
        <slot></slot>
      </div>
      <div class="fo-dialog-footer">
        <el-button
          size="small"
          type="button"
          @click="close"
        >
          {{$t('base.operate.cancel')}}
        </el-button>
        <el-button
          size="small"
          type="button"
        >
          {{$t('base.operate.save')}}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoDialog',
  data () {
    return {
      cssText: ''
    }
  },
  props: {
    heading: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    width: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  created () {
    if (this.utility.isNotEmpty(this.width)) {
      this.cssText = `width: ${this.width}`
    }
  },
  methods: {
    /**
     * 关闭
     */
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
$pixel: 0.0625rem;
$red:     #dc3545 !default;

.fo-dialog-overflow {
  overflow: hidden!important;
}

.fo-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 4000;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

  &:before {
    content: "";
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 3999;
    background-color: rgba(0,0, 0, .5);
  }

  .fo-dialog-container {
    width: 500  * $pixel;
    margin: 60 * $pixel auto;
    border-radius: 4  * $pixel;
    padding: 20  * $pixel 25  * $pixel;
    position: relative;
    z-index: 4001;
    max-width: 90%!important;

    .fo-dialog-header {
      position: relative;
      font-size: 16  * $pixel;
      overflow: hidden;
      padding: 0;
      color: #606266;
      //margin-bottom: 1rem;

      span {
        position: absolute;
        right: 0;
        cursor: pointer;
        height: 100%;
        width: 50  * $pixel;
        top: 0;
        text-align: right;

        &:after {
          content: "";
        }

        &:hover {
          &:after {
            color: $red;
          }
        }
      }
    }

    .fo-dialog-content {
      position: relative;
      margin: 0;
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 14  * $pixel;
    }

    .fo-dialog-footer {
      margin-top: 1rem;
      text-align: right;
    }

    &:not(.fo-dialog-loading) {
      box-shadow: 0 2  * $pixel 12  * $pixel 0 rgba(0, 0, 0, 0.3);
      background-color: #fff;
    }
  }

  &.middle {
    text-align: center;

    &:after {
      content: "";
      display: inline-block;
      height: 100%;
      width: 0;
      vertical-align: middle;
    }

    .fo-dialog-container {
      text-align: left;
      display: inline-block;
      vertical-align: middle;
      backface-visibility: hidden;
      max-width: 90% !important;
      max-height: calc(100% - #{120 *$pixel});
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}
</style>
