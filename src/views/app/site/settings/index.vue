<template>
  <main>
    <el-tabs
      v-model="tabPane"
      class="setting-tabs"
      :before-leave="beforeLeave">
      <el-tab-pane
        v-for="(item,index) in this.$t('settings.tabPane')"
        :key="index"
        :name="item.name"
        :label="item.label"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  name: 'siteSettingsBasic',
  data () {
    return {
      tabPane: ''
    }
  },
  created () {
  },
  methods: {
    async beforeLeave (name) {
      // 路由验证拦截是否发生错误
      await this.$router.push({ name: name })
    }
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler () {
        this.tabPane = this.$route.name
      }
    }
  }
}
</script>

<style
  lang="scss">
.setting-tabs {
  .el-tabs__nav {
    margin-left: 20px;
  }
}
</style>
