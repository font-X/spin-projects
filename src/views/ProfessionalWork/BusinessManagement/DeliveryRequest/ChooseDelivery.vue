<template>
  <!-- 选择单号信息 -->
  <jy-dialog
    title="选择装箱单"
    append-to-body
    :close-on-click-modal="false"
    v-if="showChooseDelivery"
    :visible.sync="showChooseDelivery"
    height="800px"
    width="1250px"
  >
    <!-- 表单数据 -->
    <el-form
      ref="chooseForm"
      :model="chooseParams"
      style="font-size：14px"
      label-width="110px"
    >
      <el-row>
        <el-col :span="24" style="display: flex">
          <el-form-item label="发货申请单号：">
            <el-input
              style="margin-top: 5px"
              v-model="chooseParams.DeliveryPlanCode"
              class="unifySize"
              clearable
            ></el-input>
          </el-form-item>
          <!-- <el-form-item prop="CarOut" label="制单日期：">
            <el-date-picker
              v-model="chooseParams.begindate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择开始日期"
            >
            </el-date-picker>
            <i> 至 </i>
            <el-date-picker
              v-model="chooseParams.endDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择结束日期"
            >
            </el-date-picker>
          </el-form-item> -->
          <el-form-item label="制单时间：">
            <span class="blockSpan">
              <div class="blockDate">
                <el-date-picker
                  class="unifySize unifySizeDate"
                  v-model="chooseParams.begindate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="开始时间"
                ></el-date-picker>
                <el-date-picker
                  class="unifySize unifySizeDate NoneIcon"
                  v-model="chooseParams.endDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="结束时间"
                ></el-date-picker>
              </div>
            </span>
          </el-form-item>
          <el-form-item label="站点:">
            <el-select
              style="margin-top: 5px"
              class="unifySize"
              v-model="chooseParams.shop"
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
          <el-form-item label="货件编号：">
            <el-input
              style="margin-top: 5px"
              v-model="chooseParams.ShipmentNo"
              class="unifySize"
              clearable
            ></el-input>
          </el-form-item>
          <el-button
            type="danger"
            class="searchBtn"
            @click="getList"
            size="small"
            :loading="loading1"
            icon="el-icon-search"
            >查询</el-button
          >
        </el-col>

        <!-- <el-col> </el-col> -->
      </el-row>
      <vxe-table
        ref="chooseTable"
        border
        resizable
        stripe
        keep-source
        :row-class-name="cellClass"
        show-overflow
        height="730"
        @cell-click="cellclick"
        class="mytable-scrollbar"
        :loading="loading1"
        :auto-resize="true"
        :header-cell-class-name="hearderClass"
        highlight-current-row
        :config="{ render: 'scroll' }"
        :align="'center'"
        :checkbox-config="{ highlight: true }"
        :data="choosePaging.data"
      >
        <vxe-table-column type="checkbox" width="40"></vxe-table-column>
        <vxe-table-column type="seq" width="60" title="序号"></vxe-table-column>
        <vxe-table-column
          width="80"
          field="状态"
          title="状态"
        ></vxe-table-column>
        <vxe-table-column
          width="70"
          field="站点"
          title="站点"
        ></vxe-table-column>
        <vxe-table-column
          width="110"
          align="left"
          field="发货申请单号"
          title="发货申请单号"
        ></vxe-table-column>
        <vxe-table-column
          width="120"
          field="货件编号"
          title="货件编号"
        ></vxe-table-column>
        <vxe-table-column
          width="120"
          field="海外仓编号"
          title="海外仓编号"
        ></vxe-table-column>
        <vxe-table-column
          width="110"
          field="货件名称"
          title="货件名称"
        ></vxe-table-column>
        <vxe-table-column
          width="60"
          field="包数"
          title="包数"
        ></vxe-table-column>
        <vxe-table-column
          width="100"
          field="发货日期"
          title="发货日期"
        ></vxe-table-column>
        <vxe-table-column
          align="left"
          min-width="110"
          field="备注"
          title="备注"
        ></vxe-table-column>
        <vxe-table-column
          width="70"
          field="制单人"
          title="制单人"
        ></vxe-table-column>
        <vxe-table-column
          width="100"
          field="制单日期"
          title="制单日期"
        ></vxe-table-column>
      </vxe-table>
    </el-form>
    <!-- 分页 -->
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col style="display: flex; justify-content: space-between">
          <el-pagination
            @size-change="chooseHandleSizeChange"
            @current-change="chooseHandleCurrentChange"
            :current-page="choosePaging.page"
            background
            :page-sizes="[100, 200, 500, 1000]"
            :page-size="choosePaging.limit"
            layout="prev,pager,next,total,sizes,jumper"
            :total="choosePaging.total"
          >
          </el-pagination>
          <span>
            <el-button type="primary" @click="chooseEnter" class="chooseEnter"
              >确 定</el-button
            >
            <el-button @click="showChooseDelivery = false" class="chooseCancel"
              >退 出</el-button
            >
          </span>
        </el-col>
      </el-row>
    </span>
  </jy-dialog>
</template>
<script>
import JyDialog from '@/components/JyDialog/index'
export default {
  components: { JyDialog },
  props: {
    shopList: Array,
  },
  data() {
    return {
      chooseParams: {
        DeliveryPlanCode: '',
        Type: '10',
        UserCode: '',
        begindate: '',
        endDate: '',
      },
      productLoading: false,
      loading1: false,
      showChooseDelivery: false,
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      cellChooseClass: 'cellChooseClass',
      choosePaging: { list: [], data: [], limit: 100, total: null, page: 1 }, //选择产品表的分页
      chooseProduceList: [],
    }
  },
  methods: {
    // 确认按钮
    chooseEnter() {
      var data = []
      data.push(...this.$refs.chooseTable.getCheckboxRecords())
      console.log(data)
      if (data.length !== 1) {
        this.$message.error('只能一条数据后操作!')
      } else {
        this.$api.deliveryRequest
          .GetRequestProductList({ deliveryPlanId: data[0].ID })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              res.data.deliver = data[0]
              this.showChooseDelivery = false
              this.$emit('okDaialog', res.data)
            }
          })
          .catch((err) => console.log(err))
          .finally(() => {})
      }
    },
    cellclick(data) {
      if (data.columnIndex != 0) {
        this.$refs.chooseTable.setAllCheckboxRow(false)
        this.$refs.chooseTable.setCheckboxRow(data.row, true)
      }
    },
    choosePageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作(选择产品表)
      this.choosePaging.data = this.chooseProduceList
      this.choosePaging.total = this.choosePaging.data.length
      this.chooseGetList()
    },
    // 处理数据(选择产品表)
    chooseGetList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.choosePaging.data = this.choosePaging.data.filter(
        (item, index) =>
          index < this.choosePaging.page * this.choosePaging.limit &&
          index >= this.choosePaging.limit * (this.choosePaging.page - 1)
      )
    },
    // 当每页数量改变(选择产品表)
    chooseHandleSizeChange(val) {
      this.choosePaging.limit = val
      this.choosePageList()
    },
    // 当当前页改变(选择产品表)
    chooseHandleCurrentChange(val) {
      this.choosePaging.page = val
      this.choosePageList()
    },
    getList() {
      this.loading1 = true
      this.choosePaging.data = []
      this.$api.PackingRequest.queryPacking({ model: this.chooseParams })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.chooseProduceList = res.data
            this.choosePageList()
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.loading1 = false
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
      // 获取三个月前的时间
      var threeMonthDate = new Date()
      threeMonthDate.setMonth(threeMonthDate.getMonth() - 3)
      var startTime1 =
        threeMonthDate.getFullYear() +
        '-' +
        (threeMonthDate.getMonth() + 1) +
        '-' +
        threeMonthDate.getDate()
      this.chooseParams.begindate = startTime1
      this.chooseParams.endDate = toMonth
      this.getList()
    },
  },
  created() {
    this.getNowDate()
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
>>> .mainForm .marginLeft {
  margin-left: 0px;
}
>>> .searchMargin {
  // margin-left: 15px;
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
.img {
  width: 200px;
  height: 60px;
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
  margin-top: 7px;
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
// >>> .footerCellClassName {
//   background: #d1f3ff;
// }
.searchBtn {
  width: 70px !important;
  height: 30px !important;
  line-height: 10px;
  margin-top: 5px;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 10px;
}
.mainTable .el-card {
  height: 100%;
}

.delBtn {
  width: 70px !important;
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
.special {
  flex: 1;
  position: relative;
  .choose {
    position: absolute;
    top: 0;
    right: -20px;
  }
}
>>> .Delivery > .vxe-input--inner {
  width: 630px !important;
}
>>> .vxe-input--inner {
  position: relative;
  width: 180px;
  >>> .vxe-input--suffix .is--clear {
    position: absolute;
    top: 2px;
    right: -20px;
  }
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
>>> .Bottom-Border input {
  border: none !important;
  border-radius: 0px;
  border-bottom: 1px solid #bbb !important;
}
>>> .None-Border input {
  border: none !important;
  outline: none !important;
}
>>> .el-form-item__content {
  line-height: 30px !important;
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
>>> .blockSpan .el-form-item__content {
  line-height: 30px;
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
.unifySize2 {
  margin-left: 30px;
}
// >>> .addform[data-v-2a1679eb] .el-input__inner {
//   width: 154px;
// }
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
// >>> .JyDialog {
//   height: 550px;
// }
.addform >>> .el-input__inner {
  width: 154px;
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
>>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 150px;
}
.NullTip {
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 400px;
  transform: translate(-50%, 50%);
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
// 文字提示
.item {
  margin: 1px;
}
.el-upload__text {
  width: 90px;
  border-radius: 2px;
  height: 30px;
  line-height: 30px;
  background-color: #f0f0f0;
}
>>> .el-upload-list {
  width: 300px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.imgShow {
  background-color: #e3eaf4;
  position: relative;
}
.mainContain {
  display: flex;
}
.bottom {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer !important;
}
.blockSpan {
  width: 100%;
  display: flex;
  height: 32px;
  justify-content: space-between;
  border-radius: 4px;
  margin-top: 5px;
  border: 1px solid #c7c6de;
}
.FullName {
  cursor: pointer !important;
  color: #0f6099;
  height: 20px;
}
</style>