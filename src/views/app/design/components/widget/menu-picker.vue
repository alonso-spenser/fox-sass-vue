<template>
  <div>
    <el-select
        v-model="entity.id"
        :placeholder="$t('base.placeholder.select')"
        size="small"
        @change="menuChanged"
        width="100%">
      <el-option
          :label="$t('menuPicker.header')"
          :value="1">
      </el-option>
      <el-option
          :label="$t('menuPicker.product')"
          :value="3">
      </el-option>
      <el-option
          :label="$t('menuPicker.article')"
          :value="4">
      </el-option>
      <el-option
          :label="$t('menuPicker.footMenu')"
          :value="2">
      </el-option>
      <el-option
          :label="$t('menuPicker.footMenu2')"
          :value="8">
      </el-option>
      <el-option
          :label="$t('menuPicker.footMenu3')"
          :value="9">
      </el-option>
    </el-select>
  </div>
</template>
<script>
import extend from '@/plugins/page/base'

export default {
  name: 'menuPicker',
  extends: extend,
  data () {
    return {
      entity: {
        id: 3
      }
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          id: 3
        }
      }
    }
  },
  created () {
    this.entity = this.value
  },
  methods: {
    /**
     * 选择
     */
    menuChanged (value) {
      this.$emit('input', {
        id: value
      })
    }
  }
}
</script>
