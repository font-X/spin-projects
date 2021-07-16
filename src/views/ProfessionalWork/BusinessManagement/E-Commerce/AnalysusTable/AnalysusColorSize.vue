<template>
  <div>
    <el-row style="display: flex; justify-content: start">
      <el-col :span="8"><div ref="salePic" class="salePic"></div></el-col>
      <el-col :span="8"><div ref="salePic1" class="salePic"></div></el-col>
      <el-col :span="8">
        <vxe-table
          ref="colorTable"
          border
          resizable
          stripe
          keep-source
          :row-class-name="cellChooseClass"
          show-overflow
          height="380"
          :auto-resize="true"
          class="mytable-scrollbar"
          :header-row-class-name="hearderClass"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :data="colorList"
        >
          <vxe-table-column
            type="seq"
            width="65"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column field="color" title="颜色"></vxe-table-column>
          <vxe-table-column field="qty" title="销量"></vxe-table-column>
          <vxe-table-column
            width="80"
            field="占比"
            title="占比(%)"
          ></vxe-table-column>
          <vxe-table-column
            field="qty1"
            width="100"
            title="销售金额"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="占比1"
            title="占比(%)"
          ></vxe-table-column>
        </vxe-table>
      </el-col>
    </el-row>
    <el-row style="display: flex; justify-content: start; margin-top: 10px">
      <el-col :span="8"><div ref="salePic2" class="salePic"></div></el-col>
      <el-col :span="8"><div ref="salePic3" class="salePic"></div></el-col>
      <el-col :span="8">
        <vxe-table
          ref="colorTable"
          border
          resizable
          stripe
          keep-source
          :row-class-name="cellChooseClass"
          show-overflow
          height="auto"
          :auto-resize="true"
          class="mytable-scrollbar"
          :header-row-class-name="hearderClass"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :data="sizeList"
        >
          <vxe-table-column
            type="seq"
            width="65"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column field="size" title="尺寸"></vxe-table-column>
          <vxe-table-column field="qty" title="销量"></vxe-table-column>
          <vxe-table-column width="80" field="占比" title="占比(%)"></vxe-table-column>
          <vxe-table-column
            field="qty1"
            width="100"
            title="销售金额"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="占比1"
            title="占比(%)"
          ></vxe-table-column>
        </vxe-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as Echarts from 'echarts'
export default {
  props: {
    pieList: Array,
  },
  data() {
    return {
      hearderClass: 'hearderClass',
      cellChooseClass: 'cellChooseClass',
      colorList: [],
      sizeList: [],
    }
  },
  methods: {
    getPie() {
      this.$nextTick(() => {
        this.colorList = this.pieList[0]
        this.sizeList = this.pieList[1]
        var data = []
        var num = 0
        var num1 = 0
        this.pieList[0].forEach((item) => {
          var obj = {}
          obj.value = item.qty
          obj.name = item.color
          data.push(obj)
          num += item.qty
          num1 += item.qty1
        })
        this.pieList[0].forEach((itEm) => {
          itEm['占比'] = (itEm.qty / num) * 100
          itEm['占比1'] = (itEm.qty1 / num1) * 100
          itEm['占比'] = itEm['占比'].toFixed(2)
          itEm['占比1'] = itEm['占比1'].toFixed(2)
        })
        //2.初始化
        this.chart = Echarts.init(this.$refs.salePic)
        //3.配置数据
        let option = {
          title: {
            text: '销量(按颜色)',
            left: 'left',
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            bottom:0,
            right:0
          },
          series: [
            {
              name: '销量',
              type: 'pie',
              radius: '60%',
              data: data,
              label: {
                show: true,
                position: 'inner', //饼图图上显示百分比
                formatter: function (params) {
                  return (params.percent - 0).toFixed() + '%'
                },
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        }
        // 4.传入数据
        this.chart.setOption(option, true)

        // 销售金额按颜色
        data = []
        this.pieList[0].forEach((item) => {
          var obj = {}
          obj.value = item.qty1
          obj.name = item.color
          data.push(obj)
        })
        //2.初始化
        this.chart1 = Echarts.init(this.$refs.salePic1)
        //3.配置数据
        let option1 = {
          title: {
            text: '销售金额(按颜色)',
            left: 'right',
          },
          tooltip: {
            trigger: 'item',
          },
          series: [
            {
              name: '销售金额',
              type: 'pie',
              radius: '60%',
              data: data,
              label: {
                show: true,
                position: 'inner', //饼图图上显示百分比
                formatter: function (params) {
                  return (params.percent - 0).toFixed() + '%'
                },
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        }
        // 4.传入数据
        this.chart1.setOption(option1, true)

        // 销量（按尺寸）
        data = []
        this.pieList[1].forEach((item) => {
          var obj = {}
          obj.value = item.qty
          obj.name = item.size
          data.push(obj)
        })
        //2.初始化
        this.chart2 = Echarts.init(this.$refs.salePic2)
        //3.配置数据
        let option2 = {
          title: {
            text: '销量(按尺寸)',
            left: 'left',
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            right:0,
            bottom:0
          },
          series: [
            {
              name: '销量',
              type: 'pie',
              radius: '60%',
              data: data,
              label: {
                show: true,
                position: 'inner', //饼图图上显示百分比
                formatter: function (params) {
                  return (params.percent - 0).toFixed() + '%'
                },
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        }
        // 4.传入数据
        this.chart2.setOption(option2, true)
        // 销售金额（按尺寸）
        data = []
        num = 0
        num1 = 0
        this.pieList[1].forEach((item) => {
          var obj = {}
          obj.value = item.qty1
          obj.name = item.size
          data.push(obj)
          num += item.qty
          num1 += item.qty1
        })

        this.pieList[1].forEach((itEm) => {
          itEm['占比'] = (itEm.qty / num) * 100
          itEm['占比1'] = (itEm.qty1 / num1) * 100
          itEm['占比'] = itEm['占比'].toFixed(2)
          itEm['占比1'] = itEm['占比1'].toFixed(2)
        })
        //2.初始化
        this.chart3 = Echarts.init(this.$refs.salePic3)
        //3.配置数据
        let option3 = {
          title: {
            text: '销售金额(按尺寸)',
            left: 'right',
          },
          tooltip: {
            trigger: 'item',
          },
          series: [
            {
              name: '销售金额',
              type: 'pie',
              radius: '60%',
              data: data,
              label: {
                show: true,
                position: 'inner', //饼图图上显示百分比
                formatter: function (params) {
                  return (params.percent - 0).toFixed() + '%'
                },
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        }
        // 4.传入数据
        this.chart3.setOption(option3, true)
      })
    },
  },
  created() {
    this.getPie()
  },
}
</script>

<style lang="scss" scoped>
.salePic {
  width: 100%;
  height: 370px;
}
>>> .hearderClass {
  text-align: center;
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  height: 34px;
  color: #333;
  background-color: #d5deff;
}
>>> .cellChooseClass {
  height: 28px;
}
</style>