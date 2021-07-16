<template>
  <div>
    <!-- 表单数据 -->
    <el-form
      ref="addForm"
      :model="addFormParams"
      :rules="addRules"
      style="font-size：14px"
      label-width="100px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            prop="ShipmentDate"
            label-width="110px"
            label="交货日期："
          >
            <el-date-picker
              class="unifySizeDate"
              v-model="addFormParams.ShipmentDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="到货类型：">
            <el-select
              clearable
              v-model="addFormParams.isClose"
              class="unifySize"
              placeholder="是否关闭"
            >
              <!-- <el-option
                :key="index"
                v-for="(item, index) in IsClose"
                :label="item.label"
                :value="item.value"
              ></el-option> -->
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="存放仓库：">
            <el-select
              clearable
              v-model="addFormParams.isClose"
              class="unifySize"
              placeholder="是否关闭"
            >
              <!-- <el-option
                :key="index"
                v-for="(item, index) in IsClose"
                :label="item.label"
                :value="item.value"
              ></el-option> -->
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生产单号：">
            <el-input
              clearable
              style="margin-top: 5px"
              v-model="addFormParams.PickingCode"
              class="unifySize"
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="加工工厂：">
            <el-input
              clearable
              style="margin-top: 5px"
              v-model="addFormParams.PickingCode"
              class="unifySize"
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="免检类型：">
            <el-select
              clearable
              v-model="addFormParams.isClose"
              class="unifySize"
              placeholder="是否关闭"
            >
              <!-- <el-option
                :key="index"
                v-for="(item, index) in IsClose"
                :label="item.label"
                :value="item.value"
              ></el-option> -->
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否包装：">
            <el-select
              clearable
              v-model="addFormParams.isClose"
              class="unifySize"
              placeholder="是否关闭"
            >
              <!-- <el-option
                :key="index"
                v-for="(item, index) in IsClose"
                :label="item.label"
                :value="item.value"
              ></el-option> -->
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请单：">
            <el-input
              clearable
              style="margin-top: 5px"
              v-model="addFormParams.PickingCode"
              class="unifySize"
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="到货方式：">
            <el-select
              clearable
              @change="DeliveryMethod"
              v-model="addFormParams.DeliveryMethod"
              class="unifySize"
              placeholder="到货方式"
            >
              <el-option
                :key="index"
                v-for="(item, index) in DeliveryMethod"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="height: 54px; margin-bottom: 5px">
          <!-- 文本域 -->
          <el-form-item label-width="100px" label="免检描述：">
            <el-input
              clearable
              type="textarea"
              :rows="2"
              placeholder="请输入免检描述"
              v-model="addFormParams.Remark"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="height: 54px">
          <!-- 文本域 -->
          <el-form-item label-width="100px" label="备注：">
            <el-input
              clearable
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              v-model="addFormParams.Remark"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col
          v-show="addFormParams.DeliveryMethod === '0'"
          style="height: 500px"
        >
          <vxe-table
            border
            ref="addTable"
            resizable
            stripe
            keep-source
            :header-row-class-name="hearderClass"
            :row-class-name="cellClass"
            class="mytable-scrollbar"
            :auto-resize="true"
            show-footer
            :footer-method="footerMethodTop"
            :footer-cell-class-name="footerCellClassName"
            style="margin-top: 11px"
            show-overflow="title"
            width="auto"
            height="480"
            highlight-current-row
            :edit-config="{ trigger: 'click', mode: 'row' }"
            :align="'center'"
            :checkbox-config="{
              highlight: true,
            }"
            :data="addListOne"
          >
            <vxe-table-column type="checkbox" width="3%"></vxe-table-column>
            <vxe-table-column
              type="seq"
              width="3%"
              title="序号"
            ></vxe-table-column>
            <vxe-table-column width="8%" field="P_Status" title="电商订单号">
            </vxe-table-column>
            <vxe-table-column
              width="9%"
              field=""
              title="产品号"
              :edit-render="{
                name: 'input',
                attrs: { type: 'text' },
                immediate: true,
              }"
            >
            </vxe-table-column>
            <vxe-table-column width="9%" field="" title="产品名称">
            </vxe-table-column>
            <vxe-table-column
              width="3%"
              field=""
              title="样式"
              :edit-render="{
                name: 'input',
                attrs: { type: 'text' },
                immediate: true,
              }"
            >
            </vxe-table-column>
            <vxe-table-column width="3%" field="" title="色号">
            </vxe-table-column>
            <vxe-table-column
              width="3%"
              field=""
              title="颜色"
            ></vxe-table-column>
            <vxe-table-column
              width="3%"
              field=""
              title="尺寸"
            ></vxe-table-column>
            <vxe-table-column
              width="5%"
              field=""
              title="尺寸单位"
            ></vxe-table-column>
            <vxe-table-column
              width="3%"
              field=""
              title="单位"
            ></vxe-table-column>
            <vxe-table-column
              width="3%"
              field=""
              title="方案"
            ></vxe-table-column>
            <vxe-table-column
              width="6%"
              field=""
              title="每片用料(米)"
            ></vxe-table-column>
            <vxe-table-column
              width="5%"
              field=""
              title="原估计米数"
            ></vxe-table-column>
            <vxe-table-column
              width="5%"
              field=""
              title="估计米数"
            ></vxe-table-column>
            <vxe-table-column
              width="4%"
              field=""
              title="米每匹"
            ></vxe-table-column>
            <vxe-table-column
              width="3%"
              field=""
              title="匹数"
            ></vxe-table-column>
            <vxe-table-column
              width="3%"
              field=""
              title="备注"
            ></vxe-table-column>
            <vxe-table-column
              width="3%"
              field=""
              title="排序"
            ></vxe-table-column>
            <vxe-table-column
              width="4%"
              field=""
              title="到货数"
            ></vxe-table-column>
            <vxe-table-column
              width="3%"
              field=""
              title="关闭"
            ></vxe-table-column>
            <vxe-table-column width="9%" field="操作" title="操作">
              <template> </template>
            </vxe-table-column>
          </vxe-table>
        </el-col>
        <el-col v-show="addFormParams.DeliveryMethod === '1'">
          <el-form
            ref="addForm"
            :model="addFormParams"
            :rules="addRules"
            style="font-size：14px"
            label-width="84px"
            @submit.native.prevent
          >
            <el-row>
              <el-col :span="12">
                <el-form-item
                  prop="PickingCode"
                  label-width="100px"
                  label="扫描流转卡："
                >
                  <el-input
                    @keyup.enter.native="Shipment"
                    suffix-icon="iconfont kt-icon-saoyisao"
                    v-model="addFormParams.PickingCode"
                    class="unifySize"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col style="margin-bottom: 10px" :span="24">
                <vxe-table
                  border
                  resizable
                  stripe
                  keep-source
                  :header-row-class-name="hearderClass"
                  :row-class-name="cellClass"
                  class="mytable-scrollbar"
                  :auto-resize="true"
                  show-footer
                  :footer-method="footerMethodTop"
                  :footer-cell-class-name="footerCellClassName"
                  show-overflow="title"
                  width="auto"
                  height="450"
                  highlight-current-row
                  :edit-config="{ trigger: 'click', mode: 'row' }"
                  :align="'center'"
                  :checkbox-config="{
                    highlight: true,
                  }"
                  :data="addListTwo"
                >
                  <vxe-table-column
                    type="checkbox"
                    width="3%"
                  ></vxe-table-column>
                  <vxe-table-column
                    type="seq"
                    width="3%"
                    title="序号"
                  ></vxe-table-column>
                  <vxe-table-column width="8%" field="" title="流转卡号">
                  </vxe-table-column>
                  <vxe-table-column
                    width="9%"
                    field=""
                    title="订单号"
                    :edit-render="{
                      name: 'input',
                      attrs: { type: 'text' },
                      immediate: true,
                    }"
                  >
                  </vxe-table-column>
                  <vxe-table-column width="5%" field="" title="产品号">
                  </vxe-table-column>
                  <vxe-table-column width="5%" field="" title="产品名称">
                  </vxe-table-column>
                  <vxe-table-column width="3%" field="" title="样式">
                  </vxe-table-column>
                  <vxe-table-column
                    width="3%"
                    field=""
                    title="色号"
                  ></vxe-table-column>
                  <vxe-table-column
                    width="3%"
                    field=""
                    title="颜色"
                  ></vxe-table-column>
                  <vxe-table-column
                    width="5%"
                    field=""
                    title="数量"
                  ></vxe-table-column>
                  <vxe-table-column width="9%" field="操作" title="操作">
                    <template> </template>
                  </vxe-table-column>
                </vxe-table>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col style="display: flex; justify-content: flex-end">
          <el-button type="primary" class="saveBtn iconfont kt-icon-baocun"
            >保存</el-button
          >
          <el-button style="margin-left: 4px" type="primary" class="clearBtn"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addListOne: [],
      cellClass: 'cellClass',
      addRules: {
        Shop: [{ required: true, message: '请选择站点', trigger: 'blur' }],
        PickingCode: [
          { required: true, message: '请输入计划单号', trigger: 'blur' },
        ],
        // country: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        ShipmentDate: [
          { required: true, message: '请选择出货日期', trigger: 'blur' },
        ],
        // product: [{ required: true, message: '请输入账号', trigger: 'blur' }],
      },
      showDetail: false,
      validRules: {
        箱数: [{ required: true, message: '请手动输入箱数' }],
        包数: [{ required: true, message: '请手动输入包数' }],
        备注: [{ required: true, message: '请手动输入备注' }],
      },
      showTable: false,
      shopId: '',
      addListTwo: [],
      DeliveryMethod: [
        { label: '正常到货', value: '0' },
        { label: '扫描到货', value: '1' },
      ],
      footerCellClassName: 'footerCellClassName',
      showDetails: false,
      hearderClass: 'hearderClass',
      addAialogVisible: false,
      addFormParams: {
        // 保存的参数
        Remark: '',
        PickingCode: '',
        Shop: '',
        ShipmentDate: '',
        DeliveryMethod: '0',
      },
      columnIcon: '◇', //列分隔符
    }
  },
  methods: {
    chooseFactory() {
      this.showDetail = true
      this.$nextTick(() => {
        this.$refs.ProcessingPlant.showChooseDelivery = true
      })
    },
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
                sums += Number(data[i]['PlanNumber'])
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    //取消关闭弹框
    closeAddDialog() {
      this.$emit('closeDialog')
    },
    delProduct() {
      if (this.delArr.length !== 0) {
        this.$confirm('此操作将删除选中产品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        })
          .then(() => {
            for (var i = 0; i < this.delArr.length; i++) {
              this.addProduceList.splice(this.delArr[i], 1)
            }
            this.delArr = []
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      } else {
        this.$message({
          type: 'error',
          message: '请选择删除项!',
        })
      }
    },

    addRow(row) {
      this.newItem = {
        P_Status: '0',
        CNumber: '',
        ContainerType: '',
        PlanNumber: '',
        ColorTag: '',
        PickNumber: '',
      }
      if (this.addListOne.length !== 0) {
        var index = this.addListOne.findIndex((item) => {
          return item._XID === row._XID
        })
      } else {
        var index = -1
      }
      // 插入
      if (row) {
        this.addListOne.splice(index + 1, 0, this.newItem)
      } else {
        this.addListOne.push(this.newItem)
      }
    },
    deleteRow(row) {
      this.$confirm('是否删除本行?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          var index = this.addListOne.findIndex((item) => {
            return item._XID === row._XID
          })
          this.addListOne.splice(index, 1)
          if (this.addListOne.length === 0) {
            this.addListOne[0] = {
              P_Status: '0',
              CNumber: '',
              ContainerType: '',
              PlanNumber: '',
              ColorTag: '',
              PickNumber: '',
            }
          }
        })
        .catch(() => {})
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
      this.$set(this.addFormParams, 'ShipmentDate', toMonth)
    },
  },
  computed: {},
  beforeCreate() {},
  created() {
    this.getNowDate()
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  display: block;
  background: rgb(245, 248, 255);
}
.cardMargin {
  margin-top: 0px !important;
}

.mainForm .el-form-item__content {
  line-height: normal;
}
.mainForm .el-form-item__label {
  line-height: 30px;
}
.searchMargin {
  margin-left: 15px;
  margin-bottom: 0;
}
.redClass {
  color: red;
}
>>> .footerCellClassName {
  background: #d1f3ff;
}
.searchBtn {
  width: 70px !important;
  height: 30px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 22px;
}
.delBtn {
  width: 70px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
.delBtn2 {
  width: 70px !important;
  background: #ccc !important;
  border: 1px solid #ccc !important;
}
.exportBtn {
  width: 90px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
.del2Btn {
  width: 70px !important;
  background: #ccc !important;
  border: 1px solid #ccc !important;
}
.choose2Btn {
  background: #ccc !important;
  border: 1px solid #ccc !important;
}
.el-checkbox {
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
    font-weight: 400;
    color: #fcfefe;
    padding: 0;
  }
  .iconBtn2 {
    width: 100px;
    height: 32px;
    background: #ccc;
    border-radius: 2px;
    border: 1px solid #ccc;
    font-size: 14px;
    font-weight: 400;
    color: #fcfefe;
    padding: 0;
  }
}
>>> .el-dialog__footer {
  position: absolute;
  bottom: 10px;
  right: 0;
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
.screen {
  background-color: #000;
  opacity: 0;
  position: absolute;
  float: left;
  z-index: 99999;
  width: 86%;
  height: 100%;
}

.screen2 {
  background-color: #000;
  opacity: 0;
  position: absolute;
  float: left;
  z-index: 99999;
  width: 90%;
  height: 70%;
}
.el-button + .el-button {
  margin-left: 0px;
}
.el-button--primary {
  border-color: #5473e8;
}
.saveBtn1 {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #ccc;
  border: 1px solid #ccc !important;
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
>>> .redClass {
  height: 31px;
  color: red;
}
>>> .cellClass {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 31px;
}
.chooseEnter {
  width: 70px;
  height: 32px;
  background: #5473e8;
  border-radius: 2px;
  line-height: 32px;
  padding: 0;
}
.Bottom-Border input {
  border: none !important;
  border-radius: 0px;
  border-bottom: 1px solid #bbb !important;
}
.None-Border input {
  border: none !important;
  outline: none !important;
}
.unifySize {
  width: 100%;
  height: 30px;
}
.None-Border {
  height: 100%;
}
>>> .unifySize input {
  height: 30px;
}
>>> .unifySizeDate input {
  width: 100%;
  height: 30px;
}
.unifySize .el-input {
  width: 100%;
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
.clearBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #908fa0;
  border: 1px solid #908fa0 !important;
}
.pagination {
  float: right;
  margin-top: 20px;
}
.unifySize .el-input__icon {
  line-height: normal;
}
>>> .el-form-item__label {
  padding: 0;
}
.iconP {
  font-size: 22px;
  color: #5473e8;
  float: right;
  transform: rotate(90deg);
}
.Mask {
  display: block;
  z-index: 999999;
  width: 100%;
  height: 100%;
  background: #808080;
}

>>> .addHeight {
  height: 370px;
}
>>> .blockDate .el-input__inner {
  width: 140px;
}
>>> .jy_wrapper .el-dialog__body {
  border-bottom: none !important;
}
>>> .el-dialog .el-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
.el-card {
  width: 100%;
  padding: 0px;
  margin-top: 11px;
  >>> .el-card__body {
    padding: 10px;
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
>>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
  .el-input__icon {
    line-height: 30px;
  }
}
>>> .chooseHeight {
  height: 650px;
}
>>> .el-form-item {
  margin-bottom: 5px !important;
}
>>> .el-select .el-input__inner {
  cursor: pointer;
  padding-right: 35px;
  height: 30px;
}
>>> .hearderClass {
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  height: 34px;
  color: #333;
  background-color: #d5deff;
}
>>> .cellClass {
  height: 31px;
}
.Numbe {
  width: 100px;
  height: 30px;
  line-height: 30px;
  margin-top: 5px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #f5f7fa;
}
>>> .vxe-header--column .vxe-cell--edit-icon,
.vxe-header--column .vxe-cell-help-icon {
  display: none;
}
>>> .vxe-select--panel {
  z-index: 9997 !important;
}
>>> .kt-icon-saoyisao:before {
  content: '\EB42';
  font-size: 36px;
  color: #000;
}
</style>
