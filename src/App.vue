<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <div
      v-if="!pageLoaded"
      className="app-loading">
      <div className="app-loading-ball">
        <label></label>
        <label></label>
        <label></label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      pageLoaded: false
    }
  },
  mounted () {
    this.pageLoaded = true
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%
}
</style>
