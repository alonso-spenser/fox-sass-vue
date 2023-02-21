<template>
  <main>
    <fox-page-loading>
      <div class="avatar-content">
        <label>{{ avatar }}</label>
      </div>
      <h2 class="text-center">
        {{ $t('merchant.welcome') }} {{ merchantModel.firstName }} {{ merchantModel.lastName }}
      </h2>
      <p class="text-center text-secondary mt-5">
        {{ $t('merchant.manage') }}
      </p>
      <el-row
        :gutter="30"
        class="mt-7 list-block">
        <el-col
          :span="12"
          v-if="$checkPermission(['account-personal'])">
          <fox-section @click.native="jumpPage('personal')">
            <div>
              <h3>个人信息</h3>
              <p>管理自己的个人和联系方式，方便同事间更好的合作。</p>
            </div>
            <img src="@/assets/image/personal.png">
          </fox-section>
        </el-col>
        <el-col
          :span="12"
          v-if="$checkPermission(['account-password'])">
          <fox-section @click.native="jumpPage('password')">
            <div>
              <h3>密码修改</h3>
              <p>定期修改密码，保护您的帐户安全</p>
            </div>
            <img src="@/assets/image/password.png">
          </fox-section>
        </el-col>
        <el-col
          :span="12"
          v-if="$checkPermission(['account-corp'])">
          <fox-section @click.native="jumpPage('corp')">
            <div>
              <h3>公司信息</h3>
              <p>维护公司信息，方便客户与您沟通联系</p>
            </div>
            <img src="@/assets/image/employee.png">
          </fox-section>
        </el-col>
        <el-col
          :span="12"
          v-if="$checkPermission(['account-employee'])">
          <fox-section @click.native="jumpPage('employee')">
            <div>
              <h3>员工管理</h3>
              <p>管理员帐号、权限，让不同的员工可以管理不同的网站信息。</p>
            </div>
            <img src="@/assets/image/cloud.png">
          </fox-section>
        </el-col>
        <el-col
          :span="12"
          v-if="false">
          <fox-section @click.native="jumpPage(3)">
            <div>
              <h3>我的订单</h3>
              <p>定期修改密码，保护您的帐户安全</p>
            </div>
            <img
              src="https://www.gstatic.com/identity/boq/accountsettingsmobile/securitycheckup_green_96x96_7bebea78abf8844f14e338de252c6198.png"
              alt=""
              aria-hidden="true"
              srcset="https://www.gstatic.com/identity/boq/accountsettingsmobile/securitycheckup_green_192x192_2b3d78db2fc55198e5d4eb78e1651b2d.png 2x, https://www.gstatic.com/identity/boq/accountsettingsmobile/securitycheckup_green_288x288_37514069574075f338e812efeae3ae27.png 3x, https://www.gstatic.com/identity/boq/accountsettingsmobile/securitycheckup_green_384x384_477478004e6df1ab4dd5c68dbef3ed6c.png 4x"
              data-atf="false"
              data-iml="3131.899999976158">
          </fox-section>
        </el-col>
      </el-row>
    </fox-page-loading>
  </main>
</template>
<script>
import extend from '@/plugins/page/unsaved'
import {
  mapState,
  mapMutations
} from 'vuex'

export default {
  name: 'account-dashboard',
  extends: extend,
  data () {
    return {}
  },
  computed: {
    ...mapState(['merchantModel']),
    avatar () {
      const { firstName } = this.merchantModel
      return firstName ? firstName.charAt().toUpperCase() : ''
    }
  },
  watch: {
    profileModel: {
      deep: true,
      handler () {
        this.unsaved = true
      }
    }
  },
  created () {
  },
  methods: {
    /**
     * 更新缓存
     */
    ...mapMutations(['setMerchantModel']),
    jumpPage (url) {
      this.$router.push('/account/' + url)
    }
  }
}
</script>
<style lang="scss">
.avatar-content {
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;

  label {
    background-color: #c1c4cb;
    color: #fff;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    font-size: 40px;
    justify-content: center;
    align-items: center;
  }
}

.list-block {
  //display: flex;
  //align-content: stretch;
  .fox-section {
    height: 100%;
    margin-bottom: 30px;

    .el-card {
      height: 100%;
    }

    .el-card__body {
      display: flex;
      justify-items: center;

      div {
        flex-grow: 1;
      }

      img {
        width: 96px;
        height: 96px;
        margin-left: 30px;
      }
    }
  }
}
</style>
