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
        <el-col :md="12" :lg="5" :xl="5">
          <el-form-item label="制单开始时间:">
            <!-- <span class="blockSpan">
              <div class="blockDate"> -->
            <el-date-picker
              class="unifySize"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              v-model="QueryList.begindate"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="5" :xl="5">
          <el-form-item label="制单结束时间:">
            <el-date-picker
              class="unifySize"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              v-model="QueryList.endDate"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="5" :xl="5">
          <el-form-item label="发货申请单号：">
            <el-input
              v-model="QueryList.DeliveryPlanCode"
              @keydown.enter.native="searchEnter"
              class="unifySize"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :md="12" :lg="4" :xl="4">
          <el-form-item
            class="tipsLeft searchMargin"
            style="margin-bottom: 0px"
            label="站点："
          >
            <el-select v-model="QueryList.shop" class="unifySize1" clearable>
              <el-option
                :key="index"
                v-for="(item, index) in shopList"
                :label="item.Name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="4" :xl="4">
          <el-form-item label="货件编号：">
            <el-input
              v-model="QueryList.ShipmentNo"
              @keydown.enter.native="searchEnter"
              class="unifySize"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="3" :xl="3">
          <el-button
            type="danger"
            class="searchBtn"
            size="small"
            :loading="loading"
            icon="el-icon-search"
            @click="Getquery"
            >查询</el-button
          >
        </el-col>
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
            width="80"
            field="状态"
            title="状态"
          ></vxe-table-column>
          <vxe-table-column
            width="120"
            field="发货申请单号"
            title="发货申请单号"
          ></vxe-table-column>
          <vxe-table-column
            width="120"
            field="货件编号"
            title="货件编号"
          ></vxe-table-column>
          <vxe-table-column
            width="120"
            field="海外仓编号"
            title="海外仓编号"
          ></vxe-table-column>
          <vxe-table-column
            width="110"
            field="货件名称"
            title="货件名称"
          ></vxe-table-column>
          <vxe-table-column width="120" field="实发箱数" title="实发箱数">
            <template slot-scope="{ row }">
              <span v-if="row.实发箱数 == null">0</span>
              <span v-else>{{ row.实发箱数 }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column width="120" field="实发包数" title="实发包数">
            <template slot-scope="{ row }">
              <span v-if="row.实发包数 == null">0</span>
              <span v-else>{{ row.实发包数 }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            width="110"
            field="发货日期"
            title="发货日期"
          ></vxe-table-column>
          <vxe-table-column
            align="left"
            field="备注"
            title="备注"
          ></vxe-table-column>
          <vxe-table-column
            width="70"
            field="制单人"
            title="制单人"
          ></vxe-table-column>
          <vxe-table-column
            width="110"
            field="制单日期"
            title="制单日期"
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
        UserCode: '001',
        DeliveryPlanCode: '', // 发货申请单号
        begindate: '', // 开始时间
        endDate: '', // 结束时间
        Type: '10',
        shop: '',
        ShipmentNo: '',
      },
      loading: false,
      tableLoading: false,
      chooseList: [],
    }
  },
  methods: {
    SubmitChang() {
      var data = []
      data.push(...this.chooseList)
      if (data.length < 1) return this.$message('请至少选择一条装箱单号')
      this.$emit('fatherMethod', data)
      this.$emit('closeDialog')
      this.chooseList = []
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
    searchEnter(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.getChooseProductList()
      }
    },
    // 选择装箱单产品checkbox
    onChooseCheckboxChange(row) {
      // console.log(row);
      if (row.checked) {
        this.chooseList.push(row.row)
      } else {
        let InDex = this.chooseList.findIndex((item) => {
          return item.ID === row.row.ID
        })
        this.chooseList.splice(InDex, 1)
      }
    },
    // 选择产品按钮
    getChooseProductList() {
      ;(this.loading = true), (this.tableLoading = true)
      if (this.QueryList.begindate == null) {
        this.QueryList.begindate = ''
      }
      if (this.QueryList.endDate == null) {
        this.QueryList.endDate = ''
      }
      this.$api.PackingRequest.queryPacking({ model: this.QueryList })
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
      this.$set(this.QueryList, 'endDate', toMonth)
      this.$set(this.QueryList, 'begindate', startTime)
      this.getChooseProductList()
    },
  },
  //时间
  created() {
    this.getNowDate()
    // this.getChooseProductList()
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
  height: 540px;
}
>>> .el-dialog .el-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
>>> .unifySize1 {
  height: 30px;
}
>>> .unifySize1 input {
  height: 30px;
}
</style>