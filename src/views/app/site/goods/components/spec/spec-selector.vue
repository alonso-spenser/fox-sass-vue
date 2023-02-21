<template>
  <fox-section
    :heading="$t('specSelector.heading')"
    :description="$t('specSelector.subheading')"
  >

    <el-dropdown
      @command="specCommand"
      :hide-on-click="false"
      slot="header">
      <el-button
        size="mini"
        type="text"
      >
        {{ $t("specPresetSave.dropdown.label") }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="save">
          {{ $t("specPresetSave.dropdown.save") }}
        </el-dropdown-item>
        <el-dropdown-item command="select">
          {{ $t("specPresetSave.dropdown.select") }}
        </el-dropdown-item>
        <el-dropdown-item command="digit">
          {{ $t("specPresetSave.dropdown.digit") }}
        </el-dropdown-item>
        <el-dropdown-item command="manage">
          {{ $t("specPresetSave.dropdown.manage") }}
        </el-dropdown-item>
        <el-dropdown-item command="paste">
          Paste
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-row v-if="true">
      <el-col :span="6">
        &nbsp;
      </el-col>
      <el-col :span="11">
        &nbsp;
      </el-col>
      <el-col
        :span="4"
        v-if="dataset.length > 0"
        class="text-center">
        搜索 & 表头 & 数字
      </el-col>
    </el-row>
    <draggable
      handle=".el-move"
      :list="dataset"
      class="mt-3">
      <el-row
        v-for="(o, index) in dataset"
        class="spec-list"
        :key="`spec-${index}`"
        :gutter="10"
      >
        <el-col
          class="text-key"
          :span="o.leaf === 0 ? 6 : 21">
          <el-form-item
            :prop="`specList.${index}.key`"
            :rules="formRules.specKey"
          >
            <fox-input
              shrink
              size="small"
              :maxlength="o.leaf === 0 ? 32 : 255"
              show-word-limit
              :placeholder="
                          o.leaf === 0
                            ? $t('specSelector.entity.key.placeholder')
                            : $t('specSelector.entity.title.placeholder')"
              v-model="o.key"
            ></fox-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="11"
          v-if="o.leaf === 0">
          <el-form-item
            :prop="`specList.${index}.value`"
            :rules="formRules.specValue"
          >
            <fox-input
              shrink
              size="small"
              :maxlength="255"
              show-word-limit
              :placeholder="$t('specSelector.entity.value.placeholder')"
              v-model="o.value"
            ></fox-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="4"
          v-if="o.leaf === 0"
          class="text-center">
          <el-switch
            size="small"
            v-model="o.param"
            :inactive-value="1"
            :active-value="0"
            active-color="#13ce66"
            inactive-color="#ccc">
          </el-switch>
          <el-switch
            size="small"
            style="margin-left: 6px"
            v-model="o.header"
            :inactive-value="1"
            :active-value="0"
            active-color="#13ce66"
            inactive-color="#ccc">
          </el-switch>
          <el-switch
            size="small"
            style="margin-left: 6px"
            v-model="o.digit"
            :inactive-value="1"
            :active-value="0"
            active-color="#13ce66"
            inactive-color="#ccc">
          </el-switch>
        </el-col>
        <el-col
          class="text-right"
          :span="3"
          v-show="dataset.length > 1"
        >
          <el-button
            class="el-move"
            icon="el-icon-rank"
            circle
            size="small"
          ></el-button>
          <el-button
            class="no-border"
            icon="el-icon-delete"
            circle
            size="small"
            @click="removeSpec(index)"
          ></el-button>
        </el-col>
      </el-row>
    </draggable>
    <div class="mt-4">
      <el-button
        size="small"
        @click="clearSpec">
        {{ $t("specSelector.button.clear") }}
      </el-button>
      <el-button
        class="ml-4"
        size="small"
        @click="addSpec(0)">
        {{ $t("specSelector.button.item") }}
      </el-button>
      <el-button
        size="small"
        @click="addSpec(1)">
        {{ $t("specSelector.button.title") }}
      </el-button>
    </div>
    <spec-preset-save
      :spec-type="2"
      :heading="$t('specPresetSave.product.heading')"
      :subheading="$t('specPresetSave.product.subheading')"
      :display="specVisible.save"
      :dataset="dataset"
      @close="specPresetSave"
    >
    </spec-preset-save>
    <spec-preset-selector
      :spec-type="2"
      :heading="$t('specPresetSelect.heading')"
      :subheading="$t('specPresetSelect.subheading')"
      :display="specVisible.select"
      @close="specPresetSelect"
    >
    </spec-preset-selector>
    <spec-preset-manage
      :spec-type="2"
      :heading="$t('specPresetManage.heading')"
      :subheading="$t('specPresetManage.subheading')"
      :display="specVisible.manage"
      @close="specPresetManage"
    >
    </spec-preset-manage>
    <el-dialog
      :title="$t('specSelector.paste')"
      :visible.sync="specPaste.visible"
      :show-close="true"
      :close-on-click-modal="false"
      top="100px"
      width="600px"
    >
      <p>
        {{ $t('specSelector.tips') }}
        <label class="text-secondary">
          [{
          "key": "Key:",
          "value": "Value",
          "leaf": 0
          }]
        </label>
      </p>
      <el-input
        type="textarea"
        v-model="specPaste.value"></el-input>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          :loading="loading"
          type="primary"
          @click="specPasteFun"
        >
          {{ $t("base.operate.confirm") }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="参数类型转换"
      :visible.sync="specVisible.digit"
      :show-close="true"
      :close-on-click-modal="false"
      top="100px"
      width="600px"
    >
      <p>
        请输入要转换成数字的字段名，多个字段以半角逗号连接。如：Size,Resolution
      </p>
      <el-input
        type="textarea"
        v-model="digitField"></el-input>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          :loading="loading"
          type="primary"
          @click="specDigitFun"
        >
          {{ $t("base.operate.confirm") }}
        </el-button>
      </div>
    </el-dialog>
  </fox-section>
</template>

<script>
import draggable from 'vuedraggable'
import SpecPresetSave from './spec-preset-save'
import SpecPresetSelector from './spec-preset-selector'
import SpecPresetManage from './spec-preset-manage'
import extend from '@/plugins/page/base'
import { fetchGoodsFixedSpecDigit } from '@/plugins/api/goods'

/**
 * 规格参数
 */
export default {
  name: 'spec-selector',
  extends: extend,
  components: {
    draggable,
    SpecPresetSave,
    SpecPresetSelector,
    SpecPresetManage
  },
  data () {
    return {
      dataset: [],
      formRules: {
        specKey: [
          {
            required: true,
            message: '',
            trigger: 'blur'
          }
        ],
        specValue: [
          {
            required: true,
            message: ' ',
            trigger: 'blur'
          }
        ]
      },
      /**
       * 规格参数弹窗状态
       */
      specVisible: {
        /**
         * 保存预设
         */
        save: false,
        /**
         * 选择预设
         */
        select: false,
        /**
         * 管理预设
         */
        manage: false,
        /**
         * 数字转换
         */
        digit: false
      },
      specPaste: {
        visible: false,
        value: ''
      },
      digitField: ''
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
    }
  },
  created () {
    this.dataset = this.value
  },
  methods: {
    /**
     * 预设参数保存回调
     */
    specPresetSave () {
      this.specVisible.save = false
    },
    /**
     * 预设参数管理回调
     */
    specPresetManage () {
      this.specVisible.manage = false
    },
    /**
     * 从列表中选择一个预览参数
     */
    specPresetSelect (rows) {
      this.specVisible.select = false
      if (rows && rows.length > 0) {
        this.dataset = rows
      }
    },
    /**
     * 移出规格参数
     */
    removeSpec (index) {
      this.dataset.splice(index, 1)
    },
    /**
     * 清空
     */
    clearSpec () {
      this.dataset = []
    },
    /**
     * 添加规格参数
     * @param leaf
     */
    addSpec (leaf) {
      this.dataset.push({
        key: '',
        value: '',
        leaf: leaf
      })
    },
    /**
     * 预设规格参数事件
     * @param command
     */
    specCommand (command) {
      switch (command) {
        case 'save':
          this.specVisible.save = true
          break
        case 'select':
          this.specVisible.select = true
          break
        case 'manage':
          this.specVisible.manage = true
          break
        case 'paste':
          this.specPaste.visible = true
          break
        case 'digit':
          this.specVisible.digit = true
          break
      }
    },
    specPasteFun () {
      if (this.utility.isEmpty(this.specPaste.value)) {
        return false
      }
      try {
        this.dataset = JSON.parse(this.specPaste.value)
      } catch (e) {
        // console.log(e)
      }
      this.specPaste.visible = false
    },
    /**
     * 转换数字
     */
    specDigitFun () {
      if (this.utility.isEmpty(this.digitField)) {
        return
      }
      let filed = this.digitField.split(',').map((val) => {
        return val.trim()
      })
      if (filed.length === 0) {
        return
      }
      fetchGoodsFixedSpecDigit({
        ids: filed,
        siteId: this.siteId
      })
        .then(result => {
          result.options = {
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.specVisible.digit = false
              this.digitField = ''
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    }
  }
}
</script>
<style lang="scss">
.spec-list {
  .el-switch {
    margin-top: 10px;
  }

  .el-form-item__error {
    display: none !important;
  }

  .el-form-item {
    margin-bottom: 0;
  }

  .el-input-material.small {
    padding: 0.25rem 0;
  }
}
</style>
