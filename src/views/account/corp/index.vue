<template>
  <main class="editable">
    <div class="fox-page-header-editable">
      <section class="global-page-container">
        <section class="global-page-content">
          <section class="global-page-main">
            <fox-page-header></fox-page-header>
          </section>
        </section>
      </section>
    </div>
    <fox-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
    >
      <div class="global-editable-container">
        <fox-section>
          <el-form
            :model="entit"
            :rules="formRules"
            ref="profileForm"
            :hide-required-asterisk="true"
            label-position="top"
            label-width="100px"
          >
            <el-form-item
              prop="shortForm"
              :label="$t('merchant.update.entity.shortForm.label')">
              <el-input
                v-model="entit.shortForm"
                :maxlength="200"
                :placeholder="$t('merchant.update.entity.shortForm.placeholder')"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="name"
              :label="$t('merchant.update.entity.name.label')">
              <el-input
                v-model="entit.name"
                :maxlength="200"
                :placeholder="$t('merchant.update.entity.name.placeholder')"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="email"
              :label="$t('merchant.update.entity.email.label')">
              <el-input
                v-model="entit.email"
                :maxlength="100"
                type="email"
                :placeholder="$t('merchant.update.entity.email.placeholder')"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="contact"
              :label="$t('merchant.update.entity.contact.label')">
              <el-input
                v-model="entit.contact"
                :maxlength="32"
                :placeholder="$t('merchant.update.entity.contact.placeholder')"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              prop="mobile"
              :label="$t('merchant.update.entity.phone.label')">
              <el-input
                v-model="entit.mobile"
                :maxlength="32"
                :placeholder="$t('merchant.update.entity.phone.placeholder')"
              >
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('merchant.update.entity.address.label')">
              <el-row :gutter="20">
                <!--省列表-->
                <el-col :span="12">
                  <el-form-item prop="provinceId">
                    <el-select
                      filterable
                      @change="provinceChange"
                      class="w-100"
                      v-model="entit.provinceId"
                      :placeholder="$t('merchant.update.entity.provinceName.placeholder')"
                    >
                      <el-option
                        v-for="province in provinceList"
                        :key="province.id"
                        :label="province[languageName]"
                        :value="province.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!--市列表-->
                <el-col :span="12">
                  <el-form-item prop="cityId">
                    <el-select
                      filterable
                      class="w-100"
                      v-model="entit.cityId"
                      @change="changeCity"
                      :placeholder="$t('merchant.update.entity.cityName.placeholder')"
                    >
                      <el-option
                        v-for="country in cityList"
                        :key="country.id"
                        :label="country[languageName]"
                        :value="country.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item
                prop="address"
                :label="$t('merchant.update.entity.address.label')">
                <el-input
                  v-model="entit.address"
                  :placeholder="$t('merchant.update.entity.address.placeholder')"
                >
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-form>
        </fox-section>
      </div>
      <!--保存按钮-->
      <fox-unsaved
        :unsaved.sync="unsaved"
        :loading="loading"
        :height="126"
        tips=""
        @confirmed="formValidation"
      >
      </fox-unsaved>
    </fox-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import { fetchCompany, fetchUpdateCompany } from '@/plugins/api/merchant'
import { fetchBaseArea } from '@/plugins/api/core'
import {
  mapState,
  mapMutations
} from 'vuex'

export default {
  name: 'account-corp',
  extends: extend,
  data () {
    return {
      entit: {
        mobileArea: '+86',
        cityId: null,
        provinceId: null,
        address: ''
      },
      memberDetail: {},
      cityList: [],
      provinceList: [],
      hasProvince: true,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      isChange: false,
      formRules: {
        name: [
          {
            required: true,
            message: this.$t('merchant.update.entity.name.required'),
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: this.$t('merchant.update.entity.email.required'),
            trigger: 'blur'
          }
        ],
        // mobile: [
        //   {
        //     required: true,
        //     message: this.$t('merchant.update.entity.phone.required'),
        //     trigger: 'blur'
        //   }
        // ],
        // provinceId: [
        //   {
        //     required: true,
        //     message: this.$t('merchant.update.entity.provinceName.required'),
        //     trigger: 'change'
        //   }
        // ],
        // cityId: [
        //   {
        //     required: true,
        //     message: this.$t('merchant.update.entity.cityName.required'),
        //     trigger: 'change'
        //   }
        // ],
        shortForm: [
          {
            required: true,
            message: this.$t('merchant.update.entity.shortForm.required'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(['merchantModel']),
    languageName () {
      return this.regionCode === 'zh-CN' ? 'cnName' : 'enName'
    },
    avatar () {
      const { name, email } = this.entit
      return name ? name.charAt(0) : email ? email.charAt(0) : ''
    }
  },
  watch: {
    entit: {
      deep: true,
      handler () {
        this.unsaved = true
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    /**
     * 更新缓存
     */
    ...mapMutations(['setMerchantModel']),
    /**
     * 初始化
     */
    getData () {
      let countryId = '79'
      Promise.all([fetchCompany(), fetchBaseArea({ parentId: countryId })]
      ).then(res => {
        this.pageValid()
        let provinceList = res[1].data
        this.resultMessage(res[0], (success) => {
          if (success) {
            // 省市列表
            let entit = res[0].data
            // 市列表
            if (entit.cityId) {
              this.getCityList(entit.provinceId, (cityList) => {
                this.cityList = cityList
              })
            }
            this.provinceList = provinceList
            this.entit = { ...this.entit, ...entit }
            this.$nextTick(() => {
              this.unsaved = false
              this.$refs['profileForm'].clearValidate()
            })
          }
        })
      })
    },
    /**
     * 省市下选择
     */
    provinceChange (val) {
      this.entit.cityId = ''
      this.getCityList(val, (cityList) => {
        this.cityList = cityList
      })
      let s = this.provinceList.filter(data => data.id === val)
      if (s.length > 0) {
        this.entit.provinceName = this.regionCode === 'zh-CN' ? s[0].cnName || s[0].enName : s[0].enName
      }
    },
    /**
     * 市改变
     */
    changeCity (value) {
      let s = this.cityList.filter(data => data.id === value)
      if (s.length > 0) {
        this.entit.cityName = this.regionCode === 'zh-CN' ? s[0].cnName || s[0].enName : s[0].enName
      }
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'profileForm'
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateMerchant()
        }
      })
    },
    /**
     * 更新用户信息
     */
    updateMerchant () {
      this.loading = true
      delete this.entit.id
      if (!this.entit.countryId) {
        this.entit.countryId = '79'
        this.entit.countryName = '中国'
      }
      fetchUpdateCompany(this.entit).then(result => {
        result.options = {
          formName: 'update',
          action: this.actionType.update
        }
        this.resultMessage(result, (success) => {
          if (success) {
            this.setMerchantModel({
              ...this.merchantModel,
              merchant: this.entit
            })
          }
        })
      })
    },
    /**
     * 市列表
     */
    getCityList (cityId, callback) {
      if (!cityId) {
        return
      }
      fetchBaseArea({ parentId: cityId }).then(res => {
        callback(res.data)
      })
    }
  }
}
</script>
