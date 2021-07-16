<template>
  <el-container id="mainCard">
    <!-- 输入框表区域 -->
    <el-row style="width: 100%">
      <el-card id="queryRow" class="firstCard">
        <el-form
          :model="searchParams"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row class="colHeight">
            <el-col :md="5" :lg="3" :xl="3">
              <el-form-item label-width="60px" label="站点:">
                <el-select
                  class="unifySize"
                  v-model="searchParams.shop"
                  placeholder="站点"
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
            </el-col>
            <el-col :md="5" :lg="3" :xl="3">
              <el-form-item label-width="60px" label="国家:">
                <el-select
                  v-model="searchParams.country"
                  class="unifySize"
                  placeholder="国家"
                >
                  <el-option label="" value=""></el-option>
                  <el-option
                    :key="index"
                    v-for="(item, index) in countryList"
                    :label="item.StateChNm"
                    :value="item.StateID"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="5" :lg="3" :xl="3">
              <el-form-item label-width="70px" label="产品号:">
                <el-input
                  v-model="searchParams.p_Code"
                  placeholder="请输入产品号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="8" :lg="5" :xl="5">
              <el-form-item label-width="80px" label="库存天数:">
                <span class="dbInput">
                  <span class="midInputLine"></span>
                  <el-input
                    class="saveDate None-Border"
                    v-model="searchParams.stockQty1"
                    placeholder="库存天数"
                  />
                  <el-input
                    class="saveDate None-Border"
                    v-model="searchParams.stockQty2"
                    placeholder="库存天数"
                  />
                </span>
              </el-form-item>
            </el-col>
            <el-col :md="8" :lg="5" :xl="5">
              <el-form-item label-width="70" label="销量值:">
                <div class="mixInput">
                  <el-input
                    v-model="searchParams.saleQty1"
                    class="prepend saleLeft None-Border"
                    placeholder="销量值"
                  >
                    <el-select
                      class="saleSelect"
                      v-model="searchParams.saleType"
                      slot="prepend"
                      placeholder="月销量"
                    >
                      <el-option
                        :key="index"
                        v-for="(item, index) in saleType"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-input>
                  <el-input
                    class="saleright None-Border"
                    placeholder="销量值"
                    v-model="searchParams.saleQty2"
                  >
                  </el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :md="5" :lg="3" :xl="3">
              <el-button
                v-if="iconShow"
                type="danger"
                class="searchBtn"
                size="small"
                :loading="loading"
                @click="search"
                icon="iconfont kt-icon-sousuo_o"
                >查询</el-button
              >
              <el-button
                v-if="iconShow"
                type="danger"
                class="closeInput"
                size="small"
                @click="IconShow"
                icon="iconfont kt-icon-anniu_jiantouzhankai"
                >展开</el-button
              >
            </el-col>
          </el-row>
          <el-row class="colHeight" v-if="!iconShow">
            <el-col :md="5" :lg="3" :xl="3">
              <el-form-item label-width="60px" label="条件1:">
                <el-select
                  class="unifySize"
                  v-model="searchParams.view1"
                  placeholder="条件1"
                >
                  <el-option label="" value=""></el-option>
                  <el-option
                    :key="index"
                    v-for="(item, index) in viewList"
                    :label="item.ViewName"
                    :value="item.ViewNo"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="5" :lg="3" :xl="3">
              <el-form-item label-width="60px" label="条件2:">
                <el-select
                  class="unifySize"
                  v-model="searchParams.view2"
                  placeholder="条件2"
                >
                  <el-option label="" value=""></el-option>
                  <el-option
                    :key="index"
                    v-for="(item, index) in viewList"
                    :label="item.ViewName"
                    :value="item.ViewNo"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="5" :lg="3" :xl="3">
              <el-form-item label-width="70px" label="趋势:">
                <el-select
                  class="unifySize"
                  v-model="searchParams.saletrend"
                  placeholder="趋势"
                >
                  <el-option label="" value=""></el-option>
                  <el-option
                    :key="index"
                    v-for="(item, index) in saletrendList"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="5" :lg="3" :xl="3">
              <el-button
                type="danger"
                class="searchBtn marginL"
                size="small"
                :loading="loading"
                @click="search"
                icon="iconfont kt-icon-sousuo_o"
                >查询</el-button
              >
              <el-button
                type="danger"
                class="closeInput"
                size="small"
                @click="IconShow"
                icon="iconfont kt-icon-anniu_jiantoushouqi"
                >收起</el-button
              >
            </el-col>
          </el-row>

          <!-- 第二行按钮区域 -->
          <el-col class="secondBtn">
            <el-button
              type="primary"
              :loading="dataloading"
              @click="GetSalesReportAmz"
              class="iconBtn iconfont kt-icon-caidan"
              >数据生成</el-button
            >
            <el-button
              type="primary"
              @click="salesPislist"
              class="iconBtn iconfont kt-icon-caidan"
              >销售趋势</el-button
            >
            <el-button
              type="primary"
              @click="OperationSetup"
              class="iconBtn iconfont kt-icon-caidan"
              >运营设置</el-button
            >
            <el-button
              type="primary"
              @click="placeOrder"
              class="smBtn iconBtn iconfont kt-icon-caidan"
              >下单</el-button
            >
            <el-button
              type="primary"
              @click="deliverGoods"
              class="smBtn iconBtn iconfont kt-icon-caidan"
              >发货</el-button
            >
            <el-button
              type="warning"
              @click="reminder"
              class="iconBtn smBtn smallIconBtn iconfont kt-icon-jiantou_shangxiaqiehuan"
              >催单</el-button
            >
          </el-col>
        </el-form>
      </el-card>
      <!-- 主表区域 -->
      <el-card class="mainTable">
        <vxe-table
          ref="mainTable"
          border
          resizable
          stripe
          keep-source
          show-footer
          :loading="loading"
          @cell-dblclick="dblclick"
          class="mytable-scrollbar"
          @cell-click="clickMain"
          @checkbox-change="onCheckboxChange"
          @checkbox-all="onCheckboxAllChange"
          :footer-method="footerMethod"
          :row-class-name="cellClass"
          :header-row-class-name="hearderClass"
          :footer-cell-class-name="footerCellClassName"
          :height="iconShow ? gridHeight * 0.7 : gridHeight * 0.7"
          :edit-config="{ trigger: 'click', mode: 'cell' }"
          highlight-current-row
          :config="{ render: 'scroll' }"
          :align="'center'"
          :checkbox-config="{ highlight: true }"
          :data="OperationPlatformList"
        >
          <vxe-table-column
            fixed="left"
            type="seq"
            width="50"
            :header-class-name="cellCorlor1"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            fixed="left"
            type="checkbox"
            :header-class-name="cellCorlor1"
            width="40"
          ></vxe-table-column>
          <vxe-table-column
            fixed="left"
            width="75"
            field="站点"
            :header-class-name="cellCorlor1"
            title="站点"
          ></vxe-table-column>
          <vxe-table-column
            fixed="left"
            field="产品号"
            min-width="180"
            :header-class-name="cellCorlor1"
            title="SKU"
          ></vxe-table-column>
          <vxe-table-column
            field="产品名称"
            fixed="left"
            min-width="230"
            :header-class-name="cellCorlor1"
            title="产品名称"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="最近一周"
            title="最近一周"
            :header-class-name="cellCorlor2"
          ></vxe-table-column>
          <vxe-table-column
            width="70"
            :header-class-name="cellCorlor2"
            field="周趋势"
            title="周趋势"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="最近一月"
            title="最近一月"
            :header-class-name="cellCorlor2"
          ></vxe-table-column>
          <vxe-table-column
            width="70"
            :header-class-name="cellCorlor2"
            field="月趋势"
            title="月趋势"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="最近三月平均"
            title="最近三月"
            :header-class-name="cellCorlor2"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="最近一年平均"
            title="最近一年"
            :header-class-name="cellCorlor2"
          ></vxe-table-column>
          <vxe-table-column
            width="105"
            field="平均周销量"
            title="平均周销量"
            :header-class-name="cellCorlor2"
          ></vxe-table-column>
          <vxe-table-column
            width="105"
            field="最大周销量"
            title="最大周销量"
            :header-class-name="cellCorlor2"
          ></vxe-table-column>
          <vxe-table-column
            width="105"
            field="预计周销量"
            title="预计周销量"
            :header-class-name="cellCorlor2"
          ></vxe-table-column>
          <vxe-table-column
            width="105"
            field="预期总销量"
            title="预期总销量"
            :header-class-name="cellCorlor2"
          ></vxe-table-column>
          <vxe-table-column
            field="在途合计"
            width="80"
            title="在途合计"
            :header-class-name="cellCorlor3"
          ></vxe-table-column>
          <vxe-table-column
            field="7日内到港"
            title="7日内到"
            width="80"
            :header-class-name="cellCorlor3"
          ></vxe-table-column>
          <vxe-table-column
            field="15日内到港"
            title="15日内到"
            width="100"
            :header-class-name="cellCorlor3"
          ></vxe-table-column>
          <vxe-table-column
            field="中转仓"
            width="70"
            :header-class-name="cellCorlor3"
            title="中转仓"
          ></vxe-table-column>
          <vxe-table-column
            field="亚马逊"
            width="70"
            :header-class-name="cellCorlor3"
            title="亚马逊"
          ></vxe-table-column>
          <vxe-table-column
            :header-class-name="cellCorlor4"
            field="已到仓"
            title="已到仓"
            width="70"
          ></vxe-table-column>
          <vxe-table-column
            :header-class-name="cellCorlor4"
            field="含在途"
            title="含在途"
            width="70"
          ></vxe-table-column>
          <vxe-table-column
            :header-class-name="cellCorlor5"
            field="已装箱"
            width="70"
            title="已装箱"
          ></vxe-table-column>
          <vxe-table-column
            :class-name="blueSize"
            :header-class-name="cellCorlor5"
            field="未装箱"
            title="未装箱"
            width="70"
          >
            <template slot-scope="{ row }">
              <a @click.stop.prevent="unboxed(row)" href="#javascript">{{
                row.未装箱
              }}</a>
            </template>
          </vxe-table-column>
          <vxe-table-column
            :header-class-name="cellCorlor6"
            field="生产中"
            :class-name="blueSize"
            title="生产中"
            width="70"
          >
            <template slot-scope="{ row }">
              <a @click.stop.prevent="production(row)" href="#javascript">{{
                row.生产中
              }}</a>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="每周产量"
            title="每周产量"
            width="80"
            :header-class-name="cellCorlor6"
          ></vxe-table-column>
          <vxe-table-column
            field="未下单生产"
            title="未下单生产"
            width="95"
            :header-class-name="cellCorlor6"
          ></vxe-table-column>
          <vxe-table-column
            :header-class-name="cellCorlor6"
            field="动销"
            title="动销"
            width="60"
          ></vxe-table-column>
          <vxe-table-column
            field="建议下单"
            width="80"
            title="建议下单"
            :header-class-name="cellCorlor6"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="建议发货"
            title="建议发货"
            :header-class-name="cellCorlor6"
          ></vxe-table-column>
          <vxe-table-column
            field="备货时长"
            width="80"
            title="备货时长"
            :header-class-name="cellCorlor6"
          ></vxe-table-column>
          <vxe-table-column
            field="备货系数"
            title="备货系数"
            width="80"
            :header-class-name="cellCorlor6"
          ></vxe-table-column>
        </vxe-table>
      </el-card>
    </el-row>
    <el-row>
      <el-col class="mingxiqingdan">
        <el-card style="flex: 70">
          在途明细
          <!-- 在途明细的表格 -->
          <vxe-table
            highlight-hover-row
            border
            resizable
            stripe
            round
            fit
            show-footer
            :row-class-name="cellClass"
            :header-row-class-name="hearderClass"
            :footer-cell-class-name="footerCellClassName"
            :footer-method="DeetailfooterMethod"
            :height="gridHeight * 0.3"
            class="mytable-scrollbar"
            highlight-current-row
            width="auto"
            show-all-overflow
            :config="{ render: 'scroll' }"
            :align="'center'"
            :checkbox-config="{ highlight: true }"
            :data="detailedList"
          >
            <vxe-table-column
              type="checkbox"
              :header-class-name="cellCorlor1"
              width="40"
            ></vxe-table-column>
            <vxe-table-column
              type="seq"
              width="50"
              :header-class-name="cellCorlor1"
              title="序号"
            ></vxe-table-column>
            <vxe-table-column
              field="发货日期"
              min-width="80"
              :header-class-name="cellCorlor1"
              title="发货日期"
            ></vxe-table-column>
            <vxe-table-column
              field="产品号"
              min-width="80"
              :header-class-name="cellCorlor1"
              title="货件编码"
            ></vxe-table-column>
            <vxe-table-column
              field="预计到港时间"
              min-width="110"
              :header-class-name="cellCorlor1"
              title="预计到港时间"
            ></vxe-table-column>
            <vxe-table-column
              field="数量"
              width="60"
              :header-class-name="cellCorlor1"
              title="数量"
            ></vxe-table-column>
          </vxe-table>
        </el-card>
        <el-card style="flex: 119; margin-left: 10px">
          选定产品清单
          <!-- 选定产品清单表 -->
          <vxe-table
            highlight-hover-row
            border
            resizable
            stripe
            round
            :footer-method="chooseProductfooterMethod"
            fit
            :height="gridHeight * 0.3"
            class="mytable-scrollbar"
            :edit-config="{ trigger: 'click', mode: 'cell' }"
            highlight-current-row
            width="auto"
            show-footer
            :row-class-name="cellClass"
            :header-row-class-name="hearderClass"
            :footer-cell-class-name="footerCellClassName"
            show-all-overflow
            :config="{ render: 'scroll' }"
            :align="'center'"
            :checkbox-config="{ highlight: true }"
            :data="chooseLength"
          >
            <vxe-table-column
              type="checkbox"
              :header-class-name="cellCorlor1"
              width="60"
            ></vxe-table-column>
            <vxe-table-column
              type="seq"
              :header-class-name="cellCorlor1"
              title="序号"
            ></vxe-table-column>
            <vxe-table-column
              field="站点"
              :header-class-name="cellCorlor1"
              title="站点"
            ></vxe-table-column>
            <vxe-table-column
              field="产品号"
              min-width="260"
              :header-class-name="cellCorlor1"
              title="SKU"
            ></vxe-table-column>
            <vxe-table-column
              field=""
              :header-class-name="cellCorlor1"
              title="成品装箱数"
            ></vxe-table-column>
            <vxe-table-column
              field="Packages"
              :edit-render="{ name: 'input', attrs: { type: 'text' } }"
              :header-class-name="cellCorlor1"
              title="发货数量"
            >
              <template v-slot:edit="{ row }">
                <vxe-input
                  type="number"
                  :min="0"
                  v-model="row.Packages"
                ></vxe-input>
              </template>
            </vxe-table-column>
            <vxe-table-column
              field="建议下单"
              :edit-render="{ name: 'input', attrs: { type: 'text' } }"
              :header-class-name="cellCorlor1"
              title="下单数量"
            >
              <template v-slot:edit="{ row }">
                <vxe-input
                  type="number"
                  :min="0"
                  v-model="row.建议下单"
                ></vxe-input>
              </template>
            </vxe-table-column>
          </vxe-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- 电商订单管理 -->
    <jy-dialog
      title="电商订单管理"
      :close-on-click-modal="false"
      :visible.sync="addAialogVisible"
      append-to-body
      hieght="800px"
      width="1250px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="addForm"
        :rules="addRules"
        :model="addOrderParams"
        style="font-size: 14px"
        label-width="84px"
      >
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <el-form-item
              prop="contractCode"
              class="tipsLeft searchMargin marginR"
              label="订单号:"
            >
              <vxe-input
                v-model="addOrderParams.contractCode"
                class="unifySize marginLeft"
                placeholder="订单号"
              ></vxe-input>
            </el-form-item>
            <el-form-item
              prop="currency"
              class="tipsLeft searchMargin marginR"
              style="margin-bottom: 0px"
              label="币种:"
            >
              <el-select
                v-model="addOrderParams.currency"
                class="unifySize marginLeft"
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
            <el-form-item prop="cDate" label-width="110px" label="下单日期:">
              <el-date-picker
                v-model="addOrderParams.cDate"
                class="unifySize"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              prop="shop"
              class="searchMargin marginR"
              style="margin-bottom: 0px"
              label="站点:"
            >
              <el-select
                v-model="addOrderParams.shop"
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
          <el-col style="height: 80px">
            <!-- 文本域 -->
            <el-form-item prop="remark" label="备注:">
              <el-input
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
          <el-col>
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
              class="mytable-scrollbar"
              :edit-rules="validRules"
              :header-cell-class-name="hearderClass"
              :row-class-name="cellClass"
              height="480"
              highlight-current-row
              @checkbox-change="onAddCheckboxChange"
              @checkbox-all="onAddCheckboxAllChange"
              :edit-config="{ trigger: 'click', mode: 'cell' }"
              :align="'center'"
              :checkbox-config="{
                highlight: true,
              }"
              :data="addProduceList"
            >
              <vxe-table-column type="checkbox" width="40"></vxe-table-column>
              <vxe-table-column
                type="seq"
                width="50"
                title="序号"
              ></vxe-table-column>
              <vxe-table-column
                :field="IsChina ? '产品号' : 'ProductNo'"
                width="175"
                title="产品编码"
              >
                <template slot-scope="{ row }">
                  <span>{{ IsChina ? row.产品号 : row.ProductNo }}</span>
                  <i
                    @click="iconChooseProduct"
                    v-if="row.ProductNo === ''"
                    class="iconP iconfont kt-icon-daoru"
                  ></i>
                </template>
              </vxe-table-column>
              <vxe-table-column
                :field="IsChina ? '产品名称' : 'chnName'"
                title="产品名称"
              ></vxe-table-column>
              <vxe-table-column
                width="60"
                :field="IsChina ? '样式' : 'CustStyle'"
                title="样式"
              ></vxe-table-column>
              <vxe-table-column
                width="60"
                :field="IsChina ? '色号' : 'ColorNo'"
                title="色号"
              ></vxe-table-column>
              <vxe-table-column
                width="60"
                :field="IsChina ? '颜色' : 'Color'"
                title="颜色"
              ></vxe-table-column>
              <vxe-table-column
                width="60"
                :field="IsChina ? '尺寸' : 'chnSpec'"
                title="尺寸"
              ></vxe-table-column>
              <vxe-table-column
                width="80"
                :field="IsChina ? '尺寸单位名称' : 'SpecUnitName'"
                title="尺寸单位"
              ></vxe-table-column>
              <vxe-table-column
                width="80"
                :edit-render="{ name: 'input', attrs: { type: 'text' } }"
                field="原始数量"
                title="数量"
              >
                <template v-slot:edit="{ row }">
                  <vxe-input
                    type="number"
                    :min="0"
                    v-model="row.数量"
                    @blur="reminderNumBlurEvent(row)"
                  ></vxe-input>
                </template>
              </vxe-table-column>
              <vxe-table-column
                :field="IsChina ? '单位名称' : 'BoxUnitName'"
                width="60"
                title="单位"
              ></vxe-table-column>
              <vxe-table-column
                width="100"
                :edit-render="{
                  name: 'input',
                  attrs: { type: 'text' },
                }"
                field="取消数量"
                title="取消数量"
              >
                <template v-slot:edit="{ row }">
                  <vxe-input
                    v-if="IsChina ? true : false"
                    type="number"
                    :min="0"
                    v-model="row.取消数量"
                    @blur="reminderBlurEvent(row)"
                  ></vxe-input>
                </template>
              </vxe-table-column>
              <vxe-table-column
                width="100"
                field="数量"
                title="实际数量"
              ></vxe-table-column>
              <vxe-table-column
                width="80"
                :edit-render="{ name: 'input', attrs: { type: 'text' } }"
                field="备注"
                title="备注"
              ></vxe-table-column>
              <vxe-table-column width="80" field="操作" title="操作">
                <template slot-scope="{ row }">
                  <i
                    @click="iconAddProduct"
                    class="iconC el-icon-circle-plus-outline"
                  ></i>
                  <i
                    @click="iconDelProduct(row)"
                    class="iconC el-icon-delete"
                  ></i>
                </template>
              </vxe-table-column>
            </vxe-table>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              type="primary"
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
      hieght="800px"
      width="1250px"
    >
      <!-- 表单数据 -->
      <el-form
        ref="chooseForm"
        :model="chooseParams"
        style="font-size: 14px"
        label-width="110px"
      >
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <el-form-item
              class="searchMargin marginR"
              style="margin-bottom: 0px"
              label="站点:"
            >
              <el-select
                :disabled="!isSelectDisable"
                class="unifySize marginLeft"
                v-model="chooseParams.shopId"
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
            <el-form-item label-width="130px" label="产品名称/代码:">
              <el-input
                v-model="chooseParams.strProduct"
                class="unifySize"
              ></el-input>
            </el-form-item>
            <el-form-item label="色号/颜色:">
              <el-input
                v-model="chooseParams.color"
                class="unifySize"
              ></el-input>
            </el-form-item>
            <el-form-item class="sizeMarginLeft" width="60" label="尺寸:">
              <el-input
                v-model="chooseParams.P_Spec"
                class="unifySize"
              ></el-input>
            </el-form-item>
            <el-button
              type="danger"
              class="searchBtn"
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
          :row-class-name="cellChooseClass"
          show-overflow
          height="597"
          class="mytable-scrollbar"
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
          <vxe-table-column type="checkbox" width="40"></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="60"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column width="175" field="产品号" title="产品编码">
          </vxe-table-column>
          <vxe-table-column
            width="195"
            field="产品名称"
            title="产品名称"
          ></vxe-table-column>
          <vxe-table-column
            width="60"
            field="样式"
            title="样式"
          ></vxe-table-column>
          <vxe-table-column
            width="60"
            field="色号"
            title="色号"
          ></vxe-table-column>
          <vxe-table-column
            width="60"
            field="颜色"
            title="颜色"
          ></vxe-table-column>
          <vxe-table-column
            width="60"
            field="尺寸"
            title="尺寸"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="尺寸单位"
            title="尺寸单位"
          ></vxe-table-column>
          <vxe-table-column
            width="80"
            field="每包片数"
            title="每包片数"
          ></vxe-table-column>
          <vxe-table-column
            width="60"
            field="系数"
            title="系数"
          ></vxe-table-column>
          <vxe-table-column field="备注" title="备注"></vxe-table-column>
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
              <el-button class="clearBtn" @click="chooseDaialogVisible = false"
                >取 消</el-button
              >
            </span>
          </el-col>
        </el-row>
      </span>
    </jy-dialog>

    <!-- 销售趋势 -->
    <jy-dialog
      title="销售趋势"
      :close-on-click-modal="false"
      :visible.sync="saleDaialogVisible"
      append-to-body
      hieght="800px"
      width="1250px"
    >
      <el-select
        @change="salesSelectChange"
        class="unifySize"
        v-model="sales"
        placeholder="条件1"
      >
        <el-option
          :key="index"
          v-for="(item, index) in saleslist"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div style="width: 100%; height: 250px" ref="chart"></div>
      <div
        v-if="!this.isDays"
        style="width: 100%; height: 250px"
        ref="chart1"
      ></div>
    </jy-dialog>
    <!-- 产品信息批量修改 -->
    <el-dialog
      title="产品信息批量修改"
      :close-on-click-modal="false"
      :visible.sync="operationSetupVisible"
      append-to-body
      hieght="800px"
      width="30%"
    >
      <el-row class="productEdit">
        <el-col :span="12">
          <div class="alignC">修改项目</div>
          <el-select
            @change="editChange"
            class="unifySize leftMargin"
            v-model="Operation"
          >
            <el-option
              :key="index"
              v-for="(item, index) in OperationList"
              :label="item.Name"
              :value="item.Code"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <div class="alignC">修改内容</div>
          <!-- 大类 -->
          <el-select
            v-if="Operation === 'Class               '"
            class="unifySize"
            @change="bigClassChange"
            v-model="cancelContainer"
          >
            <el-option
              :key="index"
              v-for="(item, index) in classList"
              :label="item.Name"
              :value="item.Code"
            ></el-option>
          </el-select>
          <el-select
            v-if="Operation === 'Class               '"
            class="unifySize leftMargin"
            v-model="styleEdit"
          >
            <el-option
              :key="index"
              v-for="(item, index) in bogClassList"
              :label="item.chnName"
              :value="item.Code"
            ></el-option>
          </el-select>
          <!-- 站点 -->
          <el-select
            v-if="Operation === 'Shop                '"
            class="unifySize leftMargin"
            v-model="styleEdit"
          >
            <el-option
              :key="index"
              v-for="(item, index) in shopList"
              :label="item.Name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-input
            class="unifySize1 unifySize"
            v-if="
              Operation === 'StockingDays        ' ||
              Operation === 'StockingRate        ' ||
              Operation === 'Safetystock         '
            "
            v-model="cancelContainer"
          >
          </el-input>
          <el-select
            v-if="Operation === 'PType               '"
            class="unifySize leftMargin"
            v-model="cancelContainer"
          >
            <el-option
              :key="index"
              v-for="(item, index) in ProductAttributes"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            v-if="Operation === 'valid               '"
            class="unifySize leftMargin"
            v-model="cancelContainer"
          >
            <el-option
              :key="index"
              v-for="(item, index) in available"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- 面料材质 -->
          <el-select
            v-if="Operation === 'P_Code              '"
            class="unifySize leftMargin"
            v-model="cancelContainer"
          >
            <el-option
              :key="index"
              v-for="(item, index) in materialQuality"
              :label="item.Name"
              :value="item.Code"
            ></el-option>
          </el-select>
          <!-- 面料工艺 -->
          <el-select
            v-if="Operation === 'ProductCraft        '"
            class="unifySize leftMargin"
            v-model="cancelContainer"
          >
            <el-option
              :key="index"
              v-for="(item, index) in technology"
              :label="item.Name"
              :value="item.Code"
            ></el-option>
          </el-select>
          <!-- 首页商品 -->
          <el-checkbox
            value="1"
            true-label="1"
            false-label="0"
            class="leftMargin"
            v-if="Operation === 'isHome              '"
            v-model="cancelContainer"
          ></el-checkbox>
          <!-- 品牌 -->
          <el-select
            v-if="Operation === 'Remark1             '"
            class="unifySize leftMargin"
            v-model="cancelContainer"
          >
            <el-option
              :key="index"
              v-for="(item, index) in brandList"
              :label="item.Name"
              :value="item.Code"
            ></el-option>
          </el-select>
          <!-- 图片 -->
          <el-select
            @change="picChange"
            v-if="Operation === 'Diagramid           '"
            class="unifySize leftMargin"
            v-model="cancelContainer"
          >
            <el-option
              :key="index"
              v-for="(item, index) in picList"
              :label="item.ImageName"
              :value="item.ImageListNo"
            ></el-option>
          </el-select>
          <img
            class="PicStyle leftMargin"
            v-if="Operation === 'Diagramid           '"
            :src="picUrl"
          />
          <!-- 分类编码 -->
          <el-input
            v-if="Operation === 'ParentProduct       '"
            class="unifySize1 unifySize"
            v-model="cancelContainer"
          >
          </el-input>
          <i
            v-if="Operation === 'ParentProduct       '"
            @click="ClassificationCode"
            class="iconP iconfont kt-icon-daoru"
          ></i>
          <!-- 设计编号 -->
          <el-input
            v-if="Operation === 'Hx                  '"
            class="unifySize"
            v-model="cancelContainer"
          >
          </el-input>
          <i
            v-if="Operation === 'Hx                  '"
            @click="designNum"
            class="iconP iconfont kt-icon-daoru"
          ></i>
          <!-- <el-select class="unifySize" v-model="cancelContainer">
            <el-option
              :key="index"
              v-for="(item, index) in OperationList"
              :label="item.Name"
              :value="item.Code"
            ></el-option>
          </el-select> -->
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              type="primary"
              @click="BatchModification"
              class="saveBtn iconfont kt-icon-baocun"
              >确定</el-button
            >
            <el-button
              type="primary"
              @click="operationSetupVisible = false"
              class="clearBtn"
              >退出</el-button
            >
          </el-col>
        </el-row>
      </span>
    </el-dialog>
    <!-- 分类目录 -->
    <el-dialog
      title="选择产品分类"
      :close-on-click-modal="false"
      :visible.sync="catalogVisible"
      append-to-body
      hieght="800px"
      width="30%"
    >
      <span class="treeContainer">
        <el-tree
          :data="TreeList"
          default-expand-all
          @node-click="ChooseHandleNodeClick"
          ref="tree"
          :props="defaultProps"
          highlight-current
        ></el-tree>
      </span>

      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              @click="catalogChoose"
              type="primary"
              class="saveBtn iconfont kt-icon-baocun"
              >确定</el-button
            >
            <el-button
              type="primary"
              @click="catalogVisibleCancle"
              class="clearBtn"
              >退出</el-button
            >
          </el-col>
        </el-row>
      </span>
    </el-dialog>
    <!-- 设计编号 -->
    <jy-dialog
      title="选择设计编号"
      :close-on-click-modal="false"
      :visible.sync="designVisible"
      append-to-body
      hieght="800px"
      width="60%"
    >
      <!-- 表单数据 -->
      <el-form
        ref="designForm"
        :model="designFormParams"
        style="font-size: 14px"
        label-width="84px"
      >
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <el-form-item
              prop="contractCode"
              class="tipsLeft searchMargin marginR"
              label="设计编号:"
            >
              <vxe-input
                v-model="designFormParams.FlowersCode"
                class="unifySize marginLeft"
                placeholder="设计编号"
              ></vxe-input>
            </el-form-item>
            <el-form-item class="tipsLeft searchMargin marginR" label="花型名:">
              <vxe-input
                v-model="designFormParams.F_ChnName"
                class="unifySize marginLeft"
                placeholder="花型名"
              ></vxe-input>
            </el-form-item>
            <el-form-item
              prop="contractCode"
              class="tipsLeft searchMargin marginR"
              label="类型:"
            >
              <vxe-input
                v-model="designFormParams.Type"
                class="unifySize marginLeft"
                placeholder="类型"
              ></vxe-input>
            </el-form-item>
            <el-button
              type="danger"
              class="searchBtn"
              size="small"
              icon="iconfont kt-icon-sousuo_o"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <vxe-table
        ref="designTable"
        border
        resizable
        stripe
        keep-source
        :row-class-name="cellChooseClass"
        show-overflow
        height="597"
        :auto-resize="true"
        :header-cell-class-name="hearderClass"
        highlight-current-row
        :config="{ render: 'scroll' }"
        :align="'center'"
        :checkbox-config="{ highlight: true }"
        :data="designPaging.data"
      >
        <vxe-table-column type="checkbox" width="40"></vxe-table-column>
        <vxe-table-column type="seq" width="60" title="序号"></vxe-table-column>
        <vxe-table-column
          width="80"
          field="缩略图"
          title="缩略图"
        ></vxe-table-column>
        <vxe-table-column
          width="60"
          field="类别"
          title="类别"
        ></vxe-table-column>
        <vxe-table-column
          width="195"
          field="设计编号"
          title="设计编号"
        ></vxe-table-column>
        <vxe-table-column
          field="中文花型名"
          title="中文花型名"
        ></vxe-table-column>
        <vxe-table-column
          field="英文花型名"
          title="英文花型名"
        ></vxe-table-column>
        <vxe-table-column field="类型" title="类型"></vxe-table-column>
        <vxe-table-column field="设计员" title="设计员"></vxe-table-column>

        <vxe-table-column field="备注" title="备注"></vxe-table-column>
      </vxe-table>
      <el-pagination
        @size-change="designHandleSizeChange"
        @current-change="designHandleCurrentChange"
        :current-page="designPaging.page"
        background
        :page-sizes="[100, 200, 500, 1000]"
        :page-size="designPaging.limit"
        layout="prev,pager,next,total,sizes,jumper"
        :total="designPaging.total"
      >
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              @click="design"
              type="primary"
              class="saveBtn iconfont kt-icon-baocun"
              >确定</el-button
            >
            <el-button
              type="primary"
              @click="designVisible = false"
              class="clearBtn"
              >退出</el-button
            >
          </el-col>
        </el-row>
      </span>
    </jy-dialog>
    <!-- 未装箱明细 -->
    <jy-dialog
      title="未装箱明细"
      :close-on-click-modal="false"
      :visible.sync="unboxedVisible"
      append-to-body
      hieght="800px"
      width="60%"
    >
      <!-- 表单数据 -->
      <el-form
        ref="unboxeForm"
        :model="unboxeDetail"
        style="font-size: 14px"
        label-width="84px"
      >
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <el-form-item
              prop="contractCode"
              class="tipsLeft searchMargin marginR"
              label="快速搜索:"
            >
              <vxe-input
                @blur="unboxeFilter"
                v-model="unboxeDetail.product"
                class="unifySize marginLeft"
              ></vxe-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <vxe-table
        border
        resizable
        stripe
        keep-source
        :row-class-name="cellChooseClass"
        show-overflow
        height="500px"
        :auto-resize="true"
        :header-cell-class-name="hearderClass"
        highlight-current-row
        :config="{ render: 'scroll' }"
        :align="'center'"
        :checkbox-config="{ highlight: true }"
        :data="unboxedPaging.data"
      >
        <vxe-table-column type="checkbox" width="40"></vxe-table-column>
        <vxe-table-column type="seq" width="60" title="序号"></vxe-table-column>
        <vxe-table-column
          width="80"
          field="到货日期"
          title="到货日期"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="到货类型"
          title="到货类型"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="免检类型"
          title="免检类型"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="加工工厂"
          title="加工工厂"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="生产单号"
          title="生产单号"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="产品号"
          title="产品号"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="电商订单"
          title="电商订单"
        ></vxe-table-column>

        <vxe-table-column
          width="80"
          field="到货数量"
          title="到货数量"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="到货单位"
          title="到货单位"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="合格片数"
          title="合格片数"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="家纺次品"
          title="家纺次品"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="面料次品"
          title="面料次品"
        ></vxe-table-column>
        <vxe-table-column
          width="100"
          field="总检验片数"
          title="总检验片数"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="包装片数"
          title="包装片数"
        ></vxe-table-column>
      </vxe-table>
      <el-pagination
        @size-change="unboxedHandleSizeChange"
        @current-change="unboxedHandleCurrentChange"
        :current-page="unboxedPaging.page"
        background
        :page-sizes="[100, 200, 500, 1000]"
        :page-size="unboxedPaging.limit"
        layout="prev,pager,next,total,sizes,jumper"
        :total="unboxedPaging.total"
      >
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              type="primary"
              @click="unboxedVisible = false"
              class="clearBtn"
              >退出</el-button
            >
          </el-col>
        </el-row>
      </span>
    </jy-dialog>
    <!-- 生产中明细 -->
    <jy-dialog
      title="生产中明细"
      :close-on-click-modal="false"
      :visible.sync="productionVisible"
      append-to-body
      hieght="800px"
      width="60%"
    >
      <!-- 表单数据 -->
      <el-form
        ref="productForm"
        :model="productFormParams"
        style="font-size: 14px"
        label-width="84px"
      >
        <el-row>
          <el-col style="display: flex; justify-content: space-between">
            <el-form-item
              prop="contractCode"
              class="tipsLeft searchMargin marginR"
              label="快速搜索:"
            >
              <vxe-input
                @blur="productFilter"
                v-model="productFormParams.product"
                class="unifySize marginLeft"
              ></vxe-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <vxe-table
        border
        resizable
        stripe
        keep-source
        :row-class-name="cellChooseClass"
        show-overflow
        height="500px"
        :auto-resize="true"
        :header-cell-class-name="hearderClass"
        highlight-current-row
        :config="{ render: 'scroll' }"
        :align="'center'"
        :checkbox-config="{ highlight: true }"
        :data="productPaging.data"
      >
        <vxe-table-column type="checkbox" width="40"></vxe-table-column>
        <vxe-table-column type="seq" width="60" title="序号"></vxe-table-column>
        <vxe-table-column field="生产单号" title="生产单号"></vxe-table-column>
        <vxe-table-column
          width="80"
          field="交货日期"
          title="交货日期"
        ></vxe-table-column>
        <vxe-table-column field="订单号" title="订单号"></vxe-table-column>
        <vxe-table-column field="产品号" title="产品号"></vxe-table-column>
        <vxe-table-column
          width="60"
          field="片数"
          title="片数"
        ></vxe-table-column>
        <vxe-table-column
          width="60"
          field="单位"
          title="单位"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="到货片数"
          title="到货片数"
        ></vxe-table-column>
      </vxe-table>
      <el-pagination
        @size-change="productHandleSizeChange"
        @current-change="productHandleCurrentChange"
        :current-page="productPaging.page"
        background
        :page-sizes="[100, 200, 500, 1000]"
        :page-size="productPaging.limit"
        layout="prev,pager,next,total,sizes,jumper"
        :total="productPaging.total"
      >
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              type="primary"
              @click="productionVisible = false"
              class="clearBtn"
              >退出</el-button
            >
          </el-col>
        </el-row>
      </span>
    </jy-dialog>
    <add-or-update
      v-if="showDialog"
      ref="AddOrUpdate"
      @okDialog="infoOkDialog"
    ></add-or-update>
    <!-- 电商订单催单 -->
    <jy-dialog
      class="reminderDaialog"
      title="电商订单催单"
      :close-on-click-modal="false"
      :visible.sync="showReminder"
      append-to-body
      width="100%"
    >
      <!-- 电商催单组件 -->
      <open-reminder ref="openReminder"></open-reminder>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              type="primary"
              @click="showReminder = false"
              class="clearBtn"
              >关闭</el-button
            >
          </el-col>
        </el-row>
      </span>
    </jy-dialog>
  </el-container>
</template>
<script>
import * as Echarts from 'echarts'
import axios from 'axios'
import XEUtils from 'xe-utils'
import Cookies from 'js-cookie'
import JyDialog from '@/components/JyDialog'
import AddOrUpdate from '../DeliveryRequest/DeliveryInfo'
import openReminder from '../OrderManagement/index'
export default {
  components: { AddOrUpdate, openReminder, JyDialog },
  props: {
    configprop: Object,
  },
  data() {
    return {
      hearderClass: 'hearderClass',
      cellChooseClassLeft: 'cellChooseClassLeft',
      cellChooseClass: 'cellChooseClass',
      cellClass: 'cellClass',
      searchParams: {
        usercode: '',
        shop: '',
        p_Code: '',
        saleType: 'WEEK',
        saleQty1: '',
        saleQty2: '',
        stockQty1: '',
        stockQty2: '',
        saletrend: '',
        view1: '',
        view2: '',
        country: '',
      },
      defaultProps: {
        children: 'Children',
        label: 'ChnName',
      },
      gridHeight: 535,
      unboxedList: [],
      unboxedFilterList: [],
      // 电商订单通过图标保存的参数
      iconSaveParams: {
        userCode: '',
        strList: '',
        strMessage: '',
      },
      unboxeDetail: {
        product: '',
      },
      columnIcon: '◇', //列分隔符
      // 电商催单表参数
      reminderParams: {
        contractNo: '',
        beginDate: '',
        endDate: '',
        p_Code: '',
        contractCode: '',
        status: '',
        isClose: '0',
        intDays: 0,
        userCode: '',
        row: '200',
        cdBeginDate: '',
        cdEndDate: '',
        bakField6: '',
        id: '',
      },
      currencyList: [],
      chooseLength: [],
      picList: [],
      designLength: [],
      bogClassList: [],
      classList: [],
      TreeList: [],
      bottomTableLeft: [],
      blueSize: 'blueSize',
      unboxedVisible: false,
      productionVisible: false,
      picUrl: '',
      addRules: {
        contractCode: [
          { required: true, message: '请输入订单号', trigger: 'blur' },
        ],
        currency: [
          { required: true, message: '请选择货币类型', trigger: 'blur' },
        ],
        cDate: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        shop: [{ required: true, message: '请选择站点', trigger: 'blur' }],
        remark: [
          { required: true, message: '请输入备注信息', trigger: 'blur' },
        ],
      },
      validRules: {
        数量: [{ required: true, message: '数量必须填写' }],
      },
      priorityList: [
        { label: '三星', value: '03' },
        { label: '四星', value: '04' },
        { label: '五星', value: '05' },
      ],
      ProductAttributes: [
        { label: '单品', value: '单品' },
        { label: '套装', value: '套装' },
      ],
      available: [
        { label: '是', value: '是' },
        { label: '否', value: '否' },
      ],
      cancelContainer: '', //修改内容
      styleEdit: '', //大类修改样式
      sales: 'Days',
      saleslist: [
        { value: 'Days', label: '日趋势' },
        { value: 'WEEK', label: '周趋势' },
        { value: 'Month', label: '月趋势' },
        { value: 'TMonth', label: '合计月趋势' },
      ],
      showReminder: false, //控制电商催单
      addAialogVisible: false, //控制电商订单
      chooseDaialogVisible: false, //控制选择产品
      saleDaialogVisible: false, //控制销售趋势
      operationSetupVisible: false, //控制运营设置
      catalogVisible: false, //控制分类目录
      designVisible: false, //控制设计编号
      select: '',
      isSelectDisable: true,
      isDays: false,
      loading: false,
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
      isdbclick: false,
      cancelContainerCopy: '',
      Operation: '',
      // 电商订单保存的参数
      addOrderParams: {
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
      },
      saleType: [
        //日期类型
        {
          value: 'WEEK',
          label: '周销量',
        },
        {
          value: 'Month',
          label: '月销量',
        },
        {
          value: 'Days',
          label: '日销量',
        },
      ],
      viewList: [],
      saletrendList: [
        {
          value: '',
          label: '',
        },
        {
          value: 'growth',
          label: '增长',
        },
        {
          value: 'drop',
          label: '下降',
        },
        {
          value: 'stable',
          label: '稳定',
        },
      ],
      productdList: [],
      productdFilterList: [],
      showDialog: false,
      BatchModificationParams: {
        UserCode: '',
        Field: '',
        FieldValue: '',
        ProductNo: '',
        strMessage: '',
        SecondField: '',
        SecondFieldValue: '',
      },
      designFormParams: { Type: '', FlowersCode: '', F_ChnName: '' },
      productFormParams: { product: '' },
      materialQuality: [], //材质
      dataloading: false,
      choosePaging: { list: [], data: [], limit: 100, total: null, page: 1 }, //选择产品表的分页
      designPaging: { list: [], data: [], limit: 100, total: null, page: 1 }, //选择产品表的分页
      unboxedPaging: { list: [], data: [], limit: 100, total: null, page: 1 }, //选择产品表的分页
      productPaging: { list: [], data: [], limit: 100, total: null, page: 1 }, //选择产品表的分页
      iconShow: false,
      IsChina: false,
      cellCorlor1: 'cellCorlor1', //单元格表头颜色类名
      cellCorlor2: 'cellCorlor2',
      cellCorlor3: 'cellCorlor3',
      cellCorlor4: 'cellCorlor4',
      cellCorlor5: 'cellCorlor5',
      cellCorlor6: 'cellCorlor6',
      footerCellClassName: 'footerCellClassName',
      OperationPlatformList: [],
      addProduceList: [],
      detailedList: [],
      chooseList: [],
      technology: [], //面料工艺列表
      OperationList: [], //运营列表
      brandList: [], //品牌
      row: [],
      shopList: [], //站点列表
      countryList: [], //国家列表
      bottomTableRight: [],
      DesignNumList: [],
    }
  },
  methods: {
    // 数据生成
    GetSalesReportAmz() {
      this.dataloading = true
      this.tdata = []
      let form = new FormData()
      let token = Cookies.get('token')
      form.append('shopId', this.searchParams.shop)
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
            this.getOperateWorkbenchinfoList()
            this.$message.success('数据生成成功!')
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
    // 生产中明细筛选
    productFilter() {
      const filterName = XEUtils.toString(this.productFormParams.product)
        .trim()
        .toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const searchProps = [
          '生产单号',
          '交货日期',
          '订单号',
          '产品号',
          '片数',
          '单位',
          '到货片数',
        ]
        const rest = this.productdFilterList.filter((item) =>
          searchProps.some(
            (key) =>
              XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1
          )
        )
        this.productPaging.data = rest.map((row) => {
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
        this.productPaging.data = this.productdFilterList
      }
    },
    // 未装箱明细筛选
    unboxeFilter() {
      const filterName = XEUtils.toString(this.unboxeDetail.product)
        .trim()
        .toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const searchProps = [
          '到货日期',
          '到货类型',
          '免检类型',
          '加工工厂',
          '生产单号',
          '产品号',
          '电商订单',
          '到货数量',
          '到货单位',
          '合格片数',
          '家纺次品',
          '面料次品',
          '总检验片数',
          '包装片数',
        ]
        const rest = this.unboxedFilterList.filter((item) =>
          searchProps.some(
            (key) =>
              XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1
          )
        )
        this.unboxedPaging.data = rest.map((row) => {
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
        this.unboxedPaging.data = this.unboxedFilterList
      }
    },
    // 点击发货弹出发货申请单
    deliverGoods() {
      var data = []
      data.push(...this.$refs.mainTable.getCheckboxRecords())
      if (data.length < 1) {
        this.$message({
          message: '请选择数据后操作!',
          type: 'error',
        })
      } else {
        var ID = data[0].ID
        this.showDialog = true
        this.$nextTick(() => {
          this.$refs.AddOrUpdate.formInfo.ID = ID
          this.$refs.AddOrUpdate.showDialog = true
          this.$refs.AddOrUpdate.gridData = this.chooseLength
          this.$refs.AddOrUpdate.formInfo.DeliveryModel = '1'
        })
      }
    },
    // 批量修改确定按钮
    BatchModification() {
      this.BatchModificationParams.Field = this.Operation
      this.BatchModificationParams.FieldValue = this.cancelContainer
      this.BatchModificationParams.SecondFieldValue = this.styleEdit
      var str = ''
      this.chooseLength.forEach((item) => {
        str += item.产品号 + '◆'
      })
      this.BatchModificationParams.ProductNo = str
      this.$api.business
        .EditProductDaialog({
          model: {
            ...this.BatchModificationParams,
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
          }
        })
        .catch((err) => console.log(err))
    },
    catalogChoose() {
      if (this.cancelContainerCopy !== '') {
        this.cancelContainer = this.cancelContainerCopy
      }
      this.cancelContainerCopy = ''
      this.catalogVisible = false
    },
    catalogVisibleCancle() {
      this.cancelContainerCopy = ''
      this.catalogVisible = false
    },
    // 选择tree节点
    ChooseHandleNodeClick(data) {
      this.cancelContainerCopy = data.ClassNo
    },
    // 点击运营设置按钮
    OperationSetup() {
      this.chooseLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.chooseLength.length < 1) {
        this.$message({
          message: '请先勾选',
          type: 'error',
        })
      } else {
        this.cancelContainer = ''
        this.operationSetupVisible = true
        this.$api.business
          .BatchEditProduct({
            model: {
              FlagCode: '',
              ProductClass: '',
              IsAll: 1,
            },
          })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.OperationList = res.data
            }
          })
          .catch((err) => console.log(err))
      }
    },
    // 分类编码
    ClassificationCode() {
      this.catalogVisible = true
      // 获得左侧tree的数据
      this.$api.catelogue
        .getTreeList()
        .then((res) => {
          if (res.statusCode === 200) {
            this.TreeList = res.data
          } else {
            return this.$message.error(res.message)
          }
        })
        .catch((r) => {
          return this.$message.error(res.message)
        })
    },
    designNum() {
      this.designVisible = true
    },
    // 修改项目输入框发生改变
    editChange() {
      this.cancelContainer = ''
      this.styleEdit = ''
      switch (this.Operation) {
        case 'Class               ':
          this.$api.business
            .BatchEditProduct({
              model: {
                FlagCode: 'Class               ',
                ProductClass: '',
                IsAll: 0,
              },
            })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.classList = res.data
                this.cancelContainer = this.classList[0].Code
                // 加载默认为第一项
                this.$api.business
                  .BatchEditProduct({
                    model: {
                      FlagCode: '',
                      ProductClass: this.classList[0].Code,
                      IsAll: 0,
                    },
                  })
                  .then((res) => {
                    if (res.statusCode !== 200) {
                      this.$message({
                        message: res.message,
                        type: 'error',
                      })
                    } else {
                      this.bogClassList = res.data
                      this.styleEdit = this.bogClassList[0].Code
                    }
                  })
                  .catch((err) => console.log(err))
              }
            })
            .catch((err) => console.log(err))
          break
        case 'P_Code              ':
          this.$api.business
            .BatchEditProduct({
              model: {
                FlagCode: 'P_Code              ',
                ProductClass: '',
                IsAll: 0,
              },
            })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.materialQuality = res.data
              }
            })
            .catch((err) => console.log(err))
          break
        case 'ProductCraft        ':
          this.$api.business
            .BatchEditProduct({
              model: {
                FlagCode: 'ProductCraft        ',
                ProductClass: '',
                IsAll: 0,
              },
            })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.technology = res.data
              }
            })
            .catch((err) => console.log(err))
          break
        case 'Remark1             ':
          this.$api.business
            .BatchEditProduct({
              model: {
                FlagCode: 'Remark1             ',
                ProductClass: '',
                IsAll: 0,
              },
            })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.brandList = res.data
              }
            })
            .catch((err) => console.log(err))
          break
        case 'Hx                  ':
          this.$api.business
            .DesignCode(this.designFormParams)
            .then((res) => {
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.DesignNumList = res.data
                this.designPageList()
              }
            })
            .catch((err) => console.log(err))
          break
        case 'Diagramid           ':
          this.$api.business
            .BatchEditProduct({
              model: {
                FlagCode: 'Diagramid           ',
                ProductClass: '',
                IsAll: 0,
              },
            })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.picList = res.data
                this.cancelContainer = this.picList[0].ImageListNo
                this.picUrl = this.picList[0].LinkUrl
              }
            })
            .catch((err) => console.log(err))
          break
        default:
          break
      }
    },
    picChange() {
      var index = this.picList.findIndex((item) => {
        return this.cancelContainer === item.ImageListNo
      })
      this.picUrl = this.picList[index].LinkUrl
    },
    design() {
      this.designLength = this.$refs.designTable.getCheckboxRecords()
      if (this.designLength.length !== 1) {
        this.$message({
          message: '请选择且仅可以选择一项',
          type: 'error',
        })
      } else {
        this.cancelContainer = this.designLength[0]['设计编号']
      }
    },
    // 大类样式上方下拉框改变
    bigClassChange() {
      this.$api.business
        .BatchEditProduct({
          model: {
            FlagCode: '',
            ProductClass: this.cancelContainer,
            IsAll: 0,
          },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.bogClassList = res.data
            this.styleEdit = this.bogClassList[0].Code
          }
        })
        .catch((err) => console.log(err))
    },
    clickMain(row) {
      var index = this.shopList.findIndex((item) => {
        return item.Name === row.row.站点
      })
      var Shop = this.shopList[index].id
      this.$api.business
        .GetEOperateWorkbenchLeft({
          model: {
            Status: '03',
            OrderType: '10',
            Shop: Shop,
            P_Code: row.row.产品号,
          },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.detailedList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    // 下单
    placeOrder() {
      this.chooseLength = this.$refs.mainTable.getCheckboxRecords()
      this.chooseLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.chooseLength.length < 1) {
        this.$message({
          message: '请先勾选',
          type: 'error',
        })
      } else {
        var flag = this.chooseLength.every((item) => {
          return item.站点 === this.chooseLength[0].站点
        })
        if (flag) {
          this.addAialogVisible = true
          this.IsChina = false
          if (this.addProduceList.length) {
            return
          } else {
            let nullObj = { ProductNo: '' }
            this.addProduceList.push(nullObj)
          }
          var details = ''
          this.chooseLength.forEach((item) => {
            details +=
              item.产品号 +
              this.columnIcon +
              item.建议下单 +
              this.columnIcon +
              'JL040' +
              '◆'
          })
          this.$api.business
            .GetEOperateWorkbenchOrder({
              Details: details,
            })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.IsChina = true
                this.addProduceList = res.data
                this.addOrderParams.contractCode = ''
                this.addOrderParams.currency = ''
                this.addOrderParams.contractNo = ''
                this.addOrderParams.remark = ''
                this.addOrderParams.shop = ''
              }
            })
            .catch((err) => console.log(err))
        } else {
          this.$message({
            message: '不同站点不能一起下单',
            type: 'error',
          })
        }
      }
    },
    infoOkDialog() {
      this.getOperateWorkbenchinfoList()
    },
    // 点击销售趋势按钮
    salesPislist() {
      this.chooseLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.chooseLength.length < 1) {
        this.$message({
          message: '请先勾选',
          type: 'error',
        })
      } else {
        var strList = ''
        this.isdbclick = false
        this.saleDaialogVisible = true
        this.chooseLength.forEach((item) => {
          strList += item.站点代码 + this.columnIcon + item.产品号 + '◆'
        })
        this.$api.business
          .GetEOperateWorkbenchEcharts({
            strList: strList,
            SaleType: this.sales,
          })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              if (this.sales === 'WEEK') {
                var seriesArr = []
                var ProductNoArr = []
                var XName = []
                var valueArr = []
                res.data[0].forEach((item, index) => {
                  for (let key in res.data[0][index]) {
                    if (res.data[0][index].hasOwnProperty(key)) {
                      // foo
                      valueArr.push(res.data[0][index][key])

                      var valueArr1 = valueArr.slice(
                        16 * index + 3,
                        16 * index + 16
                      )
                      XName = Object.keys(res.data[0][index])
                    }
                  }
                  XName.splice(0, 3)
                  seriesArr[index] = {
                    name: item.产品号,
                    type: 'line',
                    data: valueArr1,
                  }
                  ProductNoArr.push(item.产品号)
                })
                this.XName = XName
                this.seriesArr = seriesArr
              } else if (this.sales === 'TMonth') {
                var seriesArr = []
                var ProductNoArr = []
                var XName = []
                var valueArr = []
                res.data[0].forEach((item, index) => {
                  for (let key in res.data[0][index]) {
                    if (res.data[0][index].hasOwnProperty(key)) {
                      // foo
                      valueArr.push(res.data[0][index][key])
                      var valueArr2 = valueArr.slice(
                        15 * index + 0,
                        15 * index + 3
                      )
                      var valueArr3 = valueArr.slice(
                        15 * index + 6,
                        15 * index + 15
                      )
                      var valueArr1 = valueArr3.concat(valueArr2)
                    }
                  }
                  seriesArr[index] = {
                    name: item.产品号,
                    type: 'line',
                    data: valueArr1,
                  }
                  ProductNoArr.push(item.产品号)
                })
                XName = [
                  '01',
                  '02',
                  '03',
                  '04',
                  '05',
                  '06',
                  '07',
                  '08',
                  '09',
                  '10',
                  '11',
                  '12',
                ]
                var seriesArr1 = []
                var ProductNoArr1 = []
                var XName1 = []
                var valueArr2 = []
                res.data[1].forEach((item, index) => {
                  for (let key in res.data[1][index]) {
                    if (res.data[1][index].hasOwnProperty(key)) {
                      // foo
                      valueArr2.push(res.data[1][index][key])

                      var valueArr3 = valueArr2.slice(
                        9 * index + 0,
                        9 * index + 6
                      )
                      var valueArr1 = valueArr3
                      XName1 = Object.keys(res.data[1][index])
                    }
                  }
                  XName1.splice(6, 3)
                  seriesArr1[index] = {
                    name: item.产品号,
                    type: 'line',
                    data: valueArr1,
                  }
                  ProductNoArr1.push(item.产品号)
                })
              } else {
                var seriesArr = []
                var ProductNoArr = []
                var XName = []
                var valueArr = []
                res.data[0].forEach((item, index) => {
                  for (let key in res.data[0][index]) {
                    if (res.data[0][index].hasOwnProperty(key)) {
                      // foo
                      valueArr.push(res.data[0][index][key])
                      var valueArr1 = valueArr.slice(
                        15 * index + 3,
                        15 * index + 15
                      )
                      XName = Object.keys(res.data[0][index])
                    }
                  }
                  XName.splice(0, 3)
                  seriesArr[index] = {
                    name: item.产品号,
                    type: 'line',
                    data: valueArr1,
                  }
                  ProductNoArr.push(item.产品号)
                })
              }

              if (!this.isDays && this.sales !== 'TMonth') {
                var seriesArr1 = []
                var ProductNoArr1 = []
                var XName1 = []
                var valueArr2 = []
                res.data[1].forEach((item, index) => {
                  for (let key in res.data[1][index]) {
                    if (res.data[1][index].hasOwnProperty(key)) {
                      // foo
                      valueArr2.push(res.data[1][index][key])
                      var valueArr1 = valueArr2.slice(
                        15 * index + 3,
                        15 * index + 15
                      )
                      XName1 = Object.keys(res.data[1][index])
                    }
                  }
                  XName1.splice(0, 3)
                  seriesArr1[index] = {
                    name: item.产品号,
                    type: 'line',
                    data: valueArr1,
                  }
                  ProductNoArr1.push(item.产品号)
                })
              }
              this.$nextTick(() => {
                //2.初始化
                this.chart = Echarts.init(this.$refs.chart)
                //3.配置数据
                let option = {
                  title: {
                    text: '趋势折线图',
                  },
                  tooltip: {
                    trigger: 'axis',
                  },
                  legend: {
                    data: ProductNoArr,
                  },
                  toolbox: {
                    show: true,
                    feature: {
                      magicType: { show: true, type: ['stack', 'tiled'] },
                      saveAsImage: { show: true },
                    },
                  },
                  xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: XName,
                  },
                  yAxis: {
                    type: 'value',
                  },
                  series: seriesArr,
                }
                // 4.传入数据
                this.chart.setOption(option, true)
                if (!this.isDays) {
                  //2.初始化
                  this.chart1 = Echarts.init(this.$refs.chart1)
                  //3.配置数据
                  let option1 = {
                    tooltip: {
                      trigger: 'axis',
                    },
                    legend: {
                      data: ProductNoArr1,
                    },
                    toolbox: {
                      show: true,
                      feature: {
                        magicType: { show: true, type: ['stack', 'tiled'] },
                        saveAsImage: { show: true },
                      },
                    },
                    xAxis: {
                      type: 'category',
                      boundaryGap: false,
                      data: XName1,
                    },
                    yAxis: {
                      type: 'value',
                    },
                    series: seriesArr1,
                  }
                  // 4.传入数据
                  this.chart1.setOption(option1, true)
                  seriesArr1 = []
                  XName1 = []
                  ProductNoArr1 = []
                }
              })
            }
          })
          .catch((err) => console.log(err))
      }
    },
    salesSelectChange() {
      if (this.sales == 'Days' || this.sales == 'WEEK') {
        this.isDays = true
        if (this.isdbclick) {
          this.dblclickCopy()
        } else {
          this.salesPislist()
        }
      } else {
        this.isDays = false
        if (this.isdbclick) {
          this.dblclickCopy()
        } else {
          this.salesPislist()
        }
      }
    },
    // 查询
    search() {
      this.loading = true
      this.getOperateWorkbenchinfoList()
    },
    IconShow() {
      this.iconShow = !this.iconShow
    },
    chooseProduct() {
      if (this.IsOnlyOnce === true && this.chooseList.length !== 1) {
        this.$message({
          type: 'error',
          message: '通过图标进入此界面，每次只能加一条产品',
        })
      } else {
        let concatArr = this.chooseList.concat(this.addProduceList)
        // let concatLength = concatArr.length
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
          addProduce.forEach((item) => {
            if (item.产品号 !== undefined) {
              chooseInfoParams.push(item.产品号)
            }
          })
          this.$api.order
            .ProductInfo({ ProductNoList: chooseInfoParams })
            .then((res) => {
              if (res.statusCode !== 200) {
                this.$message({
                  message: res.message,
                  type: 'error',
                })
              } else {
                this.addProduceList = res.data.concat(this.addProduceList)

                var preLength = this.addProduceList.length
                for (var i = 0; i < this.addProduceList.length - 1; i++) {
                  for (var j = i + 1; j < this.addProduceList.length; j++) {
                    if (
                      this.addProduceList[i].ProductNo ==
                      this.addProduceList[j].ProductNo
                    ) {
                      this.addProduceList.splice(i, 1)
                      j--
                      //因为数组长度i减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
                    }
                  }
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
                    }
                  })

                  this.addProduceList = deWeight(this.addProduceList)
                }
                var fanLength = this.addProduceList.length
                if (preLength !== fanLength) {
                  this.$message({
                    message: '有重复勾选项，已删除',
                    type: 'error',
                  })
                }
              }
            })
            .catch((err) => console.log(err))
        }

        if (
          this.addProduceList[this.addProduceList.length - 1].ProductNo === ''
        ) {
          this.addProduceList.splice(this.addProduceList.length - 1, 1)
        }
        this.chooseList = []
        chooseInfoParams = []
        this.chooseDaialogVisible = false
      }
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
    unboxedPageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作(选择产品表)
      this.unboxedPaging.data = this.unboxedList
      this.unboxedPaging.total = this.unboxedPaging.data.length
      this.unboxedGetList()
    },
    // 处理数据
    unboxedGetList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.unboxedPaging.data = this.unboxedPaging.data.filter(
        (item, index) =>
          index < this.unboxedPaging.page * this.unboxedPaging.limit &&
          index >= this.unboxedPaging.limit * (this.unboxedPaging.page - 1)
      )
    },
    unboxedHandleSizeChange(val) {
      this.unboxedPaging.limit = val
      this.choosePageList()
    },
    unboxedHandleCurrentChange(val) {
      this.unboxedPaging.page = val
      this.unboxedGetList()
    },
    productPageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作(选择产品表)
      this.productPaging.data = this.productdList
      this.productPaging.total = this.productPaging.data.length
      this.productGetList()
    },
    // 处理数据
    productGetList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.productPaging.data = this.productPaging.data.filter(
        (item, index) =>
          index < this.productPaging.page * this.productPaging.limit &&
          index >= this.productPaging.limit * (this.productPaging.page - 1)
      )
    },
    productHandleSizeChange(val) {
      this.productPaging.limit = val
      this.productPageList()
    },
    productHandleCurrentChange(val) {
      this.productPaging.page = val
      this.productPageList()
    },
    designPageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作(选择产品表)
      this.designPaging.data = this.DesignNumList
      this.designPaging.total = this.designPaging.data.length
      this.unboxedGetList()
    },
    // 处理数据(选择产品表)
    designGetList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.designPaging.data = this.designPaging.data.filter(
        (item, index) =>
          index < this.designPaging.page * this.designPaging.limit &&
          index >= this.designPaging.limit * (this.designPaging.page - 1)
      )
    },
    // 当每页数量改变(选择产品表)
    designHandleSizeChange(val) {
      this.designPaging.limit = val
      this.designPageList()
    },
    // 当当前页改变(选择产品表)
    designHandleCurrentChange(val) {
      this.designPaging.page = val
      this.designPageList()
    },
    // 获取电商运营平台数据
    getOperateWorkbenchinfoList() {
      if (this.searchParams.saleQty1 === '') {
        this.searchParams.saleQty1 = 0
      }
      if (this.searchParams.saleQty2 === '') {
        this.searchParams.saleQty2 = 0
      }
      if (this.searchParams.stockQty1 === '') {
        this.searchParams.stockQty1 = 0
      }
      if (this.searchParams.stockQty2 === '') {
        this.searchParams.stockQty2 = 0
      }
      this.loading = true
      this.OperationPlatformList = []
      this.$api.business
        .Operate({ model: { ...this.searchParams } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.OperationPlatformList = res.data
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.searchParams.saleQty1 = ''
          this.searchParams.saleQty2 = ''
          this.searchParams.stockQty1 = ''
          this.searchParams.stockQty2 = ''
          this.loading = false
        })
    },
    dblclickCopy() {
      var strList =
        this.row.row.站点代码 + this.columnIcon + this.row.row.产品号 + '◆'
      this.$api.business
        .GetEOperateWorkbenchEcharts({
          strList: strList,
          SaleType: this.sales,
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            if (this.sales === 'WEEK') {
              var seriesArr = []
              var ProductNoArr = []
              var XName = []
              var valueArr = []
              res.data[0].forEach((item, index) => {
                for (let key in res.data[0][index]) {
                  if (res.data[0][index].hasOwnProperty(key)) {
                    // foo
                    valueArr.push(res.data[0][index][key])

                    var valueArr1 = valueArr.slice(
                      16 * index + 3,
                      16 * index + 16
                    )
                    XName = Object.keys(res.data[0][index])
                  }
                }
                XName.splice(0, 3)
                seriesArr[index] = {
                  name: item.产品号,
                  type: 'line',
                  data: valueArr1,
                }
                ProductNoArr.push(item.产品号)
              })
            } else if (this.sales === 'TMonth') {
              var seriesArr = []
              var ProductNoArr = []
              var XName = []
              var valueArr = []
              res.data[0].forEach((item, index) => {
                for (let key in res.data[0][index]) {
                  if (res.data[0][index].hasOwnProperty(key)) {
                    // foo
                    valueArr.push(res.data[0][index][key])
                    var valueArr2 = valueArr.slice(
                      15 * index + 0,
                      15 * index + 3
                    )
                    var valueArr3 = valueArr.slice(
                      15 * index + 6,
                      15 * index + 15
                    )
                    var valueArr1 = valueArr3.concat(valueArr2)
                  }
                }
                seriesArr[index] = {
                  name: item.产品号,
                  type: 'line',
                  data: valueArr1,
                }
                ProductNoArr.push(item.产品号)
              })
              XName = [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
                '12',
              ]
              var seriesArr1 = []
              var ProductNoArr1 = []
              var XName1 = []
              var valueArr2 = []
              res.data[1].forEach((item, index) => {
                for (let key in res.data[1][index]) {
                  if (res.data[1][index].hasOwnProperty(key)) {
                    // foo
                    valueArr2.push(res.data[1][index][key])

                    var valueArr3 = valueArr2.slice(
                      9 * index + 0,
                      9 * index + 6
                    )
                    var valueArr1 = valueArr3
                    XName1 = Object.keys(res.data[1][index])
                  }
                }
                XName1.splice(6, 3)
                seriesArr1[index] = {
                  name: item.产品号,
                  type: 'line',
                  data: valueArr1,
                }
                ProductNoArr1.push(item.产品号)
              })
            } else {
              var seriesArr = []
              var ProductNoArr = []
              var XName = []
              var valueArr = []
              res.data[0].forEach((item, index) => {
                for (let key in res.data[0][index]) {
                  if (res.data[0][index].hasOwnProperty(key)) {
                    // foo
                    valueArr.push(res.data[0][index][key])
                    var valueArr1 = valueArr.slice(
                      15 * index + 3,
                      15 * index + 15
                    )
                    XName = Object.keys(res.data[0][index])
                  }
                }
                XName.splice(0, 3)
                seriesArr[index] = {
                  name: item.产品号,
                  type: 'line',
                  data: valueArr1,
                }
                ProductNoArr.push(item.产品号)
              })
            }

            if (!this.isDays && this.sales !== 'TMonth') {
              var seriesArr1 = []
              var ProductNoArr1 = []
              var XName1 = []
              var valueArr2 = []
              res.data[1].forEach((item, index) => {
                for (let key in res.data[1][index]) {
                  if (res.data[1][index].hasOwnProperty(key)) {
                    // foo
                    valueArr2.push(res.data[1][index][key])
                    var valueArr1 = valueArr2.slice(
                      15 * index + 3,
                      15 * index + 15
                    )
                    XName1 = Object.keys(res.data[1][index])
                  }
                }
                XName1.splice(0, 3)
                seriesArr1[index] = {
                  name: item.产品号,
                  type: 'line',
                  data: valueArr1,
                }
                ProductNoArr1.push(item.产品号)
              })
            }
            this.$nextTick(() => {
              //2.初始化
              this.chart = Echarts.init(this.$refs.chart)
              //3.配置数据
              let option = {
                title: {
                  text: '趋势折线图',
                },
                tooltip: {
                  trigger: 'axis',
                },
                legend: {
                  data: ProductNoArr,
                },
                toolbox: {
                  show: true,
                  feature: {
                    magicType: { show: true, type: ['stack', 'tiled'] },
                    saveAsImage: { show: true },
                  },
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: XName,
                },
                yAxis: {
                  type: 'value',
                },
                series: seriesArr,
              }
              // 4.传入数据
              this.chart.setOption(option, true)
              seriesArr = []
              XName = []
              ProductNoArr = []
              if (!this.isDays) {
                //2.初始化
                this.chart1 = Echarts.init(this.$refs.chart1)
                //3.配置数据
                let option1 = {
                  tooltip: {
                    trigger: 'axis',
                  },
                  legend: {
                    data: ProductNoArr1,
                  },
                  toolbox: {
                    show: true,
                    feature: {
                      magicType: { show: true, type: ['stack', 'tiled'] },
                      saveAsImage: { show: true },
                    },
                  },
                  xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: XName1,
                  },
                  yAxis: {
                    type: 'value',
                  },
                  series: seriesArr1,
                }
                // 4.传入数据
                this.chart1.setOption(option1, true)
                seriesArr1 = []
                XName1 = []
                ProductNoArr1 = []
              }
            })
          }
        })
        .catch((err) => console.log(err))
    },
    //双击单元格触发的事件
    dblclick(row) {
      this.saleDaialogVisible = true
      this.isdbclick = true
      this.row = row
      this.dblclickCopy()
    },
    //点击催单弹出层
    reminder() {
      this.chooseLength = this.$refs.mainTable.getCheckboxRecords()
      this.chooseLength = this.$refs.mainTable.getCheckboxRecords()
      if (this.chooseLength.length < 1) {
        this.$message({
          message: '请先勾选',
          type: 'error',
        })
      } else {
        this.RemindersDaialogVisible = true
        var str = ''
        this.chooseLength.forEach((item) => {
          str += item.产品号 + this.columnIcon
        })
        this.reminderParams.id = str
        this.$api.reminder
          .searchReminder({ model: { ...this.reminderParams } })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.showReminder = true
              this.$nextTick(() => {
                setTimeout(() => {
                  this.$refs.openReminder.bottomTableLeft = res.data
                }, 500)
              })
            }
          })
          .catch((err) => {
            this.$message({
              message: err,
              type: 'error',
            })
          })
      }
    },

    //电商订单部分
    // 选择产品
    chooseOrder() {
      this.chooseDaialogVisible = true
      this.isSelectDisable = false
      this.IsOnlyOnce = false
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
    // 查询产品
    chooseSearch() {
      this.chooseOrder()
    },
    // 删除
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
              this.addProduceList.push({ ProductNO: '' })
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
    // 电商订单选中事件
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
    // 电商订单全选事件
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
    // 数量编辑框数去焦点
    reminderNumBlurEvent(row) {
      this.$set(row, '取消数量', '')
      if (row.取消数量 === '') {
        if (Number(row.数量) === NaN) {
          Number(row.数量) === 0
        }
        row.原始数量 = Number(row.数量)
      } else {
        row.原始数量 = Number(row.数量) - Number(row.取消数量)
      }
    },
    reminderBlurEvent(row) {
      row.数量 = Number(row.原始数量) - Number(row.取消数量)
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
    // 保存订单
    async saveOrder() {
      const errMap = await this.$refs.addTable //vxe-table表格数据校验
        .validate(true)
        .catch((errMap) => errMap)
      if (errMap) {
        return
      } else {
        this.$refs.addForm.validate((valid) => {
          if (!valid) return //文本域校验，必填项

          if (!this.IsChina) {
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
                  this.addProduceList[i].ColorNo +
                  this.columnIcon +
                  this.addProduceList[i].Color +
                  this.columnIcon +
                  this.addProduceList[i].数量 +
                  this.columnIcon +
                  this.addProduceList[i].取消数量 +
                  this.columnIcon +
                  this.addProduceList[i].原始数量 +
                  this.columnIcon +
                  this.addProduceList[i].BoxUnit +
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
                } else {
                  this.getOrderList()
                  this.delLength = []
                  this.addAialogVisible = false
                }
              })
              .catch((err) => console.log(err))
          } else {
            var strlist = ''
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
                  this.addProduceList[i].尺寸单位.trim() +
                  this.columnIcon +
                  this.addProduceList[i].色号 +
                  this.columnIcon +
                  this.addProduceList[i].颜色 +
                  this.columnIcon +
                  this.addProduceList[i].数量 +
                  this.columnIcon +
                  this.addProduceList[i].取消数量 +
                  this.columnIcon +
                  this.addProduceList[i].原始数量 +
                  this.columnIcon +
                  this.addProduceList[i].单位 +
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
                } else {
                  this.getOrderList()
                  this.delLength = []
                  this.addAialogVisible = false
                }
              })
              .catch((err) => console.log(err))
          }
        })
      }
    },
    // 选择产品界面选择事件
    onChooseCheckboxChange(row) {
      if (row.checked) {
        if (this.IsOnlyOnce === true && row.records.length !== 1) {
          this.$message({
            message: '通过图标进入此界面，每次只能加一条产品!',
            type: 'error',
          })
        }
        this.chooseList.push(row.row)
      } else {
        var Delindex = this.chooseList.findIndex((item, index) => {
          return item === row.row
        })
        this.chooseList.splice(Delindex, 1)
      }
    },
    // 选择产品界面全选事件
    onChooseCheckboxAllChange(row) {
      if (row.checked) {
        if (this.IsOnlyOnce === true && row.records.length !== 1) {
          this.$message({
            message: '通过图标进入此界面，每次只能加一条产品!',
            type: 'error',
          })
        }
        this.chooseList = row.records
      } else {
        this.chooseList = []
      }
    },
    // 复选框触发事件
    onCheckboxChange(row) {
      if (row.checked) {
        this.chooseLength = this.$refs.mainTable.getCheckboxRecords()
        this.chooseLength.forEach((item) => {
          item.Packages = item.建议发货
        })
      } else {
        this.chooseLength = this.$refs.mainTable.getCheckboxRecords()
        this.chooseLength.forEach((item) => {
          item.Packages = item.建议发货
        })
      }
    },
    //未装单单元格被点击
    unboxed(row) {
      this.$api.business
        .Details({
          UserCode: '',
          strMessage: '',
          ObjectCode: 'FZ002',
          Key: row.产品号,
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.data.message,
              type: 'error',
            })
          } else {
            this.unboxedList = res.data
            this.unboxedFilterList = res.data
            this.unboxedPageList()
          }
        })
        .catch((err) => console.log(err))
      this.unboxedVisible = true
    },
    //生产中单元格被点击
    production(row) {
      this.$api.business
        .Details({
          UserCode: '',
          strMessage: '',
          ObjectCode: 'FZ003',
          Key: row.产品号,
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.data.message,
              type: 'error',
            })
          } else {
            this.productdList = res.data
            this.productdFilterList = res.data
            this.productPageList()
          }
        })
        .catch((err) => console.log(err))
      this.productionVisible = true
    },
    onCheckboxAllChange(row) {
      if (row.checked) {
        this.chooseLength = this.$refs.mainTable.getCheckboxRecords()
        this.chooseLength.forEach((item) => {
          item.Packages = item.建议发货
        })
      } else {
        this.chooseLength = this.$refs.mainTable.getCheckboxRecords()
      }
    },
    // 在途明细
    DeetailfooterMethod({ columns, data }) {
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

          return null
        }),
      ]
      return footerData
    },

    // 选定产品清单
    chooseProductfooterMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          }
          switch (column.property) {
            case '建议下单':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].建议下单)
              }
              return sums
            case 'Packages':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].Packages)
              }
              return sums
          }

          return null
        }),
      ]
      return footerData
    },

    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          switch (column.property) {
            case '最近一周':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].最近一周
              }
              return sums
              break
            case '最近一月':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].最近一月
              }
              return sums
              break
            case '最近三月平均':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].最近三月平均
              }
              return sums
              break
            case '最近一年平均':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].最近一年平均
              }
              return sums
              break
            case '平均周销量':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].平均周销量
              }
              return sums
              break
            case '最大周销量':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].最大周销量
              }
              return sums
              break
            case '预计周销量':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].预计周销量
              }
              return sums
              break
            case '预期总销量':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += data[i].预期总销量
              }
              return sums
              break
            case '在途合计':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].在途合计)
              }
              return sums
              break
            case '亚马逊':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].亚马逊)
              }
              return sums
              break
            case '已到仓':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].已到仓)
              }
              return sums
              break
            case '含在途':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].含在途)
              }
              return sums
              break
            case '已装箱':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].已装箱)
              }
              return sums
              break
            case '未装箱':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].未装箱)
              }
              return sums
              break
            case '生产中':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].生产中)
              }
              return sums
              break
            case '每周产量':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].每周产量)
              }
              return sums
              break
            case '未下单生产':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].未下单生产)
              }
              return sums
              break
            case '建议下单':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].建议下单)
              }
              return sums
              break
            case '建议发货':
              sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].建议发货)
              }
              return sums
              break
          }
          return null
        }),
      ]
      return footerData
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
      this.$set(this.addOrderParams, 'cDate', toMonth)
    },
    // 获取站点列表
    addProductState() {
      this.$api.publicApi
        .basShop()
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.data.message,
              type: 'error',
            })
          } else {
            this.shopList = res.data
            this.searchParams.shop = this.shopList[0].id
            this.getOperateWorkbenchinfoList()
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
    // 获取国家列表
    addProductCountry() {
      this.$api.publicApi
        .bcState()
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.data.message,
              type: 'error',
            })
          } else {
            this.countryList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    // 获取条件列表
    getViewList() {
      this.$api.publicApi
        .address({ model: { type: 'view', query: { QueryNo: 'AMZ1' } } })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.data.message,
              type: 'error',
            })
          } else {
            this.viewList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        this.gridHeight = card - queryRow - 80
      })
    },
  },
  created() {
    this.getViewList()
    this.addProductCurrency()
    this.addProductState()
    this.addProductCountry()
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
>>> .cellCorlor1 {
  background-color: #d5deff;
}
>>> .cellCorlor2 {
  background: #fff1f2;
}
>>> .cellCorlor3 {
  background: #d8f8f7;
}
>>> .cellCorlor4 {
  background: #d0eaff;
}
>>> .cellCorlor5 {
  background: #fff2cd;
}
>>> .cellCorlor6 {
  background: #d5deff;
}
.el-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
>>> .blueSize {
  color: #5473e8;
}
.el-card {
  >>> .iconBtn {
    width: 100px;
    height: 32px;
    background: #5473e8;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #fcfefe;
    padding: 0;
  }
  >>> .smallIconBtn {
    width: 70px;
    height: 32px;
    background: #ff9b22;
  }

  >>> .el-card__body {
    padding: 0;
  }
  padding: 10px;
  margin-top: 5px;
  .floatCircle {
    float: right;
    .cricle1 {
      width: 10px;
      height: 10px;
      display: inline-block;
      background: #fff1f2;
      border: 1px solid #c7c6de;
      border-radius: 50%;
    }
    .cricle2 {
      width: 10px;
      height: 10px;
      display: inline-block;
      background: #d8f8f7;
      border: 1px solid #c7c6de;
      border-radius: 50%;
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
    .cricle3 {
      width: 10px;
      height: 10px;
      display: inline-block;
      background: #d0eaff;
      border: 1px solid #c7c6de;
      border-radius: 50%;
    }
    .cricle4 {
      width: 10px;
      height: 10px;
      display: inline-block;
      background: #fff2cd;
      border: 1px solid #c7c6de;
      border-radius: 50%;
    }
  }
}
>>> .marginL {
  margin-left: 10px;
}
.colHeight .el-col {
  height: 40px;
}
>>> .productEdit {
  display: block;
  width: 100%;
  height: 200px;
}

.delBtn {
  width: 70px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
>>> .None-Border input {
  height: 27px;
}
>>> .dbInput {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 30px;
  background: rgba(255, 255, 255, 0);
  border: 1px solid #c7c6de;
  border-radius: 2px;
  box-sizing: border-box;
  >>> .midInputLine {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 99;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 2px;
    background-color: #c7c6de;
  }
}

>>> .chooseEnter {
  width: 70px;
  height: 32px;
  background: #5473e8;
  border-radius: 2px;
  line-height: 32px;
  padding: 0;
}
>>> .hearderClass {
  text-align: center;
  font-size: 14px;
  height: 36px;
  background-color: #d5deff;
}
>>> .cellChooseClassLeft {
  height: 45px;
  line-height: normal;
}
>>> .cellChooseClass {
  height: 28px;
}
>>> .el-input__inner {
  height: 30px;
}
>>> .el-form-item__content {
  line-height: normal;
}
>>> .dbInput2 {
  width: 270px;
}
>>> .unifySize {
  height: 32px;
  >>> .el-input__icon {
    line-height: normal;
  }
  >>> .size--mini {
    height: 30px;
  }
  >>> input {
    height: 30px;
  }
  >>> .vxe-input--inner {
    border-radius: 2px;
  }
}
.PicStyle {
  display: block;
  width: 100px;
  height: 100px;
}
>>> .unifySize1 {
  width: 100%;
}
.mixInput {
  display: flex;
  height: 30px;
  width: 80%;
  border: 1px solid #dcdfe6;

  >>> .el-input-group__append {
    border: none;
    width: 30px;
    padding: 0;
  }
  >>> .saleLeft {
    width: 160%;
  }
  >>> .el-input__inner {
    border-radius: 0px;
  }
}
.iconC {
  font-size: 22px;
  color: #5473e8;
}
>>> .prepend .el-input-group__prepend {
  border: none !important;
  border-radius: 0px !important;
}
>>> .el-form-item__label {
  color: #606266;
  line-height: 30px;
}
>>> .search {
  width: 220px;
}

>>> .search2 input {
  margin-left: -10px;
  width: 80px;
  padding-right: 0;
}
>>> .saleSelect {
  width: 90px;
  border-radius: 0px;
  >>> .el-input__icon {
    line-height: 0px;
  }
}
>>> .iconP {
  font-size: 22px;
  color: #5473e8;
  float: right;
  transform: rotate(90deg);
}

>>> .saveDate {
  width: 49%;
}
.secondBtn {
  font-size: 14px;
  color: #333;
  li {
    float: left;
    margin-left: 24px;
  }
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

>>> .el-input__icon {
  height: 120%;
}
>>> .firstCard {
  margin-top: 0px;
}
>>> .mingxiqingdan {
  display: flex;
  justify-content: space-between;
}
>>> .footerCellClassName {
  height: 30px;
  font-family: 'Microsoft YaHei';
  background: #d1f3ff;
}
>>> .el-input--suffix .el-input__inner {
  padding-right: 30px;
  height: 30px;
}
>>> .jy-dialog .jy-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
.alignC {
  text-align: center;
}
.closeInput {
  background: #36c2cf;
  border: 1px solid #36c2cf;
  width: 70px !important;
  height: 30px !important;
}

>>> .leftMargin {
  margin-left: 45px;
}
.searchBtn {
  width: 70px !important;
  height: 30px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
>>> .el-button--small,
.el-button--small.is-round {
  padding: 5px 10px;
}
>>> .el-button + .el-button {
  margin-left: 0px;
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
.treeContainer {
  display: block;
  overflow-y: auto;
  height: 500px;
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

>>> .el-form-item__label {
  padding: 0px;
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
>>> .marginLE {
  margin-left: 35px;
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
>>> .deliverGoods .el-col {
  height: 45px;
  .el-input__icon {
    line-height: 30px;
    height: 100%;
  }
  .check {
    margin-top: 7px;
    margin-left: 20px;
  }
}
</style>