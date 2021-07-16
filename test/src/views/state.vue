<template>
  <el-container>
    <!-- 输入框表区域 -->
    <el-row>
      <el-col>
        <el-card>
          <el-row>
            <el-col>
              <vxe-select placeholder="站点">
                <vxe-option></vxe-option>
              </vxe-select>
              <vxe-select placeholder="国家">
                <vxe-option></vxe-option>
              </vxe-select>
              <vxe-input class="right-Border" placeholder="产品号"></vxe-input>
              <vxe-select placeholder="趋势">
                <vxe-option></vxe-option>
              </vxe-select>
              <vxe-select placeholder="条件1">
                <vxe-option></vxe-option>
              </vxe-select>
              <vxe-select placeholder="条件2">
                <vxe-option></vxe-option>
              </vxe-select>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-search"
              ></el-button>
              <!-- 第二行按钮区域 -->
              <el-col class="secondBtn">
                <el-button type="primary" size="small" icon="el-icon-search"
                  >刷新数据</el-button
                >
                <el-button type="primary" size="small" icon="el-icon-search"
                  >销量趋势</el-button
                >
                <el-button type="primary" size="small" icon="el-icon-search"
                  >运营设置</el-button
                >
                <el-button type="warning" size="small" icon="el-icon-search"
                  >催单</el-button
                >
                <ul class="floatCircle">
                  <li>
                    <span class="cricle1"></span>
                    销量
                  </li>
                  <li>
                    <span class="cricle2"></span>
                    海外库存
                  </li>
                  <li>
                    <span class="cricle3"></span>
                    库存天数
                  </li>
                  <li>
                    <span class="cricle4"></span>
                    公司库存
                  </li>
                </ul>
              </el-col>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 主表区域 -->
      <el-col class="mainTable"
        ><el-card>
          <vxe-grid
            :loading="loading"
            border
            resizable
            stripe
            show-footer
            :footer-method="footerMethod"
            height="445px"
            @cell-dblclick="dblclick"
            highlight-current-row
            width="auto"
            show-all-overflow
            :config="{ render: 'scroll' }"
            :align="'center'"
            :checkbox-config="{ highlight: true, range: true }"
            :data.sync="OperationPlatformList"
          >
            <vxe-table-column
              type="checkbox"
              :header-class-name="cellCorlor1"
              width="60"
            ></vxe-table-column>
            <vxe-table-column
              field="站点代码"
              :header-class-name="cellCorlor1"
              title="序号"
            ></vxe-table-column>
            <vxe-table-column
              field="站点"
              :header-class-name="cellCorlor1"
              title="站点"
            ></vxe-table-column>
            <vxe-table-column
              field="产品号"
              :header-class-name="cellCorlor1"
              title="SKU"
            ></vxe-table-column>
            <vxe-table-column
              field="产品名称"
              :header-class-name="cellCorlor1"
              title="品名"
            ></vxe-table-column>
            <vxe-table-column
              field="最近一周"
              title="最近一周"
              :header-class-name="cellCorlor2"
            ></vxe-table-column>
            <vxe-table-column
              :header-class-name="cellCorlor2"
              field="周趋势"
              title="周趋势"
            ></vxe-table-column>
            <vxe-table-column
              field="最近一月"
              title="最近一月"
              :header-class-name="cellCorlor2"
            ></vxe-table-column>
            <vxe-table-column
              :header-class-name="cellCorlor2"
              field="月趋势"
              title="月趋势"
            ></vxe-table-column>
            <vxe-table-column
              field="最近三月平均"
              title="最近三月"
              :header-class-name="cellCorlor2"
            ></vxe-table-column>
            <vxe-table-column
              field="最近一年平均"
              title="最近一年"
              :header-class-name="cellCorlor2"
            ></vxe-table-column>
            <vxe-table-column
              field="平均周销量"
              title="平均周销量"
              :header-class-name="cellCorlor2"
            ></vxe-table-column>
            <vxe-table-column
              field="最大周销量"
              title="最大周销量"
              :header-class-name="cellCorlor2"
            ></vxe-table-column>
            <vxe-table-column
              field="预计周销量"
              title="预计周销量"
              :header-class-name="cellCorlor2"
            ></vxe-table-column>
            <vxe-table-column
              field="预期总销量"
              title="预期总销量"
              :header-class-name="cellCorlor2"
            ></vxe-table-column>
            <vxe-table-column
              field="在途合计"
              title="在途合计"
              :header-class-name="cellCorlor3"
            ></vxe-table-column>
            <vxe-table-column
              field="7日内到港"
              title="7日内到"
              :header-class-name="cellCorlor3"
            ></vxe-table-column>
            <vxe-table-column
              field="15日内到港"
              title="15日内到"
              :header-class-name="cellCorlor3"
            ></vxe-table-column>
            <vxe-table-column
              field="中转仓"
              :header-class-name="cellCorlor3"
              title="中转仓"
            ></vxe-table-column>
            <vxe-table-column
              field="亚马逊"
              :header-class-name="cellCorlor3"
              title="亚马逊"
            ></vxe-table-column>
            <vxe-table-column
              :header-class-name="cellCorlor4"
              field="已到仓"
              title="已到仓"
            ></vxe-table-column>
            <vxe-table-column
              :header-class-name="cellCorlor4"
              field="含在途"
              title="含在途"
            ></vxe-table-column>
            <vxe-table-column
              :header-class-name="cellCorlor5"
              field="已装箱"
              title="已装箱"
            ></vxe-table-column>
            <vxe-table-column
              :header-class-name="cellCorlor5"
              field="未装箱"
              title="未装箱"
            ></vxe-table-column>
            <vxe-table-column
              :header-class-name="cellCorlor6"
              field="生产中"
              title="生产中"
            ></vxe-table-column>
            <vxe-table-column
              field="每周产量"
              title="每周产量"
              :header-class-name="cellCorlor6"
            ></vxe-table-column>
            <vxe-table-column
              field="未下单生产"
              title="未下单生产"
              :header-class-name="cellCorlor6"
            ></vxe-table-column>
            <vxe-table-column
              :header-class-name="cellCorlor6"
              field="动销"
              title="动销"
            ></vxe-table-column>
            <vxe-table-column
              field="建议下单"
              title="建议下单"
              :header-class-name="cellCorlor6"
            ></vxe-table-column>
            <vxe-table-column
              field="建议发货"
              title="建议发货"
              :header-class-name="cellCorlor6"
            ></vxe-table-column>
            <vxe-table-column
              field="备货时长"
              title="备货时长"
              :header-class-name="cellCorlor6"
            ></vxe-table-column>
            <vxe-table-column
              field="备货系数"
              title="备货系数"
              :header-class-name="cellCorlor6"
            ></vxe-table-column>
          </vxe-grid>
        </el-card>
      </el-col>
      <el-row>
        <el-col class="mingxiqingdan">
          <el-card style="flex: 700"> 在途明细 </el-card>
          <el-card style="flex: 1190"> 选定产品清单 </el-card>
        </el-col>
      </el-row>
    </el-row>

    <!-- 双击主表单元格弹出的弹出层 -->
    <el-dialog :visible.sync="mainDmainialogVisible" width="50%">
      <span>这是双击主表单元格弹出的弹出层 </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mainDmainialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="mainDmainialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
export default {
  props: {
    configprop: Object,
  },
  data() {
    return {
      obj: { avHeight: 500 },
      mainDmainialogVisible: false, //控制双击单元格的弹出层
      cellCorlor1: 'cellCorlor1', //单元格表头颜色类名
      cellCorlor2: 'cellCorlor2',
      cellCorlor3: 'cellCorlor3',
      cellCorlor4: 'cellCorlor4',
      cellCorlor5: 'cellCorlor5',
      cellCorlor6: 'cellCorlor6',
      OperationPlatformList: [
        {
          站点代码: '01',
          站点: 'NT美国',
          产品号: 'NTBLKFCDPN2-2572C01',
          产品名称: '25x72低密上下穿杆遮光门帘(对)灰色',
          最近一周: 0,
          周趋势: '↓',
          最近一月: 32,
          月趋势: '↓',
          最近三月平均: 192,
          最近一年平均: 1334,
          平均周销量: 13,
          最大周销量: 63,
          预计周销量: 21,
          预期总销量: 525,
          在途合计: 280,
          '7日内到港': '',
          '15日内到港': '',
          中转仓: '',
          亚马逊: 28,
          已到仓: 9,
          含在途: 103,
          已装箱: 290,
          未装箱: '',
          生产中: '',
          每周产量: '',
          未下单生产: 0,
          动销: 1.96,
          建议下单: '',
          建议发货: 111,
          备货时长: 180,
          备货系数: 1.05,
        },
        {
          站点代码: '01',
          站点: 'NT美国',
          产品号: 'NTBLKFCDPN2-2572C03',
          产品名称: '25x72低密上下穿杆遮光门帘(对)大红',
          最近一周: 0,
          周趋势: '↓',
          最近一月: 23,
          月趋势: '→',
          最近三月平均: 69,
          最近一年平均: 385,
          平均周销量: 6,
          最大周销量: 19,
          预计周销量: 4,
          预期总销量: 100,
          在途合计: '',
          '7日内到港': '',
          '15日内到港': '',
          中转仓: '',
          亚马逊: 194,
          已到仓: 340,
          含在途: 340,
          已装箱: 100,
          未装箱: '',
          生产中: '',
          每周产量: '',
          未下单生产: 0,
          动销: 1.99,
          建议下单: '',
          建议发货: '',
          备货时长: 180,
          备货系数: 1.1,
        },
      ], //主表数据
      //   tableColumn: [
      //     { field: '站点代码', title: '序号' },
      //     { field: '站点', title: '站点' },
      //     { field: '产品号', title: 'SKU' },
      //     { field: '产品名称', title: '品名' },
      //     { field: '最近一周', title: '最近一周' },
      //     { field: '周趋势', title: '周趋势' },
      //     { field: '最近一月', title: '最近一月' },
      //     { field: '月趋势', title: '月趋势' },
      //     { field: '最近三月平均', title: '最近三月' },
      //     { field: '最近一年平均', title: '最近一年' },
      //     { field: '平均周销量', title: '平均周销量' },
      //     { field: '最大周销量', title: '最大周销量' },
      //     { field: '预计周销量', title: '预计周销量' },
      //     { field: '预期总销量', title: '预期总销量' },
      //     { field: '在途合计', title: '在途合计' },
      //     { field: '7日内到港', title: '7日内到' },
      //     { field: '15日内到港', title: '15日内到' },
      //     { field: '中转仓', title: '中转仓' },
      //     { field: '亚马逊', title: '亚马逊' },
      //     { field: '已到仓', title: '已到仓' },
      //     { field: '含在途', title: '含在途' },
      //     { field: '已装箱', title: '已装箱' },
      //     { field: '未装箱', title: '未装箱' },
      //     { field: '生产中', title: '生产中' },
      //     { field: '每周产量', title: '每周产量' },
      //     { field: '未下单生产', title: '未下单生产' },
      //     { field: '动销', title: '动销 ' },
      //     { field: '建议下单', title: '建议下单' },
      //     { field: '建议发货', title: '建议发货' },
      //     { field: '备货时长', title: '备货时长' },
      //     { field: '备货系数', title: '备货系数' },
      //   ],
    }
  },
  computed: {
    tableData: function () {
      return this.configprop && this.configprop.tableData
    },
    // tableColumn1: function () {
    //   let v = [] //this.configprop && this.configprop.tableColumn;
    //   if (!v || v.length === 0) {
    //     v = this.initTableColumn(this.tableData)
    //   }
    //   return v
    // },
    loading: function () {
      return this.configprop && !!this.configprop.loading
    },
    tableStyle: function () {
      let configprop = this.configprop || {},
        style = configprop.style || {}
      if (!style.height || !+style.height) {
        style.height = this.avHeight + 'px'
      }

      return style
    },
  },
  created() {},
  updated() {},
  mounted() {
    // 是否自动填充剩余高度
    if (this.configprop && this.configprop.autofill) {
      let jydatalist = this.$refs.jydatalist,
        parent = jydatalist.parentNode,
        jTop = jydatalist.getBoundingClientRect().top
      while (parent && parent.className != 'jy-win-dialog') {
        parent = parent.parentNode
      }
      if (parent) {
        let pBottom = parent.getBoundingClientRect().bottom
        console.log(pBottom, jTop, parent.getBoundingClientRect().top)
        jTop = pBottom - jTop
      } else {
        jTop = window.innerHeight - jTop
      }
      this.avHeight = window.Math.max(jTop - 5, 10)
    }
  },
  methods: {
    //双击单元格触发的事件
    dblclick() {
      console.log('双击了单元格')
      this.mainDmainialogVisible = true
    },
    // initTableColumn(data) {
    //   let tableColumn = []
    //   if (data && data.length > 0) {
    //     tableColumn = Object.keys(data[0]).map((item, index) => {
    //       return {
    //         field: item,
    //         title: item,
    //         showOverflow: true,
    //         showHeaderOverflow: true,
    //         minWidth: 100,
    //         fixed: index === 0 ? 'left' : '',
    //       }
    //     })
    //     tableColumn.unshift({ type: 'checkbox', width: 50, fixed: 'left' })
    //     tableColumn.unshift({ type: 'seq', width: 50, fixed: 'left' })
    //   }
    //   return tableColumn
    // },
    // 复选框触发事件
    // onCheckboxChange() {
    //   this.$emit('modifyData', {
    //     propertyName: 'checkboxRecords',
    //     value: this.$refs.grid.getCheckboxRecords(),
    //     field: this.configprop.field,
    //   })
    //   console.log(this.$refs.grid.getCheckboxRecords(), arguments)
    // },
    footerMethod({ columns }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          if (['最近一周'].includes(column.property)) {
            return '2020-09-05'
          }
          if (['rate'].includes(column.property)) {
            return 999.8
          }
          return null
        }),
      ]
      return footerData
    },
    setMergeFooterItems(merges) {},
  },
}
</script>
<style lang="scss">
.cellCorlor1 {
  background-color: #d5deff;
}
.cellCorlor2 {
  background: #fff1f2;
}
.cellCorlor3 {
  background: #d8f8f7;
}
.cellCorlor4 {
  background: #d0eaff;
}
.cellCorlor5 {
  background: #fff2cd;
}
.cellCorlor6 {
  background: #d5deff;
}
</style>
<style lang="scss" scope>
* {
  margin: 0;
  box-sizing: border-box;
}
.el-container {
  height: 100%;
  background-color: #f5f8ff;
  padding: 11px;
  .el-card {
    .el-card__body {
      padding: 0;
    }
    padding: 11px;
    margin-top: 11px;
    .floatCircle {
      float: right;
      .cricle1 {
        width: 10px;
        height: 10px;
        display: inline-block;
        background: #fff1f2;
        border: 1px solid #c7c6de;
        border-radius: 50%;
      }
      .cricle2 {
        width: 10px;
        height: 10px;
        display: inline-block;
        background: #d8f8f7;
        border: 1px solid #c7c6de;
        border-radius: 50%;
      }
      .cricle3 {
        width: 10px;
        height: 10px;
        display: inline-block;
        background: #d0eaff;
        border: 1px solid #c7c6de;
        border-radius: 50%;
      }
      .cricle4 {
        width: 10px;
        height: 10px;
        display: inline-block;
        background: #fff2cd;
        border: 1px solid #c7c6de;
        border-radius: 50%;
      }
    }
  }
}
.secondBtn {
  margin-top: 11px;
  font-size: 14px;
  color: #333;
  li {
    float: left;
    margin-left: 24px;
  }
}
.mingxiqingdan {
  display: flex;
  justify-content: space-between;
}
</style>