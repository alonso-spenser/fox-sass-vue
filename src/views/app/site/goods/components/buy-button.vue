<template>
  <div>
    <draggable tag="div" class="button-list" :list="dataset" handle=".icon-move">
      <div class="button-item" v-for="(item, index) in dataset" :key="index">
        <span class="title">{{ item.title }}</span>
        <span class="action-container">
          <i class="el-icon-rank icon-move"></i>
          <i class="el-icon-edit" @click="handleEdit(item)"></i>
          <i class="el-icon-delete" @click="handleDelete(index)"></i>
        </span>
      </div>
    </draggable>
    <el-button
      v-if="dataset.length <= 10"
      @click="visible=true"
      icon="el-icon-plus"
      size="small"
      class="w-100"
    ></el-button>
    <el-dialog
      :title="$t('buyButton.title')"
      :visible.sync="visible"
      :show-close="true"
      :before-close="dialogClose"
      :close-on-click-modal="false"
      top="100px"
      width="600px"
    >
      {{ $t('buyButton.subheading') }}
      <el-form :model="entity" :rules="formRules" ref="update">
        <el-form-item
          class="mt-5"
          :label="$t('buyButton.buttonLabel.label')"
          prop="title"
        >
          <el-autocomplete
            :maxlength="20"
            show-word-limit
            class="w-100"
            v-model="entity.title"
            :fetch-suggestions="querySearch"
            @select="handleSelect"
            @blur="() => entity.title = entity.title.trim()"
            :placeholder="$t('buyButton.buttonLabel.placeholder')"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item class="mt-5" :label="$t('buyButton.buttonLink.label')" prop="url">
          <el-input
            :maxlength="255"
            show-word-limit
            v-model.trim="entity.url"
            :placeholder="$t('buyButton.buttonLink.placeholder')"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogClose">
          {{ $t("base.operate.cancel") }}
        </el-button>
        <el-button
          size="small"
          :loading="loading"
          type="primary"
          @click="formValidation"
        >
          {{ $t("base.operate.save") }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import extend from '@/plugins/page/base'

/**
 * 购买按钮
 */
export default {
  name: 'buy-button',
  extends: extend,
  components: { draggable },
  data () {
    /**
     * URL 校验
     * @param rule
     * @param value
     * @param callback
     */
    let validateURL = (rule, value, callback) => {
      if (this.utility.isNotEmpty(value) && value.length > 10 && (value.indexOf('http://') > -1 || value.indexOf('https://') > -1)) {
        callback()
      } else {
        callback(new Error(this.$t('buyButton.buttonLink.custom').toString()))
      }
    }
    return {
      visible: false,
      dataset: [],
      restaurants: [
        {
          url: '',
          linkType: 'amzon',
          value: 'BUY ON AMAZON'
        },
        {
          url: '',
          linkType: 'ebay',
          value: 'BUY ON EABY'
        },
        {
          url: '',
          linkType: 'alibaba',
          value: 'BUY ON ALIBABA'
        },
        {
          url: '',
          linkType: 'aliexpress',
          value: 'BUY ON ALIEXPRESS'
        },
        {
          url: '',
          linkType: 'lazada',
          value: 'BUY ON Lazada'
        },
        {
          url: '',
          linkType: 'shopee',
          value: 'BUY ON Shopee'
        },
        {
          url: '',
          linkType: 'wish',
          value: 'BUY ON WISH'
        }
      ],
      entity: {
        url: '',
        linkType: '',
        title: ''
      },
      formRules: {
        title: [
          {
            required: true,
            message: this.$t('buyButton.buttonLabel.required'),
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            message: this.$t('buyButton.buttonLink.required'),
            trigger: 'blur'
          },
          {
            validator: validateURL,
            trigger: 'blur'
          }
        ]
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
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    value: {
      deep: true,
      handler (val) {
        this.dataset = val
      }
    },
    dataset: {
      deep: true,
      handler (val) {
        this.$emit('input', val)
      }
    },
    visible (val) {
      if (!val) {
        this.entity = {}
      }
    }
  },
  created () {
    this.dataset = this.value
  },
  methods: {
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { value, id, ...reset } = this.entity
          if (id) {
            this.dataset = this.dataset.map(item => {
              if (item.id === id) {
                item = {
                  title: value,
                  id,
                  ...reset
                }
              }
              return item
            })
          } else {
            this.dataset.push({
              ...reset,
              value
            })
          }
          this.dialogClose()
        }
      })
    },
    /**
     * 调用父级关闭事件，关闭窗体
     */
    dialogClose () {
      this.visible = false
    },
    querySearch (queryString, cb) {
      let restaurants = this.restaurants
      let results = queryString
        ? restaurants.filter(o => {
          return (
            o.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
          )
        })
        : restaurants
      cb(results)
    },
    handleSelect (item) {
      this.$refs['update'].clearValidate()
    },
    handleEdit (item) {
      this.entity = JSON.parse(JSON.stringify(item))
      this.visible = true
    },
    handleDelete (index) {
      this.dataset.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.button-list {
  margin-bottom: 20px;

  .button-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 14px;
    cursor: pointer;

    .title {
      color: #66b1ff;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .action-container {
      flex: none;
      margin-left: 10px;

      i {
        margin-left: 6px;
        cursor: pointer;

        &.icon-move {
          cursor: move;
        }
      }
    }
  }
}
</style>
