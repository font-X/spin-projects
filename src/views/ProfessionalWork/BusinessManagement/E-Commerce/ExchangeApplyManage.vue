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
                  <el-col :md="3" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="换入站点："
                    >
                      <el-select
                        :loading="isLoadingShop"
                        loading-text="加载中,若长时间无响应请刷新页面!"
                        v-model="AdjustmentList.Shop"
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
                  <el-col :md="5" :lg="5" :xl="5">
                    <el-form-item class="searchMargin" label="原产品号：">
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
                        class="unifySize marginLeft"
                        placeholder="颜色"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="5" :xl="5">
                    <el-form-item
                      class="searchMargin"
                      label="新产品号："
                      label-width="130px"
                    >
                      <el-autocomplete
                        clearable
                        @keyup.enter.native="MainTableSearch()"
                        v-model="AdjustmentList.NewProductNo"
                        class="unifySize1 marginLeft"
                        :fetch-suggestions="querySearch2"
                        placeholder="新产品号"
                      />
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
              </el-form>
            </el-col>
            <!-- 按钮区域 -->
            <el-col class="secondBtn">
              <el-button
                type="danger"
                class="delBtn iconBtn el-icon-search"
                size="small"
                :loading="isLoadingBtn"
                @click="MainTableSearch"
                >查询</el-button
              >
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
              <!-- <el-button
                type="primary"
                @click="editDbclick"
                class="smBtn iconBtn el-icon-view"
                >编辑</el-button
              > -->
              <el-button
                type="primary"
                @click="delAdjustment"
                class="delBtn iconBtn el-icon-delete"
                >删除</el-button
              >
              <el-button
                type="primary"
                class="smBtn iconBtn iconfont kt-icon-caidan"
                @click="reportItem"
                >报批</el-button
              >
              <el-button
                type="primary"
                class="sBtn iconBtn iconfont kt-icon-daochu"
                @click="exportExcel"
                >导出Excel</el-button
              >
              <el-button
                type="primary"
                class="smBtn iconBtn iconfont kt-icon-caidan"
                @click="submit"
                >提交</el-button
              >
            </el-col>
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
            @cell-dblclick="dbMainClick"
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
          <el-row id="pagin">
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
          </el-row>
        </el-card>
      </el-col>
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
        <div v-if="addLoading" class="screen"></div>
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
                <el-select v-model="addFormParams.Shop" class="unifySize">
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
                  type="textarea"
                  :rows="2"
                  placeholder="请输入换货原因"
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
              :row-class-name="cellClass"
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
                :header-class-name="cellCorlor4"
                fixed="left"
                type="checkbox"
                width="50"
              ></vxe-table-column>
              <vxe-table-column
                :header-class-name="cellCorlor4"
                fixed="left"
                type="seq"
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
                  width="260"
                  :edit-render="{
                    name: 'input',
                    attrs: { type: 'text' },
                    immediate: true,
                  }"
                  title="新产品号"
                >
                  <template v-slot:edit="{ row }">
                    <vxe-input
                      v-model="row.NewProductNo"
                      @keyup.enter.native="NewProductNoKeyUp(row)"
                    ></vxe-input>
                  </template>
                  <template slot-scope="{ row }">
                    <span>{{ row.NewProductNo }}</span>
                    <i
                      @click="iconChooseProduct('newP', row)"
                      class="iconP iconfont kt-icon-daoru"
                    ></i
                    ><br />
                    <span>{{ row.NewProductName }}</span>
                  </template>
                </vxe-table-column>
                <!-- <vxe-table-column
                  min-width="250"
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
                  :header-class-name="cellCorlor4"
                  :edit-render="{
                    name: 'input',
                    attrs: { type: 'text' },
                    autoselect: true,
                    immediate: true,
                  }"
                  width="70"
                  field="RequestChangeQuantity"
                  title="数量(件)"
                >
                  <template v-slot:edit="{ row }">
                    <vxe-input
                      :min="0"
                      type="integer"
                      v-model="row.RequestChangeQuantity"
                    ></vxe-input>
                  </template>
                </vxe-table-column>
                <vxe-table-column
                  :header-class-name="cellCorlor4"
                  :edit-render="{
                    immediate: true,
                    name: 'input',
                  }"
                  min-width="110"
                  field="ChangeRemark"
                  title="备注"
                >
                </vxe-table-column>
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
                    <span>{{ row.P_Code }}</span>
                    <i
                      @click="iconChooseProduct('oldP', row)"
                      class="iconP iconfont kt-icon-daoru"
                    ></i
                    ><br />
                    <span>{{ row.P_chnName }}</span>
                  </template>
                </vxe-table-column>
                <!-- <vxe-table-column
                  :header-class-name="hearderClass"
                  field="P_chnName"
                  title="产品名称"
                  min-width="250"
                ></vxe-table-column> -->
                <vxe-table-column
                  :header-class-name="hearderClass"
                  width="70"
                  field="Color"
                  title="颜色"
                ></vxe-table-column>
                <vxe-table-column
                  :header-class-name="hearderClass"
                  width="70"
                  field="chnSpec"
                  title="尺寸"
                ></vxe-table-column>
                <vxe-table-column
                  :header-class-name="hearderClass"
                  width="80"
                  field="NewShop"
                  title="换出站点"
                >
                </vxe-table-column>
                <vxe-table-column
                  :header-class-name="hearderClass"
                  width="70"
                  field="Quantity"
                  title="数量"
                ></vxe-table-column>
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
                  min-width="80"
                  field="ConfirmRemark"
                  title="备注"
                >
                </vxe-table-column>
              </vxe-table-colgroup>
              <vxe-table-column
                :header-class-name="hearderClass"
                width="90"
                title="操作"
              >
                <template v-if="isEdit" slot-scope="{ row }">
                  <i
                    v-if="row.P_Code !== ''"
                    class="iconC el-icon-circle-plus-outline"
                    @click="iconAddProduct"
                  ></i>
                  <i
                    @click="iconDelProduct(row)"
                    class="iconC el-icon-delete"
                  ></i>
                </template>
              </vxe-table-column>
            </vxe-table>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-row>
            <el-col>
              <!-- <el-button
                type="primary"
                :loading="dataloading"
                class="saveBtn2"
                @click="dataProduction"
                >数据生成</el-button
              > -->
              <el-button
                type="primary"
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
                    ? 'saveAnd2'
                    : 'saveAnd3'
                "
                @click="editShop"
                class="el-icon-s-promotion saveAnd"
                >批量修改换出站点</el-button
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
              <el-button
                type="primary"
                :loading="addLoading"
                @click="saveProductAnd"
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
                    ? 'saveAnd1'
                    : 'saveAnd'
                "
                class="el-icon-s-promotion saveAnd"
                >保存并提交</el-button
              >
              <el-button type="primary" class="clearBtn" @click="cancel"
                >取消</el-button
              >
            </el-col>
          </el-row>
        </span>
      </el-dialog>
      <!-- 选择产品信息 -->
      <jy-dialog
        title="选择产品信息"
        append-to-body
        :close-on-click-modal="false"
        :visible.sync="chooseDaialogVisible"
        width="65%"
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
            <el-col style="display: flex; justify-content: space-between">
              <el-form-item class="marginLeft" label="站点：" prop="shopId">
                <el-select
                  clearable
                  :disabled="this.sign === 'oldP' ? false : true"
                  v-model="chooseFormRuleForm.shopId"
                  @change="shopChange"
                  class="unifySize"
                >
                  <el-option value="" label=""></el-option>
                  <el-option
                    :key="item.id"
                    v-for="item in addShopList"
                    :label="item.Name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="产品名称/代码：">
                <el-input
                  v-model="chooseFormRuleForm.strProduct"
                  class="unifySize"
                  @keyup.enter.native="searchProductList()"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="色号/颜色：">
                <el-input
                  v-model="chooseFormRuleForm.color"
                  class="unifySize"
                  clearable
                  @keyup.enter.native="searchProductList()"
                ></el-input>
              </el-form-item>
              <el-form-item class="sizeMarginLeft" width="60" label="尺寸：">
                <el-input
                  v-model="chooseFormRuleForm.p_Spec"
                  class="unifySize"
                  clearable
                  @keyup.enter.native="searchProductList()"
                ></el-input>
              </el-form-item>
              <el-form-item class="sizeMarginLeft" width="60" label="样式：">
                <el-input
                  v-model="chooseFormRuleForm.CustStyle"
                  class="unifySize"
                  clearable
                  @keyup.enter.native="searchProductList()"
                ></el-input>
              </el-form-item>
              <el-button
                type="danger"
                class="searchBtn"
                size="small"
                :loading="searchLoading"
                @click="searchProductList"
                icon="el-icon-search"
                >查询</el-button
              >
            </el-col>
            <!-- <el-col> </el-col> -->
          </el-row>
          <vxe-table
            ref="chooseTable"
            border
            resizable
            stripe
            keep-source
            :row-class-name="cellChooseClass"
            show-overflow
            height="700"
            :auto-resize="true"
            :loading="searchLoading"
            :header-cell-class-name="hearderClass"
            @checkbox-change="onChooseCheckboxChange"
            @checkbox-all="onChooseCheckboxAllChange"
            highlight-current-row
            :align="'center'"
            :checkbox-config="{ highlight: true }"
            :data="choosePaging.data"
          >
            <vxe-table-column type="checkbox" width="5%"></vxe-table-column>
            <vxe-table-column
              type="seq"
              width="5%"
              title="序号"
            ></vxe-table-column>
            <vxe-table-column
              min-width="15%"
              :field="isChinese ? '产品号' : 'P_Code'"
              title="产品编码"
            ></vxe-table-column>
            <vxe-table-column
              min-width="15%"
              :field="isChinese ? '产品名称' : 'P_chnName'"
              title="产品名称"
            ></vxe-table-column>
            <vxe-table-column
              width="7%"
              field="样式"
              title="样式"
            ></vxe-table-column>
            <vxe-table-column
              width="6%"
              field="色号"
              title="色号"
            ></vxe-table-column>
            <vxe-table-column
              width="6%"
              :field="isChinese ? '颜色' : 'Color'"
              title="颜色"
            ></vxe-table-column>
            <vxe-table-column
              width="6%"
              :field="isChinese ? '尺寸' : 'chnSpec'"
              title="尺寸"
            ></vxe-table-column>
            <vxe-table-column
              width="8%"
              field="尺寸单位"
              title="尺寸单位"
            ></vxe-table-column>
            <vxe-table-column
              width="8%"
              field="每包片数"
              title="每包片数"
            ></vxe-table-column>
            <vxe-table-column
              width="8%"
              field="库存件数"
              title="库存(件)"
            ></vxe-table-column>
            <vxe-table-column
              width="7%"
              field="站点"
              title="站点"
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
      </jy-dialog>
      <!-- 报批弹框 -->
      <report-approval
        v-if="showReportDialog"
        ref="ReportApproval"
        @okDialog="ReportOkDialog"
      ></report-approval>
    </el-row>
    <el-dialog
      v-dialogDrag
      title="修改换出站点"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="editDaialogVisible"
      width="30%"
      hieght="400px"
    >
      <el-row>
        <el-form
          ref="editForm"
          :model="editFormParams"
          style="font-size：14px"
          label-width="100px"
        >
          <el-col :span="24">
            <el-form-item label="换出站点:">
              <el-select
                clearable
                v-model="editFormParams.shop"
                class="unifySize"
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in NewShopList"
                  :label="item.name"
                  :value="item.shop_source"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <span>
          <el-button type="primary" @click="exEnter" class="chooseEnter"
            >确 定</el-button
          >
          <el-button class="chooseCancel" @click="editDaialogVisible = false"
            >取 消</el-button
          >
        </span>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
// import JyTableInput from '@/components/JyTableInput/index'
import ReportApproval from '../../Components/ReportApproval.vue'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import Cookies from 'js-cookie'
import JyDialog from '@/components/JyDialog'
export default {
  components: { ReportApproval, JyDialog },
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
      editFormParams: {
        shop: '',
        shopName: '',
      },
      editDaialogVisible: false,
      chooseProduceList: [], //产品信息表展示的数据
      chooseList: [], // 勾选产品信息后的数据
      addShopList: [],
      columnsDe: [],
      cellCorlor4: 'cellCorlor4',
      addTitle: '',
      submitID: '',
      delParams: {
        Id: '',
        UserCode: '001',
        PricechangeId: '',
        strMessage: '',
      }, //删除调价单的产品参数
      addRules: {
        shop: [{ required: false, message: '请选择站点', trigger: 'blur' }],
        // country: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        DeliveryDate: [
          { required: true, message: '请选择日期', trigger: 'blur' },
        ],
      },
      isLoadingShop: true,
      // 查询产品校验规则
      chooseFormRules: {
        strProduct: [{ required: false, trigger: 'change' }],
        p_Spec: [{ required: false, trigger: 'blur' }],
        color: [{ required: false, trigger: 'blur' }],
        contractNo: [{ required: false, trigger: 'blur' }],
        shopId: [{ required: false, trigger: 'blur' }],
      },
      addLoading: false,
      footerCellClassName: 'footerCellClassName',
      delLength: [], //主页table选中复选框
      allShopList: [],
      allShop: [],
      NewShopList: [],
      gridHeight: 660,
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
        { width: '80', title: '申请数量', field: '申请数量' },
        {
          title: '原产品号(换出产品)',
          minWidth: '178',
          field: '原产品号',
          slots: { default: 'productName' },
        },
        { width: '80', title: '换入备注', field: '换入备注' },
        { width: '80', title: '换货数量', field: '换货数量' },
        { width: '80', title: '换出站点', field: '对方站点' },
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
        RequestChangeQuantity: [
          { required: true, message: '申请数量必须填写' },
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
      isEdit: true, //规定调货单是否可以修改
      // 查询获取列表参数表单
      AdjustmentList: {
        // usercode: '001',
        beginDate: '',
        EndDate: '',
        Shop: '',
        P_Code: '',
        Color: '',
        NewProductNo: '',
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
        CustStyle: '',
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
      dataloading: false,
      Exdata: [],
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
    // 数据生成
    dataProduction() {
      this.dataloading = true
      let form = new FormData()
      let token = Cookies.get('token')
      form.append('shopId', this.addFormParams.Shop)
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
        .then((res2) => {
          if (res2.data.statusCode !== 200) {
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
    exEnter() {
      if (this.editFormParams.shop === '')
        return this.$message.error('换出站点不能为空！')
      this.editFormParams.shopId = ''
      var index = this.allShop.findIndex((ITEM) => {
        return ITEM.id.trim() === this.editFormParams.shop.trim()
      })
      if (index !== -1) {
        this.editFormParams.shopName = this.allShop[index].Name
      }
      this.addProduceList.forEach((item) => {
        this.Exdata.forEach((Item) => {
          if (item._XID === Item._XID) {
            item.NewShop = this.editFormParams.shopName
            item.NewShopId = this.editFormParams.shop
          }
        })
      })
      this.editDaialogVisible = false
    },
    // 批量修改换出站点
    editShop() {
      this.Exdata = this.$refs.addTable.getCheckboxRecords()
      let flag = this.Exdata.some((item) => {
        return item.NewShop !== this.Exdata[0].NewShop
      })
      if (flag) return this.$message.error('请选择换出站点一致的数据进行更改!')
      var index = this.allShop.findIndex((ITEM) => {
        return ITEM.Name.trim() === this.Exdata[0]['NewShop'].trim()
      })
      if (index !== -1) {
        let ShopId = this.allShop[index].id
        console.log(ShopId)
        this.$api.exchangegoods
          .GetSiteList({
            SourceType: '98',
            Shop: ShopId,
          })
          .then((res) => {
            // console.log(res)
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.editDaialogVisible = true
              this.editFormParams.shop = ''
              this.NewShopList = res.data
            }
          })
          .catch((err) => console.log(err))
      }
    },
    // 保存并提交
    async saveProductAnd() {
      const errMap = await this.$refs.addTable //vxe-table表格数据校验
        .validate(true)
        .catch((errMap) => errMap)
      if (errMap) {
        return
      } else {
        this.$refs.addForm.validate((valid) => {
          if (!valid) return //文本域校验，必填项

          this.addLoading = true
          var str = ''
          this.addProduceList.forEach((item) => {
            var index = this.allShop.findIndex((ITEM) => {
              return ITEM.Name.trim() === item.NewShop.trim()
            })
            if (index !== -1) {
              item.NewShopId = this.allShop[index].id
            }
            if (item.ChangeRemark === undefined) {
              item.ChangeRemark = ''
            }
            str +=
              item.P_Code +
              '◇' +
              item.P_chnName +
              '◇' +
              item.Color +
              '◇' +
              item.chnSpec +
              '◇' +
              item.RequestChangeQuantity +
              '◇' +
              item.NewProductNo +
              '◇' +
              item.ChangeRemark +
              '◇' +
              item.NewShopId +
              '◆'
          })
          this.addFormParams.strList = str
          if (this.state === 'add') {
            this.addFormParams.ID = ''
            this.$api.exchangegoods
              .saveProduct({ model: this.addFormParams })
              .then((res) => {
                // console.log(res)
                if (res.statusCode !== 200) {
                  this.$message({
                    message: res.message,
                    type: 'error',
                  })
                } else {
                  this.$message({
                    message: '保存',
                    type: 'success',
                  })
                  this.$api.exchangegoods
                    .PlanConfirmSubmit({ Planid: res.data[0]['ID'] })
                    .then((res) => {
                      // console.log(res)
                      if (res.statusCode !== 200) {
                        this.$message({
                          message: res.message,
                          type: 'error',
                        })
                      } else {
                        this.$message({
                          type: 'success',
                          message: '保存并提交成功!',
                        })
                        this.MainTableSearch()
                        this.$refs.addForm.resetFields()
                        this.addProduceList = [
                          {
                            P_Code: '',
                            NewProductNo: '',
                            P_chnName: '',
                            Quantity: null,
                          },
                        ]
                        this.$refs.addTable.revertData()
                        this.delLength = []
                        this.addAialogVisible = false
                      }
                    })
                    .catch((err) => console.log(err))
                    .finally(() => {
                      this.addLoading = false
                    })
                }
              })
              .catch((err) => {
                console.log(err)
                this.addLoading = false
              })
              .finally(() => {
                this.addLoading = false
              })
          } else {
            this.$api.exchangegoods
              .saveProduct({
                model: this.addFormParams,
              })
              .then((res) => {
                // console.log(res)
                if (res.statusCode !== 200) {
                  this.$message({
                    message: res.message,
                    type: 'error',
                  })
                } else {
                  this.$api.exchangegoods
                    .PlanConfirmSubmit({ Planid: res.data[0]['ID'] })
                    .then((res) => {
                      // console.log(res)
                      if (res.statusCode !== 200) {
                        this.$message({
                          message: res.message,
                          type: 'error',
                        })
                      } else {
                        this.$message({
                          type: 'success',
                          message: '保存并提交成功!',
                        })
                        this.addLoading = false
                        this.MainTableSearch()
                        this.$refs.addForm.resetFields()
                        this.addProduceList = [
                          {
                            P_Code: '',
                            NewProductNo: '',
                            P_chnName: '',
                            Quantity: null,
                          },
                        ]
                        this.$refs.addTable.revertData()
                        this.delLength = []
                        this.addAialogVisible = false
                      }
                    })
                    .catch((err) => console.log(err))
                    .finally(() => {
                      this.addLoading = false
                    })
                }
              })
              .catch((err) => console.log(err))
              .finally(() => {
                this.addLoading = false
              })
          }
        })
      }
    },
    submit() {
      let data = this.$refs.mainRef.getCheckboxRecords()
      if (data.length !== 1)
        return this.$message.error('请勾选一条数据后再进行操作！')
      this.$api.exchangegoods
        .PlanConfirmSubmit({ Planid: data[0].ID })
        .then((res) => {
          // console.log(res)
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              type: 'success',
              message: '提交成功!',
            })
            this.MainTableSearch()
          }
        })
        .catch((err) => console.log(err))
    },
    //点击单元格
    cellclick(data) {
      if (data.columnIndex != 0) {
        this.$refs.mainRef.setAllCheckboxRow(false)
        this.$refs.mainRef.setCheckboxRow(data.row, true)
      }
    },
    shopChange() {
      this.searchProductList()
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
        'Exchange-oldproduct'
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
        'Exchange-newproduct'
      )
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
      const ws = XLSX.utils.json_to_sheet(this.priceAdjustmentSheet)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
      XLSX.writeFile(wb, '电商订单.xls', {
        bookType: 'xls',
        bookSST: false,
        type: 'array',
      })
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
            case '申请数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i]['申请数量']
              }
              return sums
            case '换货数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i]['换货数量']
              }
              return sums
            case '换入sku数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i]['换入sku数']
              }
              return sums
            case '换入数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i]['换入数量']
              }
              return sums
            case '换出sku数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i]['换出sku数']
              }
              return sums
            case '换出数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i]['换出数量']
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
                  data[i].RequestChangeQuantity = ''
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
      if (this.AdjustmentList.isDetail === '0') {
        this.columnsDe = this.columnsNo
      } else if (this.AdjustmentList.isDetail === '1') {
        this.columnsDe = this.columns
      }
      this.paging.data = []
      this.handleSearchHistory(
        'Exchange-oldproduct',
        this.AdjustmentList.P_Code
      )
      this.handleSearchHistory(
        'Exchange-newproduct',
        this.AdjustmentList.NewProductNo
      )
      this.delLength = []
      this.loading = true
      this.isLoadingBtn = true
      if (
        this.AdjustmentList.beginDate === null &&
        this.AdjustmentList.EndDate === null
      ) {
        this.AdjustmentList.beginDate = ''
        this.AdjustmentList.EndDate = ''
      }
      this.$api.exchangegoods
        .getExangeGoods({ model: this.AdjustmentList })
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
            this.priceAdjustmentSheet = res.data[0]
            this.isLoadingBtn = false
            this.loading = false
            this.paging.page = 1
            this.pageList()
          }
        })
        .catch((err) => {
          // console.log(err)
          this.$message.error(err)
          this.isLoadingBtn = false
          this.loading = false
        })
    },
    // 主表双击事件
    dbMainClick(row) {
      this.addTitle = '查看换货申请表'
      this.addLoading = true
      // console.log(row)
      this.addAialogVisible = true
      // this.isEdit = false
      // this.addFormParams.Shop = this.delLength[0].Shop
      //     this.addFormParams.Remark = this.delLength[0].Remark
      this.$api.exchangegoods
        .getOneProduct({
          id: row.row.ID,
        })
        .then((res) => {
          // console.log(res)
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            res.data.NewList.forEach((item) => {
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
            })
            // console.log(res.data.plan.Shop)
            this.addProduceList = res.data.NewList
            this.addFormParams = res.data.plan
            this.addLoading = false
            // this.addFormParams.Shop = res.data.plan.Shop
          }
        })
        .catch((err) => console.log(err))
      // this.delLength = []
      this.ProductInfoList = [] //重置
      this.addAialogVisible = false //关闭弹出层
      this.isEdit = false
      this.addAialogVisible = true
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
    // 删除调货单
    delAdjustment() {
      this.delLength = this.$refs.mainRef.getCheckboxRecords()
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
            this.$api.exchangegoods
              .delProduct({ id: this.delLength[0].ID })
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
                  this.delParams.Id = []
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
          this.addLoading = true
          var str = ''
          this.addProduceList.forEach((item) => {
            var index = this.allShop.findIndex((ITEM) => {
              return ITEM.Name.trim() === item.NewShop.trim()
            })
            if (index !== -1) {
              item.NewShopId = this.allShop[index].id
            }
            if (item.ChangeRemark === undefined) {
              item.ChangeRemark = ''
            }
            str +=
              item.P_Code +
              '◇' +
              item.P_chnName +
              '◇' +
              item.Color +
              '◇' +
              item.chnSpec +
              '◇' +
              item.RequestChangeQuantity +
              '◇' +
              item.NewProductNo +
              '◇' +
              item.ChangeRemark +
              '◇' +
              item.NewShopId +
              '◆'
          })
          this.addFormParams.strList = str
          if (this.state === 'add') {
            this.addFormParams.ID = ''
            this.$api.exchangegoods
              .saveProduct({ model: this.addFormParams })
              .then((res) => {
                // console.log(res)
                if (res.statusCode !== 200) {
                  this.$message({
                    message: res.message,
                    type: 'error',
                  })
                } else {
                  this.$message({
                    message: '保存',
                    type: 'success',
                  })
                  this.submitID = res.data[0]['ID']
                  this.MainTableSearch()
                  this.$refs.addForm.resetFields()
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
                this.addLoading = false
              })
          } else {
            this.$api.exchangegoods
              .saveProduct({
                model: this.addFormParams,
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
                    message: '编辑换货成功',
                    type: 'success',
                  })
                  this.submitID = res.data[0]['ID']
                  this.MainTableSearch()
                  this.$refs.addForm.resetFields()
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
                  this.addAialogVisible = false //关闭弹出层
                }
              })
              .catch((err) => console.log(err))
              .finally(() => {
                this.addLoading = false
              })
            // this.$refs.addForm.resetFields()
            // this.$refs.mainRef.revertData()
            // this.addProduceList = [
            //   { P_Code: '', NewProductNo: '', P_chnName: '', Quantity: null },
            // ]
            // this.$refs.addTable.revertData() //清空表格状态
            // this.MainTableSearch()
            // this.delLength = []
            // this.addAialogVisible = false //关闭弹出层
          }
        })
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
    // 编辑勾选项
    editDbclick() {
      this.addTitle = '编辑换货申请表'
      this.state = 'edit'
      this.addLoading = true
      this.delLength = this.$refs.mainRef.getCheckboxRecords()
      if (this.delLength.length < 1)
        return this.$message.error('请勾选复选框的数据再做出编辑操作')
      if (this.delLength.length > 1) {
        this.$message({
          message: '每次只能编辑一条',
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
                    res.data.NewList.forEach((item) => {
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
                          item['可销周数'] = Item.可销周数
                        }
                      })
                    })
                    this.addProduceList = res.data.NewList
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
      if (sign === 'newP') {
        this.searchLoading = true
        this.isSelectDisable = false
        this.chooseDaialogVisible = true
        //把添加的站点 给到请求产品参数
        this.sign = sign
        this.rowId = row._XID //跟据rowid来添加
        this.chooseFormRuleForm.strProduct = ''
        this.chooseFormRuleForm.color = ''
        this.chooseFormRuleForm.p_Spec = ''
        this.choosePaging.data = []
        this.addShopList = this.shopList
        this.chooseFormRuleForm.shopId = this.addFormParams.Shop
        this.selectedRow = row
        this.getProtect()
      } else {
        if (row.NewProductNo === '') {
          this.$message.error('请先输入新产品号!')
        } else {
          this.searchLoading = true
          this.isSelectDisable = false
          this.chooseDaialogVisible = true
          //把添加的站点 给到请求产品参数
          this.sign = sign
          this.chooseFormRuleForm.strProduct = ''
          this.chooseFormRuleForm.color = row.NewProductCorlor
          this.chooseFormRuleForm.p_Spec = row.NewProductSize
          this.choosePaging.data = []
          this.addShopList = this.allShopList
          this.chooseFormRuleForm.shopId = ''
          this.selectedRow = row
          this.getProtect()
        }
      }
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
            this.searchLoading = false
          } else {
            this.chooseProduceList = res.data
            this.searchLoading = false
            this.choosePageList()
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
          this.$message.error(err)
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
      this.chooseList = this.$refs.chooseTable.getCheckboxRecords()
      if (this.chooseList.length !== 1) {
        return this.$message.error('只能选择一条数据')
      }
      let concatArr = this.addProduceList
      let chooseObj = this.chooseList[0]
      // console.log(this.selectedRow)
      this.selectedRow[this.sign === 'oldP' ? 'P_Code' : 'NewProductNo'] =
        chooseObj['产品号']
      this.selectedRow[this.sign === 'oldP' ? '库存件数' : ''] =
        chooseObj['库存件数']
      this.selectedRow[this.sign === 'oldP' ? '备注' : ''] = chooseObj['备注']
      this.selectedRow[this.sign === 'oldP' ? '' : 'NewProductName'] =
        chooseObj['产品名称']
      this.selectedRow[this.sign === 'oldP' ? '' : 'NewProductCorlor'] =
        chooseObj['颜色']
      this.selectedRow[this.sign === 'oldP' ? '' : 'NewProductSize'] =
        chooseObj['尺寸']
      this.selectedRow[this.sign === 'oldP' ? 'NewShop' : ''] =
        chooseObj['站点']
      // if (this.sign === 'oldP') {
      //   if (chooseObj['站点'] !== null) {
      //   }
      // }

      this.selectedRow[this.sign === 'oldP' && 'P_chnName'] =
        chooseObj['产品名称']
      this.selectedRow[this.sign === 'oldP' && 'Color'] = chooseObj['颜色']
      this.selectedRow[this.sign === 'oldP' && 'chnSpec'] = chooseObj['尺寸']
      this.chooseList = []
      this.getPriceParams.shopid = this.addFormParams.Shop
      this.getPriceParams.Remark = this.addFormParams.Remark
      this.getPriceParams.InputDate = this.addFormParams.DeliveryDate
      this.$refs.chooseTable.revertData()
      this.$refs.chooseForm.resetFields()
      this.chooseDaialogVisible = false
    },
    NewProductNoKeyUp(row) {
      this.$api.business
        .ChooseProduct({
          model: {
            aType: '',
            color: '',
            contractNo: '',
            isCpcg: '',
            p_Spec: '',
            planNo: '',
            shopId: '',
            strProduct: row.NewProductNo,
            type: '',
          },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            if (res.data.length !== 1) {
              this.$message.error('请确保输入的产品号正确无误！')
            } else {
              this.$set(row, 'NewProductName', res.data[0]['产品名称'])
              this.$set(row, 'NewProductSize', res.data[0]['尺寸'])
              this.$set(row, 'NewProductCorlor', res.data[0]['颜色'])
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
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
            this.AdjustmentList.Shop = this.shopList[0].id
            this.MainTableSearch()
          }
        })
        .then()
        .catch((err) => console.log(err))
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
            this.allShopList = res.data
            this.allShop = res.data
          }
        })
        .then()
        .catch((err) => console.log(err))
    },
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
        this.$api.exchangegoods
          .GetDeliveryPlanById({
            Id: data[0].ID,
          })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              if (res.data.ChangeStatus !== '2') {
                return this.$message.error('该换货单不是已确认状态,不能报批！')
              }
              var ID = data[0].ID
              this.showReportDialog = true
              this.$nextTick(() => {
                this.$refs.ReportApproval.formInfo.ObjectCode = '0114'
                this.$refs.ReportApproval.formInfo.Key = ID
                this.$refs.ReportApproval.showDialog = true
              })
            }
          })
          .catch((err) => console.log(err))
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
.el-container {
  width: 100%;
  height: 100%;
  background-color: #f5f8ff;
}
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
  height: 29px;
  width: 40%;
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
>>> .el-container {
  user-select: text;
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
>>> .cellCorlor4 {
  background: #d0eaff;
  text-align: center;
  font-size: 12px;
  color: #333;
  font-family: Microsoft YaHei;
  height: 30px;
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
.screen {
  background-color: #000;
  opacity: 0.3;
  position: fixed;
  float: left;
  z-index: 99999;
  width: 100%;
  height: 100%;
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
>>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 60%;
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
  width: 130px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #ccc;
  border: 1px solid #ccc !important;
}
>>> .saveAnd2 {
  width: 150px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #ccc;
  border: 1px solid #ccc !important;
}
>>> .saveAnd3 {
  width: 150px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #21bdca;
  border: 1px solid #21bdca !important;
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
  height: 30px;
}
>>> .unifySize1 {
  width: 100% !important;
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
>>> .unifySize1 .el-input {
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
.saveAnd {
  width: 130px;
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
</style>