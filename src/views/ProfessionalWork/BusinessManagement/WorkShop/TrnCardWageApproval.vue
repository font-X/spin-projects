<!--
   工资审批管理
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
          <!-- <el-col :span="4">
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
          </el-col> -->
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
    </el-row>
    <!-- 主表区域 -->
    <el-row>
      <vxe-table
        resizable
        :tree-config="{ children: 'Children' }"
        :data="gridData"
        :checkbox-config="{ labelField: 'id', highlight: true }"
        @checkbox-change="selectChangeEvent"
      >
        <vxe-table-column
          type="checkbox"
          title="ID"
          width="280"
          tree-node
        ></vxe-table-column>
        <vxe-table-column field="DepartName" title="车间"></vxe-table-column>
        <vxe-table-column field="WageDate" title="月份"></vxe-table-column>
        <vxe-table-column field="WorkerName" title="员工"></vxe-table-column>
        <vxe-table-column field="PieceWage" title="计件工资"></vxe-table-column>
        <vxe-table-column field="Wage" title="实际工资"></vxe-table-column>
        <vxe-table-column
          field="CheckOutDate"
          title="结算时间"
        ></vxe-table-column>
      </vxe-table>
    </el-row>
    <work-wage-import
      ref="WorkWageImport"
      @okDialog="wageokDialog"
    ></work-wage-import>
  </el-card>
</template>
<script>
import JyPageTable from '../../../../components/JyPageTable'
import WorkWageImport from './WorkWageImport'
export default {
  components: { JyPageTable, WorkWageImport },
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
      wokerList: [],
      craftsList: [],
      statusList: [],
      gridData:[],
      columns: [
      ],
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
    selectChangeEvent(){},
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
    wageokDialog() {
      this.query()
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
          this.$api.CardManage.DeleteWage({ list: data })
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
      this.$api.CardManage.GetApprovalWageList({model:this.model})
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.gridData = res.data
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
  },
  created() {
    this.$nextTick(() => {
      this.addWorks()
      this.query()
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