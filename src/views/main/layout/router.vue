<template>
  <div
    :class="`passport main`"
    v-if="routeName === 'main-passport-login'">
    <router-view></router-view>
  </div>
  <section
    class="global-page"
    v-else>
    <layout-header v-if="header !== false"></layout-header>
    <layout-aside v-if="sidebar !== false"></layout-aside>
    <transition
      name="router-fade"
      mode="out-in">
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
  name: 'main-router',
  components: {
    layoutHeader,
    layoutAside,
    layoutFooter
  },
  methods: {},
  computed: {
    routeName () {
      return this.$route.name
    },
    sidebar: function () {
      return this.$route.meta['sidebar'] === undefined ? true : this.$route.meta['sidebar']
    },
    header: function () {
      return this.$route.meta['header'] === undefined ? true : this.$route.meta['header']
    }
  }
}
</script>
