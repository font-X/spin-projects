<template>
  <div>
    <!-- 表单数据 -->
    <el-row class="secondBtn">
      <el-button
        class="delBtn iconBtn el-icon-search"
        type="danger"
        size="small"
        :loading="isSearch"
        @click="search"
        >查询</el-button
      >
      <el-button
        @click="addFba"
        class="smBtn iconBtn el-icon-plus"
        type="primary"
        size="small"
        >新增</el-button
      >
      <el-button
        class="smBtn2 iconBtn iconfont kt-icon-caidan"
        type="primary"
        size="small"
        >标签补打</el-button
      >
    </el-row>
    <el-row class="chooseHeight">
      <vxe-table
        ref="chooseTable"
        border
        resizable
        stripe
        keep-source
        :row-class-name="cellChooseClass"
        show-overflow
        :loading="isSearch"
        height="690"
        :auto-resize="true"
        class="mytable-scrollbar"
        :header-cell-class-name="hearderClass"
        highlight-current-row
        :config="{ render: 'scroll' }"
        :align="'center'"
        :checkbox-config="{ highlight: true }"
        :data="choosePaging.data"
      >
        <vxe-table-column type="checkbox" width="40"></vxe-table-column>
        <vxe-table-column type="seq" width="60" title="序号"></vxe-table-column>
        <vxe-table-column
          width="175"
          field="发货申请单号"
          title="发货申请单号"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="目的国家"
          title="目的国家"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="入仓单号"
          title="入仓单号"
        ></vxe-table-column>
        <vxe-table-column
          width="100"
          field="亚马逊单号"
          title="亚马逊单号"
        ></vxe-table-column>
        <vxe-table-column
          width="110"
          field="亚马逊参考号"
          title="亚马逊参考号"
        ></vxe-table-column>
        <vxe-table-column
        min-width="94"
          field="FBA仓代码"
          title="FBA仓代码"
        ></vxe-table-column>
        <vxe-table-column min-width="94" field="FBACODE" title="FBACODE"></vxe-table-column>
        <vxe-table-column min-width="94" field="序号" title="序号"></vxe-table-column>
        <vxe-table-column min-width="94" field="总件数" title="总件数"></vxe-table-column>
        <vxe-table-column min-width="94" field="产地" title="产地"></vxe-table-column>
        <vxe-table-column min-width="94" field="制单人" title="制单人"></vxe-table-column>
        <vxe-table-column min-width="94" field="制单日期" title="制单日期"></vxe-table-column>
      </vxe-table>
    </el-row>
    <!-- 分页 -->
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col style="display: flex; justify-content: space-between">
          <el-pagination
            @size-change="chooseHandleSizeChange"
            @current-change="chooseHandleCurrentChange"
            :current-page="choosePaging.page"
            background
            :page-sizes="[100, 200, 500, 1000]"
            :page-size="choosePaging.limit"
            layout="prev,pager,next,total,sizes,jumper"
            :total="choosePaging.total"
          >
          </el-pagination>

          <span>
            <el-button class="chooseCancel" @click="closeDialog"
              >取 消</el-button
            >
          </span>
        </el-col>
      </el-row>
    </span>
    <el-dialog
      v-dialogDrag
      title="FBA散货批量添加"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="editDaialogVisible"
      width="30%"
    >
      <el-row>
        <el-form
          ref="editForm"
          :model="editFormParams"
          style="font-size：14px"
          label-width="120px"
        >
          <el-col :span="12">
            <el-col :span="24">
              <el-form-item label="发货申请单号:">
                <el-input
                  disabled
                  clearable
                  v-model="DeliveryPlanID"
                  class="unifySize"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="入仓单号:">
                <el-input
                  clearable
                  v-model="editFormParams.ShippingOrder"
                  class="unifySize"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="FBA仓代码:">
                <el-input
                  clearable
                  v-model="editFormParams.FBA_DepotNo"
                  class="unifySize"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="FBACODE:">
                <el-input
                  clearable
                  v-model="editFormParams.FBACODE"
                  class="unifySize"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="产地:">
                <el-input
                  clearable
                  v-model="editFormParams.Origin"
                  class="unifySize"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="12">
            <el-col :span="24">
              <el-form-item label="目的国家:">
                <el-input
                  clearable
                  v-model="editFormParams.Country"
                  class="unifySize"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="亚马逊单号:">
                <el-input
                  clearable
                  v-model="editFormParams.ShipmentID"
                  class="unifySize"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="亚马逊参考单号:">
                <el-input
                  clearable
                  v-model="editFormParams.ReferenceID"
                  class="unifySize"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="总件数:">
                <el-input
                  clearable
                  v-model="editFormParams.TotalNumber"
                  class="unifySize"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <span>
          <el-button type="primary" @click="addFBA" class="chooseEnter"
            >确 定</el-button
          >
          <el-button class="chooseCancel" @click="editDaialogVisible = false"
            >取 消</el-button
          >
        </span>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import JyDialog from '@/components/JyDialog'
export default {
  components: { JyDialog },
  props: {
    FBAID: String,
  },
  data() {
    return {
      hearderClass: 'hearderClass',
      cellChooseClass: 'cellChooseClass',
      DeliveryPlanID: '',
      chooseProduceList: [],
      isSearch: false,
      DeId: '',
      editFormParams: {
        UserCode: '',
        DeliveryPlanID: '',
        Country: '', //目的国家
        ShippingOrder: '', //入仓单号
        ShipmentID: '', //亚马逊单号
        ReferenceID: '', //亚马逊参考号
        FBA_DepotNo: '', //FBA仓代码
        FBACODE: '',
        TotalNumber: '', //总件数
        Origin: '', //产地
        strMessage: '',
        returnBarcode: '',
      },
      editDaialogVisible: false,
      choosePaging: { list: [], data: [], limit: 100, total: null, page: 1 },
    }
  },
  methods: {
    // 新增
    addFba() {
      this.editDaialogVisible = true
      this.editFormParams.ShippingOrder = ''
      this.editFormParams.FBA_DepotNo = ''
      this.editFormParams.FBACODE = ''
      this.editFormParams.Origin = ''
      this.editFormParams.Country = ''
      this.editFormParams.ShipmentID = ''
      this.editFormParams.ReferenceID = ''
      this.editFormParams.TotalNumber = ''
      this.DeliveryPlanID = this.DeId
    },
    search() {
      this.getFbaList()
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
    choosePageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作(选择产品表)
      this.choosePaging.data = this.chooseProduceList
      this.choosePaging.total = this.choosePaging.data.length
      this.chooseGetList()
    },
    // 处理数据(选择产品表)
    chooseGetList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.choosePaging.data = this.choosePaging.data.filter(
        (item, index) =>
          index < this.choosePaging.page * this.choosePaging.limit &&
          index >= this.choosePaging.limit * (this.choosePaging.page - 1)
      )
    },
    // 当每页数量改变(选择产品表)
    chooseHandleSizeChange(val) {
      this.choosePaging.limit = val
      this.choosePageList()
    },
    // 当当前页改变(选择产品表)
    chooseHandleCurrentChange(val) {
      this.choosePaging.page = val
      this.choosePageList()
    },
    getFbaList() {
      this.choosePaging.data = []
      this.isSearch = true
      this.$api.deliveryRequest
        .GetFBACustomLabel({ Id: this.FBAID })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.chooseProduceList = res.data.list
            this.DeId = res.data.DeliveryPlanCode[0]
            this.choosePageList()
          }
        })
        .catch((err) => (this.loading = false))
        .finally(() => {
          this.isSearch = false
        })
    },
    // FBA散货批量添加
    addFBA() {
      this.editFormParams.DeliveryPlanID = this.FBAID
      this.$api.deliveryRequest
        .FBACustomLabelSave({ model: this.editFormParams })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              message: '保存成功!',
              type: 'success',
            })
            this.editDaialogVisible = false
            this.getFbaList()
          }
        })
        .catch((err) => (this.loading = false))
    },
  },

  created() {
    this.getFbaList()
  },
}
</script>

<style lang="scss" scoped>
>>> .hearderClass {
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  height: 34px;
  color: #333;
  background-color: #d5deff;
}
>>> .cellChooseClass {
  height: 28px;
}
.chooseEnter {
  width: 70px;
  height: 32px;
  background: #5473e8;
  border-radius: 2px;
  line-height: 32px;
  padding: 0;
}
.chooseCancel {
  width: 70px;
  height: 32px;
  background: #908fa0;
  border-radius: 2px;
  color: #fff;
  line-height: 32px;
  padding: 0;
}
>>> .chooseHeight {
  height: 710px;
}
>>> .unifySize .el-input__icon {
  line-height: normal;
}
>>> .unifySize input {
  height: 30px;
}
>>> .unifySize1 input {
  height: 30px;
}
>>> .unifySize {
  width: 100% !important;
  height: 30px;
}
>>> .el-form-item {
  margin-bottom: 5px;
}
.secondBtn {
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
  .smBtn {
    width: 70px !important;
  }
  .smBtn2 {
    width: 90px !important;
  }
  .XlBtn {
    width: 110px !important;
  }

  .iconBtn {
    width: 100px;
    height: 32px;
    background: #5473e8;
    border-radius: 2px;
    font-size: 14px;
    border: 1px solid #5473e8;
    font-weight: 400;
    color: #fcfefe;
    padding: 0;
  }
  .delBtn {
    width: 70px !important;
    background: #ff9b22 !important;
    border: 1px solid #ff9b22 !important;
  }
  .delBtn2 {
    width: 90px !important;
    background: #ff9b22 !important;
    border: 1px solid #ff9b22 !important;
  }
}
>>> .jy-dialog .jy-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
</style>