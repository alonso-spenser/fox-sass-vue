<template>
  <fox-page-loading
    :loading="pageLoading"
    :fullScreen="true"
    :invalid="pageIsValid">
    <!--      <h3 class="page-title">-->
    <!--        <el-button-->
    <!--          @click="payJudgment"-->
    <!--          v-if="thirdDomains.length < 3"-->
    <!--          class="float-right"-->
    <!--          size="small"-->
    <!--          type="primary">-->
    <!--          {{ $t("base.operate.add") }}-->
    <!--        </el-button>-->
    <!--        {{ $t("settings.domain.title") }}-->
    <!--      </h3>-->
    <domain-list
      class="section-neighbor"
      :heading="$t('settings.domain.primary.title')"
      :subheading="$t('settings.domain.primary.content')"
      :dataset="dataset.primary"
      :domain-type="0"
      @refresh="getData"
      @bind="payJudgment"
    ></domain-list>
    <domain-list
      class="section-neighbor"
      :heading="$t('settings.domain.original.title')"
      :subheading="$t('settings.domain.original.content')"
      :dataset="dataset.initial"
      :domain-type="1"
      @refresh="getData"
    ></domain-list>
    <domain-list
      class="section-neighbor"
      :heading="$t('settings.domain.thirdParty.title')"
      :subheading="$t('settings.domain.thirdParty.content')"
      :dataset="dataset.owned"
      :domain-type="2"
      @refresh="getData"
    ></domain-list>
    <unpaid
      :visible.sync="unpaidVisible"
      :payment="true"
    >
    </unpaid>
  </fox-page-loading>
</template>

<script>
import extend from '@/plugins/page/paging'
import domainList from './components/domainList'
import unpaid from './components/unpaid'
import { fetchGetDomainList } from '@/plugins/api/settings'

export default {
  name: 'siteDomain',
  extends: extend,
  components: {
    domainList,
    unpaid
  },
  data () {
    return {
      dataset: {
        primary: [],
        initial: [],
        owned: []
      },
      unpaidVisible: false
    }
  },
  computed: {
    /**
     * 站点信息
     */
    siteModel () {
      return this.$store.state.siteModel
    }
  },
  created () {
    this.getData()
  },
  methods: {
    /**
     * 获取名数据
     */
    getData () {
      fetchGetDomainList({
        siteId: this.siteId
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.dataset = result.data
            }
          })
        })
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 付费判断
     */
    payJudgment () {
      if (this.siteModel.bindDomain) {
        this.$router.push(`/site/${this.siteId}/settings/domain/connect`)
      } else {
        this.unpaidVisible = true
      }
    },
    /**
     * 关闭付费弹窗
     * @param pay 是否点击了支付按钮
     */
    unpaidClose (pay) {
      this.unpaidVisible = false
      if (pay) {
        this.$router.push(`/site/${this.siteModel.id}/${this.siteModel.siteType + 1000}/renew`)
      }
    }
  }
}
</script>
