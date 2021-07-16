<template>
  <jy-dialog
    v-dialogDrag
    v-if="showDialog"
    :title="dialogTitle"
    append-to-body
    :close-on-click-modal="false"
    class="dialog-component"
    :visible.sync="showDialog"
    width="1500px"
    @close="closeDialog(0)"
  >
    <el-container v-loading="loading">
      <el-row style="width: 100%">
        <!-- 输入框 -->
        <el-col>
          <el-row class="cardMargin">
            <el-col>
              <el-form
                ref="addForm"
                :model="formInfo"
                style="font-size: 14px"
                label-width="124px"
                size="mini"
                :rules="rules"
              >
                <el-row class="rowHeight">
                  <el-col :span="5">
                    <!-- 文本域 -->
                    <el-form-item prop="DeliveryModel" label="发货模式:">
                      <el-select
                        :disabled="isEdit"
                        v-model="formInfo.DeliveryModel"
                        placeholder="请选择"
                        @focus="DeliveryModeSelectChanged"
                        @change="DeliveryModeSelectChange"
                        ref="modelselect"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in DeliveryModelList"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item prop="DeliveryPlanCode" label="发货申请单号:">
                      <el-input
                        clearable
                        v-model="formInfo.DeliveryPlanCode"
                        placeholder="发货申请单号"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item
                      :prop="formInfo.DeliveryModel == '2' ? '' : 'BakField2'"
                      label="货件编号:"
                    >
                      <el-input
                        clearable
                        v-model="formInfo.BakField2"
                        placeholder="货件编号"
                        :disabled="formInfo.DeliveryModel == '2'"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item
                      :prop="formInfo.DeliveryModel == '2' ? '' : 'BakField3'"
                      label="货件名称:"
                    >
                      <el-input
                        clearable
                        v-model="formInfo.BakField3"
                        placeholder="货件名称"
                        :disabled="formInfo.DeliveryModel == '2'"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="115px" label="海外仓贴标:">
                      <el-checkbox
                        value="1"
                        true-label="1"
                        false-label="0"
                        v-model="formInfo.OverseaPrint"
                      ></el-checkbox>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="rowHeight">
                  <el-col :span="5">
                    <el-form-item prop="Shop" label="站点:">
                      <el-select
                        @change="dialogLinkCountry"
                        v-model="formInfo.Shop"
                        placeholder="站点"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in shopList"
                          :label="item.Name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="国家:">
                      <el-select v-model="formInfo.Country" placeholder="国家">
                        <el-option
                          :key="index"
                          v-for="(item, index) in countryList"
                          :label="item.countryname"
                          :value="item.countryid"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="海外仓编号:">
                      <el-input
                        clearable
                        v-model="formInfo.BakField1"
                        placeholder="货件编号"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item prop="DeliveryDate" label="发货日期:">
                      <el-date-picker
                        v-model="formInfo.DeliveryDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="115px" label="预计到货日期:">
                      <el-date-picker
                        v-model="formInfo.ETA"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col style="height: 60px">
                    <!-- 文本域 -->
                    <el-form-item label="备注:">
                      <el-input
                        v-model="formInfo.Remark"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入备注信息"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>

            <!-- 按钮区域 -->
            <el-col>
              <!-- <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-plus"
                  @click="addProduce"
                  >新增</el-button
                > -->
              <el-button
                type="primary"
                size="small"
                v-if="formInfo.DeliveryModel === '2'"
                class="iconBtn iconfont kt-icon-duoxuanxuanzhong"
                @click="selectsku"
                >选择货件sku</el-button
              >
              <el-button
                type="primary"
                size="small"
                v-if="formInfo.DeliveryModel === '1'"
                class="iconBtn iconfont kt-icon-duoxuanxuanzhong"
                @click="selectProduct"
                >选择产品</el-button
              >
            </el-col>
          </el-row>
        </el-col>

        <!-- 主表区域 -->
        <el-col class="mainTable">
          <jy-table-input
            border
            resizable
            stripe
            width="auto"
            :v-if="formInfo.DeliveryModel != '2'"
            show-footer
            :footer-method="footerMethod"
            :footer-cell-class-name="footerCellClassName"
            :columns="columns"
            :auto-resize="true"
            :header-row-class-name="hearderClass"
            :row-class-name="cellClass"
            :edit-rules="validRules"
            :edit-config="{ trigger: 'click', mode: 'cell' }"
            show-overflow="title"
            :height="600"
            class="mytable-scrollbar"
            @cell-dblclick="showBottomTable"
            @checkbox-all="onAdjustmentCheckboxAllChange"
            @checkbox-change="onAdjustmentCheckboxChange"
            highlight-current-row
            :config="{ render: 'scroll' }"
            :align="'center'"
            :checkbox-config="{ highlight: true, range: true }"
            :data.sync="gridData"
            ref="grid"
            :permission="{
              add: formInfo.DeliveryModel != '2',
              delete: true,
            }"
          >
          </jy-table-input>
        </el-col>
      </el-row>
    </el-container>

    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <el-button
            class="saveBtn iconfont kt-icon-baocun"
            type="primary"
            size="mini"
            @click="okDialog()"
            >保存</el-button
          >
          <el-button
            class="clearBtn"
            type="primary"
            size="mini"
            @click="closeDialog()"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </span>
    <!-- <comment-on
      ref="commenton"
      :ObjectCode="'0113'"
      :ObjectKey="formInfo.ID"
    ></comment-on> -->
    <select-sku-component
      v-if="showSelectDialog"
      ref="SelectSkuComponent"
      @okDialog="okSelectDialog"
    ></select-sku-component>
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
          height: computedHeight,
          position: 'relative',
        }"
      >
        <choose-product
          @fatherMethod="fatherMethod"
          :shopList="shopList"
          :shopId="shopId"
          v-if="dialogParam.name === 'ChooseProduct'"
          @closeDialog="closeDialog2"
        ></choose-product>
      </div>
    </jy-dialog>
  </jy-dialog>
</template>
 
<script>
import SelectSkuComponent from '../DeliveryRequest/selectSkuComponent'
import ChooseProduct from '../E-Commerce/DeliverySchedule/ChooseProduct'
import JyTableInput from '../../../../components/JyTableInput/index'
import CommentOn from '../../../Components/CommentOn'
import JyDialog from '@/components/JyDialog'
export default {
  components: {
    SelectSkuComponent,
    ChooseProduct,
    JyTableInput,
    CommentOn,
    JyDialog,
  },
  data() {
    return {
      isEdit: false,
      footerCellClassName: 'footerCellClassName',
      dialogTitle: '发货申请单编辑',
      computedHeight: window.innerHeight - 100 + 'px',
      dialogParam: {
        title: '',
        type: '',
        name: '',
        width: '60%',
        isShowDialog: false,
      },
      countryList: [],
      showDialog: false,
      shopId: '',
      showSelectDialog: false,
      showChooseDialog: false,
      loading: false,
      formInfo: {
        ID: this.Id,
        Country: '',
        DeliveryModel: '2',
        DeliveryDate: new Date(),
      },
      DeliveryModelList: [
        { id: '1', name: '先出库后建仓' },
        { id: '2', name: '先建仓后出库' },
      ],
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      columns: [
        {
          width: '16%',
          title: '货件编号',
          field: '货件编号',
        },
        {
          width: '16%',
          title: '产品号',
          field: '产品号',
        },
        {
          width: '20%',
          title: '产品名称',
          field: '产品名称',
        },
        { width: '7%', title: '样式', field: '样式' },
        { width: '4%', title: '色号', field: '色号' },
        { width: '4%', title: '颜色', field: '颜色' },
        { width: '4%', title: '尺寸', field: '尺寸' },
        { width: '6%', title: '尺寸单位', field: '尺寸单位' },
        {
          width: '6%',
          title: '每包片数',
          field: '每包片数',
        },
        {
          width: '7%',
          title: '箱数',
          field: '箱数',
        },
        {
          width: '7%',
          title: '包数',
          field: '包数',
        },
      ],
      columns2: [
        {
          width: '16%',
          title: '货件编号',
          field: '货件编号'
        },
        { width: '16%', title: '产品号', field: '产品号' },
        { width: '18%', title: '产品名称', field: '产品名称' },
        { width: '7%', title: '样式', field: '样式' },
        { width: '4%', title: '色号', field: '色号' },
        { width: '4%', title: '颜色', field: '颜色' },
        { width: '4%', title: '尺寸', field: '尺寸' },
        { width: '6%', title: '尺寸单位', field: '尺寸单位' },
        {
          width: '6%',
          title: '每包片数',
          field: '每包片数',
        },
        {
          width: '5%',
          title: '箱数',
          field: '箱数',
        },
        {
          width: '4%',
          title: '包数',
          field: '包数',
        },
      ],
      shopList: [],
      addRules: {},
      gridData: [],
      rules: {
        DeliveryModel: [
          { required: true, message: '发货模式不能为空', trigger: 'blur' },
        ],
        DeliveryPlanCode: [
          { required: true, message: '发货申请单号不能为空', trigger: 'blur' },
        ],
        BakField2: [
          { required: true, message: '货件编号不能为空', trigger: 'blur' },
        ],
        BakField3: [
          { required: true, message: '货件名称不能为空', trigger: 'blur' },
        ],
        Shop: [{ required: true, message: '站点不能为空', trigger: 'blur' }],
        DeliveryDate: [
          { required: true, message: '发货日期不能为空', trigger: 'blur' },
        ],
      },
      validRules: {
        箱数: [
          { required: true, message: '箱数必须填写' },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值不能为负数',
          },
        ],
      },
    }
  },
  methods: {
    fatherMethod(data) {
      console.log(data)
      this.gridData = this.gridData.concat(data)
      if (this.gridData[0]['产品号'] === '') {
        this.gridData.shift()
      }
      let flag = false
      function deWeight(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
          for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].产品号 == arr[j].产品号) {
              flag = true
              arr.splice(j, 1)
              j--
              //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
            }
          }
        }
        return arr
      }
      this.gridData = deWeight(this.gridData)
      if (flag) {
        this.$message.error('存在重复的产品,已删除!')
      }
      this.gridData.forEach((item) => {
        if (item['包数'] === undefined) {
          this.$set(item, '包数', '')
          this.$set(item, '箱数', '')
        }
      })
    },
    clearData() {
      this.formInfo.DeliveryPlanCode = ''
      this.formInfo.BakField2 = ''
      this.formInfo.BakField3 = ''
      this.formInfo.OverseaPrint = ''
      this.formInfo.Shop = ''
      this.formInfo.Country = ''
      this.formInfo.BakField1 = ''
      this.formInfo.DeliveryDate = ''
      this.formInfo.ETA = ''
      this.formInfo.Remark = ''
      this.gridData = [
        {
          货件编号: '',
          产品号: '',
          产品名称: '',
          样式: '',
          色号: '',
          颜色: '',
          尺寸: '',
          尺寸单位: '',
          每包片数: '',
        },
      ]
    },
    init() {
      this.clearData()
      this.addProductState()
      this.columns = this.columns2
      // if (this.formInfo.DeliveryModel == '2') {
      //   this.columns.forEach((item) => {
      //     item.jydefineType = 'noedit'
      //   })
      // }

      this.gridData.forEach((item) => {
        this.$set(item, '箱数', '')
        this.$set(item, '包数', '')
      })
      if (!!this.formInfo.ID) {
        this.isEdit = true
        this.formInfo.Shop = ''
        this.$api.deliveryRequest
          .getRequestInfoWithList({ Id: this.formInfo.ID })
          .then((res) => {
            if (res.statusCode != 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.formInfo = res.data.info
              this.DeliveryModeSelectChange()
              this.gridData = res.data.list
              this.gridData.forEach((item) => {
                item.sku编号 = item.产品号
                this.$set(item, '箱数', item['Packages'])
                this.$set(item, '包数', item['RollNum'])
              })
              this.$api.publicApi
                .LinkShop({ shopid: this.formInfo.Shop, flag: '2' })
                .then((res) => {
                  // console.log(res);
                  if (res.statusCode !== 200)
                    return this.$message.error(res.message)
                  this.countryList = res.data
                })
                .catch((err) => {
                  console.log(err)
                })
              // this.$refs.grid.updateData()
            }
          })
          .catch((err) => console.log(err))
      } else {
        this.isEdit = false
        this.formInfo = {
          DeliveryModel: '2',
          BakField2: '',
          BakField3: '',
          DeliveryDate: new Date(),
        }
      }
    },
    // 关闭弹框
    closeDialog(flag) {
      this.formInfo = {
        DeliveryModel: '2',
        BakField2: '',
        BakField3: '',
        DeliveryDate: new Date(),
      }
      this.gridData = []
      //Object.assign(this.$data, this.$options.data())
      this.showDialog = false
      this.$emit('closeDialog', flag)
    },
    closeDialog2() {
      this.dialogParam.isShowDialog = false
    },
    //点击保存
    okDialog() {
      // 表格校验
      this.$refs.addForm.validate((valid) => {
        if (!valid) {
          return false
        } else {
          var columnIcon = '◇'
          var datalist = ''
          var b = true
          var s = []
          this.gridData.forEach((item, index) => {
            if (!item.箱数 || !item.包数) {
              this.$message({
                message: '第' + (index + 1) + '行产品箱数必须填写',
                type: 'error',
              })
              b = false
              return
            }
            if (!item.包数) {
              this.$message({
                message: '第' + (index + 1) + '行产品包数必须填写',
                type: 'error',
              })
              b = false
              return
            }
            s.push(item.产品号)
            datalist +=
              item.货件编号 +
              columnIcon +
              item.产品号 +
              columnIcon +
              item.产品名称 +
              columnIcon +
              item.样式 +
              columnIcon +
              item.色号 +
              columnIcon +
              item.颜色 +
              columnIcon +
              item.尺寸 +
              columnIcon +
              item.unit +
              columnIcon +
              item.尺寸单位 +
              columnIcon +
              item.每包片数 +
              columnIcon +
              item.箱数 +
              columnIcon +
              item.包数 +
              '◆'
          })
          if (b) {
            this.loading = true
            this.formInfo.strList = datalist
            this.$api.deliveryRequest
              .save({ model: { ...this.formInfo } })
              .then((res) => {
                this.loading = false
                if (res.statusCode != 200) {
                  this.$message({
                    message: res.message,
                    type: 'error',
                  })
                } else {
                  this.$emit('okDialog')
                  this.closeDialog()
                }
              })
              .catch((err) => (this.loading = false))
          }
        }
      })
    },
    // 获取站点列表
    addProductState() {
      this.$api.publicApi
        .basShop()
        .then((res) => {
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.shopList = res.data
            // this.formInfo.Shop = this.shopList[0].id
            // this.dialogLinkCountry()
            if (!!this.formInfo.ID) {
              return
            } else {
              this.formInfo.Shop = this.shopList[0].id
              this.dialogLinkCountry()
            }
          }
        })
        .catch((err) => console.log(err))
    },
    //手动添加产品
    // addProduce() {
    //   if (this.formInfo.DeliveryModel == '2') {
    //     this.$message({
    //       message: '必须在【先出库后建仓】模式下才能选择产品',
    //       type: 'error',
    //     })
    //     return
    //   }
    //   this.showChooseDialog = true
    //   this.$nextTick(() => {
    //     this.$refs.ChooseProductCn.filterData = this.gridData
    //     this.$refs.ChooseProductCn.showDialog = true
    //   })
    // },
    // 选择产品
    selectProduct() {
      if (!this.formInfo.Shop) {
        this.$message({
          message: '请先选择站点',
          type: 'error',
        })
        return
      }
      this.shopId = this.formInfo.Shop
      this.dialogParam = {
        title: '选择产品信息',
        name: 'ChooseProduct',
        type: '',
        width: '70%',
        isShowDialog: true,
      }
    },
    //选择sku
    selectsku() {
      if (!this.formInfo.Shop) {
        this.$message({
          message: '请先选择站点',
          type: 'error',
        })
        return
      }
      this.showSelectDialog = true
      this.$nextTick(() => {
        this.$refs.SelectSkuComponent.filterData = this.gridData
        this.$refs.SelectSkuComponent.showSelectDialog = true
        this.$refs.SelectSkuComponent.formInfo = {
          shop: this.formInfo.Shop,
          beg_date: this.$XEUtils.getWhatMonth(this.$XEUtils.now(), -3),
          end_date: new Date(this.$XEUtils.now()),
        }
      })
    },
    //删除数据
    delProduct(row) {
      this.$confirm('此操作将删除选中产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        let self = this
        self.gridData = self.gridData.filter(function (item) {
          if (row.产品号 === item.产品号) {
            return false
          }
          return true
        })
        // this.$refs.grid.updateData()
      })
    },
    // 表尾合计
    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          switch (column.property) {
            case '箱数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].箱数)
              }
              return sums
            case '包数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].包数)
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    //修改箱数
    //选择完数据
    okSelectDialog(selectData) {
      //console.log(selectData)
      //this.gridData.push(...selectData)
      // this.gridData.push(...JSON.parse(JSON.stringify(selectData)))
      //this.$refs.grid.updateData()

      this.gridData = this.gridData.concat(selectData)
      if (this.gridData[0]['产品号'] === '') {
        this.gridData.shift()
      }
      let flag = false
      function deWeight(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
          for (var j = i + 1; j < arr.length; j++) {
            if (
              arr[i].产品号 == arr[j].产品号 &&
              arr[i].货件编号 == arr[j].货件编号
            ) {
              flag = true
              arr.splice(j, 1)
              j--
              //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
            }
          }
        }
        return arr
      }
      this.gridData = deWeight(this.gridData)
      this.gridData.forEach((item) => {
        this.$set(item, '包数', item['RollNum'])
        this.$set(item, '箱数', item['Packages'])
      })
      if (flag) {
        this.$message.error('存在重复的产品,已删除!')
      }
    },
    //修改模式
    DeliveryModeSelectChanged(row) {
      if (this.gridData.length == 1 && this.gridData[0].产品名称 == '') {
      } else {
        if (this.gridData.length > 0) {
          this.$refs.modelselect.blur()
          this.$alert('请先清空明细再切换模式', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
        }
      }
    },
    //修改模式后
    DeliveryModeSelectChange() {
      if (this.formInfo.DeliveryModel != '2') {
        this.gridData = [
          {
            货件编号: '',
            产品号: '',
            产品名称: '',
            样式: '',
            色号: '',
            颜色: '',
            尺寸: '',
            尺寸单位: '',
            每包片数: '',
            箱数: '',
            包数: '',
          },
        ]
        this.columns = [
          {
            width: '16%',
            title: '产品号',
            field: '产品号',
            editRender: {
              immediate: true,
            },
          },
          { width: '16%', title: '产品名称', field: '产品名称' },
          {
            width: '7%',
            title: '样式',
            field: '样式',
            editRender: {
              immediate: true,
            },
          },
          { width: '4%', title: '色号', field: '色号' },
          { width: '4%', title: '颜色', field: '颜色' },
          { width: '4%', title: '尺寸', field: '尺寸' },
          { width: '6%', title: '尺寸单位', field: '尺寸单位' },
          {
            width: '6%',
            title: '每包片数',
            field: '每包片数',
          },
          {
            width: '5%',
            title: '箱数',
            field: '箱数',
            editRender: {
              props: {
                type: 'number',
              },
            },
          },
          {
            width: '4%',
            title: '包数',
            field: '包数',
          },
        ]
      } else {
        this.gridData = [
          {
            货件编号: '',
            产品号: '',
            产品名称: '',
            样式: '',
            色号: '',
            颜色: '',
            尺寸: '',
            尺寸单位: '',
            每包片数: '',
            箱数: '',
            包数: '',
          },
        ]
        this.columns = this.columns2
      }
    },
    //手动选择产品关闭
    okshowChooseDialog(selectData) {
      this.gridData.push(...selectData)
      // this.$refs.grid.updateData()
    },
    // 获取国家列表
    // addProductCountry() {
    //   this.$api.publicApi
    //     .bcState()
    //     .then((res) => {
    //       if (res.statusCode !== 200) {
    //         this.$message({
    //           message: res.message,
    //           type: 'error',
    //         })
    //       } else {
    //         this.allCountryList = res.data
    //       }
    //     })
    //     .catch((err) => console.log(err))
    // },
    showBottomTable() {},
    onAdjustmentCheckboxAllChange() {},
    onAdjustmentCheckboxChange() {},
    dialogLinkCountry() {
      this.$api.publicApi
        .LinkShop({ shopid: this.formInfo.Shop, flag: '2' })
        .then((res) => {
          if (res.statusCode !== 200) return this.$message.error(res.message)
          this.countryList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  created() {},
}
</script>
 
<style scoped lang="scss">
.el-date-editor {
  width: 100%;
}
.rowHeight {
  .el-col {
    height: 40px;
  }
}
>>> .footerCellClassName {
  background: #d1f3ff;
  height: 30px;
}
.iconBtn {
  width: 110px;
  height: 32px;
  background: #5473e8;
  border-radius: 2px;
  font-size: 14px;
  border: 1px solid #5473e8;
  font-weight: 400;
  color: #fcfefe;
  padding: 0;
  margin-bottom: 10px;
}
.el-input {
  width: 100%;
}
.el-select {
  width: 100%;
}
>>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.vxe-grid {
  margin-top: 10px;
}
>>> .cellClass {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 30px;
}
>>> .hearderClass {
  text-align: center;
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  height: 34px;
  color: #333;
  background-color: #d5deff;
}
.formbtn .el-button {
  float: right;
}
.saveBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #5473e8;
  border: 1px solid #5473e8 !important;
}
.el-pagination {
  float: right;
  padding-top: 10px;
  padding-right: 20px;
}
>>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.clearBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #908fa0;
  border: 1px solid #908fa0 !important;
}
>>> .jy-dialog .jy-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
>>> .vxe-header--column .vxe-cell--edit-icon,
.vxe-header--column .vxe-cell-help-icon {
  display: none;
}
>>> .vxe-table--render-default.size--mini {
  user-select: text;
}
/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #ffffff;
}
</style>
