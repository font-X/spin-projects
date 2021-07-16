<template>
  <el-container>
    <el-card class="cardMargin" id="mainCard">
      <el-row id="queryRow">
        <el-form
          ref="mainForm"
          :model="model"
          style="font-size：14px"
          label-width="94px"
          size="mini"
        >
          <!-- 查询条件区域 -->
          <el-row class="rowHeight">
            <el-col :span="4">
              <el-form-item label="日期类别:">
                <el-select v-model="model.dateType" placeholder="日期类别">
                  <el-option
                    :key="index"
                    v-for="(item, index) in dateTypeList"
                    :label="item.Name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <!-- <el-upload
                  class="upload-demo"
                  action="http://localhost:58454/api/Public/GetPostFiles"
                  multiple
                  :limit="3"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="url"
                    :fit="fit"
                  ></el-image>
                </el-upload> -->
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="开始日期:">
                <el-date-picker
                  v-model="model.beginDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="DeliveryDate" label="结束日期:">
                <el-date-picker
                  v-model="model.endDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="发货申请号:">
                <el-input
                  clearable
                  @keyup.enter.native="query()"
                  v-model="model.deliveryPlanCode"
                  placeholder="发货申请号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="海外仓编号:">
                <el-input
                  clearable
                  @keyup.enter.native="query()"
                  v-model="model.bakField1"
                  placeholder="海外仓编号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="货件编号:">
                <el-input
                  clearable
                  v-model="model.bakField2"
                  @keyup.enter.native="query()"
                  placeholder="货件编号"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="height: 35px">
            <el-col :span="4">
              <el-form-item label="货件名称:">
                <el-input
                  clearable
                  v-model="model.bakField3"
                  @keyup.enter.native="query()"
                  placeholder="货件名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="是否完成:">
                <el-select
                  v-model="model.isFinish"
                  placeholder="是否完成"
                  clearable
                >
                  <el-option label="" value=""></el-option>
                  <el-option
                    :key="index"
                    v-for="(item, index) in isFinishList"
                    :label="item.Name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="站点:">
                <el-select v-model="model.shop" placeholder="站点">
                  <el-option
                    :key="index"
                    v-for="(item, index) in shopList"
                    :label="item.Name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="产品号:">
                <el-input
                  clearable
                  v-model="model.productNo"
                  @keyup.enter.native="query()"
                  placeholder="产品号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="是否入仓:">
                <el-select
                  v-model="model.IsIn"
                  placeholder="是否入仓"
                  clearable
                >
                  <el-option label="" value=""></el-option>
                  <el-option
                    :key="index"
                    v-for="(item, index) in IsIn"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="明细:">
                <el-checkbox
                  value="1"
                  true-label="1"
                  false-label=""
                  v-model="model.isDetail"
                ></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button
                type="warning"
                size="mini"
                class="searchBtn searchMargin"
                :loading="loading"
                icon="iconfont kt-icon-sousuo_o"
                @click="query()"
                >查询</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <!-- 按钮区域 -->
      <el-row id="btnRow" class="secondBtn">
        <el-button
          v-show="this.type === '01'"
          class="smBtn iconBtn el-icon-plus"
          type="primary"
          size="small"
          @click="addItem"
          >新增</el-button
        >
        <el-button
          v-show="this.type === '01'"
          class="smBtn iconBtn el-icon-edit-outline"
          type="primary"
          size="small"
          @click="editItem"
          >修改</el-button
        >
        <el-button
          v-show="this.type === '01'"
          class="delBtn iconBtn el-icon-delete"
          type="danger"
          size="small"
          @click="deleteItem"
          >删除</el-button
        >
        <el-button
          v-show="this.type === '02'"
          class="smBtn2 iconBtn iconfont kt-icon-caidan"
          type="primary"
          size="small"
          >运费登记</el-button
        >
        <el-button
          class="smBtn iconBtn iconfont kt-icon-caidan"
          type="primary"
          size="small"
          @click="reportItem"
          >报批</el-button
        >

        <el-button
          v-show="this.type === '02'"
          class="XlBtn iconBtn iconfont kt-icon-caidan"
          type="primary"
          size="small"
          @click="updateDate"
          >更新预计到货时间</el-button
        >
        <!--
        <el-button
          class="XlBtn iconBtn iconfont kt-icon-caidan"
          type="primary"
          size="small"
          @click="OverseaswarehousingOut"
          >海外仓出库</el-button
        >
        <el-button
          class="XlBtn iconBtn iconfont kt-icon-caidan"
          type="primary"
          size="small"
          @click="Amazon"
          >亚马逊入库</el-button
        >
        <el-button
          class="smBtn2 iconBtn iconfont kt-icon-caidan"
          type="primary"
          size="small"
          @click="fbaInAddKS"
          >快速进仓</el-button
        >
        <el-button
          class="XlBtn iconBtn iconfont kt-icon-caidan"
          type="primary"
          size="small"
          @click="fbaInCancel"
          >取消快速进仓</el-button
        > -->
        <el-button
          class="smBtn2 iconBtn iconfont kt-icon-caidan"
          type="primary"
          size="small"
          @click="fbalot"
          >FBA复核</el-button
        >
        <el-button
          class="delBtn iconBtn iconfont kt-icon-daoru"
          type="primary"
          size="small"
          >打印</el-button
        >
        <el-button
          class="delBtn2 iconBtn iconfont kt-icon-daoru"
          type="primary"
          size="small"
          >打印列表</el-button
        >
        <el-button
          class="smBtn2 iconBtn iconfont kt-icon-caidan"
          type="primary"
          size="small"
          @click="editRemark"
          >修改备注</el-button
        >
        <el-button
          class="smBtn2 iconBtn iconfont kt-icon-caidan"
          type="primary"
          size="small"
          @click="FbaBulkCargo"
          >FBA散货</el-button
        >
        <el-button
          @click="ExportAll"
          class="delBtn2 iconBtn iconfont kt-icon-daoru"
          type="primary"
          size="small"
          >导出Excel</el-button
        >
        <el-dropdown @command="handleCommand" :hide-on-click="false">
          <el-button class="exportBtn" type="primary">
            更多功能<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">海外仓入库</el-dropdown-item>
            <el-dropdown-item command="b">海外仓出库</el-dropdown-item>
            <el-dropdown-item command="c">亚马逊入库</el-dropdown-item>
            <el-dropdown-item command="d">快速进仓</el-dropdown-item>
            <el-dropdown-item command="e">取消快速进仓</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <!-- 主表区域 -->
      <el-row v-loading="loading">
        <vxe-grid
          border
          resizable
          stripe
          width="auto"
          :height="gridHeight"
          show-footer
          :auto-resize="true"
          :columns="columns"
          show-overflow="title"
          highlight-hover-row
          :row-style="printNum"
          :header-row-class-name="hearderClass"
          :row-class-name="cellClass"
          :footer-method="footerMethod"
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true, range: true }"
          ref="grid"
          :data="gridData"
          class="vxe-grid mytable-scrollbar"
          @cell-click="cellclick"
        >
        </vxe-grid>
        <el-row id="pagin">
          <!-- 分页 -->
          <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.page"
            background
            :page-sizes="[100, 200, 500, 1000]"
            :page-size="pageInfo.pageSize"
            layout="prev,pager,next,total,sizes,jumper"
            :total="pageInfo.total"
          >
          </el-pagination>
        </el-row>
      </el-row>
    </el-card>
    <add-or-update
      v-if="showDialog"
      ref="AddOrUpdate"
      :ObjectId="selectId"
      @okDialog="infoOkDialog"
    ></add-or-update>
    <report-approval
      v-if="showReportDialog"
      ref="ReportApproval"
      @okDialog="ReportOkDialog"
    ></report-approval>
    <delivery-check
      ref="DeliveryCheck"
      @okDialog="ReportOkDialog"
    ></delivery-check>
    <el-dialog
      v-dialogDrag
      title="编辑备注"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="editDaialogVisible"
      width="40%"
    >
      <div class="divCon">
        <el-input
          clearable
          v-model="editremark"
          type="textarea"
          :rows="6"
          placeholder="请输入备注信息"
        >
        </el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <span>
          <el-button type="primary" @click="editRemarkEnter" class="chooseEnter"
            >确 定</el-button
          >
          <el-button class="chooseCancel" @click="editDaialogVisible = false"
            >取 消</el-button
          >
        </span>
      </span>
    </el-dialog>

    <jy-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      class="noMarginBottom"
      :title="dialogParam.title"
      :visible.sync="dialogParam.isShowDialog"
      top="10px"
      v-if="dialogParam.isShowDialog"
      :width="dialogParam.width"
      append-to-body
    >
      <div
        :style="{
          height: '700',
          position: 'relative',
        }"
      >
        <delivery-warehousing
          :status="status"
          :shopList="shopList"
          :RequestData="RequestData"
          v-if="dialogParam.name === 'DeliveryWarehousing'"
          @closeDialog="closeDialog"
        ></delivery-warehousing>
        <fba-bulk-cargo
          :FBAID="FBAID"
          v-if="dialogParam.name === 'FbaBulkCargo'"
          @closeDialog="closeDialog"
        >
        </fba-bulk-cargo>
      </div>
    </jy-dialog>
    <el-dialog
      :close-on-click-modal="false"
      class="noMarginBottom"
      :title="DialogParam.title"
      :visible.sync="DialogParam.isShowDialog"
      top="10px"
      v-if="DialogParam.isShowDialog"
      width="20%"
      append-to-body
    >
      <div
        :style="{
          height: '180px',
          position: 'relative',
        }"
      >
        <main-content
          @closeDialog="CloseDialog"
          :activeNav="this.DialogParam.activeNav"
        ></main-content>
      </div>
    </el-dialog>
  </el-container>

  <!-- 查询框 -->
</template>
<script>
import AddOrUpdate from '../DeliveryRequest/DeliveryInfo'
import ReportApproval from '../../Components/ReportApproval'
import DeliveryCheck from '../DeliveryRequest/DeliveryCheck'
import DeliveryWarehousing from '../DeliveryRequest/DeliveryWarehousing'
import FbaBulkCargo from '../DeliveryRequest/FbaBulkCargo'
import JyDialog from '@/components/JyDialog'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  props: {
    type: {
      type: String,
    },
  },
  components: {
    AddOrUpdate,
    ReportApproval,
    DeliveryCheck,
    DeliveryWarehousing,
    FbaBulkCargo,
    JyDialog,
  },
  data() {
    return {
      sel: this,
      computedHeight: window.innerHeight - 100 + 'px',
      dialogParam: {
        title: '',
        type: '',
        name: '',
        width: '70%',
        isShowDialog: false,
      },
      RequestData: {},
      FBAID: '',
      isFinishList: [
        {
          Name: '未完成',
          id: '1',
        },
        {
          Name: '已完成',
          id: '2',
        },
      ],
      IsIn: [
        {
          label: '未入仓',
          value: '0',
        },
        {
          label: '已入仓',
          value: '1',
        },
      ],
      DialogParam: {
        title: '',
        type: '',
        name: '',
        width: '40%',
        isShowDialog: false,
        activeNav: {
          MenuCode: 'EasyLayouts',
          MenuName: '添加组件设计',
          LinkUrl: 'Basic/PageDisplay?fmId=3e302bc321c4eb11811f39fce23e769a',
        },
      },
      dateTypeList: [
        {
          Name: '制单日期',
          id: '1',
        },
        {
          Name: '发货日期',
          id: '2',
        },
      ],
      gridHeight: 600,
      editDaialogVisible: false,
      showDialog: false,
      showReportDialog: false,
      loading: false,
      editremark: '',
      url: 'https://gesoftfile.oss-cn-hangzhou.aliyuncs.com/1618447629%281%29.jpg?Expires=1618452050&OSSAccessKeyId=TMP.3KihRXY7pPDjG7hozCoXuHxcJdSNJU2DHJ8XVbCUNgiXVhvxnWGNMRJCsRGPPkCo66cZwXTvxJfZini7BqpxWKMpwpaVNB&Signature=PsAflP94ryQc9Nhcq5V1VvZhtbA%3D&versionId=CAEQDxiBgMD3t5bMxhciIGZmN2EwOWRlYjBhYTQ0MTQ4ODViNzJlMmQzMWNhMjgx&response-content-type=application%2Foctet-stream',
      fileList: [],
      showSelectDialog: false,
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      model: {
        // beginDate: this.$moment()
        //   .add(-1, 'month')
        //   .format('YYYY-MM-DD HH:mm:ss'),
        // endDate: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
        isFinish: '',
        deliveryPlanCode: '',
        bakField1: '',
        bakField2: '',
        bakField3: '',
        dateType: '1',
        shop: '',
        IsIn: '0',
        productNo: '',
        isDetail: '',
        // rangedate: [this.$moment().add(-1, 'month'), this.$moment()],
      },
      pageInfo: {
        page: 1,
        pageSize: 100,
      },
      columns: [],
      columnsno: [
        { type: 'checkbox', width: '40', fixed: 'left' },
        { type: 'seq', width: '60', title: '序号', fixed: 'left' },
        { width: '100', title: 'ID', field: 'ID', fixed: 'left' },
        { width: '60', title: '状态', field: '状态', fixed: 'left' },
        { width: '80', title: '复核状态', field: '复核状态', fixed: 'left' },
        {
          width: '110',
          title: '申请发货日期',
          field: '申请发货日期',
          fixed: 'left',
          formatter: (data) => {
            if (!data.cellValue) {
              return null
            } else {
              return this.$moment(data.cellValue).format('YYYY-MM-DD')
            }
          },
        },
        {
          width: '150',
          title: '发货申请单号',
          field: '发货申请单号',
          align: 'left',
          fixed: 'left',
        },
        { width: '80', title: '站点', field: '站点' },
        {
          width: '150',
          title: '货件编号',
          field: '货件编号',
          align: 'left',
        },

        { width: '80', title: '申请箱数', field: '申请箱数' },
        { width: '80', title: '申请数量', field: '申请数量' },
        {
          width: '110',
          title: '实际发货日期',
          field: '实际发货日期',
          formatter: (data) => {
            if (!data.cellValue) {
              return null
            } else {
              return this.$moment(data.cellValue).format('YYYY-MM-DD')
            }
          },
        },
        { width: '80', title: '实发箱数', field: '实发箱数' },
        { width: '80', title: '实发数量', field: '实发数量' },
        { width: '80', title: '提单号', field: '提单号' },
        { width: '80', title: '箱封号', field: '箱封号' },
        { width: '100', title: '海外仓贴标', field: '海外仓贴标' },
        {
          width: '100',
          title: '船期',
          field: '船期',
          formatter: (data) => {
            if (!data.cellValue) {
              return null
            } else {
              return this.$moment(data.cellValue).format('YYYY-MM-DD')
            }
          },
        },
        { width: '200', title: '货代', field: '货代' },
        { width: '140', title: '亚马逊入库片数', field: '亚马逊入库片数' },
        { width: '100', title: '备注', field: '备注', align: 'left' },
        { width: '100', title: '制单人', field: '制单人' },
        { width: '150', title: '制单日期', field: '制单日期' },
        { width: '100', title: '复核人', field: '复核人' },
        { width: '150', title: '复核日期', field: '复核日期' },
        { width: '100', title: '预计到货', field: '预计到货' },
        {
          width: '125',
          title: '海外仓入库日期',
          field: '海外仓入库日期',
          formatter: (data) => {
            if (!data.cellValue) {
              return null
            } else {
              return this.$moment(data.cellValue).format('YYYY-MM-DD')
            }
          },
        },
        { width: '100', title: '时效', field: '时效' },
        { width: '140', title: '海外仓入库片数', field: '海外仓入库片数' },
        { width: '140', title: '海外仓出库片数', field: '海外仓出库片数' },
        { width: '140', title: '海外仓库存片数', field: '海外仓库存片数' },
      ],
      columnsdetial: [
        { type: 'checkbox', width: '40', fixed: 'left' },
        { type: 'seq', width: '60', title: '序号', fixed: 'left' },
        { width: '100', title: 'ID', field: 'ID', fixed: 'left' },
        { width: '60', title: '状态', field: '状态', fixed: 'left' },
        { width: '80', title: '完成', field: '完成', fixed: 'left' },
        {
          width: '110',
          title: '发货申请单号',
          field: '发货申请单号',
          fixed: 'left',
          align: 'left',
        },
        { width: '80', title: '站点', field: '站点' },
        {
          width: '100',
          title: '海外仓编号',
          field: '海外仓编号',
          align: 'left',
        },
        {
          width: '150',
          title: '货件编号',
          field: '货件编号',
          align: 'left',
        },
        {
          width: '150',
          title: '货件名称',
          field: '货件名称',
          align: 'left',
        },
        {
          width: '250',
          title: '产品号',
          field: '产品号',
          align: 'left',
        },
        {
          width: '250',
          title: '产品名称',
          field: '产品名称',
          sortable: true,
          align: 'left',
        },
        { width: '90', title: '样式', field: '样式' },
        { width: '60', title: '色号', field: '色号' },
        { width: '60', title: '颜色', field: '颜色' },
        { width: '60', title: '尺寸', field: '尺寸' },
        { width: '100', title: '尺寸单位', field: '尺寸单位' },
        { width: '80', title: '箱数', field: '箱数' },
        { width: '100', title: '每包片数', field: '每包片数' },
        { width: '80', title: '包数', field: '包数' },
        { width: '80', title: '实发箱数', field: '实发箱数' },
        { width: '120', title: '实际发货包数', field: '实际发货包数' },
        { width: '120', title: '海外仓入库包数', field: '海外仓入库包数' },
        { width: '120', title: '海外仓出库包数', field: '海外仓出库包数' },
        { width: '120', title: '海外仓库存包数', field: '海外仓库存包数' },
        { width: '120', title: '亚马逊入库包数', field: '亚马逊入库包数' },
        {
          width: '100',
          title: '发货日期',
          field: '发货日期',
          formatter: (data) => {
            if (!data.cellValue) {
              return null
            } else {
              return this.$moment(data.cellValue).format('YYYY-MM-DD')
            }
          },
        },
        {
          width: '120',
          title: '预计到货时间',
          field: '预计到货时间',
          // formatter: (data) => {
          //   if (!data.cellValue) {
          //     return null
          //   } else {
          //     return this.$moment(data.cellValue).format('YYYY-MM-DD')
          //   }
          // },
        },
        { width: '100', title: '备注', field: '备注', align: 'left' },
        { width: '100', title: '制单人', field: '制单人' },
        { width: '150', title: '制单日期', field: '制单日期' },
      ],
      gridData: [],
      addRules: {},
      shopList: [],
      status: '',
      selectId: '',
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'a':
          this.Overseaswarehousing()
          break
        case 'b':
          this.OverseaswarehousingOut()
          break
        case 'c':
          this.Amazon()
          break
        case 'd':
          this.fbaInAddKS()
          break
        case 'e':
          this.fbaInCancel()
          break

        default:
          break
      }
    },
    FbaBulkCargo() {
      var data = []
      data.push(...this.$refs.grid.getCheckboxRecords())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条数据后操作!',
          type: 'error',
        })
      } else {
        this.FBAID = data[0]['ID']
        this.dialogParam = {
          title: 'FBA散货',
          name: 'FbaBulkCargo',
          type: '',
          width: '70%',
          isShowDialog: true,
        }
      }
    },
    // 亚马逊入库
    Amazon() {
      var data = []
      this.status = 'amazon'
      data.push(...this.$refs.grid.getCheckboxRecords())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条数据后操作!',
          type: 'error',
        })
      } else {
        this.$api.deliveryRequest
          .GetHWDepotByDeliveryId({ Id: data[0].ID })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.RequestData = res.data
              this.RequestData.ID = data[0]['ID']
              this.dialogParam = {
                title: '亚马逊入库编辑',
                name: 'DeliveryWarehousing',
                type: '',
                width: '70%',
                isShowDialog: true,
              }
            }
          })
          .catch((err) => (this.loading = false))
      }
    },
    //海外仓入库
    Overseaswarehousing() {
      var data = []
      this.status = 'seaIn'
      data.push(...this.$refs.grid.getCheckboxRecords())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条数据后操作!',
          type: 'error',
        })
      } else {
        this.$api.deliveryRequest
          .GetHWDepotByDeliveryId({ Id: data[0].ID })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.RequestData = res.data
              this.RequestData.ID = data[0]['ID']
              this.dialogParam = {
                title: '海外仓入库编辑',
                name: 'DeliveryWarehousing',
                type: '',
                width: '70%',
                isShowDialog: true,
              }
            }
          })
          .catch((err) => (this.loading = false))
      }
    },
    // 更新估计到货时间
    updateDate() {
      var data = []
      data.push(...this.$refs.grid.getCheckboxRecords())
      if (data.length === 0) {
        this.$message({
          message: '请选择数据后操作!',
          type: 'error',
        })
      } else {
        let ID = data
          .map((item) => {
            return item.ID
          })
          .join(',')
        this.DialogParam = {
          title: '更新预计到货时间',
          type: '',
          name: '',
          width: '70%',
          isShowDialog: true,
          activeNav: {
            MenuCode: '',
            MenuName: '',
            LinkUrl:
              'Basic/PageDisplay?fmId=42286d8934c8eb11811f39fcfcf063c9&Id=' +
              ID,
          },
        }
      }
    },
    //海外仓出库
    OverseaswarehousingOut() {
      var data = []
      this.status = 'seaOut'
      data.push(...this.$refs.grid.getCheckboxRecords())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条数据后操作!',
          type: 'error',
        })
      } else {
        this.$api.deliveryRequest
          .GetHWDepotByDeliveryId({ Id: data[0].ID })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.RequestData = res.data
              this.RequestData.ID = data[0]['ID']
              this.dialogParam = {
                title: '海外仓出库编辑',
                name: 'DeliveryWarehousing',
                type: '',
                width: '70%',
                isShowDialog: true,
              }
            }
          })
          .catch((err) => (this.loading = false))
      }
    },
    // 编辑备注
    editRemark() {
      var data = []
      data.push(...this.$refs.grid.getCheckboxRecords())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条数据后操作!',
          type: 'error',
        })
      } else {
        this.editremark = data[0]['备注']
        this.editDaialogVisible = true
      }
    },
    // 编辑备注确认按钮
    editRemarkEnter() {
      var data = []
      data.push(...this.$refs.grid.getCheckboxRecords())
      this.$api.deliveryRequest
        .UpdateDeliveryPlanRemark({
          model: {
            id: data[0]['ID'],
            remark: this.editremark,
          },
        })
        .then((res) => {
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              message: '保存成功!',
              type: 'success',
            })
            this.editDaialogVisible = false
            this.query()
          }
        })
        .catch((err) => console.log(err))
    },
    addItem() {
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs.AddOrUpdate.showDialog = true
        this.$refs.AddOrUpdate.init()
      })
    },
    closeDialog() {
      this.dialogParam.isShowDialog = false
    },
    CloseDialog() {
      this.DialogParam.isShowDialog = false
      this.query()
    },
    editItem() {
      var data = []
      data.push(...this.$refs.grid.getCheckboxRecords())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条数据后操作!',
          type: 'error',
        })
      } else {
        var ID = data[0].ID
        this.showDialog = true
        this.$nextTick(() => {
          this.$refs.AddOrUpdate.formInfo.ID = ID
          this.$refs.AddOrUpdate.showDialog = true
          this.$refs.AddOrUpdate.init()
        })
      }
    },
    //删除数据
    deleteItem() {
      let self = this
      var data = []
      data.push(...this.$refs.grid.getCheckboxRecords())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条数据后操作!',
          type: 'error',
        })
      } else {
        var ID = data[0].ID
        this.$nextTick(() => {
          this.$confirm('此操作将删除选中产品, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
          }).then(() => {
            this.$api.deliveryRequest
              .deleteItem({ Id: ID })
              .then((res) => {
                this.loading = false
                if (res.statusCode != 200) {
                  this.$message({
                    message: res.message,
                    type: 'error',
                  })
                } else {
                  this.$message({
                    message: '删除成功',
                    type: 'success',
                  })
                  self.query()
                }
              })
              .catch((err) => (this.loading = false))
          })
        })
      }
    },
    //fba复合
    fbalot() {
      var data = []
      data.push(...this.$refs.grid.getCheckboxRecords())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条数据后操作!',
          type: 'error',
        })
      } else {
        var ID = data[0].ID
        this.$nextTick(() => {
          this.$refs.DeliveryCheck.fbaid = ID
          this.$refs.DeliveryCheck.deliverID = data[0]['发货申请单号']
          this.$refs.DeliveryCheck.showDialog = true
        })
      }
    },
    //报批
    reportItem() {
      var data = []
      data.push(...this.$refs.grid.getCheckboxRecords())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条数据后操作!',
          type: 'error',
        })
      } else {
        var ID = data[0].ID
        this.showReportDialog = true
        this.$nextTick(() => {
          this.$refs.ReportApproval.formInfo.ObjectCode = '0113'
          this.$refs.ReportApproval.formInfo.Key = ID
          this.$refs.ReportApproval.showDialog = true
        })
      }
    },
    //报批完成后
    ReportOkDialog() {
      this.query()
    },
    infoOkDialog() {
      this.query()
    },
    //快速进仓
    fbaInAddKS() {
      var data = []
      data.push(...this.$refs.grid.getCheckboxRecords())
      if (data.length < 1) return this.$message.error('请先勾选后再进行操作!')
      var Str = ''
      data.forEach((item) => {
        Str += item.ID + '◆'
      })
      this.$confirm('此操作将快速进仓, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        this.loading = false
        this.$api.deliveryRequest
          .fbaInAddKS({ Id: Str })
          .then((res) => {
            this.loading = false
            if (!res.isSucceed) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.$message({
                message: '操作成功',
                type: 'success',
              })
            }
          })
          .catch((err) => (this.loading = false))
      })
    },
    //取消快速进仓
    fbaInCancel() {
      var row = this.isSelectOne()
      if (!!row) {
        this.$confirm('此操作将取消快速进仓, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }).then(() => {
          this.loading = false
          this.$api.deliveryRequest
            .fbaInCancel({ Id: row.ID })
            .then((res) => {
              this.loading = false
              if (!res.isSucceed) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                })
              }
            })
            .catch((err) => (this.loading = false))
        })
      }
    },
    //点击单元格
    cellclick(data) {
      if (data.columnIndex != 0) {
        this.$refs.grid.setAllCheckboxRow(false)
        this.$refs.grid.setCheckboxRow(data.row, true)
      }
    },
    //判断是否选择一条数据
    isSelectOne() {
      var data = []
      data.push(...this.$refs.grid.getCheckboxRecords())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条数据后操作!',
          type: 'error',
        })
        return null
      } else {
        return data[0]
      }
    },
    //查询
    query() {
      this.$nextTick(() => {
        if (this.model.isDetail == '') {
          this.columns = this.columnsno
        } else {
          this.columns = this.columnsdetial
        }
        this.gridData = []
        this.loading = true
        this.$api.deliveryRequest
          .getPageList({
            model: { ...this.model },
            pageInfo: { ...this.pageInfo },
          })
          .then((res) => {
            this.loading = false
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.pageInfo = res.data
              this.gridData = res.data.data
              delete this.pageInfo.data
            }
          })
          .catch((err) => (this.loading = false))
          .finally(() => {
            this.loading = false
          })
      })
    },
    printNum(row) {
      if (row.row.rowcolor === '') {
        row.row.rowcolor = '#333'
      }
      return 'color:' + row.row.rowcolor + ';height:30px'
    },
    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          } else {
            switch (column.property) {
              case '申请箱数':
                var sums = 0
                for (let i = 0; i < data.length; i++) {
                  if (data[i].申请箱数 === null) {
                    data[i].申请箱数 = ''
                  }
                  sums += Number(data[i].申请箱数)
                }
                return sums
              case '申请数量':
                var sums = 0
                for (let i = 0; i < data.length; i++) {
                  if (data[i].申请数量 === null) {
                    data[i].申请数量 = ''
                  }
                  sums += Number(data[i].申请数量)
                }
                return sums
              case '实发箱数':
                var sums = 0
                for (let i = 0; i < data.length; i++) {
                  if (data[i].实发箱数 === null) {
                    data[i].实发箱数 = ''
                  }
                  sums += Number(data[i].实发箱数)
                }
                return sums
              case '实发数量':
                var sums = 0
                for (let i = 0; i < data.length; i++) {
                  if (data[i].实发数量 === null) {
                    data[i].实发数量 = ''
                  }
                  sums += Number(data[i].实发数量)
                }
                return sums
              case '亚马逊入库片数':
                var sums = 0
                for (let i = 0; i < data.length; i++) {
                  if (data[i].亚马逊入库片数 === null) {
                    data[i].亚马逊入库片数 = ''
                  }
                  sums += Number(data[i].亚马逊入库片数)
                }
                return sums

              case '海外仓入库片数':
                var sums = 0
                for (let i = 0; i < data.length; i++) {
                  if (data[i].海外仓入库 === null) {
                    data[i].海外仓入库 = ''
                  }
                  sums += Number(data[i].海外仓入库片数)
                }
                return sums
              case '海外仓出库片数':
                var sums = 0
                for (let i = 0; i < data.length; i++) {
                  if (data[i].海外仓出库 === null) {
                    data[i].海外仓出库 = ''
                  }
                  sums += Number(data[i].海外仓出库片数)
                }
                return sums
              case '海外仓库存片数':
                var sums = 0
                for (let i = 0; i < data.length; i++) {
                  if (data[i].海外仓库存 === null) {
                    data[i].海外仓库存 = ''
                  }
                  sums += Number(data[i].海外仓库存片数)
                }
                return sums
              case '箱数':
                var sums = 0
                for (let i = 0; i < data.length; i++) {
                  if (data[i].箱数 === null) {
                    data[i].箱数 = ''
                  }
                  sums += Number(data[i].箱数)
                }
                return sums
              case '包数':
                var sums = 0
                for (let i = 0; i < data.length; i++) {
                  if (data[i].包数 === null) {
                    data[i].包数 = ''
                  }
                  sums += Number(data[i].包数)
                }
                return sums
              case '实际发货包数':
                var sums = 0
                for (let i = 0; i < data.length; i++) {
                  if (data[i].实际发货包数 === null) {
                    data[i].实际发货包数 = ''
                  }
                  sums += Number(data[i].实际发货包数)
                }
                return sums
              case '海外仓入库包数':
                var sums = 0
                for (let i = 0; i < data.length; i++) {
                  if (data[i].海外仓入库包数 === null) {
                    data[i].海外仓入库包数 = ''
                  }
                  sums += Number(data[i].海外仓入库包数)
                }
                return sums
              case '海外仓出库包数':
                var sums = 0
                for (let i = 0; i < data.length; i++) {
                  if (data[i].海外仓出库包数 === null) {
                    data[i].海外仓出库包数 = ''
                  }
                  sums += Number(data[i].海外仓出库包数)
                }
                return sums
              case '海外仓库存包数':
                var sums = 0
                for (let i = 0; i < data.length; i++) {
                  if (data[i].海外仓库存包数 === null) {
                    data[i].海外仓库存包数 = ''
                  }
                  sums += Number(data[i].海外仓库存包数)
                }
                return sums
              case '亚马逊入库包数':
                var sums = 0
                for (let i = 0; i < data.length; i++) {
                  if (data[i].亚马逊入库包数 === null) {
                    data[i].亚马逊入库包数 = ''
                  }
                  sums += Number(data[i].亚马逊入库包数)
                }
                return sums
            }
          }
          return null
        }),
      ]
      return footerData
    },
    // 当每页数量改变
    handleSizeChange(val) {
      this.pageInfo.page = 1
      this.pageInfo.pageSize = val
      this.query()
    },
    // 当当前页改变
    handleCurrentChange(val) {
      this.pageInfo.page = val
      this.query()
    },
    // 导出Excel表格
    ExportAll() {
      //this.$refs.mainTable.exportData({ type: 'csv' })
      const ws = XLSX.utils.json_to_sheet(this.gridData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
      XLSX.writeFile(wb, '窗帘发货申请单.xls', {
        bookType: 'xls',
        bookSST: false,
        type: 'array',
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
      this.$set(this.model, 'endDate', toMonth)
      this.$set(this.model, 'beginDate', startTime)
    },
    // 获取站点列表
    addProductState() {
      this.$api.publicApi
        .basShop()
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.shopList = res.data
            this.model.shop = this.shopList[0].id
            this.query()
          }
        })
        .catch((err) => console.log(err))
    },
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        var btnRow = document.getElementById('btnRow').offsetHeight
        var pagin = document.getElementById('pagin').offsetHeight
        this.gridHeight = card - queryRow - btnRow - pagin - 50
      })
    },
  },
  computed: {},
  created() {
    this.getNowDate()
    this.addProductState()
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
.rowHeight {
  height: 35px;
  .el-col {
    height: 35px;
  }
}
.el-date-editor {
  width: 100%;
}
.el-input {
  width: 100%;
}
.el-select {
  width: 100%;
}
.vxe-grid {
  margin-top: 10px;
}

>>> .cellClass {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 30px;
}
.el-pagination {
  float: right;
  padding-top: 10px;
  padding-right: 20px;
}
.el-button + .el-button {
  margin-left: 0px;
}
>>> .searchBtn {
  width: 70px;
  height: 30px;
  line-height: 10px;
  color: #fff;
  background: #ff9b22;
  border: 1px solid #ff9b22;
}
>>> .chooseEnter {
  width: 70px;
  height: 32px;
  background: #5473e8;
  border-radius: 2px;
  line-height: 32px;
  padding: 0;
}
.chooseCancel {
  width: 70px;
  height: 32px;
  background: #908fa0;
  border-radius: 2px;
  color: #fff;
  line-height: 32px;
  padding: 0;
}
.secondBtn {
  font-size: 14px;
  color: #333;
  .smBtn {
    width: 70px !important;
  }
  .smBtn2 {
    width: 90px !important;
  }
  .XlBtn {
    width: 140px !important;
  }

  .iconBtn {
    width: 100px;
    height: 32px;
    background: #5473e8;
    border-radius: 2px;
    font-size: 14px;
    border: 1px solid #5473e8;
    font-weight: 400;
    color: #fcfefe;
    padding: 0;
  }
  .delBtn {
    width: 70px !important;
    background: #ff9b22 !important;
    border: 1px solid #ff9b22 !important;
  }
  .delBtn2 {
    width: 90px !important;
    background: #ff9b22 !important;
    border: 1px solid #ff9b22 !important;
  }
}
>>> .hearderClass {
  text-align: center;
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  height: 34px;
  color: #333;
  background-color: #d5deff;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}
/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #ffffff;
}
>>> .jy-dialog .jy-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.exportBtn {
  height: 32px;
  border-radius: 2px;
  padding: 0px;
  width: 110px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
</style>