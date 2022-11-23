<template>
  <footer class="global-footer">&copy; {{ year }} Hey!MySite</footer>
</template>

<script>
export default {
  name: 'global-footer',
  data () {
    return {
      year: 2020
    }
  },
  created () {
    this.year = new Date().getFullYear()
  }
}
</script>

<style
  lang="scss"
  scoped>
.global-footer {
  flex-shrink: 0;
  text-align: center;
  padding-top: 6px;
  color: #909399;
  font-size: 10px;
  background-color: #fff;
}
</style>
