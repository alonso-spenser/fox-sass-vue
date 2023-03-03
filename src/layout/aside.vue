<template>
  <div class="custom-aside">
    <div class="logo-wrap">
      <img
        @click="goHome"
        class="logo"
        :src="agentModel.logo || resource.logoSVG"
        :alt="agentModel.shortForm">
    </div>
    <el-menu
      :default-active="activeMenu"
      class="main-aside"
      text-color="#666"
      @select="openMenu"
      :router="false"
      unique-opened
      :collapse="false"
      active-text-color="#409EFF"
    >
      <template v-for="(route, index) in menuList">
        <el-menu-item
          v-if="route.submenu.length === 0 && validSiteType(route.siteType)"
          :key="route.url"
          :index="route.url || index.toString()"
          :class="route.style || ''"
        >
          <template slot="title">
            <i
              class="icon iconfont"
              :class="route.icon"
              v-if="route.icon"></i>
            {{ route.title }}
          </template>
        </el-menu-item>
        <el-submenu
          :key="route.url"
          v-if="route.submenu.length > 0 && validSiteType(route.siteType)"
          :index="route.url || index.toString()"
        >
          <template slot="title">
            <i
              class="icon iconfont"
              :class="route.icon"
              v-if="route.icon"></i>
            {{ route.title }}
          </template>
          <template v-for="sub in route.submenu">
            <el-menu-item
              :key="sub.url"
              :index="sub.url"
              v-if="validSiteType(sub.siteType)"
              :class="sub.style || ''"
            >
              <template slot="title">
                <i
                  class="icon iconfont"
                  :class="sub.icon"
                  v-if="sub.icon"></i>
                {{ sub.title }}
              </template>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import extend from '@/plugins/page/base'

export default {
  name: 'global-aside',
  extends: extend,
  data () {
    return {
      menuList: []
    }
  },
  computed: {
    ...mapState(['siteModel', 'agentModel']),
    /**
     * 路由标记
     */
    activeMenu () {
      const route = this.$route
      const { meta, path, params } = route
      let url = meta.parent ? (typeof (meta.parent) === 'object' ? meta.parent.url : meta.parent) : path
      return this.replaceParams(params, url)
    }
  },
  watch: {
    '$store.state.siteModel' () {
      this.getMenuList()
    }
  },
  methods: {
    /**
     * 首页
     */
    goHome () {
      this.redirectURL('/dashboard')
    },
    getMenuList () {
      this.siteId = this.$route.params.siteId || this.siteModel.id
      let list = JSON.parse(JSON.stringify(this.$t('siteAside.menuList')))
      let { params } = this.$route
      params = {
        ...params,
        siteId: this.siteId
      }
      list.forEach((o) => {
        if (o.url) {
          o.url = this.replaceParams(params, o.url)
        }
        o.submenu.forEach((sub) => {
          if (sub.url) {
            sub.url = this.replaceParams(params, sub.url)
          }
        })
      })
      let s = []
      /**
       *  处理导航栏展示，隐藏
       * @type {*[]}
       */
      list.forEach((o, i, y) => {
        if (this.$checkPermission(o.code)) {
          o.submenu = o.submenu.filter((sb) => {
            return this.$checkPermission(sb.code)
          })
          s.push(o)
        }
      })
      this.menuList = s
    },
    /**
     * 不同网站类型，对应不同菜单项
     */
    validSiteType (role = []) {
      return role.indexOf(this.siteModel.siteType) > -1
    },
    /**
     * 打开菜单
     */
    openMenu (url, data) {
      if (this.$route.path === url) {
        return false
      }
      this.$router.push({
        path: url
      })
    },
    /**
     * URL替换
     * @param params
     * @param url
     */
    replaceParams (params, url) {
      for (let key in params) {
        url = url.replace(`:${key}:`, params[key])
      }
      return url
    }
  },
  created () {
    this.getMenuList()
  }
}
</script>
