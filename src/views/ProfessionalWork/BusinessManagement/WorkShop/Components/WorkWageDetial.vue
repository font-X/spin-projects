<!--
     工资单明细
-->
<template>
  <el-dialog
    v-if="showDialog"
    :visible.sync="showDialog"
    :title="dialogTitle"
    append-to-body
    :close-on-click-modal="false"
    class="dialog-component"
    width="1550px"
    @close="closeDialog(0)"
  >
    <el-row style="width: 100%">
      <el-card class="cardMargin" v-loading="loading">
        <el-row>
          <el-col>
            <el-form
              ref="addForm"
              style="font-size：14px"
              label-width="124px"
              size="mini"
            >
              <el-row>
                <el-col :span="6">
                  <el-form-item label="选择模式:">
                    <el-select v-model="model.Type">
                      <el-option
                        :key="index"
                        v-for="(item, index) in modelList"
                        :label="item.Name"
                        :value="item.Id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                 <el-col :span="1">
                    <el-form-item >
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                   <el-button type="primary" size="mini" @click="exprot()"
            >导出</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
        <!-- 主表区域 -->
        <el-row>
          <jy-page-table
            :columns="columns"
            :multiple="false"
            ref="grid"
            :action="'/WsTrnCardWorkList/GetWorkerClDetailPage'"
            :height="gridHeight"
            :isPage = "isPage"
            :querModel="model"
          >
          </jy-page-table>
        </el-row>
      </el-card>
    </el-row>
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
  </el-dialog>
</template>
<script>
import JyPageTable from '@/components/JyPageTable'
export default {
  components: { JyPageTable },
  props: {
    Worker: {
      type: String,
      default: '',
    },
    WageDate: {
      type: String,
      default: '1900-01-01',
    },
  },
  watch: {
    showDialog: {
      handler(newval) {
        if (newval) {
          this.$nextTick(() => {
            if (this.showDialog) {
              this.model = {
                Type: 1,
              }
              this.columns = this.columns1
              this.init()
            } 
          })
        }
      },
    },
    'model.Type': {
      handler(newval) {
        this.$nextTick(() => {
          if (newval == 1) {
            this.columns = this.columns1
          } else if (newval == 2) {
            this.columns = this.columns2
            this.isPage = true
          } else {
            this.columns = this.columns0
             this.isPage = true
          }
          this.query()
        })
      },
    },
  },
  data() {
    return {
      dialogTitle: '查看明细',
      showDialog: false,
      isPage:false,
      loading: false,
      model: {
        Type: 1,
      },
      gridHeight: 500,
      columns: [],
      columns0: [
        { type: 'seq', width: '60', title: '序号' },
        { width: '120', title: '流转卡号', field: 'CardNo' },
        { width: '280', title: '产品号', field: 'ProductNo' },
        { width: '300', title: '产品名称', field: 'ProductName' },
        { width: '120', title: '工序', field: 'CraftsName' },
        { width: '120', title: '样式', field: 'StyleNoName' },
        { width: '80', title: '尺寸', field: 'chnSpec' },
        { width: '80', title: '颜色', field: 'Color' },
        { width: '80', title: '生产数', field: 'ProduceQuantity' },
        { width: '80', title: '不良品数', field: 'Defective' },
        { width: '80', title: '检验合格数', field: 'JyQualified' },
        { width: '80', title: '工价', field: 'ProPrice' },
        { width: '80', title: '工资', field: 'Wages' },
        { width: '150', title: '完工时间', field: 'FinishTime' },
        { width: '90', title: '作业单号', field: 'ListNo' },
      ],
      columns1: [
        { type: 'seq', width: '60', title: '序号' },
        { width: '280', title: '产品号', field: 'ProductNo' },
        { width: '300', title: '产品名称', field: 'ProductName' },
        { width: '120', title: '工序', field: 'CraftsName' },
        { width: '120', title: '样式', field: 'Style' },
        { width: '80', title: '尺寸', field: 'Size' },
        { width: '80', title: '颜色', field: 'Color' },
        { width: '80', title: '生产数', field: 'ProduceQuantity' },
        { width: '80', title: '不良品数', field: 'Defective' },
        { width: '80', title: '检验合格数', field: 'JyQuantity' },
        { width: '80', title: '单价', field: 'Price' },
        { width: '80', title: '工资', field: 'Wages' },
      ],
      columns2: [
         { type: 'seq', width: '60', title: '序号' },
        { width: '280', title: '日期', field: 'Date' },
        { width: '120', title: '工序', field: 'CraftsName' },
        { width: '80', title: '生产数', field: 'ProduceQuantity' },
        { width: '80', title: '不良品数', field: 'Defective' },
        { width: '80', title: '检验合格数', field: 'JyQuantity' },
      ],
      modelList: [
        { Id: 1, Name: '按产品' },
        { Id: 0, Name: '明细' },
        { Id: 2, Name: '按日期' },
      ],
    }
  },
  methods: {
    // 关闭弹框
    closeDialog(flag) {
      this.showDialog = false
      this.$emit('closeDialog', flag)
    },
    init() {
      this.model.Worker = this.Worker
      this.model.WageDate = this.WageDate
    },
    query() {
      this.$refs.grid.query()
    },
    //点击保存
    okDialog() {
      this.closeDialog()
    },
    exprot(){
        this.$refs.grid.exportexcel()
    },
  },
  created() {},
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
</style>
