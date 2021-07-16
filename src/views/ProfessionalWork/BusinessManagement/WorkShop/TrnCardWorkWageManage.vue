<!--
   工资结算管理
-->
<template>
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
            <el-form-item label="月份">
              <el-date-picker
                v-model="model.WageDate"
                value-format="yyyy-MM-01"
                type="month"
                placeholder="选择月"
                @change="query"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="部门">
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
            <el-form-item label="员工">
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
        </el-row>
      </el-form>
    </el-row>
    <el-row id="btnRow">
      <el-button type="primary" size="small" @click="query">查询</el-button>
      <el-button type="primary" size="small" @click="wageimport"
        >工资导入</el-button
      >
       <el-button type="primary" size="small" @click="wagedetial"
        >明细</el-button
      >
      <el-button type="primary" size="small" @click="deletewage"
        >删除</el-button
      >
       <el-button type="primary" size="small" @click="approvalWage"
        >审批</el-button
      >
      <el-button type="primary" size="small" @click="exportexcel"
        >导出</el-button
      >
    </el-row>
    <!-- 主表区域 -->
    <el-row>
      <jy-page-table
        :columns="columns"
        :multiple="true"
        ref="grid"
        :action="'/Ws_WorkerWage/GetWageList'"
        :height="gridHeight"
        :querModel="model"
      >
      </jy-page-table>
    </el-row>
    <work-wage-detial ref="WorkWageDetial" :Worker="selectWorker" :WageDate="selectWageDate">
    </work-wage-detial>
    <work-wage-import ref="WorkWageImport" @okDialog='wageokDialog'></work-wage-import>
      <report-approval
      v-if="showReportDialog"
      ref="ReportApproval"
      @okDialog="ReportOkDialog"
    ></report-approval>
  </el-card>
</template>
<script>
import JyPageTable from '../../../../components/JyPageTable'
import ReportApproval from '../../Components/ReportApproval'
import WorkWageImport from './WorkWageImport'
import WorkWageDetial from './Components/WorkWageDetial'
export default {
  components: { JyPageTable, WorkWageImport,ReportApproval,WorkWageDetial },
  watch: {
    'model.Worker': {
      handler(newval) {
        this.query()
      },
    },
  },

  data() {
    var _sel = this
    return {
      gridHeight: 600,
      model: {
        Worker: null,
      },
      showReportDialog:false,
      wokerList: [],
      craftsList: [],
      statusList: [],
      isQualifiedList: [
        { id: '0', text: '全部合格' },
        { id: '1', text: '未全部合格' },
      ],
      isAddList: [
        { id: '0', text: '手动添加' },
        { id: '1', text: '自动添加' },
      ],
      planTyeList: [
        { id: '01', text: '大货' },
        { id: '02', text: '零单' },
      ],
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '90', title: '状态', field: 'Status' },
        { width: '120', title: '车间', field: 'DepartName' },
        { width: '110', title: '员工', field: 'Name' },
        { width: '110', title: '员工', field: 'Worker',visible:false },
        { width: '140', title: '月份', field: 'cMonth' },
        { width: '120', title: '出勤天数', field: 'WorkDays' },
        { width: '100', title: '计件工资', field: 'PieceWage' },
        { width: '100', title: '实际工资', field: 'Wage' },
        { width: '140', title: '结算时间', field: 'CheckOutDate' },
        { width: '80', title: '结算人', field: 'CheckOutMan' },
        { title: '备注', field: 'Remark' },
      ],
      selectWageDate:'',
      selectWorker:'',
      selectId: '',
      pickerOptionsStart: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              _sel.model.endDate = _sel.$moment().format('YYYY-MM-DD')
              picker.$emit('pick', _sel.$moment().format('YYYY-MM-DD'))
            },
          },
          {
            text: '本周',
            onClick(picker) {
              _sel.model.endDate = _sel
                .$moment()
                .endOf('week')
                .format('YYYY-MM-DD')
              picker.$emit(
                'pick',
                _sel.$moment().startOf('week').format('YYYY-MM-DD')
              )
            },
          },
          {
            text: '本月',
            onClick(picker) {
              _sel.model.endDate = _sel
                .$moment()
                .endOf('month')
                .format('YYYY-MM-DD')
              picker.$emit(
                'pick',
                _sel.$moment().startOf('month').format('YYYY-MM-DD')
              )
            },
          },
          {
            text: '上月',
            onClick(picker) {
              _sel.model.endDate = _sel
                .$moment()
                .endOf('month')
                .add(-1, 'months')
                .format('YYYY-MM-DD')
              picker.$emit(
                'pick',
                _sel
                  .$moment()
                  .startOf('month')
                  .add(-1, 'months')
                  .format('YYYY-MM-DD')
              )
            },
          },
        ],
      },
    }
  },
  methods: {
    //获取人员
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
    addDepart() {
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
    ReportOkDialog(){
       this.query()
    },
    // 获取工艺
    addCraftsListss() {
      this.$api.CardManage.GetCraftsList()
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            console.log(res)
            return res.data
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
    //导出
    exportexcel() {
      this.$refs.grid.exportexcel()
    },
    //工资导入
    wageimport() {
      this.$refs.WorkWageImport.showDialog = true
    },
    wageokDialog(){
      this.query()
    },
    //提交审批
    approvalWage(){
       var data = []
      data.push(...this.$refs.grid.getCheckRow())
      if (data.length == 0) {
        this.$message({
          message: '请选择数据后操作!',
          type: 'error',
        })
      } else {
        var keys = []
        var ID = ''
        data.forEach(item=>{
          ID += item.WageNo + '◆'
        })
        ID = ID.substring(0, ID.length - 1);
        this.showReportDialog = true
        this.$nextTick(() => {
          this.$refs.ReportApproval.formInfo.ObjectCode = '8510'
          this.$refs.ReportApproval.formInfo.Key = ID
          this.$refs.ReportApproval.showDialog = true
        })
      }
    },
    //撤回审批
    cancelApprovalWage(){
      let row = this.$refs.grid.getCheckRow()
      if (row == null || row.length == 0) {
        this.$message({
          message: '请选择一条数据',
          type: 'error',
        })
        return
      } else {
        this.$confirm(
          '此操作将撤回选中的' + row.length + '条工资结算单,需要继续撤回审批么?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
          }
        ).then(() => {
          let data = []
          row.forEach((item) => {
            data.push(item.WageNo)
          })
          this.$api.CardManage.CancelApprovalWage({list: data})
            .then((res) => {
              if (!res.isSucceed) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                
              }
            })
            .catch((err) => console.log(err))
        })
      }
    },
    //查看明细()
    wagedetial(){
 let row = this.$refs.grid.getCheckRow()
      if (row == null || row.length != 1) {
        this.$message({
          message: '请选择一条数据',
          type: 'error',
        })
        return
      }
      else
      {
        this.selectWorker = row[0].Worker
        this.selectWageDate = row[0].cMonth + '-01'
        this.$refs.WorkWageDetial.showDialog = true
      }
    },
    //
    deletewage() {
      let row = this.$refs.grid.getCheckRow()
      if (row == null || row.length == 0) {
        this.$message({
          message: '请选择一条数据',
          type: 'error',
        })
        return
      } else {
        this.$confirm(
          '此操作将删除选中的' + row.length + '条工资结算单,需要继续删除么?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
          }
        ).then(() => {
          let data = []
          row.forEach((item) => {
            data.push(item.WageNo)
          })
          this.$api.CardManage.DeleteWage({list: data})
            .then((res) => {
              if (!res.isSucceed) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                })
                this.query()
              }
            })
            .catch((err) => console.log(err))
        })
      }
    },
    query() {
      this.$refs.grid.query()
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
    this.$nextTick(() => {
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
  margin-left: 10px;
}
.el-pagination {
  float: right;
  padding-top: 10px;
  padding-right: 20px;
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