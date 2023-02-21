<template>
  <label>
    <el-dropdown
      @command="dropCommand"
      v-if="dropActionsVisible()">
      <el-button
        size="small"
        type="text"
      >
        {{ $t('base.operate.label') }} <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <template v-for="(btn, i) in dropActions">
          <el-dropdown-item
            :command="i"
            :key="i"
            v-if="btn.visible">
            {{ btn.label }}
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
    <template v-if="actions && actions.length > 0">
      <template v-for="(btn, i) in actions">
        <el-button
          v-if="btn.visible"
          :key="i"
          type="text"
          :size="btn.size || 'small'"
          :icon="btn.icon"
          :class="`${btn.type || ''} ${dropActions && dropActions.length > 0 ? 'ml-3' : ''}`"
          :disabled="btn.disabled"
          @click.stop="btn.click()"
        >{{ btn.label }}
        </el-button>
      </template>
    </template>
  </label>
</template>

<script>
export default {
  name: 'neighborAction',
  data: function () {
    return {}
  },
  props: {
    /**
     * 事件
     */
    actions: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     * 下拉事件
     */
    dropActions: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    /**
     * 下接操作菜单
     */
    dropActionsVisible () {
      return this.dropActions.filter((o) => {
        return o.visible
      }).length > 0
    },
    /**
     * 下拉菜单事件
     * @param command
     */
    dropCommand (command) {
      let index = parseInt(command)
      this.dropActions.forEach((o, i) => {
        if (index === i) {
          o.click()
        }
      })
    }
  }
}
</script>
