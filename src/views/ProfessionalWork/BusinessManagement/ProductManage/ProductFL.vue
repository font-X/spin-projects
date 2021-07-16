<template>
  <div>
    <!-- 批量修改辅料 -->
    <el-container>
      <el-row style="width: 100%">
        <!-- 输入框 -->
        <el-col>
          <el-card class="cardMargin">
            <el-row>
              <el-col>
                <el-form
                  ref="addForm"
                  :model="formInfo"
                  style="font-size：14px"
                  label-width="124px"
                  size="mini"
                >
                  <el-row>
                    <el-col :span="24">
                      <el-form-item :label="formInfo.fileld">
                        <el-input readonly v-model="formInfo.value"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="18">
                      <el-form-item label="参考产品：">
                        <el-input
                          readonly
                          v-model="formInfo.select"
                          @focus="ProductDialog"
                        ></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="6">
                      <el-button
                        type="primary"
                        size="mini"
                        style="float: right"
                        @click="selectFl()"
                        >新增</el-button
                      >
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <vxe-grid
                border
                resizable
                stripe
                width="auto"
                :height="gridHeight"
                :auto-resize="true"
                :columns="columns"
                highlight-hover-row
                :config="{ render: 'scroll' }"
                :align="'center'"
                :checkbox-config="{ highlight: true, range: true }"
                ref="grid"
                :data="gridData"
                class="vxe-grid"
              >
                <template #right="{ row, rowIndex }">
                  <i
                    @click="deleteRow(row, rowIndex)"
                    class="iconC el-icon-delete"
                  ></i>
                </template>
                <template #jyInput="{ row, column }">
                  <el-input
                    size="mini"
                    class="my-input"
                    v-model="row[column.property]"
                  />
                </template>
                <template #jyselect="{ row, column }">
                  <el-select size="mini" v-model="row[column.property]">
                    <el-option
                      :key="index"
                      v-for="(item, index) in untilList"
                      :label="item.UnitName"
                      :value="item.UnitCode"
                    ></el-option>
                  </el-select>
                </template>
              </vxe-grid>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-container>
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <el-button type="primary" size="mini" @click="okDialog()"
            >确定</el-button
          >
          <el-button type="primary" size="mini" @click="closeDialog()"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </span>
    <choose-product
      ref="ChooseProduct"
      @okDialog="ProductOkDialog"
    ></choose-product>
    <choose-product-fl
      ref="ChooseProductFL"
      @okDialog="ProductFlOkDialog"
    ></choose-product-fl>
  </div>
</template>
<script>
import JySelectTree from '../../../../components/JySelectTree/indxe'
import ChooseProduct from '../../Components/ChooseProduct'
import ChooseProductFl from '../../Components/ChooseProductFl'
export default {
  components: { JySelectTree, ChooseProduct, ChooseProductFl },
  props: {
    productNoList: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
 
  data() {
    return {
      gridHeight: 300,
      formInfo: {
        fileld: '修改产品：',
        value: '',
        select: '',
      },
      gridData: [],
      untilList: [],
      columns: [
        { width: '200', title: '辅料代码', field: 'MaterialNo' },
        { title: '辅料名称', field: 'Name' },
        {
          width: '120',
          title: '规格',
          field: 'Remark',
          slots: { default: 'jyInput' },
        },
        {
          width: '80',
          title: '数量',
          field: 'Quantity',
          slots: { default: 'jyInput' },
        },
        {
          width: '120',
          title: '单位',
          field: 'Unit',
          slots: {
            default: 'jyselect',
          },
        },
        {
          title: '操作',
          width: 80,
          align: 'center',
          slots: {
            default: 'right',
          },
        },
      ],
    }
  },
  methods: {
    okDialog() {
      var pros = []
      this.productNoList.forEach((t) => {
        pros.push(t.ProductNo)
      })
      this.$api.productManage
        .AddProductFL({ productNos: pros, list: this.gridData })
        .then((res) => {
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              message: '添加成功',
              type: 'success',
            })
            this.$emit('closeDialog')
          }
        })
    },
    closeDialog() {
      this.formInfo = {
        fileld: '修改产品：',
        value: '',
        select: '',
      }
      this.gridData = []
      this.showDialog = false
    },
    //弹出选择产品界面
    ProductDialog() {
      this.$nextTick(() => {
        this.$refs.ChooseProduct.showDialog = true
      })
    },
    ProductOkDialog(data) {
      var no = data[0].产品号
      this.formInfo.select = data[0].产品名称
      this.qyery(no)
    },
    //弹出选择辅料界面
    selectFl() {
      this.$nextTick(() => {
        this.$refs.ChooseProductFL.multiple = true
        this.$refs.ChooseProductFL.showDialog = true
      })
    },
    ProductFlOkDialog(data) {
      data.forEach((t) => {
        t.Remark = t.Spec
        t.Unit = t.Unit.trim()
        t.Quantity = 0
      })
      this.gridData.push(...data)
    },
    deleteRow(row, rowIndex) {
      this.$confirm('此操作将删除选中产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        let self = this
        self.gridData = self.gridData.filter(function (item, index) {
          if (rowIndex === index) {
            return false
          }
          return true
        })
        this.$refs.grid.updateData()
      })
    },
    //弹出分类编码
    parentProduct() {
      this.$nextTick(() => {
        this.$refs.ChooseParentProduct.showDialog = true
      })
    },
    getuntil() {
      this.$api.publicApi.XcUnit().then((res) => {
        if (res.statusCode != 200) {
          this.$message({
            message: res.message,
            type: 'error',
          })
        } else {
          var data = res.data
          data.forEach((t) => {
            t.UnitCode = t.UnitCode.trim()
          })
          this.untilList = data
        }
      })
    },
    qyery(ProductNo) {
      this.$api.productManage
        .GetProductFLDtoList({ productNo: ProductNo })
        .then((res) => {
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            var data = res.data
            data.forEach((t) => {
              t.Unit = t.Unit.trim()
            })
            this.gridData = data
          }
        })
    },
  },
  created() {
    this.$nextTick(() => {
      this.getuntil()
      let pro = ''
      let num = 0
      this.productNoList.forEach((t) => {
        pro += t.ProductNo.trim() + ','
        num++
      })
      this.formInfo.value = pro
      this.formInfo.fileld = '修改产品(' + num + '个)'
      if (!!this.productNoList && this.productNoList.length == 1) {
        this.qyery(this.productNoList[0].ProductNo)
      }
    })
  },
}
</script>
 
<style scoped lang="scss">
.el-date-editor {
  width: 100%;
}
.el-input {
  width: 100%;
}
.el-select {
  width: 100%;
}
.dialog-footer {
  text-align: center;
}
.formbtn .el-button {
  float: right;
}
</style>
