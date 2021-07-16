<template>
  <el-container id="mainCard">
    <el-card id="queryRow">
      <el-form
        :model="reminderParams"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row class="marginL">
          <el-col :md="5" :lg="5" :xl="5"
            ><el-form-item label="制单时间:">
              <span class="blockDate">
                <el-date-picker
                  v-model="reminderParams.BeginDate"
                  class="None-Border"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="制单开始时间"
                ></el-date-picker>
                <el-date-picker
                  v-model="reminderParams.EndDate"
                  class="None-Border"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="制单结束时间"
                ></el-date-picker>
              </span> </el-form-item
          ></el-col>
          <el-col :md="3" :lg="3" :xl="3">
            <el-form-item label="站点:">
              <el-select
                clearable
                v-model="reminderParams.Shop"
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
          <el-col class="marginLe" :md="3" :lg="3" :xl="3">
            <el-form-item label="状态:">
              <el-select
                clearable
                v-model="reminderParams.isFinish"
                class="unifySize marginLeft"
                placeholder="请选择"
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in status"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="条码/产品号:">
              <el-autocomplete
                clearable
                v-model="reminderParams.P_Code"
                :fetch-suggestions="querySearch3"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="产品名称:">
              <el-autocomplete
                clearable
                v-model="reminderParams.P_chnName"
                :fetch-suggestions="querySearch4"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="样式:">
              <el-autocomplete
                clearable
                v-model="reminderParams.Pattern"
                :fetch-suggestions="querySearch4"
              />
            </el-form-item>
          </el-col>
          <el-col v-show="iconShow" :md="5" :lg="3" :xl="3">
            <el-button
              type="danger"
              class="searchBtn"
              size="small"
              @click="getReminderList()"
              :loading="isLoading"
              icon="iconfont kt-icon-sousuo_o"
              >查询</el-button
            >
            <el-button
              type="danger"
              class="closeInput shrink"
              size="small"
              @click="IconShow"
              icon=" iconfont kt-icon-anniu_jiantouzhankai"
              >展开</el-button
            >
          </el-col>
        </el-row>
        <el-row v-show="!iconShow" class="marginL">
          <el-col :md="3" :lg="3" :xl="3">
            <el-form-item label="颜色:">
              <!-- <el-input
                clearable
                v-model="reminderParams.contractCode"
                placeholder="请输入订单号"
              ></el-input> -->
              <el-autocomplete
                clearable
                v-model="reminderParams.Color"
                :fetch-suggestions="querySearch2"
                placeholder="请输入颜色"
              />
            </el-form-item>
          </el-col>
          <el-col :md="3" :lg="3" :xl="3">
            <el-form-item label="尺寸:">
              <!-- <el-input
                clearable
                v-model="reminderParams.contractCode"
                placeholder="请输入订单号"
              ></el-input> -->
              <el-autocomplete
                clearable
                v-model="reminderParams.P_Spec"
                :fetch-suggestions="querySearch2"
                placeholder="请输入尺寸"
              />
            </el-form-item>
          </el-col>
          <el-col :md="4" :lg="4" :xl="4">
            <el-button
              type="danger"
              class="searchBtn"
              size="small"
              :loading="isLoading"
              @click="getReminderList()"
              icon="iconfont kt-icon-sousuo_o"
              >查询</el-button
            >
            <el-button
              type="danger"
              class="shrink closeInput"
              size="small"
              @click="IconShow"
              icon=" iconfont kt-icon-anniu_jiantoushouqi"
              >收起</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <!-- 按钮区域 -->
          <el-col class="secondBtn">
            <!-- <el-button
              type="primary"
              @click="distributionBtn"
              class="iconBtn iconfont kt-icon-caidan"
              >自动分配</el-button
            > -->
            <el-button type="primary" class="iconBtn iconfont kt-icon-daochu"
              >导出Excel</el-button
            >
            <el-button type="primary" class="iconBtn el-icon-s-claim"
              >生产下单</el-button
            >
            <el-button type="primary" class="iconBtn2 el-icon-shopping-bag-1"
              >成品采购</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 下方表格区域 -->
    <el-row :gutter="10">
      <el-col :span="24" style="padding-right: 0px">
        <el-card class="marginTop">
          <!-- 表格 -->
          <el-row>
            <el-col style="margin-bottom: 5px">
              <vxe-table
                ref="leftTable"
                border
                resizable
                stripe
                class="mytable-scrollbar"
                keep-source
                show-footer
                :export-config="{ original: true }"
                :footer-method="leftfooterMethod"
                :row-class-name="cellClass"
                :footer-cell-class-name="footerCellClassName"
                show-overflow
                height="400"
                :auto-resize="true"
                :edit-config="{ trigger: 'click', mode: 'cell' }"
                :header-row-class-name="hearderClassNoHeight"
                highlight-current-row
                :config="{ render: 'scroll' }"
                :align="'center'"
                :checkbox-config="{ highlight: true }"
                :data="bottomTableLeft"
              >
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  type="checkbox"
                  width="45"
                ></vxe-table-column>
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  type="seq"
                  width="50"
                  title="序号"
                ></vxe-table-column>
                <vxe-table-column
                  :align="'left'"
                  :class-name="cellChooseClassLeft"
                  field=""
                  width="220"
                  title="电商订单号"
                ></vxe-table-column>
                <vxe-table-column
                  :align="'left'"
                  :class-name="cellChooseClassLeft"
                  field=""
                  width="220"
                  title="产品号"
                ></vxe-table-column>
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  min-width="200"
                  field="产品号"
                  title="产品名称"
                >
                </vxe-table-column>
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  width="60"
                  field="样式"
                  title="样式"
                ></vxe-table-column>
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  width="50"
                  field="色号"
                  title="色号"
                >
                </vxe-table-column>
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  width="50"
                  field="颜色"
                  title="颜色"
                >
                </vxe-table-column>
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  width="80"
                  field="尺寸"
                  title="尺寸"
                >
                </vxe-table-column>
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  width="80"
                  field="尺寸单位"
                  title="尺寸单位"
                >
                </vxe-table-column>
                <vxe-table-column
                  width="80"
                  :class-name="cellChooseClassLeft"
                  field="订单数量"
                  title="订单数量"
                >
                </vxe-table-column>
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  width="80"
                  field=""
                  title="急需下单"
                >
                </vxe-table-column>
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  width="80"
                  field="需下单数"
                  title="需下单数"
                ></vxe-table-column>
                <vxe-table-column
                  width="60"
                  :class-name="cellChooseClassLeft"
                  field="单位"
                  title="单位"
                ></vxe-table-column>
                <vxe-table-column
                  width="73"
                  :class-name="cellChooseClassLeft"
                  field="优先级"
                  title="优先级"
                >
                </vxe-table-column>
                <vxe-table-column
                  :class-name="cellChooseClassLeft"
                  width="60"
                  field="站点"
                  title="站点"
                ></vxe-table-column>
              </vxe-table>
            </el-col>
          </el-row>
        </el-card>
        <el-card style="margin-top: 5px">
          <div class="titleTable2">订单产品统计</div>
          <el-col>
            <vxe-table
              ref="leftTable"
              border
              resizable
              stripe
              class="mytable-scrollbar"
              keep-source
              show-footer
              :export-config="{ original: true }"
              :footer-method="leftfooterMethod"
              :row-class-name="cellClass"
              :footer-cell-class-name="footerCellClassName"
              show-overflow
              height="300"
              :auto-resize="true"
              :edit-config="{ trigger: 'click', mode: 'cell' }"
              :header-cell-class-name="hearderClassNoHeight"
              highlight-current-row
              :config="{ render: 'scroll' }"
              :align="'center'"
              :checkbox-config="{ highlight: true }"
              :data="bottomTableLeft"
            >
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                type="checkbox"
                width="45"
              ></vxe-table-column>
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                type="seq"
                width="50"
                title="序号"
              ></vxe-table-column>
              <vxe-table-column
                :align="'left'"
                :class-name="cellChooseClassLeft"
                field="订单编号"
                width="120"
                title="产品号"
              ></vxe-table-column>
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                min-width="200"
                field="产品号"
                title="订单号"
              >
              </vxe-table-column>
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                width="60"
                field="数量"
                title="数量"
              ></vxe-table-column>
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                width="80"
                field="取消数量"
                title="取消数量"
              >
              </vxe-table-column>
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                width="80"
                field="实际数量"
                title="实际数量"
              >
              </vxe-table-column>
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                width="80"
                field=""
                title="急需下单"
              >
              </vxe-table-column>
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                width="80"
                field="需下单数"
                title="需下单数"
              >
              </vxe-table-column>

              <vxe-table-column
                width="80"
                :class-name="cellChooseClassLeft"
                field="订单数量"
                title="订单数量"
              >
              </vxe-table-column>
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                width="80"
                field=""
                title="急需下单"
              >
              </vxe-table-column>
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                width="80"
                field="需下单数"
                title="需下单数"
              ></vxe-table-column>
              <vxe-table-column
                width="60"
                :class-name="cellChooseClassLeft"
                field="单位"
                title="单位"
              ></vxe-table-column>
              <vxe-table-column
                width="73"
                :class-name="cellChooseClassLeft"
                field="优先级"
                title="优先级"
              >
                <!-- :edit-render="{
                    name: '$select',
                    options: priorityList,
                    autoselect: true,
                  }" -->
              </vxe-table-column>
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                width="60"
                field="站点"
                title="站点"
              ></vxe-table-column>
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                width="60"
                field="备注"
                title="备注"
              ></vxe-table-column>
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                width="80"
                field="催单时间"
                title="催单时间"
              ></vxe-table-column>
              <vxe-table-column
                :class-name="cellChooseClassLeft"
                width="80"
                field="排单时间"
                title="排单时间"
              ></vxe-table-column>
            </vxe-table>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import FileSaver from 'file-saver'
import JyDialog from '@/components/JyDialog'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      gridHeight: 0,
      // 主催单表参数
      reminderParams: {
        BeginDate: '',
        EndDate: '',
        P_Code: '',
        isFinish: '0',
        Pattern: '',
        Color: '',
        P_Spec: '',
        P_chnName: '',
        Shop: '',
      },

      cellClass: 'cellClass',
      columnIcon: '◇', //列分隔符
      //生产下单状态
      status: [
        {
          value: '',
          label: '',
        },
        {
          value: '0',
          label: '急需下单',
        },
        {
          value: '1',
          label: '无需下单',
        },
      ],
      // priorityList: [
      //   { label: '三星', value: '03' },
      //   { label: '四星', value: '04' },
      //   { label: '五星', value: '05' },
      // ],

      footerCellClassName: 'footerCellClassName',
      cellChooseClassLeft: 'cellChooseClassLeft',
      hearderClassNoHeight: 'hearderClassNoHeight',
      iconShow: false,
      isLoading: false,
      bottomTableLeft: [],
      shopList: [],
    }
  },
  methods: {
    // 增加输入框的记忆功能
    // 存放查询记录
    handleSearchHistory(localName, paramsName) {
      let searchWordArray = localStorage.getItem(localName)
      if (searchWordArray === null) {
        return
      } else {
        searchWordArray = searchWordArray.split(',')
        if (searchWordArray.indexOf(paramsName) === -1) {
          searchWordArray.unshift(paramsName)
        }
        if (searchWordArray.length > 6) {
          searchWordArray.pop()
        }
        localStorage.setItem(localName, searchWordArray)
      }
    },
    // 渲染历史记录
    getInvoiceAccountHistory(localName) {
      let searchWordArray = localStorage.getItem(localName)
      if (searchWordArray === null) {
        localStorage.setItem(localName, [])
      } else {
        searchWordArray = searchWordArray.split(',')
        let invoiceAccountHistory = []
        for (let i = 0; i < searchWordArray.length; i++) {
          let item = {
            value: searchWordArray[i],
            label: searchWordArray[i],
          }
          invoiceAccountHistory.push(item)
        }
        return invoiceAccountHistory
      }
    },
    createFilter(queryString) {
      return (invoiceAccount) => {
        return (
          invoiceAccount.value
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    // 返回输入建议的方法(订单号：)
    querySearch(queryString, cb) {
      var invoiceAccountHistory =
        this.getInvoiceAccountHistory('reminder-p_Code')
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 返回输入建议的方法(订单号：)
    querySearch2(queryString, cb) {
      var invoiceAccountHistory =
        this.getInvoiceAccountHistory('reminder-orderNo')
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 返回输入建议的方法(订单号：)
    querySearch3(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory(
        'reminder-filterProduceNo'
      )
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 返回输入建议的方法(尺寸)
    querySearch4(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory(
        'reminder-filterp_size'
      )
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 返回输入建议的方法(颜色)
    querySearch5(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory(
        'reminder-filtercolor'
      )
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 返回输入建议的方法(尺寸)
    querySearch6(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory(
        'reminder-filtersize'
      )
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 导出excel
    exportExcel() {
      const ws = XLSX.utils.json_to_sheet(this.bottomTableLeft)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
      XLSX.writeFile(wb, '电商订单.xls', {
        bookType: 'xls',
        bookSST: false,
        type: 'array',
      })
    },

    IconShow() {
      this.iconShow = !this.iconShow
    },

    getReminderList() {
      this.isLoading = true
      this.$api.publicApi
        .GetProcedureDataSet({
          code: 'ord_TdContractDPaidanQuery',
          pars: {
            ...this.reminderParams,
          },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.bottomTableLeft = res.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    // righTopfooterMethod() {},
    // 底部左侧表尾合计
    leftfooterMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          }
          switch (column.property) {
            case '数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].数量)
              }
              return sums

            case '取消数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].取消数量)
              }
              return sums

            case '原始数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].原始数量)
              }
              return sums
            case '急需下单数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].急需下单数)
              }
              return sums
            case '待下单数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].待下单数)
              }
              return sums
            case '已下单数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].已下单数)
              }
              return sums
            case '本次催单':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                if (data[i]['本次催单'] === undefined) {
                  data[i]['本次催单'] = 0
                }
                sums += Number(data[i]['本次催单'])
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    // 获取站点列表
    addProductState() {
      this.$api.publicApi
        .basShop()
        .then((res) => {
          if (res.Code < 0) {
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
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        this.gridHeight = card - queryRow - 60
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
      this.$set(this.reminderParams, 'EndDate', toMonth)
      this.$set(this.reminderParams, 'BeginDate', startTime)
    },
  },
  created() {
    this.addProductState()
    this.getNowDate()
    this.getReminderList()
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
  display: block;
  background: rgb(245, 248, 255);
}
.el-card {
  width: 100%;
  background: #fff;
  >>> .el-card__body {
    padding: 10px;
    width: 100%;
  }
}
>>> .titleTable2 {
  font-weight: 700;
  font-size: 16px;
}
// 开始-结束时间选择器
>>> .el-form-item__content {
  line-height: 28px !important;
  margin-top: 5px !important;
}
.blockDate {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  border: 1px solid #c7c6de;
  height: 30px;
  >>> [data-v-a2d140fa] .el-input__inner {
    height: 28px;
  }
  >>> .None-Border {
    height: 100%;
    >>> .el-input__inner {
      height: 100%;
      width: 100%;
    }
  }
  >>> .el-input__icon {
    line-height: 28px !important;
  }
}
>>> .el-input__icon {
  line-height: 30px;
}
// // 开始-结束时间选择器
>>> .el-input__inner {
  height: 30px;
}
// 收起和查询按钮
.searchBtn {
  width: 70px !important;
  height: 30px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 22px;
  margin-top: 5px;
}
.closeInput {
  width: 70px !important;
  height: 30px !important;
  margin-top: 5px;
}
.el-form-item {
  margin-bottom: 0px;
}
>>> [data-v-7b05455e] .el-input__inner {
  height: 28px;
}
// 第三批按钮
.secondBtn {
  margin-top: 11px;
  font-size: 14px;
  color: #333;
  .iconBtn {
    width: 100px;
    height: 32px;
    border: 1px solid #5473e8;
    background: #5473e8;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #fcfefe;
    padding: 0;
  }
  .iconBtn2 {
    width: 100px;
    height: 32px;
    border: 1px solid #36c2cf;
    background: #36c2cf;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #fcfefe;
    padding: 0;
  }
}
>>> .cellClassLeft {
  color: red;
}
>>> .marginL {
  margin-left: -22px;
}
>>> .marginTop {
  margin-top: 5px;
}
>>> .tableRightTopTitle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
>>> .tableRightTop {
  margin-top: 5px;
}
>>> .marginT {
  margin-top: 5px;
}
>>> .tableRightBottom {
  height: 100%;
}

>>> .cellChooseClass {
  height: 28px;
}
>>> .el-button + .el-button {
  margin-left: 0px;
}

>>> .footerCellClassName {
  background: #d1f3ff;
}

// 控制表格固定线的样式
>>> .vxe-table--render-default
  .vxe-table--fixed-left-wrapper.scrolling--middle {
  box-shadow: none;
}
>>> .vxe-table--render-default.border--full .vxe-table--fixed-left-wrapper {
  border-right: none;
}
// 控制表格行高
>>> .vxe-table--render-default .vxe-body--column,
.vxe-table--render-default .vxe-footer--column,
.vxe-table--render-default .vxe-header--column {
  line-height: 15px;
}
// 主表操作中的三个button
.CloseIcon {
  width: 40px;
  line-height: normal;
  background: #5473e8;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid #5473e8;
}
.NoCloseIcon {
  width: 70px;
  line-height: normal;
  background: #5473e8;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid #5473e8;
}
.SaveIcon {
  width: 40px;
  line-height: normal;
  background: #ff9b22;
  border: 1px solid #ff9b22;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
}
.saveBtnC {
  margin-top: 5px;
  float: right;
}
// 表格中的保存按钮
.saveBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  float: right;
  background-color: #5473e8;
  border: 1px solid #5473e8 !important;
}
>>> .el-button--small,
.el-button--small.is-round {
  padding: 0px;
}
>>> .marginLe {
  margin-left: 30px;
}
>>> .remindetrDetail {
  margin-top: 15px;
}
.productNoStyle {
  height: 32px;
}
.clearBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  margin-right: 4px;
  background-color: #908fa0;
  border: 1px solid #908fa0 !important;
}
>>> .blockDate .el-input__inner {
  height: 28px !important;
}
>>> .hearderClassNoHeight {
  height: 34px;
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  color: #333;
}
>>> .cellClass {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 40px;
}
>>> .shrink {
  border: 1px solid #36c2cf;
  background-color: #36c2cf;
}
>>> .vxe-input .vxe-input--extra-suffix,
.vxe-input .vxe-input--suffix {
  right: 0.2em;
  display: none;
}
>>> .jy-dialog .jy-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
>>> .el-row {
  height: auto;
}
>>> .el-autocomplete {
  width: 100%;
}
</style>