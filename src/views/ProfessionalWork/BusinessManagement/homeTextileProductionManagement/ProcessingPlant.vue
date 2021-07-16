<template>
  <jy-dialog
    title="选择工厂"
    append-to-body
    :close-on-click-modal="false"
    v-if="showChooseDelivery"
    :visible.sync="showChooseDelivery"
    height="800px"
    width="1250px"
  >
    <!-- 表单数据 -->
    <el-form
      ref="chooseForm"
      :model="chooseFormRuleForm"
      style="font-size：14px"
      label-width="140px"
    >
      <el-row>
        <el-col style="display: flex; justify-content: flex-start">
          <el-form-item label="工厂名称/英文名称:">
            <el-input
              v-model="chooseFormRuleForm.strProduct"
              class="unifySize"
            ></el-input>
          </el-form-item>
          <el-form-item label="工厂简称:">
            <el-input
              v-model="chooseFormRuleForm.strProduct"
              class="unifySize"
            ></el-input>
          </el-form-item>
          <el-button
            type="danger"
            class="searchBtn"
            size="small"
            @click="search"
            :loading="isSearch"
            icon="el-icon-search"
            >查 询</el-button
          >
        </el-col>
      </el-row>
      <el-row class="chooseHeight2">
        <vxe-table
          ref="chooseTable"
          border
          resizable
          stripe
          keep-source
          :row-class-name="cellChooseClass"
          show-overflow
          :loading="isSearch"
          height="700"
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
          <vxe-table-column
            type="seq"
            width="60"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column width="175" field="" title="ID"></vxe-table-column>
          <vxe-table-column width="" field="" title="编号"></vxe-table-column>
          <vxe-table-column width="" field="" title="简称"></vxe-table-column>
          <vxe-table-column width="" field="" title="名称"></vxe-table-column>
          <vxe-table-column
            width=""
            field=""
            title="英文名称"
          ></vxe-table-column>
          <vxe-table-column width="" field="" title="业务员"></vxe-table-column>
          <vxe-table-column width="" field="" title="跟单员"></vxe-table-column>
          <vxe-table-column width="" field="" title="国家"></vxe-table-column>
          <vxe-table-column width="" field="" title="联系人"></vxe-table-column>
          <vxe-table-column
            width=""
            field=""
            title="联系电话"
          ></vxe-table-column>
          <vxe-table-column width="" field="" title="类型"></vxe-table-column>
          <vxe-table-column width="" field="" title="评级"></vxe-table-column>
          <vxe-table-column field="" title="客户分类"></vxe-table-column>
        </vxe-table>
      </el-row>
    </el-form>
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
            <el-button type="primary" @click="chooseEnter" class="chooseEnter"
              >确 定</el-button
            >
            <el-button class="chooseCancel" @click="closeDialog"
              >取 消</el-button
            >
          </span>
        </el-col>
      </el-row>
    </span>
  </jy-dialog>
</template>
<script>
import JyDialog from '@/components/JyDialog/index'
export default {
  components: { JyDialog },
  data() {
    return {
      hearderClass: 'hearderClass',
      cellChooseClass: 'cellChooseClass',
      chooseProduceList: [],
      isSearch: false,
      showChooseDelivery: false,
      choosePaging: { list: [], data: [], limit: 100, total: null, page: 1 },
      chooseFormRuleForm: {
        shopId: '',
        strProduct: '', // 产品编码
        p_Spec: '', // 规格
        color: '', // 颜色
        contractNo: '',
        type: '',
        aType: '',
        planNo: '',
        isCpcg: '',
      },
    }
  },
  methods: {
    search() {
      
    },
    // 点击确定获取选中的数据
    chooseEnter() {
    
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
 
  },
  created() {
   
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
.searchBtn {
  width: 70px;
  height: 30px;
  line-height: 10px;
  background: #ff9b22;
  border: 1px solid #ff9b22;
  margin-left: 22px;
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
>>> .chooseHeight2 {
  height: 720px;
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
</style>