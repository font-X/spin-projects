<template>
  <div>
    <div style="width: 100%; padding-left: 30px">
      <div class="progressitem" v-on:click="proressClick(-1,'')">       
        <div class="progressbutton" v-bind:class="{ progresscurrent:-1==curProgrese}">全部</div>
        <div class="progressarrow" v-bind:class="{ progressarrowcurrent:-1==curProgrese}"></div>
        <div class="progressarrowborder"></div>
      </div>
      <div class="progressitem" :key="index" v-for="(item, index) in progressItem1"
        v-on:click="proressClick(index,item.Schedule)">
        <div class="progressarrowfirst"></div>
        <div class="progressarrowborder" style="left:1px;"></div>
        <div class="progressbutton" v-bind:class="{ progresscurrent:index==curProgrese}">{{ item.chnName }}</div>
        <div class="progressarrow" v-bind:class="{ progressarrowcurrent:index==curProgrese}"></div>
        <div class="progressarrowborder"></div>
      </div>
    <div class="progressitem" style=" width: 40px;"></div>   
      <div class="progressitem" :key="index+100" v-for="(item, index) in progressItem2"
        v-on:click="proressClick(index+100,item.Schedule)">
        <div class="progressarrowfirst" v-if="index>0"></div>
        <div class="progressarrowborder" style="left:1px;"  v-if="index>0"></div>
        <div class="progressbutton" v-bind:class="{ progresscurrent:index+100==curProgrese}">{{ item.chnName }}</div>
        <div class="progressarrow" v-bind:class="{ progressarrowcurrent:index+100==curProgrese}"></div>
        <div class="progressarrowborder"></div>
      </div>
    </div>
    <div>
      <el-card style="width: 100%">
        <el-form
          ref="mainForm"
          :model="queryParams"
          style="font-size：12px"
          label-width="84px"
          :inline="true"
        >
              <el-form-item class="searchMargin" label="订单号：">
                <vxe-input
                  v-model="queryParams.PlanNo"
                  placeholder="订单号"
                  size="mini"
                  style="width:160px"
                ></vxe-input>
              </el-form-item>
              <el-form-item class="searchMargin" label="">
                <el-select
                  v-model="queryParams.DateType"
                  placeholder="制单日期"
                  size="mini"
                  class="filterInput"
                  style="width:120px"
                >
                  <el-option
                    :key="index"
                    v-for="(item, index) in DropDateType"
                    :label="item.TermName"
                    :value="item.TermNo"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="searchMargin" label="">
                <el-date-picker
                  v-model="queryParams.BeginDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions1"
                  placeholder="开始日期"
                  size="mini"
                  style="width: 150px"
                ></el-date-picker>
              </el-form-item>
              <el-form-item class="searchMargin" label="">
                <el-date-picker
                  v-model="queryParams.EndDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions2"
                  placeholder="结束日期"
                  size="mini"
                  style="width: 150px"
                ></el-date-picker>
              </el-form-item>
              <el-form-item class="searchMargin" label="">
                <el-select
                  v-model="queryParams.cDefine1"
                  @change="cDefine1Changed(queryParams.cDefine1)"
                  placeholder="查询项目"
                  size="mini"
                  class="filterInput"
                  style="width:120px"
                >
                  <el-option
                    :key="index"
                    v-for="(item, index) in UserDefined"
                    :label="item.TermName"
                    :value="item.TermNo"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="searchMargin" label="">
                <el-select v-if="useddlItems.length>0"
                  v-model="queryParams.cDefine1_Value"
                  placeholder="项目值"
                  size="mini"
                  class="filterInput"
                >
                  <el-option
                    :key="index"
                    v-for="(item, index) in useddlItems"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <vxe-input v-else
                  v-model="queryParams.cDefine1_Value"
                  placeholder="项目值"
                  size="mini"
                  class="filterInput"
                ></vxe-input>
              </el-form-item>
              <el-form-item class="searchMargin" label="记录数：">
                <vxe-input
                  v-model="queryParams.Row"
                  placeholder="记录数"
                  size="mini"
                  style="width:60px"
                ></vxe-input>
              </el-form-item>
              <el-form-item class="searchMargin" label="">
                <el-select
                  v-model="queryParams.View"
                  placeholder="预定义项"
                  size="mini"
                  class="filterInput"
                >
                  <el-option
                    :key="index"
                    v-for="(item, index) in DropView"
                    :label="item.ViewName"
                    :value="item.ViewNo"
                  ></el-option>
                </el-select>
              </el-form-item>
            <el-button
              type="primary"
              class="searchBtn searchMargin"
              size="mini"
              :loading="IsSearch"
              @click="serach"
              icon="iconfont kt-icon-sousuo_o"
              style="height:27px;margin-top:7px;padding-top:3px"
              >查询</el-button
            >
            <el-button
            v-show="false"
              type="primary"
              class="searchBtn searchMargin"
              size="mini"
              @click="serachSelect"
              icon="iconBtn iconfont kt-icon-caidan"
              >对比</el-button
            >
        </el-form>
      </el-card>
    </div>
    <vxe-table
      border
      resizable
      stripe
      width="auto"
      :auto-resize="true"
      show-overflow
      show-header-overflow
      :height="curHeight"
      class="mytable-scrollbar"
      highlight-current-row
      :config="{ render: 'scroll' }"
      :align="'center'"
      :checkbox-config="{ highlight: true }"
      :data="paging.data"
      @cell-click="selectionRowsEvent"
      @cell-dblclick="celldoubleclickEvent"
    >
      <vxe-table-column type="checkbox" width="40"></vxe-table-column>
      <vxe-table-column type="seq" width="60" title="序号"></vxe-table-column>
      <vxe-table-column
        v-for="(item, index) in tableColumns"
        :key="index"
        v-bind="item"
      >
      </vxe-table-column>
    </vxe-table>
    <!--工具条-->
    <el-col :span="24" class="el-table_footertoolbar" style="text-align:right">
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paging.page"
        background
        :page-sizes="[100, 200, 500]"
        :page-size="paging.limit"
        layout="prev,pager,next,total,sizes,jumper"
        :total="paging.total"
      >
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'OrderScheduleList',
  data() {
    return {
      rowStyle: { height: '20px' },
      cellStyle: { padding: 0 },
      headcellStyle: { padding: 0, 'background-color': '#F7F6Fd' },
      DropView: [],
      DropDateType: [],
      UserDefined: [],
      progressItem1: [],
      progressItem2: [],
      ddlItems: [],
      useddlItems: [],
      tableData: [],
      queryParams: {
        PlanNo: '',
        DateType: 'a.Inputdate',
        BeginDate: '',
        EndDate: '',
        Schedule: '',
        Row: 100,
        cDefine1: '',
        cDefine1_Value: '',
        View: '',
        sPlanNo: '',
      },

      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > new Date(val).getTime()
        },
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > new Date(val).getTime()
        },
      },
      selectRow: null,
      IsSearch: false,
      curHeight: 300,
      curProgrese: -1,
      paging: { list: [], data: [], limit: 100, total: null, page: 1 },
      tableColumns: [
        {
          field: '进度',
          title: '进度',
          width: '90',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '加工类型',
          title: '加工类型',
          width: '120',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '指示单号',
          title: '指示单号',
          width: '120',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '产品编码',
          title: '产品编码',
          width: '120',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '品名',
          title: '品名',
          width: '160',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '交期',
          title: '交期',
          width: '90',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '订单数量',
          title: '订单数量',
          width: '120',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '单位',
          title: '单位',
          width: '80',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '染厂',
          title: '染厂',
          width: '160',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '坯布交期',
          title: '坯布交期',
          width: '120',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '订坯匹数',
          title: '订坯匹数',
          width: '120',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '订坯数',
          title: '订坯数',
          width: '90',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '到坯匹数',
          title: '到坯匹数',
          width: '120',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '到坯数',
          title: '到坯数',
          width: '90',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '投缸数',
          title: '投缸数',
          width: '90',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '到货数',
          title: '到货数',
          width: '90',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '检验数',
          title: '检验数',
          width: '90',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '正品数',
          title: '正品数',
          width: '90',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '入库数',
          title: '入库数',
          width: '90',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '发货数',
          title: '发货数',
          width: '120',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '回修数',
          title: '回修数',
          width: '90',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '到坯日期',
          title: '到坯日期',
          width: '120',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '到货日期',
          title: '到货日期',
          width: '120',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '到货仓库',
          title: '到货仓库',
          width: '120',
          align: 'left',
          showOverflowTooltip: true,
        },
        {
          field: '注释',
          title: '注释',
          width: '160',
          align: 'left',
          showOverflowTooltip: true,
        },
      ],
    }
  },
  methods: {
    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.paging.data = this.tableData
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
    proressClick(index, val) {
      this.curProgrese = index
      this.queryParams.Schedule = val
      this.serach()
    },
    cDefine1Changed(val){
      this.queryParams.cDefine1_Value=''
      this.useddlItems=this.ddlItems.filter(item=>item.TermNo==val)
    },
    selectionRowsEvent(row) {
      this.selectRow = row.row
    },
    celldoubleclickEvent(row){
      this.$store.commit("pushNavTree",{
        MenuCode: "ls001",
        MenuName: "订单详情",
        LinkUrl: 'BusinessManagement/OrderScheduleDetil?PlanNo='+row.row.PlanNo
      });
    },
    serachSelect() {
      if (this.selectRow == null) {
        alert('请选择一行数据')
        retuen
      }
      this.queryParams.sPlanNo = this.selectRow.PlanNo
      this.serach()
    },
    serach() {
      this.IsSearch = true
      this.$api.order
        .orderScheduleList({ model: { ...this.queryParams } })
        .then((res) => {
          if (res.statusCode == 200) {
            this.tableData = res.data
            this.pageList()
          } else {
            this.$message({
              message: res.message,
              type: 'error',
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.IsSearch = false
          this.queryParams.sPlanNo = ''
        })
    },
  },
  computed: {},
  created() {
    this.serach()
  },
  mounted() {
    var h = document.documentElement.clientHeight || document.body.clientHeight
    this.curHeight = h - 270
    let d = new Date()
    this.queryParams.EndDate =
      d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    d.setTime(d.getTime() - 24 * 3600000 * 90)
    this.queryParams.BeginDate =
      d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()

    this.$api.order
      .orderScheduleInit()
      .then((res) => {
        if (res.statusCode == 200) {
          //console.info(res.data.progressItem2)
          this.DropView = res.data.DropView
          this.DropDateType = res.data.DropDateType
          this.UserDefined = res.data.UserDefined
          this.progressItem1 = res.data.progressItem1
          this.progressItem2 = res.data.progressItem2
          this.ddlItems = res.data.ddlItems
          if (this.DropView && this.DropView.length > 0) {
            this.queryParams.View = this.DropView[0].ViewNo
          }
        } else {
          this.$message({
            message: res.message,
            type: 'error',
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>
<style lang="scss" scoped>
.filterInput {
  width: 160px;
}
.searchMargin {
  margin-left: 15px;
  margin-bottom: 0;
}
.progressitem {
  display: inline-block;
  position: relative;
  border: none;
  width: 82px;
  height: 30px;
  background-color: transparent;
}
.progressbutton {
  position: absolute;
  left: 0px;
  width: 70px;
  height: 24px;
  background: #eee;
  border: 1px solid #928d8d;
  border-right: none;
  margin: 0px;
  padding-top: 2px;
  text-align: center;
  padding-left: 8px;
  color: blue;
  font-size: 12px;
  z-index: 3;
}
.progressarrowfirst {
  position: absolute;
  left: 0px;
  width: 0;
  height: 0;
  border-width: 12px;
  border-top-width: 12px;
  border-style: solid;
  border-color: transparent transparent transparent white;
  margin: 0px;
  z-index: 6;
}
.progressarrow {
  position: absolute;
  left: 69px;
  width: 0;
  height: 0;
  border-width: 12px;
  border-top-width: 12px;
  border-style: solid;
  border-color: transparent transparent transparent #eee;
  margin: 0px;
  z-index: 6;
}
.progressarrowborder {
  position: absolute;
  left: 70px;
  width: 0;
  height: 0;
  border-width: 12px;
  border-top-width: 12px;
  border-style: solid;
  border-color: transparent transparent transparent #928d8d;
  margin: 0px;
  z-index: 4;
}
.progressbutton:hover {
  color: red;
}
.progresscurrent {
  color: white;
  background-color: rgb(33, 106, 175);
}
.progressarrowcurrent {
  border-color: transparent transparent transparent rgb(33, 106, 175);
}
</style>