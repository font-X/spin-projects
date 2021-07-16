<template>
  <el-container id="mainCard">
    <!-- 遮罩层 -->
    <el-row>
      <el-col id="queryRow">
        <el-card class="cardMargin">
          <el-row>
            <el-col>
              <el-form
                ref="mainForm"
                :model="mainTableParams"
                style="font-size：14px"
                label-width="84px"
              >
                <el-row class="mainForm">
                  <el-col :md="8" :lg="5" :xl="5">
                    <!-- 查询条件区域 -->
                    <span class="blockSpan">
                      <el-select
                        v-model="AdjustmentList.datetype"
                        class="listDate"
                        placeholder="制单日期"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in datetype"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                      <div class="blockDate">
                        <el-date-picker
                          class=""
                          v-model="AdjustmentList.begindate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                        ></el-date-picker>
                        <el-date-picker
                          class="IconClose"
                          v-model="AdjustmentList.enddate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                        ></el-date-picker>
                      </div>
                    </span>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="站点："
                    >
                      <el-select
                        v-model="AdjustmentList.shop"
                        class="unifySize marginLeft"
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
                  <el-col :md="5" :lg="4" :xl="4">
                    <el-form-item class="searchMargin" label="产品编码：">
                      <!-- <el-input
                        clearable
                        v-model="AdjustmentList.productno"
                        class="unifySize marginLeft"
                        placeholder="产品编码"
                      ></el-input> -->
                      <el-autocomplete
                        @keyup.enter.native="MainTableSearch()"
                        v-model="AdjustmentList.productno"
                        class="unifySize marginLeft"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入产品编码"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="4" :xl="4">
                    <el-form-item class="searchMargin" label="产品名称：">
                      <!-- <el-input
                        clearable
                        v-model="AdjustmentList.chnname"
                        class="unifySize marginLeft"
                        placeholder="产品名称"
                      ></el-input> -->
                      <el-autocomplete
                        @keyup.enter.native="MainTableSearch()"
                        v-model="AdjustmentList.chnname"
                        class="unifySize marginLeft"
                        :fetch-suggestions="querySearch2"
                        placeholder="请输入产品名称"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item
                      label-width="110px"
                      class="searchMargin"
                      label="色号/颜色："
                    >
                      <!-- <el-input
                        clearable
                        v-model="AdjustmentList.color"
                        class="unifySize marginLeft"
                        placeholder="色号/颜色"
                      ></el-input> -->
                      <el-autocomplete
                        @keyup.enter.native="MainTableSearch()"
                        v-model="AdjustmentList.color"
                        class="unifySize marginLeft"
                        :fetch-suggestions="querySearch3"
                        placeholder="请输入色号"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :md="3" :lg="2" :xl="2">
                    <el-form-item class="searchMargin" label="明细：">
                      <el-checkbox
                        value="1"
                        true-label="1"
                        false-label="0"
                        v-model="AdjustmentList.isdetail"
                      ></el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col :md="3" :lg="2" :xl="2">
                    <el-button
                      type="danger"
                      class="searchBtn searchMargin"
                      size="small"
                      :loading="isLoadingBtn"
                      icon="el-icon-search"
                      @click="MainTableSearch"
                      >查询</el-button
                    >
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
            <!-- 按钮区域 -->
            <el-col class="secondBtn">
              <el-button
                type="primary"
                @click="addProduct"
                class="smBtn iconBtn el-icon-plus"
                >新增</el-button
              >
              <el-button
                type="primary"
                @click="editDbclick"
                class="smBtn iconBtn el-icon-edit-outline"
                >编辑</el-button
              >
              <el-button
                type="primary"
                @click="seeChecked"
                class="smBtn iconBtn el-icon-view"
                >查看</el-button
              >
              <el-button
                type="primary"
                @click="delAdjustment"
                class="delBtn iconBtn el-icon-delete"
                >删除</el-button
              >
              <el-button
                type="primary"
                @click="reportItem"
                class="smBtn iconBtn iconfont kt-icon-caidan"
                >报批</el-button
              >
              <el-button
                type="primary"
                @click="exportExcel"
                class="exportBtn iconBtn iconfont kt-icon-daochu"
                >导出Excel</el-button
              >
              <!-- <el-button type="primary" class="iconBtn iconfont kt-icon-caidan"
                >更多功能</el-button
              > -->
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 主调价表 -->
      <el-col>
        <el-card style="margin-top：11px">
          <vxe-grid
            border
            resizable
            stripe
            ref="mainTable"
            :sync-resize="Isupdate"
            width="auto"
            :loading="isLoadingBtn"
            @cell-dblclick="dbMainClick"
            @cell-click="cellclick"
            show-overflow="title"
            class="mytable-scrollbar"
            :header-cell-class-name="hearderClass"
            :row-class-name="cellClass"
            :height="gridHeight"
            :columns="isShowDetailed ? columnsDetail : columns"
            highlight-current-row
            :config="{ render: 'scroll' }"
            :align="'center'"
            @checkbox-all="onAdjustmentCheckboxAllChange"
            @checkbox-change="onAdjustmentCheckboxChange"
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
            :total="paging.total"
          >
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>

    <!-- 新增调价单 -->
    <jy-dialog
      v-dialogDrag
      :title="addTitle"
      :close-on-click-modal="false"
      append-to-body
      :visible.sync="addAialogVisible"
      @close="handleClose"
      width="1250px"
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
          <el-col style="display: flex; justify-content: space-between">
            <el-form-item label-width="100px" prop="shop" label="站点：">
              <el-select
                @change="linkCountry"
                v-model="addFormParams.shop"
                class="unifySize"
              >
                <el-option label="" value=""></el-option>
                <el-option
                  :key="index"
                  v-for="(item, index) in shopList"
                  :label="item.Name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="国家：">
              <el-select v-model="addFormParams.country" class="unifySize">
                <el-option
                  @change="formChange()"
                  :key="index"
                  v-for="(item, index) in countryList"
                  :label="item.countryname"
                  :value="item.countryid"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label-width="110px"
              prop="startdate"
              label="生效日期："
            >
              <el-date-picker
                @change="formChange()"
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
                @change="formChange()"
                v-model="addFormParams.currency"
                class="unifySize"
              >
                <el-option label="" value=""></el-option>
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
                @blur="formChange()"
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
                @blur="formChange()"
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
                (this.addProduceList.length <= 1 &&
                  this.addProduceList[0]['产品号'] === '') ||
                !isEdit
                  ? true
                  : false
              "
              :class="
                (this.addProduceList.length <= 1 &&
                  this.addProduceList[0]['产品号'] === '') ||
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
              v-if="
                this.addProduceList.length <= 1 &&
                this.addProduceList[0]['产品号'] === ''
              "
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
            height="550"
            :permission="{
              add: true,
              delete: true,
            }"
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
                (this.addProduceList.length <= 1 &&
                  this.addProduceList[0].产品号 === '') ||
                !isEdit
                  ? true
                  : false
              "
              :class="
                (this.addProduceList.length <= 1 &&
                  this.addProduceList[0].产品号 === '') ||
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
                (this.addProduceList.length <= 1 &&
                  this.addProduceList[0].产品号 === '') ||
                !isEdit
                  ? true
                  : false
              "
              :class="
                (this.addProduceList.length <= 1 &&
                  this.addProduceList[0].产品号 === '') ||
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
    </jy-dialog>
    <!-- 选择产品信息 -->
    <jy-dialog
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
            :loading="chooseProduceListLoading"
            keep-source
            :row-class-name="cellChooseClass"
            show-overflow
            height="697"
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
            <vxe-table-column type="checkbox" width="4%"></vxe-table-column>
            <vxe-table-column
              type="seq"
              width="5%"
              title="序号"
            ></vxe-table-column>
            <vxe-table-column
              width="16%"
              field="产品号"
              title="产品编码"
            ></vxe-table-column>
            <vxe-table-column
              width="20%"
              field="产品名称"
              title="产品名称"
            ></vxe-table-column>
            <vxe-table-column
              width="5%"
              field="样式"
              title="样式"
            ></vxe-table-column>
            <vxe-table-column
              width="5%"
              field="色号"
              title="色号"
            ></vxe-table-column>
            <vxe-table-column
              width="5%"
              field="颜色"
              title="颜色"
            ></vxe-table-column>
            <vxe-table-column
              width="5%"
              field="尺寸"
              title="尺寸"
            ></vxe-table-column>
            <vxe-table-column
              width="7%"
              field="尺寸单位"
              title="尺寸单位"
            ></vxe-table-column>
            <vxe-table-column
              width="7%"
              field="每包片数"
              title="每包片数"
            ></vxe-table-column>
            <vxe-table-column
              width="5%"
              field="系数"
              title="系数"
            ></vxe-table-column>
            <vxe-table-column
              width="14%"
              field="备注"
              title="备注"
            ></vxe-table-column>
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
                :disabled="this.chooseProduceList.length < 1 ? true : false"
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
    </jy-dialog>
    <!-- dialog弹出层区域 -->

    <!-- 报批弹框 -->
    <report-approval
      v-if="showReportDialog"
      ref="ReportApproval"
      @okDialog="ReportOkDialog"
    ></report-approval>
  </el-container>
</template>

<script>
// import AnalysusReport from './AnalysusTable/AnalysusReport'
import ReportApproval from '../../Components/ReportApproval'
import JyTableInput from '@/components/JyTableInput/index'
import JyDialog from '@/components/JyDialog'
export default {
  components: { ReportApproval, JyTableInput, JyDialog },
  name: 'PriceAdjustmentSheet',
  data() {
    return {
      priceAdjustmentSheet: [],
      addProduceList: [{ 产品号: '' }], //新增产品表
      chooseProduceList: [], //产品信息表
      chooseList: [], // 勾选产品信息后的数据
      addTitle: '新增调价表',
      delParams: {
        UserCode: '',
        PricechangeId: '',
        strMessage: '',
      }, //删除调价单的产品参数
      dialogParam: {
        title: '',
        type: '',
        name: '',
        width: '70%',
        isShowDialog: false,
      },
      obj: {},
      gridHeight: 656,
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
      allCountryList: [],
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

      showReportDialog: false,
      delLength: [],
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '60', title: '状态', field: '状态' },
        { width: '80', title: '站点', field: '站点' },
        { width: '80', title: '国家', field: '国家' },
        { width: '100', title: '生效日期', field: '生效时间' },
        { align: 'left', title: '调价原因', field: '调价原因' },
        { width: '60', title: '币种', field: '币种' },
        { width: '80', title: '产品系列', field: '产品系列' },
        { width: '80', title: 'sku数', field: 'sku数' },
        { width: '100', title: '制单人', field: '制单人' },
        { width: '150', title: '制单时间', field: '制单日期' },
        { width: '130', title: '下一步操作', field: '下一步操作' },
        { width: '130', title: '下一步操作人', field: '下一步操作人' },
      ],
      columnsDetail: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '60', title: '状态', field: '状态' },
        { width: '80', title: '站点', field: '站点' },
        { width: '80', title: '国家', field: '国家' },
        { align: 'left', width: '185', title: '产品编码', field: '产品编码' },
        { width: '95', title: '生效日期', field: '生效日期' },
        { width: '90', title: '调整前价格', field: '调整前价格' },
        { width: '90', title: '调整后价格', field: '调整后价格' },
        { align: 'left', title: '调价原因', field: '调价原因' },
        { width: '60', title: '币种', field: '币种' },
        { align: 'left', width: '225', title: '产品名称', field: '产品名称' },
        { width: '50', title: 'asn', field: 'asn' },
        { width: '80', title: '样式', field: '样式' },
        { width: '60', title: '色号', field: '色号' },
        { width: '60', title: '颜色', field: '颜色' },
        { width: '60', title: '尺寸', field: '尺寸' },
        { width: '80', title: '尺寸单位', field: '尺寸单位' },
        { width: '140', title: '备注', field: '备注' },
      ],
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
      mainTableParams: {
        // 调价表主表参数
        data: '',
        startEndTime: '',
        site: '',
        产品号: '',
        ProductName: '',
        corlor: '',
        state: '',
      },
      isEdit: true, //规定调价单是否可以修改
      isEdit2: false, //规定调价单是否可以修改
      AdjustmentList: {
        usercode: '',
        begindate: '',
        enddate: '',
        shop: '',
        productno: '',
        chnname: '',
        color: '',
        datetype: '1',
        isdetail: '',
      },
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
      datetype: [
        //日期类型
        {
          value: '1',
          label: '制单日期',
        },
        {
          value: '2',
          label: '生效日期',
        },
      ],
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
    closeDialog() {
      this.dialogParam.isShowDialog = false
      this.getpriceAdjustmentList()
    },
    // 增加输入框的记忆功能
    // 存放查询记录
    handleSearchHistory(localName, paramsName) {
      let searchWordArray = localStorage.getItem(localName)
      if (searchWordArray === null) {
        return
      } else {
        searchWordArray = searchWordArray.split(',')
        if (searchWordArray.indexOf(paramsName) === -1) {
          searchWordArray.unshift(paramsName)
        }
        if (searchWordArray.length > 6) {
          searchWordArray.pop()
        }
        localStorage.setItem(localName, searchWordArray)
      }
    },
    // 渲染历史记录
    getInvoiceAccountHistory(localName) {
      let searchWordArray = localStorage.getItem(localName)
      if (searchWordArray === null) {
        localStorage.setItem(localName, [])
      } else {
        searchWordArray = searchWordArray.split(',')
        let invoiceAccountHistory = []
        for (let i = 0; i < searchWordArray.length; i++) {
          let item = {
            value: searchWordArray[i],
            label: searchWordArray[i],
          }
          invoiceAccountHistory.push(item)
        }
        return invoiceAccountHistory
      }
    },
    createFilter(queryString) {
      return (invoiceAccount) => {
        return (
          invoiceAccount.value
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    // 返回输入建议的方法(产品编码)
    querySearch(queryString, cb) {
      var invoiceAccountHistory =
        this.getInvoiceAccountHistory('price-productNo')
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 返回输入建议的方法(产品名称)
    querySearch2(queryString, cb) {
      var invoiceAccountHistory =
        this.getInvoiceAccountHistory('price-productName')
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 返回输入建议的方法(产品名称)
    querySearch3(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory('price-color')
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 导出Excel
    exportExcel() {
      this.$refs.mainTable.exportData({ type: 'csv' })
    },
    // 站点改变返回国家
    linkCountry() {
      this.countryList = []
      this.AdjustmentList.Country = ''
      this.$api.publicApi
        .LinkShop({ shopid: this.addFormParams.shop })
        .then((res) => {
          if (res.statusCode !== 200) return this.$message.error(res.message)
          this.countryList = res.data
          if (res.data.length !== 0) {
            this.addFormParams.country = res.data[0].countryid
          } else {
            this.addFormParams.country = ''
            this.formChange()
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
      this.showReportDialog = true
      let IDList = data
        .map((item) => {
          return item.pricechangeid
        })
        .join(',')
      this.$nextTick(() => {
        this.$refs.ReportApproval.formInfo.ObjectCode = '0116'
        this.$refs.ReportApproval.formInfo.Key = IDList
        this.$refs.ReportApproval.showDialog = true
      })
    },
    //报批完成后
    ReportOkDialog() {
      this.getpriceAdjustmentList()
    },
    MainTableSearch() {
      this.handleSearchHistory('price-productNo', this.AdjustmentList.productno)
      this.handleSearchHistory('price-productName', this.AdjustmentList.chnname)
      this.handleSearchHistory('price-color', this.AdjustmentList.color)
      this.delLength = []
      this.isLoadingBtn = true
      if (
        this.AdjustmentList.begindate === null &&
        this.AdjustmentList.enddate === null
      ) {
        this.AdjustmentList.begindate = ''
        this.AdjustmentList.enddate = ''
      }
      this.AdjustmentList.productno = this.AdjustmentList.productno.trim()
      this.AdjustmentList.color = this.AdjustmentList.color.trim()
      this.AdjustmentList.chnname = this.AdjustmentList.chnname.trim()
      this.$api.business
        .Adjustment({ model: { ...this.AdjustmentList } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
            this.isLoadingBtn = false
          } else {
            if (this.AdjustmentList.isdetail === '1') {
              this.isShowDetailed = true
            } else {
              this.isShowDetailed = false
            }
            this.priceAdjustmentSheet = res.data
            this.isLoadingBtn = false
            this.pageList()
          }
        })
        .catch((err) => {
          console.log(err)
          this.isLoadingBtn = false
        })
    },
    // 主表双击事件
    dbMainClick(row) {
      if (this.addProduceList.length === 0) {
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
      this.addTitle = '查看调价表'
      this.$api.business
        .GetProductDaialogList({ PricechangeId: row.row.pricechangeid })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.addFormParams.shop = res.data[0].站点
            this.addFormParams.startdate = res.data[0].生效日期
            this.addFormParams.productlist = res.data[0].产品系列
            this.addFormParams.country = res.data[0].国家
            this.addFormParams.reasons = res.data[0].条件原因
            let InDeX = this.currencyList.findIndex((item) => {
              return item.currency.trim() == res.data[0].币种.trim()
            })
            if (InDeX !== -1) {
              this.addFormParams.currency = this.currencyList[InDeX].chnName
            } else {
              this.addFormParams.currency = res.data[0].币种
            }
            if (res.data[0].国家 !== '') {
              let Index = this.allCountryList.findIndex((item) => {
                return item.StateID.trim() === res.data[0].国家.trim()
              })
              this.addFormParams.country = this.allCountryList[Index].StateChNm
            }
            this.$api.business
              .GetProductPriceChang({ PricechangeId: row.row.pricechangeid })
              .then((res) => {
                if (res.statusCode !== 200) {
                  this.$message({
                    message: res.message,
                    type: 'error',
                  })
                } else {
                  this.addProduceList = res.data
                }
              })
              .catch((err) => console.log(err))
          }
        })
        .catch((err) => console.log(err))

      this.isEdit = false
      this.addAialogVisible = true
    },
    onAdjustmentCheckboxAllChange(row) {
      if (row.checked) {
        this.delLength = this.delLength.concat(row.records)
      } else {
        this.delLength = []
      }
    },
    // 主调价表复选框状态改变触发
    onAdjustmentCheckboxChange(row) {
      if (row.checked) {
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
        this.delLength.push(row.row)
      } else {
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
      }
    },
    // 删除调价单
    delAdjustment() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.delLength.length < 1) {
        this.$message({
          message: '请选择删除项！',
          type: 'error',
        })
      } else {
        if (this.delLength.length > 1) {
          this.$message({
            message: '每次只能删除一条',
            type: 'error',
          })
        } else {
          this.$confirm('此操作将删除选中产品, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
          })
            .then(() => {
              this.delParams.PricechangeId = this.delLength[0].pricechangeid
              this.$api.business
                .delProduct({ ...this.delParams })
                .then((res) => {
                  if (res.statusCode !== 200) {
                    this.$message({
                      message: res.message,
                      type: 'error',
                    })
                  } else {
                    // console.log(res)
                    this.$message({
                      type: 'success',
                      message: '删除成功!',
                    })
                    this.delParams.PricechangeId = []
                    this.delLength = []
                    this.getpriceAdjustmentList()
                  }
                })
                .catch((err) => console.log(err))
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
        }
      }
    },
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
          // // 获取货币的value值
          let indeX = this.currencyList.findIndex((item) => {
            return item.chnName.trim() == this.addFormParams.currency.trim()
          })
          if (indeX !== -1) {
            this.addFormParams.currency = this.currencyList[indeX].currency
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
                this.getpriceAdjustmentList()
                this.$refs.addForm.resetFields()
                // this.addFormParams.strlist = []
                let nullObj = {
                  备注: '',
                  尺寸: '',
                  尺寸单位: '',
                  产品号: '',
                  产品名称: '',
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
                this.addAialogVisible = false //关闭弹出层
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
          }
          let InDex = this.shopList.findIndex((item) => {
            return item.Name.trim() == this.addFormParams.shop.trim()
          })

          if (InDex !== -1) {
            this.addFormParams.shop = this.shopList[InDex].id
          }
          // // 获取货币的value值
          let indeX = this.currencyList.findIndex((item) => {
            return item.chnName.trim() == this.addFormParams.currency.trim()
          })
          if (indeX !== -1) {
            this.addFormParams.currency = this.currencyList[indeX].currency
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
                var ID = res.data[0].pricechangeid
                this.showReportDialog = true
                // this.obj = {
                //   ObjectCode: '0115',
                //   Key: ID,
                // }
                // this.dialogParam = {
                //   title: '报批',
                //   name: 'AnalysusReport',
                //   type: '',
                //   width: '700px',
                //   isShowDialog: true,
                // }
                this.$nextTick(() => {
                  this.$refs.ReportApproval.formInfo.ObjectCode = '0116'
                  this.$refs.ReportApproval.formInfo.Key = ID
                  this.$refs.ReportApproval.showDialog = true
                })
                // let InDex = this.shopList.findIndex((item) => {
                //   return item.Name.trim() == this.AdjustmentList.shop.trim()
                // })
                // if (InDex !== -1) {
                //   this.AdjustmentList.shop = this.shopList[InDex].id
                // }
                // this.$api.business
                //   .Adjustment({ model: { ...this.AdjustmentList } })
                //   .then((res) => {
                //     if (res.statusCode !== 200) {
                //       this.$message({
                //         message: res.message,
                //         type: 'error',
                //       })
                //     } else {
                //       this.priceAdjustmentSheet = res.data
                //       // if (!this.isEdit2) {
                //       //   var ID = this.priceAdjustmentSheet[0].pricechangeid
                //       // } else {
                //       //   this.delLength = this.$refs.mainTable.getCheckboxRecords()
                //       //   var ID = this.delLength[0].pricechangeid
                //       // }
                //       // console.log(data[0].ID);
                //     }
                //   })
                //   .catch((err) => console.log(err))
                this.$refs.addForm.resetFields()
                this.delLength = []
                this.addAialogVisible = false //关闭弹出层
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
        let InDeX = this.currencyList.findIndex((item) => {
          return item.currency.trim() == this.delLength[0].币种.trim()
        })
        if (InDeX !== -1) {
          this.addFormParams.currency = this.currencyList[InDeX].chnName
        } else {
          this.addFormParams.currency = this.delLength[0].币种
        }
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
    // 编辑勾选项
    editDbclick() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.delLength.length < 1) {
        this.$message({
          message: '请选择修改项',
          type: 'error',
        })
      } else {
        if (this.delLength.length > 1) {
          this.$message({
            message: '每次只能编辑一条',
            type: 'error',
          })
        } else {
          if (this.delLength[0].状态.trim() !== '新制') {
            this.$message({
              message: '只有新制状态下的信息可以编辑',
              type: 'error',
            })
          } else {
            this.addTitle = '编辑调价表'
            if (this.AdjustmentList.isdetail === '1') {
              this.$set(
                this.addFormParams,
                'startdate',
                this.delLength[0].生效日期
              )
            } else {
              this.$set(
                this.addFormParams,
                'startdate',
                this.delLength[0].生效时间
              )
            }
            this.isEdit2 = true
            var INDEX = this.shopList.findIndex((item) => {
              return item.Name.trim() === this.delLength[0].站点.trim()
            })
            this.addFormParams.shop = this.shopList[INDEX].id
            this.addFormParams.country = this.delLength[0].国家
            this.addFormParams.currency = this.delLength[0].币种
            this.addFormParams.productlist = this.delLength[0].产品系列
            this.addFormParams.reasons = this.delLength[0].调价原因
            this.addFormParams.pricechangeid = this.delLength[0].pricechangeid
            let InDeX = this.currencyList.findIndex((item) => {
              return item.currency.trim() == this.delLength[0].币种.trim()
            })
            if (InDeX !== -1) {
              this.addFormParams.currency = this.currencyList[InDeX].chnName
            } else {
              this.addFormParams.currency = this.delLength[0].币种
            }
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
                  this.addProduceList = res.data
                }
              })
              .catch((err) => console.log(err))

            this.addAialogVisible = true
          }
        }
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
    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.paging.data = this.priceAdjustmentSheet
      this.paging.total = this.paging.data.length
      this.getList()
    },
    // 处理数据
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.paging.data = this.paging.data.filter(
        (item, index) =>
          index < this.paging.page * this.paging.limit &&
          index >= this.paging.limit * (this.paging.page - 1)
      )
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
    // 当每页数量改变
    handleSizeChange(val) {
      this.paging.limit = val
      this.delLength = []
      this.pageList()
    },
    // 当当前页改变
    handleCurrentChange(val) {
      this.paging.page = val
      this.delLength = []
      this.pageList()
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
      this.$set(this.addFormParams, 'shop', this.shopList[0].id)
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
      // this.$nextTick(() => {
      //   if (this.addProduceList[0]['产品号'] === '') {
      //     this.$set(this.addProduceList[0], '产品号', '')
      //     console.log(this.addProduceList)
      //     this.addAialogVisible = true
      //   } else {
      //     this.addAialogVisible = true
      //   }
      // })
    },
    // 表格数据
    formChange() {
      if (
        this.addProduceList.length <= 1 &&
        this.addProduceList[0]['产品号'] === ''
      ) {
        this.addProduceList = []
        console.log(this.addProduceList)
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
        let nullObj1 = {
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
        this.addProduceList[1] = nullObj1
      }
      if (
        this.addProduceList.length <= 1 &&
        this.addProduceList[0]['产品号'] !== ''
      ) {
        let nullObj1 = {
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
        this.addProduceList.push(nullObj1)
      }
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
        this.getPriceParams.productnolist =
          this.getPriceParams.productnolist.replace(
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
        this.getPriceParams.productnolist =
          this.getPriceParams.productnolist.slice(
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
      let flag = false
      let concatArr = this.chooseList.concat(this.addProduceList)
      let concatLength = concatArr.length
      function deWeight(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
          for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].产品号 === '') {
              arr.splice(i, 1)
              j--
            } else {
              if (arr[i].产品号 == arr[j].产品号) {
                arr.splice(i, 1)
                j--
                flag = true
                //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
              }
            }
          }
        }
        return arr
      }
      var newArr = deWeight(concatArr)

      if (flag) {
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
    addProductCountry() {
      this.$api.publicApi
        .bcState()
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.allCountryList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    // 获取计量单位列表
    getUnitList() {
      this.$api.publicApi
        .XcUnit()
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.unitList = res
          }
        })
        .catch((err) => console.log(err))
    },

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
            this.$set(this.addFormParams, 'shop', this.shopList[0].Name)
            this.$set(this.AdjustmentList, 'shop', this.shopList[0].Name)
            this.getpriceAdjustmentList()
            this.delLength = []
          }
        })
        .catch((err) => console.log(err))
    },
    // 第一层弹出层取消
    handleClose() {
      this.isEdit = true
      this.addFormParams.country = ''
      this.$refs.addForm.resetFields()
      this.addProduceList = [{ 产品号: '' }]
      this.addAialogVisible = false
    },
    cancel() {
      this.addAialogVisible = false
    },
    //
    selectChangeEvent() {},
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
      this.$set(this.AdjustmentList, 'enddate', toMonth)
      this.$set(this.AdjustmentList, 'begindate', startTime)
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
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        this.gridHeight = card - queryRow - 80
        console.log(this.gridHeight)
      })
    },
  },
  computed: {},
  beforeCreate() {},
  created() {
    // this.aabb()
    this.addProductState()
    this.getNowDate()
    this.addProductCurrency() //获取货币列表
    this.getUnitList()
    this.addProductCountry()
    this.resize()
  },
  mounted() {
    var _this = this
    window.onresize = function () {
      // 定义窗口大小变更通知事件
      _this.resize()
    }
  },
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
>>> .jy-dialog__footer {
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
>>> .el-form-item__label {
  padding: 0;
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
  height: 560px;
}
>>> .blockDate .el-input__inner {
  width: 140px;
}
>>> .jy_wrapper .jy-dialog__body {
  border-bottom: none !important;
}
>>> .jy-dialog .jy-dialog__header {
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
    height: 28px;
    width: 100%;
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
