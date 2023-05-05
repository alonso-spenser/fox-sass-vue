<template>
  <div
    :class="`passport main`"
    v-if="routeName === 'main-passport-login'">
    <router-view></router-view>
  </div>
  <fox-layout
    v-else
    :copyright="agentModel.shortForm"
    :aside-top="0"
    :aside-bottom="0"
    :aside-width="200"
    aside-css="custom-aside"
    router-view
  >
    <div
      slot="header"
      class="fox-main-header">
      <div class="fox-header-right">
        <el-dropdown
          v-if="false"
          @command="dropCommand"
          class="mr-3">
          <div
            class="user-avatar">
            <el-avatar
              :size="32"
              :src="langSVG"
            ></el-avatar>
          </div>
          <el-dropdown-menu
            class="global-header-action"
            slot="dropdown">
            <el-dropdown-item
              :command="98"
            >
              {{ $t('header.region.en') }}
            </el-dropdown-item>
            <el-dropdown-item
              :command="99">
              {{ $t('header.region')['zh-CN'] }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="dropCommand">
          <div
            class="user-avatar"
            @click="myAccount">
            <el-avatar
              :size="32"
              :src="masterModel.avatar || avatarUrl"></el-avatar>
            {{ masterModel.firstName }} {{ masterModel.lastName }}
          </div>
          <el-dropdown-menu
            class="global-header-action"
            slot="dropdown">
            <el-dropdown-item
              :command="0"
              v-if="$checkPermission(['account-password'])">
              {{ $t('header.password') }}
            </el-dropdown-item>
            <el-dropdown-item
              :command="2"
              v-if="$checkPermission(['account-personal'])">
              {{ $t('header.personal') }}
            </el-dropdown-item>
            <el-dropdown-item
              :command="3"
              v-if="$checkPermission(['account-employee'])">
              {{ $t('header.employee') }}
            </el-dropdown-item>
            <el-dropdown-item
              :command="1"
              divided
            >
              {{ $t('header.out') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <layout-aside slot="aside"></layout-aside>
  </fox-layout>
</template>

<script>
import layoutAside from './aside'
import extend from '@/plugins/page/base'
import { mapState } from 'vuex'
import langSVG from '@/assets/svg/lang.svg'
import avatar from '@/assets/image/avatar.png'

export default {
  name: 'mainRouter',
  extends: extend,
  components: {
    layoutAside
  },
  data () {
    return {
      langSVG,
      avatarUrl: avatar,
      breadcrumbList: []
    }
  },
  computed: {
    ...mapState(['agentModel', 'masterModel']),
    routeName () {
      return this.$route.name
    },
    sidebar: function () {
      return this.$route.meta['sidebar'] === undefined ? true : this.$route.meta['sidebar']
    },
    header: function () {
      return this.$route.meta['header'] === undefined ? true : this.$route.meta['header']
    }
  },
  methods: {
    /**
     * 首页
     */
    goHome () {
      this.redirectURL('/main/dashboard')
    },
    /**
     * 用户中心
     */
    myAccount () {
      this.$router.push('/main/account')
    },
    /**
     * 下拉事件
     */
    dropCommand (command) {
      switch (command) {
        case 0:
          this.redirectURL('/main/account/password')
          break
        case 1:
          this.logout()
          break
        case 2:
          this.redirectURL('/main/account/personal')
          break
        case 3:
          this.redirectURL('/main/account/employee')
          break
        case 4:
          this.redirectURL('/main/account/personal')
          break
        case 98:
          localStorage.setItem('foUILanguage', 'en')
          this.$i18n.locale = 'en'
          location.reload()
          break
        case 99:
          localStorage.setItem('foUILanguage', 'zh-CN')
          this.$i18n.locale = 'zh-CN'
          location.reload()
          break
      }
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/var";

.fox-main-header {
  height: 60px;
  padding: 8px 15px;
  position: relative;
  z-index: 1;
  margin-left: 200px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: $themeColor;
  transition: all 0.3s;
  background: none;
  box-shadow: none;
  border-bottom: 1px solid #dcdfe5;

  &-right {
    display: flex;
    align-items: center;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    padding-left: 60px;
  }

  .global-header-info {
    display: flex;
    align-items: center;
  }

  .user-avatar {
    display: flex;
    color: #909399;
    align-items: center;
    margin-left: 6px;
    cursor: pointer;

    .el-avatar {
      margin-right: 5px;
    }

    text-transform: uppercase;
  }

  .el-breadcrumb__inner a,
  .el-breadcrumb__inner.is-link {
    font-weight: normal;
  }
}

.fox-google-style {
  &:not(.neighbor) {
    .fox-page-content {
      padding-top: 1.875rem;
      padding-bottom: 1.875rem;
    }
  }
}
</style>
