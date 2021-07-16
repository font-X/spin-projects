<template>
  <el-container id="mainCard">
    <!-- 遮罩层 -->
    <el-row style="width: 100%">
      <el-row id="queryRow">
        <el-card class="cardMargin">
          <el-row>
            <el-col>
              <el-form
                ref="mainForm"
                :model="mainTableParams"
                style="font-size：14px"
                label-width="84px"
              >
                <el-row class="mainForm">
                  <el-col
                    :md="8"
                    :lg="5"
                    :xl="5"
                    style="display: flex; justify-content: flex-start"
                  >
                    <!-- 查询条件区域 -->
                    <el-form-item label="制单时间：">
                      <span class="blockSpan">
                        <div class="blockDate">
                          <el-date-picker
                            class="unifySize unifySizeDate"
                            v-model="mainTableParams.BeginDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="开始时间"
                          ></el-date-picker>
                          <el-date-picker
                            class="unifySize unifySizeDate NoneIcon"
                            v-model="mainTableParams.EndDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="结束时间"
                          ></el-date-picker>
                        </div>
                      </span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="4" :xl="4">
                    <el-form-item class="searchMargin" label="计划单号：">
                      <!-- <el-input
                        clearable
                        v-model="mainTableParams.contractNo"
                        class="unifySize1 unifySize1"
                        placeholder="计划单号"
                      ></el-input> -->
                      <el-autocomplete
                        clearable
                        @keyup.enter.native="search()"
                        v-model="mainTableParams.PickingCode"
                        class="unifySize1"
                        :fetch-suggestions="querySearchNo"
                        placeholder="请输入计划单号"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="站点："
                    >
                      <el-select
                        clearable
                        v-model="mainTableParams.Shop"
                        class="unifySize"
                        placeholder="站点"
                      >
                        <el-option label="" value=""> </el-option>
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
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="是否完成："
                    >
                      <el-select
                        clearable
                        v-model="mainTableParams.Status"
                        class="unifySize"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in statusList"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item class="searchMargin" label="柜号：">
                      <!-- <el-input
                        clearable
                        autocomplete="on"
                        name="contractCode"
                        v-model="mainTableParams.cNumber"
                        class="unifySize1 unifySize1"
                        placeholder="柜号"
                      ></el-input> -->
                      <el-autocomplete
                        clearable
                        @keyup.enter.native="search()"
                        v-model="mainTableParams.cNumber"
                        class="unifySize1"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入柜号"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item class="searchMargin" label="制单人：">
                      <!-- <el-input
                        clearable
                        autocomplete="on"
                        name="contractCode"
                        v-model="mainTableParams.contractCode"
                        class="unifySize1 unifySize1"
                        placeholder="制单人"
                      ></el-input> -->
                      <el-autocomplete
                        clearable
                        @keyup.enter.native="search()"
                        v-model="mainTableParams.UserCode"
                        class="unifySize1"
                        :fetch-suggestions="querySearch2"
                        placeholder="请输入制单人"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="1" :xl="1">
                    <el-button
                      class="searchBtn searchMargin"
                      size="small"
                      :loading="searchLoading"
                      @click="search"
                      icon="iconfont kt-icon-sousuo_o"
                      >查询</el-button
                    >
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
            <el-col class="secondBtn">
              <el-button
                @click="WatchDetail"
                type="primary"
                class="smBtn iconBtn el-icon-view"
                >查看</el-button
              >
              <el-button
                @click="editCorlor"
                type="primary"
                class="smBtn iconBtn el-icon-edit-outline"
                >修改</el-button
              >
              <el-button
                type="primary"
                @click="print"
                class="smBtn iconBtn iconfont kt-icon-daoru"
                >打印</el-button
              >
              <!-- @click="printing" -->
              <el-button
                type="primary"
                @click="finish"
                :loading="cliclLoading"
                class="iconBtn iconfont kt-icon-caidan"
                >开始配货</el-button
              >
            </el-col>
          </el-row>
        </el-card>
      </el-row>

      <!-- 主表非明细区域 -->
      <el-row :gutter="10">
        <el-col :span="15" style="padding-right: 0px">
          <el-card class="marginTop">
            <!-- 表格 -->
            <el-row>
              <el-col>
                <vxe-grid
                  ref="leftTable"
                  border
                  resizable
                  stripe
                  class="mytable-scrollbar"
                  keep-source
                  show-overflow
                  :height="gridHeight"
                  show-footer
                  :loading="searchLoading"
                  :footer-method="footerMethod"
                  :footer-cell-class-name="footerCellClassName"
                  :header-row-class-name="hearderClass"
                  :row-class-name="cellClass"
                  :auto-resize="true"
                  :edit-config="{ trigger: 'click', mode: 'cell' }"
                  highlight-current-row
                  @cell-click="GetUnPickingDetailList"
                  :config="{ render: 'scroll' }"
                  :align="'center'"
                  :columns="column"
                  :checkbox-config="{ highlight: true }"
                  :data="bottomTableLeft"
                >
                  <template #date_default="{ row }">
                    <!-- <img :src="row.缩略图 " style="width: 100px" /> -->
                    <span>{{ row['出货日期'] | formatDate1 }}</span>
                  </template>
                </vxe-grid>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="9">
          <el-card class="tableRightTop">
            <el-row>
              <vxe-table
                ref="righTopTable"
                border
                resizable
                stripe
                keep-source
                show-overflow
                :height="gridHeight"
                show-footer
                :loading="cliclLoading"
                :footer-method="footerMethodTop"
                :footer-cell-class-name="footerCellClassName"
                class="mytable-scrollbar"
                :auto-resize="true"
                :row-class-name="cellClass"
                :edit-config="{ trigger: 'click', mode: 'cell' }"
                :header-cell-class-name="hearderClass"
                highlight-current-row
                :config="{ render: 'scroll' }"
                :align="'center'"
                :checkbox-config="{ highlight: true }"
                :data="bottomTableRightTop"
              >
                <vxe-table-column
                  type="seq"
                  width="60"
                  title="序号"
                ></vxe-table-column>
                <vxe-table-column
                  field="ProductNo"
                  title="产品号"
                ></vxe-table-column>
                <vxe-table-column
                  field="chnName"
                  title="产品名称"
                ></vxe-table-column>
                <vxe-table-column
                  width="100"
                  field="PlanNumber"
                  title="计划箱数"
                ></vxe-table-column>
                <vxe-table-column
                  width="100"
                  field="PickNumber"
                  title="已配箱数"
                ></vxe-table-column>
                <vxe-table-column
                  width="80"
                  field="PickPackage"
                  title="已配包数"
                ></vxe-table-column>
              </vxe-table>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-row>
    <el-dialog
      v-dialogDrag
      title="修改颜色标"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="editDaialogVisible"
      width="30%"
    >
      <el-row>
        <el-form
          ref="editForm"
          :model="editFormParams"
          style="font-size：14px"
          label-width="100px"
        >
          <el-col :span="12">
            <el-col :span="24">
              <el-form-item prop="PickingCode" label="计划单号：">
                <el-input
                  clearable
                  disabled
                  v-model="editFormParams.PickingCode"
                  class="unifySize"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="PickingCode" label="柜号：">
                <el-input
                  disabled
                  v-model="editFormParams.cNumber"
                  class="unifySize"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="Shop" label="颜色标：">
                <el-select
                  clearable
                  v-model="editFormParams.corlorTag"
                  class="unifySize"
                >
                  <el-option
                    :key="index"
                    v-for="(item, index) in corlorList"
                    :label="item.Name"
                    :value="item.Code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="12">
            <el-col :span="24">
              <el-form-item prop="ShipmentDate" label="出货日期：">
                <el-date-picker
                  class="unifySize"
                  disabled
                  v-model="editFormParams.ShipmentDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="PickingCode" label="柜型：">
                <el-input
                  clearable
                  disabled
                  v-model="editFormParams.type"
                  class="unifySize"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <span>
          <el-button
            type="primary"
            @click="CompletePickingPlan"
            class="chooseEnter"
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
          position: 'relative',
        }"
      >
        <start-delivery-schedule
          :selectRow="selectRow"
          ref="startDeliverySchedule"
          v-if="dialogParam.name === 'startDeliverySchedule'"
          @closeDialog="closeDialog"
        ></start-delivery-schedule>
        <add-delivery-schedule
          ref="addDeliverySchedule"
          :isWatch="isWatch"
          :edit="edit"
          :editData="editData"
          v-if="dialogParam.name === 'addDeliverySchedule'"
          @closeDialog="closeDialog"
        ></add-delivery-schedule>
      </div>
    </jy-dialog>
    <print-dialog
      ref="print1"
      :TempType="TempType"
      :ID="ID"
      :FileType="FileType"
      :Action="Action"
    >
    </print-dialog>
  </el-container>
</template>

<script>
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
import startDeliverySchedule from './startDeliverySchedule'
import addDeliverySchedule from '../DeliverySchedule/addDeliverySchedule'
import PrintDialog from '@/components/PrintDialog'
import JyDialog from '@/components/JyDialog'
export default {
  name: 'DeliveryProgress',
  components: {
    startDeliverySchedule,
    PrintDialog,
    addDeliverySchedule,
    JyDialog,
  },
  data() {
    return {
      // 打印组件参数开始
      TempType: '0160',
      ID: [],
      Action: 'print',
      FileType: 'html',
      // 打印组件参数结束
      // 主表类
      selectRow: {},
      corlorList: [],
      hearderClass: 'hearderClass',
      footerCellClassName: 'footerCellClassName',
      cellClass: 'cellClass',
      finishDaialogVisible: false,
      editDaialogVisible: false,
      loading: false,
      showdetail: false,
      searchLoading: false,
      edit: false,
      cliclLoading: false,
      editFormParams: {
        corlorTag: '',
        PickingCode: '',
        cNumber: '',
        ShipmentDate: '',
        type: '',
      },
      //主表订单管理表数据
      mainTableParams: {
        BeginDate: '',
        EndDate: '',
        PickingCode: '',
        Shop: '',
        Status: '',
        cNumber: '',
        UserCode: '',
      },
      column: [
        { type: 'checkbox', width: '50' },
        {
          type: 'seq',
          width: '60',
          title: '序号',
        },

        {
          title: '完成',
          field: '状态',
          width: '60',
        },
        {
          width: '150',
          title: '计划单号',
          field: '计划单号',
          align: 'left',
        },
        {
          title: '站点',
          field: '站点',
          width: '70',
        },
        {
          title: '出货日期',
          field: '出货日期',
          width: '90',
          slots: { default: 'date_default' },
        },
        {
          title: '柜号',
          field: '柜号',
          width: '90',
        },
        {
          title: '柜型',
          field: '柜型',
          width: '50',
        },
        {
          title: '颜色标',
          field: '颜色标',
          width: '68',
        },
        {
          title: '货柜容量',
          field: 'PlanNumber',
          width: '80',
        },
        {
          title: '已配箱数',
          field: 'PickNumber',
          width: '80',
        },
        {
          title: '已配包数',
          field: 'PickPackage',
          width: '80',
        },
        {
          title: '备注',
          field: '备注',
          minWidth: '60',
          align: 'left',
        },
        {
          title: '制单人',
          field: '制单人',
          width: '70',
        },
        {
          title: '制单日期',
          field: '制单日期',
          width: '90',
        },
      ],
      gridHeight: 600,
      statusList: [
        { id: '', name: '' },
        { id: '1', name: '是' },
        { id: '0', name: '否' },
      ],
      bottomTableLeft: [],
      bottomTableRightTop: [],
      bottomTableRightBottom: [],
      editData: {},
      shopList: [],
      columnIcon: '◇', //列分隔符
      computedHeight: window.innerHeight - 100 + 'px',
      dialogParam: {
        title: '',
        type: '',
        name: '',
        width: '70%',
        isShowDialog: false,
      },
    }
  },

  methods: {
    // 查看
    WatchDetail() {
      this.isWatch = true
      var data = []
      data.push(...this.$refs.leftTable.getCheckboxRecords())
      if (data.length !== 1) {
        this.$message.error('请选择一条数据后操作!')
      } else {
        this.$api.delivery
          .GetPickingPlan({ pickingId: data[0].PickingId })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.edit = true
              this.editData = res.data
              this.dialogParam = {
                title: '查看配货计划表',
                name: 'addDeliverySchedule',
                type: '',
                width: '70%',
                isShowDialog: true,
              }
            }
          })
          .catch((err) => console.log(err))
      }
    },
    // 打印事件
    // 打印事件
    print() {
      var data = []
      data.push(...this.$refs.leftTable.getCheckboxRecords())
      if (data.length !== 1) {
        this.$message.error('请选择一条数据后操作!')
      } else {
        this.LableNo = ''
        this.ID = []
        this.ID.push(data[0].ContainerId)
        this.$refs.print1.printList({
          TempType: '0160',
          ID: this.ID,
        })
      }
    },
    // 报批
    closeDialog() {
      this.dialogParam.isShowDialog = false
      this.search()
    },
    report() {
      var data = []
      if (this.showdetail === false) {
        data.push(...this.$refs.leftTable.getCheckboxRecords())
      } else {
        data.push(...this.$refs.mainTable.getCheckboxRecords())
      }
      if (data.length !== 1) {
        this.$message.error('请选择一条数据后操作!')
      } else {
        var ID = data[0].PickingId
        this.obj = {
          ObjectCode: '0160',
          Key: ID,
        }
        this.dialogParam = {
          title: '报批',
          name: 'AnalysusReport',
          type: '',
          width: '700px',
          isShowDialog: true,
        }
      }
    },
    // 修改颜色标
    editCorlor() {
      var data = []
      data.push(...this.$refs.leftTable.getCheckboxRecords())
      if (data.length !== 1) {
        this.$message.error('请选择一条数据后操作!')
      } else {
        this.editFormParams.PickingCode = data[0]['计划单号']
        this.editFormParams.cNumber = data[0]['柜号']
        this.editFormParams.corlorTag = data[0]['颜色标']
        this.editFormParams.ShipmentDate = data[0]['出货日期']
        this.editFormParams.type = data[0]['柜型']
        this.editDaialogVisible = true
      }
    },
    // 编辑
    editClick() {
      var data = []
      if (this.showdetail === false) {
        data.push(...this.$refs.leftTable.getCheckboxRecords())
      } else {
        data.push(...this.$refs.mainTable.getCheckboxRecords())
      }
      if (data.length !== 1) {
        this.$message.error('请选择一条数据后操作!')
      } else {
        this.$api.delivery
          .GetPickingPlan({ pickingId: data[0].PickingId })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.edit = true
              this.editData = res.data
              this.dialogParam = {
                title: '编辑配货计划表',
                name: 'addDeliverySchedule',
                type: '',
                width: '70%',
                isShowDialog: true,
              }
            }
          })
          .catch((err) => console.log(err))
      }
    },
    getColorTagList() {
      this.$api.publicApi
        .GetContainerColorTagList({ flag: 'PickingColor' })
        .then((res) => {
          this.corlorList = res.data
        })
        .catch((err) => console.log(err))
    },
    // 修改柜子颜色标
    CompletePickingPlan() {
      var data = []
      data.push(...this.$refs.leftTable.getCheckboxRecords())
      if (data.length !== 1) {
        this.$message.error('请选择一条数据后操作!')
      } else {
        this.$api.delivery
          .UpdatePickingPlanColorTag({
            containerId: data[0].ContainerId,
            colorTag: this.editFormParams.corlorTag,
          })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.$message({
                message: '修改成功!',
                type: 'success',
              })
              this.editDaialogVisible = false
              this.search()
            }
          })
          .catch((err) => console.log(err))
      }
    },
    // 完成配货
    finish() {
      var data = []
      data.push(...this.$refs.leftTable.getCheckboxRecords())
      if (data.length !== 1)
        return this.$message.error('请选择且只能选择一条数据后操作!')

      this.selectRow = data[0]
      if (this.bottomTableRightTop.length === 0) {
        this.selectRow.finished = '0'
      } else {
        this.selectRow.finished = '1'
      }
      this.dialogParam = {
        title: '开始配货',
        name: 'startDeliverySchedule',
        type: '',
        width: '60%',
        isShowDialog: true,
      }
    },
    // 删除配货计划表
    delDeliverySchedule() {
      var data = []
      if (this.showdetail === false) {
        data.push(...this.$refs.leftTable.getCheckboxRecords())
      } else {
        data.push(...this.$refs.mainTable.getCheckboxRecords())
      }
      if (data.length !== 1) {
        this.$message.error('请选择一条数据后操作!')
      } else {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          // 调用删除接口
          this.$api.delivery
            .DeletePickingPlan({ pickingId: data[0].PickingId })
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
                this.search()
              }
            })
            .catch((err) => console.log(err))
        })
      }
    },
    GetUnPickingDetailList(row) {
      // 点击当前行勾选
      if (row.columnIndex != 0) {
        this.$refs.leftTable.setAllCheckboxRow(false)
        this.$refs.leftTable.setCheckboxRow(row.row, true)
      }
      this.bottomTableRightTop = []
      this.cliclLoading = true
      this.$api.delivery
        .GetProductListProgress({ containerId: row.row.ContainerId })
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
        .finally(() => {
          this.cliclLoading = false
        })
    },
    // 打印
    printing() {
      this.dialogParam = {
        title: '配货计划表打印',
        name: 'PrintingDeliverySchedule',
        type: '',
        width: '50%',
        isShowDialog: true,
      }
    },
    // 新增配货计划表
    addDeliverySchedule() {
      this.edit = false
      this.dialogParam = {
        title: '新增配货计划表',
        name: 'addDeliverySchedule',
        type: '',
        width: '70%',
        isShowDialog: true,
      }
    },
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
    // 返回输入建议的方法
    querySearch(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory('dpc-cNumber')
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    querySearch2(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory('dpc-UserCode')
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    querySearchNo(queryString, cb) {
      var invoiceAccountHistory =
        this.getInvoiceAccountHistory('dpc-PickingCode')
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 提交查询
    search() {
      this.searchLoading = true
      // 查询时存放历史查询记录
      this.handleSearchHistory('dpc-cNumber', this.mainTableParams.cNumber)
      // 计划单号
      this.handleSearchHistory(
        'dpc-PickingCode',
        this.mainTableParams.PickingCode
      )
      this.handleSearchHistory('dpc-UserCode', this.mainTableParams.UserCode)
      this.bottomTableRightBottom = []
      this.bottomTableRightTop = []
      this.bottomTableLeft = []
      // 调用查询接口
      this.$api.delivery
        .GetPickingPlanListProgress({ model: { ...this.mainTableParams } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
            this.searchLoading = false
          } else {
            this.bottomTableLeft = res.data
            this.searchLoading = false
          }
        })
        .catch((err) => {
          this.$message({
            message: err,
            type: 'error',
          })
          this.searchLoading = false
        })
        .finally(() => {
          this.searchLoading = false
        })
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
      this.$set(this.mainTableParams, 'EndDate', toMonth)
      this.$set(this.mainTableParams, 'BeginDate', startTime)
    },
    // 表尾合计
    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          switch (column.property) {
            case 'PlanNumber':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i]['PlanNumber']
              }
              return sums
            case 'PickNumber':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i]['PickNumber']
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    // 表尾合计
    footerMethodTop({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          switch (column.property) {
            case 'PlanNumber':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i]['PlanNumber']
              }
              return sums
            case 'PickNumber':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i]['PickNumber']
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        this.gridHeight = card - queryRow - 50
      })
    },
  },
  computed: {},
  created() {
    this.addProductState()
    this.getNowDate()
    this.search()
    this.getColorTagList()
    this.resize()
    // this.addProductCurrency()
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
  color: #fff;
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
  height: 32px;
  border-radius: 2px;
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
.iconBtn2 {
  width: 140px;
  height: 32px;
  margin-left: 100px;
  background: #5473e8;
  border-radius: 2px;
  font-size: 14px;
  border: 1px solid #5473e8;
  font-weight: 400;
  color: #fcfefe;
  padding: 0;
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
  width: 48% !important;
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
.clearBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #908fa0;
  border: 1px solid #908fa0 !important;
}
>>> .pagination {
  float: right;
  margin-top: 20px;
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
>>> .jy_wrapper .el-dialog__body {
  border-bottom: none !important;
}
>>> .el-dialog .el-dialog__header {
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
<style lang="scss" scoped>
.el-card {
  width: 100%;
  background: #fff;
  >>> .el-card__body {
    padding: 10px;
    width: 100%;
  }
}
.divCon {
  display: flex;
  justify-content: start;
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

>>> .tableRightTopTitle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
>>> .tableRightTop {
  width: 100%;
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
>>> .EnterFinish {
  position: relative;
  height: 200px;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  line-height: 200px;
}
.warnIcon {
  color: rgb(255, 156, 36);
  line-height: 200px;
  font-size: 40px;
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
  height: 30px;
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
>>> .el-dialog .el-dialog__header {
  background: #c5c5c5 !important;
  height: 40px !important;
}
>>> .el-row {
  height: auto;
}
</style>