<template >
  <el-container id="mainCard">
    <el-card id="queryRow">
      <el-form
        :model="ShipmentManagementParams"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row class="marginL">
          <el-col :md="10" :lg="6" :xl="6"
            ><el-form-item label="制单时间:">
              <span class="blockDate">
                <el-select
                  v-model="ShipmentManagementParams.datetype"
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
                <el-date-picker
                  clearable
                  class="None-Border"
                  type="date"
                  v-model="ShipmentManagementParams.begdate"
                  value-format="yyyy-MM-dd"
                  placeholder="制单开始"
                ></el-date-picker>
                <el-date-picker
                  class="None-Border"
                  type="date"
                  clearable
                  v-model="ShipmentManagementParams.enddate"
                  value-format="yyyy-MM-dd"
                  placeholder="制单结束"
                ></el-date-picker>
              </span> </el-form-item
          ></el-col>

          <el-col :md="5" :lg="4" :xl="4"
            ><el-form-item label="货件号:">
              <el-input
                clearable
                @keyup.enter.native="searchShipment()"
                v-model="ShipmentManagementParams.fbashipmentno"
                placeholder="请输入货件号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="5" :lg="4" :xl="4"
            ><el-form-item label="货件名称:">
              <el-input
                clearable
                @keyup.enter.native="searchShipment()"
                v-model="ShipmentManagementParams.fbashipmentname"
                placeholder="请输入货件名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="5" :lg="3" :xl="3"
            ><el-form-item label-width="60px" label="视图:">
              <el-select clearable v-model="ShipmentManagementParams.view">
                <el-option
                  :key="index"
                  v-for="(item, index) in ViewList"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="marginL">
          <el-col :md="5" :lg="3" :xl="3"
            ><el-form-item label="货件地址:">
              <el-select
                clearable
                size="mini"
                v-model="ShipmentManagementParams.fba_add_code"
                placeholder="货件地址"
              >
                <el-option label="" value=""></el-option>
                <el-option
                  :key="index"
                  v-for="(item, index) in addressList"
                  :label="item.Code"
                  :value="item.Name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="5" :lg="3" :xl="3">
            <el-form-item label-width="80px" label="站点:">
              <el-select
                v-model="ShipmentManagementParams.Shop"
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

          <el-col :md="5" :lg="4" :xl="4"
            ><el-form-item label="条码:">
              <el-input
                clearable
                @keyup.enter.native="searchShipment()"
                v-model="ShipmentManagementParams.fba_barcode"
                placeholder="请输入条码"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :md="5" :lg="4" :xl="4"
            ><el-form-item label-width="100px" label="跟踪编码:">
              <el-input
                clearable
                @keyup.enter.native="searchShipment()"
                v-model="ShipmentManagementParams.TrackingNo"
                placeholder="请输入跟踪编码"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 按钮区域 -->
        <el-row style="margin-left: 22px">
          <el-col class="marginL secondBtn">
            <el-button
              type="danger"
              :loading="serchLoading"
              class="searchBtn"
              size="small"
              @click="searchShipment"
              icon="el-icon-search"
              >查询</el-button
            >
            <el-button
              type="primary"
              @click="addShipment"
              class="smBtn iconBtn el-icon-plus"
              >新增</el-button
            >
            <el-button
              @click="editShipment"
              type="primary"
              class="smBtn iconBtn iconfont kt-icon-bianji"
              >修改</el-button
            >
            <el-button
              type="danger"
              @click="delShipment"
              class="searchBtn el-icon-delete"
              size="small"
              >删除</el-button
            >
            <el-button
              type="primary"
              @click="updateDialog"
              class="iconBtn el-icon-s-promotion"
              >上传条码</el-button
            >
            <el-button
              @click="Detail"
              type="primary"
              class="smBtn iconBtn el-icon-document"
              >详情</el-button
            >
            <el-button
              type="primary"
              @click="repeatedlyCheck"
              class="smBtn iconBtn iconfont kt-icon-daibanrenwu"
              >复核</el-button
            >
            <el-button type="primary" class="iconBtn iconfont kt-icon-daochu"
              >导出标签</el-button
            >
            <el-button
              type="primary"
              @click="exportExcel"
              class="iconBtn iconfont kt-icon-daochu"
              >导出Excel</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <vxe-table
        border
        resizable
        stripe
        :loading="serchLoading"
        width="auto"
        show-footer
        ref="mainTable"
        class="mytable-scrollbar"
        :auto-resize="true"
        @cell-dblclick="editTable"
        @cell-click="cellclick"
        :footer-method="footerMethod"
        :footer-cell-class-name="footerCellClassName"
        :header-row-class-name="hearderClass"
        show-overflow="title"
        :row-class-name="cellClass"
        :height="gridHeight"
        highlight-current-row
        @checkbox-all="onShipmentCheckboxAllChange"
        @checkbox-change="onShipmentCheckboxChange"
        :config="{ render: 'scroll' }"
        :align="'center'"
        :checkbox-config="{ highlight: true }"
        :data="paging.data"
      >
        <vxe-table-column fixed="left" type="checkbox" width="40">
        </vxe-table-column>
        <vxe-table-column
          fixed="left"
          type="seq"
          width="50"
          title="序号"
        ></vxe-table-column>
        <vxe-table-column
          fixed="left"
          width="90"
          field="id"
          title="id"
        ></vxe-table-column>
        <vxe-table-column
          fixed="left"
          width="80"
          field="标签复核"
          title="标签复核"
        ></vxe-table-column>
        <vxe-table-column
          fixed="left"
          width="80"
          field="发货状态"
          title="发货状态"
        ></vxe-table-column>
        <vxe-table-column
          fixed="left"
          width="65"
          field="站点"
          title="站点"
        ></vxe-table-column>
        <vxe-table-column
          :align="'left'"
          width="120"
          field="货件编号"
          title="货件编号"
        ></vxe-table-column>
        <vxe-table-column
          fixed="left"
          :align="'left'"
          width="145"
          field="货件名称"
          title="货件名称"
        ></vxe-table-column>
        <vxe-table-column
          fixed="left"
          width="60"
          field="地址编码"
          title="地址"
        ></vxe-table-column>
        <vxe-table-column
          width="95"
          field="计划编号"
          title="计划编号"
        ></vxe-table-column>
        <vxe-table-column
          width="100"
          field="装箱单日期"
          title="装箱单日期"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="sku总数"
          title="sku总数"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="fba数量"
          title="fba数量"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="fba箱数"
          title="fba箱数"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="已发数量"
          title="已发数量"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="已发箱数"
          title="已发箱数"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="待发数量"
          title="待发数量"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="待发箱数"
          title="待发箱数"
        ></vxe-table-column>
        <vxe-table-column
          width="160"
          field="跟踪编码"
          title="跟踪编码"
        ></vxe-table-column>
        <vxe-table-column
          width="160"
          field="起始条码"
          title="起始条码"
        ></vxe-table-column>
        <vxe-table-column
          width="160"
          field="结束条码"
          title="结束条码"
        ></vxe-table-column>
        <vxe-table-column
          width="70"
          field="制单人"
          title="制单人"
        ></vxe-table-column>
        <vxe-table-column
          width="90"
          field="制单日期"
          title="制单日期"
        ></vxe-table-column>
      </vxe-table>
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

    <!-- 新增货件 -->
    <jy-dialog
      title="货件管理"
      v-dialogDrag
      top="1vh"
      @close="closeDaialog"
      :close-on-click-modal="false"
      append-to-body
      class="addDaialog"
      :visible.sync="addAialogVisible"
      width="75%"
    >
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="货件编辑" name="first">
          <!-- 表单数据 -->
          <el-form
            ref="addForm"
            :rules="addRules"
            :model="addParams"
            style="font-size: 14px; height: 700px"
            label-width="84px"
          >
            <el-row>
              <el-col :span="4">
                <el-form-item prop="Shop" label="站点:">
                  <el-select
                    clearable
                    :disabled="isEdit"
                    v-model="addParams.Shop"
                    class="unifySize"
                  >
                    <el-option value="" label=""></el-option>
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
                <el-form-item prop="fbashipmentno" label="货件号:">
                  <el-input
                    clearable
                    :disabled="isEdit"
                    v-model="addParams.fbashipmentno"
                    class="unifySize"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  label-width="100px"
                  prop="fbashipmentname"
                  label="货件名称:"
                >
                  <el-input
                    clearable
                    :disabled="isEdit"
                    v-model="addParams.fbashipmentname"
                    class="unifySize"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label-width="110px" label="计划编号:">
                  <el-input
                    clearable
                    :disabled="isEdit"
                    v-model="addParams.fba_planno"
                    class="unifySize"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="备注:">
                  <el-input
                    clearable
                    :disabled="isEdit"
                    v-model="addParams.remark"
                    class="unifySize"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="4">
                <el-form-item prop="sku_quantity" label="sku总数:">
                  <el-input
                    clearable
                    :disabled="isEdit"
                    v-model="addParams.sku_quantity"
                    class="unifySize"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item prop="quantity" label="商品总数:">
                  <el-input
                    clearable
                    :disabled="isEdit"
                    v-model="addParams.quantity"
                    class="unifySize"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  prop="fba_add_code"
                  label-width="120px"
                  label="配送地址代码:"
                >
                  <el-select clearable v-model="addParams.fba_add_code">
                    <el-option value="" label=""></el-option>
                    <el-option
                      :key="index"
                      v-for="(item, index) in addressList"
                      :label="item.Code"
                      :value="item.Name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  prop="startdate"
                  label-width="110px"
                  label="装箱单日期:"
                >
                  <el-date-picker
                    :disabled="isEdit"
                    class="unifySize"
                    v-model="addParams.fba_date"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="追踪编码:">
                  <el-input
                    clearable
                    v-model="addParams.TrackingNo"
                    class="unifySize"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24" style="height: 65px">
                <!-- 文本域 -->
                <el-form-item prop="fba_add" label="配送地址:">
                  <el-input
                    :disabled="isEdit"
                    v-model="addParams.fba_add"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入配送地址"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <JyTableInput
              border
              ref="addTable"
              resizable
              stripe
              keep-source
              show-footer
              class="mytable-scrollbar"
              :edit-rules="validRules"
              :footer-method="addfooterMethod"
              :footer-cell-class-name="footerCellClassName"
              :auto-resize="true"
              style="margin-top: 11px"
              show-overflow="title"
              width="auto"
              :row-class-name="cellClassAdd"
              :header-row-class-name="hearderClass"
              height="490"
              highlight-current-row
              :edit-config="{ trigger: 'click', mode: 'row' }"
              :align="'center'"
              :checkbox-config="{
                highlight: true,
              }"
              :columns="r_columns"
              :data.sync="addShipmentList"
            >
            </JyTableInput>
          </el-form>
          <el-row class="floatR">
            <el-col>
              <el-button
                v-if="!isEdit"
                type="primary"
                :loading="saveLoading"
                @click="saveShipment"
                class="saveAnd iconfont kt-icon-baocun"
                >保存</el-button
              >

              <el-button
                type="primary"
                v-show="isEdit"
                @click="daialogUpdate"
                class="saveAnd el-icon-s-promotion"
                >上传条码</el-button
              >
              <el-button
                type="primary"
                @click="editAdress"
                v-show="!isNew"
                class="editadressCode iconfont kt-icon-bianji"
                >修改配送地址编码及跟踪编码</el-button
              >
              <el-button
                type="primary"
                @click="addAialogVisible = false"
                class="clearBtn"
                >取消</el-button
              >
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="标签信息" name="second">
          <!-- 按钮区域 -->
          <el-row>
            <el-col class="secondBtn">
              <div>sku标签汇总</div>
              <el-button
                type="primary"
                @click="lableRepeatedlyCheck"
                class="smBtn iconBtn iconfont kt-icon-daibanrenwu"
                >复核</el-button
              >
              <el-button
                type="primary"
                @click="cancelRepeatedlyCheck"
                class="iconBtn iconfont kt-icon-caidan"
                >取消复核</el-button
              >
              <el-button
                type="primary"
                @click="clearLable"
                class="iconBtn iconfont kt-icon-shanchu"
                >清空标签</el-button
              >
              <el-button
                type="primary"
                @click="refresh"
                class="smBtn iconBtn iconfont kt-icon-jiazai_shuaxin"
                >刷新</el-button
              >
            </el-col>
          </el-row>
          <vxe-table
            border
            resizable
            stripe
            keep-source
            :auto-resize="true"
            style="margin-top: 5px"
            show-overflow="title"
            width="auto"
            show-footer
            class="mytable-scrollbar"
            ref="multipleTable"
            @cell-click="showBottomTable"
            :footer-method="SKULabelfooterMethod"
            :footer-cell-class-name="footerCellClassName"
            :header-cell-class-name="hearderClass"
            height="300"
            highlight-current-row
            :edit-config="{ trigger: 'click', mode: 'cell' }"
            :align="'center'"
            :checkbox-config="{
              highlight: true,
            }"
            :data="SKULabelList"
          >
            <vxe-table-column type="checkbox" width="40"></vxe-table-column>
            <vxe-table-column
              type="seq"
              width="50"
              title="序号"
            ></vxe-table-column>
            <vxe-table-column width="155" field="SKU" title="SKU">
            </vxe-table-column>
            <vxe-table-column
              field="产品编码"
              width="150"
              title="产品编码"
            ></vxe-table-column>
            <vxe-table-column
              field="产品名称"
              title="产品名称"
            ></vxe-table-column>
            <vxe-table-column
              width="80"
              field="商品数量"
              title="商品数量"
            ></vxe-table-column>
            <vxe-table-column
              width="80"
              field="标签数量"
              title="箱单数量"
            ></vxe-table-column>
            <vxe-table-column
              width="155"
              field="起始流水号"
              title="起始流水号"
            ></vxe-table-column>
            <vxe-table-column
              width="125"
              field="结束流水号"
              title="结束流水号"
            ></vxe-table-column>
            <vxe-table-column width="100" field="已发货数量" title="已发货数量">
            </vxe-table-column>
            <vxe-table-column
              width="110"
              field="已发货标签数"
              title="已发货箱单数"
            ></vxe-table-column>
            <vxe-table-column
              width="80"
              field="可用数量"
              title="可用数量"
            ></vxe-table-column>
            <vxe-table-column width="100" field="可用标签数" title="可用箱单数">
            </vxe-table-column>
          </vxe-table>

          <div>标签列表</div>
          <el-row>
            <el-form ref="ruleForm" label-width="84px">
              <el-col class="secondBtn" :span="3">
                <el-select
                  @change="skuSearch"
                  v-model="status"
                  placeholder="请选择状态"
                >
                  <el-option
                    :key="index"
                    v-for="(item, index) in statusList"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-input
                  @keyup.enter.native="skuSearch"
                  placeholder="请输入sku或者条码"
                  class="marginLeft"
                  v-model="skuNum"
                >
                </el-input>
              </el-col>
              <el-col class="secondBtn marginLeft" :span="15">
                <el-button
                  type="primary"
                  @click="skuSearch"
                  class="iconBtn marginLeft iconfont kt-icon-sousuo"
                  >搜索</el-button
                >
                <el-button
                  @click="allChoose"
                  type="primary"
                  class="smBtn iconBtn iconfont kt-icon-duoxuanxuanzhong"
                  >全选</el-button
                >
                <el-button
                  @click="contraryChoose"
                  type="primary"
                  class="smBtn iconBtn iconfont kt-icon-anniu_guanbi_o"
                  >反选</el-button
                >
                <el-button
                  type="primary"
                  @click="BatchMark"
                  class="iconBtn iconfont kt-icon-caidan"
                  >批量标记</el-button
                >
                <el-button
                  type="primary"
                  @click="BatchCancle"
                  class="iconBtn iconfont kt-icon-caidan"
                  >批量取消</el-button
                >
                <el-button
                  type="primary"
                  @click="editProduct"
                  class="iconBtnB iconfont kt-icon-bianji"
                  >批量修改产品号</el-button
                >
                <el-button
                  type="primary"
                  @click="showAll"
                  class="iconBtnB iconfont kt-icon-bianji"
                  >显示全部箱单</el-button
                >
              </el-col>
              <el-col>
                <vxe-table
                  border
                  resizable
                  stripe
                  keep-source
                  ref="LabelList"
                  :auto-resize="true"
                  style="margin-top: 5px"
                  show-overflow="title"
                  class="mytable-scrollbar"
                  width="auto"
                  :row-class-name="LabelListcellClass"
                  @checkbox-change="onCheckboxChange"
                  @checkbox-all="onCheckboxAllChange"
                  :header-row-class-name="hearderClass"
                  height="275"
                  highlight-current-row
                  :edit-config="{ trigger: 'click', mode: 'cell' }"
                  :align="'center'"
                  :checkbox-config="{
                    highlight: true,
                  }"
                  :data="LabelList"
                >
                  <vxe-table-column
                    type="checkbox"
                    width="40"
                  ></vxe-table-column>
                  <vxe-table-column
                    type="seq"
                    width="50"
                    title="序号"
                  ></vxe-table-column>
                  <vxe-table-column width="85" field="操作" title="操作">
                    <template slot-scope="{ row }">
                      <el-button
                        v-show="row.allowupdate == '1'"
                        class="NoCloseIcon"
                        @click="editProductIcon(row)"
                      >
                        改产品号
                      </el-button>
                    </template>
                  </vxe-table-column>
                  <vxe-table-column
                    width="160"
                    field="fba条码"
                    title="fba条码"
                  ></vxe-table-column>
                  <vxe-table-column
                    field="产品编号"
                    title="产品编号"
                  ></vxe-table-column>
                  <vxe-table-column
                    field="sku号"
                    title="sku号"
                  ></vxe-table-column>
                  <vxe-table-column
                    width="60"
                    field="数量"
                    title="数量"
                  ></vxe-table-column>
                  <vxe-table-column
                    width="115"
                    field="货件号"
                    title="货件号"
                  ></vxe-table-column>
                  <vxe-table-column
                    width="80"
                    field="打印次数"
                    title="打印次数"
                  ></vxe-table-column>
                  <vxe-table-column
                    width="140"
                    field="打印时间"
                    title="打印时间"
                  >
                  </vxe-table-column>
                  <vxe-table-column
                    width="70"
                    field="打印人"
                    title="打印人"
                  ></vxe-table-column>
                  <vxe-table-column
                    width="140"
                    field="制单日期"
                    title="制单时间"
                  ></vxe-table-column>
                  <vxe-table-column width="70" field="制单人" title="制单人">
                  </vxe-table-column>
                  <vxe-table-column width="60" field="isuse" title="状态">
                  </vxe-table-column>
                </vxe-table>
              </el-col>
            </el-form>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="图形" name="third">
          <div class="demo-image__placeholder">
            <!-- 条码盒子 -->
            <div class="block" :key="index" v-for="(item, index) in LabelList">
              <div v-if="item.isuse === '已使用'" class="statusCricle">
                <span class="CricleFont">{{ item.isuse }}</span>
              </div>
              <el-image
                class="imgBlock"
                slot="error"
                :src="'http://' + FbaAdress + '/Upload/Pdfpro/' + item.标签路径"
              ></el-image>
              <!-- 'http://192.168.10.142:355/Upload/Pdfpro/' + item.标签路径 -->
              <!-- 'http://47.99.32.10:8559/Upload/Pdfpro/' + item.标签路径 -->
              <div class="posDiv">
                <el-row class="PicClass">
                  <el-col :span="4">条码</el-col>
                  <el-col :span="12">{{ item.fba条码 }}</el-col>
                  <el-col :span="4">数量</el-col>
                  <el-col :span="4">{{ item.数量 }}</el-col>
                </el-row>
                <el-row class="PicClass">
                  <el-col :span="4">SKU</el-col>
                  <el-col :span="20">{{ item.sku号 }}</el-col>
                </el-row>
                <el-row class="PicClass">
                  <el-col :span="4">产品编号</el-col>
                  <el-col :span="20">{{ item.产品编号 }}</el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </jy-dialog>

    <!--批量修改产品号 -->
    <jy-dialog
      title="产品编号修改"
      v-dialogDrag
      :close-on-click-modal="false"
      :visible.sync="EditAialogVisible"
      append-to-body
      hieght="800px"
      width="1250px"
    >
      <el-row class="Padd">
        <el-col class="marginTop" :span="24"
          ><el-input
            id="textProductCode"
            :disabled="true"
            v-model="ProdpuceCode"
            type="textarea"
            :rows="2"
          >
          </el-input
        ></el-col>
        <el-col class="marginTop" :span="10">
          <el-input v-model="skuNum2"> </el-input>
        </el-col>
        <el-col class="secondBtn LeftMA marginTop" :span="3">
          <el-button
            type="primary"
            @click="SKUsearch"
            class="iconBtn iconfont kt-icon-caidan"
            >sku搜索</el-button
          >
        </el-col>
      </el-row>
      <el-row class="Padd">
        <vxe-table
          border
          resizable
          stripe
          keep-source
          ref="editRef"
          :auto-resize="true"
          show-overflow="title"
          width="auto"
          class="mytable-scrollbar"
          :footer-cell-class-name="footerCellClassName"
          :header-cell-class-name="hearderClass"
          height="600"
          highlight-current-row
          :align="'center'"
          :checkbox-config="{
            highlight: true,
          }"
          :data="editProductList"
        >
          <vxe-table-column type="checkbox" width="40"></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="50"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column width="180" field="sku" title="SKU">
          </vxe-table-column>
          <vxe-table-column
            width="180"
            field="productno"
            title="产品编号"
          ></vxe-table-column>
          <vxe-table-column
            field="productname"
            title="产品名称"
          ></vxe-table-column>
          <vxe-table-column
            width="60"
            field="quantity"
            title="数量"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="ASIN"
            title="ASIN"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="fnsku"
            title="FNSKU"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="percasequantity"
            title="每箱数量"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="finddegree"
            title="匹配程度"
          ></vxe-table-column>
        </vxe-table>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              type="primary"
              @click="editProductRef"
              class="saveAnd iconfont kt-icon-baocun"
              >确 定</el-button
            >
            <el-button
              type="primary"
              @click="EditAialogVisible = false"
              class="clearBtn"
              >取消</el-button
            >
          </el-col>
        </el-row>
      </span>
    </jy-dialog>

    <!-- 文件上传 -->
    <jy-dialog
      title="FBA标签上传"
      v-dialogDrag
      :close-on-click-modal="false"
      :visible.sync="updateDialogVisible"
      append-to-body
      width="50%"
      height="500px"
    >
      <el-upload
        drag
        :before-upload="beforeUploadFile"
        :action="UploadUrl()"
        :auto-upload="false"
        :on-change="fileChange"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        accept=".PDF"
        :on-error="handleError"
        :before-remove="beforeRemove"
        :limit="limitNum"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text"><em>点击此处选择上传文件</em></div>
        <div class="el-upload__tip" slot="tip">只能上传pdf文件</div>
      </el-upload>

      <span ref="errprReason" class="errprReason"></span>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              :loading="loadingUpdate"
              @click="uploadFile"
              type="primary"
              class="saveAnd iconfont kt-icon-baocun"
              >上传</el-button
            >
            <el-button
              type="primary"
              @click="updateDialogVisible = false"
              class="clearBtn"
              >取消</el-button
            >
          </el-col>
        </el-row>
      </span>
    </jy-dialog>
  </el-container>
</template>

<script>
import axios from 'axios'
import JyTableInput from '@/components/JyTableInput/index'
import Cookies from 'js-cookie'
import FileSaver from 'file-saver'
import JyDialog from '@/components/JyDialog'
import XLSX from 'xlsx'
export default {
  components: { JyTableInput, JyDialog },
  data() {
    return {
      saveLoading: false,
      gridHeight: 650,
      r_columns: [
        { title: '卖家SKU', field: 'sku', width: '13%' },
        { width: '11%', title: '商品名称', field: '商品名称' },
        { width: '7%', title: 'ASIN', field: 'asin' },
        { title: 'FNSKU', field: 'fnsku', width: '10%' },
        { width: '10%', title: '外部编号', field: '外部编号' },
        { title: '状况', width: '5%', field: '状况', align: 'center' },
        { title: '备货方', width: '5%', field: '备货方', align: 'center' },
        {
          title: '预处理类型',
          width: '8%',
          field: '预处理类型',
          align: 'center',
        },
        { title: '贴标方', width: '5%', field: '贴标方', align: 'center' },
        {
          title: '箱规',
          width: '5%',
          align: 'center',
          field: '每箱数量',
          editRender: {
            props: {
              type: 'number',
            },
          },
        },
        {
          title: '箱数',
          width: '5%',
          align: 'center',
          field: '箱数',
          editRender: {
            props: {
              type: 'number',
            },
          },
        },
        {
          title: '数量',
          width: '5%',
          align: 'center',
          field: '总数量',
          editRender: {
            props: {
              type: 'number',
            },
          },
        },
      ],
      FbaAdress: '',
      iconEdit: false,
      ShipmentManagementParams: {
        usercode: '',
        begdate: '',
        enddate: '',
        fbashipmentno: '',
        fbashipmentname: '',
        Shop: '',
        TrackingNo: '',
        ShipmentManagementParams: '',
        fba_barcode: '',
        view: '',
        datetype: '1',
        o_retmsg: '',
      },
      delLengthArr: [],
      batchReminderList: [],
      loadingUpdate: false,
      limitNum: 2, // 同时允许上传的最大数
      updateDialogVisible: false,
      addRules: {
        Shop: [{ required: true, message: '请输入站点', trigger: 'blur' }],
        fbashipmentno: [
          { required: true, message: '请输入货件号', trigger: 'blur' },
        ],
        fbashipmentname: [
          { required: true, message: '请输入货件名称', trigger: 'blur' },
        ],
        sku_quantity: [
          { required: true, message: '请输入sku总数', trigger: 'blur' },
        ],
        quantity: [
          { required: true, message: '请输入商品总数', trigger: 'blur' },
        ],
        fba_add_code: [
          { required: true, message: '请输入配送地址代码', trigger: 'blur' },
        ],
        fba_add: [
          { required: true, message: '请输入配送地址', trigger: 'blur' },
        ],
      },
      validRules: {
        每箱数量: [
          { required: true, message: '每箱数量必须填写' },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值必须为正数',
          },
        ],
        箱数: [
          { required: true, message: '箱数必须填写' },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值必须为正数',
          },
        ],
        总数量: [
          { required: true, message: '数量必须填写' },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值必须为正数',
          },
        ],
      },
      ProduceCode: '',
      EditAialogVisible: false,
      footerCellClassName: 'footerCellClassName',
      hearderClass: 'hearderClass',
      paging: { list: [], data: [], limit: 20, total: null, page: 1 }, //主表分页
      ShipmentManagementList: [],
      shopList: [],
      addShipmentList: [],
      isNew: false,
      SKULabelList: [], //SKU标签汇总
      LabelList: [], //标签列表
      LabelListSencond: [], //标签列表
      delLength: [],
      isDbclick: false,
      productId: '',
      addParams: {
        usercode: '',
        strMessage: '',
        fbashipmentno: '',
        TrackingNo: '',
        fbashipmentname: '',
        Shop: '',
        fba_planno: '',
        fba_add: '',
        fba_date: '',
        sku_quantity: '',
        quantity: '',
        remark: '',
        method: 'add',
        datalist: '',
        fbaid: '',
        o_fbaid: '',
        fba_add_code: '',
      },

      columnIcon: '◇', //列分隔符
      addAialogVisible: false,
      activeName: 'first', //tabs标签展示项
      addressList: [],
      editLength: [],
      LabelListFilter: [],
      editList: [],
      serchLoading: false,
      editProductList: [],
      isEdit: false, //定义是否为编辑状态
      datetype: [
        //日期类型
        {
          value: '1',
          label: '创建时间',
        },
        {
          value: '2',
          label: '装箱单日期',
        },
      ],
      ViewList: [
        //视图类型
        {
          value: '0',
          label: '全部',
        },
        {
          value: '1',
          label: '已发完',
        },
        {
          value: '2',
          label: '未发完',
        },
      ],
      status: '',
      skuNum: '',
      skuNum2: '',
      editStr: '',
      ProdpuceCode: '',
      personFileList: [],
      fileList: [], //上传的文件列表
      editFilterProductList: [],
      statusList: [
        //日期类型
        {
          value: '',
          label: '',
        },
        {
          value: '已使用',
          label: '已使用',
        },
        {
          value: '未使用',
          label: '未使用',
        },
      ],
    }
  },
  methods: {
    closeDaialog() {
      this.$refs.addForm.resetFields()
      this.getShipmentList()
    },
    exportExcel() {
      const ws = XLSX.utils.json_to_sheet(this.ShipmentManagementList)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
      XLSX.writeFile(wb, '货件地址.xls', {
        bookType: 'xls',
        bookSST: false,
        type: 'array',
      })
    },
    //点击单元格
    cellclick(data) {
      if (data.columnIndex != 0) {
        this.$refs.mainTable.setAllCheckboxRow(false)
        this.$refs.mainTable.setCheckboxRow(data.row, true)
      }
    },
    // 弹出层里面的上传按钮
    daialogUpdate() {
      this.updateDialogVisible = true
      this.$refs.errprReason.innerHTML = ''
    },
    // 单个修改产品号
    editProductIcon(row) {
      this.iconEdit = true
      this.EditAialogVisible = true
      var Str = row.fba条码 + '◆'
      this.editStr = Str
      this.$nextTick(() => {
        document.getElementById('textProductCode').innerHTML = Str
      })
      this.$api.shipment
        .EditProduct({
          strMessage: '',
          UserCode: '',
          fba_barcode: Str,
          fbaid: row.fbaid,
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.editProductList = res.data
            this.editFilterProductList = res.data
            this.editLength = []
          }
        })
        .catch((err) => console.log(err))
    },
    // 批量修改产品号
    editProductRef() {
      var data = []
      data.push(...this.$refs.editRef.getCheckboxRecords())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条且只能选择一条数据后操作!',
          type: 'error',
        })
      } else {
        if (this.iconEdit) {
          str = this.editStr
        } else {
          this.editLength = this.$refs.LabelList.getCheckboxRecords()
          var str = ''
          this.editLength.forEach((item) => {
            str += item.fba条码 + '◆'
          })
        }
        this.$api.shipment
          .UpdateFindProduct({
            strMessage: '',
            UserCode: '',
            fba_barcode: str,
            productno: data[0].productno,
          })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.$message({
                message: res.data[0].message,
                type: 'success',
              })
              this.refresh()
              this.EditAialogVisible = false
            }
          })
          .catch((err) => console.log(err))
      }
    },
    //批量修改中的SKU搜索
    SKUsearch() {
      this.editProductList = this.editFilterProductList.filter((item) => {
        return item.sku.includes(this.skuNum2)
      })
    },
    // 删除文件之前的钩子，
    beforeRemove() {},
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(`只能选择 ${this.limitNum} 个文件`)
    },

    // 文件列表移除文件时的钩子
    handleRemove() {
      this.fileList = [] //清空数据
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$message.success('文件上传成功')
      this.getShipmentList()
      this.updateDialogVisible = false
    },
    // 点击按钮上传文件
    uploadFile() {
      this.$refs.errprReason.innerHTML = ''
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.fileList.length === 0) {
        this.$message.warning('请选择上传文件')
      } else {
        this.loadingUpdate = true
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
        if (this.isDbclick) {
          var fbaid = this.productId
        } else {
          var fbaid = this.delLength[0].id
        }
        let form = new FormData()
        let token = Cookies.get('token')
        form.append('file', this.fileList[0])
        form.append('fbaid', fbaid)
        this.$axios({
          method: 'post',
          url: '/api/FbaShipment/PdfImport',
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: token,
          },
          timeout: 300000,
          data: form,
        })
          .then((res) => {
            this.fileList = []
            this.loadingUpdate = false
            if (res.data.statusCode !== 200) {
              this.$refs.errprReason.innerHTML = res.data.message
              return this.$message.error(res.data.message)
            }
            this.updateDialogVisible = false
            this.$refs.errprReason.innerHTML = ''
            this.$message.success('导入数据成功')
            this.getShipmentList()
          })
          .catch((err) => {
            this.$refs.errprReason.innerHTML = err
            this.loadingUpdate = false
          })
          .finally(() => {
            this.loadingUpdate = false
          })
      }
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$message.error('文件上传失败')
    },
    // 点击列表中已经上传文件钩子
    handlePreview() {
      this.$message.error('此文件已经选中!')
    },
    // 上传条码
    updateDialog() {
      var data = []
      data.push(...this.$refs.mainTable.getCheckboxRecords())
      if (data.length != 1) {
        this.$message({
          message: '请选择一条且只能选择一条数据后操作!',
          type: 'error',
        })
      } else {
        this.updateDialogVisible = true
      }
    },
    // 取消复核
    cancelRepeatedlyCheck() {
      if (this.isDbclick) {
        var obj = {
          strMessage: '',
          usercode: '',
          fbaid: this.productId,
        }
      } else {
        var obj = {
          strMessage: '',
          usercode: '',
          fbaid: this.delLengthArr[0].id,
        }
      }
      this.$api.shipment
        .cancelRepeatedlyCheck(obj)
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              message: res.data[0].message,
              type: 'success',
            })
            this.getShipmentList()
          }
        })
        .catch((err) => console.log(err))
    },
    UploadUrl: function () {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return ''
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log(fileList)
      // this.fileList.push(file.raw)
      fileList.splice(1, 1)
      fileList[0] = file.raw
      this.fileList.splice(1, 1)
      this.fileList[0] = file.raw
    },
    // 弹出层里面的复核
    lableRepeatedlyCheck() {
      if (this.isDbclick) {
        var obj = {
          strMessage: '',
          usercode: '',
          fbaid: this.productId,
        }
      } else {
        var obj = {
          strMessage: '',
          usercode: '',
          fbaid: this.delLengthArr[0].id,
        }
      }
      this.$api.shipment
        .repeatedlyCheck(obj)
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              message: res.data[0].message,
              type: 'success',
            })
            this.getShipmentList()
          }
        })
        .catch((err) => console.log(err))
    },
    // 刷新功能
    refresh() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.isDbclick) {
        var fbaid = this.productId
      } else {
        var fbaid = this.delLength[0].id
      }
      this.$api.shipment
        .ShipmentEdit({ fbaid: fbaid })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.addAialogVisible = true
            this.addParams.Shop = res.data[0][0]['站点']
            this.addParams.fba_planno = res.data[0][0]['计划编号']
            this.addParams.fbashipmentno = res.data[0][0]['货件编号']
            this.addParams.fbashipmentname = res.data[0][0]['货件名称']
            this.addParams.remark = res.data[0][0]['备注']
            this.addParams.quantity = res.data[0][0]['建仓总数']
            this.addParams.sku_quantity = res.data[0][0]['sku 总数']
            this.addParams.fba_date = res.data[0][0]['装箱单日期']
            this.addParams.fba_add_code = res.data[0][0]['配送地址编码']
            this.addParams.fba_add = res.data[0][0]['配送地址']
            this.addShipmentList = res.data[1]
            this.SKULabelList = res.data[2]
            this.LabelListFilter = res.data[3]
            var filterArr = []
            filterArr = this.LabelListFilter.filter((item) => {
              if (res.data[2][0].SKU !== null) {
                if (item.sku号.trim() === res.data[2][0].SKU.trim()) {
                  return item
                }
              }
            })
            this.LabelList = filterArr
            this.LabelListSencond = filterArr
            this.activeName = 'second'
            this.handleClick()
          }
        })
        .catch((err) => console.log(err))
    },
    // 反选功能
    contraryChoose() {
      var selectArr = this.$refs.LabelList.getCheckboxRecords()
      var arr = []
      for (var i = 0; i < this.LabelList.length; i++) {
        for (var j = 0; j < selectArr.length; j++) {
          if (this.LabelList[i].fba条码 === selectArr[j].fba条码) {
            arr.push(i)
          }
        }
      }
      this.$refs.LabelList.setAllCheckboxRow(true)
      arr.forEach((item) => {
        this.$refs.LabelList.setCheckboxRow(this.LabelList[item], false)
      })
      this.editLength = this.$refs.LabelList.getCheckboxRecords()
    },
    // 点击复核按钮，跳转到对应的复核界面
    repeatedlyCheck() {
      this.isEdit = true
      this.isDbclick = false
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      this.delLengthArr = this.delLength
      this.$api.shipment
        .ShipmentEdit({ fbaid: this.delLengthArr[0].fbaid })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.addAialogVisible = true
            this.addParams.Shop = res.data[0][0]['站点']
            this.addParams.fba_planno = res.data[0][0]['计划编号']
            this.addParams.fbashipmentno = res.data[0][0]['货件编号']
            this.addParams.fbashipmentname = res.data[0][0]['货件名称']
            this.addParams.remark = res.data[0][0]['备注']
            this.addParams.quantity = res.data[0][0]['建仓总数']
            this.addParams.sku_quantity = res.data[0][0]['sku 总数']
            this.addParams.fba_date = res.data[0][0]['装箱单日期']
            this.addParams.fba_add_code = res.data[0][0]['配送地址编码']
            this.addParams.fba_add = res.data[0][0]['配送地址']
            this.addShipmentList = res.data[1]
            this.SKULabelList = res.data[2]
            this.LabelListFilter = res.data[3]
            var filterArr = []
            filterArr = this.LabelListFilter.filter((item) => {
              if (item.产品编号.trim() === res.data[2][0].产品编号.trim()) {
                return item
              }
            })
            this.LabelList = filterArr
            this.LabelListSencond = filterArr
            this.activeName = 'second'
            this.handleClick()
          }
        })
        .catch((err) => console.log(err))
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      let extension = file[0].name.substring(file.name.lastIndexOf('.') + 1)
      let size = file.size / 1024 / 1024
      if (extension !== 'pdf') {
        this.$message.warning('只能上传后缀是.pdf的文件')
      }
      if (size > 10) {
        this.$message.warning('文件大小不得超过10M')
      }
    },
    // 清空标签
    clearLable() {
      this.$confirm('此操作将清空标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          if (this.isDbclick) {
            var fbaid = this.productId
          } else {
            var fbaid = this.delLength[0].id
          }
          this.$api.shipment
            .clearLable({
              fbaid: fbaid,
            })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.$message({
                  message: res.data[0].message,
                  type: 'success',
                })
                this.refresh()
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
    },
    // // 全选
    allChoose() {
      this.$refs.LabelList.setAllCheckboxRow(true)
      this.editLength = this.$refs.LabelList.getCheckboxRecords()
    },
    // 批量取消
    BatchCancle() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      this.editLength = this.$refs.LabelList.getCheckboxRecords()
      if (this.isDbclick) {
        var fbaid = this.productId
      } else {
        var fbaid = this.delLength[0].id
      }
      var Str = ''
      this.editLength.forEach((item) => {
        Str += item.fba条码 + '◆'
      })
      this.$api.shipment
        .BatchMark({
          model: {
            strMessage: '',
            usercode: '',
            fbaid: fbaid,
            fba_barcodelist: Str,
            isuse: '0',
          },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              message: res.data[0].message,
              type: 'success',
            })
            this.refresh()
          }
        })
        .catch((err) => console.log(err))

      this.editLength = []
    },
    // 批量标记
    BatchMark() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      this.editLength = this.$refs.LabelList.getCheckboxRecords()
      if (this.isDbclick) {
        var fbaid = this.productId
      } else {
        var fbaid = this.delLength[0].id
      }
      var Str = ''
      this.editLength.forEach((item) => {
        Str += item.fba条码 + '◆'
      })
      this.$api.shipment
        .BatchMark({
          model: {
            strMessage: '',
            usercode: '',
            fbaid: fbaid,
            fba_barcodelist: Str,
            isuse: '1',
          },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              message: res.data[0].message,
              type: 'success',
            })
            this.refresh()
          }
        })
        .catch((err) => console.log(err))

      this.editLength = []
    },
    cellClassAdd(row) {
      if (row.row.每箱数量 === '') {
        return 'redClass'
      } else if (row.row.箱数 === '') {
        return 'redClass'
      } else if (row.row.总数量 === '') {
        return 'redClass'
      } else {
        return 'blackClass'
      }
    },
    // 批量修改产品号
    editProduct() {
      this.editLength = this.$refs.LabelList.getCheckboxRecords()
      if (this.editLength.length === 0) {
        this.$message({
          message: '请选择修改项',
          type: 'error',
        })
      } else {
        this.iconEdit = false
        this.EditAialogVisible = true
        var Str = ''
        this.editLength.forEach((item) => {
          Str += item.fba条码 + '◆'
        })
        this.$nextTick(() => {
          document.getElementById('textProductCode').innerHTML = Str
        })
        // 获取货运总管理主表数据
        if (this.isDbclick) {
          var obj = {
            strMessage: '',
            UserCode: '',
            fba_barcode: Str,
            fbaid: this.productId,
          }
        } else {
          var obj = {
            strMessage: '',
            UserCode: '',
            fba_barcode: Str,
            fbaid: this.delLength[0].id,
          }
        }
        this.$api.shipment
          .EditProduct(obj)
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.editProductList = res.data
              this.editFilterProductList = res.data
              this.editLength = []
            }
          })
          .catch((err) => console.log(err))
      }
    },
    // sku搜索
    skuSearch() {
      var filterArr = []
      switch (this.status) {
        case '已使用':
          filterArr = this.LabelListSencond.filter((item) => {
            return item.isuse === this.status
          })
          this.LabelList = filterArr
          if (this.skuNum !== '') {
            filterArr = this.LabelListFilter.filter((item) => {
              return (
                item.sku号.includes(this.skuNum) ||
                item.fba条码.includes(this.skuNum)
              )
            })
            this.LabelList = filterArr
          }
          break
        case '未使用':
          filterArr = this.LabelListSencond.filter((item) => {
            return item.isuse === this.status
          })
          this.LabelList = filterArr
          if (this.skuNum !== '') {
            filterArr = this.LabelListFilter.filter((item) => {
              return (
                item.sku号.includes(this.skuNum) ||
                item.fba条码.includes(this.skuNum)
              )
            })
            this.LabelList = filterArr
          }
          break
        default:
          if (this.skuNum !== '') {
            filterArr = this.LabelListFilter.filter((item) => {
              return (
                item.sku号.includes(this.skuNum) ||
                item.fba条码.includes(this.skuNum)
              )
            })
            this.LabelList = filterArr
          } else {
            this.LabelList = this.LabelListSencond
          }
          break
      }
    },
    // 点击详情
    Detail() {
      // 触发修改页面
      this.editShipment()
    },
    //显示全部箱单
    showAll() {
      this.LabelList = this.LabelListFilter
    },
    // 点击水库标签汇总显示下方表格数据
    showBottomTable(row) {
      var filterArr = []
      filterArr = this.LabelListFilter.filter((item) => {
        if (row.row.SKU !== null && item.sku号 !== null) {
          if (item.sku号.trim() === row.row.SKU.trim()) {
            return item
          }
        }
      })
      this.LabelList = filterArr
      this.LabelListSencond = filterArr
    },
    // 双击弹出修改框
    editTable(row) {
      this.isEdit = true // 判断是修改还是新增，来决定按钮是否可以使用
      this.isDbclick = true
      this.productId = row.row.id
      this.activeName = 'first'
      this.$api.shipment
        .ShipmentEdit({ fbaid: row.row.id })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.addAialogVisible = true
            this.addParams.Shop = res.data[0][0]['站点']
            this.addParams.fba_planno = res.data[0][0]['计划编号']
            this.addParams.fbashipmentno = res.data[0][0]['货件编号']
            this.addParams.fbashipmentname = res.data[0][0]['货件名称']
            this.addParams.remark = res.data[0][0]['备注']
            this.addParams.quantity = res.data[0][0]['建仓总数']
            this.addParams.sku_quantity = res.data[0][0]['sku 总数']
            this.addParams.fba_date = res.data[0][0]['装箱单日期']
            this.addParams.fba_add_code = res.data[0][0]['配送地址编码']
            this.addParams.fba_add = res.data[0][0]['配送地址']
            this.addShipmentList = res.data[1]
            this.SKULabelList = res.data[2]
            this.LabelListFilter = res.data[3]
            var filterArr = []
            filterArr = this.LabelListFilter.filter((item) => {
              if (res.data[2][0].SKU !== null) {
                if (item.sku号.trim() === res.data[2][0].SKU.trim()) {
                  return item
                }
              }
            })
            this.LabelList = filterArr
            this.LabelListSencond = filterArr
          }
        })
        .catch((err) => console.log(err))
    },
    // 保存
    saveShipment() {
      this.$refs.addForm.validate((valid) => {
        if (!valid) return //文本域校验，必填项
        var flag = true
        this.addShipmentList.forEach((item) => {
          if (item.每箱数量 === '' && item.箱数 === '' && item.总数量 === '') {
            flag = false
          }
        })
        if (flag) {
          this.saveLoading = true
          this.addParams.datalist = ''
          var datalist = ''
          this.addShipmentList.forEach((item) => {
            datalist +=
              item.sku +
              this.columnIcon +
              item.商品名称 +
              this.columnIcon +
              item.asin +
              this.columnIcon +
              item.fnsku +
              this.columnIcon +
              item.外部编号 +
              this.columnIcon +
              item.状况 +
              this.columnIcon +
              item.备货方 +
              this.columnIcon +
              item.预处理类型 +
              this.columnIcon +
              item.贴标方 +
              this.columnIcon +
              item.每箱数量 +
              this.columnIcon +
              item.箱数 +
              this.columnIcon +
              item.总数量 +
              '◆'
          })
          this.addParams.datalist = datalist
          // 调用保存接口进行保存
          this.$api.shipment
            .saveShipment({ model: { ...this.addParams } })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.saveLoading = false
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.$message({
                  message: '保存成功',
                  type: 'success',
                })
                this.getShipmentList()
                this.isNew = false
                this.saveLoading = false
                this.addAialogVisible = false
              }
            })
            .catch((err) => {
              this.saveLoading = false
              this.$message.error(err)
            })
            .finally(() => {
              this.saveLoading = false
            })
        } else {
          this.$message.error('请填写必填项！')
        }
      })
    },
    LabelListcellClass(row) {
      if (row.row.isuse === '已使用') {
        return 'blueClass'
      }
    },
    // 修改配送地址代码
    editAdress() {
      if (this.isDbclick) {
        var fbaid = this.productId
      } else {
        var fbaid = this.delLength[0].id
      }
      this.$api.shipment
        .EditAdress({
          fba_add_code: this.addParams.fba_add_code,
          fbaid: fbaid,
          trackingNo: this.addParams.TrackingNo,
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              message: '修改成功！',
              type: 'success',
            })
          }
        })
        .catch((err) => console.log(err))
    },
    cellClass(row) {
      if (row.row.发货状态 === '未发完' && row.row.标签复核 === '已复核') {
        //判断条件，如果想要改变其他行样式，就写那一行的下标
        return 'cellClass'
      }
      if (row.row.标签复核 === '待复核') {
        //判断条件，如果想要改变其他行样式，就写那一行的下标
        return 'cellClass1'
      }
    },
    // 点击删除项
    delShipment() {
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
              this.$api.shipment
                .ShipmentDel({ fbaid: this.delLength[0].fbaid })
                .then((res) => {
                  if (res.statusCode !== 200) {
                    this.$message({
                      message: res.message,
                      type: 'error',
                    })
                  } else {
                    this.$message({
                      message: res.data[0].message,
                      type: 'success',
                    })
                    this.getShipmentList()
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
    // 点击修改按钮
    editShipment() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      this.delLengthArr = this.delLength
      this.activeName = 'first'
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
          this.isDbclick = false
          this.$api.shipment
            .ShipmentEdit({ fbaid: this.delLength[0].fbaid })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.addAialogVisible = true
                this.addParams.Shop = res.data[0][0]['站点']
                this.addParams.fba_planno = res.data[0][0]['计划编号']
                this.addParams.fbashipmentno = res.data[0][0]['货件编号']
                this.addParams.fbashipmentname = res.data[0][0]['货件名称']
                this.addParams.remark = res.data[0][0]['备注']
                this.addParams.quantity = res.data[0][0]['建仓总数']
                this.addParams.sku_quantity = res.data[0][0]['sku 总数']
                this.addParams.fba_date = res.data[0][0]['装箱单日期']
                this.addParams.fba_add_code = res.data[0][0]['配送地址编码']
                this.addParams.fba_add = res.data[0][0]['配送地址']
                this.addParams.TrackingNo = res.data[0][0]['跟踪编码']
                this.addShipmentList = res.data[1]
                this.SKULabelList = res.data[2]
                this.LabelListFilter = res.data[3]
                var filterArr = []
                filterArr = this.LabelListFilter.filter((item) => {
                  if (item.产品编号.trim() === res.data[2][0].产品编号.trim()) {
                    return item
                  }
                })
                this.LabelList = filterArr

                this.LabelListSencond = filterArr
              }
            })
            .catch((err) => console.log(err))
        }
      }
    },
    // 标签列表选中事件
    onCheckboxChange(row) {
      if (row.checked) {
        this.editLength = this.$refs.LabelList.getCheckboxRecords()
      } else {
        this.editLength = this.$refs.LabelList.getCheckboxRecords()
      }
    },
    // 标签列表全部选中事件
    onCheckboxAllChange(row) {
      if (row.checked) {
        this.editLength = this.$refs.LabelList.getCheckboxRecords()
      } else {
        this.editLength = this.$refs.LabelList.getCheckboxRecords()
      }
    },
    // 通过图标删除当前行
    iconDelProduct(row) {
      let Index = this.addShipmentList.findIndex((item) => {
        return item.sku == row.sku
      })

      this.$confirm('此操作将删除该条产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          this.addShipmentList.splice(Index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          if (this.addShipmentList.length === 0) {
            this.addShipmentList.push({
              sku: '',
              商品名称: '',
              asin: '',
              fnsku: '',
              外部编号: '',
              状况: '',
              备货方: '',
              预处理类型: '',
              贴标方: '',
              每箱数量: '',
              箱数: '',
              总数量: '',
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
    // 通过图标增加行
    iconAddProduct() {
      console.log(this.addShipmentList)
      if (this.addShipmentList[this.addShipmentList.length - 1].sku !== '') {
        let nullObj = {
          sku: '',
          商品名称: '',
          asin: '',
          fnsku: '',
          外部编号: '',
          状况: '',
          备货方: '',
          预处理类型: '',
          贴标方: '',
          每箱数量: '',
          箱数: '',
          总数量: '',
        }
        this.addShipmentList.push(nullObj)
      } else {
        this.$message({
          message: '请先填写本行数据',
          type: 'error',
        })
      }
    },
    handleClick() {
      if (this.activeName === 'second') {
        this.$refs.multipleTable.setCurrentRow(this.SKULabelList[0]) //默认高亮选中第一行
      }
    },
    searchShipment() {
      this.getShipmentList()
    },
    addShipment() {
      this.addAialogVisible = true
      this.isEdit = false
      this.isNew = true

      this.activeName = 'first'
      this.addParams.Shop = this.shopList[0].id
      this.addParams.fba_planno = ''
      this.addParams.fbashipmentno = ''
      this.addParams.fbashipmentname = ''
      this.addParams.remark = ''
      this.addParams.quantity = ''
      this.addParams.fba_date = ''
      this.addParams.sku_quantity = ''
      this.addParams.fba_add_code = ''
      this.addParams.TrackingNo = ''
      this.addParams.fba_add = ''
      this.addShipmentList = []
      this.SKULabelList = []
      this.LabelList = []
      if (this.addShipmentList.length) {
        return
      } else {
        this.addShipmentList.push({
          sku: '',
          商品名称: '',
          asin: '',
          fnsku: '',
          外部编号: '',
          状况: '',
          备货方: '',
          预处理类型: '',
          贴标方: '',
          每箱数量: '',
          箱数: '',
          总数量: '',
        })
      }
    },
    // 主表全选触发
    onShipmentCheckboxAllChange(row) {
      if (row.checked) {
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
      } else {
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
      }
    },
    // 主表选择框状态改变触发
    onShipmentCheckboxChange(row) {
      if (row.checked) {
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
      } else {
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
      }
    },
    getShipmentList() {
      // 获取货运总管理主表数据
      this.ShipmentManagementList = []
      this.pageList()
      this.serchLoading = true
      this.$api.shipment
        .shipment({ model: { ...this.ShipmentManagementParams } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.ShipmentManagementList = res.data[0]
            this.pageList()
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.serchLoading = false
        })
    },
    // 表尾合计
    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          }
          switch (column.property) {
            case 'fba数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].fba数量)
              }
              return sums
            case 'fba箱数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].fba箱数)
              }
              return sums
            case '已发数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].已发数量)
              }
              return sums
            case '已发箱数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].已发箱数)
              }
              return sums
            case '待发数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].待发数量)
              }
              return sums
            case '待发箱数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].待发箱数)
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    // 表尾合计
    addfooterMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          }
          switch (column.property) {
            case '箱数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].箱数)
              }
              return sums
            case '总数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].总数量)
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    // 表尾合计
    SKULabelfooterMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          }
          switch (column.property) {
            case '商品数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].商品数量)
              }
              return sums
            case '标签数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].标签数量)
              }
              return sums
            case '已发货数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].已发货数量)
              }
              return sums
            case '已发货标签数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].已发货标签数)
              }
              return sums
            case '可用数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].可用数量)
              }
              return sums
            case '可用标签数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].可用标签数)
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    // 获取配送地址代码
    getaddress() {
      this.$api.publicApi
        .address({ model: { type: 'code', query: { flag: 'FBA_Add_Code' } } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.addressList = res.data
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
            this.ShipmentManagementParams.Shop = this.shopList[0].id
            this.getShipmentList()
          }
        })
        .catch((err) => console.log(err))
    },
    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.paging.data = this.ShipmentManagementList
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
      this.$set(this.ShipmentManagementParams, 'enddate', toMonth)
      this.$set(this.addParams, 'fba_date', toMonth)
      this.$set(this.ShipmentManagementParams, 'begdate', startTime)
    },
    // 当每页数量改变
    handleSizeChange(val) {
      this.paging.limit = val
      this.delLength = []
      this.pageList()
    },
    getAdress() {
      this.$api.shipment
        .GetServer()
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.FbaAdress = res.data.Host.Value
          }
        })
        .catch((err) => console.log(err))
    },
    // 当当前页改变
    handleCurrentChange(val) {
      this.paging.page = val
      this.delLength = []
      this.pageList()
    },
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        this.gridHeight = card - queryRow - 70
      })
    },
  },
  created() {
    this.addProductState()
    this.getaddress()
    this.getNowDate()
    this.getAdress()
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
>>> .el-card {
  width: 100%;
  background: #fff;
  margin-bottom: 10px;
  >>> .el-card__body {
    padding: 10px;
    width: 100%;
  }
}
// 开始-结束时间选择器
>>> .el-form-item__content {
  line-height: 28px !important;
  margin-top: 5px;
}
>>> .el-form-item {
  margin-bottom: 5px;
}
>>> .el-input--suffix .el-input__inner {
  padding-right: 20px;
}
>>> .blockDate {
  display: flex;
  justify-content: space-between;
  border: 1px solid #c7c6de;
  height: 30px;
  .el-date-editor .el-input__inner {
    height: 28px;
  }

  >>> .None-Border {
    height: 100%;
  }

  >>> .el-input__inner {
    height: 100%;
    width: 80%;
  }
}
>>> .el-input__icon {
  line-height: 28px;
}
// // 开始-结束时间选择器
>>> .el-input__inner {
  height: 30px;
}
.el-button + .el-button {
  margin-left: 0px;
}
>>> [class*='vxe-'] {
  line-height: 36px;
}
.marginLeft {
  margin-left: 10px;
}
.iconBtn {
  width: 100px;
  height: 32px;
  background: #5473e8;
  border: 1px solid #5473e8;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 400;
  color: #fcfefe;
  padding: 0;
}
>>> .el-upload {
  margin-top: 10px;
  margin-left: 10px;
}
.iconBtnB {
  width: 120px;
  height: 32px;
  background: #5473e8;
  border: 1px solid #5473e8;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 400;
  color: #fcfefe;
  padding: 0;
}
>>> [data-v-77347d1c] .el-input__inner {
  height: 28px;
}
// 第三批按钮
.secondBtn {
  font-size: 14px;
  color: #333;
  .smBtn {
    width: 70px !important;
  }
  .iconBtn {
    width: 100px;
    height: 32px;
    background: #5473e8;
    border: 1px solid #5473e8;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #fcfefe;
    padding: 0;
  }
}
// 时间类型
>>> .listDate .el-input__inner {
  height: 28px;
  padding: 0 0 0 5px;
  width: 110px;
  border-radius: 0px;
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

// 表格样式
>>> .footerCellClassName {
  background: #d1f3ff;
  height: 36px;
}
>>> .cellClass {
  height: 31px;
  color: red;
}
>>> .cellClass1 {
  height: 31px !important;
  color: rgb(65, 105, 225);
}
.marginL {
  margin-left: -22px;
}
>>> .hearderClass {
  text-align: center;
  font-size: 14px;
  height: 36px;
  background-color: #d5deff;
}
>>> .searchBtn {
  width: 70px;
  height: 32px;
  border-radius: 0px;
  background: #ff9b22;
  border: 2px solid #ff9b22;
}
// 分页样式
.closeTable {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 5px;
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
.editadressCode {
  width: 240px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #21bdca;
  border: 1px solid #21bdca !important;
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
// add弹出框
>>> .unifySize .el-input__icon {
  line-height: normal;
}
>>> .unifySize {
  height: 30px;
}
>>> .None-Border {
  height: 100%;
}
>>> .unifySize input {
  height: 30px;
}
>>> .unifySize .el-input {
  width: 100%;
}
>>> .el-form-item__label {
  padding: 0px;
}
// 弹出层样式
>>> .jy-dialog__body {
  padding: 0px !important;
}
>>> .jy-dialog__header {
  padding: 0px;
}
>>> .jy_wrapper .jy-dialog__header {
  padding-top: 0px;
  padding-bottom: 0px;
  text-align: left;
}
.iconC {
  font-size: 22px;
  color: #5473e8;
}
// 图像容器
>>> .el-tab-pane .block {
  width: 450px;
  height: 530px;
  display: inline-block;
  margin-bottom: 10px;
  position: relative;
  border: 1px solid #fff;
}

>>> .el-tab-pane .block .el-col {
  height: 30px;
  margin-top: 3px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
>>> .imgBlock {
  width: 100%;
}
>>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.NoCloseIcon {
  width: 60px;
  line-height: normal;
  background: #ff9b22;
  color: #fff;
  height: 28px;
  padding: 0px;
  font-size: 10px;
  border-radius: 2px;
  border: 1px solid #ff9b22;
}
// 图形界面完成清空图标
.statusCricle {
  width: 100px;
  height: 100px;
  position: absolute;
  right: 222px;
  top: 32px;
  // background-color: rgb(241, 181, 115);
  z-index: 2555;
  border: 5px solid rgb(255, 0, 0);
  border-radius: 100px;
  .CricleFont {
    width: 100px;
    font-size: 25px;
    font-weight: 700;
    position: absolute;
    left: 5px;
    top: 19px;
    color: rgb(255, 0, 0);
    transform: rotate(-30deg);
  }
}
>>> .el-tabs--border-card > .el-tabs__content {
  padding: 0px 10px 10px 10px;
  height: 800px;
  overflow-y: auto;
}
>>> .el-card__body {
  padding: 10px;
}
>>> .vxe-header--column .vxe-cell--required-icon:before {
  content: '*';
  position: absolute;
  left: 0;
  top: -0.6em;
}
>>> .marginTop {
  margin-top: 10px;
}
>>> .Padd {
  padding: 10px;
}
.PicClass {
  margin-top: -3px;
  border: 1px solid #ccc;
  padding: 3px;
}
.PicClass:nth-child(1) {
  padding-top: 0px;
  border-bottom: none;
}
.PicClass:nth-child(2) {
  border-top: none;
  border-bottom: none;
  padding-top: 0px;
  padding-bottom: 0px;
}
.closed {
  position: absolute;
  right: 10px;
  top: 5px;
  z-index: 2555;
  font-size: 25px;
}
.PicClass:nth-last-child(1) {
  border-top: none;
  padding-top: 0px;
}
.floatR {
  margin-top: 10px;
  position: absolute;
  right: 10px;
  bottom: 10px;
  height: 35px;
}
>>> .LeftMA {
  margin-left: 20px;
}
>>> .jy-dialog .jy-dialog__header {
  background: #c5c5c5;
  height: 40px;
  padding: 10px 0 0 10px;
}
>>> .vxe-header--column .vxe-cell--edit-icon,
.vxe-header--column .vxe-cell-help-icon {
  display: none;
}
>>> .jy-dialog .jy-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
>>> .jy-dialog__body {
  position: relative;
}
>>> .el-form-item__error {
  padding-top: 0px;
}
>>> [data-v-9172cde0] .el-form-item {
  height: 42px;
  margin-bottom: 5px;
}
.errprReason {
  position: absolute;
  top: 50%;
  right: 0px;
  color: red;
  transform: translate(0, -50%);
  width: 50%;
}
>>> .redClass {
  color: red;
  height: 30px;
}
>>> .el-tabs {
  user-select: text;
}
>>> .blackClass {
  color: #000;
  height: 30px;
}
>>> .posDiv {
  position: absolute;
  width: 100%;
  bottom: 40px;
  right: 0px;
}
>>> .blueClass {
  color: blue;
}
</style>