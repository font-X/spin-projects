<template>
  <jy-dialog
    v-dialogDrag
    :title="dialogTitle"
    append-to-body
    :close-on-click-modal="false"
    class="dialog-component"
    :visible.sync="showDialog"
    width="90%"
    height="90%"
    @close="closeDialog(0)"
    @open="openDialog()"
  >
    <el-container v-loading="loading">
      <el-tabs style="width: 100%" v-model="showtabs">
        <el-tab-pane label="SKU清单" name="sku">
          <el-row id="queryRow">
            <el-form
              ref="mainForm"
              :model="model"
              style="font-size: 14px"
              label-width="114px"
              size="mini"
            >
              <!-- 查询条件区域 -->
              <el-row class="rowHeight">
                <el-col :span="8">
                  <el-form-item label="申请单SKU数:">
                    <el-input disabled v-model="model.申请单sku数"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请单箱数:">
                    <el-input disabled v-model="model.申请单箱数"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请单数量:">
                    <el-input disabled v-model="model.申请单数量"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出库SKU数:">
                    <el-input disabled v-model="model.出单sku数"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出库箱数">
                    <el-input disabled v-model="model.出库单箱数"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出库数量">
                    <el-input disabled v-model="model.出库单数量"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="fba-SKU数:">
                    <el-input disabled v-model="model.fbasku数"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="fba箱数:">
                    <el-input disabled v-model="model.fba箱数"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="fba数量:">
                    <el-input disabled v-model="model.fba数量"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
          <!-- 按钮区域 -->
          <el-row id="btnRow"> </el-row>
          <!-- 主表区域 -->
          <el-row>
            <vxe-table
              border
              resizable
              stripe
              width="auto"
              height="300"
              show-footer
              :auto-resize="true"
              show-overflow="title"
              highlight-hover-row
              :header-row-class-name="hearderClass"
              :row-class-name="cellClass"
              :footer-method="footerMethod"
              :footer-cell-class-name="footerCellClassName"
              :config="{ render: 'scroll' }"
              :align="'center'"
              :row-style="rowstyle"
              :radio-config="{
                highlight: true,
                trigger: 'row',
              }"
              ref="grid"
              :data="gridData"
              class="vxe-grid mytable-scrollbar"
              @cell-click="cellclick"
            >
              <vxe-table-column
                width="60"
                type="seq"
                title="序号"
              ></vxe-table-column>
              <vxe-table-column
                align="left"
                title="SKU"
                min-width="175"
                field="产品编码"
              ></vxe-table-column>
              <vxe-table-column
                align="left"
                min-width="175"
                title="产品名称"
                field="产品名称"
              ></vxe-table-column>
              <vxe-table-column
                width="50"
                title="样式"
                field="样式"
              ></vxe-table-column>
              <vxe-table-column
                width="50"
                title="色号"
                field="色号"
              ></vxe-table-column>
              <vxe-table-column
                width="60"
                title="颜色"
                field="颜色"
              ></vxe-table-column>
              <vxe-table-column
                width="80"
                title="尺寸"
                field="尺寸"
              ></vxe-table-column>
              <vxe-table-column
                width="50"
                title="尺寸单位"
                field="尺寸单位"
              ></vxe-table-column>
              <vxe-table-column
                width="50"
                title="每包片数"
                field="每包片数"
              ></vxe-table-column>
              <vxe-table-column
                width="130"
                title="货件编号"
                field="货件编号"
              ></vxe-table-column>
              <vxe-table-colgroup title="申请单">
                <vxe-table-column
                  width="60"
                  title="箱数"
                  field="申请单箱数"
                ></vxe-table-column>
                <vxe-table-column
                  width="60"
                  title="数量"
                  field="申请单数量"
                ></vxe-table-column>
              </vxe-table-colgroup>
              <vxe-table-colgroup title="出库">
                <vxe-table-column
                  width="60"
                  title="箱数"
                  field="出库箱数"
                ></vxe-table-column>
                <vxe-table-column
                  width="60"
                  title="数量"
                  field="出库数量"
                ></vxe-table-column>
              </vxe-table-colgroup>
              <vxe-table-colgroup title="FBA">
                <vxe-table-column
                  width="60"
                  title="箱数"
                  field="fba箱数"
                ></vxe-table-column>
                <vxe-table-column
                  width="60"
                  title="数量"
                  field="fba数量"
                ></vxe-table-column>
                <vxe-table-column
                  width="170"
                  title="起始条码"
                  field="fba起始条码"
                ></vxe-table-column>
                <vxe-table-column
                  width="170"
                  title="结束条码"
                  field="fba结束条码"
                ></vxe-table-column>
              </vxe-table-colgroup>
            </vxe-table>
          </el-row>
          <el-row>
            <vxe-table
              border
              resizable
              stripe
              :header-row-class-name="hearderClass"
              :row-class-name="cellClass"
              width="auto"
              height="300"
              show-footer
              show-overflow="title"
              v-loading="detialloading"
              :auto-resize="true"
              highlight-hover-row
              :footer-method="footerMethod"
              :config="{ render: 'scroll' }"
              :align="'center'"
              :checkbox-config="{
                highlight: true,
                range: true,
                trigger: 'row',
              }"
              ref="gridDetial"
              :data="gridDetailShowData"
              class="vxe-grid mytable-scrollbar"
            >
              <vxe-table-column
                width="60"
                type="seq"
                title="序号"
              ></vxe-table-column>
              <vxe-table-column
                title="货件号"
                field="货件号"
              ></vxe-table-column>
              <vxe-table-column
                width="400"
                title="出箱码"
                field="出库箱码"
              ></vxe-table-column>
              <vxe-table-column
                width="200"
                title="出库数量"
                field="出库数量"
              ></vxe-table-column>
              <vxe-table-column
                width="400"
                title="fba条码"
                field="fba条码"
              ></vxe-table-column>
              <vxe-table-column
                width="200"
                title="fba数量"
                field="fba数量"
              ></vxe-table-column>
              <vxe-table-column width="130" field="操作" title="操作">
                <template slot-scope="{ row }">
                  <button class="CloseIcon" @click="iconOpen(row)">修改</button>
                  <button class="SaveIcon">删除</button>
                </template>
              </vxe-table-column>
            </vxe-table>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="条码清单" name="tm">
          <!-- 查询条件区域 -->
          <el-row id="queryRow">
            <el-form
              ref="mainForm"
              :model="querymode"
              style="font-size: 14px"
              label-width="104px"
              size="mini"
            >
              <el-row class="rowHeight">
                <el-col :span="6">
                  <el-form-item label="搜索字段:">
                    <el-select
                      @change="cardquery()"
                      v-model="querymode.filed"
                      placeholder="搜索字段"
                    >
                      <el-option
                        :key="index"
                        v-for="(item, index) in filedList"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="搜索内容:">
                    <el-input
                      @keyup.enter.native="cardquery()"
                      v-model="querymode.value"
                      placeholder="搜索内容"
                    ></el-input>
                  </el-form-item>
                </el-col>
                  <el-button
                    type="warning"
                    size="mini"
                    class="searchBtn"
                    icon=" iconfont kt-icon-sousuo_o"
                    @click="cardquery()"
                    >查询</el-button
                  >
                  <el-button
                    type="warning"
                    size="mini"
                    class="searchBtn"
                    icon="iconfont kt-icon-jiazai_shuaxin"
                    @click="refresh()"
                    >刷新</el-button
                  >
              </el-row>
            </el-form>
          </el-row>

          <el-row>
            <vxe-table
              border
              resizable
              stripe
              width="auto"
              height="650"
              show-footer
              :auto-resize="true"
              highlight-hover-row
              show-overflow="title"
              :header-row-class-name="hearderClass"
              :row-style="printNum"
              :footer-method="footerMethod"
              :config="{ render: 'scroll' }"
              :align="'center'"
              :checkbox-config="{
                highlight: true,
                range: true,
                trigger: 'row',
              }"
              ref="gridCard"
              :data="gridCardShowData"
              class="vxe-grid mytable-scrollbar"
            >
              <vxe-table-column
                width="60"
                type="seq"
                title="序号"
              ></vxe-table-column>
              <vxe-table-column
                width="205"
                title="SKU"
                sortable
                field="产品号"
              ></vxe-table-column>
              <vxe-table-column
                min-width="150"
                title="产品名称"
                field="产品名称"
              ></vxe-table-column>
              <vxe-table-column
                width="60"
                title="样式"
                field="样式"
              ></vxe-table-column>
              <vxe-table-column
                width="60"
                title="色号"
                field="色号"
              ></vxe-table-column>
              <vxe-table-column
                width="60"
                title="颜色"
                field="颜色"
              ></vxe-table-column>
              <vxe-table-column
                width="70"
                title="尺寸"
                field="尺寸"
              ></vxe-table-column>
              <vxe-table-column
                width="80"
                title="尺寸单位"
                field="尺寸单位"
              ></vxe-table-column>
              <vxe-table-column
                width="80"
                title="每包片数"
                field="每包片数"
              ></vxe-table-column>
              <vxe-table-column
                width="120"
                sortable
                title="货件号"
                field="货件号"
              ></vxe-table-column>
              <vxe-table-column
                width="115"
                sortable
                title="箱条码"
                field="出库箱码"
              ></vxe-table-column>
              <vxe-table-column
                width="80"
                title="出库数量"
                field="出库数量"
              ></vxe-table-column>
              <vxe-table-column
                width="155"
                sortable
                title="fba条码"
                field="fba条码"
              ></vxe-table-column>
              <vxe-table-column
                width="80"
                title="fba数量"
                field="fba数量"
              ></vxe-table-column>
              <vxe-table-column
                width="70"
                sortable
                title="次数"
                field="次数"
              ></vxe-table-column>
              <vxe-table-column
                width="80"
                title="打印人"
                field="打印人"
              ></vxe-table-column>
              <vxe-table-column
                width="150"
                sortable
                title="打印时间"
                field="打印时间"
              ></vxe-table-column>
            </vxe-table>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-container>
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <el-button
            type="primary"
            class="chooseEnter"
            size="mini"
            @click="fbaallcheck('1')"
            >发货完成</el-button
          >
          <el-button
            class="chooseEnter"
            type="primary"
            size="mini"
            @click="fbaallcheck('0')"
            >取消发货完成</el-button
          >
          <el-button
            class="chooseEnter"
            type="primary"
            size="mini"
            @click="fbauncheck()"
            >取消复核</el-button
          >
          <el-button
            class="chooseEnter"
            type="primary"
            size="mini"
            @click="fbacheck()"
            >复核通过</el-button
          >
          <el-button
            class="chooseEnter"
            type="primary"
            size="mini"
            @click="printing()"
            >导出明细表</el-button
          >
        </el-col>
      </el-row>
    </span>
  </jy-dialog>
</template>
<script>
import JyDialog from '@/components/JyDialog'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  components: { JyDialog },
  data() {
    return {
      gridHeight: 600,
      dialogTitle: 'Fba复核',
      showDialog: false,
      loading: false,
      detialloading: false,
      showtabs: 'sku',
      fbaid: '',
      model: {
        fbasku: '',
      },
      querymode: {},
      gridData: [],
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      gridDetailData: [],
      gridDetailShowData: [],
      gridCardData: [],
      gridCardShowData: [],
      deliverID: '',
      filedList: [
        { id: '产品号', name: 'sku' },
        { id: '产品名称', name: '产品名称' },
        { id: '样式', name: '样式' },
        { id: '色号', name: '色号' },
        { id: '颜色', name: '颜色' },
        { id: '尺寸', name: '尺寸' },
        { id: '货件号', name: '货件号' },
        { id: '出库箱码', name: '箱条码' },
        { id: 'fba条码', name: 'fba条码' },
        { id: '次数', name: '次数' },
        { id: '打印人', name: '打印人' },
        { id: '打印时间', name: '打印时间' },
      ],
    }
  },
  methods: {
    closeDialog(flag) {
      this.$refs.gridCard.clearSort()
      this.showtabs = 'sku'
      this.model = {}
      this.gridData = []
      this.gridDetailData = []
      this.gridDetailShowData = []
      this.gridCardData = []
      this.gridCardShowData = []
    },
    openDialog() {
      this.query()
    },
    footerCellClassName(row) {
      if (
        row['items']['10'] === row['items']['12'] &&
        row['items']['10'] === row['items']['14'] &&
        row['items']['12'] === row['items']['14']
      ) {
        return 'nored'
      } else {
        return 'red'
      }
    },
    printing() {
      const ws = XLSX.utils.json_to_sheet(this.gridData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
      XLSX.writeFile(wb, this.deliverID + '.xls', {
        bookType: 'xls',
        bookSST: false,
        type: 'array',
      })
    },
    //查询
    query() {
      this.$nextTick(() => {
        this.loading = true
        this.$api.deliveryRequest.fbaUpd({ Id: this.fbaid }).then(() => {
          this.$api.deliveryRequest
            .getFbalotEntity({ Id: this.fbaid })
            .then((res) => {
              this.loading = false
              if (res.statusCode != 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.model = res.data.entity[0]
                this.model.fbasku数 = this.model['fba sku数']
                this.gridData = res.data.list
              }
            })
            .catch((err) => (this.loading = false))

          this.$api.deliveryRequest
            .getBarCodeList({ Id: this.fbaid })
            .then((res) => {
              if (res.statusCode != 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.gridCardShowData = res.data
                this.gridCardData = res.data
              }
            })
        })
      })
    },
    refresh() {
      this.$refs.gridCard.clearSort()
      this.query()
    },
    printNum(row) {
      if (row.row.rowcolor === '') {
        row.row.rowcolor = '#333'
      }
      return 'color:' + row.row.rowcolor + ';height:30px'
    },
    rowstyle(data) {
      if (!!data.row.ColorColumn) {
        return 'color:' + data.row.ColorColumn
      }
    },
    //点击主表显示明细表数据
    cellclick(data) {
      var row = data.row
      this.detialloading = true
      this.$api.deliveryRequest
        .getFbalotDetailList({
          Id: this.fbaid,
          FbaId: row.fbaid,
          sku: row.产品编码,
        })
        .then((res) => {
          this.detialloading = false
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.gridDetailShowData = res.data
          }
        })
        .catch((err) => (this.detialloading = false))
    },
    //复核
    fbacheck() {
      this.loading = true
      this.$api.deliveryRequest
        .fbaCheck({ Id: this.fbaid })
        .then((res) => {
          this.loading = false
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              message: '复核成功',
              type: 'success',
            })
          }
        })
        .catch((err) => (this.loading = false))
    },
    //取消复核
    fbauncheck() {
      this.loading = true
      this.$api.deliveryRequest
        .fbaUnCheck({ Id: this.fbaid })
        .then((res) => {
          this.loading = false
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              message: '取消复核成功',
              type: 'success',
            })
          }
        })
        .catch((err) => (this.loading = false))
    },
    fbaallcheck(ischeck) {
      this.loading = true
      this.$api.deliveryRequest
        .fbaAllCheck({ Id: this.fbaid, IsCheck: ischeck })
        .then((res) => {
          this.loading = false
          if (res.statusCode != 200) {
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
    },
    //码单前台查询
    cardquery() {
      if (!!this.querymode.filed && !!this.querymode.value) {
        this.gridCardShowData = []
        this.gridCardData.forEach((item) => {
          if (
            (item[this.querymode.filed] + '')
              .toUpperCase()
              .indexOf(this.querymode.value.toUpperCase()) > -1
          ) {
            this.gridCardShowData.push(item)
          }
        })
      } else {
        this.gridCardShowData = this.gridCardData
      }
    },
    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          }
          switch (column.property) {
            case '申请单箱数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].申请单箱数
              }
              return sums
            case '申请单数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].申请单数量
              }
              return sums
            case '出库箱数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].出库箱数
              }
              return sums
            case '出库数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].出库数量
              }
              return sums
            case 'fba箱数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].fba箱数
              }
              return sums
            case 'fba数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].fba数量
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
  },
  created() {},
}
</script>
<style lang="scss" scoped>
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
.formbtn .el-button {
  float: right;
}
.el-pagination {
  float: right;
  padding-top: 10px;
  padding-right: 20px;
}
>>> .jy-dialog .jy-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
.rowHeight {
  .el-col {
    height: 35px;
  }
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
.SaveIcon {
  width: 40px;
  line-height: normal;
  background: #ff9b22;
  border: 1px solid #ff9b22;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
}
>>> .cellClass {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 30px;
}
>>> .hearderClass {
  text-align: center;
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  height: 34px;
  color: #333;
  background-color: #d5deff;
}
.searchBtn {
  width: 70px !important;
  height: 30px !important;
  line-height: 10px;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 22px;
}
>>> .red {
  color: red;
  height: 30px;
}
>>> .nored {
  height: 30px;
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
>>> .chooseEnter {
  width: 100px;
  height: 32px;
  background: #5473e8;
  border-radius: 2px;
  line-height: 32px;
  padding: 0;
}
>>> .el-button + .el-button {
  margin-left: 0px;
}
>>> .vxe-table--render-default.size--mini {
  user-select: text;
}
>>> .el-input.is-disabled .el-input__inner {
  color: #000;
  font-weight: 700;
  font-size: 16px;
}
</style>