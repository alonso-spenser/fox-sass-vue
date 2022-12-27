<template>
  <header
    class="global-header"
    ref="globalHeader">
    <div class="logo-wrap">
      <img
        @click="goHome"
        :src="resource.logoSVG">
    </div>
    <el-dropdown @command="dropCommand">
      <div
        class="user-avatar"
        @click="myAccount">
        <img
          :size="32"
          :src="merchantModel.avatar || avatarUrl">
        {{ merchantModel.firstName }} {{ merchantModel.lastName }}
      </div>
      <el-dropdown-menu
        class="global-header-action"
        slot="dropdown">
        <el-dropdown-item
          icon="el-icon-location-outline"
          :command="98"
        >
          {{ $t('header.region.en') }}
        </el-dropdown-item>
        <el-dropdown-item
          :command="99"
          icon="el-icon-location-outline">
          {{ $t('header.region')['zh-CN'] }}
        </el-dropdown-item>
        <el-dropdown-item
          :command="0"
          divided
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
  </header>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'

export default {
  name: 'layout-header',
  data () {
    return {
      avatarUrl: 'https://theme.fomille.site/img/avator.png'
    }
  },
  computed: {
    ...mapState(['merchantModel'])
  },
  mounted () {
    window.addEventListener('scroll', this.getScroll)
  },
  props: {
    shadow: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  methods: {
    /**
     * 更新缓存
     */
    ...mapMutations(['setMerchantModel']),
    /**
     * 首页
     */
    goHome () {
      this.$router.push({
        path: '/dashboard'
      })
    },
    /**
     * 用户中心
     */
    myAccount () {
      this.$router.push({
        path: '/account'
      })
    },
    /**
     * 下拉事件
     */
    dropCommand (command) {
      switch (command) {
        case 0:
          this.$router.push('/account/password')
          break
        case 1:
          this.logout()
          break
        case 2:
          this.$router.push('/account/personal')
          break
        case 3:
          this.$router.push('/account/employee')
          break
        case 4:
          this.$router.push('/account/personal')
          break
        case 98:
          localStorage.setItem('foUILanguage', 'en')
          location.reload()
          break
        case 99:
          localStorage.setItem('foUILanguage', 'zh-CN')
          location.reload()
          break
      }
    },
    /**
     * 退出
     */
    logout () {
      let code = localStorage.getItem('foUILanguage') || 'en'
      window.localStorage.clear()
      localStorage.setItem('foUILanguage', code)
      this.setMerchantModel({
        avatar: '',
        firstName: '',
        lastName: '',
        name: '',
        token: ''
      })
      this.$router.push('/passport')
    },
    getScroll () {
      // let el = this.$refs.globalHeader
      // && !el.classList.contains('full')
      // if (el) {
      //   let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //   if (scrollTop === 0) {
      //     el.classList.remove('active')
      //   } else {
      //     el.classList.add('active')
      //   }
      // }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/var";

.global-header {
  flex-shrink: 0;
  height: 64px;
  padding: 8px 15px;
  display: flex;
  position: relative;
  z-index: 10;
  justify-content: space-between;
  align-items: center;
  //background-color: #fff;
  color: $themeColor;
  transition: all 0.3s;
  background: none;
  box-shadow: none;

  .logo-wrap {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #5f6368;

    img {
      height: 20px;
      margin-right: 10px;
    }
  }

  //&.full,
  &.active {
    //border-bottom: 1px solid #e9ecef;
    //box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .user-avatar {
    display: flex;
    color: #909399;
    font-weight: bold;
    align-items: center;

    img {
      border: 4px solid #fff;
      border-radius: 100%;
      height: 32px;
      width: 32px;
      transition: all 0.3s;
    }

    &:hover {
      img {
        border-color: #f0f0f0;
      }
    }
  }
}

.layout-header-dropdown-menu {
  width: 200px;
}
</style>
