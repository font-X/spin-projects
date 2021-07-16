<!--
     流转卡作业单
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
              <el-form-item label="开始时间：">
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
              <el-form-item prop="DeliveryDate" label="结束时间：">
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
              <el-form-item label="订单号:">
                <el-input v-model="model.PlanNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="颜色：">
                <el-input v-model="model.Color"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="产品：">
                <el-input v-model="model.ProductName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="工序：">
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
              <el-form-item label="生产人：">
                <el-select v-model="model.Worker" clearable filterable>
                  <el-option
                    :key="index"
                    v-for="(item, index) in wokerList"
                    :label="item.Name"
                    :value="item.UserCode"
                  ></el-option>
                </el-select>
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
            <el-col :span="4">
              <el-form-item label="添加方式：">
                <el-select v-model="model.IsAdd" clearable>
                  <el-option
                    :key="index"
                    v-for="(item, index) in isAddList"
                    :label="item.text"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="formbtn">
              <!-- <el-button
                type="warning"
                size="mini"
                icon="iconfont kt-icon-sousuo_o"
                @click="query()"
                >查询</el-button
              > -->
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <!-- 按钮区域 -->
      <el-row id="btnRow">
        <el-button type="primary" size="small" @click="query">查询</el-button>
        <el-button type="primary" size="small" @click="btnAdd">新增</el-button>
        <el-button type="primary" size="small" @click="btnEdit">修改</el-button>
        <el-button type="primary" size="small" @click="btnDelete"
          >删除</el-button
        >
      </el-row>
      <!-- 主表区域 -->
      <jy-page-table
        :columns="columns"
        :action="'/WsTrnCard/GetTrnCardWorkPageList'"
        :height="gridHeight"
        :multiple="false"
        :querModel="model"
        ref="grid"
      ></jy-page-table>
    </el-card>
    <work-list-info
      ref="WorkListInfo"
      :id="selectId"
      @okDialog="workOkDialog"
    ></work-list-info>
  </el-container>
</template>
<script>
import WorkListInfo from './WorkListInfo.vue'
import JyPageTable from '@/components/JyPageTable'
export default {
  components: { WorkListInfo, JyPageTable },
  data() {
    return {
      gridHeight: 600,
      loading: false,
      model: {},
      pageInfo: {
        page: 1,
        pageSize: 100,
      },
      wokerList: [],
      craftsList: [],
      statusList: [],
       planTyeList: [
        { id: '01', text: '大货' },
        { id: '02', text: '零单' },
      ],
      isAddList: [
        { id: '0', text: '手动添加' },
        { id: '1', text: '自动添加' },
      ],
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '140', title: '作业Id', field: 'ListNo' },
        { width: '140', title: '流转卡号', field: 'CardNo' },
        { width: '180', title: '订单号', field: 'PlanNo' },
        { width: '180', title: '产品号', field: 'ProductNo' },
        { width: '200', title: '产品名称', field: 'ProductName' },
        { width: '80', title: '颜色', field: 'Color' },
        { width: '80', title: '工序', field: 'CraftsName' },
        { width: '160', title: '完工时间', field: 'FinishTime' },
        { width: '80', title: '生产数', field: 'ProduceQuantity' },
        { width: '80', title: '合格数', field: 'Qualified' },
        { width: '80', title: '不良品数', field: 'Defective' },
        { width: '80', title: '工价', field: 'ProPrice' },
        { width: '80', title: '工资', field: 'D3' },
        { width: '80', title: '缺件数', field: 'Decrease' },
        { width: '80', title: '多件数', field: 'OverflowQuantity' },
        { width: '90', title: '生产人', field: 'WorkerName' },
        { width: '90', title: '设备', field: 'MachineName' },
        { width: '220', title: '备注', field: 'Remark' },
        { width: '90', title: '状态', field: 'StatusName' },
        { width: '90', title: '制单人', field: 'InputerName' },
        { width: '160', title: '制单时间', field: 'InputDate' },
        { width: '90', title: '采集终端', field: 'TE' },
      ],
      gridData: [],
      addRules: {},
      selectId: '',
    }
  },
  methods: {
    //查询
    query() {
      this.$refs.grid.query()
    },
    //获取公司
    addWorks() {
      this.$api.CardManage.GetWokerList()
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.wokerList = res.data
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
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        var btnRow = document.getElementById('btnRow').offsetHeight
        this.gridHeight = card - queryRow - btnRow
      })
    },
    //
    workOkDialog() {
      this.query()
    },
    //添加
    btnAdd() {
      this.selectId = ''
      this.$refs.WorkListInfo.showDialog = true
    },
    //删除
    btnDelete() {
      var row = this.$refs.grid.getCheckRow()
       if (row.length == 0) {
        this.$message({
          message: '请选择一条数据后操作',
          type: 'error',
        })
        return
      }
      this.$confirm('此操作将删除选中产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        this.$api.CardManage.DeleteWorkList({ id: row.ListNo })
          .then((res) => {
            if (!res.isSucceed) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.$message({
                message: '删除成功',
                type: 'success',
              })
              this.query()
            }
          })
          .catch((err) => console.log(err))
      })
    },
    //修改
    btnEdit() {
      var row = this.$refs.grid.getCheckRow()
      this.selectId = row.ListNo
      this.$refs.WorkListInfo.showDialog = true
    },
  },
  created() {
    this.$nextTick(() => {
      this.addCraftsList()
      this.addState()
      this.addWorks()
      this.resize()
    })
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
>>>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
  margin-bottom: 8px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner,
.el-select {
  width: 100%;
}
</style>