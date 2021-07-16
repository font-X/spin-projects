<!--
    /**
       选择流转卡工艺
     */
-->
<template>
  <el-dialog
    :title="dialogTitle"
    append-to-body
    :close-on-click-modal="false"
    class="dialog-component"
    :visible.sync="showDialog"
    width="1200px"
    @close="closeDialog(0)"
  >
    <el-container>
      <el-row style="width: 100%">
        <!-- 输入框 -->
        <el-card class="cardMargin">
          <el-row>
            <el-col>
              <el-form
                ref="addForm"
                :model="formInfo"
                style="font-size：14px"
                label-width="108px"
                size="mini"
              >
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="工艺名称:">
                      <el-input v-model="formInfo.Product"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-button
                      type="warning"
                      size="mini"
                      icon="iconfont kt-icon-sousuo_o"
                      class="formbtn"
                      @click="query()"
                      >查询</el-button
                    >
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <jy-page-table
              :columns="columns"
              :multiple="multiple"
              ref="grid"
              :showfooter = "false"
              :isPage ="false"
              :action="'/Bas_CraftsRouting/GetRoutingDetailList'"
              :height="400"
              :querModel="formInfo"
            ></jy-page-table>
          </el-row>
        </el-card>
      </el-row>
    </el-container>

    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <el-button type="primary" size="mini" @click="closeDialog()"
            >取消</el-button
          >
          <el-button type="primary" size="mini" @click="okDialog()"
            >确定</el-button
          >
        </el-col>
      </el-row>
    </span>
  </el-dialog>
</template>
 
<script>
import JyPageTable from '../../../components/JyPageTable'
export default {
  components: { JyPageTable },
  watch: {},
  props: {
    multiple: {
      //是否多选
      type: Boolean,
      default() {
        return false
      },
    },
  },
  data() {
    return {
      dialogTitle: '选择工艺',
      showDialog: false,
      loading: false,
      formInfo: {
        Name: '', //工艺名称
      },
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '40', title: '序号' },
        { width: '100', title: '工艺号', field: 'RoutingNo' },
        { width: '150', title: '工艺名称', field: 'Name' },
        { width: '400', title: '工艺流程', field: 'Routing' },
        { width: '250', title: '公司', field: 'CompanyName' },
        { width: '120', title: '总耗时(小时)', field: 'Consuming' },
        { width: '120', title: '备注', field: 'Remark' },
      ],
    }
  },
  methods: {
    // 关闭弹框
    closeDialog(flag) {
      Object.assign(this.$data, this.$options.data())
      this.showDialog = false
      this.$emit('closeDialog', flag)
    },
    query() {
      this.$refs.grid.query()
    },
    //选择完数据
    okDialog() {
      let data = this.$refs.grid.getCheckRow()
      this.$emit('okDialog', data)
      this.showDialog = false
    },
  },
  created() {
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
.vxe-grid {
  margin-top: 10px;
}
.formbtn .el-button {
  margin-right: 20;
  float: right;
}
.el-pagination {
  float: right;
  padding-top: 10px;
  padding-right: 20px;
}
</style>
