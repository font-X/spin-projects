<template>
  <el-container id="mainCard">
    <el-row style="width: 100%">
      <el-col id="queryRow">
        <el-card class="cardMargin">
          <el-row>
            <el-col>
              <el-form
                ref="mainForm"
                :model="AdjustmentList"
                style="font-size：14px"
                label-width="84px"
              >
                <el-row class="mainForm">
                  <el-col :md="12" :lg="7" :xl="5">
                    <!-- 查询条件区域 -->
                    <span class="blockSpan">
                      <el-form-item class="listDate" label="制单日期">
                      </el-form-item>
                      <div class="blockDate">
                        <el-date-picker
                          v-model="AdjustmentList.SaleDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                        ></el-date-picker>
                        <el-date-picker
                          class="IconClose"
                          v-model="AdjustmentList.EndDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                        ></el-date-picker>
                      </div>
                    </span>
                  </el-col>
                  <el-col :md="12" :lg="4" :xl="3">
                    <el-form-item
                      label-width="50px"
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="站点："
                    >
                      <el-select
                        v-model="AdjustmentList.Shop"
                        class="unifySize marginLeft"
                        placeholder="站点"
                        @change="linkCountry"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in ShopList"
                          :label="item.Name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="4" :xl="3">
                    <el-form-item label-width="60px" label="国家：">
                      <el-select
                        v-model="AdjustmentList.Country"
                        class="unifySize"
                        clearable
                      >
                        <!-- <el-option value=""></el-option> -->
                        <el-option
                          :key="index"
                          v-for="(item, index) in countryList"
                          :label="item.countryname"
                          :value="item.countryid"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :lg="10" :xl="7">
                    <el-form-item label-width="20px">
                      <el-radio-group
                        v-model="AdjustmentList.ViewItem"
                        class="radio"
                        @change="changeRadio"
                      >
                        <el-radio label="1">销售数据</el-radio>
                        <el-radio label="2">库存数据</el-radio>
                        <el-radio label="3">库存预留数据</el-radio>
                        <el-radio label="4">退货数据</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="3" :lg="2" :xl="1">
                    <el-form-item
                      label-width="50px"
                      class="searchMargin"
                      label="汇总："
                    >
                      <el-checkbox
                        value="1"
                        true-label="1"
                        false-label="0"
                        v-model="AdjustmentList.isSum"
                      ></el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-button
                    type="danger"
                    class="searchBtn searchMargin"
                    size="small"
                    :loading="isLoadingBtn"
                    icon="el-icon-search"
                    @click="MainTableSearch(true)"
                    >查询</el-button
                  >
                </el-row>
              </el-form>
            </el-col>
            <!-- 按钮区域 -->
            <el-col class="secondBtn">
              <el-button
                type="primary"
                @click="AddDataExport('sales')"
                class="smBtn iconBtn el-icon-plus"
                >销售数据导入</el-button
              >
              <el-button
                type="primary"
                @click="AddDataExport('stock')"
                class="smBtn2 iconBtn el-icon-plus"
                >库存数据导入</el-button
              >
              <el-button
                type="primary"
                @click="AddDataExport('resStock')"
                class="smBtn3 iconBtn el-icon-plus"
                >库存预留数据导入</el-button
              >
              <el-button
                type="primary"
                @click="AddDataExport('returnGoods')"
                class="smBtn iconBtn el-icon-plus"
                >退货数据导入</el-button
              >
              <el-button
                type="primary"
                @click="Export"
                class="smBtn3 iconBtn iconfont kt-icon-daochu"
                >导出Excel</el-button
              >
              <el-button
                type="primary"
                class="delBtn iconBtn el-icon-delete"
                @click="delData"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 主表 -->
      <el-col>
        <el-card style="margin-top：11px">
          <vxe-grid
            border
            resizable
            stripe
            ref="LabelList"
            :sync-resize="Isupdate"
            class="mytable-scrollbar"
            width="auto"
            show-header-overflow
            show-overflow="title"
            :header-row-class-name="hearderClass"
            :row-class-name="cellClass"
            :height="gridHeight"
            :loading="loading"
            :columns="SalesDataSumColumns"
            highlight-current-row
            @checkbox-change="onAdjustmentCheckboxChange"
            @checkbox-all="onAdjustmentCheckboxAllChange"
            :config="{ render: 'scroll' }"
            :align="'center'"
            :checkbox-config="{ highlight: true }"
            :data="paging.data"
          >
          </vxe-grid>
          <!-- 分页 -->
          <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paging.page"
            background
            :page-sizes="[100, 200, 500, 1000]"
            :page-size="paging.limit"
            layout="prev,pager,next,total,sizes,jumper"
            :total="total"
          >
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>

    <!-- 选择导入的数据 -->
    <el-dialog
      v-dialogDrag
      :title="
        modelSign === 'sales'
          ? '导入销售数据'
          : modelSign === 'stock'
          ? '导入库存数据'
          : modelSign === 'resStock'
          ? '导入预留库存数据'
          : '导入退货数据'
      "
      :close-on-click-modal="false"
      append-to-body
      :visible.sync="addAialogVisible"
      :before-close="handleClose"
      width="950px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="addForm"
        :model="addFormParams"
        :rules="addRules"
        style="font-size：14px"
        label-width="84px"
      >
        <el-row>
          <el-col style="display: flex; justify-content: flex-start">
            <el-form-item label-width="60px" prop="Shop" label="站点：">
              <el-select
                v-model="addFormParams.Shop"
                @change="dialogLinkCountry"
                class="unifySize"
              >
              <el-option value=""></el-option>
                <el-option
                  :key="index"
                  v-for="(item, index) in ShopList"
                  :label="item.Name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="50px" label="国家：" prop="Country">
              <el-select v-model="addFormParams.Country" class="unifySize">
                <el-option
                  :key="index"
                  v-for="(item, index) in dialogCountryList"
                  :label="item.countryname"
                  :value="item.countryid"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="modelSign != 'returnGoods'"
              label-width="90px"
              prop="SaleDate"
              :label="modelSign === 'sales' ? '销售日期：' : '库存日期·'"
            >
              <el-date-picker
                class="unifySize"
                v-model="addFormParams.SaleDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="编码类型：" prop="CodeType">
              <el-select v-model="addFormParams.CodeType" class="unifySize">
                <el-option
                  :key="index"
                  v-for="(item, index) in CodeType"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-upload
              drag
              :limit="limitNum"
              :auto-upload="false"
              accept=".csv,.xls,.xlsx"
              :action="UploadUrl()"
              :before-upload="beforeUploadFile"
              :on-change="fileChange"
              :on-exceed="exceedFile"
              :on-remove="removeFile"
              :on-success="handleSuccess"
              :on-error="handleError"
              :file-list="fileList"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传csv,xls和xlsx文件，且不超过10M
              </div>
            </el-upload>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              type="primary"
              class="iconBtn el-icon-download saveBtn2"
              @click="DownLoad"
              >模板下载</el-button
            >
            <el-button
              type="primary"
              class="iconfont kt-icon-baocun saveBtn"
              :loading="isLoadingBtn1"
              @click="uploadFile"
              >导入</el-button
            >
            <el-button class="clearBtn" @click="cancel">取消</el-button>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import JyDialog from '@/components/JyDialog'
import { number } from 'echarts'
export default {
  name: 'amazon',
  components: { JyDialog },
  data() {
    return {
      pageIndex: 1,
      priceAdjustmentSheet: [], //表格数据源
      // addProduceList: [{ 产品号: '' }], //新增产品表
      chooseProduceList: [], //产品信息表
      chooseList: [], // 勾选产品信息后的数据
      // 删除的参数对象
      delParams: {
        UserCode: '',
        Shop: '',
        SaleDate: '',
        ViewItem: '',
        Country: '',
      },
      // 导入的验证规则对象
      addRules: {
        Shop: [{ required: true, message: '请选择站点', trigger: 'change' }],
        Country: [{ required: false, trigger: 'blur' }],
        CodeType: [{ required: false, trigger: 'blur' }],
        SaleDate: [{ required: true, message: '请选择日期', trigger: 'blur' }],
      },
      gridHeight: 650,
      loading: false,
      delLength: [],
      //   销售数据+汇总
      SalesDataSumColumns1: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '80', title: '站点', field: '站点' },
        { width: '80', title: '国家', field: '国家' },
        { title: '销售日期', field: '销售日期' },
        { title: '买家访问次数', field: '买家访问次数' },
        { title: '页面浏览次数', field: '页面浏览次数' },
        { title: '已订购商品数量', field: '已订购商品数量' },
        { title: '已订购商品销售额', field: '已订购商品销售额' },
        { title: '已订购商品的销售额B2B', field: '已订购商品的销售额B2B' },
        { title: '订单商品种类数', field: '订单商品种类数' },
      ],
      SalesDataSumColumns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '80', title: '站点', field: '站点' },
        { width: '80', title: '国家', field: '国家' },
        { width: '150', title: '销售日期', field: '销售日期' },
        { width: '180', title: '买家访问次数', field: '买家访问次数' },
        { width: '180', title: '页面浏览次数', field: '页面浏览次数' },
        { width: '160', title: '已订购商品数量', field: '已订购商品数量' },
        { width: '160', title: '已订购商品销售额', field: '已订购商品销售额' },
        { title: '已订购商品的销售额B2B', field: '已订购商品的销售额B2B' },
        { width: '130', title: '订单商品种类数', field: '订单商品种类数' },
      ],
      //  库存数据+汇总
      InventoryDataSumColumns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '80', title: '站点', field: '站点' },
        { width: '80', title: '国家', field: '国家' },
        { width: '150', title: '库存时间', field: '库存时间' },
        {
          width: '200',
          title: 'afn-warehouse-quantity',
          field: 'afn-warehouse-quantity',
        },
        {
          width: '200',
          title: 'afn-fulfillable-quantity',
          field: 'afn-fulfillable-quantity',
        },
        {
          width: '260',
          title: 'afn-total-quantity',
          field: 'afn-total-quantity',
        },
        {
          width: '260',
          title: 'afn-inbound-working-quantity',
          field: 'afn-inbound-working-quantity',
        },
        {
          width: '260',
          title: 'afn-inbound-shipped-quantity',
          field: 'afn-inbound-shipped-quantity',
        },
        {
          title: 'afn-inbound-receiving-quantity',
          field: 'afn-inbound-receiving-quantity',
        },
      ],
      //   库存预留数据 + 汇总
      ReservedInventoryDataSumColumns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '80', title: '站点', field: '站点' },
        { width: '80', title: '国家', field: '国家' },
        { title: '库存时间', field: '库存时间' },
        { title: '预留数量', field: '预留数量' },
      ],
      // 销售数据
      SalesDataColumns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '80', title: '站点', field: '站点' },
        { width: '80', title: '国家', field: '国家' },
        { width: '100', title: '销售日期', field: '销售日期' },
        { width: '250', title: 'SKU', field: 'SKU' },
        { width: '110', title: '买家访问次数', field: '买家访问次数' },
        {
          width: '150',
          title: '买家访问次数百分比',
          field: '买家访问次数百分比',
        },
        { width: '110', title: '页面浏览次数', field: '页面浏览次数' },
        {
          width: '150',
          title: '页面浏览次数百分比',
          field: '页面浏览次数百分比',
        },
        { width: '120', title: '购买按钮赢得率', field: '购买按钮赢得率' },
        { width: '120', title: '已订购商品数量', field: '已订购商品数量' },
        { width: '110', title: '订购数量B2B', field: '订购数量B2B' },
        {
          width: '150',
          title: '订单商品数量转化率',
          field: '订单商品数量转化率',
        },
        { width: '120', title: '商品转化率B2B', field: '商品转化率B2B' },
        { width: '140', title: '已订购商品销售额', field: '已订购商品销售额' },
        {
          width: '180',
          title: '已订购商品的销售额B2B',
          field: '已订购商品的销售额B2B',
        },
        { width: '120', title: '订单商品种类数', field: '订单商品种类数' },
        { width: '140', title: '订单商品总数B2B', field: '订单商品总数B2B' },
        { width: '80', title: '制单人', field: '制单人' },
        { width: '110', title: '制单日期', field: '制单日期' },
      ],
      // 库存数据
      InventoryDataColumns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '80', title: '站点', field: '站点' },
        { width: '80', title: '国家', field: '国家' },
        { width: '100', title: '库存时间', field: '库存时间' },
        { width: '200', title: '产品编号', field: '产品编号' },
        { width: '150', title: 'fnsku', field: 'fnsku' },
        { width: '150', title: 'asin', field: 'asin' },
        { width: '350', title: '产品名称', field: '产品名称' },
        { width: '60', title: '条件', field: '条件' },
        { width: '60', title: '价格', field: '价格' },
        {
          width: '180',
          title: 'mfn-listing-exists',
          field: 'mfn-listing-exists',
        },
        {
          width: '210',
          title: 'mfn-fulfillable-quantity',
          field: 'mfn-fulfillable-quantity',
        },
        {
          width: '180',
          title: 'afn-listing-exists',
          field: 'afn-listing-exists',
        },
        {
          width: '210',
          title: 'afn-warehouse-quantity',
          field: 'afn-warehouse-quantity',
        },
        {
          width: '210',
          title: 'afn-fulfillable-quantity',
          field: 'afn-fulfillable-quantity',
        },
        {
          width: '210',
          title: 'afn-unsellable-quantity',
          field: 'afn-unsellable-quantity',
        },
        {
          width: '180',
          title: 'afn-total-quantity',
          field: 'afn-total-quantity',
        },
        { width: '160', title: 'per-unit-volume', field: 'per-unit-volume' },
        {
          width: '240',
          title: 'afn-inbound-working-quantity',
          field: 'afn-inbound-working-quantity',
        },
        {
          width: '240',
          title: 'afn-inbound-shipped-quantity',
          field: 'afn-inbound-shipped-quantity',
        },
        {
          width: '240',
          title: 'afn-inbound-receiving-quantity',
          field: 'afn-inbound-receiving-quantity',
        },
        { width: '80', title: '制单人', field: '制单人' },
        { width: '110', title: '制单日期', field: '制单日期' },
      ],
      // 库存预留数据
      ReservedInventoryDataColumns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '80', title: '站点', field: '站点' },
        { width: '80', title: '国家', field: '国家' },
        { width: '100', title: '库存时间', field: '库存时间' },
        { width: '180', title: '产品编号', field: '产品编号' },
        { width: '140', title: '配送网络SKU', field: '配送网络SKU' },
        { width: '140', title: 'ASIN码', field: 'ASIN码' },
        { title: '产品名称', field: '产品名称' },
        { width: '90', title: '预留数量', field: '预留数量' },
        { width: '160', title: '预留单号', field: '预留单号' },
        { width: '180', title: '预留FCTransfer', field: '预留FCTransfer' },
        { width: '160', title: '预留FCProcessing', field: '预留FCProcessing' },
        { width: '80', title: '制单人', field: '制单人' },
        { width: '110', title: '制单日期', field: '制单日期' },
      ],
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      cellChooseClass: 'cellChooseClass',
      addAialogVisible: false,
      // isEdit: true, //规定是否可以修改
      AdjustmentList: {
        UserCode: '',
        SaleDate: '',
        EndDate: '',
        Shop: '',
        Country: '',
        ViewItem: '1', //单选默认1销售数据
        isSum: '1', //默认汇总勾选
      },
      info: {
        page: 1,
        pageSize: 100,
      },
      total: null,
      Isupdate: false,
      // 导入的请求参数对象
      addFormParams: {
        // 保存的参数
        Shop: '',
        CodeType: 'GB2312',
        SaleDate: '',
        Country: '', //国家
      },
      // 编码格式
      CodeType: [
        // {label:'默认',value:'GB2312'},
        { label: 'UTF8', value: 'UTF8' },
        { label: 'GB2312', value: 'GB2312' },
      ],
      dialogCountryList: [],
      countryList: [],
      ShopList: [],
      isLoadingBtn: false,
      // gotPrice: [],
      paging: { data: [], limit: 100, page: 1 },
      // choosePaging: { list: [], data: [], limit: 100, total: null, page: 1 },
      delArr: [],
      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [], // excel文件列表
      modelSign: '', //判断弹框
      isLoadingBtn1: false, //导入loading效果
      flag: '', // 判断销售或库存作为站点请求参数
      // url:'http://47.99.32.10:8559/upload/ImportTemp/销售数据上传模板.csv'
      url: 'http://47.99.32.10:8559/upload/ImportTemp/',
    }
  },
  watch: {
    'addFormParams.Shop': {
      handler(val) {
        if (val) {
          return this.dialogLinkCountry()
        }
      },
      deep: true,
    },
    'AdjustmentList.Shop': {
      handler(val) {
        if (val) {
          return this.linkCountry()
        }
      },
      deep: true,
    },
  },
  methods: {
    // 导出Excel
    Export() {
      this.$refs.LabelList.exportData({ type: 'csv' })
    },
    columns() {
      this.$nextTick(() => {
        const { ViewItem, isSum } = this.AdjustmentList
        if (ViewItem === '1' && isSum === '0') {
          return (this.SalesDataSumColumns = this.SalesDataColumns)
        } else if (ViewItem === '2' && isSum === '1') {
          return (this.SalesDataSumColumns = this.InventoryDataSumColumns)
        } else if (ViewItem === '2' && isSum === '0') {
          return (this.SalesDataSumColumns = this.InventoryDataColumns)
        } else if (ViewItem === '3' && isSum === '1') {
          return (this.SalesDataSumColumns =
            this.ReservedInventoryDataSumColumns)
        } else if (ViewItem === '3' && isSum === '0') {
          return (this.SalesDataSumColumns = this.ReservedInventoryDataColumns)
        } else if (ViewItem === '1' && isSum === '1') {
          return (this.SalesDataSumColumns = this.SalesDataSumColumns1)
        }
      })
    },
    //   查询事件
    MainTableSearch(isUnclear) {
      this.loading = true
      this.isLoadingBtn = true
      if (this.AdjustmentList.SaleDate === null) {
        this.AdjustmentList.SaleDate = ''
      }
      if (this.AdjustmentList.EndDate === null) {
        this.AdjustmentList.EndDate = ''
      }
      if (isUnclear) {
        this.priceAdjustmentSheet = []
        this.paging.page = []
        this.paging = { data: [], limit: 100, page: 1 }
        this.info = { page: 1, pageSize: 100 }
      }
      this.$api.amazonImport
        .getAmazonList({ model: this.AdjustmentList, info: this.info })
        .then((res) => {
          console.log(res)
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
            this.isLoadingBtn = false
            this.loading = false
            // this.paging.page = 1
            this.columns()
          } else {
            this.priceAdjustmentSheet = this.priceAdjustmentSheet.concat(
              res.data.data
            )
            this.total = res.data.total
            this.columns()
            this.pageList()
          }
        })
        .catch((err) => {
          console.log(err)
          // this.$message.error('请求超时,请重试')
          // this.$message.error(err)
        })
        .finally(() => {
          this.isLoadingBtn = false
          this.loading = false
        })
    },
    // 删除按钮事件
    delData() {
      if (this.delLength.length === 0)
        return this.$message.error('选中表格中的复选框才可以删除')
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      })
        .then(() => {
          this.delParams.ViewItem = this.AdjustmentList.ViewItem
          this.delParams.Country = this.AdjustmentList.Country
          if (this.AdjustmentList.ViewItem === '1') {
            for (var i = 0; i < this.delLength.length; i++) {
              this.delParams.SaleDate += this.delLength[i]['销售日期'] + '◆'
            }
          } else {
            for (var i = 0; i < this.delLength.length; i++) {
              this.delParams.SaleDate += this.delLength[i]['库存时间'] + '◆'
            }
          }
          this.$api.amazonImport
            .delAmazonData({ model: this.delParams })
            .then((res) => {
              if (res.statusCode !== 200) return this.$message(res.message)
              this.$message({ type: 'success', message: '删除成功!' })
              this.MainTableSearch(true)
              this.delParams.SaleDate = ''
              this.delLength = []
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 主表复选框状态改变触发
    onAdjustmentCheckboxChange(row) {
      if (row.checked) {
        this.delLength = this.$refs.LabelList.getCheckboxRecords()
        // console.log(this.delLength)
        this.delLength[0]['站点']
        const index = this.ShopList.findIndex((item) => {
          return item.Name === this.delLength[0]['站点']
        })
        this.delParams.Shop = this.ShopList[index].id
      } else {
        this.delLength = this.$refs.LabelList.getCheckboxRecords()
      }
    },
    onAdjustmentCheckboxAllChange(row) {
      if (row.checked) {
        this.delLength = this.delLength.concat(row.records)
        const index = this.ShopList.findIndex((item) => {
          return item.Name === this.delLength[0]['站点']
        })
        this.delParams.Shop = this.ShopList[index].id
      } else {
        this.delLength = []
      }
    },
    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.paging.data = this.priceAdjustmentSheet
      this.getList()
    },
    //处理数据
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.paging.data = this.paging.data.filter(
        (item, index) =>
          index < this.paging.page * this.paging.limit &&
          index >= this.paging.limit * (this.paging.page - 1)
      )
    },
    // 当每页数量改变
    handleSizeChange(val) {
      this.paging.limit = val
      this.paging.page = 1
      this.delLength = []
      // this.paging.page = 1;
      this.pageList()
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.paging.page = val
      this.delLength = []
      this.pageList()
      if (
        Math.ceil(Number((this.paging.limit * this.paging.page) / 5000)) >
          this.pageIndex &&
        Math.ceil(Number((this.paging.limit * this.paging.page) / 5000)) <
          this.pageIndex + 2
      ) {
        this.pageIndex++
        this.info.page = Math.ceil(
          Number((this.paging.limit * this.paging.page) / 5000)
        )
        this.MainTableSearch(false)
      } else if (
        Math.ceil(Number((this.paging.limit * this.paging.page) / 5000)) >
        this.pageIndex + 1
      ) {
        this.$message.warning('当前数据过大，已优化为最佳查询')
        this.pageIndex++
        this.info.page++
        this.paging.page = this.info.page * (5000 / this.paging.limit)
        this.MainTableSearch(false)
      }
    },
    // 导入数据
    AddDataExport(sign) {
      if (sign === 'sales') {
        this.flag = '1'
      } else {
        this.flag = '2'
      }
      this.dialogLinkCountry()
      this.getNowDateExport()
      this.modelSign = sign
      // this.addFormParams.currency = ''
      this.addAialogVisible = true
    },
    // 站点改变返回国家
    linkCountry() {
      this.countryList = []
      this.AdjustmentList.Country = ''
      if (this.AdjustmentList.ViewItem === '1') {
        this.$api.publicApi
          .LinkShop({ shopid: this.AdjustmentList.Shop, flag: '1' })
          .then((res) => {
            if (res.statusCode !== 200) return this.$message.error(res.message)
            this.countryList = res.data
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$api.publicApi
          .LinkShop({ shopid: this.AdjustmentList.Shop, flag: '2' })
          .then((res) => {
            if (res.statusCode !== 200) return this.$message.error(res.message)
            this.countryList = res.data
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    dialogLinkCountry() {
      this.dialogCountryList = []
      this.addFormParams.Country = ''
      this.$api.publicApi
        .LinkShop({ shopid: this.addFormParams.Shop, flag: this.flag })
        .then((res) => {
          // console.log(res);
          if (res.statusCode !== 200) return this.$message.error(res.message)
          this.dialogCountryList = res.data
          this.addFormParams.Country = this.dialogCountryList[0].countryid
          this.$set(
            this.addFormParams,
            'Country',
            this.dialogCountryList[0].countryid
          )
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 改变单选按钮
    changeRadio() {
      this.linkCountry()
    },
    // // 获取国家列表
    // AddDataExportCountry() {
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
    // 获取站点列表
    AddDataExportState() {
      this.$api.publicApi
        .basShop()
        .then((res) => {
          if (res.statusCode < 0) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.ShopList = res.data
            // this.$set(this.addFormParams, 'Shop', this.ShopList[0].id)
            this.$set(this.AdjustmentList, 'Shop', this.ShopList[0].id)
            // this.getpriceAdjustmentList()
            this.delLength = []
            this.AdjustmentList.Shop = this.ShopList[0].id
            this.MainTableSearch(true)
          }
        })
        .catch((err) => console.log(err))
    },
    // 第一层弹出层取消
    handleClose() {
      this.addFormParams.country = ''
      this.fileList = []
      this.flag = ''
      this.$refs.addForm.resetFields()
      this.addAialogVisible = false
    },
    cancel() {
      this.$refs.addForm.resetFields()
      this.addFormParams.country = ''
      this.addAialogVisible = false
      this.fileList = []
    },
    getNowDate() {
      // 拿到当前时间
      let nowDate = new Date()
      // console.log(nowDate)
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let date = nowDate.getDate()
      date = date < 10 ? '0' + date : date
      var toMonth = year + '-' + month + '-' + date
      // 获取一个月前的时间
      var monthDate = new Date()
      monthDate.setMonth(monthDate.getMonth())
      var StartMonth = monthDate.getMonth()
      StartMonth = StartMonth < 10 ? '0' + StartMonth : StartMonth
      var StartDate = monthDate.getDate()
      StartDate = StartDate < 10 ? '0' + StartDate : StartDate
      var startTime =
        monthDate.getFullYear() + '-' + StartMonth + '-' + StartDate
      // this.$set(this.addFormParams, 'SaleDate', toMonth)
      this.$set(this.AdjustmentList, 'EndDate', toMonth)
      this.$set(this.AdjustmentList, 'SaleDate', startTime)
      return Promise.resolve()
    },
    getNowDateExport() {
      // 拿到当前时间
      let nowDate = new Date()
      // console.log(nowDate)
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let date = nowDate.getDate()
      date = date < 10 ? '0' + date : date
      var toMonth = year + '-' + month + '-' + date
      this.$set(this.addFormParams, 'SaleDate', toMonth)
    },
    exceedFile(files, fileList) {
      this.$message.warning(`只能选择 ${this.limitNum} 个文件`)
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log(file.raw)
      this.fileList.push(file.raw)
      // console.log(this.fileList);
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      // console.log('before upload');
      // console.log(file);
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      let size = file.size / 1024 / 1024
      if (extension !== 'csv' || extension !== 'xls' || extension !== 'xlsx') {
        this.$message.warning('只能上传后缀是.csv或.xls或.xlsx的文件')
      }
      if (size > 10) {
        this.$message.warning('文件大小不得超过10M')
      }
    },
    //点击移除此文件的事件
    removeFile() {
      this.fileList = [] //清空数据
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$message.success('文件上传成功')
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$message.error('文件上传失败')
    },
    UploadUrl: function () {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return ''
    },
    uploadFile() {
      // 销售数据导入
      this.$refs.addForm.validate((valid) => {
        if (!valid) return
        if (this.modelSign === 'sales') {
          if (this.fileList.length === 0) {
            this.$message.warning('请上传销售数据文件')
          } else {
            this.isLoadingBtn1 = true
            let form = new FormData()
            form.append('file', this.fileList[0])
            // console.log(this.fileList);
            form.append('Shop', this.addFormParams.Shop)
            form.append('Country', this.addFormParams.Country)
            form.append('SaleDate', this.addFormParams.SaleDate)
            form.append('CodeType', this.addFormParams.CodeType)
            // const url = `/api/AmazonDataImport/ImportSalesReport?Shop= ${this.addFormParams.Shop}&Country=${this.addFormParams.Country}&SaleDate=${this.addFormParams.SaleDate}&CodeType=${this.addFormParams.CodeType}`
            this.$axios({
              method: 'post',
              url: '/api/AmazonDataImport/ImportSalesReport',
              headers: {
                'Content-type': 'multipart/form-data;',
              },
              data: form,
            })
              .then(
                (res) => {
                  // console.log(res);
                  if (res.data.statusCode !== 200)
                    return this.$message.error(res.data.message)
                  this.$message.success('导入销售数据成功')
                  // this.isLoadingBtn1 = false
                  this.fileList = []
                  this.$refs.addForm.resetFields()
                  this.addFormParams.country = ''
                  this.addAialogVisible = false
                  this.MainTableSearch(true)
                },
                (err) => {
                  console.log(err)
                  this.fileList = []
                }
              )
              .finally(() => {
                this.isLoadingBtn1 = false
              })
          }
        } else if (this.modelSign === 'stock') {
          if (this.fileList.length === 0) {
            this.$message.warning('请上传库存数据文件')
          } else {
            this.isLoadingBtn1 = true
            let form = new FormData()
            form.append('file', this.fileList[0])
            form.append('Shop', this.addFormParams.Shop)
            form.append('Country', this.addFormParams.Country)
            form.append('SaleDate', this.addFormParams.SaleDate)
            form.append('CodeType', this.addFormParams.CodeType)
            this.$axios({
              method: 'post',
              url: '/api/AmazonDataImport/ImportDepot',
              headers: {
                'Content-type': 'multipart/form-data',
              },
              data: form,
            })
              .then(
                (res) => {
                  // console.log(res);
                  if (res.data.statusCode !== 200)
                    return this.$message.error(res.data.message)
                  this.$message.success('导入库存数据成功')
                  this.$refs.addForm.resetFields()
                  this.addFormParams.country = ''
                  this.addAialogVisible = false
                  // this.isLoadingBtn1 = false
                  this.MainTableSearch(true)
                  this.fileList = []
                },
                (err) => {
                  console.log(err)
                  this.fileList = []
                }
              )
              .finally(() => {
                this.isLoadingBtn1 = false
              })
          }
        } else if(this.modelSign === 'resStock'){
          if (this.fileList.length === 0) {
            this.$message.warning('请上传预留库存数据文件')
          } else {
            this.isLoadingBtn1 = true
            let form = new FormData()
            form.append('file', this.fileList[0])
            form.append('Shop', this.addFormParams.Shop)
            form.append('Country', this.addFormParams.Country)
            form.append('SaleDate', this.addFormParams.SaleDate)
            form.append('CodeType', this.addFormParams.CodeType)
            this.$axios({
              method: 'post',
              url: '/api/AmazonDataImport/ImportDepotPrev',
              headers: {
                'Content-type': 'multipart/form-data',
              },
              data: form,
            })
              .then(
                (res) => {
                  // console.log(res);
                  if (res.data.statusCode !== 200)
                    return this.$message.error(res.data.message)
                  this.$message.success('导入预留库存数据成功')
                  this.$refs.addForm.resetFields()
                  this.addFormParams.country = ''
                  this.addAialogVisible = false
                  this.MainTableSearch(true)
                  this.fileList = []
                },
                (err) => {
                  // console.log(err)
                  this.$refs.addForm.resetFields()
                  this.addFormParams.country = ''
                  this.addAialogVisible = false
                  this.fileList = []
                }
              )
              .finally(() => {
                this.isLoadingBtn1 = false
              })
          }
        }else {
          if (this.fileList.length === 0) {
            this.$message.warning('请上传退货数据文件')
          } else {
            this.isLoadingBtn1 = true
            let form = new FormData()
            form.append('file', this.fileList[0])
            form.append('Shop', this.addFormParams.Shop)
            form.append('Country', this.addFormParams.Country)
            // form.append('SaleDate', this.addFormParams.SaleDate)
            form.append('CodeType', this.addFormParams.CodeType)
            this.$axios({
              method: 'post',
              url: '/api/AmazonDataImport/ReturnImport',
              headers: {
                'Content-type': 'multipart/form-data',
              },
              data: form,
            })
              .then(
                (res) => {
                  console.log(res);
                  if (res.data.statusCode !== 200)
                    return this.$message.error(res.data.message)
                  this.$message.success('导入退货数据成功')
                  this.$refs.addForm.resetFields()
                  this.addFormParams.country = ''
                  this.addAialogVisible = false
                  this.MainTableSearch(true)
                  this.fileList = []
                },
                (err) => {
                  console.log(err)
                  this.$refs.addForm.resetFields()
                  this.addFormParams.country = ''
                  this.fileList = []
                }
              )
              .finally(() => {
                this.isLoadingBtn1 = false
              })
          }
        }
      })
    },
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        console.log(card, queryRow)
        this.gridHeight = card - queryRow - 80
        console.log(this.gridHeight)
      })
    },
    // 下载模板
    DownLoad() {
      if (this.modelSign == 'sales') {
        window.open(this.url + '销售数据上传模板.csv')
      } else if (this.modelSign == 'stock') {
        window.open(this.url + '亚马逊库存上传模板.csv')
      } else if (this.modelSign == 'resStock'){
        window.open(this.url + '预留库存上传模板.csv')
      }else {
        window.open(this.url + '退货数据上传模板.csv')
      }
    },
    fristRequest(){
      let array =[this.getNowDate(),this.AddDataExportState()] 
      Promise.all(array).then((res)=>{
        console.log(res);
        this.MainTableSearch(true)
      })
    }
  },
  computed: {},
  beforeCreate() {},
  created() {
    this.fristRequest()
    // this.getNowDate()
    // this.AddDataExportState()
    this.resize()
    // this.AddDataExportCountry()
    // this.$nextTick(() => {
    //   this.MainTableSearch(true)
    // })
  },
  mounted() {
    var _this = this
    window.onresize = function () {
      // 定义窗口大小变更通知事件
      _this.resize()
    }
  },
  beforeDestroy() {},
}
</script>
<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  padding: 3px 10px 0 10px;
  display: block;
  background: rgb(245, 248, 255);
}
.cardMargin {
  margin-top: 0px !important;
}

.mainForm .el-form-item__content {
  line-height: normal;
}
.mainForm .el-form-item__label {
  line-height: 30px;
}
.mainForm .marginLeft {
  margin-left: 0px;
}
.searchMargin {
  margin-left: 15px;
  margin-bottom: 0;
}

.searchBtn {
  margin-top: 5px;
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
// 删除弹框
// >>>.el-message-box__btns {
//   position: relative;
//   >>>.el-button--primary {
//     position: absolute;
//     top: 0;
//     right: 40px;
//   }
// }
// .del2Btn {
//   width: 70px !important;
//   background: #ccc !important;
//   border: 1px solid #ccc !important;
// }
// .choose2Btn {
//   background: #ccc !important;
//   border: 1px solid #ccc !important;
// }
.el-checkbox {
  line-height: 30px;
}
.secondBtn {
  // margin-top: 11px;
  font-size: 14px;
  color: #333;
  .smBtn {
    width: 100px !important;
  }
  .smBtn2 {
    width: 120px !important;
  }
  .smBtn3 {
    width: 140px !important;
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

>>> .saveBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #5473e8;
  border: 1px solid #5473e8 !important;
}
>>> .saveBtn2 {
  width: 100px;
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
  width: 150px !important;
  height: 30px;
}
.None-Border {
  height: 100%;
}
>>> .unifySize input {
  height: 30px;
}
.unifySize .el-input {
  width: 150px;
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
>>> .el-form-item__label {
  padding: 0;
}
.iconP {
  font-size: 22px;
  color: #5473e8;
  float: right;
  transform: rotate(90deg);
}
// .Mask {
//   display: block;
//   z-index: 999999;
//   width: 100%;
//   height: 100%;
//   background: #808080;
// }
.iconC {
  font-size: 22px;
  color: #5473e8;
}
>>> .el-dialog {
  height: 430px;
}
>>> .blockDate .el-input__inner {
  width: 100%;
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
.radio {
  border: 1px solid #c7c6de;
  margin: 0;
  padding: 0;
  border-radius: 5px;
  padding: 0 5px;
  height: 32px;
  line-height: 40px;
}
.blockSpan {
  display: flex;
  height: 32px;
  margin-top: 5px;
  justify-content: start;
  border-radius: 4px;
  border: 1px solid #c7c6de;
  >>> .el-form-item__label {
    height: 40px;
    line-height: 33px;
  }
  >>> .listDate .el-input .el-input__inner {
    height: 30px !important;
    line-height: 30px;
    padding: 0 0 0 0px;
    margin: 0;
    width: 99px !important;
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
    width: 100%;
    border: none;
  }
  >>> .blockDate .el-input__icon {
    height: 30px;
  }
  >>> .blockDate .el-range-separator {
    height: 30px;
    padding: 0;
  }
  >>> .saveBtn {
    width: 70px;
    height: 30px;
    border-radius: 2px;
    line-height: 30px;
    padding: 0px;
    background-color: #5473e8;
    border: 1px solid #5473e8 !important;
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
>>> .el-select .el-input__inner {
  cursor: pointer;
  padding-right: 35px;
  height: 30px;
}
>>> .hearderClass {
  text-align: center;
  font-size: 14px;
  color: #333;
  font-family: Microsoft YaHei;
  height: 36px !important;
  background-color: #d5deff;
}
>>> .cellClass,
>>> .cellChooseClass {
  text-align: center;
  font-size: 12px;
  color: #333;
  font-family: Microsoft YaHei;
  height: 30px;
}
</style>
