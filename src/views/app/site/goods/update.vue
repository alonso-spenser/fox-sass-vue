<template>
  <main>
    <fo-page-header :actions="crumbAction"></fo-page-header>
    <fo-page-loading
      :fo-page-loading="pageLoading"
      :page-is-valid="pageIsValid"
      :percentage="100"
    >
      <el-form
        :model="entity"
        :rules="formRules"
        :disabled="goodsLimited"
        ref="update"
        label-width="100px"
        label-position="top">
        <el-row :gutter="20">
          <el-col :span="18">
            <fo-page-section>
              <el-form-item
                prop="title"
                :label="`${$t('goods.update.entity.title.label')}`">
                <el-input
                  show-word-limit
                  maxlength="200"
                  v-model="entity.title"
                  @blur="setCapitalize"
                  class="small-append"
                  :placeholder="$t('goods.update.entity.title.placeholder')"
                >
                  <el-checkbox
                    v-model="autoSyncH1Title"
                    @change="setAutoSyncH1"
                    slot="append"
                    v-if="id">H1
                  </el-checkbox>
                </el-input>
              </el-form-item>
              <el-form-item prop="subtitle">
                <label class="el-form-item__label">
                  {{ $t('goods.update.entity.subtitle.label') }}
                  <small class="text-warning">
                    {{ $t('goods.update.entity.subtitle.tips') }}
                  </small>
                </label>
                <el-input
                  show-word-limit
                  type="textarea"
                  v-model="entity.subtitle"
                  maxlength="255"
                  :autosize="{ minRows: 3, maxRows: 5}"
                  :placeholder="$t('goods.update.entity.subtitle.placeholder')"
                ></el-input>
              </el-form-item>
              <el-form-item prop="summary">
                <label class="el-form-item__label">
                  {{ $t('goods.update.entity.summary.label') }}
                  <small class="text-warning">
                    {{ $t('goods.update.entity.summary.tips') }}
                  </small>
                </label>
                <el-input
                  show-word-limit
                  type="textarea"
                  v-model="entity.summary"
                  maxlength="3000"
                  :autosize="{ minRows: 3, maxRows: 5}"
                  :placeholder="$t('goods.update.entity.summary.placeholder')"
                ></el-input>
              </el-form-item>
            </fo-page-section>
            <fo-page-section
              :heading="$t('goods.update.entity.coverImage.label')"
            >
              <template slot="header">
                <el-button
                  type="text"
                  @click="loadGallery('list')"
                  icon="el-icon-picture-outline-round">
                  {{ $t('resourceSelector.lib') }}
                </el-button>
              </template>
              <fo-image-upload
                v-model="entity.imageList"
                :file-limit="10"
                :oss-bucket="resource.ossBucket"
                :server-address="resource.serviceAddress"
                :file-folder="siteId"
              ></fo-image-upload>
            </fo-page-section>
            <fo-page-section>
              <el-row :gutter="20">
                <el-col :span="4">
                  <label class="el-form-item__label">
                    {{ $t("goods.update.pricePlan") }}
                  </label>
                </el-col>
                <el-col :span="4">
                  <el-select
                    class="w-100"
                    size="small"
                    v-model="entity.priceType"
                    :placeholder="$t('base.placeholder.select')"
                  >
                    <el-option
                      :label="$t('goods.priceType')['0']"
                      :value="0"
                    >
                    </el-option>
                    <el-option
                      :label="$t('goods.priceType')['1']"
                      :value="1"
                    >
                    </el-option>
                    <el-option
                      :label="$t('goods.priceType')['2']"
                      :value="2"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="6">
                  <el-button
                    type="text"
                    v-if="entity.priceType === 2"
                    @click="ladderData.visible = true"
                  >
                    {{ $t("ladderPrice.button") }}
                    <i class="el-icon-arrow-right"></i>
                  </el-button>
                </el-col>
              </el-row>
              <el-row
                :gutter="20"
                v-if="entity.priceType === 2 && entity.ladderList.length > 0">
                <el-col :span="4">
                  <label class="el-form-item__label">
                    {{ $t('goods.update.entity.salePrice.label') }}
                  </label>
                </el-col>
                <el-col :span="8">
                  <el-table
                    border
                    :show-header="false"
                    row-class-name="ladder-price-row"
                    :data="entity.ladderList"
                    style="width: 100%">
                    <el-table-column>
                      <template slot-scope="scope">
                        ≥ {{ scope.row.minCount }}
                        {{ $t("ladderPrice.piece") }}
                      </template>
                    </el-table-column>
                    <el-table-column>
                      <template slot-scope="scope">
                        {{ siteModel.currencySymbol }}
                        {{ scope.row.price.toFixed(2) }}
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </fo-page-section>
            <fo-page-section
              :heading="$t('variant.heading')"
              :content="$t('variant.subheading')"
              v-if="entity.priceType > 0">
              <init-variant
                @variant-change="variantChange"
                :spu-code="entity.spuId"
                :price-type.sync="entity.priceType"
                :edit="isUpdateSku()"
                :image-list="entity.imageList"
                v-if="!isUpdateSku()"
              >
              </init-variant>
              <template>
                <div
                  class="text-right"
                  v-if="isUpdateSku()">
                  <el-button
                    type="text"
                    @click="displayVariantSort = true">
                    {{ $t('variant.update.sort') }}
                  </el-button>
                  <el-button
                    type="text"
                    @click="displayVariantEdit = true">
                    {{ $t('variant.update.edit') }}
                  </el-button>
                  <el-button
                    type="text"
                    @click="redirectVariant(null)">
                    {{ $t('variant.update.add') }}
                  </el-button>
                </div>
                <div
                  class="mt-3"
                  v-if="entity.priceType > 0 && entity.skuList.length > 0">
                  <label class="mr-2">
                    {{ $t("variant.quickSelect") }}
                  </label>
                  <template v-for="(item, index) in entity.variantList">
                    <label
                      v-for="(sub, subIndex) in item.valueList"
                      :key="`variant-${index}-${subIndex}`"
                      :class="`sku-color sku-color-${index}`"
                      @click="variantSelect(sub)"
                    >
                      {{ sub.variantValue }}
                    </label>
                  </template>
                </div>
                <div
                  class="fo-table"
                  v-if="entity.priceType > 0">
                  <div class="fo-table-content">
                    <el-table
                      ref="multipleTable"
                      :data="entity.skuList"
                      class="sku-table "
                      @selection-change="multiSelect"
                      @row-click="rowClick"
                      v-if="entity.skuList.length > 0"
                      max-height="769"
                    >
                      <el-table-column
                        type="selection"
                        width="55"
                        :variantChecked="variantChecked"
                      >
                      </el-table-column>
                      <el-table-column width="50">
                        <template slot-scope="scope">
                          <el-image
                            fit="scale-down"
                            :src="scope.row.skuImage || resource.image.placeholder"
                            @click="changeSkuImage(scope.$index, scope.row)"
                            style="cursor: pointer; width: 40px; height: 40px"
                          ></el-image>
                        </template>
                        <template slot="header">
                          {{ $t("goods.update.entity.skuImage.label") }}
                        </template>
                      </el-table-column>
                      <template v-if="entity.skuList && entity.skuList.length > 0">
                        <el-table-column
                          align="center"
                          v-for="(item, index) in entity.skuList[0].variantList"
                          :key="`variant-color-${index}`"
                        >
                          <template slot-scope="scope">
                            <label :class="`sku-color-${index}`">
                              {{ scope.row.variantList[index].variantValue }}
                            </label>
                          </template>
                          <label
                            slot="header"
                            :class="`sku-color-${index}`">
                            {{ item.variantName }}
                          </label>
                        </el-table-column>
                      </template>
                      <template v-for="(column, index) in skuColumns">
                        <template
                          v-if="column.input"
                        >
                          <el-table-column
                            :key="`column-header-${index}`"
                            :prop="column.prop"
                            align="center"
                            :width="column.width"
                          >
                            <template slot="header">
                              {{ column.label }}
                              <small v-if="column.addition">
                                {{ column.addition }}
                              </small>
                            </template>
                            <template slot-scope="scope">
                              <template v-if="column.prop === 'salePrice' && entity.priceType === 2">
                                <el-row
                                  class="ladder-price"
                                  :gutter="2">
                                  <template
                                    v-for="(ladder, index) in entity.ladderList"
                                  >
                                    <el-col
                                      :key="`ladder-${index}`"
                                      class="text-secondary"
                                      :span="8"
                                    >
                                      ≥ {{ ladder.minCount }}
                                    </el-col>
                                    <el-col
                                      :key="`ladder-${index}-price`"
                                      class="text-secondary"
                                      :span="16"
                                    >
                                      {{ ladder.price.toFixed(2) }}
                                    </el-col>
                                  </template>
                                </el-row>
                              </template>
                              <el-form-item
                                v-else
                                label-width="auto"
                                class="normal"
                                :prop="`skuList.${scope.$index}.${column.prop}`"
                                :rules="column.rules || []"
                              >
                                <el-input
                                  size="small"
                                  :placeholder="column.label"
                                  v-model="scope.row[column.prop]"
                                >
                                  <template
                                    slot="append"
                                    v-if="column.append">{{ column.append }}
                                  </template>
                                  <template
                                    slot="prepend"
                                    v-if="column.prepend">{{ column.prepend }}
                                  </template>
                                </el-input>
                              </el-form-item>
                            </template>
                          </el-table-column>
                        </template>
                        <el-table-column
                          :key="`column-content-${index}`"
                          :prop="column.prop"
                          align="center"
                          :width="column.width"
                          v-else
                        >
                          <template slot="header">
                            {{ column.label }}
                            <small v-if="column.addition">
                              {{ column.addition }}
                            </small>
                          </template>
                          <template slot-scope="scope">
                            <template v-if="column.button">
                              <template v-for="(btn, i) in column.group">
                                <template v-if="btn.editable">
                                  <el-button
                                    :key="i"
                                    circle
                                    :type="btn.type"
                                    :size="btn.size || 'mini'"
                                    :icon="btn.icon"
                                    :disabled="btn.disabled"
                                    :plain="btn.plain"
                                    v-if="btn.editable && scope.row.id"
                                    @click.stop="btn.onClick(scope.row, scope.$index)"
                                  >
                                  </el-button>
                                </template>
                                <el-button
                                  v-else
                                  :key="i"
                                  circle
                                  :type="btn.type"
                                  :size="btn.size || 'mini'"
                                  :icon="btn.icon"
                                  :disabled="btn.disabled"
                                  :plain="btn.plain"
                                  @click.stop="btn.onClick(scope.row, scope.$index)"
                                >
                                </el-button>
                              </template>
                            </template>
                          </template>
                        </el-table-column>
                      </template>
                    </el-table>
                    <div
                      class="bulk-operation"
                      v-show="selectedItems.length > 0">
                      <el-dropdown @command="skuActions">
                        <label class="el-dropdown-link">
                          {{ $t('base.select.multiple').toString().replace('{0}', selectedItems.length.toString()) }}
                          <i class="el-icon-arrow-down el-icon--right"></i>
                        </label>
                        <el-dropdown-menu slot="dropdown">
                          <template v-for="(o, key) in skuAction">
                            <el-dropdown-item
                              :command="key"
                              :divided="o.divided"
                              :key="`action-${key}`"
                            >
                              <i
                                v-if="o.icon"
                                :class="o.icon"></i>
                              {{ o.label }}
                            </el-dropdown-item>
                          </template>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                </div>
              </template>
            </fo-page-section>
            <fo-page-section
              :heading="$t('goods.update.entity.description.label')"
            >
              <el-form-item prop="description">
                <fo-editor
                  v-model="entity.description"
                  :file-folder="siteId"
                  model-type="full"
                  @upload="ossUpload"
                  :server-address="resource.serviceAddress"
                  :placeholder="$t('goods.update.entity.description.placeholder')"
                ></fo-editor>
              </el-form-item>
            </fo-page-section>
            <fo-page-section
              v-if="siteModel.designArticle === 0"
              :heading="designMap.dataset.imageList.data.length > 0 ? $t('goods.update.design.title') : ''"
              :content="designMap.dataset.imageList.data.length > 0 ? $t('goods.update.design.content') : ''"
            >
              <section-design
                @update="updateDesignMap"
                :value="entity.designMap"
                :visible="designVisible"
                :goods-id="entity.id"></section-design>
              <template v-if="designMap.dataset.imageList.data.length > 0">
                <template slot="header">
                  <el-button
                    round
                    size="small"
                    @click="designVisible = true"
                  >
                    {{ $t('goods.update.design.design') }}
                    <i class="el-icon-arrow-right"></i>
                  </el-button>
                </template>
                <div class="lessen">
                  <goods-preview
                    :dataset="designMap"
                    class="lessen-section"
                    v-if="!designVisible"></goods-preview>
                </div>
              </template>
              <div v-else>
                <el-row>
                  <el-col :span="18">
                    {{ $t('goods.update.design.title') }}
                    <div class="el-form-item__tips mt-2">
                      {{ $t('goods.update.design.tips') }}
                    </div>
                  </el-col>
                  <el-col
                    :span="6"
                    class="text-right">
                    <el-button
                      size="small"
                      round
                      @click="designVisible = true"
                    >
                      <i class="el-icon-arrow-right"></i>
                      {{ $t('goods.update.design.design') }}
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </fo-page-section>
            <spec-selector v-model="entity.specList"></spec-selector>
            <!--扩展属性-->
            <fo-page-section
              :heading="entity.blockList.length > 0 ? $t('goods.update.attribute.heading') : ''"
              :content="entity.blockList.length > 0 ? $t('goods.update.attribute.desc') : ''"
            >
              <template
                slot="header"
                v-if="entity.blockList.length > 0">
                <el-button
                  size="small"
                  round
                  @click="attributeTabsEdit('', 'add')"
                >
                  <i class="el-icon-plus"></i>
                  {{ $t("base.addition.button") }}
                </el-button>
              </template>
              <el-row v-if="entity.blockList.length === 0">
                <el-col :span="18">
                  {{ $t('goods.update.attribute.heading') }}
                  <div class="el-form-item__tips mt-2">
                    {{ $t('goods.update.attribute.desc') }}
                  </div>
                </el-col>
                <el-col
                  :span="6"
                  class="text-right">
                  <el-button
                    size="small"
                    round
                    @click="attributeTabsEdit('', 'add')"
                    icon="el-icon-plus">
                    {{ $t("base.addition.button") }}
                  </el-button>
                </el-col>
              </el-row>
              <el-tabs
                v-model="attributeTabsValue"
                type="card"
                closable
                v-if="entity.blockList.length > 0"
                @edit="attributeTabsEdit">
                <el-tab-pane
                  :key="item.key"
                  v-for="(item, index) in entity.blockList"
                  :label="item.blockName"
                  :name="item.id"
                >
                  <div class="attribute-tabs">
                    <el-form-item
                      :prop="`blockList.${index}.blockName`"
                      :label="$t('goods.update.attribute.title.label')"
                      :rules="formRules.specValue"
                    >
                      <el-input
                        size="small"
                        :maxlength="30"
                        show-word-limit
                        placeholder=""
                        v-model="item.blockName"
                      ></el-input>
                    </el-form-item>

                    <el-form-item
                      :label="$t('goods.update.attribute.content.label')"
                      :prop="`blockList.${index}.blockDescription`"
                    >
                      <fo-editor
                        v-model="item.blockDescription"
                        model-type="simple"
                        :file-folder="siteId"
                        :server-address="resource.serviceAddress"
                        :placeholder="$t('goods.update.entity.description.placeholder')"
                      ></fo-editor>
                    </el-form-item>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </fo-page-section>
            <search-engine-preview
              :temp-title="entity.title"
              :temp-desc="entity.description"
              :maxlength="320"
              catalog="item"
              v-model="seoEntity"
              @update="updateSEO"
            >
            </search-engine-preview>
          </el-col>
          <el-col :span="6">
            <fo-page-section>
              <div class="el-form-item">
                <div class="d-flex justify-space-between align-items-center mb-10">
                  <label class="el-form-item__label p-0">{{
                      $t('article.collection.update.entity.banner.label')
                                                         }}</label>
                  <label
                    class="text-primary cursor-pointer"
                    @click="loadGallery('qrcode')"
                    :title="$t('resourceSelector.lib')">
                    <i class="el-icon-picture-outline-round"></i>
                    <!--                    {{ $t('resourceSelector.lib') }}-->
                  </label>
                </div>
                <div class="el-form-item__content">
                  <fo-image-single
                    v-model="entity.qrcode"
                    :size-limit="10"
                    :oss-bucket="resource.ossBucket"
                    :server-address="resource.serviceAddress"
                    :file-folder="siteId"
                    :alt-visible="false"
                  ></fo-image-single>
                </div>
              </div>
            </fo-page-section>
            <!--<fo-page-section>-->
            <!--  <el-form-item :label="$t('article.update.entity.state.label')">-->
            <!--    <el-switch-->
            <!--      v-model="entity.state"-->
            <!--      active-color="#13ce66"-->
            <!--      :active-text="$t('article.update.entity.state.options.enable')"-->
            <!--      :active-value="0"-->
            <!--      inactive-color="#ff4949"-->
            <!--      :inactive-text="$t('article.update.entity.state.options.disable')"-->
            <!--      :inactive-value="1">-->
            <!--    </el-switch>-->
            <!--  </el-form-item>-->
            <!--</fo-page-section>-->
            <!--集合-->
            <collection-select
              :inlay="true"
              :info-type="resource.infoType.goods"
              v-model="entity.collectionList"
            ></collection-select>
            <!--标签-->
            <tag-select
              :inlay="true"
              :info-type="resource.infoType.goods"
              v-model="entity.tagList"
            >
            </tag-select>
            <!--附件-->
            <fo-page-section>
              <div class="goods-sub-action">
                <el-button
                  class="float-right"
                  size="small"
                  type="text"
                  @click="downloadPassVisible = true">{{ $t('site.pass.setPass') }}
                </el-button>
                <label class="el-form-item__label">
                  {{ $t('goods.update.attachment') }}
                </label>
              </div>
              <fo-attachment-upload
                v-model="entity.attachmentList"
                :oss-bucket="resource.ossBucket"
                :server-address="resource.serviceAddress"
                :file-folder="siteId"
                :down-pass="true"
                :inactive-value="1"
                :active-value="0"
                :max-size="30"
                :file-limit="30"
                :size-limit="15"
                form-prop-name="attachmentList."
              >
              </fo-attachment-upload>
            </fo-page-section>
            <fo-page-section>
              <div class="goods-sub-action">
                <label class="el-form-item__label">
                  {{ $t('buyButton.title') }}
                </label>
              </div>
              <buy-button v-model="entity.linkList"></buy-button>
            </fo-page-section>
            <fo-page-section>
              <el-form-item :label="$t('goods.update.entity.coverVideo.label')">
                <video-picker
                  v-model="entity.coverVideo">
                </video-picker>
              </el-form-item>
            </fo-page-section>
            <!--时间-->
            <fo-page-section>
              <el-form-item
                prop="createTime"
                :label="$t('goods.update.entity.createTime.label')">
                <el-date-picker
                  v-model="entity.createTime"
                  type="datetime"
                  class="w-100"
                  value-format="timestamp"
                  :placeholder="$t('goods.update.entity.createTime.placeholder')"
                >
                </el-date-picker>
              </el-form-item>
            </fo-page-section>
          </el-col>
        </el-row>
      </el-form>
      <fo-fixed-unsaved
        :unsaved.sync="unsaved"
        :loading="loading"
        @confirmed="formValidation"
      >
      </fo-fixed-unsaved>
      <!--SKU批量图片-->
      <variant-avatar
        :display="variantBatchVisible.avatar.visible"
        :default-value="entity.imageList"
        @close="variantAvatarCall"
      >
      </variant-avatar>
      <!--批量参数-->
      <variant-params
        :display="variantBatchVisible.params.visible"
        :default-value="variantBatchVisible.params.data"
        @close="variantParamsCall"
      >
      </variant-params>
      <!--变体编辑-->
      <variant-edit
        ref="variantEdit"
        :display.sync="displayVariantEdit"
        :spu-id="id"
        @close="getDetail"
        :variant="clearVariant">
      </variant-edit>
      <!--变体排序-->
      <variant-sort
        ref="variantSort"
        :spu-id="id"
        @close="getDetail"
        :display.sync="displayVariantSort"
      >
      </variant-sort>
      <ladder-price
        :rows="entity.ladderList"
        :visible="ladderData.visible"
        @close="closeLadder"
      >
      </ladder-price>
      <resource-selector
        :visible.sync="gallery.visible"
        @close="resourceSelector"
        :info-type="2"></resource-selector>
      <download-pass :visible.sync="downloadPassVisible"></download-pass>
    </fo-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import * as http from '@/plugins/api/article'
import * as goodsApi from '@/plugins/api/goods'
import InitVariant from './components/variant'
import VariantAvatar from './components/variant-avatar'
import VariantParams from './components/variant-params'
import VariantEdit from './components/variant-edit'
import VariantSort from './components/variant-sort'
import BuyButton from './components/buy-button'
import LadderPrice from './components/ladder-price'
import ResourceSelector from './components/resource-selector'
import SpecSelector from './components/spec/spec-selector'
import tagSelect from '@/components/article/tag-select'
import collectionSelect from '@/components/article/collection-select'
import SectionDesign from '@/views/app/design/components/section-design'
import goodsPreview from '@/views/app/design/components/goods/preview'
import downloadPass from '@/components/download-pass'
import videoPicker from '@/views/app/design/components/widget/video-picker'

import {
  mapState
} from 'vuex'
import { fileUpload } from '@/plugins/api/core'
import { fetchGoodsLimited } from '@/plugins/api/goods'

export default {
  name: 'goodsUpdate',
  extends: extend,
  components: {
    LadderPrice,
    InitVariant,
    VariantAvatar,
    VariantParams,
    VariantEdit,
    VariantSort,
    BuyButton,
    SpecSelector,
    collectionSelect,
    tagSelect,
    ResourceSelector,
    SectionDesign,
    goodsPreview,
    downloadPass,
    videoPicker
  },
  data () {
    /**
     * SKU ID
     * @param rule
     * @param value
     * @param callback
     */
    let validateSkuID = (rule, value, callback) => {
      let rows = this.entity.skuList.filter((o) => {
        return o.skuId === value
      })
      if (rows.length === 1) {
        callback()
      } else {
        callback(new Error(this.$t('goods.update.entity.skuId.custom').toString()))
      }
    }
    return {
      goodsLimited: false,
      entity: {
        author: '',
        coverImage: '',
        coverVideo: '',
        createTime: new Date().getTime(),
        description: '',
        infoType: 2,
        initial: '',
        qrcode: '',
        region: '',
        seoDescription: '',
        seoKeywords: '',
        seoTitle: '',
        seoUrl: '',
        seoH1: '',
        siteId: '',
        source: '',
        specification: '',
        summary: '',
        title: '',
        visibilityTime: '',
        maxPrice: 0,
        minPrice: 0,
        attachmentList: [],
        imageList: [],
        blockList: [],
        tagList: [],
        priceType: 0,
        collectionList: [],
        ladderList: [],
        subtitle: '',
        linkList: [],
        skuList: [],
        variantList: [],
        specList: [],
        designSection: '{}',
        videoList: [],
        designMap: {
          'sectionAlias': '设计详情',
          'imagePercentage': '6',
          'wideScreen': true,
          'sectionSalt': 'FvyQV3',
          'firstLayout': 'left',
          'imageScale': '21by9',
          'dataset': {
            'imageList': {
              'data': [],
              'type': 'normal'
            }
          }
        }
      },
      formRules: {
        description: [
          {
            required: true,
            message: this.$t('goods.update.entity.description.required'),
            trigger: 'blur'
          }
        ],
        coverImage: [
          {
            required: true,
            message: this.$t('goods.update.entity.coverImage.required'),
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: this.$t('goods.update.entity.title.required'),
            trigger: 'blur'
          },
          {
            validator: this.utility.expression.checkLength,
            length: 200,
            trigger: 'blur'
          }
        ],
        subtitle: [
          {
            validator: this.utility.expression.checkLength,
            length: 255,
            trigger: 'blur'
          }
        ],
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
       * SEO组件返回值实体
       */
      seoEntity: {
        description: '',
        keywords: [],
        title: '',
        url: '',
        heading: ''
      },
      /**
       * 扩展属性
       */
      attributeTabsValue: '',
      /**
       * SKU 批操作弹窗状态
       */
      variantBatchVisible: {
        /**
         * 图片设置
         */
        avatar: {
          visible: false,
          index: null
        },
        /**
         * 图片设置
         */
        params: {
          visible: false,
          data: {
            barcode: '',
            length: 0,
            width: 0,
            weight: 0,
            height: 0,
            salePrice: 0,
            vipPrice: 0,
            costPrice: 0,
            marketPrice: 0,
            lockStock: 0,
            soldStock: 0,
            surplusStock: 0,
            hsCode: '',
            shelfLife: 0
          }
        }
      },
      displayVariantSort: false,
      displayVariantEdit: false,
      /**
       * 修改时，对已存SKU数据清理
       */
      clearVariant: [],
      /**
       * SKU批操作已选中项
       */
      selectedItems: [],
      /**
       * SKU 批操作
       */
      skuAction: {
        marketPrice: {
          label: this.$t('variant.batch.params'),
          onClick: rows => {
            if (rows.length > 0) {
              this.variantBatchVisible.params.visible = true
              this.variantBatchVisible.params.data = JSON.parse(JSON.stringify(rows[0]))
            }
          }
        },
        updateImage: {
          label: this.$t('variant.batch.image'),
          onClick: rows => {
            if (rows.length > 0) {
              this.$set(this.variantBatchVisible, 'avatar', {
                visible: true,
                index: null
              })
            }
          }
        }
      },
      /**
       * SKU 表格
       */
      skuColumns: [
        {
          prop: 'salePrice',
          label: this.$t('goods.update.entity.salePrice.label'),
          width: 120,
          addition: this.$t('goods.addition.currency'),
          input: true,
          rules: [
            {
              required: true,
              message: this.$t('goods.update.entity.salePrice.required')
            },
            {
              pattern: this.utility.expression.FloatPositive,
              message: this.$t('goods.update.entity.salePrice.custom')
            }
          ]
        },
        {
          prop: 'marketPrice',
          label: this.$t('goods.update.entity.marketPrice.label'),
          width: 120,
          addition: this.$t('goods.addition.currency'),
          input: true,
          rules: [
            {
              required: true,
              message: this.$t('goods.update.entity.marketPrice.required')
            },
            {
              pattern: this.utility.expression.FloatPositive,
              message: this.$t('goods.update.entity.marketPrice.custom')
            }
          ]
        },
        {
          prop: 'surplusStock',
          label: this.$t('goods.update.entity.surplusStock.label'),
          width: 80,
          input: true,
          rules: [
            {
              required: true,
              message: this.$t('goods.update.entity.surplusStock.required')
            },
            {
              pattern: this.utility.expression.FloatPositive,
              message: this.$t('goods.update.entity.surplusStock.custom')
            }
          ]
        },
        {
          prop: 'shelfLife',
          label: this.$t('goods.update.entity.shelfLife.label'),
          width: 80,
          input: true,
          append: this.$t('goods.addition.shelfLife'),
          rules: [
            {
              required: true,
              message: this.$t('goods.update.entity.shelfLife.required')
            },
            {
              pattern: this.utility.expression.Float,
              message: this.$t('goods.update.entity.shelfLife.custom')
            }
          ]
        },
        {
          prop: 'barcode',
          label: this.$t('goods.update.entity.barcode.label'),
          width: 140,
          input: true,
          rules: []
        },
        {
          prop: 'skuId',
          label: this.$t('goods.update.entity.skuId.label'),
          width: 140,
          input: true,
          rules: [
            {
              required: true,
              message: this.$t('goods.update.entity.skuId.required')
            },
            {
              validator: validateSkuID,
              trigger: 'blur'
            }
          ]
        },
        {
          prop: 'hsCode',
          label: this.$t('goods.update.entity.hsCode.label'),
          width: 140,
          addition: '',
          input: true,
          rules: []
        },
        {
          button: true,
          label: '',
          width: 80,
          group: [
            {
              type: 'normal',
              icon: 'el-icon-edit',
              editable: true,
              disabled: false,
              onClick: (row) => {
                this.$router.push(`/site/${this.siteId}/goods/variant/${this.id}/${row.id}`)
              }
            },
            {
              type: 'normal',
              icon: 'el-icon-delete',
              disabled: false,
              onClick: (row, index) => {
                this.confirmDeleteSku([row], index)
              }
            }
          ]
        }
      ],
      /**
       * 梯价数据（包装用于v-model)
       */
      ladderData: {
        visible: false,
        dataset: []
      },
      designVisible: false,
      designMap: {
        'sectionAlias': '设计详情',
        'imagePercentage': '6',
        'wideScreen': true,
        'sectionSalt': 'FvyQV3',
        'firstLayout': 'left',
        'imageScale': '21by9',
        'dataset': {
          'imageList': {
            'data': [],
            'type': 'normal'
          }
        }
      },
      gallery: {
        visible: false,
        field: ''
      },
      downloadPassVisible: false
    }
  },
  watch: {
    entity: {
      deep: true,
      handler () {
        this.unsaved = true
      }
    }
  },
  computed: {
    /**
     * 面包屑操作
     */
    crumbAction () {
      return [
        {
          label: this.$t('base.delete.button'),
          icon: 'el-icon-delete',
          visible: this.id,
          click: () => {
            this.deleteArticle()
          }
        },
        {
          label: this.$t('base.operate.preview'),
          icon: 'fo-eye-open',
          visible: this.id,
          click: () => {
            this.articlePreview()
          }
        }
      ]
    },
    ...mapState(['siteModel', 'globalRegionModel'])
  },
  created () {
    if (this.id) {
      this.getDetail()
    } else {
      this.getDefaultSpec()
      this.pageValid()
    }
    // this.validGoodsLimited()
    // this.getDevelop()
  },
  methods: {
    validGoodsLimited () {
      fetchGoodsLimited({
        siteId: this.siteId
      }).then(result => {
        this.resultMessage(result, (success) => {
          if (success) {
            this.goodsLimited = false
            if (this.id) {
              this.getDetail()
            } else {
              this.getDefaultSpec()
              this.pageValid()
            }
          }
        })
      })
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 加载图库
     */
    loadGallery (field) {
      this.gallery.field = field
      this.gallery.visible = true
    },
    /**
     * 更新MAP
     */
    updateDesignMap (data) {
      // console.log('updateDesignMap\n', JSON.stringify(data))
      this.designVisible = false
      this.designMap = data
      this.entity.designMap = data
      this.entity.designSection = JSON.stringify(data)
    },
    /**
     * OSS文件上传
     * @param formData 数据
     * @param func 回调
     */
    ossUpload (formData, func) {
      fileUpload(formData).then((result) => {
        if (func && typeof (func) === 'function') {
          func.call(this, result)
        }
      })
    },
    /**
     * 首字大写
     */
    setCapitalize () {
      this.entity.title = this.utility.charAtToUpperCase(this.entity.title)
    },
    /**
     * 获取默认预置参数
     */
    getDefaultSpec () {
      http.articleSpecDefault({
        siteId: this.siteId,
        region: this.regionCode
      })
        .then(result => {
          this.pageValid()
          if (result.success) {
            this.entity.specList = result.data.jsonData
              ? JSON.parse(result.data.jsonData)
              : []
          }
        })
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 开发环境模拟数据
     */
    getDevelop () {
      if (this.utility.isEmpty(this.id) && process.env.NODE_ENV === 'development') {
        let s = []
        for (let i = 1; i < 8; i++) {
          this.entity.imageList.push({
            'title': '',
            'url': `http://theme.fomillesite.com/goods/a0${i}.jpg`
          })
        }
        for (let i = 1; i < 16; i++) {
          s.push(`<p><img src="http://theme.fomillesite.com/goods/${i < 10 ? '0' + i : i}.jpg"></p>`)
        }
        this.entity.description = s.join('')
        this.entity.title = 'Three squirrel nuts gift box 8 bags 1515g private New Year\'s gift package gift daily group purchase of dried nuts'
        this.entity.attachmentList = [
          {
            'id': '1400696212817977346',
            'fileType': 1,
            'coverImage': '',
            'refType': 1,
            'title': 'Support document',
            'needPass': 1,
            'url': 'https://site-file.fomillesite.com/1400695639284654082/1400696201193648129.jpeg',
            'description': ''
          },
          {
            'id': '1400696212859920386',
            'fileType': 1,
            'coverImage': '',
            'refType': 1,
            'title': 'Support software',
            'needPass': 1,
            'url': 'https://site-file.fomillesite.com/1400695639284654082/1400696201374003202.jpeg',
            'description': ''
          },
          {
            'id': '1400696212889280514',
            'fileType': 1,
            'coverImage': '',
            'refType': 1,
            'title': 'Product params',
            'needPass': 1,
            'url': 'https://site-file.fomillesite.com/1400695639284654082/1400696201332060161.jpeg',
            'description': ''
          }
        ]
        this.entity.ladderList = [
          {
            'minCount': 10,
            'price': 300
          },
          {
            'minCount': 20,
            'price': 250
          },
          {
            'minCount': 30,
            'price': 200
          }
        ]
      }
    },
    /**
     * 添加SKU
     */
    redirectVariant (id) {
      this.$router.push(`/site/${this.siteId}/goods/variant/${this.id}`)
    },
    /**
     * 是否为修改SKU
     */
    isUpdateSku () {
      const m = this.entity.skuList.filter((o) => {
        return this.utility.isNotEmpty(o.id)
      })
      return m.length > 0
    },
    /**
     * 图片选择结果
     * @param list 图片
     */
    resourceSelector (list) {
      if (this.gallery.field === 'qrcode') {
        if (list.length > 0) {
          this.entity.qrcode = list[0].url
        }
      } else {
        list.forEach((o) => {
          let s = this.entity.imageList.filter((sb) => {
            return o.url === sb.url
          })
          if (s.length === 0) {
            this.entity.imageList.push({
              'fileType': this.utility.fileType(o.url),
              'coverImage': '',
              'refType': 1,
              'title': o.alt,
              'needPass': 1,
              'url': o.url,
              'description': '',
              'suffix': this.utility.suffix(o.url)
            })
          }
        })
      }
    },
    /**
     * 文章预览
     */
    articlePreview () {
      this.utility.openSite(`${this.globalRegionModel.url}/item/${this.entity.seoUrl}`)
    },
    /**
     * 上一步
     */
    previous () {
      this.$router.push(`/site/${this.siteId}/goods`)
    },
    /**
     * SKU表格操作事件绑定
     */
    skuActions (command) {
      if (this.skuAction[command] && this.selectedItems.length > 0) {
        const fn = this.skuAction[command].onClick
        if (fn && typeof fn === 'function') {
          fn.call(
            this,
            command === 'update' ? this.selectedItems[0] : this.selectedItems
          )
        }
      }
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.utility.isEmpty(this.entity.summary)) {
            this.entity.summary = this.utility.extractText(this.entity.description, 255)
          }
          if (this.entity.imageList.length > 0) {
            this.entity.coverImage = this.entity.imageList[0].url
          }
          if (this.utility.isEmpty(this.entity.subtitle)) {
            this.entity.subtitle = this.utility.extractText(this.entity.summary, 255)
          }
          if (this.utility.isEmpty(this.entity.region)) {
            this.entity.region = this.regionCode
          }
          let price = this.getPriceRange()
          if (price.length > 0) {
            this.entity.maxPrice = price[price.length - 1]
            this.entity.minPrice = price[0]
          }
          // this.entity.subtitle = this.utility.clearLineSymbol(this.entity.subtitle)
          this.entity.title = this.utility.clearLineSymbol(this.entity.title)
          this.entity.infoType = this.resource.infoType.goods
          this.entity.region = this.regionCode
          this.entity.siteId = this.siteId
          this.entity.specList.forEach((o, index) => {
            if (o.digit === 0) {
              this.entity.specList[index].value = parseFloat(o.value) || 0
            }
          })
          this.entity.specification = JSON.stringify(this.entity.specList)
          this.loading = true
          if (this.id) {
            this.updateGoods()
          } else {
            this.addGoods()
          }
        } else {
          this.$message({
            type: 'error',
            message: this.$t('base.formValidation.inadequate').toString()
          })
        }
      })
    },
    /**
     * 获取详情
     */
    getDetail () {
      goodsApi.goodsDetail({
        id: this.id,
        siteId: this.siteId
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity = {
                ...result.data,
                collectionList: result.data.collectionList.filter(item => item.collectionType === 1)
              }
              this.seoEntity = {
                description: result.data.seoDescription,
                keywords: this.utility.isEmpty(result.data.seoKeywords) ? [] : result.data.seoKeywords.split(','),
                title: result.data.seoTitle,
                url: result.data.seoUrl,
                heading: result.data.seoH1
              }
              if (result.data.designMap && result.data.designMap.dataset && result.data.designMap.dataset.imageList) {
                this.designMap = result.data.designMap
              } else {
                this.designMap = this.entity.designMap = {
                  'sectionAlias': '设计详情',
                  'imagePercentage': '6',
                  'wideScreen': true,
                  'sectionSalt': 'FvyQV3',
                  'firstLayout': 'left',
                  'imageScale': '21by9',
                  'dataset': {
                    'imageList': {
                      'data': [],
                      'type': 'normal'
                    }
                  }
                }
              }
              if (result.data.blockList.length) {
                this.attributeTabsValue = result.data.blockList[0].id
              }
              this.dataConversion(result.data)
              this.$nextTick(() => {
                this.unsaved = false
              })
            }
          })
        })
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 添加数据
     */
    addGoods () {
      this.entity.siteId = this.siteId
      goodsApi.goodsUpdate(this.entity)
        .then(result => {
          result.options = {
            action: this.actionType.addition,
            formName: 'update'
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.previous()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 更新数据
     */
    updateGoods () {
      this.entity.siteId = this.siteId
      if (this.autoSyncH1Title) {
        this.entity.seoH1 = this.entity.title
      }
      goodsApi.goodsUpdate(this.entity)
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.getDetail()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 删除
     */
    deleteArticle () {
      this.$confirm(this.$t('base.delete.subheading').toString(), this.$t('base.delete.heading').toString(), {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        closeOnClickModal: false,
        type: 'error',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            http.articleDelete({
              ids: [this.id],
              siteId: this.siteId
            })
              .then(result => {
                result.options = {
                  action: this.actionType.delete,
                  url: `/site/${this.siteId}/goods`
                }
                this.resultMessage(result, () => {
                  done()
                  instance.confirmButtonLoading = false
                })
              })
              .catch(error => {
                this.networkMistake(error)
                done()
                instance.confirmButtonLoading = false
              })
          } else {
            instance.confirmButtonLoading = false
            done()
          }
        }
      })
    },
    /**
     * search-engine-preview 组件数据同步
     * @param placeholder
     */
    updateSEO (placeholder) {
      this.entity.seoKeywords = placeholder.keywords
      this.entity.seoDescription = placeholder.description
      this.entity.seoTitle = placeholder.title
      this.entity.seoUrl = placeholder.url
      this.entity.seoH1 = placeholder.heading
    },
    /**
     * 扩展属性事件
     * @param targetName
     * @param action
     */
    attributeTabsEdit (targetName, action) {
      if (action === 'add') {
        let newTabName = `New Tab ${this.entity.blockList.length + 1}`
        let key = `key-${this.entity.blockList.length + 1}`
        this.entity.blockList.push({
          blockName: newTabName,
          blockDescription: `New Tab content ${this.entity.blockList.length + 1}`,
          id: key
        })
        this.attributeTabsValue = key
      } else if (action === 'remove') {
        let activeName = this.attributeTabsValue
        if (activeName === targetName) {
          this.entity.blockList.forEach((tab, index) => {
            if (tab.id === targetName) {
              let nextTab = this.entity.blockList[index + 1] || this.entity.blockList[index - 1]
              if (nextTab) {
                activeName = nextTab.id
              }
            }
          })
        }
        this.attributeTabsValue = activeName
        this.entity.blockList = this.entity.blockList.filter(tab => tab.id !== targetName)
      }
    },
    /**
     * 图片弹窗回调
     * @param action 0关闭，1更新，2移出
     * @param url
     */
    variantAvatarCall (action, url) {
      const { index } = this.variantBatchVisible.avatar
      if (action < 2) {
        this.variantBatchVisible.avatar.visible = false
      }
      if (action === 1 && url) {
        if (index === null) {
          this.selectedItems.forEach(o => {
            o.skuImage = url
          })
        } else {
          this.entity.skuList[index].skuImage = url
        }
      } else if (action === 2) {
        if (index === null) {
          this.selectedItems.forEach(o => {
            o.skuImage = ''
          })
        } else {
          this.entity.skuList[index].skuImage = ''
        }
      } else if (action === 3 && url) {
        this.entity.imageList.push(url)
      }
    },
    /**
     * 参数
     */
    variantParamsCall (item) {
      this.variantBatchVisible.params.visible = false
      if (!item) {
        return false
      }
      this.selectedItems.forEach(o => {
        for (let field in item) {
          if ('skuId|variantList'.indexOf(field) === -1) {
            o[field] = item[field]
          }
        }
      })
    },
    /**
     * 选择sku
     */
    variantChange (data) {
      this.entity.skuList = data.skuList
      this.variantList = data.variantList
      this.entity.variantList = data.variantList
    },
    /**
     * 获获价区间
     */
    getPriceRange () {
      let s = []
      this.entity.skuList.forEach((o) => {
        o.goodsPrice = o.salePrice
        if (o.vipPrice === 0) {
          o.vipPrice = o.salePrice
        }
        if (o.marketPrice === 0) {
          o.marketPrice = o.salePrice
        }
        if (o.marketPrice === 0) {
          o.costPrice = o.salePrice
        }
        let name = []
        o.variantList.forEach((b) => {
          name.push(b.variantValue)
        })
        o.skuName = name.join(',')
        s.push(o.salePrice)
      })
      s.sort((a, b) => {
        return a - b
      })
      return s
    },
    /**
     * SKU选择
     * @param item
     */
    variantSelect (item) {
      let s = []
      let rows = []
      this.entity.skuList.forEach((o, index) => {
        for (let variant of o.variantList.values()) {
          if (variant.variantValue === item.variantValue) {
            s.push(o)
            rows.push(o.skuId)
          }
        }
      })
      this.selectedRowsIndex = rows
      this.toggleSelection(s)
    },
    /**
     * 设置选中列
     */
    toggleSelection (rows) {
      this.$refs.multipleTable.clearSelection()
      if (rows && rows.length > 0) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      }
    },
    /**
     * 删除
     */
    removeImage (url) {
      this.entity.skuList.forEach((o) => {
        if (o.skuImage === url) {
          o.skuImage = ''
        }
      })
    },
    /**
     * 单个替换sku图片
     */
    changeSkuImage (index, img) {
      this.$set(this.variantBatchVisible, 'avatar', {
        visible: true,
        index: index
      })
    },
    /**
     * SKU选中状态
     * @param row
     * @returns {boolean}
     */
    variantChecked (row) {
      let variantChecked = true
      for (let item of row.variantList.values()) {
        if ((!item.variantValue || !item.variantName) && variantChecked) {
          variantChecked = false
        }
      }
      return variantChecked
    },
    /**
     * 多行选择
     * @param rows
     */
    multiSelect (rows) {
      this.selectedItems = rows
      let s = []
      rows.forEach((o) => {
        s.push(o.skuId)
      })
      this.selectedRowsIndex = s
    },
    /**
     * 单行点击
     * @param row
     * @param column
     * @param event
     */
    rowClick (row, column, event) {
      event.cancelBubble = true
      this.$refs.multipleTable.setCurrentRow(row)
      if (this.skuAction.update) {
        const action = this.skuAction.update.onClick
        if (action && typeof action === 'function') {
          action.call(this, row)
        }
      }
    },
    /**
     * 确认删除sku
     */
    confirmDeleteSku (data, index) {
      this.$confirm(
        '被删除的变体商品无法恢复，确认要删除吗？',
        '删除变体商品',
        {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          let ids = []
          data.forEach((o) => {
            if (this.utility.isNotEmpty(o.id)) {
              ids.push(o.id)
            }
          })
          if (ids.length > 0) {
            this.removeSKU(ids)
          } else {
            this.entity.skuList.splice(index, 1)
          }
        })
        .catch(() => {
        })
    },
    /**
     * 删除SKU
     */
    removeSKU (ids) {
      goodsApi.goodsSkuDelete({
        spuId: this.id,
        ids: ids
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.getDetail()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 关闭梯价弹窗
     */
    closeLadder (rows) {
      this.ladderData.visible = false
      if (rows) {
        this.entity.ladderList = JSON.parse(JSON.stringify(rows))
      }
    },
    /**
     * 修改商品时，将库存及SKU属性数据转换成可修改的时候
     */
    dataConversion (data) {
      let list = JSON.parse(JSON.stringify(data.variantList))
      list.forEach(o => {
        o.key = o.id
        o.valueList.forEach(sub => {
          sub.key = sub.id
        })
      })
      this.clearVariant = list
    }
  }
}
</script>
<style lang="scss">
.ladder-price-row {
  td {
    padding-top: 5px;
    padding-bottom: 4px;
  }
}

.ladder-price {
  .el-col {
    font-size: 12px;
    line-height: 14px;
  }

  .el-col-16 {
    text-align: left !important;
  }
}

.el-tabs__header {
  margin-bottom: 0;
}

.attribute-tabs {
  border: 1px solid #E4E7ED;
  border-top: 0;
  padding: 20px;
}

.sku-table {
  .el-input-group__append,
  .el-input-group__prepend {
    padding: 0 5px;
    transition: all 0.25s;
  }

  .cell {
    padding-left: 5px;
    padding-right: 5px;
  }

  .el-table__row {
    .el-form-item {
      margin: 0;

      .el-input__inner {
        padding: 0 6px !important;
        transition: all 0.25s;
      }
    }
  }
}

.goods-sub-action {
  .el-button--text {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
