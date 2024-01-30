<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
  >
    <div class="fox-fixed-action" v-if="unsaved">
      <div class="fox-fixed-action-label">
        采集使用异步方式执行，不会直接返回结果。在采集前请测试采集规则是否正确。
      </div>
      <div class="fox-fixed-action-button">
        <el-button
          plain
          size="small"
          @click="copyRule()"
          v-show="unsaved">复制规则
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="formValidation(true)"
          v-show="unsaved"
          :loading="loading">测试
        </el-button>
        <el-button
          type="danger"
          size="small"
          @click="formValidation(false)"
          v-show="tested"
          :disabled="loading">提交采集任务
        </el-button>
      </div>
    </div>
    <div
      style="border: 1px solid red;position: fixed;right: 10px;padding: 15px;height: calc(100% - 180px);overflow-x: hidden;overflow-y: auto; width: 180px"
      v-if="tested">
      <h3>获取数据 <b class="text-danger">{{ testData.content.records }}</b> 条</h3>
      <template v-for="(item, key) in testData.content.data.model">
        <p
          v-if="key.indexOf('global') === -1 && item && item.length > 0"
          :key="key">
          <b class="text-danger">
            {{ key }}
          </b>
          {{ item }}
        </p>
      </template>
    </div>
    <el-form
      :model="entity"
      :rules="formRules"
      ref="update"
      label-width="100px"
      label-position="top"
    >
      <fox-section
        heading="基础数据"
      >
        <el-form-item
          prop="firstPage">
          <fox-input
            shrink
            v-model="entity.firstPage"
            @blur="getDomain"
            :placeholder="$t('collect.rule.update.entity.firstPage.label')"
            :description="$t('collect.rule.update.entity.firstPage.placeholder')"
          >
            <el-select
              v-model="entity.collectType"
              placeholder="请选择"
              slot="append"
              style="width: 120px;"
              @change="collectTypeChange">
              <el-option
                v-for="item in collectType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-dropdown
              @command="ruleCommand"
              slot="prepend"
              placement="bottom-start">
              <span class="dropdown-link">
                常用规则 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu
                class="layout-header-dropdown-menu"
                slot="dropdown">
                <el-dropdown-item command="paste">粘贴规则</el-dropdown-item>
                <el-dropdown-item command="bossgo">BOSS GO</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </fox-input>
        </el-form-item>
        <el-form-item
          prop="pageDetailPrefix">
          <fox-input
            shrink
            v-model="entity.pageDetailPrefix"
            :placeholder="$t('collect.rule.update.entity.pageDetailPrefix.label')"
            :description="$t('collect.rule.update.entity.pageDetailPrefix.placeholder')"
          >
          </fox-input>
        </el-form-item>
        <el-form-item
          prop="domainRoot">
          <fox-input
            shrink
            v-model="entity.domainRoot"
            :placeholder="$t('collect.rule.update.entity.domainRoot.label')"
            :description="$t('collect.rule.update.entity.domainRoot.placeholder')"
          >
          </fox-input>
        </el-form-item>
      </fox-section>
      <collection-select
        :inlay="true"
        :info-type.sync="infoType"
        v-model="entity.collectionList"
      ></collection-select>
      <fox-section
        heading="分页参数"
        v-if="entity.collectType === 0 || entity.collectType === 1">
        <el-row :gutter="20">
          <el-col :span="3">
            <el-form-item
              prop="startPage">
              <fox-input
                shrink
                v-model="entity.startPage"
                :placeholder="$t('collect.rule.update.entity.startPage.label')"
                :description="$t('collect.rule.update.entity.startPage.placeholder')"
              ></fox-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item
              prop="lastPage">
              <fox-input
                shrink
                v-model="entity.lastPage"
                :placeholder="$t('collect.rule.update.entity.lastPage.label')"
                :description="$t('collect.rule.update.entity.lastPage.placeholder')"
              ></fox-input>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item
              prop="pagingUrl">
              <fox-input
                shrink
                v-model="entity.pagingUrl"
                :placeholder="$t('collect.rule.update.entity.pagingUrl.label')"
                :description="$t('collect.rule.update.entity.pagingUrl.placeholder')"
              ></fox-input>
            </el-form-item>
          </el-col>
        </el-row>
      </fox-section>
      <el-row :gutter="20">
        <el-col :span="12">
          <fox-section
            heading="列表参数"
            v-if="entity.collectType === 0 || entity.collectType === 1">
            <el-form-item
              prop="itemSelector">
              <fox-input
                shrink
                v-model="entity.itemSelector"
                :placeholder="$t('collect.rule.update.entity.itemSelector.label')"
                :description="$t('collect.rule.update.entity.itemSelector.placeholder')"
              ></fox-input>
            </el-form-item>

            <el-form-item
              prop="itemLink">
              <fox-input
                shrink
                v-model="entity.itemLink"
                :placeholder="$t('collect.rule.update.entity.itemLink.label')"
                :description="$t('collect.rule.update.entity.itemLink.placeholder')"
              ></fox-input>
            </el-form-item>

            <el-form-item
              prop="itemTitleSelector">
              <fox-input
                shrink
                v-model="entity.itemTitleSelector"
                :placeholder="$t('collect.rule.update.entity.itemTitleSelector.label')"
                :description="$t('collect.rule.update.entity.itemTitleSelector.placeholder')"
              ></fox-input>
            </el-form-item>

            <el-form-item
              prop="itemImgSelector">
              <fox-input
                shrink
                v-model="entity.itemImgSelector"
                :placeholder="$t('collect.rule.update.entity.itemImgSelector.label')"
                :description="$t('collect.rule.update.entity.itemImgSelector.placeholder')"
              ></fox-input>
            </el-form-item>

            <el-form-item
              prop="itemImgSrcSelector">
              <fox-input
                shrink
                v-model="entity.itemImgSrcSelector"
                :placeholder="$t('collect.rule.update.entity.itemImgSrcSelector.label')"
                :description="$t('collect.rule.update.entity.itemImgSrcSelector.placeholder')"
              ></fox-input>
            </el-form-item>

            <el-row
              :gutter="20"
              style="margin-bottom: 20px">
              <el-col :span="12">
                <el-form-item
                  prop="itemImgSrcSelectorOriginal">
                  <fox-input
                    shrink
                    v-model="entity.itemImgSrcSelectorOriginal"
                    :placeholder="$t('collect.rule.update.entity.imgListSelectorOriginal.label')"
                    :description="$t('collect.rule.update.entity.imgListSelectorOriginal.placeholder')"
                  ></fox-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  prop="itemImgSrcSelectorReplacement">
                  <fox-input
                    shrink
                    v-model="entity.itemImgSrcSelectorReplacement"
                    :placeholder="$t('collect.rule.update.entity.imgListSelectorReplacement.label')"
                    :description="$t('collect.rule.update.entity.imgListSelectorReplacement.placeholder')"
                  ></fox-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item
              prop="itemSummarySelector">
              <fox-input
                shrink
                v-model="entity.itemSummarySelector"
                :placeholder="$t('collect.rule.update.entity.itemSummarySelector.label')"
                :description="$t('collect.rule.update.entity.itemSummarySelector.placeholder')"
              ></fox-input>
            </el-form-item>
          </fox-section>
          <fox-section heading="通用参数">
            <el-form-item
              prop="itemSubtitleSelector">
              <fox-input
                shrink
                v-model="entity.itemSubtitleSelector"
                :placeholder="$t('collect.rule.update.entity.itemSubtitleSelector.label')"
                :description="$t('collect.rule.update.entity.itemSubtitleSelector.placeholder')"
              ></fox-input>
            </el-form-item>

            <el-form-item
              prop="brandSelector">
              <fox-input
                shrink
                v-model="entity.brandSelector"
                :placeholder="$t('collect.rule.update.entity.brandSelector.label')"
                :description="$t('collect.rule.update.entity.brandSelector.placeholder')"
              ></fox-input>
            </el-form-item>
          </fox-section>
          <fox-section heading="时间">
            <el-form-item
              prop="timeSelector">
              <fox-input
                shrink
                v-model="entity.timeSelector"
                :placeholder="$t('collect.rule.update.entity.timeSelector.label')"
                :description="$t('collect.rule.update.entity.timeSelector.placeholder')"
              ></fox-input>
            </el-form-item>

            <el-form-item
              prop="timeFormat">
              <fox-input
                shrink
                v-model="entity.timeFormat"
                :placeholder="$t('collect.rule.update.entity.timeFormat.label')"
                :description="$t('collect.rule.update.entity.timeFormat.placeholder')"
              ></fox-input>
            </el-form-item>

            <el-form-item
              prop="timePattern">
              <fox-input
                shrink
                v-model="entity.timePattern"
                :placeholder="$t('collect.rule.update.entity.timePattern.label')"
                :description="$t('collect.rule.update.entity.timePattern.placeholder')"
              ></fox-input>
            </el-form-item>
          </fox-section>
          <fox-section heading="规格参数">
            <el-form-item
              prop="specSelectorGroup">
              <fox-input
                shrink
                v-model="entity.specSelectorGroup"
                :placeholder="$t('collect.rule.update.entity.specSelectorGroup.label')"
                :description="$t('collect.rule.update.entity.specSelectorGroup.placeholder')"
              ></fox-input>
            </el-form-item>

            <el-form-item
              prop="specTitleSelector">
              <fox-input
                shrink
                v-model="entity.specTitleSelector"
                :placeholder="$t('collect.rule.update.entity.specTitleSelector.label')"
                :description="$t('collect.rule.update.entity.specTitleSelector.placeholder')"
              ></fox-input>
            </el-form-item>

            <fox-section heading="属性值">
              <el-form-item
                prop="specSelector">
                <fox-input
                  shrink
                  v-model="entity.specSelector"
                  :placeholder="$t('collect.rule.update.entity.specSelector.label')"
                  :description="$t('collect.rule.update.entity.specSelector.placeholder')"
                ></fox-input>
              </el-form-item>

              <el-form-item
                prop="specKeySelector">
                <fox-input
                  shrink
                  v-model="entity.specKeySelector"
                  :placeholder="$t('collect.rule.update.entity.specKeySelector.label')"
                  :description="$t('collect.rule.update.entity.specKeySelector.placeholder')"
                ></fox-input>
              </el-form-item>

              <el-form-item
                prop="specValueSelector">
                <fox-input
                  shrink
                  v-model="entity.specValueSelector"
                  :placeholder="$t('collect.rule.update.entity.specValueSelector.label')"
                  :description="$t('collect.rule.update.entity.specValueSelector.placeholder')"
                ></fox-input>
              </el-form-item>
            </fox-section>
          </fox-section>
        </el-col>
        <el-col :span="12">
          <fox-section heading="详情页">
            <el-form-item
              prop="detailTitleSelector">
              <fox-input
                shrink
                v-model="entity.detailTitleSelector"
                :placeholder="$t('collect.rule.update.entity.detailTitleSelector.label')"
                :description="$t('collect.rule.update.entity.detailTitleSelector.placeholder')"
              ></fox-input>
            </el-form-item>

            <el-form-item
              prop="detailDescriptionSelector">
              <fox-input
                shrink
                v-model="entity.detailDescriptionSelector"
                :placeholder="$t('collect.rule.update.entity.detailDescriptionSelector.label')"
                :description="$t('collect.rule.update.entity.detailDescriptionSelector.placeholder')"
              ></fox-input>
            </el-form-item>

            <el-form-item
              prop="detailImgSrcSelector">
              <fox-input
                shrink
                v-model="entity.detailImgSrcSelector"
                :placeholder="$t('collect.rule.update.entity.detailImgSrcSelector.label')"
                :description="$t('collect.rule.update.entity.detailImgSrcSelector.placeholder')"
              ></fox-input>
            </el-form-item>

            <el-form-item
              prop="detailSummarySelector">
              <fox-input
                shrink
                v-model="entity.detailSummarySelector"
                :placeholder="$t('collect.rule.update.entity.detailSummarySelector.label')"
                :description="$t('collect.rule.update.entity.detailSummarySelector.placeholder')"
              ></fox-input>
            </el-form-item>

          </fox-section>

          <fox-section heading="图片组">
            <el-form-item
              prop="imgListSelector">
              <fox-input
                shrink
                v-model="entity.imgListSelector"
                :placeholder="$t('collect.rule.update.entity.imgListSelector.label')"
                :description="$t('collect.rule.update.entity.imgListSelector.placeholder')"
              ></fox-input>
            </el-form-item>
            <el-form-item
              prop="imgListSrcSelector">
              <fox-input
                shrink
                v-model="entity.imgListSrcSelector"
                :placeholder="$t('collect.rule.update.entity.imgListSrcSelector.label')"
                :description="$t('collect.rule.update.entity.imgListSrcSelector.placeholder')"
              ></fox-input>
            </el-form-item>
            <el-row
              :gutter="20"
              style="margin-bottom: 20px">
              <el-col :span="12">
                <el-form-item
                  prop="imgListSelectorOriginal">
                  <fox-input
                    shrink
                    v-model="entity.imgListSelectorOriginal"
                    :placeholder="$t('collect.rule.update.entity.imgListSelectorOriginal.label')"
                    :description="$t('collect.rule.update.entity.imgListSelectorOriginal.placeholder')"
                  ></fox-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  prop="imgListSelectorReplacement">
                  <fox-input
                    shrink
                    v-model="entity.imgListSelectorReplacement"
                    :placeholder="$t('collect.rule.update.entity.imgListSelectorReplacement.label')"
                    :description="$t('collect.rule.update.entity.imgListSelectorReplacement.placeholder')"
                  ></fox-input>
                </el-form-item>
              </el-col>
            </el-row>
          </fox-section>
          <fox-section
            heading="SKU"
            v-if="entity.collectType === 1 || entity.collectType === 3">
            <el-form-item
              prop="skuListSelector">
              <fox-input
                shrink
                v-model="entity.skuListSelector"
                :placeholder="$t('collect.rule.update.entity.skuListSelector.label')"
                :description="$t('collect.rule.update.entity.skuListSelector.placeholder')"
              ></fox-input>
            </el-form-item>

            <el-row
              :gutter="20"
              style="margin-bottom: 20px">
              <el-col :span="12">
                <el-form-item
                  prop="skuListImgSelector">
                  <fox-input
                    shrink
                    v-model="entity.skuListImgSelector"
                    :placeholder="$t('collect.rule.update.entity.skuListImgSelector.label')"
                    :description="$t('collect.rule.update.entity.skuListImgSelector.placeholder')"
                  ></fox-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  prop="skuListSrcSelector">
                  <fox-input
                    shrink
                    v-model="entity.skuListSrcSelector"
                    :placeholder="$t('collect.rule.update.entity.skuListSrcSelector.label')"
                    :description="$t('collect.rule.update.entity.skuListSrcSelector.placeholder')"
                  ></fox-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item
              prop="skuListKeySelector">
              <fox-input
                shrink
                v-model="entity.skuListKeySelector"
                :placeholder="$t('collect.rule.update.entity.skuListKeySelector.label')"
                :description="$t('collect.rule.update.entity.skuListKeySelector.placeholder')"
              ></fox-input>
            </el-form-item>
            <el-form-item
              prop="skuListValueSelector">
              <fox-input
                shrink
                v-model="entity.skuListValueSelector"
                :placeholder="$t('collect.rule.update.entity.skuListValueSelector.label')"
                :description="$t('collect.rule.update.entity.skuListValueSelector.placeholder')"
              ></fox-input>
            </el-form-item>
          </fox-section>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      title="粘帖"
      :visible.sync="copyVisible"
      width="60%"
      :fullscreen="true"
      :modal="false"
      z-index="3000"
    >
      <p style="margin-bottom: 15px">
        将已有 Schema JSON 代码粘帖到文本框
      </p>
      <fox-input
        type="textarea"
        v-model="codeJSON"
        :rows="15"
      >

      </fox-input>
      <p
        slot="footer"
        class="dialog-footer">
        <el-button @click="copyVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="pasteCode">确 定
        </el-button>
      </p>
    </el-dialog>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import ruleData from './rule'
import collectionSelect from '@/components/article/collection-select'
import copyToClipboard from 'copy-to-clipboard'

import {
  fetchCollect
} from '@/plugins/api/collect'
import {
  mapState
} from 'vuex'

export default {
  name: 'collectSpider',
  extends: extend,
  components: {
    collectionSelect
  },
  data () {
    /**
     * HTTP校验
     * @param rule
     * @param value
     * @param callback
     */
    let validateHTTP = (rule, value, callback) => {
      if (this.utility.isEmpty(value)) {
        callback()
      } else if (value.toLowerCase().indexOf('http://') === 0 || value.toLowerCase().indexOf('https://') === 0) {
        callback()
      } else {
        callback(new Error('网址开头为 http 或者 https'))
      }
    }
    /**
     * 分页URL校验
     * @param rule
     * @param value
     * @param callback
     */
    let validatePaging = (rule, value, callback) => {
      if (this.utility.isEmpty(value)) {
        callback()
      } else if ((value.toLowerCase().indexOf('http://') === 0 || value.toLowerCase().indexOf('https://') === 0) &&
        value.toLowerCase().indexOf('{page}') > -1
      ) {
        callback()
      } else if (value.toLowerCase().indexOf('http://') !== 0 && value.toLowerCase().indexOf('https://') !== 0) {
        callback(new Error('网址开头为 http 或者 https'))
      } else {
        callback(new Error('必须包含变量：{page}'))
      }
    }
    return {
      collectType: [
        {
          value: 0,
          label: '文章列表'
        },
        {
          value: 1,
          label: '产品列表'
        },
        {
          value: 2,
          label: '文章单页'
        },
        {
          value: 3,
          label: '产品单页'
        }
      ],
      entity: {
        brandSelector: '',
        detailDescriptionSelector: '',
        detailImgSrcSelector: 'src',
        detailSummarySelector: '',
        detailTitleSelector: '',
        domain: '',
        firstPage: '',
        imgListSelector: '',
        imgListSrcSelector: 'src',
        itemImgSelector: 'img',
        itemImgSrcSelector: 'src',
        itemImgSrcSelectorReplacement: '',
        itemImgSrcSelectorOriginal: '',
        itemSelector: '',
        itemSummarySelector: '',
        itemTitleSelector: '',
        lastPage: 0,
        pageDetailPrefix: '',
        pagingUrl: '',
        platformCode: '',
        siteId: '',
        skuListImgSelector: 'img',
        skuListSelector: '',
        skuListSrcSelector: 'src',
        skuListValueSelector: '',
        skuListKeySelector: '',
        specKeySelector: '',
        specSelector: '',
        specValueSelector: '',
        startPage: 0,
        title: '',
        collectType: 0,
        imgSeparator: '@',
        itemLink: 'a',
        origin: '',
        userAgent: '',
        timeFormat: 'yyyy-MM-dd',
        timePattern: '',
        itemSubtitleSelector: '',
        timeSelector: '',
        region: '',
        domainRoot: '',
        imgListSelectorOriginal: '',
        imgListSelectorReplacement: '',
        collectionList: []
      },
      formRules: {
        domainRoot: [
          {
            required: true,
            message: this.$t('collect.rule.update.entity.domainRoot.required'),
            trigger: 'blur'
          }
        ],
        detailDescriptionSelector: [
          {
            required: true,
            message: this.$t('collect.rule.update.entity.detailDescriptionSelector.required'),
            trigger: 'blur'
          }
        ],
        detailImgSrcSelector: [
          {
            required: true,
            message: this.$t('collect.rule.update.entity.detailImgSrcSelector.required'),
            trigger: 'blur'
          }
        ],
        firstPage: [
          {
            required: true,
            message: this.$t('collect.rule.update.entity.firstPage.required'),
            trigger: 'blur'
          },
          {
            validator: validateHTTP,
            trigger: 'blur'
          }
        ],
        imgListSrcSelector: [
          {
            required: true,
            message: this.$t('collect.rule.update.entity.imgListSrcSelector.required'),
            trigger: 'blur'
          }
        ],
        itemImgSelector: [
          {
            required: true,
            message: this.$t('collect.rule.update.entity.itemImgSelector.required'),
            trigger: 'blur'
          }
        ],
        itemImgSrcSelector: [
          {
            required: true,
            message: this.$t('collect.rule.update.entity.itemImgSrcSelector.required'),
            trigger: 'blur'
          }
        ],
        itemLink: [
          {
            required: true,
            message: this.$t('collect.rule.update.entity.itemLink.required'),
            trigger: 'blur'
          }
        ],
        itemSelector: [
          {
            required: true,
            message: this.$t('collect.rule.update.entity.itemSelector.required'),
            trigger: 'blur'
          }
        ],
        itemTitleSelector: [
          {
            required: true,
            message: this.$t('collect.rule.update.entity.itemTitleSelector.required'),
            trigger: 'blur'
          }
        ],
        pageDetailPrefix: [
          {
            validator: validateHTTP,
            trigger: 'blur'
          }
        ],
        pagingUrl: [
          {
            validator: validatePaging,
            trigger: 'blur'
          }
        ],
        platformCode: [
          {
            required: true,
            message: this.$t('collect.rule.update.entity.platformCode.required'),
            trigger: 'blur'
          }
        ],
        skuListSrcSelector: [
          {
            required: true,
            message: this.$t('collect.rule.update.entity.skuListSrcSelector.required'),
            trigger: 'blur'
          }
        ],
        lastPage: [
          {
            required: true,
            message: this.$t('collect.rule.update.entity.lastPage.required'),
            trigger: 'blur'
          },
          {
            pattern: this.utility.expression.IntPositive,
            message: this.$t('collect.rule.update.entity.lastPage.custom'),
            trigger: 'blur'
          }
        ],
        startPage: [
          {
            required: true,
            message: this.$t('collect.rule.update.entity.startPage.required'),
            trigger: 'blur'
          },
          {
            pattern: this.utility.expression.IntPositive,
            message: this.$t('collect.rule.update.entity.startPage.custom'),
            trigger: 'blur'
          }
        ]
      },
      tested: false,
      testData: {},
      copyVisible: false,
      codeJSON: ''
    }
  },
  computed: {
    ...mapState(['siteModel']),
    /**
     * 缓存KEY
     */
    spiderKey () {
      return `spiderKey-article-${this.siteModel.id}`
    },
    infoType () {
      return this.entity.collectType === 0 || this.entity.collectType === 2 ? 1 : 2
    }
  },
  watch: {
    entity: {
      deep: true,
      handler (val) {
        localStorage.setItem(this.spiderKey, JSON.stringify(val))
        this.unsaved = true
      }
    }
  },
  created () {
    let cache = localStorage.getItem(this.spiderKey)
    if (cache) {
      this.entity = JSON.parse(cache)
      this.entity.collectionList = []
      this.$nextTick(() => {
        this.unsaved = false
      })
    }
    if (this.id) {
      this.getDetail()
    } else {
      this.pageValid()
    }
  },
  methods: {
    /**
     * 转义JSON
     */
    pasteCode () {
      if (this.utility.isEmpty(this.codeJSON)) {
        return false
      }
      try {
        let schema = JSON.parse(this.codeJSON)
        this.entity = {
          ...schema,
          collectionList: [],
          siteId: this.siteModel.id
        }
        this.copyVisible = false
      } catch (e) {
        this.$message({
          message: 'Schema 格式错误',
          type: 'warning'
        })
      }
    },
    /**
     * 规则加载
     * @param command
     */
    ruleCommand (command) {
      switch (command) {
        case 'bossgo':
          this.entity = ruleData.bossgo
          break
        case 'paste':
          this.copyVisible = true
          break
      }
    },
    collectTypeChange () {
      this.entity.collectionList = []
    },
    /**
     * 自动算命名
     */
    getDomain () {
      if (this.utility.isNotEmpty(this.entity.firstPage) && this.entity.firstPage.indexOf('http') > -1) {
        let s = new window.URL(this.entity.firstPage)
        this.entity.domain = s.hostname
        this.entity.origin = s.origin
      }
    },
    /**
     * 上一步
     */
    previous () {
      this.$router.push('/collect/rule')
    },
    /**
     * 复制规则
     */
    copyRule () {
      let formName = 'update'
      this.$refs[formName].validate((valid, fields) => {
        if (valid) {
          copyToClipboard(JSON.stringify(this.entity))
          this.$message({
            type: 'success',
            message: '复制成功'
          })
        } else {
          this.unverified(fields)
        }
      })
    },
    /**
     * 表单校验
     */
    formValidation (test) {
      let formName = 'update'
      if (this.entity.collectionList.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择集合'
        })
        return false
      }
      this.$refs[formName].validate((valid, fields) => {
        if (valid) {
          this.entity = {
            ...this.entity,
            siteId: this.siteModel.id,
            region: this.regionCode,
            userAgent: window.navigator.userAgent
          }
          this.collectData(test)
        } else {
          this.unverified(fields)
        }
      })
    },
    /**
     * 更新数据
     */
    collectData (test) {
      this.loading = true
      fetchCollect({
        ...this.entity,
        test
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              if (test) {
                this.unsaved = true
                this.testData = result.data
                if (test && result.data.content.records > 0) {
                  this.tested = true
                  this.$message({
                    type: 'success',
                    message: '采集测试通过，请点击：提交采集任务'
                  })
                } else if (test) {
                  this.tested = false
                  this.$message({
                    type: 'error',
                    message: '采集测试未通过，请检查参数'
                  })
                }
              } else {
                this.unsaved = false
                this.tested = false
                this.$message({
                  type: 'success',
                  message: '采集任务已提交，系统会静默执行，请不要重提交，过段时间刷新地应列表查看'
                })
              }
            }
            this.loading = false
          })
        })
        .catch(error => {
          this.tested = false
          this.unsaved = false
          this.loading = false
          this.networkMistake(error)
        })
    }
  }
}
</script>
