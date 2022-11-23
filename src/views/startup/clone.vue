<template>
  <div class="global-page" v-loading="loading">
    <div class="global-header create-site-header active">
      <div class="container">
        <h3>
          {{$t('startup.clone.source')}}
          <small class="text-primary">
            （ {{ $t("siteType")[siteEntity.siteType] }} ）
          </small>
        </h3>
        <p class="text-secondary">
<!--          {{ $t("startup.clone.siteName") }}：{{siteEntity.siteName}}-->
<!--          <label class="ml-5">-->
            {{ $t("startup.clone.siteDomain") }}：{{siteEntity.mainDomain}}
<!--          </label>-->
        </p>
        <div class="create-site-logout">
          <el-button size="small" @click="logout">
            {{ $t('passport.login.logout') }}
          </el-button>
        </div>
      </div>
    </div>
    <main class="editable" v-if="canCreate">
        <div class="global-page-container">
          <el-form
            :model="entity"
            :rules="formRules"
            ref="ruleForm"
            label-position="top"
            @keydown.native.enter.prevent
          >
            <div class="container mt-7">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item prop="siteName" :label="$t('startup.entity.siteName.label')">
                    <el-input
                      v-model="entity.siteName"
                      :placeholder="$t('startup.entity.siteName.placeholder')"
                      show-word-limit
                      maxlength="50"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="langCode" :label="$t('startup.entity.langCode.label')">
                    <el-select
                      v-model="entity.langCode"
                      filterable
                      @change="langChange"
                      style="width: 256px;overflow: hidden"
                    >
                      <el-option
                        v-for="item in regionList"
                        :key="item.code"
                        :label="`${item.languageName} - ${item.nativeName}`"
                        :value="item.code"
                      >
                        <div style="width: 256px;overflow: hidden">
                          {{item.languageName}} - {{item.nativeName}}
                        </div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="create-site-info">
                <h3>{{ $t("startup.original") }}</h3>
                <div class="create-site-browser">
                  <el-row>
                    <el-col :span="4" class="text-center">
                      <i class="el-icon-back"></i>
                      <i class="el-icon-right"></i>
                      <i class="el-icon-refresh"></i>
                      <i class="el-icon-house"></i>
                    </el-col>
                    <el-col :span="18">
                      <el-form-item prop="domain">
                        <el-input
                          @blur="urlBlur"
                          :placeholder="this.$t('startup.entity.domain.placeholder')"
                          :maxlength="32"
                          v-model="entity.domain"
                        >
                          <template slot="prepend">https://</template>
                          <template slot="append">{{ resource.domain }}</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <ul class="create-site-tips">
                  <li v-for="(o, index) in $t('startup.tips')" :key="index" v-html="o">{{o}}</li>
                </ul>
              </div>
            </div>
          </el-form>
        </div>
        <div class="create-site-footer">
          <div class="container">
            <el-row :gutter="40">
              <el-col :span="12">
                <router-link class="text-primary el-button el-button--text" to="/">
                  <i class="el-icon-d-arrow-left"></i>
                  {{ $t("startup.mySites") }}
                </router-link>
              </el-col>
              <el-col :span="12" class="text-right">
                <el-button
                  :loading="loading"
                  type="primary"
                  @click="formValidation('ruleForm')"
                >{{ $t("startup.clone.submit") }}</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
    </main>
  </div>
</template>

<script>
import extend from '@/plugins/page/base'
import { fetchCloneSite, fetchDomainRepeatability, fetchTrialCheck, fetchSiteInfo } from '@/plugins/api/site'
import {
  mapMutations
} from 'vuex'
import { fetchBaseLanguage } from '@/plugins/api/core'
export default {
  name: 'startup-duplicate-site',
  extends: extend,
  data () {
    /**
     * 域名是否可注册校验
     * @param rule
     * @param value
     * @param callback
     */
    let validateDomain = (rule, value, callback) => {
      if (this.resource.keepDomain.indexOf(this.entity.domain) !== -1) {
        callback(new Error(this.$t('startup.entity.domain.async').toString()))
      } else {
        fetchDomainRepeatability({
          domain: this.entity.domain
        })
          .then(result => {
            if (result.success) {
              callback()
            } else {
              callback(new Error(this.$t('startup.entity.domain.async').toString()))
            }
          })
          .catch(error => {
            callback(new Error(error))
          })
      }
    }
    return {
      entity: {
        langCode: 'en',
        langName: 'English',
        siteName: '',
        domain: '',
        siteType: 3,
        themeId: ''
      },
      formRules: {
        domain: [
          {
            required: true,
            message: this.$t('startup.entity.domain.custom'),
            trigger: 'blur'
          },
          {
            pattern: /^(?!-)(?!.*--.*)(?!.*-$)([a-z-\d]+){4,32}$/,
            message: this.$t('startup.entity.domain.required')
          },
          {
            validator: validateDomain,
            trigger: 'blur'
          }
        ]
      },
      siteEntity: {},
      canCreate: false,
      cloneId: '',
      area: {
        states: [],
        province: [],
        city: [],
        language: []
      },
      regionList: []
    }
  },
  created () {
    this.loading = true
    this.cloneId = this.$route.params.cloneId || ''
    this.getData()
    this.trialCheck()
    this.getRegion()
  },
  methods: {
    ...mapMutations(['setMySite', 'setSiteModel', 'setMerchantModel']),
    getRegion () {
      fetchBaseLanguage()
        .then((result) => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.regionList = result.data
            }
          })
        }).catch(error => {
        })
    },
    /**
     * 语言名称
     * @param value
     */
    langChange (value) {
      let s = this.siteEntity.languageList.filter((o) => {
        return o.code === value
      })
      if (s.length > 0) {
        this.entity.langName = s[0].nativeName
      }
    },
    /**
     * 试用检查
     */
    trialCheck () {
      this.loading = true
      fetchTrialCheck()
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success && result.data.content > 0) {
              this.$message({
                type: 'error',
                message: this.$t('site.dashboard.trial.keep').toString()
              })
              this.$router.push({
                path: '/dashboard'
              })
            } else {
              this.canCreate = true
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 原始网站信息
     */
    getData () {
      fetchSiteInfo({
        siteId: this.cloneId,
        region: this.regionCode
      }).then(result => {
        this.resultMessage(result, success => {
          if (success) {
            this.siteEntity = result.data
          } else {
            this.$message({
              type: 'error',
              message: this.$t('startup.clone.error')
            })
            this.$router.push({
              path: '/'
            })
          }
        })
      })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * URL blur 事件
     */
    urlBlur () {
      this.entity.domain = this.utility.urlFilter(this.entity.domain)
    },
    logout () {
      this.setMerchantModel({
        avatar: '',
        firstName: '',
        lastName: '',
        name: '',
        token: ''
      })
      this.setSiteModel({
        id: '',
        createTime: 1625018655524,
        expiryTime: 1629114091117,
        langCode: 'en',
        langName: '',
        logo: '',
        siteName: '',
        thumbnail: '',
        siteType: 3,
        state: 0,
        systemDomain: '',
        mainDomain: '',
        freeRenewal: 0,
        firstOnline: 1625018655524,
        payMonth: 0,
        isExpired: false,
        bindDomain: false
      })
      this.setMySite([])
      localStorage.clear()
      this.$router.push('/passport')
    },
    /**
     * 提交数据
     * @param formName
     */
    formValidation (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          fetchCloneSite({
            siteName: this.entity.siteName,
            domain: this.entity.domain,
            siteId: this.cloneId,
            langCode: this.entity.langCode,
            langName: this.entity.langName
          })
            .then(result => {
              this.resultMessage(result, (success) => {
                if (success) {
                  this.$message({
                    type: 'success',
                    message: this.$t('startup.clone.success').toString()
                  })
                  this.$router.push('/owned')
                }
              })
            })
            .catch(error => {
              this.networkMistake(error)
            })
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import "../../assets/var";
.embed-responsive {
  border: 4px solid #fff;
  border-radius: 6px;
  overflow: hidden;

  img {
    object-position: top;
  }

  .site-template-mask {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: all 0.5s;

    &:hover {
      background-color: rgba(0, 0, 0, .5);

      .el-button {
        opacity: 1;
      }
    }

    display: flex;
    align-items: flex-end;
    justify-content: center;

    .el-button {
      transition: all 0.5s;
      margin: 0 10px 40px 10px;
      opacity: 0;
    }
  }

  .embed-responsive-item {
    img {
      width: 100%;
    }
  }

  &.active {
    box-shadow: 0 0 8px 0 rgba(70, 160, 255, .8);
    border-color: #409EFF;
  }
}

.not-fixed {
  .embed-responsive {
    width: 160px;
  }
}

.create-site {
  border: 1px solid #e4e4e4;
  padding: 4rem 8rem 4rem 3rem;
  cursor: pointer;
  margin-top: 1.5rem;
  border-radius: $borderRadius;
  position: relative;
  transition: $transition;

  &-header {
    height: auto;

    .container {
      position: relative;
      padding-top: 30px;
      padding-bottom: 50px;
    }
  }
  &-logout {
    position: absolute;
    right: 40px;
    top: calc(50% - 16px);
    .el-button {
      border-radius: 16px;
    }
  }

  &-footer {
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #fff;
    border-top: 1px solid #f5f5f5;
  }
  h2 {
    color: $colorHeading;
    margin-bottom: 30px;

    small {
      font-weight: normal;
      color: $colorSecondary;
      font-size: 12px;
    }
  }

  p {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    line-height: 1.8;
  }

  b {
    color: $themeColor;
    margin: 0 5px;
  }

  &:before {
    font-size: 40px;
    position: absolute;
    right: 50px;
    color: $themeColor;
    top: calc(50% - 22px);
    opacity: 0;
  }

  &.active {
    border-color: $themeColor;

    &:before {
      opacity: 1;
    }

    box-shadow: 0 2px 8px rgba(70, 160, 255, .15);
  }

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
  }
}

.create-site-info {

  h3 {
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .create-site-browser {
    padding: 7px;
    border-radius: 10px;
    background-color: #dcdfe6;

    .el-col-4 {
      i {
        display: inline-block;
        font-size: 30px;
        margin-left: 5px;
        margin-top: 3px;
        margin-right: 5px;
        color: $colorSecondary;
      }
    }

    .el-input-group__prepend {
      background-color: #fff;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    .el-input-group__append {
      min-width: 200px;
      background-color: #fff;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }

    .el-form-item__error {
      text-indent: 86px;
      margin-top: 10px;
    }
  }

  .create-site-tips {
    padding-left: 15px;
    margin-top: 50px;

    li {
      line-height: 1.5;
      font-size: 14px;
      color: $colorSecondary;
    }
  }
}
</style>
