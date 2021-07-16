<!--
   员工产量表
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
              <el-form-item label="开始日期：">
                <el-date-picker
                  v-model="model.beginDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptionsStart"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="DeliveryDate" label="结束日期：">
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
              <!-- <el-button size="mini" type="primary" @click="exportexcel()"
                >导出</el-button
              >
              <el-button size="mini" type="primary" @click="query()"
                >查询</el-button
              > -->
            </el-col>
          </el-row>
        </el-form>
      </el-row>
       <el-row id="btnRow">
        <el-button type="primary" size="small" @click="query">查询</el-button>
        <el-button type="primary" size="small" @click="exportexcel">导出</el-button>
      </el-row>
      <!-- 主表区域 -->
      <el-row>
        <jy-page-table
          :columns="columns"
          :multiple="false"
          ref="grid"
          :action="'/WsTrnCard/GetTrnCardWorkOutPageList'"
          :height="gridHeight"
          :querModel="model"
        >
        </jy-page-table>
      </el-row>
    </el-card>
  </el-container>
</template>
<script>
import JyPageTable from '../../../../components/JyPageTable'
export default {
  components: { JyPageTable },
  watch: {
    'model.Worker': {
      handler(newval) {
        this.query()
      }
    },
  },

  data() {
    var _sel = this
    return {
      gridHeight: 600,
      model: {
        beginDate: _sel.$moment().startOf('month').format('YYYY-MM-DD'),
        endDate: _sel.$moment().endOf('month').format('YYYY-MM-DD'),
        Worker: null,
      },
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
        { width: '120', title: '流转卡号', field: 'CardNo' },
        { width: '90', title: '员工', field: 'WorkerName' },
        { width: '280', title: '产品号', field: 'ProductNo' },
        { width: '300', title: '产品名称', field: 'ProductName' },
        { width: '120', title: '工序', field: 'CraftsName' },
        { width: '120', title: '样式', field: 'StyleNoName' },
        { width: '80', title: '尺寸', field: 'chnSpec' },
        { width: '80', title: '颜色', field: 'Color' },
        { width: '80', title: '生产数', field: 'ProduceQuantity' },
        { width: '80', title: '合格数', field: 'Qualified' },
        { width: '80', title: '不良品数', field: 'Defective' },
        { width: '80', title: '检验合格数', field: 'JyQualified' },
        { width: '80', title: '工价', field: 'ProPrice' },
        { width: '80', title: '工资', field: 'Wages' },
        { width: '150', title: '完工时间', field: 'FinishTime' },
        { width: '90', title: '作业单号', field: 'ListNo' },
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
                .add(-1, 'months')
                .endOf('month')
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
    query() {
      this.$refs.grid.query()
    },
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        var btnRow = document.getElementById('btnRow').offsetHeight
        this.gridHeight = card - queryRow -btnRow
      })
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
>>>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
  margin-bottom: 8px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner,
.el-select {
  width: 100%;
}
</style>