<template>
  <main class="editable">
    <div class="fo-page-header-editable">
      <section class="global-page-container">
        <section class="global-page-content">
          <section class="global-page-main">
            <fo-page-header></fo-page-header>
          </section>
        </section>
      </section>
    </div>
    <fo-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
    >
      <div class="global-editable-container">
        <fo-page-section>
          <el-form
            :model="entity"
            :rules="formRules"
            ref="update"
            label-width="100px"
            label-position="top"
          >
            <el-form-item prop="avatar" :label="$t('merchant.employee.update.entity.avatar.label')">
              <fo-image-single
                v-model="entity.avatar"
                :width="180"
                :size-limit="10"
                :alt-visible="false"
                :oss-bucket="resource.ossBucket"
                :server-address="utility.uploadURL()"
                :file-folder="siteId"
              ></fo-image-single>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="firstName" :label="$t('merchant.employee.update.entity.firstName.label')">
                  <el-input
                    v-model="entity.firstName"
                    :placeholder="$t('merchant.employee.update.entity.firstName.placeholder')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="lastName" :label="$t('merchant.employee.update.entity.lastName.label')">
                  <el-input
                    v-model="entity.lastName"
                    :placeholder="$t('merchant.employee.update.entity.lastName.placeholder')"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item class="mt-5"  prop="email" :label="$t('merchant.employee.update.entity.email.label')">
              <el-input
                v-model="entity.email"
                :placeholder="$t('merchant.employee.update.entity.email.placeholder')"
              ></el-input>
            </el-form-item>
<!--            <el-form-item prop="area" label="客户区域">-->
<!--              <el-cascader-->
<!--                class="w-100"-->
<!--                v-model="entity.area"-->
<!--                :props="cascaderProps"-->
<!--                clearable-->
<!--                filterable-->
<!--                @change="cascaderChange"-->
<!--                placeholder="请选择客户所在区域"-->
<!--              ></el-cascader>-->
<!--            </el-form-item>-->
            <el-form-item prop="mobile" :label="$t('merchant.employee.update.entity.mobile.label')">
              <el-input
                v-model="entity.mobile"
                :placeholder="$t('merchant.employee.update.entity.mobile.placeholder')"
              ></el-input>
            </el-form-item>
            <el-form-item prop="phone" :label="$t('merchant.employee.update.entity.phone.label')">
              <el-input
                v-model="entity.phone"
                :placeholder="$t('merchant.employee.update.entity.phone.placeholder')"
              ></el-input>
            </el-form-item>
          </el-form>
        </fo-page-section>
      </div>
    </fo-page-loading>
    <fo-fixed-unsaved
      :unsaved.sync="unsaved"
      :loading="loading"
      tips=""
      @confirmed="formValidation"
    >
    </fo-fixed-unsaved>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import { fetchPersonal, fetchPersonalUpdate } from '@/plugins/api/merchant'
import { fetchBaseArea } from '@/plugins/api/core'
import {
  mapState,
  mapMutations
} from 'vuex'

export default {
  name: 'account-personal',
  extends: extend,
  data () {
    return {
      entity: {
        mobileArea: '+86',
        cityId: null,
        provinceId: null,
        address: ''
      },
      hasProvince: true,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      isChange: false,
      formRules: {
        mobile: [
          {
            required: true,
            message: this.$t('merchant.employee.update.entity.mobile.required'),
            trigger: 'blur'
          },
          {
            pattern: this.utility.expression.Mobile,
            message: this.$t('merchant.employee.update.entity.mobile.required'),
            trigger: 'blur'
          }
        ],
        firstName: [
          {
            required: true,
            message: this.$t('merchant.employee.update.entity.firstName.required'),
            trigger: 'blur'
          }
        ],
        lastName: [
          {
            required: true,
            message: this.$t('merchant.employee.update.entity.lastName.required'),
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: this.$t('merchant.employee.update.entity.email.required'),
            trigger: 'blur'
          }
        ]
      },
      areaList: {
        list: [],
        data: {}
      },
      cascaderProps: {
        value: 'id',
        label: 'cnName',
        lazy: true,
        lazyLoad: this.getArea
      }
    }
  },
  computed: {
    languageName () {
      return this.regionCode === 'zh-CN' ? 'cnName' : 'enName'
    },
    avatar () {
      const { name, email } = this.entity
      return name ? name.charAt(0) : email ? email.charAt(0) : ''
    },
    ...mapState(['merchantModel'])
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
    this.getData()
  },
  methods: {
    ...mapMutations(['setMerchantModel']),
    /**
     * 初始化
     */
    getData () {
      Promise.all([fetchPersonal()]
      ).then(res => {
        this.pageValid()
        this.resultMessage(res[0], (success) => {
          if (success) {
            // 省市列表
            let entity = res[0].data
            this.entity = { ...this.entity, ...entity }
            this.$nextTick(() => {
              this.unsaved = false
              this.$refs['update'].clearValidate()
            })
          }
        })
      })
    },
    /**
     * 省市区域数据
     * @param node
     * @param resolve
     * @returns {Promise<void>}
     */
    async getArea (node, resolve) {
      const { level, data = { id: 79 } } = node
      if (level === 1) {
        this.areaList.data = {}
      }
      if (level > 0) {
        this.areaList.data[level] = {
          id: data.id,
          name: data.cnName
        }
      }
      fetchBaseArea({
        level: level + 3,
        parentId: data.id
      })
        .then(res => {
          const list = (res.data || []).map(item => ({
            ...item,
            leaf: level >= 2
          }))
          this.areaList.list = list
          resolve(list)
        })
        .catch(error => console.log(error))
    },
    /**
     * 级联选择
     */
    cascaderChange (val) {
      if (val.length > 0) {
        let lastId = val[val.length - 1]
        let lastName = ''
        let list = this.areaList.list.filter((o) => {
          return o.id === lastId
        })
        if (list.length > 0) {
          lastName = list[0].cnName
          this.areaList.data[val.length] = {
            id: lastId,
            name: lastName
          }
        }
        let area = {
          '1': { id: 'countryId', label: 'countryName' },
          '2': { id: 'provinceId', label: 'provinceName' },
          '3': { id: 'cityId', label: 'cityName' }
        }
        for (let key in this.areaList.data) {
          this.entity[area[key].id] = this.areaList.data[key].id
          this.entity[area[key].label] = this.areaList.data[key].name
        }
      }
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updatePersonal()
        }
      })
    },
    /**
     * 更新用户信息
     */
    updatePersonal () {
      this.loading = true
      if (!this.entity.countryId) {
        this.entity.countryId = '79'
        this.entity.countryName = '中国'
      }
      fetchPersonalUpdate(this.entity)
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.setMerchantModel({
                ...this.merchantModel,
                avatar: this.entity.avatar,
                firstName: this.entity.firstName,
                lastName: this.entity.lastName
              })
            }
          })
        })
    }
  }
}
</script>
