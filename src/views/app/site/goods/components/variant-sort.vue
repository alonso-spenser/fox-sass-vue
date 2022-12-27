<template>
  <el-dialog title="调整排序" width="800px" :visible.sync="display" :before-close="dialogClose">
    <div class="variant-sort-dialog-content" v-loading="loading">
      <el-row :gutter="40">
        <el-col :span="4">{{ $t("variant.entity.name.label") }}</el-col>
        <el-col :span="18">{{ $t("variant.entity.value.label") }}</el-col>
      </el-row>
      <draggable tag="div" :list="variantList" handle=".handle">
        <el-row
          :gutter="20"
          class="mt-5"
          v-for="(variant, index) in variantList"
          :key="variant.id"
        >
          <el-col :span="4">
            <el-button
              class="handle"
              :class="`variant-name variant-name__${index + 1}`"
            >
<!--              <i class="el-icon-rank"></i>-->
              {{ variant.variantName }}
            </el-button>
          </el-col>
          <el-col :span="18">
            <draggable tag="div" :list="variant.valueList" handle=".subHandle">
              <el-button
                class="subHandle variant-value"
                :class="`variant-value__${index + 1}`"
                type="primary"
                v-for="value in variant.valueList"
                :key="value.id"
              >
<!--                <i class="el-icon-rank float-right"></i>-->
                {{ value.variantValue }}
              </el-button>
            </draggable>
          </el-col>
        </el-row>
      </draggable>
    </div>
    <div slot="footer" class="dialog-footer">
      <small class="text-warning mr-5">
        拖动属性名或属性值进行排序调整
      </small>
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary" @click="goodsVariantResort" :loading="submitLoading"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/base'
import draggable from 'vuedraggable'
import { fetchGoodsVariantList, fetchGoodsVariantResort } from '@/plugins/api/goods'

export default {
  name: 'variant-sort',
  extends: extend,
  components: {
    draggable
  },
  data () {
    return {
      variantList: [],
      loading: false,
      submitLoading: false
    }
  },
  props: {
    display: {
      type: Boolean,
      default: false
    },
    /**
     * SPU ID
     */
    spuId: {
      type: String,
      default: ''
    }
  },
  watch: {
    display (val) {
      if (val) {
        this.goodsVariantFind()
      }
    },
    $route (val) {
      this.id = val.params.id
    }
  },
  created () {
    if (this.id) {
      // this.goodsVariantFind()
    }
  },
  methods: {
    /**
     * 关闭弹窗
     */
    dialogClose () {
      this.$emit('close')
      this.$emit('update:display', false)
    },
    /**
     * 变体排序-查找变体列表
     */
    goodsVariantFind () {
      this.loading = true
      fetchGoodsVariantList({
        id: this.id
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.variantList = result.data
            }
          })
        })
        .catch(error => this.networkMistake(error))
        .finally(() => (this.loading = false))
    },
    /**
     * 变体排序-变体重新排序
     * @returns {*}
     */
    goodsVariantResort () {
      this.submitLoading = true
      fetchGoodsVariantResort({
        spuId: this.id,
        variantList: this.variantList
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.dialogClose()
            }
          })
        })
        .catch(error => this.networkMistake(error))
        .finally(() => (this.submitLoading = false))
    }
  }
}
</script>

<style lang="scss">
.variant-sort-dialog-content {
  min-height: 200px;
  .variant-name {
    cursor: move;

    &__1 {
      color: #29bc94;
    }
    &__2 {
      color: #763eaf;
    }
    &__3 {
      color: #ff9517;
    }
  }
  .variant-value {
    color: #ffffff;
    cursor: move;
    &__1 {
      background: #29bc94;
      border-color: #29bc94;
    }
    &__2 {
      background: #763eaf;
      border-color: #763eaf;
    }
    &__3 {
      background: #ff9517;
      border-color: #ff9517;
    }
  }
}
</style>
