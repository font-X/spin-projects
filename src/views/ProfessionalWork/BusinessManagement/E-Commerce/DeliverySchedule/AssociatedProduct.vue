<template>
  <div>
    <!-- 表单数据 -->
    <el-row class="chooseHeight">
      <vxe-table
        ref="chooseTable"
        border
        resizable
        stripe
        keep-source
        :row-class-name="cellChooseClass"
        show-overflow
        height="697"
        :auto-resize="true"
        class="mytable-scrollbar"
        :header-cell-class-name="hearderClass"
        highlight-current-row
        :config="{ render: 'scroll' }"
        :align="'center'"
        :checkbox-config="{ highlight: true }"
        :data="chooseProduceList"
      >
        <vxe-table-column type="checkbox" width="40"></vxe-table-column>
        <vxe-table-column type="seq" width="60" title="序号"></vxe-table-column>
        <vxe-table-column
          width=""
          field="产品号"
          title="产品编码"
        ></vxe-table-column>
        <vxe-table-column
          width=""
          field="产品名称"
          title="产品名称"
        ></vxe-table-column>
        <vxe-table-column
          width="60"
          field="样式"
          title="样式"
        ></vxe-table-column>
        <vxe-table-column
          width="60"
          field="色号"
          title="色号"
        ></vxe-table-column>
        <vxe-table-column
          width="60"
          field="颜色"
          title="颜色"
        ></vxe-table-column>
        <vxe-table-column
          width="100"
          field="库存数量"
          title="库存数量"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="单位"
          title="单位"
        ></vxe-table-column>
        <vxe-table-column
          width="120"
          field="未包装(片)"
          title="未包装(片)"
        ></vxe-table-column>
      </vxe-table>
    </el-row>
    <!-- 分页 -->
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col style="display: flex; justify-content: space-between">
          <span>
            <el-button type="primary" class="chooseEnter">确 定</el-button>
            <el-button class="chooseCancel" @click="closeDialog"
              >取 消</el-button
            >
          </span>
        </el-col>
      </el-row>
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hearderClass: 'hearderClass',
      cellChooseClass: 'cellChooseClass',
      chooseProduceList: [],
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
  },
  created() {},
}
</script>

<style lang="scss" scoped>
>>> .hearderClass {
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  height: 34px;
  color: #333;
  background-color: #d5deff;
}
>>> .cellChooseClass {
  height: 28px;
}
.searchBtn {
  width: 70px;
  height: 30px;
  line-height: 10px;
  background: #ff9b22;
  border: 1px solid #ff9b22;
  margin-left: 22px;
}
.chooseEnter {
  width: 70px;
  height: 32px;
  background: #5473e8;
  border-radius: 2px;
  line-height: 32px;
  padding: 0;
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
>>> .chooseHeight {
  height: 740px;
}
</style>