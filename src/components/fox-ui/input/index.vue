<template>
  <div
    class="el-input-material"
    :class="borderless ? 'borderless' : ''">
    <label
      v-if="!borderless"
      class="el-input-material-label"
      :class="shrink || activated ? 'active' : ''">{{ placeholder }}</label>
    <el-input
      :size="size"
      :placeholder="shrink ? description || '' : placeholder"
      v-bind="mergedProps"
      v-on="listeners">
      <template slot="prepend">
        <slot name="prepend"></slot>
      </template>
      <template slot="append">
        <slot name="append"></slot>
      </template>
    </el-input>
  </div>
</template>
<script>
import { Input } from 'element-ui'

export default {
  name: 'foxInput',
  inheritAttrs: false,
  components: {
    [Input.name]: Input
  },
  props: {
    value: [String, Number],
    placeholder: String,
    size: String,
    description: String,
    borderless: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    shrink: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data () {
    return {
      activated: false
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    },
    inputSize () {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    mergedProps () {
      return {
        ...this.$attrs,
        ...this.$props
      }
    }
  },
  watch: {
    value: {
      deep: true,
      handler (val) {
        this.activated = this.utility.isNotEmpty(val)
      }
    }
  },
  created () {
    this.activated = this.utility.isNotEmpty(this.value)
  },
  methods: {}
}
</script>
<style lang="scss">
.el-input-material {
  position: relative;
  padding: 0.5rem 0;
  clear: both;

  .el-input {
    &__inner {
      padding-top: 5px;
      padding-bottom: 5px;
    }

    &.is-disabled {
      .el-input__inner {
        background: none
      }
    }

    &.active {

    }
  }

  &.borderless {
    .el-input__inner {
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
      padding-right: 0;
      padding-left: 0;
    }

    [class*="el-"] {
      background-color: transparent;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
    }

    .el-input-group__prepend {
      //padding-left: 8px;
    }

    .el-input-group__append {
      padding-right: 0
    }
  }

  &-label {
    background-color: #fff;
    padding-left: 2px;
    padding-right: 2px;
    font-size: 12px;
    position: absolute;
    top: 0;
    color: #C0C4CC;
    left: 1rem;
    z-index: 2;
    opacity: 1;
    line-height: 12px;
    transition: all 0.2s;

    &:not(.active) {
      opacity: 0;
    }
  }

  & + .el-form-item__error {
    padding-top: 0;
  }
}
</style>
