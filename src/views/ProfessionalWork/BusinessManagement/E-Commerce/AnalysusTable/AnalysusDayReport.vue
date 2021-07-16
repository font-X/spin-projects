<template>
  <!-- <span>这是一段信息</span> -->
  <div>
    <el-card class="queryRow">
      <el-row>
        <el-col style="text-align: center" :span="24"
          ><div class="title">{{ skuTitle }}</div></el-col
        >
        <el-col :span="3">
          <label>国家: {{ countryText }}</label>
        </el-col>
        <el-col :span="3">
          <label>销量: {{ stock['销量'] }}</label>
        </el-col>
        <el-col :span="4">
          <label>亚马逊库存: {{ stock['亚马逊'] }}</label>
        </el-col>
        <el-col :span="4">
          <label>预留库存: {{ stock['预留库存'] }}</label>
        </el-col>
        <el-col :span="3">
          <label>在途合计: {{ stock['在途库存'] }}</label>
        </el-col>
        <el-col :span="3">
          <label>装箱库存: {{ stock['已装箱库存'] }}</label>
        </el-col>
        <el-col :span="4">
          <label>未装箱库存: {{ stock['未装箱库存'] }}</label>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div ref="chart1" style="width: 95%; height: 200px"></div>
      <div ref="chart2" style="width: 95%; height: 200px"></div>
    </el-card>
    <el-card  class="queryRow2">
      <el-row :gutter="5">
        <el-col :span="12">
          <vxe-grid
            border
            resizable
            stripe
            keep-source
            show-overflow
            :data.sync="saleData"
            show-footer
            align="center"
            :header-row-class-name="hearderClass"
            :columns="column2"
            :row-class-name="cellClass"
            :footer-method="footerMethod"
            :footer-cell-class-name="footerCellClassName"
            highlight-current-row
            height="250px"
          ></vxe-grid>
        </el-col>
        <el-col :span="12">
          <vxe-grid
            border
            resizable
            stripe
            keep-source
            align="center"
            show-overflow="title"
            :header-row-class-name="hearderClass"
            :row-class-name="cellClass"
            :data.sync="intransitData"
            show-footer
            :columns="column"
            :footer-method="footerMethod2"
            :footer-cell-class-name="footerCellClassName"
            highlight-current-row
            height="250px"
          >
          </vxe-grid>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import JyGrid from '@/components/JyGrid'
export default {
  props: {
    shopid: String,
    sku: String,

    begdate: String,
    enddate: String,
    country: String,
    countryText: String,
    skuTitle: String,
  },
  components: {
    JyGrid,
  },
  data() {
    return {
      stock: {},
      cellClass: 'cellClass',
      hearderClass: 'hearderClass',
      footerCellClassName: 'footerCellClassName',
      intransitData: [],
      saleData: [],
      column: [
        { type: 'checkbox', width: '50' },
        {
          type: 'seq',
          width: '50',
          title: '序号',
        },
        {
          title: 'id',
          field: 'id',
          width: '100',
        },
        {
          title: '申请单号',
          field: '申请单号',
          width: '170',
          align:'left'
        },
        {
          title: '发货日期',
          field: '发货日期',
          width: '70',
        },
        {
          title: '预计到货日期',
          field: '预计到货日期',
          width: '100',
        },
        {
          title: '在途数量',
          field: '在途数量',
          width: '70',
        },
        {
          title: '备注',
          field: '备注',
          align:'left'
        },
      ],
      column2: [
        { type: 'checkbox', width: '50' },
        {
          type: 'seq',
          width: '50',
        },
        {
          title: 'sku',
          field: 'sku',
        },
        {
          title: 'sale_date',
          field: 'sale_date',
          width: '170',
        },
        {
          title: '销量',
          field: '销量',
        },
        {
          title: '均价',
          field: '均价',
        },
        {
          title: '金额',
          field: '金额',
        },
        {
          title: '访问次数',
          field: '访问次数',
        },
      ],
    }
  },
  created() {
    this.$api.sales
      .getDailySalesInfo({
        model: {
          shopid: this.shopid,
          sku: this.sku,
          begdate: this.begdate,
          enddate: this.enddate,
          country: this.country,
          usercode: '001',
        },
      })
      .then((res) => {
        if (res.isSucceed) {
          let value = res.data
          if (value[0]) {
            this.stock = value[0][0]
            this.saleData = value[1]
            this.intransitData = value[2]
            this.renderChart(
              value[1],
              'chart1',
              ['销量', '均价'],
              '销量价格折线图'
            )
            this.renderChart(
              value[1],
              'chart2',
              ['销量', '访问次数'],
              '销量访问次数折线图'
            )
          }
        }
      })
  },
  methods: {
    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          switch (column.property) {
            case '销量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].销量)
              }
              return sums
            case '访问次数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].访问次数)
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    footerMethod2({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          switch (column.property) {
            case '在途数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].在途数量)
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    renderChart(data, id, showArray, name) {
      var xData = []
      var legend = []
      var yAxis = []
      var seriesData = []
      //销量的时候有两条y轴
      for (var i = 0; i < showArray.length; i++) {
        yAxis.push({
          name: showArray[i],
          type: 'value',
        })
        seriesData.push({
          name: showArray[i],
          data: [],
          type: 'line',
          yAxisIndex: i,
        })
        legend.push(showArray[i])
      }
      for (var i = 0; i < data.length; i++) {
        xData.push(data[i]['sale_date'].substring(5, 10))
        for (var j = 0; j < showArray.length; j++) {
          seriesData[j].data.push(data[i][showArray[j]] || 0)
        }
      }
      var option = {
        title: {
          text: name,
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true,
            },
          },
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: legend,
        },
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        xAxis: {
          data: xData,
          // axisLabel:{interval:0} //表示横轴数据全部显示不间隔
        },
        yAxis: yAxis,
        series: seriesData,
      }
      var myChart = echarts.init(this.$refs[id])
      myChart.setOption(option, true)
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 10px;
}
>>> .queryRow .el-card__body {
  padding: 0px 20px 20px 20px;
}
>>> .queryRow2 .el-card__body {
  padding: 10px 20px 0px 20px;
}
>>> .footerCellClassName {
  background: #d1f3ff;
  height: 30px;
}
>>> .hearderClass {
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  height: 32px;
  text-align: center;
  color: #333;
  background-color: #d5deff;
}
>>> .cellClass {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 30px;
}
</style>