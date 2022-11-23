<template>
  <section class="global-page" v-if="editable">
    <layout-header :shadow="false"></layout-header>
    <router-view></router-view>
    <layout-footer></layout-footer>
  </section>
  <section class="global-page" v-else>
    <layout-header></layout-header>
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <layout-footer></layout-footer>
  </section>
</template>

<script>
import layoutHeader from '@/layout/header'
import layoutFooter from '@/layout/footer'
export default {
  name: 'account-layout',
  data () {
    return {
    }
  },
  components: {
    layoutHeader,
    layoutFooter
  },
  computed: {
    editable: function () {
      return this.$route.meta.editable
    }
  }
}
</script>
