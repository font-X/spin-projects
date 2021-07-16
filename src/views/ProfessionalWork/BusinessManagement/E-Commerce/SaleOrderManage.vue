<template>
  <el-container>
    <!-- 遮罩层 -->
    <el-row id="mainCard" style="width: 100%">
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
                  <el-col
                    :md="8"
                    :lg="5"
                    :xl="5"
                    style="display: flex; justify-content: flex-start"
                  >
                    <!-- 查询条件区域 -->
                    <el-form-item label="制单时间：">
                      <span class="blockSpan">
                        <div class="blockDate">
                          <el-date-picker
                            class="unifySize unifySizeDate"
                            v-model="mainTableParams.beginDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                          ></el-date-picker>
                          <el-date-picker
                            class="unifySize unifySizeDate NoneIcon"
                            v-model="mainTableParams.endDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                          ></el-date-picker>
                        </div>
                      </span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="4" :xl="4">
                    <el-form-item class="searchMargin" label="订单号：">
                      <!-- <el-input
                        clearable
                        v-model="mainTableParams.contractCode"
                        class="unifySize1 unifySize1"
                        placeholder="订单号"
                      ></el-input> -->
                      <el-autocomplete
                        clearable
                        v-model="mainTableParams.contractCode"
                        class="unifySize1"
                        @keyup.enter.native="searchOrderList()"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入订单号"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="站点："
                    >
                      <el-select
                        v-model="mainTableParams.shop"
                        class="unifySize"
                        placeholder="站点"
                      >
                        <el-option label="" value=""> </el-option>
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
                    <el-form-item class="searchMargin" label="颜色：">
                      <!-- <el-input
                        clearable
                        v-model="mainTableParams.color"
                        class="unifySize"
                        placeholder="颜色"
                      ></el-input> -->
                      <el-autocomplete
                        clearable
                        @keyup.enter.native="searchOrderList()"
                        v-model="mainTableParams.color"
                        class="unifySize"
                        :fetch-suggestions="querySearch2"
                        placeholder="请输入颜色"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="币种："
                    >
                      <el-select
                        clearable
                        v-model="mainTableParams.currency"
                        class="unifySize"
                        placeholder="币种"
                      >
                        <el-option label="" value=""> </el-option>
                        <el-option
                          :key="index"
                          v-for="(item, index) in currencyList"
                          :label="item.chnName"
                          :value="item.currency"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="4" :xl="4">
                    <el-button
                      v-if="iconShow"
                      type="danger"
                      class="searchBtn searchMargin"
                      size="small"
                      :loading="IsSearch"
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
                <el-row v-show="!iconShow" class="mainForm marginLe">
                  <el-col :md="8" :lg="5" :xl="5">
                    <el-form-item
                      label-width="84px"
                      style="margin-bottom: 0"
                      label="产品名称："
                    >
                      <!-- <el-input
                        clearable
                        v-model="mainTableParams.kh"
                        class="productHeight"
                        placeholder="产品名称"
                      ></el-input> -->
                      <el-autocomplete
                        clearable
                        @keyup.enter.native="searchOrderList()"
                        v-model="mainTableParams.kh"
                        class="productHeight"
                        :fetch-suggestions="querySearch3"
                        placeholder="请输入产品名称"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="4" :xl="4">
                    <el-form-item
                      label-width="84px"
                      class="searchMargin"
                      label="生产单号："
                    >
                      <!-- <el-input
                        clearable
                        v-model="mainTableParams.notes"
                        class="unifySize1"
                        placeholder="生产单号"
                      ></el-input> -->
                      <el-autocomplete
                        clearable
                        @keyup.enter.native="searchOrderList()"
                        v-model="mainTableParams.notes"
                        class="unifySize1"
                        :fetch-suggestions="querySearch4"
                        placeholder="请输入生产单号"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="5" :xl="3">
                    <el-form-item class="searchMargin" label="关闭：">
                      <el-select
                        clearable
                        v-model="mainTableParams.isClose"
                        class="unifySize"
                        placeholder="是否关闭"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in IsClose"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="4" :lg="2" :xl="2">
                    <el-form-item class="searchMargin" label="明细：">
                      <el-checkbox
                        value="1"
                        true-label="1"
                        false-label="0"
                        v-model="mainTableParams.isDetail"
                      ></el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="4" :xl="4">
                    <el-button
                      type="danger"
                      class="searchBtn searchMargin"
                      size="small"
                      :loading="IsSearch"
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
                class="smBtn iconBtn el-icon-plus"
                >新增</el-button
              >
              <el-button
                @click="editDbclick"
                type="primary"
                class="smBtn iconBtn el-icon-edit-outline"
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
                @click="cancelClose"
                class="smBtn iconBtn iconfont kt-icon-daoru"
                >关闭</el-button
              >
              <el-button
                type="primary"
                @click="ordrerClose"
                class="iconBtn iconfont kt-icon-caidan"
                >取消关闭</el-button
              >
              <el-button
                type="primary"
                @click="reportItem"
                class="smBtn iconBtn iconfont kt-icon-caidan"
                >报批</el-button
              >
              <!-- <el-button
                @click="Export"
                type="primary"
                class="exportBtn iconBtn iconfont kt-icon-daochu"
                >导出当前页</el-button
              >
              <el-button
                @click="ExportAll"
                type="primary"
                class="exportBtn iconBtn iconfont kt-icon-daochu"
                >导出全部</el-button
              > -->
              <el-dropdown @command="handleCommand" :hide-on-click="false">
                <el-button class="exportBtn" type="primary">
                  导出<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">导出当前页</el-dropdown-item>
                  <el-dropdown-item command="b">导出全部</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button
                type="primary"
                @click="updateOrderInfo"
                v-show="updateProduct"
                class="iconBtn2 iconfont kt-icon-caidan"
                >更新订单产品信息</el-button
              >
              <!-- <el-button type="primary" class="iconBtn iconfont kt-icon-caidan"
                >更多功能</el-button
              > -->
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <!-- 主表区域 -->
      <el-col class="mainTable">
        <el-card style="margin-top：5px">
          <vxe-grid
            border
            resizable
            stripe
            ref="mainTable"
            width="auto"
            :loading="IsSearch"
            :auto-resize="true"
            class="mytable-scrollbar"
            show-footer
            :footer-method="footerMethod"
            :footer-cell-class-name="footerCellClassName"
            show-overflow="title"
            :header-row-class-name="
              isShowDetailed ? hearderClass : hearderClass
            "
            :row-class-name="cellClass"
            :height="gridHeight"
            :columns="isShowDetailed ? columnsDetail : columns"
            @cell-dblclick="showBottomTable"
            @cell-click="cellclick"
            @checkbox-all="onAdjustmentCheckboxAllChange"
            @checkbox-change="onAdjustmentCheckboxChange"
            highlight-current-row
            :config="{ render: 'scroll' }"
            :align="'center'"
            :checkbox-config="{ highlight: true }"
            :data="paging.data"
          >
            <template #img1_default="{ row }">
              <!-- <img :src="row.缩略图 " style="width: 100px" /> -->
              <img :src="row.缩略图" style="width: 100px" />
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

    <!-- 新增 -->
    <jy-dialog
      title="电商订单管理"
      :before-close="addAialogClose"
      :close-on-click-modal="false"
      :visible.sync="addAialogVisible"
      append-to-body
      width="70%"
    >
      <!-- 表单数据 -->
      <el-form
        ref="addForm"
        :rules="addRules"
        :model="addOrderParams"
        style="font-size：14px"
        label-width="84px"
      >
        <el-row>
          <div class="formStyle">
            <el-col :span="8">
              <el-form-item
                label-width="70px"
                prop="contractCode"
                label="订单号："
              >
                <el-input
                  clearable
                  v-model="addOrderParams.contractCode"
                  class="unifySize"
                  placeholder="订单号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="shop" label="站点：">
                <el-select
                  clearable
                  v-model="addOrderParams.shop"
                  class="unifySize"
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
            <el-col :span="4">
              <el-form-item
                prop="currency"
                style="margin-bottom: 0px"
                label-width="60px"
                label="币种："
              >
                <el-select
                  clearable
                  v-model="addOrderParams.currency"
                  class="unifySize"
                  placeholder="币种"
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
            <el-col :span="5">
              <el-form-item prop="cDate" label="下单日期：">
                <el-date-picker
                  v-model="addOrderParams.cDate"
                  class="unifySize"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </div>
          <el-col :span="24" style="height: 80px; margin-top: 10px">
            <!-- 文本域 -->
            <el-form-item label-width="70px" label="备注：">
              <el-input
                clearable
                v-model="addOrderParams.remark"
                type="textarea"
                :rows="2"
                placeholder="请输入备注信息"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="secondBtn">
            <el-button
              type="primary"
              @click="chooseOrder"
              class="iconBtn iconfont kt-icon-caidan"
              >选择产品</el-button
            >
            <el-button
              @click="delOrder"
              type="primary"
              class="delBtn iconBtn el-icon-delete"
              >删除</el-button
            >
          </el-col>
          <el-col class="addheight">
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
              :edit-rules="validRules"
              class="mytable-scrollbar"
              :header-cell-class-name="hearderClass"
              :row-class-name="cellClassAdd"
              height="580"
              highlight-current-row
              @checkbox-change="onAddCheckboxChange"
              @checkbox-all="onAddCheckboxAllChange"
              :edit-config="{
                trigger: 'click',
                mode: 'cell',
              }"
              :align="'center'"
              :checkbox-config="{
                highlight: true,
              }"
              :columns="IsChina ? y_columns : r_columns"
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
              :loading="saveBtnLoading"
              @click="saveOrder"
              class="saveBtn iconfont kt-icon-baocun"
              >保存</el-button
            >
            <el-button
              type="primary"
              @click="addAialogVisible = false"
              class="clearBtn"
              >取消</el-button
            >
          </el-col>
        </el-row>
      </span>
    </jy-dialog>

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
        :model="chooseParams"
        style="font-size：14px"
        label-width="110px"
      >
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <el-form-item
              class="searchMargin marginR"
              style="margin-bottom: 0px"
              label="站点："
            >
              <el-select
                :disabled="!isSelectDisable"
                class="unifySize marginLeft"
                v-model="chooseParams.shopId"
                style="margin-left: -110px"
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
            <el-form-item label="产品名称/代码：">
              <el-input
                @keyup.enter.native="chooseSearch()"
                clearable
                v-model="chooseParams.strProduct"
                class="unifySize"
              ></el-input>
            </el-form-item>
            <el-form-item label="色号/颜色：">
              <el-input
                @keyup.enter.native="chooseSearch()"
                clearable
                v-model="chooseParams.color"
                class="unifySize"
              ></el-input>
            </el-form-item>
            <el-form-item class="sizeMarginLeft" width="60" label="尺寸：">
              <el-input
                @keyup.enter.native="chooseSearch()"
                clearable
                v-model="chooseParams.P_Spec"
                class="unifySize"
              ></el-input>
            </el-form-item>
            <el-button
              type="danger"
              class="searchBtn"
              :loading="loading"
              @click="chooseSearch"
              size="small"
              icon="el-icon-search"
              >查询</el-button
            >
          </el-col>
          <el-col> </el-col>
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
          height="730"
          class="mytable-scrollbar"
          :loading="loading"
          :auto-resize="true"
          @checkbox-change="onChooseCheckboxChange"
          @checkbox-all="onChooseCheckboxAllChange"
          :header-cell-class-name="hearderClass"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true }"
          :data="choosePaging.data"
        >
          <vxe-table-column type="checkbox" width="4%"></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="4%"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            width="15%"
            field="产品号"
            title="产品编码"
          ></vxe-table-column>
          <vxe-table-column
            width="15%"
            field="产品名称"
            title="产品名称"
          ></vxe-table-column>
          <vxe-table-column
            width="4%"
            field="样式"
            title="样式"
          ></vxe-table-column>
          <vxe-table-column
            width="4%"
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
            width="20%"
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
    </jy-dialog>

    <!-- 双击展示弹出层 -->
    <jy-dialog
      title="电商订单催单"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="RemindersDaialogVisible"
      width="1500px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="searchForm"
        :model="renminderTable"
        class="renminder"
        label-width="84px"
      >
        <div class="renminder">
          <el-form-item class="searchMargin" label="产品号：">
            <el-input
              @blur="inputBlur1"
              v-model="renminderTable.contractCode"
              class="unifySize marginLeft reminClass"
              placeholder="产品号"
            ></el-input>
          </el-form-item>
          <el-form-item class="searchMargin" label="样式：">
            <el-input
              @blur="inputBlur2"
              v-model="renminderTable.p_size"
              class="unifySize marginLeft reminClass"
              placeholder="样式"
            ></el-input>
          </el-form-item>
          <el-form-item class="searchMargin" label="颜色：">
            <el-input
              @blur="inputBlur3"
              v-model="renminderTable.color"
              class="unifySize marginLeft reminClass"
              placeholder="颜色"
            ></el-input>
          </el-form-item>
          <el-form-item class="searchMargin" label="尺寸：">
            <el-input
              @blur="inputBlur4"
              v-model="renminderTable.size"
              class="unifySize marginLeft reminClass"
              placeholder="尺寸"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item
            class="searchMargin"
            style="margin-bottom: 0px"
            label="状态："
          >
            <el-select
              @change="inputBlur5"
              v-model="renminderTable.status"
              class="unifySize marginLeft reminClass"
              placeholder="状态"
            >
              <el-option
                :key="index"
                v-for="(item, index) in statusList"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item> -->
        </div>
      </el-form>

      <el-col>
        <div class="tableTitle">电商订单催单</div>
        <vxe-table
          ref="leftTable"
          border
          resizable
          stripe
          keep-source
          show-footer
          @cell-click="clickSearch"
          :footer-method="leftfooterMethod"
          :footer-cell-class-name="footerCellClassName"
          show-overflow
          height="420"
          :auto-resize="true"
          class="mytable-scrollbar"
          :edit-config="{ trigger: 'click', mode: 'cell' }"
          :header-cell-class-name="hearderClass"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true }"
          :data="bottomTableLeft"
        >
          <vxe-table-column
            :class-name="cellChooseClassLeft"
            fixed="left"
            type="seq"
            min-width="45"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            :align="'left'"
            :class-name="cellChooseClassLeft"
            fixed="left"
            min-width="210"
            field="订单编号"
            title="订单号"
          ></vxe-table-column>
          <vxe-table-column
            :class-name="cellChooseClassLeft"
            fixed="left"
            min-width="210"
            field="产品号"
            title="产品编码"
          >
            <template slot-scope="{ row }">
              <span>{{ row.产品号 }}</span>
              <br />
              <span>{{ row.产品名称 }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            :class-name="cellChooseClassLeft"
            min-width="60"
            field="样式"
            title="样式"
          ></vxe-table-column>
          <vxe-table-column
            :class-name="cellChooseClassLeft"
            min-width="60"
            field="色号"
            title="色号"
          >
            <template slot-scope="{ row }">
              <span>{{ row.色号 }}</span>
              <br />
              <span>{{ row.颜色 }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            :class-name="cellChooseClassLeft"
            min-width="95"
            field="尺寸"
            title="尺寸"
          >
            <template slot-scope="{ row }">
              <span>{{ row.尺寸 }}</span>
              <br />
              <span>{{ row.尺寸单位名称 }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-colgroup title="订单数量">
            <vxe-table-column
              min-width="60"
              :class-name="cellChooseClassLeft"
              field="原始数量"
              title="原始"
            >
              <template slot-scope="{ row }">
                <span>{{ row.原始数量 }}</span>
                <br />
                <span>{{ row.单位名称 }}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column
              :class-name="cellChooseClassLeft"
              min-width="70"
              :edit-render="{
                name: 'input',
                attrs: { type: 'text' },
                autoselect: true,
              }"
              field="取消数量"
              title="取消"
            >
              <template v-slot:edit="{ row }">
                <vxe-input
                  type="number"
                  :min="0"
                  v-model="row.取消数量"
                  @blur="ptypeBlurEvent(row)"
                ></vxe-input>
              </template>
            </vxe-table-column>
            <vxe-table-column
              :class-name="cellChooseClassLeft"
              min-width="60"
              field="数量"
              title="实际"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="生产下单数量">
            <vxe-table-column
              min-width="60"
              :class-name="cellChooseClassLeft"
              field="待下单数"
              title="待下"
            ></vxe-table-column>
            <vxe-table-column
              :class-name="cellChooseClassLeft"
              min-width="60"
              field="已下单数"
              title="已下"
            ></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="催单数量">
            <vxe-table-column
              :class-name="cellChooseClassLeft"
              min-width="60"
              field="急需下单数"
              title="累计"
            ></vxe-table-column>
            <vxe-table-column
              min-width="60"
              :class-name="cellChooseClassLeft"
              :edit-render="{
                name: 'input',
                attrs: { type: 'text' },
                autoselect: true,
              }"
              field="本次催单"
              title="本次"
            >
              <template v-slot:edit="{ row }">
                <vxe-input
                  type="number"
                  :min="0"
                  v-model="row.本次催单"
                ></vxe-input>
              </template>
            </vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-column
            min-width="73"
            :class-name="cellChooseClassLeft"
            field="优先级"
            title="优先级"
            :edit-render="{
              name: 'select',
              options: priorityList,
              autoselect: true,
            }"
          >
          </vxe-table-column>
          <vxe-table-column
            min-width="100"
            :class-name="cellChooseClassLeft"
            :edit-render="{
              name: 'input',
              attrs: { type: 'text' },
              autoselect: true,
            }"
            field="备注"
            title="备注"
          ></vxe-table-column>
          <vxe-table-column
            :class-name="cellChooseClassLeft"
            min-width="50"
            field="关闭"
            title="关闭"
          ></vxe-table-column>
          <vxe-table-column
            :class-name="cellChooseClassLeft"
            min-width="185"
            field="操作"
            title="操作"
          >
            <template slot-scope="{ row }">
              <button class="CloseIcon" @click="iconOpen(row)">关闭</button>
              <button class="NoCloseIcon" @click="iconClose(row)">
                取消关闭
              </button>
              <button class="SaveIcon" @click="iconSave(row)">保存</button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </el-col>
      <el-col>
        <div class="tableTitle">生产信息</div>
        <vxe-table
          ref="rightTable"
          border
          resizable
          stripe
          keep-source
          :row-class-name="cellChooseClass"
          show-overflow
          height="260"
          :auto-resize="true"
          show-footer
          class="mytable-scrollbar"
          :footer-method="rightfooterMethod"
          :footer-cell-class-name="footerCellClassName"
          :header-cell-class-name="hearderClass"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true }"
          :data="bottomTableRight"
        >
          <vxe-table-column type="checkbox" min-width="40"></vxe-table-column>
          <vxe-table-column
            type="seq"
            min-width="65"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            min-width="175"
            field="生产单号"
            title="生产单号"
          ></vxe-table-column>
          <vxe-table-column
            min-width="175"
            field="产品号"
            title="产品号"
          ></vxe-table-column>
          <vxe-table-column
            min-width="175"
            field="产品名称"
            title="产品名称"
          ></vxe-table-column>
          <vxe-table-column
            min-width="100"
            field="下单日期"
            title="下单日期"
          ></vxe-table-column>
          <vxe-table-column
            min-width="100"
            field="下单片数"
            title="下单片数"
          ></vxe-table-column>
          <vxe-table-column
            min-width="100"
            field="到货片数"
            title="到货片数"
          ></vxe-table-column>
          <vxe-table-column
            min-width="100"
            field="检验片数"
            title="检验片数"
          ></vxe-table-column>
          <vxe-table-column
            min-width="100"
            field="未检验片数"
            title="未检验片数"
          ></vxe-table-column>
          <vxe-table-column
            min-width="60"
            field="关闭"
            title="关闭"
          ></vxe-table-column>
        </vxe-table>
      </el-col>
      <span slot="footer" class="dialog-footer">
        <span>
          <el-button
            type="primary"
            @click="RemindersDaialogVisible = false"
            class="CloseBtn chooseEnter"
            >关 闭</el-button
          >
        </span>
      </span>
    </jy-dialog>
    <!-- 报批弹框 -->
    <report-approval
      v-if="showReportDialog"
      ref="ReportApproval"
      @okDialog="ReportOkDialog"
    ></report-approval>
  </el-container>
</template>

<script>
import { lastObjectEachIterate } from 'xe-utils/methods'
import ReportApproval from '../../Components/ReportApproval'
import JyTableInput from '@/components/JyTableInput/index'
import JyGrid from '@/components/JyGrid'
import JyDialog from '@/components/JyDialog'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'SaleOrderManage',
  components: { ReportApproval, JyTableInput, JyGrid, JyDialog },
  data() {
    return {
      // 主表类
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      cellChooseClass: 'cellChooseClass',
      cellChooseClassLeft: 'cellChooseClassLeft',
      columnsClass: 'columnsClass',
      orderManagementList: [], //订单管理表数据
      addOrderList: [],
      addProduceList: [],
      bottomTableLeft: [],
      bottomTableRight: [],
      loading: false,
      updateList: [],
      showReportDialog: false,
      //主表订单管理表数据
      mainTableParams: {
        userCode: '',
        beginDate: '',
        endDate: '',
        contractCode: '',
        customer: '',
        bakField3: '',
        loading: '',
        destination: '',
        orderTriage: '',
        kh: '',
        type: '01',
        currency: '',
        color: '',
        p_ChnName: '',
        notes: '',
        isDetail: '0',
        isClose: '2',
        shop: '',
      },
      gridHeight: 610,
      saveBtnLoading: false,
      addRules: {
        contractCode: [
          { required: true, message: '请输入订单号', trigger: 'blur' },
        ],
        currency: [
          { required: true, message: '请选择货币类型', trigger: 'blur' },
        ],
        cDate: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        shop: [{ required: true, message: '请选择站点', trigger: 'blur' }],
      },
      y_columns: [
        { type: 'checkbox', width: '4%' },
        {
          title: '产品编码',
          field: '产品号',
          minWidth: '15%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '产品名称',
          field: '产品名称',
          minWidth: '15%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '样式',
          field: '样式',
          minWidth: '5%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '色号',
          field: '色号',
          minWidth: '4%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '颜色',
          field: '颜色',
          minWidth: '4%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '尺寸',
          field: '尺寸',
          minWidth: '5%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '尺寸单位',
          field: '尺寸单位名称',
          minWidth: '6%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '数量',
          field: '原始数量',
          minWidth: '5%',
          editRender: {
            props: {
              type: 'number',
            },
            events: {
              change: this.reminderNumBlurChinaEvent,
            },
            immediate: true,
          },
        },
        {
          title: '单位',
          field: '单位名称',
          minWidth: '4%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '取消数量',
          field: '取消数量',
          minWidth: '7%',
          editRender: {
            events: {
              change: this.reminderNumChangeEditEvent,
            },
            immediate: true,
          },
        },
        {
          title: '实际数量',
          field: '数量',
          minWidth: '7%',
          editRender: {
            props: {
              type: 'number',
            },
            immediate: true,
          },
        },
        {
          title: '备注',
          field: '备注',
          minWidth: '7%',
          editRender: {
            immediate: true,
          },
        },
      ],
      updateProduct: false,
      r_columns: [
        { type: 'checkbox', width: '4%' },
        {
          title: '产品编码',
          field: 'ProductNo',
          minWidth: '15%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '产品名称',
          field: 'chnName',
          minWidth: '15%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '样式',
          field: 'CustStyle',
          minWidth: '5%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '色号',
          field: 'ColorNo',
          minWidth: '4%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '颜色',
          field: 'Color',
          minWidth: '4%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '尺寸',
          field: 'chnSpec',
          minWidth: '5%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '尺寸单位',
          field: 'SpecUnitName',
          minWidth: '6%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '数量',
          field: '原始数量',
          minWidth: '5%',
          editRender: {
            props: {
              type: 'number',
            },
            immediate: true,
          },
        },
        {
          title: '单位',
          field: 'BoxUnitName',
          minWidth: '4%',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '取消数量',
          field: '取消数量',
          minWidth: '7%',
          editRender: {
            events: {
              change: this.reminderNumChangeEvent,
            },
            immediate: true,
          },
        },
        {
          title: '实际数量',
          field: '数量',
          minWidth: '7%',
          editRender: {
            props: {
              type: 'number',
            },
            immediate: true,
          },
        },
        {
          title: '备注',
          field: '备注',
          minWidth: '7%',
          editRender: {
            immediate: true,
          },
        },
      ],
      Bottomarr: [],
      Bottomarr4: [],
      iconShow: false,
      addAialogVisible: false,
      chooseDaialogVisible: false,
      chooseProduceList: [],
      validRules: {
        原始数量: [{ required: true, message: '数量必须填写' }],
      },
      filterList: [], //待筛选数据
      // 催单表筛选
      renminderTable: {
        contractCode: '',
        p_size: '', //样式
        color: '',
        size: '',
        status: '',
      },
      addOrderParams: {
        // 保存的参数
        userCode: '',
        contractNo: '',
        contractCode: '',
        cDate: '',
        currency: '',
        remark: '',
        strList: '',
        strMessage: '',
        orderTriage: '1',
        type: '01',
        shop: '',
        flag: '1',
      },
      currencyList: [],
      footerCellClassName: 'footerCellClassName',
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '60', title: '状态', field: '状态' },
        { width: '60', title: '关闭', field: '关闭' },
        { align: 'left', minWidth: '230', title: '订单号', field: '订单号' },
        { width: '80', title: '站点', field: '站点' },
        { width: '100', title: '下单日期', field: '下单日期' },
        { width: '60', title: '币种', field: '币种' },
        { width: '135', title: '订单数量', field: '订单数量' },
        { width: '135', title: '催单数', field: '催单数' },
        { width: '135', title: '生产下单数', field: '生产下单数' },
        { width: '140', title: '生产下单片数', field: '生产下单片数' },
        { width: '200', title: '部门', field: '部门' },
        { width: '100', title: '制单人', field: '制单人' },
        { width: '100', title: '制单日期', field: '制单日期' },
        { width: '120', title: '下一步操作', field: '下一步操作' },
        { width: '120', title: '下一步操作人', field: '下一步操作人' },
      ],
      columnsDetail: [
        { type: 'checkbox', width: '40', headerclassnName: 'hearderClass' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '60', title: '状态', field: '状态' },
        { width: '60', title: '关闭', field: '关闭' },
        { minWidth: '120', title: '订单号', field: '订单号' },
        { width: '80', title: '站点', field: '站点' },
        { width: '60', title: '币种', field: '币种' },
        { width: '100', title: '下单日期', field: '下单日期' },
        { minWidth: '195', title: '产品号', field: '产品号' },
        { minWidth: '220', title: '产品名称', field: '产品名称' },
        { width: '60', title: '色号', field: '色号' },
        { width: '60', title: '颜色', field: '颜色' },
        { width: '100', title: '订单数量', field: '订单数量' },
        { width: '60', title: '单位', field: '单位' },
        { width: '80', title: '订单片数', field: '订单片数' },
        { width: '80', title: '催单片数', field: '催单片数' },
        { width: '80', title: '生产数', field: '生产数' },
        { width: '80', title: '到货数', field: '到货数' },
        { width: '80', title: '检验数', field: '检验数' },
        { width: '100', title: '生产单号', field: '生产单号' },
        {
          width: '80',
          title: '缩略图',
          field: '缩略图',
          slots: { default: 'img1_default' },
        },
        { width: '80', title: '部门', field: '部门' },
        { width: '80', title: '制单人', field: '制单人' },
        { width: '100', title: '制单日期', field: '制单日期' },
        { width: '100', title: '下一步操作', field: '下一步操作' },
        { width: '110', title: '下一步操作人', field: '下一步操作人' },
      ],
      dbClick: '',
      chooseParams: {
        shopId: '01',
        strProduct: '', // 产品编码
        p_Spec: '', // 规格
        color: '', // 颜色
        contractNo: '',
        type: '',
        aType: '',
        planNo: '',
        isCpcg: '',
      },
      datetype1: '',
      statusList: [
        { value: '待催单', label: '待催单' },
        { value: '部分催单', label: '部分催单' },
        { value: '全部催单', label: '全部催单' },
      ],
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
      chooseList: [],
      orderCloseParams: {
        UserCode: '',
        ContractNo: '',
        strMessage: '',
        Type: '',
      },
      reminderSearchParams: {
        // 电商订单双击展示数据查询参数
        strMessage: '',
        usercode: '',
        orderno: '',
      },
      RemindersDaialogVisible: false,
      // 图标保存的参数
      iconSaveParams: {
        userCode: '',
        strList: '',
        strMessage: '',
      },
      paging: { list: [], data: [], limit: 100, total: null, page: 1 }, //主表分页
      choosePaging: { list: [], data: [], limit: 100, total: null, page: 1 }, //选择产品表的分页
      shopList: [],
      IsClose: [
        { value: '', label: '' },
        { value: '1', label: '是' },
        { value: '2', label: '否' },
      ],
      priorityList: [
        { label: '三星', value: '03' },
        { label: '四星', value: '04' },
        { label: '五星', value: '05' },
      ],
      delArr: [],
      isShowDetailed: false, //是否显示明细
      isSelectDisable: true,
      IsOnlyOnce: false,
      IsChina: false,
      IsSearch: false,
      columnIcon: '◇', //列分隔符
      delLength: [],
    }
  },

  methods: {
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
    // 返回输入建议的方法(订单号：)
    querySearch(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory('order-orderNo')
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 返回输入建议的方法(颜色)
    querySearch2(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory('order-color')
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 返回输入建议的方法(产品明称)
    querySearch3(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory(
        'order-productName'
      )
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 返回输入建议的方法(生产单号)
    querySearch4(queryString, cb) {
      var invoiceAccountHistory = this.getInvoiceAccountHistory('order-notes')
      var results = queryString
        ? invoiceAccountHistory.filter(this.createFilter(queryString))
        : invoiceAccountHistory
      if (results === undefined) {
        results = []
      }
      cb(results)
    },
    // 更新订单信息
    updateOrderInfo() {
      this.updateList = this.$refs.mainTable.getCheckboxRecords()
      let flag = true
      this.updateList.forEach((item) => {
        if (item.ContractNo === null || item['产品号'] === null) {
          flag = false
        }
      })
      if (flag) {
        if (this.updateList.length < 1) {
          this.$message.error('请选择数据后进行操作')
        } else {
          // 判断是否有空数据
          this.$confirm(
            '此操作会从从【产品表】更新勾选行的电商订单】，【生产单】的产品信息（产品名称，色号，颜色，样式，尺寸）。请确认是否继续操作?',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true,
            }
          ).then(() => {
            var str = ''
            this.updateList.forEach((Item) => {
              str += Item.ContractNo + this.columnIcon + Item['产品号'] + '◆'
            })
            // 调接口同步产品信息
            this.$api.order
              .TdContractSynchro({ strlist: str })
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
                  this.getOrderList()
                }
              })
              .catch((err) => console.log(err))
          })
        }
      } else {
        this.$message.error('存在数据的产品号或订单号为空，请检查!')
      }
    },
    handleCommand(command) {
      if (command === 'a') {
        this.Export()
      } else {
        this.ExportAll()
      }
    },
    Export() {
      const ws = XLSX.utils.json_to_sheet(this.paging.data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
      XLSX.writeFile(wb, '电商订单.xls', {
        bookType: 'xls',
        bookSST: false,
        type: 'array',
      })
    },
    // 导出Excel表格
    ExportAll() {
      //this.$refs.mainTable.exportData({ type: 'csv' })
      const ws = XLSX.utils.json_to_sheet(this.orderManagementList)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
      XLSX.writeFile(wb, '电商订单.xls', {
        bookType: 'xls',
        bookSST: false,
        type: 'array',
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
        var ID = data[0].ContractNo
        this.showReportDialog = true
        this.$nextTick(() => {
          this.$refs.ReportApproval.formInfo.ObjectCode = '0101'
          this.$refs.ReportApproval.formInfo.Key = ID
          this.$refs.ReportApproval.showDialog = true
        })
      }
    },
    cellClassAdd(row) {
      if (row.row.取消数量 === '') {
        if (row.row['原始数量'] === '') {
          return 'cellClassAdd'
        } else {
          return 'cellClass'
        }
      } else if (row.row.取消数量 === '0') {
        if (row.row['原始数量'] === '') {
          return 'cellClassAdd'
        } else {
          return 'cellClass'
        }
      } else {
        return 'cellClass'
      }
    },
    //报批完成后
    ReportOkDialog() {
      this.getOrderList()
    },
    // 底部查询条件blur事件
    inputBlur1() {
      this.select()
    },
    inputBlur2() {
      this.select()
    },
    inputBlur3() {
      this.select()
    },
    inputBlur4() {
      this.select()
    },
    inputBlur5() {
      this.select()
    },
    select() {
      var filterArr = []
      if (this.renminderTable.contractCode === '') {
        // this.bottomTableLeft = this.filterList
        if (this.renminderTable.p_size !== '') {
          filterArr = this.filterList.filter((item) => {
            return item.样式 === this.renminderTable.p_size
          })
          if (this.renminderTable.color !== '') {
            filterArr = filterArr.filter((item) => {
              return item.颜色 === this.renminderTable.color
            })
            // this.bottomTableLeft = filterArr
            if (this.renminderTable.size !== '') {
              filterArr = filterArr.filter((item) => {
                if (item.尺寸.includes(this.renminderTable.size)) {
                  return item
                }
              })
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            } else {
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            }
          } else {
            if (this.renminderTable.size !== '') {
              filterArr = filterArr.filter((item) => {
                if (item.尺寸.includes(this.renminderTable.size)) {
                  return item
                }
              })
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            } else {
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            }
          }
        } else {
          filterArr = this.filterList
          if (this.renminderTable.color !== '') {
            filterArr = filterArr.filter((item) => {
              return item.颜色 === this.renminderTable.color
            })
            // this.bottomTableLeft = filterArr
            if (this.renminderTable.size !== '') {
              filterArr = filterArr.filter((item) => {
                if (item.尺寸.includes(this.renminderTable.size)) {
                  return item
                }
              })
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            } else {
              this.bottomTableLeft = filterArr
            }
          } else {
            if (this.renminderTable.size !== '') {
              filterArr = filterArr.filter((item) => {
                if (item.尺寸.includes(this.renminderTable.size)) {
                  return item
                }
              })
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            } else {
              switch (this.renminderTable.status) {
                case '待催单':
                  filterArr = filterArr.filter((item) => {
                    if (item.急需下单数 === null || item.急需下单数 === 0) {
                      return item
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '部分催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 < item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                  break
                case '全部催单':
                  filterArr = filterArr.filter((item) => {
                    if (
                      item.急需下单数 > item.数量 &&
                      item.急需下单数 !== null &&
                      item.急需下单数 !== 0
                    ) {
                      this.bottomTableLeft = []
                      return
                    }
                  })
                  this.bottomTableLeft = filterArr
                default:
                  this.bottomTableLeft = filterArr
                  break
              }
            }
          }
        }
      } else {
        this.Bottomarr4 = this.filterList.filter((item) => {
          if (item.产品号.trim() === this.renminderTable.contractCode) {
            return this.Bottomarr4
          }
          this.bottomTableLeft = this.Bottomarr4
        })
      }
    },
    // 关闭选择产品信息前的回调
    delOrder() {
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
              let nullObj = {
                ProductNo: '',
                chnName: '',
                CustStyle: '',
                ColorNo: '',
                Color: '',
                chnSpec: '',
                BoxUnit: '',
                SpecUnitName: '',
                原始数量: '',
                取消数量: '',
                数量: '',
                备注: '',
              }
              this.addProduceList[0] = nullObj
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
    // 点击催单表查找底部表格数据
    clickSearch(row) {
      var str = '666\r666'
      console.log(str)
      this.$api.order
        .clickSearch({ OrderNo: row.row.订单号, ProductNO: row.row.产品号 })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.bottomTableRight = res.data
          }
        })
        .catch((err) => {
          this.$message({
            message: err,
            type: 'error',
          })
        })
    },
    // 数量编辑框数去焦点
    reminderNumBlurEvent() {
      // if (row.取消数量 === '') {
      //   if (Number(row.数量) === NaN) {
      //     Number(row.数量) === 0
      //   }
      //   row.原始数量 = Number(row.数量)
      // } else {
      //   row.原始数量 = Number(row.数量) - Number(row.取消数量)
      // }
      this.addProduceList.forEach((item) => {
        item.数量 = item.原始数量
      })
    },
    reminderNumBlurChinaEvent() {
      this.addProduceList.forEach((item) => {
        if (item.取消数量 === '') {
          item.数量 = item.原始数量
        } else {
          item.数量 = Number(item.原始数量) - Number(item.取消数量)
        }
      })
    },
    reminderBlurEvent(row) {
      row.数量 = Number(row.原始数量) - Number(row.取消数量)
    },
    reminderNumChangeEvent() {
      this.addProduceList.forEach((item) => {
        item.取消数量 = ''
      })
    },
    reminderNumChangeEditEvent() {
      console.log(this.delLength[0])
      if (this.delLength[0].状态 === '新制') {
        this.addProduceList.forEach((item) => {
          item.取消数量 = ''
        })
      } else {
        this.addProduceList.forEach((item) => {
          item.数量 = Number(item.原始数量) - Number(item.取消数量)
        })
      }
    },
    // 根据图标保存
    iconSave(row) {
      if (row.本次催单 === undefined) {
        row.本次催单 = ''
      }
      this.$confirm('此操作保存该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        this.iconSaveParams.strList =
          row.订单号 +
          this.columnIcon +
          row.序号 +
          this.columnIcon +
          row.原始数量 +
          this.columnIcon +
          row.取消数量 +
          this.columnIcon +
          row.数量 +
          this.columnIcon +
          row.本次催单 +
          this.columnIcon +
          row.优先级 +
          this.columnIcon +
          row.备注 +
          '◆'
        this.$api.order
          .iconSave({ model: { ...this.iconSaveParams } })
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
              this.$api.order
                .reminderLeftSearch({ ContractNo: this.dbClick })
                .then((res) => {
                  if (res.statusCode !== 200) {
                    this.$message({
                      message: res.message,
                      type: 'error',
                    })
                  } else {
                    this.bottomTableLeft = res.data
                    this.filterList = res.data
                  }
                })
                .catch((err) => console.log(err))
              this.$api.order
                .reminderSearch({ model: { ...this.reminderSearchParams } })
                .then((res) => {
                  if (res.statusCode !== 200) {
                    this.$message({
                      message: res.message,
                      type: 'error',
                    })
                  } else {
                    this.bottomTableRight = res.data
                  }
                })
                .catch((err) => console.log(err))
            }
          })
          .catch((err) => console.log(err))
      })
    },
    // 根据图标打开
    iconClose(row) {
      this.$confirm('此操作将关闭该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        this.$api.reminder
          .ECTdContractClose({
            model: {
              UserCode: '',
              ContractNo: row.订单号,
              strMessage: '',
              Type: '0',
              Num: row.序号,
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
                message: res.data[0].Message,
                type: 'success',
              })
              this.$api.order
                .reminderLeftSearch({ ContractNo: this.dbClick })
                .then((res) => {
                  if (res.statusCode !== 200) {
                    this.$message({
                      message: res.message,
                      type: 'error',
                    })
                  } else {
                    this.bottomTableLeft = res.data
                    this.filterList = res.data
                  }
                })
                .catch((err) => console.log(err))
              this.$api.order
                .reminderSearch({ model: { ...this.reminderSearchParams } })
                .then((res) => {
                  if (res.statusCode !== 200) {
                    this.$message({
                      message: res.message,
                      type: 'error',
                    })
                  } else {
                    this.bottomTableRight = res.data
                  }
                })
                .catch((err) => console.log(err))
            }
          })
          .catch((err) => {
            this.$message({
              message: err,
              type: 'error',
            })
          })
      })
    },
    // 根据图标关闭当前行
    iconOpen(row) {
      console.log(row)
      this.$confirm('此操作将关闭该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        this.$api.reminder
          .ECTdContractClose({
            model: {
              UserCode: '',
              ContractNo: row.订单号,
              strMessage: '',
              Type: '1',
              Num: row.序号,
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
                message: res.data[0].Message,
                type: 'success',
              })
              this.$api.order
                .reminderLeftSearch({ ContractNo: this.dbClick })
                .then((res) => {
                  if (res.statusCode !== 200) {
                    this.$message({
                      message: res.message,
                      type: 'error',
                    })
                  } else {
                    this.bottomTableLeft = res.data
                    this.filterList = res.data
                  }
                })
                .catch((err) => console.log(err))
              this.$api.order
                .reminderSearch({ model: { ...this.reminderSearchParams } })
                .then((res) => {
                  if (res.statusCode !== 200) {
                    this.$message({
                      message: res.message,
                      type: 'error',
                    })
                  } else {
                    this.bottomTableRight = res.data
                  }
                })
                .catch((err) => console.log(err))
            }
          })
          .catch((err) => console.log(err))
      })
    },
    // 底部区域
    ptypeBlurEvent(row) {
      row.数量 = Number(row.原始数量) - Number(row.取消数量)
    },
    // 双击显示底部表格
    showBottomTable(row) {
      this.RemindersDaialogVisible = true
      this.dbClick = row.row.ContractNo.trim()
      this.reminderSearchParams.orderno = row.row.ContractNo.trim()
      this.$api.order
        .reminderLeftSearch({ ContractNo: this.dbClick })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.bottomTableLeft = res.data
            this.bottomTableLeft.forEach((item) => {
              item.本次催单 = ''
            })
            this.filterList = res.data
          }
        })
        .catch((err) => console.log(err))
      this.$api.order
        .reminderSearch({ model: { ...this.reminderSearchParams } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.bottomTableRight = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    // 关闭
    cancelClose() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.delLength.length < 1) {
        this.$message({
          message: '请选择关闭项',
          type: 'error',
        })
      } else {
        this.orderCloseParams.Type = '1'
        if (this.delLength.length > 1) {
          this.$message({
            message: '每次只能取消关闭一条',
            type: 'error',
          })
        } else {
          this.orderCloseParams.ContractNo = this.delLength[0].ContractNo
          this.$api.order
            .orderClose(this.orderCloseParams)
            .then((res) => {
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.getOrderList()
                this.delLength = []
                if (res.data[0].intRetVal === -1) {
                  this.$message({
                    message: res.data[0].Message,
                    type: 'error',
                  })
                } else {
                  this.$message({
                    message: res.data[0].Message,
                    type: 'success',
                  })
                }
              }
            })
            .catch((err) => console.log(err))
        }
      }
    },
    // 订单取消关闭
    ordrerClose() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.delLength.length < 1) {
        this.$message({
          message: '请选择取消关闭项',
          type: 'error',
        })
      } else {
        this.orderCloseParams.Type = '0'
        if (this.delLength.length > 1) {
          this.$message({
            message: '每次只能关闭一条',
            type: 'error',
          })
        } else {
          this.orderCloseParams.ContractNo = this.delLength[0].ContractNo
          this.$api.order
            .orderClose(this.orderCloseParams)
            .then((res) => {
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.data[0].Message,
                  type: 'error',
                })
              } else {
                this.getOrderList()
                this.delLength = []
                if (res.data[0].intRetVal === -1) {
                  this.$message({
                    message: res.data[0].Message,
                    type: 'error',
                  })
                } else {
                  this.$message({
                    message: res.data[0].Message,
                    type: 'success',
                  })
                }
              }
            })
            .catch((err) => console.log(err))
        }
      }
    },
    Del() {
      this.delLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.delLength.length < 1) {
        this.$message({
          message: '请选择删除项',
          type: 'error',
        })
      } else {
        this.IsChina = true
        if (this.delLength.length > 1) {
          this.$message({
            message: '每次只能删除一条',
            type: 'error',
          })
        } else {
          this.$confirm('即将进行删除操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
          }).then(() => {
            this.$api.order
              .delOrder({ ContractNo: this.delLength[0].ContractNo })
              .then((res) => {
                if (res.statusCode !== 200) {
                  this.$message({
                    message: res.message,
                    type: 'error',
                  })
                } else {
                  this.$message({
                    message: res.data[0].Message,
                    type: 'success',
                  })
                  this.getOrderList()
                }
              })
              .catch((err) => {
                this.$message({
                  message: err,
                  type: 'success',
                })
              })
          })
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
        this.IsChina = true
        if (this.delLength.length > 1) {
          this.$message({
            message: '每次只能编辑一条',
            type: 'error',
          })
        } else {
          this.addAialogVisible = true
          this.$api.order
            .getMainList({ ContractNo: this.delLength[0].ContractNo })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.addProduceList = res.data
                this.addProduceList.forEach((item) => {
                  item.ProductNo = item.产品号
                  item.chnName = item.产品名称
                  item.CustStyle = item.样式
                  item.ColorNo = item.色号
                  item.Color = item.颜色
                  item.chnSpec = item.尺寸
                  item.SpecUnitName = item.尺寸单位名称
                  item.SpecUnit = item.尺寸单位
                  item.BoxUnitName = item.单位名称
                  item.BoxUnit = item.单位
                })
                this.$api.order
                  .getMainInfo({ ContractNo: this.delLength[0].ContractNo })
                  .then((res) => {
                    if (res.statusCode !== 200) {
                      this.$message({
                        message: res.message,
                        type: 'error',
                      })
                    } else {
                      this.addOrderParams.contractCode =
                        res.data[0].ContractCode
                      this.addOrderParams.currency = res.data[0].Currency
                      this.addOrderParams.contractNo = res.data[0].ContractNo
                      this.addOrderParams.remark = res.data[0].Remark
                      this.addOrderParams.cDate = res.data[0].InputDate
                      this.addOrderParams.shop = res.data[0].Shop
                    }
                  })
                  .catch((err) => console.log(err))
              }
            })
            .catch((err) => console.log(err))
        }
      }
    },

    // 保存订单
    async saveOrder() {
      var flag = true
      this.addProduceList.forEach((item) => {
        if (item.原始数量 === '') {
          flag = false
        }
      })
      if (flag) {
        this.addProduceList.forEach((item) => {
          if (item.SpecUnit === undefined) {
            item.SpecUnit = ''
          }
          if (item.BoxUnit === undefined) {
            item.BoxUnit = ''
          }
        })
        this.$refs.addForm.validate((valid) => {
          if (!valid) return //文本域校验，必填项
          if (!this.IsChina) {
            this.saveBtnLoading = true
            var strlist = ''
            for (var i = 0; i <= this.addProduceList.length - 1; i++) {
              if (this.addProduceList[i].ProductNo !== '') {
                this.$set(this.addProduceList[i], '备注', '')
                strlist +=
                  Number(i + 1) +
                  this.columnIcon +
                  this.addProduceList[i].ProductNo +
                  this.columnIcon +
                  this.addProduceList[i].chnName +
                  this.columnIcon +
                  this.addProduceList[i].CustStyle +
                  this.columnIcon +
                  this.addProduceList[i].chnSpec +
                  this.columnIcon +
                  this.addProduceList[i].SpecUnit +
                  this.columnIcon +
                  this.addProduceList[i].SpecUnitName +
                  this.columnIcon +
                  this.addProduceList[i].ColorNo +
                  this.columnIcon +
                  this.addProduceList[i].Color +
                  this.columnIcon +
                  this.addProduceList[i].原始数量 +
                  this.columnIcon +
                  this.addProduceList[i].取消数量 +
                  this.columnIcon +
                  this.addProduceList[i].数量 +
                  this.columnIcon +
                  this.addProduceList[i].BoxUnit +
                  this.columnIcon +
                  this.addProduceList[i].BoxUnitName +
                  this.columnIcon +
                  this.columnIcon +
                  this.columnIcon +
                  this.columnIcon +
                  this.columnIcon +
                  'JL001' +
                  this.columnIcon +
                  this.columnIcon +
                  this.addProduceList[i].备注 +
                  this.columnIcon +
                  this.columnIcon +
                  '◆'
              }
            }
            this.addOrderParams.contractNo = ''
            this.addOrderParams.strList = strlist
            this.$api.order
              .saveOrder({ model: { ...this.addOrderParams } })
              .then((res) => {
                if (res.statusCode !== 200) {
                  this.$message({
                    message: res.message,
                    type: 'error',
                  })
                  this.saveBtnLoading = false
                } else {
                  this.$message({
                    message: res.data[0].Message,
                    type: 'success',
                  })
                  this.getOrderList()
                  this.delLength = []
                  this.saveBtnLoading = false
                  this.addAialogVisible = false
                }
              })
              .catch((err) => {
                this.saveBtnLoading = false
                console.log(err)
              })
              .finally(() => {
                this.saveBtnLoading = false
              })
          } else {
            this.saveBtnLoading = true
            var strlist = ''
            this.addProduceList.forEach((item) => {
              if (item.尺寸单位 === undefined) {
                item.尺寸单位 = ''
              }
              if (item.单位 === undefined) {
                item.单位 = ''
              }
            })
            for (var i = 0; i <= this.addProduceList.length - 1; i++) {
              if (this.addProduceList[i].ProductNo !== '') {
                this.$set(this.addProduceList[i], '备注', '')
                strlist +=
                  Number(i + 1) +
                  this.columnIcon +
                  this.addProduceList[i].产品号.trim() +
                  this.columnIcon +
                  this.addProduceList[i].产品名称 +
                  this.columnIcon +
                  this.addProduceList[i].样式 +
                  this.columnIcon +
                  this.addProduceList[i].尺寸 +
                  this.columnIcon +
                  this.addProduceList[i].尺寸单位 +
                  this.columnIcon +
                  this.addProduceList[i].尺寸单位名称 +
                  this.columnIcon +
                  this.addProduceList[i].色号 +
                  this.columnIcon +
                  this.addProduceList[i].颜色 +
                  this.columnIcon +
                  this.addProduceList[i].原始数量 +
                  this.columnIcon +
                  this.addProduceList[i].取消数量 +
                  this.columnIcon +
                  this.addProduceList[i].数量 +
                  this.columnIcon +
                  this.addProduceList[i].单位 +
                  this.columnIcon +
                  this.addProduceList[i].单位名称 +
                  this.columnIcon +
                  this.columnIcon +
                  this.columnIcon +
                  this.columnIcon +
                  this.columnIcon +
                  'JL001' +
                  this.columnIcon +
                  this.columnIcon +
                  this.addProduceList[i].备注 +
                  this.columnIcon +
                  this.columnIcon +
                  '◆'
              }
            }
            this.addOrderParams.strList = strlist
            this.$api.order
              .saveOrder({ model: { ...this.addOrderParams } })
              .then((res) => {
                if (res.statusCode !== 200) {
                  this.$message({
                    message: res.message,
                    type: 'error',
                  })
                  this.saveBtnLoading = false
                } else {
                  this.$message({
                    message: res.data[0].Message,
                    type: 'success',
                  })
                  this.saveBtnLoading = false
                  this.getOrderList()
                  this.delLength = []
                  this.addAialogVisible = false
                }
              })
              .catch((err) => {
                this.saveBtnLoading = false
                console.log(err)
              })
              .finally(() => {
                this.saveBtnLoading = false
              })
          }
        })
      } else {
        this.$message.error('数量为必填项')
      }
    },
    // 通过产品编码内图标选择产品
    iconChooseProduct() {
      this.IsOnlyOnce = true
      this.chooseDaialogVisible = true
      this.isSelectDisable = false
      this.chooseParams.shopId = this.addOrderParams.shop
      this.$api.business
        .ChooseProduct({ model: { ...this.chooseParams } })
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
        .catch((err) => console.log(err))
    },
    // 通过图标增加行
    iconAddProduct() {
      this.isSelectDisable = false
      if (
        this.addProduceList[this.addProduceList.length - 1].ProductNo !== ''
      ) {
        let nullObj = { ProductNo: '' }
        this.addProduceList.push(nullObj)
      } else {
        this.$message({
          message: '请点击“选择产品”按钮或”产品编码“下方的蓝色选择产品图标',
          type: 'error',
        })
      }
    },
    // 通过图标删除当前行
    iconDelProduct(row) {
      let Index = this.addProduceList.findIndex((item) => {
        return item.ProductNo == row.ProductNo
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
            this.addProduceList.push({ ProductNo: '' })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    IconShow() {
      this.iconShow = !this.iconShow
    },
    // 新增弹出框关闭前的回调
    addAialogClose() {
      this.addOrderParams.contractCode = ''
      this.addOrderParams.currency = ''
      this.$set(this.addOrderParams, 'shop', this.shopList[0].Name)
      this.addOrderParams.remark = ''
      this.getNowDate()
      this.addProduceList = [{ ProductNo: '' }]
      this.addAialogVisible = false
    },
    // 选择弹出框关闭前的回调
    choooseClose() {
      this.chooseList = []
      this.chooseParams.strProduct = ''
      this.chooseParams.p_Spec = ''
      this.chooseParams.color = ''
      this.isSelectDisable = true
    },
    //点击单元格
    cellclick(data) {
      if (data.columnIndex != 0) {
        this.$refs.mainTable.setAllCheckboxRow(false)
        this.$refs.mainTable.setCheckboxRow(data.row, true)
      }
    },
    // 增加
    addOrder() {
      this.addOrderParams.contractCode = ''
      this.addOrderParams.currency = ''
      this.addOrderParams.shop = ''
      this.addOrderParams.remark = ''
      this.addProduceList = []
      this.IsChina = false
      this.addAialogVisible = true
      let nullObj = {
        ProductNo: '',
        chnName: '',
        CustStyle: '',
        ColorNo: '',
        Color: '',
        chnSpec: '',
        BoxUnit: '',
        SpecUnitName: '',
        原始数量: '',
        取消数量: '',
        数量: '',
        备注: '',
      }
      this.addProduceList[0] = nullObj
    },
    searchOrderList() {
      this.paging.data = []
      this.handleSearchHistory(
        'order-orderNo',
        this.mainTableParams.contractCode
      )
      this.handleSearchHistory('order-color', this.mainTableParams.color)
      this.handleSearchHistory('order-productName', this.mainTableParams.kh)
      this.handleSearchHistory('order-notes', this.mainTableParams.notes)
      this.IsSearch = true
      if (this.mainTableParams.isDetail === '1') {
        this.isShowDetailed = true
        this.getOrderList()
        this.delLength = []
      } else {
        this.isShowDetailed = false
        this.getOrderList()
        this.delLength = []
      }
    },
    chooseProduct() {
      if (this.IsOnlyOnce === true && this.chooseList.length !== 1) {
        this.$message({
          type: 'error',
          message: '通过图标进入此界面，每次只能加一条产品',
        })
      } else {
        this.chooseList = this.$refs.chooseTable.getCheckboxRecords()
        let concatArr = this.chooseList.concat(this.addProduceList)
        function deWeight(arr) {
          for (var i = 0; i < arr.length - 1; i++) {
            for (var j = i + 1; j < arr.length; j++) {
              if (arr[i].产品号 == arr[j].产品号) {
                arr.splice(i, 1)
                j--
                //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
              }
            }
          }
          return arr
        }
        var newArr = deWeight(concatArr)
        var addProduce = []
        addProduce = newArr
        let chooseInfoParams = []
        if (newArr.length < 1) {
          this.$message({
            message: '请勾选添加项',
            type: 'error',
          })
        } else {
          if (!this.IsChina) {
            console.log('555')
            addProduce.forEach((item) => {
              if (item.产品号 !== undefined) {
                chooseInfoParams.push(item.产品号)
              }
            })
          } else {
            console.log('666')
            this.chooseList = this.$refs.chooseTable.getCheckboxRecords()
            this.chooseList.forEach((item) => {
              chooseInfoParams.push(item.产品号)
            })
          }

          console.log(chooseInfoParams)
          this.$api.order
            .ProductInfo({ ProductNoList: chooseInfoParams })
            .then((res) => {
              if (res.statusCode < 0) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                console.log(res.data)
                res.data.forEach((item) => {
                  this.$set(item, '原始数量', '')
                  this.$set(item, '取消数量', '')
                  this.$set(item, '数量', '')
                  this.$set(item, '备注', '')
                })
                this.addProduceList = res.data.concat(this.addProduceList)
                var flag = false //判断是否重复
                console.log(this.addProduceList)
                for (var i = 0; i < this.addProduceList.length - 1; i++) {
                  for (var j = i + 1; j < this.addProduceList.length; j++) {
                    if (
                      this.addProduceList[i].ProductNo ==
                      this.addProduceList[j].ProductNo
                    ) {
                      flag = true
                      this.addProduceList.splice(i, 1)
                      j--
                      //因为数组长度i减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
                    }
                  }
                }
                if (flag) {
                  this.$message.error('有重复勾选项，已删除')
                  flag = false
                }
                if (this.IsChina) {
                  this.addProduceList.forEach((item) => {
                    if (item.产品号) {
                      return
                    } else {
                      item.产品号 = item.ProductNo
                      item.产品名称 = item.chnName
                      item.样式 = item.CustStyle
                      item.色号 = item.ColorNo
                      item.颜色 = item.Color
                      item.尺寸 = item.chnSpec
                      item.尺寸单位名称 = item.SpecUnitName
                      item.尺寸单位 = item.SpecUnit
                      item.单位名称 = item.BoxUnitName
                      item.单位 = item.BoxUnit
                      this.$set(item, '原始数量', '')
                      this.$set(item, '取消数量', '')
                      this.$set(item, '数量', '')
                      this.$set(item, '备注', '')
                    }
                  })

                  this.addProduceList = deWeight(this.addProduceList)
                }
                // var fanLength = this.addProduceList.length
                // if (preLength !== fanLength) {
                //   this.$message({
                //     message: '有重复勾选项，已删除',
                //     type: 'error',
                //   })
                // }
                // console.log(this.addProduceList)
                if (
                  this.addProduceList[this.addProduceList.length - 1]
                    .ProductNo === ''
                ) {
                  this.addProduceList.splice(this.addProduceList.length - 1, 1)
                  // console.log(this.addProduceList)
                }
              }
            })
            .catch((err) => console.log(err))
        }
        this.chooseList = []
        chooseInfoParams = []
        this.chooseDaialogVisible = false
      }
    },
    // 查询产品
    chooseSearch() {
      this.chooseOrder()
    },
    // 获取订单管理列表
    getOrderList() {
      this.$api.order
        .Order({ model: { ...this.mainTableParams } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.orderManagementList = res.data
            if (this.mainTableParams.isDetail === '1') {
              this.updateProduct = true
            } else {
              this.updateProduct = false
            }
            this.pageList()
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.IsSearch = false
        })
    },
    onChooseCheckboxChange(row) {
      if (row.checked) {
        if (this.IsOnlyOnce === true && row.records.length !== 1) {
          this.$message({
            message: '通过图标进入此界面，每次只能加一条产品!',
            type: 'error',
          })
        }
        this.chooseList = this.$refs.chooseTable.getCheckboxRecords()
      } else {
        this.chooseList = this.$refs.chooseTable.getCheckboxRecords()
      }
    },
    onChooseCheckboxAllChange(row) {
      if (row.checked) {
        if (this.IsOnlyOnce === true && row.records.length !== 1) {
          this.$message({
            message: '通过图标进入此界面，每次只能加一条产品!',
            type: 'error',
          })
        }
        this.chooseList = this.$refs.chooseTable.getCheckboxRecords()
      } else {
        this.chooseList = []
      }
    },
    chooseOrder() {
      this.chooseDaialogVisible = true
      this.isSelectDisable = false
      this.IsOnlyOnce = false
      this.choosePaging.data = []
      this.loading = true
      this.chooseParams.shopId = this.addOrderParams.shop
      this.$api.business
        .ChooseProduct({ model: { ...this.chooseParams } })
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
        .catch((err) => console.log(err))
        .finally(() => {
          this.loading = false
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
            case '订单数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].订单数量)
              }
              return sums
            case '催单数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].催单数)
              }
              return sums
            case '生产下单数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].生产下单数)
              }
              return sums
            case '生产下单片数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].生产下单片数)
              }
              return sums
            case '订单片数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].订单片数)
              }
              return sums
            case '催单片数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].催单片数)
              }
              return sums
            case '生产数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].生产数)
              }
              return sums
            case '到货数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].到货数)
              }
              return sums
            case '检验数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].检验数)
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    // 底部左侧表尾合计
    leftfooterMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          }
          switch (column.property) {
            case '数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].数量)
              }
              return sums
          }
          switch (column.property) {
            case '取消数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].取消数量)
              }
              return sums
          }
          switch (column.property) {
            case '原始数量':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].原始数量)
              }
              return sums
          }
          switch (column.property) {
            case '急需下单数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].急需下单数)
              }
              return sums
          }
          switch (column.property) {
            case '待下单数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].待下单数)
              }
              return sums
          }
          switch (column.property) {
            case '已下单数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].已下单数)
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },
    // 底部右侧表尾合计
    rightfooterMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          }
          switch (column.property) {
            case '下单片数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].下单片数)
              }
              return sums
          }
          switch (column.property) {
            case '到货片数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].到货片数)
              }
              return sums
          }
          switch (column.property) {
            case '检验片数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].检验片数)
              }
              return sums
          }
          switch (column.property) {
            case '未检验片数':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].未检验片数)
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
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
    // 主表全选触发
    onAdjustmentCheckboxAllChange(row) {
      if (row.checked) {
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
      } else {
        this.delLength = []
      }
    },
    // 主表选择框状态改变触发
    onAdjustmentCheckboxChange(row) {
      if (row.checked) {
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
      } else {
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
      }
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
            this.$set(this.addOrderParams, 'shop', this.shopList[0].Name)
            this.resize()
          }
        })
        .catch((err) => console.log(err))
    },
    // 获取货币列表
    addProductCurrency() {
      this.$api.publicApi
        .bcCurrency()
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.data.message,
              type: 'error',
            })
          } else {
            this.currencyList = res.data
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
      this.$set(this.mainTableParams, 'endDate', toMonth)
      this.$set(this.addOrderParams, 'cDate', toMonth)
      this.$set(this.mainTableParams, 'beginDate', startTime)
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
  created() {
    this.addProductState()
    this.getNowDate()
    this.addProductCurrency()
    this.getOrderList()
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
  margin-top: 5px;
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
  background: #d1f3ff;
  height: 30px;
}
.searchBtn {
  width: 70px !important;
  height: 30px !important;
  line-height: 10px;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 22px;
}
.mainTable .el-card {
  height: 100%;
}

.delBtn {
  width: 70px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
.exportBtn {
  height: 32px;
  border-radius: 2px;
  width: 80px !important;
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
.iconBtn2 {
  width: 140px;
  height: 32px;
  margin-left: 100px;
  background: #5473e8;
  border-radius: 2px;
  font-size: 14px;
  border: 1px solid #5473e8;
  font-weight: 400;
  color: #fcfefe;
  padding: 0;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.el-icon-arrow-down {
  font-size: 12px;
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
>>> .addheight {
  height: 500px;
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
  width: 48% !important;
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
>>> .cellClassAdd {
  color: red;
  font-family: 'Microsoft YaHei';
  height: 30px;
}
>>> .el-icon-circle-plus-outline:before {
  display: none;
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
>>> .formStyle {
  display: flex;
  justify-content: space-between;
}
>>> .vxe-header--column .vxe-cell--edit-icon,
.vxe-header--column .vxe-cell-help-icon {
  display: none;
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
>>> .el-form-item__error {
  padding-top: 0px;
}
>>> .el-autocomplete {
  width: 100%;
}
</style>