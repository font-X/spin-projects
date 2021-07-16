<template>
  <el-container id="mainCard">
    <!-- 电商零单下单 -->
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
                <el-row class="mainForm">
                  <el-col
                    :md="8"
                    :lg="6"
                    :xl="5"
                    style="display: flex; justify-content: flex-start"
                  >
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
                  <el-col :md="6" :lg="3" :xl="3">
                    <el-form-item class="searchMargin" label="订单号：">
                      <el-input
                        v-model.trim="queryPramsTable.PlanNo"
                        class="unifySize"
                        clearable
                        placeholder="订单号"
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="站点："
                    >
                      <el-select
                        v-model="queryPramsTable.Shopid"
                        class="unifySize"
                        placeholder="站点"
                        clearable
                        @keydown.enter.native="searchEnter"
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
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item class="searchMargin" label="状态：">
                      <el-select
                        v-model="queryPramsTable.Status"
                        class="unifySize"
                        @keydown.enter.native="searchEnter"
                      >
                        <el-option value="" label="全部"></el-option>
                        <el-option
                          :key="index"
                          v-for="(item, index) in statusList"
                          :label="item.Show"
                          :value="item.Show"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="2" :xl="2">
                    <el-form-item class="searchMargin" label="回收站：">
                      <el-checkbox
                        v-model="queryPramsTable.IsCancle"
                        true-label="1"
                        false-label="0"
                        @change="changeIsDetail"
                      ></el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="4" :xl="4">
                    <el-button
                      v-if="iconShow"
                      type="danger"
                      class="searchBtn searchMargin"
                      size="small"
                      :loading="IsSearch"
                      @click="MainTableQuery"
                      icon="iconfont kt-icon-sousuo_o"
                      >查询</el-button
                    >
                    <el-button
                      v-if="iconShow"
                      type="danger"
                      class="closeInput searchMargin1"
                      size="small"
                      @click="IconShow"
                      icon="iconfont kt-icon-anniu_jiantouzhankai"
                      >展开</el-button
                    >
                  </el-col>
                </el-row>
                <el-row v-if="!iconShow" class="mainForm marginLe">
                  <el-col :md="8" :lg="6" :xl="5">
                    <el-form-item class="searchMargin" label="销售单号：">
                      <el-input
                        v-model.trim="queryPramsTable.E_OrderCode"
                        class="unifySize"
                        placeholder="销售单号"
                        @keydown.enter.native="searchEnter"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="客户："
                    >
                      <el-input
                        v-model.trim="queryPramsTable.Customer"
                        class="unifySize"
                        placeholder="客户"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :md="8" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="国家："
                    >
                      <el-select
                        v-model="queryPramsTable.Country"
                        class="unifySize"
                        clearable
                        placeholder="输入或选择国家"
                        filterable
                        @keydown.enter.native="searchEnter"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in CountryList"
                          :label="item.StateChNm"
                          :value="item.StateID"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="物流方式："
                    >
                      <el-input
                        v-model.trim="queryPramsTable.ExpressType"
                        class="unifySize"
                        placeholder="物流方式"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="快递单号："
                    >
                      <el-input
                        v-model.trim="queryPramsTable.ExpressNo"
                        class="unifySize"
                        placeholder="快递单号"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="2" :xl="2">
                    <el-form-item class="searchMargin" label="显示明细：">
                      <el-checkbox
                        v-model="queryPramsTable.IsDetail"
                        true-label="1"
                        false-label="0"
                        @change="changeIsDetail"
                      ></el-checkbox>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="!iconShow" class="mainForm marginLe">
                  <el-col :md="5" :lg="6" :xl="5">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="产品号："
                    >
                      <el-input
                        v-model.trim="queryPramsTable.ProductNo"
                        class="unifySize"
                        placeholder="产品号"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="产品名称："
                    >
                      <el-input
                        v-model.trim="queryPramsTable.chnName"
                        class="unifySize"
                        placeholder="产品名称"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item class="searchMargin" label="颜色：">
                      <el-input
                        v-model.trim="queryPramsTable.Color"
                        class="unifySize"
                        placeholder="颜色"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item class="searchMargin" label="尺寸：">
                      <el-input
                        v-model.trim="queryPramsTable.Size"
                        class="unifySize"
                        placeholder="尺寸"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item class="searchMargin" label="是否关闭：">
                      <el-select
                        v-model="queryPramsTable.isclose"
                        class="unifySize"
                        clearable
                        placeholder="是否关闭"
                        @keydown.enter.native="searchEnter"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in isclose"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-button
                      type="danger"
                      class="searchBtn searchMargin"
                      size="small"
                      :loading="IsSearch"
                      @click="MainTableQuery"
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
                @click="addProduct"
                class="smBtn iconBtn el-icon-plus"
                >新增</el-button
              >
              <el-button
                type="primary"
                @click="editProduct"
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
                class="delBtn iconBtn el-icon-delete"
                @click="delData"
                >删除订单行</el-button
              >
              <el-button
                type="primary"
                class="smBtn iconBtn iconfont kt-icon-caidan"
                @click="reportItem"
                >报批</el-button
              >
              <el-button
                type="primary"
                v-if="queryPramsTable.IsDetail === '1'"
                class="smBtn iconBtn"
                icon="el-icon-error"
                @click="mainTableClose"
                >关闭</el-button
              >
              <el-button
                type="primary"
                v-if="queryPramsTable.IsDetail === '1'"
                class="iconBtn iconfont"
                icon="el-icon-success"
                @click="mainTableResetClose"
                >取消关闭</el-button
              >
              <el-button
                type="primary"
                class="iconBtn iconfont kt-icon-caidan"
                @click="ToFreight"
                >运费登记</el-button
              >
              <el-button
                type="primary"
                class="iconBtn iconfont kt-icon-caidan"
                @click="ToComputeFreight"
                >运费计算</el-button
              >
              <!-- 正在开发中 -->
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <!-- 主表区域 -->
      <el-col class="mainTable">
        <el-card style="margin-top：11px">
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
            show-header-overflow
            @cell-dblclick="dbMainClick"
            @cell-click="cellclick"
            show-footer-overflow
            :header-row-class-name="hearderClass"
            :footer-cell-class-name="footerCellClassName"
            @checkbox-change="onAdjustmentCheckboxChange"
            @checkbox-all="onAdjustmentCheckboxAllChange"
            :row-class-name="cellClass"
            :height="iconShow ? gridHeight * 1.1 : gridHeight * 1"
            :columns="isShowDetailed ? columnsDetail : columns"
            :loading="loading"
            :footer-method="footerMethod"
            highlight-current-row
            :config="{ render: 'scroll' }"
            :align="'center'"
            :checkbox-config="{ highlight: true }"
            :data="paging.data"
          >
            <template #productStatus="{ row }">
              <!-- <img :src="row.缩略图 " style="width: 100px" /> -->
              <div class="aHref" @click="statusClick(row)">
                {{
                  row.生产状态
                    .substring(0, row.生产状态.length - 4)
                    .split('>')[1]
                }}
              </div>
            </template>
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

    <!-- 新增弹出层 -->
    <JyDialog
      title="订单管理"
      v-dialogDrag
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="addAialogVisible"
      :before-close="handleClose"
      width="90%"
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
          <el-col class="searchCondition">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
              label="订单号："
              label-width="70px"
              prop="PlanNo"
            >
              <el-input
                v-model="addFormParams.PlanNo"
                class="unifySize"
                disabled
                placeholder="自动编号"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="OrderDate"
              label="申请日期："
              class="searchMargin"
            >
              <el-date-picker
                class="unifySize"
                v-model="addFormParams.OrderDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              prop="Shopid"
              label="站点："
              class="searchConditionShop"
            >
              <el-select v-model="addFormParams.Shopid" class="unifySize">
                <el-option
                  :key="index"
                  v-for="(item, index) in shopList"
                  :label="item.Name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              class="searchConditionShop special"
              style="margin-bottom: 0px"
              prop="Name"
              label="工厂："
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="鼠标双击清空内容"
                placement="top"
              >
                <vxe-input
                  v-model="addFormParams.Name"
                  :readonly="true"
                  @dblclick="delFactory"
                  class="unifySize"
                ></vxe-input>
              </el-tooltip>
              <!-- <el-input
                v-model="addFormParams.Name"
                disabled
                clearable
                class="unifySize"
              ></el-input> -->
              <i
                class="el-icon-search iconP-factory choose2"
                @click="iconChooseFactory()"
              ></i>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="text" prop="OrderRemark">
            <!-- 文本域 -->
            <el-form-item prop="OrderRemark" label="备注：">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="备注"
                v-model="addFormParams.OrderRemark"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="secondBtn2">
            <el-button
              type="primary"
              class="smBtn iconBtn el-icon-edit-outline"
              @click="iconAddProduct"
              >添加行</el-button
            >
            <el-button
              type="primary"
              class="delBtn1 iconBtn el-icon-delete"
              @click="delProduct"
              >删除</el-button
            >
            <span v-show="promptInfo !== ''" style="color: red">
              {{ promptInfo }}
            </span>
            <span v-show="TexturePromptInfo !== ''" style="color: red">
              {{ TexturePromptInfo }}
            </span>
            <span v-show="MachingPromptInfo !== ''" style="color: red">
              {{ MachingPromptInfo }}
            </span>
            <span v-show="FlowerPromptInfo !== ''" style="color: red">
              {{ FlowerPromptInfo }}
            </span>
            <span v-show="ColorPromptInfo !== ''" style="color: red">
              {{ ColorPromptInfo }}
            </span>
            <span v-show="HangingInfo !== ''" style="color: red">
              {{ HangingInfo }}
            </span>
          </el-col>
          <el-col style="height: 630px">
            <JyTableInput
              border
              ref="addTable"
              resizable
              stripe
              keep-source
              :auto-resize="true"
              style="margin-top: 11px"
              show-overflow="title"
              width="auto"
              height="610"
              :edit-rules="validRules"
              @checkbox-all="onAddCheckboxAllChange"
              @checkbox-change="onAddCheckboxChange"
              class="mytable-scrollbar"
              :columns="r_columns"
              :data.sync="addProduceList"
            >
              <template #product="{ row }">
                <span>{{ row.产品类型 }}</span>
                <i
                  @click="iconChooseProduct(row)"
                  class="iconP iconfont kt-icon-daoru"
                ></i>
              </template>
              <template #Hanging="{ row }">
                <span>{{ row.挂式 }}</span>
                <i
                  @click="iconHangingProduct(row)"
                  class="iconP iconfont kt-icon-daoru"
                ></i>
              </template>
              <template #Texture="{ row }">
                <span>{{ row.面料材质 }}</span>
                <i
                  @click="iconTextureProduct(row)"
                  class="iconP iconfont kt-icon-daoru"
                ></i>
              </template>
              <template #Maching="{ row }">
                <span>{{ row.面料加工 }}</span>
                <i
                  @click="iconMachiningProduct(row)"
                  class="iconP iconfont kt-icon-daoru"
                ></i>
              </template>
              <template #Color="{ row }">
                <span>{{ row.颜色 }}</span>
                <i
                  @click="iconColorChoose(row)"
                  class="iconP iconfont kt-icon-daoru"
                ></i>
              </template>
              <template #Flower="{ row }">
                <span>{{ row.花型 }}</span>
                <i
                  @click="iconFlowerChoose(row)"
                  class="iconP iconfont kt-icon-daoru"
                ></i>
              </template>
              <template #Channel="{ row }">
                <span>{{ row.物流方式 }}</span>
                <i
                  @click="ChannelChoose(row)"
                  class="iconP iconfont kt-icon-daoru"
                ></i>
              </template>

              <template #photo="{ row }">
                <span>{{ row.图片管理 }}</span>
                <i
                  @click="iconPhotoChoose(row)"
                  class="iconP iconfont kt-icon-daoru"
                ></i>
              </template>

              <template #Priority="{ row }">
                <el-select v-model="row.优先级" class="unifySize">
                  <el-option
                    :key="index"
                    v-for="(item, index) in Priority"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>

              <template #currency="{ row }">
                <el-select v-model="row.币种" class="unifySize">
                  <el-option
                    :key="index"
                    v-for="(item, index) in currencyList"
                    :label="item.chnName"
                    :value="item.currency"
                  ></el-option>
                </el-select>
              </template>

              <template #company="{ row }">
                <el-select v-model="row.单位" class="unifySize">
                  <el-option
                    :key="index"
                    v-for="(item, index) in Company"
                    :label="item.UnitName"
                    :value="item.UnitCode"
                  ></el-option>
                </el-select>
              </template>
            </JyTableInput>
          </el-col>
        </el-row>
      </el-form>

      <!-- <vxe-table
          border
          ref="addTable"
          resizable
          stripe
          keep-source
          :auto-resize="true"
          style="margin-top: 11px"
          show-header-overflow="title"
          width="auto"
          :header-cell-class-name="hearderClass"
          :footer-cell-class-name="footerCellClassName"
          @checkbox-all="onAddCheckboxAllChange"
          @checkbox-change="onAddCheckboxChange"
          :row-class-name="cellClass"
          height="480"
          highlight-current-row
          show-footer-overflow
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
          <vxe-table-column type="checkbox" width="50"></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="50"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            :edit-render="{ immediate: true, name: 'input' }"
            width="110"
            field="销售单号"
            title="销售单号"
          ></vxe-table-column>
          <vxe-table-column
            :edit-render="{
              name: 'input',
              immediate: true,
              events: { keyup: ageFocusEvent },
            }"
            width="100"
            title="类型编码"
            field="类型编码"
          ></vxe-table-column>
          <vxe-table-column width="120" title="产品类型" field="产品类型">
            <template slot-scope="{ row }">
              <span>{{ row.产品类型 }}</span>
              <i
                @click="iconChooseProduct(row)"
                class="iconP iconfont kt-icon-daoru"
              ></i>
            </template>
          </vxe-table-column>
          <vxe-table-column
            :edit-render="{
              name: 'input',
              immediate: true,
              events: { keyup: HangingFocusEvent },
            }"
            width="100"
            title="挂式编码"
            field="挂式编码"
          ></vxe-table-column>
          <vxe-table-column width="100" title="挂式" field="挂式">
            <template slot-scope="{ row }">
              <span>{{ row.挂式 }}</span>
              <i
                class="iconP iconfont kt-icon-daoru"
                @click="iconHangingProduct(row)"
              ></i>
            </template>
          </vxe-table-column>
          <vxe-table-column
            :edit-render="{ immediate: true, name: 'input' }"
            width="80"
            field="层数"
            title="层数"
          ></vxe-table-column>
          <vxe-table-column
            :edit-render="{
              name: 'input',
              immediate: true,
              events: { keyup: TextureFocusEvent },
            }"
            width="120"
            field="材质编码"
            title="材质编码"
          ></vxe-table-column>
          <vxe-table-column width="120" title="面料材质" field="面料材质">
            <template slot-scope="{ row }">
              <span>{{ row.面料材质 }}</span>
              <i
                class="iconP iconfont kt-icon-daoru"
                @click="iconTextureProduct(row)"
              ></i> </template
          ></vxe-table-column>
          <vxe-table-column
            :edit-render="{
              name: 'input',
              immediate: true,
              events: { keyup: MachingFocusEvent },
            }"
            width="120"
            field="加工编码"
            title="加工编码"
          ></vxe-table-column>
          <vxe-table-column width="120" title="面料加工" field="面料加工">
            <template slot-scope="{ row }">
              <span>{{ row.面料加工 }}</span>
              <i
                class="iconP iconfont kt-icon-daoru"
                @click="iconMachiningProduct(row)"
              ></i> </template
          ></vxe-table-column>
          <vxe-table-column
            :edit-render="{ immediate: true, name: 'input' }"
            width="80"
            field="宽度"
            title="宽度"
          ></vxe-table-column>
          <vxe-table-column
            :edit-render="{ immediate: true, name: 'input' }"
            width="80"
            field="高度"
            title="高度"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            :class-name="cellChooseClassLeft"
            field="单位"
            title="单位"
            :edit-render="{
              name: 'ElSelect',
              options: Company,
              immediate:true,
              optionProps: { value: 'UnitCode', label: 'UnitName' },
              autoselect: true,
            }"
          >
          </vxe-table-column>
          <vxe-table-column
            width="120"
            :edit-render="{ immediate: true, name: 'input' }"
            field="下单数量"
            title="下单数量"
          >
          </vxe-table-column>
          <vxe-table-column
            width="120"
            aria-disabled
            field="颜色编码"
            title="颜色编码"
          >
          </vxe-table-column>
          <vxe-table-column width="100" title="颜色" field="颜色">
            <template slot-scope="{ row }">
              <span>{{ row.颜色 }}</span>
              <i
                class="iconP iconfont kt-icon-daoru"
                @click="iconColorChoose(row)"
              ></i>
            </template>
          </vxe-table-column>
          <vxe-table-column
            width="120"
            :edit-render="{
              name: 'input',
              immediate: true,
              events: { keyup: FlowerFocusEvent },
            }"
            field="设计编号"
            title="设计编号"
          >
          </vxe-table-column>
          <vxe-table-column width="100" title="花型" field="花型">
            <template slot-scope="{ row }">
              <span>{{ row.花型 }}</span>
              <i
                class="iconP iconfont kt-icon-daoru"
                @click="iconFlowerChoose(row)"
              ></i>
            </template>
          </vxe-table-column>
          <vxe-table-column width="120" field="产品编号" title="产品编号">
          </vxe-table-column>
          <vxe-table-column
            width="120"
            :edit-render="{ immediate: true, name: 'input' }"
            field="单片价格"
            title="单片价格"
          >
          </vxe-table-column>
          <vxe-table-column
            width="80"
            :class-name="cellChooseClassLeft"
            field="币种"
            title="币种"
            :edit-render="{
              name: 'ElSelect',
              options: currencyList,
              optionProps: { value: 'currency', label: 'chnName' },
              autoselect: true,
            }"
          >
          </vxe-table-column>
          <vxe-table-column
            width="120"
            :edit-render="{ immediate: true, name: 'input' }"
            field="下单备注"
            align="left"
            title="下单备注"
          >
          </vxe-table-column>
          <vxe-table-column width="120" title="物流方式" field="物流方式">
            <template slot-scope="{ row }">
              <span>{{ row.物流方式 }}</span>
              <i
                class="iconP iconfont kt-icon-daoru"
                @click="ChannelChoose(row)"
              ></i>
            </template>
          </vxe-table-column>
          <vxe-table-column
            width="120"
            :edit-render="{ immediate: true, name: 'input' }"
            field="快递单号"
            title="快递单号"
          >
          </vxe-table-column>
          <vxe-table-column
            width="80"
            :edit-render="{ immediate: true, name: 'input' }"
            field="客户"
            title="客户"
          >
          </vxe-table-column>
          <vxe-table-column
            width="90"
            :edit-render="{ immediate: true, name: 'input' }"
            field="库存"
            title="库存"
          >
          </vxe-table-column>
          <vxe-table-column
            width="120"
            :class-name="cellChooseClassLeft"
            field="优先级"
            title="优先级"
            :edit-render="{
              name: 'ElSelect',
              options: Priority,
              autoselect: true,
            }"
          >
          </vxe-table-column>
          <vxe-table-column width="120" title="图片管理" field="图片管理">
            <template slot-scope="{ row }">
              <span>{{ row.图片管理 }}</span>
              <i
                class="iconP iconfont kt-icon-daoru"
                @click="iconPhotoChoose(row)"
              ></i>
            </template>
          </vxe-table-column>
          <vxe-table-column width="90" title="操作">
            <template v-if="isEdit" slot-scope="{ row }">
              <i
                v-if="row.产品类型 !== ''"
                class="iconC el-icon-circle-plus-outline"
              ></i>
              <i @click="iconDelProduct(row)" class="iconC el-icon-delete"></i>
            </template>
          </vxe-table-column>
        </vxe-table> -->

      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              type="primary"
              class="el-icon-s-promotion saveAnd2"
              @click="RefreshNumber"
              >刷新编号</el-button
            >
            <el-button
              type="primary"
              :loading="isSave"
              @click="saveProduct"
              :disabled="
                (addProduceList.length <= 1 &&
                  addProduceList[0].产品类型 === '') ||
                !isEdit
                  ? true
                  : false
              "
              :class="
                (addProduceList.length <= 1 &&
                  addProduceList[0].产品类型 === '') ||
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
              :disabled="
                (addProduceList.length <= 1 &&
                  addProduceList[0].产品类型 === '') ||
                !isEdit
                  ? true
                  : false
              "
              :class="
                (addProduceList.length <= 1 &&
                  addProduceList[0].产品类型 === '') ||
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
    </JyDialog>
    <!-- 新增弹出层结束 -->

    <!-- 选择产品类型弹出层 -->
    <JyDialog
      v-dialogDrag
      title="产品类型选择"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="chooseDaialogVisible"
      width="1250px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="chooseForm"
        :rules="chooseFormRules"
        :model="chooseFormRuleForm"
        style="font-size：14px"
        label-width="110px"
      >
        <el-row>
          <el-col style="display: flex">
            <el-form-item
              label="标签类型："
              prop="Flag"
              class="searchConditionShop"
            >
              <el-select
                v-model="chooseFormRuleForm.Flag"
                disabled
                class="unifySize"
              >
                <el-option value=""></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编码/名称：" prop="Name">
              <el-input
                v-model="chooseFormRuleForm.Name"
                class="unifySize"
                @keydown.enter.native="searchFocusEnter"
                clearable
              ></el-input>
            </el-form-item>
            <el-button
              type="danger"
              class="searchBtn2"
              size="small"
              :loading="projuctLoading"
              icon="el-icon-search"
              @click="getProtect"
              >查询</el-button
            >
          </el-col>
        </el-row>
        <vxe-table
          ref="chooseTable"
          border
          resizable
          stripe
          keep-source
          :row-class-name="cellChooseClass"
          show-overflow
          show-footer-overflow
          height="737"
          :loading="projuctTableLoading"
          :auto-resize="true"
          :header-cell-class-name="hearderClass"
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
            field="编码"
            title="编码"
          ></vxe-table-column>
          <vxe-table-column
            align="left"
            field="名称"
            title="名称"
          ></vxe-table-column>
          <vxe-table-column
            align="left"
            field="说明"
            title="说明"
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
    </JyDialog>

    <!-- 选择产品挂式弹出层 -->
    <JyDialog
      title="挂式选择"
      v-dialogDrag
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="chooseHangingDaialogVisible"
      width="1250px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="chooseHangingForm"
        :rules="chooseHangingFormRules"
        :model="chooseHangingFormRuleForm"
        style="font-size：14px"
        label-width="110px"
      >
        <el-row>
          <el-col style="display: flex">
            <el-form-item
              label="标签类型："
              prop="Flag"
              class="searchConditionShop"
            >
              <el-select
                v-model="chooseHangingFormRuleForm.Flag"
                disabled
                class="unifySize"
              >
                <el-option value=""></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编码/名称：" prop="Name">
              <el-input
                v-model="chooseHangingFormRuleForm.Name"
                class="unifySize"
                @keydown.enter.native="searchHangingEnter"
                clearable
              ></el-input>
            </el-form-item>
            <el-button
              type="danger"
              class="searchBtn2"
              size="small"
              icon="el-icon-search"
              :loading="HangingLoading"
              @click="getHangingProtect"
              >查询</el-button
            >
          </el-col>
        </el-row>
        <vxe-table
          ref="chooseHangingTable"
          border
          resizable
          stripe
          keep-source
          :row-class-name="cellChooseClass"
          show-overflow
          show-footer-overflow
          :loading="HangingTableLoading"
          height="737"
          :auto-resize="true"
          :header-cell-class-name="hearderClass"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true }"
          :data="chooseHangingPaging.data"
        >
          <vxe-table-column type="checkbox" width="40"></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="60"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            width="175"
            field="编码"
            title="编码"
          ></vxe-table-column>
          <vxe-table-column
            align="left"
            field="名称"
            title="名称"
          ></vxe-table-column>
          <vxe-table-column
            align="left"
            field="英文名称"
            title="英文名称"
          ></vxe-table-column>
          <vxe-table-column
            align="left"
            field="产品类型编号"
            title="产品类型编号"
          ></vxe-table-column>
        </vxe-table>
      </el-form>
      <!-- 分页 -->
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <el-pagination
              @size-change="chooseHangingHandleSizeChange"
              @current-change="chooseHangingHandleCurrentChange"
              :current-page="chooseHangingPaging.page"
              background
              :page-sizes="[100, 200, 500, 1000]"
              :page-size="chooseHangingPaging.limit"
              layout="prev,pager,next,total,sizes,jumper"
              :total="chooseHangingPaging.total"
            >
            </el-pagination>
            <span>
              <el-button
                type="primary"
                :disabled="chooseHangingProduceList.length < 1 ? true : false"
                class="chooseEnter"
                @click="chooseHangingProduct"
                >确 定</el-button
              >
              <el-button
                class="chooseCancel"
                @click="chooseHangingDaialogVisible = false"
                >取 消</el-button
              >
            </span>
          </el-col>
        </el-row>
      </span>
    </JyDialog>
    <!-- 选择工厂 -->
    <JyDialog
      title="工厂选择"
      v-dialogDrag
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="chooseFactoryVisible"
      width="1250px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="chooseFactoryForm"
        :rules="chooseFactoryForm"
        :model="FactoryParams"
        style="font-size：14px"
        label-width="110px"
      >
        <el-row>
          <el-col style="display: flex">
            <el-form-item
              label="工厂名称/英文名称："
              label-width="150px"
              prop="customerName"
            >
              <el-input
                v-model="FactoryParams.customerName"
                @keydown.enter.native="searchFactoryEnter"
                class="unifySize"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="工厂简称：" prop="ShortName">
              <el-input
                v-model="FactoryParams.ShortName"
                @keydown.enter.native="searchFactoryEnter"
                class="unifySize"
                clearable
              ></el-input>
            </el-form-item>
            <el-button
              type="danger"
              class="searchBtn2"
              @click="iconChooseFactory()"
              :loading="FactoryLoading"
              size="small"
              icon="el-icon-search"
              >查询</el-button
            >
          </el-col>
        </el-row>
        <vxe-table
          ref="chooseFactoryTable"
          border
          resizable
          stripe
          keep-source
          :row-class-name="cellClass"
          show-overflow
          :loading="FactoryTableLoading"
          show-footer-overflow
          height="737"
          class="mytable-scrollbar"
          :auto-resize="true"
          :header-cell-class-name="hearderClass"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true }"
          :data="chooseFactoryPaging.data"
        >
          <vxe-table-column type="checkbox" width="40"></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="60"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            width="100"
            field="ID"
            title="ID"
          ></vxe-table-column>
          <vxe-table-column
            width="100"
            field="编号"
            title="编号"
          ></vxe-table-column>
          <vxe-table-column
            width="105"
            field="简称"
            title="简称"
          ></vxe-table-column>
          <vxe-table-column
            align="left"
            field="名称"
            title="名称"
          ></vxe-table-column>
          <vxe-table-column
            width="100"
            field="英文名称"
            title="英文名称"
          ></vxe-table-column>
          <vxe-table-column
            width="100"
            field="业务员"
            title="业务员"
          ></vxe-table-column>
          <vxe-table-column
            width="100"
            field="跟单员"
            title="跟单员"
          ></vxe-table-column>
          <vxe-table-column
            width="100"
            field="国家"
            title="国家"
          ></vxe-table-column>
          <vxe-table-column
            width="100"
            field="联系人"
            title="联系人"
          ></vxe-table-column>
          <vxe-table-column
            width="100"
            field="联系电话"
            title="联系电话"
          ></vxe-table-column>
        </vxe-table>
      </el-form>
      <!-- 分页 -->
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <el-pagination
              @size-change="chooseFactoryHandleSizeChange"
              @current-change="chooseFactoryHandleCurrentChange"
              :current-page="chooseFactoryPaging.page"
              background
              :page-sizes="[100, 200, 500, 1000]"
              :page-size="chooseFactoryPaging.limit"
              layout="prev,pager,next,total,sizes,jumper"
              :total="chooseFactoryPaging.total"
            >
            </el-pagination>
            <span>
              <el-button
                type="primary"
                @click="chooseFactoryProduct"
                class="chooseEnter"
                >确 定</el-button
              >
              <el-button
                class="chooseCancel"
                @click="chooseFactoryVisible = false"
                >取 消</el-button
              >
            </span>
          </el-col>
        </el-row>
      </span>
    </JyDialog>
    <!-- 选择颜色 -->
    <JyDialog
      title="颜色选择"
      v-dialogDrag
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="chooseColorVisible"
      width="1250px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="chooseColorForm"
        :rules="chooseColorFormRules"
        :model="chooseColorForm"
        style="font-size：14px"
        label-width="110px"
      >
        <el-row>
          <el-col style="display: flex">
            <el-form-item label="颜色名称：" prop="Color">
              <el-input
                v-model="chooseColorForm.Color"
                @keydown.enter.native="searchColorEnter"
                class="unifySize"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="色号：" prop="ColorNO">
              <el-input
                v-model="chooseColorForm.ColorNO"
                @keydown.enter.native="searchColorEnter"
                class="unifySize"
                clearable
              ></el-input>
            </el-form-item>
            <el-button
              type="danger"
              class="searchBtn2"
              size="small"
              icon="el-icon-search"
              :loading="ColorLoading"
              @click="getColorList"
              >查询</el-button
            >
          </el-col>
        </el-row>
        <vxe-table
          ref="ColorTable"
          border
          resizable
          stripe
          keep-source
          :row-class-name="cellChooseClass"
          show-overflow
          show-footer-overflow
          height="737"
          :loading="ColorTableLoading"
          :auto-resize="true"
          :header-cell-class-name="hearderClass"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true }"
          :data="chooseColorPaging.data"
        >
          <vxe-table-column type="checkbox" width="40"></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="60"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            width="100"
            field="颜色ID"
            title="颜色ID"
          ></vxe-table-column>
          <vxe-table-column
            width="105"
            field="色号"
            title="色号"
          ></vxe-table-column>
          <vxe-table-column
            width="105"
            field="颜色"
            title="颜色"
          ></vxe-table-column>
          <vxe-table-column
            width="205"
            field="英文颜色"
            title="英文颜色"
          ></vxe-table-column>
          <vxe-table-column
            width="105"
            field="潘通色号"
            title="潘通色号"
          ></vxe-table-column>
          <vxe-table-column width="175" field="颜色面板" title="颜色面板">
            <template slot-scope="{ row }">
              <!-- <div>{{ row.颜色面板 | colorUrl }}</div> -->
              <span>{{ row.颜色面板 }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            align="left"
            field="备注"
            title="备注"
          ></vxe-table-column>
        </vxe-table>
      </el-form>
      <!-- 分页 -->
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <el-pagination
              @size-change="chooseColorHandleSizeChange"
              @current-change="chooseColorHandleCurrentChange"
              :current-page="chooseColorPaging.page"
              background
              :page-sizes="[100, 200, 500, 1000]"
              :page-size="chooseColorPaging.limit"
              layout="prev,pager,next,total,sizes,jumper"
              :total="chooseColorPaging.total"
            >
            </el-pagination>
            <span>
              <el-button
                type="primary"
                class="chooseEnter"
                @click="ChooseColorProduct"
                >确 定</el-button
              >
              <el-button
                class="chooseCancel"
                @click="chooseColorVisible = false"
                >取 消</el-button
              >
            </span>
          </el-col>
        </el-row>
      </span>
    </JyDialog>
    <!-- 选择花型 -->
    <JyDialog
      title="花型选择"
      v-dialogDrag
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="chooseFlowerVisible"
      width="1250px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="chooseFlowerForm"
        :model="chooseFlowerForm"
        :rules="chooseFlowerFormRules"
        style="font-size：14px"
        label-width="110px"
      >
        <el-row>
          <el-col style="display: flex">
            <el-form-item label="设计编号：" prop="FlowersCode">
              <el-input
                v-model="chooseFlowerForm.FlowersCode"
                @keydown.enter.native="searchEnterFlowers"
                class="unifySize"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="花型名：" prop="F_ChnName">
              <el-input
                v-model="chooseFlowerForm.F_ChnName"
                @keydown.enter.native="searchEnterFlowers"
                class="unifySize"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="类型：" prop="Type">
              <el-input
                v-model="chooseFlowerForm.Type"
                @keydown.enter.native="searchEnterFlowers"
                class="unifySize"
                clearable
              ></el-input>
            </el-form-item>
            <el-button
              type="danger"
              class="searchBtn2"
              size="small"
              icon="el-icon-search"
              :loading="FlowerLoading"
              @click="getFlowerList"
              >查询</el-button
            >
          </el-col>
        </el-row>
        <vxe-table
          ref="FlowerTable"
          border
          resizable
          stripe
          keep-source
          :row-class-name="cellChooseClass"
          show-overflow
          height="737"
          :auto-resize="true"
          :loading="FlowerTableLoading"
          show-footer-overflow
          :header-cell-class-name="hearderClass"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true }"
          :data="chooseFlowerPaging.data"
        >
          <vxe-table-column type="checkbox" width="40"></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="60"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column width="100" field="缩略图" title="缩略图">
            <template slot-scope="{ row }">
              <img v-if="row.缩略图" :src="row.缩略图" style="width: 50px" />
              <span v-else>无</span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            width="105"
            field="类别"
            title="类别"
          ></vxe-table-column>
          <vxe-table-column
            width="105"
            field="设计编号"
            title="设计编号"
          ></vxe-table-column>
          <vxe-table-column
            width="205"
            field="中文花型名"
            title="中文花型名"
          ></vxe-table-column>
          <vxe-table-column
            width="205"
            field="英文花型名"
            title="英文花型名"
          ></vxe-table-column>
          <vxe-table-column
            width="175"
            field="类型"
            title="类型"
          ></vxe-table-column>
          <vxe-table-column field="设计员" title="设计员"></vxe-table-column>
        </vxe-table>
      </el-form>
      <!-- 分页 -->
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <el-pagination
              @size-change="chooseFlowerHandleSizeChange"
              @current-change="chooseFlowerHandleCurrentChange"
              :current-page="chooseFlowerPaging.page"
              background
              :page-sizes="[100, 200, 500, 1000]"
              :page-size="chooseFlowerPaging.limit"
              layout="prev,pager,next,total,sizes,jumper"
              :total="chooseFlowerPaging.total"
            >
            </el-pagination>
            <span>
              <el-button
                type="primary"
                class="chooseEnter"
                @click="ChooseFlowerProduct"
                >确 定</el-button
              >
              <el-button
                class="chooseCancel"
                @click="chooseFlowerVisible = false"
                >取 消</el-button
              >
            </span>
          </el-col>
        </el-row>
      </span>
    </JyDialog>
    <!-- 选择物流 -->
    <!-- <JyDialog
      title="选择物流方式"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="chooseLogisticsVisible"
      hieght="800px"
      width="1250px"
    >
      <el-form
        ref="chooseLogisticsForm"
        :model="chooseLogisticsForm"
        style="font-size：14px"
        label-width="110px"
      >
        <el-row>
          <el-col style="display: flex">
            <el-form-item label="标签类型：" class="searchConditionShop">
              <el-select v-model="chooseLogisticsForm" class="unifySize">
                <el-option
                  :key="index"
                  v-for="(item, index) in Logisticsdata"
                  :label="item.物流方式"
                  :value="item.物流方式"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编码/名称：">
              <el-input
                v-model="chooseLogisticsForm.Name"
                class="unifySize"
                clearable
              ></el-input>
            </el-form-item>
            <el-button
              type="danger"
              class="searchBtn"
              size="small"
              icon="el-icon-search"
              @click="getLogisticsList"
              >查询</el-button
            >
          </el-col>
        </el-row>
        <vxe-table
          ref="LogisticsTable"
          border
          resizable
          stripe
          keep-source
          :row-class-name="cellChooseClass"
          show-overflow
          show-footer-overflow
          height="597"
          :auto-resize="true"
          :header-cell-class-name="hearderClass"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true }"
          :data="chooseLogisticsPaging.data"
        >
          <vxe-table-column type="checkbox" width="40"></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="60"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            align="left"
            field="物流方式"
            title="物流方式"
          ></vxe-table-column>
        </vxe-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <el-pagination
              @size-change="chooseLogisticsHandleSizeChange"
              @current-change="chooseLogisticsHandleCurrentChange"
              :current-page="chooseLogisticsPaging.page"
              background
              :page-sizes="[100, 200, 500, 1000]"
              :page-size="chooseLogisticsPaging.limit"
              layout="prev,pager,next,total,sizes,jumper"
              :total="chooseLogisticsPaging.total"
            >
            </el-pagination>
            <span>
              <el-button
                type="primary"
                class="chooseEnter"
                @click="ChooseLogisticsProduct"
                >确 定</el-button
              >
              <el-button
                class="chooseCancel"
                @click="chooseLogisticsVisible = false"
                >取 消</el-button
              >
            </span>
          </el-col>
        </el-row>
      </span>
    </JyDialog> -->
    <!-- 产品材质 -->
    <JyDialog
      v-dialogDrag
      title="材质选择"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="chooseTextureDaialogVisible"
      width="1250px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="chooseTextureForm"
        :rules="chooseTextureFormRuleForm"
        :model="chooseTextureFormRuleForm"
        style="font-size：14px"
        label-width="110px"
      >
        <el-row>
          <el-col style="display: flex">
            <el-form-item
              label="标签类型："
              prop="Flag"
              class="searchConditionShop"
            >
              <el-select
                v-model="chooseTextureFormRuleForm.Flag"
                disabled
                class="unifySize"
              >
                <el-option value=""></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编码/名称：" prop="Name">
              <el-input
                v-model="chooseTextureFormRuleForm.Name"
                class="unifySize"
                @keydown.enter.native="searchTextureEnter"
                clearable
              ></el-input>
            </el-form-item>
            <el-button
              type="danger"
              class="searchBtn2"
              size="small"
              icon="el-icon-search"
              :loading="TextureLoading"
              @click="getTextureProtect"
              >查询</el-button
            >
          </el-col>
        </el-row>
        <vxe-table
          ref="chooseTextureTable"
          border
          resizable
          stripe
          keep-source
          :row-class-name="cellChooseClass"
          show-overflow
          :loading="TextureTableLoading"
          show-footer-overflow
          height="737"
          :auto-resize="true"
          :header-cell-class-name="hearderClass"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true }"
          :data="chooseTexturePaging.data"
        >
          <vxe-table-column type="checkbox" width="40"></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="60"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            width="175"
            field="编码"
            title="编码"
          ></vxe-table-column>
          <vxe-table-column
            align="left"
            field="名称"
            title="名称"
          ></vxe-table-column>
          <vxe-table-column
            align="left"
            field="说明"
            title="说明"
          ></vxe-table-column>
        </vxe-table>
      </el-form>
      <!-- 分页 -->
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <el-pagination
              @size-change="chooseTextureHandleSizeChange"
              @current-change="chooseTextureHandleCurrentChange"
              :current-page="chooseTexturePaging.page"
              background
              :page-sizes="[100, 200, 500, 1000]"
              :page-size="chooseTexturePaging.limit"
              layout="prev,pager,next,total,sizes,jumper"
              :total="chooseTexturePaging.total"
            >
            </el-pagination>
            <span>
              <el-button
                type="primary"
                class="chooseEnter"
                @click="chooseTextureProduct"
                >确 定</el-button
              >
              <el-button
                class="chooseCancel"
                @click="chooseTextureDaialogVisible = false"
                >取 消</el-button
              >
            </span>
          </el-col>
        </el-row>
      </span>
    </JyDialog>
    <!-- 产品面料加工 -->
    <JyDialog
      v-dialogDrag
      title="面料加工选择"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="chooseMachiningDaialogVisible"
      width="1250px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="chooseMachiningForm"
        :rules="chooseMachiningFormRules"
        :model="chooseMachiningFormRuleForm"
        style="font-size：14px"
        label-width="110px"
      >
        <el-row>
          <el-col style="display: flex">
            <el-form-item
              label="标签类型："
              prop="Flag"
              class="searchConditionShop"
            >
              <el-select
                v-model="chooseMachiningFormRuleForm.Flag"
                disabled
                class="unifySize"
              >
                <el-option value=""></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编码/名称：" prop="Name">
              <el-input
                v-model="chooseMachiningFormRuleForm.Name"
                @keydown.enter.native="searchMachingEnter"
                class="unifySize"
                clearable
              ></el-input>
            </el-form-item>
            <el-button
              type="danger"
              class="searchBtn2"
              size="small"
              icon="el-icon-search"
              :loading="MachiningLoading"
              @click="getMachiningProtect"
              >查询</el-button
            >
          </el-col>
        </el-row>
        <vxe-table
          ref="chooseMachiningTable"
          border
          resizable
          stripe
          keep-source
          :row-class-name="cellChooseClass"
          show-overflow
          show-footer-overflow
          :loading="MachiningTableLoading"
          height="737"
          :auto-resize="true"
          :header-cell-class-name="hearderClass"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true }"
          :data="chooseMachiningPaging.data"
        >
          <vxe-table-column type="checkbox" width="40"></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="60"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            width="175"
            field="编码"
            title="编码"
          ></vxe-table-column>
          <vxe-table-column
            align="left"
            field="名称"
            title="名称"
          ></vxe-table-column>
          <vxe-table-column
            align="left"
            field="说明"
            title="说明"
          ></vxe-table-column>
        </vxe-table>
      </el-form>
      <!-- 分页 -->
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <el-pagination
              @size-change="chooseMachiningHandleSizeChange"
              @current-change="chooseMachiningHandleCurrentChange"
              :current-page="chooseMachiningPaging.page"
              background
              :page-sizes="[100, 200, 500, 1000]"
              :page-size="chooseMachiningPaging.limit"
              layout="prev,pager,next,total,sizes,jumper"
              :total="chooseMachiningPaging.total"
            >
            </el-pagination>
            <span>
              <el-button
                type="primary"
                class="chooseEnter"
                @click="chooseMachiningProduct"
                >确 定</el-button
              >
              <el-button
                class="chooseCancel"
                @click="chooseMachiningDaialogVisible = false"
                >取 消</el-button
              >
            </span>
          </el-col>
        </el-row>
      </span>
    </JyDialog>
    <!-- 选择图片 -->
    <JyDialog
      v-dialogDrag
      title="图片选择"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="choosePhotoVisible"
      width="1250px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="choosePhotoForm"
        :model="choosePhotoForm"
        style="font-size：14px"
        label-width="110px"
      >
        <el-row>
          <el-col style="display: flex">
            <!-- <el-upload
              action=""
              ref="upload"
              list-type="picture-card"
              :limit="1"
              :on-change="fileChange"
              :on-remove="removeFile"
              :auto-upload="false"
              :file-list="fileList"
              accept="image/*"
            >
              <i class="el-icon-plus"></i>
            </el-upload> -->
            <el-upload
              drag
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
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <em>点击上传</em>
              </div>
            </el-upload>
          </el-col>
          <el-col><el-button @click="uploadFile">上传图片</el-button></el-col>
          <el-col style="display: flex">
            <img :src="Imgurl + img" alt="上传成功后暂时的图片" class="img" />
          </el-col>
        </el-row>
      </el-form>
      <!-- 分页 -->
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <span>
              <el-button
                type="primary"
                class="chooseEnter"
                @click="ChoosePhotoProduct"
                >确 定</el-button
              >
              <el-button
                class="chooseCancel"
                @click="choosePhotoVisible = false"
                >取 消</el-button
              >
            </span>
          </el-col>
        </el-row>
      </span>
    </JyDialog>
    <!-- 运费登记 -->
    <el-dialog
      v-dialogDrag
      title="运费登记"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="FreightDaialogVisible"
      width="600px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="FreightForm"
        :rules="FreightFormRules"
        :model="FreightForm"
        style="font-size：14px"
        label-width="110px"
      >
        <el-row>
          <el-col style="display: flex">
            <el-form-item
              label="订单号："
              prop="Flag"
              class="searchConditionShop"
            >
              <el-input
                v-model="FreightForm.Name"
                class="unifySize"
                disabled
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="下单日期：" prop="Name">
              <el-input
                v-model="FreightForm.Name"
                class="unifySize"
                disabled
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="display: flex">
            <el-form-item
              label="站点："
              prop="Flag"
              class="searchConditionShop"
            >
              <el-input
                v-model="FreightForm.Name"
                class="unifySize"
                disabled
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="国家：" prop="Name">
              <el-input
                v-model="FreightForm.Name"
                class="unifySize"
                disabled
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="display: flex">
            <el-form-item
              label="重量："
              prop="Flag"
              class="searchConditionShop"
            >
              <el-input
                v-model="FreightForm.Name"
                class="unifySize"
                clearable
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="体积：" prop="Name">
              <el-input
                v-model="FreightForm.Name"
                class="unifySize"
                clearable
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="display: flex">
            <el-form-item
              label="预估运费："
              prop="Flag"
              class="searchConditionShop"
            >
              <el-input
                v-model="FreightForm.Name"
                class="unifySize"
                clearable
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="物流方式：" prop="Name">
              <el-input
                v-model="FreightForm.Name"
                class="unifySize"
                clearable
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="display: flex">
            <el-form-item
              label="快递单号："
              prop="Flag"
              class="searchConditionShop"
            >
              <el-input
                v-model="FreightForm.Name"
                class="unifySize"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="实际运费：" prop="Name">
              <el-input
                v-model="FreightForm.Name"
                class="unifySize"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button type="primary" class="saveBtn iconfont kt-icon-baocun"
              >保存</el-button
            >
            <el-button
              type="primary"
              class="clearBtn"
              @click="FreightDaialogVisible = false"
              >取消</el-button
            >
          </el-col>
        </el-row>
      </span>
    </el-dialog>
    <!-- 运费计算 -->
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
          position: 'relative',
        }"
      >
        <show-details
          :queryCode="queryCode"
          :keyCode="keyCode"
          v-if="dialogParam.name === 'ShowDetails'"
        ></show-details>
      </div>
    </jy-dialog>
    <JyDialog
      v-dialogDrag
      title="运费计算"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="ComputeFreightDaialogVisible"
      height="800px"
      width="1200px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="ComputeForm"
        :rules="ComputeFormRules"
        :model="ComputeForm"
        style="font-size：14px"
      >
        <el-row>
          <el-col :md="8" :lg="6" :xl="6">
            <el-form-item
              class="searchMargin"
              label="订单号："
              label-width="80px"
              prop="PlanNo"
            >
              <el-input
                v-model="ComputeForm.PlanNo"
                class="unifySize"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="5" :lg="6" :xl="6">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
              label="下单日期："
              label-width="80px"
              prop="PlanTime"
            >
              <el-input
                v-model="ComputeForm.PlanTime"
                class="unifySize"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="5" :lg="6" :xl="6">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
              label="站点："
              label-width="80px"
              prop="Shop"
            >
              <el-input
                v-model="ComputeForm.Shop"
                class="unifySize"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :lg="6" :xl="6">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
              label="国家："
              label-width="80px"
              prop="Country"
            >
              <el-select
                v-model="ComputeForm.Country"
                class="unifySize"
                clearable
                placeholder="输入或选择国家"
                filterable
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in CountryList"
                  :label="item.StateChNm"
                  :value="item.StateID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="12" :lg="6" :xl="6">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
              label="重量："
              label-width="80px"
              prop="Weight"
            >
              <el-input
                v-model="ComputeForm.Weight"
                class="unifySize"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="6" :xl="6">
            <el-form-item
              class="searchMargin"
              style="margin-bottom: 0px"
              label="体积："
              label-width="80px"
              prop="Volume"
            >
              <el-input
                v-model="ComputeForm.Volume"
                class="unifySize"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="5" :lg="3" :xl="3">
            <el-form-item
              class="searchMargin special1"
              style="margin-bottom: 0px"
              label="物流方式："
              label-width="80px"
              prop="LineName"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="鼠标双击清空内容"
                placement="top"
              >
                <vxe-input
                  v-model="ComputeForm.LineName"
                  :readonly="true"
                  @dblclick="delInput"
                  class="Delivery1 unifySize1"
                ></vxe-input>
              </el-tooltip>
              <i
                class="iconP iconfont kt-icon-daoru choose1"
                @click="ChannelChoose1('add')"
              ></i>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col class="secondBtn1">
          <el-button
            type="primary"
            class="iconBtn iconfont kt-icon-caidan"
            :loading="ComputerLoading"
            @click="computeResults"
            >开始计算</el-button
          >
          <div class="tips">
            包裹重量单位为kg；包裹体积按单边长度或包裹长+宽+高，单位为cm
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-card class="computerCard">
            <div class="show">
              <img src="@/assets/image/pic.png" alt="显示的一张图片" />
              <div class="titleReviewSum">
                <div class="titleReview">
                  配送服务费（根据包裹重量按克计费）RMB/kg + 服务费（Item
                  服务费/挂号服务费）RMB/包裹
                </div>
                <div class="titleReview1" v-if="IsData.length == 0"></div>
                <div class="titleReview1" v-else v-show="Total !== ''">
                  {{ `${DeliveryFee} + ${OtherFee} + ${RangeFee} = ${Total}` }}
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button type="primary" class="saveBtn iconfont kt-icon-baocun"
              >保存</el-button
            >
            <el-button
              type="primary"
              class="clearBtn"
              @click="ComputeFreightDaialogVisible = false"
              >取消</el-button
            >
          </el-col>
        </el-row>
      </span>
    </JyDialog>
    <!-- 报批弹框 -->
    <report-approval
      v-dialogDrag
      v-if="showReportDialog"
      ref="ReportApproval"
      @okDialog="ReportOkDialog"
    ></report-approval>

    <!-- 选择物流渠道 -->
    <JyDialog
      v-dialogDrag
      title="物流方式选择"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="chooseChannelVisible"
      width="1250px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="chooseChannelForm"
        :model="chooseChannelForm"
        style="font-size：14px"
        label-width="110px"
      >
        <el-row>
          <el-col style="display: flex">
            <!-- 查询条件区域 -->
            <!-- <span class="blockSpan1"> -->
            <el-form-item label="更新开始时间：">
              <!-- <div class="blockDate"> -->
              <el-date-picker
                class="unifySize"
                v-model="chooseChannelForm.BeginDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择开始日期"
              ></el-date-picker>

              <!-- </div> -->
            </el-form-item>
            <el-form-item label="更新结束时间：">
              <el-date-picker
                class="unifySize"
                v-model="chooseChannelForm.EndDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择结束日期"
              ></el-date-picker>
              <!-- </span> -->
            </el-form-item>

            <el-form-item
              class="searchConditionShop"
              label="物流渠道："
              label-width="100px"
            >
              <vxe-input
                v-model="chooseChannelForm.LineName"
                @keydown.enter.native="searchEnterlog"
                class="unifySize"
                placeholder="物流渠道"
                clearable
              ></vxe-input>
            </el-form-item>
            <el-form-item
              class="searchConditionShop"
              style="margin-bottom: 0px"
              label="物流等级："
              label-width="100px"
            >
              <el-select
                v-model="chooseChannelForm.LineLevel"
                class="unifySize"
                @keydown.enter.native="searchEnterlog"
                placeholder="物流等级"
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in logisticsList"
                  :label="item.Name"
                  :value="item.Code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-button
              type="danger"
              class="searchBtn2"
              size="small"
              icon="el-icon-search"
              :loading="ChannelLoading"
              @click="MainTableSearch"
              >查询</el-button
            >
          </el-col>
        </el-row>
        <vxe-grid
          border
          ref="ChannelRef"
          resizable
          stripe
          keep-source
          width="auto"
          :loading="ChannelTableLoading"
          show-overflow="title"
          :row-class-name="cellClass"
          height="700"
          :columns="columns1"
          show-footer
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          class="mytable-scrollbar"
          :checkbox-config="{ highlight: true }"
          :data="chooseChannelPaging.data"
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
        </vxe-grid>
      </el-form>
      <!-- 分页 -->
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <el-pagination
              @size-change="chooseChannelHandleSizeChange"
              @current-change="chooseChannelHandleCurrentChange"
              :current-page="chooseChannelPaging.page"
              background
              :page-sizes="[100, 200, 500, 1000]"
              :page-size="chooseChannelPaging.limit"
              layout="prev,pager,next,total,sizes,jumper"
              :total="chooseChannelPaging.total"
            >
            </el-pagination>
            <span>
              <el-button
                type="primary"
                class="chooseEnter"
                @click="ChooseChannelProduct"
                >确 定</el-button
              >
              <el-button
                class="chooseCancel"
                @click="chooseChannelVisible = false"
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
import ReportApproval from '../../../Components/ReportApproval'
import JyTableInput from '@/components/JyTableInput'
import ShowDetails from '../../../../Basic/ShowDetails'
import JyDialog from '@/components/JyDialog/index'
export default {
  components: { ReportApproval, JyTableInput, JyDialog,ShowDetails },
  name: 'test3',
  data() {
    return {
      HangingInfo: '', //挂式信息
      promptInfo: '', //类型编码提示信息
      TexturePromptInfo: '', //材质编码提示信息
      MachingPromptInfo: '', //加工编码提示信息
      FlowerPromptInfo: '', //设计编号花型提示信息
      ColorPromptInfo: '', //颜色提示信息
      isSave: false,
      showReportDialog: false, //报批弹框的显示与隐藏
      filterData: '', //过滤的内容
      checkoutData: [], //主表复选框选中数据
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      cellChooseClass: 'cellChooseClass',
      cellChooseClassLeft: 'cellChooseClassLeft',
      columnsClass: 'columnsClass',
      loading: false, // 主表loading
      IsSearch: false, // 查询lodading'
      //主表对象数据参数
      queryPramsTable: {
        UserCode: '',
        BeginDate: '',
        EndDate: '',
        PlanNo: '', //订单号
        isclose: '', //是否关闭
        Shopid: '',
        ProductNo: '', // 产品号
        chnName: '', // 产品名称
        Size: '', // 尺寸
        Customer: '', // 客户
        ExpressNo: '', // 快递单号
        ExpressType: '', //物流方式
        E_OrderCode: '', // 销售单号
        Color: '', //颜色
        IsDetail: '1', //显示明细
        IsCancle: '', //回收站
        Status: '', //状态
      },
      AdjustmentSheet: [], //主表的后端数据源
      //   主表配置
      columns: [
        { type: 'checkbox', width: '60' },
        { type: 'seq', width: '50', title: '序号' },
        { field: '关闭', width: '110', title: '关闭' },
        { width: '60', title: '状态', field: '状态' },
        { width: '200', title: '订单号', field: '订单号' },
        // { width: '95', title: '申请时间', slots: { default: 'deliveryDate' } },
        { width: '80', title: '站点', field: '站点' },
        { width: '100', title: '总数量', field: '总数量' },
        { width: '240', title: '已完成', field: '已完成' },
        { width: '180', title: '工厂', field: '工厂' },
        { width: '120', title: '下单日期', field: '下单日期' },
        { align: 'left', title: '下单备注', field: '下单备注' },
        { width: '80', title: '制单人', field: '制单人' },
        { width: '120', title: '制单日期', field: '制单日期' },
      ],
      columnsDetail: [
        { type: 'checkbox', width: '60' },
        { type: 'seq', width: '50', title: '序号' },
        { field: '时间', width: '60', title: '时间' },
        { field: '关闭', width: '70', title: '关闭' },
        { width: '80', title: '状态', field: '状态' },
        {
          width: '100',
          title: '生产状态',
          field: '生产状态',
          slots: { default: 'productStatus' },
        },
        { width: '80', title: '行号', field: '行号' },
        { width: '90', title: '缩略图', field: '缩略图' },
        { width: '120', title: '订单号', field: '订单号' },
        { width: '60', title: '序号', field: '序号' },
        { width: '200', title: '销售单号', field: '销售单号' },
        { width: '150', title: '工厂', field: '工厂' },
        { width: '120', title: '下单日期', field: '下单日期' },
        { width: '120', title: '产品类型', field: '产品类型' },
        { width: '100', title: '挂式', field: '挂式' },
        { width: '100', title: '面料材质', field: '面料材质' },
        { width: '130', title: '面料加工', field: '面料加工' },
        { width: '60', title: '尺寸', field: '尺寸' },
        { width: '60', title: '颜色', field: '颜色' },
        { width: '60', title: '花型', field: '花型' },
        { width: '120', title: '产品编号', field: '产品编号' },
        { width: '120', title: '设计编号', field: '设计编号' },
        { width: '120', title: '产品名称', field: '产品名称' },
        { width: '80', title: '下单数量', field: '下单数量' },
        { width: '70', title: '单价', field: '单价' },
        { width: '80', title: '开卡个数', field: '开卡个数' },
        { width: '80', title: '开卡数量', field: '开卡数量' },
        { align: 'left', width: '200', title: '下单备注', field: '下单备注' },
        { width: '80', title: '国家', field: '国家' },
        { width: '80', title: '物流方式', field: '物流方式' },
        { width: '80', title: '快递单号', field: '快递单号' },
        { width: '80', title: '客户', field: '客户' },
        { align: 'left', width: '160', title: '备注', field: '备注' },
        { width: '80', title: '制单人', field: '制单人' },
        { width: '120', title: '制单日期', field: '制单日期' },
        { width: '120', title: '库存箱数', field: '库存箱数' },
        { width: '120', title: '库存总片数', field: '库存总片数' },
      ],
      isclose: [
        { label: '否', value: '0' }, // 是否关闭
        { label: '是', value: '1' },
      ],
      Company: [], //单位
      currencyList: [], // 币种
      Priority: [
        { label: '正常下单', value: '1' }, // 优先级
        { label: '当日完成', value: '2' },
      ],
      // 关闭拼接的字符串
      list: '',
      addRules: {
        PlanNo: [{ required: false, trigger: 'change' }],
        Name: [{ required: false, trigger: 'change' }],
        OrderRemark: [
          { required: false, message: '请输入备注', trigger: 'change' },
        ],
        Shopid: [{ required: false, message: '请选择站点', trigger: 'blur' }],
        // country: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        OrderDate: [{ required: true, message: '请选择日期', trigger: 'blur' }],
      },
      shopList: [], // 站点
      iconShow: false, // 默认展开
      delLength: [], //主表复选框选中的数据
      state: 'add', //判断是哪个按钮点击新增还是编辑
      paging: { list: [], data: [], limit: 100, total: null, page: 1 },
      // delArr: [], //选中的数据用来储存在弹框表格中
      sign: '', //判断按钮携带参数
      selectedRow: null,
      addAialogVisible: false, //新增弹框
      // 新增的请求参数
      addFormParams: {
        UserCode: '',
        OrderDate: '',
        Shopid: '',
        OrderRemark: '',
        PlanNo: '自动编号', //订单号自动编号是新增，具体是修改
        Factory: '', //工厂id
        Name: '', //工厂名称自制
        strDetail: '',
      },
      footerCellClassName: 'footerCellClassName',
      // 新增的所有表格数据
      columnIcon: '◇', //列分隔符
      addProduceList: [
        {
          销售单号: '',
          序号: '',
          类型编码: '',
          产品类型: '',
          挂式编码: '',
          挂式: '',
          层数: '',
          材质编码: '',
          面料材质: '',
          加工编码: '',
          面料加工: '',
          宽度: '',
          高度: '',
          单位: 'JL006',
          下单数量: '',
          颜色编码: '',
          颜色: '',
          设计编号: '',
          花型: '',
          产品编号: '1-X',
          单片价格: '',
          币种: 'USD',
          下单备注: '',
          物流方式: '',
          快递单号: '',
          客户: '',
          库存: '',
          优先级: '1',
          图片管理: '',
        },
      ], //新增表的数据
      r_columns: [
        { type: 'checkbox', width: '40' },

        {
          editRender: "{ immediate: true, name: 'input' }",
          width: '110',
          field: '销售单号',
          title: '销售单号',
        },
        { width: '80', title: '序号', field: '序号' },
        {
          editRender: {
            immediate: true,
            name: 'input',
            events: { keyup: this.ageFocusEvent },
          },
          width: '110',
          field: '类型编码',
          title: '类型编码',
        },
        {
          title: '产品类型',
          field: '产品类型',
          width: '135',
          slots: {
            default: 'product', // 插槽引用1
          },
        },
        {
          width: '120',
          title: '挂式编码',
          field: '挂式编码',
          editRender: {
            immediate: true,
            name: 'input',
            events: { keyup: this.HangingFocusEvent },
          },
        },
        {
          title: '挂式',
          field: '挂式',
          width: '120',
          slots: {
            default: 'Hanging', // 插槽引用1
          },
        },
        {
          title: '层数',
          field: '层数',
          width: '80',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '材质编码',
          field: '材质编码',
          width: '120',
          editRender: {
            immediate: true,
            name: 'input',
            events: { keyup: this.TextureFocusEvent },
          },
        },
        {
          title: '面料材质',
          field: '面料材质',
          width: '120',
          slots: {
            default: 'Texture', // 插槽引用1
          },
        },
        {
          title: '加工编码',
          field: '加工编码',
          width: '120',
          editRender: {
            immediate: true,
            name: 'input',
            events: { keyup: this.MachingFocusEvent },
          },
        },
        {
          title: '面料加工',
          field: '面料加工',
          width: '120',
          slots: {
            default: 'Maching', // 插槽引用1
          },
        },
        {
          title: '宽度',
          field: '宽度',
          width: '120',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '高度',
          field: '高度',
          width: '120',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '单位',
          field: '单位',
          width: '120',
          slots: {
            default: 'company', // 插槽引用1
          },
          // editRender: {
          //   name: 'ElSelect',
          //   options: this.Company,
          //   immediate: true,
          //   optionProps: { value: 'UnitCode', label: 'UnitName' },
          //   autoselect: true,
          // },
        },
        {
          title: '下单数量',
          field: '下单数量',
          width: '120',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '颜色编码',
          field: '颜色编码',
          width: '120',
          editRender: {
            immediate: true,
            name: 'input',
            events: { keyup: this.ColorFocusEvent },
          },
        },
        {
          title: '颜色',
          field: '颜色',
          width: '120',
          slots: {
            default: 'Color', // 插槽引用1
          },
        },
        {
          title: '设计编号',
          field: '设计编号',
          width: '120',
          editRender: {
            immediate: true,
            name: 'input',
            events: { keyup: this.FlowerFocusEvent },
          },
        },
        {
          title: '花型',
          field: '花型',
          width: '120',
          slots: {
            default: 'Flower', // 插槽引用1
          },
        },
        {
          title: '产品编号',
          field: '产品编号',
          width: '120',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '单片价格',
          field: '单片价格',
          width: '120',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '币种',
          field: '币种',
          width: '120',
          slots: {
            default: 'currency', // 插槽引用1
          },
        },

        {
          title: '下单备注',
          field: '下单备注',
          align: 'left',
          width: '120',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '物流方式',
          field: '物流方式',
          width: '120',
          slots: {
            default: 'Channel', // 插槽引用1
          },
        },
        {
          title: '快递单号',
          field: '快递单号',
          width: '120',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '客户',
          field: '客户',
          width: '120',
          editRender: {
            immediate: true,
          },
        },

        {
          title: '库存',
          field: '库存',
          width: '120',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '优先级',
          field: '优先级',
          width: '120',
          slots: {
            default: 'Priority', // 插槽引用1
          },
        },

        {
          title: '图片管理',
          field: '图片管理',
          width: '120',
          slots: {
            default: 'photo',
          },
        },
      ],
      // 新增的校验
      validRules: {
        层数: [
          { required: true, message: '层数必须填写' },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值不能为负数',
          },
        ],
      },
      isEdit: true, //规定新增是否可以修改
      statusList: [], // 后端返回的状态数据
      isShowDetailed: false, //是否显示明细
      delArr: [], //新增复选框选中的数据

      // 选择产品弹出层
      chooseDaialogVisible: false, //选择弹出层显示与隐藏
      // 选择产品类型的查询参数
      projuctLoading: false,
      projuctTableLoading: false,
      chooseFormRuleForm: {
        UserCode: '',
        Flag: 'ProductClass',
        Code: '',
        Name: '',
        TypeNo: '',
      },
      // 查询产品校验规则
      chooseFormRules: {
        Flag: [{ required: false, trigger: 'change' }],
        Name: [{ required: false, trigger: 'blur' }],
      },
      chooseList: [], //选择的产品数据
      chooseProduceList: [], //产品表数据
      // 分页
      choosePaging: { list: [], data: [], limit: 100, total: null, page: 1 },
      // ??选择产品结束

      // 选择产品挂式弹出层
      chooseHangingDaialogVisible: false, //选择弹出层显示与隐藏
      HangingLoading: false,
      HangingTableLoading: false,
      // 选择产品挂式的查询参数
      chooseHangingFormRuleForm: {
        UserCode: '',
        Flag: '',
        Code: '',
        Name: '',
        TypeNo: 'ProductClass',
      },
      // 查询产品挂式校验规则
      chooseHangingFormRules: {
        Flag: [{ required: false, trigger: 'change' }],
        Name: [{ required: false, trigger: 'blur' }],
      },
      dialogParam: {
        title: '',
        type: '',
        name: '',
        width: '60%',
        isShowDialog: false,
      },
      selectedHangingRow: null,
      chooseHangingList: [], //选择的产品数据
      initializationList: [], //初始化挂式所有数据
      chooseHangingProduceList: [], //产品表数据
      // 分页
      chooseHangingPaging: {
        list: [],
        data: [],
        limit: 100,
        total: null,
        page: 1,
      },
      // ??选择产品挂式结束

      // 选择工厂开始
      chooseFactoryVisible: false, //弹框显示与隐藏
      FactoryLoading: false,
      FactoryTableLoading: false,
      // 工厂查询参数对象
      FactoryParams: {
        // UserCode: '',
        customerName: '', //工厂名称
        ShortName: '', //工厂简称
        // Customtype: 'CUSTOMTYPE03'
      },
      chooseFactoryForm: {
        customerName: [{ required: false, trigger: 'change' }],
        ShortName: [{ required: false, trigger: 'blur' }],
      },
      chooseFactoryList: [], //选择的工厂产品数据
      chooseFactoryPaging: {
        list: [],
        data: [],
        limit: 100,
        total: null,
        page: 1,
      },
      // ？？选择工厂信息结束
      // 选择颜色开始
      chooseColorVisible: false,
      ColorLoading: false,
      ColorTableLoading: false,
      chooseColorForm: {
        ColorNO: '', //色号
        Color: '',
      },
      chooseColorFormRules: {
        ColorNO: [{ required: false, trigger: 'change' }],
        Color: [{ required: false, trigger: 'change' }],
      },
      getColordata: [], //获得数据源
      chooseColorList: [], //选择颜色的数据
      ColorRow: null, //每一行的数据唯一标识
      chooseColorPaging: {
        list: [],
        data: [],
        limit: 100,
        total: null,
        page: 1,
      },
      // ？？选择颜色信息结束
      // 选择花型开始
      chooseFlowerVisible: false,
      FlowerLoading: false,
      FlowerTableLoading: false,
      chooseFlowerForm: {
        FlowersCode: '',
        F_ChnName: '',
        Type: '',
      },
      chooseFlowerFormRules: {
        FlowersCode: [{ required: false, trigger: 'change' }],
        F_ChnName: [{ required: false, trigger: 'change' }],
        Type: [{ required: false, trigger: 'change' }],
      },
      getFlowerdata: [],
      chooseFlowerList: [],
      FlowerRow: null,
      chooseFlowerPaging: {
        list: [],
        data: [],
        limit: 100,
        total: null,
        page: 1,
      },
      // ？？选择花型信息结束
      // // 选择物流开始
      // chooseLogisticsVisible: false,
      // chooseLogisticsForm: {
      //   UserCode: '',
      //   Flag: '',
      //   Code: '',
      //   Name: '',
      //   TypeNo: 'ExpressType',
      // },
      // getLogisticsdata: [],
      // chooseLogisticsList: [],
      // LogisticsRow: null,
      // chooseLogisticsPaging: {
      //   list: [],
      //   data: [],
      //   limit: 100,
      //   total: null,
      //   page: 1,
      // },
      // Logisticsdata: [], // 物流下拉选择项
      // ？？选择物流信息结束

      // 选择物流渠道开始
      chooseChannelVisible: false,
      ChannelLoading: false,
      ChannelTableLoading: false,
      chooseChannelForm: {
        // UserCode: '',
        LineId: '',
        BeginDate: '',
        EndDate: '',
        LineName: '',
        LineLevel: '', //物流等级
        Inputer: '',
      },
      LogisticsRow: null,
      getChanneldata: [],
      chooseChannelList: [],
      // LogisticsRow: null,
      chooseChannelPaging: {
        list: [],
        data: [],
        limit: 100,
        total: null,
        page: 1,
      },
      logisticsList: [], // 物流下拉数据
      // Logisticsdata: [], // 物流下拉选择项
      columns1: [
        { type: 'checkbox', width: '60' },
        { type: 'seq', width: '50', title: '序号' },
        // { field: 'LineId', width: '260', title: '物流编码' },
        { width: '120', title: '物流渠道', field: 'LineName' },
        { width: '95', title: '普货', slots: { default: 'CommonGoods' } },
        { width: '95', title: '带电', slots: { default: 'Electrified' } },
        { width: '95', title: '特货', slots: { default: 'SpecialGoods' } },
        { width: '120', title: '物流等级', field: 'LineLevelName' },
        { align: 'left', title: '备注说明', field: 'Remark' },
        { width: '180', title: '更新时间', field: 'Inputdate' },
        // { width: '150', title: '制单日期', slots: { default: 'inputData' } },
        { width: '80', title: '制单人', field: 'Inputer' },
      ],
      // ？？选择物流信息结束

      // 选择图片开始
      choosePhotoVisible: false,
      choosePhotoForm: {
        FlowersCode: '',
        F_ChnName: '',
        Type: '',
      },
      limitNum: 5, // 上传图片时，同时允许上传的最大数
      fileList: [], // 图片文件列表
      getPhotodata: [],
      Imgurl: 'http://lqtex.oss-cn-hangzhou.aliyuncs.com/', //前端显示图片
      img: '',
      choosePhotoList: [],
      PhotoRow: null,
      // ？？选择图片信息结束

      // 选择产品材质弹出层
      chooseTextureDaialogVisible: false, //选择弹出层显示与隐藏
      TextureLoading: false,
      TextureTableLoading: false,
      // 选择产品材质的查询参数
      chooseTextureFormRuleForm: {
        UserCode: '',
        Flag: 'ProductMaterial',
        Code: '',
        Name: '',
        TypeNo: '',
      },
      // 查询产品校验规则
      chooseTextureFormRules: {
        Flag: [{ required: false, trigger: 'change' }],
        Name: [{ required: false, trigger: 'blur' }],
      },
      selectedTextureRow: null,
      chooseTextureList: [], // //产品材质表数据
      chooseTextureProduceList: [], //选择的数据
      // 分页
      chooseTexturePaging: {
        list: [],
        data: [],
        limit: 100,
        total: null,
        page: 1,
      },
      // ??选择产品材质结束

      // 选择面料加工弹出层
      chooseMachiningDaialogVisible: false, //选择弹出层显示与隐藏
      MachiningLoading: false,
      MachiningTableLoading: false,
      // 选择面料加工的查询参数
      chooseMachiningFormRuleForm: {
        UserCode: '',
        Flag: 'ProductCraft',
        Code: '',
        Name: '',
        TypeNo: '',
      },
      // 查询面料加工校验规则
      chooseMachiningFormRules: {
        Flag: [{ required: false, trigger: 'change' }],
        Name: [{ required: false, trigger: 'blur' }],
      },
      selectedMachiningRow: null,
      chooseMachiningList: [], // //产品材质表数据
      chooseMachiningProduceList: [], //选择的数据
      // 分页
      chooseMachiningPaging: {
        list: [],
        data: [],
        limit: 100,
        total: null,
        page: 1,
      },
      // ??选择面料加工结束

      //运费计算弹框开始
      ComputeFreightDaialogVisible: false,
      ComputerLoading: false,
      ComputeForm: {
        PlanNo: '',
        PlanTime: '', // 时间
        Shop: '',
        Country: '',
        Weight: '', //重量
        Volume: '', //体积
        LineId: '', //物流方式
        LineName: '', //物流名称
      },
      // 运费计算得到的数据
      IsData: [],
      // 运费计算显示的数据
      // IsSHow: '',
      DeliveryFee: '',
      OtherFee: '',
      RangeFee: '',
      Total: '',
      // 国家列表
      CountryList: [],
      // 运费计算表单校验规则
      ComputeFormRules: {
        PlanNo: [{ required: false, message: '请选择', trigger: 'change' }],
        PlanTime: [{ required: false, message: '请选择', trigger: 'change' }],
        Shop: [{ required: false, message: '请选择', trigger: 'change' }],
        Volume: [{ required: false, message: '请选择', trigger: 'change' }],
        Country: [{ required: true, message: '请选择国家', trigger: 'change' }],
        Weight: [{ required: true, message: '请选择重量', trigger: 'change' }],
        LineName: [{ required: true, message: '请选择', trigger: 'change' }],
      },
      // IsWho: '',// 判断是哪个点击
      // ??运费计算弹框结束

      //运费登记弹框开始
      FreightDaialogVisible: false,
      FreightForm: {},
      FreightFormRules: {},
      // ??运费登记弹框结束
      gridHeight: 565,
    }
  },
  methods: {
    cellclick(row, column) {
      console.log(row)
      if (row.columnIndex != 0) {
        this.$refs.mainTable.setAllCheckboxRow(false)
        this.$refs.mainTable.setCheckboxRow(row.row, true)
      }
    },
    statusClick(row) {
      console.log(row.生产状态, '666')
      let Code = row.生产状态.match(/QueryCode=(\S*)&/)[1]
      let keyCode = row.生产状态.match(/Key=(\S*)" target/)[1]
      this.queryCode = Code
      this.keyCode = keyCode
      this.dialogParam = {
        title: '关联产品库存',
        name: 'ShowDetails',
        type: '',
        width: '70%',
        isShowDialog: true,
      }
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
        var ID = data[0].订单号
        // console.log(data[0].ID);
        this.showReportDialog = true
        this.$nextTick(() => {
          this.$refs.ReportApproval.formInfo.ObjectCode = '0102'
          this.$refs.ReportApproval.formInfo.Key = ID
          this.$refs.ReportApproval.showDialog = true
        })
      }
    },
    //报批完成后
    ReportOkDialog() {
      this.MainTableQuery()
      this.checkoutData = []
      this.delLength = []
    },
    delFactory() {
      this.addFormParams.Factory = ''
      this.addFormParams.Name = ''
    },
    delInput() {
      ;(this.ComputeForm.LineName = ''), (this.ComputeForm.LineId = '')
    },
    searchEnter(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.MainTableQuery()
      }
    },
    // 主表查询
    MainTableQuery() {
      this.IsSearch = true
      this.loading = true
      this.checkoutData = []
      this.delLength = []
      if (this.queryPramsTable.BeginDate == null) {
        this.queryPramsTable.BeginDate = ''
      }
      if (this.queryPramsTable.EndDate == null) {
        this.queryPramsTable.EndDate = ''
      }
      this.$api.zeroOrder
        .zeroQuery({ model: this.queryPramsTable })
        .then((res) => {
          if (res.statusCode !== 200) return this.$message.error(res.message)
          if (this.queryPramsTable.IsDetail === '1') {
            this.isShowDetailed = true
          } else {
            this.isShowDetailed = false
          }
          this.AdjustmentSheet = res.data[0]
          this.pageList()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.IsSearch = false
          this.loading = false
        })
    },
    // 主表关闭
    mainTableClose() {
      this.checkoutData = this.$refs.mainTable.getCheckboxRecords()
      if (this.checkoutData.length < 1)
        return this.$message.error('请选择复选框')
      if (
        this.queryPramsTable.isclose === '1' ||
        this.checkoutData.关闭 == '是'
      )
        return this.$message.error('关闭状态不能进行关闭')
      if (this.checkoutData.length >= 1 && this.checkoutData[0].PlanNo !== '') {
        let strlist = ''
        for (var i = 0; i <= this.checkoutData.length - 1; i++) {
          if (this.checkoutData[i].PlanNo !== '') {
            strlist +=
              this.checkoutData[i].PlanNo +
              this.columnIcon +
              this.checkoutData[i].行号 +
              '◆'
          }
        }
        this.list = strlist
        this.$api.zeroOrder
          .getIsclose({ isclose: '1', strlist: this.list })
          .then((res) => {
            // console.log(res);
            if (res.statusCode !== 200) return
            this.$message.success('关闭成功')
            this.checkoutData = []
            this.delLength = []
            this.list = []
            this.MainTableQuery()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    // 主表取消关闭
    mainTableResetClose() {
      this.checkoutData = this.$refs.mainTable.getCheckboxRecords()
      if (this.checkoutData.length < 1)
        return this.$message.error('请选择复选框')
      // if (this.queryPramsTable.isclose !== '1'||this.checkoutData.关闭 =="是")
      //   return this.$message.error('只有关闭状态才能取消关闭')
      if (this.checkoutData.length >= 1 && this.checkoutData[0].PlanNo !== '') {
        let strlist = ''
        for (var i = 0; i <= this.checkoutData.length - 1; i++) {
          if (this.checkoutData[i].PlanNo !== '') {
            strlist +=
              this.checkoutData[i].PlanNo +
              this.columnIcon +
              this.checkoutData[i].行号 +
              '◆'
          }
        }
        this.list = strlist
        this.$api.zeroOrder
          .getIsclose({ isclose: '0', strlist: this.list })
          .then((res) => {
            // console.log(res);
            if (res.statusCode !== 200) return
            this.$message.success('取消关闭成功')
            this.delLength = []
            this.checkoutData = []
            this.list = []
            this.MainTableQuery()
          })
          .catch((err) => {
            console.log(err)
          })
        // .finally(() => {
        //   this.MainTableQuery()
        //   this.checkoutData = []
        //   this.list = []
        //   this.delLength = []
        // })
      }
    },
    // （主表）当每页数量改变
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
    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.paging.data = this.AdjustmentSheet
      this.paging.total = this.paging.data.length
      this.getList()
    },
    // 处理数据 （主表）
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.paging.data = this.paging.data.filter(
        (item, index) =>
          index < this.paging.page * this.paging.limit &&
          index >= this.paging.limit * (this.paging.page - 1)
      )
    },
    // 合计
    footerMethod({ columns }) {
      const data = this.AdjustmentSheet
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          switch (column.property) {
            case '总数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].总数量
              }
              return sums
          }
          switch (column.property) {
            case '已完成':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].已完成
              }
              return sums
          }
          switch (column.property) {
            case '下单数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].下单数量
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    changeIsDetail() {
      //复选框change事件
      this.MainTableQuery()
    },
    // 展开与隐藏
    IconShow() {
      this.iconShow = !this.iconShow
    },
    // 删除按钮事件
    delData() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.delLength.length === 0)
        return this.$message.error('选中表格中的复选框才可以删除')
      if (this.delLength.length > 1)
        return this.$message.error('每次只能删除一条数据')
      this.$confirm('确定删除? 整单删除! 单行删除请在修改页面进行', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      })
        .then(() => {
          this.$api.zeroOrder
            .del({ PlanNo: this.delLength[0].PlanNo })
            .then((res) => {
              // console.log(res)
              if (res.statusCode !== 200) return this.$message(res.message)
              this.$message({ type: 'success', message: '删除成功!' })
              this.delLength = []
              this.checkoutData = []
              this.MainTableQuery()
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
        this.checkoutData = this.$refs.mainTable.getCheckboxRecords()
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
        // const index = this.ShopList.findIndex((item) => {
        //   return item.Name === this.delLength[0]['站点']
        // })
        // this.delParams.Shop = this.ShopList[index].id
      } else {
        this.checkoutData = this.$refs.mainTable.getCheckboxRecords()
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
      }
    },
    onAdjustmentCheckboxAllChange(row) {
      if (row.checked) {
        this.checkoutData = this.$refs.mainTable.getCheckboxRecords()
        this.delLength = this.delLength.concat(row.records)
        // const index = this.ShopList.findIndex((item) => {
        //   return item.Name === this.delLength[0]['站点']
        // })
        // this.delParams.Shop = this.ShopList[index].id
      } else {
        this.delLength = []
        this.checkoutData = []
      }
    },
    //新增电商零单产品
    addProduct() {
      this.state = 'add'
      this.addFormParams.OrderRemark = ''
      this.getNowDateAdd()
      this.addAialogVisible = true
      this.addProduceList = []
      if (this.addProduceList.length) {
        return
      } else {
        let nullObj = {
          销售单号: '',
          序号: '',
          类型编码: '',
          产品类型: '',
          挂式编码: '',
          挂式: '',
          层数: '',
          材质编码: '',
          面料材质: '',
          加工编码: '',
          面料加工: '',
          宽度: '',
          高度: '',
          单位: 'JL006',
          下单数量: '',
          颜色编码: '',
          颜色: '',
          设计编号: '',
          花型: '',
          产品编号: '1-X',
          单片价格: '',
          币种: 'USD',
          下单备注: '',
          物流方式: '',
          快递单号: '',
          客户: '',
          库存: '',
          优先级: '1',
          图片管理: '',
        }
        this.addProduceList.push(nullObj)
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
                销售单号: '',
                序号: '',
                类型编码: '',
                产品类型: '',
                挂式编码: '',
                挂式: '',
                层数: '',
                材质编码: '',
                面料材质: '',
                加工编码: '',
                面料加工: '',
                宽度: '',
                高度: '',
                单位: 'JL006',
                下单数量: '',
                颜色编码: '',
                颜色: '',
                设计编号: '',
                花型: '',
                产品编号: '1-X',
                单片价格: '',
                币种: 'USD',
                下单备注: '',
                物流方式: '',
                快递单号: '',
                客户: '',
                库存: '',
                优先级: '1',
                图片管理: '',
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
    // 编辑勾选项
    editProduct() {
      this.addProduceList = []
      this.state = 'edit'
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.delLength.length < 1)
        return this.$message.error('请勾选复选框的数据再做出编辑操作')
      if (this.delLength.length > 1) {
        this.$message({
          message: '每次只能编辑一条',
          type: 'error',
        })
      } else {
        this.isEdit = true
        this.$api.zeroOrder
          .geteditQueryForm({ PlanNo: this.delLength[0].PlanNo })
          .then((res) => {
            // console.log(res)
            if (res.statusCode !== 200) return this.$message(res.message)
            this.addFormParams.OrderDate = res.data[0].ProduceDate
            this.addFormParams.OrderRemark = res.data[0].P_Request
            this.addFormParams.PlanNo = res.data[0].PlanNo
            this.addFormParams.Factory = res.data[0].Factory
            this.addFormParams.Name = res.data[0].FactoryName
            this.addFormParams.Shopid = res.data[0].Shop
          })
          .catch((err) => {
            console.log(err)
          })
        this.$api.zeroOrder
          .geteditQuery({
            PlanNo: this.delLength[0].PlanNo,
          })
          .then((res) => {
            console.log(res)
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              res.data.forEach((item) => {
                item.币种 = item.币种.trim()
                item.优先级 = item.优先级.trim()
                item.单位 = item.单位.trim()
              })
              this.addProduceList = res.data
            }
          })
          .catch((err) => console.log(err))
        this.addAialogVisible = true
      }
    },
    // 运费登记
    ToFreight() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.delLength.length < 1)
        return this.$message.error('请勾选复选框的数据再做出运费登记操作')
      if (this.delLength.length > 1) {
        this.$message({
          message: '每次只能登记一条',
          type: 'error',
        })
      } else {
        this.FreightDaialogVisible = true
      }
    },
    // 运费计算
    ToComputeFreight() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.delLength.length < 1)
        return this.$message.error('请勾选复选框的数据再做出运费计算操作')
      if (this.delLength.length > 1) {
        this.$message({
          message: '每次只能计算一条',
          type: 'error',
        })
      } else {
        // console.log(this.delLength);
        this.ComputeForm.PlanNo = this.delLength[0].订单号
        // this.$set(this.ComputeForm, 'PlanTime', this.delLength[0].InputDate)
        this.ComputeForm.PlanTime = this.delLength[0].制单日期
        this.ComputeFreightDaialogVisible = true
      }
    },
    computeResults() {
      this.IsData = []
      // ;(this.DeliveryFee = ''),
      //   (this.OtherFee = ''),
      //   (this.RangeFee = ''),
      //   (this.Total = ''),
      this.$refs.ComputeForm.validate((valid) => {
        if (!valid) return this.$message.error('请输入必填项再进行计算操作')
        this.ComputerLoading = true
        this.$api.zeroOrder
          .ComputerFreight({ model: this.ComputeForm })
          .then((res) => {
            // console.log(res)
            if (res.statusCode !== 200) return this.$message(res.message)
            this.IsData = res.data
            // console.log(this.IsData);
            if (this.IsData.length > 0) {
              this.DeliveryFee = this.IsData[0]['DeliveryFee']
              this.RangeFee = this.IsData[0]['RangeFee']
              this.OtherFee = this.IsData[0]['OtherFee']
              this.Total = this.IsData[0]['Total']
            }
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.ComputerLoading = false
          })
      })
    },
    // 查看
    seeChecked() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.delLength.length < 1)
        return this.$message.error('请勾选复选框的数据再做出查看操作')
      if (this.delLength.length > 1) {
        this.$message({
          message: '每次只能查看一条',
          type: 'error',
        })
      } else {
        this.isEdit = false
        this.$api.zeroOrder
          .geteditQueryForm({ PlanNo: this.delLength[0].PlanNo })
          .then((res) => {
            // console.log(res)
            if (res.statusCode !== 200) return this.$message(res.message)
            this.addFormParams.OrderDate = res.data[0].ProduceDate
            this.addFormParams.OrderRemark = res.data[0].P_Request
            this.addFormParams.PlanNo = res.data[0].PlanNo
            this.addFormParams.Factory = res.data[0].Factory
            this.addFormParams.Name = res.data[0].FactoryName
            this.addFormParams.Shopid = res.data[0].Shop
          })
          .catch((err) => {
            console.log(err)
          })
        this.$api.zeroOrder
          .geteditQuery({
            PlanNo: this.delLength[0].PlanNo,
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
            }
          })
          .catch((err) => console.log(err))
        this.addAialogVisible = true
      }
    },
    // 主表双击事件
    dbMainClick(row) {
      this.isEdit = false
      this.$api.zeroOrder
        .geteditQueryForm({ PlanNo: row.row.PlanNo })
        .then((res) => {
          // console.log(res)
          if (res.statusCode !== 200) return this.$message(res.message)
          this.addFormParams.OrderDate = res.data[0].ProduceDate
          this.addFormParams.OrderRemark = res.data[0].P_Request
          this.addFormParams.PlanNo = res.data[0].PlanNo
          this.addFormParams.Factory = res.data[0].Factory
          this.addFormParams.Name = res.data[0].FactoryName
          this.addFormParams.Shopid = res.data[0].Shop
        })
        .catch((err) => {
          console.log(err)
        })
      this.$api.zeroOrder
        .geteditQuery({
          PlanNo: row.row.PlanNo,
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
          }
        })
        .catch((err) => console.log(err))
      this.addAialogVisible = true
    },
    // 第一层弹出层取消
    handleClose() {
      this.isEdit = true
      this.$refs.addForm.resetFields()
      // this.$refs.addTable.revertData() //清空表格状态
      // this.addProduceList = [{ 产品号: '' }]
      this.addAialogVisible = false
    },
    // 新增取消按钮
    cancel() {
      this.addAialogVisible = false
      this.$refs.addForm.resetFields()
      // this.$refs.addTable.revertData() //清空表格状态
    },
    // 保存添加电商零单下单事件
    async saveProduct() {
      // const errMap = await this.$refs.addTable //vxe-table表格数据校验
      //   .validate(true)
      //   .catch((errMap) => errMap)
      // if (errMap) {
      //   return this.$message.error('请检查表格中必填项')
      // } else {
      this.$refs.addForm.validate((valid) => {
        if (!valid) return //文本域校验，必填项
        this.isSave = true
        this.addFormParams.strDetail = ''
        if (this.state === 'add') {
          // if (
          //   this.addProduceList.length >= 1 &&
          //   this.addProduceList[0].产品类型 !== ''
          // ) {
          var strDetail = ''
          for (var i = 0; i <= this.addProduceList.length - 1; i++) {
            // if (this.addProduceList[i].产品类型 !== '') {
            strDetail +=
              this.addFormParams.strDetail +
              '◆' +
              this.columnIcon +
              this.addProduceList[i].销售单号 +
              this.columnIcon +
              this.addProduceList[i].序号 +
              this.columnIcon +
              this.addProduceList[i].类型编码.trim() +
              this.columnIcon +
              this.addProduceList[i].产品类型 +
              this.columnIcon +
              this.addProduceList[i].挂式编码 +
              this.columnIcon +
              this.addProduceList[i].挂式 +
              this.columnIcon +
              this.addProduceList[i].层数 +
              this.columnIcon +
              this.addProduceList[i].材质编码 +
              this.columnIcon +
              this.addProduceList[i].面料材质 +
              this.columnIcon +
              this.addProduceList[i].加工编码 +
              this.columnIcon +
              this.addProduceList[i].面料加工 +
              this.columnIcon +
              1 +
              this.columnIcon +
              this.addProduceList[i].宽度 +
              this.columnIcon +
              this.addProduceList[i].高度 +
              this.columnIcon +
              this.addProduceList[i].单位 +
              this.columnIcon +
              this.addProduceList[i].下单数量 +
              this.columnIcon +
              this.addProduceList[i].颜色编码 +
              this.columnIcon +
              this.addProduceList[i].颜色 +
              this.columnIcon +
              this.addProduceList[i].设计编号 +
              this.columnIcon +
              this.addProduceList[i].花型 +
              this.columnIcon +
              this.addProduceList[i].产品编号.trim() +
              this.columnIcon +
              this.addProduceList[i].单片价格 +
              this.columnIcon +
              this.addProduceList[i].币种 +
              this.columnIcon +
              this.addProduceList[i].下单备注 +
              this.columnIcon +
              this.addProduceList[i].物流方式 +
              this.columnIcon +
              this.addProduceList[i].快递单号 +
              this.columnIcon +
              this.addProduceList[i].客户 +
              this.columnIcon +
              this.addProduceList[i].库存 +
              this.columnIcon +
              this.addProduceList[i].优先级 +
              this.columnIcon +
              this.addProduceList[i].图片管理
            // }
            // }
          }
          this.addFormParams.strDetail =
            strDetail.slice(1, strDetail.length) + '◆'
          this.$api.zeroOrder
            .getAdd({
              model: {
                ...this.addFormParams,
                strMessage: '',
                isAdd: '1',
                PlanNoOut: '',
              },
            })
            .then((res) => {
              console.log(res)
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.$message({
                  message: '新增成功',
                  type: 'success',
                })
                // this.$refs.addTable.revertData() //清空表格状态
                this.$refs.addForm.resetFields()
                this.delLength = []
                this.checkoutData = []
                this.addFormParams.strDetail = ''
                this.addAialogVisible = false //关闭弹出层
                this.MainTableQuery()
              }
            })
            .catch((err) => console.log(err))
            .finally(() => {
              this.isSave = false
            })
        } else {
          this.isSave = true
          var strDetail = ''
          for (var i = 0; i <= this.addProduceList.length - 1; i++) {
            // if (this.addProduceList[i].行号 !== '') {
            strDetail +=
              this.addFormParams.strDetail +
              '◆' +
              this.addProduceList[i].行号 +
              this.columnIcon +
              this.addProduceList[i].销售单号 +
              this.columnIcon +
              this.addProduceList[i].序号 +
              this.columnIcon +
              this.addProduceList[i].类型编码.trim() +
              this.columnIcon +
              this.addProduceList[i].产品类型 +
              this.columnIcon +
              this.addProduceList[i].挂式编码 +
              this.columnIcon +
              this.addProduceList[i].挂式 +
              this.columnIcon +
              this.addProduceList[i].层数 +
              this.columnIcon +
              this.addProduceList[i].材质编码 +
              this.columnIcon +
              this.addProduceList[i].面料材质 +
              this.columnIcon +
              this.addProduceList[i].加工编码 +
              this.columnIcon +
              this.addProduceList[i].面料加工 +
              this.columnIcon +
              1 +
              this.columnIcon +
              this.addProduceList[i].宽度 +
              this.columnIcon +
              this.addProduceList[i].高度 +
              this.columnIcon +
              this.addProduceList[i].单位 +
              this.columnIcon +
              this.addProduceList[i].下单数量 +
              this.columnIcon +
              this.addProduceList[i].颜色编码 +
              this.columnIcon +
              this.addProduceList[i].颜色 +
              this.columnIcon +
              this.addProduceList[i].设计编号 +
              this.columnIcon +
              this.addProduceList[i].花型 +
              this.columnIcon +
              this.addProduceList[i].产品编号.trim() +
              this.columnIcon +
              this.addProduceList[i].单片价格 +
              this.columnIcon +
              this.addProduceList[i].币种 +
              this.columnIcon +
              this.addProduceList[i].下单备注 +
              this.columnIcon +
              this.addProduceList[i].物流方式 +
              this.columnIcon +
              this.addProduceList[i].快递单号 +
              this.columnIcon +
              this.addProduceList[i].客户 +
              this.columnIcon +
              this.addProduceList[i].库存 +
              this.columnIcon +
              this.addProduceList[i].优先级 +
              this.columnIcon +
              this.addProduceList[i].图片管理
            // }
            // console.log(strDetail);
            strDetail = strDetail.replace('undefined', '')
          }
          this.addFormParams.strDetail =
            strDetail.slice(1, strDetail.length) + '◆'
          this.addFormParams.strDetail
          this.$api.zeroOrder
            .getAdd({
              model: {
                ...this.addFormParams,
                strMessage: '',
                isAdd: '0',
                PlanNoOut: '',
              },
            })
            .then((res) => {
              console.log(res)
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                })
                this.delLength = []
                this.$refs.addForm.resetFields()
                // this.$refs.addTable.revertData()
                this.addAialogVisible = false //关闭弹出层
                this.MainTableQuery()
              }
            })
            .catch((err) => console.log(err))
            .finally(() => {
              this.isSave = false
            })
        }
      })
      // }
    },
    // 插槽中的图标新增
    iconAddProduct() {
      let nullObj = {
        销售单号: '',
        序号: '',
        类型编码: '',
        产品类型: '',
        挂式编码: '',
        挂式: '',
        层数: '',
        材质编码: '',
        面料材质: '',
        加工编码: '',
        面料加工: '',
        宽度: '',
        高度: '',
        单位: 'JL006',
        下单数量: '',
        颜色编码: '',
        颜色: '',
        设计编号: '',
        花型: '',
        产品编号: '1-X',
        单片价格: '',
        币种: 'USD',
        下单备注: '',
        物流方式: '',
        快递单号: '',
        客户: '',
        库存: '',
        优先级: '1',
        图片管理: '',
      }
      this.addProduceList.unshift(nullObj)
    },
    // 插槽中的图标删除
    iconDelProduct(row) {
      let Index = this.addProduceList.findIndex((item) => {
        return item.类型编码 == row.类型编码
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
              销售单号: '',
              序号: '',
              类型编码: '',
              产品类型: '',
              挂式编码: '',
              挂式: '',
              层数: '',
              材质编码: '',
              面料材质: '',
              加工编码: '',
              面料加工: '',
              宽度: '',
              高度: '',
              单位: 'JL006',
              下单数量: '',
              颜色编码: '',
              颜色: '',
              设计编号: '',
              花型: '',
              产品编号: '',
              单片价格: '',
              币种: 'USD',
              下单备注: '',
              物流方式: '',
              快递单号: '',
              客户: '',
              库存: '',
              优先级: '1',
              图片管理: '',
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
    checkMethodDisable(row) {
      return row.$rowIndex !== this.addProduceList.length - 1
    },
    // 选择工厂图标
    iconChooseFactory() {
      // this.IsWho = IsWho
      this.chooseFactoryVisible = true
      ;(this.FactoryLoading = true),
        (this.FactoryTableLoading = true),
        this.$api.zeroOrder
          .getFactory(this.FactoryParams)
          .then((res) => {
            // console.log(res)
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.chooseFactoryData = res.data
              this.chooseFactoryPageList()
            }
          })
          .catch((err) => console.log(err))
          .finally(() => {
            this.FactoryLoading = false
            this.FactoryTableLoading = false
          })
    },
    //选择工厂表
    chooseFactoryPageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作(选择产品表)
      this.chooseFactoryPaging.data = this.chooseFactoryData
      this.chooseFactoryPaging.total = this.chooseFactoryPaging.data.length
      this.chooseFactoryGetList()
    },
    // 处理数据(选择工厂表)
    chooseFactoryGetList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.chooseFactoryPaging.data = this.chooseFactoryPaging.data.filter(
        (item, index) =>
          index <
            this.chooseFactoryPaging.page * this.chooseFactoryPaging.limit &&
          index >=
            this.chooseFactoryPaging.limit * (this.chooseFactoryPaging.page - 1)
      )
    },
    // 当每页数量改变(选择工厂表)
    chooseFactoryHandleSizeChange(val) {
      this.chooseFactoryPaging.limit = val
      this.choosePageList()
    },
    // 当当前页改变(选择工厂表)
    chooseFactoryHandleCurrentChange(val) {
      this.chooseFactoryPaging.page = val
      this.choosePageList()
    },
    // 确定按钮工厂选择的数据
    chooseFactoryProduct() {
      this.chooseFactoryList =
        this.$refs.chooseFactoryTable.getCheckboxRecords()
      if (this.chooseFactoryList.length > 1)
        return this.$message('每次只能选择一条工厂名称数据')
      if (this.chooseFactoryList.length < 1) {
        this.$message({
          type: 'error',
          message: '请通过复选框选择工厂名称',
        })
      } else {
        this.addFormParams.Name = this.chooseFactoryList[0]['名称']
        this.addFormParams.Factory = this.chooseFactoryList[0]['ID']
        this.$refs.chooseFactoryForm.resetFields()
        this.$refs.chooseFactoryTable.revertData()
        this.chooseFactoryVisible = false
      }
    },
    // 选择颜色的信息
    iconColorChoose(row) {
      this.chooseColorVisible = true
      this.ColorRow = row
      this.getColorList()
    },
    // 获取颜色数据
    getColorList() {
      this.ColorLoading = true
      this.ColorTableLoading = true
      this.$api.zeroOrder
        .getColor(this.chooseColorForm)
        .then((res) => {
          console.log(res)
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.getColordata = res.data
            this.chooseColorPageList()
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.ColorLoading = false
          this.ColorTableLoading = false
        })
    },
    // 选择颜色表
    chooseColorPageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作(选择产品表)
      this.chooseColorPaging.data = this.getColordata //获得产品暂时表格数据
      //用来判断是不是新产品的参数
      this.chooseColorPaging.total = this.chooseColorPaging.data.length
      this.chooseColorGetList()
    },
    // 处理数据(选择颜色表)
    chooseColorGetList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.chooseColorPaging.data = this.chooseColorPaging.data.filter(
        (item, index) =>
          index < this.chooseColorPaging.page * this.chooseColorPaging.limit &&
          index >=
            this.chooseColorPaging.limit * (this.chooseColorPaging.page - 1)
      )
    },
    // 当每页数量改变(选择颜色表)
    chooseColorHandleSizeChange(val) {
      this.chooseColorPaging.limit = val
      this.chooseColorPageList()
    },
    // 当当前页改变(选择颜色表)
    chooseColorHandleCurrentChange(val) {
      this.chooseColorPaging.page = val
      this.chooseColorPageList()
    },
    // 确定按钮颜色选择的数据
    ChooseColorProduct() {
      this.chooseColorList = this.$refs.ColorTable.getCheckboxRecords()
      if (this.chooseColorList.length > 1)
        return this.$message('每次只能选择一条数据')
      if (this.chooseColorList.length < 1) {
        this.$message({
          type: 'error',
          message: '请通过复选框选择颜色',
        })
      } else {
        this.ColorRow['颜色编码'] = this.chooseColorList[0]['色号']
        this.ColorRow['颜色'] = this.chooseColorList[0]['颜色']
        this.ColorRow['产品编号'] = `${
          this.ColorRow.类型编码 != '' ? this.ColorRow.类型编码.trim() : ''
        }${this.ColorRow.挂式编码 != '' ? this.ColorRow.挂式编码.trim() : ''}${
          this.ColorRow.材质编码 != '' ? this.ColorRow.材质编码.trim() : ''
        }${
          this.ColorRow.加工编码 != '' ? this.ColorRow.加工编码.trim() : ''
        }1-X${this.ColorRow.颜色编码}`
        this.chooseColorVisible = false
        this.$refs.ColorTable.revertData()
        this.$refs.chooseColorForm.resetFields()
      }
    },
    // // 选择物流的信息
    // iconLogisticsChoose(row) {
    //   this.chooseLogisticsVisible = true
    //   this.LogisticsRow = row
    //   this.getLogisticsList()
    // },
    // // 获取物流数据
    // getLogisticsList() {
    //   this.$api.zeroOrder
    //     .getLogistics({ model: this.chooseLogisticsForm })
    //     .then((res) => {
    //       console.log(res)
    //       if (res.statusCode !== 200) {
    //         this.$message({
    //           message: res.message,
    //           type: 'error',
    //         })
    //       } else {
    //         this.getLogisticsdata = res.data
    //         this.Logisticsdata = res.data
    //         this.chooseLogisticsPageList()
    //       }
    //     })
    //     .catch((err) => console.log(err))
    // },
    // // 选择物流表
    // chooseLogisticsPageList() {
    //   // 发请求拿到数据并暂存全部数据,方便之后操作(选择产品表)
    //   this.chooseLogisticsPaging.data = this.getLogisticsdata //获得产品暂时表格数据
    //   //用来判断是不是新产品的参数
    //   this.chooseLogisticsPaging.total = this.chooseLogisticsPaging.data.length
    //   this.chooseLogisticsGetList()
    // },
    // // 处理数据(选择物流表)
    // chooseLogisticsGetList() {
    //   // es6过滤得到满足搜索条件的展示数据list
    //   this.chooseLogisticsPaging.data = this.chooseLogisticsPaging.data.filter(
    //     (item, index) =>
    //       index <
    //         this.chooseLogisticsPaging.page *
    //           this.chooseLogisticsPaging.limit &&
    //       index >=
    //         this.chooseLogisticsPaging.limit *
    //           (this.chooseLogisticsPaging.page - 1)
    //   )
    // },
    // // 当每页数量改变(选择物流表)
    // chooseLogisticsHandleSizeChange(val) {
    //   this.chooseLogisticsPaging.limit = val
    //   this.chooseLogisticsPageList()
    // },
    // // 当当前页改变(选择物流表)
    // chooseLogisticsHandleCurrentChange(val) {
    //   this.chooseLogisticsPaging.page = val
    //   this.chooseLogisticsPageList()
    // },
    // // 确定按钮选择物流表选择的数据
    // ChooseLogisticsProduct() {
    //   this.chooseLogisticsList = this.$refs.LogisticsTable.getCheckboxRecords()
    //   if (this.chooseLogisticsList.length > 1)
    //     return this.$message('每次只能选择一条数据')
    //   if (this.chooseLogisticsList.length < 1) {
    //     this.$message({
    //       type: 'error',
    //       message: '请通过复选框选择颜色',
    //     })
    //   } else {
    //     this.LogisticsRow['物流方式'] = this.chooseLogisticsList[0]['物流方式']
    //     // this.ComputeForm.LineId = this.chooseLogisticsList[0]['物流方式']
    //     // this.ColorRow['颜色'] = this.chooseColorList[0]['颜色']
    //     this.chooseLogisticsVisible = false
    //     this.$refs.LogisticsTable.revertData()
    //     this.$refs.chooseLogisticsForm.resetFields()
    //   }
    // },

    // 选择物流渠道的信息
    ChannelChoose(row) {
      this.chooseChannelList = []
      this.chooseChannelVisible = true
      this.LogisticsRow = row
      this.sign = 'table'
      this.MainTableSearch()
    },
    ChannelChoose1(sign) {
      this.chooseChannelList = []
      this.chooseChannelVisible = true
      this.sign = sign
      this.MainTableSearch()
    },
    MainTableSearch() {
      this.ChannelLoading = true
      this.ChannelTableLoading = true
      this.$api.logistics
        .QueryLogistics({ model: this.chooseChannelForm })
        .then((res) => {
          console.log(res)
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.getChanneldata = res.data
            this.paging.page = 1
            this.chooseChannelPageList()
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.ChannelLoading = false
          this.ChannelTableLoading = false
        })
    },
    // 选择物流渠道表
    chooseChannelPageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作(选择产品表)
      this.chooseChannelPaging.data = this.getChanneldata //获得产品暂时表格数据
      //用来判断是不是新产品的参数
      this.chooseChannelPaging.total = this.chooseChannelPaging.data.length
      this.chooseChannelGetList()
    },

    // 处理数据(选择物流表)
    chooseChannelGetList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.chooseChannelPaging.data = this.chooseChannelPaging.data.filter(
        (item, index) =>
          index <
            this.chooseChannelPaging.page * this.chooseChannelPaging.limit &&
          index >=
            this.chooseChannelPaging.limit * (this.chooseChannelPaging.page - 1)
      )
    },
    // 当每页数量改变(选择物流表)
    chooseChannelHandleSizeChange(val) {
      this.chooseChannelPaging.limit = val
      this.chooseChannelPageList()
    },
    // 当当前页改变(选择物流表)
    chooseChannelHandleCurrentChange(val) {
      this.chooseChannelPaging.page = val
      this.chooseChannelPageList()
    },
    // 确定按钮选择物流表选择的数据
    ChooseChannelProduct() {
      this.chooseChannelList = this.$refs.ChannelRef.getCheckboxRecords()
      if (this.chooseChannelList.length > 1)
        return this.$message('每次只能选择一条数据')
      if (this.chooseChannelList.length < 1) {
        this.$message({
          type: 'error',
          message: '请通过复选框选择物流',
        })
      } else {
        // console.log(this.chooseChannelList);
        // this.LogisticsRow['物流方式'] = this.chooseChannelList[0]['LineId']
        if (this.sign == 'add') {
          this.ComputeForm.LineId = this.chooseChannelList[0]['LineId']
          this.ComputeForm.LineName = this.chooseChannelList[0]['LineName']
        }
        this.LogisticsRow['物流方式'] = this.chooseChannelList[0]['LineName']
        this.$refs.ChannelRef.revertData()
        this.$refs.chooseChannelForm.resetFields()
        this.chooseChannelList = []
        this.chooseChannelVisible = false
      }
    },
    // 选择物流渠道结束

    // 选择花型的信息
    iconFlowerChoose(row) {
      this.chooseFlowerVisible = true
      this.FlowerRow = row
      this.getFlowerList()
    },
    // 获取花型数据
    getFlowerList() {
      this.FlowerTableLoading = true
      this.FlowerLoading = true
      this.$api.business
        .DesignCode(this.chooseFlowerForm)
        .then((res) => {
          console.log(res)
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.getFlowerdata = res.data
            this.chooseFlowerPageList()
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.FlowerLoading = false
          this.FlowerTableLoading = false
        })
    },
    // 选择花型表
    chooseFlowerPageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作(选择产品表)
      this.chooseFlowerPaging.data = this.getFlowerdata //获得产品暂时表格数据
      //用来判断是不是新产品的参数
      this.chooseFlowerPaging.total = this.chooseFlowerPaging.data.length
      this.chooseFlowerGetList()
    },
    // 处理数据(选择花型表)
    chooseFlowerGetList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.chooseFlowerPaging.data = this.chooseFlowerPaging.data.filter(
        (item, index) =>
          index <
            this.chooseFlowerPaging.page * this.chooseFlowerPaging.limit &&
          index >=
            this.chooseFlowerPaging.limit * (this.chooseFlowerPaging.page - 1)
      )
    },
    // 当每页数量改变(选择花型表)
    chooseFlowerHandleSizeChange(val) {
      this.chooseFlowerPaging.limit = val
      this.chooseFlowerPageList()
    },
    // 当当前页改变(选择花型表)
    chooseFlowerHandleCurrentChange(val) {
      this.chooseFlowerPaging.page = val
      this.chooseFlowerPageList()
    },
    // 确定按钮花型选择的数据
    ChooseFlowerProduct() {
      this.chooseFlowerList = this.$refs.FlowerTable.getCheckboxRecords()
      if (this.chooseFlowerList.length > 1)
        return this.$message('每次只能选择一条数据')
      if (this.chooseFlowerList.length < 1) {
        this.$message({
          type: 'error',
          message: '请通过复选框选择设计编号',
        })
      } else {
        this.FlowerRow['设计编号'] = this.chooseFlowerList[0]['设计编号']
        this.FlowerRow['花型'] = this.chooseFlowerList[0]['中文花型名']
        this.chooseFlowerVisible = false
        this.$refs.FlowerTable.revertData()
        this.$refs.chooseFlowerForm.resetFields()
      }
    },
    // // 选择图片的信息
    iconPhotoChoose(row) {
      this.choosePhotoVisible = true
      this.PhotoRow = row
    },
    exceedFile(files, fileList) {
      this.$message.warning(`只能选择 ${this.limitNum} 个文件`)
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log(file.raw)
      this.fileList.push(file.raw)
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      let size = file.size / 1024 / 1024
      if (extension !== 'jpg' || extension !== 'png') {
        this.$message.warning('只能上传后缀是.jpg或.png的文件')
      }
      if (size > 10) {
        this.$message.warning('文件大小不得超过10M')
      }
    },
    //点击移除此文件的事件
    removeFile() {
      this.fileList = [] //清空数据
    },
    UploadUrl: function () {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return ''
    },
    uploadFile() {
      this.$refs.addForm.validate((valid) => {
        if (!valid) return
        if (this.fileList.length === 0) {
          this.$message.warning('请上传图片')
        } else {
          let form = new FormData()
          form.append('file', this.fileList[0])
          form.append('TypeValue', 4)
          this.$axios({
            method: 'post',
            url: '/api/Public/GetPostFiles',
            headers: {
              'Content-type': 'multipart/form-data;',
            },
            data: form,
          })
            .then(
              (res) => {
                if (res.data.statusCode !== 200)
                  return this.$message.error(res.data.message)
                this.$message.success('上传图片成功')
                // console.log(res.data.data[0]['Url']);
                this.img = res.data.data[0]['Url']
                // this.isLoadingBtn1 = false
                this.fileList = []
              },
              (err) => {
                console.log(err)
                this.fileList = []
              }
            )
            .finally(() => {})
        }
      })
    },
    // 确定按钮图片选择的数据
    ChoosePhotoProduct() {
      if (this.img === '')
        return this.$message.error('请选择上传图片成功后再确定')
      this.PhotoRow['图片管理'] = this.img
      this.choosePhotoVisible = false
    },
    //
    // 选择产品类型的信息
    iconChooseProduct(row) {
      this.chooseDaialogVisible = true
      this.selectedRow = row
      this.getProtect()
    },
    // 类型编码输入框事件
    ageFocusEvent({ column, row }) {
      this.promptInfo = ''
      if (row.类型编码 != '') {
        const index = this.chooseProduceList.findIndex((item) => {
          return row.类型编码 == item.编码.trim()
        })
        if (index !== -1) {
          row.产品类型 = this.chooseProduceList[index].名称
        } else {
          this.promptInfo = '获取数据：类型编码数据为空'
          row.产品类型 = ''
        }
      } else {
        row.产品类型 = ''
      }
    },
    //HangingFocusEvent 挂式输入框事件
    HangingFocusEvent({ row }) {
      this.HangingInfo = ''
      if (row.挂式编码 != '' && row.类型编码 != '') {
        const index = this.initializationList.findIndex((item) => {
          return (
            row.挂式编码.trim() == item.编码.trim() &&
            item.产品类型编号.trim() == row.类型编码.trim()
          )
        })
        // console.log(index)
        if (index !== -1) {
          row.挂式 = this.initializationList[index].名称
        } else {
          this.HangingInfo = '获取数据：挂式编码数据为空'
          row.挂式 = ''
        }
      } else {
        row.挂式编码 = ''
      }
    },
    // 材质编码输入框事件
    TextureFocusEvent({ row }) {
      this.TexturePromptInfo = ''
      if (row.材质编码 != '') {
        const index = this.chooseTextureList.findIndex((item) => {
          return row.材质编码 == item.编码.trim()
        })
        if (index !== -1) {
          row.面料材质 = this.chooseTextureList[index].名称
        } else {
          this.TexturePromptInfo = '获取数据：材质编码数据为空'
          row.面料材质 = ''
        }
      } else {
        row.材质编码 = ''
      }
    },
    // 加工编码输入框事件
    MachingFocusEvent({ row }) {
      this.MachingPromptInfo = ''
      if (row.加工编码 != '') {
        const index = this.chooseMachiningList.findIndex((item) => {
          return row.加工编码 == item.编码.trim()
        })
        console.log(index)
        if (index !== -1) {
          row.面料加工 = this.chooseMachiningList[index].名称
        } else {
          this.MachingPromptInfo = '获取数据：加工编码数据为空'
          row.面料加工 = ''
        }
      } else {
        row.加工编码 = ''
      }
    },
    // 设计编号花型输入框事件
    FlowerFocusEvent({ row }) {
      this.FlowerPromptInfo = ''
      if (row.设计编号 != '') {
        const index = this.getFlowerdata.findIndex((item) => {
          return row.设计编号 == item.设计编号.trim()
        })
        // console.log(index);
        if (index !== -1) {
          row.花型 = this.getFlowerdata[index].中文花型名
        } else {
          this.FlowerPromptInfo = '获取数据：设计编号数据为空'
          row.花型 = ''
        }
      } else {
        row.设计编号 = ''
        row.花型 = ''
      }
    },
    // 颜色输入框事件
    ColorFocusEvent({ row }) {
      this.ColorPromptInfo = ''
      if (row.颜色编码 != '') {
        const index = this.getColordata.findIndex((item) => {
          return row.颜色编码 == item.色号.trim()
        })
        // console.log(index);
        if (index !== -1) {
          row.颜色 = this.getColordata[index].颜色
        } else {
          this.ColorPromptInfo = '获取数据：颜色编码为空'
          row.花型 = ''
        }
      } else {
        row.颜色 = ''
      }
    },
    // 刷新编号
    RefreshNumber() {
      this.addProduceList.forEach((item) => {
        item['产品编号'] = `${item.类型编码 != '' ? item.类型编码.trim() : ''}${
          item.挂式编码 != '' ? item.挂式编码.trim() : ''
        }${item.材质编码 != '' ? item.材质编码.trim() : ''}${
          item.加工编码 != '' ? item.加工编码.trim() : ''
        }1-X${item.颜色编码 != '' ? item.颜色编码.trim() : ''}`
      })
    },
    //获取产品类型信息回车事件
    searchFocusEnter(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.getProtect()
      }
    },
    // 获取产品类型信息
    getProtect() {
      this.projuctLoading = true
      this.projuctTableLoading = true
      this.chooseList = []
      this.chooseProduceList = []
      this.choosePaging.data = []
      this.$api.zeroOrder
        .productType({ model: this.chooseFormRuleForm })
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
        .finally(() => {
          this.projuctLoading = false
          this.projuctTableLoading = false
        })
    },

    // 选择产品表
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
    // 确定按钮产品类型选择的数据
    chooseProduct() {
      this.chooseList = this.$refs.chooseTable.getCheckboxRecords()
      if (this.chooseList.length > 1)
        return this.$message('每次只能选择一条数据')
      if (this.chooseList.length < 1) {
        this.$message({
          type: 'error',
          message: '请通过复选框选择分类编码',
        })
      } else {
        this.selectedRow['产品类型'] = this.chooseList[0]['名称']
        this.selectedRow['类型编码'] = this.chooseList[0]['编码']
        this.selectedRow['产品编号'] = `${
          this.selectedRow.类型编码 != ''
            ? this.selectedRow.类型编码.trim()
            : ''
        }${
          this.selectedRow.挂式编码 != ''
            ? this.selectedRow.挂式编码.trim()
            : ''
        }${
          this.selectedRow.材质编码 != ''
            ? this.selectedRow.材质编码.trim()
            : ''
        }${
          this.selectedRow.加工编码 != ''
            ? this.selectedRow.加工编码.trim()
            : ''
        }1-X${
          this.selectedRow.颜色编码 != ''
            ? this.selectedRow.颜色编码.trim()
            : ''
        }`
        this.selectedRow['挂式编码'] = ''
        this.selectedRow['挂式'] = ''
        this.chooseDaialogVisible = false
        this.$refs.chooseTable.revertData()
        this.$refs.chooseForm.resetFields()
      }
    },
    // 选择产品结束
    //
    //获取产品挂式信息回车事件
    searchHangingEnter(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.getHangingProtect()
      }
    },
    //获取材质编码信息回车事件
    searchTextureEnter(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.getTextureProtect()
      }
    },
    //获取加工编码信息回车事件
    searchMachingEnter(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.getMachiningProtect()
      }
    },
    //获取颜色编码信息回车事件
    searchColorEnter(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.getColorList()
      }
    },
    //获取物流信息回车事件
    searchEnterlog(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.MainTableSearch()
      }
    },
    //获取花型回车事件
    searchEnterFlowers(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.getFlowerList()
      }
    },
    //获取工厂回车事件
    searchFactoryEnter(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.iconChooseFactory()
      }
    },
    // 选择产品挂式的信息
    iconHangingProduct(row) {
      // console.log(this.selectedRow);
      // console.log(row)
      if (row.产品类型 === '')
        return this.$message.error('请选择产品类型再选择挂式')
      this.chooseHangingFormRuleForm.Flag = row.类型编码
      this.chooseHangingDaialogVisible = true
      this.selectedHangingRow = row
      this.getHangingProtect()
    },
    // 获取产品挂式信息
    getHangingProtect() {
      ;(this.HangingLoading = true),
        (this.HangingTableLoading = true),
        (this.chooseHangingProduceList = [])
      this.chooseHangingList = []
      this.chooseHangingPaging.data = []
      this.$api.zeroOrder
        .productType({ model: this.chooseHangingFormRuleForm })
        .then((res) => {
          // console.log(res)
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.chooseHangingProduceList = res.data
            this.chooseHangingPageList()
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.HangingLoading = false
          this.HangingTableLoading = false
        })
    },

    // 快速获取产品挂式信息
    getHangingList() {
      this.$api.zeroOrder
        .productType({ model: this.chooseHangingFormRuleForm })
        .then((res) => {
          // console.log(res)
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.initializationList = res.data
          }
        })
        .catch((err) => console.log(err))
    },

    // 选择产品挂式表
    chooseHangingPageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作(选择产品表)
      this.chooseHangingPaging.data = this.chooseHangingProduceList //获得产品暂时表格数据
      //用来判断是不是新产品的参数
      this.chooseHangingPaging.total = this.chooseHangingPaging.data.length
      this.chooseHangingGetList()
    },
    // 处理数据(产品挂式表)
    chooseHangingGetList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.chooseHangingPaging.data = this.chooseHangingPaging.data.filter(
        (item, index) =>
          index <
            this.chooseHangingPaging.page * this.chooseHangingPaging.limit &&
          index >=
            this.chooseHangingPaging.limit * (this.chooseHangingPaging.page - 1)
      )
    },
    // 当每页数量改变(产品挂式表)
    chooseHangingHandleSizeChange(val) {
      this.chooseHangingPaging.limit = val
      this.chooseHangingPageList()
    },
    // 当当前页改变(产品挂式表)
    chooseHangingHandleCurrentChange(val) {
      this.chooseHangingPaging.page = val
      this.chooseHangingPageList()
    },
    // 确定按钮产品挂式表选择的数据
    chooseHangingProduct() {
      this.chooseHangingList =
        this.$refs.chooseHangingTable.getCheckboxRecords()
      if (this.chooseHangingList.length > 1)
        return this.$message('每次只能选择一条数据')
      if (this.chooseHangingList.length < 1) {
        this.$message({
          type: 'error',
          message: '请通过复选框选择分类编码',
        })
      } else {
        this.selectedHangingRow['挂式'] = this.chooseHangingList[0]['名称']
        this.selectedHangingRow['挂式编码'] = this.chooseHangingList[0]['编码']
        this.selectedHangingRow['产品编号'] = `${
          this.selectedHangingRow.类型编码 != ''
            ? this.selectedHangingRow.类型编码.trim()
            : ''
        }${
          this.selectedHangingRow.挂式编码 != ''
            ? this.selectedHangingRow.挂式编码.trim()
            : ''
        }${
          this.selectedHangingRow.材质编码 != ''
            ? this.selectedHangingRow.材质编码.trim()
            : ''
        }${
          this.selectedHangingRow.加工编码 != ''
            ? this.selectedHangingRow.加工编码.trim()
            : ''
        }1-X${
          this.selectedHangingRow.颜色编码 != ''
            ? this.selectedHangingRow.颜色编码.trim()
            : ''
        }`
        this.chooseHangingDaialogVisible = false
        this.$refs.chooseHangingTable.revertData()
        this.$refs.chooseHangingForm.resetFields()
      }
    },
    // 选择产品挂式结束

    // 选择产品材质的信息
    iconTextureProduct(row) {
      // this.isSelectDisable = false
      // console.log(sign);
      // this.sign = sign
      this.chooseTextureDaialogVisible = true
      this.selectedTextureRow = row
      this.getTextureProtect()
    },
    // 获取产品材质信息
    getTextureProtect() {
      this.TextureLoading = true
      this.TextureTableLoading = true
      this.$api.zeroOrder
        .productType({ model: this.chooseTextureFormRuleForm })
        .then((res) => {
          // console.log(res)
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.chooseTextureList = res.data
            this.chooseTexturePageList()
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.TextureLoading = false
          this.TextureTableLoading = false
        })
    },

    // 选择产品材质表
    chooseTexturePageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作(选择产品表)
      this.chooseTexturePaging.data = this.chooseTextureList //获得产品暂时表格数据
      //用来判断是不是新产品的参数
      this.chooseTexturePaging.total = this.chooseTexturePaging.data.length
      this.chooseTextureGetList()
    },
    // 处理数据(选择产品材质品表)
    chooseTextureGetList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.chooseTexturePaging.data = this.chooseTexturePaging.data.filter(
        (item, index) =>
          index <
            this.chooseTexturePaging.page * this.chooseTexturePaging.limit &&
          index >=
            this.chooseTexturePaging.limit * (this.chooseTexturePaging.page - 1)
      )
    },
    // 当每页数量改变(选择产品材质表)
    chooseTextureHandleSizeChange(val) {
      this.chooseTexturePaging.limit = val
      this.chooseTexturePageList()
    },
    // 当当前页改变(选择产品材质表)
    chooseTextureHandleCurrentChange(val) {
      this.chooseTexturePaging.page = val
      this.chooseTexturePageList()
    },
    // 确定按钮产品材质选择的数据
    chooseTextureProduct() {
      this.chooseTextureProduceList =
        this.$refs.chooseTextureTable.getCheckboxRecords()
      if (this.chooseTextureProduceList.length > 1)
        return this.$message('每次只能选择一条数据')
      if (this.chooseTextureProduceList.length < 1) {
        this.$message({
          type: 'error',
          message: '请通过复选框选择分类编码',
        })
      } else {
        this.selectedTextureRow['面料材质'] =
          this.chooseTextureProduceList[0]['名称']
        this.selectedTextureRow['材质编码'] =
          this.chooseTextureProduceList[0]['编码']
        this.selectedTextureRow['产品编号'] = `${
          this.selectedTextureRow.类型编码 != ''
            ? this.selectedTextureRow.类型编码.trim()
            : ''
        }${
          this.selectedTextureRow.挂式编码 != ''
            ? this.selectedTextureRow.挂式编码.trim()
            : ''
        }${
          this.selectedTextureRow.材质编码 != ''
            ? this.selectedTextureRow.材质编码.trim()
            : ''
        }${
          this.selectedTextureRow.加工编码 != ''
            ? this.selectedTextureRow.加工编码.trim()
            : ''
        }1-X${
          this.selectedTextureRow.颜色编码 != ''
            ? this.selectedTextureRow.颜色编码.trim()
            : ''
        }`
        this.chooseTextureDaialogVisible = false
        this.$refs.chooseTextureTable.revertData()
        this.$refs.chooseTextureForm.resetFields()
      }
    },

    // 选择选择面料加工表的信息
    iconMachiningProduct(row) {
      // this.isSelectDisable = false
      // console.log(sign);
      // this.sign = sign
      this.chooseMachiningDaialogVisible = true
      this.selectedMachiningRow = row
      this.getMachiningProtect()
    },
    // 获取选择面料加工表信息
    getMachiningProtect() {
      this.MachiningLoading = true
      this.MachiningTableLoading = true
      this.$api.zeroOrder
        .productType({ model: this.chooseMachiningFormRuleForm })
        .then((res) => {
          // console.log(res)
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.chooseMachiningList = res.data
            this.chooseMachiningPageList()
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.MachiningLoading = false
          this.MachiningTableLoading = false
        })
    },
    //
    // 选择面料加工表
    chooseMachiningPageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作(选择产品表)
      this.chooseMachiningPaging.data = this.chooseMachiningList //获得产品暂时表格数据
      //用来判断是不是新产品的参数
      this.chooseMachiningPaging.total = this.chooseMachiningPaging.data.length
      this.chooseMachiningGetList()
    },
    // 处理数据(选择面料加工表)
    chooseMachiningGetList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.chooseMachiningPaging.data = this.chooseMachiningPaging.data.filter(
        (item, index) =>
          index <
            this.chooseMachiningPaging.page *
              this.chooseMachiningPaging.limit &&
          index >=
            this.chooseMachiningPaging.limit *
              (this.chooseMachiningPaging.page - 1)
      )
    },
    // 当每页数量改变(选择面料加工表)
    chooseMachiningHandleSizeChange(val) {
      this.chooseMachiningPaging.limit = val
      this.chooseMachiningPageList()
    },
    // 当当前页改变(选择面料加工表)
    chooseMachiningHandleCurrentChange(val) {
      this.chooseMachiningPaging.page = val
      this.chooseMachiningPageList()
    },
    // 确定按钮选择面料加工表选择的数据
    chooseMachiningProduct() {
      this.chooseMachiningProduceList =
        this.$refs.chooseMachiningTable.getCheckboxRecords()
      if (this.chooseMachiningProduceList.length > 1)
        return this.$message('每次只能选择一条数据')
      if (this.chooseMachiningProduceList.length < 1) {
        this.$message({
          type: 'error',
          message: '请通过复选框选择分类编码',
        })
      } else {
        this.selectedMachiningRow['面料加工'] =
          this.chooseMachiningProduceList[0]['名称']
        this.selectedMachiningRow['加工编码'] =
          this.chooseMachiningProduceList[0]['编码']
        this.selectedMachiningRow['产品编号'] = `${
          this.selectedMachiningRow.类型编码 != ''
            ? this.selectedMachiningRow.类型编码.trim()
            : ''
        }${
          this.selectedMachiningRow.挂式编码 != ''
            ? this.selectedMachiningRow.挂式编码.trim()
            : ''
        }${
          this.selectedMachiningRow.材质编码 != ''
            ? this.selectedMachiningRow.材质编码.trim()
            : ''
        }${
          this.selectedMachiningRow.加工编码 != ''
            ? this.selectedMachiningRow.加工编码.trim()
            : ''
        }1-X${
          this.selectedMachiningRow.颜色编码 != ''
            ? this.selectedMachiningRow.颜色编码.trim()
            : ''
        }`
        this.chooseMachiningDaialogVisible = false
        this.$refs.chooseMachiningTable.revertData()
        this.$refs.chooseMachiningForm.resetFields()
      }
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
      this.$set(this.queryPramsTable, 'BeginDate', startTime)
      this.$set(this.chooseChannelForm, 'BeginDate', startTime)
      this.$set(this.chooseChannelForm, 'EndDate', toMonth)
    },
    // 获取站点列表
    addProductState() {
      this.$api.publicApi
        .basShop()
        .then((res) => {
          // console.log(res);
          if (res.Code < 0) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.shopList = res.data
            this.$set(this.addFormParams, 'Shopid', this.shopList[0].id)
            this.$set(this.queryPramsTable, 'Shop', this.shopList[0].id)
          }
        })
        .catch((err) => console.log(err))
    },
    // 弹框时间
    getNowDateAdd() {
      // 拿到当前时间
      let nowDate = new Date()
      console.log(nowDate)
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let date = nowDate.getDate()
      date = date < 10 ? '0' + date : date
      var toMonth = year + '-' + month + '-' + date
      this.$set(this.addFormParams, 'OrderDate', toMonth)
    },
    // 获取状态
    getDataStatus() {
      this.$api.publicApi
        .getStatus({
          model: { type: 'xdStatus', query: { Type: 'Customized' } },
        })
        .then((res) => {
          // console.log(res)
          if (res.statusCode !== 200) return this.$message.error(res.message)
          this.statusList = res.data
        })
    },
    // 获取国家
    getCountryData() {
      this.$api.zeroOrder.getCountry().then((res) => {
        // console.log(res)
        if (res.statusCode !== 200) return this.$message.error(res.message)
        this.CountryList = res.data
      })
    },
    // 获取货币列表
    addProductCurrency() {
      this.$api.publicApi
        .bcCurrency()
        .then((res) => {
          console.log(res)
          if (res.statusCode < 0) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            res.data.forEach((item) => {
              item.currency = item.currency.trim()
            })
            this.currencyList = res.data
            // this.$set(this.addProduceList, '币种', USD)
          }
        })
        .catch((err) => console.log(err))
    },
    // 获取单位列表
    Addcompany() {
      this.$api.zeroOrder
        .getCompany({
          unitType: 'LENGTH,BREADTH',
        })
        .then((res) => {
          console.log(res)
          if (res.statusCode < 0) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            res.data.forEach((item) => {
              item.UnitCode = item.UnitCode.trim()
            })
            this.Company = res.data
          }
        })
        .catch((err) => console.log(err))
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
  },
  created() {
    this.getProtect()
    this.addProductState() // 站点
    this.getNowDate()
    this.getCountryData()
    this.getDataStatus() // 数据状态
    this.addProductCurrency() //获取币种
    this.Addcompany()
    this.getLogLevel()
    this.getTextureProtect()
    this.getMachiningProtect()
    this.getFlowerList()
    this.getHangingList() //挂式初始化数据
    this.getColorList() //颜色
    this.MainTableQuery()
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
>>> .blockSpan1 {
  // width: 600px;
  // display: flex;
  height: 32px;
  line-height: 32px;
  // justify-content: space-between;
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
  margin-left: 15px;
  margin-bottom: 0;
}
>>> .searchMargin1 {
  margin-left: 15px;
  margin-top: 0;
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
  margin-top: 11px;
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
>>> .footerCellClassName {
  text-align: center;
  height: 30px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  color: #333;
  background: #d1f3ff;
}
>>> .searchBtn {
  width: 70px !important;
  height: 30px !important;
  line-height: 10px;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 10px;
}
>>> [data-v-1afb5364] .searchBtn {
  margin-top: 0;
}
>>> .mainTable .el-card {
  height: 100%;
  margin-top: 5px;
}

.delBtn {
  width: 100px !important;
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
.secondBtn2 {
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
.delBtn1 {
  width: 70px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
.secondBtn1 {
  display: flex;
  margin-top: 11px;
  font-size: 14px;
  color: #333;
  .smBtn {
    width: 70px !important;
  }
  .tips {
    margin-top: 5px;
    margin-left: 20px;
  }
  .iconBtn {
    width: 80px;
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
  position: relative;
  .choose {
    position: absolute;
    top: 0;
    right: -10px;
  }
  .choose2 {
    position: absolute;
    top: 10px;
    right: 6px;
  }
}
>>> .Delivery > .vxe-input--inner {
  width: 613px !important;
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

>>> .Delivery1 > .vxe-input--inner {
  width: 180px !important;
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
.aHref{
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
.special1 {
  position: relative;
  .choose1 {
    position: absolute;
    top: 0;
    right: -160px;
  }
}
.img {
  width: 200px;
  height: 200px;
}
// .saveAnd1 {
//   width: 100px;
//   height: 30px;
//   border-radius: 2px;
//   line-height: 30px;
//   padding: 0px;
//   background-color: #ccc;
//   border: 1px solid #ccc !important;
// }
// .sizeMarginLeft {
//   margin-left: -50px;
// }
// >>> .chooseEnter {
//   width: 70px;
//   height: 32px;
//   background: #5473e8;
//   border-radius: 2px;
//   line-height: 32px;
//   padding: 0;
// }
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
>>> .unifySize2 {
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
.iconP-factory {
  font-size: 20px;
  color: #5473e8;
  // float: right;
  // transform: rotate(90deg);
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
//   height: 800px;
// }
.addform >>> .el-input__inner {
  width: 135px;
}
>>> .jy_wrapper .JyDialog__body {
  border-bottom: none !important;
}
>>> .JyDialog .JyDialog__header {
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
// 弹框样式
>>> .searchCondition {
  display: flex;
  justify-content: flex-start;
  .searchConditionShop {
    margin-right: 30px;
  }
}
// >>> .searchBtn {
//   width: 70px !important;
//   height: 30px !important;
//   background: #ff9b22 !important;
//   border: 1px solid #ff9b22 !important;
//   margin-left: 12px;
//   margin-top: 5px;
// }
>>> .searchBtn2 {
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
// >>>.mainTable .el-card {
//   // height: 100%;
// }
>>> .marginLeft {
  margin-left: 22px;
}
>>> .choose2Btn {
  background: #ccc !important;
  border: 1px solid #ccc !important;
}
>>> .el-checkbox {
  line-height: 30px;
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
>>> .saveAnd2 {
  width: 100px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #5473e8;
  border: 1px solid #5473e8 !important;
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
// 计算弹框card样式
.computerCard {
  margin: 10px 0;
  width: 100%;
  height: 500px;
  background: #f3f3f3;
  .show {
    margin-top: 150px;
    display: flex;
  }
  img {
    margin-left: 20px;
  }
  .titleReviewSum {
    margin-top: 10px;
    margin-left: 30px;
  }
  .titleReview1 {
    margin: 30px 100px;
    font-size: 16px;
    min-width: 296px;
    height: 25px;
    font-size: 30px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
  }
  .borderLine {
    margin: 5px;
    width: 100%;
    height: 1;
    border: 1px solid #ccc;
  }
}
</style>