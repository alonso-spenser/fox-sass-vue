<template>
  <section class="global-page">
    <layout-header></layout-header>
    <layoutAside></layoutAside>
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <layout-footer></layout-footer>
  </section>
</template>

<script>
import layoutHeader from './header'
import layoutAside from './aside'
import layoutFooter from './footer'
export default {
  name: 'layout-router',
  components: {
    layoutHeader,
    layoutAside,
    layoutFooter
  }
}
</script>
