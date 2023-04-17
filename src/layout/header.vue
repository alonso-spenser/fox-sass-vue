<template>
  <header
    class="global-header"
    ref="globalHeader">
    <div class="logo-wrap">
      <img
        @click="goHome"
        class="logo"
        :src="agentModel.logo || resource.logoSVG"
        :alt="agentModel.shortForm">
    </div>
    <el-dropdown
      class="my-site"
      @command="changeSiteAndLanguage">
      <label class="el-dropdown-link">
        {{ siteModel.siteName }}
        <small class="text-primary">
          [ {{ globalRegionModel.languageName }} ]
        </small>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </label>
      <el-dropdown-menu
        class="my-site-menu"
        slot="dropdown">
        <template v-for="item in mySite">
          <el-dropdown-item
            disabled
            :key="item.id"
            :class="item.id === siteModel.id ? 'active' : ''">
            {{ item.siteName }}
          </el-dropdown-item>
          <template v-for="lang in item.langList">
            <el-dropdown-item
              :class="item.id === siteModel.id && lang.code === globalRegionModel.code ? 'active' : ''"
              :command="{ code: lang.code,id: item.id }"
              :key="`${item.id}-${lang.code}`">
              <label class="float-right el-icon-arrow-right"></label>
              <label class="site-lang-name">
                {{ lang.languageName }} - {{ lang.nativeName }}
              </label>
            </el-dropdown-item>
          </template>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
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
    ...mapState(['merchantModel', 'agentModel', 'siteModel', 'mySite', 'globalRegionModel'])
  },
  mounted () {
    // window.addEventListener('scroll', this.getScroll)
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
    ...mapMutations(['setMerchantModel', 'setSiteModel', 'setGlobalRegionModel']),
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
          this.$i18n.locale = 'en'
          location.reload()
          break
        case 99:
          localStorage.setItem('foUILanguage', 'zh-CN')
          this.$i18n.locale = 'zh-CN'
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
        token: '',
        shortForm: ''
      })
      this.$router.push('/passport')
    },
    changeSiteAndLanguage (data) {
      if (!data) {
        return
      }
      let rows = this.mySite.filter((o) => {
        return o.id === data.id
      })
      if (rows.length > 0) {
        this.setSiteModel(rows[0])
        let lang = rows[0].langList.filter((o) => {
          return data.code === o.code
        })
        if (lang.length > 0) {
          this.setGlobalRegionModel({
            ...lang[0],
            siteId: rows[0].id
          })
        }
        location.href = '/dashboard'
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/var";

.global-header {
  flex-shrink: 0;
  height: 60px;
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
  border-bottom: 1px solid #E2E2E2;

  .logo-wrap {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #5f6368;

    img {
      height: 30px;
      margin-right: 10px;
    }
  }

  //&.full,
  &.active {
    //border-bottom: 1px solid #e9ecef;
    //box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .global-header-info {
    display: flex;
    align-items: center;
  }

  .user-avatar {
    display: flex;
    color: #909399;
    font-weight: bold;
    align-items: center;
    margin-left: 6px;

    img {
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

.my-site-menu {
  .el-dropdown-menu__item {
    line-height: 26px;

    label {
      line-height: 26px;
    }

    &:not(.is-disabled) {
      .site-lang-name {
        margin-left: 20px;
      }
    }

    &.is-disabled {
      color: #606266;
      font-weight: bold;
    }

    &.active {
      color: $themeColor;
    }
  }
}

.layout-header-dropdown-menu {
  min-height: 80px;
  min-width: 135px;
}
</style>
