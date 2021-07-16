<template>
  <el-dialog
    :title="dialogTitle"
    append-to-body
    :close-on-click-modal="false"
    class="dialog-component"
    :visible.sync="showDialog"
    width="700px"
    @open="openDialog()"
    @close="closeDialog(0)"
  >
    <el-container v-loading="loading">
      <el-row style="width: 100%">
        <!-- 输入框 -->
        <el-col>
          <el-card>
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
                    <el-col :span="24">
                      <el-form-item label="备注:">
                        <el-input
                          v-model="formInfo.Remark"
                          type="textarea"
                          :rows="2"
                          placeholder="请输入备注信息"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="审批人">
                        <el-select
                          disabled
                          v-model="formInfo.Person"
                          placeholder="审批人"
                        >
                          <el-option
                            :key="index"
                            v-for="(item, index) in reporterList"
                            :label="item.Name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
              <!-- 按钮区域 -->
            </el-row>
            <el-row>
              <el-col align="middle">
                <el-button type="primary" size="small" @click="ObjectUpLoad()"
                  >确定报批</el-button
                >
                <el-button type="primary" size="small" @click="ObjectRepeal()">撤回报批</el-button>
                <el-button type="primary" size="small" @click="ApplyCancel()">取消审批</el-button>
                <el-button type="primary" size="small" @click="closeDialog()">退出</el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <!-- 主表区域 -->
        <el-col class="mainTable">
          <el-card style="margin-top：11px">
            <vxe-table
              border
              resizable
              stripe
              width="auto"
              show-footer
              :auto-resize="true"
              v-loading="loading"
              show-overflow="title"
              :height="150"
              highlight-current-row
              :config="{ render: 'scroll' }"
              :align="'center'"
              :checkbox-config="{ highlight: true, range: true }"
              :data="reporterList"
              ref="grid"
            >
              <vxe-table-column
                width="80"
                :field="'类型'"
                title="操作类型"
              ></vxe-table-column>
              <vxe-table-column
                width="140"
                :field="'操作时间'"
                title="操作时间"
              ></vxe-table-column>
              <vxe-table-column
                width="100"
                :field="'操作人'"
                title="操作人"
              ></vxe-table-column>
              <vxe-table-column
                :field="'操作说明'"
                title="审批意见"
              ></vxe-table-column>
            </vxe-table>
          </el-card>
        </el-col>
      </el-row>
    </el-container>
  </el-dialog>
</template>
 
<script>
export default {
  data() {
    return {
      dialogTitle: '报批',
      showDialog: false,
      reporterList: [],
      loading: false,
      formInfo: {},
    }
  },
  methods: {
    //初始化
    openDialog() {
        this.query()
    },
    // 关闭弹框
    closeDialog(flag) {
      this.formInfo = {}
      this.$emit('closeDialog', flag)
      this.showDialog = false
    },
    //审批通过
    ObjectUpLoad() {
      this.loading = true
      this.$api.reportApproval
        .ObjectUpLoad({ model: { ...this.formInfo } })
        .then((res) => {
          this.loading = false
          if (res.statusCode != 200) {
            this.$alert({
              message: res.message,
            })
          } else {
            this.$message({
              message: res.data,
              type: 'success',
            })
            this.showDialog = false
            this.$emit('okDialog')
          }
        })
        .catch((err) => (this.loading = false))
    },
    //撤回报批
    ObjectRepeal(){
      this.loading = true
      this.$api.reportApproval
        .ObjectRepeal({ model: { ...this.formInfo } })
        .then((res) => {
          this.loading = false
          if (res.statusCode != 200) {
            this.$alert({
              message: res.message,
            })
          } else {
            this.$message({
              message: res.data,
              type: 'success',
            })
            this.showDialog = false
            this.$emit('okDialog')
          }
        })
        .catch((err) => (this.loading = false))
    },
    //取消审批
    ApplyCancel(){
      if(!this.formInfo.Remark || !this.formInfo.Remark.trim())
      {
        this.$message({
              type: 'warning',
              message: '取消报批需要在备注中填写原因'
            });
            return;
      }
      this.formInfo.StrRemark = this.formInfo.Remark
      this.loading = true
      this.$api.reportApproval
        .ApplyCancel({ model: { ...this.formInfo } })
        .then((res) => {
          this.loading = false
          if (res.statusCode != 200) {
            this.$alert({
              message: res.message,
            })
          } else {
            this.$message({
              message: res.data,
              type: 'success',
            })
            this.showDialog = false
            this.$emit('okDialog')
          }
        })
        .catch((err) => (this.loading = false))
    },

    //查询数据
    query() {
      this.loading = true
      this.formInfo.KeyValue = this.formInfo.Key
      this.$api.reportApproval
        .GetReportList({ model: { ...this.formInfo } })
        .then((res) => {
          this.loading = false
          if (res.statusCode != 200) {
            this.$alert({
              message: res.message,
            })
          } else {
             this.reporterList = res.data
          }
        })
        .catch((err) => (this.loading = false))
    },
  },
  created() {
    
  },
}
</script>
 
<style scoped lang="scss">
</style>
