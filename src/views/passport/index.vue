<template>
  <div
    class="passport-content"
  >
    <div
      class="passport-form"
      v-loading="authLoading">
      <svg
        class="logo"
        xmlns="http://www.w3.org/2000/svg">
        <g
          id="6fox"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd">
          <g
            id="1"
            transform="translate(-197.000000, -352.000000)"
            fill="#000"
            fill-rule="nonzero">
            <g
              id="Hey!MySite"
              transform="translate(197.023438, 352.953125)">
              <polygon
                id="Path"
                points="4.359375 12.9550781 4.359375 24.046875 0 24.046875 0 0.544921875 4.359375 0.544921875 4.359375 11.2324219 14.1855469 11.2324219 14.1855469 0.544921875 18.5097656 0.544921875 18.5097656 24.046875 14.1855469 24.046875 14.1855469 12.9550781"></polygon>
              <path
                d="M23.7965625,11.4082031 C23.7965625,10.2597656 23.9811328,9.50976562 24.3502734,9.15820312 C24.7194141,8.80664062 25.4957812,8.63085938 26.679375,8.63085938 L34.0270312,8.63085938 L34.0270312,9.96679688 L28.7711719,9.96679688 C28.1500781,9.96679688 27.7369922,10.0546875 27.5319141,10.2304688 C27.3268359,10.40625 27.2242969,10.7285156 27.2242969,11.1972656 L27.2242969,15.0820312 L32.7965625,15.0820312 L32.7965625,16.59375 L27.2242969,16.59375 L27.2242969,21.4980469 C27.2242969,21.9667969 27.3297656,22.2861328 27.5407031,22.4560547 C27.7516406,22.6259766 28.2438281,22.7109375 29.0172656,22.7109375 L34.2028125,22.7109375 L34.2028125,24.046875 L26.1344531,24.046875 C25.2672656,24.046875 24.6608203,23.8652344 24.3151172,23.5019531 C23.9694141,23.1386719 23.7965625,22.3945312 23.7965625,21.2695312 L23.7965625,11.4082031 Z"
                id="Path"></path>
              <polygon
                id="Path"
                points="41.54625 23.9765625 35.4642187 8.63085938 39.0677344 8.63085938 43.3567969 19.4414062 47.8567969 8.63085938 49.4388281 8.63085938 40.5442969 30.3046875 38.8567969 30.3046875"></polygon>
              <path
                d="M54.6201563,24.6269531 C54.0342188,24.6269531 53.5391016,24.421875 53.1348047,24.0117188 C52.7305078,23.6015625 52.5283594,23.109375 52.5283594,22.5351562 C52.5283594,21.9492188 52.7275781,21.4541016 53.1260156,21.0498047 C53.5244531,20.6455078 54.0225,20.4433594 54.6201563,20.4433594 C55.194375,20.4433594 55.6894922,20.6484375 56.1055078,21.0585938 C56.5215234,21.46875 56.7295313,21.9609375 56.7295313,22.5351562 C56.7295313,23.109375 56.5215234,23.6015625 56.1055078,24.0117188 C55.6894922,24.421875 55.194375,24.6269531 54.6201563,24.6269531 Z M54.2158594,19.3710938 L52.8096094,4.5 C52.7627344,4.078125 52.7275781,3.69140625 52.7041406,3.33984375 C52.6807031,2.98828125 52.6689844,2.68945312 52.6689844,2.44335938 C52.6689844,1.65820312 52.8389063,1.0546875 53.17875,0.6328125 C53.5185938,0.2109375 54.0107813,0 54.6553125,0 C55.2764063,0 55.7598047,0.213867187 56.1055078,0.641601562 C56.4512109,1.06933594 56.6240625,1.66992188 56.6240625,2.44335938 C56.6240625,2.61914063 56.600625,2.93847656 56.55375,3.40136719 C56.506875,3.86425781 56.4717188,4.23046875 56.4482813,4.5 L55.0420313,19.3710938 L54.2158594,19.3710938 Z"
                id="Shape"></path>
              <polygon
                id="Path"
                points="63.1061719 24.046875 63.1061719 0.544921875 68.045625 0.544921875 74.655 16.6289062 81.0358594 0.544921875 85.6413281 0.544921875 85.6413281 24.046875 81.3874219 24.046875 81.3874219 5.15039062 73.4421094 24.9082031 65.1276562 5.15039062 65.1276562 24.046875"></polygon>
              <polygon
                id="Path"
                points="94.7777344 23.9765625 88.6957031 8.63085938 92.2992187 8.63085938 96.5882812 19.4414062 101.088281 8.63085938 102.670312 8.63085938 93.7757812 30.3046875 92.0882812 30.3046875"></polygon>
              <path
                d="M105.654375,19.5820312 C106.17,20.5664062 106.82918,21.3339844 107.631914,21.8847656 C108.434648,22.4355469 109.298906,22.7109375 110.224688,22.7109375 C111.478594,22.7109375 112.498125,22.3154297 113.283281,21.5244141 C114.068438,20.7333984 114.461016,19.7167969 114.461016,18.4746094 C114.461016,16.4941406 112.709063,14.7832031 109.205156,13.3417969 L109.152422,13.3242188 C107.265703,12.5507812 105.926836,11.6777344 105.13582,10.7050781 C104.344805,9.73242188 103.949297,8.50195312 103.949297,7.01367188 C103.949297,4.97460938 104.628984,3.30175781 105.988359,1.99511719 C107.347734,0.688476562 109.105547,0.03515625 111.261797,0.03515625 C112.878984,0.03515625 114.294023,0.3984375 115.506914,1.125 C116.719805,1.8515625 117.619219,2.8828125 118.205156,4.21875 L116.658281,5.25585938 C116.271563,4.15429688 115.691484,3.30761719 114.918047,2.71582031 C114.144609,2.12402344 113.224688,1.828125 112.158281,1.828125 C111.021563,1.828125 110.089922,2.19433594 109.363359,2.92675781 C108.636797,3.65917969 108.273516,4.6171875 108.273516,5.80078125 C108.273516,6.73828125 108.572344,7.53515625 109.17,8.19140625 C109.767656,8.84765625 110.886797,9.52734375 112.527422,10.2304688 C115.117266,11.34375 116.825273,12.4101562 117.651445,13.4296875 C118.477617,14.4492188 118.890703,15.7558594 118.890703,17.3496094 C118.890703,19.4589844 118.161211,21.1992188 116.702227,22.5703125 C115.243242,23.9414062 113.394609,24.6269531 111.156328,24.6269531 C109.539141,24.6269531 108.144609,24.3164062 106.972734,23.6953125 C105.800859,23.0742188 104.781328,22.1132812 103.914141,20.8125 L105.654375,19.5820312 Z"
                id="Path"></path>
              <path
                d="M122.279063,4.21875 C122.279063,3.66796875 122.475352,3.19921875 122.86793,2.8125 C123.260508,2.42578125 123.738047,2.23242188 124.300547,2.23242188 C124.839609,2.23242188 125.3025,2.42285156 125.689219,2.80371094 C126.075938,3.18457031 126.269297,3.65625 126.269297,4.21875 C126.269297,4.7578125 126.078867,5.22070312 125.698008,5.60742188 C125.317148,5.99414062 124.851328,6.1875 124.300547,6.1875 C123.738047,6.1875 123.260508,5.99414062 122.86793,5.60742188 C122.475352,5.22070312 122.279063,4.7578125 122.279063,4.21875 Z M122.560313,8.63085938 L125.988047,8.63085938 L125.988047,24.046875 L122.560313,24.046875 L122.560313,8.63085938 Z"
                id="Shape"></path>
              <polygon
                id="Path"
                points="132.540469 24.046875 132.540469 9.96679688 129.253359 9.96679688 129.253359 8.63085938 139.237734 8.63085938 139.237734 9.96679688 135.950625 9.96679688 135.950625 24.046875"></polygon>
              <path
                d="M142.538203,11.4082031 C142.538203,10.2597656 142.722773,9.50976562 143.091914,9.15820312 C143.461055,8.80664062 144.237422,8.63085938 145.421016,8.63085938 L152.768672,8.63085938 L152.768672,9.96679688 L147.512813,9.96679688 C146.891719,9.96679688 146.478633,10.0546875 146.273555,10.2304688 C146.068477,10.40625 145.965938,10.7285156 145.965938,11.1972656 L145.965938,15.0820312 L151.538203,15.0820312 L151.538203,16.59375 L145.965938,16.59375 L145.965938,21.4980469 C145.965938,21.9667969 146.071406,22.2861328 146.282344,22.4560547 C146.493281,22.6259766 146.985469,22.7109375 147.758906,22.7109375 L152.944453,22.7109375 L152.944453,24.046875 L144.876094,24.046875 C144.008906,24.046875 143.402461,23.8652344 143.056758,23.5019531 C142.711055,23.1386719 142.538203,22.3945312 142.538203,21.2695312 L142.538203,11.4082031 Z"
                id="Path"></path>
            </g>
          </g>
        </g>
      </svg>
      <template
        v-if="!merchantModel.token"
      >
        <h1>
          {{ $t('passport.login.title') }}
        </h1>
        <p class="text-secondary">
          {{ $t('passport.login.tips') }}
        </p>
        <el-form
          :model="entity"
          :rules="formRules"
          ref="ruleForm">
          <p class="clearfix mb-2">
            <a
              @click="redirectForget"
              href="javascript:void(0)"
              class="text-link float-right"
            >
              {{ $t("passport.login.forgetTip") }}
            </a>
            {{ $t('passport.login.entity.account.label') }}
          </p>
          <el-form-item prop="account">
            <el-input
              maxlength="64"
              v-model="entity.account"
              @blur="accountBlur"
              :placeholder="$t('passport.login.entity.account.placeholder')"
              auto-complete="off">
            </el-input>
          </el-form-item>
          <p class="mb-2">
            {{ $t('passport.login.entity.password.label') }}
          </p>
          <el-form-item prop="password">
            <el-input
              maxlength="30"
              type="password"
              v-model="entity.password"
              :placeholder="$t('passport.login.entity.password.placeholder')"
              auto-complete="off">
            </el-input>
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
        </el-form>
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
            {{ merchantModel.firstName }}{{ merchantModel.lastName }}
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
        <div class="other-action">
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
            class="text-link"
          >
            {{ $t('passport.login.other') }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import extend from '@/plugins/page/base'
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
          { required: true, message: this.$t('passport.login.entity.account.required'), trigger: 'blur' }
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
    ...mapState(['merchantModel']),
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
    ...mapMutations(['setMerchantModel', 'setSiteModel']),
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
     */
    redirectDashboard () {
      if (this.$route.query.redirect) {
        location.href = this.$route.query.redirect
      } else {
        this.$router.push('/dashboard')
      }
    },
    /**
     * 登录
     */
    formValidation () {
      const formName = 'ruleForm'
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
      this.$router.push('/startup/create-site')
    },
    /**
     * 注册
     */
    redirectRegister () {
      this.$router.push('/passport/register')
    },
    /**
     * 忘记密码
     */
    redirectForget () {
      this.$router.push('/passport/forget')
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
