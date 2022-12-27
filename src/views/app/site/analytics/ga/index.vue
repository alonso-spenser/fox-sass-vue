<template>
  <main>
    <fo-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
    >
      <fo-page-header></fo-page-header>
      <el-descriptions
        class="no-gutter"
        :column="1"
        :label-style="{width: '100px'}"
        border
      >
        <small
          class="text-secondary"
          slot="title">
          我们将获取GA的数据，并且以简单明了的方式展示给您，您不再需要登录GA后台去查看繁琐而且乏味的数据。
        </small>
        <el-descriptions-item label="第一步">
          <span class="text-secondary mr-5">为网站添加 Google Analytics 追踪代码</span>
          <el-link
            href="https://admin.fomille.com/support/page-1163371572317757442.html"
            type="primary"
            target="_blank">如何添加？
          </el-link>
        </el-descriptions-item>
        <el-descriptions-item label="第二步">
          <span class="text-secondary mr-5">绑定 Google Analytics 数据视图ID</span>
          <el-link
            href="https://admin.fomille.com/support/page-1199891480274219010.html"
            type="primary"
            target="_blank">如何设置？
          </el-link>
        </el-descriptions-item>
        <el-descriptions-item label="授权邮箱">
          <b>{{ !entity.viewId && gaAccount.id ? gaAccount.gmail : entity.gmail }}</b>
          <label
            class="ml-3 text-secondary"
            v-if="!entity.viewId && gaAccount.id">[ 阅读和分析 ] 权限</label>
        </el-descriptions-item>
        <el-descriptions-item label="数据视图ID">
          <span class="text-secondary">{{ entity.viewId || '未设置' }}</span>
          <el-button
            class="ml-4"
            type="text"
            @click="() => entity.viewId ? unBindGA() : setViewId()"
          >{{ entity.viewId ? '解绑' : '绑定' }}
          </el-button>
        </el-descriptions-item>
      </el-descriptions>
    </fo-page-loading>
  </main>
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
      this.$prompt('请输入数据视图ID', '绑定视图', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        inputPlaceholder: '请输入数据视图ID',
        inputPattern: /^[A-Za-z0-9]{2,50}$/,
        inputErrorMessage: '数据视图ID格式不正确'
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
        '解除绑定将移除数据视图ID ，并清除已同步的数据。您确定要解绑吗？',
        '解绑',
        {
          confirmButtonText: '解绑',
          cancelButtonText: '取消',
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
