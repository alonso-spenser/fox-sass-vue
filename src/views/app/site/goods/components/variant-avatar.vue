<template>
  <el-dialog
    :title="$t(`variant.avatar.heading`)"
    :visible.sync="display"
    :show-close="true"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    top="100px"
    width="600px"
  >
    <el-row class="variant-avatar" :gutter="10">
      <el-col v-for="(o, index) in dataset" :key="`img-${index}`" :span="4">
        <div @click="selected(index, o.url)" class="variant-avatar-item">
          <el-image class="image-wrap" :src="o.url" fit="scale-down"></el-image>
          <span></span>
        </div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
<!--      <el-upload-->
<!--        class="float-left"-->
<!--        :action="datasource.upload()"-->
<!--        :show-file-list="false"-->
<!--        :limit="10"-->
<!--        :accept="'image/*'"-->
<!--        :headers="headers"-->
<!--        :data="aliyunOSS"-->
<!--        :on-success="uploadSuccess"-->
<!--        :before-upload="uploadBefore"-->
<!--      >-->
<!--        <el-button size="small">-->
<!--          {{ $t("batchUpload.button") }}-->
<!--        </el-button>-->
<!--      </el-upload>-->
      <el-button size="small" type="danger" @click="removeImage">
        {{ $t("variant.avatar.remove") }}
      </el-button>
      <el-button size="small" @click="dialogClose">
        {{ this.$t("base.operate.cancel") }}
      </el-button>
      <el-button
        size="small"
        :loading="loading"
        type="primary"
        @click="avatarUpdate"
      >
        {{ this.$t("base.operate.confirm") }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/base'

/**
 * SKU 批量商品图片设置
 */
export default {
  name: 'variant-avatar',
  extends: extend,
  data () {
    return {
      dataset: [],
      imageURL: '',
      aliyunOSS: {
        rename: true,
        dir: ''
      },
      headers: {
        token: ''
      }
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
  props: {
    display: {
      type: Boolean,
      default: false
    },
    /**
     * 默认价格
     */
    defaultValue: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    /**
     * 监控窗口显示状态
     */
    display (val) {
      if (val) {
        this.dataset = this.defaultValue
      }
    }
  },
  created () {
    this.dataset = this.defaultValue
    // this.aliyunOSS.dir = this.siteId
    // this.headers.token = this.Passport.token()
  },
  methods: {
    overflow () {
      document.body.style.overflow = ''
    },
    /**
     * 表单校验
     */
    avatarUpdate () {
      this.overflow()
      this.$emit('close', 1, this.imageURL)
    },
    /**
     * 调用父级关闭事件，关闭窗体
     */
    dialogClose () {
      this.overflow()
      this.$emit('close', 0)
    },
    /**
     * 移除图片
     */
    removeImage () {
      this.imageURL = ''
      document
        .querySelectorAll('.variant-avatar .variant-avatar-item')
        .forEach((o, i) => {
          o.classList.remove('active')
        })
      this.$emit('close', 2)
    },
    /**
     *
     * @param index
     * @param url
     */
    selected (index, url) {
      this.imageURL = url
      document
        .querySelectorAll('.variant-avatar .variant-avatar-item')
        .forEach((o, i) => {
          if (i === index) {
            o.classList.add('active')
          } else {
            o.classList.remove('active')
          }
        })
    },
    /**
     * 上传完成
     * @param result
     * @param file
     */
    uploadSuccess (result, file) {
      if (result.success) {
        this.$emit('close', 3, {
          title: '',
          url: result.data.url
        })
      }
    },
    /**
     * 上传前处理
     * @param file
     * @returns {boolean}
     */
    uploadBefore (file) {
      const isLt2M = file.size < 1024 * 1000
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 128kb')
      }
      return isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
.variant-avatar-item {
  border: 2px solid #fff;
  overflow: hidden;
  position: relative;

  .image-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 81px;
    height: 81px;
    background: #f5f7fa;
    border: 1px solid #ebeef5;
  }

  span {
    position: absolute;
    z-index: 1;
    width: 20px;
    height: 20px;
    background: url("../../../../../assets/image/checked.png") no-repeat;
    background-size: cover;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: all 0.5s;
  }

  &.active {
    border: 2px solid #189b00;

    span {
      opacity: 1;
    }
  }
}
</style>
