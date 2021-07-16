<template>
  <div>
    <!-- 表单数据 -->
    <el-form
      ref="chooseForm"
      :model="chooseFormRuleForm"
      style="font-size：14px"
      label-width="120px"
    >
      <el-row>
        <el-col style="display: flex; justify-content: space-between">
          <el-form-item label-width="60px" class="marginLeft" label="站点：">
            <el-select
              :disabled="true"
              v-model="chooseFormRuleForm.shopId"
              class="unifySize"
            >
              <el-option
                :key="index"
                v-for="(item, index) in shopList"
                :label="item.Name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称/代码：">
            <el-input
              v-model="chooseFormRuleForm.strProduct"
              class="unifySize"
            ></el-input>
          </el-form-item>
          <el-form-item label="色号/颜色：">
            <el-input
              v-model="chooseFormRuleForm.color"
              class="unifySize"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="sizeMarginLeft"
            label-width="60px"
            label="尺寸："
          >
            <el-input
              v-model="chooseFormRuleForm.P_Spec"
              class="unifySize"
            ></el-input>
          </el-form-item>
          <el-button
            type="danger"
            class="searchBtn"
            size="small"
            @click="search"
            :loading="isSearch"
            icon="el-icon-search"
            >查询</el-button
          >
        </el-col>
      </el-row>
      <el-row class="chooseHeight2">
        <vxe-table
          ref="chooseTable"
          border
          resizable
          stripe
          keep-source
          :row-class-name="cellChooseClass"
          show-overflow
          :loading="isSearch"
          height="660"
          :auto-resize="true"
          class="mytable-scrollbar"
          :header-cell-class-name="hearderClass"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true }"
          :data="choosePaging.data"
        >
          <vxe-table-column type="checkbox" width="40"></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="60"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            width="175"
            field="产品号"
            title="产品编码"
          ></vxe-table-column>
          <vxe-table-column
            width="195"
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
            width="60"
            field="尺寸"
            title="尺寸"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="尺寸单位"
            title="尺寸单位"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="每包片数"
            title="每包片数"
          ></vxe-table-column>
          <vxe-table-column
            width="60"
            field="系数"
            title="系数"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="库存件数"
            title="库存件数"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="库存箱数"
            title="库存箱数"
          ></vxe-table-column>
          <vxe-table-column field="备注" title="备注"></vxe-table-column>
        </vxe-table>
      </el-row>
    </el-form>
    <!-- 分页 -->
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col style="display: flex; justify-content: space-between">
          <el-pagination
            @size-change="chooseHandleSizeChange"
            @current-change="chooseHandleCurrentChange"
            :current-page="choosePaging.page"
            background
            :page-sizes="[100, 200, 500, 1000]"
            :page-size="choosePaging.limit"
            layout="prev,pager,next,total,sizes,jumper"
            :total="choosePaging.total"
          >
          </el-pagination>

          <span>
            <el-button type="primary" @click="chooseEnter" class="chooseEnter"
              >确 定</el-button
            >
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
  props: {
    shopList: Array,
    shopId: String,
  },
  data() {
    return {
      hearderClass: 'hearderClass',
      cellChooseClass: 'cellChooseClass',
      chooseProduceList: [],
      isSearch: false,
      choosePaging: { list: [], data: [], limit: 100, total: null, page: 1 },
      chooseFormRuleForm: {
        shopId: '',
        strProduct: '', // 产品编码
        p_Spec: '', // 规格
        color: '', // 颜色
        contractNo: '',
        type: '',
        aType: '',
        planNo: '',
        isCpcg: '',
      },
    }
  },
  methods: {
    search() {
      this.getChooseProductList()
    },
    // 点击确定获取选中的数据
    chooseEnter() {
      var data = this.$refs.chooseTable.getCheckboxRecords()
      data.forEach((item) => {
        // item['箱数'] = ''
        // item['包数'] = ''
        this.$set(item, '箱数', '')
        this.$set(item, '包数', '')
        this.$set(item, '生产中', '')
        this.$set(item, '未包装', '')
        this.$set(item, '关联产品', '')
        this.$set(item, '库存', '')
      })
      this.$emit('fatherMethod', data)
      this.$emit('closeDialog')
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
    choosePageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作(选择产品表)
      this.choosePaging.data = this.chooseProduceList
      this.choosePaging.total = this.choosePaging.data.length
      this.chooseGetList()
    },
    // 处理数据(选择产品表)
    chooseGetList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.choosePaging.data = this.choosePaging.data.filter(
        (item, index) =>
          index < this.choosePaging.page * this.choosePaging.limit &&
          index >= this.choosePaging.limit * (this.choosePaging.page - 1)
      )
    },
    // 当每页数量改变(选择产品表)
    chooseHandleSizeChange(val) {
      this.choosePaging.limit = val
      this.choosePageList()
    },
    // 当当前页改变(选择产品表)
    chooseHandleCurrentChange(val) {
      this.choosePaging.page = val
      this.choosePageList()
    },
    // 选择产品按钮
    getChooseProductList() {
      this.isSearch = true
      this.chooseFormRuleForm.shopId = this.shopId

      this.$api.business
        .ChooseProduct({ model: { ...this.chooseFormRuleForm } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
            this.isSearch = false
          } else {
            this.chooseProduceList = res.data
            this.choosePageList()
            this.isSearch = false
          }
        })
        .catch((err) => {
          console.log(err)
          this.isSearch = false
        })
        .finally(() => {
          this.isSearch = false
        })
    },
  },
  created() {
    this.getChooseProductList()
  },
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
>>> .chooseHeight2 {
  height: 680px;
}
>>> .unifySize .el-input__icon {
  line-height: normal;
}
>>> .unifySize input {
  height: 30px;
}
>>> .unifySize1 input {
  height: 30px;
}
>>> .unifySize {
  width: 100% !important;
  height: 30px;
}
</style>