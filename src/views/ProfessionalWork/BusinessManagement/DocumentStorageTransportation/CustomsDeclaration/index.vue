<template>
  <!-- 遮罩层 -->
  <el-row style="width: 100%" id="mainCard">
    <el-col>
      <el-card class="cardMargin" id="queryRow">
        <el-row>
          <el-col>
            <el-form
              ref="mainForm"
              :model="QueryList"
              style="font-size：14px"
              label-width="84px"
            >
              <el-row class="mainForm">
                <el-col
                  :md="8"
                  :lg="6"
                  :xl="5"
                  style="display: flex; justify-content: flex-start"
                >
                  <!-- 查询条件区域 -->
                  <el-form-item label="制单时间：">
                    <span class="blockSpan">
                      <div class="blockDate">
                        <el-date-picker
                          class="unifySize unifySizeDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                          v-model="QueryList.BeginDate"
                        ></el-date-picker>
                        <el-date-picker
                          class="unifySize unifySizeDate NoneIcon"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                          v-model="QueryList.EndDate"
                        ></el-date-picker>
                      </div>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :md="5" :lg="4" :xl="4">
                  <el-form-item class="searchMargin" label="外销发票号：">
                    <el-input
                      clearable
                      class="unifySize1 unifySize1"
                      placeholder="请输入"
                      v-model.trim="QueryList.InvoiceNo"
                      @keydown.enter.native="searchEnter"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :md="5" :lg="3" :xl="3">
                  <el-form-item
                    class="searchMargin"
                    style="margin-bottom: 0px"
                    label="站点："
                  >
                    <el-select
                      v-model="QueryList.Shop"
                      class="unifySize"
                      placeholder="请选择"
                      @keydown.enter.native="searchEnter"
                    >
                      <el-option value=""></el-option>
                      <el-option
                        :key="index"
                        v-for="(item, index) in shopList"
                        :label="item.Name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="5" :lg="3" :xl="3">
                  <el-form-item class="searchMargin" label="装箱单号：">
                    <el-input
                      clearable
                      class="unifySize"
                      placeholder="请输入"
                      v-model.trim="QueryList.cabinOrderNo"
                      @keydown.enter.native="searchEnter"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="5" :lg="3" :xl="3">
                  <el-form-item
                    class="searchMargin"
                    style="margin-bottom: 0px"
                    label="状态："
                  >
                    <el-select
                      clearable
                      v-model="QueryList.Status"
                      class="unifySize"
                      placeholder="请选择"
                      @keydown.enter.native="searchEnter"
                    >
                      <el-option
                        :key="index"
                        v-for="(item, index) in StatusList"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :md="6" :lg="4" :xl="4">
                  <el-button
                    v-show="iconShow"
                    type="danger"
                    class="searchBtn searchMargin"
                    size="small"
                    icon="iconfont kt-icon-sousuo_o"
                    :loading="searchLoading"
                    @click="MainTableSearch"
                    >查询</el-button
                  >
                  <el-button
                    v-show="iconShow"
                    type="danger"
                    class="closeInput searchMargin"
                    size="small"
                    @click="IconShow"
                    icon="iconfont kt-icon-anniu_jiantouzhankai"
                    >展开</el-button
                  >
                </el-col>
              </el-row>
              <el-row v-show="!iconShow" class="mainForm marginLe">
                <el-col :md="8" :lg="6" :xl="5">
                  <el-form-item
                    label-width="84px"
                    style="margin-bottom: 0"
                    label="目的港："
                  >
                    <el-input
                      clearable
                      class="productHeight"
                      placeholder="请输入"
                      v-model.trim="QueryList.Destination"
                      @keydown.enter.native="searchEnter"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="5" :lg="4" :xl="4">
                  <el-form-item
                    label-width="84px"
                    class="searchMargin"
                    label="制单人："
                  >
                    <el-input
                      clearable
                      class="unifySize1"
                      placeholder="请输入"
                      v-model.trim="QueryList.Inputer"
                      @keydown.enter.native="searchEnter"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="5" :xl="3">
                  <el-form-item class="searchMargin" label="收汇方式：">
                    <el-select
                      clearable
                      v-model="QueryList.Payment1"
                      class="unifySize"
                      placeholder="请选择"
                      @keydown.enter.native="searchEnter"
                    >
                      <el-option
                        :key="index"
                        v-for="(item, index) in PaymentList"
                        :label="item.Remark"
                        :value="item.PayMode"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="5" :lg="3" :xl="3">
                  <el-button
                    type="danger"
                    class="searchBtn searchMargin"
                    size="small"
                    icon="iconfont kt-icon-sousuo_o"
                    :loading="searchLoading"
                    @click="MainTableSearch"
                    >查询</el-button
                  >
                  <el-button
                    type="danger"
                    class="closeInput searchMargin"
                    size="small"
                    @click="IconShow"
                    icon="iconfont kt-icon-anniu_jiantoushouqi"
                    >收起</el-button
                  >
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <!-- 按钮区域 -->
          <el-col class="secondBtn">
            <el-button
              type="primary"
              @click="addCustomsDeclaration"
              class="smBtn iconBtn el-icon-edit-outline"
              >新增</el-button
            >
            <el-button
              type="primary"
              class="smBtn iconBtn el-icon-edit-outline"
              @click="Edit"
              >编辑</el-button
            >
            <!-- <el-button
                type="primary"
                class="smBtn iconBtn el-icon-view"
                >查看</el-button
              > -->
            <el-button
              type="primary"
              class="delBtn iconBtn el-icon-delete"
              @click="CDocumentDel"
              >删除</el-button
            >
            <el-button
              type="primary"
              @click="reportItem"
              class="smBtn iconBtn iconfont kt-icon-caidan"
              >报批</el-button
            >
            <el-button
              type="primary"
              @click="printing"
              class="iconBtn iconfont kt-icon-caidan"
              >单证打印</el-button
            >
            <el-button
              type="primary"
              @click="Confirm"
              class="iconBtn iconfont kt-icon-caidan"
              >报关确认</el-button
            >
          </el-col>
        </el-row>
      </el-card>
    </el-col>

    <!-- 主表区域 -->
    <el-col class="mainTable">
      <el-card style="margin-top：5px">
        <vxe-grid
          border
          resizable
          stripe
          ref="mainTable"
          width="auto"
          :auto-resize="true"
          class="mytable-scrollbar"
          show-overflow="title"
          @cell-click="cellclick"
          @cell-dblclick="dbMainClick"
          :loading="mainTableLoading"
          :height="iconShow ? gridHeight * 1.06 : gridHeight * 1"
          :columns="columns"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true }"
          :footer-cell-class-name="footerCellClassName"
          :footer-method="footerMethod"
          show-footer
          show-footer-overflow
          :data="paging.data"
        >
        </vxe-grid>
        <!-- 分页 -->
        <el-col class="closeTable">
          <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paging.page"
            background
            :page-sizes="[100, 200, 500, 1000]"
            :page-size="paging.limit"
            layout="prev,pager,next,total,sizes,jumper"
            :total="paging.total"
          >
          </el-pagination>
        </el-col>
      </el-card>
    </el-col>
    <JyDialog
      v-dialogDrag
      class="noMarginBottom"
      :title="dialogParam.title"
      :close-on-click-modal="false"
      :visible.sync="dialogParam.isShowDialog"
      top="10px"
      v-if="dialogParam.isShowDialog"
      :width="dialogParam.width"
      append-to-body
    >
      <div
        :style="
          dialogParam.name === 'AnalysusReport'
            ? {
                height: '400px',
                position: 'relative',
              }
            : {
                position: 'relative',
              }
        "
      >
        <!-- 新增报关单证的组件 -->
        <add-customs-declaration
          @closeDialogF="closeDialogF"
          @closeDialog="closeDialogS"
          :EditList="EditList"
          :Status="Status"
          :isEdit="isEdit"
          :shopList="shopPermissionList"
          :PaymentList="PaymentList"
          :PortInfoList="PortInfoList"
          :currencyList="currencyList"
          :formList="formLIst"
          :shipPingComoany="ShipPingComoany"
          :priceTermList="PriceTermList"
          :countryList="CountryList"
          v-if="dialogParam.name === 'AddCustomsDeclaration'"
        ></add-customs-declaration>
        <analysus-report
          :obj="obj"
          v-if="dialogParam.name === 'AnalysusReport'"
          ref="AnalysusReport"
          @closeDialog="closeDialog1"
        ></analysus-report>
        <!-- 打印 -->
      </div>
    </JyDialog>
    <print-dialog
      ref="print1"
      :TempType="TempType"
      :ID="ID"
      :FileType="FileType"
      :Action="Action"
    >
    </print-dialog>
  </el-row>
</template>
<script>
// import ReportApproval from '../../../Components/ReportApproval.vue'
import JyDialog from '@/components/JyDialog/index'
import PrintDialog from '@/components/PrintDialog'
import AnalysusReport from '@/views/ProfessionalWork/BusinessManagement/E-Commerce/AnalysusTable/AnalysusReport'
import AddCustomsDeclaration from './addCustomsDeclaration'
import PrintingCustomsDeclaration from './PrintingCustomsDeclaration'
export default {
  components: {
    AddCustomsDeclaration,
    PrintingCustomsDeclaration,
    AnalysusReport,
    PrintDialog,
    JyDialog,
  },
  name: 'CustomsDeclaration',
  data() {
    return {
      // 打印组件参数开始
      TempType: '0106',
      ID: [],
      Action: 'print',
      FileType: 'html',
      showReportDialog: false, //报批弹框的显示与隐藏
      QueryList: {
        BeginDate: '',
        EndDate: '',
        InvoiceNo: '',
        Shop: '',
        cabinOrderNo: '',
        Status: '',
        Destination: '',
        Inputer: '',
        Payment1: '',
      }, //查询条件
      delLength: [], //复选框选中的数据
      shopList: [],
      shopPermissionList: [], //无权限站点数据
      currencyList: [], //获取货币列表
      ShipPingComoany: [], //发货公司
      PriceTermList: [], //价格条款
      CountryList: [], //贸易国国家
      EditList: [],
      isEdit: false,
      StatusList: [
        { id: '01', name: '新制' },
        { id: '02', name: '待审批' },
        { id: '03', name: '已审批' },
        { id: '04', name: '审批不通过' },
        { id: '05', name: '已报关' },
      ],
      PaymentList: [],
      CDocumentList: [],
      PortInfoList: [], //运输方式的数据
      paging: { list: [], data: [], limit: 100, total: null, page: 1 }, //主表分页
      iconShow: false, //控制收起展开
      dialogParam: {
        title: '',
        type: '',
        name: '',
        width: '70%',
        isShowDialog: false,
      },
      // computedHeight: window.innerHeight - 100 + 'px',
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '50', title: '序号' },
        { width: '80', title: '状态', field: 'StatusName' },
        { width: '90', title: '外销发票号', field: 'InvoiceNo' },
        { width: '90', title: '订舱日期', field: 'EDT' },
        { width: '90', title: '出货日期', field: 'LeaveDate' },
        {
          align: 'left',
          width: '180',
          title: '装箱单号',
          field: 'cabinOrderNo',
        },
        { width: '70', title: '站点', field: 'shop' },
        { width: '70', title: '总箱数', field: 'TotalPackage' },
        { width: '70', title: '总数量', field: 'TotalQuantity' },
        { width: '70', title: '总金额', field: 'TotalAmount' },
        { width: '70', title: '总毛重', field: 'TotalGW' },
        { width: '70', title: '总净重', field: 'TotalNW' },
        { width: '70', title: '总体积', field: 'TotalCBM' },
        { width: '90', title: '价格条款', field: 'PriceTerm' },
        { width: '100', title: '目的港', field: 'Destination' },
        { width: '120', title: '收汇方式', field: 'Payment1' },
        { align: 'left', minWidth: '130', title: '备注', field: 'Remark' },
        { width: '80', title: '制单人', field: 'Inputer' },
        { width: '100', title: '制单时间', field: 'InputDate' },
        { width: '80', title: '报关员', field: 'ApplyMan' },
        { width: '160', title: '报关日期', field: 'ApplyDate' },
      ],
      // 查询loading
      searchLoading: false,
      mainTableLoading: false,
      formLIst: [], //记忆数据
      gridHeight: 565,
      footerCellClassName: 'footerCellClassName',
      Status:'see'
      
    }
  },
  created() {
    //初始化 加载查询方法
    this.addProductState() // 获取站点列表
    this.addPermissionState() //无权限站点
    this.addPaymentDate() //收汇方式
    this.addTrafficList() //运输方式
    this.addProductCurrency() //货币
    this.getShipPingComoany() //发货公司
    this.getPriceTermList() //价格条款
    this.getCountryData() //贸易国
    this.resize()
  },
  mounted() {
    var _this = this
    window.onresize = function () {
      // 定义窗口大小变更通知事件
      _this.resize()
    }
  },
  methods: {
    // 合计
    footerMethod({ columns }) {
      const data = this.CDocumentList
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          }
          switch (column.property) {
            case 'TotalQuantity':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i]['TotalQuantity'])
              }
              return sums
            case 'TotalAmount':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i]['TotalAmount'])
              }
              return sums
            case 'TotalCBM':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i]['TotalCBM'])
              }
              return sums
            case 'TotalGW':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i]['TotalGW'])
              }
              return sums
            case 'TotalNW':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i]['TotalNW'])
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    cellclick(data) {
      // console.log(data);
      if (data.columnIndex != 0) {
        this.$refs.mainTable.setAllCheckboxRow(false)
        this.$refs.mainTable.setCheckboxRow(data.row, true)
      }
    },
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        console.log(card, queryRow)
        this.gridHeight = card - queryRow - 80
        console.log(this.gridHeight)
      })
    },
    //报关单证删除
    CDocumentDel() {
      // var data = []
      var ShipmentNoList = []
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.delLength.length < 1)
        return this.$message.error('请选择复选框再继续删除操作')
      this.delLength.map((item) => {
        ShipmentNoList.push(item.ShipmentNo.trim())
      })
      // if (this.delLength.length < 1) {
      //   this.$message.error('请选择一条数据后操作!')
      // } else {
      this.$confirm('是否确认删除?', '报关单证删除操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 调用删除接口
        this.$api.CustomsDeclaration.CDocumentDel({
          ShipmentNoList: ShipmentNoList,
        })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.$message({
                message: '删除成功!',
                type: 'success',
              })
              this.delLength = []
              this.MainTableSearch()
            }
          })
          .catch((err) => console.log(err))
      })
      // }
    },
    searchEnter(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.MainTableSearch()
      }
    },
    MainTableSearch() {
      this.CDocumentList = []
      this.GetCDocumentList()
    },
    //报关单证查询功能
    GetCDocumentList() {
      this.searchLoading = true
      this.mainTableLoading = true
      this.delLength = []
      if (this.QueryList.BeginDate == null) {
        this.QueryList.BeginDate = ''
      }
      if (this.QueryList.EndDate == null) {
        this.QueryList.EndDate = ''
      }
      this.$api.CustomsDeclaration.GetCDocumentQuery({
        model: { ...this.QueryList },
      })
        .then((res) => {
          // console.log(res)
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.CDocumentList = res.data
            this.pageList()
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.searchLoading = false
          this.mainTableLoading = false
        })
    },
    // 获取站点列表
    addProductState() {
      this.$api.publicApi
        .basShop()
        .then((res) => {
          if (res.statusCode < 0) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.shopList = res.data
            this.getNowDate()
            // this.delLength = []
          }
        })
        .catch((err) => console.log(err))
    },
    // 获取无权限站点列表
    addPermissionState() {
      this.$api.publicApi
        .allShop()
        .then((res) => {
          // console.log(res)
          if (res.statusCode < 0) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.shopPermissionList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    // 获取收汇列表
    addPaymentDate() {
      this.$api.CustomsDeclaration.CollectionListQuery()
        .then((res) => {
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.PaymentList = res.data
            // this.delLength = []
          }
        })
        .catch((err) => console.log(err))
    },
    // 获取运输方式
    addTrafficList() {
      this.$api.CustomsDeclaration.PortInfoQuery()
        .then((res) => {
          console.log(res)
          if (res.statusCode < 0) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.PortInfoList = res.data
            // this.delLength = []
          }
        })
        .catch((err) => console.log(err))
    },
    // 获取货币列表
    addProductCurrency() {
      this.$api.publicApi
        .bcCurrency()
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.data.message,
              type: 'error',
            })
          } else {
            this.currencyList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    closeDialogF() {
      this.dialogParam.isShowDialog = false
      this.MainTableSearch()
    },
    closeDialogS() {
      this.dialogParam.isShowDialog = false
    },
    // 发货公司
    getShipPingComoany() {
      this.$api.CustomsDeclaration.getDeliverGoods({ cnName: '', enName: '' })
        .then((res) => {
          // console.log(res)
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            res.data.forEach((item) => {
              item.CompanyCode = item.CompanyCode.trim()
            })
            this.ShipPingComoany = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    // 获取国家
    getCountryData() {
      this.$api.zeroOrder.getCountry().then((res) => {
        console.log(res)
        if (res.statusCode !== 200) return this.$message.error(res.message)
        this.CountryList = res.data
      })
    },
    // 价格条款
    getPriceTermList() {
      this.$api.CustomsDeclaration.GetPriceTermList({ flag: 'PriceTerm' })
        .then((res) => {
          console.log(res)
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            // res.data.forEach((item) => {
            //   item.CompanyCode = item.CompanyCode.trim()
            // })
            this.PriceTermList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    // //单证打印
    // Printing() {
    //   this.dialogParam = {
    //     title: '报关单证打印',
    //     name: 'PrintingCustomsDeclaration',
    //     type: '',
    //     width: '50%',
    //     isShowDialog: true,
    //   }
    // },
    // 主表双击查看事件
    dbMainClick(row) {
      // data.push(...this.$refs.mainTable.getCheckboxRecords())
      this.$api.CustomsDeclaration.CDocumentEditInfoQuery({
        ShipmentNo: row.row.ShipmentNo,
      })
        .then((res) => {
          // console.log(res);
          if (res.statusCode < 0) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.EditList = res.data
            this.isEdit = true
            this.Status = 'see'
            this.dialogParam = {
              title: '查看报关单证',
              name: 'AddCustomsDeclaration',
              type: '',
              width: '70%',
              height: '700px',
              isShowDialog: true,
            }
            console.log('EditList', this.EditList)
            // this.delLength = []
          }
        })
        .catch((err) => console.log(err))
    },
    Edit() {
      // var data = []
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      // data.push(...this.$refs.mainTable.getCheckboxRecords())
      if (this.delLength.length < 1)
        return this.$message.error('请选择复选框再继续编辑操作!')
      if (this.delLength.length > 1)
        return this.$message.error('请选择一条数据后操作!')
      // if (this.delLength[0].Status == '03')
      //   return this.$message.error('已审批状态不允许编辑操作')
      //编辑
      // console.log(this.delLength[0]['ShipmentNo'])
      this.$api.CustomsDeclaration.CDocumentEditInfoQuery({
        ShipmentNo: this.delLength[0].ShipmentNo,
      })
        .then((res) => {
          // console.log(res);
          if (res.statusCode < 0) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.EditList = res.data
            this.isEdit = true
            this.Status = ''
            this.dialogParam = {
              title: '编辑报关单证',
              name: 'AddCustomsDeclaration',
              type: '',
              width: '70%',
              height: '700px',
              isShowDialog: true,
            }
            console.log('EditList', this.EditList)
            // this.delLength = []
          }
        })
        .catch((err) => console.log(err))
    },
    //新增报关单证
    addCustomsDeclaration() {
      this.isEdit = false
      this.formLIst = localStorage.getItem('form')
      // console.log(this.formLIst);
      this.Status = ''
      this.dialogParam = {
        title: '新增报关单证',
        name: 'AddCustomsDeclaration',
        type: '',
        width: '70%',
        height: '700px',
        isShowDialog: true,
      }
      this.delLength = []
    },
    //收起展开状态
    IconShow() {
      this.iconShow = !this.iconShow
    },
    //分页开始
    // 当每页数量改变
    handleSizeChange(val) {
      this.paging.limit = val
      this.pageList()
    },
    // 当当前页改变
    handleCurrentChange(val) {
      this.paging.page = val
      this.pageList()
    },
    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.paging.data = this.CDocumentList
      this.paging.total = this.paging.data.length
      this.getList()
    },
    // 处理数据
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.paging.data = this.paging.data.filter(
        (item, index) =>
          index < this.paging.page * this.paging.limit &&
          index >= this.paging.limit * (this.paging.page - 1)
      )
    },
    // 分页结束
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
      this.$set(this.QueryList, 'EndDate', toMonth)
      this.$set(this.QueryList, 'BeginDate', startTime)
      this.GetCDocumentList()
    },
    //报批
    reportItem() {
      var data = []
      data.push(...this.$refs.mainTable.getCheckboxRecords())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条数据后操作!',
          type: 'error',
        })
      } else {
        var ID = data[0].ShipmentNo
        // console.log(data[0])
        this.showReportDialog = true
        this.obj = { ObjectCode: '0106', Key: ID }
        this.dialogParam = {
          title: '报批',
          name: 'AnalysusReport',
          type: '',
          width: '700px',
          isShowDialog: true,
        }
      }
    },
    closeDialog1() {
      this.dialogParam.isShowDialog = false
      this.showReportDialog = false
      this.MainTableSearch()
    },
    // //报批完成后
    // closeDialog1() {
    //   this.dialogParam.isShowDialog = false
    //   this.delLength = []
    //   this.MainTableQuery()
    // },
    // 打印按钮
    printing() {
      var data = []
      data.push(...this.$refs.mainTable.getCheckboxRecords())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条数据后做打印操作!',
          type: 'error',
        })
      } else {
        // console.log(data[0].ShipmentNo)
        this.LableNo = ''
        this.ID = []
        this.ID.push(data[0].ShipmentNo)
        this.$refs.print1.printList({
          TempType: '0106',
          ID: this.ID,
        })
      }
    },
    // 确认报关
    Confirm() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.delLength.length < 1)
        return this.$message.error('请选择复选框进行报关确认操作')
      if (this.delLength.length > 1)
        return this.$message.error('请选择一条数据操作')
      if (this.delLength[0].Status != '03')
        return this.$message.error('只有已审批状态才能报关确认')
      // this.delLength.map((item) => {
      //   ShipmentNoList.push(item.ShipmentNo.trim())
      // })
      this.$confirm('确定这条报关单证已完成了吗?', '报关确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.CustomsDeclaration.CDocumentAffirm({
            ShipmentNo: this.delLength[0].ShipmentNo,
          }).then((res) => {
            // console.log(res)
            if (res.statusCode !== 200) return this.$message(res.message)
            this.$message({
              type: 'success',
              message: '确认成功!',
            })
            this.MainTableSearch()
          })
          // this.$message({
          //   type: 'success',
          //   message: '确认成功!',
          // })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消确认',
          })
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.cardMargin {
  margin-top: 0px !important;
}
.closeInput {
  border: 1px solid #36c2cf;
  background-color: #36c2cf;
  margin-left: 5px !important;
  line-height: 0px;
  height: 30px;
}
.blockSpan {
  width: 100%;
  display: flex;
  height: 32px;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid #c7c6de;
}
>>> .listDate .el-input__inner {
  height: 30px;
  padding: 0 0 0 5px;
  width: 99px;
  border-radius: 4px 0 0 4px;
}
>>> .el-form-item {
  margin-bottom: 0px;
}
>>> .listDate .el-input__inner::placeholder {
  color: #333;
}
>>> .listDate .el-input__icon {
  line-height: normal;
}
>>> .listDate .el-icon-arrow-up:before {
  color: #333;
}
>>> .listDate .el-input__inner {
  background: #f3f3f3;
}
>>> .blockDate .el-input__inner {
  height: 30px;
  width: 100%;
  border: none;
}
>>> .blockDate .el-input__inner input {
  width: 125px !important;
}
>>> .blockDate .el-input__icon {
  height: 30px;
}
>>> .blockDate .el-range-separator {
  height: 30px;
  padding: 0;
}
.tableTitle {
  margin-top: 15px;
}
>>> .mainForm .el-form-item__content {
  line-height: normal;
}
>>> .mainForm .el-form-item__label {
  line-height: 30px;
}
.tipsLeft .el-form-item__error {
  left: -83px;
}
>>> .mainForm .marginLeft {
  margin-left: 0px;
}
>>> .searchMargin {
  margin-left: 15px;
  margin-bottom: 0;
}
.marginR {
  margin-left: 0px;
  display: flex;
  justify-content: space-between;
}
.marginR .marginLeft {
  margin-left: -82px;
  margin-top: -10px;
}
.cellChooseClass {
  height: 28px;
}
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
.cellChooseClassLeft {
  height: 45px;
  line-height: normal;
}
.el-card {
  width: 100%;
  padding: 11px;
  margin-top: 5px;
  >>> .el-card__body {
    padding: 0;
    >>> .mixInput {
      width: 310px;
      display: flex;
      height: 30px;
      border: 1px solid #c7c6de;
      border-radius: 2px;
      >>> .el-input-group__append {
        border: none;
        width: 30px;
        padding: 0;
      }
    }
  }
}
>>> .renminder {
  font-size: 14px;
  display: flex;
  height: 30px;
  width: 1200px;
  margin: 0 0 7px 15px;
  justify-content: space-between;
  >>> .el-form-item__label {
    margin-left: -62px;
  }
}
>>> .footerCellClassName {
  background: #d1f3ff;
}
.searchBtn {
  width: 70px !important;
  height: 30px !important;
  line-height: 10px;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 22px;
}
.mainTable .el-card {
  height: 100%;
}

.delBtn {
  width: 70px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
.exportBtn {
  width: 80px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
>>> .el-checkbox {
  line-height: 30px;
}
.secondBtn {
  margin-top: 11px;
  font-size: 14px;
  color: #333;
  .smBtn {
    width: 70px !important;
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
}
>>> .vxe-table--render-default
  .vxe-table--fixed-left-wrapper.scrolling--middle {
  box-shadow: none;
}
>>> .vxe-table--render-default.border--full .vxe-table--fixed-left-wrapper {
  border-right: none;
}
>>> .vxe-table--render-default .vxe-body--column,
.vxe-table--render-default .vxe-footer--column,
.vxe-table--render-default .vxe-header--column {
  line-height: 15px;
}
>>> .el-button + .el-button {
  margin-left: 0px;
}
>>> .el-button--primary {
  border-color: #5473e8;
}

.marginLeft {
  margin-left: -62px;
}
.CloseBtn {
  margin-top: 15px;
}
.saveAnd {
  width: 100px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #21bdca;
  border: 1px solid #21bdca !important;
}
.saveAnd1 {
  width: 100px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #ccc;
  border: 1px solid #ccc !important;
}
.sizeMarginLeft {
  margin-left: -50px;
}
>>> .chooseEnter {
  width: 70px;
  height: 32px;
  background: #5473e8;
  border-radius: 2px;
  line-height: 32px;
  padding: 0;
}
>>> .addheight {
  height: 500px;
}
>>> .Bottom-Border input {
  border: none !important;
  border-radius: 0px;
  border-bottom: 1px solid #bbb !important;
}
>>> .None-Border input {
  border: none !important;
  outline: none !important;
}
>>> .unifySize {
  width: 100% !important;
  height: 30px;
}
>>> .unifySizeDate {
  width: 49% !important;
}
>>> .unifySize1 {
  height: 30px;
}

>>> .marginLeft {
  margin-left: -15px;
  margin-top: 10px;
}
>>> .marginLe {
  margin-top: 10px;
}
>>> .productHeight .el-input__inner {
  border-radius: 0px;
  width: 100%;
  height: 30px;
}
>>> .None-Border {
  height: 100%;
}
>>> .unifySize input {
  height: 30px;
}
>>> .unifySize1 input {
  height: 30px;
}
>>> .el-input__inner input {
  width: 150px !important;
}
>>> .None-Border .el-input-group__prepend {
  border: none;
  border-radius: 2px;
}
>>> .el-input-group__append {
  width: 30px;
  height: 100%;
}
>>> .None-Border .el-input__icon {
  line-height: normal;
}
>>> .None-Border .el-input__inner {
  height: 28px;
}
>>> .inputSize input {
  width: 100px;
  border-right: none !important;
  outline: none !important;
}
>>> .inputSize .el-input__inner {
  width: 100px;
  height: 100%;
}
>>> .inputSize .el-input-group {
  height: 100%;
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
>>> .hearderClass {
  text-align: center;
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  height: 34px;
  color: #333;
  background-color: #d5deff;
}
>>> .cellClass {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 30px;
}
>>> .cellClassAdd {
  color: red;
  font-family: 'Microsoft YaHei';
  height: 30px;
}
>>> .el-icon-circle-plus-outline:before {
  display: none;
}
.clearBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #908fa0;
  border: 1px solid #908fa0 !important;
}
>>> .jy_wrapper .JyDialog__body {
  height: 500px !important;
}
>>> .pagination {
  float: right;
  margin-top: 20px;
}
>>> .vxe-table--render-default .vxe-table--header {
  height: 48px;
}
>>> .unifySize .el-input__icon {
  line-height: normal;
}
>>> .el-form-item__label {
  padding: 0;
}
.closeTable {
  display: flex;
  justify-content: flex-end;
}
.closeTableBtn {
  width: 70px;
  height: 32px;
  margin: 20px 10px 0 0;
  background: #5473e8;
  border-radius: 2px;
  line-height: 32px;
  padding: 0;
  font-size: 14px;
}
.iconP {
  font-size: 22px;
  color: #5473e8;
  float: right;
  transform: rotate(90deg);
}
>>> .reminClass {
  margin-left: 5px;
  margin-top: -10px;
}
.bottomTable {
  display: flex;
  justify-content: space-between;
  .bottomTable_l {
    height: 400px;
    flex: 6;
    margin-right: 11px;
  }
  .bottomTable_r {
    flex: 4;
    height: 400px;
  }
}
.saveBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #5473e8;
  border: 1px solid #5473e8 !important;
}
.Mask {
  display: block;
  z-index: 999999;
  width: 100%;
  height: 100%;
  background: #808080;
}
.iconC {
  font-size: 22px;
  color: #5473e8;
}
>>> .blockDate .el-input__inner {
  width: 100%;
}
>>> .jy_wrapper .JyDialog__body {
  border-bottom: none !important;
}
>>> .JyDialog .JyDialog__header {
  background: #c5c5c5;
  height: 40px;
}
>>> .NoneIcon .el-input__prefix {
  display: none;
}
.NullTip {
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 400px;
  transform: translate(-50%, 50%);
}
>>> .formStyle {
  display: flex;
  justify-content: space-between;
}
>>> .vxe-header--column .vxe-cell--edit-icon,
.vxe-header--column .vxe-cell-help-icon {
  display: none;
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
>>> .el-form-item__error {
  padding-top: 0px;
}
</style>