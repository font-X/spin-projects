<!--
     手动添加产量
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
                :rules="rules"
              >
                <el-row>
                  <el-col :span="12">
                    <!-- 文本域 -->
                    <el-form-item prop="Worker" label="员工：">
                      <el-select
                        v-model="formInfo.Worker"
                        filterable
                        placeholder="请选择"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in workList"
                          :label="item.Name"
                          :value="item.UserCode"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="FinishTime" label="完工时间">
                      <el-date-picker
                        v-model="formInfo.FinishTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item prop="ProduceQuantity" label="生产数量:">
                      <el-input v-model="formInfo.ProduceQuantity"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="ProPrice" label="单价：">
                      <el-input v-model="formInfo.ProPrice"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="合格数量:">
                      <el-input v-model="formInfo.Qualified"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="不良品数：">
                      <el-input
                        v-model="formInfo.Defective"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="类型:">
                      <el-select v-model="formInfo.PlanType" clearable>
                        <el-option
                          :key="index"
                          v-for="(item, index) in planTypeList"
                          :label="item.text"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="产品：">
                      <el-input
                        v-model="formInfo.ProductName"
                        placeholder="输入产品名称"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="工艺:">
                      <el-select v-model="formInfo.CraftsCode" clearable>
                        <el-option
                          :key="index"
                          v-for="(item, index) in craftsList"
                          :label="item.CraftsName"
                          :value="item.CraftsCode"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col style="height: 60px">
                    <!-- 文本域 -->
                    <el-form-item label="备注：">
                      <el-input
                        v-model="formInfo.Remark"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入备注信息"
                      >
                      </el-input>
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
  </el-dialog>
</template>
<script>
import ChooseProductInfo from '@/views/Components/Chooses/ChooseProductInfo'
export default {
  components: { ChooseProductInfo },
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
            this.addworklist()
            this.addCraftsList()
            if (this.id) {
              this.query(this.id)
            }
          })
        }
      },
    },
    'formInfo.ProduceQuantity': {
      handler(newval) {
        this.formInfo.Qualified =
          this.formInfo.ProduceQuantity - this.formInfo.Defective
      },
      immediate: true,
    },
    'formInfo.Qualified': {
      handler(newval) {
        this.formInfo.Defective =
          this.formInfo.ProduceQuantity - this.formInfo.Qualified
      },
      immediate: true,
    },
  },
  data() {
    return {
      dialogTitle: '添加',
      showDialog: false,
      loading: false,
      craftsList: [],
      planTypeList: [
        { id: 0, text: '大货' },
        { id: 1, text: '零单' },
      ],
      formInfo: {
        Worker: null,
        FinishTime: null,
        ProduceQuantity: 0,
        Remark: null,
        ProPrice: null,
        Qualified: 0,
        Defective: 0,
        ProductName: null,
        CraftsCode:null,
      },
      workList: [],
      addRules: {},
      rules: {
        Worker: [{ required: true, message: '员工不能为空', trigger: 'blur' }],
        ProduceQuantity: [
          { required: true, message: '生产数量不能为空', trigger: 'blur' },
        ],
        FinishTime: [
          { required: true, message: '完工时间不能为空', trigger: 'blur' },
        ],
        ProPrice: [
          { required: true, message: '单价不能为空', trigger: 'blur' },
        ],
      },
      validRules: {
        Packages: [
          { required: true, message: '箱数必须填写' },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值不能为负数',
          },
        ],
      },
    }
  },
  methods: {
    // 关闭弹框
    closeDialog(flag) {
      Object.assign(this.$data.formInfo, this.$options.data().formInfo)
      this.showDialog = false
      this.$emit('closeDialog', flag)
    },
    //点击保存
    okDialog() {
      this.$api.CardManage.SaveWorkList({ info: this.formInfo })
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
    query(id) {
      this.$api.CardManage.GetWorkListEntity({ id: id })
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
