<template>
  <fo-page-loading
    :loading="pageLoading"
    :invalid="pageIsValid"
  >
    <el-card
      shadow="hover" class="order"
      :key="dataset.id"
    >
      <el-row
        slot="header"
      >
        <el-col :span="6">{{ utility.timestampToDatetime(dataset.createTime)}}</el-col>
        <el-col :span="7">
          <label class="text-gray">
            订单号：
          </label>
          {{ dataset.id }}
        </el-col>
        <el-col :span="8">
          ￥{{ dataset.orderAmount.toFixed(2) }}
        </el-col>
        <el-col class="text-right" :span="3">
          {{ getState(dataset.orderState) }}
        </el-col>
      </el-row>
      <el-row
        :gutter="30"
      >
        <el-col :span="20">
          <el-row
            :gutter="30"
            v-for="(goods) in dataset.goods"
            :key="goods.id"
            class="order-item"
          >
            <el-col :span="2">
              <img
                class="el-img"
                :src="goods.goodsImage"
              >
            </el-col>
            <el-col :span="15">
              {{ goods.goodsName }}
              <p class="text-gray">
                {{ goods.skuName.replace(/,/ig, ' / ') }}
              </p>
            </el-col>
            <el-col class="" :span="5">
              ￥{{ goods.goodsSalePrice.toFixed(2) }}
              <i class="el-icon-close text-info"></i>
              {{ goods.quantity }}
            </el-col>
            <el-col :span="4">
              ￥{{ goods.amount.toFixed(2) }}
            </el-col>
          </el-row>
        </el-col>
        <el-col class="pt-4" :span="4">
          <p v-if="dataset.orderState === 0">
            <el-button size="small" round>取消订单</el-button>
            <el-button size="small" round>标记付款</el-button>
          </p>
          <p v-if="dataset.orderState === 1">
            <el-button size="small" round>发货</el-button>
          </p>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <p>
        {{ dataset.address.firstName }} {{ dataset.address.lastName }}
      </p>
      <p>
        {{ dataset.address.mobile }}
      </p>
      <p>
        {{ dataset.address.address }}
      </p>
      <p>
        {{ dataset.address.cityName }}
      </p>
      <p>
        {{ dataset.address.provinceName }}
      </p>
      <p>
        {{ dataset.address.countryName }}
      </p>
    </el-card>
  </fo-page-loading>
</template>

<script>
import {
  mapMutations
} from 'vuex'
import * as http from '@/plugins/api/order'
import extend from '@/plugins/page/base'
export default {
  name: 'mall-dashboard',
  extends: extend,
  data () {
    return {
      dataset: {},
      orderState: this.$t('orderState')
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getState (state) {
      return this.orderState[state.toString()] || ''
    },
    ...mapMutations(['setShopInfo']),
    /**
     * 创建店铺
     */
    redirectCreateShop () {
      this.$router.push(`/${this.appType.route}/${this.merchantType.route}/startup/create-site`)
    },
    /**
     * 跳转到店铺看板
     */
    redirectOverview (id) {
      this.$router.push(`/${this.appType.route}/${this.merchantType.route}/${id}/overview`)
    },
    /**
     * 获取店铺
     */
    getData () {
      http.orderDetail({
        id: this.id
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.dataset = result.data
            }
          })
        })
        .catch(error => {
          this.pageInvalid()
          this.networkMistake(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-img {
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #F2F2F2;
  padding: 1px;
  width: 100%;
  img {
    border: 1px solid red;
  }
}
</style>
