<template>
  <div>
    <el-card body-style="padding: 6px">
      <el-row>
        <el-col :span="10" :offset="2">
            <label>站点: {{shop}}</label>
        </el-col>
         <el-col :span="10" :offset="2">
            <label>产品编号: {{sku}}</label>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <jy-grid
        :data.sync="historyList"
        @current-change="currentChange"
        highlight-hover-row
        :highlight-current-row="true"
        :checkbox-config="{highlight: true,checkStrictly:true}"
        height="200px"
      >
      </jy-grid>
    </el-card>
    <el-card>
      <jy-grid
        :data.sync="priceList"
        height="200px"
      >
      </jy-grid>
    </el-card>
    <el-card>
      <div ref="chart" style="width: 95%;height:200px;"></div>
    </el-card>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import JyGrid from '@/components/JyGrid'
export default {
  props:{
    shop: String,
    sku: String,
    shopid: String
  },
  components:{
    JyGrid
  },
  data(){
    return {
      historyList: [],
      priceList:[]

    }
  },
  mounted(){
    this.$api.sales.getSalePriceByShopQuery({
      ShopId: this.shopid,
      ProductNo: this.sku
    }).then(res=>{
      // console.log(res);
      // if(res.Code === 200){
      //   let value = res.Value;
      //   if(value.StockList){
      //     this.stock = value.StockList[0];
      //     this.saleData = value.SaleList;
      //     this.intransitData = value.IntransitList;
      //     this.renderChart(value.SaleList, "chart1", ['销量', '均价'], '销量价格折线图');
      //     this.renderChart(value.SaleList, "chart2", ['销量', '访问次数'], '销量访问次数折线图');
      //   }
      // }
      this.historyList = res.data;
      return res.data
    }).then(d=>{
      if(d[0]){
        this.$api.sales.getSalePriceHisQuery({
          ShopId: this.shopid,
          ProductNo: this.sku,
          Country: d[0].country
        }).then(r=>{
          this.priceList = r.data;
          this.renderChart(r.data, 'chart');
        })
      }
    })
    //this.renderChart(this.priceList, 'chart')
  },
  methods:{
    renderChart(data,id) {
      if (data.length > 0) {
        var xArray = [],
            sArray = [];
        for (var i = 0; i < data.length; i++) {
            xArray.push(data[i]["生效日期"]);
            sArray.push(data[i]["调整后价格"]);
        }

        var option = {
            title: {
                text: '价格折线图'
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {
                        show: true
                    }
                }
            },
            tooltip: {
                show: true,
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data:xArray
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: sArray,
                type: 'line',
                smooth: true
            }]
        };
      var myChart = echarts.init(this.$refs[id]);
      myChart.setOption(option, true);
    }
    },
    currentChange({row}){
      console.log(row);
    }
  }
}
</script>