<!--
   产品产量表
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
            <el-col :span="6">
              <el-form-item label="产品编号：">
                <el-input v-model="model.ProductNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品名称：">
                <el-input v-model="model.ProductName"></el-input>
              </el-form-item>
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
          :action="'/WsTrnCardWorkList/GetTrnProductPageList'"
          :height="gridHeight"
          :querModel="model"
        >
        </jy-page-table>
      </el-row>
    </el-card>
</template>
<script>
import JyPageTable from '../../../../components/JyPageTable'
export default {
  components: { JyPageTable },
  data() {
    var _sel = this
    return {
      gridHeight: 600,
      model: {
        beginDate: _sel.$moment().startOf('month').format('YYYY-MM-DD'),
        endDate: _sel.$moment().endOf('month').format('YYYY-MM-DD'),
        Worker: null,
      },
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号',sortable:true },
        { width: '280', title: '产品号', field: 'ProductNo' ,sortable:true},
        { width: '340', title: '产品名称', field: 'ProductName' ,sortable:true},
        { width: '120', title: '样式', field: 'Style',sortable:true },
        { width: '100', title: '尺寸', field: 'Size',sortable:true },
        { width: '100', title: '颜色', field: 'Color' ,sortable:true},
        { width: '100', title: '开卡数', field: 'PlanQuantity' ,sortable:true},
        { width: '120', title: '不良品数', field: 'Defective' ,sortable:true},
        { width: '100', title: '生产数', field: 'ProduceQuantity',sortable:true },
        { minWidth: '160', title: '最近完工时间', field: 'FinishTime' ,sortable:true },
      ],
      pickerOptionsStart: {
        shortcuts: [
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