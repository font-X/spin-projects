<template>
  <div id="mainCard" class="body-bg">
    <el-card id="queryRow" :body-style="{ padding: '10px' }">
      <el-form
        inline
        ref="xForm"
        :data="queryData"
        :rules="formRules2"
        @submit="submitEvent2"
      >
        <!-- <el-form-item title="名称" field="name" span="10"></el-form-item> -->
        <el-row
          class="firstRow"
          style="
            margin-bottom: 10px;
            display: flex;
            justify-content: flex-start;
          "
        >
          <div style="display: flex; justify-content: flex-start">
            <el-col style="width: 250px">
              <el-form-item
                label-width="84px"
                label="日期选择:"
                field="enddate"
              >
                <el-date-picker
                  class="dataChoose"
                  value-format="yyyy-MM-dd"
                  v-model="queryData.enddate"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col style="width: 180px">
              <el-form-item label-width="84px" label="期数:" field="p_num">
                <el-input
                  @keyup.enter.native="salesData()"
                  clearable
                  v-model="queryData.p_num"
                  placeholder="请输入期数"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col style="margin-left: 20px; width: 170px">
              <el-form-item label-width="84px" label="站点:" field="shopid">
                <!-- <el-select
                @change="linkCountry"
                v-model="queryData.shopid"
                placeholder="请选择站点名称"
              > -->
                <el-select
                  @change="shopChange"
                  v-model="queryData.shopid"
                  placeholder="请选择站点名称"
                >
                  <el-option
                    v-for="(item, index) in shopList"
                    :key="index"
                    :label="item.Name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="margin-left: 20px; width: 170px">
              <el-form-item label-width="84px" label="国家:">
                <el-select
                  clearable
                  @change="countryChange"
                  v-model="queryData.country"
                  placeholder="请选择国家"
                >
                  <el-option label="" value=""></el-option>
                  <el-option
                    :key="index"
                    v-for="(item, index) in countryList"
                    :label="item.StateChNm"
                    :value="item.StateID"
                  ></el-option>
                  <!-- <el-option
                  :key="index"
                  v-for="(item, index) in countryList"
                  :label="item.countryname"
                  :value="item.countryid"
                ></el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
          </div>
          <el-col class="secondBtn" style="margin-left: 5px">
            <el-button
              icon="iconfont kt-icon-sousuo_o"
              class="iconBtn2"
              style="margin-top: 5px"
              :loading="loading"
              status="primary"
              @click="salesData"
            >
              查询</el-button
            >
            <el-button
              @click="remarkList"
              class="iconBtn iconfont kt-icon-caidan marginL"
              status="primary"
              >备注列表</el-button
            >
            <el-button
              status="primary"
              @click="colorSize"
              class="iconBtn iconfont kt-icon-caidan marginL"
              >颜色尺寸</el-button
            >
            <el-button
              status="primary"
              @click="watchDetail"
              class="iconBtn el-icon-view marginL"
              >查看详情</el-button
            >
            <el-button
              status="my-purple"
              class="marginL iconBtn2 kt-icon-jiantou_shangxiaqiehuan"
              @click="getSelectEvent"
              >调价</el-button
            >
            <el-button
              status="primary"
              :loading="dataloading"
              @click="GetSalesReportAmz"
              class="iconBtn el-icon-view marginL"
              >数据生成</el-button
            >
          </el-col>
        </el-row>

        <!-- 触发按钮功能模块 -->
        <el-row
          :gutter="20"
          class="btnStyle"
          style="height: 40px; margin-top: 15px"
        >
          <el-col style="width: 335px">
            <div class="sale">
              <vxe-radio
                name="销量"
                v-model="value1"
                label="销量"
                content="销量"
                @change="initColumns"
              ></vxe-radio>
              <vxe-radio
                name="销售金额"
                v-model="value1"
                label="销售金额"
                content="销售金额"
                @change="initColumns"
              ></vxe-radio>
              <vxe-radio
                name="访问次数"
                v-model="value1"
                label="访问次数"
                content="访问次数"
                @change="initColumns"
              ></vxe-radio>
              <vxe-radio
                name="转化率"
                v-model="value1"
                label="转化率"
                content="转化率"
                @change="initColumns"
              ></vxe-radio>
            </div>
          </el-col>
          <el-col style="width: 500px">
            <div class="checkout" style="float: right">
              <div class="checkoutIcon"></div>
              <span>显示：</span>
              <vxe-checkbox
                v-model="showReviewer"
                label="显示环比(增长率)"
                @change="initColumns($event)"
                >环比(增长率)</vxe-checkbox
              >
              <vxe-checkbox
                v-model="showSite"
                label="站点"
                @change="initColumns($event)"
                >亚马逊库存</vxe-checkbox
              >
              <vxe-checkbox
                v-model="onTheWay"
                label="在途"
                @change="initColumns($event)"
                >在途</vxe-checkbox
              >
              <vxe-checkbox
                v-model="company"
                label="公司库存"
                @change="initColumns($event)"
                >公司库存</vxe-checkbox
              >
              <vxe-checkbox
                v-model="price"
                label="价格"
                @change="initColumns($event)"
                >价格</vxe-checkbox
              >
            </div>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="100px" label="悬浮层:">
              <el-checkbox
                value="1"
                true-label="1"
                false-label="0"
                v-model="isTooltip"
              ></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card
      style="overflow: hidden"
      :body-style="{ padding: '6px', cursor: 'pointer' }"
    >
      <!-- table区域 -->
      <vxe-grid
        class="mytable-style"
        :data="tdata"
        border
        :columns="columns"
        :cell-class-name="getCellClassName"
        highlight-hover-row
        :height="gridHeight"
        align="center"
        :key="tableKey"
        resizable
        ref="xTree"
        row-id="id"
        :loading="loading"
        :tree-config="treeConfig"
        :tooltip-config="{
          showAll: true,
          contentMethod: showTooltipMethod,
        }"
        :header-row-class-name="headerCellClassName"
        show-header
        :checkStrictly="true"
        :highlight-current-row="true"
        @current-change="currentChange"
        @cell-click="cellClick"
        :menu-config="{ body: true }"
        @cell-menu="remarks"
        @cell-dblclick="dblclickCell"
        :checkbox-config="{ highlight: true, checkStrictly: true }"
        :expand-config="{ expandRowKeys: ['1'] }"
        @checkbox-change="onCheckboxChange"
      >
        <template #num1_default="{ row }">
          <a style="color: blue">{{ row['价格'] }}</a>
        </template>
      </vxe-grid>
    </el-card>
    <!-- 折线图区域 -->
    <el-card class="chart" :body-style="{ padding: '6px' }">
      <el-row>
        <el-col>
          <div ref="main" style="width: 95%; height: 300px"></div>
        </el-col>
      </el-row>
    </el-card>
    <!-- 饼图区域 -->
    <el-card :body-style="{ padding: '6px' }">
      <el-row>
        <el-col>
          <div ref="pie" style="width: 95%; height: 300px"></div>
        </el-col>
      </el-row>
    </el-card>
    <!-- dialog弹出层区域 -->
    <jy-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      class="noMarginBottom"
      :title="dialogParam.title"
      :visible.sync="dialogParam.isShowDialog"
      top="10px"
      v-if="dialogParam.isShowDialog"
      :width="dialogParam.width"
      append-to-body
    >
      <div
        :style="{
          position: 'relative',
        }"
      >
        <analysus-day-report
          v-if="dialogParam.name === 'AnalysusDayReport'"
          v-bind="dayReportInfo"
        ></analysus-day-report>
        <analysus-color-size
          :pieList="pieList"
          v-if="dialogParam.name === 'AnalysusColorSize'"
        ></analysus-color-size>
        <analysus-remark
          @faterMethod="faterMethod"
          :ckickRow="ckickRow"
          :selectedRo="selectedRow"
          :countryList="countryList"
          :shopList="shopList"
          :remarkInfo="remarkInfo"
          :remarkInfoRules="remarkInfoRules"
          @closeDialog="closeDialog"
          v-if="dialogParam.name === 'AnalysusRemark'"
        ></analysus-remark>
        <analysus-remark-list
          :remarkListParams="remarkListParams"
          :countryList="countryList"
          :shopList="shopList"
          @closeDialog="closeDialog"
          v-if="dialogParam.name === 'AnalysusRemarkList'"
        ></analysus-remark-list>
        <analysus-price
          v-if="dialogParam.name === 'AnalysusPrice'"
          v-bind="priceInfo"
        >
        </analysus-price>
        <add-price-adjust
          @fatherMethod="fatherMethod"
          :Str="Str"
          v-if="dialogParam.name === 'addPriceAdjust'"
          @closeDialog="closeDialog"
        >
        </add-price-adjust>
        <!-- 报批弹框 -->
        <!-- <analysus-report
          :obj="obj"
          v-if="dialogParam.name === 'AnalysusReport'"
          ref="AnalysusReport"
        ></analysus-report> -->
      </div>
    </jy-dialog>
    <!-- 报批弹框 -->
    <report-approval
      v-if="showReportDialog"
      ref="ReportApproval"
      @okDialog="ReportOkDialog"
    ></report-approval>
    <!-- 双击弹框显示 -->
  </div>
</template>
<script>
import JyGrid from '@/components/JyGrid'
import * as echarts from 'echarts'
import GetSalesAnalysisInfo from './GetSalesAnalysisInfo.json'
import AnalysusDayReport from './AnalysusDayReport'
import AnalysusRemark from './AnalysusRemark'
import AnalysusPrice from './AnalysusPrice'
import AnalysusRemarkList from './AnalysusRemarkList.vue'
import AnalysusColorSize from './AnalysusColorSize'
import addPriceAdjust from '../addPriceAdjust'
import ReportApproval from '../../../Components/ReportApproval'
// import AnalysusReport from './AnalysusReport'
import JyDialog from '@/components/JyDialog'
import Cookies from 'js-cookie'
export default {
  components: {
    JyGrid,
    AnalysusDayReport,
    AnalysusRemark,
    AnalysusPrice,
    AnalysusRemarkList,
    AnalysusColorSize,
    addPriceAdjust,
    JyDialog,
    ReportApproval,
  },
  name: 'test',
  data() {
    return {
      tdata: [],
      columns: [],
      pieList: [],
      Str: '',
      obj: {},
      headerCellClassName: 'headerCellClassName',
      queryData: {
        //请求参数对象
        usercode: '001',
        enddate: '',
        p_num: 7,
        shopid: '',
        country: '',
      },
      showReportDialog: false,
      computedHeight: window.innerHeight - 100 + 'px',
      dialogParam: {
        title: '',
        type: '',
        name: '',
        width: '70%',
        isShowDialog: false,
      },
      rowArr: [],
      columnArr: [],
      data: '',
      dataloading: false,
      isShow: [],
      rightClick: [],
      AllColumnList: [],
      columnList: [],
      tableKey: 0, //显示与隐藏的列
      loading: false,
      tableData: [], //table的数据
      removeList: [],
      treeConfig: {
        children: 'Children',
        // expandRowKeys: '合计'
      },
      ckickRow: {},
      showReviewer: false, //销量是否显示
      showSite: true, //站点库存
      National: false, //国家库存
      onTheWay: true, //在途
      company: true, //公司库存
      price: true, //价格
      SkuCode: true,
      remarkAll: {},
      gridHeight: 700,
      remarkAll2: {},
      // value400: '2020-02-04',//日期
      countryList: [], //国家
      shopList: [], //站点
      value100: null, //期数
      value12: 'NT美国', //站点
      value1: '销量', //销量
      hearderClass: 'hearderTable', //表头背景色
      label1: '', //单选按钮发生改变后的值
      resColums: [], //表头待处理数据
      timeList: [], //表头上需要匹配的时间
      // check: false,
      chartData: [], //处理的图表数据存储于此 //复选框的状态
      formRules2: {
        enddate: [{ required: true, message: '请输入日期选择' }],
        p_num: [{ required: true, message: '请选择期数' }],
        shopid: [{ required: true, message: '请选择站点名称' }],
      },
      showArray: ['SKU'],
      myChart: null, // echartsDom
      remarksDialogVisible: false, //备注弹出层的显示与隐藏
      isTooltip: '1',
      remarkListParams: {},
      // 备注保存的对象参数
      ID: '',
      remarkObj: {},
      remarkInfo: {
        strmessage: '',
        id: '',
        usercode: '001',
        classtype: '',
        productno: '',
        notedate: '', //备注时间
        outStock_Reason: '', //断货原因
        method: 'add', //新增add 修改edit
        notes: '', //备注
        outStock: '0', //是否断货
        outStock_Days: 0, //断货天数
        country: '',
        // product:'', //弹框产品名
        color: '03', //颜色
      },
      dayReportInfo: {
        shopid: '',
        sku: '',
        begdate: '',
        enddate: '',
        country: '',
      },
      priceInfo: {
        shopid: '',
        sku: '',
        shop: '',
      },
      rowIndex: '',
      columnIndex: '',
      // data:'2020-03-12',
      // 弹框的校验规则
      remarkInfoRules: {
        notes: [
          { required: true, message: '备注内容不能为空', trigger: 'change' },
        ],
        color: [{ required: true, trigger: 'change' }],
        // outStock_Reason:[
        //   {required:true,message:"断货原因不能为空"},
        // ],
        // outStock_Days:[
        //   {required:true,message:"断货天数不能为空"},
        // ]
      },
      // title:'',//右键当前表头标题
      doubleDialogVisible: false, // 双击弹框的显示与隐藏
      doubleForm: {
        name: '',
      },
      // 表格mock的数据
      allAlign: null,
      selectedRow: null,
      selectedColumn: null,
    }
  },
  created() {
    this.addProductState()
    this.addProductCountry()
    this.getNowDate()
    this.resize()
  },
  methods: {
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        this.gridHeight = card - queryRow - 50
      })
    },
    // 数据生成
    GetSalesReportAmz() {
      this.dataloading = true
      this.tdata = []
      let form = new FormData()
      let token = Cookies.get('token')
      form.append('shopId', this.queryData.shopid)
      this.$axios({
        method: 'post',
        url: '/api/SalesAnalysis/GetSalesReportAmzfxAddByShopQuery',
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: token,
        },
        timeout: 60000,
        data: form,
      })
        .then((res) => {
          if (res.data.statusCode !== 200) {
            return this.$message.error(res.message)
          } else {
            this.salesData()
            this.$message.success('数据生成成功!')
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message.error(err)
        })
        .finally(() => {
          this.dataloading = false
        })
    },
    // 查看详情
    watchDetail() {
      var data = []
      data.push(...this.$refs.xTree.getCheckboxRecords())
      if (data.length !== 1) {
        this.$message.error('请选择且只能选择一条数据后操作!')
      } else {
        let countryList = this.countryList.filter((item) => {
          return this.queryData.country === item.StateID
        })
        this.dayReportInfo = {
          shopid: this.queryData.shopid,
          sku: data[0].sku_code,
          begdate: this.timeList[0]['begdate'],
          enddate: this.timeList[this.timeList.length - 1]['enddate'],
          country: this.queryData.country,
          countryText: countryList[0] && countryList[0].StateChNm,
          skuTitle: data[0].sku_code_show,
        }
        this.dialogParam = {
          title: '销售分析日报表',
          name: 'AnalysusDayReport',
          type: '',
          width: '90%',
          isShowDialog: true,
        }
      }
    },
    fatherMethod(data) {
      var ID = data
      this.showReportDialog = true
      this.$nextTick(() => {
        this.$refs.ReportApproval.formInfo.ObjectCode = '0116'
        this.$refs.ReportApproval.formInfo.Key = ID
        this.$refs.ReportApproval.showDialog = true
      })
      // this.dialogParam = {
      //   title: '报批',
      //   name: 'AnalysusReport',
      //   type: '',
      //   width: '700px',
      //   isShowDialog: true,
      // }
    },
    //报批完成后
    ReportOkDialog() {
      this.dialogParam.isShowDialog = false
    },
    // 站点改变返回国家
    // linkCountry() {
    //   this.countryList = []
    //   this.queryData.country = ''
    //   this.$api.publicApi
    //     .LinkShop({ shopid: this.queryData.shopid })
    //     .then((res) => {
    //       if (res.statusCode !== 200) return this.$message.error(res.message)
    //       this.countryList = res.data
    //       if (res.data.length !== 0) {
    //         this.queryData.country = res.data[0].countryid
    //       } else {
    //         this.queryData.country = ''
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    //
    // 获取颜色尺寸
    colorSize() {
      let currentRowData = this.$refs.xTree.getCurrentRecord()
      let colorParams = {
        userCode: '',
        enddate: this.queryData.enddate,
        p_num: this.queryData.p_num,
        shopid: this.queryData.shopid,
        classno: currentRowData.sku_code,
        country: this.queryData.country,
      }
      this.$api.sales
        .GetColorSpecInfo({ model: { ...colorParams } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.pieList = res.data
            this.dialogParam = {
              title: currentRowData['SKU'],
              name: 'AnalysusColorSize',
              type: '',
              width: '70%',
              isShowDialog: true,
            }
          }
        })
        .catch((err) => console.log(err))
    },
    // 单元格提示工具
    showTooltipMethod({ type, column, row, items, _columnIndex }) {
      if (this.isTooltip === '1' && row !== undefined) {
        let title = column.title
        let index = column.title.substring(2)
        if (title.includes('销量') && title.length > 12) {
          var Stitle = column.title.split('\r')[0]
          index = Stitle.substring(2)
          var remarkStr = ''
          if (this.remarkObj['备注' + (index - 1)] === undefined) {
            return
          } else {
            this.remarkObj['备注' + (index - 1)].forEach((item) => {
              if (item['颜色'] === '01') {
                item['颜色'] = '重要'
              } else if (item['颜色'] === '02') {
                item['颜色'] = '次要'
              } else if (item['颜色'] === '03') {
                item['颜色'] = '一般'
              }
              if (item['产品编号'] === row.sku_code) {
                if (item['是否断货'] === '0') {
                  item['断货'] = '否'
                } else {
                  item['断货'] = '是'
                }
                remarkStr =
                  remarkStr +
                  '------------------------------------------------------------------------------' +
                  '\n'
                remarkStr +=
                  item['制单人'] +
                  '\xa0\xa0\xa0' +
                  item['备注日期'] +
                  '\xa0\xa0\xa0' +
                  '是否断货:' +
                  item['断货'] +
                  '\xa0\xa0\xa0' +
                  '重要程度:' +
                  item['颜色'] +
                  '\n' +
                  '断货原因:' +
                  '\xa0\xa0\xa0' +
                  item['断货原因'] +
                  '\xa0\xa0\xa0' +
                  '断货天数:' +
                  item['预计断货天数'] +
                  '\xa0\xa0\xa0' +
                  '国家:' +
                  item['国家'] +
                  '\n' +
                  '备注:' +
                  item['备注内容'] +
                  '\n'
              }
            })
          }

          return (
            row['sku_code_show'] +
            '\n' +
            this.timeList[index - 1]['begdate'].substring(0, 10) +
            '`' +
            this.timeList[index - 1]['enddate'].substring(0, 10) +
            '\n' +
            '------------------------------------------------------------------------------' +
            '\n' +
            '销量' +
            ':' +
            row['销量' + index] +
            '\n' +
            '销量环比:' +
            row['销量环比' + index] +
            '\n' +
            '销售金额：' +
            row['销售金额' + index] +
            '\n' +
            '销售金额环比：' +
            row['销售金额环比' + index] +
            '\n' +
            '访问次数：' +
            row['访问次数' + index] +
            '\n' +
            '访问次数环比：' +
            row['访问次数环比' + index] +
            '\n' +
            '转化率：' +
            row['转化率' + index] +
            '\n' +
            '转化率增长：' +
            row['转化率增长' + index] +
            '\n' +
            remarkStr
          )
        } else if (title.includes('销量环比')) {
          index = column.title.substring(4)
          return (
            row['sku_code_show'] +
            '\n' +
            this.timeList[index - 1]['begdate'].substring(0, 10) +
            '`' +
            this.timeList[index - 1]['enddate'].substring(0, 10) +
            '\n' +
            '------------------------------------------------------------------------------' +
            '\n' +
            '销量' +
            ':' +
            row['销量' + index] +
            '\n' +
            '销量环比:' +
            row['销量环比' + index] +
            '\n' +
            '销售金额：' +
            row['销售金额' + index] +
            '\n' +
            '销售金额环比：' +
            row['销售金额环比' + index] +
            '\n' +
            '访问次数：' +
            row['访问次数' + index] +
            '\n' +
            '访问次数环比：' +
            row['访问次数环比' + index] +
            '\n' +
            '转化率：' +
            row['转化率' + index] +
            '\n' +
            '转化率增长：' +
            row['转化率增长' + index]
          )
        } else if (title.includes('销售金额') && title.length > 12) {
          var Stitle = column.title.split('\r')[0]
          index = Stitle.substring(4)
          return (
            row['sku_code_show'] +
            '\n' +
            this.timeList[index - 1]['begdate'].substring(0, 10) +
            '`' +
            this.timeList[index - 1]['enddate'].substring(0, 10) +
            '\n' +
            '------------------------------------------------------------------------------' +
            '\n' +
            '销量' +
            ':' +
            row['销量' + index] +
            '\n' +
            '销量环比:' +
            row['销量环比' + index] +
            '\n' +
            '销售金额：' +
            row['销售金额' + index] +
            '\n' +
            '销售金额环比：' +
            row['销售金额环比' + index] +
            '\n' +
            '访问次数：' +
            row['访问次数' + index] +
            '\n' +
            '访问次数环比：' +
            row['访问次数环比' + index] +
            '\n' +
            '转化率：' +
            row['转化率' + index] +
            '\n' +
            '转化率增长：' +
            row['转化率增长' + index]
          )
        } else if (title.includes('销售金额环比')) {
          index = column.title.substring(6)
          return (
            row['sku_code_show'] +
            '\n' +
            this.timeList[index - 1]['begdate'].substring(0, 10) +
            '`' +
            this.timeList[index - 1]['enddate'].substring(0, 10) +
            '\n' +
            '------------------------------------------------------------------------------' +
            '\n' +
            '销量' +
            ':' +
            row['销量' + index] +
            '\n' +
            '销量环比:' +
            row['销量环比' + index] +
            '\n' +
            '销售金额：' +
            row['销售金额' + index] +
            '\n' +
            '销售金额环比：' +
            row['销售金额环比' + index] +
            '\n' +
            '访问次数：' +
            row['访问次数' + index] +
            '\n' +
            '访问次数环比：' +
            row['访问次数环比' + index] +
            '\n' +
            '转化率：' +
            row['转化率' + index] +
            '\n' +
            '转化率增长：' +
            row['转化率增长' + index]
          )
        } else if (title.includes('访问次数') && title.length > 12) {
          var Stitle = column.title.split('\r')[0]
          index = Stitle.substring(4)
          return (
            row['sku_code_show'] +
            '\n' +
            this.timeList[index - 1]['begdate'].substring(0, 10) +
            '`' +
            this.timeList[index - 1]['enddate'].substring(0, 10) +
            '\n' +
            '------------------------------------------------------------------------------' +
            '\n' +
            '销量' +
            ':' +
            row['销量' + index] +
            '\n' +
            '销量环比:' +
            row['销量环比' + index] +
            '\n' +
            '销售金额：' +
            row['销售金额' + index] +
            '\n' +
            '销售金额环比：' +
            row['销售金额环比' + index] +
            '\n' +
            '访问次数：' +
            row['访问次数' + index] +
            '\n' +
            '访问次数环比：' +
            row['访问次数环比' + index] +
            '\n' +
            '转化率：' +
            row['转化率' + index] +
            '\n' +
            '转化率增长：' +
            row['转化率增长' + index]
          )
        } else if (title.includes('访问次数环比')) {
          index = column.title.substring(6)
          return (
            row['sku_code_show'] +
            '\n' +
            this.timeList[index - 1]['begdate'].substring(0, 10) +
            '`' +
            this.timeList[index - 1]['enddate'].substring(0, 10) +
            '\n' +
            '------------------------------------------------------------------------------' +
            '\n' +
            '销量' +
            ':' +
            row['销量' + index] +
            '\n' +
            '销量环比:' +
            row['销量环比' + index] +
            '\n' +
            '销售金额：' +
            row['销售金额' + index] +
            '\n' +
            '销售金额环比：' +
            row['销售金额环比' + index] +
            '\n' +
            '访问次数：' +
            row['访问次数' + index] +
            '\n' +
            '访问次数环比：' +
            row['访问次数环比' + index] +
            '\n' +
            '转化率：' +
            row['转化率' + index] +
            '\n' +
            '转化率增长：' +
            row['转化率增长' + index]
          )
        } else if (title.includes('转化率') && title.length > 12) {
          var Stitle = column.title.split('\r')[0]
          index = Stitle.substring(3)
          return (
            row['sku_code_show'] +
            '\n' +
            this.timeList[index - 1]['begdate'].substring(0, 10) +
            '`' +
            this.timeList[index - 1]['enddate'].substring(0, 10) +
            '\n' +
            '------------------------------------------------------------------------------' +
            '\n' +
            '销量' +
            ':' +
            row['销量' + index] +
            '\n' +
            '销量环比:' +
            row['销量环比' + index] +
            '\n' +
            '销售金额：' +
            row['销售金额' + index] +
            '\n' +
            '销售金额环比：' +
            row['销售金额环比' + index] +
            '\n' +
            '访问次数：' +
            row['访问次数' + index] +
            '\n' +
            '访问次数环比：' +
            row['访问次数环比' + index] +
            '\n' +
            '转化率：' +
            row['转化率' + index] +
            '\n' +
            '转化率增长：' +
            row['转化率增长' + index]
          )
        } else if (title.includes('转化率增长')) {
          index = column.title.substring(5)
          return (
            row['sku_code_show'] +
            '\n' +
            this.timeList[index - 1]['begdate'].substring(0, 10) +
            '`' +
            this.timeList[index - 1]['enddate'].substring(0, 10) +
            '\n' +
            '------------------------------------------------------------------------------' +
            '\n' +
            '销量' +
            ':' +
            row['销量' + index] +
            '\n' +
            '销量环比:' +
            row['销量环比' + index] +
            '\n' +
            '销售金额：' +
            row['销售金额' + index] +
            '\n' +
            '销售金额环比：' +
            row['销售金额环比' + index] +
            '\n' +
            '访问次数：' +
            row['访问次数' + index] +
            '\n' +
            '访问次数环比：' +
            row['访问次数环比' + index] +
            '\n' +
            '转化率：' +
            row['转化率' + index] +
            '\n' +
            '转化率增长：' +
            row['转化率增长' + index]
          )
        }
      } else {
        return
      }
    },
    //备注列表
    remarkList() {
      let currentRowData = this.$refs.xTree.getCurrentRecord()
      if (!currentRowData) {
        this.$message.error('请先用鼠标选中需要查看的数据行!')
      } else {
        var now = +new Date(this.queryData.enddate)
        var date = new Date(now - 48 * 24 * 3600 * 1000)
        var year = date.getFullYear()
        var month = (date.getMonth() + 1).toString()
        if (month.length === 1) {
          month = '0' + month
        }
        var day = date.getDate().toString()
        if (day.length === 1) {
          day = '0' + day
        }
        // var hour = date.getHours()
        // if (hour < 10) {
        //   hour = '0' + hour
        // }
        // var minute = date.getMinutes()
        // if (minute < 10) {
        //   minute = '0' + minute
        // }
        // var seconds = date.getSeconds()
        // if (seconds < 10) {
        //   seconds = '0' + seconds
        // }
        var newDate = year + '-' + month + '-' + day
        let remarkList = {
          usercode: '',
          shop: this.queryData.shopid,
          begdate: newDate,
          enddate: this.queryData.enddate,
          productno: currentRowData.sku_code,
        }
        this.remarkListParams = remarkList
        this.dialogParam = {
          title: '备注列表',
          name: 'AnalysusRemarkList',
          type: '',
          width: '50%',
          isShowDialog: true,
        }
      }
    },
    salesData() {
      this.loading = true
      this.tdata = []
      this.columnList = []
      this.$api.sales
        .SalesList({ model: this.queryData })
        .then((res) => {
          // let res = GetSalesAnalysisInfo;
          if (res.statusCode !== 200) {
            this.$message.error('获取列表失败')
          } else {
            this.$message.success('获取列表数据成功')
            this.tdata = res.data[1]
            this.timeList = res.data[0]
            this.resColums = res.data[1][0] // 表头待处理数据
            this.initColumns()
            this.$refs.xTree.setTreeExpand(this.tdata[0], true)
            this.remarkObj = {}
            this.timeList.forEach((item, index) => {
              this.$api.sales
                .RemarksQuery({
                  model: {
                    usercode: '',
                    shop: this.queryData.shopid,
                    begdate: item.begdate,
                    enddate: item.enddate,
                    productno: '',
                  },
                })
                .then((res) => {
                  if (res.statusCode !== 200) {
                    this.$message.error(res.message)
                  } else {
                    let filterArr = res.data
                    // 国家备注筛选
                    if (this.queryData.country !== '') {
                      filterArr = res.data.filter((item) => {
                        if (
                          item['Country'] !== '' &&
                          item['Country'] !== null
                        ) {
                          return (
                            item['ShopId'].trim() ===
                              this.queryData.shopid.trim() &&
                            item['Country'].trim() ===
                              this.queryData.country.trim()
                          )
                        }
                      })
                    }
                    this.remarkObj['备注' + index] = filterArr
                    // 将数据中的null全部转换为空字符串
                    function null2str(data) {
                      if (
                        typeof data != 'object' ||
                        data === null ||
                        data === 'null'
                      ) {
                        data = ''
                        return data
                      } else {
                        for (let x in data) {
                          if (data[x] === null || data[x] === 'null') {
                            // 如果是null 把直接内容转为 ''
                            data[x] = ''
                          } else {
                            if (Array.isArray(data[x])) {
                              // 是数组遍历数组 递归继续处理
                              data[x] = data[x].map((z) => {
                                return null2str(z)
                              })
                            }
                            if (typeof data[x] === 'object') {
                              // 是json 递归继续处理
                              data[x] = null2str(data[x])
                            }
                          }
                        }
                        return data
                      }
                    }
                    null2str(this.remarkObj)
                    this.remarkAll = this.remarkObj
                    this.remarkAll2 = JSON.parse(JSON.stringify(this.remarkObj))
                  }
                })
            })
          }
        })
        .catch((err) => {
          this.$message.error(err)
        })
        .finally((r) => {
          this.loading = false
        })
    },
    // 动态创建表头
    initColumns() {
      // TODOS，需要测试的页面逻辑动作
      let showReviewer = this.showReviewer, //销量是否显示
        showSite = this.showSite, //站点库存
        National = this.National, //国家库存
        SkuCode = this.SkuCode,
        onTheWay = this.onTheWay, //在途
        company = this.company, //公司库存
        price = this.price, //价格
        value1 = this.value1,
        columns = []
      var Stitle = ''
      var index = ''
      let O = {}
      for (let key in this.resColums) {
        O = {
          field: key,
          title: key,
          showOverflow: true,
          showHeaderOverflow: true,
          width: 'auto',
          visible: false,
        }
        key = key.trim()
        if (this.showArray.includes(key)) O.visible = true
        if (key.startsWith(value1)) {
          O.visible = true
          if (value1 === '销量' && key.indexOf(value1 + '环比') === -1) {
            O.slots = {
              default: ({ row, column }) => {
                Stitle = column.title.split('\r')[0]
                index = Stitle.substring(2)
                let remarkColor = row['备注' + index],
                  value = row[column.property]
                if (remarkColor) {
                  return [
                    <div style={'background:' + remarkColor + ';width:98%'}>
                      {value}
                    </div>,
                  ]
                } else {
                  return value
                }
              },
            }
          }
        }
        if (
          key.indexOf(value1 + '环比') > -1 ||
          key.indexOf(value1 + '增长') > -1
        ) {
          // console.log( O.title);
          O.title = O.title
            .replace('转化率', '')
            .replace('销量', '')
            .replace('销售金额', '')
            .replace('访问次数', '')
          O.visible = showReviewer
          O.width = '60'
        }
        // if (key.indexOf(value1 + '增长') > -1) {
        //   O.title = O.title.replace('转换率', '')
        //   O.visible = showReviewer
        //   O.width = '80'
        // }
        if (showSite && key == '站点库存') {
          O.visible = true
          O.width = '75'
          O.title = '亚马逊' + '\n' + '库存'
        }
        if (showSite && key == '站点预留库存') {
          O.visible = true
          O.width = '75'
          O.title = '亚马逊' + '\n' + '预留库存'
        }
        if (SkuCode && key == 'sku_code_show') {
          O.visible = true
          O.width = '170'
          O.align = 'left'
          O.title = 'SKU编号'
        }
        if (National && key == '国家库存') {
          O.width = '75'
          O.visible = true
        }
        if (onTheWay && key == '在途') {
          O.width = '75'
          O.visible = true
        }
        if (company && key == '公司库存') {
          O.width = '75'
          O.visible = true
        }
        if (price && key == '价格') {
          O.width = '80'
          O.visible = true
          O.slots = {
            default: 'num1_default',
          }
        }
        columns.push(O)
        if (key === 'SKU') {
          ;(O.treeNode = true), (O.width = '230')
          ;(O.align = 'left'),
            // O.type= 'checkbox'
            columns.push({
              type: 'checkbox',
              width: 50,
              title: '选择',
            })
        }
      }
      columns.forEach((item) => {
        let title = item.title
        if (title.includes('销量') && title.length < 7) {
          let index = item.title.substring(2)
          this.timeList.forEach((ITEM) => {
            if (ITEM.col_sn === Number(index)) {
              item.title =
                '销量' +
                index +
                '\r\n' +
                ITEM.begdate.substring(5, 7) +
                ITEM.begdate.substring(8, 10) +
                '`' +
                ITEM.enddate.substring(5, 7) +
                ITEM.enddate.substring(8, 10)
            }
          })
        } else if (title.includes('销售金额') && title.length < 9) {
          let index = item.title.substring(4)
          this.timeList.forEach((ITEM) => {
            if (ITEM.col_sn === Number(index)) {
              item.title =
                '销售金额' +
                index +
                '\r\n' +
                ITEM.begdate.substring(5, 7) +
                ITEM.begdate.substring(8, 10) +
                '`' +
                ITEM.enddate.substring(5, 7) +
                ITEM.enddate.substring(8, 10)
            }
          })
        } else if (title.includes('访问次数') && title.length < 9) {
          let index = item.title.substring(4)
          this.timeList.forEach((ITEM) => {
            if (ITEM.col_sn === Number(index)) {
              item.title =
                '访问次数' +
                index +
                '\r\n' +
                ITEM.begdate.substring(5, 7) +
                ITEM.begdate.substring(8, 10) +
                '`' +
                ITEM.enddate.substring(5, 7) +
                ITEM.enddate.substring(8, 10)
            }
          })
        } else if (title.includes('转化率') && title.length < 8) {
          let index = item.title.substring(3)
          this.timeList.forEach((ITEM) => {
            if (ITEM.col_sn === Number(index)) {
              item.title =
                '转化率' +
                index +
                '\r\n' +
                ITEM.begdate.substring(5, 7) +
                ITEM.begdate.substring(8, 10) +
                '`' +
                ITEM.enddate.substring(5, 7) +
                ITEM.enddate.substring(8, 10)
            }
          })
        }
      })

      this.columns = columns
    },
    // 复选框事件
    onCheckboxChange() {
      let selectRecords = this.$refs.xTree.getCheckboxRecords(),
        value1 = this.value1,
        d1 = [],
        d2 = [],
        legend = []
      if (selectRecords && selectRecords.length) {
        if (this.value1 !== '销量') {
          d1 = Object.keys(selectRecords[0]).filter((item) => {
            return (
              item.includes(value1) &&
              !item.includes('环比') &&
              !item.includes('增长')
            )
          })
          selectRecords.forEach((oItem) => {
            var tempd2 = []
            Object.keys(oItem).forEach((item) => {
              if (
                item.includes(value1) &&
                !item.includes('环比') &&
                !item.includes('增长')
              ) {
                tempd2.push(oItem[item])
              }
            })
            legend.push(oItem.SKU)
            d2.push({
              name: oItem.SKU,
              type: 'line',
              // stack: '总量',
              data: tempd2,
            })
          })
        } else {
          d1 = Object.keys(selectRecords[0]).filter((item) => {
            return (
              item.includes(value1) &&
              !item.includes('环比') &&
              !item.includes('增长')
            )
          })

          selectRecords.forEach((oItem) => {
            var tempd2 = []
            var tempd3 = []
            Object.keys(oItem).forEach((item) => {
              if (
                item.includes(value1) &&
                !item.includes('环比') &&
                !item.includes('增长')
              ) {
                tempd2.push(oItem[item])
                legend.push(oItem.SKU + '销量')
              } else if (
                item.includes('访问次数') &&
                !item.includes('环比') &&
                !item.includes('增长')
              ) {
                tempd3.push(oItem[item])
                legend.push(oItem.SKU + '访问次数')
              }
            })
            d2.push(
              {
                name: oItem.SKU + '销量',
                type: 'line',
                stack: '总量',
                yAxisIndex: 0,
                data: tempd2,
              },
              {
                name: oItem.SKU + '访问次数',
                type: 'line',
                stack: '访问次数',
                yAxisIndex: 1,
                axisLabel: {
                  formmatter: '访问次数',
                },
                // axisLine: {
                //   show:true
                // },
                data: tempd3,
              }
            )
          })
        }
      }
      this.getEcharts(d1, d2, legend)
    },
    // 站点改变后，备注列表改变
    shopChange() {
      let filterArr = []
      if (this.queryData.country === '') {
        this.remarkAll = this.remarkAll2
        for (let key in this.remarkAll) {
          filterArr = this.remarkAll[key]
          filterArr = this.remarkAll[key].filter((item) => {
            return item['ShopId'].trim() === this.queryData.shopid.trim()
          })
          this.remarkObj[key] = filterArr
        }
      } else {
        this.remarkAll = this.remarkAll2
        for (let key in this.remarkAll) {
          filterArr = this.remarkAll[key]
          if (this.queryData.country !== '') {
            filterArr = this.remarkAll[key].filter((item) => {
              if (item['Country'] !== '' && item['Country'] !== null) {
                return (
                  item['ShopId'].trim() === this.queryData.shopid.trim() &&
                  item['Country'].trim() === this.queryData.country.trim()
                )
              }
            })
            this.remarkObj[key] = filterArr
          }
        }
      }
    },
    // 国家改变后，备注列表改变
    countryChange() {
      let filterArr = []
      if (this.queryData.country === '') {
        this.remarkObj = this.remarkAll2
      } else {
        this.remarkAll = this.remarkAll2
        for (let key in this.remarkAll) {
          filterArr = this.remarkAll[key]
          if (this.queryData.country !== '') {
            filterArr = this.remarkAll[key].filter((item) => {
              if (item['Country'] !== '' && item['Country'] !== null) {
                return (
                  item['ShopId'].trim() === this.queryData.shopid.trim() &&
                  item['Country'].trim() === this.queryData.country.trim()
                )
              }
            })
            this.remarkObj[key] = filterArr
          }
        }
      }
    },
    // 国家类别的数据
    addProductCountry() {
      this.$api.publicApi
        .bcState()
        .then((res) => {
          if (res.statusCode < 0) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            res.data.forEach((item) => {
              item.StateID = item.StateID.trim()
            })
            this.countryList = res.data
          }
        })
        .catch((err) => console.log(err))
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
            this.shopList = res.data
            this.queryData.shopid = this.shopList[0].id
            this.salesData()
            // // 获取对应国家列表
            // this.$api.publicApi
            //   .LinkShop({ shopid: this.queryData.shopid })
            //   .then((res) => {
            //     if (res.statusCode !== 200)
            //       return this.$message.error(res.message)
            //     this.countryList = res.data
            //     if (res.data.length !== 0) {
            //       this.queryData.country = res.data[0].countryid
            //     } else {
            //       this.queryData.country = ''
            //     }
            //   })
            //   .catch((err) => {
            //     console.log(err)
            //   })
          }
        })
        .catch((err) => console.log(err))
    },
    // 查询请求
    submitEvent2() {
      this.loading = true
      this.salesData()
    },
    // 获取选中的输入框
    getSelectEvent() {
      let selectRecords = this.$refs.xTree.getCheckboxRecords()
      let selectArr = selectRecords.filter((item) => {
        return !item.Children
      })
      if (!selectArr.length) {
        return this.$message.error('请选择至少一条产品!')
      } else {
        this.Str = ''
        selectArr.forEach((item) => {
          this.Str += item.sku_code + '◇'
        })
        this.$nextTick(() => {
          this.dialogParam = {
            title: '调价单编辑',
            name: 'addPriceAdjust',
            type: '',
            width: '70%',
            isShowDialog: true,
          }
        })
      }
      this.dialogParam = {
        title: '调价单编辑',
        name: 'addPriceAdjust',
        type: '',
        width: '70%',
        isShowDialog: true,
      }
    },
    // 获取当前时间
    getNowDate() {
      let nowDate = new Date()
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let date = nowDate.getDate()
      date = date < 10 ? '0' + date : date
      var toMonth = year + '-' + month + '-' + date
      this.$set(this.queryData, 'enddate', toMonth)
    },
    getEcharts(d1, d2, legend) {
      var chartDom = this.$refs.main
      chartDom.removeAttribute('_echarts_instance_')
      chartDom.innerHTML = ''
      this.myChart = echarts.init(chartDom)
      var option
      option = {
        title: {
          text: `${this.value1}折线图`,
          subtext: this.value1,
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: legend,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          // boundaryGap: false,
          data: d1,
        },
        yAxis: [
          {
            type: 'value',
            scale: 'true',
            position: 'left',
            axisLine: {
              show: true,
              lineStyle: {},
            },
          },
          {
            type: 'value',
            scale: 'true',
            name: '访问次数',
            position: 'right',
            axisLine: {
              show: true,
              lineStyle: {},
            },
            // axisLabel: {
            //   formmatter: '访问次数'
            // },
          },
        ],
        series: d2,
      }
      option && this.myChart.setOption(option, true)
    },
    // 选中高亮当前行生成饼图数据
    currentChange() {
      let currentRowData = this.$refs.xTree.getCurrentRecord()
      let currentData = currentRowData.Children
      let value1 = this.value1
      let serie = [],
        legend = []
      let oIndex = 0
      this.columns.forEach((item) => {
        item = item.field
        if (
          item &&
          item.includes(value1) &&
          !item.includes('环比') &&
          !item.includes('增长')
        ) {
          var tempd2 = []
          var name = ''
          if (currentData !== undefined) {
            currentData.forEach((oItem, eindex) => {
              tempd2.push({ name: oItem.SKU, value: oItem[item] })
              legend.push(oItem.SKU)
            })
          }
          serie.push({
            name: item,
            type: 'pie',
            // ridius:[ "15%","30%"],
            radius: ['15%', '50%'],
            center: [
              (oIndex % 5) * 20 + 10 + '%',
              (~~(oIndex / 5) + 1) * 50 + '%',
            ],
            // stack: '总量',
            data: tempd2,
            labelLine: {
              show: false,
            },
            label: {
              show: true,
              position: 'inner', //饼图图上显示百分比
              formatter: function (params) {
                return (params.percent - 0).toFixed() + '%'
              },
            },
          })
          oIndex++
        }
      })
      this.getPieEcharts(serie, legend)
    },
    // 饼图获取
    getPieEcharts(series, legend) {
      var chartDom = this.$refs.pie
      chartDom.removeAttribute('_echarts_instance_')
      chartDom.innerHTML = ''
      var myChart = echarts.init(chartDom)
      var option
      option = {
        tooltip: {
          // trigger: 'item'
        },
        calculable: false,
        legend: { data: legend },
        series,
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
      }

      option && myChart.setOption(option, true)
    },
    // 右击事件
    remarks({
      type,
      row,
      rowIndex,
      $rowIndex,
      column,
      columnIndex,
      $columnIndex,
      $event,
    }) {
      row.shop = this.queryData.shopid
      this.ckickRow = row
      if (
        column.title.includes('销量') &&
        !column.title.includes('销量环比') &&
        !column.title.includes('增长')
      ) {
        let obj = {}
        obj.Code = row.sku_code
        obj.title = column.title
        this.rightClick.push(obj)
        this.data = 'blue'
        this.selectedRow = row
        // this.rowIndex = $rowIndex
        // this.columnIndex = $columnIndex
        this.selectedColumn = column
        var Stitle = column.title.split('\r')[0]
        var index = Stitle.substring(2)
        let newInfo = {
          productno: row.sku_code,
          productName: row.SKU,
          shop: this.queryData.shopid,
          classtype: row.classtype,
          country: this.queryData.country,
          begdate: this.timeList[Number(index) - 1]['begdate'],
          enddate: this.timeList[Number(index) - 1]['enddate'],
          notedate: this.timeList[Number(index) - 1]['begdate'],
        }
        this.remarkInfo = { ...this.remarkInfo, ...newInfo }
        // this.remarkInfo.notedate=this.queryData.enddate
        // 调取备注查询接口
        // 销量日期待
        this.dialogParam = {
          title: '编辑备注',
          name: 'AnalysusRemark',
          type: '',
          width: '50%',
          isShowDialog: true,
        }
      }
    },
    getCellClassName({ row, column }) {
      if (
        row === this.selectedRow &&
        column === this.selectedColumn &&
        this.data === 'blue'
      ) {
        return 'activeCell'
      } else if (
        row === this.selectedRow &&
        column === this.selectedColumn &&
        this.data === 'green'
      ) {
        this.rightClick.forEach((item) => {
          if (item.Code === row.sku_code && item.title === column.title) {
            this.$set(item, 'green', true)
          }
        })
        for (var i = 0; i < this.rightClick.length; i++) {
          if (this.rightClick[i].green === true) {
            if (
              row.sku_code === this.rightClick[i].Code &&
              column.title === this.rightClick[i].title
            ) {
              return 'activeCell activeCell2'
            }
          }
        }
      } else {
        // 记录用户编辑过备注的状态
        for (var i = 0; i < this.rightClick.length; i++) {
          if (this.rightClick[i].green === true) {
            if (
              row.sku_code === this.rightClick[i].Code &&
              column.title === this.rightClick[i].title
            ) {
              return 'activeCell2'
            }
          }
        }
        return 'cellClass'
      }
    },
    faterMethod() {
      this.data = 'green'
    },
    cellClick({ row, column, $event }) {
      if (column.property === '价格') {
        let shopList = this.shopList.filter((item) => {
          return this.queryData.shopid === item.id
        })
        this.priceInfo = {
          shopid: this.queryData.shopid,
          sku: row.sku_code,
          shop: shopList[0] && shopList[0].Name,
        }
        this.dialogParam = {
          title: '价格查询',
          name: 'AnalysusPrice',
          type: '',
          width: '70%',
          isShowDialog: true,
        }
      }
    },
    // 双击单元格事件
    dblclickCell({ row }) {
      let countryList = this.countryList.filter((item) => {
        return this.queryData.country === item.StateID
      })
      this.dayReportInfo = {
        shopid: this.queryData.shopid,
        sku: row.sku_code,
        begdate: this.timeList[0]['begdate'],
        enddate: this.timeList[this.timeList.length - 1]['enddate'],
        country: this.queryData.country,
        countryText: countryList[0] && countryList[0].StateChNm,
        skuTitle: row.sku_code_show,
      }
      this.dialogParam = {
        title: '销售分析日报表',
        name: 'AnalysusDayReport',
        type: '',
        width: '90%',
        isShowDialog: true,
      }
    },
    closeDialog() {
      this.dialogParam.isShowDialog = false
    },
  },
  computed: {
    outStock(val) {
      if (val === '0') return true
      return false
    },
  },
  watch: {
    'remarkInfo.outStock': {
      handler(newVal, oldVal) {
        // if(newVal == "1"){
        //   this.remarkInfo.outStock = false
        //   this.remarkInfo.outStock_Reason = ""
        //   this.remarkInfo.outStock = 0
        // }else {
        //   this.remarkInfo.outStock = true
        // }
      },
      deep: true,
    },
  },
  mounted() {
    var _this = this
    window.onresize = function () {
      // 定义窗口大小变更通知事件
      _this.resize()
    }
    this.getEcharts()
    this.getPieEcharts()
  },
  beforeDestroy() {
    this.myChart = null
  },
}
</script>
<style lang="scss" scoped>
.el-card {
  padding: 0 6px;
  margin-top: 10px;

  .heard {
    display: flex;
  }
  // .my-form2 {
  //   height: 50px;
  //   line-height: 50px;
  // }
  .vxe-button.type--button.theme--my-purple {
    width: 74px;
    border: none;
    border-radius: 4px;
    color: #fff !important;
    background: #ff9b22;
  }
  .el-row {
    margin: 10px 0;
  }
  >>> .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }
  >>> .el-input__inner {
    height: 30px;
  }
  // >>> .el-form-item__content {
  //   width: 100%;
  // }
  >>> .cellClass {
    height: 30px;
    padding: 1px;
    white-space: 'pre';
  }
  >>> .el-form--inline .el-form-item {
    margin-right: 0px;
  }
  .sale {
    display: inline-block;
    padding: 1px 10px 1px 10px;
    min-width: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 2px;
    background: rgba(243, 243, 243, 0);
  }
  .trigger {
    margin-top: 5px;
  }
  .checkout {
    display: inline-block;
    border: 1px solid #ccc;
    min-height: 30px;
    max-height: 60px;
    max-width: 488px;
    padding: 1px 10px 1px 10px;
    line-height: 30px;
    border-radius: 2px;
    background: rgba(243, 243, 243, 0);
  }
  .checkoutIcon {
    height: 100%;
    width: 26px;
    background-color: #ccc;
  }
  .vxe-table {
    margin-top: 5px;
  }
  .chart {
    height: 330px;
    padding: 0 6px;
  }
}
>>> .headerCellClassName {
  color: #333;
  font-size: 14px;
  text-align: center !important;
}
>>> .btnStyle {
  display: flex;
  justify-content: flex-start;
}
>>> .vxe-table--render-default .vxe-cell {
  padding-left: 0px;
  padding-right: 0px;
}
// // 弹出层的样式
// .checkBox {
//   width: 170px;
//   height: 43px;
//   line-height: 38px;
//   padding: 2px;
//   border-radius: 4px;
//   border: 1px solid #c0c4cc;
// }
.jy_wrapper .el-dialog__header {
  background: #c5c5c5 !important;
}
.el-dialog__header {
  background: #c5c5c5 !important;
}
// 表头颜色
>>> .hearderTable {
  height: 31px;
  background: #d5deff !important;
}
.screen {
  background-color: #000;
  opacity: 0.3;
  position: fixed;
  float: left;
  z-index: 99999;
  width: 100%;
  height: 100%;
}
.el-card {
  padding: 1px;
  // padding: unset;
}
.el-card__body::v-deep {
  padding: 0px;
}
>>> .el-card[data-v-1ee4bdc4] .el-form--inline .el-form-item {
  margin-right: 0px;
  // width: 100%;
}
>>> .el-form-item {
  display: flex;
  justify-content: start;
}
// 双击弹框
// .el-dialog {
//   .jy_wrapper .el-dialog__header {
//   background-color: pink!important;;
//   }
// }
.double-card {
  padding: 0px;
  height: 90px;
}
>>> .firstRow .el-col {
  height: 30px;
}
>>> .el-card .el-row[data-v-1ee4bdc4] {
  margin: 0px 0px;
}
.double_from {
  display: flex;
  justify-content: flex-start;
  .demo-ruleForm {
    display: flex;
    justify-content: space-between;
  }
  .el-input {
    width: 100%;
    .el-input__inner {
      width: 100%;
      height: 30px;
    }
  }
  .demo-ruleForm_item {
    height: 20px;
  }
}
.marginL {
  margin-left: 0px;
}

>>> .activeCell {
  height: 30px;
  padding: 1px;
  color: #333;
  box-sizing: border-box;
  white-space: 'pre';
  // background-color: #ffd700 !important;
  border: 2px solid blue !important;
}
>>> .activeCell2 {
  height: 30px;
  width: 30px;
   color: #333;
  box-sizing: border-box;
  white-space: 'pre';
  border: 2px solid green !important;
  // background-color: green !important;
  // border: 2px solid green !important;
}
>>> .el-form-item__label {
  padding: 0px;
}
.searchBtn {
  width: 70px !important;
  height: 30px !important;
  line-height: 10px;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 22px;
}

.secondBtn {
  font-size: 14px;
  color: #333;
  .smBtn {
    width: 70px !important;
  }

  .iconBtn {
    width: 100px;
    height: 30px;
    background: #5473e8;
    border-radius: 2px;
    font-size: 14px;
    border: 1px solid #5473e8;
    font-weight: 400;
    color: #fcfefe;
    padding: 0;
  }
  .iconBtn2 {
    width: 70px;
    height: 30px;
    background: #ff9b22;
    border-radius: 2px;
    font-size: 14px;
    border: 1px solid #ff9b22;
    font-weight: 400;
    color: #fcfefe;
    padding: 0;
  }
}
.saleContainer {
  border: 1px solid #ccc;
}
>>> .el-dialog .el-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
>>> .el-form--inline .el-form-item {
  display: flex;
}
>>> .vxe-header--column.col--ellipsis > .vxe-cell .vxe-cell--title {
  white-space: pre;
}
// .body-bg{
//   overflow: hidden;
// }
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 155px;
}
</style>
<style lang="scss">
.vxe-table--tooltip-wrapper.theme--dark {
  max-width: 1000px !important;
  min-width: 400px !important;
}
</style>
