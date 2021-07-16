<template>
  <div>
    <!-- 表单数据 -->
    <el-form
      ref="addForm"
      :model="addFormParams"
      :rules="addRules"
      style="font-size：14px"
      label-width="84px"
    >
      <el-row>
        <el-col
          style="display: flex; justify-content: flex-start; height: 55px"
        >
          <el-form-item label-width="100px" label="生产单号：">
            <el-input
              clearable
              v-model="addFormParams.PlanNo"
              class="unifySize"
            ></el-input>
          </el-form-item>
          <el-form-item label-width="100px" label="加工工厂：">
            <el-input
              clearable
              style="margin-top: 5px"
              v-model="addFormParams.Factory"
              class="unifySize"
            >
              <el-button
                slot="append"
                @click="chooseFactory"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="Deliver" label-width="110px" label="交货日期：">
            <el-date-picker
              class="unifySizeDate"
              v-model="addFormParams.Deliver"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col style="height: 54px">
          <!-- 文本域 -->
          <el-form-item label-width="100px" label="生产备注：">
            <el-input
              clearable
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              v-model="addFormParams.bakField1"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col style="height: 640px">
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
            width="auto"
            height="620"
            highlight-current-row
            :edit-config="{ trigger: 'click', mode: 'cell' }"
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
            <vxe-table-column
              width="8%"
              field="saleOrder"
              title="电商订单号"
              :edit-render="{
                name: 'input',
                attrs: { type: 'text' },
                immediate: true,
              }"
            >
              <template v-slot:edit="{ row }">
                <vxe-input v-model="row.saleOrder"></vxe-input>
              </template>
              <template slot-scope="{ row }">
                <span>{{ row.saleOrder }}</span>
                <i
                  @click="chooseOrder(row)"
                  class="iconP iconfont kt-icon-daoru"
                ></i>
              </template>
            </vxe-table-column>
            <vxe-table-column
              width="9%"
              field="产品号"
              title="产品号"
              :edit-render="{
                name: 'input',
                attrs: { type: 'text' },
                immediate: true,
              }"
            >
              <template v-slot:edit="{ row }">
                <vxe-input v-model="row.产品号"></vxe-input>
              </template>
              <template slot-scope="{ row }">
                <span>{{ row.产品号 }}</span>
                <i
                  @click="chooseProduct(row)"
                  class="iconP iconfont kt-icon-daoru"
                ></i>
              </template>
            </vxe-table-column>
            <vxe-table-column
              width="9%"
              field="生产产品号"
              title="生产产品号"
              :edit-render="{
                name: 'input',
                attrs: { type: 'text' },
                immediate: true,
              }"
            >
            </vxe-table-column>
            <vxe-table-column
              width="9%"
              field="生产产品名称"
              title="生产产品名称"
            >
            </vxe-table-column>
            <vxe-table-column width="3%" field="样式" title="样式">
            </vxe-table-column>
            <vxe-table-column width="3%" field="色号" title="色号">
            </vxe-table-column>
            <vxe-table-column
              width="3%"
              field="颜色"
              title="颜色"
            ></vxe-table-column>
            <vxe-table-column
              width="3%"
              field="尺寸"
              title="尺寸"
            ></vxe-table-column>
            <vxe-table-column
              width="5%"
              field="尺寸单位"
              title="尺寸单位"
            ></vxe-table-column>
            <vxe-table-column
              :edit-render="{
                name: 'input',
                attrs: { type: 'text' },
                autoselect: true,
              }"
              width="3%"
              field="单价"
              title="单价"
            >
              <template v-slot:edit="{ row }">
                <vxe-input
                  type="number"
                  :min="0"
                  v-model="row.单价"
                ></vxe-input>
              </template>
            </vxe-table-column>
            <vxe-table-column
              :edit-render="{
                name: 'input',
                attrs: { type: 'text' },
                autoselect: true,
              }"
              width="3%"
              field="数量"
              title="数量"
            >
              <template v-slot:edit="{ row }">
                <vxe-input
                  type="integer"
                  @change="changNum(row)"
                  :min="0"
                  v-model="row.数量"
                ></vxe-input>
              </template>
            </vxe-table-column>
            <vxe-table-column
              width="3%"
              field="单位"
              title="单位"
            ></vxe-table-column>
            <vxe-table-column
              width="3%"
              field="方案"
              title="方案"
              :edit-render="{
                name: 'ElSelect',
                options: PlanList,
                optionProps: { value: 'value', label: 'label' },
                autoselect: true,
              }"
            >
              <template v-slot:edit="{ row }">
                <el-select @change="methodsChange(row)" v-model="row.方案">
                  <el-option
                    :key="index"
                    v-for="(item, index) in PlanList"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select> </template
            ></vxe-table-column>
            <vxe-table-column
              :edit-render="{
                name: 'input',
                attrs: { type: 'text' },
                autoselect: true,
              }"
              width="6%"
              field="每片用料"
              title="每片用料(米)"
            >
              <template v-slot:edit="{ row }">
                <vxe-input
                  @change="changNum(row)"
                  type="number"
                  :min="0"
                  v-model="row.每片用料"
                ></vxe-input>
              </template>
            </vxe-table-column>
            <vxe-table-column
              width="5%"
              field="原估计米数"
              title="原估计米数"
            ></vxe-table-column>
            <vxe-table-column
              width="5%"
              field="估计米数"
              title="估计米数"
            ></vxe-table-column>
            <vxe-table-column
              width="4%"
              :edit-render="{
                name: 'input',
                attrs: { type: 'text' },
                autoselect: true,
              }"
              field="米每匹"
              title="米每匹"
            >
              <template v-slot:edit="{ row }">
                <vxe-input
                  type="number"
                  :min="0"
                  @change="changMinter(row)"
                  v-model="row.米每匹"
                ></vxe-input>
              </template>
            </vxe-table-column>
            <vxe-table-column
              width="3%"
              field="匹数"
              title="匹数"
            ></vxe-table-column>
            <vxe-table-column
              width="4%"
              :edit-render="{
                name: 'input',
                attrs: { type: 'text' },
                autoselect: true,
              }"
              field="备注"
              title="备注"
            >
              <template v-slot:edit="{ row }">
                <vxe-input type="text" v-model="row.备注"></vxe-input>
              </template>
            </vxe-table-column>
            <vxe-table-column width="3%" field="排序" title="排序">
              <template
                :edit-render="{
                  name: 'input',
                  attrs: { type: 'text' },
                  autoselect: true,
                  immediate: true,
                }"
                v-slot:edit="{ row }"
              >
                <vxe-input
                  :min="0"
                  type="integer"
                  v-model="row.排序"
                ></vxe-input>
              </template>
            </vxe-table-column>
            <vxe-table-column
              width="4%"
              field="到货数"
              title="到货数"
            ></vxe-table-column>
            <vxe-table-column
              width="3%"
              field="关闭"
              title="关闭"
            ></vxe-table-column>
            <vxe-table-column width="11%" field="操作" title="操作">
              <template slot-scope="{ row }">
                <el-button class="CloseIcon" @click="detail(row)">
                  明细
                </el-button>
                <el-button class="CloseIcon" @click="addRow(row)">
                  添加行
                </el-button>
                <el-button class="SaveIcon" @click="deleteRow(row)">
                  删除
                </el-button>
                <el-button class="CloseIcon" @click="close(row)">
                  关闭
                </el-button>
              </template>
            </vxe-table-column>
          </vxe-table>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col style="display: flex; justify-content: flex-end">
          <el-button
            type="primary"
            @click="saveBtn"
            class="saveBtn2 iconfont kt-icon-baocun"
            >保存</el-button
          >
          <el-button
            @click="cancle"
            style="margin-left: 4px"
            type="primary"
            class="clearBtn"
            >取消</el-button
          >
          <el-button style="margin-left: 4px" type="primary" class="saveBtn"
            >面料详情</el-button
          >
          <el-button
            style="margin-left: 4px; margin-right: 5px"
            type="primary"
            class="printBtn"
            >领料单打印</el-button
          >
        </el-col>
      </el-row>
    </span>
    <!-- <processing-plant
      ref="ProcessingPlant"
      v-if="showDetail"
    ></processing-plant> -->
    <jy-dialog
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
          height: '100%',
          position: 'relative',
        }"
      >
        <main-content
          @modifyTextOpen="modifyTextOpen"
          :activeNav="this.dialogParam.activeNav"
        ></main-content>
      </div>
    </jy-dialog>
  </div>
</template>

<script>
import ProcessingPlant from './ProcessingPlant'
import JyDialog from '@/components/JyDialog'
import MainContent from '@/views/layout/ContentWrapper/MainContent'
export default {
  components: {
    JyDialog,
    ProcessingPlant,
    MainContent,
  },
  data() {
    return {
      addListOne: [{ 米每匹: '60', 方案: 'A', 排序: 1, 单位: '片', 关闭: '' }],
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
      FactoryID: '',
      PlanList: [
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' },
        { value: 'D', label: 'D' },
        { value: 'E', label: 'E' },
      ],
      shopId: '',
      chooseType: '',
      footerCellClassName: 'footerCellClassName',
      showDetails: false,
      hearderClass: 'hearderClass',
      addAialogVisible: false,
      addFormParams: {
        PlanNo: '', //生产单号
        Deliver: '', //交货日期
        Factory: '', //工厂
        bakField1: '', //备注
        StrList: '', //列表
        Method: '',
        strMessage: '',
      },
      dialogParam: {
        title: '',
        type: '',
        name: '',
        width: '70%',
        isShowDialog: false,
        activeNav: {
          MenuCode: 'EasyLayouts',
          MenuName: '添加组件设计',
          LinkUrl: 'Basic/PageDisplay?fmId=3e302bc321c4eb11811f39fce23e769a',
        },
      },
      chooseOrderRow: {},
      selectRowId: '',
      columnIcon: '◇', //列分隔符
    }
  },
  methods: {
    // 保存按钮
    saveBtn() {
      this.addFormParams.StrList = ''
      this.addFormParams.Factory = this.FactoryID
      let Str = ''
      this.addListOne.forEach((item, index) => {
        Str +=
          index +
          1 +
          '◇' +
          item.saleOrderID +
          '◇' +
          item.产品号 +
          '◇' +
          item.生产产品号 +
          '◇' +
          item.产品名称 +
          '◇' +
          item.样式 +
          '◇' +
          item.色号 +
          '◇' +
          item.颜色 +
          '◇' +
          item.尺寸 +
          '◇' +
          item.尺寸单位 +
          '◇' +
          item.单价 +
          '◇' +
          item.数量 +
          '◇' +
          item.单位 +
          '◇' +
          item.每片用料 +
          '◇' +
          item.估计米数 +
          '◇' +
          item.米每匹 +
          '◇' +
          item.匹数 +
          '◇' +
          item.备注 +
          '◇' +
          item.排序 +
          '◇' +
          item.关闭 +
          '◇' +
          '' +
          '◇' +
          item.方案 +
          '◆'
      })
      this.addFormParams.StrList = Str
      this.addFormParams.Method = 'Add'
      this.$api.publicApi
        .GetProcedureDataSet({
          code: 'Rg_PlanAdd',
          pars: {
            ...this.addFormParams,
          },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            if (res.data.length === 0) {
              row.每片用料 = 0
            } else {
              row.每片用料 = res.data[0].Quantity
            }
            this.changNum(row)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 行内关闭按钮
    close(row) {
      this.$confirm('确认关闭吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          if (row['关闭'] === undefined || row['关闭'] === '') {
            this.$set(row, '关闭', '是')
          } else {
            this.$set(row, '关闭', '')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    changMinter(row) {
      if (row['估计米数'] === '' || row['估计米数'] === undefined) {
        row['估计米数'] = 0
      }
      if (row['米每匹'] === '' || row['米每匹'] === undefined) {
        row['米每匹'] = 0
      }
      row['匹数'] = Math.round(Number(row['估计米数'] / row['米每匹']))
    },
    changNum(row) {
      if (row['数量'] === '' || row['数量'] === undefined) {
        row['数量'] = 0
      }
      if (row['每片用料'] === '' || row['每片用料'] === undefined) {
        row['每片用料'] = 0
      }

      // if()
      row['原估计米数'] = Number(row['数量'] * row['每片用料'])
      row['估计米数'] = Math.round(Number(row['数量'] * row['每片用料']))
      this.changMinter(row)
    },
    // 根据生产产品名称和方案获取用料数
    methodsChange(row) {
      this.$api.publicApi
        .GetProcedureDataSet({
          code: 'GetMaterialsBySproduct',
          pars: {
            productNo: row['生产产品号'],
            formula: row['方案'],
          },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            if (res.data.length === 0) {
              row.每片用料 = 0
            } else {
              row.每片用料 = res.data[0].Quantity
            }
            this.changNum(row)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 按钮明细页面
    detail(row) {
      this.chooseType = 'detail'
      this.dialogParam = {
        title: '托盘布匹选择增加',
        type: '',
        name: '',
        width: '70%',
        isShowDialog: true,
        activeNav: {
          MenuCode: '',
          MenuName: '',
          LinkUrl: 'Basic/PageDisplay?fmId=26ebe36804c8eb11811f39fcfbb4fbf8',
        },
      }
    },
    // 选择电商订单
    chooseOrder(row) {
      this.selectRowId = row['_XID']
      this.chooseType = 'chooseOrder'
      this.dialogParam = {
        title: '选择电商订单',
        type: '',
        name: '',
        width: '70%',
        isShowDialog: true,
        activeNav: {
          MenuCode: '',
          MenuName: '',
          LinkUrl: 'Basic/PageDisplay?fmId=5edba77e31c4eb11811f39fce2a5b498',
        },
      }
    },
    cancle() {
      this.$emit('closeDialog')
    },
    // 通过订单号选择产品
    chooseProduct(row) {
      this.selectRowId = row['_XID']
      this.chooseType = 'chooseProduct'
      this.dialogParam = {
        title: '选择产品信息',
        type: '',
        name: '',
        width: '70%',
        isShowDialog: true,
        activeNav: {
          MenuCode: '',
          MenuName: '',
          LinkUrl:
            'Basic/PageDisplay?fmId=3e302bc321c4eb11811f39fce23e769a&PlanNo=' +
            this.chooseOrderRow.Column1.split('◇')[0],
        },
      }
    },
    // 加工工厂
    chooseFactory() {
      this.chooseType = 'chooseFactory'
      this.dialogParam = {
        title: '选择工厂',
        type: '',
        name: '',
        width: '70%',
        isShowDialog: true,
        activeNav: {
          MenuCode: '',
          MenuName: '',
          LinkUrl: 'Basic/PageDisplay?fmId=6e30664177c2eb11811f39fcd7534ebb',
        },
      }
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
    // 添加行
    addRow(row) {
      this.newItem = {
        方案: 'A',
        米每匹: '60',
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
    // 删除当前行
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
            // this.addListOne[0] = {
            //   P_Status: '0',
            //   CNumber: '',
            //   ContainerType: '',
            //   PlanNumber: '',
            //   ColorTag: '',
            //   PickNumber: '',
            // }
          }
        })
        .catch(() => {})
    },
    modifyTextOpen(data) {
      switch (this.chooseType) {
        case 'chooseFactory':
          this.addFormParams.Factory = data.data['名称']
          this.FactoryID = data.data['ID']
          break
        case 'chooseOrder':
          this.chooseOrderRow = data.data
          // this.selectRow.saleOrder = data.data['订单号']
          this.addListOne.forEach((item) => {
            if (item['_XID'] === this.selectRowId) {
              item.saleOrder = data.data['订单号'].trim()
              item.saleOrderID = data.data['Column1'].split('◇')[0]
            }
          })

          break
        case 'chooseProduct':
          if (data.data.length === 1) {
            this.addListOne.forEach((item) => {
              if (item['_XID'] === this.selectRowId) {
                item.产品号 = data.data[0]['产品号']
                item.生产产品号 = data.data[0]['生产产品号']
                item.生产产品名称 = data.data[0]['生产产品名称']
                item.尺寸单位 = data.data[0]['尺寸单位']
                item.样式 = data.data[0]['样式']
                item.颜色 = data.data[0]['颜色']
                item.产品名称 = data.data[0]['产品名称']
                item.色号 = data.data[0]['色号']
                item.尺寸 = data.data[0]['尺寸']
                item.数量 = data.data[0]['数量']
                // 循环每条数据调出每片用料
                this.$api.publicApi
                  .GetProcedureDataSet({
                    code: 'GetMaterialsBySproduct',
                    pars: {
                      productNo: data.data[0]['生产产品号'],
                      formula: item['方案'],
                    },
                  })
                  .then((res) => {
                    if (res.statusCode !== 200) {
                      this.$message({
                        message: res.message,
                        type: 'error',
                      })
                    } else {
                      if (res.data.length === 0) {
                        item.每片用料 = 0
                      } else {
                        item.每片用料 = res.data[0].Quantity
                        this.$set(
                          item,
                          '原估计米数',
                          Number(item['数量'] * item['每片用料'])
                        )
                        this.$set(
                          item,
                          '估计米数',
                          Math.round(Number(item['数量'] * item['每片用料']))
                        )
                        this.$set(
                          item,
                          '匹数',
                          Math.round(Number(item['估计米数'] / item['米每匹']))
                        )
                      }
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }
            })
          } else {
            let saleOrder = ''
            this.addListOne.forEach((item) => {
              if (item['_XID'] === this.selectRowId) {
                item.产品号 = data.data[0]['产品号']
                item.生产产品号 = data.data[0]['生产产品号']
                item.生产产品名称 = data.data[0]['生产产品名称']
                item.尺寸单位 = data.data[0]['尺寸单位']
                item.样式 = data.data[0]['样式']
                item.颜色 = data.data[0]['颜色']
                item.色号 = data.data[0]['色号']
                item.尺寸 = data.data[0]['尺寸']
                item.数量 = data.data[0]['数量']
                saleOrder = item['saleOrder']
                saleOrderID = item['saleOrderID']
                this.$api.publicApi
                  .GetProcedureDataSet({
                    code: 'GetMaterialsBySproduct',
                    pars: {
                      productNo: data.data[0]['生产产品号'],
                      formula: item['方案'],
                    },
                  })
                  .then((res) => {
                    if (res.statusCode !== 200) {
                      this.$message({
                        message: res.message,
                        type: 'error',
                      })
                    } else {
                      if (res.data.length === 0) {
                        item.每片用料 = 0
                      } else {
                        item.每片用料 = res.data[0].Quantity
                        this.$set(
                          item,
                          '原估计米数',
                          Number(item['数量'] * item['每片用料'])
                        )
                        this.$set(
                          item,
                          '估计米数',
                          Math.round(Number(item['数量'] * item['每片用料']))
                        )
                        this.$set(
                          item,
                          '匹数',
                          Math.round(Number(item['估计米数'] / item['米每匹']))
                        )
                      }
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }
            })
            data.data.shift()
            data.data.forEach((item) => {
              item['方案'] = 'A'
              item['saleOrder'] = saleOrder
              item['saleOrderID'] = saleOrderID
              item['米每匹'] = '60'
              this.$api.publicApi
                .GetProcedureDataSet({
                  code: 'GetMaterialsBySproduct',
                  pars: {
                    productNo: item['生产产品号'],
                    formula: item['方案'],
                  },
                })
                .then((res) => {
                  if (res.statusCode !== 200) {
                    this.$message({
                      message: res.message,
                      type: 'error',
                    })
                  } else {
                    if (res.data.length === 0) {
                      item.每片用料 = 0
                    } else {
                      item.每片用料 = res.data[0].Quantity
                      this.$set(
                        item,
                        '原估计米数',
                        Number(item['数量'] * item['每片用料'])
                      )
                      this.$set(
                        item,
                        '估计米数',
                        Math.round(Number(item['数量'] * item['每片用料']))
                      )
                      this.$set(
                        item,
                        '匹数',
                        Math.round(Number(item['估计米数'] / item['米每匹']))
                      )
                    }
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            })
            this.addListOne = this.addListOne.concat(data.data)
          }
          break

        default:
          break
      }
      this.dialogParam.isShowDialog = false
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
      this.$set(this.addFormParams, 'Deliver', toMonth)
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
.saveBtn2 {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #ff9b22;
  border: 1px solid #ff9b22 !important;
}
.printBtn {
  width: 80px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #5473e8;
  border: 1px solid #5473e8 !important;
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
  position: absolute;
  right: 4px;
  top: 8px;
  color: #5473e8;
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
.iconC {
  font-size: 18px;
  color: #2b55ee;
}
>>> .addheight {
  height: 550px;
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
// >>>.el-col{
//   margin: 0px !important;
// }
>>> .CloseIcon {
  width: 40px;
  height: 25px;
  line-height: normal;
  background: #5473e8;
  color: #fff;
  padding: 0px;
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid #5473e8;
}
>>> .NoCloseIcon {
  width: 70px;
  height: 25px;
  padding: 0px;
  line-height: normal;
  background: #5473e8;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid #5473e8;
}
>>> .SaveIcon {
  width: 40px;
  height: 25px;
  padding: 0px;
  line-height: normal;
  background: #ff9b22;
  border: 1px solid #ff9b22;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
}
>>> .vxe-input .vxe-input--extra-suffix,
.vxe-input .vxe-input--suffix {
  display: none;
}
</style>
