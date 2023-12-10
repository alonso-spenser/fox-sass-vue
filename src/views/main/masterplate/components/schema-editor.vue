<template>
  <div
      class="schema-editor"
      v-if="visible">
    <div class="schema-editor-toolbar">
      <h3>
        {{ dataset.sectionSchema.name['zh-CN'] }}
        <small>
          {{ dataset.sectionSchema.type }}
        </small>
      </h3>
      <hr>
      <el-form
          :model="entity"
          :rules="formRules"
          ref="update"
          label-position="top"
          label-width="90px"
      >
        <el-form-item
            label="组件类型"
            size="small"
            :rules="formRules.english"
            prop="sectionSchema.type">
          <el-input
              v-model="entity.sectionSchema.type"
              placeholder="首字小写驼峰 eg: slideShow"
          ></el-input>
        </el-form-item>
        <el-form-item
            label="中文名称"
            prop="sectionSchema.name.zh-CN"
            :rules="formRules.type">
          <el-input
              size="small"
              v-model="entity.sectionSchema.name['zh-CN']"
              placeholder="中文名称 eg: 轮播图"
          ></el-input>
        </el-form-item>
        <el-form-item
            label="英文名称"
            prop="sectionSchema.name.en"
            :rules="formRules.type">
          <el-input
              size="small"
              v-model="entity.sectionSchema.name.en"
              placeholder="英文名称 eg: slideShow"
          ></el-input>
        </el-form-item>
        <!--        <el-form-item prop="sectionSchema.icon" :rules="formRules.type">-->
        <!--          <el-popover-->
        <!--            ref="popover4"-->
        <!--            placement="top-end"-->
        <!--            width="910"-->
        <!--            trigger="click"-->
        <!--          >-->
        <!--            <img style="width: 100%" :src="copySvg">-->
        <!--          </el-popover>-->
        <!--          <div class="el-form-item__label" >-->
        <!--            图标 <small>SVG 代码</small>-->
        <!--            <el-button-->
        <!--              type="text"-->
        <!--              v-popover:popover4>-->
        <!--              <i class="el-icon-info"></i>-->
        <!--            </el-button>-->
        <!--          </div>-->
        <!--          <el-input-->
        <!--            size="small"-->
        <!--            type="textarea"-->
        <!--            :rows="8"-->
        <!--            v-model="entity.sectionSchema.icon"-->
        <!--            @blur="filterSVG"-->
        <!--            placeholder="图标"-->
        <!--          ></el-input>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="图片" prop="sectionSchema.avatar">-->
        <!--          <fox-image-single-->
        <!--            v-model="entity.sectionSchema.avatar"-->
        <!--            :alt-visible="false"-->
        <!--            :size-limit="10"-->
        <!--            :oss-bucket="resource.ossBucket"-->
        <!--            :server-address="utility.uploadURL()"-->
        <!--            file-folder="theme"-->
        <!--          ></fox-image-single>-->
        <!--        </el-form-item>-->
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="可被移除">
              <el-switch
                  v-model="entity.sectionSchema.removable"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="全局配置">
              <el-switch
                  v-model="entity.sectionSchema.global"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="12">
          <el-form-item label="仅允许添加一次">
            <el-switch
                v-model="entity.sectionSchema.onlyOnce"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="允许复制">
            <el-switch
                v-model="entity.sectionSchema.duplicate"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="schema-editor-save text-center">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-button
                icon="el-icon-document-copy"
                circle
                size="small"
                @click="copyVisible = true"></el-button>
          </el-col>
          <el-col :span="9">
            <el-button
                class="w-100"
                round
                size="small"
                @click="formValidation(false)">{{ $t("base.operate.cancel") }}
            </el-button>
          </el-col>
          <el-col :span="9">
            <el-button
                class="w-100"
                round
                type="primary"
                size="small"
                @click="formValidation(true)">{{ $t("base.operate.save") }}
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="schema-editor-section">
      <draggable
          handle="a"
          :list="entity.sectionSchema.group"
      >
        <a
            class="anchor-item el-icon-rank"
            v-for="(o, index) in entity.sectionSchema.group"
            :key="`anchor${index}`"
            :href="`#anchor${index}`"
        >
          {{ o.name['zh-CN'] }}
        </a>
      </draggable>
      <div class="schema-editor-toolbar-section">
        <p>
          <el-button
              size="small"
              @click="addGroup(entity.sectionSchema.group, false)"
          >
            静态参数组
          </el-button>
        </p>
        <p>
          <el-button
              size="small"
              @click="addGroup(entity.sectionSchema.group, true)"
          >
            数据参数组
          </el-button>
        </p>
        <p>
          <el-button
              size="small"
              @click="borderAndBackground(entity.sectionSchema.group)"
          >
            边框 & 背景
          </el-button>
        </p>
        <p>
          <el-button
              size="small"
              @click="titleAndButton(entity.sectionSchema.group, true)"
          >
            标题 & 按钮
          </el-button>
        </p>
        <p>
          <el-button
              size="small"
              @click="h1AndBreadCrumb(entity.sectionSchema.group, true)"
          >
            H1 & 面包屑
          </el-button>
        </p>
        <!--        <el-button @click="addBorderAndBorder(entity.sectionData)">-->
        <!--          边框和背景-->
        <!--        </el-button>-->
        <!--        <el-button @click="addTitleAndButtonGroup(entity.sectionData)">-->
        <!--          标题 & 按钮-->
        <!--        </el-button>-->
        <!--        <el-button @click="addH1Title(entity.sectionData)">-->
        <!--          H1 & 设置-->
        <!--        </el-button>-->
        <!--        <el-button @click="addSimpleH1Title(entity.sectionData)">-->
        <!--          H1 & 设置（简化）-->
        <!--        </el-button>-->
      </div>
    </div>
    <div class="schema-editor-content">
      <el-form
          :model="entity.sectionSchema"
          :rules="formRules"
          ref="schemaItems"
          label-position="top">
        <div
            v-for="(o, index) in entity.sectionSchema.group"
            :key="`group${index}`"
            :id="`anchor${index}`"
            class="schema-group"
        >
          <h4>
            {{ o.name['zh-CN'] }}
          </h4>
          <el-card
              shadow="hover"
              class="schema-group-card"
          >
            <div slot="header">
              <el-row
                  class="schema-group-info"
                  :gutter="10">
                <el-col :span="4">
                  <el-form-item
                      label="中文分组名"
                      :prop="`group.${index}.name.zh-CN`"
                      :rules="formRules.type">
                    <el-input
                        size="small"
                        v-model="o.name['zh-CN']"
                        placeholder="eg: 全局设置"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item
                      label="英文分组名"
                      :prop="`group.${index}.name.en`"
                      :rules="formRules.type">
                    <el-input
                        size="small"
                        v-model="o.name.en"
                        placeholder="eg: Global sectionData"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                      label="中文贴士"
                      :prop="`group.${index}.tips.zh-CN`">
                    <el-input
                        size="small"
                        v-model="o.tips['zh-CN']"
                        placeholder="eg: tips"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                      label="英文贴士"
                      :prop="`group.${index}.tips.en`">
                    <el-input
                        size="small"
                        v-model="o.tips.en"
                        placeholder="eg: tips"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item
                      v-if="!o.dataType"
                      label="列表">
                    <el-switch
                        v-model="o.multiple"
                        :active-value="1"
                        :inactive-value="0"
                    >
                    </el-switch>
                  </el-form-item>
                  <el-form-item
                      v-else
                      label="列表">
                    <el-select
                        v-model="o.multiple"
                        class="w-100"
                        size="small"
                        placeholder="请选择">
                      <template
                          v-for="ct in dataType"
                      >
                        <el-option
                            :key="ct.value"
                            :label="ct.title"
                            :value="ct.value"
                        >
                        </el-option>
                      </template>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row
                  class="schema-group-info"
                  :gutter="10">
                <el-col
                    v-if="o.multiple > 0 && o.multiple !== 3"
                    :span="5">
                  <el-form-item
                      label="单项中文占位文字"
                      :prop="`group.${index}.placeholder.zh-CN`"
                      :rules="formRules.type">
                    <el-input
                        size="small"
                        v-model="o.placeholder['zh-CN']"
                        placeholder="eg: 图片"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col
                    v-if="o.multiple > 0 && o.multiple !== 3"
                    :span="5">
                  <el-form-item
                      label="单项英文占位文字"
                      :prop="`group.${index}.placeholder.en`"
                      :rules="formRules.type">
                    <el-input
                        size="small"
                        v-model="o.placeholder.en"
                        placeholder="eg: Image"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col
                    v-if="o.multiple > 0 && o.multiple !== 3"
                    :span="4">
                  <el-form-item
                      label="最大允许行数"
                      :prop="`group.${index}.max`"
                      :rules="formRules.number">
                    <el-input
                        size="small"
                        v-model="o.max"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col
                    v-if="o.multiple > 0 && !o.dataType"
                    :span="4">
                  <el-form-item
                      label="列表字段"
                      :prop="`group.${index}.tag`"
                      :rules="formRules.uniqueTag">
                    <el-input
                        size="small"
                        v-model="o.tag"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <draggable
                handle=".element-sort"
                :list="o.elements"
            >
              <template
                  v-for="(el, eIndex) in o.elements"
              >
                <el-row
                    :key="`element${eIndex}`"
                    :class="`elements${el.type === 'select' ? ' elements-options' : ' elements-options'}`"
                    :gutter="10">
                  <el-col :span="3">
                    <el-form-item
                        label="控件类型"
                        :prop="`group.${index}.elements.${eIndex}.type`"
                        :rules="formRules.type">
                      <el-select
                          :key="`sectionData-${index}-elements-${eIndex}-type`"
                          v-model="el.type"
                          class="w-100"
                          size="small"
                          @change="changeType(el)"
                          placeholder="请选择">
                        <template
                            v-for="ct in controls"
                        >
                          <template v-if="ct.dataType">
                            <el-option
                                v-if="o.dataType === ct.dataType && (ct.multiple && ct.dataType && ct.multiple.indexOf(o.multiple) > -1)"
                                :key="ct.value"
                                :label="ct.label"
                                :value="ct.value"
                            >
                            </el-option>
                          </template>
                          <el-option
                              v-else-if="o.dataType === ct.dataType"
                              :key="ct.value"
                              :label="ct.label"
                              :value="ct.value"
                          >
                          </el-option>
                        </template>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col
                      :span="3"
                      v-if="el.type !== 'divider'">
                    <el-form-item
                        label="字段名称"
                        :prop="`group.${index}.elements.${eIndex}.field`"
                        :rules="formRules.uniqueKey">
                      <el-input
                          size="small"
                          v-model="entity.sectionSchema.group[index].elements[eIndex].field"
                          placeholder="eg: textColor"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col
                      :span="2"
                      v-if="el.type === 'imagePicker' && el.type !== 'divider'">
                    <el-form-item
                        label="ALT关联字段"
                        :prop="`group.${index}.elements.${eIndex}.field`">
                      <el-input
                          size="small"
                          v-model="entity.sectionSchema.group[index].elements[eIndex].altFiled"
                          placeholder="eg: textColor"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col
                      v-if="el.type !== 'divider'"
                      :span="el.type === 'imagePicker' ? 3 : 4">
                    <el-form-item
                        label="中文名称"
                        :prop="`group.${index}.elements.${eIndex}.name.zh-CN`"
                        :rules="formRules.type">
                      <el-input
                          size="small"
                          v-model="entity.sectionSchema.group[index].elements[eIndex].name['zh-CN']"
                          placeholder="eg: 轮播图"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col
                      v-if="el.type !== 'divider'"
                      :span="el.type === 'imagePicker' ? 3 : 4">
                    <el-form-item
                        label="英文名称"
                        :prop="`group.${index}.elements.${eIndex}.name.en`"
                        :rules="formRules.type">
                      <el-input
                          size="small"
                          v-model="entity.sectionSchema.group[index].elements[eIndex].name.en"
                          placeholder="eg: slideShow"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <template v-if="!o.dataType">
                    <el-col
                        :span="3"
                        v-if="el.type !== 'divider'">
                      <el-form-item
                          label="默认值"
                          :prop="`group.${index}.elements.${eIndex}.default`">
                        <template v-if="el.type === 'colorPicker'">
                          <el-color-picker
                              show-alpha
                              v-model="entity.sectionSchema.group[index].elements[eIndex].default"
                          ></el-color-picker>
                        </template>
                        <template v-else-if="el.type === 'iconPicker'">
                          <icon-picker
                              v-model="entity.sectionSchema.group[index].elements[eIndex].default"
                          ></icon-picker>
                        </template>
                        <template v-else-if="el.type === 'switch'">
                          <el-switch
                              v-model="entity.sectionSchema.group[index].elements[eIndex].default"
                              :active-value="true"
                              :inactive-value="false"
                              active-color="#13ce66"
                          >
                          </el-switch>
                        </template>
                        <template v-else-if="el.type === 'slider'">
                          <el-slider
                              v-model="entity.sectionSchema.group[index].elements[eIndex].default"
                              :step="1">
                          </el-slider>
                        </template>
                        <template v-else-if="el.type === 'imagePicker'">
                          <preset-image
                              v-model="entity.sectionSchema.group[index].elements[eIndex].default"
                          ></preset-image>
                        </template>
                        <template v-else-if="el.type === 'languagePicker'">
                          <language-picker
                              v-model="entity.sectionSchema.group[index].elements[eIndex].default"
                          ></language-picker>
                        </template>
                        <template v-else-if="el.type === 'videoPicker'">
                          <video-picker
                              v-model="entity.sectionSchema.group[index].elements[eIndex].default"
                          ></video-picker>
                        </template>
                        <el-input
                            v-else
                            size="small"
                            v-model="entity.sectionSchema.group[index].elements[eIndex].default"
                            placeholder="eg: #FF0000"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </template>
                  <el-col :span="el.type !== 'divider' ? 2 : 9">
                    <el-form-item
                        label="中文描述"
                        :prop="`group.${index}.elements.${eIndex}.info.zh-CN`">
                      <el-input
                          size="small"
                          v-model="entity.sectionSchema.group[index].elements[eIndex].info['zh-CN']"
                          placeholder="中文描述"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="el.type !== 'divider' ? 2 : 9">
                    <el-form-item
                        label="英文描述"
                        :prop="`group.${index}.elements.${eIndex}.info.en`">
                      <el-input
                          size="small"
                          v-model="entity.sectionSchema.group[index].elements[eIndex].info.en"
                          placeholder="英文描述"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col
                      v-if="(el.type === 'productCollectionPicker' || el.type === 'articleCollectionPicker') && !o.multiple && el.type !== 'divider'"
                      :span="2">
                    <el-form-item
                        label="最大允许行数"
                        :prop="`group.${index}.elements.${eIndex}.quantity`"
                        :rules="formRules.number">
                      <el-input
                          size="small"
                          v-model="entity.sectionSchema.group[index].elements[eIndex].quantity"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col
                      :span="el.type === 'divider' ? 3 : 3">
                    <el-button
                        class="mt-38"
                        type="danger"
                        size="small"
                        icon="el-icon-delete"
                        circle
                        @click="removeElement(index, eIndex)"></el-button>
                    <el-button
                        class="mt-38"
                        size="small"
                        style="margin-left:5px!important;"
                        icon="el-icon-copy-document"
                        circle
                        @click="copyElement(index, eIndex)"></el-button>
                    <el-button
                        class="element-sort"
                        style="margin-top: 5px;margin-left:5px!important;"
                        size="small"
                        icon="el-icon-rank"
                        circle></el-button>
                  </el-col>
                  <el-col
                      class="options"
                      :span="24"
                      v-if="el.type === 'select'">
                    <draggable
                        handle=".option-sort"
                        :list="el.options"
                    >
                      <el-row
                          :gutter="10"
                          v-for="(option, optionIndex) in el.options"
                          :key="`options${optionIndex}`"
                      >
                        <el-col
                            class="text-right"
                            :span="2">
                          <label class="el-label">选项 {{ optionIndex + 1 }}</label>
                        </el-col>
                        <el-col
                            class="text-right"
                            :span="1">
                          <label class="el-label">值</label>
                        </el-col>
                        <el-col :span="4">
                          <el-form-item
                              :prop="`group.${index}.elements.${eIndex}.options.${optionIndex}.value`"
                              :rules="formRules.type">
                            <el-input
                                size="small"
                                v-model="option.value"
                                placeholder="描述 eg: 红色"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col
                            class="text-right"
                            :span="1">
                          <label class="el-label">中文</label>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item :prop="`group.${index}.elements.${eIndex}.options.${optionIndex}.name.zh-CN`">
                            <el-input
                                size="small"
                                v-model="option.name['zh-CN']"
                                placeholder="描述 eg: 红色"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col
                            class="text-right"
                            :span="1">
                          <label class="el-label">英</label>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item
                              :prop="`group.${index}.elements.${eIndex}.options.${optionIndex}.name.en`"
                              :rules="formRules.type">
                            <el-input
                                size="small"
                                v-model="option.name.en"
                                placeholder="描述 eg: Red"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col
                            class="text-right"
                            :span="1"
                            v-if="el.options.length > 1">
                          <el-button
                              style="margin-top: 5px"
                              size="small"
                              icon="el-icon-delete"
                              circle
                              @click="removeOption(index, eIndex, optionIndex)"></el-button>
                        </el-col>
                        <el-col :span="1">
                          <el-button
                              class="option-sort"
                              style="margin-top: 5px"
                              size="small"
                              icon="el-icon-rank"
                              circle></el-button>
                        </el-col>
                      </el-row>
                    </draggable>
                    <el-row
                        class="options-add"
                        :gutter="10">
                      <el-col
                          :span="23"
                          :offset="3">
                        <el-button
                            size="small"
                            icon="el-icon-plus"
                            @click="addOption(index, eIndex)">
                          添加选项
                        </el-button>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col
                      v-if="el.type === 'slider'"
                      :span="24">
                    <!--slider-->
                    <el-row
                        :gutter="10"
                        :key="`element-slider-option-${eIndex}`"
                    >
                      <el-col
                          :offset="14"
                          :span="2">
                        <el-form-item
                            label="最小值"
                            :prop="`group.${index}.elements.${eIndex}.min`">
                          <el-input
                              size="small"
                              v-model="entity.sectionSchema.group[index].elements[eIndex].min"
                              placeholder="最小值"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="2">
                        <el-form-item
                            label="最大值"
                            :prop="`group.${index}.elements.${eIndex}.max`">
                          <el-input
                              size="small"
                              v-model="entity.sectionSchema.group[index].elements[eIndex].max"
                              placeholder="最大值"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="2">
                        <el-form-item
                            label="步长值"
                            :prop="`group.${index}.elements.${eIndex}.step`">
                          <el-input
                              size="small"
                              v-model="entity.sectionSchema.group[index].elements[eIndex].step"
                              placeholder="步长值"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </template>
            </draggable>
            <div class="schema-group-action">
              <el-button
                  size="small"
                  icon="el-icon-copy-document"
                  circle
                  @click="copyGroup(index)"></el-button>
              <el-button
                  v-if="!o.dataType"
                  size="small"
                  circle
                  style="margin-right: 10px"
                  icon="el-icon-plus"
                  @click="addParameter(o)"
              ></el-button>
              <el-popover
                  placement="top-start"
                  width="260"
                  trigger="hover"
                  v-if="!(o.elements.length > 0 && o.dataType)">
                <div
                    v-if="!o.dataType"
                    class="preset-button preset-button-style"
                >
                  <el-button
                      size="small"
                      @click="addButton(o)">
                    按钮组
                  </el-button>
                  <el-button
                      size="small"
                      @click="addImageWithAlt(o)">
                    图片 & ALT
                  </el-button>
                  <el-button
                      size="small"
                      @click="addColumn(o)">
                    列数
                  </el-button>
                  <el-button
                      size="small"
                      @click="addColor(o)">
                    颜色组
                  </el-button>
                </div>
                <template
                    v-for="(preset, presetIndex) in presetSections"
                >
                  <div
                      :key="`presets${presetIndex}`"
                      class="preset-button preset-button-style"
                  >
                    <template
                        v-for="(el, key) in preset"
                    >
                      <el-button
                          v-if="el.dataType === o.dataType"
                          :key="key"
                          size="small"
                          @click="addPreset(o, key, presetIndex)"
                      >
                        {{ el.label }}
                      </el-button>
                    </template>
                  </div>
                </template>
                <el-button
                    icon="el-icon-menu"
                    size="small"
                    circle
                    style="margin-right: 10px"
                    type="primary"
                    slot="reference">
                </el-button>
              </el-popover>
              <el-button
                  size="small"
                  circle
                  type="danger"
                  icon="el-icon-delete"
                  v-if="!(o.removable === 0)"
                  @click="deleteGroup(index)"
              ></el-button>
            </div>
          </el-card>
        </div>
      </el-form>
    </div>
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
      <el-input
          type="textarea"
          v-model="codeJSON"
          :rows="15"
      >

      </el-input>
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
  </div>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import preset from './js/preset'
import presetImage from './preset-image'
import videoPicker from './video-picker'
import copySvg from '@/assets/image/copysvg.jpg'
import Draggable from 'vuedraggable'
import copyToClipboard from 'copy-to-clipboard'
import defaultSettings from '../components/js/default'
import iconPicker from '../components/icon-picker/index'
import '@/assets/schema.scss'

export default {
  name: 'schemaEditor',
  extends: extend,
  components: {
    Draggable,
    presetImage,
    videoPicker,
    iconPicker
  },
  data () {
    /**
     * 字段校验
     * @param rule
     * @param value
     * @param callback
     */
    let validateKey = (rule, value, callback) => {
      let s = []
      this.entity.sectionSchema.group.forEach((o) => {
        o.elements.forEach((b) => {
          if (b.field === value) {
            s.push(value)
          }
        })
      })
      if (s.length === 1) {
        callback()
      } else {
        callback(new Error('字段名重复'))
      }
    }
    /**
     * 列表字段
     * @param rule
     * @param value
     * @param callback
     */
    let validateTag = (rule, value, callback) => {
      let s = []
      this.entity.sectionSchema.group.forEach((o) => {
        o.elements.forEach((b) => {
          if (b.field === value) {
            s.push(value)
          }
        })
      })
      if (s.length === 0) {
        callback()
      } else {
        callback(new Error('字段名重复'))
      }
    }
    return {
      copySvg,
      formRules: {
        type: [
          {
            required: true,
            message: '必填'
          }
        ],
        english: [
          {
            required: true,
            message: '必填'
          },
          {
            pattern: this.utility.expression.EngAndNum,
            message: ''
          }
        ],
        number: [
          {
            required: true,
            message: '必填'
          },
          {
            pattern: /^[1-9]\d*$/,
            message: '正整数'
          }
        ],
        uniqueKey: [
          {
            pattern: this.utility.expression.EngAndNum,
            message: '字段名为英文'
          },
          {
            required: true,
            message: '必填'
          },
          {
            validator: validateKey,
            trigger: 'blur'
          }
        ],
        uniqueTag: [
          {
            pattern: this.utility.expression.EngAndNum,
            message: '字段名为英文'
          },
          {
            required: true,
            message: '必填'
          },
          {
            validator: validateTag,
            trigger: 'blur'
          }
        ]
      },
      entity: {
        sectionSchema: {
          onlyOnce: false,
          removable: false
        },
        sectionData: {}
      },
      presetSections: [],
      controls: [],
      dataType: [],
      copyVisible: false,
      codeJSON: ''
    }
  },
  props: {
    dataset: {
      type: Object,
      default: () => {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    dataId: {
      type: String,
      default: () => {
        return ''
      }
    },
    salt: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  watch: {
    visible (value) {
      if (value) {
        // console.log(value)
        // this.entity = this.dataset
      }
    }
  },
  created () {
    this.entity = this.dataset
    this.presetSections = preset.sections
    this.controls = preset.controls
    this.dataType = preset.dataType
  },
  methods: {
    /**
     * 添加一个参数组
     */
    addGroup (parent, dataType) {
      preset.section.dataType = dataType
      if (this.entity.sectionData.length === 0) {
        preset.section.name.en = 'Settings'
        preset.section.name['zh-CN'] = '设置'
      } else {
        preset.section.name.en = 'Content'
        preset.section.name['zh-CN'] = '内容'
      }
      parent.push(JSON.parse(JSON.stringify(preset.section)))
    },
    /**
     * 删除分组
     * @param index
     */
    deleteGroup (index) {
      this.$confirm('确定要删除此分组吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.entity.sectionSchema.group.splice(index, 1)
      })
    },
    copyGroup (index) {
      let ob = JSON.parse(JSON.stringify(this.entity.sectionSchema.group[index]))
      this.entity.sectionSchema.group.push(ob)
    },
    /**
     * 添加下拉框选项
     */
    addOption (index, eIndex) {
      if (!this.entity.sectionSchema.group[index].elements[eIndex].options) {
        this.entity.sectionSchema.group[index].elements[eIndex].options = []
      }
      this.entity.sectionSchema.group[index].elements[eIndex].options.push({
        'value': '',
        'name': {
          'en': '',
          'zh-CN': ''
        }
      })
    },
    /**
     * 添加一个参数
     */
    addParameter (parent) {
      parent.elements.push(JSON.parse(JSON.stringify(preset.element.standard)))
    },
    /**
     * 按钮样式
     */
    addButton (parent) {
      parent.elements.push(JSON.parse(JSON.stringify(preset.sections[1].buttonLabel.schema)))
      parent.elements.push(JSON.parse(JSON.stringify(preset.sections[1].buttonLink.schema)))
      parent.elements.push(JSON.parse(JSON.stringify(preset.sections[1].buttonStyle.schema)))
    },
    /**
     * 颜色组
     * @param parent
     */
    addColor (parent) {
      parent.elements.push(JSON.parse(JSON.stringify({
        type: 'divider',
        field: '',
        default: '',
        name: {
          en: '',
          'zh-CN': ''
        },
        info: {
          en: '',
          'zh-CN': ''
        },
        options: []
      })))
      parent.elements.push({
        type: 'colorPicker',
        field: 'headingColor',
        translate: 1,
        default: '',
        name: {
          'en': 'Heading Color',
          'zh-CN': '标题颜色'
        },
        'info': {
          'en': '',
          'zh-CN': ''
        },
        'options': []
      })
      parent.elements.push(JSON.parse(JSON.stringify({
        'type': 'colorPicker',
        'field': 'subheadingColor',
        'default': '',
        'name': {
          'en': 'Subheading Color',
          'zh-CN': '副标题颜色'
        },
        'info': {
          'en': '',
          'zh-CN': ''
        },
        'options': []
      }
      )))
      parent.elements.push(JSON.parse(JSON.stringify({
        'type': 'colorPicker',
        'field': 'bodyColor',
        'default': '',
        'name': {
          'en': 'Content Color',
          'zh-CN': '正文颜色'
        },
        'info': {
          'en': '',
          'zh-CN': ''
        },
        'options': []
      }
      )))
    },
    /**
     * 边框与背景
     */
    borderAndBackground (parent) {
      parent.push(
        JSON.parse(JSON.stringify(preset.group.borderAndBackground))
      )
    },
    /**
     * 标题 & 按钮
     */
    titleAndButton (parent) {
      parent.push(
        JSON.parse(JSON.stringify(preset.group.titleAndButton))
      )
    },
    /**
     * H1 & 面包屑
     * @param parent
     */
    h1AndBreadCrumb (parent) {
      parent.push(
        JSON.parse(JSON.stringify(preset.group.h1AndBreadCrumb))
      )
    },
    /**
     * 添加预设组件
     */
    addPreset (parent, key, index) {
      parent.elements.push(JSON.parse(JSON.stringify(preset.sections[index][key].schema)))
    },
    /**
     * 图片&ALT
     */
    addImageWithAlt (parent) {
      parent.elements.push(JSON.parse(JSON.stringify(preset.sections[3].image.schema)))
      parent.elements.push(JSON.parse(JSON.stringify(preset.sections[3].alt.schema)))
    },
    /**
     * 列数
     */
    addColumn (parent) {
      parent.elements.push(JSON.parse(JSON.stringify({
        default: '3',
        field: 'column',
        translate: 1,
        name: {
          en: 'Columns',
          'zh-CN': '列数'
        },
        options: [
          {
            name: {
              en: '6 Columns',
              'zh-CN': '6 列'
            },
            value: '2'
          },
          {
            name: {
              en: '4 Columns',
              'zh-CN': '4 列'
            },
            value: '3'
          },
          {
            name: {
              en: '3 Columns',
              'zh-CN': '3 列'
            },
            value: '4'
          },
          {
            name: {
              en: '2 Columns',
              'zh-CN': '2 列'
            },
            value: '6'
          },
          {
            name: {
              en: '1 Column',
              'zh-CN': '1 列'
            },
            value: '12'
          }
        ],
        type: 'select',
        info: {
          en: '',
          'zh-CN': ''
        }
      }
      )))
      parent.elements.push(JSON.parse(JSON.stringify({
        default: '6',
        field: 'mobColumn',
        translate: 1,
        name: {
          en: 'Mobile columns',
          'zh-CN': '移动端列数'
        },
        options: [
          {
            name: {
              en: '6 Columns',
              'zh-CN': '6 列'
            },
            value: '2'
          },
          {
            name: {
              en: '4 Columns',
              'zh-CN': '4 列'
            },
            value: '3'
          },
          {
            name: {
              en: '3 Columns',
              'zh-CN': '3 列'
            },
            value: '4'
          },
          {
            name: {
              en: '2 Columns',
              'zh-CN': '2 列'
            },
            value: '6'
          },
          {
            name: {
              en: '1 Column',
              'zh-CN': '1 列'
            },
            value: '12'
          }
        ],
        type: 'select',
        info: {
          en: '',
          'zh-CN': ''
        }
      }
      )))
    },
    /**
     * 类型改变
     * @param el
     */
    changeType (el) {
      if (el.type === 'imagePicker') {
        el.altFiled = ''
      } else if (el.type === 'productCollectionPicker' || el.type === 'articleCollectionPicker') {
        el.quantity = 10
      } else if (el.type === 'slider') {
        el.default = 10
        el.min = 0
        el.max = 100
        el.step = 1
      } else {
        delete el.altFiled
        delete el.quantity
        delete el.min
        delete el.step
        delete el.max
        el.default = ''
      }
    },
    /**
     *
     * @param index
     * @param eIndex
     */
    removeElement (index, eIndex) {
      this.entity.sectionSchema.group[index].elements.splice(eIndex, 1)
    },
    copyElement (index, eIndex) {
      let ob = JSON.parse(JSON.stringify(this.entity.sectionSchema.group[index].elements[eIndex]))
      this.entity.sectionSchema.group[index].elements.splice(eIndex, 0, ob)
    },
    /**
     * 删除
     * @param index
     * @param eIndex
     * @param oIndex
     */
    removeOption (index, eIndex, oIndex) {
      this.entity.sectionSchema.group[index].elements[eIndex].options.splice(oIndex, 1)
    },
    /**
     * 保存
     * @param save 是否保存
     */
    formValidation (save) {
      this.getSchemeResult(true)
      if (!save) {
        this.$emit('close', null)
        this.$emit('update:visible', false)
      } else {
        let formName = 'schemaItems'
        delete this.entity.sectionSchema.avatar
        delete this.entity.sectionSchema.icon
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let sectionData = JSON.parse(JSON.stringify(this.entity.sectionData))
            for (let key in sectionData.dataset) {
              sectionData.dataset[key].data = []
            }
            this.$emit('close', {
              sectionData: JSON.stringify(sectionData),
              sectionSchema: JSON.stringify(this.entity.sectionSchema),
              translateField: JSON.stringify(this.entity.sectionSchema.translate),
              once: this.entity.sectionSchema.onlyOnce ? 0 : 1,
              sectionName: this.entity.sectionSchema.name['zh-CN'],
              sectionEnName: this.entity.sectionSchema.name['en'],
              id: this.dataId
            })
            this.$emit('update:visible', false)
          }
        })
      }
    },
    filterSVG () {
      this.entity.sectionSchema.icon = this.utility.filterHTML(this.entity.sectionSchema.icon, 'svg', 'width|height|class|fill')
      // console.log(this.entity.sectionSchema.icon)
    },
    /**
     * 获取默认值
     */
    getDefaultValue (elType, value) {
      switch (elType) {
        case 'switch':
          return value.toString().toLocaleLowerCase() === 'true'
        case 'slider':
        case 'positiveInteger':
          return parseInt(value)
        default:
          if (value === null || value === undefined) {
            let s = this.controls.filter((o) => {
              return o.value === elType && !o.dataType
            })
            value = s[0].default
          }
          return value
      }
    },
    /**
     * 获取默认值
     */
    getDefault (sectionSchema) {
      let data = {
        dataset: {},
        sectionAlias: sectionSchema.name['zh-CN']
      }
      let translateFields = {
        rootFields: []
      }
      sectionSchema.group.forEach((o) => {
        const sub = {}
        let subFields = []
        o.max = parseInt(o.max)
        if (o.dataType && !o.multiple > 0) {
          o.max = 1
        }
        o.elements.forEach((b) => {
          if (b.type !== 'divider') {
            b.field = b.field.trim()
            if (b.quantity !== undefined) {
              b.quantity = parseInt(b.quantity.toString())
            }
            let translate = this.getTranslate(b.type)
            if (o.dataType) {
              translateFields[b.field] = []
              data.dataset[b.field] = {
                type: b.type.replace('Picker', ''),
                quantity: parseInt(o.multiple > 0 ? o.max : b.quantity),
                dataType: o.multiple,
                data: []
              }
              o.tag = b.field
              const df = this.getDataDefaultSettings(b.type, o.multiple)
              data.dataset[b.field].data.push(df.dataset)
              data[b.field] = df.default
            } else if (o.multiple > 0 && !o.dataType) {
              sub[b.field] = this.getDefaultValue(b.type, b.default)
              if (translate === 0) {
                subFields.push(b.field)
              }
            } else {
              data[b.field] = this.getDefaultValue(b.type, b.default)
              if (translate === 0) {
                translateFields.rootFields.push(b.field)
              }
            }
          }
          if (b.type === 'slider') {
            b.min = parseInt(b.min)
            b.max = parseInt(b.max)
            b.step = parseInt(b.step)
          }
        })
        if (o.multiple > 0 && !o.dataType) {
          if (this.utility.isEmpty(o.tag)) {
            o.tag = `d${Math.random().toString(36).substr(2, 4)}`
          }
          if (this.utility.isNotEmpty(o.tag)) {
            translateFields[o.tag] = subFields
            data.dataset[o.tag] = {
              type: 'normal',
              data: [sub]
            }
          }
        }
      })
      sectionSchema.default = data
      sectionSchema.translate = translateFields
      return sectionSchema
    },
    /**
     * 获取翻译字段
     * @param controlType 控件类型
     */
    getTranslate (controlType) {
      let s = preset.controls.filter((o) => {
        return o.value === controlType
      })
      return s.length > 0 ? s[0].translate : 1
    },
    /**
     * 动态组件默认值
     */
    getDataDefaultSettings (controlType, multiple) {
      controlType = controlType.indexOf('Picker') === -1 ? controlType + 'Picker' : controlType
      const sectionData = defaultSettings[controlType][multiple]
      if (controlType === 'inquiryFormPicker') {
        return defaultSettings.inquiryFormPicker
      } else if (controlType === 'menuPicker') {
        return defaultSettings.menuPicker
      } else {
        return sectionData || {
          dataset: {},
          default: {}
        }
      }
    },
    /**
     * 更新 schema
     * @param save 是否保存
     */
    getSchemeResult (save) {
      if (save) {
        this.entity.sectionSchema.default = this.getDefault(this.entity.sectionSchema).default
        this.entity.sectionData = this.entity.sectionSchema.default
        if (this.entity.sectionSchema.type === 'anchorNavigation') {
          this.entity.sectionSchema.default.dataset.menuList = {
            type: 'normal',
            data: []
          }
        }
        let debugData = {
          section: {
            sectionSalt: this.salt || '',
            sectionId: this.dataId || '',
            sectionType: this.entity.sectionSchema.type,
            ...this.entity.sectionSchema.default
          },
          fo: {
            site: {
              'addOnHeader': '-附加标题',
              'address': 'Baidu Campus, No. 10 Shangdi 10th Street, Haidian District, Beijing, China1',
              'areaCode': '',
              'articleQuantity': 0,
              'cityName': '崇文区',
              'company': 'fomille',
              'contact': 'devin shieh',
              'countryName': '中国',
              'createTime': 1577264254667,
              'currencyCode': '$',
              'currencyName': '美元',
              'currencySymbol': '$',
              'defaultRegion': 0,
              'downPass': '1235',
              'email': 'devin@fomille.com',
              'expiryTime': 1700064000000,
              'facebookPixel': '',
              'favicon': '',
              'formQuantity': 0,
              'freePhone': '+86-4008000000',
              'goodsQuantity': 0,
              'honestScore': 0,
              'keepLang': 1,
              'langName': 'English',
              'latitude': 39.911019000000000,
              'lengthUnit': 'mm',
              'logisticsScore': 0,
              'logo': '',
              'longitude': 116.396315000000000,
              'mainDomain': 'five.123.com',
              'maxLang': 1,
              'mobile': '13800138000',
              'phone': '0755-88888888',
              'praiseRate': 0,
              'provinceName': '北京',
              'region': 'en',
              'rootLink': 'https://five.123.com/',
              'scriptBottom': '',
              'scriptHead': '',
              'scriptService': '',
              'serviceScore': 0,
              'siteId': '1209760082859032577',
              'siteName': 'B2B开发测试（勿删）',
              'siteType': 3,
              'state': 0,
              'synopsis': '',
              'systemDomain': 'five.123.com',
              'timeZone': 'Asia/Rangoon',
              'unitSystem': 'metric',
              'videoLimit': 0,
              'weightUnit': 'g'
            },
            globalColors: {
              'colorLinkHover': '#B09869',
              'colorButtonLabel': '#FFFFFF',
              'colorButton': '#1688d3',
              'colorRoundButton': '#000000',
              'colorSecondary': '#909399',
              'colorButtonHover': '#B09869',
              'colorPrice': '#E6A23C',
              'colorRoundButtonLabel': '#FFFFFF',
              'colorBorder': 'rgba(10, 58, 169, 1)',
              'colorEnquiryButton': '#1688D3',
              'colorBody': '#606266',
              'sectionAlias': '颜色',
              'colorButtonHoverLabel': '#FFFFFF',
              'colorLink': 'rgba(174, 7, 245, 1)',
              'colorHeading': 'rgba(34, 21, 171, 1)',
              'colorEnquiryButtonLabel': '#FFFFFF',
              'colorTheme': 'rgba(249, 238, 23, 1)',
              'dataset': {},
              'colorSubheading': '#302E2F'
            },
            globalFavicon: {
              'sectionAlias': '收藏图标',
              'favicon': '/cdn/1209760082859032577/1463865522223030288.webp',
              'dataset': {}
            },
            page: {
              'seoH1': 'Home',
              'seoUrl': '/',
              'pageType': 'homePage',
              'seoDescription': '',
              'id': '1463865511414325249',
              'title': '首页',
              'seoTitle': '(Nothingness)卫浴1',
              'seoKeywords': ''
            },
            globalGeneral: {
              'paddingHeight': 40,
              'colorButton': '#1688d3',
              'objectFit': 'cover',
              'cardBoxShadow': 4,
              'cardShadowHoverColor': 'rgba(4, 154, 82, 0.7)',
              'buttonPadding': 30,
              'auxiliaryVisible': true,
              'colorBorder': '#DCDFE6',
              'sectionAlias': '通用设置',
              'emailVisible': '',
              'borderRadius': '0.25rem',
              'colorHeading': '#303133',
              'borderWidth': 10,
              'menuLayout': 'appose',
              'barLayout': 'invisible',
              'colorTheme': '#1688D3',
              'barBackground': '',
              'cardBorderRadius': 4,
              'cardShadowColor': 'rgba(20, 19, 19, 0.17)',
              'marginHeight': 40,
              'borderStyle': 'dashed',
              'dataset': {}
            },
            params: {
              'cache': {},
              'canonical': 'https://five.123.com/',
              'collectionId': '',
              'defaultRegion': 0,
              'design': false,
              'domain': 'five.123.com',
              'ids': [],
              'itemLink': '/',
              'mainDomain': 'five.123.com',
              'originalURL': '/',
              'pageIndex': 1,
              'pageSize': 12,
              'pageType': 'homePage',
              'params': {},
              'region': 'en',
              'siteId': '1209760082859032577',
              'sortBy': '',
              'url': '',
              'urlPrefix': '/'
            },
            globalTypography: {
              'fontSizeBody': 16,
              'typeContentHeading': "'Gill Sans', 'Gill Sans MT', Calibri, sans-serif",
              'fontSizeContentHeadingMob': 16,
              'fontSizeMenuMob': 16,
              'fontSizeHeading': 35,
              'fontSizeSubheading': 18,
              'fontSizeHeadlineMob': 20,
              'typeSubheading': "'Arvo'",
              'fontSizeSubheadingMob': 16,
              'sectionAlias': '字体',
              'typeHeadline': "'Gill Sans', 'Gill Sans MT', Calibri, sans-serif",
              'fontSizeHeadline': 26,
              'fontSizeHeadingMob': 18,
              'typeBody': "Arial, 'Helvetica Neue', Helvetica, sans-serif",
              'fontSizeBodyMob': 14,
              'typeMenu': "'Gill Sans', 'Gill Sans MT', Calibri, sans-serif",
              'typeHeading': "'Arvo'",
              'fontSizeContentHeading': 16,
              'fontSizeMenu': 20,
              'dataset': {}
            },
            globalSocial: {
              'socialPinterest': 'https://www.facebook.com/fomille',
              'socialGooglePlus': 'https://www.facebook.com/fomille',
              'socialFancy': 'https://www.facebook.com/fomille',
              'socialVimeo': 'https://www.facebook.com/fomille',
              'socialYoutube': 'https://www.facebook.com/fomille',
              'sectionAlias': '社交媒体',
              'sloganBorder': '',
              'socialFacebook': 'https://www.facebook.com/fomille',
              'socialWeibo': 'https://www.facebook.com/fomille',
              'socialShareImage': '',
              'sloganBackground': '',
              'socialTumblr': 'https://www.facebook.com/fomille',
              'socialInstagram': 'https://www.facebook.com/fomille',
              'sloganColor': '',
              'logo': '',
              'socialTwitter': 'https://www.facebook.com/fomille',
              'dataset': {
                'socialImage': {
                  'data': [
                    {
                      'areaContent': 'logo',
                      'socialQRCode': '/cdn/1209760082859032577/1463865522223030300.webp',
                      'socialQRCodeAlt': '',
                      'areaHeading': 'Heading',
                      'areaRatio': '2',
                      'socialQRCodeLink': '/page/about-us-replace#About us'
                    },
                    {
                      'areaContent': 'logo',
                      'socialQRCode': '/cdn/1209760082859032577/1463865522223030288.webp',
                      'socialQRCodeAlt': '',
                      'areaHeading': 'Heading',
                      'areaRatio': '2',
                      'socialQRCodeLink': '/page/about-us-replace#About us'
                    },
                    {
                      'areaContent': 'logo',
                      'socialQRCode': '/cdn/1209760082859032577/1463865522223030276.webp',
                      'socialQRCodeAlt': '',
                      'areaHeading': 'Heading',
                      'areaRatio': '2',
                      'socialQRCodeLink': '/page/about-us-replace#About us'
                    }
                  ],
                  'type': 'normal'
                }
              },
              'socialSnapchat': 'https://www.facebook.com/fomille',
              'slogan': '',
              'socialLinkedin': 'https://www.facebook.com/fomille'
            }
          },
          lang: {
            'whatsapp': 'Whatsapp',
            'skype': 'Skype',
            'address': 'Address',
            'phone': 'Phone',
            'global': {
              'product': 'PRODUCTS',
              'keywords': 'KEYWORDS',
              'lang': '英语',
              'article': 'NEWS',
              'home': 'HOME'
            },
            'lang': '英语',
            'fax': 'Fax',
            'email': 'Email'
          }
        }
        copyToClipboard(JSON.stringify(debugData))
      }
    },
    /**
     * 转义JSON
     */
    pasteCode () {
      if (this.utility.isEmpty(this.codeJSON)) {
        return false
      }
      try {
        let schema = JSON.parse(this.codeJSON)
        schema.group = JSON.parse(JSON.stringify(schema.settings))
        schema.group.forEach((o) => {
          if (!o.tips) {
            o.tips = {
              en: '',
              'zh-CN': ''
            }
          }
          o.elements.forEach((sb) => {
            if (sb.type === 'slider') {
              sb.default = parseInt(sb.default.toString())
            }
          })
        })
        // if (!schema.avatar) {
        //   schema.avatar = ''
        // }
        delete schema.settings
        this.entity.sectionSchema = JSON.parse(JSON.stringify(schema))
        this.entity.sectionData = this.entity.sectionSchema.default
        if (this.entity.sectionSchema.global === undefined) {
          this.entity.sectionSchema.global = false
        }
        if (this.entity.sectionSchema.onlyOnce === undefined) {
          this.entity.sectionSchema.onlyOnce = false
        }
        this.copyVisible = false
      } catch (e) {
        this.$message({
          message: 'Schema 格式错误',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
