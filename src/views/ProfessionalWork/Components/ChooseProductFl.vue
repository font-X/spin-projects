<template>
  <jy-dialog
    :title="dialogTitle"
    append-to-body
    :close-on-click-modal="false"
    class="dialog-component"
    :visible.sync="showDialog"
    width="1200px"
    @open="openDialog"
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
                  <el-col :span="5">
                    <el-form-item label="代码：">
                      <el-input v-model="formInfo.MaterialNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="简称/名称/规格:">
                      <el-input v-model="formInfo.Name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="供应商：">
                      <el-input v-model="formInfo.Factory"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="自定义：">
                      <el-input v-model="formInfo.bakField1"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item label="库存为0：">
                      <el-checkbox v-model="formInfo.isZero"></el-checkbox>
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
            <vxe-table
              border
              resizable
              stripe
              width="auto"
              show-footer
              :auto-resize="true"
              v-loading="loading"
              show-overflow="title"
              :height="650"
              @cell-click="cellclick"
              highlight-current-row
              :config="{ render: 'scroll' }"
              :align="'center'"
              :checkbox-config="{ highlight: true, range: true }"
              :data="gridData"
              ref="grid"
            >
              <vxe-table-column width="40" type="checkbox"></vxe-table-column>
              <vxe-table-column
                width="50"
                type="seq"
                title="序号"
              ></vxe-table-column>
              <vxe-table-column
                width="150"
                :field="'MaterialNo'"
                title="代码"
              ></vxe-table-column>
              <vxe-table-column :field="'Name'" title="名称"></vxe-table-column>
              <vxe-table-column
                width="120"
                :field="'Spec'"
                title="规格"
              ></vxe-table-column>
              <vxe-table-column
                width="60"
                :field="'UnitName'"
                title="单位"
              ></vxe-table-column>
              <vxe-table-column
                width="100"
                :field="'CustomName'"
                title="厂家"
              ></vxe-table-column>
              <vxe-table-column
                width="100"
                :field="'bakField1'"
                title="自定义信息1"
              ></vxe-table-column>
              <vxe-table-column
                width="100"
                :field="'bakField2'"
                title="自定义信息2"
              ></vxe-table-column>
              <vxe-table-column
                width="100"
                :field="'Quantity'"
                title="库存"
              ></vxe-table-column>
            </vxe-table>
          </el-row>
          <el-row id="pagin">
            <!-- 分页 -->
            <el-pagination
              class="pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageInfo.page"
              background
              :page-sizes="[100, 200, 500, 1000]"
              :page-size="pageInfo.pageSize"
              layout="prev,pager,next,total,sizes,jumper"
              :total="pageInfo.total"
            >
            </el-pagination>
          </el-row>
        </el-card>
      </el-row>
    </el-container>

    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <el-button type="primary" size="mini" @click="okDialog()"
            >确定</el-button
          >
          <el-button type="primary" size="mini" @click="closeDialog()"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </span>
  </jy-dialog>
</template>
 
<script>
import JyDialog from '../../../components/JyDialog'
export default {
  components: { JyDialog },
  data() {
    return {
      dialogTitle: '选择辅料',
      showDialog: false,
      shopList: [],
      loading: false,
      multiple: false, //是否多选
      formInfo: {
        Name: '',
        Factory: '',
        bakField1: '',
        ClassNo: '',
        MaterialNo: '',
        isZero: '',
      },
      pageInfo: {
        page: 1,
        pageSize: 100,
      },
      //绑定到表格数据
      gridData: [],
    }
  },
  methods: {
    //初始化
    openDialog() {
      this.query()
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
        aType: '1',
        planNo: '',
        isCpcg: '',
      }
      this.showDialog = false
      this.filterData = []
      this.bindData = []
      this.$emit('closeDialog', flag)
    },
    //点击单元格
    cellclick(data) {
      if (data.columnIndex != 0) {
        if (!this.multiple) {
          this.$refs.grid.setAllCheckboxRow(false)
        }
        this.$refs.grid.setCheckboxRow(data.row, this.$refs.grid.isCheckedByCheckboxRow(data.row) == false )
      }
    },
    //选择完数据
    okDialog() {
      let data = []
      data.push(...this.$refs.grid.getCheckboxRecords())
      if (data.length == 0) {
        this.$message({
          message: '未选择数据',
          type: 'error',
        })
        return
      }
      if (data.length > 1 && !this.multiple) {
        this.$message({
          message: '请选择一条数据',
          type: 'error',
        })
        return
      }
      this.$emit('okDialog', data)
      this.showDialog = false
    },
    // 当每页数量改变
    handleSizeChange(val) {
      this.pageInfo.page = 1
      this.pageInfo.pageSize = val
      this.query()
    },
    // 当当前页改变
    handleCurrentChange(val) {
      this.pageInfo.page = val
      this.query()
    },
    //查询数据
    query() {
      this.loading = true
      this.$api.productManage
        .GetProductFLPageList({
          model: { ...this.formInfo },
          pageInfo: this.pageInfo,
        })
        .then((res) => {
          this.loading = false
          if (res.Code < 0) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.pageInfo = res.data
            this.gridData = res.data.data
            delete this.pageInfo.data
          }
        })
        .catch((err) => (this.loading = false))
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
