<template>
  <div
    class="global-page"
    v-loading="loading">
    <div
      class="global-header create-site-header active"
      v-if="canCreate">
      <div class="container">
        <h3 v-if="activeIndex === 0">
          {{ $t("startup.siteType.heading") }}
        </h3>
        <template v-if="activeIndex === 1">
          <h3>
            {{ $t("startup.chooseTemplate") }}
            <small class="text-primary">
              （{{ $t("siteType")[entity.siteType.toString()] }}）
            </small>
          </h3>
          <div class="mt-3">
            <el-button
              round
              :type="'' === tagId ? 'primary' : ''"
              @click="tagsChange('')"
              size="small">
              {{ $t("startup.all") }}
            </el-button>
            <el-button
              round
              v-for="o in tagList"
              :key="o.id"
              :type="o.id === tagId ? 'primary' : ''"
              @click="tagsChange(o.id)"
              size="small">
              {{ o.tagName }}
            </el-button>
          </div>
        </template>
        <h3 v-if="activeIndex === 2">
          {{ $t('startup.siteTheme') }}
          <small class="text-primary">
            （{{ $t("siteType")[entity.siteType.toString()] }}）
          </small>
        </h3>
        <div class="create-site-logout">
          <el-button
            size="small"
            @click="logout">
            {{ $t('passport.login.logout') }}
          </el-button>
        </div>
      </div>
    </div>
    <main
      class="editable"
      v-if="canCreate">
      <template v-if="activeIndex === 0">
        <div class="global-page-container">
          <div class="container">
            <el-row
              :gutter="20"
              class="mt-7">
              <el-col :span="12">
                <div
                  :class="`create-site el-icon-check ${entity.siteType === 3 ? ' active' : ''}`"
                  @click="selectedSite(3)">
                  <h2>
                    {{ $t("startup.siteType.b2b.heading") }}
                  </h2>
                  <p v-html="$t('startup.siteType.b2b.subheading')"></p>
                  <p>
                    {{ $t("startup.siteType.b2b.tips") }}
                  </p>
                </div>
              </el-col>
              <el-col :span="12">
                <div
                  :class="`create-site el-icon-check ${entity.siteType === 2 ? ' active' : ''}`"
                  @click="selectedSite(2)">
                  <h2 v-html="$t('startup.siteType.lp.heading')"></h2>
                  <p v-html="$t('startup.siteType.lp.subheading')"></p>
                  <p>
                    {{ $t("startup.siteType.lp.tips") }}
                  </p>
                </div>
              </el-col>
              <!--          <el-col :span="8">-->
              <!--            <div :class="`create-site${entity.siteType === 4 ? ' active' : ''}`" @click="selectedSite(4)">-->
              <!--              <h2 v-html="$t('startup.siteType.b2c.heading')"></h2>-->
              <!--              <p v-html="$t('startup.siteType.b2c.subheading')"></p>-->
              <!--              <p>-->
              <!--                {{ $t("startup.siteType.b2c.tips") }}-->
              <!--              </p>-->
              <!--            </div>-->
              <!--          </el-col>-->
            </el-row>
          </div>
        </div>
        <div class="create-site-footer">
          <div class="container">
            <el-row :gutter="20">
              <el-col :span="12">
                <a
                  class="text-primary el-button el-button--text"
                  href="/owned">
                  <i class="el-icon-d-arrow-left"></i>
                  {{ $t("startup.mySites") }}
                </a>
              </el-col>
              <el-col
                :span="12"
                class="text-right">
                <el-button
                  :loading="loading"
                  @click="stepChange(0, 1)"
                  type="primary"
                >{{ $t("startup.nextStep") }}
                </el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </template>
      <template v-if="activeIndex === 1">
        <div class="global-page-container">
          <div class="container">
            <el-row
              :gutter="20"
              class="site-template">
              <el-col
                v-for="o in dataset"
                class="mt-4"
                :key="o.id"
                :span="6">
                <div
                  class="embed-responsive embed-responsive-5by4"
                  :class="o.id === entity.themeId ? ' active' : ''">
                  <img
                    class="embed-responsive-item"
                    :src="o.screenshot">
                  <div class="site-template-mask">
                    <el-button
                      type="primary"
                      round
                      @click="themeSelected(o)"
                    >
                      {{ $t("startup.selected") }}
                    </el-button>
                    <a
                      :href="o.demoUrl"
                      target="_blank"
                      v-if="o.demoUrl">
                      <el-button
                        type="primary"
                        round
                        plain>
                        {{ $t("startup.preview") }}
                      </el-button>
                    </a>
                  </div>
                </div>
                <p class="text-center">{{ o.name }}</p>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="create-site-footer">
          <div class="container">
            <el-row :gutter="40">
              <el-col :span="12">
                <a
                  class="text-primary el-button el-button--text"
                  href="/">
                  <i class="el-icon-d-arrow-left"></i>
                  {{ $t("startup.mySites") }}
                </a>
              </el-col>
              <el-col
                :span="12"
                class="text-right">
                <el-button
                  @click="stepChange(1, 0)"
                  type="text"
                  icon="el-icon-arrow-left">
                  {{ $t("startup.prevStep") }}
                </el-button>
                <!--              <el-button-->
                <!--                @click="skipTemplate()"-->
                <!--                class="ml-5"-->
                <!--                type="text">-->
                <!--                {{ $t("startup.skip") }}-->
                <!--                <i class="el-icon-arrow-right"></i>-->
                <!--              </el-button>-->
                <el-button
                  :loading="loading"
                  type="primary"
                  class="ml-5"
                  @click="stepChange(1, 2)"
                >{{ $t("startup.nextStep") }}
                </el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </template>
      <template v-if="activeIndex === 2">
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
                  <el-form-item
                    :show-message="false"
                    prop="siteName">
                    <fox-input
                      shrink
                      v-model="entity.siteName"
                      :placeholder="$t('startup.entity.siteName.label')"
                      :description="$t('startup.entity.siteName.placeholder')"
                      show-word-limit
                      maxlength="50"
                    ></fox-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <fox-form-item
                    :show-message="false"
                    prop="langCode">
                    <fox-select
                      shrink
                      :placeholder="$t('startup.entity.langCode.label')"
                      :description="$t('startup.entity.langCode.placeholder')"
                      v-model="entity.langCode"
                      filterable
                      @change="langChange"
                    >
                      <el-option
                        v-for="item in area.language"
                        :key="item.code"
                        :label="`${item.languageName} - ${item.nativeName}`"
                        :value="item.code"
                      >
                        {{ item.languageName }} - {{ item.nativeName }}
                      </el-option>
                    </fox-select>
                  </fox-form-item>
                </el-col>
              </el-row>
              <div class="create-site-info">
                <h3>{{ $t("startup.original") }}</h3>
                <div class="create-site-browser">
                  <el-row>
                    <el-col
                      :span="4"
                      class="text-center">
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
                  <li
                    v-for="(o, index) in $t('startup.tips')"
                    :key="index"
                    v-html="o">{{ o }}
                  </li>
                </ul>
              </div>
            </div>
          </el-form>
        </div>

        <div class="create-site-footer">
          <div class="container">
            <el-row :gutter="40">
              <el-col :span="12">
                <a
                  class="text-primary el-button el-button--text"
                  href="/">
                  <i class="el-icon-d-arrow-left"></i>
                  {{ $t("startup.mySites") }}
                </a>
              </el-col>
              <el-col
                :span="12"
                class="text-right">
                <el-button
                  @click="stepChange(1, 0)"
                  type="text"
                  icon="el-icon-arrow-left">
                  {{ $t("startup.prevStep") }}
                </el-button>
                <el-button
                  :loading="loading"
                  type="primary"
                  @click="formValidation('ruleForm')"
                >{{ $t("startup.create") }}
                </el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import { fetchBaseLanguage } from '@/plugins/api/core'
import { fetchDomainRepeatability, fetchCreate, fetchTrialCheck } from '@/plugins/api/site'
import { fetchThemeTag, fetchTheme } from '@/plugins/api/assembler'
import {
  mapMutations
} from 'vuex'

export default {
  name: 'createSite',
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
            if (result['success']) {
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
      dataset: [],
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
        ],
        siteName: [
          {
            required: true,
            message: this.$t('startup.entity.siteName.required'),
            trigger: 'blur'
          }
        ]
      },
      area: {
        states: [],
        province: [],
        city: [],
        language: []
      },
      activeIndex: 0,
      tagList: [],
      tagId: '',
      themeModel: {},
      canCreate: false
    }
  },
  watch: {
    entity: {
      deep: true,
      handler () {
        this.unsaved = true
      }
    }
  },
  created () {
    this.trialCheck()
  },
  methods: {
    ...mapMutations(['setMySite', 'setSiteModel', 'setMerchantModel']),
    /**
     * 登录
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
              this.redirectURL('/dashboard')
            } else {
              this.canCreate = true
              this.getLanguage()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 站点类型选择
     * @param index
     */
    selectedSite (index) {
      this.entity.siteType = index
    },
    /**
     * 主题选择
     */
    themeSelected (o) {
      this.entity.themeId = o.id
      this.themeModel = o
    },
    /**
     * 上下一步
     */
    stepChange (index, nextStep) {
      if (index === 0) {
        this.entity.themeId = ''
        this.tagId = ''
        this.activeIndex = nextStep
        this.getLanguage()
        this.getTags()
        this.getTemplate()
      } else if (index === 1 && nextStep === 2) {
        if (this.utility.isEmpty(this.entity.themeId)) {
          this.$message({
            type: 'error',
            message: this.$t('startup.empty').toString()
          })
        } else {
          this.activeIndex = nextStep
        }
      } else if (index === 1 && nextStep === 0) {
        this.activeIndex = nextStep
      } else if (index === 2 && nextStep === 1) {
        this.activeIndex = nextStep
      }
    },
    /**
     * URL blur 事件
     */
    urlBlur () {
      this.entity.domain = this.utility.urlFilter(this.entity.domain)
    },
    /**
     * 按分类搜索
     */
    tagsChange (id) {
      this.tagId = id
      this.getTemplate()
    },
    /**
     * 模版
     */
    getTemplate () {
      fetchTheme({
        current: 1,
        orderBy: '',
        size: 40,
        params: {
          siteType: this.entity.siteType,
          tagId: this.tagId || ''
        }
      })
        .then(result => {
          this.resultMessage(result, success => {
            if (success) {
              this.dataset = [
                {
                  id: 'fo-startup-initial',
                  demoUrl: '',
                  name: this.$t('startup.initial').toString(),
                  screenshot: '/css/img/design.png',
                  updateTime: 1624585419331,
                  version: '0.01'
                }
              ]
              this.dataset = this.dataset.concat(result.data.records)
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 语言
     */
    getLanguage () {
      if (this.area.language.length > 0) {
        return false
      }
      fetchBaseLanguage()
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.area.language = result.data
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 语言名称
     * @param value
     */
    langChange (value) {
      let s = this.area.language.filter((o) => {
        return o.code === value
      })
      if (s.length > 0) {
        this.entity.langName = s[0].nativeName
      }
    },
    /**
     * 模版标签
     */
    getTags () {
      if (this.tagList.length > 0) {
        return false
      }
      fetchThemeTag()
        .then(result => {
          this.resultMessage(result, success => {
            if (success) {
              this.tagList = result.data
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 提交数据
     * @param formName
     */
    formValidation (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          if (this.entity.themeId === 'fo-startup-initial') {
            this.entity.themeId = ''
          }
          fetchCreate(this.entity)
            .then(result => {
              this.resultMessage((result), (success) => {
                if (success) {
                  this.$message({
                    type: 'success',
                    message: this.$t('startup.success').toString()
                  })
                  this.setCache()
                }
              })
            })
            .catch(error => {
              this.networkMistake(error)
            })
        }
      })
    },
    setCache () {
      this.getMySite((data) => {
        this.ownedSite(data)
      })
    },
    /**
     * 我的站点
     * @param data
     */
    ownedSite (data) {
      if (data.length > 0) {
        this.setMySite(data)
        this.setSiteModel(data[0])
        this.redirectURL('/dashboard')
      }
    },
    logout () {
      this.setMerchantModel({
        avatar: '',
        firstName: '',
        lastName: '',
        name: '',
        token: '',
        shortForm: ''
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
      this.redirectURL('/passport')
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
