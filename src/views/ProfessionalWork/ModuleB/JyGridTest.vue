<template>
  <div v-ban-save>
      <el-card>
        <el-row>
            <el-col class="heard">
            <vxe-form
            title-colon
            ref="xForm"
            :data="queryData"
            :rules="formRules2"
            @submit="submitEvent2"
           >
            <!-- <vxe-form-item title="名称" field="name" span="10"></vxe-form-item> -->
            <vxe-form-item title="日期选择" field="enddate" span="5" :item-render="{}">
              <template v-slot="scope">
                <vxe-input v-model="queryData.enddate" placeholder="日期选择" type="date"  @change="$refs.xForm.updateStatus(scope)"></vxe-input>
                <!-- <vxe-input v-model="formData2.date" type="date" placeholder="请选择日期" clearable @change="$refs.xForm.updateStatus(scope)"></vxe-input> -->
              </template>
            </vxe-form-item>
            <vxe-form-item title="期数"  field="p_num" span="5" :item-render="{}">
              <template v-slot="scope">
                <vxe-input v-model="queryData.p_num"  placeholder="请输入期数"  clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="站点" field="shopid"  span="5" :item-render="{}">
              <template v-slot="scope">
                <vxe-select v-model="queryData.shopid" placeholder="请选择站点名称"  @change="$refs.xForm.updateStatus(scope)">
                <vxe-option v-for="(item,index) in shopList" :key="index" :label="item.Name" :value="item.id"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item title="国家" span="5" :item-render="{}">
              <template v-slot="scope">
                <vxe-select v-model="queryData.country" placeholder="请选择国家" label="address" @change="$refs.xForm.updateStatus(scope)">
                <vxe-option :key="index" v-for="(item,index) in countryList" :label="item.StateChNm" :value="item.StateID"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item  span="4" :item-render="{}">
              <template v-slot>
                <vxe-button type="submit" status="my-purple" icon="vxe-icon--search" class="search" > 查询</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
            </el-col>
        </el-row>
        <!-- 触发按钮功能模块 -->
        <el-row class="my-form2">
          <el-col :span="13">
            <vxe-button status="primary" icon="fa fa-save">备注列表</vxe-button>
            <vxe-button status="primary" icon="fa fa-save">颜色尺寸</vxe-button>
            <vxe-button status="primary" icon="fa fa-save">查看详情</vxe-button>
            <vxe-button status="my-purple" icon="kt-icon-jiantou_shangxiaqiehuan" @click="getSelectEvent">调价</vxe-button>
          </el-col>
          <el-col :span="5">
            <div class="sale">
              <vxe-radio name="销量" v-model="value1" label="销量" content="销量" @change="initColumns"></vxe-radio>
              <vxe-radio name="销售金额" v-model="value1" label="销售金额" content="销售金额" @change="initColumns"></vxe-radio>
              <vxe-radio name="访问次数" v-model="value1" label="访问次数" content="访问次数" @change="initColumns"></vxe-radio>
              <vxe-radio name="转化率" v-model="value1" label="转化率" content="转化率" @change="initColumns"></vxe-radio>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="checkout">
              <vxe-checkbox v-model="showReviewer" label="显示环比(增长率)" @change="initColumns($event)">显示环比(增长率)</vxe-checkbox>
              <vxe-checkbox v-model="showSite"   label="站点"   @change="initColumns($event)">站点</vxe-checkbox>
              <vxe-checkbox v-model="National"   label="国家库存" @change="initColumns($event)">国家库存</vxe-checkbox>
              <vxe-checkbox v-model="onTheWay"   label="在途"  @change="initColumns($event)">在途</vxe-checkbox>
              <vxe-checkbox v-model="company"  label="公司库存" @change="initColumns($event)">公司库存</vxe-checkbox>
              <vxe-checkbox v-model="price"   label="价格" @change="initColumns($event)">价格</vxe-checkbox>
            </div>
          </el-col>
      </el-row>
      <!-- table区域 -->
      <vxe-grid
      :data="tdata" 
      :columns="columns" 
      highlight-hover-row  
      height="500" 
      align="center"
      :key="tableKey"
      resizable
      show-overflow
      ref="xTree"
      row-id="id"
      :loading="loading"
      :tree-config="{lazy: true, children: 'Children', hasChild: 'hasChild', loadMethod: loadChildrenMethod, }"
      :header-cell-class-name="hearderClass"
      show-header-overflow
      :checkStrictly="true"
      :highlight-current-row="true"
      @current-change="currentChange"
      :menu-config="{body:true}"
      @cell-menu="remarks"
      @cell-dblclick="dblclickCell"
      :checkbox-config="{highlight: true,checkStrictly:true}"
      @checkbox-change="onCheckboxChange"
      ></vxe-grid>
  </el-card>
  <!-- 折线图区域 -->
  <el-card class="chart">
    <el-row>
      <el-col >
        <div id="main" style="width: 1850px;height:300px;"></div>
      </el-col>
    </el-row>
  </el-card>
  <!-- 饼图区域 -->
  <el-card>
    <el-row>
      <el-col >
        <div id="Pie" style="width: 1900px;height:300px;"></div>
      </el-col>
    </el-row>
  </el-card>
 <!-- dialog弹出层区域 -->
    <el-dialog
      title="编辑备注"
      @close="cancelRemarks"
      :visible.sync="remarksDialogVisible"
      width="50%"
      append-to-body>
      <el-form :inline="true" :rules="formInlineRules" ref="formInlineRulesRef" :model="formInline"  class="demo-form-inline" style="font-size：14px">
        <el-row>
          <el-col style="display:flex;justify-content: space-between;">
            <el-form-item label="备注日期:">
              <!-- <el-select v-model="formInline.nodedate" placeholder="">
                <el-option label="2021-01-22" value="2021-01-22"></el-option> -->
                <!-- <el-option label="2021-03-14" value="2021-01-25"></el-option> -->
              <!-- </el-select> -->
              <el-input
                v-model="formInline.notedate"
                type="date"
                placeholder="请输入时间">
              </el-input>
            </el-form-item>
            <el-form-item label="产品名:" >
              <el-input v-model="queryData.product" readonly></el-input>
            </el-form-item>
            <el-form-item label="国家:" >
              <el-select v-model="formInline.country" placeholder="">
                <el-option :key="index" v-for="(item,index) in countryList" :label="item.StateChNm" :value="item.StateID"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col style="display:flex;justify-content: space-between;">
            <el-form-item label="是否断货:" >
              <el-checkbox class="checkBox" v-model="formInline.outStock" true-label="1" false-label="0"></el-checkbox>
            </el-form-item>
            <el-form-item label="断货原因:" prop="outStock_Reason">
              <el-select v-model="formInline.outStock_Reason" placeholder=""  value="" :disabled="formInline.outStock=='0'?true:false">
                <el-option label="销量暴增" value="1"></el-option>
                <el-option label="无法进仓" value="2"></el-option>
                <el-option label="生产延误" value="3"></el-option>
                <el-option label="发货延误" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="断货天数:" prop="outStock_Days">
               <el-input  placeholder=" " v-model="formInline.outStock_Days" :disabled="formInline.outStock=='0'?true:false"></el-input>
            </el-form-item>
          </el-col>
          <el-col style="display:flex;justify-content: space-between;">
            <el-form-item label="备  注:" style="flex:1;" prop="notes">
                <el-input type="textarea" v-model="formInline.notes" class="textArea"></el-input>
            </el-form-item>
          </el-col>
          <el-col style="display:flex">
              <el-form-item label="重要程度:" prop="color">
                <el-select v-model="formInline.color" style="width:80px">
                  <el-option label="一般" value="03"></el-option>
                  <el-option label="次要" value="02"></el-option>
                  <el-option label="重要" value="01"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
               <el-button type="primary" plain>显示列表</el-button>
              </el-form-item>
            </el-col>
        </el-row> 
      </el-form>
      <el-card style="height: 100px"></el-card>
        <span slot="footer" class="dialog-footer">
          <el-button @click="remarksDialogVisible =false">取 消</el-button>
          <el-button type="primary" @click="submitRemarks">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 双击弹框显示 -->
    <!-- <el-dialog
    title="销量日报表"
    :visible.sync="doubleDialogVisible"
    append-to-body
    top="2vh"
    width="90%">
    
    <el-card class="double-card">
      <el-row>
        <el-col class="double_from">
          <el-form :model="doubleForm"  ref="doubleFormRef" label-width="100px" class="demo-ruleForm">
            <el-form-item label="国家:" prop="name">
              <el-input v-model="doubleForm.name"></el-input>
            </el-form-item>
             <el-form-item label="销量:" prop="name">
              <el-input v-model="doubleForm.name"></el-input>
            </el-form-item>
             <el-form-item label="亚马逊库存:" prop="name">
              <el-input v-model="doubleForm.name"></el-input>
            </el-form-item>
             <el-form-item label="预留库存:" prop="name">
              <el-input v-model="doubleForm.name"></el-input>
            </el-form-item>
             <el-form-item label="在途合计:" prop="name">
              <el-input v-model="doubleForm.name"></el-input>
            </el-form-item>
             <el-form-item label="装箱库存:" prop="name">
              <el-input v-model="doubleForm.name"></el-input>
            </el-form-item>
             <el-form-item label="未装箱库存:" prop="name">
              <el-input v-model="doubleForm.name"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="dbl_charts">
      <div>234</div>
      <div>6798</div>
    </el-card>
    <el-card class="dbl-table">
      <el-row class="row_table">
        <el-col class="col_table">
           <vxe-table
            border
            show-header-overflow
            show-overflow
            highlight-hover-row
            :align="allAlign"
            :data="tableDatas">
            <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
            <vxe-table-column field="address" title="Address"></vxe-table-column>
          </vxe-table>
        </el-col>
        <el-col class="col_table">
          <vxe-table
            border
            show-header-overflow
            show-overflow
            highlight-hover-row
            :align="allAlign"
            :data="tableDatas">
            <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
            <vxe-table-column field="address" title="Address"></vxe-table-column>
          </vxe-table>
        </el-col>
      </el-row>
    </el-card>
    <span slot="footer" class="dialog-footer">
      <el-button @click="doubleDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="doubleDialogVisible = false">确 定</el-button>
    </span>
  </el-dialog> -->
  </div>
</template>
<script>
import JyGrid from '@/components/JyGrid'
import * as echarts from 'echarts';
import { lastObjectEachIterate } from 'xe-utils/methods'
export default {
    components: { JyGrid },
    name: 'test',
    data(){
        return {
            tdata: [],
            columns:[],
            queryData: { //请求参数对象
              usercode:'001',
              enddate:'',
              p_num: 2,
              shopid:'03',
              country: ''
            },
            isShow:[],
            AllColumnList:[],
            columnList:[],
            tableKey:0,//显示与隐藏的列
            loading: false,
            tableData: [],//table的数据
            removeList: [],
            // treeConfig: {
            // children: 'Children',
            // hasChild: 'hasChild',
            // loadMethod: loadChildrenMethod
            // // expandRowKeys: '合计'
            // },
            showReviewer: true, //销量是否显示
            showSite: true, //站点库存
            National: false, //国家库存
            onTheWay: true, //在途
            company: true,//公司库存
            price: true,//价格
            // value400: '2020-02-04',//日期
            countryList: [], //国家
            shopList:[],//站点
            value100: null, //期数
            value12:'NT美国',//站点
            value1: "销量", //销量
            hearderClass: "hearderTable", //表头背景色
            label1:'',//单选按钮发生改变后的值
            resColums:[], //表头待处理数据
            TimeList:[], //表头上需要匹配的时间   
            // check: false,
            chartData:[], //处理的图表数据存储于此 //复选框的状态
            formRules2: {
              enddate: [
                { required: true, message: '请输入日期选择' }
              ],
              p_num: [
                { required: true, message: '请选择期数' }
              ],
              shopid: [
                { required: true, message: '请选择站点名称' }
              ]
            },
            showArray: ["SKU"],
            myChart:null,// echartsDom
            remarksDialogVisible:false, //备注弹出层的显示与隐藏
            // 备注查询请求参数对象
            queryRemarks: {
              usercode: '001',
              shop:"",
              begdate: "2021-03-06",
	            enddate: "2021-01-12",
              productno:'',
              country:'',
              o_retmsg:'',
            },
            // 备注保存的对象参数 
            formInline:{
              strmessage:'',
              id: "",
              usercode: '001',
              classtype: '',
              notedate: '', //备注时间
              outStock_Reason: '', //断货原因
              method:"add", //新增add 修改edit
              notes:'',//备注
              outStock:"0", //是否断货
              outStock_Days: 0, //断货天数
              country: '',
              // product:'', //弹框产品名
              color:'03' //颜色
            },
            // data:'2020-03-12',
            // 弹框的校验规则
            formInlineRules: {
              notes:[
                {required:true,message:"备注内容不能为空",trigger:"change"},
              ],
              color:[
                {required:true,trigger:"change"},
              ],
              // outStock_Reason:[
              //   {required:true,message:"断货原因不能为空"},
              // ],
              // outStock_Days:[
              //   {required:true,message:"断货天数不能为空"},
              // ]
            },
            // title:'',//右键当前表头标题
            sku_code: '',//唯一标识id 
            property: '', //选择过的当行唯一标识
            doubleDialogVisible:false, // 双击弹框的显示与隐藏
            doubleForm: {
              name:''
            },
            // 表格mock的数据
            allAlign: null,
            // tableDatas: [
            //   { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
            //   { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
            //   { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
            //   { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' },
            //   { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
            //   { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
            //   { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
            //   { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' },
            //   { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
            //   { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
            //   { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
            //   { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' }
            // ]
        }
    },
    created(){
     this.salesData()
     this.addProductCountry()
     this.addProductState()
     this.getNowDate()
    },
    methods:{
      loadChildrenMethod(){},
      salesData() {
        this.loading = true
        this.columnList = [];
        this.$api.sales.SalesList( { model: this.queryData })
        .then(res => {
          // console.log(res);
          // let res = GetSalesAnalysisInfo;
          if (!res.isSucceed) return this.$message.error("获取列表失败")
          this.$message.success('获取列表数据成功')
          this.tdata = res.data[1];
          this.timeList = res.data[0]
          this.resColums = res.data[1][0] // 表头待处理数据
          this.initColumns ();
          this.toDoList();
        }).finally(r => {
            this.loading = false
        })
      },
      // 动态创建表头
      initColumns(){
        let showReviewer = this.showReviewer, //销量是否显示
          showSite = this.showSite, //站点库存
          National = this.National, //国家库存
          onTheWay = this.onTheWay, //在途
          company = this.company,//公司库存
          price = this.price,//价格
          value1 = this.value1,
          columns = [];
          for(let key in this.resColums)
          {
            let O = { 
              field: key, 
              title: key,
              showOverflow:true,
              showHeaderOverflow:true,
              width:"auto",
              visible: false
            }
            key = key.trim();
            if(this.showArray.includes(key)) O.visible = true;
            if(key.startsWith(value1)){
              O.visible = true;
            }
            if(key.indexOf(value1 + "环比") > -1 || key.indexOf( value1 + "增长") > -1){
              O.visible = showReviewer;
            }
            if(showSite && key == "站点库存"){
              O.visible = true;
            }
            if(National && key == "国家库存"){
              O.visible = true;
            }
            if(onTheWay && key == "在途"){
              O.visible = true;
            }
            if(company && key == "公司库存"){
              O.visible = true;
            }
            if(price && key == "价格"){
              O.visible = true;
            }
            if(key=="SKU编号") {
              O.visible = true
            }
            columns.push(O);
            if(key === "SKU"){
                O.treeNode = true,
                O.width = 200;
                O.align = "left"
                // O.type= 'checkbox'
                columns.push({ 
                    type: 'checkbox',
                    width: 60,
                    title: "选择"
                })
            }
          }
          this.columns = columns;
      },
      // 处理表头时间方法
      toDoList() {
        //  let list = this.TimeList
        // //  console.log(list);
      },
      // 复选框事件
      onCheckboxChange(){
        let selectRecords = this.$refs.xTree.getCheckboxRecords(),
            value1 = this.value1,
            d1 = [], d2 = [], legend = [];
            console.log(selectRecords);
        if(selectRecords && selectRecords.length){
          // console.log(this.value1);
          if (this.value1!=='销量') {
          d1 = Object.keys(selectRecords[0]).filter((item)=>{
            return item.includes(value1) && !item.includes("环比") && !item.includes("增长")
          })

          selectRecords.forEach((oItem)=>{
            var tempd2 = [];
            Object.keys(oItem).forEach(item =>{
              
              if(item.includes(value1) && !item.includes("环比") && !item.includes("增长")){
                tempd2.push(oItem[item]);
              }
            })
            legend.push(oItem.SKU)
            d2.push(
            {
              name: oItem.SKU,
              type: 'line',
              // stack: '总量',
              data: tempd2
            }
            )
            // console.log(selectRecords);
          })
          
          }else {
            console.log(selectRecords);
            d1 = Object.keys(selectRecords[0]).filter((item)=>{
            return item.includes(value1) && !item.includes("环比") && !item.includes("增长")
          })

          selectRecords.forEach((oItem)=>{
            var tempd2 = [];
            var tempd3 = []
            Object.keys(oItem).forEach(item =>{
              
              if(item.includes(value1) && !item.includes("环比") && !item.includes("增长")){
                tempd2.push(oItem[item])
                legend.push(oItem.SKU+"销量")
              }else if(item.includes("访问次数") && !item.includes("环比") && !item.includes("增长")){
                tempd3.push(oItem[item])
                legend.push(oItem.SKU+"访问次数")
              }
            })
            d2.push(
            {
              name: oItem.SKU+"销量",
              type: 'line',
              // stack: '总量',
              yAxisIndex:0,
              data: tempd2,
            },
            {
              name: oItem.SKU+"访问次数",
              type: 'line',
              stack: '访问次数',
              yAxisIndex:1,
              axisLabel: {
                formmatter: '访问次数'
              },
              // axisLine: {
              //   show:true
              // },
              data: tempd3
            }
            )
          })
          }
          console.log(legend, d1, d2)
        }
        this.getEcharts(d1, d2, legend);
      },
       // 国家类别的数据 
      addProductCountry() {
        this.$api.publicApi
          .bcState()
          .then((res) => {
            // if (res.Code < 0) {
            //   this.$message({
            //     message: res.Message,
            //     type: 'error',
            //   })
            // } else {
              this.countryList = res.data
            //}
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
              this.shopList = res.data;
              this.queryData.shopid = this.shopList[0].id;
            }
          })
          .catch((err) => console.log(err))
      },
      // 查询请求
      submitEvent2 (){
        this.loading = true
        this.salesData()
      },
      // 获取选中的输入框
       getSelectEvent () {
        let selectRecords = this.$refs.xTree.getCheckboxRecords()
        console.log(selectRecords);
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
      this.$set(this.formInline, "notedate",toMonth)
      this.$set(this.queryData, "enddate", toMonth)
      },
      getEcharts(d1, d2, legend) {
        var chartDom = document.getElementById('main');
        chartDom.removeAttribute("_echarts_instance_");
        chartDom.innerHTML = "";
        this.myChart = echarts.init(chartDom);
        var option;
        option = {
            title: {
                text: `${this.value1}折线图`,
                subtext: this.value1
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                 data: legend
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                axisTick: {
                alignWithLabel: true
            },
                // boundaryGap: false,
                data: d1
            },
            yAxis: [{
              type: 'value',
              scale: 'true',
              position: "left",
              axisLine: {
                show: true,
                lineStyle: {
                }
              }
            },
            {
              type: 'value',
              scale: 'true',
              name: "访问次数",
              position: "right",
              axisLine: {
                show: true,
                lineStyle: {
                }
              },
              axisLabel: {
                formmatter: '访问次数'
              },
            }
            ],
            
            series: d2
        };
        // console.log(option)
        option && this.myChart.setOption(option, {
    notMerge: true,
    lazyUpdate: false,
    silent: false
});
      },
      // 选中高亮当前行生成饼图数据
      currentChange () {
       let currentRowData = this.$refs.xTree.getCurrentRecord()
        // console.log(currentRowData.Children);
       let currentData = currentRowData.Children
       let value1 = this.value1
       let serie =[], legend= [];
       console.log(this.columns);
       let oIndex = 0;
       this.columns.forEach((item ) =>{
         item = item.field;
         
         if(item && item.includes(value1) && !item.includes("环比") && !item.includes("增长")){
            var tempd2 = [];
            var name = "";
          currentData.forEach((oItem,eindex)=>{
              tempd2.push({name:oItem.SKU, value:oItem[item]});
              legend.push(oItem.SKU)
          })
              serie.push(
              {
                name: item,
                type: 'pie',
                // ridius:[ "15%","30%"],
                radius: ['15%', '40%'],
                center: [oIndex % 5 * 15 + 10 + '%', (~~(oIndex / 5) + 1) * 40 + '%' ],
                stack: '总量',
                data: tempd2,
                labelLine: {
                    show: false
                },
                label: {
                  show: true,
                  position: 'inner',//饼图图上显示百分比
                  formatter: function (params) {
                      return (params.percent - 0).toFixed() + '%'
                  }
                } 
              }
            )
            oIndex++;
           }
          })
          console.log(serie);
          this.getPieEcharts(serie,legend)
      },
       // 饼图获取
      getPieEcharts(series,legend) {
        var chartDom = document.getElementById('Pie');
        chartDom.removeAttribute("_echarts_instance_");
        chartDom.innerHTML = "";
        var myChart = echarts.init(chartDom);
        var option;
        console.log(legend,series)
        option = {
            tooltip: {
              // trigger: 'item'
            },
            calculable: false,
            legend: {data: legend},
            series,
            toolbox: {
                show: false,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
              },
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
          }

        option && myChart.setOption(option);
      },
      // 备注接口数据查询
      getRemark() { //待获取数据
        this.$api.sales.RemarksQuery(this.queryRemarks).then(res =>{
          if(res.Code!==200) return this.$message.error(res.message)
          console.log(res);
        })
      },
      // 右击事件
      remarks ({type, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }) {
        // console.log(type,column,row, rowIndex, $rowIndex, columnIndex, $columnIndex, $event);
        // console.log(column.title);
        console.log(column.property,row.sku_code);
        
        if(column.title.includes('销量')&&!column.title.includes('销量环比')&&!column.title.includes('增长')){
          this.sku_code = row.sku_code // 唯一标识id 
          this.property = column.property
          // this.title =column.title //当前列标题
          this.queryRemarks.productno = row.sku_code 
          this.queryRemarks.shop= this.queryData.shopid

          this.queryData.product = row.SKU
          this.formInline.classtype =row.classtype
          this.formInline.country = this.queryData.country
          this.formInline.shop =this.queryData.shopid
          this.formInline.productno = row.sku_code
          // this.formInline.notedate=this.queryData.enddate
          // 调取备注查询接口
          this.getRemark()
          // 销量日期待
          this.remarksDialogVisible= true
        }
      },
      // 提交保存备注信息 
      submitRemarks () {
        this.$refs.formInlineRulesRef.validate(valid=>{
          if(!valid) return false
          this.$api.sales.SaveRemarks(this.formInline).then(res =>{
            console.log(res);
            if(res.Code!==200) return this.$message.error(res.message)
            this.$message.success("保存成功")
            this.remarksDialogVisible= false
          })
        })
      },
      // 点击取消提交备注表单 
      cancelRemarks(){
        // 对表单进行重置
        this.$refs.formInlineRulesRef.resetFields()
      },
      // 单元格加颜色
      cellStyle ({ row, rowIndex, column }) {
        if (column.property === this.property) {
          if (row.sku_code === this.sku_code) {
            if(this.formInline.color ==="03") return {backgroundColor: '#FFFF00'}
            if(this.formInline.color ==="02") return {backgroundColor: '#FFA500'}
            if(this.formInline.color ==="01") return {backgroundColor: '#FF0000'}
          }
        }
      },
      // 双击单元格事件
      dblclickCell ({row}){
        console.log(row);
        this.doubleDialogVisible = true
      },
    },
    computed: {
      outStock(val){
        if(val === "0") return true
          return false
      },
    },
    watch: {
    "formInline.outStock" : {
        handler(newVal, oldVal) {
          // if(newVal == "1"){
          //   this.formInline.outStock = false
          //   this.formInline.outStock_Reason = ""
          //   this.formInline.outStock = 0
          // }else {
          //   this.formInline.outStock = true
          // }
        },
        deep:true  
      }
    },
    mounted () {
      this.getEcharts()
      this.getPieEcharts()
    },
    beforeDestroy() {
    this.myChart = null;
  }
}
</script>
<style lang="scss" scoped>
  .el-card {
    padding: 0 6px;
    .heard {
      display: flex;
    }
    .my-form2 {
      background-color: #eee;
      height: 50px;
      line-height: 50px;
    }
    .vxe-form-item {
      width: 200px;
    }
    .vxe-button.type--button.theme--my-purple {
      width: 74px;
      border: none;
      border-radius: 4px;
      color: #fff !important;
      background: #FF9B22;
    }
    .el-row {
      margin: 10px 0;
    }
    .sale {
    display: inline-block;
    padding: 1px;
    max-width: 325px;
    max-height: 60px;
    min-width: 30px;
    line-height: 30px;
    border-radius: 2px;
    border: 1px solid #C7C6DE;
    background: rgba(243, 243, 243, 0);
  }
    .trigger {
      margin-top: 5px;
    }
    .checkout {
      display: inline-block;
      min-height: 30px;
      max-height: 60px;
      max-width: 488px;
      padding: 1px;
      line-height: 30px;
      border-radius: 2px;
      border: 1px solid #C7C6DE;
      background: rgba(243, 243, 243, 0);
    }
    .vxe-table {
      margin-top: 5px;
    }
    .chart {
    display: flex;
    width: 100%;
    height: 330px;
    padding: 0 6px;
    }
  }
  // 弹出层的样式
  .checkBox {
    width: 170px;
    height: 43px;
    line-height: 38px;
    padding: 2px;
    border-radius: 4px;
    border: 1px solid #C0C4CC;
  }
  .jy_wrapper .el-dialog__header {
    background: #C5C5C5!important;
  }
  .el-dialog__header {
    background: #C5C5C5!important;
  }
  .textArea {
    width:820px;
    margin-left: 22px;
    padding: unset;
  }
  // 表头颜色
  .hearderTable {
    background: #D5DEFF!important;
  }
  .el-input__inner {
    width: 165px;
  }
  .el-card   {
    padding: 1px;
    // padding: unset;
    
  }
   .el-card__body::v-deep {
      padding: 0px;
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
  .double_from {
    display: flex;
    justify-content: flex-start;
    .demo-ruleForm {
      display: flex;
       justify-content: space-between;
    }
    .el-input {
      width: 120px;
      .el-input__inner {
        width: 120px;
        height: 30px;
      }
    }
    .demo-ruleForm_item {
      height: 20px;
    }
  }
  // 双击后图的样式
  .dbl_charts {
    width: 100%;
    background-color: PINK;
    height: 400px;
    margin-top: 4px;
  }
  .dbl-table {
    width: 100%;
    background-color: #ccc;
    height: 300px;
    .row_table {
      display: flex;
      justify-content: flex-start;
      height: 280px;
      .col_table {
        height: 260px;
        overflow-y: auto;
      }
    }
  }
</style>