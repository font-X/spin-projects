<template>
  <!-- 新增调价单 -->
  <div>
    <!-- 表单数据 -->
    <el-form
      ref="addForm"
      :model="addFormParams"
      :rules="addRules"
      style="font-size：14px"
      label-width="84px"
    >
      <el-row>
        <el-col style="display: flex; justify-content: space-between">
          <el-form-item label-width="100px" prop="shop" label="站点：">
            <el-select
              clearable
              @change="linkCountry"
              v-model="addFormParams.shop"
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
          <el-form-item label="国家：">
            <el-select
              clearable
              v-model="addFormParams.country"
              class="unifySize"
            >
              <el-option
                :key="index"
                v-for="(item, index) in countryList"
                :label="item.countryname"
                :value="item.countryid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="110px" prop="startdate" label="生效日期：">
            <el-date-picker
              class="unifySizeDate"
              v-model="addFormParams.startdate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="currency" label="币种：">
            <el-select
              clearable
              v-model="addFormParams.currency"
              class="unifySize"
            >
              <el-option value=""></el-option>
              <el-option
                :key="index"
                v-for="(item, index) in currencyList"
                :label="item.chnName"
                :value="item.currency"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品系列：">
            <el-input
              clearable
              v-model="addFormParams.productlist"
              class="unifySize"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col style="height: 80px">
          <!-- 文本域 -->
          <el-form-item label-width="100px" prop="reasons" label="调价原因：">
            <el-input
              clearable
              type="textarea"
              :rows="2"
              placeholder="请输入调价原因（必填）"
              v-model="addFormParams.reasons"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col class="secondBtn">
          <el-button
            type="primary"
            :class="!isEdit ? 'choose2Btn' : ''"
            @click="getChooseProductList"
            class="iconBtn iconfont kt-icon-caidan"
            :disabled="!isEdit"
            >选择产品</el-button
          >
          <el-button
            type="primary"
            @click="delProduct"
            :disabled="
              (addProduceList.length <= 1 && addProduceList[0].产品号 === '') ||
              !isEdit
                ? true
                : false
            "
            :class="
              (addProduceList.length <= 1 && addProduceList[0].产品号 === '') ||
              !isEdit
                ? 'del2Btn'
                : 'delBtn'
            "
            class="iconBtn el-icon-delete"
            >删除</el-button
          >
          <!-- <span
              class="NullTip"
              v-if="
                addProduceList.length <= 1 && addProduceList[0].产品号 === ''
              "
              >暂无数据，请点击“选择产品”按钮或”产品编码“下方的蓝色选择产品图标</span
            > -->
          <span
            class="NullTip"
            v-if="addProduceList.length <= 1 && addProduceList[0].产品号 === ''"
            >暂无数据，请点击“选择产品”按钮选择产品</span
          >
        </el-col>
      </el-row>
      <el-row class="addHeight">
        <JyTableInput
          border
          ref="addTable"
          resizable
          stripe
          keep-source
          :edit-rules="validRules"
          :header-row-class-name="hearderClass"
          class="mytable-scrollbar"
          :auto-resize="true"
          style="margin-top: 11px"
          show-overflow="title"
          width="auto"
          height="490"
          :row-class-name="redStyle"
          @checkbox-change="onAddCheckboxChange"
          @checkbox-all="onAddCheckboxAllChange"
          highlight-current-row
          :edit-config="{ trigger: 'click', mode: 'cell' }"
          :align="'center'"
          :checkbox-config="{
            highlight: true,
          }"
          :columns="r_columns"
          :data.sync="addProduceList"
        >
        </JyTableInput>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <el-button
            type="primary"
            :loading="isSave"
            @click="saveProduct"
            :disabled="
              (addProduceList.length <= 1 && addProduceList[0].产品号 === '') ||
              !isEdit
                ? true
                : false
            "
            :class="
              (addProduceList.length <= 1 && addProduceList[0].产品号 === '') ||
              !isEdit
                ? 'saveBtn1'
                : 'saveBtn'
            "
            class="iconfont kt-icon-baocun"
            >保存</el-button
          >
          <el-button
            type="primary"
            :loading="isSave"
            @click="saveProductAnd"
            :disabled="
              (addProduceList.length <= 1 && addProduceList[0].产品号 === '') ||
              !isEdit
                ? true
                : false
            "
            :class="
              (addProduceList.length <= 1 && addProduceList[0].产品号 === '') ||
              !isEdit
                ? 'saveAnd1'
                : 'saveAnd'
            "
            class="el-icon-s-promotion saveAnd"
            >保存并批报</el-button
          >
          <el-button type="primary" class="clearBtn" @click="cancel"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </span>
    <!-- 选择产品信息 -->
    <el-dialog
      v-dialogDrag
      title="选择产品信息"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="chooseDaialogVisible"
      width="60%"
    >
      <!-- 表单数据 -->
      <el-form
        ref="chooseForm"
        :model="chooseFormRuleForm"
        style="font-size：14px"
        label-width="110px"
      >
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <el-form-item class="marginLeft" label="站点：">
              <el-select
                :disabled="!isSelectDisable"
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
            <el-form-item class="sizeMarginLeft" width="60" label="尺寸：">
              <el-input
                v-model="chooseFormRuleForm.P_Spec"
                class="unifySize"
              ></el-input>
            </el-form-item>
            <el-button
              type="danger"
              class="searchBtn"
              size="small"
              @click="searchProductList"
              icon="el-icon-search"
              :loading="chooseProduceListLoading"
              >查询</el-button
            >
          </el-col>
          <el-col> </el-col>
        </el-row>
        <el-row class="chooseHeight">
          <vxe-table
            ref="chooseTable"
            border
            resizable
            stripe
            keep-source
            :row-class-name="cellChooseClass"
            show-overflow
            height="597"
            :auto-resize="true"
            class="mytable-scrollbar"
            :header-cell-class-name="hearderClass"
            @checkbox-change="onChooseCheckboxChange"
            @checkbox-all="onChooseCheckboxAllChange"
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
              <el-button
                type="primary"
                :disabled="chooseProduceList.length < 1 ? true : false"
                class="chooseEnter"
                @click="chooseProduct"
                >确 定</el-button
              >
              <el-button
                class="chooseCancel"
                @click="chooseDaialogVisible = false"
                >取 消</el-button
              >
            </span>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import JyTableInput from '@/components/JyTableInput/index'
export default {
  props: {
    Str: String,
  },
  components: { JyTableInput },
  data() {
    return {
      showReportDialog: false,
      priceAdjustmentSheet: [],
      addProduceList: [{ 产品号: '' }], //新增产品表
      chooseProduceList: [], //产品信息表
      chooseList: [], // 勾选产品信息后的数据
      ID: '',
      delParams: {
        UserCode: '',
        PricechangeId: '',
        strMessage: '',
      }, //删除调价单的产品参数

      r_columns: [
        { type: 'checkbox', width: '4%' },
        {
          title: '产品编码',
          field: '产品号',
          width: '16%%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '产品名称',
          field: '产品名称',
          width: '16%%',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '9%',
          title: 'asn',
          field: 'asn',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '5%',
          title: '样式',
          field: '样式',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '4%',
          title: '色号',
          field: '色号',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '4%',
          title: '颜色',
          field: '颜色',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '5%',
          title: '尺寸',
          field: '尺寸',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '7%',
          title: '尺寸单位',
          field: '尺寸单位',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '7%',
          title: '调前价格',
          field: '调整前价格',
          editRender: {
            props: {
              type: 'number',
            },
          },
        },
        {
          width: '8%',
          title: '调后价格',
          field: '调整后价格',
          editRender: {
            props: {
              type: 'number',
            },
            immediate: true,
          },
        },
        {
          width: '7%',
          title: '备注',
          field: '备注',
          editRender: {
            immediate: true,
          },
        },
      ],
      chooseProduceListLoading: false,
      addRules: {
        reasons: [
          { required: true, message: '请输入调价原因', trigger: 'blur' },
        ],
        shop: [{ required: true, message: '请选择站点', trigger: 'blur' }],
        // country: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        startdate: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        // product: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        currency: [
          { required: true, message: '请选择货币类型', trigger: 'blur' },
        ],
      },
      delLength: [],
      validRules: {
        调整后价格: [
          { required: true, message: '调整价格必须填写' },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值不能为负数',
          },
        ],
      },
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      cellChooseClass: 'cellChooseClass',
      addAialogVisible: false,
      chooseDaialogVisible: false,
      isEdit: true, //规定调价单是否可以修改
      isEdit2: false, //规定调价单是否可以修改
      isSave: false,
      Isupdate: false,
      addFormParams: {
        // 保存的参数
        usercode: '',
        pricechangeid: '',
        startdate: '',
        shop: '',
        reasons: '',
        strlist: '',
        productlist: '',
        strmessage: '',
        country: '',
        isaudit: '0',
        currency: '',
      },
      columnIcon: '◇', //列分隔符
      countryList: [],
      currencyList: [],
      unitList: [],
      shopList: [],
      //选择产品接口参数
      mainTime: [],
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
      isSelectDisable: true,
      // 获取调整期价格的参数
      getPriceParams: {
        strMessage: '',
        usercode: '001',
        shopid: '',
        country: '',
        productnolist: '',
        saledate: '',
      },
      IsChina: false,
      isShowDetailed: false, //是否显示明细
      isLoadingBtn: false,
      gotPrice: [],
      paging: { list: [], data: [], limit: 100, total: null, page: 1 },
      choosePaging: { list: [], data: [], limit: 100, total: null, page: 1 },
      delArr: [],
    }
  },
  methods: {
    // 导出Excel
    exportExcel() {
      this.$refs.mainTable.exportData({ type: 'csv' })
    },
    // 站点改变返回国家
    linkCountry() {
      this.countryList = []
      this.$api.publicApi
        .LinkShop({ shopid: this.addFormParams.shop })
        .then((res) => {
          if (res.statusCode !== 200) return this.$message.error(res.message)
          this.countryList = res.data
          if (res.data.length !== 0) {
            this.addFormParams.country = res.data[0].countryid
          } else {
            this.addFormParams.country = ''
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //点击单元格
    cellclick(data) {
      if (data.columnIndex != 0) {
        this.$refs.mainTable.setAllCheckboxRow(false)
        this.$refs.mainTable.setCheckboxRow(data.row, true)
      }
    },
    //报批
    reportItem() {
      var data = []
      data.push(...this.$refs.mainTable.getCheckboxRecords())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条数据后操作!',
          type: 'error',
        })
      } else {
        var ID = data[0].pricechangeid
        this.showReportDialog = true
        this.$nextTick(() => {
          this.$refs.ReportApproval.formInfo.ObjectCode = '0116'
          this.$refs.ReportApproval.formInfo.Key = ID
          this.$refs.ReportApproval.showDialog = true
        })
      }
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
    //报批完成后
    ReportOkDialog() {},
    saveProduct() {
      // const errMap = await this.$refs.addTable //vxe-table表格数据校验
      //   .validate(true)
      //   .catch((errMap) => errMap)
      // if (errMap) {
      //   return
      // } else {
      var flag = true
      this.addProduceList.forEach((item) => {
        if (item.调整后价格 === '') {
          flag = false
          return this.$message.error('调整后价格不能为空,请先输入!')
        }
        if (item.调整前价格 === item.调整后价格) {
          flag = false
          return this.$message.error('调整前价格与调整后价格不能一致，请修改!')
        }
      })
      if (flag) {
        this.$refs.addForm.validate((valid) => {
          if (!valid) return //文本域校验，必填项
          this.$delete(this.addProduceList, '调整后价格')
          this.isSave = true
          this.addFormParams.strlist = ''
          if (
            this.addProduceList.length >= 1 &&
            this.addProduceList[0].产品号 !== ''
          ) {
            var strlist = ''
            for (var i = 0; i <= this.addProduceList.length - 1; i++) {
              if (this.addProduceList[i].产品号 !== '') {
                strlist +=
                  this.addFormParams.strlist +
                  '◆' +
                  this.addProduceList[i].产品号.trim() +
                  this.columnIcon +
                  this.addProduceList[i].产品名称 +
                  this.columnIcon +
                  this.addProduceList[i].asn +
                  this.columnIcon +
                  this.addProduceList[i].样式 +
                  this.columnIcon +
                  this.addProduceList[i].色号 +
                  this.columnIcon +
                  this.addProduceList[i].颜色 +
                  this.columnIcon +
                  this.addProduceList[i].尺寸 +
                  this.columnIcon +
                  this.addProduceList[i].尺寸单位.trim() +
                  this.columnIcon +
                  this.addFormParams.currency.trim() +
                  this.columnIcon +
                  this.addProduceList[i].调整前价格 +
                  this.columnIcon +
                  this.addProduceList[i].调整后价格 +
                  this.columnIcon +
                  this.addProduceList[i].备注
              }
            }

            this.addFormParams.strlist = strlist.slice(1, strlist.length) + '◆'
            // console.log(this.addFormParams.strlist)
          }
          let InDex = this.shopList.findIndex((item) => {
            return item.Name.trim() == this.addFormParams.shop.trim()
          })

          if (InDex !== -1) {
            this.addFormParams.shop = this.shopList[InDex].id
          }
          // 获取货币的value值
          let InDeX = this.currencyList.findIndex((item) => {
            return item.chnName.trim() == this.addFormParams.currency.trim()
          })
          if (InDeX !== -1) {
            this.addFormParams.currency = this.currencyList[InDex].currency
          }
          // 获取国家的value
          if (this.addFormParams.country !== '') {
            let INDex = this.countryList.findIndex((item) => {
              return item.countryname.trim() == this.addFormParams.country
            })
            if (InDex !== -1) {
              this.addFormParams.country = this.countryList[INDex].countryid
            }
          }
          this.$api.business
            .saveProduct({ model: { ...this.addFormParams } })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.$message({
                  message: '保存成功',
                  type: 'success',
                })
                this.$refs.addForm.resetFields()
                this.addProduceList = []
                // this.addFormParams.strlist = []
                let nullObj = {
                  产品号: '',
                  产品名称: '',
                  备注: '',
                  尺寸: '',
                  尺寸单位: '',
                  样式: '',
                  色号: '',
                  asn: '',
                  调整前价格: '',
                  调整后价格: '',
                  颜色: '',
                }
                this.addProduceList[0] = nullObj
                this.isSave = false
                this.delLength = []
                this.closeDialog()
              }
            })
            .catch((err) => {
              this.isSave = false
              console.log(err)
            })
            .finally(() => {
              this.isSave = false
            })
        })
      }
      // }
    },
    // 保存并批报
    saveProductAnd() {
      var flag = true
      this.addProduceList.forEach((item) => {
        if (item.调整后价格 === '') {
          flag = false
          return this.$message.error('调整后价格不能为空,请先输入!')
        }
        if (item.调整前价格 === item.调整后价格) {
          flag = false
          return this.$message.error('调整前价格与调整后价格不能一致，请修改!')
        }
      })
      if (flag) {
        this.$refs.addForm.validate((valid) => {
          if (!valid) return //文本域校验，必填项
          this.$delete(this.addProduceList, '调整后价格')
          this.isSave = true
          this.addFormParams.strlist = ''
          if (
            this.addProduceList.length >= 1 &&
            this.addProduceList[0].产品号 !== ''
          ) {
            var strlist = ''
            for (var i = 0; i <= this.addProduceList.length - 1; i++) {
              if (this.addProduceList[i].产品号 !== '') {
                strlist +=
                  this.addFormParams.strlist +
                  '◆' +
                  this.addProduceList[i].产品号.trim() +
                  this.columnIcon +
                  this.addProduceList[i].产品名称 +
                  this.columnIcon +
                  this.addProduceList[i].asn +
                  this.columnIcon +
                  this.addProduceList[i].样式 +
                  this.columnIcon +
                  this.addProduceList[i].色号 +
                  this.columnIcon +
                  this.addProduceList[i].颜色 +
                  this.columnIcon +
                  this.addProduceList[i].尺寸 +
                  this.columnIcon +
                  this.addProduceList[i].尺寸单位.trim() +
                  this.columnIcon +
                  this.addFormParams.currency.trim() +
                  this.columnIcon +
                  this.addProduceList[i].调整前价格 +
                  this.columnIcon +
                  this.addProduceList[i].调整后价格 +
                  this.columnIcon +
                  this.addProduceList[i].备注
              }
            }

            this.addFormParams.strlist = strlist.slice(1, strlist.length) + '◆'
            // console.log(this.addFormParams.strlist)
          }
          let InDex = this.shopList.findIndex((item) => {
            return item.Name.trim() == this.addFormParams.shop.trim()
          })

          if (InDex !== -1) {
            this.addFormParams.shop = this.shopList[InDex].id
          }
          // 获取货币的value值
          let InDeX = this.currencyList.findIndex((item) => {
            return item.chnName.trim() == this.addFormParams.currency.trim()
          })
          if (InDeX !== -1) {
            this.addFormParams.currency = this.currencyList[InDex].currency
          }
          // 获取国家的value
          if (this.addFormParams.country !== '') {
            let INDex = this.countryList.findIndex((item) => {
              return item.countryname.trim() == this.addFormParams.country
            })
            if (InDex !== -1) {
              this.addFormParams.country = this.countryList[INDex].countryid
            }
          }
          this.$api.business
            .saveProduct({ model: { ...this.addFormParams } })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.isSave = false
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.$message({
                  message: '保存成功',
                  type: 'success',
                })
                this.isSave = false
                // var ID = res.data[0].pricechangeid
                // console.log(data[0].ID);
                this.ID = res.data[0].pricechangeid
                this.$emit('fatherMethod', this.ID)
                // this.$nextTick(() => {
                //   console.log(666)
                //   this.$refs.ReportApproval.formInfo.ObjectCode = '0116'
                //   this.$refs.ReportApproval.formInfo.Key = ID
                //   this.$refs.ReportApproval.showDialog = true
                //   // this.closeDialog()
                // })
                this.$refs.addForm.resetFields()
                this.delLength = []
              }
            })
            .catch((err) => {
              this.isSave = false
              this.$message({
                message: err,
                type: 'error',
              })
            })
            .finally(() => {
              this.isSave = false
            })
        })
      }
    },
    // iconChooseProduct() {
    //   this.getChooseProductList()
    // },
    // iconAddProduct() {
    //   if (this.addProduceList[this.addProduceList.length - 1].产品号 !== '') {
    //     let nullObj = { 产品号: '' }
    //     this.addProduceList.push(nullObj)
    //   } else {
    //     this.$message({
    //       message: '请点击“选择产品”按钮或”产品编码“下方的蓝色选择产品图标',
    //       type: 'error',
    //     })
    //   }
    // },
    // 查看勾选项
    seeChecked() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.delLength.length !== 1) {
        this.$message({
          message: '请选择且只能选择一条数据后操作',
          type: 'error',
        })
      } else {
        this.addTitle = '查看调价表'
        this.isEdit = false
        if (this.AdjustmentList.isdetail === '1') {
          this.$set(this.addFormParams, 'startdate', this.delLength[0].生效日期)
        } else {
          this.$set(this.addFormParams, 'startdate', this.delLength[0].生效时间)
        }
        this.addFormParams.country = this.delLength[0].国家
        this.addFormParams.shop = this.delLength[0].站点
        this.addFormParams.currency = this.delLength[0].币种
        this.addFormParams.productlist = this.delLength[0].产品系列
        this.addFormParams.reasons = this.delLength[0].调价原因
        this.addFormParams.pricechangeid = this.delLength[0].pricechangeid
        this.$api.business
          .GetProductPriceChang({
            PricechangeId: this.delLength[0].pricechangeid,
          })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              console.log(res)
              this.addProduceList = res.data
            }
          })
          .catch((err) => console.log(err))

        this.addAialogVisible = true
      }
    },
    redStyle(row) {
      if (Number(row.row.调整后价格) === 0) {
        return 'redClass'
      } else if (Number(row.row.调整后价格) === Number(row.row.调整前价格)) {
        return 'redClass'
      } else {
        return 'cellClass'
      }
    },
    // 选择产品按钮
    getChooseProductList() {
      this.isSelectDisable = false
      this.chooseDaialogVisible = true
      this.chooseFormRuleForm.strProduct = ''
      this.chooseFormRuleForm.color = ''
      this.chooseFormRuleForm.P_Spec = ''
      this.chooseFormRuleForm.shopId = this.addFormParams.shop

      this.$api.business
        .ChooseProduct({ model: { ...this.chooseFormRuleForm } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.chooseProduceList = res.data
            this.choosePageList()
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {})
    },
    // 查找产品信息
    searchProductList() {
      this.chooseProduceListLoading = true
      this.$api.business
        .ChooseProduct({ model: { ...this.chooseFormRuleForm } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.chooseProduceListLoading = false
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.chooseProduceListLoading = false
            // console.log(res)
            this.chooseProduceList = res.data
            this.choosePageList()
          }
        })
        .catch((err) => {
          this.chooseProduceListLoading = false
          console.log(err)
        })
        .finally(() => {
          this.chooseProduceListLoading = false
        })
    },
    //获取调价表数据
    getpriceAdjustmentList() {
      let InDex = this.shopList.findIndex((item) => {
        return item.Name.trim() == this.AdjustmentList.shop.trim()
      })
      if (InDex !== -1) {
        this.AdjustmentList.shop = this.shopList[InDex].id
      }
      this.$api.business
        .Adjustment({ model: { ...this.AdjustmentList } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.priceAdjustmentSheet = res.data
            this.pageList()
          }
        })
        .catch((err) => console.log(err))
    },
    // 删除已经选择的产品数据
    delProduct() {
      if (this.delArr.length !== 0) {
        this.$confirm('此操作将删除选中产品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        })
          .then(() => {
            for (var i = 0; i < this.delArr.length; i++) {
              this.addProduceList.splice(this.delArr[i], 1)
            }
            this.delArr = []
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            if (this.addProduceList.length === 0) {
              this.addProduceList.push({ 产品号: '' })
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      } else {
        this.$message({
          type: 'error',
          message: '请选择删除项!',
        })
      }
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
    //新增产品
    addProduct() {
      this.isEdit2 = false
      this.isEdit = true
      this.addTitle = '新增调价表'
      this.addFormParams.shop = this.shopList[0].id
      this.addFormParams.reasons = ''
      this.addFormParams.country = ''
      this.addFormParams.productlist = ''
      this.addFormParams.pricechangeid = ''
      this.addFormParams.currency = ''
      // 重置时间
      let nowDate = new Date()
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let date = nowDate.getDate()
      date = date < 10 ? '0' + date : date
      var toMonth = year + '-' + month + '-' + date
      this.$set(this.addFormParams, 'startdate', toMonth)

      this.addProduceList = []
      if (this.addProduceList.length) {
        return
      } else {
        let nullObj = {
          产品号: '',
          产品名称: '',
          备注: '',
          尺寸: '',
          尺寸单位: '',
          样式: '',
          色号: '',
          asn: '',
          调整前价格: '',
          调整后价格: '',
          颜色: '',
        }
        this.addProduceList[0] = nullObj
      }
      this.addAialogVisible = true
    },
    // 选择产品信息表checkbox状态发生变化时触发
    onChooseCheckboxChange(row) {
      if (row.checked) {
        this.chooseList = this.$refs.chooseTable.getCheckboxRecords()
        // this.getPriceParams.productnolist.push(row.row.产品号)
        this.getPriceParams.productnolist =
          this.getPriceParams.productnolist + row.row.产品号.trim() + '◆'
      } else {
        this.chooseList = this.$refs.chooseTable.getCheckboxRecords()
        this.getPriceParams.productnolist = this.getPriceParams.productnolist.replace(
          row.row.产品号.trim() + '◆',
          ''
        )
      }
    },
    onAddCheckboxChange(row) {
      if (row.checked) {
        this.delArr.push(row.$rowIndex)
        this.delArr = this.delArr.sort(function (n1, n2) {
          return n2 - n1
        })
        function unique(arr) {
          return Array.from(new Set(arr))
        }
        this.delArr = unique(this.delArr)
      } else {
        this.delArr.splice(row.$rowIndex, 1)
        this.delArr = this.delArr.sort(function (n1, n2) {
          return n2 - n1
        })
        function unique(arr) {
          return Array.from(new Set(arr))
        }
        this.delArr = unique(this.delArr)
      }
    },
    iconDelProduct(row) {
      let Index = this.addProduceList.findIndex((item) => {
        return item.产品号 == row.产品号
      })
      this.$confirm('此操作将删除该条产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          this.addProduceList.splice(Index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          if (this.addProduceList.length === 0) {
            this.addProduceList.push({ 产品号: '' })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    onAddCheckboxAllChange(row) {
      if (row.checked) {
        for (var i = 0; i < this.addProduceList.length; i++) {
          this.delArr.push(i)
        }
        this.delArr = this.delArr.sort(function (n1, n2) {
          return n2 - n1
        })
      } else {
        this.delArr = []
      }
    },
    onChooseCheckboxAllChange(row) {
      if (row.checked) {
        this.chooseList = this.$refs.chooseTable.getCheckboxRecords()
        for (var i = 0; i < row.records.length; i++) {
          this.getPriceParams.productnolist +=
            row.records[i].产品号.trim() + '◆'
        }
        console.log(this.getPriceParams.productnolist)
        this.getPriceParams.productnolist = this.getPriceParams.productnolist.slice(
          0,
          this.getPriceParams.productnolist.length - 1
        )
        console.log(this.getPriceParams.productnolist)
      } else {
        this.getPriceParams.productnolist = []
      }
    },
    // 选择产品信息
    chooseProduct() {
      let concatArr = this.chooseList.concat(this.addProduceList)
      let concatLength = concatArr.length
      function deWeight(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
          for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].产品号 == arr[j].产品号) {
              arr.splice(i, 1)
              j--
              //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
            }
          }
        }
        return arr
      }
      var newArr = deWeight(concatArr)
      if (newArr.length !== concatLength) {
        this.$message({
          message: '有重复勾选项，已删除',
          type: 'error',
        })
      }
      this.addProduceList = []
      this.addProduceList = newArr
      if (this.addProduceList[this.addProduceList.length - 1].产品号 === '') {
        this.addProduceList.splice(this.addProduceList.length - 1, 1)
      }
      this.chooseList = []
      this.getPriceParams.shopid = this.addFormParams.shop
      this.getPriceParams.country = this.addFormParams.country
      this.getPriceParams.saledate = this.addFormParams.startdate
      this.$refs.chooseTable.revertData()
      // 获取产品调整前价格
      this.$api.business
        .getaAjustPrice({ model: { ...this.getPriceParams } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.data[0].message,
              type: 'error',
            })
          } else {
            this.gotPrice = res.data
            for (var i = 0; i <= this.addProduceList.length - 1; i++) {
              for (var j = 0; j <= this.gotPrice.length - 1; j++) {
                if (
                  this.addProduceList[i].产品号.trim() ==
                  this.gotPrice[j].产品编码
                ) {
                  this.$set(
                    this.addProduceList[i],
                    '调整前价格',
                    this.gotPrice[j].调整前价格
                  )
                  this.$set(this.addProduceList[i], '调整后价格', '')
                }
              }
            }
            this.getPriceParams.productnolist = []
          }
        })
        .catch((err) => console.log(err))
      this.chooseDaialogVisible = false
    },
    // 获取国家列表
    // addProductCountry() {
    //   this.$api.publicApi
    //     .bcState()
    //     .then((res) => {
    //       if (res.statusCode < 0) {
    //         this.$message({
    //           message: res.message,
    //           type: 'error',
    //         })
    //       } else {
    //         this.countryList = res.data
    //       }
    //     })
    //     .catch((err) => console.log(err))
    // },
    // 获取计量单位列表
    // getUnitList() {
    //   this.$api.publicApi
    //     .XcUnit()
    //     .then((res) => {
    //       if (res.statusCode < 0) {
    //         this.$message({
    //           message: res.message,
    //           type: 'error',
    //         })
    //       } else {
    //         this.unitList = res
    //       }
    //     })
    //     .catch((err) => console.log(err))
    // },

    // 获取站点列表
    addProductState() {
      this.$api.publicApi
        .basShop()
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.shopList = res.data
            this.delLength = []
          }
        })
        .catch((err) => console.log(err))
    },
    cancel() {
      this.addAialogVisible = false
    },
    // 调整后价格改变触发
    ptypeChangeEvent(column) {
      this.$set(this.addProduceList, '调整后价格', '')
    },
    getNowDate() {
      // 拿到当前时间
      let nowDate = new Date()
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let date = nowDate.getDate()
      date = date < 10 ? '0' + date : date
      var toMonth = year + '-' + month + '-' + date
      // 获取一个月前的时间
      var monthDate = new Date()
      monthDate.setMonth(monthDate.getMonth() - 1)
      var startTime =
        monthDate.getFullYear() +
        '-' +
        (monthDate.getMonth() + 1) +
        '-' +
        monthDate.getDate()
      this.$set(this.addFormParams, 'startdate', toMonth)
    },
    // getaddList() {
    //   if (this.addProduceList[0]['产品号'] !== '') {
    //     return
    //   } else {
    //     let nullObj = {
    //       产品号: '',
    //       产品名称: '',
    //       备注: '',
    //       尺寸: '',
    //       尺寸单位: '',
    //       样式: '',
    //       色号: '',
    //       asn: '',
    //       调整前价格: '',
    //       调整后价格: '',
    //       颜色: '',
    //     }
    //     this.addProduceList[0] = nullObj
    //   }
    // },
    getAddList() {
      console.log(this.Str)
      this.$api.sales
        .GetModifyPriceQuery({ ProductNo: this.Str })
        .then((res) => {
          if (res.statusCode !== 200) {
            return this.$message.error(res.message)
          } else {
            res.data.forEach((item) => {
              item.产品号 = item.产品编码
            })
            this.addProduceList = res.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取货币列表
    addProductCurrency() {
      this.$api.publicApi
        .bcCurrency()
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.currencyList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
  },
  computed: {},
  beforeCreate() {},
  created() {
    this.addProductState()
    this.getNowDate()
    // this.getaddList()
    this.addProductCurrency() //获取货币列表
    this.getAddList()
    // this.getUnitList()
    // this.addProductCountry()
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  display: block;
  background: rgb(245, 248, 255);
}
.cardMargin {
  margin-top: 0px !important;
}

>>> .el-form-item {
  display: block;
}

.searchMargin {
  margin-left: 15px;
  margin-bottom: 0;
}

.searchBtn {
  width: 70px !important;
  height: 30px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 22px;
}
.marginLeft {
  margin-left: 22px;
}
.delBtn {
  width: 70px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
.exportBtn {
  width: 90px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
.del2Btn {
  width: 70px !important;
  background: #ccc !important;
  border: 1px solid #ccc !important;
}
.choose2Btn {
  background: #ccc !important;
  border: 1px solid #ccc !important;
}
.el-checkbox {
  line-height: 30px;
}
.secondBtn {
  margin-top: 11px;
  font-size: 14px;
  color: #333;
  .smBtn {
    width: 70px !important;
  }

  .iconBtn {
    width: 100px;
    height: 32px;
    background: #5473e8;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #fcfefe;
    padding: 0;
  }
}
>>> .el-dialog__footer {
  position: absolute;
  bottom: 10px;
  right: 0;
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
.el-button + .el-button {
  margin-left: 0px;
}
.el-button--primary {
  border-color: #5473e8;
}
.saveBtn1 {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #ccc;
  border: 1px solid #ccc !important;
}
.marginLeft {
  margin-left: -62px;
}
.saveAnd {
  width: 100px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #21bdca;
  border: 1px solid #21bdca !important;
}
.saveAnd1 {
  width: 100px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #ccc;
  border: 1px solid #ccc !important;
}
.sizeMarginLeft {
  margin-left: -50px;
}
>>> .redClass {
  height: 31px;
  color: red;
}
>>> .cellClass {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 31px;
}
.chooseEnter {
  width: 70px;
  height: 32px;
  background: #5473e8;
  border-radius: 2px;
  line-height: 32px;
  padding: 0;
}
.Bottom-Border input {
  border: none !important;
  border-radius: 0px;
  border-bottom: 1px solid #bbb !important;
}
.None-Border input {
  border: none !important;
  outline: none !important;
}
.unifySize {
  width: 100%;
  height: 30px;
}
.None-Border {
  height: 100%;
}
>>> .unifySize input {
  height: 30px;
}
>>> .unifySizeDate input {
  width: 150px;
  height: 30px;
}
>>> .unifySizeDate .el-input__suffix {
  right: -64px;
}
.unifySize .el-input {
  width: 100%;
}
>>> .el-input__inner input {
  width: 150px !important;
}
>>> .None-Border .el-input-group__prepend {
  border: none;
  border-radius: 2px;
}
>>> .el-input-group__append {
  width: 30px;
  height: 100%;
}
>>> .None-Border .el-input__icon {
  line-height: normal;
}
>>> .None-Border .el-input__inner {
  height: 28px;
}
>>> .inputSize input {
  width: 100px;
  border-right: none !important;
  outline: none !important;
}
>>> .inputSize .el-input__inner {
  width: 100px;
  height: 100%;
}
>>> .inputSize .el-input-group {
  height: 100%;
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
.clearBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #908fa0;
  border: 1px solid #908fa0 !important;
}
.pagination {
  float: right;
  margin-top: 20px;
}
.unifySize .el-input__icon {
  line-height: normal;
}
.iconP {
  font-size: 22px;
  color: #5473e8;
  float: right;
  transform: rotate(90deg);
}
.Mask {
  display: block;
  z-index: 999999;
  width: 100%;
  height: 100%;
  background: #808080;
}
.iconC {
  font-size: 22px;
  color: #5473e8;
}
>>> .addHeight {
  height: 550px;
}
>>> .blockDate .el-input__inner {
  width: 140px;
}
>>> .jy_wrapper .el-dialog__body {
  border-bottom: none !important;
}
>>> .el-dialog .el-dialog__header {
  background: #c5c5c5;
  height: 40px;
}

>>> .IconClose .el-input__prefix {
  display: none;
}
.NullTip {
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 400px;
  transform: translate(-50%, 50%);
}
.blockSpan {
  display: flex;
  height: 32px;
  margin-top: 5px;
  justify-content: start;
  border-radius: 4px;
  border: 1px solid #c7c6de;
  >>> .listDate .el-input .el-input__inner {
    height: 30px !important;
    padding: 0 0 0 5px;
    width: 100% !important;
    border-radius: 4px 0 0 4px;
  }
  >>> .listDate .el-input__inner::placeholder {
    color: #333;
  }
  >>> .listDate .el-input__icon {
    line-height: normal;
  }
  >>> .listDate .el-icon-arrow-up:before {
    color: #333;
  }
  >>> .listDate .el-input__inner {
    background: #f3f3f3;
  }
  >>> .blockDate {
    display: flex;
    justify-content: space-between;
  }
  >>> .blockDate .el-input__inner {
    height: 30px;
    width: 140px;
    border: none;
  }
  >>> .blockDate .el-input__inner input {
    width: 130px !important;
  }
  >>> .blockDate .el-input__icon {
    height: 30px;
  }
  >>> .blockDate .el-range-separator {
    height: 30px;
    padding: 0;
  }
}
>>> .addheight {
  height: 550px;
}
.el-card {
  width: 100%;
  padding: 0px;
  margin-top: 11px;
  >>> .el-card__body {
    padding: 10px;
    >>> .mixInput {
      width: 310px;
      display: flex;
      height: 30px;
      border: 1px solid #c7c6de;
      border-radius: 2px;
      >>> .el-input-group__append {
        border: none;
        width: 30px;
        padding: 0;
      }
    }
  }
}
>>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 50%;
  .el-input__icon {
    line-height: 30px;
  }
}
>>> .chooseHeight {
  height: 650px;
}
>>> .el-select .el-input__inner {
  cursor: pointer;
  padding-right: 35px;
  height: 30px;
}
>>> .hearderClass {
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  height: 34px;
  color: #333;
  background-color: #d5deff;
}
>>> .cellClass {
  height: 31px;
}
>>> .cellChooseClass {
  height: 28px;
}
>>> .vxe-header--column .vxe-cell--edit-icon,
.vxe-header--column .vxe-cell-help-icon {
  display: none;
}
</style>
