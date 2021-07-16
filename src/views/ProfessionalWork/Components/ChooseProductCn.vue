<template>
  <div>
  <!-- <el-dialog
    :title="dialogTitle"
    append-to-body
    :close-on-click-modal="false"
    class="dialog-component"
    :visible.sync="showDialog"
    width="1200px"
    @open="openDialog"
    @close="closeDialog(0)"
  > -->
    <el-container>
      <el-row style="width: 100%">
        <!-- 输入框 -->
        <el-col>
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
                     <el-col :span="5">
                      <el-form-item prop="Shop" label="站点：">
                        <el-select v-model="formInfo.shopId" placeholder="站点">
                          <el-option
                            :key="index"
                            v-for="(item, index) in shopList"
                            :label="item.Name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="产品名称/代码:" >
                        <el-input
                          v-model="formInfo.StrProduct"
                          placeholder="发货申请单号"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item prop="contractCode" label="色号/颜色：">
                        <el-input
                          v-model="formInfo.Color"
                          placeholder="货件编号"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item prop="contractCode" label="尺寸：">
                        <el-input
                          v-model="formInfo.P_Spec"
                          placeholder="货件名称"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2">
                      <el-button
                        type="warning"
                        size="mini"
                        icon="iconfont kt-icon-sousuo_o"
                        style="float: right"
                        @click="queryProduct()"
                        >查询</el-button
                      >
                    </el-col>
                  </el-row>
                </el-form>
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
              :height="500"
              @cell-dblclick="showBottomTable"
              @checkbox-all="onAdjustmentCheckboxAllChange"
              @checkbox-change="onAdjustmentCheckboxChange"
              highlight-current-row
              :config="{ render: 'scroll' }"
              :align="'center'"
              :checkbox-config="{ highlight: true, range: true }"
              :data="bindData"
              ref="grid"
            >
              <vxe-table-column width="40" type="checkbox"></vxe-table-column>
              <vxe-table-column
                width="50"
                type="seq"
                title="序号"
              ></vxe-table-column>
              <vxe-table-column
                width="200"
                :field="'产品号'"
                title="产品号"
              ></vxe-table-column>
              <vxe-table-column
                :field="'产品名称'"
                title="产品名称"
              ></vxe-table-column>
              <vxe-table-column
                width="100"
                :field="'样式'"
                title="样式"
              ></vxe-table-column>
              <vxe-table-column
                width="60"
                :field="'色号'"
                title="色号"
              ></vxe-table-column>
              <vxe-table-column
                width="60"
                :field="'颜色'"
                title="颜色"
              ></vxe-table-column>
              <vxe-table-column
                width="60"
                :field="'尺寸'"
                title="尺寸"
              ></vxe-table-column>
              <vxe-table-column
                width="60"
                :field="'尺寸单位'"
                title="尺寸单位"
              ></vxe-table-column>
              <vxe-table-column
                width="60"
                :field="'每包片数'"
                title="每包片数"
              ></vxe-table-column>
              <vxe-table-column
                width="60"
                :field="'系数'"
                title="系数"
              ></vxe-table-column>
              <vxe-table-column
                width="80"
                :field="'备注'"
                title="备注"
              ></vxe-table-column>
            </vxe-table>
          </el-card>
        </el-col>
      </el-row>
    </el-container>

    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <el-button type="primary" size="mini" @click="okDialog()">确定</el-button>
          <el-button type="primary" size="mini" @click="closeDialog()">取消</el-button>
        </el-col>
      </el-row>
    </span>
  </div>
  <!-- </el-dialog> -->
</template>
 
<script>
export default {
  data() {
    return {
      dialogTitle: '选择产品',
      showDialog: false,
      shopList: [],
      loading:false,
      formInfo: {
          shopId: '',
        StrProduct: '', // 产品编码
        p_Spec: '', // 规格
        color: '', // 颜色
        contractNo: '',
        type: '',
        aType: '',
        planNo: '',
        isCpcg: '',
      },
      //绑定到表格数据
      bindData: [],
      //过滤的数据
      filterData: [],
    }
  },
  methods: {
    //初始化
    openDialog() {
      this.queryProduct()
    },
    // 关闭弹框
    closeDialog(flag) {
      this.formInfo = {
        shopId: '',
        StrProduct: '', // 产品编码
        p_Spec: '', // 规格
        color: '', // 颜色
        contractNo: '',
        type: '',
        aType: '',
        planNo: '',
        isCpcg: '',
      }
      this.showDialog = false
      this.filterData = []
      this.bindData = []
      this.$emit('closeDialog', flag)
    },
    // 获取站点列表
    addProductState() {
      this.$api.publicApi
        .basShop()
        .then((res) => {
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.shopList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    //选择完数据
    okDialog() {
      let data = []
      data.push(...this.$refs.grid.getCheckboxRecords())
      this.$emit('modifyTextOpen', {data})
      this.showDialog = false;
    },
    showBottomTable() {},
    onAdjustmentCheckboxAllChange() {},
    onAdjustmentCheckboxChange() {},
    //查询数据
    queryProduct() {
      this.loading = true
      this.$api.business
        .ChooseProduct({ model: { ...this.formInfo } })
        .then((res) => {
          this.loading = false
          if (res.Code < 0) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.bindData = res.data
            //过滤产品
            if (this.filterData.length > 0) {
              let self = this
              this.bindData = this.bindData.filter(function (item) {
                let b = true
                self.filterData.forEach(function (sitem) {
                  if (item.产品号 === sitem.产品号) {
                    b = false
                    return
                  }
                })
                return b
              })
              this.gridData = res.data
            }
          }
        })
        .catch((err) => this.loading = false)
    },
  },
  created() {
    this.addProductState();
    this.queryProduct();
  },
}
</script>
 
<style scoped lang="scss">
.el-select{
    width: 100% ;
}
</style>
