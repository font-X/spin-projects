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
          <el-form-item
            prop="PickingCode"
            label-width="100px"
            label="计划单号："
          >
            <el-input
              clearable
              :disabled="isWatch"
              v-model="addFormParams.PickingCode"
              class="unifySize"
            ></el-input>
          </el-form-item>
          <el-form-item prop="Shop" label="站点：">
            <el-select
              :disabled="isWatch"
              clearable
              @change="linkCountry()"
              v-model="addFormParams.Shop"
              class="unifySize"
            >
              <el-option
                :key="index"
                v-for="(item, index) in shopList"
                :label="item.Name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="国家：">
            <el-select
              :disabled="isWatch"
              clearable
              v-model="addFormParams.Country"
              class="unifySize"
            >
              <el-option
                :key="index"
                v-for="(item, index) in countryList"
                :label="item.countryname"
                :value="item.countryid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="ShipmentDate"
            label-width="110px"
            label="出货日期："
          >
            <el-date-picker
              :disabled="isWatch"
              class="unifySizeDate"
              v-model="addFormParams.ShipmentDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col style="height: 54px">
          <!-- 文本域 -->
          <el-form-item label-width="100px" label="备注：">
            <el-input
              :disabled="isWatch"
              clearable
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              v-model="addFormParams.Remark"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" style="display: flex; justify-content: space-between">
          <el-form-item label-width="100px" label="货柜：">
            <!-- <el-input
              disabled
              v-model="addFormParams.productlist"
              class="unifySize"
            ></el-input> -->
            <div class="Numbe">{{ addNum }}</div>
          </el-form-item>
        </el-col>
        <el-col style="height: 240px">
          <div v-if="isWatch" class="screen2"></div>
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
            height="230"
            highlight-current-row
            :edit-config="{ trigger: 'click', mode: 'row' }"
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
            <vxe-table-column width="5%" field="P_Status" title="状态">
              <template v-slot="{ row }">
                <span>{{
                  row.P_Status === '0'
                    ? '未完成'
                    : edit === true
                    ? '已完成'
                    : '未完成'
                }}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column
              width="5%"
              field="CNumber"
              title="柜号"
              :edit-render="{
                name: 'input',
                attrs: { type: 'text' },
                immediate: true,
              }"
            >
              <template v-slot:edit="{ row }">
                <vxe-input v-model="row.CNumber"></vxe-input>
              </template>
            </vxe-table-column>
            <vxe-table-column
              :edit-render="{
                name: 'select',
                options: containerList,
                optionProps: { value: 'Code', label: 'Name' },
                autoselect: true,
              }"
              width="21%"
              field="ContainerType"
              title="柜型"
            >
              <!-- <template v-slot:edit="{ row }">
                <vxe-select v-model="row.ContainerType">
                  <vxe-option
                    v-for="(item, index) in containerList"
                    :key="index"
                    :value="item.Code"
                    :label="item.Name"
                  ></vxe-option>
                </vxe-select>
              </template> -->
            </vxe-table-column>
            <vxe-table-column
              width="21%"
              field="PlanNumber"
              title="计划箱数"
              :edit-render="{
                name: 'input',
                attrs: { type: 'text' },
                immediate: true,
              }"
            >
              <template v-slot:edit="{ row }">
                <vxe-input
                  type="number"
                  :min="0"
                  v-model="row.PlanNumber"
                ></vxe-input>
              </template>
            </vxe-table-column>
            <vxe-table-column
              width="21%"
              field="ColorTag"
              title="颜色标"
              :edit-render="{
                name: 'ElSelect',
                options: corlorList,
                optionProps: { value: 'Code', label: 'Name' },
                autoselect: true,
              }"
            >
              <!-- <template v-slot:edit="{row}">
                <vxe-select v-model="row.ColorTag">
                  <vxe-option
                    v-for="(item, index) in corlorList"
                    :key="index"
                    :value="item.Code"
                    :label="item.Name"
                  ></vxe-option>
                </vxe-select>
              </template> -->
            </vxe-table-column>
            <vxe-table-column
              width="8%"
              field="PickNumber"
              title="已配箱数"
            ></vxe-table-column>
            <vxe-table-column width="100" field="操作" title="操作">
              <template slot-scope="{ row }">
                <i
                  @click="addRow(row)"
                  v-if="!isWatch"
                  class="iconC el-icon-circle-plus-outline"
                ></i>
                <i
                  @click="deleteRow(row)"
                  v-if="!isWatch"
                  class="iconC el-icon-delete"
                ></i>
                <i
                  v-show="isWatch"
                  @click="printing(row)"
                  class="iconC el-icon-printer"
                ></i>
              </template>
            </vxe-table-column>
          </vxe-table>
        </el-col>
        <el-col class="secondBtn">
          <el-button
            type="primary"
            :disabled="isWatch"
            @click="chooseProduct"
            :class="isWatch ? 'iconBtn2' : 'iconBtn'"
            class="iconBtn iconfont kt-icon-caidan"
            >选择产品</el-button
          >
          <el-button
            type="primary"
            :disabled="isWatch"
            @click="delProduct"
            :class="isWatch ? 'delBtn2' : 'delBtn'"
            class="delBtn iconBtn el-icon-delete"
            >删除</el-button
          >
          <el-button
            type="primary"
            :disabled="isWatch"
            :class="isWatch ? 'iconBtn2' : 'iconBtn'"
            @click="showInformation"
            class="iconBtn iconfont kt-icon-caidan"
            >显示信息</el-button
          >
          <!-- :disabled="
              (addProduceList.length <= 1 && addProduceList[0].产品号 === '') ||
              !isEdit
                ? true
                : false
            "
            :class="
              (addProduceList.length <= 1 && addProduceList[0].产品号 === '') ||
              !isEdit
                ? 'del2Btn'
                : 'delBtn'
            " -->
          <!-- <span
              class="NullTip"
              v-if="
                addProduceList.length <= 1 && addProduceList[0].产品号 === ''
              "
              >暂无数据，请点击“选择产品”按钮或”产品编码“下方的蓝色选择产品图标</span
            > -->
          <!-- <span
            class="NullTip"
            v-if="addProduceList.length <= 1 && addProduceList[0].产品号 === ''">暂无数据，请点击“选择产品”按钮选择产品</span> -->
        </el-col>
      </el-row>
      <el-row style="height: 300px">
        <div v-if="isWatch" class="screen"></div>
        <JyTableInput
          border
          resizable
          stripe
          keep-source
          :header-row-class-name="hearderClass"
          class="mytable-scrollbar"
          :auto-resize="true"
          style="margin-top: 11px"
          show-overflow="title"
          width="auto"
          height="280"
          show-footer
          :edit-rules="validRules"
          :footer-method="footerMethodBottom"
          :footer-cell-class-name="footerCellClassName"
          @checkbox-change="onAddCheckboxChange"
          @checkbox-all="onAddCheckboxAllChange"
          :cell-class-name="getCellClassName"
          @cell-dblclick="cellClickEvent"
          highlight-current-row
          :row-class-name="cellClass"
          :edit-config="{ trigger: 'click', mode: 'cell' }"
          :align="'center'"
          :checkbox-config="{
            highlight: true,
          }"
          :columns="r_columns"
          :data.sync="addProduceList"
        >
        </JyTableInput>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col style="display: flex; justify-content: flex-end">
          <el-button
            v-show="!isWatch"
            type="primary"
            @click="save"
            :loading="isSave"
            :disabled="isWatch"
            class="saveBtn iconfont kt-icon-baocun"
            >保存</el-button
          >
          <el-button
            style="margin-left: 4px"
            v-show="!isWatch"
            type="primary"
            :loading="isSave"
            @click="saveAndReport"
            class="saveAnd el-icon-s-promotion saveAnd"
            >保存并批报</el-button
          >
          <el-button
            style="margin-left: 4px"
            type="primary"
            @click="closeAddDialog"
            class="clearBtn"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </span>

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
        <show-details
          :queryCode="queryCode"
          :keyCode="keyCode"
          v-if="dialogParam.name === 'ShowDetails'"
        ></show-details>
        <choose-product
          @fatherMethod="fatherMethod"
          :shopList="shopList"
          :shopId="shopId"
          v-if="dialogParam.name === 'ChooseProduct'"
          @closeDialog="closeDialog"
        ></choose-product>
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
  </div>
</template>

<script>
import JyTableInput from '@/components/JyTableInput/index'
import ChooseProduct from './ChooseProduct'
import ShowDetails from '../../../../Basic/ShowDetails'
import JyDialog from '@/components/JyDialog'
import PrintDialog from '@/components/PrintDialog'
export default {
  props: {
    editData: Object,
    edit: Boolean,
    isWatch: Boolean,
  },
  components: {
    JyTableInput,
    ChooseProduct,
    ShowDetails,
    PrintDialog,
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
      addListOne: [
        {
          P_Status: '0',
          CNumber: '',
          ContainerType: '',
          PlanNumber: '',
          ColorTag: '',
          PickNumber: '',
        },
      ],
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
      countryList: [],
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
        { type: 'checkbox', width: '4%' },
        {
          title: '产品编码',
          field: '产品号',
          width: '13%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '产品名称',
          field: '产品名称',
          width: '10%',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '4%',
          title: '样式',
          field: '样式',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '4%',
          title: '色号',
          field: '色号',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '4%',
          title: '颜色',
          field: '颜色',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '6%',
          title: '每包片数',
          field: '每包片数',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '5%',
          title: '箱数',
          field: '箱数',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '5%',
          title: '包数',
          field: '包数',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '5%',
          title: '备注',
          field: '备注',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '6%',
          title: '库存(包)',
          field: '库存',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '7%',
          title: '生产中(片)',
          field: '生产中',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '7%',
          title: '未包装(片)',
          field: '未包装',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '8%',
          title: '关联产品(箱)',
          field: '关联产品',
          editRender: {
            immediate: true,
          },
        },
      ],
      delArr: [],
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
      validRules: {
        箱数: [{ required: true, message: '请手动输入箱数' }],
        包数: [{ required: true, message: '请手动输入包数' }],
        备注: [{ required: true, message: '请手动输入备注' }],
      },
      shopId: '',
      footerCellClassName: 'footerCellClassName',
      showDetails: false,
      hearderClass: 'hearderClass',
      addAialogVisible: false,
      addFormParams: {
        Remark: '',
        PickingCode: '',
        Shop: '',
        ShipmentDate: '',
        Country: '',
      }, // 保存的参数
      columnIcon: '◇', //列分隔符
      currencyList: [],
      shopList: [],
    }
  },
  methods: {
    footerMethodBottom({ columns, data }) {
      console.log(this.addProduceList)
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          switch (column.property) {
            case '箱数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i]['箱数'])
              }
              return sums
          }
          switch (column.property) {
            case '包数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i]['包数'])
              }
              return sums
          }
          switch (column.property) {
            case '库存':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i]['库存'])
              }
              return sums
          }
          switch (column.property) {
            case '生产中':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i]['生产中'])
              }
              return sums
          }
          switch (column.property) {
            case '未包装':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i]['未包装'])
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
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
          switch (column.property) {
            case 'PickNumber':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i]['PickNumber'])
              }
              return sums
          }

          return null
        }),
      ]
      return footerData
    },
    // 打印按钮
    printing(row) {
      console.log(row.ContainerId)
      this.LableNo = ''
      this.ID = []
      this.ID.push(row.ContainerId)
      this.$refs.print1.printList({
        TempType: '0160',
        ID: this.ID,
      })
    },
    // 显示信息
    showInformation() {
      console.log(this.addProduceList)
      if (
        this.addProduceList.length <= 1 &&
        this.addProduceList[0]['产品号'] === ''
      ) {
        this.$message.error('请先勾选产品!')
      } else {
        var arr = []
        this.addProduceList.forEach((item) => {
          arr.push(item['产品号'])
        })
        this.$api.delivery
          .GetProductListQuery({
            productNos: arr,
          })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message.error(res.message)
            } else {
              this.addProduceList.forEach((p) => {
                res.data.forEach((Item) => {
                  if (p['产品号'].trim() === Item.ProductNo.trim()) {
                    p['库存'] = Item.StockQty
                    p['生产中'] = Item.MachiningQty
                    p['未包装'] = Item.UnPickQty
                    p['关联产品'] = Item.JoinQty
                  }
                })
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    // 保存并批报
    saveAndReport() {
      this.$refs.addForm.validate((valid) => {
        if (!valid) return //文本域校验，必填项
        this.isSave = true
        let list = []
        let objList = {}
        console.log(this.addProduceList)
        this.addProduceList.forEach((item) => {
          objList = {}
          objList.ProductNo = item['产品号']
          objList.PlanNumber = item['箱数']
          objList.Remark = item['备注']
          objList.PlanPackages = item['包数']
          list.push(objList)
        })
        console.log(objList)
        let containers = []
        let objContainers = {}
        this.addListOne.forEach((itEm) => {
          objContainers = {}
          objContainers.CNumber = itEm['CNumber']
          objContainers.ContainerType = itEm['ContainerType']
          objContainers.PlanNumber = itEm['PlanNumber']
          objContainers.ColorTag = itEm['ColorTag']
          containers.push(objContainers)
        })
        // 修改下的保存
        if (this.edit) {
          this.$api.delivery
            .EditPickingPlan({
              operationType: '1',
              plan: { ...this.addFormParams, pickingId: this.pID },
              list: list,
              containers: containers,
            })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.isSave = false
                this.$message.error(res.message)
              } else {
                this.$message.success('保存成功！')
                this.$emit('closeDialog')
                this.isSave = false
              }
            })
            .catch((err) => {
              this.isSave = false
              console.log(err)
            })
            .finally(() => {
              this.isSave = false
            })
        } else {
          // 新增下的保存接口
          this.$api.delivery
            .AddPickingPlan({
              operationType: '1',
              plan: { ...this.addFormParams },
              list: list,
              containers: containers,
            })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.isSave = false
                this.$message.error(res.message)
              } else {
                this.$message.success('保存成功！')
                this.isSave = false
                this.$emit('closeDialog')
              }
            })
            .catch((err) => {
              this.isSave = false
              console.log(err)
            })
            .finally(() => {
              this.isSave = false
            })
        }
      })
    },
    // 保存
    save() {
      this.$refs.addForm.validate((valid) => {
        if (!valid) return //文本域校验，必填项
        this.isSave = true
        let list = []
        let objList = {}
        console.log(this.addProduceList)
        this.addProduceList.forEach((item) => {
          objList = {}
          objList.ProductNo = item['产品号']
          objList.PlanNumber = item['箱数']
          objList.Remark = item['备注']
          objList.PlanPackages = item['包数']
          list.push(objList)
        })
        console.log(objList)
        let containers = []
        let objContainers = {}
        this.addListOne.forEach((itEm) => {
          objContainers = {}
          objContainers.CNumber = itEm['CNumber']
          objContainers.ContainerType = itEm['ContainerType']
          objContainers.PlanNumber = itEm['PlanNumber']
          objContainers.ColorTag = itEm['ColorTag']
          containers.push(objContainers)
        })
        // 修改下的保存
        if (this.edit) {
          this.$api.delivery
            .EditPickingPlan({
              operationType: '0',
              plan: { ...this.addFormParams, pickingId: this.pID },
              list: list,
              containers: containers,
            })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.isSave = false
                this.$message.error(res.message)
              } else {
                this.$message.success('保存成功！')
                this.isSave = false
                this.$emit('closeDialog')
              }
            })
            .catch((err) => {
              console.log(err)
              this.isSave = false
            })
            .finally(() => {
              this.isSave = false
            })
        } else {
          // 新增下的保存接口
          this.$api.delivery
            .AddPickingPlan({
              operationType: '0',
              plan: { ...this.addFormParams },
              list: list,
              containers: containers,
            })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.isSave = false
                this.$message.error(res.message)
              } else {
                this.isSave = false
                this.$message.success('保存成功！')
                this.$emit('closeDialog')
              }
            })
            .catch((err) => {
              this.isSave = false
              console.log(err)
            })
            .finally(() => {
              this.isSave = false
            })
        }
      })
    },
    //取消关闭弹框
    closeAddDialog() {
      this.$emit('closeDialog')
    },
    fatherMethod(data) {
      this.addProduceList = this.addProduceList.concat(data)
      this.addProduceList.forEach((item, index) => {
        if (item['产品号'] === '') {
          this.addProduceList.splice(index, 1)
        }
        // else {
        //   item.箱数 = 0
        //   item.包数 = 0
        // }
      })
    },
    // 复选框全选事件
    onAddCheckboxAllChange(row) {
      if (row.checked) {
        for (var i = 0; i < this.addProduceList.length; i++) {
          this.delArr.push(i)
        }
        this.delArr = this.delArr.sort(function (n1, n2) {
          return n2 - n1
        })
      } else {
        this.delArr = []
      }
    },
    // 复选框改变事件
    onAddCheckboxChange(row) {
      if (row.checked) {
        this.delArr.push(row.$rowIndex)
        this.delArr = this.delArr.sort(function (n1, n2) {
          return n2 - n1
        })
        function unique(arr) {
          return Array.from(new Set(arr))
        }
        this.delArr = unique(this.delArr)
      } else {
        this.delArr.splice(row.$rowIndex, 1)
        this.delArr = this.delArr.sort(function (n1, n2) {
          return n2 - n1
        })
        function unique(arr) {
          return Array.from(new Set(arr))
        }
        this.delArr = unique(this.delArr)
      }
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
    // 关联产品列变色
    getCellClassName({ row, column }) {
      if (column.title === '关联产品') {
        return 'redClass'
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
    // 关联产品
    cellClickEvent({ row, column }) {
      if (column.property == '关联产品' && row['关联产品'] !== '') {
        this.queryCode = 'LQ10'
        this.keyCode = row['产品号']
        this.dialogParam = {
          title: '关联产品库存',
          name: 'ShowDetails',
          type: '',
          width: '70%',
          isShowDialog: true,
        }
      }
    },
    // 选择产品信息
    chooseProduct() {
      this.shopId = this.addFormParams.Shop
      this.dialogParam = {
        title: '选择产品信息',
        name: 'ChooseProduct',
        type: '',
        width: '70%',
        isShowDialog: true,
      }
    },
    closeDialog() {
      this.dialogParam.isShowDialog = false
    },
    // 站点改变返回国家
    linkCountry() {
      this.countryList = []
      this.addFormParams.Country = ''
      this.$api.publicApi
        .LinkShop({ shopid: this.addFormParams.Shop, flag: '2' })
        .then((res) => {
          if (res.statusCode !== 200) return this.$message.error(res.message)
          this.countryList = res.data
          if (res.data.length !== 0) {
            this.addFormParams.country = res.data[0].countryid
          } else {
            this.addFormParams.country = ''
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // //报批
    // reportItem() {
    //   var data = []
    //   data.push(...this.$refs.mainTable.getCheckboxRecords())
    //   if (data.length != 1) {
    //     this.$message({
    //       message: '请选择一条数据后操作!',
    //       type: 'error',
    //     })
    //   } else {
    //     var ID = data[0].pricechangeid
    //     this.showReportDialog = true
    //     this.$nextTick(() => {
    //       this.$refs.ReportApproval.formInfo.ObjectCode = '0115'
    //       this.$refs.ReportApproval.formInfo.Key = ID
    //       this.$refs.ReportApproval.showDialog = true
    //     })
    //   }
    // },
    // //报批完成后
    // ReportOkDialog() {
    //   this.getpriceAdjustmentList()
    // },
    // 获取国家列表
    // addProductCountry() {
    //   this.$api.publicApi
    //     .bcState()
    //     .then((res) => {
    //       if (res.statusCode < 0) {
    //         this.$message({
    //           message: res.message,
    //           type: 'error',
    //         })
    //       } else {
    //         this.countryList = res.data
    //       }
    //     })
    //     .catch((err) => console.log(err))
    // },
    // 获取计量单位列表
    // getUnitList() {
    //   this.$api.publicApi
    //     .XcUnit()
    //     .then((res) => {
    //       if (res.statusCode < 0) {
    //         this.$message({
    //           message: res.message,
    //           type: 'error',
    //         })
    //       } else {
    //         this.unitList = res
    //       }
    //     })
    //     .catch((err) => console.log(err))
    // },

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
            this.addFormParams.Shop = this.shopList[0].id
            this.linkCountry()
            this.editEvent()
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
      this.$set(this.addFormParams, 'ShipmentDate', toMonth)
    },
    // 获取货币列表
    addProductCurrency() {
      this.$api.publicApi
        .bcCurrency()
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.currencyList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    getColorTagList() {
      this.$api.publicApi
        .GetContainerColorTagList({ flag: 'PickingColor' })
        .then((res) => {
          this.corlorList = res.data
        })
        .catch((err) => console.log(err))
    },
    editEvent() {
      if (this.edit) {
        this.addFormParams.PickingCode = this.editData.plan.PickingCode
        let index = this.shopList.findIndex((item) => {
          return item.id.trim() === this.editData.plan.Shop.trim()
        })
        this.pID = this.editData.plan.PickingId
        this.addFormParams.Shop = this.shopList[index].id
        this.addFormParams.ShipmentDate = this.editData.plan.ShipmentDate
        this.addFormParams.Remark = this.editData.plan.Remark
        this.addListOne = this.editData.containerList
        this.linkCountry()
        this.editData.list.forEach((Item) => {
          this.$set(Item, '产品号', Item.ProductNo)
          this.$set(Item, '产品名称', Item.chnName)
          this.$set(Item, '样式', Item.CustStyle)
          this.$set(Item, '色号', Item.ColorNo)
          this.$set(Item, '颜色', Item.Color)
          this.$set(Item, '每包片数', Item.InboxQuantity)
          this.$set(Item, '箱数', Item.PlanNumber)
          this.$set(Item, '包数', Item.PlanPackages)
          this.$set(Item, '备注', Item.Remark)
          this.$set(Item, '库存', Item.StockQty)
          this.$set(Item, '生产中', Item.MachiningQty)
          this.$set(Item, '未包装', Item.UnPickQty)
          this.$set(Item, '关联产品', Item.JoinQty)
        })
        this.addProduceList = this.editData.list
      }
    },
    // 获取柜型
    GetContainerList() {
      this.$api.publicApi
        .GetContainerList({ flag: 'ContainerType' })
        .then((res) => {
          this.containerList = res.data
        })
        .catch((err) => console.log(err))
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
    // this.aabb()
    this.getNowDate()
    this.getColorTagList()
    this.GetContainerList()
    this.addProductState()
    // this.addProductCurrency() //获取货币列表
    // this.getUnitList()
    // this.addProductCountry()
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
// >>>.el-col{
//   margin: 0px !important;
// }
</style>
