<template>
  <div>
    <el-form
      ref="addForm"
      :rules="addRules"
      :model="addOrderParams"
      style="font-size：14px"
      label-width="110px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label-width="110px"
            prop="DepotInNo"
            label="发货申请单号："
          >
            <el-input
              clearable
              v-model="DepotInNo"
              class="unifySize"
              placeholder="发货申请单号"
            >
              <el-button
                @click="getDeliverList"
                slot="append"
                icon="el-icon-search"
              ></el-button
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="shop" label="海外仓编号：">
            <el-input
              disabled
              v-model="addOrderParams.BakField1"
              class="unifySize"
              placeholder="海外仓编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="MOrderNo" label="订单编号：">
            <el-input
              v-model="addOrderParams.MOrderNo"
              class="unifySize"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="Free5" label="提单编号：">
            <el-input
              v-model="addOrderParams.Free5"
              class="unifySize"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="DepotInDate" label="入库日期：">
            <el-date-picker
              v-model="addOrderParams.DepotInDate"
              class="unifySize"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col v-if="this.status !== 'seaIn'" :span="8">
          <el-form-item label="FBA编号：">
            <el-input
              v-model="addOrderParams.Free6"
              class="unifySize"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="height: 70px; margin-top: 10px">
          <!-- 文本域 -->
          <el-form-item label-width="110px" label="备注：">
            <el-input
              clearable
              v-model="addOrderParams.Remark"
              type="textarea"
              :rows="2"
              placeholder="请输入备注信息"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col class="addheight">
          <vxe-grid
            border
            ref="addTable"
            resizable
            stripe
            keep-source
            :auto-resize="true"
            style="margin-top: 11px"
            show-overflow="title"
            width="auto"
            class="mytable-scrollbar"
            :header-cell-class-name="hearderClass"
            :row-class-name="cellClass"
            height="560"
            highlight-current-row
            :edit-config="{
              trigger: 'click',
              mode: 'cell',
            }"
            :align="'center'"
            :checkbox-config="{
              highlight: true,
            }"
            :columns="columns"
            :data.sync="addProduceList"
          >
            <template #img1_default="{ row }">
              <i
                @click="addRow(row)"
                class="iconC el-icon-circle-plus-outline"
              ></i>
              <i @click="deleteRow(row)" class="iconC el-icon-delete"></i>
            </template>
            <template #edit_default="{ row }">
              <vxe-input v-model="row.入包数"></vxe-input>
            </template>
            <template #edit_defaultout="{ row }">
              <vxe-input v-model="row.出包数"></vxe-input>
            </template>
          </vxe-grid>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <el-button
            type="primary"
            :loading="saveBtnLoading"
            @click="save"
            class="saveBtn iconfont kt-icon-baocun"
            >保存</el-button
          >
          <el-button type="primary" class="clearBtn">取消</el-button>
        </el-col>
      </el-row>
    </span>
    <choose-delivery
      :shopList="shopList"
      ref="ChooseDelivery"
      v-if="showChooseDelivery"
      @okDaialog="okDaialog"
    >
    </choose-delivery>
  </div>
</template>

<script>
import JyDialog from '@/components/JyDialog'
import ChooseDelivery from './ChooseDelivery'
export default {
  components: { JyDialog, ChooseDelivery },
  props: {
    shopList: Array,
    RequestData: Object,
    status: String,
  },
  data() {
    return {
      addRules: {
        contractCode: [
          { required: true, message: '请输入订单号', trigger: 'blur' },
        ],
        Free5: [{ required: true, message: '请输入提交编号', trigger: 'blur' }],
        DepotInDate: [
          { required: true, message: '请选择入库日期', trigger: 'blur' },
        ],
        MOrderNo: [
          { required: true, message: '请输入订单编号', trigger: 'blur' },
        ],
      },
      addOrderParams: {
        DepotInNo: '',
        UserCode: '',
        Type: '10',
        DepotNo: '90',
        Class: '01',
        DepotInDate: '',
        MOrderNo: '', //订单编号
        BatchNo: '',
        Free3: '', //ID
        Free4: '',
        Free5: '', //提单编号
        Unit: 'JL053',
        Remark: '', //备注
        strDetail: '',
        strMessage: '',
        FgDepotInNo: '',
        Free6: '', //FBA编号
      },
      showChooseDelivery: false,
      DepotInNo: '',
      addProduceList: [{}],
      columns: [],
      r_columns: [
        { type: 'checkbox', width: '40' },
        {
          title: '产品编码',
          field: '产品号',
        },
        {
          title: '产品名称',
          field: '产品名称',
        },
        {
          title: '样式',
          field: '样式',
          width: '60',
        },
        {
          title: '色号',
          field: '色号',
          width: '60',
        },
        {
          title: '颜色',
          field: '颜色',
          width: '60',
        },
        {
          title: '尺寸',
          field: '尺寸',
          width: '60',
        },
        {
          title: '尺寸单位',
          field: '尺寸单位',
          width: '80',
        },
        {
          title: '每包片数',
          field: '每包片数',
          width: '80',
        },
        {
          title: '包数',
          field: '入包数',
          width: '80',
          slots: { default: 'edit_default' },
        },
        {
          title: '操作',
          field: '',
          width: '80',
          slots: { default: 'img1_default' },
        },
      ],
      seaOut_columns: [
        { type: 'checkbox', width: '40' },
        {
          title: '产品编码',
          field: '产品号',
        },
        {
          title: '产品名称',
          field: '产品名称',
        },
        {
          title: '样式',
          field: '样式',
          width: '60',
        },
        {
          title: '色号',
          field: '色号',
          width: '60',
        },
        {
          title: '颜色',
          field: '颜色',
          width: '60',
        },
        {
          title: '尺寸',
          field: '尺寸',
          width: '60',
        },
        {
          title: '尺寸单位',
          field: '尺寸单位',
          width: '80',
        },
        {
          title: '每包片数',
          field: '每包片数',
          width: '80',
        },
        {
          title: '包数',
          field: '出包数',
          width: '80',
          slots: { default: 'edit_defaultout' },
        },
        {
          title: '操作',
          field: '',
          width: '80',
          slots: { default: 'img1_default' },
        },
      ],
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      saveBtnLoading: false,
    }
  },
  methods: {
    // 保存
    save() {
      // 表格校验
      this.$refs.addForm.validate((valid) => {
        if (!valid) {
          return false
        } else {
          this.saveBtnLoading = true
          if (this.status === 'seaIn') {
            // 海外仓入库
            this.addOrderParams.Free3 = this.RequestData.ID
            this.addOrderParams.Free6 = ''
            this.DepotInNo = this.RequestData.Table1[0]['DeliveryPlanCode']
            this.addOrderParams.Type = '10'
            var str = ''
            this.addProduceList.forEach((item, index) => {
              str +=
                item['产品号'] +
                '◇' +
                item['每包片数'] +
                '◇' +
                item['入包数'] +
                '◆'
            })
            this.addOrderParams.strDetail = str
            this.$api.deliveryRequest
              .HWDepotInAdd({ model: this.addOrderParams })
              .then((res) => {
                if (res.statusCode !== 200) {
                  this.$message({
                    message: res.message,
                    type: 'error',
                  })
                } else {
                  this.$message({
                    message: '保存成功！',
                    type: 'success',
                  })
                  this.$emit('closeDialog')
                }
              })
              .catch((err) => console.log(err))
              .finally(() => {
                this.saveBtnLoading = false
              })
          } else if (this.status === 'seaOut') {
            // 海外仓出库
            this.addOrderParams.Free3 = this.RequestData.ID
            this.DepotInNo = this.RequestData.Table1[0]['DeliveryPlanCode']
            this.addOrderParams.Type = '10'
            var str = ''
            this.addProduceList.forEach((item, index) => {
              str +=
                item['产品号'] +
                '◇' +
                item['每包片数'] +
                '◇' +
                item['出包数'] +
                '◆'
            })
            this.addOrderParams.strDetail = str
            this.$api.deliveryRequest
              .HWDepotOutAdd({ model: this.addOrderParams })
              .then((res) => {
                if (res.statusCode !== 200) {
                  this.$message({
                    message: res.message,
                    type: 'error',
                  })
                } else {
                  this.$message({
                    message: res.message,
                    type: 'success',
                  })
                }
              })
              .catch((err) => console.log(err))
              .finally(() => {
                this.saveBtnLoading = false
              })
          } else if (this.status === 'amazon') {
            // 亚马逊入库
            this.addOrderParams.Free3 = this.RequestData.ID
            this.addOrderParams.Type = '11'
            this.DepotInNo = this.RequestData.Table1[0]['DeliveryPlanCode']
            var str = ''
            this.addProduceList.forEach((item, index) => {
              str +=
                item['产品号'] +
                '◇' +
                item['每包片数'] +
                '◇' +
                item['入包数'] +
                '◆'
            })
            this.addOrderParams.strDetail = str
            this.$api.deliveryRequest
              .HWDepotInAdd({ model: this.addOrderParams })
              .then((res) => {
                if (res.statusCode !== 200) {
                  this.$message({
                    message: res.message,
                    type: 'error',
                  })
                } else {
                  console.log(res)
                }
              })
              .catch((err) => console.log(err))
              .finally(() => {
                this.saveBtnLoading = false
              })
          }
        }
      })
    },
    // 获取发货申请单
    getDeliverList() {
      this.showChooseDelivery = true
      this.$nextTick(() => {
        this.$refs.ChooseDelivery.showChooseDelivery = true
      })
    },
    okDaialog(data) {
      this.DepotInNo = data.deliver.发货申请单号
      this.addOrderParams.BakField1 = data.deliver.海外仓编号
      this.addProduceList = data.list
      this.RequestData.ID = data.deliver.ID
    },
    // 表内增加行按钮
    addRow(row) {
      if (this.addProduceList.length !== 0) {
        var index = this.addProduceList.findIndex((item) => {
          return item._XID === row._XID
        })
      } else {
        var index = -1
      }
      // 插入
      if (row) {
        this.addProduceList.splice(index + 1, 0, {})
      } else {
        this.addProduceList.push({})
      }
    },
    // 表内删除行按钮
    deleteRow(row) {
      this.$confirm('是否删除本行?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          var index = this.addProduceList.findIndex((item) => {
            return item._XID === row._XID
          })
          this.addProduceList.splice(index, 1)
          if (this.addProduceList.length === 0) {
            this.addProduceList[0] = {}
          }
        })
        .catch(() => {})
    },
    getData() {
      if (this.status !== 'seaOut') {
        this.columns = this.r_columns
      } else {
        this.columns = this.seaOut_columns
      }
      this.DepotInNo = this.RequestData.Table1[0]['DeliveryPlanCode']
      this.addOrderParams.BakField1 = this.RequestData.Table1[0]['BakField1']
      this.addProduceList = this.RequestData.Table2
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
      this.addOrderParams.DepotInDate = toMonth
    },
  },
  created() {
    this.getData()
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
  height: 580px;
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
>>> .cellClassAdd {
  color: red;
  font-family: 'Microsoft YaHei';
  height: 30px;
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
>>> .jy_wrapper .jy-dialog__body {
  border-bottom: none !important;
}
>>> .jy-dialog .jy-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
>>> .el-form-item__content {
  line-height: 30px;
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
>>> .el-autocomplete {
  width: 100%;
}
</style>