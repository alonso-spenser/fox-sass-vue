<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
  >
    <el-descriptions
      class="no-gutter"
      :column="1"
      :label-style="{width: '150px'}"
      border
    >
      <small
        class="text-secondary"
        slot="title">
        {{ $t('ga.tips') }}
      </small>
      <el-descriptions-item :label="$t('ga.step1.title')">
        <span class="text-secondary mr-5">{{ $t('ga.step1.content') }}</span>
        <el-link
          href="https://admin.fomille.com/support/page-1163371572317757442.html"
          type="primary"
          target="_blank">{{ $t('ga.step1.how') }}
        </el-link>
      </el-descriptions-item>
      <el-descriptions-item :label="$t('ga.step2.title')">
        <span class="text-secondary mr-5">{{ $t('ga.step2.content') }}</span>
        <el-link
          href="https://admin.fomille.com/support/page-1199891480274219010.html"
          type="primary"
          target="_blank">{{ $t('ga.step2.how') }}
        </el-link>
      </el-descriptions-item>
      <el-descriptions-item :label="$t('ga.step3.title')">
        <b>{{ !entity.viewId && gaAccount.id ? gaAccount.gmail : entity.gmail }}</b>
        <label
          class="ml-3 text-secondary"
          v-if="!entity.viewId && gaAccount.id">{{ $t('ga.step3.content') }}</label>
      </el-descriptions-item>
      <el-descriptions-item :label="$t('ga.step4.title')">
        <span class="text-secondary">{{ entity.viewId || $t('ga.step3.not') }}</span>
        <el-button
          class="ml-4"
          type="text"
          @click="() => entity.viewId ? unBindGA() : setViewId()"
        >{{ entity.viewId ? $t('ga.step4.unbind') : $t('ga.step4.bind') }}
        </el-button>
      </el-descriptions-item>
    </el-descriptions>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/paging'
import {
  fetchSetViewId,
  fetchGetViewId,
  fetchClearViewId,
  fetchGaConfigAvailable
} from '@/plugins/api/dashboard'

export default {
  name: 'GaSettings',
  extends: extend,
  data () {
    return {
      entity: {
        gmail: '',
        viewId: ''
      },
      gaAccount: {
        id: '',
        gmail: ''
      }
    }
  },
  computed: {
    siteName () {
      return this.$store.state.siteModel.siteName
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    /**
     * 可用的GA服务帐号
     */
    gaConfigAvailable (fun) {
      fetchGaConfigAvailable()
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.gaAccount = result.data
              if (fun && typeof (fun) === 'function') {
                fun(result.data)
              }
            }
          })
        })
    },
    /**
     * GET VIEW ID
     */
    getData () {
      this.loading = true
      this.pageLoading = true
      fetchGetViewId({
        siteId: this.siteId
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, success => {
            if (success) {
              this.entity = result.data
              if (!this.entity.viewId) {
                this.gaConfigAvailable()
              }
            }
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    setViewId () {
      if (this.utility.isEmpty(this.gaAccount.id)) {
        this.gaConfigAvailable()
      }
      this.$prompt(this.$t('ga.view.content'), this.$t('ga.view.title'), {
        confirmButtonText: this.$t('base.operate.save'),
        cancelButtonText: this.$t('base.operate.cancel'),
        dangerouslyUseHTMLString: true,
        inputPlaceholder: this.$t('ga.view.content'),
        inputPattern: /^[A-Za-z0-9]{2,50}$/,
        inputErrorMessage: this.$t('ga.view.error')
      }).then(({ value }) => {
        fetchSetViewId({
          siteId: this.siteId,
          viewId: value,
          apiConfigId: this.gaAccount.id,
          owner: 0
        })
          .then(result => {
            this.resultMessage(result, (success) => {
              if (success) {
                this.entity = result.data
              }
            })
          })
      })
    },
    /**
     * 解绑ID
     */
    unBindGA () {
      this.$confirm(
        this.$t('ga.view.cancel'),
        this.$t('ga.step4.unbind'),
        {
          confirmButtonText: this.$t('ga.step4.unbind'),
          cancelButtonText: this.$t('base.operate.cancel'),
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              fetchClearViewId({
                siteId: this.siteId
              })
                .then(result => {
                  instance.confirmButtonLoading = false
                  done()
                  this.resultMessage(result, (success) => {
                    if (success) {
                      this.entity = {
                        gmail: '',
                        viewId: ''
                      }
                      this.gaConfigAvailable()
                    }
                  })
                })
            } else {
              done()
            }
          }
        }
      )
    }
  }
}
</script>
