<template>
  <div
    :class="`passport`"
    v-if="isPassport">
    <router-view></router-view>
  </div>
  <section
    class="global-page"
    v-else>
    <layout-header></layout-header>
    <layoutAside></layoutAside>
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
  name: 'layout-router',
  components: {
    layoutHeader,
    layoutAside,
    layoutFooter
  },
  computed: {
    isPassport () {
      return ['passport-register', 'passport-login', 'passport-forget', 'email-send-success', 'passport-reset-password', 'passport-email-send-success'].indexOf(this.$route.name) > -1
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
