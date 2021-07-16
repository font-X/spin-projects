<template>
  <el-container id="mainCard">
    <!-- 装箱单管理 -->
    <el-row style="width: 100%">
      <el-col>
        <el-card class="cardMargin" id="queryRow">
          <el-row>
            <el-col>
              <el-form
                ref="mainForm"
                :model="queryPramsTable"
                style="font-size：14px"
                label-width="84px"
              >
                <!-- <el-row class="mainForm">
                  <el-col
                    :md="8"
                    :lg="5"
                    :xl="5"
                    style="display: flex; justify-content: flex-start"
                  > -->
                <el-row class="mainForm">
                  <el-col :md="8" :lg="6" :xl="6">
                    <!-- 查询条件区域 -->
                    <el-form-item label="制单时间：">
                      <span class="blockSpan">
                        <div class="blockDate">
                          <el-date-picker
                            class="unifySize unifySizeDate"
                            v-model="queryPramsTable.BeginDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                          ></el-date-picker>
                          <el-date-picker
                            class="unifySize unifySizeDate NoneIcon"
                            v-model="queryPramsTable.EndDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                          ></el-date-picker>
                        </div>
                      </span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="4" :xl="4">
                    <el-form-item class="searchMargin" label="箱号：">
                      <el-input
                        v-model="queryPramsTable.CarName"
                        class="unifySize"
                        clearable
                        placeholder="箱号"
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item class="searchMargin" label="车型：">
                      <el-input
                        v-model="queryPramsTable.CarType"
                        class="unifySize"
                        placeholder="车型"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="封号："
                    >
                      <el-input
                        v-model="queryPramsTable.CarTitle"
                        class="unifySize"
                        placeholder="封号"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                      <!-- <el-select
                        v-model="queryPramsTable.currency"
                        class="unifySize"
                        placeholder="封号"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in currencyList"
                          :label="item.chnName"
                          :value="item.currency"
                        ></el-option>
                      </el-select> -->
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="4" :xl="4">
                    <el-button
                      v-if="iconShow"
                      type="danger"
                      class="searchBtn searchMargin"
                      size="small"
                      :loading="loading"
                      @click="searchOrderList"
                      icon="iconfont kt-icon-sousuo_o"
                      >查询</el-button
                    >
                    <el-button
                      v-if="iconShow"
                      type="danger"
                      class="closeInput searchMargin"
                      size="small"
                      @click="IconShow"
                      icon="iconfont kt-icon-anniu_jiantouzhankai"
                      >展开</el-button
                    >
                  </el-col>
                </el-row>
                <el-row v-if="!iconShow" class="mainForm marginLe">
                  <el-col :md="8" :lg="6" :xl="6">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="柜型："
                    >
                      <el-select
                        v-model="queryPramsTable.ContainerType"
                        class="unifySize"
                        placeholder="柜型"
                        @keydown.enter.native="searchEnter"
                      >
                        <el-option value=""></el-option>
                        <el-option
                          :key="index"
                          v-for="(item, index) in containerList"
                          :label="item.Name"
                          :value="item.Code"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="4" :xl="4">
                    <el-form-item class="searchMargin" label="车号：">
                      <el-input
                        v-model="queryPramsTable.CarNo"
                        class="unifySize"
                        placeholder="车号"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="4">
                    <el-form-item class="searchMargin" label="提单号：">
                      <el-input
                        v-model="queryPramsTable.BLCode"
                        class="unifySize"
                        placeholder="提单号"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="4" :xl="4">
                    <el-button
                      type="danger"
                      class="searchBtn searchMargin"
                      size="small"
                      :loading="loading"
                      @click="searchOrderList"
                      icon="iconfont kt-icon-sousuo_o"
                      >查询</el-button
                    >
                    <el-button
                      type="danger"
                      class="closeInput searchMargin"
                      size="small"
                      @click="IconShow"
                      icon="iconfont kt-icon-anniu_jiantoushouqi"
                      >收起</el-button
                    >
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
            <!-- 按钮区域 -->
            <el-col class="secondBtn">
              <el-button
                type="primary"
                @click="addOrder"
                class="smBtn iconBtn el-icon-edit-outline"
                >新增</el-button
              >
              <el-button
                @click="editDbclick"
                type="primary"
                class="smBtn iconBtn el-icon-view"
                >修改</el-button
              >
              <el-button
                @click="Del"
                type="primary"
                class="delBtn iconBtn el-icon-delete"
                >删除</el-button
              >
              <el-button
                type="primary"
                @click="seeClick"
                class="smBtn iconBtn iconfont kt-icon-daoru"
                >复核</el-button
              >
              <!-- <el-button
                type="primary"
                class="iconBtn iconfont kt-icon-caidan"
                >上传图片</el-button
              > -->
              <!-- <el-button type="primary" class="iconBtn iconfont kt-icon-caidan"
                >更多功能</el-button
              > -->
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <!-- 主表区域 -->
      <el-col class="mainTable">
        <el-card style="margin-top：11px">
          <vxe-toolbar>
            <template #buttons>
              <vxe-input
                v-model="filterData"
                clearable
                placeholder="试试全表快速搜索"
                @keyup="searchEvent1"
              ></vxe-input>
            </template>
          </vxe-toolbar>
          <vxe-grid
            border
            resizable
            stripe
            ref="mainTable"
            width="auto"
            show-footer
            :auto-resize="true"
            class="mytable-scrollbar"
            show-overflow="title"
            :header-row-class-name="hearderClass"
            :row-class-name="cellClass"
            :height="iconShow ? gridHeight * 1 : gridHeight * 0.93"
            :loading="tableLoading"
            @cell-click="cellclick"
            :columns="columns"
            @checkbox-all="onAdjustmentCheckboxAllChange"
            @checkbox-change="onAdjustmentCheckboxChange"
            highlight-current-row
            :config="{ render: 'scroll' }"
            :align="'center'"
            :checkbox-config="{ highlight: true }"
            :data="paging.data"
          >
          </vxe-grid>
          <!-- 分页 -->
          <el-col class="closeTable">
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
          </el-col>
        </el-card>
      </el-col>
    </el-row>

    <!-- 新增 -->
    <JyDialog
      v-dialogDrag
      title="装箱单管理"
      @close="addAialogClose"
      :close-on-click-modal="false"
      :visible.sync="addAialogVisible"
      append-to-body
      height="800px"
      width="1250px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="addForm"
        :rules="addRules"
        :model="addParams"
        style="font-size：14px"
        class="addform"
        label-width="84px"
      >
        <el-row>
          <el-col style="display: flex">
            <el-form-item
              class="searchMargin special"
              label="发货申请单："
              label-width="100px"
              prop="show"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="鼠标双击清空内容"
                placement="top"
              >
                <vxe-input
                  v-model="addParams.show"
                  :readonly="true"
                  @dblclick="addParams.show = ''"
                  class="unifySize1 Delivery"
                ></vxe-input>
              </el-tooltip>
              <i
                class="iconP iconfont kt-icon-daoru choose"
                @click="iconChooseProduct"
              ></i>
            </el-form-item>
            <el-form-item prop="CarOut" label="日期：" class="searchMargin">
              <el-date-picker
                v-model="addParams.CarOut"
                class="unifySize"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="CarTitle" class="searchMargin" label="封号：">
              <el-input
                v-model="addParams.CarTitle"
                class="unifySize1"
                placeholder="封号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            style="
              display: flex;
              justify-content: space-between;
              margin-top: 12px;
            "
          >
            <el-form-item
              class="searchMargin"
              label="箱号："
              label-width="100px"
              prop="CarName"
            >
              <el-input
                v-model="addParams.CarName"
                class="unifySize1"
                placeholder="箱号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="Shop"
              class="tipsLeft searchMargin"
              style="margin-bottom: 0px"
              label="站点："
            >
              <el-select
                v-model="addParams.Shop"
                class="unifySize1"
                placeholder="出货站点"
                clearable
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in shopList"
                  :label="item.Name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              prop="ContainerType"
              class="searchMargin"
              label="柜型："
            >
              <el-select
                v-model="addParams.ContainerType"
                class="unifySize"
                placeholder="柜型"
                clearable
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in containerList"
                  :label="item.Name"
                  :value="item.Code"
                ></el-option>
              </el-select>
              <!-- <el-input
                v-model="addParams.ContainerType"
                class="unifySize1"
                placeholder="柜型"
                clearable
              ></el-input> -->
            </el-form-item>
            <el-form-item class="searchMargin" label="提单号：" prop="BLCode">
              <el-input
                v-model="addParams.BLCode"
                class="unifySize1"
                placeholder="提单号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="CarType" class="searchMargin" label="车牌：">
              <el-input
                v-model="addParams.CarType"
                class="unifySize1"
                placeholder="车牌"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col style="height: 80px; margin-top: 20px">
            <!-- 文本域 -->
            <el-form-item prop="Note" label="备注：" label-width="100px">
              <el-input
                v-model="addParams.Note"
                type="textarea"
                :rows="2"
                clearable
                placeholder="请输入备注信息"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <!-- <JyDialog
              :visible.sync="dialogVisible"
              append-to-body
              :close-on-click-modal="false"
            >
              <img width="100%" :src="dialogImageUrl" alt="" />
            </JyDialog> -->
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
            <!-- <el-upload
              :limit="limitNum"
              :show-file-list="true"
              class="uploader"
              action=""
              :auto-upload="false"
              :before-upload="beforeUploadFile"
              :on-change="fileChange"
              :on-exceed="exceedFile"
              :on-remove="removeFile"
              :file-list="fileList"
              ref="uploadInner"
            >
              <div class="el-upload__text">
                <em>浏览。。。</em>
              </div>
            </el-upload> -->
            <!-- <el-button type="primary" class="iconBtn iconfont kt-icon-caidan" @click="uploadFile">上传文件</el-button> -->
          </el-col>
          <!-- <el-button type="primary">上传<i class="iconBtn el-icon-upload el-icon--right" @click="uploadFile"></i></el-button> -->
          <!-- <el-col style="width:100px,height:30px">
            <img :src="Imgurl + img" alt="上传成功后暂时的图片" class="img" />
          </el-col> -->
        </el-row>
      </el-form>
      <div slot="footer" class="footer">
        <el-button
          type="primary"
          class="saveBtn2 iconfont kt-icon-baocun"
          @click="ConfirmReview"
          :loading="reviewLoading"
          v-if="!isEdit"
          >确认复核</el-button
        >
        <el-button
          type="primary"
          class="saveBtn2 iconfont kt-icon-baocun"
          @click="reReview"
          :loading="reviewLoading"
          v-if="!isEdit"
          >取消复核</el-button
        >
        <el-button
          type="primary"
          class="saveBtn iconfont kt-icon-baocun"
          :loading="saveLoading"
          @click="saveProduct"
          :disabled="!isEdit ? true : false"
          :class="!isEdit ? 'saveBtn1' : 'saveBtn'"
          >保存</el-button
        >
        <el-button type="primary" @click="resetAdd" class="clearBtn"
          >取消</el-button
        >
      </div>
    </JyDialog>

    <!-- 选择单号信息 -->
    <JyDialog
      title="选择装箱单"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="chooseDaialogVisible"
      width="1250px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="chooseForm"
        :model="chooseParams"
        style="font-size：14px"
        label-width="110px"
      >
        <el-row>
          <el-col :md="12" :lg="8" :xl="6">
            <el-form-item prop="CarOut" label="开始日期：" class="unifySize">
              <el-date-picker
                v-model="chooseParams.begindate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择开始日期"
              >
              </el-date-picker>
              <!-- <i> 至 </i>
              <el-date-picker
                v-model="chooseParams.endDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择结束日期"
              >
              </el-date-picker> -->
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="8" :xl="6">
            <el-form-item prop="CarOut" label="结束日期：" class="unifySize">
              <el-date-picker
                v-model="chooseParams.endDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择结束日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="8" :xl="6">
            <el-form-item label="发货申请单号：">
              <el-input
                v-model="chooseParams.DeliveryPlanCode"
                @keydown.enter.native="searchChooseEnter"
                class="unifySize"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="12" :lg="8" :xl="6">
            <el-form-item
              class="tipsLeft searchMargin"
              style="margin-bottom: 0px"
              label="站点："
            >
              <el-select
                v-model="chooseParams.shop"
                class="unifySize1"
                clearable
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

          <el-col :md="12" :lg="6" :xl="6">
            <el-form-item label="货件编号：">
              <el-input
                v-model="chooseParams.ShipmentNo"
                @keydown.enter.native="searchChooseEnter"
                class="unifySize"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-button
            type="danger"
            class="searchBtn"
            @click="iconChooseProduct"
            size="small"
            :loading="productLoading"
            icon="el-icon-search"
            >查询</el-button
          >
          <!-- </el-col> -->
          <!-- <el-col> </el-col> -->
        </el-row>
        <vxe-table
          ref="chooseTable"
          border
          resizable
          stripe
          keep-source
          :before-close="choooseClose"
          :row-class-name="cellClass"
          show-overflow
          height="650"
          class="mytable-scrollbar"
          :loading="loading1"
          :auto-resize="true"
          @checkbox-change="onChooseCheckboxChange"
          :header-cell-class-name="hearderClass"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true, reserve: true }"
          :data="choosePaging.data"
        >
          <vxe-table-column type="checkbox" width="40"></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="60"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="状态"
            title="状态"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="站点"
            title="站点"
          ></vxe-table-column>
          <vxe-table-column
            width="120"
            field="发货申请单号"
            title="发货申请单号"
          ></vxe-table-column>
          <vxe-table-column
            width="100"
            field="海外仓编号"
            title="海外仓编号"
          ></vxe-table-column>
          <vxe-table-column
            width="120"
            field="货件编号"
            title="货件编号"
          ></vxe-table-column>
          <vxe-table-column
            width="120"
            field="海外仓编号"
            title="海外仓编号"
          ></vxe-table-column>
          <vxe-table-column
            width="110"
            field="货件名称"
            title="货件名称"
          ></vxe-table-column>
          <vxe-table-column width="90" field="实发箱数" title="实发箱数">
            <template slot-scope="{ row }">
              <span v-if="row.实发箱数 == null">0</span>
              <span v-else>{{ row.实发箱数 }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column width="90" field="实发包数" title="实发包数">
            <template slot-scope="{ row }">
              <span v-if="row.实发包数 == null">0</span>
              <span v-else>{{ row.实发包数 }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            width="90"
            field="包数"
            title="包数"
          ></vxe-table-column>
          <vxe-table-column
            width="110"
            field="发货日期"
            title="发货日期"
          ></vxe-table-column>
          <vxe-table-column
            align="left"
            width="110"
            field="备注"
            title="备注"
          ></vxe-table-column>
          <vxe-table-column
            width="70"
            field="制单人"
            title="制单人"
          ></vxe-table-column>
          <vxe-table-column
            width="110"
            field="制单日期"
            title="制单日期"
          ></vxe-table-column>
          <vxe-table-column
            width="110"
            field="ID"
            title="ID"
          ></vxe-table-column>
        </vxe-table>
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
                @click="chooseProduct"
                class="chooseEnter"
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
    </JyDialog>
  </el-container>
</template>

<script>
// import { lastObjectEachIterate } from 'xe-utils/methods'

import JyDialog from '@/components/JyDialog/index'
import XEUtils from 'xe-utils'
import Cookies from 'js-cookie'
// import { Column } from 'vxe-table'
export default {
  name: 'packing',
  components: { JyDialog },
  data() {
    return {
      filterData: '', //过滤的内容
      // 主表类
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      cellChooseClass: 'cellChooseClass',
      cellChooseClassLeft: 'cellChooseClassLeft',
      columnsClass: 'columnsClass',
      orderManagementList: [], //装箱单管理表数据
      // addOrderList: [],
      // addProduceList: [],
      bottomTableLeft: [],
      bottomTableRight: [],
      loading: false,
      loading1: false,
      productLoading: false,
      tableLoading: false,
      showReportDialog: false,
      //主表对象数据参数
      queryPramsTable: {
        UserCode: '',
        BeginDate: '',
        EndDate: '',
        BLCode: '', //提单号
        CarName: '', //箱号
        CarNo: '',
        CarTitle: '', // 封号
        CarType: '', // 车型
        ContainerType: '', // 柜型
      },
      containerList: [],
      // 新增或修改的对象参数
      addParams: {
        // 保存的参数
        UserCode: '',
        CarPlanNo: '', //新增不要，编辑添加
        CarOut: '', // 日期
        CarName: '', //箱号
        CarTitle: '', // 封号
        CarType: '', // 车牌
        BLCode: '', //提单号
        ContainerType: '', // 柜型
        strMessage: '1',
        LsOrderNo: '01',
        PlanNo: '', //发货申请单
        show: '',
        Shop: '',
        Note: '', //备注
        // files:[{ImageListNo :"",ImageType :contentype,ImageName :fullname,LinkUrl :Url}]
      },
      addRules: {
        ContainerType: [
          { required: false, message: '请输入柜型', trigger: 'blur' },
        ],
        CarType: [{ required: false, message: '请输入车牌', trigger: 'blur' }],
        CarTitle: [{ required: false, message: '请输入封号', trigger: 'blur' }],
        CarName: [
          { required: false, message: '请输入箱号', trigger: 'change' },
        ],
        CarOut: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        Shop: [{ required: true, message: '请选择站点', trigger: 'blur' }],
        Note: [{ required: false, message: '请输入备注信息', trigger: 'blur' }],
        BLCode: [{ required: false, message: '请输入提单号', trigger: 'blur' }],
        show: [
          {
            required: true,
            message: '请通过图标选择发货申请单号',
            trigger: 'input',
          },
        ],
      },
      iconShow: false,
      addAialogVisible: false,
      chooseDaialogVisible: false,
      chooseProduceList: [], // 查询的装箱单table数据源
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '100', title: '是否复核', field: '是否复核' },
        {
          width: '120',
          title: '装箱单号',
          field: '装箱单号',
          sortable: true,
          filterMultiple: false,
        },
        {
          width: '130',
          title: '集装箱号',
          field: '集装箱号',
          sortable: true,
          filterMultiple: false,
        },
        {
          width: '120',
          title: '车号',
          field: '车号',
          sortable: true,
          filterMultiple: false,
        },
        {
          width: '120',
          title: '司机名',
          field: '司机名',
          sortable: true,
          filterMultiple: false,
        },
        {
          width: '120',
          title: '发货时间',
          field: '发货时间',
          sortable: true,
          filterMultiple: false,
        },
        {
          align: 'left',
          minWidth: '200',
          title: '备注',
          field: '备注',
          sortable: true,
          filterMultiple: false,
        },
        {
          width: '120',
          title: '制单时间',
          field: '制单时间',
          sortable: true,
          filterMultiple: false,
        },
        {
          width: '120',
          title: '制单人',
          field: '制单人',
          sortable: true,
          filterMultiple: false,
        },
        {
          width: '120',
          title: '提单号',
          field: '提单号',
          sortable: true,
          filterMultiple: false,
        },
        {
          width: '120',
          title: '车型',
          field: '车型',
          sortable: true,
          filterMultiple: false,
        },
        {
          width: '100',
          title: '柜型',
          field: '柜型',
          sortable: true,
          filterMultiple: false,
        },
      ],
      // 查询装箱单的请求参数
      chooseParams: {
        UserCode: '001',
        DeliveryPlanCode: '', // 发货申请单号
        begindate: '', // 开始时间
        endDate: '', // 结束时间
        Type: '10',
        shop: '',
        ShipmentNo: '',
      },
      chooseList: [], // 选择装箱单管理的数据
      saveChooseList: [], //待处理的数据
      orderCloseParams: {
        UserCode: '001',
        ContractNo: '',
        strMessage: '',
        Type: '',
      },
      // reminderSearchParams: {
      //   // 电商订单双击展示数据查询参数
      //   strMessage: '',
      //   usercode: '001',
      //   orderno: '',
      // },
      RemindersDaialogVisible: false,
      // // 图标保存的参数
      // iconSaveParams: {
      //   userCode: '001',
      //   strList: '',
      //   strMessage: '',
      // },
      paging: { list: [], data: [], limit: 100, total: null, page: 1 }, //主表分页
      choosePaging: { list: [], data: [], limit: 100, total: null, page: 1 }, //选择产品表的分页
      shopList: [],
      delArr: [],
      IsSearch: false,
      columnIcon: '◇', //列分隔符
      delLength: [],
      state: 'add', //判断是哪个按钮点击
      // limitNum: 1, // 上传excell时，同时允许上传的最大数
      // fileList: [], // excel文件列表
      // limitNum: 10, // 上传图片时，同时允许上传的最大数
      // fileList: [], // 图片文件列表
      getPhotodata: [],
      Imgurl: 'http://lqtex.oss-cn-hangzhou.aliyuncs.com/', //前端显示图片
      saveLoading: false,
      action: '/api/Public/GetPostFiles',
      myheader: { Authorization: Cookies.get('token') },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      updataList: [], //上传之后的数据
      filesArray: [], //传给后端的数据
      gridHeight: 565,
      isEdit: true,
      reviewLoading: false,
    }
  },
  mounted() {
    var _this = this
    window.onresize = function () {
      // 定义窗口大小变更通知事件
      _this.resize()
    }
  },
  methods: {
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        console.log(card, queryRow)
        this.gridHeight = card - queryRow - 80
        console.log(this.gridHeight)
      })
    },
    cellclick(data) {
      // console.log(data);
      if (data.columnIndex != 0) {
        this.$refs.mainTable.setAllCheckboxRow(false)
        this.$refs.mainTable.setCheckboxRow(data.row, true)
      }
    },
    searchEvent1() {
      const filterName = XEUtils.toString(this.filterData).trim().toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const searchProps = [
          '集装箱号',
          '装箱单号',
          '车号',
          '司机名',
          '发货时间',
          '备注',
          '制单时间',
          '制单人',
          '提单号',
          '车型',
          '柜型',
        ]
        const rest = this.orderManagementList.filter((item) =>
          searchProps.some(
            (key) =>
              XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1
          )
        )
        this.paging.data = rest.map((row) => {
          const item = Object.assign({}, row)
          searchProps.forEach((key) => {
            item[key] = XEUtils.toString(item[key]).replace(
              filterRE,
              (match) => `${match}`
            )
          })
          return item
        })
      } else {
        this.paging.data = this.orderManagementList
      }
    },
    searchChooseEnter(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.iconChooseProduct()
      }
    },
    searchEnter(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.getOrderList()
      }
    },
    // 主表删除
    Del() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.delLength.length < 1) {
        this.$message({
          message: '请选择删除项',
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
              this.$api.PackingRequest.Delete({
                CarPlanNo: this.delLength[0].CarPlanNo,
              })
                .then((res) => {
                  if (res.statusCode !== 200) {
                    this.$message({
                      message: res.message,
                      type: 'error',
                    })
                  } else {
                    this.$message.success('删除成功')
                    this.getOrderList()
                    this.delLength = []
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
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
    // 主页面调货表复选框状态改变触发
    onAdjustmentCheckboxChange(row) {
      if (row.checked) {
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
      } else {
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
      }
    },
    // 主页面调货表全选复选框状态改变触发
    onAdjustmentCheckboxAllChange(row) {
      if (row.checked) {
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
      } else {
        this.delLength = []
      }
    },
    // 复核
    seeClick() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.delLength.length < 1) {
        this.$message({
          message: '请选择复核项',
          type: 'error',
        })
      } else {
        if (this.delLength.length > 1) {
          this.$message({
            message: '每次只能复核一条',
            type: 'error',
          })
        } else {
          this.isEdit = false
          this.state = 'edit'
          this.fileList = []
          this.$api.PackingRequest.EditQuery({
            CarPlanNo: this.delLength[0]['CarPlanNo'],
          })
            .then((res) => {
              // console.log(res)
              if (res.statusCode !== 200) return this.$message(res.data.message)
              var index = this.shopList.findIndex((item) => {
                return (item.id = res.data.item[0]['Shop'])
              })
              this.addParams.Shop = this.shopList[index].id
              this.addParams.CarOut = res.data.item[0]['CarOut']
              this.addParams.CarName = res.data.item[0]['CarName']
              this.addParams.CarTitle = res.data.item[0]['CarTitle']
              this.addParams.CarType = res.data.item[0]['CarType']
              this.addParams.BLCode = res.data.item[0]['BLCode']
              this.addParams.PlanNo = res.data.item[0]['PlanNo']
              this.addParams.ContainerType = res.data.item[0]['ContainerType']
              this.addParams.show = res.data.item[0]['DeliveryPlanCode']
              this.addParams.Note = res.data.item[0]['Note']
              if (res.data.files !== []) {
                res.data.files.forEach((item) => {
                  this.updataList.push({
                    ImageListNo: item.ImageListNo,
                    FullName: item.ImageName,
                    Url: item.LinkUrl,
                  })
                })
              }
            })
            .catch((err) => {
              console.log(err)
            })
          this.addAialogVisible = true
        }
      }
    },
    // 修改项
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
          this.isEdit = true
          this.state = 'edit'
          this.fileList = []
          this.$api.PackingRequest.EditQuery({
            CarPlanNo: this.delLength[0]['CarPlanNo'],
          })
            .then((res) => {
              // console.log(res)
              if (res.statusCode !== 200) return this.$message(res.data.message)
              var index = this.shopList.findIndex((item) => {
                return (item.id = res.data.item[0]['Shop'])
              })
              this.addParams.Shop = this.shopList[index].id
              this.addParams.CarOut = res.data.item[0]['CarOut']
              this.addParams.CarName = res.data.item[0]['CarName']
              this.addParams.CarTitle = res.data.item[0]['CarTitle']
              this.addParams.CarType = res.data.item[0]['CarType']
              this.addParams.BLCode = res.data.item[0]['BLCode']
              this.addParams.PlanNo = res.data.item[0]['PlanNo']
              this.addParams.ContainerType = res.data.item[0]['ContainerType']
              this.addParams.show = res.data.item[0]['DeliveryPlanCode']
              this.addParams.Note = res.data.item[0]['Note']
              if (res.data.files !== []) {
                res.data.files.forEach((item) => {
                  this.updataList.push({
                    ImageListNo: item.ImageListNo,
                    FullName: item.ImageName,
                    Url: item.LinkUrl,
                  })
                })
              }
            })
            .catch((err) => {
              console.log(err)
            })
          this.addAialogVisible = true
        }
      }
    },
    // 点击新增按钮
    addOrder() {
      this.state = 'add'
      this.isEdit = true
      this.addParams.CarName = ''
      this.addParams.CarTitle = ''
      this.addParams.CarType = ''
      this.addParams.BLCode = ''
      this.$set(this.addParams, 'Shop', this.shopList[0].id)
      this.addParams.Note = ''
      this.addProduceList = []
      this.addAialogVisible = true
    },
    // 保存新增或修改
    saveProduct() {
      this.$refs.addForm.validate(
        (valid) => {
          if (!valid) return
          if (this.state === 'add') {
            this.saveLoading = true
            ;(this.filesArray = []),
              // {
              //   ImageListNo:'',
              //   ImageType:'',
              //   ImageName:'',
              //   LinkUrl:''
              // }
              this.updataList.forEach((item) => {
                this.filesArray.push({
                  ImageListNo: '',
                  // ImageType: item.ContentType,
                  ImageName: item.FullName,
                  LinkUrl: item.Url,
                })
                // array.ImageType = item.ContentType,
              })
            this.$api.PackingRequest.EditProduction({
              model: { ...this.addParams, files: this.filesArray },
            })
              .then((res) => {
                // console.log(res)
                if (res.statusCode !== 200)
                  return this.$message({
                    message: res.message,
                    type: 'error',
                  })
                this.$message({
                  message: '新增装箱单成功',
                  type: 'success',
                })
                this.updataList = []
                this.filesArray = []
                this.$refs.addForm.resetFields()
                this.addAialogVisible = false
                this.searchOrderList()
              })
              .catch((err) => console.log(err))
              .finally(() => {
                this.chooseList = []
                this.saveLoading = false
                this.delLength = [] //数据制空
              })
          } else {
            this.saveLoading = true
            this.updataList.forEach((item) => {
              this.filesArray.push({
                ImageListNo: item.ImageListNo,
                ImageType: item.ContentType,
                ImageName: item.FullName,
                LinkUrl: item.Url,
              })
            })
            this.$api.PackingRequest.EditProduction({
              model: {
                ...this.addParams,
                CarPlanNo: this.delLength[0]['CarPlanNo'],
                files: this.filesArray,
              },
            })
              .then((res) => {
                // console.log(res)
                if (res.statusCode !== 200)
                  return this.$message({
                    message: res.message,
                    type: 'error',
                  })
                this.$message({
                  message: '编辑装箱单成功',
                  type: 'success',
                })
                this.updataList = []
                this.filesArray = []
                this.$refs.addForm.resetFields()
                this.addAialogVisible = false
                this.searchOrderList()
              })
              .catch((err) => console.log(err))
              .finally(() => {
                this.delLength = [] //数据制空
                this.chooseList = []
                this.saveLoading = false
              })
          }
        },
        (err) => {
          console.log(err)
        }
      )
    },
    // 确认复核
    ConfirmReview() {
      this.reviewLoading = true
      this.$api.PackingRequest.isCheck({
        CarPlanNo: this.delLength[0]['CarPlanNo'],
        Reviewed: '1',
      })
        .then((res) => {
          // console.log(res)
          if (res.statusCode !== 200) return this.$message(res.$message)
          this.$message.success("确认复核成功")
          this.updataList = []
          this.filesArray = []
          this.$refs.addForm.resetFields()
          this.addAialogVisible = false
          this.searchOrderList()
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.delLength = [] //数据制空
          this.chooseList = []
          this.reviewLoading = false
        })
    },
    // 取消复核
    reReview() {
      this.reviewLoading = true
      this.$api.PackingRequest.isCheck({
        CarPlanNo: this.delLength[0]['CarPlanNo'],
        Reviewed: '0',
      })
        .then((res) => {
          // console.log(res)
          if (res.statusCode !== 200) return this.$message(res.$message)
          this.$message.success("取消复核成功")
          this.updataList = []
          this.filesArray = []
          this.$refs.addForm.resetFields()
          this.addAialogVisible = false
          this.searchOrderList()
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.delLength = [] //数据制空
          this.chooseList = []
          this.reviewLoading = false
        })
    },
    // isCheck
    // 取消新增按钮事件
    resetAdd() {
      this.addAialogVisible = false
      this.$refs.addForm.resetFields()
    },
    // 通过产品编码内图标选择产品
    iconChooseProduct() {
      ;(this.loading1 = true),
        (this.productLoading = true),
        (this.chooseDaialogVisible = true)
      this.chooseList = []
      this.$api.PackingRequest.queryPacking({ model: this.chooseParams })
        .then((res) => {
          console.log(res)
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
        .finally(() => {
          ;(this.productLoading = false), (this.loading1 = false)
        })
    },
    // 展开与隐藏
    IconShow() {
      this.iconShow = !this.iconShow
    },
    // 新增弹出框关闭前的回调
    addAialogClose() {
      this.$refs.addForm.resetFields()
      this.addParams.CarName = ''
      this.addParams.CarTitle = ''
      this.addParams.CarType = ''
      this.addParams.BLCode = ''
      this.addParams.PlanNo = ''
      this.addParams.show = ''
      this.$set(this.addParams, 'Shop', this.shopList[0].id)
      this.addParams.Note = ''
      this.updataList = []
      this.getNowDate()
      this.addAialogVisible = false
    },
    // 选择弹出框关闭前的回调
    choooseClose() {
      this.chooseList = []
      this.chooseParams.DeliveryPlanCode = ''
      this.$refs.chooseForm.resetFields()
    },

    searchOrderList() {
      this.IsSearch = true
      this.getOrderList()
      this.delLength = []
    },
    // 确定选择的数据
    chooseProduct() {
      if (this.chooseList.length < 1) {
        this.$message({
          type: 'error',
          message: '请通过复选框选择发货申请单号',
        })
      } else {
        let newArr = this.chooseList
        let chooseInput = [] //输入框的数据
        let arr = [] //后端需要的拼接字符串
        newArr.forEach((item) => {
          chooseInput.push(item['Column1'].split('◇')[0])
          arr.push(item['Column1'].split('◇')[1])
        })
        // console.log(chooseInput.join());
        this.addParams.show = arr.join()
        this.addParams.PlanNo = chooseInput.join()
        this.chooseDaialogVisible = false
      }
    },
    // 主表获取表格列表数据
    getOrderList() {
      this.loading = true
      this.tableLoading = true
      this.filterData = ''
      if (this.queryPramsTable.BeginDate == null) {
        this.queryPramsTable.BeginDate = ''
      }
      if (this.queryPramsTable.EndDate == null) {
        this.queryPramsTable.EndDate = ''
      }
      this.$api.PackingRequest.getQuery({ model: this.queryPramsTable })
        .then((res) => {
          // console.log(res)
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.orderManagementList = res.data
            this.pageList()
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
          this.tableLoading = false
        })
    },
    // 选择装箱单产品checkbox
    onChooseCheckboxChange(row) {
      // console.log(row);
      if (row.checked) {
        this.chooseList.push(row.row)
      } else {
        let InDex = this.chooseList.findIndex((item) => {
          return item.ID === row.row.ID
        })
        this.chooseList.splice(InDex, 1)
      }
    },

    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.paging.data = this.orderManagementList
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
      this.pageList()
    },
    // 当当前页改变
    handleCurrentChange(val) {
      this.paging.page = val
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
    // 获取站点列表
    addProductState() {
      this.$api.publicApi
        .basShop()
        .then((res) => {
          if (res.Code < 0) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.shopList = res.data
            this.$set(this.addParams, 'Shop', this.shopList[0].id)
          }
        })
        .catch((err) => console.log(err))
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
      // 获取三个月前的时间
      var threeMonthDate = new Date()
      threeMonthDate.setMonth(threeMonthDate.getMonth() - 3)
      var startTime1 =
        threeMonthDate.getFullYear() +
        '-' +
        (threeMonthDate.getMonth() + 1) +
        '-' +
        threeMonthDate.getDate()
      this.$set(this.queryPramsTable, 'EndDate', toMonth)
      this.$set(this.addParams, 'CarOut', toMonth)
      this.$set(this.queryPramsTable, 'BeginDate', startTime)
      this.$set(this.chooseParams, 'begindate', startTime1)
      this.$set(this.chooseParams, 'endDate', toMonth)
    },
    cabinetType() {
      this.$api.publicApi
        .GetContainerList({ flag: 'ContainerType' })
        .then((res) => {
          console.log(res)
          this.containerList = res.data
        })
        .catch((err) => console.log(err))
    },
    //上传
    uploadSuccess(response, file, fileList) {
      this.updataList.push(...response.data)
      console.log(this.updataList)
    },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    handleDownload(item) {
      // console.log(file)
      window.open(this.Imgurl + item.Url)
    },
    delUploader(itemData) {
      let index = this.updataList.findIndex((item) => {
        return item === itemData
      })
      this.updataList.splice(index, 1)
    },
  },
  computed: {},
  created() {
    this.addProductState()
    this.getNowDate()
    this.getOrderList()
    this.searchEvent1()
    this.cabinetType()
    this.resize()
  },
}
</script>
<style lang="scss" scoped>
.cardMargin {
  margin-top: 0px !important;
}
.closeInput {
  border: 1px solid #36c2cf;
  background-color: #36c2cf;
  margin-left: 5px !important;
  line-height: 0px;
  height: 30px;
}
.blockSpan {
  width: 100%;
  display: flex;
  height: 32px;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid #c7c6de;
}
>>> .listDate .el-input__inner {
  height: 30px;
  padding: 0 0 0 5px;
  width: 99px;
  border-radius: 4px 0 0 4px;
}
>>> .el-form-item {
  margin-bottom: 0px;
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
>>> .blockDate .el-input__inner {
  height: 30px;
  width: 100%;
  border: none;
}
>>> .blockDate .el-input__inner input {
  width: 125px !important;
}
>>> .blockDate .el-input__icon {
  height: 30px;
}
>>> .blockDate .el-range-separator {
  height: 30px;
  padding: 0;
}
.tableTitle {
  margin-top: 15px;
}
>>> .mainForm .el-form-item__content {
  line-height: normal;
}
>>> .mainForm .el-form-item__label {
  line-height: 30px;
}
.tipsLeft .el-form-item__error {
  left: -83px;
}
>>> .mainForm .marginLeft {
  margin-left: 0px;
}
>>> .searchMargin {
  // margin-left: 15px;
  margin-bottom: 0;
}
.marginR {
  margin-left: 0px;
  display: flex;
  justify-content: space-between;
}
.marginR .marginLeft {
  margin-left: -82px;
  margin-top: -10px;
}
.cellChooseClass {
  height: 28px;
}
.img {
  width: 200px;
  height: 60px;
}
.CloseIcon {
  width: 40px;
  line-height: normal;
  background: #5473e8;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid #5473e8;
}
.NoCloseIcon {
  width: 70px;
  line-height: normal;
  background: #5473e8;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid #5473e8;
}
.SaveIcon {
  width: 40px;
  line-height: normal;
  background: #ff9b22;
  border: 1px solid #ff9b22;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
}
.cellChooseClassLeft {
  height: 45px;
  line-height: normal;
}
.el-card {
  width: 100%;
  padding: 11px;
  margin-top: 7px;
  >>> .el-card__body {
    padding: 0;
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
>>> .renminder {
  font-size: 14px;
  display: flex;
  height: 30px;
  width: 1200px;
  margin: 0 0 7px 15px;
  justify-content: space-between;
  >>> .el-form-item__label {
    margin-left: -62px;
  }
}
// >>> .footerCellClassName {
//   background: #d1f3ff;
// }
.searchBtn {
  width: 70px !important;
  height: 30px !important;
  line-height: 10px;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 60px;
}
.mainTable .el-card {
  height: 100%;
}

.delBtn {
  width: 70px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
>>> .el-checkbox {
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
    border: 1px solid #5473e8;
    font-weight: 400;
    color: #fcfefe;
    padding: 0;
  }
}
>>> .vxe-table--render-default
  .vxe-table--fixed-left-wrapper.scrolling--middle {
  box-shadow: none;
}
>>> .vxe-table--render-default.border--full .vxe-table--fixed-left-wrapper {
  border-right: none;
}
>>> .vxe-table--render-default .vxe-body--column,
.vxe-table--render-default .vxe-footer--column,
.vxe-table--render-default .vxe-header--column {
  line-height: 15px;
}
>>> .el-button + .el-button {
  margin-left: 0px;
}
>>> .el-button--primary {
  border-color: #5473e8;
}

.marginLeft {
  margin-left: -62px;
}
.CloseBtn {
  margin-top: 15px;
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
.special {
  flex: 1;
  position: relative;
  .choose {
    position: absolute;
    top: 0;
    right: -20px;
  }
}
>>> .Delivery > .vxe-input--inner {
  width: 630px !important;
}
>>> .vxe-input--inner {
  position: relative;
  width: 180px;
  >>> .vxe-input--suffix .is--clear {
    position: absolute;
    top: 2px;
    right: -20px;
  }
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
>>> .chooseEnter {
  width: 70px;
  height: 32px;
  background: #5473e8;
  border-radius: 2px;
  line-height: 32px;
  padding: 0;
}
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
>>> .unifySizeDate {
  width: 49% !important;
}
>>> .unifySize1 {
  height: 30px;
}

>>> .marginLeft {
  margin-left: -15px;
  margin-top: 10px;
}
>>> .marginLe {
  margin-top: 10px;
}
>>> .productHeight .el-input__inner {
  border-radius: 0px;
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
.unifySize2 {
  margin-left: 30px;
}
>>> .el-input__inner input {
  width: 150px !important;
}
// >>> .addform[data-v-2a1679eb] .el-input__inner {
//   width: 154px;
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
.chooseCancel {
  width: 70px;
  height: 32px;
  background: #908fa0;
  border-radius: 2px;
  color: #fff;
  line-height: 32px;
  padding: 0;
}
>>> .hearderClass {
  text-align: center;
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  height: 34px;
  color: #333;
  background-color: #d5deff;
}
>>> .cellClass {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 30px;
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
>>> .pagination {
  float: right;
  margin-top: 20px;
}
>>> .unifySize .el-input__icon {
  line-height: normal;
}
>>> .el-form-item__label {
  padding: 0;
}
.closeTable {
  display: flex;
  justify-content: flex-end;
}
.closeTableBtn {
  width: 70px;
  height: 32px;
  margin: 20px 10px 0 0;
  background: #5473e8;
  border-radius: 2px;
  line-height: 32px;
  padding: 0;
  font-size: 14px;
}
.iconP {
  font-size: 22px;
  color: #5473e8;
  float: right;
  transform: rotate(90deg);
}
>>> .reminClass {
  margin-left: 5px;
  margin-top: -10px;
}
.bottomTable {
  display: flex;
  justify-content: space-between;
  .bottomTable_l {
    height: 400px;
    flex: 6;
    margin-right: 11px;
  }
  .bottomTable_r {
    flex: 4;
    height: 400px;
  }
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
.saveBtn2 {
  width: 100px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #5473e8;
  border: 1px solid #5473e8 !important;
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
// >>> .JyDialog {
//   height: 550px;
// }
.addform >>> .el-input__inner {
  width: 154px;
}
>>> .jy_wrapper .el-dialog__body {
  border-bottom: none !important;
}
>>> .el-dialog .el-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
>>> .NoneIcon .el-input__prefix {
  display: none;
}
.NullTip {
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 400px;
  transform: translate(-50%, 50%);
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
// 文字提示
.item {
  margin: 1px;
}
.el-upload__text {
  width: 120px;
  border-radius: 2px;
  height: 30px;
  line-height: 30px;
  background-color: #f0f0f0;
}
>>> .el-upload-list {
  width: 300px;
  margin: 0;
  padding: 0;
  list-style: none;
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
</style>