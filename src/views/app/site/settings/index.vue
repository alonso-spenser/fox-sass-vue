<template>
  <fox-layout-main
    :offset="200"
    google-style
    :percentage="80">
    <el-tabs
      slot="header"
      v-model="tabPane"
      class="el-tabs-nav"
      :before-leave="beforeLeave">
      <el-tab-pane
        v-for="(item,index) in this.$t('settings.tabPane')"
        :key="index"
        :name="item.name"
        :label="item.label">
      </el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </fox-layout-main>
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
