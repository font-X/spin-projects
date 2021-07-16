<template>
  <el-row>
    <el-col :md="17" :lg="17" :xl="17">
      <el-button
        type="danger"
        class="printingBtn searchMargin"
        size="small"
        icon="iconfont kt-icon-anniu_jiantouzhankai"
        >打印预览</el-button
      >
      <el-button
        type="danger"
        class="searchBtn searchMargin"
        size="small"
        icon="iconfont kt-icon-anniu_jiantouzhankai"
        >打印</el-button
      >
      <el-button
        type="danger"
        class="printingBtn searchMargin"
        size="small"
        icon=" iconfont kt-icon-anniu_jiantouzhankai"
        >导出Excel</el-button
      >
      <el-button
        type="danger"
        class="printingBtn searchMargin"
        size="small"
        icon=" iconfont kt-icon-anniu_jiantouzhankai"
        >导出Word</el-button
      >
    </el-col>
    <el-col>
      <vxe-grid
        border
        ref="batchReminder"
        resizable
        stripe
        keep-source
        show-footer
        :footer-method="footerMethod"
        :footer-cell-class-name="footerCellClassName"
        :header-row-class-name="hearderClass"
        class="mytable-scrollbar"
        :auto-resize="true"
        style="margin-top: 11px"
        width="auto"
        height="710"
        highlight-current-row
        :align="'center'"
        :checkbox-config="{
          highlight: true,
        }"
        :columns="r_columns"
        :data.sync="batchReminderList"
      >
      </vxe-grid>
    </el-col >
      <el-row>
        <el-col style=" text-align: right;margin-top:10px">
          <el-button type="primary" class="prBtn iconfont kt-icon-baocun"
            >确 定</el-button
          >
          <el-button type="primary" class="clearBtn"
            >取 消</el-button>
        </el-col>
      </el-row>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      hearderClass: 'hearderClass',
      footerCellClassName: 'footerCellClassName',
      batchReminderList: [],
      r_columns: [
        { type: 'seq', title: '序号' },
        { type: 'checkbox' },
        { width: '200', title: '产品号', field: 'productno' },
        {
          width: '80',
          title: '催单数量',
          field: 'reminderQty',
        },
        {
          width: '80',
          title: '优先级',
          field: '优先级',
        },
        {
          width: '150',
          title: '备注',
          field: 'remark',
        },
        {
          width: '80',
          title: '状态',
          field: 'allottypename',
        },
        {
          title: '催单明细',
          field: 'allotdesc1',
        },
      ],
    }
  },
  methods: {
    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          }
          //   switch (column.property) {
          //     case 'reminderQty':
          //       var sums = 0
          //       for (let i = 0; i < data.length; i++) {
          //         sums += Number(data[i].reminderQty)
          //       }
          //       return sums
          //   }
          return null
        }),
      ]
      return footerData
    },
  },
}
</script>

<style scoped lang="scss">
>>> .unifySize {
  height: 30px;
}
>>> .remarkFooter {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.printingBtn {
  width: 100px;
  height: 32px;
  background: #5473e8;
  border: 1px solid #5473e8;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 400;
  color: #fcfefe;
  padding: 0;
}
.prBtn {
  width: 80px;
  height: 32px;
  background: #5473e8;
  border: 1px solid #5473e8;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 400;
  color: #fcfefe;
  padding: 0;
}
.searchBtn {
  width: 70px;
  height: 32px;
  background: #ff9b22;
  border: 1px solid #ff9b22;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 400;
  color: #fcfefe;
  padding: 0;
  margin-left: 22px;
}
>>> .saveAnd {
  width: 100px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #21bdca;
  border: 1px solid #21bdca !important;
}
>>> .rowHeight {
  height: 520px;
}
>>> .rowHeight2 {
  height: 400px;
}
>>> .cellClass {
  height: 31px;
  color: red;
}
>>> .cellClass2 {
  height: 31px;
}
>>> .saveAnd {
  width: 100px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #21bdca;
  border: 1px solid #21bdca !important;
}

>>> .searchMargin {
  margin-left: 15px;
  margin-top: 5px;
}
>>> .clearBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #908fa0;
  border: 1px solid #908fa0 !important;
}
>>> .hearderClass {
  text-align: center;
  font-size: 14px;
  height: 36px !important;
  color: #333;
  background-color: #d5deff;
}
>>> .footerCellClassName {
  background: #d1f3ff;
  height: 36px;
}
>>> .vxe-header--column .vxe-cell--edit-icon,
.vxe-header--column .vxe-cell-help-icon {
  display: none;
}
>>> .vxe-input .vxe-input--extra-suffix,
.vxe-input .vxe-input--suffix {
  right: 0.2em;
  display: none;
}
>>> .el-dialog .el-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
>>> .cellClass2 {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 30px;
}
>>> .unifySize input {
  height: 30px;
}
>>> .el-icon-circle-plus-outline:before {
  content: '\E723';
  display: none;
}
</style>
