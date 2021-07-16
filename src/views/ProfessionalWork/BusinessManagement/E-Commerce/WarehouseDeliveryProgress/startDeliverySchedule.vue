<template>
  <div>
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
            label="出货柜码："
          >
            <el-input
              @keyup.enter.native="Shipment"
              suffix-icon="iconfont kt-icon-saoyisao"
              v-model="addFormParams.PickingCode"
              class="unifySize"
            ></el-input>
          </el-form-item>
        </el-col>
        <span class="resMes" ref="boxBarCode"></span>
        <el-col :span="24">
          <el-col :span="6">
            <el-form-item label="站点：">
              <div ref="shop"></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="计划单号：">
              <div ref="pikkCode"></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出货日期：">
              <div ref="shipments"></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="计划箱数：">
              <div ref="planBox"></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="柜号：">
              <div ref="cNumber"></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="柜型：">
              <div ref="cType"></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="颜色标：">
              <div ref="corlorTag"></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="已配箱数：">
              <div ref="pickBox" style="color: red"></div>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
    </el-form>

    <div class="line"></div>
    <!-- 表单数据 -->
    <el-form
      ref="addForm"
      :model="addBoxFormParams"
      :rules="addRules2"
      style="font-size：14px"
      label-width="84px"
      @submit.native.prevent
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            prop="PickingCode"
            label-width="100px"
            label="箱体条码："
          >
            <el-input
              id="boxBar"
              @keyup.enter.native="boxBarCode"
              suffix-icon="iconfont kt-icon-saoyisao"
              v-model="addBoxFormParams.PickingCode"
              class="unifySize"
            ></el-input>
          </el-form-item>
        </el-col>
        <span class="resMes" ref="boxBarCodeRes"></span>
        <el-col :span="24">
          <el-col :span="6">
            <el-form-item label="产品号：">
              <div class="conStyle" ref="productNo"></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品名称：">
              <div class="conStyle" ref="chnName"></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="计划数：">
              <div ref="PlanNumber"></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="已配数：">
              <div ref="PickNumber" style="color: red"></div>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col style="height: 505px">
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
            height="495"
            highlight-current-row
            :align="'center'"
            :checkbox-config="{
              highlight: true,
            }"
            :data="addListOne"
          >
            <vxe-table-column type="checkbox" width="5%"></vxe-table-column>
            <vxe-table-column
              type="seq"
              width="5%"
              title="序号"
            ></vxe-table-column>
            <vxe-table-column width="11%" field="LotNo" title="箱体条码">
            </vxe-table-column>
            <vxe-table-column min-width="25%" field="ProductNo" title="产品号">
            </vxe-table-column>
            <vxe-table-column min-width="25%" field="chnName" title="产品名称">
            </vxe-table-column>
            <vxe-table-column width="5%" field="Color" title="颜色">
            </vxe-table-column>
            <vxe-table-column width="6%" field="chnSpec" title="尺寸">
            </vxe-table-column>
            <vxe-table-column
              width="9%"
              field="BoxNum"
              title="包数"
            ></vxe-table-column>
            <vxe-table-column width="9%" field="操作" title="操作">
              <template slot-scope="{ row }">
                <i @click="deleteRow(row)" class="iconC el-icon-delete"></i>
              </template>
            </vxe-table-column>
          </vxe-table>
        </el-col>
      </el-row>
    </el-form>
    <span
      style="float: right; margin-top: 5px"
      slot="footer"
      class="dialog-footer"
    >
      <el-row>
        <el-col>
          <el-button type="primary" @click="closeAddDialog" class="clearBtn"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    selectRow: Object,
  },
  data() {
    return {
      // 打印组件参数开始
      TempType: '0160',
      ID: [],
      Action: 'print',
      FileType: 'html',
      // 打印组件参数结束
      keyCode: '',
      queryCode: '',
      computedHeight: window.innerHeight - 100 + 'px',
      dialogParam: {
        title: '',
        type: '',
        name: '',
        width: '60%',
        isShowDialog: false,
      },
      pID: '',
      isSave: false,
      addBoxFormParams: { PickingCode: '' },
      addListOne: [],
      newItem: {
        P_Status: '0',
        CNumber: '',
        ContainerType: '',
        PlanNumber: '',
        ColorTag: '',
        PickNumber: '',
      },
      containerList: [],
      corlorList: [],
      addProduceList: [
        {
          产品号: '',
          产品名称: '',
          样式: '',
          色号: '',
          颜色: '',
          每包片数: '',
          箱数: '',
          库存: '',
          包数: '',
          备注: '',
          生产中: '',
          未包装: '',
          关联产品: '',
        },
      ],
      r_columns: [
        { type: 'checkbox', width: '40' },
        {
          title: '产品编码',
          field: '产品号',
          width: '165',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '产品名称',
          field: '产品名称',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '80',
          title: '样式',
          field: '样式',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '60',
          title: '色号',
          field: '色号',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '60',
          title: '颜色',
          field: '颜色',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '80',
          title: '每包片数',
          field: '每包片数',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '60',
          title: '箱数',
          field: '箱数',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '60',
          title: '包数',
          field: '包数',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '60',
          title: '备注',
          field: '备注',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '60',
          title: '库存',
          field: '库存',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '70',
          title: '生产中',
          field: '生产中',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '70',
          title: '未包装',
          field: '未包装',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '80',
          title: '关联产品',
          field: '关联产品',
          editRender: {
            immediate: true,
          },
        },
      ],
      delArr: [],
      cellClass: 'cellClass',
      addRules: {
        PickingCode: [
          { required: true, message: '请输入出货柜码', trigger: 'blur' },
        ],
      },
      addRules2: {
        PickingCode: [
          { required: true, message: '请输入箱体条码', trigger: 'blur' },
        ],
      },
      // validRules: {
      //   调整后价格: [
      //     { required: true, message: '调整价格必须填写' },
      //     {
      //       pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
      //       message: '值不能为负数',
      //     },
      //   ],
      // },
      shopId: '',
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
      },
      columnIcon: '◇', //列分隔符
      countryList: [],
      currencyList: [],
      shopList: [],
    }
  },
  methods: {
    //箱体条码扫码
    boxBarCode() {
      this.$api.delivery
        .SaveToLotList({
          lotNo: this.addBoxFormParams.PickingCode,
          containerId: this.conId,
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.gamemuiscs3 = new Audio('/static/music/扫描错误.mp3')
            this.gamemuiscs3.play()
            this.$message.error(res.message)
            this.$refs.boxBarCodeRes.innerHTML = '扫描失败!'
          } else {
            this.gamemuiscs4 = new Audio('/static/music/扫描成功.mp3')
            this.gamemuiscs4.play()
            this.$refs.productNo.innerHTML = res.data[0]['ProductNo']
            this.$refs.chnName.innerHTML = res.data[0]['chnName']
            this.$refs.PlanNumber.innerHTML = res.data[0]['PlanNumber']
            this.$refs.PickNumber.innerHTML = res.data[0]['PickNumber']
            this.$refs.pickBox.innerHTML = res.data[0]['ContainerPickNumber']
            this.addListOne.push(res.data[0])
            this.$refs.boxBarCodeRes.innerHTML = '扫描成功!'
          }
        })
        .catch((err) => {
          console.log(err)
          this.$refs.boxBarCodeRes.innerHTML = '扫描失败!'
        })
        .finally(() => {
          this.addBoxFormParams.PickingCode = ''
        })
    },
    // 出货柜码扫码
    Shipment() {
      this.$api.delivery
        .GetPickingContainer({
          containerId: this.addFormParams.PickingCode,
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.gamemuiscs1 = new Audio('/static/music/扫描错误.mp3')
            this.gamemuiscs1.play()
            this.$refs.boxBarCode.innerHTML = '扫描失败!'
            this.$message.error(res.message)
          } else {
            console.log(5656)
            this.gamemuiscs2 = new Audio('/static/music/扫描成功.mp3')
            this.gamemuiscs2.play()
            this.conId = res.data[0].ContainerId
            this.$refs.shop.innerHTML = res.data[0]['站点']
            this.$refs.pikkCode.innerHTML = res.data[0]['计划单号']
            this.$refs.shipments.innerHTML = res.data[0]['出货日期']
            this.$refs.planBox.innerHTML = res.data[0]['计划箱数']
            this.$refs.cNumber.innerHTML = res.data[0]['柜号']
            this.$refs.cType.innerHTML = res.data[0]['柜型']
            this.$refs.corlorTag.innerHTML = res.data[0]['颜色标']
            this.$refs.pickBox.innerHTML = res.data[0]['已配箱数']
            this.addFormParams.PickingCode = this.conId
            this.$refs.boxBarCode.innerHTML = '扫描成功!'
            this.$nextTick(() => {
              document.getElementById('boxBar').focus()
            })
          }
        })
        .catch((err) => {
          console.log(err)
          //方式2

          this.$refs.boxBarCode.innerHTML = '扫描失败!'
        })
        .finally(() => {})
    },
    footerMethodTop({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          switch (column.property) {
            case 'BoxNum':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i]['BoxNum'])
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
    deleteRow(row) {
      this.$confirm('是否删除本行?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 找货已扫描列表删除该箱与柜子绑定关系
          this.$api.delivery
            .RemoveToLotList({
              lotNo: row.LotNo,
              containerId: row.ContainerId,
            })
            .then((res) => {
              if (res.statusCode !== 200) {
                return this.$message.error(res.message)
              } else {
                var index = this.addListOne.findIndex((item) => {
                  return item._XID === row._XID
                })
                this.addListOne.splice(index, 1)
                this.$refs.pickBox.innerHTML =
                  res.data[0]['ContainerPickNumber']
                this.$message.success('删除成功!')
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getfinishList() {
      if (this.selectRow.finished === '1') {
        this.$api.delivery
          .GetPickingContainer({
            containerId: this.selectRow.ContainerId,
          })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$refs.boxBarCode.innerHTML = '扫描失败!'
              this.$message.error(res.message)
            } else {
              this.conId = res.data[0].ContainerId
              this.$refs.shop.innerHTML = res.data[0]['站点']
              this.$refs.pikkCode.innerHTML = res.data[0]['计划单号']
              this.$refs.shipments.innerHTML = res.data[0]['出货日期']
              this.$refs.planBox.innerHTML = res.data[0]['计划箱数']
              this.$refs.cNumber.innerHTML = res.data[0]['柜号']
              this.$refs.cType.innerHTML = res.data[0]['柜型']
              this.$refs.corlorTag.innerHTML = res.data[0]['颜色标']
              this.$refs.pickBox.innerHTML = res.data[0]['已配箱数']
              this.addFormParams.PickingCode = this.selectRow.ContainerId

              this.$api.delivery
                .GetPickingDetailListById({
                  containerId: this.selectRow.ContainerId,
                })
                .then((res) => {
                  if (res.statusCode !== 200) {
                    this.$message({
                      message: res.message,
                      type: 'error',
                    })
                  } else {
                    this.addListOne = res.data
                  }
                })
                .catch((err) => console.log(err))
                .finally(() => {
                  this.cliclLoading = false
                })
            }
          })
          .catch((err) => {
            console.log(err)
            this.$refs.boxBarCode.innerHTML = '扫描失败!'
          })
          .finally(() => {})
      }
    },
    closeDialog() {
      this.dialogParam.isShowDialog = false
    },
  },
  computed: {
    //计算函数，复杂的计算都应该放在这里，尽量不要直接在模板语法里面计算，在此处计算的值是会动态变的，即计算的数中有一个值变了，最终结果也会跟着变，类似于封装的计算函数
    addNum: function () {
      //addnum可以直接在模板语法里面用，相当于data内的值
      return this.addListOne.length
    },
  },
  beforeCreate() {},
  created() {
    this.getfinishList()
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
.mainForm .marginLeft {
  margin-left: 0px;
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
.marginLeft {
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
.marginLeft {
  margin-left: -62px;
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
  width: 150px;
  height: 30px;
}
>>> .unifySizeDate .el-input__suffix {
  right: -64px;
}
.unifySize .el-input {
  width: 100%;
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
.iconC {
  font-size: 22px;
  color: #5473e8;
}
.iconC2 {
  font-size: 18px !important;
  color: #ccc !important;
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

>>> .IconClose .el-input__prefix {
  display: none;
}
.NullTip {
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 400px;
  transform: translate(-50%, 50%);
}
.blockSpan {
  display: flex;
  height: 32px;
  margin-top: 5px;
  justify-content: start;
  border-radius: 4px;
  border: 1px solid #c7c6de;
  >>> .listDate .el-input .el-input__inner {
    height: 30px !important;
    padding: 0 0 0 5px;
    width: 100% !important;
    border-radius: 4px 0 0 4px;
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

  >>> .blockDate {
    display: flex;
    justify-content: space-between;
  }
  >>> .blockDate .el-input__inner {
    height: 30px;
    width: 140px;
    border: none;
  }
  >>> .blockDate .el-input__inner input {
    width: 130px !important;
  }
  >>> .blockDate .el-input__icon {
    height: 30px;
  }
  >>> .blockDate .el-range-separator {
    height: 30px;
    padding: 0;
  }
}
.resMes {
  color: red;
  line-height: 40px;
  font-size: 20px;
  margin-left: 15px;
}
>>> .kt-icon-saoyisao:before {
  content: '\EB42';
  font-size: 36px;
  color: #000;
}
.iconC {
  font-size: 18px;
  color: #2b55ee;
}
>>> .addheight {
  height: 550px;
}
.conStyle {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  width: 50%;
  .el-input__icon {
    line-height: 30px;
  }
}
>>> .chooseHeight {
  height: 650px;
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
.line {
  width: 100%;
  height: 1px;
  margin-top: 5px;
  margin-bottom: 10px;
  background-color: #c5c5c5;
}
</style>
