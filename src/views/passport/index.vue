<template>
  <div
    class="passport-content"
  >
    <div
      class="passport-form"
      v-loading="authLoading">
      <img
        class="logo"
        :src="agentModel.logo || resource.logoSVG"
        :alt="agentModel.shortForm">
      <template
        v-if="!merchantModel.token"
      >
        <h1>
          {{ $t('passport.login.title') }}
        </h1>
        <p class="text-secondary">
          {{ $t('passport.login.tips') }}
        </p>
        <fox-form
          :model="entity"
          :rules="formRules"
          ref="ruleForm">
          <p class="clearfix mb-2 text-right">
            <el-button
              type="text"
              class="p-0"
              @click="redirectForget"
            >
              {{ $t("passport.login.forgetTip") }}
            </el-button>
          </p>
          <el-form-item prop="account">
            <fox-input
              shrink
              maxlength="64"
              v-model="entity.account"
              @blur="accountBlur"
              :placeholder="$t('passport.login.entity.account.label')"
              :description="$t('passport.login.entity.account.placeholder')"
              auto-complete="off">
            </fox-input>
          </el-form-item>
          <el-form-item prop="password">
            <fox-input
              shrink
              maxlength="30"
              type="password"
              v-model="entity.password"
              :placeholder="$t('passport.login.entity.password.label')"
              :description="$t('passport.login.entity.password.placeholder')"
              auto-complete="off">
            </fox-input>
          </el-form-item>
          <el-form-item class="mt-7 mb-0">
            <el-button
              type="primary"
              :loading="loading"
              class="el-submit"
              @click="formValidation('ruleForm')"
            >
              {{ $t('passport.login.button') }}
            </el-button>
          </el-form-item>
        </fox-form>
        <p>
          <label class="text-secondary">
            {{ $t('passport.login.noAccount') }}
          </label>
          <el-button
            type="text"
            class="text-link"
            @click="redirectRegister"
          >
            {{ $t('passport.login.register') }}
          </el-button>
        </p>
      </template>
      <div
        class="passport-signed"
        v-else>
        <div class="logo-info">
          <div class="is-flex">
            <el-avatar
              :size="35"
              :src="merchantModel.avatar || resource.image.avatar"></el-avatar>
            {{ merchantModel.firstName.toUpperCase() }} {{ merchantModel.lastName.toUpperCase() }}
          </div>
          <el-button
            @click="logout"
            type="text"
            class="text-link"
          >
            {{ $t('passport.login.logout') }}
          </el-button>
        </div>
        <h3>
          {{ $t('passport.login.mine') }}
        </h3>
        <template v-for="item in siteList">
          <div
            class="site-list el-icon-arrow-right"
            :key="item.id"
            @click="redirectDashboard(item.id, item.langCode)"
            v-if="item['langList'].length < 2">
            <i class="el-icon-monitor"></i>
            <div>
              <h3>{{ item.siteName }}</h3>
              <p>
                {{ item.systemDomain }}
              </p>
            </div>
          </div>
          <el-dropdown
            class="site-dropdown"
            v-else
            :key="item.id"
            @command="dropCommand">
            <div class="site-list el-icon-arrow-right">
              <i class="el-icon-monitor"></i>
              <div>
                <h3>{{ item.siteName }}</h3>
                <p>
                  {{ item.systemDomain }}
                </p>
              </div>
            </div>
            <el-dropdown-menu
              class="site-dropdown-menu"
              slot="dropdown">
              <template v-for="lang in item['langList']">
                <el-dropdown-item
                  :command="{ code: lang.code,id: item.id }"
                  :key="`${item.id}-${lang.code}`">
                  <label class="float-right el-icon-arrow-right"></label>
                  <label :class="lang.code === item.langCode ? '' : 'ml-6'">
                    {{ lang.languageName }} - {{ lang.nativeName }}
                  </label>
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <div class="other-action mt-7">
          <el-button
            @click="redirectCreate"
            type="text"
            v-if="canCreate"
            class="text-link"
          >
            {{ $t('passport.login.create') }}
          </el-button>
          <el-button
            @click="logout"
            type="text"
            class="text-link mt-3 ml-0"
          >
            {{ $t('passport.login.other') }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import extend from '@/plugins/page/unsaved'
import passport from '@/plugins/passport'
import { fetchMerchantLogin, fetchMerchantLogout, fetchMerchantSession } from '@/plugins/api/passport'
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  name: 'passport-login',
  extends: extend,
  data () {
    return {
      entity: {
        account: '',
        password: '',
        areaCode: '',
        captcha: ''
      },
      formRules: {
        account: [
          { required: true, message: this.$t('passport.login.entity.account.required'), trigger: 'blur' },
          {
            pattern: this.utility.expression.Email,
            message: this.$t('passport.login.entity.account.custom'),
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: this.$t('passport.login.entity.password.required'), trigger: 'blur' }
        ]
      },
      siteList: [],
      signed: true,
      logging: false,
      authLoading: true,
      authorizedToken: ''
    }
  },
  mounted () {
    this.keyboardEvents(() => {
      this.formValidation()
    })
  },
  computed: {
    ...mapState(['merchantModel', 'agentModel']),
    canCreate () {
      let keep = this.siteList.filter((o) => {
        return !(o.payMonth > 0 && !o.isExpired)
      })
      return keep.length === 0
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.authorizedToken = route.query && route.query.auth
        this.authLoading = this.utility.isNotEmpty(this.authorizedToken)
      },
      immediate: true
    }
  },
  created () {
    this.setDefaultRegion()
    if (this.utility.isNotEmpty(this.authorizedToken)) {
      passport.login({
        'account': '',
        'avatar': '',
        'id': '',
        'realName': 'Guest',
        'roles': [],
        'token': this.authorizedToken
      })
      this.getSession()
    } else {
      this.logged()
    }
  },
  methods: {
    ...mapMutations(['setMerchantModel', 'setMySite', 'setSiteModel', 'setGlobalRegionModel']),
    /**
     * 获取缓存
     */
    getSession () {
      fetchMerchantSession({})
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.setMerchantModel(result.data)
              this.getMySite((data) => {
                this.ownedSite(data)
              })
            }
          })
        })
        .finally(() => {
          this.authLoading = false
        })
    },
    logged () {
      if (this.merchantModel && this.utility.isNotEmpty(this.merchantModel.token)) {
        this.siteList = []
        this.getMySite((data) => {
          this.ownedSite(data)
        })
      }
    },
    /**
     * 首页
     * @param id 网站ID
     * @param langCode 语言
     */
    redirectDashboard (id, langCode) {
      let rows = this.siteList.filter((o) => {
        return o.id === id
      })
      if (rows.length > 0) {
        this.setSiteModel(rows[0])
        let lang = rows[0].langList.filter((o) => {
          return langCode === o.code
        })
        if (lang.length > 0) {
          this.setGlobalRegionModel({
            ...lang[0],
            siteId: rows[0].id
          })
        }
        this.redirectURL('/dashboard')
      }
    },
    /**
     * 登录
     */
    formValidation () {
      this.formValidate('ruleForm', (verified) => {
        if (verified) {
          fetchMerchantLogin(this.entity)
            .then(result => {
              this.resultMessage(result, (success) => {
                if (success) {
                  this.setMerchantModel(result.data)
                  this.getMySite((data) => {
                    this.ownedSite(data)
                  })
                }
              })
            })
            .catch(error => {
              this.networkMistake(error)
            })
        }
      })
    },
    /**
     * 删除帐号中的空格
     */
    accountBlur () {
      this.entity.account = this.utility.removeAllSpace(this.entity.account)
    },
    /**
     * 我的站点
     * @param data
     */
    ownedSite (data) {
      this.signed = false
      document.title = `${this.$t('site.dashboard.title')}-${this.agentModel.shortForm || this.agentModel.agentName}`
      if (data.length > 0) {
        this.siteList = data
        this.setMySite(data)
        this.setSiteModel(data[0])
      }
    },
    /**
     * 退出登录
     */
    logout () {
      fetchMerchantLogout()
      this.setMerchantModel({})
    },
    /**
     * 创建新网站
     */
    redirectCreate () {
      this.redirectURL('/startup/create-site')
    },
    /**
     * 注册
     */
    redirectRegister () {
      this.redirectURL('/passport/register')
    },
    /**
     * 忘记密码
     */
    redirectForget () {
      this.redirectURL('/passport/forget')
    },
    /**
     * 下拉事件
     */
    dropCommand (command) {
      this.redirectDashboard(command.id, command.code)
    }
  }
}
</script>
<style lang="scss">
.passport-signed {
  //position: fixed;
  //top: 0;
  //right: 0;
  //height: 100%;
  //width: 368px;
  //padding: 50px;
  //background-color: #fff;
  //overflow-y: auto;
  min-height: 400px;

  .logo-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;

    .is-flex {
      display: flex;
      align-items: center;
    }

    .el-avatar {
      margin-right: 6px;
    }
  }
}

.site-dropdown {
  width: 100%;
}

.site-dropdown-menu {
  width: 268px;

  .el-dropdown-menu__item {
    cursor: pointer;

    label {
      line-height: 36px;
    }
  }
}

.site-list {
  display: flex;
  position: relative;
  align-items: center;
  border-bottom: 1px solid #e1e3e5;
  padding-top: 10px;
  padding-bottom: 10px;
  transition: all 0.3s;
  cursor: pointer;

  &:first-child {
    margin-top: 15px;
  }

  &:before {
    position: absolute;
    right: 10px;
    transition: all 0.3s;
    padding-bottom: 10px;
    font-size: 20px;
    color: #8b96a2;
    top: calc(50% - 10px);
  }

  .el-icon-monitor {
    color: #8b96a2;
    font-size: 36px;
    margin-right: 6px;
  }

  h3 {
    margin: 0;
    font-size: 16px;
  }

  p {
    margin: 3px 0 0 0;
    color: #8b96a2;
  }

  &:hover {
    background-color: #f6f6f7;

    &:before {
      right: 5px;
    }
  }
}

.other-action {
  margin-top: 15px;

  .el-button {
    width: 100%;
    display: block;
    text-align: center;
    padding: 6px 20px;
  }
}

</style>
