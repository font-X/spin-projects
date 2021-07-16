<template>
  <jy-dialog
    v-dialogDrag
    v-if="showSelectDialog"
    :title="dialogTitle"
    append-to-body
    :close-on-click-modal="false"
    class="dialog-component"
    :visible.sync="showSelectDialog"
    width="1400px"
    @close="closeDialog(0)"
  >
    <el-container>
      <el-row style="width: 100%">
        <!-- 输入框 -->
        <el-col>
          <el-row>
            <el-col>
              <el-form
                ref="addForm"
                :model="formInfo"
                style="font-size：14px"
                label-width="104px"
                size="mini"
              >
                <el-row class="rowHeight">
                  <el-col :span="6">
                    <!-- 文本域 -->
                    <el-form-item prop="DeliveryDate" label="开始日期：">
                      <el-date-picker
                        class="sup-mini"
                        v-model="formInfo.beg_date"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item prop="DeliveryDate" label="结束日期：">
                      <el-date-picker
                        class="sup-mini"
                        v-model="formInfo.end_date"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item prop="contractCode" label="货件编号：">
                      <el-input
                        v-model="formInfo.fbashipmentno"
                        placeholder="货件编号"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item prop="shop" label="站点：">
                      <el-select v-model="formInfo.shop" placeholder="站点">
                        <el-option
                          :key="index"
                          v-for="(item, index) in shopList"
                          :label="item.Name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="rowHeight">
                  <el-col :span="6">
                    <el-form-item prop="contractCode" label="产品编号：">
                      <el-input
                        v-model="formInfo.productno"
                        placeholder="产品编号"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item prop="contractCode" label="货件名称：">
                      <el-input
                        v-model="formInfo.fbashipmentname"
                        placeholder="货件名称"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item prop="contractCode" label="颜色：">
                      <el-input
                        v-model="formInfo.color"
                        placeholder="颜色"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item prop="contractCode" label="尺寸：">
                      <el-input
                        v-model="formInfo.chnSpec"
                        placeholder="尺寸"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="配送地址：">
                      <el-input
                        v-model="formInfo.fba_add_code"
                        placeholder="配送地址"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>

            <!-- 按钮区域 -->
            <el-col style="height: 35px" class="secondBtn">
              <el-button
                type="primary"
                class="searchBtn iconBtn"
                size="mini"
                :loading="searchLoading"
                @click="query"
                >查询</el-button
              >
              <el-button
                type="primary"
                class="smBtn2 iconBtn"
                size="mini"
                @click="add"
                >添加数据</el-button
              >
            </el-col>
          </el-row>
        </el-col>

        <!-- 待选择区域 -->
        <el-col class="mainTable">
          <vxe-grid
            border
            resizable
            stripe
            ref="grid"
            width="auto"
            show-footer
            :loading="searchLoading"
            :columns="columns"
            :auto-resize="true"
            show-overflow="title"
            :height="300"
            :header-row-class-name="hearderClass"
            :row-class-name="cellClass"
            @cell-dblclick="showBottomTable"
            @checkbox-all="onAdjustmentCheckboxAllChange"
            @checkbox-change="onAdjustmentCheckboxChange"
            highlight-current-row
            :config="{ render: 'scroll' }"
            :align="'center'"
            :checkbox-config="{ highlight: true, range: true }"
            :data="gridData"
          >
          </vxe-grid>
        </el-col>

        <!-- 已选择区域 -->
        <el-col class="mainTable">
          <vxe-table
            border
            resizable
            stripe
            width="auto"
            ref="selectgrid"
            show-footer
            :footer-method="footerMethod"
            :footer-cell-class-name="footerCellClassName"
            :auto-resize="true"
            show-overflow="title"
            :height="360"
            style="margin-top: 10px"
            :header-row-class-name="hearderClass"
            :row-class-name="cellClass"
            :edit-rules="validRules"
            :mouse-config="{ selected: true }"
            :edit-config="{ trigger: 'click', mode: 'cell' }"
            @cell-dblclick="showBottomTable"
            @checkbox-all="onAdjustmentCheckboxAllChange"
            @checkbox-change="onAdjustmentCheckboxChange"
            highlight-current-row
            :keyboard-config="{
              isArrow: true,
              isDel: true,
              isEnter: true,
              isTab: true,
              isEdit: true,
              editMethod,
            }"
            :config="{ render: 'scroll' }"
            :align="'center'"
            :checkbox-config="{
              highlight: true,
              range: true,
            }"
            :data="selectData"
          >
            <vxe-table-column
              width="120"
              :field="'货件编号'"
              title="货件编号"
            ></vxe-table-column>
            <vxe-table-column
              width="185"
              :field="'sku编号'"
              align="left"
              title="sku编号"
            ></vxe-table-column>
            <vxe-table-column
              align="left"
              :field="'产品名称'"
              title="产品名称"
            ></vxe-table-column>
            <vxe-table-column
              width="70"
              :field="'样式'"
              title="样式"
            ></vxe-table-column>
            <vxe-table-column
              width="60"
              :field="'色号'"
              title="色号"
            ></vxe-table-column>
            <vxe-table-column
              width="60"
              :field="'颜色'"
              title="颜色"
            ></vxe-table-column>
            <vxe-table-column
              width="70"
              :field="'尺寸'"
              title="尺寸"
            ></vxe-table-column>
            <vxe-table-column
              width="80"
              :field="'每包片数'"
              title="每包片数"
            ></vxe-table-column>
            <vxe-table-column
              width="80"
              :field="'可用箱数'"
              title="可用箱数"
            ></vxe-table-column>
            <vxe-table-column
              width="80"
              :field="'可用包数'"
              title="可用包数"
            ></vxe-table-column>
            <vxe-table-column
              :edit-render="{
                name: '$input',
                events: { keyup: quantityChangeEvent },
                props: { type: 'num', digits: 0 },
              }"
              width="110"
              :field="'Packages'"
              title="发货箱数"
            ></vxe-table-column>
            <vxe-table-column
              width="110"
              :field="'RollNum'"
              title="发货数量(包)"
            ></vxe-table-column>
            <vxe-table-column width="80" title="操作">
              <template slot-scope="{ row }">
                <i @click="delProduct(row)" class="iconC el-icon-delete"></i>
              </template>
            </vxe-table-column>
          </vxe-table>
        </el-col>
      </el-row>
    </el-container>

    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <el-button
            type="primary"
            class="saveBtn iconfont kt-icon-baocun"
            size="mini"
            @click="okDialog()"
            >确认</el-button
          >
          <el-button
            type="primary"
            class="clearBtn"
            size="mini"
            @click="closeDialog(0)"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </span>
  </jy-dialog>
</template>
 
<script>
import JyDialog from '@/components/JyDialog'
export default {
  name: 'selectsku',
  components: { JyDialog },
  data() {
    return {
      showSelectDialog: false,
      formInfo: {},
      deliveryModelList: [
        { id: '1', name: '先出仓后建仓' },
        { id: '2', name: '先建仓后出仓' },
      ],
      dialogTitle: '选择货件号',
      shopList: [],
      addRules: {},
      gridData: [],
      footerCellClassName: 'footerCellClassName',
      searchLoading: false,
      selectData: [],
      filterData: [],
      hearderClass: 'hearderClass',
      validRules: {
        Packages: [
          { required: true, message: '箱数必须填写' },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值不能为负数',
          },
        ],
      },
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '120', title: '货件编号', field: '货件编号', align: 'left' },
        { width: '185', title: 'sku编号', field: 'sku编号', align: 'left' },
        { title: '产品名称', field: '产品名称' },
        { width: '60', title: '样式', field: '样式' },
        { width: '50', title: '色号', field: '色号' },
        { width: '50', title: '颜色', field: '颜色' },
        { width: '70', title: '尺寸', field: '尺寸' },
        { width: '80', title: '每包片数', field: '每包片数' },
        { width: '80', title: '可用箱数', field: '可用箱数' },
        { width: '80', title: '拟发箱数', field: '拟发箱数' },
        { width: '80', title: '可用包数', field: '可用包数' },
        { width: '80', title: '拟发包数', field: '拟发包数' },
        { width: '80', title: '配送地址', field: '配送地址' },
      ],
    }
  },
  methods: {
    // 关闭弹框
    closeDialog(flag) {
      this.formInfo = {}
      this.gridData = []
      this.selectData = []
      this.filterData = []
      this.showSelectDialog = false
      this.$emit('closeDialog', flag)
    },
    //保存弹框
    async okDialog() {
      const $table = this.$refs.selectgrid
      const errMap = await $table.validate(true).catch((errMap) => errMap)
      if (errMap) {
        this.$XModal.message({ status: 'error', content: errMap })
      } else {
        let data = []
        data.push(...this.selectData)
        let flag = false
        data.forEach((item) => {
          item.产品号 = item.sku编号
          if (item['Packages'] > item['可用箱数']) {
            flag = true
          }
        })
        if (flag) {
          this.$message.error('发货箱数不可大于可用箱数!')
        } else {
          console.log(data)
          this.$emit('okDialog', data)
          this.closeDialog()
        }
      }
    },
    //查询
    query() {
      this.searchLoading = true
      this.gridData = []
      this.$api.deliveryRequest
        .GetFbaList({ model: { ...this.formInfo } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            //过滤掉已经选择的产品
            let self = this
            res.data = res.data.filter(function (item) {
              let b = true
              self.selectData.forEach(function (sitem) {
                if (
                  item.sku编号 === sitem.sku编号 &&
                  item.货件编号 === sitem.货件编号
                ) {
                  b = false
                  return
                }
              })
              self.filterData.forEach(function (sitem) {
                if (
                  item.sku编号 === sitem.sku编号 &&
                  item.货件编号 === sitem.货件编号
                ) {
                  b = false
                  return
                }
              })
              return b
            })
            this.gridData = res.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.searchLoading = false
        })
    },
    editMethod({ row, column }) {
      const $table = this.$refs.selectgrid
      // 重写默认的覆盖式，改为追加式
      $table.setActiveCell(row, column)
    },
    //添加数据到已选择列表
    add() {
      let self = this
      this.selectData.push(...this.$refs.grid.getCheckboxRecords())
      this.gridData = this.gridData.filter(function (item) {
        let b = true
        self.selectData.forEach(function (sitem) {
          if (
            item.sku编号 === sitem.sku编号 &&
            item.货件编号 === sitem.货件编号
          ) {
            b = false
            return
          }
        })
        return b
      })
      this.$refs.selectgrid.updateData()
      this.$refs.grid.updateData()
    },
    cellClass(row) {
      if (row.row['Packages'] > row.row['可用箱数']) {
        return 'redCless'
      } else {
        return 'cellClass'
      }
    },
    //删除选择产品
    delProduct(row) {
      this.$confirm('此操作将删除选中产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        let self = this
        this.gridData.push(row)
        self.selectData = self.selectData.filter(function (item) {
          if (row.sku编号 === item.sku编号 && row.货件编号 === item.货件编号) {
            return false
          }
          return true
        })
        this.$refs.selectgrid.updateData()
        this.$refs.grid.updateData()
      })
    },
    //修改箱数
    quantityChangeEvent(event, obj) {
      event.row.RollNum = obj.value * event.row.fba每箱包数
      this.$refs.selectgrid.updateData()
    },
    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          }
          switch (column.property) {
            case '可用箱数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].可用箱数)
              }
              return sums
            case '可用包数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].可用包数)
              }
              return sums
            case 'Packages':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                if (data[i].Packages === undefined) {
                  data[i].Packages = ''
                }
                sums += Number(data[i].Packages)
              }
              return sums
            case 'RollNum':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                if (data[i].RollNum === undefined) {
                  data[i].RollNum = ''
                }
                sums += Number(data[i].RollNum)
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
    showBottomTable() {},
    onAdjustmentCheckboxAllChange() {},
    onAdjustmentCheckboxChange() {},
  },
  created() {
    this.addProductState()
  },
}
</script>
 
<style scoped lang="scss">
.el-select {
  width: 100%;
}
>>> .searchBtn {
  width: 60px !important;
  height: 30px;
  line-height: 10px;
  color: #fff;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
>>> .el-button + .el-button {
  margin-left: 0px;
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
.rowHeight {
  .el-col {
    height: 35px;
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
>>> .cellClass {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 30px;
}
>>> .redCless {
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
.clearBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #908fa0;
  border: 1px solid #908fa0 !important;
}
>>> .vxe-table--render-default.size--mini {
  user-select: text;
}
>>> .footerCellClassName {
  background: #d1f3ff;
  height: 30px;
}
.iconC {
  font-size: 22px;
  color: #5473e8;
}
</style>
