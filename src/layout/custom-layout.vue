<template>
  <section class="layout active">
    <layout-header v-if="navbar"></layout-header>
    <layoutAside v-if="aside"></layoutAside>
    <section :class="`layout-container ${aside ? '' : 'no-slide'}`" v-if="content">
      <slot></slot>
     <layout-footer></layout-footer>
    </section>
  </section>
</template>

<script>
import layoutHeader from './header'
import layoutAside from './aside'
import layoutFooter from './footer'
export default {
  name: 'custom-router',
  components: {
    layoutHeader,
    layoutAside,
    layoutFooter
  },
  props: {
    navbar: {
      type: Boolean,
      default: true
    },
    content: {
      type: Boolean,
      default: true
    },
    aside: {
      type: Boolean,
      default: true
    }
  }
}
</script>
