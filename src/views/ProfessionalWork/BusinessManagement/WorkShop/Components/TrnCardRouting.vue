<!--
   流转卡重置工艺管理页面
-->
<template>
  <el-dialog
    v-if="showDialog"
    :visible.sync="showDialog"
    :title="dialogTitle"
    append-to-body
    :close-on-click-modal="false"
    class="dialog-component"
    width="800px"
    @close="closeDialog(0)"
  >
    <el-container v-loading="loading">
      <el-row style="width: 100%">
        <el-card class="cardMargin">
          <el-row>
            <el-col>
              <el-form
                ref="addForm"
                :model="formInfo"
                style="font-size：14px"
                label-width="124px"
                size="mini"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="流转卡号:">
                      <el-input
                        type="textarea"
                        v-model="formInfo.cardStr"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="当前工艺:">
                      <el-select
                        v-model="formInfo.currRoutNo"
                        clearable
                        disabled
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in routlist"
                          :label="item.Name"
                          :value="item.RoutingNo"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="替换工艺:">
                      <el-select
                        v-model="formInfo.changeRoutNO"
                        clearable
                        @change="routChange"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in routlist"
                          :label="item.Name"
                          :value="item.RoutingNo"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-input
                    type="textarea"
                    v-model="formInfo.msg"
                    readonly
                  ></el-input>
                </el-row>
              </el-form>
            </el-col>
          </el-row>
          <el-row> </el-row>
          <el-row> </el-row>
        </el-card>
      </el-row>
    </el-container>
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
    ids: {
      type: Array,
      default() {
        return []
      },
    },
  },
  watch: {
    showDialog: {
      handler(newval) {
        if (newval) {
          this.$nextTick(() => {
            if (this.showDialog) {
              this.init()
              var data = []
              this.ids.forEach((item) => {
                data.push(item.trim())
              })
              this.formInfo.cardStr = data.toString()
            }
          })
        }
      },
    },
  },
  data() {
    return {
      dialogTitle: '添加',
      showDialog: false,
      loading: false,
      formInfo: {
        cardStr: '',
        currRoutNo: '',
        msg: '',
        changeRoutNO: '',
      },
      gridHeight: 260,
      routlist: [],

      columns: [
        { type: 'seq', width: '60', title: '序号' },
        { title: '工序名称', field: 'CraftsName' },
        { width: '180', title: '完工日期', field: 'FinishTime' },
        { width: '180', title: '完工人员', field: 'WorkerName' },
      ],
    }
  },
  methods: {
    // 关闭弹框
    closeDialog(flag) {
      Object.assign(this.$data.formInfo, this.$options.data().formInfo)
      this.showDialog = false
      this.$emit('closeDialog', flag)
    },
    init() {
      this.addRoutingList()
      this.getCurrRout(this.ids)
    },
    //点击保存
    okDialog() {
      this.$api.CardManage.RoutChange({
        ids: this.ids,
        routNo: this.formInfo.changeRoutNO,
      })
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
             this.$message({
              message: '变更成功',
              type: 'success',
            })
            this.closeDialog()
          }
        })
        .catch((err) => console.log(err))
    },

    addRoutingList() {
      this.$api.CardManage.GetBasRoutingList()
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.routlist = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    //工艺变更
    routChange() {
      console.log(123)
      this.$api.CardManage.RoutChangeCheck({
        ids: this.ids,
        routNo: this.formInfo.changeRoutNO,
      })
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.formInfo.msg = res.data.Item2
          }
        })
        .catch((err) => console.log(err))
    },
    //当前工艺路由
    getCurrRout(ids) {
      //:action="'/WsTrnCard/GetCurrRouting'"
      this.$api.CardManage.GetCurrRouting({ ids: ids })
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.formInfo.currRoutNo = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    query(id) {
      this.$api.CardManage.GetTableCardInfoBycardNo({ cardNo: id })
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.formInfo = res.data
          }
        })
        .catch((err) => console.log(err))
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
