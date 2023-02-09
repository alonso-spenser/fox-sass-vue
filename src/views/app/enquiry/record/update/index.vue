<template>
  <main>
    <fo-page-header
      :previous="true"
    ></fo-page-header>
    <fo-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
    >
      <div class="enquiry-page">
        <el-row :gutter="20">
          <el-col :span="17">
            <!--询盘详情-->
            <fo-page-section class="enquiry-content">
              <div class="enquiry-state">
                <el-tag
                  size="small"
                  :type="
                      this.utility.getDicType(
                       this.$t('enquiry.record.recordState'),
                        enquiryDetail.state,
                        'type'
                      )
                    "
                >{{
                    this.utility.getDicType(
                      this.$t('enquiry.record.recordState'),
                      enquiryDetail.state
                    )
                 }}
                </el-tag
                >
              </div>
              <template
                v-for="(item, index) in Object.entries(enquiryDetail.content)"
              >
                <el-row
                  :gutter="20"
                  :key="index">
                  <el-col :span="6">
                    {{ item[0] }}
                  </el-col>
                  <el-col :span="18">
                    <span v-if="item[0] !== 'Attachment'">{{ item[1] }} </span>
                    <a
                      class="text-primary"
                      :href="item[1]"
                      target="_blank"
                      :download="`Attachment${enquiryDetail.id}`"
                      v-else>下载附件</a>
                  </el-col>
                </el-row>
              </template>
              <el-row
                :gutter="20"
                v-if="enquiryDetail.hasAnnex"
              >
                <el-col :span="6">
                  附件
                </el-col>
                <el-col :span="18">
                  <a
                    target="_blank"
                    class="text-primary"
                    :href="enquiryDetail.annex"
                  >下载附件</a>
                </el-col>
              </el-row>
            </fo-page-section>

            <!--询盘来源-->
            <fo-page-section
              :heading="$t('enquiry.form.section.source.heading')"
              class="enquiry-content"
            >
              <el-row :gutter="20">
                <el-col :span="6">
                  {{ $t('enquiry.form.section.source.refTitle') }}
                </el-col>
                <el-col :span="18">
                  <a
                    :href="enquiryDetail.refUrl"
                    class="text-secondary"
                    target="_blank">{{
                      enquiryDetail.refTitle
                                    }}</a>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  {{ $t('enquiry.form.section.source.refUrl') }}
                </el-col>
                <el-col :span="18">
                  <a
                    :href="enquiryDetail.refUrl"
                    class="text-secondary"
                    target="_blank">{{ enquiryDetail.refUrl }}</a>
                </el-col>
              </el-row>
              <el-row
                v-if="enquiryDetail.userAgent"
                :gutter="20">
                <el-col :span="6">
                  {{ $t('enquiry.form.section.source.userAgent') }}
                </el-col>
                <el-col :span="18">
                  {{ enquiryDetail.userAgent }}
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  {{ $t('enquiry.recordDetails.userInfoLabel.code') }}
                </el-col>
                <el-col :span="18">
                  {{ enquiryDetail.id }}
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  {{ $t('enquiry.recordDetails.userInfoLabel.form') }}
                </el-col>
                <el-col :span="18">
                  {{ enquiryDetail.formName }}
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  {{ $t('enquiry.recordDetails.userInfoLabel.ip') }}
                </el-col>
                <el-col :span="18">
                  <div>{{ enquiryDetail.formIp }}</div>
                  <div v-if="enquiryDetail.country || enquiryDetail.province || enquiryDetail.city">
                    ({{ enquiryDetail.country }}{{
                      enquiryDetail.province
                    }}{{ enquiryDetail.city }})
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  {{ $t('enquiry.recordDetails.userInfoLabel.time') }}
                </el-col>
                <el-col :span="18">
                  {{ this.utility.dateFormat(new Date(enquiryDetail.createTime), 'yyyy-MM-dd hh:mm:ss') }}
                </el-col>
              </el-row>
            </fo-page-section>
            <!--跟踪记录-->
            <fo-page-section
              :heading="$t('enquiry.form.section.record.heading')"
              class="enquiry-record">
              <div>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 5 }"
                  maxlength="255"
                  show-word-limit
                  :placeholder="$t('base.placeholder.input')"
                  v-model="enquiryStateModel.remark"
                ></el-input>
                <div class="text-right">
                  <el-button
                    class="mt-4"
                    type="primary"
                    @click="handleConfirm"
                    :disabled="this.utility.isEmpty(enquiryStateModel.remark)"
                  >{{ $t('base.operate.add') }}
                  </el-button
                  >
                </div>
              </div>
              <!--状态处理-->
              <div class="mt-6">
                <el-timeline class="enquiry-record-timeline">
                  <el-timeline-item
                    v-for="timeline in enquiryRecordList"
                    :key="timeline.id"
                    :hide-timestamp="true"
                    color="#3F9EFF"
                    placement="top"
                  >
                    <div class="enquiry-record-timeline-item">
                      <el-row
                        type="flex"
                        justify="space-between">
                        <div class="label text-capitalize">{{ timeline.operator }} {{ timeline.clientName }}</div>
                        <div class="timestamp">
                          {{ utility.dateFormat(new Date(timeline.replyTime), 'yyyy-MM-dd hh:mm:ss') }}
                        </div>
                      </el-row>
                      <div class="remark mt-2">
                        {{ timeline.remark || "remark" }}
                      </div>
                      <el-divider></el-divider>
                    </div>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </fo-page-section>
          </el-col>
          <el-col :span="7">
            <fo-page-section>
              <div
                class="user-info"
                @click="clientPage">
                <el-avatar
                  style="background: #46a0fc"
                  v-if="avatar">
                  {{ avatar }}
                </el-avatar>
                <el-avatar
                  icon="el-icon-user-solid"
                  style="background: #46a0fc"
                  v-else
                ></el-avatar>
                <h3 class="mt-3 text-primary">
                  {{ enquiryDetail.client.firstName }}
                  {{ enquiryDetail.client.lastName }}
                </h3>
                <p class="text-secondary">
                  {{ enquiryDetail.client.email }}
                </p>
                <p class="text-secondary">
                  {{ enquiryDetail.client.phone }}
                </p>
                <div class="mt-7">{{ $t('enquiry.recordDetails.userInfoLabel.userSubmit') }}</div>
                <div class="count mt-3">{{ enquiryDetail.client.enquires }}</div>
              </div>
            </fo-page-section>
            <fo-page-section
              v-if="enquiryDetail.refImg"
            >
              <el-image
                class="w-100 mb-5"
                :src="enquiryDetail.refImg || imagePlaceholder"
                fit="fill"
              >
                <div
                  slot="error"
                  class="image-slot image-slot-error"></div>
              </el-image>
              <el-button
                class="w-100"
                type="primary"
                @click="dialogVisible = true"
              >
                {{ $t('enquiry.recordDetails.change') }}
              </el-button>
            </fo-page-section>
            <el-button
              class="w-100"
              type="primary"
              v-if="!enquiryDetail.refImg"
              @click="dialogVisible = true"
            >
              {{ $t('enquiry.recordDetails.change') }}
            </el-button>
          </el-col>
        </el-row>
        <el-dialog
          :title="$t('enquiry.recordDetails.change')"
          :visible.sync="dialogVisible"
          :close-on-click-modal="false"
          width="550px">
          <el-form
            :model="enquiryStateModel"
            ref="stateChangeForm"
            label-position="top"
          >
            <el-form-item :label="$t('enquiry.record.tableHeader.state')">
              <el-select
                v-model="enquiryStateModel.state"
                :placeholder="$t('base.placeholder.select')"
              >
                <el-option
                  v-for="{ label, value } in  $t('enquiry.record.recordState')"
                  :key="value"
                  :label="label"
                  :value="value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('enquiry.form.tableHeader.remark')">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5 }"
                maxlength="255"
                show-word-limit
                :placeholder="$t('base.placeholder.input')"
                v-model.trim="enquiryStateModel.remark"
              ></el-input>
            </el-form-item>
          </el-form>
          <span
            slot="footer"
            class="dialog-footer">
          <el-button @click="dialogVisible = false">{{ $t('base.operate.cancel') }}</el-button>
          <el-button
            type="primary"
            :disabled="enquiryStateModel.state === enquiryDetail.state"
            @click="handleConfirm"
          >{{ $t('base.operate.confirm') }}</el-button
          >
        </span>
        </el-dialog>
      </div>
    </fo-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/paging'
import { fetchEnquiryDetail, fetchEnquiryRecordAdd, fetchEnquiryRecordList } from '@/plugins/api/enquiry'

export default {
  name: 'enquiryDetail',
  extends: extend,
  data () {
    return {
      dialogVisible: false,
      enquiryStateModel: {
        state: null
      },
      enquiryDetail: {
        formIp: '',
        client: {},
        content: {}
      },
      enquiryRecordList: [],
      imagePlaceholder: 'https://theme.fomillesite.com/img/placeholder.jpg'
    }
  },
  computed: {
    avatar () {
      const { firstName, lastName } = this.enquiryDetail.client
      return firstName ? firstName.charAt() : lastName ? lastName.charAt() : ''
    }
  },
  watch: {
    dialogVisible (val) {
      if (!val) {
        this.enquiryStateModel.remark = ''
      }
      this.enquiryStateModel.state = this.enquiryDetail.state
    }
  },
  created () {
    if (this.id) {
      this.getDetail()
      this.getEnquiryRecord()
    } else {
      this.pageValid()
    }
  },
  methods: {
    /**
     * 用户页面
     */
    clientPage () {
      this.$router.push(`/site/${this.siteId}/client/update/${this.enquiryDetail.client.id}`)
    },
    /**
     * 添加询盘跟踪记录
     */
    handleConfirm () {
      if (
        this.enquiryStateModel.state === this.enquiryDetail.state &&
        !this.enquiryStateModel.remark
      ) {
        this.dialogVisible = false
        return
      }
      const params = {
        enquiryId: this.id,
        ...this.enquiryStateModel,
        replayMessage: this.enquiryStateModel.remark

      }
      fetchEnquiryRecordAdd(params)
        .then(result => {
          this.pageValid()
          this.resultMessage(result, success => {
            if (success) {
              this.$message.success(result.msg)
              this.enquiryDetail.state = this.enquiryStateModel.state
              this.enquiryStateModel.remark = ''
              this.getEnquiryRecord()
              this.dialogVisible = false
            } else {
              this.$message.error(result.msg)
            }
          })
        })
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 获取详情
     */
    getDetail () {
      fetchEnquiryDetail({
        siteId: this.siteId,
        id: this.id
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, success => {
            if (success) {
              this.enquiryDetail = {
                ...result.data,
                content: JSON.parse(result.data.content)
              }
              this.enquiryStateModel.state = result.data.state
            }
          })
        })
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 询盘追踪记录列表
     */
    getEnquiryRecord () {
      const params = {
        siteId: this.siteId,
        id: this.id
      }
      fetchEnquiryRecordList(params)
        .then(result => {
          this.pageValid()
          this.resultMessage(result, success => {
            if (success) {
              this.enquiryRecordList = result.data
            }
          })
        })
        .catch(error => {
          this.pageInvalid(error)
        })
    }
  }
}
</script>

<style lang="scss">
.enquiry-page {
  &-img {
    width: 60px;
    height: 60px;
  }

  &-label,
  &-value {
    word-break: break-all;
    font-size: 14px;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  &-value {
    color: #c0c4cc;
  }

  .enquiry-content {
    position: relative;

    .enquiry-state {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    min-height: 100px;

    .el-row {
      .el-col {
        padding-top: 8px;
        padding-bottom: 8px;
      }

      .el-col-18 {
        color: #909399;
      }

      &:not(:last-child) {
        border-bottom: 1px solid #EBEEF5;
      }
    }
  }

  .enquiry-record {
    &-timeline {
      padding-left: 0;

      &-item {
        .el-divider {
          margin: 12px 0;
        }

        .timestamp,
        .label {
          color: #c0c4cc;
        }

        .remark {
          color: #909399;
        }
      }
    }
  }

  .user-info {
    text-align: center;

    .count {
      font-size: 32px;
    }

    .el-avatar,
    h3 {
      text-transform: uppercase;
    }

    p {
      margin: 5px 0 0 0;
    }
  }

  .state-tag {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 20px;
    background: #f4f4f5;
  }

  .download-link {
    text-decoration: underline;
  }

  .fo-page-section-title {
    margin: 16px 0;
  }
}
</style>
