<template>
  <el-container id="mainCard">
    <el-card id="queryRow">
      <el-form
        :model="reminderParams"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row class="marginL">
          <el-col :md="7" :lg="5" :xl="5">
            <el-form-item label="产品号:">
              <!-- <el-input
                clearable
                v-model="reminderParams.p_Code"
                placeholder="请输入产品号"
              ></el-input> -->
              <el-autocomplete
                clearable
                @keyup.enter.native="search()"
                v-model="reminderParams.p_Code"
                :fetch-suggestions="querySearch"
                placeholder="请输入产品号"
              />
            </el-form-item>
          </el-col>
          <el-col :md="5" :lg="3" :xl="3">
            <el-form-item label="站点:">
              <el-select
                clearable
                v-model="reminderParams.bakField6"
                placeholder="站点"
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in shopList"
                  :label="item.Name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="10" :lg="5" :xl="5"
            ><el-form-item label="制单时间:">
              <span class="blockDate">
                <el-date-picker
                  v-model="reminderParams.beginDate"
                  class="None-Border"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="制单开始时间"
                ></el-date-picker>
                <el-date-picker
                  v-model="reminderParams.endDate"
                  class="None-Border"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="制单结束时间"
                ></el-date-picker>
              </span> </el-form-item
          ></el-col>

          <el-col :md="5" :lg="3" :xl="3">
            <el-form-item label="关闭:">
              <el-select
                clearable
                v-model="reminderParams.isClose"
                placeholder="请选择"
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in IsClose"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="marginLe" :md="6" :lg="3" :xl="3">
            <el-form-item label="生产下单状态:">
              <el-select
                clearable
                v-model="reminderParams.status"
                class="unifySize marginLeft"
                placeholder="请选择"
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in status"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="5" :lg="3" :xl="3">
            <el-button
              v-if="iconShow"
              type="danger"
              class="searchBtn"
              size="small"
              :loading="isLoading"
              @click="search"
              icon="iconfont kt-icon-sousuo_o"
              >查询</el-button
            >
            <el-button
              v-if="iconShow"
              type="danger"
              class="closeInput shrink"
              size="small"
              @click="IconShow"
              icon=" iconfont kt-icon-anniu_jiantouzhankai"
              >展开</el-button
            >
          </el-col>
        </el-row>
        <el-row v-show="!iconShow" class="marginL">
          <el-col :md="7" :lg="5" :xl="5">
            <el-form-item label="订单号:">
              <!-- <el-input
                clearable
                v-model="reminderParams.contractCode"
                placeholder="请输入订单号"
              ></el-input> -->
              <el-autocomplete
                clearable
                @keyup.enter.native="search()"
                v-model="reminderParams.contractCode"
                :fetch-suggestions="querySearch2"
                placeholder="请输入订单号"
              />
            </el-form-item>
          </el-col>
          <el-col :md="6" :lg="3" :xl="3">
            <el-form-item label-width="100px" label="催单天数:">
              <el-select
                @change="dataChange"
                v-model="reminderParams.intDays"
                placeholder="请选择"
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in reminderDate"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="10" :lg="5" :xl="5"
            ><el-form-item label="催单时间:">
              <span class="blockDate">
                <el-date-picker
                  :disabled="this.reminderParams.intDays !== '0' ? true : false"
                  v-model="reminderParams.cdBeginDate"
                  class="None-Border"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="催单开始"
                ></el-date-picker>
                <el-date-picker
                  :disabled="this.reminderParams.intDays !== '0' ? true : false"
                  class="None-Border"
                  v-model="reminderParams.cdEndDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="催单结束"
                ></el-date-picker>
              </span> </el-form-item
          ></el-col>
          <el-col :md="6" :lg="3" :xl="3">
            <el-form-item label-width="100px" label="记录数:">
              <el-select
                clearable
                v-model="reminderParams.row"
                placeholder="请选择"
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in recordNum"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="5" :lg="4" :xl="4">
            <el-button
              type="danger"
              class="searchBtn"
              size="small"
              @click="search"
              :loading="isLoading"
              icon="iconfont kt-icon-sousuo_o"
              >查询</el-button
            >
            <el-button
              type="danger"
              class="shrink closeInput"
              size="small"
              @click="IconShow"
              icon=" iconfont kt-icon-anniu_jiantoushouqi"
              >收起</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <!-- 按钮区域 -->
          <el-col class="secondBtn">
            <!-- <el-button
              type="primary"
              @click="distributionBtn"
              class="iconBtn iconfont kt-icon-caidan"
              >自动分配</el-button
            > -->
            <el-button
              type="primary"
              @click="Clearing"
              class="iconBtn iconfont kt-icon-caidan"
              >一键清零</el-button
            >
            <el-button
              type="primary"
              @click="exportExcel"
              class="iconBtn iconfont kt-icon-daochu"
              >导出Excel</el-button
            >
            <el-button
              type="primary"
              @click="batchReminder"
              class="iconBtn iconfont kt-icon-caidan"
              >批量催单</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 下方表格区域 -->
    <el-row :gutter="10">
      <el-col :span="18" style="padding-right: 0px">
        <el-card class="marginTop">
          <el-form
            :model="renminderTable"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label-width="74px" label="产品号:">
                  <!-- <el-input
                    clearable
                    @keyup.enter.native="select"
                    @blur="select"
                    v-model="renminderTable.contractCode"
                    placeholder="请输入产品号"
                  ></el-input> -->
                  <el-autocomplete
                    clearable
                    @keyup.enter.native="select"
                    @blur="select"
                    v-model="renminderTable.contractCode"
                    :fetch-suggestions="querySearch3"
                    placeholder="请输入产品号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="样式:">
                  <!-- <el-input
                    clearable
                    @keyup.enter.native="select"
                    @blur="select"
                    v-model="renminderTable.p_size"
                    placeholder="请输入样式"
                  ></el-input> -->
                  <el-autocomplete
                    clearable
                    @keyup.enter.native="select"
                    @blur="select"
                    v-model="renminderTable.p_size"
                    :fetch-suggestions="querySearch4"
                    placeholder="请输入样式"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="颜色:">
                  <!-- <el-input
                    clearable
                    @keyup.enter.native="select"
                    @blur="select"
                    v-model="renminderTable.color"
                    placeholder="请输入颜色"
                  ></el-input> -->
                  <el-autocomplete
                    clearable
                    @keyup.enter.native="select"
                    @blur="select"
                    v-model="renminderTable.color"
                    :fetch-suggestions="querySearch5"
                    placeholder="请输入颜色"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="尺寸:">
                  <!-- <el-input
                    clearable
                    @blur="select"
                    @keyup.enter.native="select"
                    v-model="renminderTable.size"
                    placeholder="请输入尺寸"
                  ></el-input> -->
                  <el-autocomplete
                    clearable
                    @blur="select"
                    @keyup.enter.native="select"
                    v-model="renminderTable.size"
                    :fetch-suggestions="querySearch6"
                    placeholder="请输入尺寸"
                  />
                </el-form-item>
              </el-col>
              <!-- <el-col :span="4">
                <el-form-item label="状态:">
                  <el-select
                    @change="inputBlur5"
                    v-model="renminderTable.status"
                    placeholder="请选择状态"
                  >
                    <el-option
                      :key="index"
                      v-for="(item, index) in statusList"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="2" class="saveBtnC">
                <el-button
                  type="primary"
                  @click="saveLeftTable"
                  class="saveMarLeft saveBtn iconfont kt-icon-baocun"
                  >保存</el-button
                >
              </el-col>
            </el-row>
          </el-form>

          <!-- 表格 -->
          <el-row>
            <el-col>
              <vxe-table
                ref="leftTable"
                border
                resizable
                stripe
                class="mytable-scrollbar"
                keep-source
                show-footer
                :export-config="{ original: true }"
                @cell-click="clickSearch"
                :footer-method="leftfooterMethod"
                :row-class-name="cellClass"
                :footer-cell-class-name="footerCellClassName"
                show-overflow
                :height="!iconShow ? gridHeight : gridHeight"
                :auto-resize="true"
                :edit-config="{ trigger: 'click', mode: 'cell' }"
                :header-cell-class-name="hearderClassNoHeight"
                highlight-current-row
                :config="{ render: 'scroll' }"
                :align="'center'"
                :checkbox-config="{ highlight: true }"
                :data="bottomTableLeft"
              >
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  fixed="left"
                  type="seq"
                  width="45"
                  title="序号"
                ></vxe-table-column>
                <vxe-table-column
                  :align="'left'"
                  :class-name="cellChooseClassLeft"
                  fixed="left"
                  field="订单编号"
                  width="120"
                  title="订单号"
                ></vxe-table-column>
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  fixed="left"
                  min-width="200"
                  field="产品号"
                  title="产品编码"
                >
                  <template slot-scope="{ row }">
                    <span>{{ row.产品号 }}</span>
                    <br />
                    <span>{{ row.产品名称 }}</span>
                  </template>
                </vxe-table-column>
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  width="60"
                  field="样式"
                  title="样式"
                ></vxe-table-column>
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  width="50"
                  field="色号"
                  title="色号"
                >
                  <template slot-scope="{ row }">
                    <span>{{ row.色号 }}</span>
                    <br />
                    <span>{{ row.颜色 }}</span>
                  </template>
                </vxe-table-column>
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  width="80"
                  field="尺寸"
                  title="尺寸"
                >
                  <template slot-scope="{ row }">
                    <span>{{ row.尺寸 }}</span>
                    <br />
                    <span>{{ row.尺寸单位名称 }}</span>
                  </template>
                </vxe-table-column>
                <vxe-table-colgroup title="订单数量">
                  <vxe-table-column
                    width="60"
                    :class-name="cellChooseClassLeft"
                    field="原始数量"
                    title="原始"
                  >
                    <template slot-scope="{ row }">
                      <span>{{ row.原始数量 }}</span>
                      <br />
                      <span>{{ row.单位名称 }}</span>
                    </template>
                  </vxe-table-column>
                  <vxe-table-column
                    :class-name="cellChooseClassLeft"
                    width="70"
                    :edit-render="{
                      name: 'input',
                      attrs: { type: 'text' },
                      autoselect: true,
                    }"
                    field="取消数量"
                    title="取消"
                  >
                    <template v-slot:edit="{ row }">
                      <vxe-input
                        type="number"
                        :min="0"
                        v-model="row.取消数量"
                        @blur="ptypeBlurEvent(row)"
                      ></vxe-input>
                    </template>
                  </vxe-table-column>
                  <vxe-table-column
                    :class-name="cellChooseClassLeft"
                    width="60"
                    field="数量"
                    title="实际"
                  ></vxe-table-column>
                </vxe-table-colgroup>
                <vxe-table-colgroup title="生产下单数量">
                  <vxe-table-column
                    width="60"
                    :class-name="cellChooseClassLeft"
                    field="待下单数"
                    title="待下"
                  ></vxe-table-column>
                  <vxe-table-column
                    :class-name="cellChooseClassLeft"
                    width="60"
                    field="已下单数"
                    title="已下"
                  ></vxe-table-column>
                </vxe-table-colgroup>
                <vxe-table-colgroup title="催单数量">
                  <vxe-table-column
                    :class-name="cellChooseClassLeft"
                    width="60"
                    field="急需下单数"
                    title="累计"
                  ></vxe-table-column>
                  <vxe-table-column
                    width="60"
                    :class-name="cellChooseClassLeft"
                    :edit-render="{
                      name: 'input',
                      attrs: { type: 'text' },
                      autoselect: true,
                    }"
                    field="本次催单"
                    title="本次"
                  >
                    <template v-slot:edit="{ row }">
                      <vxe-input
                        type="number"
                        :min="0"
                        v-model="row.本次催单"
                      ></vxe-input>
                    </template>
                  </vxe-table-column>
                </vxe-table-colgroup>
                <vxe-table-column
                  width="73"
                  :class-name="cellChooseClassLeft"
                  field="优先级"
                  title="优先级"
                  :edit-render="{
                    name: '$select',
                    options: priorityList,
                    autoselect: true,
                  }"
                >
                </vxe-table-column>
                <vxe-table-column
                  width="60"
                  :class-name="cellChooseClassLeft"
                  :edit-render="{
                    name: 'input',
                    attrs: { type: 'text' },
                    autoselect: true,
                  }"
                  field="备注"
                  title="备注"
                ></vxe-table-column>
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  width="50"
                  field="关闭"
                  title="关闭"
                ></vxe-table-column>
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  width="230"
                  field="操作"
                  title="操作"
                >
                  <template slot-scope="{ row }">
                    <button class="CloseIcon" @click="iconOpen(row)">
                      关闭
                    </button>
                    <button class="NoCloseIcon" @click="iconClose(row)">
                      取消关闭
                    </button>
                    <button class="SaveIcon" @click="iconSave(row)">
                      保存
                    </button>
                    <button class="SaveIcon" @click="iconClear(row)">
                      清零
                    </button>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="tableRightTop">
          <el-row>
            <el-col class="tableRightTopTitle">
              <span class="remindetrDetail">催单明细</span>
              <span class="productNoStyle" ref="productNo"></span>
            </el-col>
          </el-row>
          <el-row>
            <vxe-table
              ref="righTopTable"
              border
              resizable
              stripe
              keep-source
              show-footer
              :footer-method="rightTopfooterMethod"
              :footer-cell-class-name="footerCellClassName"
              show-overflow
              :height="gridHeight * 0.7 - 35"
              class="mytable-scrollbar"
              :auto-resize="true"
              :edit-config="{ trigger: 'click', mode: 'cell' }"
              :header-cell-class-name="hearderClass"
              highlight-current-row
              :config="{ render: 'scroll' }"
              :align="'center'"
              :checkbox-config="{ highlight: true }"
              :data="bottomTableRightTop"
            >
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                type="checkbox"
                width="40"
              ></vxe-table-column>
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                type="seq"
                width="50"
                title="序号"
              ></vxe-table-column>
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                field="Inputdate"
                width="90"
                title="催单日期"
              >
                <template slot-scope="{ row }">
                  <span>{{ row.Inputdate | formatDate1 }}</span>
                </template>
              </vxe-table-column>
              <vxe-table-column
                :class-name="cellClassLeft"
                field="ReminderQuantity"
                width="80"
                title="催单数量"
              >
              </vxe-table-column>
              <vxe-table-column
                width="70"
                :class-name="cellChooseClassLeft"
                field="GradeName"
                title="优先级"
              ></vxe-table-column>
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                field="ReminderTypeName"
                width="60"
                title="类型"
              >
              </vxe-table-column>

              <vxe-table-column
                width="70"
                :class-name="cellChooseClassLeft"
                field="InputerName"
                title="催单人"
              ></vxe-table-column>
              <vxe-table-column
                :class-name="cellClassLeft"
                field="备注"
                width="120"
                title="备注"
              ></vxe-table-column>
            </vxe-table>
          </el-row>
        </el-card>
      </el-col>
      <el-col style="margin-top: 5px" :span="6">
        <el-card class="tableRightBottom">
          <el-row>
            <el-col class="tableRightTopTitle">
              <span>生产信息</span>
              <span>单位：片</span>
            </el-col>
          </el-row>
          <el-row>
            <vxe-table
              ref="rightTable"
              border
              resizable
              stripe
              class="mytable-scrollbar"
              keep-source
              :row-class-name="cellChooseClass"
              show-overflow
              :height="
                !iconShow ? gridHeight * 0.3 - 20 : gridHeight * 0.3 - 20
              "
              :auto-resize="true"
              show-footer
              :footer-method="rightBottomfooterMethod"
              :footer-cell-class-name="footerCellClassName"
              :header-cell-class-name="hearderClass"
              highlight-current-row
              :config="{ render: 'scroll' }"
              :align="'center'"
              :checkbox-config="{ highlight: true }"
              :data="bottomTableRightBottom"
            >
              <vxe-table-column type="checkbox" width="30"></vxe-table-column>
              <vxe-table-column
                type="seq"
                width="48"
                title="序号"
              ></vxe-table-column>
              <vxe-table-column
                width="120"
                field="生产单号"
                title="生产单号"
              ></vxe-table-column>
              <vxe-table-column width="90" field="下单日期" title="下单日期">
              </vxe-table-column>
              <vxe-table-column
                width="48"
                field="下单片数"
                title="下单"
              ></vxe-table-column>
              <vxe-table-column
                width="48"
                field="到货片数"
                title="到货"
              ></vxe-table-column>
              <vxe-table-column
                width="48"
                field="检验片数"
                title="已检"
              ></vxe-table-column>
              <vxe-table-column
                width="48"
                field="未检验片数"
                title="未检"
              ></vxe-table-column>
              <vxe-table-column
                width="48"
                field="关闭"
                title="关闭"
              ></vxe-table-column>
            </vxe-table>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 自动分配 -->
    <!-- <jy-dialog
      title="自动分配"
      :close-on-click-modal="false"
      :visible.sync="distributionDaialogVisible"
      append-to-body
      width="50%"
    >
      <el-row>
        <el-col>请输入分配数值(-1表示全部分配至满)</el-col>
        <el-col :span="24">
          <el-input
            v-model="distributionNum"
            class="unifySize1 "
          ></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              type="primary"
              @click="distribution"
              class="saveBtn iconfont kt-icon-baocun"
              >确定</el-button
            >
            <el-button
              type="primary"
              @click="distributionDaialogVisible = false"
              class="clearBtn"
              >取消</el-button
            >
          </el-col>
        </el-row>
      </span>
    </jy-dialog> -->

    <Batch-reminder
      @okDialog="infoOkDialog"
      v-if="showDialog"
      ref="BatchReminder"
    >
    </Batch-reminder>
  </el-container>
</template>

<script>
import BatchReminder from '../OrderManagement/BatchReminder'
import FileSaver from 'file-saver'
import JyDialog from '@/components/JyDialog'
import XLSX from 'xlsx'
export default {
  components: { BatchReminder },
  name: 'OrderReminder',
  data() {
    return {
      gridHeight: 0,
      // 主催单表参数
      reminderParams: {
        contractNo: '',
        beginDate: '',
        endDate: '',
        p_Code: '',
        contractCode: '',
        status: '',
        isClose: '0',
        intDays: '0',
        userCode: '',
        row: '200',
        cdBeginDate: '',
        cdEndDate: '',
        bakField6: '',
        id: '',
      },
      showDialog: false,
      isOperateWork: false,
      // 图标保存的参数
      iconSaveParams: {
        userCode: '',
        strList: '',
        strMessage: '',
        flag: '1',
      },
      cellClass: 'cellClass',
      // 筛选参数
      renminderTable: {
        contractCode: '',
        p_size: '',
        color: '',
        size: '',
        status: '',
      },
      columnIcon: '◇', //列分隔符
      // 优先级
      priorityList: [
        { label: '三星', value: '03' },
        { label: '四星', value: '04' },
        { label: '五星', value: '05' },
      ],
      //生产下单状态
      status: [
        {
          value: '',
          label: '',
        },
        {
          value: '0',
          label: '未催单',
        },
        {
          value: '1',
          label: '已催未下单',
        },
        {
          value: '2',
          label: '全部下单',
        },
      ],
      reminderDate: [
        {
          value: '0',
          label: '自定义',
        },
        {
          value: '1',
          label: '今天',
        },
        {
          value: '3',
          label: '3天内',
        },
        {
          value: '7',
          label: '7天内',
        },
        {
          value: '30',
          label: '30天内',
        },
      ],
      // statusList: [
      //   { value: '', label: '' },
      //   { value: '待催单', label: '待催单' },
      //   { value: '部分催单', label: '部分催单' },
      //   { value: '全部催单', label: '全部催单' },
      // ],
      // 记录数
      recordNum: [
        {
          value: '200',
          label: '200',
        },
        {
          value: '500',
          label: '500',
        },
        {
          value: '1000',
          label: '1000',
        },
      ],
      footerCellClassName: 'footerCellClassName',
      cellChooseClassLeft: 'cellChooseClassLeft',
      cellChooseClass: 'cellChooseClass',
      hearderClassNoHeight: 'hearderClassNoHeight',
      hearderClass: 'hearderClass',
      // 是否关闭
      IsClose: [
        { value: '', label: '' },
        { value: '1', label: '是' },
        { value: '0', label: '否' },
      ],
      distributionNum: '',
      iconShow: false,
      isLoading: false,
      bottomTableLeft: [],
      bottomTableRightBottom: [],
      filterList: [], //待筛选数据
      distributionDaialogVisible: false,
      bottomTableRightTop: [],
      shopList: [],
    }
  },
  methods: {
    // 增加输入框的记忆功能
    // 存放查询记录
    handleSearchHistory(localName, paramsName) {
      let searchWordArray = localStorage.getItem(localName)
      if (searchWordArray === null) {
        return
      } else {
        searchWordArray = searchWordArray.split(',')
        if (searchWordArray.indexOf(paramsName) === -1) {
          searchWordArray.unshift(paramsName)
        }
        if (searchWordArray.length > 6) {
          searchWordArray.pop()
        }
        localStorage.setItem(localName, searchWordArray)
      }
    },
    // 渲染历史记录
    getInvoiceAccountHistory(localName) {
      let searchWordArray = localStorage.getItem(localName)
      if (searchWordArray === null) {
        localStorage.setItem(localName, [])
      } else {
        searchWordArray = searchWordArray.split(',')
        let invoiceAccountHistory = []
        for (let i = 0; i < searchWordArray.length; i++) {
          let item = {
            value: searchWordArray[i],
            label: searchWordArray[i],
          }
          invoiceAccountHistory.push(item)
        }
        return invoiceAccountHistory
      }
    },
    createFilter(queryString) {
      return (invoiceAccount) => {
        return (
          invoiceAccount.value
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    // 返回输入建议的方法(订单号：)
    querySearch(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory(
        'reminder-p_Code'
      )
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 返回输入建议的方法(订单号：)
    querySearch2(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory(
        'reminder-orderNo'
      )
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 返回输入建议的方法(订单号：)
    querySearch3(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory(
        'reminder-filterProduceNo'
      )
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 返回输入建议的方法(尺寸)
    querySearch4(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory(
        'reminder-filterp_size'
      )
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 返回输入建议的方法(颜色)
    querySearch5(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory(
        'reminder-filtercolor'
      )
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 返回输入建议的方法(尺寸)
    querySearch6(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory(
        'reminder-filtersize'
      )
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 导出excel
    exportExcel() {
      const ws = XLSX.utils.json_to_sheet(this.bottomTableLeft)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
      XLSX.writeFile(wb, '电商订单.xls', {
        bookType: 'xls',
        bookSST: false,
        type: 'array',
      })
    },
    //批量催单
    batchReminder() {
      this.showDialog = true
      this.$nextTick(() => {
        // this.$refs.ReportApproval.formInfo.ObjectCode = '0113'
        // this.$refs.ReportApproval.formInfo.Key = ID
        this.$refs.BatchReminder.batchReminderList = []
        this.$refs.BatchReminder.batchReminderList[0] = {
          productno: '',
          reminderQty: '',
          优先级: '',
          remark: '',
          allottypename: '',
          allotdesc1: '',
        }
        this.$refs.BatchReminder.showDialog = true
      })
    },
    Clearing() {
      this.$confirm('确定一键清零?清零后数据将无法恢复', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        center: true,
      })
        .then(() => {
          this.$api.reminder
            .ECTdContractReset({
              Shopid: this.reminderParams.bakField6,
              flag: '1',
            })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.$message({
                  message: res.data[0].message,
                  type: 'success',
                })
                this.getReminderList()
              }
            })
            .catch((err) => console.log(err))
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作',
          })
        })
    },
    // // 自动分配按钮
    // distributionBtn() {
    //   this.distributionDaialogVisible = true
    // },
    // 自动分配
    // distribution() {
    //   // console.log(this.distributionNum.trim() === '-1');
    //   if (this.distributionNum.trim() === '-1') {
    //     this.bottomTableLeft.forEach((item) => {
    //       item.急需下单数 = item.数量
    //     })
    //     this.distributionNum = ''
    //     this.distributionDaialogVisible = false
    //   } else {
    //     var num = 0
    //     var num1 = 0
    //     var i = 0
    //     var num2 = 0
    //     this.bottomTableLeft.forEach((item) => {
    //       num2 += Number(item.数量) - Number(item.急需下单数)
    //     })
    //     if (Number(this.distributionNum) > num2) {
    //       this.bottomTableLeft.forEach((item) => {
    //         item.急需下单数 = item.数量
    //       })
    //       this.distributionNum = ''
    //       this.distributionDaialogVisible = false
    //     } else {
    //       for (i = 0; i <= this.bottomTableLeft.length; i++) {
    //         num +=
    //           Number(this.bottomTableLeft[i].数量) -
    //           Number(this.bottomTableLeft[i].急需下单数)
    //         if (num >= Number(this.distributionNum)) {
    //           for (var j = 0; j < i + 1; j++) {
    //             // console.log(j)
    //             if (j < i) {
    //               num1 += Number(
    //                 this.bottomTableLeft[j].数量 -
    //                   Number(this.bottomTableLeft[j].急需下单数)
    //               )
    //               this.bottomTableLeft[j].急需下单数 = this.bottomTableLeft[
    //                 j
    //               ].数量
    //             }
    //             if (j === i) {
    //               this.bottomTableLeft[j].急需下单数 =
    //                 Number(this.distributionNum) +
    //                 Number(this.bottomTableLeft[j].急需下单数) -
    //                 num1
    //             }
    //           }
    //           this.distributionNum = ''
    //           this.distributionDaialogVisible = false
    //           return
    //         }
    //       }
    //     }
    //   }
    // },
    infoOkDialog() {
      // this.query()
    },
    select() {
      var filterArr = []
      if (this.renminderTable.contractCode === '') {
        // this.bottomTableLeft = this.filterList
        if (this.renminderTable.p_size !== '') {
          filterArr = this.filterList.filter((item) => {
            return item.样式 === this.renminderTable.p_size
          })
          if (this.renminderTable.color !== '') {
            filterArr = filterArr.filter((item) => {
              return item.颜色 === this.renminderTable.color
            })
            // this.bottomTableLeft = filterArr
            if (this.renminderTable.size !== '') {
              filterArr = filterArr.filter((item) => {
                if (item.尺寸.includes(this.renminderTable.size)) {
                  return item
                }
              })
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            } else {
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            }
          } else {
            if (this.renminderTable.size !== '') {
              filterArr = filterArr.filter((item) => {
                if (item.尺寸.includes(this.renminderTable.size)) {
                  return item
                }
              })
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            } else {
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            }
          }
        } else {
          filterArr = this.filterList
          if (this.renminderTable.color !== '') {
            filterArr = filterArr.filter((item) => {
              return item.颜色 === this.renminderTable.color
            })
            // this.bottomTableLeft = filterArr
            if (this.renminderTable.size !== '') {
              filterArr = filterArr.filter((item) => {
                if (item.尺寸.includes(this.renminderTable.size)) {
                  return item
                }
              })
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            } else {
              this.bottomTableLeft = filterArr
            }
          } else {
            if (this.renminderTable.size !== '') {
              filterArr = filterArr.filter((item) => {
                if (item.尺寸.includes(this.renminderTable.size)) {
                  return item
                }
              })
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            } else {
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            }
          }
        }
      } else {
        filterArr = this.filterList.filter((item) => {
          if (item.产品号 !== null) {
            return item.产品号.includes(this.renminderTable.contractCode)
          }
        })
        if (this.renminderTable.p_size !== '') {
          filterArr = filterArr.filter((item) => {
            return item.样式 === this.renminderTable.p_size
          })
          if (this.renminderTable.color !== '') {
            filterArr = filterArr.filter((item) => {
              return item.颜色 === this.renminderTable.color
            })
            if (this.renminderTable.size !== '') {
              filterArr = filterArr.filter((item) => {
                if (item.尺寸.includes(this.renminderTable.size)) {
                  return item
                }
              })
            }
          } else {
            if (this.renminderTable.size !== '') {
              filterArr = filterArr.filter((item) => {
                if (item.尺寸.includes(this.renminderTable.size)) {
                  return item
                }
              })
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            } else {
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            }
          }
        } else {
          if (this.renminderTable.color !== '') {
            filterArr = filterArr.filter((item) => {
              return item.颜色 === this.renminderTable.color
            })
            // this.bottomTableLeft = filterArr
            if (this.renminderTable.size !== '') {
              filterArr = filterArr.filter((item) => {
                if (item.尺寸.includes(this.renminderTable.size)) {
                  return item
                }
              })
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            } else {
              this.bottomTableLeft = filterArr
            }
          } else {
            if (this.renminderTable.size !== '') {
              filterArr = filterArr.filter((item) => {
                if (item.尺寸.includes(this.renminderTable.size)) {
                  return item
                }
              })
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            } else {
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            }
          }
        }
        this.bottomTableLeft = filterArr
      }
      this.handleSearchHistory(
        'reminder-filterProduceNo',
        this.renminderTable.contractCode
      )
      this.handleSearchHistory(
        'reminder-filterp_size',
        this.renminderTable.p_size
      )
      this.handleSearchHistory(
        'reminder-filtercolor',
        this.renminderTable.color
      )
      this.handleSearchHistory('reminder-filtersize', this.renminderTable.size)
    },
    IconShow() {
      this.iconShow = !this.iconShow
    },
    search() {
      this.handleSearchHistory('reminder-p_Code', this.reminderParams.p_Code)
      this.handleSearchHistory(
        'reminder-orderNo',
        this.reminderParams.contractCode
      )
      this.isLoading = true
      this.$refs.productNo.innerHTML = ''
      this.bottomTableRightTop = []
      this.bottomTableRightBottom = []
      this.getReminderList()
    },
    ptypeBlurEvent(row) {
      row.数量 = Number(row.原始数量) - Number(row.取消数量)
    },
    saveLeftTable() {
      this.$confirm('此操作将保存, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        var strlist = ''
        for (var i = 0; i <= this.bottomTableLeft.length - 1; i++) {
          if (this.bottomTableLeft[i].本次催单 === undefined) {
            this.bottomTableLeft[i].本次催单 = 0
          }
          strlist +=
            this.bottomTableLeft[i].订单号 +
            this.columnIcon +
            this.bottomTableLeft[i].序号 +
            this.columnIcon +
            this.bottomTableLeft[i].原始数量 +
            this.columnIcon +
            this.bottomTableLeft[i].取消数量 +
            this.columnIcon +
            this.bottomTableLeft[i].数量 +
            this.columnIcon +
            this.bottomTableLeft[i].本次催单 +
            this.columnIcon +
            this.bottomTableLeft[i].优先级 +
            this.columnIcon +
            this.bottomTableLeft[i].备注 +
            '◆'
        }
        this.iconSaveParams.strList = strlist
        this.$api.order
          .iconSave({ model: { ...this.iconSaveParams } })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.$message({
                message: res.data[0].message,
                type: 'success',
              })
              this.getReminderList()
            }
          })
          .catch((err) => console.log(err))
      })
    },
    dataChange() {
      // 拿到当前时间
      let nowDate = new Date()
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let date = nowDate.getDate()
      date = date < 10 ? '0' + date : date
      var toMonth = year + '-' + month + '-' + date
      // 获取一个月前的时间
      var monthDate = new Date()
      monthDate.setMonth(monthDate.getMonth() - 1)
      var startTime =
        monthDate.getFullYear() +
        '-' +
        (monthDate.getMonth() + 1) +
        '-' +
        monthDate.getDate()
      // 获取三天前的时间
      let curDate = new Date()
      var preDate = new Date(curDate.getTime() - 2 * 24 * 60 * 60 * 1000)
      let threeDay =
        preDate.getFullYear() +
        '-' +
        (preDate.getMonth() + 1) +
        '-' +
        preDate.getDate()
      // 获取7天前的时间
      var preDate1 = new Date(curDate.getTime() - 6 * 24 * 60 * 60 * 1000)
      let senvenDay =
        preDate1.getFullYear() +
        '-' +
        (preDate1.getMonth() + 1) +
        '-' +
        preDate1.getDate()
      switch (this.reminderParams.intDays) {
        case '1':
          this.reminderParams.cdBeginDate = toMonth
          this.reminderParams.cdEndDate = toMonth
          break
        case '3':
          this.reminderParams.cdBeginDate = threeDay
          this.reminderParams.cdEndDate = toMonth
          break
        case '7':
          this.reminderParams.cdBeginDate = senvenDay
          this.reminderParams.cdEndDate = toMonth
          break
        case '30':
          this.reminderParams.cdBeginDate = startTime
          this.reminderParams.cdEndDate = toMonth
          break
        case '0':
          this.reminderParams.cdBeginDate = ''
          this.reminderParams.cdEndDate = ''
          break
        default:
          break
      }
    },
    iconClear(row) {
      console.log(row)
      this.$confirm('确定清零?清零后数据将无法恢复', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        center: true,
      })
        .then(() => {
          this.$api.reminder
            .ECTdContractReset({
              Shopid: this.reminderParams.bakField6,
              flag: '1',
              ContractNo: row['订单号'],
              ProductNo: row['产品号'],
            })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.$message({
                  message: res.data[0].message,
                  type: 'success',
                })
                this.getReminderList()
              }
            })
            .catch((err) => console.log(err))
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作',
          })
        })
    },
    // 根据图标保存
    iconSave(row) {
      this.$confirm('此操作保存该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        this.iconSaveParams.strList =
          row.订单号 +
          this.columnIcon +
          row.序号 +
          this.columnIcon +
          row.原始数量 +
          this.columnIcon +
          row.取消数量 +
          this.columnIcon +
          row.数量 +
          this.columnIcon +
          row.本次催单 +
          this.columnIcon +
          row.优先级 +
          this.columnIcon +
          row.备注 +
          '◆'
        this.$api.order
          .iconSave({ model: { ...this.iconSaveParams } })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.$message({
                message: res.data[0].message,
                type: 'success',
              })
              this.getReminderList()
            }
          })
          .catch((err) => console.log(err))
      })
    },
    // 根据图标关闭
    iconClose(row) {
      this.$confirm('此操作将取消关闭该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        this.$api.order
          .orderClose({
            UserCode: '',
            ContractNo: row.订单号,
            strMessage: '',
            Type: '0',
          })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.data[0].Message,
                type: 'error',
              })
            } else {
              this.$message({
                message: res.data[0].Message,
                type: 'success',
              })
              this.getReminderList()
            }
          })
          .catch((err) => console.log(err))
      })
    },
    // 根据图标关闭当前行
    iconOpen(row) {
      this.$confirm('此操作将关闭该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        this.$api.order
          .orderClose({
            UserCode: '',
            ContractNo: row.订单号,
            strMessage: '',
            Type: '1',
          })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.data[0].Message,
                type: 'error',
              })
            } else {
              this.$message({
                message: res.data[0].Message,
                type: 'success',
              })
              this.getReminderList()
            }
          })
          .catch((err) => console.log(err))
      })
    },
    getReminderList() {
      this.$api.reminder
        .searchReminder({ model: { ...this.reminderParams } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.bottomTableLeft = res.data
            this.filterList = res.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    // 点击催单表查找底部表格数据
    clickSearch(row) {
      this.$refs.productNo.innerHTML =
        "<div class='new'>" +
        row.row.产品号 +
        "</div><div class='new'>" +
        row.row.产品名称 +
        '</div><br/>'
      // this.$refs.leftTable.setActiveRow(row.row)
      this.bottomTableRightTop = []
      this.$api.order
        .clickSearch({ OrderNo: row.row.订单号, ProductNO: row.row.产品号 })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.bottomTableRightBottom = res.data
          }
        })
        .catch((err) => console.log(err))
      this.$api.reminder
        .clickSearch({
          contractno: row.row.订单号,
          num: row.row.序号,
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.bottomTableRightTop = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    // righTopfooterMethod() {},
    // 底部左侧表尾合计
    leftfooterMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          }
          switch (column.property) {
            case '数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].数量)
              }
              return sums

            case '取消数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].取消数量)
              }
              return sums

            case '原始数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].原始数量)
              }
              return sums
            case '急需下单数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].急需下单数)
              }
              return sums
            case '待下单数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].待下单数)
              }
              return sums
            case '已下单数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].已下单数)
              }
              return sums
            case '本次催单':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                if (data[i]['本次催单'] === undefined) {
                  data[i]['本次催单'] = 0
                }
                sums += Number(data[i]['本次催单'])
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    cellClassLeft(row) {
      if (row.row.ReminderQuantity < 0) {
        return 'cellClassLeft'
      }
    },
    rightTopfooterMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          }
          switch (column.property) {
            case 'ReminderQuantity':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].ReminderQuantity)
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    rightBottomfooterMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          }
          switch (column.property) {
            case '到货片数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].到货片数)
              }
              return sums
            case '未检验片数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].未检验片数)
              }
              return sums
            case '检验片数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].检验片数)
              }
              return sums
            case '下单片数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].下单片数)
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    // 获取站点列表
    addProductState() {
      this.$api.publicApi
        .basShop()
        .then((res) => {
          if (res.Code < 0) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.shopList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        this.gridHeight = card - queryRow - 60
      })
    },
    getNowDate() {
      // 拿到当前时间
      let nowDate = new Date()
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let date = nowDate.getDate()
      date = date < 10 ? '0' + date : date
      var toMonth = year + '-' + month + '-' + date
      // 获取一个月前的时间
      var monthDate = new Date()
      monthDate.setMonth(monthDate.getMonth() - 1)
      var startTime =
        monthDate.getFullYear() +
        '-' +
        (monthDate.getMonth() + 1) +
        '-' +
        monthDate.getDate()
      this.$set(this.reminderParams, 'endDate', toMonth)
      this.$set(this.reminderParams, 'beginDate', startTime)
    },
  },
  created() {
    this.addProductState()
    this.getNowDate()
    this.getReminderList()
    this.resize()
  },
  mounted() {
    var _this = this
    window.onresize = function () {
      // 定义窗口大小变更通知事件
      _this.resize()
    }
  },
}
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  display: block;
  background: rgb(245, 248, 255);
}
.el-card {
  width: 100%;
  background: #fff;
  >>> .el-card__body {
    padding: 10px;
    width: 100%;
  }
}
// 开始-结束时间选择器
>>> .el-form-item__content {
  line-height: 28px !important;
  margin-top: 5px !important;
}
.blockDate {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  border: 1px solid #c7c6de;
  height: 30px;
  >>> [data-v-a2d140fa] .el-input__inner {
    height: 28px;
  }
  >>> .None-Border {
    height: 100%;
    >>> .el-input__inner {
      height: 100%;
      width: 100%;
    }
  }
  >>> .el-input__icon {
    line-height: 28px !important;
  }
}
>>> .el-input__icon {
  line-height: 30px;
}
// // 开始-结束时间选择器
>>> .el-input__inner {
  height: 30px;
}
// 收起和查询按钮
.searchBtn {
  width: 70px !important;
  height: 30px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 22px;
}
.closeInput {
  width: 70px !important;
  height: 30px !important;
  margin-top: 5px;
}
.el-form-item {
  margin-bottom: 0px;
}
>>> [data-v-7b05455e] .el-input__inner {
  height: 28px;
}
// 第三批按钮
.secondBtn {
  margin-top: 11px;
  font-size: 14px;
  color: #333;
  .iconBtn {
    width: 100px;
    height: 32px;
    border: 1px solid #5473e8;
    background: #5473e8;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #fcfefe;
    padding: 0;
  }
}
>>> .cellClassLeft {
  color: red;
}
>>> .marginL {
  margin-left: -22px;
}
>>> .marginTop {
  margin-top: 5px;
}
>>> .tableRightTopTitle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
>>> .tableRightTop {
  margin-top: 5px;
}
>>> .marginT {
  margin-top: 5px;
}
>>> .tableRightBottom {
  height: 100%;
}

>>> .cellChooseClass {
  height: 28px;
}
>>> .el-button + .el-button {
  margin-left: 0px;
}

>>> .footerCellClassName {
  background: #d1f3ff;
}
>>> .hearderClass {
  text-align: center;
  font-size: 14px;
  height: 36px;
  background-color: #d5deff;
}
// 控制表格固定线的样式
>>> .vxe-table--render-default
  .vxe-table--fixed-left-wrapper.scrolling--middle {
  box-shadow: none;
}
>>> .vxe-table--render-default.border--full .vxe-table--fixed-left-wrapper {
  border-right: none;
}
// 控制表格行高
>>> .vxe-table--render-default .vxe-body--column,
.vxe-table--render-default .vxe-footer--column,
.vxe-table--render-default .vxe-header--column {
  line-height: 15px;
}
// 主表操作中的三个button
.CloseIcon {
  width: 40px;
  line-height: normal;
  background: #5473e8;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid #5473e8;
}
.NoCloseIcon {
  width: 70px;
  line-height: normal;
  background: #5473e8;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid #5473e8;
}
.SaveIcon {
  width: 40px;
  line-height: normal;
  background: #ff9b22;
  border: 1px solid #ff9b22;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
}
.saveBtnC {
  margin-top: 5px;
  float: right;
}
// 表格中的保存按钮
.saveBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  float: right;
  background-color: #5473e8;
  border: 1px solid #5473e8 !important;
}
>>> .el-button--small,
.el-button--small.is-round {
  padding: 0px;
}
>>> .marginLe {
  margin-left: 30px;
}
>>> .remindetrDetail {
  margin-top: 15px;
}
.productNoStyle {
  height: 32px;
}
.clearBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  margin-right: 4px;
  background-color: #908fa0;
  border: 1px solid #908fa0 !important;
}
>>> .blockDate .el-input__inner {
  height: 28px !important;
}
>>> .cellClass {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 40px;
}
>>> .shrink {
  border: 1px solid #36c2cf;
  background-color: #36c2cf;
}
>>> .vxe-input .vxe-input--extra-suffix,
.vxe-input .vxe-input--suffix {
  right: 0.2em;
  display: none;
}
>>> .jy-dialog .jy-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
>>> .el-row {
  height: auto;
}
>>> .el-autocomplete {
  width: 100%;
}
</style>