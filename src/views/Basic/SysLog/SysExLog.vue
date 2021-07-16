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
              <el-form-item label="结束时间：">
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
              <el-form-item label="控制器：">
                <el-input v-model="model.Controller"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="方法:">
                <el-input v-model="model.Action"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="管理者:">
                <el-input v-model="model.PlanNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="4">
              <el-form-item label="主动异常:">
                <el-checkbox label="包含" v-model="model.GeEx"></el-checkbox>
              </el-form-item>
            </el-col>
          
            <el-col :span="20"></el-col>
            <el-col :span="4" class="formbtn">
              <el-button
                type="primary"
                size="mini"
                icon="iconfont kt-icon-sousuo_o"
                @click="query()"
                >查询</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <!-- 按钮区域 -->
      <el-row id="btnRow">
        <el-button type="primary" size="small" @click="detial">查看</el-button>
      </el-row>
      <!-- 主表区域 -->
      <el-row>
        <jy-page-table
          :columns="columns"
          :multiple="false"
          ref="grid"
          :action="'/SysLog/GetExLogPageList'"
          :height="gridHeight"
          :querModel="model"
        ></jy-page-table>
      </el-row>
    </el-card>
    <sys-ex-log-info ref="exinfo" :Id="selectId"></sys-ex-log-info>
  </el-container>
  <!-- 查询框 -->
</template>
<script>
import JyPageTable from '@/components/JyPageTable'
import SysExLogInfo from './SysExLogInfo.vue'
export default {
  components: { JyPageTable, SysExLogInfo },

  data() {
    return {
      gridHeight: 600,
      loading: false,
      model: {},
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '100', title: '区域', field: 'Area' },
        { width: '150', title: '控制器', field: 'Controller' },
        { width: '150', title: '方法', field: 'Action' },
        { width: '400', title: '参数', field: 'Parameter' },
        { width: '160', title: 'Ip地址', field: 'Ip' },
        { width: '100', title: '时间', field: 'Time' },
        { width: '80', title: '类别', field: 'Type' },
        { width: '120', title: '异常名称', field: 'ExTypeName' },
        { width: '480', title: '信息', field: 'Message' },
        { width: '180', title: 'api描述', field: 'ApiMemo' },
        { width: '180', title: '执行人', field: 'UserName' },
        { width: '180', title: '创建时间', field: 'CreateTime' },
      ],
      addRules: {},
      selectId: '',
    }
  },
  methods: {
    //判断是否选择一条数据
    isSelectOne() {
      var data = []
      data.push(...this.$refs.grid.getCheckboxRecords())
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
    query() {
      this.$refs.grid.query()
    },
    detial() {
      console.log(this.$refs.grid.getCheckRow())
      this.$refs.exinfo.showDialog = true
      this.selectId = this.$refs.grid.getCheckRow().Id
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
.el-date-editor {
  width: 100%;
}
.el-input {
  width: 100%;
}
.el-select {
  width: 100%;
}
.formbtn .el-button {
  float: right;
}
</style>