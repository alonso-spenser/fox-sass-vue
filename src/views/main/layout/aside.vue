<template>
  <section class="global-aside">
    <el-menu
      :default-active="activeMenu"
      class="global-aside-menu"
      text-color="#666"
      @select="openMenu"
      :router="false"
      unique-opened
      :collapse="false"
      active-text-color="#409EFF"
    >
      <template v-for="(route, index) in menuList">
        <el-menu-item
          v-if="route.submenu.length === 0"
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
          v-if="route.submenu.length > 0"
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
    <slot></slot>
  </section>
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
    ...mapState(['siteModel']),
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
  methods: {
    /**
     * 打开菜单
     */
    openMenu (url, data) {
      if (this.$route.path === url) {
        return
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
    this.menuList = this.$t('mainMenuList')
    let { params } = this.$route
    params = {
      ...params,
      siteId: this.siteId
    }
    this.menuList.forEach((o) => {
      if (o.url) {
        o.url = this.replaceParams(params, o.url)
      }
      o.submenu.forEach((sub) => {
        if (sub.url) {
          sub.url = this.replaceParams(params, sub.url)
        }
      })
    })
    /**
     *  处理导航栏展示，隐藏
     * @type {*[]}
     */
    let list = []
    this.menuList.forEach((o, i, y) => {
      if (this.$checkPermission(o.code)) {
        o.submenu = o.submenu.filter((sb) => {
          return this.$checkPermission(sb.code)
        })
        list.push(o)
      }
    })
    this.menuList = list
  }
}
</script>

<style lang="scss">
@import '@/assets/var';

.global-aside {
  position: fixed;
  z-index: 2;
  height: calc(100% - 64px);
  overflow-y: auto;
  top: 64px;
  left: 0;
  background-color: #fff;
  width: 0;
  transition: all 0.3s;

  @media (min-width: 1024px) {
    width: 220px;
  }
}

.global-aside-menu {
  background: none;
  border: 0 !important;

  .iconfont {
    font-size: 26px;
  }

  .el-submenu {
    .el-submenu__title {
      position: relative;

      .el-submenu__icon-arrow {
        display: none
      }

      &:before {
        position: absolute;
        left: 5px;
        top: calc(50% - 3px);
        display: inline-block;
        width: 0;
        height: 0;
        content: "";
        border-top: 6px solid;
        border-right: 6px solid transparent;
        border-bottom: 0;
        border-left: 6px solid transparent;
        transform: rotateZ(-90deg);
        transition: all 0.3s;
      }
    }

    .el-menu-item {
      height: 44px;
      line-height: 44px;
    }

    &.is-opened {
      .el-submenu__title {
        &:before {
          transform: rotateZ(0);
        }
      }
    }
  }

  .el-submenu__title,
  .el-menu-item {
    border-radius: 0 50px 50px 0;

    &:hover {
      background-color: #f5f5f5;
    }

    &.is-active {
      color: #46a0fc;
      background-color: #e9f0fd;
    }
  }

  .el-submenu__title,
  .el-menu-item {
    height: 44px;
    line-height: 44px;
  }
}
</style>
