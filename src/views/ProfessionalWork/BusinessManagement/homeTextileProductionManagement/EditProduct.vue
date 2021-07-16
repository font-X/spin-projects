<template>
  <div>
    <el-form
      ref="addForm"
      :model="formInline"
      :rules="addRules"
      style="font-size：14px"
      label-width="140px"
    >
      <el-row>
        <!-- 左侧输入框 -->
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
              label="生产产品号SKU："
              prop="InvoiceNo"
            >
              <el-input
                v-model="formInline.InvoiceNo"
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
              label="产品名称："
              
              prop="InvoiceNo"
            >
              <el-input
                v-model="formInline.InvoiceNo"
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
              label="大类："
              
              prop="InvoiceNo"
            >
              <el-input
                v-model="formInline.InvoiceNo"
                class="unifySize"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="8" style="margin-top: 10px">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
              
              prop="CreditNo"
              label="样式："
            >
              <el-input
                class="unifySize"
                v-model="formInline.CreditNo"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-top: 10px">
            <el-form-item
              class="searchMargin"
              
              label="面料材质："
              prop="Payment1"
            >
              <el-select
                clearable
                v-model="formInline.Payment1"
                class="unifySize"
                placeholder="请选择"
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in PaymentList"
                  :label="item.Remark"
                  :value="item.PayMode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-top: 10px">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
             
              label="面料工艺："
            >
              <el-input
                disabled
                v-model="formInline.ShopName"
                class="unifySize"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="8" style="margin-top: 10px">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
          
              prop="CreditNo"
              label="花型号："
            >
              <el-input
                class="unifySize"
                v-model="formInline.CreditNo"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-top: 10px">
            <el-form-item
              class="searchMargin"
             
              label="花型："
              prop="Payment1"
            >
              <el-select
                clearable
                v-model="formInline.Payment1"
                class="unifySize"
                placeholder="请选择"
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in PaymentList"
                  :label="item.Remark"
                  :value="item.PayMode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-top: 10px">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
             
              label="色号："
            >
              <el-input
                disabled
                v-model="formInline.ShopName"
                class="unifySize"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="8" style="margin-top: 10px">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
              
              prop="CreditNo"
              label="颜色："
            >
              <el-input
                class="unifySize"
                v-model="formInline.CreditNo"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-top: 10px">
            <el-form-item
              class="searchMargin"
             
              label="尺寸："
              prop="Payment1"
            >
              <el-select
                clearable
                v-model="formInline.Payment1"
                class="unifySize"
                placeholder="请选择"
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in PaymentList"
                  :label="item.Remark"
                  :value="item.PayMode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-top: 10px">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
             
              label="尺寸单位："
            >
              <el-input
                disabled
                v-model="formInline.ShopName"
                class="unifySize"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="8" style="margin-top: 10px">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
              
              prop="CreditNo"
              label="是否启用："
            >
              <el-input
                class="unifySize"
                v-model="formInline.CreditNo"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-top: 10px">
            <el-form-item
              class="searchMargin"
              
              label="系数："
              prop="Payment1"
            >
              <el-select
                clearable
                v-model="formInline.Payment1"
                class="unifySize"
                placeholder="请选择"
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in PaymentList"
                  :label="item.Remark"
                  :value="item.PayMode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-top: 10px">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
              
              label="属性："
            >
              <el-input
               
                v-model="formInline.ShopName"
                class="unifySize"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="8" style="margin-top: 10px">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
              
              prop="CreditNo"
              label="是否采购："
            >
              <el-input
                class="unifySize"
                v-model="formInline.CreditNo"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-top: 10px">
            <el-form-item
              class="searchMargin"
             
              label="裁剪尺寸："
              prop="Payment1"
            >
              <el-select
                clearable
                v-model="formInline.Payment1"
                class="unifySize"
                placeholder="请选择"
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in PaymentList"
                  :label="item.Remark"
                  :value="item.PayMode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-top: 10px">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
             
              label="描述："
            >
              <el-input
                
                v-model="formInline.ShopName"
                class="unifySize"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
              label="工艺要求："
            >
              <el-input
                type="textarea"
                v-model="formInline.ShopName"
                class="unifySize"
              ></el-input>
            </el-form-item>
        </el-col>
        <!-- </el-col> -->
      </el-row>
       <el-row style="height: 180px">
        <vxe-grid
          border
          ref="addTable"
          resizable
          stripe
          keep-source
          class="mytable-scrollbar"
          :auto-resize="true"
          style="margin-top: 11px"
          show-overflow="title"
          width="auto"
          height="130"
          highlight-current-row
          :edit-config="{ trigger: 'click', mode: 'cell' }"
          :align="'center'"
          :checkbox-config="{
            highlight: true,
          }"
          :header-cell-class-name="hearderClass"
          :row-class-name="cellClass"
          show-footer
          :footer-method="footerMethodDetail"
          :columns="columns"
          :data.sync="addProduceList"
        >
        </vxe-grid>
      </el-row>
      <el-row style="height: 200px">
        <vxe-grid
          border
          ref="addTable"
          resizable
          stripe
          keep-source
          class="mytable-scrollbar"
          :auto-resize="true"
          style="margin-top: 11px"
          show-overflow="title"
          width="auto"
          height="180"
          highlight-current-row
          :edit-config="{ trigger: 'click', mode: 'cell' }"
          :align="'center'"
          :checkbox-config="{
            highlight: true,
          }"
          :header-cell-class-name="hearderClass"
          :row-class-name="cellClass"
          show-footer
          :columns="r_columns"
          :data.sync="addProduceList"
        >
          <template #img1_default="{ row }">
            <span>{{ row.P_name }}</span
            ><br />
            <span>{{ row.engName }}</span>
          </template>
        </vxe-grid>
      </el-row>
    </el-form>
    <span style="float: right" slot="footer" class="remarkFooter dialog-footer">
      <el-row>
        <el-col>
          <el-button
            type="primary"
            class="iconfont kt-icon-baocun"
            :disabled="count >= 1 ? true : false"
            :class="count >= 1 ? 'saveBtn1' : 'saveBtn'"
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
          position: 'relative',
        }"
      >
        <choose-packing
          v-if="dialogParam.name === 'ChooseProduct'"
          @clear="clearCabinOrderNo()"
          @closeDialog="closeDialog"
          @fatherMethod="fatherMethod"
        ></choose-packing>
        <customer-info
          v-if="dialogParam.name === 'customerInfo'"
          @closeDialog="closeDialog"
          @fatherMethod="fatherMethod1"
        ></customer-info>
        <transport-info
          v-if="dialogParam.name === 'transportInfo'"
          @closeDialog="closeDialog"
          :transportType="transportType"
          @fatherMethod="fatherMethod2"
        ></transport-info>
        <deliver-goods
          v-if="dialogParam.name === 'deliverGoods'"
          @closeDialog="closeDialog"
          @FatherData="fatherData"
        ></deliver-goods>
      </div>
    </JyDialog>
  </div>
</template>
<script>
import JyTableInput from '@/components/JyTableInput/index'
// import ChoosePacking from './ChoosePacking'
// import customerInfo from './customerInfo'
// import transportInfo from './transportInfo'
import JyDialog from '@/components/JyDialog/index'
// import deliverGoods from './deliverGoods'
// import { cookie } from 'xe-utils/methods'
export default {
  components: {
    JyTableInput,
    // ChoosePacking,
    // customerInfo,
    // transportInfo,
    // deliverGoods,
    JyDialog,
  },
  props: {
    EditList: [Array, Object],
    isEdit: Boolean,
    shopList: Array,
    PaymentList: Array,
    PortInfoList: Array,
    currencyList: Array,
    shipPingComoany: Array,
    formList: [String, Array, Object],
    priceTermList: Array,
    countryList: Array,
  },
  data() {
    return {
      footerCellClassName: 'footerCellClassName',
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      transportType: 0,
      remarkList: [],
      CommodityList: [],
      formInline: {
        Status: '', //状态
        InvoiceNo: '', //外销发票号
        EDT: '', //订舱日期
        LeaveDate: '', //出货日期
        cabinOrderNo: '', //装箱单号
        shop: '', //站点
        ShopName: '',
        TrafficType: '', //运输方式
        TotalPackage: '', //总箱数
        TotalQuantity: '', //总数量
        TotalAmount: '', //总金额
        TotalGW: '', //总毛重
        TotalNW: '', //总净重
        TotalCBM: '', //总体积
        PriceTerm: '', //价格条款
        PTRemark: '', //价格条款说明
        Destination: '', //目的港
        DestinationName: '',
        Payment1: '', //收汇方式
        P1Remark: '', //收汇方式说明
        Remark: '', //备注
        Inputer: '', //制单人
        DocMan: '', //单证员
        InputDate: '', //制单时间
        ApplyMan: '', //报关员
        ApplyDate: '', //报关日
        CustomerCode: '', //客户代码
        CustomerName: '', //客户代码
        CreditNo: '', //信用证号
        Currency: '', //贸易币种
        Loading: '', //装运港
        LoadingName: '',
        discharge: '', //中转港
        dischargeName: '',
        Traffic: '', //运费
        Policy: '', //保险费
        MarkInfo: '', //唛头
        Company: '', //发货公司
        VoyageNumber: '', //运输工具 及 航次号
        Country: '', //，贸易国
      },
      addRules: {
        InvoiceNo: [
          { required: true, message: '请输入外销发票号', trigger: 'change' },
        ],
        PriceTerm: [
          { required: true, message: '请输入价格条款', trigger: 'change' },
        ],
        PTRemark: [
          { required: false, message: '请输入价格条款说明', trigger: 'change' },
        ],
        cabinOrderNo: [
          { required: true, message: '请选择装箱单号', trigger: 'click' },
        ],
        CreditNo: [
          { required: false, message: '请输入信用账号', trigger: 'change' },
        ],
        Payment1: [
          { required: true, message: '请选择收汇方式', trigger: 'change' },
        ],
        P1Remark: [
          { required: false, message: '请输入收汇方式说明', trigger: 'change' },
        ],
        shop: [{ required: false, message: '请输入站点', trigger: 'change' }],
        Currency: [
          { required: true, message: '请选择贸易币种', trigger: 'change' },
        ],
        TrafficType: [
          { required: true, message: '请选择运输方式', trigger: 'change' },
        ],
        LoadingName: [
          { required: true, message: '请选择装运港', trigger: 'change' },
        ],
        Remark: [
          { required: false, message: '请选择其他注意事项', trigger: 'change' },
        ],
        DestinationName: [
          { required: true, message: '请选择目的港', trigger: 'blur' },
        ],
        dischargeName: [
          { required: false, message: '请选择中转港', trigger: 'blur' },
        ],
        Traffic: [
          { required: false, message: '请选择运费', trigger: 'change' },
        ],
        Policy: [
          { required: false, message: '请选择保险费', trigger: 'change' },
        ],
        MarkInfo: [{ required: false, message: '唛头', trigger: 'change' }],
        Inputer: [{ required: false, message: '制单人', trigger: 'change' }],
        ApplyMan: [{ required: false, message: '报关员', trigger: 'change' }],
        CustomerName: [
          { required: true, message: '请选择客户', trigger: 'change' },
        ],
        Company: [{ required: true, message: '发货公司', trigger: 'change' }],
        EDT: [{ required: false, message: '出口日期', trigger: 'blur' }],
        CustomerCode: [
          { required: false, message: '订舱日期', trigger: 'blur' },
        ],
        P1Remark: [
          { required: false, message: '其他注意事项：', trigger: 'blur' },
        ],
        Remark: [
          { required: false, message: '其他注意事项：', trigger: 'blur' },
        ],
        LeaveDate: [
          { required: true, message: '请选择发货日期', trigger: 'change' },
        ],
      },
      StatusList: [
        { id: '01', name: '新制' },
        { id: '02', name: '待审批' },
        { id: '03', name: '已审批' },
        { id: '04', name: '审批不通过' },
        { id: '05', name: '已报关' },
      ],

      addProduceList: [], //列表数据
      CarPlanNoList: [],
      columns:[
        {
          minWidth: '130',
          title: '工序',
          field: '方案',
        },
        {
          title: '价格',
          minWidth: '400',
        },
      ],
      r_columns: [
        // { type: 'checkbox', width: '60' },
        {
          width: '130',
          title: '方案',
          field: '方案',
          // editRender: {
          //   immediate: true,
          // },
        },
        {
          title: '部位',
          minWidth: '100',
          slots: { default: 'img1_default' },
          // editRender: {
          //   immediate: true,
          // },
        },
        {
          width: '100',
          title: '面料编号',
          field: '面料编号',
          editRender: {
            name: 'input',
            attrs: { type: 'text' },
            autoselect: true,
          },
        },
        {
          width: '120',
          title: '面料名称',
          field: '面料编号',
          editRender: {
            name: 'input',
            attrs: { type: 'text' },
            autoselect: true,
          },
        },
        {
          width: '100',
          title: '门幅',
          field: '门幅',
          editRender: {
            name: 'input',
            attrs: { type: 'text' },
            autoselect: true,
          },
        },
        {
          width: '100',
          title: '色号',
          field: '色号',
          editRender: {
            name: 'input',
            attrs: { type: 'text' },
            autoselect: true,
          },
        },
        {
          width: '100',
          title: '颜色',
          field: '颜色',
          editRender: {
            name: 'input',
            attrs: { type: 'text' },
            autoselect: true,
          },
        },
        {
          width: '100',
          title: '用料米数',
          field: '用料米数',
          editRender: {
            name: 'input',
            attrs: { type: 'text' },
            autoselect: true,
          },
        },
        {
          width: '100',
          title: '理论损耗',
          field: '理论损耗',
          editRender: {
            name: 'input',
            attrs: { type: 'text' },
            autoselect: true,
          },
        },
      ],
      dialogParam: {
        title: '',
        type: '',
        name: '',
        width: '70%',
        isShowDialog: false,
        activeNav: {
          MenuCode: 'EasyLayouts',
          MenuName: '添加组件设计',
          LinkUrl: 'Basic/PageDisplay?fmId=3e302bc321c4eb11811f39fce23e769a',
        },
      },
      // 不匹配的数据
      count: null,
      centerDialogVisible: false,
      saveLoading: false,
      saveReportLoading: false,
    }
  },
  created() {
    this.getNowDate()
    //收汇方式列表
    this.IsEdit()
  },
  methods: {
    //新增修改触发
    IsEdit() {
      if (this.isEdit) {
        //修改
        //  console.log("formInline",this.EditList['shipmentOrder']['item'])
        // //  console.log("formInline",this.EditList['shipmentOrder']['item'])
        // console.log('r_columns', this.EditList['CommodityList'])
        //  debugger
        // this.formInline = this.EditList[0][0].t
        // console.log(this.isEdit)
        // console.log(this.EditList['shipmentOrder']['item'].Company)
        this.formInline = this.EditList['shipmentOrder']['item']
        this.$set(
          this.formInline,
          'Company',
          this.EditList['shipmentOrder']['item'].Company.trim()
        )
        this.formInline.CustomerName =
          this.EditList['shipmentOrder'].CustomerName
        this.formInline.LoadingName = this.EditList['shipmentOrder'].LoadingName
        this.formInline.dischargeName =
          this.EditList['shipmentOrder'].dischargeName
        this.formInline.DestinationName =
          this.EditList['shipmentOrder'].DestinationName
        // this.formInline.CompanyName = this.EditList['shipmentOrder'].CompanyName
        this.formInline.ShopName = this.EditList['shipmentOrder'].ShopName
        this.addProduceList = this.EditList['CommodityList']
        // var index = this.shipPingComoany.findIndex((item) => {
        //   console.log(item.CompanyCode)
        //   console.log(this.EditList['shipmentOrder']['item'].Company)
        //   console.log(
        //     item.CompanyCode.trim() == this.EditList['shipmentOrder']['item'].Company.trim()
        //   )
        //   return (
        //     item.CompanyCode.trim() == this.EditList['shipmentOrder']['item'].Company.trim()
        //   )
        // })
        // console.log(index)
      } else {
        this.PortInfoList.forEach((item) => {
          if (item.TrafficType == '1') {
            var showTrafficType = item.TrafficType
            this.$set(this.formInline, 'TrafficType', showTrafficType)
          }
        })
        if (this.formList != null) {
          var data = this.formList
          this.formInline = JSON.parse(data)
          this.formInline.cabinOrderNo = ''
          this.formInline.ShipmentNo = ''
          this.formInline.shop = ''
          this.formInline.ShopName = ''
        }
      }
    },
    //新增/修改保存接口
    CDocumentOperation() {
      //新增
      this.$refs.addForm.validate((valid) => {
        if (!valid) return this.$message.error('请填写必填项')
        this.saveLoading = true
        this.saveReportLoading = true
        this.$api.CustomsDeclaration.CDocumentOperation({
          model: this.formInline,
          Info: this.addProduceList,
          operationType: '0',
        })
          .then((res) => {
            if (res.statusCode != 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.$message.success('保存成功')
              // if (!this.isEdit) {
              var formData = JSON.stringify(this.formInline)
              localStorage.setItem('form', formData)
              // }
              this.$emit('closeDialogF')
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
    // 清空装箱单号输入框数据和table中的数据
    clearCabinOrderNo() {
      this.formInline.cabinOrderNo = ''
      this.formInline.shop = ''
      this.formInline.ShopName = ''
      this.addProduceList = []
      this.CarPlanNoList = []
    },
    // 取消按钮
    cancle() {
      this.$refs.addForm.resetFields()
      this.$emit('closeDialog')
    },
    fatherMethod(data) {
      this.count = null
      this.addProduceList = []
      this.CarPlanNoList = []
      this.formInline.shop = ''
      this.formInline.ShopName = ''
      var newArr = []
      // console.log(data)
      data.map((item) => {
        if (newArr.indexOf(item.站点) == -1) {
          newArr.push(item.站点)
        }
        this.formInline.cabinOrderNo += item.CarPlanNo.trim() + ','
        this.CarPlanNoList.push(item.CarPlanNo.trim())
      })
      this.formInline.shop = newArr.join(',')
      // console.log(newArr)
      var arr = []
      newArr.forEach((item) => {
        const index = this.shopList.findIndex((it) => {
          // console.log(item.trim())
          // console.log(it.id.trim())
          return item.trim() === it.id.trim()
        })
        // console.log(index)
        if (index !== -1) {
          arr.push(this.shopList[index].Name)
          this.formInline.ShopName = arr.join(',')
        }
      })
      this.formInline.cabinOrderNo = this.formInline.cabinOrderNo.substring(
        this.formInline.cabinOrderNo.length - 1,
        1
      )
      if (data.length > 0) {
        //获取表格数据
        this.$api.CustomsDeclaration.GetStatisticsListQuery({
          CarPlanNoList: this.CarPlanNoList,
        })
          .then((res) => {
            if (res.statusCode != 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              // console.log(res);
              // res.data['list'].forEach((p) => {
              //   this.addProduceList.push(p)
              // })
              this.addProduceList = res.data['list']
              // this.delLength = []
              this.count = res.data.count
              if (res.data.count >= 1) {
                this.centerDialogVisible = true
              }
            }
          })
          .catch((err) => console.log(err))
      }
    },
    fatherMethod1(data) {
      this.formInline.CustomerCode = data[0].CustomNo
      this.formInline.CustomerName = data[0].CustomName
    },
    fatherMethod2(data) {
      switch (this.transportType) {
        case 1:
          //装运港
          this.formInline.LoadingName = data[0].chnName
          this.formInline.Loading = data[0].PortCode
          break
        case 2:
          //装运港
          this.formInline.dischargeName = data[0].chnName
          this.formInline.discharge = data[0].PortCode
          break
        case 3:
          //装运港
          this.formInline.DestinationName = data[0].chnName
          this.formInline.Destination = data[0].PortCode
          break
      }
    },
    // fatherData(data) {
    //   // console.log(data)
    //   this.formInline.CompanyCode = data[0].CompanyCode
    //   this.formInline.CompanyName = data[0].ChsName
    // },
    transportCustomer1() {
      this.transportType = 1
      this.dialogParam = {
        title: '装运港',
        type: '',
        name: 'transportInfo',
        width: '60%',
        isShowDialog: true,
      }
    },
    transportCustomer2() {
      this.transportType = 2
      this.dialogParam = {
        title: '中转港',
        type: '',
        name: 'transportInfo',
        width: '60%',
        isShowDialog: true,
      }
    },
    transportCustomer3() {
      this.transportType = 3
      this.dialogParam = {
        title: '目的港',
        type: '',
        name: 'transportInfo',
        width: '60%',
        isShowDialog: true,
      }
    },
    openCustomer() {
      this.dialogParam = {
        title: '客户',
        type: '',
        name: 'customerInfo',
        width: '70%',
        isShowDialog: true,
      }
    },
    // openDeliverGoods() {
    //   this.dialogParam = {
    //     title: '发货公司',
    //     type: '',
    //     name: 'deliverGoods',
    //     width: '60%',
    //     isShowDialog: true,
    //   }
    // },
    // 双击清中转港
    removedischarge() {
      // this.$set(this.formInline, "dischargeName", '')
      // this.$set(this.formInline, "discharge", '')
      this.formInline.dischargeName = ''
      this.formInline.discharge = ''
    },
    // 双击清目的港
    removeDestination() {
      this.formInline.DestinationName = ''
      this.formInline.Destination = ''
    },
    // 双击清目的港
    removeLoading() {
      this.formInline.LoadingName = ''
      this.formInline.Loading = ''
    },
    // 双击清客户
    removeCustomerName() {
      this.formInline.CustomerName = ''
      this.formInline.CustomerCode = ''
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
      this.$set(this.formInline, 'LeaveDate', toMonth)
      this.$set(this.formInline, 'EDT', toMonth)
    },
    // 选择装箱单号
    chooseProduct() {
      this.dialogParam = {
        title: '选择装箱单号',
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
    right: 5px;
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
  height: 70px;
}
>>> .cellClass {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 40px;
}
>>> .footerCellClassName {
  background: #d1f3ff;
}
>>> .JyDialog .JyDialog__header {
  background: #c5c5c5;
  height: 40px;
}
</style>
