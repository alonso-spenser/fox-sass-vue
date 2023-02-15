<template>
  <el-form
    class="material-form"
    :class="borderless ? 'borderless' : ''"
    v-bind="mergedProps"
    v-on="listeners">
    <slot></slot>
  </el-form>
</template>
<script>
import { Form } from 'element-ui'

export default {
  name: 'foxForm',
  inheritAttrs: false,
  components: {
    [Form.name]: Form
  },
  props: {
    borderless: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    },
    mergedProps () {
      return {
        ...this.$attrs,
        ...this.$props
      }
    }
  },
  data () {
    return {
      activated: false
    }
  }
}
</script>
<style lang="scss">
.el-form-item {
  &.is-success {
    .el-input__inner,
    .el-input__inner:focus,
    .el-textarea__inner,
    .el-textarea__inner:focus,
    .el-message-box__input input.invalid,
    .el-message-box__input input.invalid:focus {
      //border-color: #c2e7b0;
      //color: #67c23a;
    }
  }

  &.is-error {
    .el-input__inner,
    .el-input__inner:focus,
    .el-textarea__inner,
    .el-textarea__inner:focus,
    .el-message-box__input input.invalid,
    .el-message-box__input input.invalid:focus {
      border-color: #f56c6c;
    }

    .el-input-material-label {
      color: #f56c6c;
    }
  }

  &:focus {
    .el-input-material-label {
      color: #409eff;
    }
  }
}

.material-form {
  .el-form-item {
    margin-bottom: 20px;
  }

  &.borderless {
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
