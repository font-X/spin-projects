<template>
  <el-container>
    <el-row id="mainCard" style="width: 100%">
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
                  <el-col class="searchTerm" :md="5" :lg="5" :xl="5">
                    <!-- 查询条件区域 -->
                    <span class="blockSpan">
                      <el-form-item label="制单日期：">
                        <div class="blockDate">
                          <el-date-picker
                            class="unifySize"
                            v-model="AdjustmentList.beginDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择开始日期"
                          ></el-date-picker>
                          <el-date-picker
                            class="unifySize NoneIcon"
                            v-model="AdjustmentList.EndDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择结束日期"
                          ></el-date-picker>
                        </div>
                      </el-form-item>
                    </span>
                  </el-col>
                  <el-col :md="3" :lg="4" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="换入站点："
                    >
                      <el-select
                        :loading="isLoadingShop"
                        loading-text="加载中,若长时间无响应请刷新页面!"
                        v-model="AdjustmentList.Shop"
                        class="unifySize1 marginLeft"
                        placeholder="换入站点"
                      >
                        <el-option label="" value=""></el-option>
                        <el-option
                          :key="index"
                          v-for="(item, index) in allShop"
                          :label="item.Name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="3" :lg="4" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="换出站点："
                    >
                      <el-select
                        :loading="isLoadingShop"
                        loading-text="加载中,若长时间无响应请刷新页面!"
                        v-model="AdjustmentList.SourceShop"
                        class="unifySize marginLeft"
                        placeholder="换出站点"
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
                  <el-col :md="5" :lg="5" :xl="5">
                    <el-form-item
                      class="searchMargin"
                      label="原产品号："
                      label-width="100px"
                    >
                      <!-- <vxe-input
                        v-model="AdjustmentList.P_Code"
                        class="unifySize marginLeft"
                        placeholder="原产品号"
                        clearable
                      ></vxe-input> -->
                      <el-autocomplete
                        clearable
                        @keyup.enter.native="MainTableSearch()"
                        v-model="AdjustmentList.P_Code"
                        class="unifySize1 marginLeft"
                        :fetch-suggestions="querySearch"
                        placeholder="原产品号"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :md="3" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      label="颜色："
                      label-width="100px"
                    >
                      <el-input
                        @keyup.enter.native="MainTableSearch()"
                        v-model="AdjustmentList.Color"
                        class="unifySize1 marginLeft"
                        placeholder="颜色"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <!-- <el-col style="margin-left: 70px" :md="3" :lg="4" :xl="3">
                    <el-form-item style="margin-bottom: 0px" label="审批状态：">
                      <el-select
                        v-model="AdjustmentList.reportStatus"
                        class="unifySize"
                        clearable=""
                        placeholder="审批状态"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in reportStatus"
                          :label="item.Name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col> -->
                </el-row>
                <el-row style="height: 40px">
                  <el-col style="height: 40px" :md="5" :lg="5" :xl="5">
                    <el-form-item
                      class=""
                      label="新产品号："
                      label-width="84px"
                    >
                      <!-- <vxe-input
                        v-model="AdjustmentList.NewProductNo"
                        class="unifySize marginLeft"
                        placeholder="新产品号"
                        clearable
                      ></vxe-input> -->
                      <el-autocomplete
                        clearable
                        @keyup.enter.native="MainTableSearch()"
                        v-model="AdjustmentList.NewProductNo"
                        class="unifySize1"
                        :fetch-suggestions="querySearch2"
                        placeholder="新产品号"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col style="height: 40px" :md="3" :lg="4" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="确认状态："
                    >
                      <el-select
                        clearable
                        v-model="AdjustmentList.isConfirm"
                        class="unifySize1"
                        placeholder="确认状态："
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in statusList"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-form-item class="searchMargin" label="明细：">
                      <el-checkbox
                        value="1"
                        true-label="1"
                        false-label="0"
                        v-model="AdjustmentList.isDetail"
                      ></el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col
                    style="margin-top: 5px; margin-left: 40px"
                    :span="4"
                    class="secondBtn"
                  >
                    <el-button
                      type="danger"
                      class="searchBtn1 iconBtn el-icon-search"
                      size="small"
                      :loading="isLoadingBtn"
                      @click="MainTableSearch"
                      >查询</el-button
                    >
                    <el-button
                      type="primary"
                      @click="editDbclick"
                      class="smBtn iconBtn el-icon-edit-outline"
                      >确认</el-button
                    >
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
            <!-- 按钮区域 -->
          </el-row>
        </el-card>
      </el-col>
      <!-- 主换货表 -->
      <el-col class="mainTable">
        <el-card>
          <vxe-grid
            border
            ref="mainRef"
            resizable
            stripe
            keep-source
            :sync-resize="Isupdate"
            width="auto"
            show-overflow="title"
            :header-row-class-name="hearderClass"
            :footer-cell-class-name="footerCellClassName"
            :row-class-name="cellClass2"
            :height="gridHeight"
            :loading="loading"
            :footer-method="footerMethod"
            :columns="columnsDe"
            show-footer
            highlight-current-row
            :config="{ render: 'scroll' }"
            :align="'center'"
            class="mytable-scrollbar"
            @cell-click="cellclick"
            @checkbox-all="onAdjustmentCheckboxAllChange"
            @checkbox-change="onAdjustmentCheckboxChange"
            :checkbox-config="{ highlight: true }"
            :data="paging.data"
          >
            <template #deliveryDate="{ row }">
              <span>{{ row['申请时间'] }}</span>
            </template>
            <template #productName="{ row }">
              <span>{{ row['原产品号'] }}</span>
              <br />
              <span>{{ row['原产品名称'] }}</span>
            </template>
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

    <!-- 换货申请编辑 -->
    <el-dialog
      :title="addTitle"
      v-dialogDrag
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="addAialogVisible"
      :before-close="handleClose"
      height="800px"
      width="100%"
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
          <!-- <el-col style="display: flex; justify-content: space-between"> -->
          <el-col class="searchCondition">
            <el-form-item
              prop="shop"
              label="站点："
              class="searchConditionShop"
            >
              <el-select
                disabled
                v-model="addFormParams.Shop"
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
            <el-form-item prop="DeliveryDate" label="申请日期：">
              <el-date-picker
                disabled
                class="unifySize"
                v-model="addFormParams.DeliveryDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="text" prop="Remark ">
            <!-- 文本域 -->
            <el-form-item label="备注：">
              <el-input
                disabled
                type="textarea"
                :rows="2"
                placeholder="请输入换货原因（必填）"
                v-model="addFormParams.Remark"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="secondBtn">
            <span
              class="NullTip"
              v-show="
                addProduceList.length <= 1 &&
                addProduceList[0].NewProductNo === ''
              "
              >暂无数据，请点击“原产品”或”新产品号“下方的蓝色选择产品图标</span
            >
          </el-col>
        </el-row>
        <div style="height: 500px">
          <!-- <JyTableInput> -->
          <vxe-table
            border
            ref="addTable"
            resizable
            stripe
            keep-source
            :auto-resize="true"
            style="margin-top: 11px"
            show-overflow="title"
            width="auto"
            :loading="addLoading"
            :footer-cell-class-name="footerCellClassName"
            :row-class-name="addcellClass"
            height="480"
            show-footer
            :footer-method="footerMethod1"
            highlight-current-row
            :edit-rules="validRules"
            :edit-config="{ trigger: 'click', mode: 'cell' }"
            :align="'center'"
            :checkbox-config="{
              highlight: true,
              range: true,
              checkMethod: checkMethodDisable,
            }"
            :data="addProduceList"
          >
            <vxe-table-column
              fixed="left"
              type="seq"
              :header-class-name="cellCorlor4"
              width="50"
              title="序号"
            ></vxe-table-column>
            <vxe-table-colgroup
              :header-class-name="cellCorlor4"
              fixed="left"
              title="新产品(换入产品)"
            >
              <vxe-table-column
                :header-class-name="cellCorlor4"
                field="NewProductNo"
                width="240"
                title="新产品"
              >
                <template slot-scope="{ row }">
                  <span>{{ row.NewProductNo }}</span
                  ><br />
                  <span>{{ row.NewProductName }}</span>
                </template>
              </vxe-table-column>
              <!-- <vxe-table-column
                min-width="259"
                :header-class-name="cellCorlor4"
                field="NewProductName"
                title="产品名称"
              ></vxe-table-column> -->
              <vxe-table-column
                width="70"
                :header-class-name="cellCorlor4"
                field="NewProductCorlor"
                title="颜色"
              ></vxe-table-column>
              <vxe-table-column
                width="70"
                :header-class-name="cellCorlor4"
                field="NewProductSize"
                title="尺寸"
              ></vxe-table-column>
              <vxe-table-column
                width="70"
                :header-class-name="cellCorlor4"
                field="RequestChangeQuantity"
                title="数量(件)"
              ></vxe-table-column>
              <vxe-table-column
                min-width="110"
                :header-class-name="cellCorlor4"
                field="ChangeRemark"
                title="备注"
              ></vxe-table-column>
            </vxe-table-colgroup>
            <vxe-table-colgroup
              :header-class-name="hearderClass"
              title="原产品(换出产品)"
            >
              <vxe-table-column
                :header-class-name="hearderClass"
                width="260"
                field="P_Code"
                title="原产品"
              >
                <template slot-scope="{ row }">
                  <span>{{ row.P_Code }}</span
                  ><br />
                  <span>{{ row.P_chnName }}</span>
                </template>
              </vxe-table-column>
              <!-- <vxe-table-column
                :header-class-name="hearderClass"
                field="P_chnName"
                min-width="255"
                title="产品名称"
              ></vxe-table-column> -->
              <vxe-table-column
                :header-class-name="hearderClass"
                width="70"
                field="Color"
                title="颜色"
              ></vxe-table-column>
              <vxe-table-column
                :header-class-name="hearderClass"
                width="73"
                field="chnSpec"
                title="尺寸"
              ></vxe-table-column>
              <vxe-table-column
                width="80"
                :header-class-name="hearderClass"
                field="NewShop"
                title="对方站点"
              ></vxe-table-column>
              <vxe-table-column
                :header-class-name="hearderClass"
                :edit-render="{
                  name: 'input',
                  attrs: { type: 'text' },
                  autoselect: true,
                }"
                width="70"
                field="Quantity"
                title="数量"
              >
                <template v-slot:edit="{ row }">
                  <vxe-input
                    :min="0"
                    type="integer"
                    v-model="row.Quantity"
                  ></vxe-input>
                </template>
              </vxe-table-column>
              <vxe-table-column
                :header-class-name="hearderClass"
                width="60"
                field="平均周销量"
                title="周销"
              ></vxe-table-column>
              <vxe-table-column
                :header-class-name="hearderClass"
                width="60"
                field="可售"
                title="可售"
              ></vxe-table-column>
              <vxe-table-column
                :header-class-name="hearderClass"
                width="60"
                field="预留"
                title="预留"
              ></vxe-table-column>
              <vxe-table-column
                :header-class-name="hearderClass"
                width="60"
                field="在途"
                title="在途"
              ></vxe-table-column>
              <vxe-table-column
                :header-class-name="hearderClass"
                width="60"
                field="可销周数"
                title="可销周数"
              ></vxe-table-column>
              <vxe-table-column
                :header-class-name="hearderClass"
                :edit-render="{
                  immediate: true,
                  name: 'input',
                }"
                min-width="150"
                field="ConfirmRemark"
                title="备注"
              >
              </vxe-table-column>
            </vxe-table-colgroup>
          </vxe-table>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              type="primary"
              :loading="dataloading"
              class="saveBtn2"
              @click="dataProduction"
              >数据生成</el-button
            >
            <el-button
              type="primary"
              @click="saveProduct"
              :loading="addLoading"
              :disabled="
                (addProduceList.length <= 1 &&
                  addProduceList[0].P_Code === '') ||
                !isEdit
                  ? true
                  : false
              "
              :class="
                (addProduceList.length <= 1 &&
                  addProduceList[0].P_Code === '') ||
                !isEdit
                  ? 'saveBtn1'
                  : 'saveBtn'
              "
              class="iconfont kt-icon-baocun"
              >保存</el-button
            >
            <el-button type="primary" class="clearBtn" @click="cancel"
              >取消</el-button
            >
          </el-col>
        </el-row>
      </span>
    </el-dialog>

    <!-- 报批弹框 -->
    <report-approval
      v-if="showReportDialog"
      ref="ReportApproval"
      @okDialog="ReportOkDialog"
    ></report-approval>
  </el-container>
</template>

<script>
// import JyTableInput from '@/components/JyTableInput/index'
import ReportApproval from '../../Components/ReportApproval.vue'
import Cookies from 'js-cookie'
export default {
  components: { ReportApproval },
  name: 'Exchange',
  data() {
    return {
      ProductInfoList: [], //存放传入参数list
      priceAdjustmentSheet: [], //主页面的数据
      addProduceList: [
        {
          P_Code: '',
          NewProductNo: '',
          P_chnName: '',
          Quantity: null,
        },
      ], //新增产品表的数据
      allShopList: [],
      addTitle: '',
      cellCorlor4: 'cellCorlor4',
      delParams: {
        Id: '',
        UserCode: '001',
        PricechangeId: '',
        strMessage: '',
      }, //删除调价单的产品参数
      gridHeight: 660,
      dataloading: false,
      addRules: {
        shop: [{ required: false, message: '请选择站点', trigger: 'blur' }],
        // country: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        DeliveryDate: [
          { required: true, message: '请选择日期', trigger: 'blur' },
        ],
      },
      statusList: [
        { label: '', value: '' },
        { label: '待确认', value: '0' },
        { label: '已确认', value: '1' },
      ],
      isLoadingShop: true,
      // 查询产品校验规则
      chooseFormRules: {
        strProduct: [{ required: false, trigger: 'change' }],
        p_Spec: [{ required: false, trigger: 'blur' }],
        color: [{ required: false, trigger: 'blur' }],
        contractNo: [{ required: false, trigger: 'blur' }],
        shopId: [{ required: false, trigger: 'blur' }],
      },
      footerCellClassName: 'footerCellClassName',
      delLength: [], //主页table选中复选框
      // r_columns: [
      //   {
      //     width: '220',
      //     title: '原产品',
      //     field: 'P_Code',
      //   },
      //   {
      //     width: '260',
      //     title: '产品名称',
      //     field: 'P_chnName',
      //   },
      //   {
      //     width: '70',
      //     title: '颜色',
      //     field: 'Color',
      //   },
      //   {
      //     width: '100',
      //     title: '尺寸',
      //     field: 'chnSpec',
      //   },
      //   {
      //     width: '110',
      //     title: '申请数量',
      //     field: 'RequestChangeQuantity',
      //   },
      //   {
      //     width: '110',
      //     title: '审批数量',
      //     field: '',
      //   },
      //   {
      //     width: '',
      //     title: '新产品号',
      //     field: 'NewProductNo',
      //   },
      // ],
      columnsDe: [],
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '50', title: '序号' },
        { field: 'ID', width: '95', title: 'ID' },
        { width: '50', title: '状态', field: '状态' },
        { width: '80', title: '确认状态', field: '确认状态' },
        { width: '95', title: '申请时间', slots: { default: 'deliveryDate' } },
        { width: '65', title: '站点', field: '站点' },
        { minWidth: '175', title: '新产品号(换入产品)', field: '新产品号' },
        { width: '60', title: '颜色', field: '颜色' },
        { width: '80', title: '尺寸', field: '尺寸' },
        { width: '80', title: '申请数量', field: '申请换货数量' },
        {
          title: '原产品号(换出产品)',
          minWidth: '178',
          field: '原产品号',
          slots: { default: 'productName' },
        },
        { width: '80', title: '换入备注', field: '换入备注' },
        { width: '80', title: '换货数量', field: '换货数量' },
        { width: '80', title: '换出站点', field: '换出站点' },
        { width: '100', title: '备注', field: '备注', align: 'left' },
        { width: '65', title: '确认人', field: '确认人' },
        { width: '100', title: '确认日期', field: '确认日期' },
        { width: '100', title: '换出备注', field: '换出备注' },
        { width: '65', title: '制单人', field: '制单人' },
        { width: '150', title: '制单日期', field: '制单日期' },
      ],
      columnsNo: [
        { type: 'checkbox', width: '60' },
        { type: 'seq', width: '50', title: '序号' },
        { field: 'ID', width: '110', title: 'ID' },
        { width: '80', title: '状态', field: '审批状态' },
        { width: '80', title: '确认状态', field: '确认状态' },
        { width: '80', title: '换入站点', field: '换入站点' },
        { width: '100', title: '换入sku数', field: '换入sku数' },
        { width: '80', title: '换入数量', field: '换入数量' },
        { width: '80', title: '制单人', field: '制单人' },
        { width: '100', title: '申请日期', slots: { default: 'deliveryDate' } },
        { width: '80', title: '换出站点', field: '换出站点' },
        { width: '100', title: '换出sku数', field: '换出sku数' },
        { width: '80', title: '换出数量', field: '换出数量' },
        { width: '80', title: '确认人', field: '确认人' },
        { width: '100', title: '确认时间', field: '确认日期' },
        { minWidth: '80', title: '备注', field: '备注', align: 'left' },
      ],
      validRules: {
        Quantity: [
          { required: true, message: '换货数量必须填写' },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值不能为负数',
          },
        ],
        P_Code: [
          { required: true, message: '老产品不能为空', trigger: 'click' },
        ],
        NewProductNo: [
          { required: true, message: '新产品不能为空', trigger: 'click' },
        ],
      },
      reportStatus: [{ Name: '确认审批', id: '01' }],
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      cellClass2: 'cellClass2',
      cellChooseClass: 'cellChooseClass',
      addAialogVisible: false, //新增弹框
      chooseDaialogVisible: false, //选择产品弹框
      mainTableParams: {
        // 调货表主表参数
        data: '',
        startEndTime: '',
        site: '',
        产品号: '',
        ProductName: '',
        corlor: '',
        state: '',
      },
      allShop: [],
      addLoading: false,
      isEdit: true, //规定调货单是否可以修改
      // 查询获取列表参数表单
      AdjustmentList: {
        strMessage: '',
        usercode: '',
        beginDate: '',
        EndDate: '',
        Shop: '',
        P_Code: '',
        Color: '',
        NewProductNo: '',
        SourceShop: '',
        isConfirm: '0',
        isDetail: '0',
      },
      Isupdate: false,
      // 新增的请求参数
      addFormParams: {
        UserCode: '',
        ID: '',
        DeliveryDate: '',
        Shop: '',
        strList: '',
        strMessage: '',
        Remark: '',
        flag: '1',
      },
      columnIcon: '◇', //列分隔符
      shopList: [], //站点
      //选择产品接口参数
      mainTime: [],
      // 选择产品的参数
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
      // isMask: false, //控制遮罩是否出现
      // 获取换货后的参数
      getPriceParams: {
        Remark: '',
        usercode: '001',
        shopid: '',
        // country: '',
        productnolist: '',
        saledate: '',
        InputDate: '',
      },
      isLoadingBtn: false, //按钮loading效果
      searchLoading: false, //查询产品loading
      loading: false,
      gotPrice: [],
      paging: { list: [], data: [], limit: 100, total: null, page: 1 },
      choosePaging: { list: [], data: [], limit: 100, total: null, page: 1 },
      delArr: [], //选中的数据用来储存在弹框表格中
      rowId: '',
      sign: '', //判断按钮携带参数
      isChinese: true, //默中文字段
      selectedRow: null,
      state: 'add', //判断是哪个按钮点击
      showReportDialog: false, //报批弹框的显示与隐藏
    }
  },
  methods: {
    // 数据生产按钮
    dataProduction() {
      this.dataloading = true
      let form = new FormData()
      let token = Cookies.get('token')
      let shopId = ''
      if (this.addProduceList[0].NewShop !== null) {
        var index = this.allShop.findIndex((ITEM) => {
          return ITEM.Name.trim() === this.addProduceList[0].NewShop.trim()
        })
        if (index !== -1) {
          shopId = this.allShop[index].id
        }
      }
      form.append('shopId', shopId)
      this.$axios({
        method: 'post',
        url: '/api/SalesAnalysis/GetSalesReportAmzfxAddByShopQuery',
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: token,
        },
        timeout: 60000,
        data: form,
      })
        .then((res) => {
          if (res.data.statusCode !== 200) {
            return this.$message.error(res.message)
          } else {
            this.$message.success('数据生成成功!')

            let Str = ''
            res.data.NewList.forEach((item) => {
              Str += item.NewShop + '◇' + item.P_Code + '◆'
            })
            // 调接口拿库存
            this.$api.exchangegoods
              .GetProductStockList({ productNos: Str })
              .then((res2) => {
                // console.log(res)
                if (res.statusCode !== 200) {
                  this.$message({
                    message: res.message,
                    type: 'error',
                  })
                } else {
                  this.addProduceList.forEach((item) => {
                    res2.data.forEach((Item) => {
                      if (item.P_Code.trim() === Item.SKU.trim()) {
                        item['可售'] = Item.可售
                        item['平均周销量'] = Item.平均周销量
                        item['预留'] = Item.预留
                        item['在途'] = Item.在途
                        item['可销周数'] = Item.可销周数
                      }
                    })
                  })
                }
              })
              .catch((err) => {
                console.log(err)
              })
              .finally(() => {})
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message.error(err)
        })
        .finally(() => {
          this.dataloading = false
        })
    },
    //点击单元格
    cellclick(data) {
      if (data.columnIndex != 0) {
        this.$refs.mainRef.setAllCheckboxRow(false)
        this.$refs.mainRef.setCheckboxRow(data.row, true)
      }
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
    // 返回输入建议的方法
    querySearch(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory(
        'ExchangeC-oldproduct'
      )
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 返回输入建议的方法
    querySearch2(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory(
        'ExchangeC-newproduct'
      )
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 合计
    footerMethod({ columns }) {
      const data = this.priceAdjustmentSheet
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          switch (column.property) {
            case '申请换货数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i]['申请换货数量']
              }
              return sums
            case '换货数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i]['换货数量']
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    footerMethod1({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          switch (column.property) {
            case 'Quantity':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                if (
                  data[i].Quantity === null ||
                  data[i].Quantity === undefined
                ) {
                  data[i].Quantity = ''
                }
                sums += Number(data[i].Quantity)
              }
              return sums
            case 'RequestChangeQuantity':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                if (data[i].RequestChangeQuantity === undefined) {
                  data[i].RequestChangeQuantity === 0
                }
                sums += Number(data[i].RequestChangeQuantity)
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    // 查询按钮事件
    MainTableSearch() {
      this.handleSearchHistory(
        'ExchangeC-oldproduct',
        this.AdjustmentList.P_Code
      )
      this.handleSearchHistory(
        'ExchangeC-newproduct',
        this.AdjustmentList.NewProductNo
      )
      this.paging.data = []
      this.delLength = []
      this.loading = true
      this.isLoadingBtn = true
      if (this.AdjustmentList.isDetail === '0') {
        console.log(66)
        this.columnsDe = this.columnsNo
      } else if (this.AdjustmentList.isDetail === '1') {
        this.columnsDe = this.columns
      }
      if (
        this.AdjustmentList.beginDate === null &&
        this.AdjustmentList.EndDate === null
      ) {
        this.AdjustmentList.beginDate = ''
        this.AdjustmentList.EndDate = ''
      }
      this.$api.exchangegoods
        .GetPlanConfirmQuery({ model: this.AdjustmentList })
        .then((res) => {
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
            this.isLoadingBtn = false
            this.loading = false
          } else {
            // console.log(res)
            this.priceAdjustmentSheet = res.data
            this.isLoadingBtn = false
            this.loading = false
            this.paging.page = 1
            this.pageList()
          }
        })
        .catch((err) => {
          // console.log(err)
          this.isLoadingBtn = false
          this.loading = false
        })
    },

    // 主表复选框全选事件
    onAdjustmentCheckboxAllChange(row) {
      // console.log(row)
      if (row.checked) {
        this.delLength = this.$refs.mainRef.getCheckboxRecords()
        this.delParams.Id = this.delLength.Id
      } else {
        this.delLength = []
      }
    },
    // 主页面调货表复选框状态改变触发
    onAdjustmentCheckboxChange(row) {
      // console.log(row)
      if (row.checked) {
        this.delParams.Id = row.row.Id
        // console.log(row.row);
        this.delLength.push(row.row)
      } else {
        let InDex = this.delLength.findIndex((item) => {
          return item.pricechangeid === row.row.pricechangeid
        })
        this.delLength.splice(InDex, 1)
      }
      // this.getpriceAdjustmentList()
    },
    // 保存添加换货单事件
    async saveProduct() {
      const errMap = await this.$refs.addTable //vxe-table表格数据校验
        .validate(true)
        .catch((errMap) => errMap)
      if (errMap) {
        return
      } else {
        this.$refs.addForm.validate((valid) => {
          if (!valid) return //文本域校验，必填项
          // this.isMask = true
          // this.$delete(this.addProduceList, '换货数量')
          // 筛选数据
          // 循环
          // this.addProduceList.forEach((p) => {
          //   var AddProductInfo = {}
          //   ;(AddProductInfo.P_Code = p.P_Code.trim()),
          //     (AddProductInfo.NewProductNo = p.NewProductNo.trim()),
          //     (AddProductInfo.P_chnName = p.P_chnName),
          //     (AddProductInfo.Quantity = p.Quantity)
          //   this.ProductInfoList.push(AddProductInfo)
          // })
          // console.log(this.ProductInfoList);
          // console.log(this.isEdit);
          let flag = false
          this.addLoading = true
          this.addProduceList.forEach((item) => {
            if (Number(item.Quantity) > Number(item.RequestChangeQuantity)) {
              flag = true
            }
          })
          if (flag) {
            this.$message.error('换货数量不可大于申请数量,请调整！')
          } else {
            var str = ''
            this.addProduceList.forEach((item) => {
              console.log(item.Num)
              str +=
                item.Num + '◇' + item.Quantity + '◇' + item.ConfirmRemark + '◆'
            })
            let id = this.addProduceList[0].Id
            this.$api.exchangegoods
              .PlanConfirm({
                model: {
                  strMessage: '',
                  usercode: '',
                  id: id,
                  strList: str,
                },
              })
              .then((res) => {
                if (res.statusCode !== 200) {
                  this.$message({
                    message: res.message,
                    type: 'error',
                  })
                  this.addLoading = false
                } else {
                  this.$message({
                    message: '确认成功!',
                    type: 'success',
                  })
                  this.MainTableSearch()
                  this.$refs.addForm.resetFields()
                  this.$refs.mainRef.revertData()
                  this.addProduceList = [
                    {
                      P_Code: '',
                      NewProductNo: '',
                      P_chnName: '',
                      Quantity: null,
                    },
                  ]
                  this.$refs.addTable.revertData() //清空表格状态
                  this.delLength = []
                  this.addLoading = false
                  this.addAialogVisible = false //关闭弹出层
                }
              })
              .catch((err) => {
                console.log(err)
                this.addLoading = false
              })
              .finally(() => {
                this.$refs.addForm.resetFields()
                this.$refs.mainRef.revertData()
                this.addProduceList = [
                  {
                    P_Code: '',
                    NewProductNo: '',
                    P_chnName: '',
                    Quantity: null,
                  },
                ]
                this.addLoading = false
                this.$refs.addTable.revertData() //清空表格状态
                this.delLength = []
              })
          }
        })
      }
    },
    addcellClass({ row }) {
      if (Number(row.Quantity) > Number(row.RequestChangeQuantity)) {
        return 'addCellClass'
      } else {
        return 'cellClass'
      }
    },
    iconAddProduct() {
      if (this.addProduceList[this.addProduceList.length - 1].P_Code !== '') {
        let nullObj = {
          P_Code: '',
          NewProductNo: '',
          P_chnName: '',
          Quantity: null,
        }
        this.addProduceList.push(nullObj)
      } else {
        this.$message({
          message: '请点击“产品编码”下方的蓝色选择产品图标',
          type: 'error',
        })
      }
    },
    // 确认换货申请表
    editDbclick() {
      this.addTitle = '确认换货申请表'
      this.state = 'edit'
      this.addProduceList = [{ NewProductNo: '' }]
      this.addLoading = true
      this.delLength = this.$refs.mainRef.getCheckboxRecords()
      if (this.delLength.length < 1)
        return this.$message.error('请勾选一条数据后再做出操作')
      if (this.delLength.length > 1) {
        this.$message({
          message: '每次只能确认一条',
          type: 'error',
        })
      } else {
        // console.log(this.delLength[0].Status !== '新制');
        // if (this.delLength[0].Status !== '新制') {
        //   this.$message({
        //     message: '只有新制状态下的信息可以编辑',
        //     type: 'error',
        //   })
        // } else {
        this.isEdit = true
        this.$set(
          this.addFormParams,
          'DeliveryDate',
          this.delLength[0]['制单日期']
        )
        this.addFormParams.Shop = this.delLength[0]['站点']
        this.addFormParams.Remark = this.delLength[0]['备注']
        this.$api.exchangegoods
          .getOneProduct({
            id: this.delLength[0].ID,
          })
          .then((res) => {
            // console.log(res)
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              let Str = ''
              res.data.NewList.forEach((item) => {
                Str += item.NewShop + '◇' + item.P_Code + '◆'
              })
              // 调接口拿库存
              this.$api.exchangegoods
                .GetProductStockList({ productNos: Str })
                .then((res2) => {
                  // console.log(res)
                  if (res.statusCode !== 200) {
                    this.$message({
                      message: res.message,
                      type: 'error',
                    })
                  } else {
                    var list = res.data.NewList.filter((p) => {
                      return (
                        p.NewShop.trim() ===
                        this.delLength[0]['sourceshop'].trim()
                      )
                    })
                    list.forEach((item) => {
                      item.RequestChangeQuantity = Math.round(
                        Number(item.RequestChangeQuantity)
                      )
                      if (item.NewShop !== null) {
                        var index = this.allShop.findIndex((ITEM) => {
                          return ITEM.id.trim() === item.NewShop.trim()
                        })
                        if (index !== -1) {
                          item.NewShop = this.allShop[index].Name
                        }
                      }
                      res2.data.forEach((Item) => {
                        if (item.P_Code.trim() === Item.SKU.trim()) {
                          item['可售'] = Item.可售
                          item['平均周销量'] = Item.平均周销量
                          item['预留'] = Item.预留
                          item['在途'] = Item.在途
                          item['可销周数'] = Item.可销周数.toFixed(1)
                        }
                      })
                    })
                    this.addProduceList = list
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
                .finally(() => {})

              this.addFormParams = res.data.plan
              this.addLoading = false
            }
          })
          .catch((err) => console.log(err))
        this.addAialogVisible = true
      }
    },
    // 选择产品的信息
    iconChooseProduct(sign, row) {
      this.isSelectDisable = false
      this.chooseDaialogVisible = true
      this.chooseFormRuleForm.shopId = this.addFormParams.Shop //把添加的站点 给到请求产品参数
      this.sign = sign
      // console.log(sign);
      if (sign === 'newP') {
        this.rowId = row._XID //跟据rowid来添加
      }
      this.selectedRow = row
      // console.log(this.rowId)
      this.getProtect()
    },
    // 获取产品信息
    getProtect() {
      this.$api.business
        .ChooseProduct({ model: { ...this.chooseFormRuleForm } })
        .then((res) => {
          // console.log(res)
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
        .catch((err) => console.log(err))
    },
    // 查找产品信息
    searchProductList() {
      this.searchLoading = true
      this.chooseList = []
      this.$api.business
        .ChooseProduct({ model: { ...this.chooseFormRuleForm } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
            this.searchLoading = false
          } else {
            // console.log(res.data)
            this.chooseProduceList = res.data
            this.choosePageList()
            this.searchLoading = false
          }
        })
        .catch((err) => {
          console.log(err)
          this.searchLoading = false
        })
        .finally(() => {
          this.searchLoading = false
        })
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
      this.choosePaging.data = this.chooseProduceList //获得产品暂时表格数据
      //用来判断是不是新产品的参数
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
    // 当前页改变
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
    //新增换货产品
    addProduct() {
      this.state = 'add'
      this.addTitle = '新增换货申请表'
      this.isChinese = true
      // this.addFormParams.shop = this.shopList[0].Name
      this.addFormParams.Remark = ''
      this.getNowDateAdd()
      this.addAialogVisible = true
      this.addProduceList = []
      if (this.addProduceList.length) {
        return
      } else {
        let nullObj = {
          P_Code: '',
          NewProductNo: '',
          P_chnName: '',
          Quantity: null,
        }
        this.addProduceList.push(nullObj)
      }
    },
    // 选择产品信息表checkbox状态发生变化时触发
    onChooseCheckboxChange(row) {
      // console.log(row)
      this.checkedProjectNumber = row.records //选中的复选框个数
      if (row.checked) {
        this.chooseList.push(row.row)
        // this.getPriceParams.productnolist.push(row.row.产品号)
        this.getPriceParams.productnolist =
          this.getPriceParams.productnolist + row.row.产品号.trim() + '◆'
      } else {
        var Delindex = this.chooseList.findIndex((item, index) => {
          return item === row.row
        })
        this.chooseList.splice(Delindex, 1)
        this.getPriceParams.productnolist =
          this.getPriceParams.productnolist.replace(
            row.row.产品号.trim() + '◆',
            ''
          )
      }
    },
    // 插槽中的图标删除
    iconDelProduct(row) {
      let Index = this.addProduceList.findIndex((item) => {
        return item.P_Code == row.P_Code
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
    onChooseCheckboxAllChange(row) {
      if (row.checked) {
        this.$message.error('只能选择一条数据')
        this.chooseList = this.$refs.chooseTable.getCheckboxRecords()
      } else {
        this.chooseList = []
      }
    },
    checkMethodDisable(row) {
      return row.$rowIndex !== this.addProduceList.length - 1
    },
    //  确定按钮选择产品信息在
    chooseProduct() {
      // console.log(sign);
      if (this.checkedProjectNumber.length !== 1)
        return this.$message.error('只能选择一条数据')
      if (this.chooseList.length !== 1) {
        return this.$message.error('只能选择一条数据')
      }
      let concatArr = this.addProduceList
      let chooseObj = this.chooseList[0]
      if (
        !concatArr.some((item) => {
          return item.P_Code === chooseObj['产品号']
        })
      ) {
        // console.log(this.selectedRow)
        this.selectedRow[this.sign === 'oldP' ? 'P_Code' : 'NewProductNo'] =
          chooseObj['产品号']
        this.selectedRow[this.sign === 'oldP' && 'P_chnName'] =
          chooseObj['产品名称']
        this.selectedRow[this.sign === 'oldP' && 'Color'] = chooseObj['颜色']
        this.selectedRow[this.sign === 'oldP' && 'chnSpec'] = chooseObj['尺寸']
      } else {
        this.$message({
          message: '有重复勾选项，原产品不能和新产品选择一样，已删除',
          type: 'error',
        })
      }
      this.chooseList = []
      this.getPriceParams.shopid = this.addFormParams.Shop
      this.getPriceParams.Remark = this.addFormParams.Remark
      this.getPriceParams.InputDate = this.addFormParams.DeliveryDate
      this.$refs.chooseTable.revertData()
      this.$refs.chooseForm.resetFields()
      this.chooseDaialogVisible = false
    },
    // 获取站点列表(无权限)
    addAllProductState() {
      this.$api.publicApi
        .allShop()
        .then((res) => {
          // console.log(res);
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.allShop = res.data
            this.MainTableSearch()
          }
        })
        .then()
        .catch((err) => console.log(err))
    },
    // 获取站点列表
    addProductState() {
      this.$api.publicApi
        .basShop()
        .then((res) => {
          // console.log(res);
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.isLoadingShop = false
            this.shopList = res.data
            this.chooseFormRuleForm.shopId = this.shopList[0].id
            // this.$set(this.addFormParams, 'Shop', this.shopList[0].id)
            this.addFormParams.Shop = this.shopList[0].id
            this.AdjustmentList.SourceShop = this.shopList[0].id
          }
        })
        .then()
        .catch((err) => console.log(err))
    },
    // 获取站点列表(无权限)
    // addAllProductState() {
    //   this.$api.publicApi
    //     .allShop()
    //     .then((res) => {
    //       // console.log(res);
    //       if (res.statusCode !== 200) {
    //         this.$message({
    //           message: res.message,
    //           type: 'error',
    //         })
    //       } else {
    //         this.isLoadingShop = false
    //         this.allShopList = res.data
    //         // this.$set(this.addFormParams, 'Shop', this.shopList[0].id)
    //         this.addFormParams.Shop = this.allShopList[0].id
    //       }
    //     })
    //     .then()
    //     .catch((err) => console.log(err))
    // },
    cancel() {
      this.addAialogVisible = false
      this.$refs.addForm.resetFields()
    },

    // 第一层弹出层取消
    handleClose() {
      this.isEdit = true
      this.$refs.addForm.resetFields()
      // this.addProduceList = [{ 产品号: '' }]
      this.addAialogVisible = false
    },
    //
    // selectChangeEvent() {},
    // 调整后数量改变触发
    ptypeChangeEvent(column) {
      // console.log(column)
      this.$set(this.addProduceList, '调整后数量', '')
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
      let month1 = monthDate.getMonth() + 1
      month1 = month1 < 10 ? '0' + month1 : month1
      let date1 = monthDate.getDate()
      date1 = date < 10 ? '0' + date1 : date1
      var startTime = monthDate.getFullYear() + '-' + month1 + '-' + date1
      this.addFormParams.DeliveryDate = toMonth
      this.AdjustmentList.EndDate = toMonth
      this.AdjustmentList.beginDate = startTime
    },
    getNowDateAdd() {
      // 拿到当前时间
      let nowDate = new Date()
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let date = nowDate.getDate()
      date = date < 10 ? '0' + date : date
      var toMonth = year + '-' + month + '-' + date
      this.$set(this.addFormParams, 'DeliveryDate', toMonth)
    },
    //报批
    reportItem() {
      var data = []
      data.push(...this.$refs.mainRef.getCheckboxRecords())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条数据后操作!',
          type: 'error',
        })
      } else {
        var ID = data[0].ID
        // console.log(data[0].ID);
        this.showReportDialog = true
        this.$nextTick(() => {
          this.$refs.ReportApproval.formInfo.ObjectCode = '0114'
          this.$refs.ReportApproval.formInfo.Key = ID
          this.$refs.ReportApproval.showDialog = true
        })
      }
    },
    //报批完成后
    ReportOkDialog() {
      this.MainTableSearch()
    },
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        this.gridHeight = card - queryRow - 80
      })
    },
  },
  computed: {},
  beforeCreate() {},
  created() {
    this.addProductState()
    this.addAllProductState()
    this.getNowDate()
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
// .el-container {
// width: 100%;
// height: 100%;
// background-color: #f5f8ff;
>>> .cardMargin {
  margin-top: 0px !important;
}
>>> .blockSpan {
  display: flex;
  width: 100%;
  height: 32px;
  justify-content: start;
  border-radius: 4px;
  border: 1px solid #c7c6de;
}
>>> .blockSpan {
  .el-form-item__content {
    margin-left: 5px;
  }
}
>>> .listDate .el-input__inner {
  height: 30px;
  padding: 0 0 0 5px;
  width: 90px;
  border-radius: 4px 0 0 4px;
}
// 控制表格行高
>>> .vxe-table--render-default .vxe-body--column,
.vxe-table--render-default .vxe-footer--column,
.vxe-table--render-default .vxe-header--column {
  line-height: 15px;
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
  width: 100% !important;
  border: none;
}
>>> .blockDate .el-input__icon {
  height: 30px;
}
>>> .blockDate .el-range-separator {
  height: 30px;
  padding: 0;
}
// >>> .vxe-header--column .vxe-cell--edit-icon,
// .vxe-header--column .vxe-cell-help-icon {
//   display: none;
// }
>>> .mainForm .el-form-item__content {
  line-height: normal;
}
>>> .mainForm .el-form-item__label {
  line-height: 30px;
}
>>> .mainForm .marginLeft {
  margin-left: 0px;
}
>>> .searchMargin {
  margin-left: 15px;
  margin-bottom: 0;
}
>>> .el-input__suffix {
  right: 5px;
}
>>> .searchTerm {
  display: flex;
  justify-content: flex-start;
}
>>> .footerCellClassName {
  text-align: center;
  height: 30px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  color: #333;
  background: #d1f3ff;
}
>>> .cellCorlor4 {
  background: #d0eaff;
  text-align: center;
  font-size: 12px;
  color: #333;
  font-family: Microsoft YaHei;
  height: 30px;
}
>>> .el-card {
  width: 100%;
  margin-top: 11px;
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
>>> .el-card__body {
  padding: 10px;
}
>>> .searchCondition {
  display: flex;
  justify-content: flex-start;
  .searchConditionShop {
    margin-right: 30px;
  }
}
>>> .searchBtn {
  width: 70px !important;
  height: 30px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 12px;
  margin-top: 5px;
}
>>> .searchBtn1 {
  width: 70px !important;
  height: 32px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
// >>>.mainTable .el-card {
//   // height: 100%;
// }
>>> .marginLeft {
  margin-left: 22px;
}
>>> .delBtn {
  width: 70px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
>>> .del2Btn {
  width: 70px !important;
  background: #ccc !important;
  border: 1px solid #ccc !important;
}
>>> .choose2Btn {
  background: #ccc !important;
  border: 1px solid #ccc !important;
}
>>> .el-checkbox {
  line-height: 30px;
}
>>> .secondBtn {
  margin-top: 11px;
  font-size: 14px;
  color: #333;
  .smBtn {
    width: 70px !important;
  }
  .sBtn {
    width: 90px !important;
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
>>> .hearderClass {
  text-align: center;
  font-size: 14px;
  color: #333;
  font-family: Microsoft YaHei;
  height: 30px;
  background-color: #d5deff;
}
>>> .cellClass,
>>> .cellChooseClass {
  text-align: center;
  font-size: 12px;
  color: #333;
  font-family: Microsoft YaHei;
  height: 36px;
}
>>> .addCellClass {
  text-align: center;
  font-size: 12px;
  color: red;
  font-family: Microsoft YaHei;
  height: 36px;
}
>>> .cellClass2 {
  text-align: center;
  font-size: 12px;
  color: #333;
  font-family: Microsoft YaHei;
  height: 40px;
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
  width: 90px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #5473e8;
  border: 1px solid #5473e8 !important;
}
>>> .el-button + .el-button {
  margin-left: 0px;
}
>>> .el-button--primary {
  border-color: #5473e8;
}
>>> .text {
  height: 52px;
}
>>> .saveBtn1 {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #ccc;
  border: 1px solid #ccc !important;
}

>>> .marginLeft {
  margin-left: -62px;
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
>>> .saveAnd1 {
  width: 100px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #ccc;
  border: 1px solid #ccc !important;
}
>>> .sizeMarginLeft {
  margin-left: -50px;
}
>>> .chooseEnter {
  width: 70px;
  height: 32px;
  background: #5473e8;
  border-radius: 2px;
  line-height: 32px;
  padding: 0;
}
//
>>> .Bottom-Border input {
  border: none !important;
  border-radius: 0px;
  border-bottom: 1px solid #bbb !important;
}
>>> .None-Border input {
  border: none !important;
  outline: none !important;
}
>>> .unifySize {
  width: 100% !important;
  height: 30px;
}
>>> .unifySize1 {
  width: 100%;
  height: 30px;
}
>>> .None-Border {
  height: 100%;
}
>>> .unifySize input {
  height: 30px;
}
>>> .unifySize1 input {
  height: 30px;
}
>>> .unifySize .el-input {
  width: 100%;
}
>>> .el-input__inner input {
  width: 100% !important;
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
>>> .chooseCancel {
  width: 70px;
  height: 32px;
  background: #908fa0;
  border-radius: 2px;
  color: #fff;
  line-height: 32px;
  padding: 0;
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
.pagination {
  float: right;
  margin-top: 20px;
}
>>> .unifySize .el-input__icon {
  line-height: normal;
}
>>> .el-form-item__label {
  padding: 0;
}
>>> .iconP {
  font-size: 22px;
  color: #5473e8;
  float: right;
  transform: rotate(90deg);
}
.iconC {
  font-size: 22px;
  color: #5473e8;
}
>>> .el-dialog {
  height: 780px;
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
>>> .NullTip {
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 400px;
  transform: translate(-50%, 50%);
}
>>> .vxe-table--render-default.size--mini {
  user-select: text;
}
</style>