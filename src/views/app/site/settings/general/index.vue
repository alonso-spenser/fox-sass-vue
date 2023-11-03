<template>
  <div
    v-loading="pageLoading"
  >
    <el-form
      class="site-setting-page"
      :model="entity"
      :rules="formRules"
      ref="update"
      label-width="100px"
      label-position="top"
    >
      <!--网站信息-->
      <fox-section
        :heading="$t('settings.basic.paging.title')"
        :content="$t('settings.basic.paging.desc')"
      >
        <el-row
          :gutter="20"
          class="el-form-row">
          <el-col :span="16">
            <el-form-item
              prop="siteName"
            >
              <!-- 网站名称-->
              <fox-input
                :maxlength="100"
                shrink
                show-word-limit
                v-model="entity.siteName"
                :placeholder="$t('settings.basic.entity.title.label')"
                :description="$t('settings.basic.entity.title.placeholder')"
              ></fox-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              prop="emailSender"
            >
              <fox-input
                :maxlength="50"
                shrink
                show-word-limit
                v-model="entity.emailSender"
                :placeholder="$t('settings.basic.entity.emailSender.label')"
                :description="$t('settings.basic.entity.emailSender.placeholder')"
              ></fox-input>
            </el-form-item>
          </el-col>
          <!--公司名称-->
          <el-col :span="12">
            <el-form-item
              prop="company"
            >
              <fox-input
                :maxlength="64"
                shrink
                show-word-limit
                v-model="entity.company"
                :placeholder="$t('settings.basic.entity.company.label')"
                :description="$t('settings.basic.entity.company.placeholder')"
              ></fox-input>
            </el-form-item>
          </el-col>
          <!--附加标题-->
          <el-col :span="12">
            <el-form-item
              prop="addOnHeader"
            >
              <fox-input
                :maxlength="50"
                shrink
                show-word-limit
                v-model="entity.addOnHeader"
                :placeholder="$t('settings.basic.entity.addOnHeader.label')"
                :description="$t('settings.basic.entity.addOnHeader.placeholder')"
              ></fox-input>
            </el-form-item>
          </el-col>
          <!--400电话-->
          <el-col :span="12">
            <el-form-item
              prop="freePhone"
            >
              <fox-input
                :maxlength="32"
                shrink
                show-word-limit
                v-model="entity.freePhone"
                :placeholder="$t('settings.basic.entity.freePhone.label')"
                :description="$t('settings.basic.entity.freePhone.placeholder')"
              ></fox-input>
            </el-form-item>
          </el-col>
          <!--手机？？-->
          <el-col :span="12">
            <el-form-item
              prop="mobile"
            >
              <fox-input
                :maxlength="32"
                shrink
                show-word-limit
                v-model="entity.mobile"
                :placeholder="$t('settings.basic.entity.mobile.label')"
                :description="$t('settings.basic.entity.mobile.placeholder')"
              ></fox-input>
            </el-form-item>
          </el-col>
          <!--邮箱-->
          <el-col :span="12">
            <el-form-item
              prop="email"
            >
              <fox-input
                shrink
                maxlength="64"
                show-word-limit
                v-model="entity.email"
                :placeholder="$t('settings.basic.entity.email.label')"
                :description="$t('settings.basic.entity.email.placeholder')"
              ></fox-input>
            </el-form-item>
          </el-col>
          <!--联系电话-->
          <el-col :span="12">
            <el-form-item
              prop="phone"
            >
              <fox-input
                shrink
                :maxlength="32"
                show-word-limit
                v-model="entity.phone"
                :placeholder="$t('settings.basic.entity.phone.label')"
                :description="$t('settings.basic.entity.phone.placeholder')"
              ></fox-input>
            </el-form-item>
          </el-col>
          <!--联系人-->
          <el-col :span="12">
            <el-form-item
              prop="contact"
            >
              <fox-input
                maxlength="64"
                show-word-limit
                shrink
                v-model="entity.contact"
                :placeholder="$t('settings.basic.entity.contact.label')"
                :description="$t('settings.basic.entity.contact.placeholder')"
              ></fox-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--地址-->
        <el-form-item :label="$t('settings.basic.entity.location.label')">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item prop="countryId">
                <!--国家-->
                <el-select
                  filterable
                  class="w-100"
                  v-model="entity.countryId"
                  @change="changeState"
                  :placeholder="$t('base.placeholder.select')"
                >
                  <el-option
                    v-for="item in area.states"
                    :key="item.id"
                    :label="
                      `${
                        language === 'zh-CN'
                          ? item.cnName || item.enName
                          : item.enName
                      }`
                    "
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <!--省-->
              <el-form-item prop="provinceId">
                <el-select
                  filterable
                  v-model="entity.provinceId"
                  class="w-100"
                  @change="changeProvince"
                  :placeholder="$t('base.placeholder.select')"
                >
                  <el-option
                    v-for="item in area.province"
                    :key="item.id"
                    :label="
                      `${
                        language === 'zh-CN'
                          ? item.cnName || item.enName
                          : item.enName
                      }`
                    "
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="4"
              v-if="displayCity">
              <el-form-item prop="cityId">
                <el-select
                  filterable
                  v-model="entity.cityId"
                  class="w-100"
                  @change="changeCity"
                  :placeholder="$t('base.placeholder.select')"
                >
                  <el-option
                    v-for="item in area.city"
                    :key="item.id"
                    :label="
                      `${
                        language === 'zh-CN'
                          ? item.cnName || item.enName
                          : item.enName
                      }`
                    "
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item
          prop="address"
        >
          <fox-input
            shrink
            :maxlength="200"
            show-word-limit
            v-model="entity.address"
            :placeholder="$t('settings.basic.entity.address.label')"
            :description="$t('settings.basic.entity.address.placeholder')"
          ></fox-input>
        </el-form-item>
      </fox-section>

      <fox-section
        :heading="$t('settings.basic.map.title')"
      >
        <el-form-item :label="$t('settings.basic.entity.coordinate.label')">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item>
                <el-select
                  v-model="entity.addressType"
                  class="w-100"
                  :placeholder="$t('base.placeholder.select')"
                >
                  <el-option
                    v-for="(item,index) in $t('settings.basic.map.searchSelect')"
                    :label="item.label"
                    :value="item.value"
                    :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="20"
              v-show="entity.addressType === 1">
              <el-input
                v-model="searchAddress"
                maxlength="200"
                :placeholder="$t('settings.basic.entity.coordinate.placeholder')"
              ></el-input>
            </el-col>
            <el-col
              :span="6"
              v-show="entity.addressType === 2">
              <div class="form-item-wrap">
                <span class="label">{{ $t('settings.basic.entity.longitude.label') }}</span>
                <el-form-item prop="longitude">
                  <el-input
                    v-model.number="entity.longitude"
                    :placeholder="
                      $t('settings.basic.entity.longitude.placeholder')
                    "
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col
              :span="6"
              v-show="entity.addressType === 2">
              <div class="form-item-wrap">
                <span class="label">{{ $t('settings.basic.entity.latitude.label') }}</span>
                <el-form-item prop="latitude">
                  <el-input
                    v-model.number="entity.latitude"
                    :placeholder="
                      $t('settings.basic.entity.latitude.placeholder')
                    "
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <!--<el-button type="primary" @click="setPlace">搜索</el-button>-->
            </el-col>
          </el-row>
        </el-form-item>
        <p class="text-secondary">
          {{ $t('settings.basic.map.explain.label') }}
          <label class="text-warning">{{ $t('settings.basic.map.explain.content') }}</label>
        </p>
        <p class="text-primary">
          <b>{{ $t('settings.basic.map.explain.primary') }}</b>
        </p>
        <baidu-map
          class="bm-view"
          style="width: 100%; height: 400px"
          ak="oxAlBXTuwBaGHRyiDYixTxcQp6wxG93d"
          :zoom="15"
          :center="addressCenter"
          :scroll-wheel-zoom="true"
          @ready="mapReady"
          @click="getCoordinate"
        >
          <bm-view
            class="map"
            style="width: 100%; height: 400px"></bm-view>
          <bm-markeMr
            :position="addressCenter"
            :dragging="false"
            animation="BMAP_ANIMATION_BOUNCE"></bm-markeMr>
          <bm-local-search
            :keyword="searchAddress"
            :auto-viewport="true"
            :panel="false"
            :selectFirstResult="false"
            @infohtmlset="getCoordinate"
          ></bm-local-search>
        </baidu-map>
      </fox-section>

      <fox-section
        :heading="$t('settings.basic.langAndCurrency.heading')"
        :subheading="$t('settings.basic.langAndCurrency.subheading')"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <fox-form-item prop="currencyCode">
              <fox-input
                v-model="entity.currencyCode"
                shrink
                :placeholder="$t('settings.basic.entity.currencyCode.label')"
                :description="$t('settings.basic.entity.currencyCode.placeholder')"
              ></fox-input>
            </fox-form-item>
          </el-col>
          <el-col :span="8">
            <fox-form-item prop="currencyName">
              <fox-input
                v-model="entity.currencyName"
                shrink
                :placeholder="$t('settings.basic.entity.currencyName.label')"
                :description="$t('settings.basic.entity.currencyName.placeholder')"
              ></fox-input>
            </fox-form-item>
          </el-col>
          <el-col :span="8">
            <fox-form-item prop="currencySymbol">
              <fox-input
                v-model="entity.currencySymbol"
                shrink
                :placeholder="$t('settings.basic.entity.currencySymbol.label')"
                :description="$t('settings.basic.entity.currencySymbol.placeholder')"
              ></fox-input>
            </fox-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <fox-select
            filterable
            v-model="entity.targetMarket"
            multiple
            shrink
            class="w-100"
            @change="changeMarket"
            :placeholder="$t('settings.basic.entity.targetMarket.label')"
          >
            <el-option
              v-for="item in area.states"
              :key="item.id"
              :label="`${language === 'zh-CN'? item.cnName || item.enName : item.enName}`"
              :value="language === 'zh-CN' ? item.cnName || item.enName: item.enName">
            </el-option>
          </fox-select>
        </el-form-item>
      </fox-section>

      <fox-section
        :heading="$t('settings.basic.timeAndUnit.heading')"
        :subheading="$t('settings.basic.timeAndUnit.subheading')"
      >
        <el-form-item
          filterable
          prop="timeZone"
          :label="$t('settings.basic.entity.timeZone.label')"
        >
          <el-select
            class="w-100"
            v-model="entity.timeZone"
            :placeholder="$t('settings.basic.entity.timeZone.placeholder')"
          >
            <el-option
              v-for="item in timeZone"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('settings.basic.unit.heading')">
          <el-col :span="7">
            <el-form-item
              prop="unitSystem"
              :label="$t('settings.basic.entity.unitSystem.label')"
            >
              <el-select
                class="w-100"
                @change="unitSystemChange"
                v-model="entity.unitSystem"
                :placeholder="$t('settings.basic.entity.unitSystem.placeholder')"
              >
                <el-option
                  v-for="item in unitSystem"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="7"
            :offset="1">
            <el-form-item
              prop="weightUnit"
              :label="$t('settings.basic.entity.weightUnit.label')"
            >
              <el-select
                class="w-100"
                v-model="entity.weightUnit"
                :placeholder="$t('settings.basic.entity.weightUnit.placeholder')"
              >
                <el-option
                  v-for="item in weightUnit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            :offset="1">
            <el-form-item
              prop="lengthUnit"
              :label="$t('settings.basic.entity.lengthUnit.label')"
            >
              <el-select
                class="w-100"
                v-model="entity.lengthUnit"
                :placeholder="$t('settings.basic.entity.lengthUnit.placeholder')"
              >
                <el-option
                  v-for="item in lengthUnit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
      </fox-section>

      <!--网站状态-->
      <fox-section :heading="$t('settings.basic.siteStatus.heading')">
        <el-row>
          <el-col :span="18">
            <div
              class="site-status"
              v-if="entity.state === 0">
              <p class="text-success">
                <label class="bg-success"></label>
                {{ $t("settings.basic.siteStatus.normal.label") }}
              </p>
              <p>
                {{ $t("settings.basic.siteStatus.normal.tips") }}
              </p>
            </div>
            <div
              class="site-status"
              v-if="entity.state === 1">
              <p class="text-info">
                <label class="bg-info"></label>
                {{ $t("settings.basic.siteStatus.inactive.label") }}
              </p>
              <p>
                {{ $t("settings.basic.siteStatus.inactive.tips") }}
              </p>
            </div>
            <div
              class="site-status"
              v-if="entity.state === 2">
              <p class="text-info">
                <label class="bg-info"></label>
                {{ $t("settings.basic.siteStatus.freeze.label") }}
              </p>
              <p>
                {{ $t("settings.basic.siteStatus.freeze.tips") }}
                <a
                  class="text-primary ml-6"
                  href="mailto:freeze@fomille.com"
                >freeze@fomille.com</a
                >
              </p>
            </div>
          </el-col>
          <el-col
            class="text-right"
            :span="6">
            <!--停用网站-->
            <el-button
              class="mt-4"
              :loading="stateLoading"
              @click="setSiteStatus(entity.state)"
              v-if="entity.state === 0"
            >
              {{ $t("settings.basic.siteStatus.normal.button") }}
            </el-button>
            <template v-if="entity.state === 1">
              <!-- 启用网站-->
              <el-button
                type="primary"
                :loading="stateLoading"
                class="mt-4"
                @click="setSiteStatus(entity.state)"
                v-if="siteExpired"
              >
                {{ $t("settings.basic.siteStatus.inactive.button") }}
              </el-button>
              <el-button
                type="info"
                class="mt-4"
                disabled
                v-else>
                {{ $t("settings.basic.siteStatus.inactive.expiredButton") }}
              </el-button>
            </template>
          </el-col>
        </el-row>
      </fox-section>
    </el-form>

    <!--save-->
    <fox-unsaved
      :unsaved.sync="unsaved"
      @confirmed="formValidation"
      :loading="loading"
    >
    </fox-unsaved>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { BmLocalSearch, BmView, BmMarker } from 'vue-baidu-map'
import extend from '@/plugins/page/unsaved'
import { fetchBaseArea } from '@/plugins/api/core'
import { fetchSiteBasicDetail, fetchSaveSiteBasicDetail, fetchSiteEnable, fetchSiteDisable } from '@/plugins/api/settings'

export default {
  name: 'siteSettings',
  extends: extend,
  components: {
    BaiduMap,
    BmLocalSearch,
    BmView,
    BmMarker
  },
  data () {
    return {
      entity: {
        emailSender: '',
        siteName: '',
        langId: '',
        addOnHeader: '',
        langName: '',
        currencyName: '',
        currencyId: '',
        timeZone: '',
        lengthUnit: '',
        weightUnit: '',
        unitSystem: 'metric',
        state: 2,
        freePhone: '',
        mobile: '',
        countryId: '',
        countryName: '',
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        targetMarket: [],
        addressType: 1,
        longitude: null,
        latitude: null
      },
      searchAddress: '',
      formRules: {
        email: [
          {
            required: true,
            message: this.$t('settings.basic.entity.email.required'),
            trigger: 'blur'
          },
          {
            type: 'email',
            message: this.$t('settings.basic.entity.email.custom'),
            trigger: ['blur', 'change']
          }
        ],
        siteName: [
          {
            required: true,
            message: this.$t('settings.basic.entity.title.required'),
            trigger: 'blur'
          }
        ],
        langCode: [
          {
            required: true,
            message: this.$t('settings.basic.entity.langId.required'),
            trigger: 'blur'
          }
        ],
        currencyId: [
          {
            required: true,
            message: this.$t('settings.basic.entity.currencyId.required'),
            trigger: 'blur'
          }
        ],
        timeZone: [
          {
            required: true,
            message: this.$t('settings.basic.entity.timeZone.required'),
            trigger: 'blur'
          }
        ],
        lengthUnit: [
          {
            required: true,
            message: this.$t('settings.basic.entity.lengthUnit.required'),
            trigger: 'blur'
          }
        ],
        weightUnit: [
          {
            required: true,
            message: this.$t('settings.basic.entity.weightUnit.required'),
            trigger: 'blur'
          }
        ],
        unitSystem: [
          {
            required: true,
            message: this.$t('settings.basic.entity.unitSystem.required'),
            trigger: 'blur'
          }
        ],
        cityName: [
          {
            required: true,
            message: this.$t('settings.basic.entity.cityName.required'),
            trigger: 'blur'
          }
        ],
        company: [
          {
            required: true,
            message: this.$t('settings.basic.entity.company.required'),
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: this.$t('settings.basic.entity.phone.required'),
            trigger: 'blur'
          }
        ],
        contact: [
          {
            required: true,
            message: this.$t('settings.basic.entity.contact.required'),
            trigger: 'blur'
          }
        ]
      },
      currency: [],
      timeZone: [],
      lengthUnit: [],
      weightUnit: [],
      unitSystem: [],
      stateLoading: false,
      displayCity: true,
      currencyDialogDisplay: false,
      searchKeyword: '',
      currencyRadio: '',
      area: {
        states: [],
        province: [],
        city: []
      },
      inputValue: '',
      initLoadData: true
    }
  },
  computed: {
    addressCenter () {
      const { longitude, latitude } = this.entity
      return {
        lat: latitude,
        lng: longitude
      }
    },
    siteExpired () {
      const { expiryTime = 0 } = this.entity
      return +new Date() - expiryTime
    }
  },
  watch: {
    entity: {
      deep: true,
      handler (val, old) {
        this.unsaved = true
        if (val.currencyId !== old.currencyId) {
          const currency = this.currency.find(item => item.id === val.currencyId)
          this.entity.currencySymbol = currency.symbol
        }
      }
    }
  },
  created () {
    this.timeZone = this.$t('timeZone')
    this.lengthUnit = this.$t('lengthUnit')
    this.unitSystem = this.$t('unitSystem')
    this.unitSystemChange(this.entity.unitSystem)
    this.getData()
  },
  methods: {
    /**
     * 获取经韦度
     */
    getCoordinate (data) {
      const { point: { lat, lng } } = data
      this.entity.longitude = lng
      this.entity.latitude = lat
    },
    /**
     * 地图初始加载
     */
    mapReady ({ BMap, map }) {
    },
    /**
     * 验证
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          this.updateSite()
        } else {
          this.$message({
            type: 'error',
            message: this.$t('base.formValidation.inadequate').toString()
          })
        }
      })
    },
    /**
     * 数据获取
     */

    getData () {
      Promise.all([
        // 基本详情
        fetchSiteBasicDetail({
          siteId: this.siteId,
          region: this.regionCode
        }),
        // 国家列表
        fetchBaseArea({ level: 2 })
      ]).then(res => {
        let basicDetail = res[0]
        let countryDate = res[1]
        this.resultMessage(basicDetail, success => {
          if (success) {
            this.entity = { ...this.entity, ...basicDetail.data } // 基本信息
            this.area.states = countryDate.data // 国家列表
            this.entity.targetMarket = this.utility.isEmpty(basicDetail.data.targetMarket)
              ? [] : JSON.parse(basicDetail.data.targetMarket) // 目标市场
            // 国家配置
            if (basicDetail.data.countryId === '0' || !basicDetail.data.countryId) {
              this.entity.countryId = '79'
              this.entity.countryName = '中国'
              // 获取省市
              this.getProvince('79')
            } else {
              this.entity.countryId = basicDetail.data.countryId
              this.getProvince()
            }
            // 省市配置
            if (basicDetail.data.provinceId === '0' || !basicDetail.data.provinceId) {
              this.entity.provinceId = '79000019'
              this.entity.provinceName = '广东'
              // 获取城市
              this.getCity()
            } else {
              this.entity.provinceId = basicDetail.data.provinceId
              this.getCity()
            }
            // 默认城市
            if (basicDetail.data.cityId === '0' || !basicDetail.data.cityId) {
              this.entity.cityId = '7900001607'
              this.entity.cityName = '深圳'
            }
            this.pageValid()
          }

          this.$nextTick(() => {
            this.unsaved = false
          })
        })
      }).catch((err) => {
        this.pageInvalid(err)
      })
    },

    /**
     * 当前货币
     */
    getCurrency () {
      let s = []
      if (this.entity.currencyId) {
        s = this.currency.filter(item => item.id === this.entity.currencyId)
      }
      return s
    },
    /**
     * 货币选择
     */
    currencyChange () {
      this.currencyDialogDisplay = false
      this.entity.currencyId = this.currencyRadio
    },
    /**
     * 公制/英制单位切换
     */
    unitSystemChange (value) {
      this.weightUnit =
        value === 'imperial'
          ? this.$t('imperialWeightUnit')
          : this.$t('weightUnit')
    },
    /**
     * 网站状态
     * @param status 0:启用 1:停用，2:冻结
     */
    setSiteStatus (status) {
      let heading = status === 1 ? this.$t('settings.basic.siteStatus.inactive.button') : status === 0 ? this.$t('settings.basic.siteStatus.normal.button') : ''
      let tips = status === 1 ? this.$t('settings.basic.siteStatus.inactive.affirm') : status === 0 ? this.$t('settings.basic.siteStatus.normal.affirm') : ''
      this.$confirm(tips, heading, {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        type: 'warning'
      }).then(() => {
        this.stateLoading = true
        const fetchChangeSiteState = status === 1 ? fetchSiteDisable : fetchSiteEnable
        fetchChangeSiteState({
          id: this.siteId
        })
          .then(result => {
            result.options = {
              formName: 'update',
              action: this.actionType.update,
              error: '',
              success:
                status === 1
                  ? this.$t('settings.basic.siteStatus.normal.success')
                  : this.$t('settings.basic.siteStatus.inactive.success')
            }
            this.resultMessage(result, () => {
              this.stateLoading = false
              this.entity.state = status === 1 ? 0 : 1
            })
            this.$nextTick(() => {
              console.log('===>渲染完成')
              this.unsaved = false
            })
          })
          .catch(error => {
            this.stateLoading = false
            this.networkMistake(error)
          })
      })
    },
    /**
     * 保存设置
     */
    updateSite () {
      fetchSaveSiteBasicDetail({
        ...this.entity,
        targetMarket: JSON.stringify(this.entity.targetMarket)
      }).then(result => {
        result.options = {
          formName: 'update',
          action: this.actionType.update
        }
        this.$store.state.siteModel.title = this.entity.title
        this.resultMessage(result)
      })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 国家数据
     */
    getState () {
      this.getArea(2, '', data => {
        this.area.states = data
      })
    },
    /**
     * 国家改变
     */
    changeState (value) {
      let s = this.area.states.filter(data => data.id === value)
      if (s.length > 0) {
        // 重置省区
        this.entity.provinceId = null
        this.entity.provinceName = null
        this.entity.countryName = this.language === 'zh-CN' ? s[0].cnName || s[0].enName : s[0].enName
      }
      this.getProvince()
    },
    /**
     * 省数据
     */
    getProvince () {
      if (!this.utility.isEmpty(this.entity.countryId)) {
        this.getArea(3, this.entity.countryId, data => {
          this.area.province = data
          if (this.entity.provinceId === null && this.entity.provinceName === null) {
            this.entity.provinceId = data[0].id
            this.entity.provinceName = this.language === 'zh-CN' ? data[0].cnName || data[0].enName : data[0].enName
            // 重置市区
            this.entity.cityId = null
            this.entity.cityName = null
            this.getCity()
          }
        })
      }
    },
    /**
     * 省改变
     */
    changeProvince (value) {
      let s = this.area.province.filter(data => data.id === value)
      if (s.length > 0) {
        this.entity.cityId = null
        this.entity.cityName = null
        this.entity.provinceName = this.language === 'zh-CN' ? s[0].cnName || s[0].enName : s[0].enName
      }
      this.getCity()
    },
    /**
     * 市数据
     */
    getCity () {
      let id = ''
      if (!this.utility.isEmpty(this.entity.provinceId)) {
        id = this.entity.provinceId
      } else if (this.area.province && this.area.province.length > 0) {
        id = this.area.province[0].id
        this.entity.provinceId = id
      }
      this.getArea(4, id, data => {
        this.area.city = data
        if (this.entity.cityId === null && this.entity.cityName === null) {
          if (data.length > 0) {
            this.entity.cityId = data[0].id
            this.entity.cityName =
              this.language === 'zh-CN'
                ? data[0].cnName || data[0].enName
                : data[0].enName
          } else {
            this.entity.cityName = ''
            this.entity.cityId = ''
          }
        }
        this.displayCity = data.length > 0
      })
    },
    /**
     * 市改变
     */
    changeCity (value) {
      let s = this.area.city.filter(data => data.id === value)
      if (s.length > 0) {
        this.entity.cityName =
          this.language === 'zh-CN' ? s[0].cnName || s[0].enName : s[0].enName
      }
    },
    /**
     * 目标市场
     */
    changeMarket () {
      // console.log(JSON.stringify(this.entity.targetMarket))
    },
    /**
     * 获取区域数据
     * @param level
     * @param parentId
     * @param func
     */
    getArea (level, parentId, func) {
      let query = {}
      if (!this.utility.isEmpty(parentId)) {
        query = {
          parentId: parentId
        }
      } else {
        query = {
          level: level
        }
      }
      fetchBaseArea(query).then(result => {
        if (result.success) {
          if (func && typeof func === 'function') {
            func.call(this, result.data)
          }
        }
      })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 单行点击
     * @param row
     * @param column
     * @param event
     */
    rowClick (row, column, event) {
      event.cancelBubble = true
      document.querySelector(`[data-radio='${row.id}']`).click()
    }
  }
}
</script>

<style lang="scss">
.site-setting-page {
  .form-item-wrap {
    display: flex;
    align-items: center;

    .label {
      color: #606266;
      margin-right: 10px;
    }

    .el-form-item {
      flex: auto;
    }
  }
}
</style>
