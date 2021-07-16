<!--
     工资导入
-->
<template>
  <el-dialog
    v-if="showDialog"
    :visible.sync="showDialog"
    :title="dialogTitle"
    append-to-body
    :close-on-click-modal="false"
    class="dialog-component"
    width="900px"
    @close="closeDialog(0)"
  >
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
            <el-col :span="8">
              <el-form-item label="导入日期：">
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
            <el-col :span="8">
              <el-form-item label="结算工序：">
                <el-select v-model="jscode" multiple placeholder="请选择">
                  <el-option
                    :key="index"
                    v-for="(item, index) in craftsList"
                    :label="item.CraftsName"
                    :value="item.CraftsCode"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <!-- 主表区域 -->
      <el-row>
        <div>
          <span class="checkMsg">{{ checkMsg }}</span>
        </div>
        <span class="sptitle">双击表格可以查看详细产量数据</span>
        <jy-page-table
          :columns="columns"
          :isPage="false"
          :multiple="true"
          ref="grid"
          :action="'/Ws_WorkerWage/GetImprotWageList'"
          :height="gridHeight"
          :querModel="model"
          @cell-dblclick="celldblclick"
        >
        </jy-page-table>
      </el-row>
    </el-card>
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <el-button type="primary" size="mini" @click="okDialog()"
            >保存</el-button
          >
          <el-button type="primary" size="mini" @click="closeDialog()"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </span>
    <work-wage-detial
      ref="WorkWageDetial"
      :Worker="selectWorker"
      :WageDate="selectWageDate"
    >
    </work-wage-detial>
  </el-dialog>
</template>
<script>
import JyPageTable from '../../../../components/JyPageTable'
import WorkWageDetial from './Components/WorkWageDetial'
export default {
  components: { JyPageTable, WorkWageDetial },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  watch: {
    showDialog: {
      handler(newval) {
        if (newval) {
          this.$nextTick(() => {
            this.init()
          })
        }
      },
    },
  },
  data() {
    var _sel = this
    return {
      dialogTitle: '添加',
      showDialog: false,
      loading: false,
      gridHeight: 400,
      model: {
        WageDate: null,
      },
      selectWageDate: '',
      checkMsg: '',
      selectWorker: '',
      jscode: ['18        ', '20        '],
      craftsList: [],
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '120', title: '员工号', field: 'Worker' },
        { minWidth: '150', title: '部门', field: 'DepartName' },
        { width: '150', title: '员工', field: 'Name' },
        { width: '140', title: '工资', field: 'Wages' },
      ],
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
    init() {
      this.CheckImprotWageList()
    },
    // 关闭弹框
    closeDialog(flag) {
      this.showDialog = false
      this.$emit('closeDialog', flag)
    },
    //点击保存
    okDialog() {
      var data = this.$refs.grid.getCheckRow()
      this.$api.CardManage.ImprotWage({
        list: data,
      })
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              message: '保存成功',
              type: 'success',
            })
            this.$emit('okDialog')
            this.closeDialog()
          }
        })
        .catch((err) => console.log(err))
    },
    //
    query() {
      this.CheckImprotWageList()
      this.$refs.grid.query()
    },
    //
    celldblclick({ row }) {
      this.selectWorker = row.Worker
      this.selectWageDate = row.WageDate
      this.$refs.WorkWageDetial.showDialog = true
    },
    //检测是否可以结算
    CheckImprotWageList() {
      this.$api.CardManage.CheckImprotWageList({
        list: this.jscode,
        wage: this.model.WageDate,
      })
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            if (!!res.data) {
              this.checkMsg =
                '以下流转号在该月份仍有未检验完成的工序,不能结算工资(最多显示30条):' +
                res.data
            } else {
              this.checkMsg = null
            }
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
    //获取工人
    addworklist() {
      this.$api.CardManage.GetWorkList()
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.workList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
  },
  created() {
    this.addCraftsList()
  },
}
</script>
 
<style scoped lang="scss">
.el-date-editor {
  width: 100%;
}
.el-input {
  width: 100%;
}
.el-select {
  width: 100%;
}
.sptitle {
  font-size: 9px;
  color: goldenrod;
}
.checkMsg {
  font-size: 9px;
  color: crimson;
}
</style>
