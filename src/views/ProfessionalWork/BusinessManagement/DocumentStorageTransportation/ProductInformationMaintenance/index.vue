<template>
  <el-container id="mainCard">
    <!-- 信息维护 -->
    <el-row style="width: 100%">
      <el-col>
        <el-card class="cardMargin" id="queryRow">
          <el-row>
            <el-col>
              <el-form
                ref="mainForm"
                :model="QueryParamsTable"
                style="font-size：14px"
                label-width="84px"
              >
                <el-row class="mainForm">
                  <el-col :md="12" :lg="6" :xl="5">
                    <el-form-item label="来样时间：">
                      <span class="blockSpan">
                        <div class="blockDate">
                          <el-date-picker
                            class="unifySize unifySizeDate"
                            v-model="QueryParamsTable.BeginDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                          ></el-date-picker>
                          <el-date-picker
                            class="unifySize unifySizeDate"
                            v-model="QueryParamsTable.EndDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                          ></el-date-picker>
                        </div>
                      </span>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :md="12" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="复核状态："
                    >
                      <el-select
                        v-model="QueryParamsTable.HsStatus"
                        class="unifySize"
                        placeholder="复核状态"
                        clearable
                        @keydown.enter.native="searchEnter"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in HsStatus"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col> -->
                  <el-col :md="5" :lg="3" :xl="4">
                    <el-form-item class="searchMargin" label="产品编号：">
                      <el-input
                        v-model.trim="QueryParamsTable.chnName"
                        class="unifySize"
                        placeholder="产品编号"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="品名中英文："
                    >
                      <el-input
                        v-model="QueryParamsTable.query1"
                        class="unifySize"
                        placeholder="品名中英文"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="规格："
                    >
                      <el-input
                        v-model="QueryParamsTable.query2"
                        class="unifySize"
                        placeholder="规格"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item class="searchMargin" label="成份：">
                      <el-input
                        v-model.trim="QueryParamsTable.ProductType"
                        class="unifySize"
                        placeholder="成份"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="4" :xl="4">
                    <el-button
                      v-show="iconShow"
                      type="danger"
                      class="searchBtn searchMargin"
                      size="small"
                      icon="iconfont kt-icon-sousuo_o"
                      :loading="IsSearch"
                      @click="searchOrderList"
                      >查询</el-button
                    >
                    <el-button
                      v-show="iconShow"
                      type="danger"
                      class="closeInput searchMargin"
                      size="small"
                      @click="IconShow"
                      icon="iconfont kt-icon-anniu_jiantouzhankai"
                      >展开</el-button
                    >
                  </el-col>
                  <!-- <el-col :md="6" :lg="3" :xl="3">
                    <el-button
                      type="danger"
                      class="searchBtn searchMargin"
                      size="small"
                      @click="searchOrderList"
                      :loading="IsSearch"
                      icon="iconfont kt-icon-sousuo_o"
                      >查询</el-button
                    >
                  </el-col> -->
                </el-row>
                <el-row v-show="!iconShow" class="mainForm marginLe">
                  <el-col :md="8" :lg="3" :xl="3">
                    <el-form-item>
                      <el-select
                        v-model="QueryParamsTable.HsStatus"
                        class="unifySize"
                        placeholder="复核状态"
                        clearable
                        @keydown.enter.native="searchEnter"
                      >
                        <!-- <el-option
                          :key="index"
                          v-for="(item, index) in HsStatus"
                          :label="item.label"
                          :value="item.value"
                        ></el-option> -->
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="8" :lg="2" :xl="2">
                    <el-form-item class="searchMargin" label-width="10px">
                      <el-input
                        v-model.trim="QueryParamsTable.query1"
                        class="unifySize"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="4" :xl="4">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="克重："
                    >
                      <el-input
                        v-model.trim="QueryParamsTable.query1"
                        class="unifySize"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="5" :xl="3">
                    <el-form-item class="searchMargin" label="返回记录数：">
                      <el-input
                        v-model.trim="QueryParamsTable.query1"
                        class="unifySize"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-button
                      type="danger"
                      class="searchBtn searchMargin"
                      size="small"
                      icon="iconfont kt-icon-sousuo_o"
                      :loading="IsSearch"
                      @click="searchOrderList"
                      >查询</el-button
                    >
                    <el-button
                      type="danger"
                      class="closeInput searchMargin"
                      size="small"
                      @click="IconShow"
                      icon="iconfont kt-icon-anniu_jiantoushouqi"
                      >收起</el-button
                    >
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
            <!-- 按钮区域 -->
            <el-col class="secondBtn">
              <el-button type="primary" class="smBtn iconBtn el-icon-view"
                >查看</el-button
              >
              <el-button
                type="primary"
                @click="addProduct"
                class="smBtn iconBtn el-icon-edit-outline"
                >新增</el-button
              >
              <el-button
                type="primary"
                class="smBtn iconBtn el-icon-edit-outline"
                >编辑</el-button
              >
              <el-button
                type="primary"
                class="smBtn iconBtn el-icon-edit-outline"
                >标记</el-button
              >
              <el-button
                type="primary"
                class="smBtn iconBtn el-icon-edit-outline"
                >复制</el-button
              >
              <el-button type="primary" class="delBtn iconBtn el-icon-delete"
                >删除</el-button
              >
              <el-button type="primary" class="iconBtn iconfont kt-icon-caidan"
                >颜色维护</el-button
              >
              <el-button
                type="primary"
                class="smBtn iconBtn el-icon-edit-outline"
                >设置</el-button
              >
              <el-button type="primary" class="iconBtn iconfont kt-icon-caidan"
                >下单情况</el-button
              >
              <el-button type="primary" class="iconBtn iconfont kt-icon-caidan"
                >开启筛选</el-button
              >
              <el-button type="primary" class="iconBtn iconfont kt-icon-caidan"
                >更多功能</el-button
              >
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col>
        <el-row style="display: flex">
          <el-col class="leftMenu" :md="5" :lg="3" :xl="3">
            <el-row>
              <el-col class="title1">
                <div class="son">选择站点SKU</div>
              </el-col>
              <!-- <el-col class="title">
                <el-input
                  class="searchTitle"
                  placeholder="输入关键字进行快速筛选"
                  v-model="filterText"
                  clearable
                >
                </el-input>
              </el-col> -->
              <el-col>
                <el-tree
                  :data="TreeList"
                  :props="defaultProps"
                  @node-click="handleNodeClick"
                  :expand-on-click-node="false"
                  :default-expanded-keys="treeExpandData"
                  node-key="id"
                  ref="tree"
                  highlight-current
                ></el-tree>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="mainTable" :md="18" :lg="21" :xl="21">
            <el-card style="margin-top：2px">
              <vxe-grid
                border
                resizable
                stripe
                ref="mainTable"
                :loading="tableLoading"
                show-footer
                :auto-resize="true"
                class="mytable-scrollbar"
                show-overflow="title"
                :header-row-class-name="hearderClass"
                :row-class-name="cellClass"
                :height="gridHeight * 0.95"
                :columns="columns"
                @checkbox-all="onAdjustmentCheckboxAllChange"
                @checkbox-change="onAdjustmentCheckboxChange"
                highlight-current-row
                :config="{ render: 'scroll' }"
                :align="'center'"
                :checkbox-config="{ highlight: true }"
                :data="MainTableList"
              >
                <template #HsCheckTIme="{ row }">
                  <span v-if="row['来样日期'] == null">{{ '' }}</span>
                  <span v-else>{{ row['来样日期'] | formatDate1 }}</span>
                </template>
                <!-- <template #P_chnName="{ row }">
                  <span>{{ row['P_chnName'] }}</span>
                  <br />
                  <span>{{ row['EngName'] }}</span>
                </template> -->
              </vxe-grid>
              <!-- 分页 -->
              <el-col class="closeTable">
                <el-pagination
                  class="pagination"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageInfo.page"
                  background
                  :page-sizes="[100, 200, 500, 1000]"
                  :page-size="pageInfo.pageSize"
                  :total="total"
                >
                </el-pagination>
              </el-col>
            </el-card>
          </el-col>
        </el-row>
        <!-- 主表区域 -->
      </el-col>
    </el-row>
    <!-- 新增弹出层结束 -->
    <JyDialog
      v-dialogDrag
      class="noMarginBottom"
      :title="dialogParam.title"
      :close-on-click-modal="false"
      :visible.sync="dialogParam.isShowDialog"
      top="10px"
      v-if="dialogParam.isShowDialog"
      :width="dialogParam.width"
      append-to-body
    >
      <div
        :style="
          dialogParam.name === 'AnalysusReport'
            ? {
                height: '400px',
                position: 'relative',
              }
            : {
                height: '776px',
                position: 'relative',
              }
        "
      >
        <!-- 新增报关单证的组件 -->
        <add-freight
          @closeDialog="closeDialog"
          @closeDia="closeDia"
          v-if="dialogParam.name === 'AddProduct'"
        ></add-freight>
        <!-- <analysus-report
          :obj="obj"
          v-if="dialogParam.name === 'AnalysusReport'"
          ref="AnalysusReport"
          @closeDialog="closeDialog1"
        ></analysus-report> -->
      </div>
    </JyDialog>
    <!-- 新增修改弹框 -->
  </el-container>
</template>

<script>
import JyDialog from '@/components/JyDialog/index'
import AddProduct from './AddProduct'
export default {
  name: 'InformationMaintenance',
  components: {
    JyDialog,
    AddProduct,
  },
  data() {
    return {
      // 主表类
      dialogParam: {
        title: '',
        type: '',
        name: '',
        width: '',
        isShowDialog: false,
      },
      ReviewLoading: false,
      IsSearch: false, //loading
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      cellHeightClass: 'cellHeightClass',
      cellChooseClass: 'cellChooseClass',
      cellChooseClassLeft: 'cellChooseClassLeft',
      columnsClass: 'columnsClass',
      // bottomTableLeft: [],
      // bottomTableRight: [],
      //主表对象数据参数
      QueryParamsTable: {
        // UserCode: '',
        BeginDate: '',
        EndDate: '',
        ProductNo: '', //条码/产品号
        chnName: '', // 产品名称
        HsStatus: '', // 状态
        ProductType: '', // 大类
        Inputer: '', // 复核人
        ClassNo: '',
        query1: '',
        query2: '',
        // tree节点
      },
      pageInfo: {
        page: 1,
        pageSize: 500,
      },
      total: null,
      // 主表loading
      tableLoading: false,
      MainTableList: [], //主表数据
      TreeList: [], //树状的接口数据
      //   ChooseTreeList: [],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      treeExpandData: [], //自己定义接受treeid的数组
      provincialCenterId: '',
      // filterList: [], //待筛选数
      // currencyList: [],
      // footerCellClassName: 'footerCellClassName',
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        {
          width: '80',
          title: '产品编码',
          field: '产品编码',
        },
        {
          width: '70',
          title: '位置',
          field: '位置',
        },
        {
          width: '180',
          title: '中文名称',
          field: '中文名称',
        },
        {
          minWidth: '150',
          align: 'left',
          title: '英文名称',
          field: '英文名称',
        },
        {
          width: '100',
          title: '成份',
          field: '成份',
        },
        {
          width: '100',
          title: '英文成份',
          field: '英文成份',
        },
        {
          width: '60',
          title: '图片',
          field: '图片',
        },
        {
          width: '80',
          title: '规格',
          field: '规格',
        },
        {
          width: '130',
          title: '门幅',
          field: '门幅',
        },
        // {
        //   minWidth: '200',
        //   align: 'left',
        //   title: '工厂货号',
        //   slots: { default: 'P_chnName' },
        // },
        {
          width: '100',
          title: '工厂货号',
          field: '工厂货号',
        },
        {
          width: '70',
          title: '克重',
          field: '克重',
        },
        {
          width: '70',
          title: '类别',
          field: '类别',
        },
        {
          width: '70',
          title: '供应商',
          field: '供应商',
        },
        {
          width: '70',
          title: '采样人',
          field: '采样人',
        },
        {
          width: '130',
          title: '来样日期',
          slots: { default: 'HsCheckTIme' },
        },
      ],
      RemindersDaialogVisible: false,
      // paging: { list: [], data: [], limit: 100, total: null, page: 1 }, //主表分页
      // choosePaging: { list: [], data: [], limit: 100, total: null, page: 1 }, //选择产品表的分页
      TreeList1: [], // tree数据
      IsAdd: 'add', //判断是新增还是编辑
      gridHeight: 535,
      iconShow: false,
    }
  },
  watch: {
    // filterText(val) {
    //   this.$nextTick(() => {
    //     this.$refs.tree.filter(val)
    //   })
    // },
  },
  methods: {
    searchEnter(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.searchOrderList()
      }
    },
    //收起展开状态
    IconShow() {
      this.iconShow = !this.iconShow
    },
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        this.gridHeight = card - queryRow - 80
      })
    },
    // 主表查询
    searchOrderList() {
      this.IsSearch = true
      this.tableLoading = true
      this.MainTableList = []
      // 查询按钮事件
      this.delLength = []
      this.BatchData = []
      if (this.QueryParamsTable.BeginDate == null) {
        this.QueryParamsTable.BeginDate = ''
      }
      if (this.QueryParamsTable.EndDate == null) {
        this.QueryParamsTable.EndDate = ''
      }
      this.$api.InformationMain.getMainQuery({
        model: this.QueryParamsTable,
        pageInfo: this.pageInfo,
      })
        .then((res) => {
          // console.log(res)
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.MainTableList = res.data.data
            this.total = res.data.total
            this.IsSearch = false
            this.tableLoading = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.IsSearch = false
          this.tableLoading = false
        })
    },
    // 主表复选框状态改变触发
    onAdjustmentCheckboxChange(row) {
      if (row.checked) {
        this.BatchData = this.$refs.mainTable.getCheckboxRecords()
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
      } else {
        this.BatchData = this.$refs.mainTable.getCheckboxRecords()
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
      }
    },
    onAdjustmentCheckboxAllChange(row) {
      if (row.checked) {
        this.BatchData = this.$refs.mainTable.getCheckboxRecords()
        this.delLength = this.delLength.concat(row.records)
      } else {
        this.delLength = []
        this.BatchData = []
      }
    },
    // //过滤的事件
    // filterNode(value, TreeList) {
    //   if (!value) return true
    //   // console.log(TreeList)
    //   return TreeList.label.indexOf(value) !== -1
    // },
    // 当每页数量改变
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.searchOrderList()
    },
    // 当当前页改变
    handleCurrentChange(val) {
      this.pageInfo.page = val
      this.searchOrderList()
    },
    // 获取树形结构默认展开节点
    getRoleTreeRootNode(provincialCenterId) {
      this.treeExpandData.push(provincialCenterId)
    },
    // 获得tree列表
    getTreeData() {
      this.resetTree = true
      //   this.filterText = ''
      this.TreeList = []
      this.$api.InformationMain.getTree()
        .then((res) => {
          // console.log(res);
          if (res.statusCode === 200) {
            this.TreeList1 = res.data
            this.TreeList.push({
              label: '全部',
              id: '',
              children: this.TreeList1,
            })
            // console.log(this.TreeList[0].id)
            this.provincialCenterId = this.TreeList[0].id //默认展开第一个节点
            this.getRoleTreeRootNode(this.provincialCenterId)
            // console.log(this.TreeList[0])
          } else {
            return this.$message.error(res.message)
          }
        })
        .catch((r) => {
          return this.$message.error(r)
        })
    },
    // 点击tree节点
    handleNodeClick(data) {
      //   this.filterText = ''
      this.QueryParamsTable.ClassNo = data.id
      this.searchOrderList()
    },
    // 新增
    addProduct() {
      this.dialogParam = {
        title: '新增',
        name: 'AddProduct',
        type: '',
        width: '60%',
        height: '700px',
        isShowDialog: true,
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
      var monthDate1 = monthDate.getMonth()
      var currentDate = monthDate.getDate()
      monthDate1 = monthDate1 < 10 ? '0' + monthDate1 : monthDate1
      currentDate = currentDate < 10 ? '0' + currentDate : currentDate
      var startTime =
        monthDate.getFullYear() + '-' + monthDate1 + '-' + currentDate
      // this.$set(this.QueryParamsTable, 'EndDate', toMonth)
      // this.$set(this.QueryParamsTable, 'BeginDate', startTime)
    },
    //获取报关商品名称下拉选择框数据
    getSelectData() {
      this.roleList = []
      this.$api.InformationMain.selectData().then((res) => {
        // console.log(res)
        if (res.statusCode !== 200) return this.$message.error(res.message)
        this.roleList = res.data
      })
    },
  },
  computed: {},
  created() {
    this.getNowDate()
    this.getTreeData()
    this.getSelectData()
    // this.searchOrderList()
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
.leftMenu {
  position: relative;
  margin-top: 12px;
  overflow-y: auto;
  background: #f7f8ff;
  border: 1px solid #e4e7eb;
  height: 720px;
  width: 300px;
}
// .title {
//     position: sticky;
//     top: 135px;
//     z-index: 999;
//     width: 285px;
//     background-color: #d5deff;
//     height: 30px;
//     line-height: 30px;
//     font-size: 16px;
//     border: none;
//     text-align: right;
//   }
.title1 {
  z-index: 999;
  max-width: 290px;
  height: 34px;
  background: #d5deff;
  border: 1px solid #d2d8f2;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  border: none;
  text-align: center;
  .son {
    // height: 40px;
    // line-height: 40px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    text-align: center;
  }
  .refresh {
    position: absolute;
    top: 0;
    right: 10px;
    cursor: pointer;
  }
  .expand {
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }
  .open {
    position: absolute;
    top: 0;
    left: 100px;
    cursor: pointer;
  }
  //     >>> .el-input__inner {
  //       height: 30px !important;
  //     }
}
.cardMargin {
  margin-top: 0px !important;
}
.closeInput {
  border: 1px solid #36c2cf;
  background-color: #36c2cf;
  margin-left: 5px !important;
  line-height: 0px;
  height: 30px;
}
.blockSpan {
  width: 100%;
  display: flex;
  height: 32px;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid #c7c6de;
}
>>> .listDate .el-input__inner {
  height: 30px;
  padding: 0 0 0 5px;
  width: 99px;
  border-radius: 4px 0 0 4px;
}
>>> .el-form-item {
  margin-bottom: 0px;
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
>>> .blockDate .el-input__inner {
  height: 30px;
  width: 100%;
  border: none;
}
>>> .blockDate .el-input__inner input {
  width: 125px !important;
}
>>> .blockDate .el-input__icon {
  height: 30px;
}
>>> .blockDate .el-range-separator {
  height: 30px;
  padding: 0;
}
.tableTitle {
  margin-top: 15px;
}
>>> .mainForm .el-form-item__content {
  line-height: normal;
}
>>> .mainForm .el-form-item__label {
  line-height: 30px;
}
.tipsLeft .el-form-item__error {
  left: -83px;
}
>>> .mainForm .marginLeft {
  margin-left: 0px;
}
>>> .searchMargin {
  margin-left: 15px;
  margin-bottom: 0;
}
>>> .searchMargin9 {
  margin-top: 12px;
}
>>> .searchMargin10 {
  margin-top: 15px;
}
.marginR {
  margin-left: 0px;
  display: flex;
  justify-content: space-between;
}
.marginR .marginLeft {
  margin-left: -82px;
  margin-top: -10px;
}
.cellChooseClass {
  height: 28px;
}
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
.cellChooseClassLeft {
  height: 45px;
  line-height: normal;
}
.el-card {
  width: 100%;
  padding: 11px;
  margin-top: 11px;
  >>> .el-card__body {
    padding: 0;
    >>> .mixInput {
      width: 310px;
      display: flex;
      height: 30px;
      border: 1px solid #c7c6de;
      border-radius: 2px;
      >>> .el-input-group__append {
        border: none;
        width: 30px;
        padding: 0;
      }
    }
  }
}
.textArea {
  height: 50px;
}
>>> .renminder {
  font-size: 14px;
  display: flex;
  height: 30px;
  width: 1200px;
  margin: 0 0 7px 15px;
  justify-content: space-between;
  >>> .el-form-item__label {
    margin-left: -62px;
  }
}
// >>> .footerCellClassName {
//   background: #d1f3ff;
// }
.searchBtn {
  width: 70px !important;
  height: 30px !important;
  line-height: 10px;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 60px;
}
.mainTable .el-card {
  // margin-left: 300px;
  flex: 1;
  height: 100%;
  width: 100%;
}

.delBtn {
  width: 70px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
.delBtn1 {
  width: 90px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
>>> .el-checkbox {
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
    border: 1px solid #5473e8;
    font-weight: 400;
    color: #fcfefe;
    padding: 0;
  }
}
.secondBtn1 {
  margin: 11px 0 11px 5px;
  font-size: 14px;
  color: #333;
}
>>> .vxe-table--render-default
  .vxe-table--fixed-left-wrapper.scrolling--middle {
  box-shadow: none;
}
>>> .vxe-table--render-default.border--full .vxe-table--fixed-left-wrapper {
  border-right: none;
}
>>> .vxe-table--render-default .vxe-body--column,
.vxe-table--render-default .vxe-footer--column,
.vxe-table--render-default .vxe-header--column {
  line-height: 15px;
}
>>> .el-button + .el-button {
  margin-left: 0px;
}
>>> .el-button--primary {
  border-color: #5473e8;
}

.marginLeft {
  margin-left: -62px;
}
.CloseBtn {
  margin-top: 15px;
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
.special {
  flex: 1;
  position: relative;
  .choose {
    position: absolute;
    top: 0;
    right: 0px;
  }
}
// >>> .vxe-input--extra-suffix,
// .vxe-input--prefix,
// .vxe-input--suffix {
//   right: 20px;
// }
>>> .Delivery > .vxe-input--inner {
  width: 613px !important;
}
>>> .vxe-input--inner {
  position: relative;
  width: 180px;
  >>> .vxe-input--suffix .is--clear {
    position: absolute;
    top: 2px;
    right: -20px;
  }
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
>>> .chooseEnter {
  width: 70px;
  height: 32px;
  background: #5473e8;
  border-radius: 2px;
  line-height: 32px;
  padding: 0;
}
>>> .Bottom-Border input {
  border: none !important;
  border-radius: 0px;
  border-bottom: 1px solid #bbb !important;
}
>>> .None-Border input {
  border: none !important;
  outline: none !important;
}
>>> .unifySize {
  width: 100% !important;
  height: 30px;
}
>>> .unifySizeDate {
  width: 49% !important;
}
>>> .unifySize1 {
  height: 30px;
}

>>> .marginLeft {
  margin-left: -15px;
  margin-top: 10px;
}
>>> .marginLe {
  margin-top: 10px;
}
>>> .productHeight .el-input__inner {
  border-radius: 0px;
  width: 100%;
  height: 30px;
}
>>> .None-Border {
  height: 100%;
}
>>> .unifySize input {
  height: 30px;
}
>>> .unifySize1 input {
  height: 30px;
}
>>> .el-input__inner input {
  width: 150px !important;
}
>>> .None-Border .el-input-group__prepend {
  border: none;
  border-radius: 2px;
}
>>> .el-input-group__append {
  width: 30px;
  height: 100%;
}
>>> .None-Border .el-input__icon {
  line-height: normal;
}
>>> .None-Border .el-input__inner {
  height: 28px;
}
>>> .inputSize input {
  width: 100px;
  border-right: none !important;
  outline: none !important;
}
>>> .inputSize .el-input__inner {
  width: 100px;
  height: 100%;
}
>>> .inputSize .el-input-group {
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
>>> .hearderClass {
  text-align: center;
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  height: 34px;
  color: #333;
  background-color: #d5deff;
}
>>> .cellClass {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 30px;
}
>>> .cellHeightClass {
  font-family: 'Microsoft YaHei';
  height: 80px;
  white-space: pre-wrap;
}
.elementHeight {
  height: 200px;
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
>>> .pagination {
  float: right;
  margin-top: 20px;
}
>>> .unifySize .el-input__icon {
  line-height: normal;
}
>>> .el-form-item__label {
  padding: 0;
}
.closeTable {
  display: flex;
  justify-content: flex-end;
}
.closeTableBtn {
  width: 70px;
  height: 32px;
  margin: 20px 10px 0 0;
  background: #5473e8;
  border-radius: 2px;
  line-height: 32px;
  padding: 0;
  font-size: 14px;
}
.iconP {
  font-size: 22px;
  color: #5473e8;
  float: right;
  transform: rotate(90deg);
}
>>> .reminClass {
  margin-left: 5px;
  margin-top: -10px;
}
.bottomTable {
  display: flex;
  justify-content: space-between;
  .bottomTable_l {
    height: 400px;
    flex: 6;
    margin-right: 11px;
  }
  .bottomTable_r {
    flex: 4;
    height: 400px;
  }
}
// .delBtn {
//   background: #5473e8 !important;
// }
// .del2Btn {
//   background: #ccc !important;
// }
.saveBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #5473e8;
  border: 1px solid #5473e8 !important;
}
>>> .saveBtn1 {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #ccc;
  border: 1px solid #ccc !important;
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
>>> .iconB {
  font-size: 10px;
  // border: 1px transparent #fff;
  color: #5473e8;
}
.addform >>> .el-input__inner {
  width: 135px;
}
>>> .jy_wrapper .el-dialog__body {
  border-bottom: none !important;
}
>>> .el-dialog .el-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
>>> .NoneIcon .el-input__prefix {
  display: none;
}
.NullTip {
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 400px;
  transform: translate(-50%, 50%);
}
/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #ffffff;
}
// 文字提示
.item {
  margin: 1px;
}
.textTitle {
  padding: 20px 12px;
}
>>> [data-v-703b890d] .vxe-input--inner {
  position: absolute;
  top: -8px;
  width: 240px;
}
</style>