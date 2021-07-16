<template>
  <div>
    <el-form
      ref="addForm"
      :model="formInline"
      :rules="addRules"
      style="font-size：14px"
      label-width="84px"
    >
      <el-row>
        <!-- 登记表单 -->
        <el-card>
          <el-col :span="24">
            <el-col :span="16">
              <el-form-item
                class="searchMargin special"
                prop="ConsignName"
                label-width="100px"
                label="发货申请单："
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="鼠标双击清空内容"
                  placement="top"
                >
                  <vxe-input
                    :readonly="true"
                    @dblclick="clearCabinOrderNo"
                    class="unifySize"
                    v-model="formInline.ConsignName"
                  ></vxe-input>
                </el-tooltip>
                <i
                  class="iconP iconfont kt-icon-daoru choose"
                  @click="chooseProduct"
                ></i>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                label="订单号："
                label-width="100px"
                prop="PlanNo"
              >
                <el-input
                  v-model.trim="formInline.PlanNo"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                label-width="100px"
                label="站点："
                prop="PriceTerm"
              >
                <!-- 组件中是数组 -->
                <!-- <el-checkbox-group
                  v-model="shopData" 
                >
                  <el-checkbox v-for="(item, index) in shopList" :key="index">{{
                    item.Name
                  }}</el-checkbox>
                </el-checkbox-group> -->
                <vxe-checkbox-group v-model="shopData">
                  <vxe-checkbox
                    :label="item.id"
                    :content="item.Name"
                    v-for="(item, index) in shopList"
                    :key="index"
                  ></vxe-checkbox>
                </vxe-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-top: 10px">
              <el-form-item
                class="searchMargin"
                label-width="100px"
                style="margin-bottom: 0px"
                label="发货日期："
                prop="Deliver"
              >
                <el-date-picker
                  class="unifySize"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  v-model="formInline.Deliver"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-top: 10px">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                prop="Country"
                label="国家："
              >
                <el-select
                  clearable
                  v-model="formInline.Country"
                  class="unifySize"
                  placeholder="请选择"
                >
                  <el-option
                    :key="index"
                    v-for="(item, index) in countryList"
                    :label="
                      item.AreaFlag.trim() + '[' + item.StateChNm.trim() + ']'
                    "
                    :value="item.StateID"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-top: 10px">
              <el-form-item
                class="searchMargin"
                label-width="100px"
                style="margin-bottom: 0px"
                prop="Currency"
                label="币种："
              >
                <el-select
                  clearable
                  v-model="formInline.Currency"
                  class="unifySize"
                  @change="changeCurrency"
                  placeholder="请选择"
                >
                  <el-option
                    :key="index"
                    v-for="(item, index) in currencyList"
                    :label="item.chnName"
                    :value="item.currency"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-top: 10px">
              <el-form-item
                class="searchMargin special"
                style="margin-bottom: 0px"
                label-width="100px"
                prop="SailDate"
                label="船期："
              >
                <el-date-picker
                  class="unifySize"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  v-model="formInline.SailDate"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-top: 10px">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                label="到货日期："
                prop="ArrivalDate"
              >
                <el-date-picker
                  class="unifySize"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  v-model="formInline.ArrivalDate"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-top: 10px">
              <el-form-item
                class="searchMargin special"
                style="margin-bottom: 0px"
                label-width="100px"
                prop="RMBRate"
                label="汇率："
              >
                <el-input
                  class="unifySize"
                  v-model="formInline.RMBRate"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin: 10px 0">
              <el-form-item
                class="searchMargin"
                label="运输类型："
                label-width="100px"
                prop="ContainerType"
              >
                <el-select
                  clearable
                  v-model="formInline.ContainerType"
                  class="unifySize"
                  placeholder="请选择"
                >
                  <el-option
                    :key="index"
                    v-for="(item, index) in containerTypeList"
                    :label="item.Name"
                    :value="item.Code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-top: 10px">
              <el-form-item
                class="searchMargin"
                label="出口公司："
                prop="Company"
              >
                <el-select
                  clearable
                  v-model="formInline.Company"
                  class="unifySize"
                  placeholder="请选择"
                >
                  <el-option
                    :key="index"
                    v-for="(item, index) in exportCompanyList"
                    :label="item.ChsName"
                    :value="item.CompanyCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-top: 10px">
              <el-form-item
                class="special"
                style="margin-bottom: 0px"
                label-width="115px"
                label="货代："
                prop="TcorpName"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="鼠标双击清空内容"
                  placement="top"
                >
                  <vxe-input
                    :readonly="true"
                    @dblclick="clearTcorpName"
                    class="unifySize"
                    v-model="formInline.TcorpName"
                  ></vxe-input>
                </el-tooltip>
                <i
                  class="iconP iconfont kt-icon-daoru choose"
                  @click="openFreight"
                ></i>
              </el-form-item>
            </el-col>
          </el-col>
        </el-card>
        <!-- 出货信息 -->
        <el-card class="shippingInfo">
          <div class="info">出货信息</div>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                label="总箱数："
                prop="TotalCartons"
              >
                <el-input
                  v-model="formInline.TotalCartons"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                label="总件数："
                prop="TotalPackages"
              >
                <el-input
                  v-model="formInline.TotalPackages"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                label="立方数："
                prop="CubeNumber"
              >
                <el-input
                  v-model="formInline.CubeNumber"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-top: 10px">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                label="总片数："
                prop="TotalPieces"
              >
                <el-input
                  v-model="formInline.TotalPieces"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-top: 10px; margin-bottom: 10px">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                label="重量："
                prop="TotalWeight"
              >
                <el-input
                  v-model="formInline.TotalWeight"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-card>
        <!-- 关税信息 -->
        <el-card class="shippingInfo">
          <div class="info">关税信息(外币)</div>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                label="清关金额："
                prop="ClearAmount"
              >
                <el-input
                  v-model="formInline.ClearAmount"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                label="产品税率："
                prop="ProductTaxRate"
              >
                <el-input
                  v-model="formInline.ProductTaxRate"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                class="searchMargin"
                label-width="110px"
                style="margin-bottom: 0px"
                label="产品税率额："
                prop="ProductTaxAmount"
              >
                <el-input
                  v-model="formInline.ProductTaxAmount"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-top: 10px; margin-bottom: 10px">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                label="其他税率："
                prop="OtherTaxRate"
              >
                <el-input
                  v-model="formInline.OtherTaxRate"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-top: 10px; margin-bottom: 10px">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                label="其他税额："
                prop="OtherTaxAmount"
              >
                <el-input
                  v-model="formInline.OtherTaxAmount"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-top: 10px; margin-bottom: 10px">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                label-width="110px"
                label="合计税额："
                prop="TotalTaxAmount"
              >
                <el-input
                  v-model="formInline.TotalTaxAmount"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-card>
        <!-- 运费信息 -->
        <el-card class="shippingInfo">
          <div class="info">运费信息</div>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                label="运费价格："
                prop="Price"
              >
                <el-input
                  v-model="formInline.Price"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                class="searchMargin"
                label-width="110px"
                style="margin-bottom: 0px"
                label="运费金额："
                prop="Amount1"
              >
                <el-input
                  v-model="formInline.Amount1"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                class="searchMargin"
                label-width="130px"
                style="margin-bottom: 0px"
                label="其他费："
                prop="Amount2"
              >
                <el-input
                  v-model="formInline.Amount2"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-top: 10px; margin-bottom: 10px">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                label="外币金额："
                prop="USDAmount"
              >
                <el-input
                  v-model="formInline.USDAmount"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-top: 10px; margin-bottom: 10px">
              <el-form-item
                class="searchMargin"
                label-width="110px"
                style="margin-bottom: 0px"
                label="人民币金额："
                prop="Amount"
              >
                <el-input
                  v-model="formInline.Amount"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-top: 10px; margin-bottom: 10px">
              <el-form-item
                class="searchMargin"
                style="margin-bottom: 0px"
                label-width="130px"
                label="合计人民币金额："
                prop="RMBAmount"
              >
                <el-input
                  v-model="formInline.RMBAmount"
                  class="unifySize"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注：" label-width="100px" prop="Remark">
                <el-input
                  type="textarea"
                  class="resizeNone"
                  v-model="formInline.Remark"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-card>
        <el-col>
          <el-upload
            class="uploader"
            :show-file-list="false"
            :action="action"
            :headers="myheader"
            :data="{ TypeValue: 5 }"
            :on-success="uploadSuccess"
            :auto-upload="true"
            ref="uploadInner"
          >
            <div class="el-upload__text">
              <em>上传附件。。。</em>
            </div>
          </el-upload>
          <el-card class="showOssData">
            <el-row>
              <el-col
                :span="8"
                v-for="(item, index) in this.updataList"
                :key="index"
              >
                <el-card class="imgShow">
                  <div class="mainContain">
                    <div @click="handleDownload(item)" class="FullName">
                      {{ item.FullName }}
                    </div>
                    <div class="bottom">
                      <el-button type="text" @click="delUploader(item)"
                        >删除</el-button
                      >
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-form>
    <span style="float: right" slot="footer" class="remarkFooter dialog-footer">
      <el-row>
        <el-col>
          <el-button
            type="primary"
            class="saveBtn iconfont kt-icon-baocun"
            :loading="saveLoading"
            @click="CDocumentOperation"
            >保 存</el-button
          >
          <el-button type="primary" @click="cancle" class="clearBtn"
            >取 消</el-button
          >
        </el-col>
      </el-row>
    </span>
    <!-- 选择单号信息 -->
    <JyDialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="dialogParam.title"
      :visible.sync="dialogParam.isShowDialog"
      top="10px"
      v-if="dialogParam.isShowDialog"
      :width="dialogParam.width"
      append-to-body
    >
      <div
        :style="{
          height: '700px',
          overflow: 'auto',
          position: 'relative',
        }"
      >
        <choose-packing
          v-if="dialogParam.name === 'ChooseProduct'"
          :shopList="shopList"
          @closeDialog="closeDialog"
          @fatherMethod="fatherMethod"
        ></choose-packing>
        <!-- <customer-info
          v-if="dialogParam.name === 'customerInfo'"
          @closeDialog="closeDialog"
          @fatherMethod="fatherMethod1"
        ></customer-info>
        <transport-info
          v-if="dialogParam.name === 'transportInfo'"
          @closeDialog="closeDialog"
          @fatherMethod="fatherMethod2"
        ></transport-info> -->
        <choose-freight
          v-if="dialogParam.name === 'ChooseFreight'"
          @closeDialog="closeDialog"
          @ChooseFreightData="fatherData"
        ></choose-freight>
      </div>
    </JyDialog>
  </div>
</template>
<script>
import JyTableInput from '@/components/JyTableInput/index'
import Cookies from 'js-cookie'
import ChoosePacking from './ChoosePacking'
import ChooseFreight from './ChooseFreight'
import JyDialog from '@/components/JyDialog/index'
// import transportInfo from './transportInfo'
// import deliverGoods from './deliverGoods'
// import { cookie } from 'xe-utils/methods'
export default {
  components: {
    JyTableInput,
    ChoosePacking,
    ChooseFreight,
    JyDialog
  },
  props: {
    EditList: [Array, Object],
    isEdit: Boolean,
    shopList: Array,
    containerTypeList: {
      trpe: Array,
      required: true,
    },
    currencyList: Array,
    countryList: Array,
    exportCompanyList: Array,
    FreightCode: String,
    // PortInfoList: Array,

    // formList: String,
  },
  name: 'Fadd',
  data() {
    return {
      footerCellClassName: 'footerCellClassName',
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      transportType: 0,
      remarkList: [],
      CommodityList: [],
      formInline: {
        FreightCode: '', //单据编号
        ConsignName: '', //显示name
        ConsignCode: '', //发货申请编号
        TcorpCode: '', //货代
        TcorpName: '', //货代名字
        ContainerType: '', //运输类型
        Currency: '', //币种
        SailDate: '', //船期
        RMBRate: null, //汇率
        Amount1: null, //运费金额
        Amount2: null, //其他费
        USDAmount: null, //外币金额
        RMBAmount: '', //合计人民币金额
        Remark: '', //说明
        Deliver: '', //发货日期
        Country: '', //国家code
        ArrivalDate: '', //到货日期
        TotalCartons: null, //总箱数
        TotalPackages: null, //总件数
        CubeNumber: null, //立方数
        TotalPieces: '', //总片数
        ClearAmount: null, //清关金额
        ProductTaxRate: null, //产品税率
        ProductTaxAmount: null, //产品税金额
        OtherTaxRate: null, //其他税率
        OtherTaxAmount: null, //其他税额
        TotalTaxAmount: null, //合计税额
        Price: null, //运费价格
        Company: '', //出口公司
        TotalWeight: null, //总重量
        PlanNo: '', //订单号
        Shop: '', //站点，多个站点用逗号隔开
        LsOrderNo: '',
        Amount: '', //人民币金额
      },
      shopData: [], //选择的站点集合
      addRules: {
        ConsignName: [
          { required: true, message: '请选择发货申请编号', trigger: 'change' },
        ],
        TcorpName: [
          { required: true, message: '请选择货代', trigger: 'change' },
        ],
        ContainerType: [
          { required: true, message: '请选择运输类型', trigger: 'change' },
        ],
        Currency: [
          { required: true, message: '请选择币种', trigger: 'change' },
        ],
        SailDate: [
          { required: true, message: '请选择船期', trigger: 'change' },
        ],
        RMBRate: [
          { required: true, message: '汇率是必填项', trigger: 'change' },
        ],
        Amount1: [{ required: true, message: '运费金额', trigger: 'change' }],
        Amount2: [{ required: true, message: '其他费', trigger: 'change' }],
        USDAmount: [{ required: true, message: '外币金额', trigger: 'change' }],
        RMBAmount: [
          { required: true, message: '合计人民币金额', trigger: 'change' },
        ],
        Deliver: [{ required: true, message: '发货日期', trigger: 'change' }],
        Country: [{ required: true, message: '国家', trigger: 'change' }],
        ArrivalDate: [
          { required: false, message: '到货日期', trigger: 'blur' },
        ],
        TotalCartons: [
          { required: true, message: '总箱数', trigger: 'change' },
        ],
        TotalPackages: [
          { required: true, message: '总件数', trigger: 'change' },
        ],
        CubeNumber: [{ required: false, message: '立方数', trigger: 'change' }],
        TotalPieces: [{ required: true, message: '总片数', trigger: 'change' }],
        ClearAmount: [
          { required: false, message: '清关金额', trigger: 'change' },
        ],
        ProductTaxRate: [
          { required: false, message: '产品税率', trigger: 'change' },
        ],
        ProductTaxAmount: [
          { required: false, message: '产品税金额', trigger: 'change' },
        ],
        OtherTaxRate: [
          { required: false, message: '其他税率', trigger: 'blur' },
        ],
        OtherTaxAmount: [
          { required: false, message: '其他税额', trigger: 'blur' },
        ],
        TotalTaxAmount: [
          { required: false, message: '合计税额', trigger: 'blur' },
        ],
        Remark: [
          { required: false, message: '其他注意事项：', trigger: 'blur' },
        ],
        Price: [{ required: true, message: '运费价格', trigger: 'change' }],
        Company: [{ required: true, message: '出口公司', trigger: 'change' }],
        TotalWeight: [
          { required: false, message: '总重量', trigger: 'change' },
        ],
        PlanNo: [{ required: false, message: '订单号', trigger: 'change' }],
        Shop: [{ required: false, message: '站点', trigger: 'change' }],
        Amount: [{ required: true, message: '人民币金额', trigger: 'change' }],
      },
      StatusList: [
        { id: '01', name: '新制' },
        { id: '02', name: '待审批' },
        { id: '03', name: '已审批' },
        { id: '04', name: '审批不通过' },
      ],
      // PaymentList: [],
      // currencyList: [],
      CarPlanNoList: '', //获取出货信息的请求数据,多个逗号分隔
      // shopList: [],
      dialogParam: {
        title: '',
        type: '',
        name: '',
        width: '60%',
        isShowDialog: false,
      },
      saveLoading: false,
      saveReportLoading: false,
      updataList: [], //文件
      filesArray: [], //传给后端的数据
      Imgurl: 'http://lqtex.oss-cn-hangzhou.aliyuncs.com/', //前端显示图片
      action: '/api/Public/GetPostFiles',
      myheader: { Authorization: Cookies.get('token') },
    }
  },
  created() {
    this.getNowDate()
    //收汇方式列表
    // this.addPaymentDate()
    // this.addProductCurrency()
    // this.addProductState()
    // this.addTrafficList()
    this.IsEdit()
  },
  methods: {
    //新增修改触发
    IsEdit() {
      if (this.isEdit) {
        //修改
        console.log(this.EditList.freightlist)
        this.formInline = this.EditList.freightlist[0]
        this.formInline.FreightCode = this.FreightCode
        this.formInline.ConsignName =
          this.EditList.freightlist[0].DeliveryPlanCode
        this.shopData = this.EditList.freightlist[0].Shop.split(',')
        this.$set(
          this.formInline,
          'Country',
          this.EditList.freightlist[0].Country.trim()
        )
        this.$set(
          this.formInline,
          'ContainerType',
          this.EditList.freightlist[0].ContainerType.trim()
        )
        this.$set(
          this.formInline,
          'Company',
          this.EditList.freightlist[0].Company.trim()
        )
        this.EditList.filelist.forEach((item) => {
          this.updataList.push({
            FullName: item.ImageName,
            Url: item.LinkUrl,
          })
        })
      } else {
        this.containerTypeList.forEach((item) => {
          if (item.Code == '1') {
            var showDate = item.Code
            this.$set(this.formInline, 'ContainerType', showDate)
          }
        })
        this.$set(this.formInline, 'Currency', this.currencyList[0].currency)
        this.$set(
          this.formInline,
          'Company',
          this.exportCompanyList[0].CompanyCode
        )
        this.getExchangeRateList()
      }
    },
    // 币种下拉事件
    changeCurrency() {
      this.getExchangeRateList()
    },
    // 获取汇率数据
    getExchangeRateList() {
      this.$api.FreightManagement.getExchangeRate({
        Currency: this.formInline.Currency,
      }).then((res) => {
        // console.log(res)
        if (res.statusCode != 200) return this.$message(res.data.message)
        this.formInline.RMBRate = res.data[0].RMBrate
      })
    },
    //新增/修改保存接口
    CDocumentOperation() {
      //新增
      this.$refs.addForm.validate((valid) => {
        if (!valid) return this.$message.error('请填写必填项')
        if (this.shopData.length > 1) {
          this.formInline.Shop = this.shopData.join(',')
        }
        if (this.updataList.length > 0) {
          ;(this.filesArray = []),
            this.updataList.forEach((item) => {
              this.filesArray.push({
                ImageType: '',
                // ImageType: item.ContentType,
                ImageName: item.FullName,
                LinkUrl: item.Url,
              })
              // array.ImageType = item.ContentType,
            })
        }
        this.saveLoading = true
        this.saveReportLoading = true
        this.$api.FreightManagement.AddFreight({
          model: { ...this.formInline, files: this.filesArray },
        })
          .then((res) => {
            console.log(res)
            if (res.statusCode != 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.$message.success('保存成功')
              this.updataList = []
              this.filesArray = []
              this.shopData = []
              this.$emit('closeDialog')
              // this.delLength = []
            }
          })
          .catch((err) => console.log(err))
          .finally(() => {
            this.saveLoading = false
            this.saveReportLoading = false
          })
      })
    },
    // 清空发货单号输入框数据和table中的数据
    clearCabinOrderNo() {
      this.formInline.ConsignName = ''
      this.formInline.ConsignCode = ''
      this.formInline.ArrivalDate = ''
      this.formInline.TotalPackages = ''
      this.formInline.TotalPieces = ''
      this.formInline.TotalCartons = ''
    },
    // 取消按钮
    cancle() {
      this.$refs.addForm.resetFields()
      this.$emit('closeDia')
    },
    fatherMethod(data) {
      this.formInline.ConsignName = ''
      this.formInline.ConsignCode = ''
      data.map((item) => {
        this.formInline.ConsignName += item.发货申请单号.trim() + ','
        this.formInline.ConsignCode += item.ID + ','
      })
      this.formInline.ConsignName = this.formInline.ConsignName.substring(
        this.formInline.ConsignName.length - 1,
        1
      )
      if (data.length > 0) {
        //获取表格数据
        this.$api.FreightManagement.GetShipment({
          ConsignCode: this.formInline.ConsignCode,
        })
          .then((res) => {
            if (res.statusCode != 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.formInline.ArrivalDate = res.data.DepotInDate
              this.formInline.TotalPackages = res.data.RollNum
              this.formInline.TotalPieces = res.data.TotalPS
              this.formInline.TotalCartons = res.data.TotalQuantity
            }
          })
          .catch((err) => console.log(err))
      }
    },
    // 清空货代
    clearTcorpName() {
      this.formInline.TcorpName = ''
      this.formInline.TcorpCode = ''
    },
    fatherData(data) {
      // 货代的数据
      // console.log(data)
      this.formInline.TcorpName = data[0].中文名称
      this.formInline.TcorpCode = data[0].TCorpCode
    },
    // 货代
    openFreight() {
      this.dialogParam = {
        title: '运输服务货代公司',
        type: '',
        name: 'ChooseFreight',
        width: '60%',
        isShowDialog: true,
      }
    },
    // 分页结束
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
      // this.$set(this.formInline, 'LeaveDate', toMonth)
      // this.$set(this.formInline, 'EDT', toMonth)
    },
    uploadSuccess(response, file, fileList) {
      this.updataList.push(...response.data)
      console.log(this.updataList)
    },
    handleDownload(item) {
      console.log(item.Url)
      window.open(this.Imgurl + item.Url)
    },
    delUploader(itemData) {
      let index = this.updataList.findIndex((item) => {
        return item === itemData
      })
      this.updataList.splice(index, 1)
    },
    // 选择发货申请单
    chooseProduct() {
      this.formInline.cabinOrderNo = ''
      this.dialogParam = {
        title: '选择发货申请单',
        name: 'ChooseProduct',
        type: '',
        width: '70%',
        isShowDialog: true,
      }
    },
    closeDialog() {
      this.dialogParam.isShowDialog = false
    },
    // 选择弹出框关闭前的回调
    choooseClose() {
      this.chooseList = []
      this.chooseParams.DeliveryPlanCode = ''
      this.$refs.chooseForm.resetFields()
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
  },
}
</script>

<style lang="scss" scoped>
>>> .editRemark {
  .el-form-item__content {
    width: 100%;
    margin-left: 10px !important;
  }
  .el-select {
    width: 100%;
  }
}
>>> .priceM {
  .el-textarea {
    padding-top: 5px;
  }
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
.saveBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #5473e8;
  border: 1px solid #5473e8 !important;
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
>>> .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 8px;
}
>>> .unifySize .vxe-input__icon {
  line-height: normal;
}
>>> .el-textarea__inner {
  width: 450px;
}
>>> .remarkFooter {
  position: absolute;
  bottom: -7px;
  right: 10px;
}
>>> .hearderClass {
  text-align: center;
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  height: 34px;
  color: #333;
  background-color: #d5deff;
}
.clearBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  color: #fff;
  background-color: #908fa0;
  border: 1px solid #908fa0 !important;
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
.special {
  position: relative;
  .choose {
    position: absolute;
    top: 0;
    right: -20px;
  }
}
.iconP {
  font-size: 22px;
  color: #5473e8;
  float: right;
  transform: rotate(90deg);
}
>>> .el-textarea__inner {
  width: 100%;
}
// 文字提示
>>> .el-textarea__inner {
  height: 50px;
}
.resizeNone {
  .el-textarea__inner {
    //el_input中的隐藏属性
    resize: none; //主要是这个样式
  }
}
>>> .cellClass {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 40px;
}
>>> .footerCellClassName {
  background: #d1f3ff;
}
>>> .el-dialog .el-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
.shippingInfo {
  margin-top: 5px;
  position: relative;
  .info {
    position: absolute;
    top: 0;
    font-size: 16px;
    font-weight: 800;
    left: 2px;
  }
}
.el-upload__text {
  width: 120px;
  border-radius: 2px;
  height: 30px;
  line-height: 30px;
  background-color: #f0f0f0;
}
.imgShow {
  background-color: #e3eaf4;
  position: relative;
}
.mainContain {
  display: flex;
}
.bottom {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer !important;
}
.FullName {
  cursor: pointer !important;
  color: #0f6099;
  height: 20px;
}
.showOssData {
  height: 60px;
  overflow-y: auto;
}
>>> .el-card__body {
  padding: 10px 20px;
}
</style>
