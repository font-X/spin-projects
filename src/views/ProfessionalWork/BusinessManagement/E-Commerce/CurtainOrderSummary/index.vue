<template>
  <el-container id="mainCard">
    <el-card id="queryRow">
      <el-form
        :model="ProductSummaryParams"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :md="8" :lg="6" :xl="5">
            <span class="blockSpan">
              <el-form-item
                label-width="100px"
                class="listDate"
                label="制单日期"
              >
              </el-form-item>
              <div class="blockDate">
                <el-date-picker
                  v-model="ProductSummaryParams.BeginDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
                <el-date-picker
                  class="IconClose"
                  v-model="ProductSummaryParams.endDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
            </span>
          </el-col>
          <el-col :md="8" :lg="5" :xl="3"
            ><el-form-item label-width="80px" label="电商订单:">
              <el-input
              @keyup.enter.native="getCurtainList()"
                v-model="ProductSummaryParams.ContractCode"
                placeholder="请输入电商订单"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :lg="4" :xl="3"
            ><el-form-item label-width="70px" label="产品号:">
              <el-input
               @keyup.enter.native="getCurtainList()"
                v-model="ProductSummaryParams.PCode"
                placeholder="请输入产品号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :lg="5" :xl="3"
            ><el-form-item label="产品名称:">
              <el-input
               @keyup.enter.native="getCurtainList()"
                v-model="ProductSummaryParams.PName"
                placeholder="请输入产品名"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :lg="4" :xl="3"
            ><el-form-item label="颜色:">
              <el-input
               @keyup.enter.native="getCurtainList()"
                v-model="ProductSummaryParams.Color"
                placeholder="请输入颜色"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :lg="3" :xl="3">
            <el-form-item label="是否关闭：">
              <el-select
                class="selectSize"
                v-model="ProductSummaryParams.IsClose"
              >
                <el-option
                  v-for="item in this.IsClose"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-button
            type="danger"
            class="searchBtn"
            size="small"
            icon="el-icon-search"
            :loading="isLoadingBtn"
            @click="getCurtainList"
            >查询</el-button
          >
          <el-button
            type="primary"
            @click="Export"
            class="smBtn3 iconBtn iconfont kt-icon-daochu"
            >导出Excel</el-button
          >
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <vxe-table
        border
        resizable
        stripe
        ref="mainTable"
        width="auto"
        :auto-resize="true"
        class="mytable-scrollbar"
        show-overflow="title"
        :header-row-class-name="hearderClass"
        show-footer
        :footer-cell-class-name="footerCellClassName"
        :footer-method="footerMethod"
        :row-class-name="cellClass"
        show-header-overflow
        show-footer-overflow
        :loading="loading"
        :height="gridHeight"
        highlight-current-row
        :config="{ render: 'scroll' }"
        :align="'center'"
        :checkbox-config="{ highlight: true }"
        :data="paging.data"
      >
        <vxe-table-column
          type="checkbox"
          fixed="left"
          width="40"
        ></vxe-table-column>
        <vxe-table-column
          type="seq"
          fixed="left"
          width="60"
          title="序号"
        ></vxe-table-column>
        <vxe-table-column
          width="200"
          fixed="left"
          title="订单号"
          field="订单号"
        ></vxe-table-column>
        <vxe-table-column
          min-width="210"
          fixed="left"
          field="产品号"
          title="产品号"
        ></vxe-table-column>
        <vxe-table-column
          min-width="240"
          field="产品名称"
          title="产品名称"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="样式"
          title="样式"
        ></vxe-table-column>
        <vxe-table-column
          width="60"
          field="色号"
          title="色号"
        ></vxe-table-column>
        <vxe-table-column
          width="100"
          field="颜色"
          title="颜色"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
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
          field="数量"
          title="订单数量"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="单位"
          title="单位"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="订单片数"
          title="订单片数"
        ></vxe-table-column>
        <vxe-table-column
          width="110"
          field="生产片数"
          title="已生产片数"
        ></vxe-table-column>
        <vxe-table-column
          width="110"
          field="未生产片数"
          title="未生产片数"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="到货片数"
          title="到货片数"
        ></vxe-table-column>
        <vxe-table-column
          width="110"
          field="检验合格数"
          title="检验合格数"
        ></vxe-table-column>
        <vxe-table-column
          width="110"
          field="检验次品数"
          title="检验次品数"
        ></vxe-table-column>
        <vxe-table-column
          width="110"
          field="总检验片数"
          title="总检验片数"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="未检验数"
          title="未检验数"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="制单人"
          title="制单人"
        ></vxe-table-column>
        <vxe-table-column
          width="120"
          field="制单日期"
          title="制单日期"
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
export default {
  data() {
    return {
      ProductSummaryParams: {
        UserCode: '001',
        BeginDate: '',
        endDate: '',
        PCode: '',
        Color: '',
        ContractCode: '',
        PName: '',
        DepotName: '',
        IsClose: '0',
      },
      gridHeight:710,
      SumData: [], // 需渲染合计的数据
      CurtainSunmaryList: [], //返回的表格数据源
      paging: { list: [], data: [], limit: 100, total: null, page: 1 }, //主表分页
      cellClass: 'cellClass',
      IsClose: [
        { name: '否', id: '0' },
        { name: '是', id: '01' },
      ],
      hearderClass: 'hearderClass',
      footerCellClassName: 'footerCellClassName',
      isLoadingBtn: false, //按钮loading效果
      loading: false,
    }
  },
  methods: {
    // 导出excel
    Export() {
      this.$refs.mainTable.exportData({ type: 'csv' })
    },
    // 合计
    footerMethod({ columns }) {
      const data = this.SumData
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          }
          switch (column.property) {
            case '数量':
              return data['数量']
            case '订单片数':
              return data['订单片数']
            case '生产片数':
              return data['生产片数']
            case '未生产片数':
              return data['未生产片数']
            case '到货片数':
              return data['到货片数']
            case '检验合格数':
              return data['检验合格数']
            case '检验次品数':
              return data['检验次品数']
            case '总检验片数':
              return data['总检验片数']
            case '未检验数':
              return data['未检验数']
          }
          return null
        }),
      ]
      return footerData
    },
    getCurtainList() {
      this.loading = true
      this.isLoadingBtn = true
      this.$api.curtainorder
        .getCurtainData({ model: this.ProductSummaryParams })
        .then((res) => {
          if (res.statusCode !== 200) return this.$message(res.message)
          this.$message.success('数据获取成功')
          this.CurtainSunmaryList = res.data[0]
          this.SumData = res.data[1]
          this.pageList()
          this.paging.page = 1
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('请求失败，请重试')
        })
        .finally(() => {
          this.isLoadingBtn = false
          this.loading = false
        })
    },
    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.paging.data = this.CurtainSunmaryList
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
    // 当前页改变
    handleCurrentChange(val) {
      this.paging.page = val
      this.pageList()
    },
    getNowDate() {
      // 拿到当前时间
      let nowDate = new Date()
      // console.log(nowDate)
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let date = nowDate.getDate()
      date = date < 10 ? '0' + date : date
      var toMonth = year + '-' + month + '-' + date
      // 获取一个月前的时间
      var monthDate = new Date()
      monthDate.setMonth(monthDate.getMonth() - 3)
      var startTime =
        monthDate.getFullYear() +
        '-' +
        (monthDate.getMonth() + 1) +
        '-' +
        monthDate.getDate()
      this.$set(this.ProductSummaryParams, 'endDate', toMonth)
      this.$set(this.ProductSummaryParams, 'BeginDate', startTime)
    },
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        this.gridHeight = card - queryRow - 80
      })
    },
  },
  created() {
    this.getNowDate()
    this.$nextTick(() => {
      this.getCurtainList()
    })
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
  padding: 3px 10px 0 10px;
  display: block;
  background: rgb(245, 248, 255);
}
>>> .el-card {
  width: 100%;
  background: #fff;
  margin-bottom: 10px;
}
>>> .el-card__body {
  padding: 10px;
  width: 100%;
}
.blockSpan {
  display: flex;
  padding: 0;
  height: 32px;
  justify-content: start;
  margin-top: 5px;
  border-radius: 4px;
  width:100%;
  border: 1px solid #c7c6de;
  >>> .el-form-item__label {
    height: 40px;
    line-height: 33px;
  }
  >>> .listDate .el-input .el-input__inner {
    height: 30px !important;
    line-height: 30px;
    padding: 0 0 0 0px;
    margin: 0;
    width: 99px !important;
    border-radius: 4px 0 0 4px;
  }
  >>> .listDate .el-input__inner::placeholder {
    color: #333;
  }
  >>> .listDate .el-input__icon {
    line-height: normal;
  }
  >>> .listDate .el-icon-arrow-up:before {
    color: #333;
  }
  >>> .listDate .el-input__inner {
    background: #f3f3f3;
  }
  >>> .blockDate {
    display: flex;
    justify-content: space-between;
  }
  >>> .blockDate .el-input__inner {
    height: 28px;
    width: 100%;
    border: none;
  }
  >>> .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 48%;
  }
  >>> .blockDate .el-input__inner input {
    width: 100px !important;
  }
  >>> .blockDate .el-input__icon {
    height: 30px;
    line-height: 25px;
  }
  >>> .blockDate .el-range-separator {
    height: 30px;
    padding: 0;
  }
  >>> .el-input__suffix {
    right: -7px;
    top: 2px;
  }
}
>>> .cellClass {
  height: 30px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  color: #333;
}
>>> .vxe-table--header .hearderClass {
  text-align: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  color: #333;
  height: 36px !important;
  background-color: #d5deff;
}
.marginL {
  margin-left: -22px;
}

// 输入框高度
>>> .el-input__inner {
  height: 30px;
}
>>> .footerCellClassName {
  text-align: center;
  height: 30px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  color: #333;
  background: #d1f3ff;
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
// 分页样式
>>> .closeTable {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 5px;
}
>>> .smBtn3 {
  width: 120px !important;
}
>>> .iconBtn {
  width: 100px;
  height: 30px;
  background: #5473e8;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 400;
  color: #fcfefe;
  padding: 0;
}
</style>