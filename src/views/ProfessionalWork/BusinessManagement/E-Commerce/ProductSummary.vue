<template>
  <el-container id="mainCard">
    <el-card id="queryRow">
      <el-form
        :model="ProductSummaryParams"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row class="marginL">
          <el-col :lg="5" :xl="3">
            <el-form-item label="站点:">
              <el-select v-model="ProductSummaryParams.Shop" placeholder="站点">
                <el-option
                  :key="index"
                  v-for="(item, index) in shopList"
                  :label="item.Name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :xl="3"
            ><el-form-item label="产品号:">
              <el-input
                clearable
                @keyup.enter.native="search()"
                v-model="ProductSummaryParams.PCode"
                placeholder="请输入产品号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :xl="3">
            <el-form-item label="日期：">
              <el-date-picker
                clearable
                v-model="ProductSummaryParams.BeginDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :xl="3"
            ><el-form-item label="产品名称:">
              <el-input
                clearable
                @keyup.enter.native="search()"
                v-model="ProductSummaryParams.PName"
                placeholder="请输入产品名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="5" :xl="3"
            ><el-form-item label="颜色:">
              <el-input
                clearable
                @keyup.enter.native="search()"
                v-model="ProductSummaryParams.Color"
                placeholder="请输入颜色"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="10" :xl="5">
            <el-form-item label="仓库:">
              <el-select
                clearable
                :disabled="isDisabled"
                class="selectSize"
                v-model="ProductSummaryParams.strDepotNo"
                multiple
                collapse-tags
                placeholder="请选择仓库"
              >
                <el-option
                  v-for="item in wareHouseList"
                  :key="item.value"
                  :label="item.DepotName"
                  :value="item.DepotNo"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-button
            type="danger"
            class="searchBtn"
            size="small"
            :loading="isLoadingBtn"
            @click="search"
            icon="el-icon-search"
            >查询</el-button
          >
          <el-dropdown @command="handleCommand" :hide-on-click="false">
            <el-button class="exportBtn" type="primary">
              导出<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">导出当前页</el-dropdown-item>
              <el-dropdown-item command="b">导出全部</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- <el-button
            type="danger"
            class="exportBtn iconfont kt-icon-daochu"
            size="small"
            @click="Export"
            >导出当前页</el-button
          >
          <el-button
            type="danger"
            class="exportBtn iconfont kt-icon-daochu"
            size="small"
            @click="ExportAll"
            >导出全部</el-button
          > -->
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <vxe-table
        border
        resizable
        stripe
        ref="grid"
        :loading="isLoadingBtn"
        width="auto"
        :auto-resize="true"
        show-overflow="title"
        :header-row-class-name="hearderClass"
        :row-class-name="cellClass"
        :height="gridHeight"
        class="mytable-scrollbar"
        highlight-current-row
        :config="{ render: 'scroll' }"
        :align="'center'"
        :checkbox-config="{ highlight: true }"
        :data="paging.data"
      >
        <vxe-table-column type="checkbox" width="40"></vxe-table-column>
        <vxe-table-column type="seq" width="60" title="序号"></vxe-table-column>
        <vxe-table-column
          width="170"
          field="产品号"
          title="产品号"
        ></vxe-table-column>
        <vxe-table-column
          width="170"
          field="产品名称"
          title="产品名称"
        ></vxe-table-column>
        <vxe-table-column
          width="60"
          field="样式"
          title="样式"
        ></vxe-table-column>
        <vxe-table-column
          width="60"
          field="色号"
          title="色号"
        ></vxe-table-column>
        <vxe-table-column
          width="60"
          field="颜色"
          title="颜色"
        ></vxe-table-column>
        <vxe-table-column
          width="60"
          field="尺寸"
          title="尺寸"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="尺寸单位"
          title="尺寸单位"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="订单片数"
          title="订单片数"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="生产片数"
          title="生产片数"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="下单片数"
          title="下单片数"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="到货片数"
          title="到货片数"
        ></vxe-table-column>
        <vxe-table-column
          field="生产中片数"
          width="100"
          title="生产中片数"
        ></vxe-table-column>
        <vxe-table-column
          width="100"
          field="检验合格数"
          title="检验合格数"
        ></vxe-table-column>
        <vxe-table-column
          width="100"
          field="检验次品数"
          title="检验次品数"
        ></vxe-table-column>
        <vxe-table-column
          width="100"
          field="总检验片数"
          title="总检验片数"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="未检验数"
          title="未检验数"
        ></vxe-table-column>
        <vxe-table-column
          width="125"
          field="到货未打包片数"
          title="到货未打包片数"
        ></vxe-table-column>
        <vxe-table-column
          width="125"
          field="检验未打包片数"
          title="检验未打包片数"
        ></vxe-table-column>
        <vxe-table-column
          width="100"
          field="成品库存数"
          title="成品库存数"
        ></vxe-table-column>
        <vxe-table-column
          width="120"
          field="对应仓库"
          title="对应仓库"
        ></vxe-table-column>
      </vxe-table>
      <!-- 分页 -->
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
    </el-card>
  </el-container>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      // r_columns: [
      //   { type: 'checkbox', width: '40' },
      //   { title: '序号', width: '60', type: 'seq' },
      //   { title: '产品号', field: '产品号', width: '170' },
      //   { title: '产品名称', field: '产品名称', width: '170' },
      //   { title: '样式', field: '样式', width: '60' },
      //   { title: '色号', field: '色号', width: '60' },
      //   { title: '颜色', field: '颜色', width: '60' },
      //   { title: '尺寸', field: '尺寸', width: '60' },
      //   { title: '尺寸单位', field: '尺寸单位', width: '80' },
      //   { title: '订单片数', field: '订单片数', width: '80' },
      //   { title: '生产片数', field: '生产片数', width: '80' },
      //   { title: '下单片数', field: '下单片数', width: '80' },
      //   { title: '到货片数', field: '到货片数', width: '80' },
      //   { title: '生产中片数', field: '生产中片数', width: '100' },
      //   { title: '检验合格数', field: '检验合格数', width: '100' },
      //   { title: '检验次品数', field: '检验次品数', width: '100' },
      //   { title: '总检验片数', field: '总检验片数', width: '100' },
      //   { title: '未检验数', field: '未检验数', width: '80' },
      //   { title: '到货未打包片数', field: '到货未打包片数', width: '125' },
      //   { title: '检验未打包片数', field: '检验未打包片数', width: '125' },
      //   { title: '成品库存数', field: '成品库存数', width: '100' },
      //   { title: '对应仓库', field: '对应仓库', width: '120' },
      // ],
      ProductSummaryParams: {
        UserCode: '',
        BeginDate: '',
        PCode: '',
        Color: '',
        ContractCode: '',
        PName: '',
        Shop: '',
        strDepotNo: [],
      },
      gridHeight: 698,
      strDepot: [],
      isDisabled: false,
      isLoadingBtn: false,
      ProductSummaryList: [],
      shopList: [],
      wareHouseList: [], //仓库列表
      paging: { list: [], data: [], limit: 100, total: null, page: 1 }, //主表分页
      cellClass: 'cellClass',
      store: '',
      hearderClass: 'hearderClass',
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'a') {
        this.Export()
      } else {
        this.ExportAll()
      }
    },
    Export() {
      const ws = XLSX.utils.json_to_sheet(this.paging.data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
      XLSX.writeFile(wb, '产品总结.xls', {
        bookType: 'xls',
        bookSST: false,
        type: 'array',
      })
    },
    ExportAll() {
      const ws = XLSX.utils.json_to_sheet(this.ProductSummaryList)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
      XLSX.writeFile(wb, '产品总结.xls', {
        bookType: 'xls',
        bookSST: false,
        type: 'array',
      })
    },
    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.paging.data = this.ProductSummaryList
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
    // 查询
    search() {
      this.isDisabled = true
      this.isLoadingBtn = true
      console.log(this.ProductSummaryParams.strDepotNo)
      var str = ''
      if (this.ProductSummaryParams.strDepotNo.length === 0) {
        this.ProductSummaryParams.strDepotNo = ''
      } else {
        this.strDepot = this.ProductSummaryParams.strDepotNo
        this.ProductSummaryParams.strDepotNo.forEach((item) => {
          str += item + ','
        })
        this.ProductSummaryParams.strDepotNo = str
      }
      this.$api.business
        .ProductSummary({
          model: { ...this.ProductSummaryParams },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            console.log(this.strDepot)
            this.ProductSummaryParams.strDepotNo = this.strDepot
            this.ProductSummaryList = res.data[0]
            this.isDisabled = false
            this.pageList()
          }
        })
        .catch((err) => {
          this.isDisabled = false
          console.log(err)
        })
        .finally(() => {
          this.isLoadingBtn = false
          this.isDisabled = false
          this.ProductSummaryParams.strDepotNo = this.strDepot
        })
    },
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
    // 获得仓库列表
    getWareHouseList() {
      this.$api.publicApi
        .wareHouse({
          model: {
            DepotType: '7',
            SmallType: '01',
          },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.wareHouseList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    handleuserClick(event) {
      //自定义按钮事件
      switch (event) {
        case 'exportdata':
          //this.$refs.grid.exportDataEvent({ types: ['csv'] })
          this.$refs.grid.exportDataEvent(
            { types: ['xls'] },
            this.$attrs.ReportNo
          )
          break
      }
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
      this.$set(this.ProductSummaryParams, 'BeginDate', toMonth)
    },
    // 获取站点列表
    addProductState() {
      this.$api.publicApi
        .basShop()
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.shopList = res.data
            this.$set(this.ProductSummaryParams, 'Shop', this.shopList[0].id)
            this.search()
          }
        })
        .catch((err) => console.log(err))
    },
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        console.log(card)
        var queryRow = document.getElementById('queryRow').offsetHeight
        this.gridHeight = card - queryRow - 70
      })
    },
  },
  created() {
    this.getNowDate()
    this.getWareHouseList()
    this.addProductState()
    this.resize()
  },
  mounted() {
    var _this = this
    window.onresize = function () {
      // 定义窗口大小变更通知事件
      _this.resize()
    }
  },
}
</script>
<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  display: block;
  background: rgb(245, 248, 255);
}
.el-card {
  width: 100%;
  background: #fff;
  margin-bottom: 10px;
  >>> .el-card__body {
    padding: 10px;
    width: 100%;
  }
}
>>> .cellClass {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 33px;
}
.marginL {
  margin-left: -22px;
}
>>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
// 输入框高度
>>> .el-input__inner {
  height: 30px;
}
>>> .hearderClass {
  text-align: center;
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  height: 38px;
  color: #333;
  background-color: #d5deff;
}
// 仓库选择器的宽度
>>> .selectSize {
  width: 100%;
}
>>> .searchBtn {
  width: 70px;
  height: 30px;
  background: #ff9b22;
  border: 1px solid #ff9b22;
  margin-left: 22px;
  margin-top: 5px;
}
>>> .exportBtn {
  width: 90px;
  height: 30px;
  font-size: 12px;
  background: #5473e8;
  border: 1px solid #5473e8;
  margin-left: 0px;
  margin-top: 5px;
}
// 分页样式
>>> .closeTable {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 5px;
}
.marginL .el-col {
  height: 40px;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>