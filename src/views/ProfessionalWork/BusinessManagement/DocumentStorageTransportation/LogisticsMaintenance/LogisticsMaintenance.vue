<template>
  <el-container id="mainCard">
    <!-- 物流渠道维护 -->
    <el-row style="width: 100%">
      <el-col>
        <el-card class="cardMargin" id="queryRow">
          <el-row>
            <el-col>
              <el-form
                ref="mainForm"
                :model="AdjustmentList"
                style="font-size：14px"
                label-width="84px"
              >
                <el-row class="mainForm">
                  <el-col class="searchTerm" :md="5" :lg="6" :xl="5">
                    <!-- 查询条件区域 -->
                    <span class="blockSpan">
                      <el-select
                        v-model="AdjustmentList.DateType"
                        class="listDate"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in DateType"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                      <div class="blockDate">
                        <el-date-picker
                          v-model="AdjustmentList.BeginDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                        ></el-date-picker>
                        <el-date-picker
                          v-model="AdjustmentList.EndDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                        ></el-date-picker>
                      </div>
                    </span>
                    <!-- <span class="blockSpan">
                      <el-form-item label="更新时间：">
                        <div class="blockDate">
                          <el-date-picker
                            class="unifySize"
                            v-model="AdjustmentList.BeginDate"
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
                    </span> -->
                  </el-col>
                  <el-col :md="3" :lg="4" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      label="物流渠道："
                      label-width="100px"
                    >
                      <vxe-input
                        v-model="AdjustmentList.LineName"
                        class="unifySize marginLeft"
                        placeholder="物流渠道"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></vxe-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="3" :lg="4" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="物流等级："
                      label-width="100px"
                    >
                      <el-select
                        v-model="AdjustmentList.LineLevel"
                        class="unifySize marginLeft"
                        placeholder="物流等级"
                        clearable
                        @keydown.enter.native="searchEnter"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in logisticsList"
                          :label="item.Name"
                          :value="item.Code"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :md="3" :lg="4" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      label="操作人："
                      label-width="100px"
                    >
                      <vxe-input
                        v-model="AdjustmentList.Inputer"
                        class="unifySize marginLeft"
                        placeholder="操作人"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></vxe-input>
                    </el-form-item>
                  </el-col>
                  <el-button
                    type="danger"
                    class="searchBtn1 searchMargin"
                    size="small"
                    :loading="isLoadingBtn"
                    icon="el-icon-search"
                    @click="MainTableSearch"
                    >查询</el-button
                  >
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
                class="smBtn iconBtn el-icon-view"
                @click="seeChecked"
                >查看</el-button
              >
              <el-button
                type="primary"
                @click="delAdjustment"
                class="delBtn iconBtn el-icon-delete"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 主表 -->
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
            :header-cell-class-name="hearderClass"
            :footer-cell-class-name="footerCellClassName"
            :row-class-name="cellClass"
            :height="gridHeight * 1"
            :loading="loading"
            :columns="columns"
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
            <template #CommonGoods="{ row }">
              <i
                v-if="row.CommonGoods === '1'"
                class="el-icon-check"
                style="color: #f85263"
              ></i>
              <i v-else></i>
            </template>
            <template #Electrified="{ row }">
              <i
                v-if="row.Electrified === '1'"
                class="el-icon-check"
                style="color: #f85263"
              ></i>
              <i v-else></i>
            </template>
            <template #SpecialGoods="{ row }">
              <i
                v-if="row.SpecialGoods === '1'"
                class="el-icon-check"
                style="color: #f85263"
              ></i>
              <i v-else></i>
            </template>
            <template #Inputdate="{ row }">
              <span>{{ row['Inputdate'] | formatDate1 }}</span>
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

    <!-- 新增物流编辑 -->
    <JyDialog
      v-dialogDrag
      :title="`${state == 'add' ? '新增' : '编辑'}` + '物流渠道'"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="addAialogVisible"
      @close="handleClose"
      height="800px"
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
          <!-- <el-col style="display: flex; justify-content: space-between"> -->
          <el-col class="searchCondition">
            <el-form-item
              prop="Effectivedate"
              label="价格生效时间："
              label-width="120px"
            >
              <!-- <el-date-picker
                class="unifySize"
                v-model="addFormParams.Inputdate"
                type="datetime"
                placeholder="选择日期"
              >
              </el-date-picker> -->
              <el-date-picker
                class="unifySize"
                v-model="addFormParams.Effectivedate"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              class="searchMargin"
              label="物流渠道："
              prop="LineName"
              label-width="100px"
            >
              <el-input
                class="unifySize"
                placeholder="物流渠道"
                v-model="addFormParams.LineName"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
              label="物流等级："
              label-width="100px"
              prop="LineLevel"
            >
              <el-select
                v-model="addFormParams.LineLevel"
                class="unifySize"
                placeholder="物流等级"
                clearable
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in logisticsList"
                  :label="item.Name"
                  :value="item.Code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label-width="100px"
              label="物流过程："
              prop="CommonGoods"
            >
              <el-checkbox
                true-label="1"
                false-label="0"
                v-model="addFormParams.CommonGoods"
                >普货</el-checkbox
              >
              <el-checkbox
                true-label="1"
                false-label="0"
                v-model="addFormParams.Electrified"
                >带电</el-checkbox
              >
              <el-checkbox
                true-label="1"
                false-label="0"
                v-model="addFormParams.SpecialGoods"
                >特货</el-checkbox
              >
            </el-form-item>
          </el-col>
          <el-col class="searchCondition1">
            <el-form-item
              label-width="120px"
              label="物流范围："
              prop="LineRange"
            >
              <el-radio-group v-model="addFormParams.LineRange" class="radio">
                <el-radio label="1">国际</el-radio>
                <el-radio label="2">国内</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col class="text" prop="Remark">
            <!-- 文本域 -->
            <el-form-item prop="Remark" label="备注：" label-width="120px">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入"
                v-model="addFormParams.Remark"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="DlasecondBtn">
            <el-button
              type="primary"
              class="smBtn iconBtn iconfont kt-icon-caidan"
              @click="iconAddProduct"
              >添加行</el-button
            >
            <el-button
              type="primary"
              @click="delProduct"
              class="delBtn iconBtn el-icon-delete"
              >删除</el-button
            >
            <vxe-input
              v-if="state == 'edit'"
              v-model="filterData"
              placeholder="国家快速搜索"
              @keyup="searchEvent1"
            ></vxe-input>
          </el-col>
          <!-- 正在开发中 -->
          <el-col style="height: 490px">
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
              @checkbox-all="onAddCheckboxAllChange"
              @checkbox-change="onAddCheckboxChange"
              width="auto"
              height="490"
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
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              type="primary"
              @click="saveProduct"
              class="saveBtn iconfont kt-icon-baocun"
              :disabled="!isEdit ? true : false"
              :class="!isEdit ? 'saveBtn1' : 'saveBtn'"
              :loading="saveLoading"
              >保存</el-button
            >
            <el-button
              type="primary"
              class="clearBtn"
              @click="addAialogVisible = false"
              >取消</el-button
            >
          </el-col>
        </el-row>
      </span>
    </JyDialog>
  </el-container>
</template>

<script>
import JyTableInput from '@/components/JyTableInput/index'
import JyDialog from '@/components/JyDialog/index'
import XEUtils from 'xe-utils'
export default {
  components: { JyTableInput, JyDialog },
  name: 'Logis',
  data() {
    return {
      filterData: '',
      ProductInfoList: [], //存放传入参数list
      priceAdjustmentSheet: [], //主页面的数据
      // chooseProduceList: [], //产品信息表展示的数据
      saveLoading: false,
      footerCellClassName: 'footerCellClassName',
      delLength: [], //主页table选中复选框
      columns: [
        { type: 'checkbox', width: '60' },
        { type: 'seq', width: '50', title: '序号' },
        // { field: 'LineId', width: '260', title: '物流编码' },
        { width: '120', title: '物流渠道', field: 'LineName' },
        { width: '95', title: '普货', slots: { default: 'CommonGoods' } },
        { width: '95', title: '带电', slots: { default: 'Electrified' } },
        { width: '95', title: '特货', slots: { default: 'SpecialGoods' } },
        { width: '120', title: '物流等级', field: 'LineLevelName' },
        { width: '180', title: '价格生效时间', field: 'Effectivedate' },
        { minWidth: '120', align: 'left', title: '备注说明', field: 'Remark' },
        { width: '180', title: '更新时间', slots: { default: 'Inputdate' } },
        { width: '80', title: '制单人', field: 'Inputer' },
      ],
      validRules: {
        ToChnName: [
          { required: true, message: '国家不能为空', trigger: 'click' },
        ],
        // FirstWeight: [
        //   { required: true, message: '首重不能为空', trigger: 'click' },
        // ],
      },
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      cellChooseClass: 'cellChooseClass',
      addAialogVisible: false, //新增弹框
      isEdit: true, //规定调货单是否可以修改
      // 查询获取列表参数表单
      AdjustmentList: {
        BeginDate: '',
        EndDate: '',
        LineName: '',
        LineLevel: '', //物流等级
        Inputer: '', //制单人
        DateType: '1', //日期类型
      },
      DateType: [
        //日期类型
        {
          value: '1',
          label: '生效时间',
        },
        {
          value: '2',
          label: '更新时间',
        },
      ],
      Isupdate: false,
      // 新增的请求参数
      addFormParams: {
        // 新增保存的参数
        LineId: '', //物流渠道
        LineName: '', // 渠道名称
        LineLevel: '', // 物流等级
        CommonGoods: '1', // 普货
        Electrified: '', // 带电
        SpecialGoods: '', // 特货
        LineRange: '1', // 渠道类型
        Effectivedate: '', // 价格生效日期
        Remark: '', // 备注
      },
      addRules: {
        Remark: [{ required: false, message: '请输入', trigger: 'change' }],
        LineName: [
          { required: true, message: '请输入物流渠道', trigger: 'change' },
        ],
        LineLevel: [
          { required: true, message: '请选择物流等级', trigger: 'change' },
        ],
        LineRange: [{ required: true, message: '请选择', trigger: 'change' }],
        CommonGoods: [{ required: true, message: '请选择', trigger: 'change' }],
        Effectivedate: [
          { required: true, message: '请选择日期', trigger: 'change' },
        ],
      },
      //物流等级数据
      logisticsList: [],
      state: 'add', //判断是否新增 如果新增 物流渠道禁止
      // 新增的table数组
      addProduceList: [
        {
          LineId: '',
          PriceListId: '',
          ToChnName: '',
          //国家地址、、//中文
          BeginWeight: '', //最小重量
          EndWeight: '', // 最大重量
          FirstWeight: '', // 首重
          DeliveryFee: '', // 物流费
          RangeFee: '', // 服务费
          OtherFee: '', // 其他费
        },
      ], //新增产品表的数据
      filterList: [],
      needArr: [],
      // 新增表格配置
      r_columns: [
        { type: 'checkbox', width: '40' },
        {
          title: '国家/地区列表',
          field: 'ToChnName',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '140',
          title: '最小重量(公斤)',
          field: 'BeginWeight',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '140',
          title: '最大重量(公斤)',
          field: 'EndWeight',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '80',
          title: '首重',
          field: 'FirstWeight',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '200',
          title: '物流费(RMB)公斤',
          field: 'DeliveryFee',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '200',
          title: '服务费(RMB)/单',
          field: 'RangeFee',
          editRender: {
            immediate: true,
          },
        },
        {
          width: '100',
          title: '其他费用',
          field: 'OtherFee',
          editRender: {
            immediate: true,
          },
        },
      ],
      isSelectDisable: true,
      isLoadingBtn: false, //按钮loading效果
      searchLoading: false, //查询产品loading
      loading: false,
      gotPrice: [],
      paging: { list: [], data: [], limit: 100, total: null, page: 1 },
      choosePaging: { list: [], data: [], limit: 100, total: null, page: 1 },
      delArr: [], //选中的数据用来储存在弹框表格中
      rowId: '',
      sign: '', //判断按钮携带参数
      selectedRow: null,
      gridHeight: 710,
      changeList:[]
    }
  },
  methods: {
    cellclick(data) {
      // console.log(data);
      if (data.columnIndex != 0) {
        this.$refs.mainRef.setAllCheckboxRow(false)
        this.$refs.mainRef.setCheckboxRow(data.row, true)
      }
    },
    searchEvent1() {
      // if(!this.filterData) return
      const filterName = XEUtils.toString(this.filterData).trim().toLowerCase()
      if (filterName) {
        this.changeList = []
        const filterRE = new RegExp(filterName, 'gi')
        const searchProps = ['ToChnName']
        const rest = this.filterList.filter((item) =>
          searchProps.some(
            (key) =>
              XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1
          )
        )
        this.addProduceList = rest.map((item) => {
          // const item = Object.assign({}, row)
          searchProps.forEach((key) => {
            item[key] = XEUtils.toString(item[key]).replace(
              filterRE,
              (match) => `${match}`
            )
          })
          return item
        })
        // const rest1 = this.filterList.filter((item) =>
        //   !searchProps.some(
        //     (key) =>
        //       XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1
        //   )
        // )
        // this.changeList = rest1.map((item) => {
        //   // const item = Object.assign({}, row)
        //   searchProps.forEach((key) => {
        //     item[key] = XEUtils.toString(item[key]).replace(
        //       filterRE,
        //       (match) => `${match}`
        //     )
        //   })
        //   return item
        // })
        // console.log(this.changeList);
      } else {
        // console.log(this.addProduceList);
        // this.addProduceList = this.changeList.concat(this.addProduceList)
        this.addProduceList = this.filterList
      }
    },
    searchEnter(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.MainTableSearch()
      }
    },
    // 查询按钮事件
    MainTableSearch() {
      this.delLength = []
      this.loading = true
      this.isLoadingBtn = true
      if (this.AdjustmentList.BeginDate == null) {
        this.AdjustmentList.BeginDate = ''
      }
      if (this.AdjustmentList.EndDate == null) {
        this.AdjustmentList.EndDate = ''
      }
      this.$api.logistics
        .QueryLogistics({ model: this.AdjustmentList })
        .then((res) => {
          // console.log(res)
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
            this.isLoadingBtn = false
            this.loading = false
          } else {
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
    // 主表双击事件
    // dbMainClick(row) {
    //   // console.log(row)
    //   this.addAialogVisible = true
    //   // this.isEdit = false
    //   // this.addFormParams.Shop = this.delLength[0].Shop
    //   //     this.addFormParams.Remark = this.delLength[0].Remark
    //   this.$api.exchangegoods
    //     .getOneProduct({
    //       id: row.row.Id,
    //     })
    //     .then((res) => {
    //       // console.log(res)
    //       if (res.statusCode !== 200) {
    //         this.$message({
    //           message: res.message,
    //           type: 'error',
    //         })
    //       } else {
    //         // console.log(res.data.plan.Shop)
    //         this.addProduceList = res.data.list
    //         this.addFormParams = res.data.plan
    //         // this.addFormParams.Shop = res.data.plan.Shop
    //       }
    //     })
    //     .catch((err) => console.log(err))
    //   // this.delLength = []
    //   this.ProductInfoList = [] //重置
    //   this.addAialogVisible = false //关闭弹出层
    //   this.isEdit = false
    //   this.addAialogVisible = true
    // },
    // 主表复选框全选事件
    onAdjustmentCheckboxAllChange(row) {
      if (row.checked) {
        this.delLength = this.$refs.mainRef.getCheckboxRecords()
      } else {
        this.delLength = []
      }
    },
    // 主页面调货表复选框状态改变触发
    onAdjustmentCheckboxChange(row) {
      // console.log(row)
      if (row.checked) {
        this.delLength = this.$refs.mainRef.getCheckboxRecords()
      } else {
        this.delLength = this.$refs.mainRef.getCheckboxRecords()
      }
    },
    // 删除
    delAdjustment() {
      if (this.delLength.length <= 0)
        return this.$message.error('请勾选复选框的数据再做出删除操作')
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
            this.$api.logistics
              .DelLogistics({ LineId: this.delLength[0].LineId })
              .then((res) => {
                // console.log(res)
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
                  this.delLength = []
                  this.MainTableSearch()
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
    },
    // 保存添加事件
    saveProduct() {
      // console.log(this.filterList)
      // return
      this.$refs.addForm.validate((valid) => {
        if (!valid) return //文本域校验，必填项
        if (
          this.addFormParams.CommonGoods == '0' &&
          this.addFormParams.Electrified == '0' &&
          this.addFormParams.SpecialGoods == '0'
        )
          return this.$message.error('物流过程至少选择一个')
        if (this.state === 'add') {
          this.saveLoading = true
          this.needArr = []
          for (var i = 0; i <= this.addProduceList.length - 1; i++) {
            this.$set(this.addProduceList[i], 'LineId', '')
            this.$set(this.addProduceList[i], 'PriceListId', '')
            if (this.addProduceList[i].OtherFee == '') {
              this.addProduceList[i].OtherFee = 0
            }
            if (this.addProduceList[i].BeginWeight == '') {
              this.addProduceList[i].BeginWeight = 0
            }
            if (this.addProduceList[i].EndWeight == '') {
              this.addProduceList[i].EndWeight = 0
            }
            if (this.addProduceList[i].FirstWeight == '') {
              this.addProduceList[i].FirstWeight = 0
            }
            if (this.addProduceList[i].DeliveryFee == '') {
              this.addProduceList[i].DeliveryFee = 0
            }
            if (this.addProduceList[i].RangeFee == '') {
              this.addProduceList[i].RangeFee = 0
            }
            this.needArr.push({
              LineId: this.addProduceList[i].LineId,
              PriceListId: this.addProduceList[i].PriceListId,
              ToChnName: this.addProduceList[i].ToChnName,
              BeginWeight: this.addProduceList[i].BeginWeight,
              EndWeight: this.addProduceList[i].EndWeight,
              FirstWeight: this.addProduceList[i].FirstWeight,
              DeliveryFee: this.addProduceList[i].DeliveryFee,
              OtherFee: this.addProduceList[i].OtherFee,
              RangeFee: this.addProduceList[i].RangeFee,
            })
          }
          // console.log(this.needArr);
          this.$api.logistics
            .AddLogistics({
              model: this.addFormParams,
              SectionsList: this.needArr,
            })
            .then((res) => {
              // console.log(res)
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                })
                //关闭弹出层
                this.$refs.addForm.resetFields()
                this.addProduceList = []
                this.delLength = []
                this.changeList = []
                this.MainTableSearch()
                this.addAialogVisible = false
              }
            })
            .catch((err) => console.log(err))
            .finally(() => {
              this.needArr = []
              this.saveLoading = false
            })

          // this.addProduceList = []
          // this.MainTableSearch()
        } else {
          if (this.filterData !== '')
            return this.$message.error(
              '请先清空过滤国家输入框的数据再进行保存操作'
            )
          this.saveLoading = true
          this.needArr = []
          for (var i = 0; i <= this.addProduceList.length - 1; i++) {
            this.$set(this.addProduceList[i], 'LineId', '')
            this.$set(this.addProduceList[i], 'PriceListId', '')
            if (this.addProduceList[i].OtherFee == '') {
              this.addProduceList[i].OtherFee = 0
            }
            if (this.addProduceList[i].BeginWeight == '') {
              this.addProduceList[i].BeginWeight = 0
            }
            if (this.addProduceList[i].EndWeight == '') {
              this.addProduceList[i].EndWeight = 0
            }
            if (this.addProduceList[i].FirstWeight == '') {
              this.addProduceList[i].FirstWeight = 0
            }
            if (this.addProduceList[i].DeliveryFee == '') {
              this.addProduceList[i].DeliveryFee = 0
            }
            if (this.addProduceList[i].RangeFee == '') {
              this.addProduceList[i].RangeFee = 0
            }
            this.needArr.push({
              LineId: this.addProduceList[i].LineId,
              PriceListId: this.addProduceList[i].PriceListId,
              ToChnName: this.addProduceList[i].ToChnName,
              BeginWeight: this.addProduceList[i].BeginWeight,
              EndWeight: this.addProduceList[i].EndWeight,
              FirstWeight: this.addProduceList[i].FirstWeight,
              DeliveryFee: this.addProduceList[i].DeliveryFee,
              OtherFee: this.addProduceList[i].OtherFee,
              RangeFee: this.addProduceList[i].RangeFee,
            })
          }
          this.$api.logistics
            .AddLogistics({
              model: this.addFormParams,
              SectionsList: this.needArr,
            })
            .then((res) => {
              // console.log(res)
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.$message({
                  message: '编辑成功',
                  type: 'success',
                })
                this.$refs.addForm.resetFields()
                this.addProduceList = []
                this.delLength = []
                this.needArr = []
                this.addAialogVisible = false //关闭弹出层
                this.MainTableSearch()
              }
            })
            .catch((err) => console.log(err))
            .finally(() => {
              this.needArr = []
              this.saveLoading = false
            })
        }
      })
    },
    iconAddProduct() {
      let nullObj = {
        LineId: '',
        PriceListId: '',
        ToChnName: '', //国家地址、、//中文
        BeginWeight: '', //最小重量
        EndWeight: '', // 最大重量
        FirstWeight: '', // 首重
        DeliveryFee: '', // 物流费
        RangeFee: '', // 服务费
        OtherFee: '', // 其他费
      }
      this.addProduceList.unshift(nullObj)
    },
    // 编辑勾选项
    editDbclick() {
      this.state = 'edit'
      this.delLength = this.$refs.mainRef.getCheckboxRecords()
      if (this.delLength.length < 1)
        return this.$message.error('请勾选复选框的数据再做出编辑操作')
      if (this.delLength.length > 1) {
        this.$message({
          message: '每次只能编辑一条',
          type: 'error',
        })
      } else {
        this.isEdit = true
        this.$set(
          this.addFormParams,
          'Effectivedate',
          this.delLength[0].Effectivedate
        )
        this.addFormParams.LineId = this.delLength[0].LineId
        this.addFormParams.LineName = this.delLength[0].LineName
        this.addFormParams.LineLevel = this.delLength[0].LineLevel
        this.addFormParams.CommonGoods = this.delLength[0].CommonGoods
        this.addFormParams.Electrified = this.delLength[0].Electrified
        this.addFormParams.SpecialGoods = this.delLength[0].SpecialGoods
        this.addFormParams.LineRange = this.delLength[0].LineRange
        this.addFormParams.Remark = this.delLength[0].Remark
        this.$api.logistics
          .EditQuery({
            LineId: this.delLength[0].LineId,
          })
          .then((res) => {
            console.log(res)
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.addProduceList = res.data
              // console.log(this.addProduceList)
              this.filterList = JSON.parse(JSON.stringify(this.addProduceList))
            }
          })
          .catch((err) => console.log(err))
        this.addAialogVisible = true
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
    // choosePageList() {
    //   // 发请求拿到数据并暂存全部数据,方便之后操作(选择产品表)
    //   this.choosePaging.data = this.chooseProduceList //获得产品暂时表格数据
    //   //用来判断是不是新产品的参数
    //   this.choosePaging.total = this.choosePaging.data.length
    //   this.chooseGetList()
    // },
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
    //新增
    addProduct() {
      this.isEdit = true
      this.state = 'add'
      this.addFormParams.CommonGoods = '1'
      this.addFormParams.Electrified = '0'
      this.addFormParams.SpecialGoods = '0'
      this.addFormParams.LineRange = '1'
      this.addFormParams.LineName = ''
      this.addFormParams.LineLevel = ''
      this.addFormParams.Remark = ''
      this.addFormParams.LineId = ''
      this.getNowDateAdd()
      this.addAialogVisible = true
      this.addProduceList = []
      if (this.addProduceList.length) {
        return
      } else {
        let nullObj = {
          LineId: '',
          PriceListId: '',
          ToChnName: '', //国家地址、、//中文
          BeginWeight: '', //最小重量
          EndWeight: '', // 最大重量
          FirstWeight: '', // 首重
          DeliveryFee: '', // 物流费
          RangeFee: '', // 服务费
          OtherFee: '', // 其他费
        }
        this.addProduceList.push(nullObj)
      }
    },

    // 查看
    seeChecked() {
      this.state = 'edit'
      this.delLength = this.$refs.mainRef.getCheckboxRecords()
      if (this.delLength.length < 1)
        return this.$message.error('请勾选复选框的数据再做出查看操作')
      if (this.delLength.length > 1) {
        this.$message({
          message: '每次只能查看一条',
          type: 'error',
        })
      } else {
        this.isEdit = false
        this.$set(
          this.addFormParams,
          'Effectivedate',
          this.delLength[0].Effectivedate
        )
        this.addFormParams.LineId = this.delLength[0].LineId
        this.addFormParams.LineName = this.delLength[0].LineName
        this.addFormParams.LineLevel = this.delLength[0].LineLevel
        this.addFormParams.CommonGoods = this.delLength[0].CommonGoods
        this.addFormParams.Electrified = this.delLength[0].Electrified
        this.addFormParams.SpecialGoods = this.delLength[0].SpecialGoods
        this.addFormParams.LineRange = this.delLength[0].LineRange
        this.addFormParams.Remark = this.delLength[0].Remark
        this.$api.logistics
          .EditQuery({
            LineId: this.delLength[0].LineId,
          })
          .then((res) => {
            // console.log(res)
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
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            if (this.addProduceList.length === 0) {
              this.addProduceList.push({
                LineId: '',
                PriceListId: '',
                ToChnName: '',
                //国家地址、、//中文
                BeginWeight: '', //最小重量
                EndWeight: '', // 最大重量
                FirstWeight: '', // 首重
                DeliveryFee: '', // 物流费
                RangeFee: '', // 服务费
                OtherFee: '', // 其他费
              })
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
    // 插槽中的图标删除
    iconDelProduct(row) {
      let Index = this.addProduceList.findIndex((item) => {
        return item.LineId == row.LineId
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
            this.addProduceList.push({
              LineId: '',
              PriceListId: '',
              ToChnName: '',
              //国家地址、、//中文
              BeginWeight: '', //最小重量
              EndWeight: '', // 最大重量
              FirstWeight: '', // 首重
              DeliveryFee: '', // 物流费
              RangeFee: '', // 服务费
              OtherFee: '', // 其他费
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
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
    checkMethodDisable(row) {
      return row.$rowIndex !== this.addProduceList.length - 1
    },
    // cancel() {
    //   this.$refs.addForm.resetFields()
    //   this.addAialogVisible = false
    // },
    // 第一层弹出层取消
    handleClose() {
      // this.isEdit = true
      this.$refs.addForm.resetFields()
      this.addFormParams.LineId = ''
      this.addFormParams.LineName = ''
      this.addFormParams.LineLevel = ''
      this.addFormParams.CommonGoods = ''
      this.addFormParams.Electrified = ''
      this.addFormParams.SpecialGoods = ''
      this.addFormParams.LineRange = ''
      this.addFormParams.Remark = ''
      this.filterData = ''
      this.addAialogVisible = false
    },
    getNowDate() {
      // 拿到当前时间
      let nowDate = new Date()
      console.log(nowDate)
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let date = nowDate.getDate()
      date = date < 10 ? '0' + date : date
      var toMonth = year + '-' + month + '-' + date
      // // 获取一个月前的时间
      // var monthDate = new Date()
      // monthDate.setMonth(monthDate.getMonth() - 1)
      // var startTime =
      //   monthDate.getFullYear() +
      //   '-' +
      //   (monthDate.getMonth() + 1) +
      //   '-' +
      //   monthDate.getDate()
      this.$set(this.AdjustmentList, 'EndDate', toMonth)
      // this.$set(this.AdjustmentList, 'BeginDate', startTime)
    },
    getNowDateAdd() {
      // 拿到当前时间
      var nowDate = new Date()
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let date = nowDate.getDate()
      date = date < 10 ? '0' + date : date
      const H = nowDate.getHours().toString().padStart(2, 0)
      const MM = nowDate.getMinutes().toString().padStart(2, 0)
      const SS = nowDate.getSeconds().toString().padStart(2, 0)
      var toMonth = `${year}-${month}-${date} ${H}:${MM}:${SS}`
      this.$set(this.addFormParams, 'Effectivedate', toMonth)
    },
    // 获取物流等级
    getLogLevel() {
      this.$api.logistics
        .getLogisticsLevel({ flag: 'LineLevel' })
        .then((res) => {
          // console.log(res);
          if (res.statusCode !== 200)
            return this.$message.error('获取物流等级数据失败')
          this.logisticsList = res.data
        })
    },
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        this.gridHeight = card - queryRow - 60
      })
    },
  },
  computed: {},
  beforeCreate() {},
  created() {
    this.getNowDate()
    this.getNowDateAdd()
    this.getLogLevel()
    this.MainTableSearch()
    this.searchEvent1()
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
>>> .cardMargin {
  margin-top: 0px !important;
}
>>> .blockSpan {
  display: flex;
  height: 32px;
  justify-content: start;
  border-radius: 4px;
  border: 1px solid #c7c6de;
}
>>> .listDate .el-input__inner {
  height: 30px;
  padding: 0 0 0 5px;
  width: 90px;
  border-radius: 4px 0 0 4px;
}
>>> .listDate .el-input__inner::placeholder {
  color: #333;
}
>>> .listDate .el-input__icon {
  line-height: 0;
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
  position: relative;
  height: 30px;
  width: 140px !important;
  border: none;
  .el-input__prefix {
    top: 2px;
  }
}
>>> .el-input__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 0;
}
>>> .blockDate .el-input__icon {
  height: 30px;
}
>>> .blockDate .el-range-separator {
  height: 30px;
  padding: 0;
}
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
.el-icon-check {
  font-size: 20px;
  font-weight: 800;
}
// .radio {
//   border: 1px solid #c7c6de;
//   margin: 0;
//   padding: 0;
//   border-radius: 5px;
//   padding: 0 5px;
//   height: 32px;
//   line-height: 40px;
// }
>>> .el-card__body {
  padding: 10px;
}
>>> .searchCondition {
  height: 40px;
  display: flex;
  margin: 0;
  justify-content: flex-start;
  .searchConditionShop {
    margin-right: 30px;
  }
}
>>> .searchCondition1 {
  height: 40px;
  margin: 0;
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
  height: 30px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 80px;
}
>>> .mainTable .el-card {
  height: 100%;
  margin-top: 5px;
}
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
>>> .DlasecondBtn {
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
  height: 36px;
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
>>> .saveBtn {
  width: 70px;
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
  height: 80px;
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
  width: 150px !important;
  height: 30px;
}
>>> .None-Border {
  height: 100%;
}
>>> .unifySize input {
  height: 30px;
}
>>> .unifySize .el-input {
  width: 150px;
}
// >>> .el-input__inner input {
//   width: 150px !important;
// }
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
  height: 820px;
}
>>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
>>> .jy_wrapper .el-dialog__body {
  border-bottom: none !important;
}
>>> .el-dialog .el-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
>>> .el-input__prefix {
  // display: none;
  bottom: 20px;
}
>>> .el-input__prefix {
  bottom: 20px;
}
>>> .NullTip {
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 400px;
  transform: translate(-50%, 50%);
}
>>> .vxe-input--suffix {
  top: 2px;
}
</style>