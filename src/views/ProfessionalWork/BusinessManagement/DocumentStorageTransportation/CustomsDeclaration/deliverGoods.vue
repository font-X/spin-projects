<template>
  <div>
    <!-- 表单数据 -->
    <el-form
      ref="chooseForm"
      :model="QueryList"
      style="font-size：14px"
      label-width="110px"
    >
      <el-row>
        <el-col style="display: flex; flex-start: space-between">
          <el-form-item label="中文名称：">
            <el-input v-model="QueryList.cnName" class="unifySize" clearable></el-input>
          </el-form-item>
          <el-form-item label="英文名称：">
            <el-input v-model="QueryList.enName" class="unifySize" clearable></el-input>
          </el-form-item>
          <el-button
            type="danger"
            class="searchBtn"
            size="small"
            icon="el-icon-search"
            :loading="loading"
            @click="Getquery"
            >查询</el-button
          >
        </el-col>
      </el-row>
      <!-- 表单数据 -->
      <el-row class="chooseHeight">
        <jy-grid
          ref="chooseTable"
          border
          resizable
          stripe
          keep-source
          :row-class-name="cellChooseClass"
          show-overflow
          :loading="tableLoading"
          height="580"
          :auto-resize="true"
          class="mytable-scrollbar"
          :header-cell-class-name="hearderClass"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true }"
          :data="paging.data"
        >
          <vxe-table-column type="checkbox" width="40"></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="50"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            field="ChsName"
            title="中文名称"
          ></vxe-table-column>
          <vxe-table-column
            width="120"
            field="EngName"
            title="英文名称"
          ></vxe-table-column>
          <!-- <vxe-table-column
            width="120"
            align="left"
            field="Address"
            title="地址"
          ></vxe-table-column> -->
          <vxe-table-column
            width="120"
            field="tel"
            title="电话"
          ></vxe-table-column>
          <vxe-table-column
            width="120"
            field="email"
            title="传真"
          ></vxe-table-column>
        </jy-grid>
      </el-row>
    </el-form>
    <!-- 分页 -->
    <div style="display: flex; justify-content: space-between">
      <el-col class="closeTable">
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paging.page"
          background
          :page-sizes="[100, 200, 500, 1000]"
          :page-size="paging.limit"
          layout="prev,pager,next,total,sizes,jumper"
          :total="paging.total"
        >
        </el-pagination>
      </el-col>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <el-button type="primary" class="chooseEnter" @click="SubmitChang"
              >确 定</el-button
            >
            <el-button class="chooseCancel" @click="closeDialog"
              >取 消</el-button
            >
          </el-col>
        </el-row>
      </span>
    </div>
  </div>
</template>
<script>
import JyGrid from '@/components/JyGrid'
export default {
  components:{
    JyGrid
  },
  data() {
    return {
      loading:false,
      tableLoading:false,
      hearderClass: 'hearderClass',
      cellChooseClass: 'cellChooseClass',
      chooseProduceList: [],
      paging: { list: [], data: [], limit: 100, total: null, page: 1 }, //主表分页
      QueryList: {
        cnName: '',
        enName: '',
      },
    }
  },
  methods: {
    SubmitChang() {
      var data = []
      data.push(...this.$refs.chooseTable.getCheckboxRecords())
      if (data.length < 1) {
        this.$message('请通过复选框选择一条数据')
        return
      }
      if (data.length > 1) {
        this.$message('该数据只能选择一条，请重新选择')
        return
      }
      this.$emit('FatherData', data)
      this.$emit('closeDialog')
    },
    Getquery() {
      this.GetCDocumentList()
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
    //分页开始
    // 当每页数量改变
    handleSizeChange(val) {
      this.paging.limit = val
      this.pageList()
    },
    // 当当前页改变
    handleCurrentChange(val) {
      this.paging.page = val
      this.pageList()
    },
    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.paging.data = this.chooseProduceList
      this.paging.total = this.paging.data.length
      this.getList()
    },
    // 处理数据
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.paging.data = this.paging.data.filter(
        (item, index) =>
          index < this.paging.page * this.paging.limit &&
          index >= this.paging.limit * (this.paging.page - 1)
      )
    },
    // 分页结束
    //发货公司查询功能
    GetCDocumentList() {
      this.loading = true
      this.tableLoading = true
      this.$api.CustomsDeclaration.getDeliverGoods({cnName:this.QueryList.cnName,
      enName:this.QueryList.enName
      })
        .then((res) => {
          console.log(res)
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.chooseProduceList = res.data
            this.pageList()
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.loading = false
          this.tableLoading = false
        })
    },
  },
  created() {
    this.GetCDocumentList()
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
>>> .unifySize {
  // width: 160px !important;
  height: 30px;
}
>>> .unifySize input {
  width: 160px !important;
  height: 30px;
}
.searchBtn {
  width: 70px;
  height: 30px;
  line-height: 10px;
  background: #ff9b22;
  border: 1px solid #ff9b22;
  margin-left: 22px;
  margin-top: 5px;
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
  height: 600px;
}
>>> .el-dialog__header {
  background-color: #c5c5c5;
}
</style>