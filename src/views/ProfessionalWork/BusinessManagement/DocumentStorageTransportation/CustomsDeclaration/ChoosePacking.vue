<template>
  <div>
    <!-- 表单数据 -->
    <el-form
      ref="chooseForm"
      :model="QueryList"
      style="font-size：14px"
      label-width="100px"
    >
      <el-row>
        <el-col style="display: flex" class="rowData">
          <el-form-item label="制单开始时间:">
            <el-date-picker
              class="unifySize"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              v-model="QueryList.BeginDate"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="制单结束时间:">
            <el-date-picker
              class="unifySize"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              v-model="QueryList.EndDate"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="集装箱号：">
            <el-input
              v-model="QueryList.CarName"
              class="unifySize"
              @keydown.enter.native="searchEnter1"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="柜型：">
            <el-select
              v-model="QueryList.ContainerType"
              class="unifySize"
              @keydown.enter.native="searchEnter1"
            >
              <el-option value=""></el-option>
              <el-option
                :key="index"
                v-for="(item, index) in containerList"
                :label="item.Name"
                :value="item.Code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="display: flex" class="rowData">
          <el-form-item label="封号：">
            <el-input
              v-model="QueryList.CarTitle"
              class="unifySize"
              @keydown.enter.native="searchEnter1"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="车号：">
            <el-input
              v-model="QueryList.CarNo"
              class="unifySize"
              @keydown.enter.native="searchEnter1"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="提单号：">
            <el-input
              v-model="QueryList.BLCode"
              class="unifySize"
              @keydown.enter.native="searchEnter1"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="车型：">
            <el-input
              v-model="QueryList.CarType"
              class="unifySize"
              @keydown.enter.native="searchEnter1"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-button
          type="danger"
          class="searchBtn"
          size="small"
          :loading="loading"
          icon="el-icon-search"
          @click="Getquery"
          >查询</el-button
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
          height="520"
          :auto-resize="true"
          class="mytable-scrollbar"
          :header-cell-class-name="hearderClass"
          @checkbox-change="onChooseCheckboxChange"
          highlight-current-row
          :loading="tableLoading"
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true, reserve: true }"
          :data="paging.data"
        >
          <vxe-table-column type="checkbox" width="40"></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="60"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            width="175"
            field="装箱单号"
            title="装箱单号"
          ></vxe-table-column>
          <vxe-table-column
            width="195"
            field="集装箱号"
            title="集装箱号"
          ></vxe-table-column>
          <vxe-table-column
            width="60"
            field="车号"
            title="车号"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="司机名"
            title="司机名"
          ></vxe-table-column>
          <vxe-table-column
            width="120"
            field="发货时间"
            title="发货时间"
          ></vxe-table-column>
          <vxe-table-column
            align="left"
            min-width="120"
            field="备注"
            title="备注"
          ></vxe-table-column>
          <vxe-table-column
            width="120"
            field="制单时间"
            title="制单时间"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="制单人"
            title="制单人"
          ></vxe-table-column>
          <vxe-table-column
            width="110"
            field="提单号"
            title="提单号"
          ></vxe-table-column>
          <vxe-table-column
            width="100"
            field="车型"
            title="车型"
          ></vxe-table-column>
          <vxe-table-column
            width="70"
            field="柜型"
            title="柜型"
          ></vxe-table-column>
        </vxe-table>
      </el-row>
    </el-form>
    <!-- 分页 -->
    <div style="display: flex; justify-content: space-between">
      <el-col class="closeTable">
        <el-pagination
          class="pagination"
          @size-change="chooseHandleSizeChange"
          @current-change="chooseHandleCurrentChange"
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
export default {
  props: {
    shopList: Array,
  },
  data() {
    return {
      hearderClass: 'hearderClass',
      cellChooseClass: 'cellChooseClass',
      chooseProduceList: [],
      paging: { list: [], data: [], limit: 100, total: null, page: 1 },
      QueryList: {
        CarName: '',
        BeginDate: '',
        EndDate: '',
        CarNo: '',
        CarTitle: '',
        BLCode: '',
        CarType: '',
        ContainerType: '',
      },
      loading: false,
      tableLoading: false,
      chooseList: [],
      containerList: [],
    }
  },
  methods: {
    SubmitChang() {
      this.$emit('clear')
      var data = []
      data.push(...this.chooseList)
      if (data.length < 1) return this.$message('请至少选择一条装箱单号')
      this.$emit('fatherMethod', data)
      this.chooseList = []
      this.$emit('closeDialog')
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
    Getquery() {
      this.chooseProduceList = []
      this.getChooseProductList()
    },
    //获取装箱单信息
    choosePageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作(选择产品表)
      this.paging.data = this.chooseProduceList
      this.paging.total = this.paging.data.length
      this.chooseGetList()
    },
    // 处理数据(选择产品表)
    chooseGetList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.paging.data = this.paging.data.filter(
        (item, index) =>
          index < this.paging.page * this.paging.limit &&
          index >= this.paging.limit * (this.paging.page - 1)
      )
    },
    // 当每页数量改变(选择产品表)
    chooseHandleSizeChange(val) {
      this.paging.limit = val
      this.choosePageList()
    },
    // 当当前页改变(选择产品表)
    chooseHandleCurrentChange(val) {
      this.paging.page = val
      this.choosePageList()
    },
    searchEnter1(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.getChooseProductList()
      }
    },
    onChooseCheckboxChange(row) {
      console.log(row)
      if (row.checked) {
        this.chooseList.push(row.row)
      } else {
        let InDex = this.chooseList.findIndex((item) => {
          return item.CarPlanNo === row.row.CarPlanNo
        })
        this.chooseList.splice(InDex, 1)
      }
    },
    // 选择产品按钮
    getChooseProductList() {
      this.chooseList = []
      ;(this.loading = true), (this.tableLoading = true)
      if (this.QueryList.BeginDate == null) {
        this.QueryList.BeginDate = ''
      }
      if (this.QueryList.EndDate == null) {
        this.QueryList.EndDate = ''
      }
      this.$api.PackingRequest.getQuery({ model: this.QueryList })
        .then((res) => {
          console.log(res)
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.chooseProduceList = res.data
            this.choosePageList()
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          ;(this.loading = false), (this.tableLoading = false)
        })
    },
    getNowDate() {
      // 拿到当前时间
      let nowDate = new Date()
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let date = nowDate.getDate()
      date = date < 10 ? '0' + date : date
      var toMonth = year + '-' + month + '-' + date
      // 获取一个月前的时间
      var monthDate = new Date()
      monthDate.setMonth(monthDate.getMonth() - 1)
      var startTime =
        monthDate.getFullYear() +
        '-' +
        (monthDate.getMonth() + 1) +
        '-' +
        monthDate.getDate()
      this.$set(this.QueryList, 'EndDate', toMonth)
      this.$set(this.QueryList, 'BeginDate', startTime)
      this.getChooseProductList()
    },
    cabinetType() {
      this.$api.publicApi
        .GetContainerList({ flag: 'ContainerType' })
        .then((res) => {
          console.log(res)
          this.containerList = res.data
        })
        .catch((err) => console.log(err))
    },
  },
  //时间
  created() {
    this.getNowDate()
    // this.getChooseProductList()
    this.cabinetType()
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
  // margin-left: 22px;
  // margin-top: 5px;
}
.chooseEnter {
  width: 70px;
  height: 32px;
  background: #5473e8;
  border-radius: 2px;
  line-height: 32px;
  padding: 0;
}
>>> .el-dialog__header {
  background-color: #c5c5c5;
}
>>> .unifySize {
  width: 160px !important;
  height: 30px;
}
>>> .unifySize input {
  height: 30px;
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
  height: 550px;
  width: 100%;
  .mytable-scrollbar {
    width: 100%;
  }
}
>>> .el-dialog .el-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
>>> .rowData {
  margin: 0;
  height: 40px;
}
</style>