<template>
  <div
    :class="`passport`"
    v-if="isPassport">
    <div class="region-change"
         v-if="false"
    >
      <img
        @click="changeRegion"
        src="~@/assets/svg/region.svg"
        alt="">
    </div>
    <router-view></router-view>
  </div>
  <fox-layout
    v-else
    :copyright="merchantModel.merchant && merchantModel.merchant.shortForm || ''"
    :aside-top="0"
    :aside-bottom="0"
    :aside-width="200"
    aside-css="custom-aside"
    router-view
  >
    <div
      slot="header"
      class="fox-header">
      <div class="fox-header-breadcrumb">
        <el-breadcrumb
          class="breadcrumb-wrap"
          separator="/">
          <el-breadcrumb-item
            v-for="({ title, path }, index) in breadcrumbList"
            :key="index"
            :to="breadcrumbList.length - 1 !== index && { path }"
          >{{ title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="fox-header-right">
        <el-dropdown
          class="my-site mr-3"
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
        <el-dropdown
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
              :src="merchantModel.avatar || avatarUrl"></el-avatar>
            {{ merchantModel.firstName }} {{ merchantModel.lastName }}
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
import langSVG from '@/assets/svg/lang.svg'
import avatar from '@/assets/image/avatar.png'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'layout-router',
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
  watch: {
    '$route': {
      deep: true,
      immediate: true,
      handler () {
        this.getBreadcrumb()
      }
    }
  },
  computed: {
    ...mapState(['merchantModel', 'agentModel', 'siteModel', 'mySite', 'globalRegionModel']),
    isPassport () {
      return ['passport-register', 'passport-login', 'passport-forget', 'email-send-success', 'passport-reset-password', 'passport-email-send-success'].indexOf(this.$route.name) > -1
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
     * 更新缓存
     */
    ...mapMutations(['setMerchantModel', 'setSiteModel', 'setGlobalRegionModel']),
    /**
     * 切换语言
     */
    changeRegion () {
      let region = this.utility.getLanguage()
      region = region === 'zh-CN' ? 'en' : 'zh-CN'
      localStorage.setItem('foUILanguage', region)
      this.$i18n.locale = region
    },
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
          this.redirectURL('/account/password')
          break
        case 1:
          this.logout()
          break
        case 2:
          this.redirectURL('/account/personal')
          break
        case 3:
          this.redirectURL('/account/employee')
          break
        case 4:
          this.redirectURL('/account/personal')
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
    },
    /**
     * URL参数替换
     * @param params
     * @param url
     */
    replaceParams (params, url) {
      for (const key in params) {
        url = url.replaceAll(`:${key}:`, params[key])
      }
      return url
    },
    /**
     * 获取面包屑
     */
    getBreadcrumb () {
      const { matched, name, params: { collectionType } } = this.$route
      const params = this.$route.params
      const breadcrumbList = []
      if (['site-article-collection-update', 'site-article-collection-add', 'site-article-collection'].indexOf(name) > -1) {
        breadcrumbList.push({
          path: `/site/${params.siteId}/${collectionType}`,
          title: this.$t(`${collectionType}.paging.title`)
        })
        breadcrumbList.push({
          path: `/site/${params.siteId}/${collectionType}/collection`,
          title: this.$t(`article.collection.${collectionType}.title`)
        })
      } else {
        matched.map(({ path, meta }, index) => {
          if (meta['crumbs']) {
            meta['crumbs'].forEach((o) => {
              if (o.path && o.title) {
                breadcrumbList.push({
                  path: this.replaceParams(params, o.path),
                  title: o.title
                })
              }
            })
          }
          if (meta['title'] && path && index > 0) {
            breadcrumbList.push({
              path,
              title: meta['title']
            })
          }
        })
      }
      this.breadcrumbList = breadcrumbList
    }
  }
}
</script>
<style lang="scss">
@import "../assets/var";

.fox-header {
  height: 60px;
  padding: 8px 15px;
  position: relative;
  z-index: 1;
  margin-left: 200px;
  display: flex;
  justify-content: space-between;
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

  .ship-calculator {
    width: 32px;
    height: 32px;
    padding: 7px !important;

    i {
      font-size: 18px;
      color: #7F7F7F;
    }
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
