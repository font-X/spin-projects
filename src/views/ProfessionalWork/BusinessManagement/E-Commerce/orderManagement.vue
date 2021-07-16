<template>
  <el-container>
    <!-- 遮罩层 -->
    <el-row style="width: 100%">
      <el-col>
        <el-card class="cardMargin">
          <el-row>
            <el-col>
              <el-form
                ref="mainForm"
                :model="mainTableParams"
                style="font-size：14px"
                label-width="84px"
              >
                <el-row class="mainForm">
                  <el-col style="display: flex; justify-content: flex-start">
                    <!-- 查询条件区域 -->
                    <span class="blockSpan">
                      <el-select
                        v-model="mainTableParams.datetype"
                        class="listDate"
                        placeholder="制单日期"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in datetype"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                      <div class="blockDate">
                        <el-date-picker
                          class="unifySize"
                          v-model="mainTableParams.begindate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                        ></el-date-picker>
                        <el-date-picker
                          class="unifySize NoneIcon"
                          v-model="mainTableParams.enddate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                        ></el-date-picker>
                      </div>
                    </span>
                    <el-form-item class="searchMargin" label="订单号：">
                      <vxe-input
                        v-model="mainTableParams.orderNo"
                        class="unifySize marginLeft"
                        placeholder="订单号"
                      ></vxe-input>
                    </el-form-item>
                    <el-form-item class="searchMargin" label="产品名称：">
                      <vxe-input
                        v-model="mainTableParams.orderNo"
                        class="unifySize marginLeft"
                        placeholder="产品名称"
                      ></vxe-input>
                    </el-form-item>
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="站点："
                    >
                      <el-select
                        v-model="mainTableParams.shop"
                        class="unifySize marginLeft"
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
                    <el-button
                      type="danger"
                      class="searchBtn searchMargin"
                      size="small"
                      icon="el-icon-search"
                      >查询</el-button
                    >
                  </el-col>
                  <el-col
                    style="
                      display: flex;
                      justify-content: flex-start;
                      margin-top: 11px;
                      margin-left: -55px;
                    "
                  >
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="币种："
                    >
                      <el-select
                        v-model="mainTableParams.currency"
                        class="unifySize marginLeft"
                        placeholder="币种"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in currencyList"
                          :label="item.chnName"
                          :value="item.Currency"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item class="searchMargin" label="颜色：">
                      <vxe-input
                        v-model="mainTableParams.color"
                        class="unifySize marginLeft"
                        placeholder="颜色"
                      ></vxe-input>
                    </el-form-item>
                    <el-form-item class="searchMargin" label="生产单号：">
                      <vxe-input
                        v-model="mainTableParams.ProductNo"
                        class="unifySize marginLeft"
                        placeholder="生产单号"
                      ></vxe-input>
                    </el-form-item>
                    <el-form-item class="searchMargin" label="是否关闭：">
                      <el-select
                        v-model="mainTableParams.IsClose"
                        class="unifySize marginLeft"
                        placeholder="是否关闭"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in IsClose"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item class="searchMargin" label="明细：">
                      <el-checkbox
                        value="1"
                        true-label="1"
                        false-label="0"
                        v-model="mainTableParams.isdetail"
                      ></el-checkbox>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
            <!-- 按钮区域 -->
            <el-col class="secondBtn">
              <el-button
                type="primary"
                class="smBtn iconBtn el-icon-edit-outline"
                >新增</el-button
              >
              <el-button type="primary" class="smBtn iconBtn el-icon-view"
                >修改</el-button
              >
              <el-button type="primary" class="delBtn iconBtn el-icon-delete"
                >删除</el-button
              >
              <el-button type="primary" class="smBtn iconBtn el-icon-view"
                >复制</el-button
              >
              <el-button type="primary" class="smBtn iconBtn el-icon-view"
                >批报</el-button
              >
              <el-button type="primary" class="smBtn iconBtn el-icon-view"
                >关闭</el-button
              >
              <el-button type="primary" class="iconBtn iconfont kt-icon-caidan"
                >取消关闭</el-button
              >
              <el-button type="primary" class="smBtn iconBtn el-icon-view"
                >打印</el-button
              >
              <el-button type="primary" class="iconBtn iconfont kt-icon-caidan"
                >打印列表</el-button
              >
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <!-- 主表区域 -->
      <el-col class="mainTable">
        <el-card style="margin-top：11px">
          <vxe-grid
            border
            resizable
            stripe
            width="auto"
            show-footer
            :footer-method="footerMethod"
            :footer-cell-class-name="footerCellClassName"
            show-overflow="title"
            :header-cell-class-name="hearderClass"
            :row-class-name="cellClass"
            height="656"
            :columns="columns"
            highlight-current-row
            :config="{ render: 'scroll' }"
            :align="'center'"
            :checkbox-config="{ highlight: true, range: true }"
            :data="orderManagementList"
          >
          </vxe-grid>
          <!-- 分页 -->
          <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paging.page"
            background
            :page-sizes="[20, 30, 40, 50]"
            :page-size="paging.limit"
            layout="prev,pager,next,total,sizes,jumper"
            :total="paging.total"
          >
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: 'priceAdjustmentSheet',
  data() {
    return {
      // 主表类
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      orderManagementList: [], //订单管理表数据
      mainTableParams: {
        //主表订单管理表数据
        datetype: '',
        begindate: '',
        enddate: '',
        currency: '',
        orderNo: '',
        ProductNo: '',
        color: '',
        IsClose: '2',
        isdetail: '0',
      },
      currencyList: [],
      footerCellClassName: 'footerCellClassName',
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '60', title: '状态', field: '状态' },
        { width: '60', title: '关闭', field: '关闭' },
        { width: '80', title: '订单号', field: '订单号' },
        { width: '80', title: '站点', field: '站点' },
        { width: '60', title: '币种', field: '币种' },
        { width: '100', title: '下单日期', field: '下单日期' },
        { width: '100', title: '订单数量', field: '订单数量' },
        { width: '100', title: '催单数', field: '催单数' },
        { title: '生产下单数', field: '生产下单数' },
        { title: '生产下单片数', field: '生产下单片数' },
        { width: '100', title: '部门', field: '部门' },
        { width: '150', title: '制单人', field: '制单人' },
        { width: '150', title: '制单日期', field: '制单日期' },
        { width: '130', title: '下一步操作', field: '下一步操作' },
        { width: '130', title: '下一步操作人', field: '下一步操作人' },
      ],
      datetype: [
        //日期类型
        {
          value: '1',
          label: '制单日期',
        },
        {
          value: '2',
          label: '生效日期',
        },
      ],
      paging: { list: [], data: [], limit: 20, total: null, page: 1 }, //主表分页
      shopList: [],
      IsClose: [
        { value: '1', label: '是' },
        { value: '2', label: '否' },
      ],
    }
  },
  methods: {
    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          switch (column.property) {
            case '订单数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].订单数量
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.paging.data = this.orderManagementList
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
    // 获取站点列表
    addProductState() {
      this.$api.publicApi
        .basShop()
        .then((res) => {
          if (res.Code < 0) {
            this.$message({
              message: res.Message,
              type: 'error',
            })
          } else {
            console.log(res)
            this.shopList = res.Value.Bas_ShopList
          }
        })
        .catch((err) => console.log(err))
    },
    // 获取货币列表
    addProductCurrency() {
      this.$api.publicApi
        .bcCurrency()
        .then((res) => {
          if (res.Code < 0) {
            this.$message({
              message: res.Message,
              type: 'error',
            })
          } else {
            this.currencyList = res
          }
        })
        .catch((err) => console.log(err))
    },
    getNowDate() {
      // 拿到当前时间
      let nowDate = new Date()
      console.log(nowDate)
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
      this.$set(this.mainTableParams, 'enddate', toMonth)
      this.$set(this.mainTableParams, 'begindate', startTime)
    },
  },
  computed: {},
  created() {
    this.addProductState()
    this.getNowDate()
    this.addProductCurrency()
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  background-color: #f5f8ff;
  padding: 10px;
  .cardMargin {
    margin-top: 0px !important;
  }
  .blockSpan {
    display: flex;
    height: 32px;
    width: 443px;
    justify-content: start;
    border-radius: 4px;
    border: 1px solid #c7c6de;
  }
  .listDate .el-input__inner {
    height: 30px;
    padding: 0 0 0 5px;
    width: 99px;
    border-radius: 4px 0 0 4px;
  }
  .listDate .el-input__inner::placeholder {
    color: #333;
  }
  .listDate .el-input__icon {
    line-height: normal;
  }
  .listDate .el-icon-arrow-up:before {
    color: #333;
  }
  .listDate .el-input__inner {
    background: #f3f3f3;
  }
  .blockDate .el-input__inner {
    height: 30px;
    width: 290px;
    border: none;
  }
  .blockDate .el-input__inner input {
    width: 125px !important;
  }
  .blockDate .el-input__icon {
    height: 30px;
  }
  .blockDate .el-range-separator {
    height: 30px;
    padding: 0;
  }
  .mainForm .el-form-item__content {
    line-height: normal;
  }
  .mainForm .el-form-item__label {
    line-height: 30px;
  }
  .mainForm .marginLeft {
    margin-left: 0px;
  }
  .searchMargin {
    margin-left: 15px;
    margin-bottom: 0;
  }
  .el-card {
    width: 100%;
    padding: 11px;
    margin-top: 11px;
    .el-card__body {
      padding: 0;
      .mixInput {
        width: 310px;
        display: flex;
        height: 30px;
        border: 1px solid #c7c6de;
        border-radius: 2px;
        .el-input-group__append {
          border: none;
          width: 30px;
          padding: 0;
        }
      }
    }
  }
  .footerCellClassName {
    background: #d1f3ff;
  }
  .searchBtn {
    width: 70px !important;
    height: 30px !important;
    background: #ff9b22 !important;
    border: 1px solid #ff9b22 !important;
    margin-left: 22px;
  }
  .mainTable .el-card {
    height: 100%;
  }
  .marginLeft {
    margin-left: 22px;
  }
  .delBtn {
    width: 70px !important;
    background: #ff9b22 !important;
    border: 1px solid #ff9b22 !important;
  }
  .el-checkbox {
    line-height: 30px;
  }
  .secondBtn {
    margin-top: 11px;
    font-size: 14px;
    color: #333;
    .smBtn {
      width: 70px !important;
    }

    .iconBtn {
      width: 100px;
      height: 32px;
      background: #5473e8;
      border-radius: 2px;
      font-size: 14px;
      font-weight: 400;
      color: #fcfefe;
      padding: 0;
    }
  }

  .el-button + .el-button {
    margin-left: 0px;
  }
  .el-button--primary {
    border-color: #5473e8;
  }

  .marginLeft {
    margin-left: -62px;
  }
  .saveAnd {
    width: 100px;
    height: 30px;
    border-radius: 2px;
    line-height: 30px;
    padding: 0px;
    background-color: #21bdca;
    border: 1px solid #21bdca !important;
  }
  .saveAnd1 {
    width: 100px;
    height: 30px;
    border-radius: 2px;
    line-height: 30px;
    padding: 0px;
    background-color: #ccc;
    border: 1px solid #ccc !important;
  }
  .sizeMarginLeft {
    margin-left: -50px;
  }
  .chooseEnter {
    width: 70px;
    height: 32px;
    background: #5473e8;
    border-radius: 2px;
    line-height: 32px;
    padding: 0;
  }
  .Bottom-Border input {
    border: none !important;
    border-radius: 0px;
    border-bottom: 1px solid #bbb !important;
  }
  .None-Border input {
    border: none !important;
    outline: none !important;
  }
  .unifySize {
    width: 150px !important;
    height: 30px;
  }
  .None-Border {
    height: 100%;
  }
  .unifySize input {
    height: 30px;
  }
  .unifySize .el-input {
    width: 150px;
  }
  .el-input__inner input {
    width: 150px !important;
  }
  .None-Border .el-input-group__prepend {
    border: none;
    border-radius: 2px;
  }
  .el-input-group__append {
    width: 30px;
    height: 100%;
  }
  .None-Border .el-input__icon {
    line-height: normal;
  }
  .None-Border .el-input__inner {
    height: 28px;
  }
  .inputSize input {
    width: 100px;
    border-right: none !important;
    outline: none !important;
  }
  .inputSize .el-input__inner {
    width: 100px;
    height: 100%;
  }
  .inputSize .el-input-group {
    height: 100%;
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
  .hearderClass {
    text-align: center;
    font-size: 14px;
    height: 36px;
    background-color: #d5deff;
  }
  .cellClass {
    height: 31px;
  }
  .clearBtn {
    width: 70px;
    height: 30px;
    border-radius: 2px;
    line-height: 30px;
    padding: 0px;
    background-color: #908fa0;
    border: 1px solid #908fa0 !important;
  }
  .pagination {
    float: right;
    margin-top: 20px;
  }
  .unifySize .el-input__icon {
    line-height: normal;
  }
  .el-form-item__label {
    padding: 0;
  }
  .iconP {
    font-size: 22px;
    color: #5473e8;
    float: right;
    transform: rotate(90deg);
  }
  .Mask {
    display: block;
    z-index: 999999;
    width: 100%;
    height: 100%;
    background: #808080;
  }
  .iconC {
    font-size: 22px;
    color: #5473e8;
  }
  .el-dialog {
    height: 800px;
  }
  .blockDate .el-input__inner {
    width: 140px;
  }
  .jy_wrapper .el-dialog__body {
    border-bottom: none !important;
  }
  .el-dialog .el-dialog__header {
    background: #c5c5c5;
    height: 40px;
  }
  .NoneIcon .el-input__prefix {
    display: none;
  }
  .NullTip {
    position: absolute;
    z-index: 9999;
    left: 50%;
    top: 400px;
    transform: translate(-50%, 50%);
  }
}
</style>