<!--
     流转卡拆分
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
                    <!-- 文本域 -->
                    <el-form-item label="流转卡号:">
                      <el-input v-model="formInfo.CardNo" readonly></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item prop="ProduceQuantity" label="订单号:">
                      <el-input v-model="formInfo.PlanNo" readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="ProPrice" label="品名:">
                      <el-input
                        v-model="formInfo.ProductName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="计划数量:">
                      <el-input
                        v-model="formInfo.PlanQuantity"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="已拆分数量:">
                      <el-input
                        v-model="formInfo.SplitQuantity"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="子卡开始工序:">
                      <el-select v-model="formInfo.CraftsId">
                        <el-option
                          :key="index"
                          v-for="(item, index) in routing"
                          :label="item.CraftsName"
                          :value="item.Num"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="子卡个数:">
                      <el-input
                        v-model="formInfo.childCount"
                        placeholder="输入产品名称"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="每卡数量:">
                      <el-input v-model="formInfo.CardPerQuantity"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="卡数:">
                      <el-input v-model="formInfo.CardNum"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="打印:">
                      <el-checkbox v-model="isPrint"></el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="打印模板:">
                      <el-select v-model="LableNo">
                        <el-option
                          :key="index"
                          v-for="(item, index) in labelList"
                          :label="item.Name"
                          :value="item.LableNo"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
          </el-row>
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
    <print-dialog ref="print"> </print-dialog>
  </el-dialog>
</template>
<script>
import PrintDialog from '@/components/PrintDialog'
export default {
  components: { PrintDialog },
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
            if (this.showDialog) {
              this.init()
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
      isPrint: false,
      LableNo: '',
      labelList: [],
      craftsList: [],
      routing: [],
      planTypeList: [
        { id: 0, text: '大货' },
        { id: 1, text: '零单' },
      ],
      formInfo: {},
      workList: [],
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
      this.query(this.id)
      this.addRout(this.id)
      this.addLabel()
    },
    //点击保存
    okDialog() {
      var data = {
        sCardNo: this.formInfo.CardNo,
        Num: this.formInfo.CraftsId,
        Quantity: this.formInfo.CardPerQuantity,
        KNum: this.formInfo.CardNum,
      }
      this.$api.CardManage.TrnCardAddSplit({ model: data })
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              message: '拆分成功',
              type: 'success',
            })
            if (this.isPrint) {
              let data = []
              res.data.forEach((item) => {
                data.push({
                  ID: item,
                })
              })
              this.$refs.print.printDll({
                LableNo: this.LableNo,
                ID: data,
                Count: 1,
              })
            }

            this.closeDialog()
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
    //获取流转卡模板
    addLabel() {
      this.$api.CardManage.GetLabelList()
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.labelList = res.data
            if (res.data && res.data.length > 0) {
              this.LableNo = res.data[0].LableNo
            }
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
    addRout(id) {
      this.$api.CardManage.GetCardRoutingBySplit({ id: id })
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.routing = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    query(id) {
      this.$api.CardManage.GetCardEntityBySplit({ id: id })
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.formInfo = res.data[0]
            this.formInfo.SplitQuantity = this.formInfo.SplitQuantity || 0
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
