<!--
     流转卡管理页面
-->
<template>
  <el-container>
    <el-card class="cardMargin" id="mainCard">
      <el-row id="queryRow">
        <el-form
          ref="mainForm"
          :model="model"
          style="font-size：14px"
          label-width="104px"
          size="mini"
        >
          <el-row>
            <el-col :span="4">
              <el-form-item label="制卡开始：">
                <el-date-picker
                  v-model="model.beginDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="DeliveryDate" label="制卡结束：">
                <el-date-picker
                  v-model="model.endDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="流转卡号：">
                <el-input v-model="model.CardNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="上级卡号:">
                <el-input v-model="model.SCardNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="订单号:">
                <el-input v-model="model.PlanNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="属性：">
                <el-select v-model="model.isFinish" clearable>
                  <el-option
                    :key="index"
                    v-for="(item, index) in isFinishList"
                    :label="item.Name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="产品：">
                <el-input
                  v-model="model.ProductName"
                  auto-complete="on"
                  name="commtenen"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="色号：">
                <el-input v-model="model.ColorNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="颜色：">
                <el-input v-model="model.Color"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="当前工序：">
                <el-select v-model="model.CraftsCode" clearable>
                  <el-option
                    :key="index"
                    v-for="(item, index) in craftsList"
                    :label="item.CraftsName"
                    :value="item.CraftsCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="完工工序：">
                <el-select v-model="model.CraftsCode" clearable>
                  <el-option
                    :key="index"
                    v-for="(item, index) in craftsList"
                    :label="item.CraftsName"
                    :value="item.CraftsCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="formbtn">
              <el-form-item label="公司：">
                <el-select v-model="model.Company" clearable>
                  <el-option
                    :key="index"
                    v-for="(item, index) in companyList"
                    :label="item.ChsName"
                    :value="item.CompanyCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="订单条码：">
                <el-input v-model="model.bakField3"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="返修备注：">
                <el-input v-model="model.bakField3"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="客户：">
                <el-input v-model="model.bakField3"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="状态：">
                <el-select v-model="model.Status" clearable>
                  <el-option
                    :key="index"
                    v-for="(item, index) in statusList"
                    :label="item.Show"
                    :value="item.Status"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="工序性质：">
                <el-select v-model="model.isFinish" clearable>
                  <el-option
                    :key="index"
                    v-for="(item, index) in isFinishList"
                    :label="item.Name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="订单类型：">
                <el-select v-model="model.PlanTye" clearable>
                  <el-option
                    :key="index"
                    v-for="(item, index) in planTyeList"
                    :label="item.text"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <!-- 按钮区域 -->
      <el-row id="btnRow">
        <el-button type="primary" size="small" @click="query()">查询</el-button>
        <el-button type="primary" size="small" @click="cardAdd">开卡</el-button>
        <el-button type="primary" size="small" @click="routingManage"
          >工艺</el-button
        >
        <el-button type="primary" size="small" @click="cardDelete"
          >删除</el-button
        >
        <el-button type="primary" size="small" @click="cardSplit"
          >拆分</el-button
        >
        <el-button type="primary" size="small" @click="cardPrint"
          >打印</el-button
        >
      </el-row>
      <el-row>
        <jy-page-table
          :columns="columns"
          :action="'/WsTrnCard/GetTrnCardPageList'"
          :height="gridHeight"
          :querModel="model"
          ref="grid"
        ></jy-page-table>
      </el-row>
    </el-card>
    <trn-car-add ref="TrnCarAdd"></trn-car-add>
    <trn-card-split ref="TrnCardSplit" :id="selectId"></trn-card-split>
    <trn-card-routing
      ref="TrnCardRouting"
      @closeDialog="routcloseDialog"
      :ids="selectIds"
    ></trn-card-routing>
    <print-dialog ref="print"></print-dialog>
  </el-container>
  <!-- 查询框 -->
</template>
<script>
import JyPageTable from '@/components/JyPageTable'
import JyGridTest from '../../ModuleB/JyGridTest.vue'
import TrnCarAdd from './TrnCarAdd'
import TrnCardSplit from './Components/TrnCardSplit'
import TrnCardRouting from './Components/TrnCardRouting'
import PrintDialog from '@/components/PrintDialog'
export default {
  components: {
    JyPageTable,
    JyGridTest,
    TrnCarAdd,
    TrnCardSplit,
    TrnCardRouting,
    PrintDialog,
  },
  data() {
    return {
      isFinishList: [
        {
          Name: '未完成',
          id: '1',
        },
        {
          Name: '已完成',
          id: '2',
        },
      ],
      gridHeight: 600,
      loading: false,
      selectId: '',
      planTyeList: [
        { id: '01', text: '大货' },
        { id: '02', text: '零单' },
      ],
      selectIds: [],
      model: {
        isFinish: '',
        deliveryPlanCode: '',
        bakField1: '',
        bakField2: '',
        bakField3: '',
        dateType: '1',
        shop: '',
        productNo: '',
        isDetail: '',
        PlanTye:'',
      },
      pageInfo: {
        page: 1,
        pageSize: 100,
      },
      companyList: [],
      craftsList: [],
      statusList: [],
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '140', title: '流转卡号', field: 'CardNo' },
        { width: '140', title: '卡号', field: 'LotCode' },
        { width: '180', title: '订单号', field: 'PlanNo' },
        {
          width: '200',
          title: '产品名称',
          field: 'ProductName',
        },
        { width: '80', title: '订单类型', field: 'playType' },
        { width: '80', title: '样式', field: 'Style' },
        { width: '80', title: '色号', field: 'ColorNo' },
        { width: '80', title: '颜色', field: 'Color' },
        { width: '80', title: '尺寸', field: 'Size' },
        {
          width: '80',
          title: '尺寸单位',
          field: 'SizeUnitName',
        },
        {
          width: '80',
          title: '当前工序',
          field: 'CraftsCodeName',
        },
        { width: '80', title: '数量', field: 'PlanQuantity' },
        { width: '80', title: '单位', field: 'UnitName' },
        {
          width: '80',
          title: '完工工序',
          field: 'FinishCraftsCodeName',
        },
        { width: '150', title: '完工时间', field: 'FinishTime' },
        { width: '80', title: '状态', field: 'StatusName' },
        { width: '80', title: '装箱数', field: 'LotNum' },
        { width: '80', title: '装箱片数', field: 'LotQuantity' },
        { width: '80', title: '制卡人', field: 'InputerName' },
        { width: '150', title: '制卡时间', field: 'InputDate' },
      ],
      gridData: [],
      addRules: {},
    }
  },
  methods: {
    //判断是否选择一条数据
    isSelectOne() {
      var data = []
      data.push(...this.$refs.grid.getCheckRow())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条数据后操作!',
          type: 'error',
        })
        return null
      } else {
        return data[0]
      }
    },
    //查询
    query() {
      this.$refs.grid.query()
    },
    //获取公司
    addCompany() {
      this.$api.publicApi
        .GetCompany()
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.companyList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    //获取状态
    addState() {
      this.$api.publicApi
        .getStatus({ model: { type: 'xdStatus', query: { Type: 'TrnCard' } } })
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.statusList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    //删除
    cardDelete() {
      var row = this.$refs.grid.getCheckRow()
      if (row.length == 0) {
        this.$message({
          message: '请选择一条数据后操作',
          type: 'error',
        })
        return
      }
      this.$confirm(
        '此操作将删除选中的' + row.length + '条流转卡,需要继续删除么?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }
      ).then(() => {
        var data = []
        row.forEach((item) => {
          data.push(item.CardNo)
        })
        this.$api.CardManage.CardDelete({ list: data })
          .then((res) => {
            if (!res.isSucceed) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.query()
            }
          })
          .catch((err) => console.log(err))
      })
    },
    // 获取工艺
    addCraftsList() {
      this.$api.CardManage.GetCraftsList()
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.craftsList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    //工艺管理
    routingManage() {
      var row = this.$refs.grid.getCheckRow()
      if (row && row.length == 0) {
        this.$message({
          message: '请选择数据后操作',
          type: 'error',
        })
        return
      }
      var data = []
      row.forEach((item) => {
        data.push(item.CardNo)
      })
      this.selectIds = data
      this.$refs.TrnCardRouting.showDialog = true
    },
    routcloseDialog() {
      this.query()
    },
    //开卡
    cardAdd() {
      this.$refs.TrnCarAdd.showDialog = true
    },
    //打印
    cardPrint() {
      var row = this.$refs.grid.getCheckRow()
      let data = []
      let labData = []

      row.forEach((item) => {
        data.push({
          ID: item.CardNo,
        })
        labData.push(item.LableNo)
      })
      labData = Array.from(new Set(labData))
      if (labData.length != 1) {
        this.$message({
          message: '选择的数据中打印模板不是同一个模板，请重新选择数据后打印',
          type: 'error',
        })
        return
      }
      this.$refs.print.printDll({
        LableNo: labData[0],
        ID: data,
        Count: 1,
      })
    },
    //拆分
    cardSplit() {
      var row = this.$refs.grid.getCheckRow()
      if (row && row.length > 1) {
        this.$message({
          message: '请选择一条数据后操作',
          type: 'error',
        })
        return
      }
      this.selectId = row[0].CardNo
      this.$refs.TrnCardSplit.showDialog = true
    },
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        var btnRow = document.getElementById('btnRow').offsetHeight
        this.gridHeight = card - queryRow - btnRow
      })
    },
  },
  created() {
    this.addCraftsList()
    this.addState()
    this.addCompany()
    // this.query()
    this.resize()
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
.el-date-editor.el-input,
.el-date-editor.el-input__inner,
.el-select {
  width: 100%;
}
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
>>> .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 8px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner,
.el-select {
  width: 100%;
}
</style>