<!--
    /**
       选择查看产品表
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
                  <el-col :span="6" v-if="this.type !='9'">
                    <el-form-item  label="站点：">
                      <el-select
                        v-model="formInfo.shopId"
                        clearable
                        placeholder="站点"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in shopList"
                          :label="item.Name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="产品名称/代码:">
                      <el-input v-model="formInfo.Product"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item prop="contractCode" label="色号/颜色：">
                      <el-input v-model="formInfo.Color"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item prop="contractCode" label="尺寸：">
                      <el-input v-model="formInfo.Spec"></el-input>
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
              :action="'/Product/GetProjectInfoPageList'"
              :height="500"
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
import JyDialog from '../../../components/JyDialog'
import JyPageTable from '../../../components/JyPageTable'
export default {
  components: { JyDialog, JyPageTable },
  props: {
    multiple: { //是否多选
      type: Boolean,
      default() {
        return false
      },
    },
    type :{
      type: String,
      default() {
        return '1'
      },
    }
  },
  data() {
    return {
      dialogTitle: '选择产品',
      showDialog: false,
      shopList: [],
      loading: false,
      formInfo: {
        Product: '', // 产品代码/名称
        Spec: '', // 规格
        Color: '', // 颜色
        Type: this.type, 
      },
       columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '200', title: '产品号', field: 'ProductNo' },
        { width: '350', title: '产品名称', field: 'chnName' },
        { width: '100', title: '样式', field: 'StyleName' },
        { width: '160', title: '颜色', field: 'Color' },
        { width: '100', title: '尺寸', field: 'Unit' },
        { width: '80', title: '尺寸单位', field: 'UnitName' },
        { width: '120', title: '每包片数', field: 'InboxQuantity' },
        { width: '100', title: '系数', field: 'Rate' },
        { width: '180', title: '备注', field: 'Remark' },
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
    query(){
      this.$refs.grid.query()
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
      let data =this.$refs.grid.getCheckRow()
      this.$emit('okDialog', data)
      this.showDialog = false
    },
  },
  created() {
    this.addProductState()
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
