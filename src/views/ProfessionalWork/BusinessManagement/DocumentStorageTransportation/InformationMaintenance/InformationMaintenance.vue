<template>
  <el-container id="mainCard">
    <!-- 报关商品信息维护 -->
    <el-row style="width: 100%">
      <el-col>
        <el-card class="cardMargin" id="queryRow">
          <el-row>
            <el-col>
              <el-form
                ref="mainForm"
                :model="QueryParamsTable"
                style="font-size：14px"
                label-width="84px"
              >
                <el-row class="mainForm">
                  <el-col :md="12" :lg="6" :xl="5">
                    <el-form-item label="复核时间：">
                      <span class="blockSpan">
                        <div class="blockDate">
                          <el-date-picker
                            class="unifySize unifySizeDate"
                            v-model="QueryParamsTable.BeginDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                          ></el-date-picker>
                          <el-date-picker
                            class="unifySize unifySizeDate"
                            v-model="QueryParamsTable.EndDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                          ></el-date-picker>
                        </div>
                      </span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="复核状态："
                    >
                      <el-select
                        v-model="QueryParamsTable.HsStatus"
                        class="unifySize"
                        placeholder="复核状态"
                        clearable
                        @keydown.enter.native="searchEnter"
                      >
                        <el-option
                          :key="index"
                          v-for="(item, index) in HsStatus"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="4">
                    <el-form-item class="searchMargin" label="条件一：">
                      <el-input
                        v-model.trim="QueryParamsTable.chnName"
                        class="unifySize"
                        placeholder="产品名称"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="条件二："
                    >
                      <el-input
                        v-model="QueryParamsTable.query1"
                        class="unifySize"
                        placeholder="产品名称"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item
                      class="searchMargin"
                      style="margin-bottom: 0px"
                      label="条件三："
                    >
                      <el-input
                        v-model="QueryParamsTable.query2"
                        class="unifySize"
                        placeholder="产品名称"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="5" :lg="3" :xl="3">
                    <el-form-item class="searchMargin" label="大类：">
                      <el-input
                        v-model.trim="QueryParamsTable.ProductType"
                        class="unifySize"
                        placeholder="大类"
                        clearable
                        @keydown.enter.native="searchEnter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="3" :xl="3">
                    <el-button
                      type="danger"
                      class="searchBtn searchMargin"
                      size="small"
                      @click="searchOrderList"
                      :loading="IsSearch"
                      icon="iconfont kt-icon-sousuo_o"
                      >查询</el-button
                    >
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
            <!-- 按钮区域 -->
            <el-col class="secondBtn">
              <!-- <el-button
                type="primary"
                @click="ToSee"
                class="smBtn iconBtn el-icon-view"
                >查看</el-button
              > -->
              <el-button
                type="primary"
                class="iconBtn iconfont kt-icon-caidan"
                @click="addElementMaintain"
                >申报要素维护</el-button
              >
              <el-button
                type="primary"
                @click="ToReview"
                class="smBtn iconBtn el-icon-edit-outline"
                >复核</el-button
              >
              <el-button
                type="primary"
                class="iconBtn iconfont kt-icon-caidan"
                @click="ToBatchReview"
                >批量复核</el-button
              >
              <!-- <el-button type="primary" class="delBtn iconBtn el-icon-delete"
                >删除</el-button
              > -->

              <!-- <el-button
                type="primary"
                class="iconBtn iconfont kt-icon-caidan"
                @click="MatchingRules"
                >匹配规则设置</el-button
              > -->
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col>
        <el-row style="display: flex">
          <el-col class="leftMenu" :md="5" :lg="3" :xl="3">
            <el-row>
              <el-col class="title1">
                <div class="son">选择站点SKU</div>
                <!-- <el-button @click="getTreeData" type="text" class="refresh"
                  >刷新</el-button
                >
                <el-button @click="close" type="text" class="expand"
                  >全部折叠</el-button
                >
                <el-button @click="open" type="text" class="open"
                  >全部展开</el-button
                > -->
              </el-col>
              <el-col class="title">
                <el-input
                  class="searchTitle"
                  placeholder="输入关键字进行快速筛选"
                  v-model="filterText"
                  clearable
                >
                </el-input>
              </el-col>
              <el-col>
                <el-tree
                  :data="TreeList"
                  :props="defaultProps"
                  @node-click="handleNodeClick"
                  :filter-node-method="filterNode"
                  :expand-on-click-node="false"
                  :default-expanded-keys="treeExpandData"
                  node-key="id"
                  ref="tree"
                  highlight-current
                ></el-tree>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="mainTable" :md="18" :lg="21" :xl="21">
            <el-card style="margin-top：2px">
              <vxe-grid
                border
                resizable
                stripe
                ref="mainTable"
                :loading="tableLoading"
                show-footer
                :auto-resize="true"
                class="mytable-scrollbar"
                show-overflow="title"
                :header-row-class-name="hearderClass"
                :row-class-name="cellClass"
                :height="gridHeight * 0.95"
                :columns="columns"
                @checkbox-all="onAdjustmentCheckboxAllChange"
                @checkbox-change="onAdjustmentCheckboxChange"
                highlight-current-row
                :config="{ render: 'scroll' }"
                :align="'center'"
                :checkbox-config="{ highlight: true }"
                :data="MainTableList"
              >
                <template #HsCheckTIme="{ row }">
                  <span v-if="row['HsCheckTIme'] == null">{{ '' }}</span>
                  <span v-else>{{ row['HsCheckTIme'] | formatDate1 }}</span>
                </template>
                <template #P_chnName="{ row }">
                  <span>{{ row['P_chnName'] }}</span>
                  <br />
                  <span>{{ row['EngName'] }}</span>
                </template>
              </vxe-grid>
              <!-- 分页 -->
              <el-col class="closeTable">
                <el-pagination
                  class="pagination"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageInfo.page"
                  background
                  :page-sizes="[100, 200, 500, 1000]"
                  :page-size="pageInfo.pageSize"
                  :total="total"
                >
                </el-pagination>
              </el-col>
            </el-card>
          </el-col>
        </el-row>
        <!-- 主表区域 -->
      </el-col>
    </el-row>
    <!-- 新增复核弹出层 -->
    <el-dialog
      v-dialogDrag
      title="复核报关商品信息"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="addAialogVisible"
      @close="handleClose"
      height="500px"
      width="1250px"
    >
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
        :header-cell-class-name="hearderClass"
        :row-class-name="cellClass"
        height="480"
        show-footer
        highlight-current-row
        :edit-config="{ trigger: 'click', mode: 'cell' }"
        :align="'center'"
        :checkbox-config="{
          highlight: true,
          range: true,
          checkMethod: checkMethodDisable,
        }"
        :data="addProduceList"
      >
        <vxe-table-column type="seq" width="50" title="序号"></vxe-table-column>
        <vxe-table-column field="ProductNo" width="220" title="产品号">
        </vxe-table-column>
        <vxe-table-column
          width="260"
          field="ProductName"
          title="产品名称"
        ></vxe-table-column>
        <vxe-table-column
          width="100"
          field="BigClass"
          title="大类"
        ></vxe-table-column>
        <vxe-table-column
          field="HsCode"
          title="HS报关商品编码"
        ></vxe-table-column>
        <vxe-table-column
          field="P_chnName"
          width="200"
          title="报关商品名称"
          :edit-render="{
            name: 'ElSelect',
            options: roleList,
            optionProps: {
              value: 'ElementsId',
              label: 'chnName',
            },
            events: { change: roleChangeEvent },
          }"
        >
        </vxe-table-column>
        <!-- <vxe-table-column field="P_chnName" width="200" title="报关商品名称">
          <template slot-scope="{ row }">
            <el-select v-model="row.P_chnName" @change="roleChangeEvent">
              <el-option
                v-for="(item, index) in roleList"
                :key="index"
                :label="item.chnName + '(' + item.Currency + ')'"
                :value="item.ElementsId"
              ></el-option>
            </el-select>
          </template>
        </vxe-table-column> -->
      </vxe-table>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              type="primary"
              @click="saveProduct"
              :loading="ReviewLoading"
              :disabled="!isEdit ? true : false"
              :class="!isEdit ? 'saveBtn1' : 'saveBtn'"
              class="iconfont kt-icon-baocun"
              >确认</el-button
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
    </el-dialog>
    <!-- 新增弹出层结束 -->

    <!-- 新增批量复核弹出层 -->
    <el-dialog
      title="批量复核"
      v-dialogDrag
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="addBatchAialogVisible"
      :before-close="BatchHandleClose"
      height="500px"
      width="500px"
    >
      <div class="textTitle">将所选数据行匹配为同一种报关商品类型</div>
      <el-row>
        <el-col>
          <el-form
            :model="BatchRuleForm"
            :rules="Batchrules"
            ref="BatchruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="HS报关商品品名："
              label-width="130px"
              prop="ElementsId"
            >
              <el-select
                v-model="BatchRuleForm.ElementsId"
                filterable
                clearable
                placeholder="请选择报关商品品名"
              >
                <el-option
                  v-for="(item, index) in roleList"
                  :key="index"
                  :label="item.chnName"
                  :value="item.ElementsId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              type="primary"
              :disabled="!isEdit ? true : false"
              :class="!isEdit ? 'saveBtn1' : 'saveBtn'"
              class="iconfont kt-icon-baocun"
              :loading="BatchLoading"
              @click="BatchSaveProject"
              >确认</el-button
            >
            <el-button type="primary" class="clearBtn" @click="BatchReset"
              >取消</el-button
            >
          </el-col>
        </el-row>
      </span>
    </el-dialog>
    <!-- 新增批量复核弹出层结束 -->

    <!-- 申报要素维护弹出层 -->
    <JyDialog
      title="申报要素维护"
      v-dialogDrag
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="addElementAialogVisible"
      @close="ElementhandleClose"
      height="500px"
      width="1550px"
    >
      <el-row>
        <el-col class="secondBtn">
          <el-button
            type="primary"
            @click="addProductRow"
            class="smBtn iconBtn el-icon-edit-outline"
            >添加</el-button
          >
          <!-- <el-button
            type="primary"
            class="delBtn1 iconBtn el-icon-delete"
            @click="manyDelete"
            >批量删除</el-button
          > -->
        </el-col>
      </el-row>
      <vxe-table
        border
        ref="addElementTable"
        resizable
        stripe
        keep-source
        :auto-resize="true"
        style="margin-top: 11px"
        :header-cell-class-name="hearderClass"
        :row-class-name="cellHeightClass"
        :height="720"
        @checkbox-all="onDialogCheckboxAllChange"
        @checkbox-change="onDialogCheckboxChange"
        show-footer
        :loading="elementLoading"
        highlight-current-row
        :scroll-y="{ enabled: false }"
        :edit-rules="validRules"
        :edit-config="{ trigger: 'manual', mode: 'row' }"
        :align="'center'"
        :data="addElementList"
      >
        <vxe-table-column type="checkbox" width="40"></vxe-table-column>
        <vxe-table-column type="seq" width="50" title="序号"></vxe-table-column>
        <vxe-table-column
          field="hscode"
          width="200"
          title="HS报关商品编码"
          :edit-render="{ immediate: true, name: 'input' }"
        >
        </vxe-table-column>
        <vxe-table-column
          width="260"
          align="left"
          :edit-render="{
            name: 'input',
            attrs: { type: 'text' },
            autoselect: true,
          }"
          field="chnName"
          title="HS报关商品名称"
        >
          <template slot-scope="{ row }">
            <span>{{ row.chnName }}</span>
            <br />
            <span>{{ row.engName }}</span>
          </template>
          <template v-slot:edit="{ row }">
            <vxe-input type="text" v-model="row.chnName"></vxe-input>
            <vxe-input type="text" v-model="row.engName"></vxe-input>
          </template>
        </vxe-table-column>
        <!-- <vxe-table-column
          field="DeclarationElements"
          align="left"
          title="申报要素"
          class="elementHeight"
          :edit-render="{ immediate: true, name: 'text' }"
        >
          <template v-slot:edit="{ row }">
            <vxe-textarea
              v-model="row.DeclarationElements"
              class="textArea"
            ></vxe-textarea>
          </template>
        </vxe-table-column> -->
        <vxe-table-column
          minWidth="400"
          field="DeclarationElements"
          align="left"
          title="申报要素"
          class="elementHeight"
        >
        </vxe-table-column>
        <vxe-table-column
          width="160"
          field="CDUnitPrice"
          title="报关单价"
          :edit-render="{ immediate: true, name: 'input' }"
        ></vxe-table-column>
        <vxe-table-column
          :edit-render="{ immediate: true, name: 'input' }"
          width="160"
          field="CCLUnitPrice"
          title="清关单价"
        ></vxe-table-column>
        <vxe-table-column
          width="80"
          field="Currency"
          title="币种"
          :edit-render="{ immediate: true, name: 'input' }"
        ></vxe-table-column>
        <vxe-table-column width="160" title="操作">
          <template slot-scope="{ row }">
            <el-button
              class="iconB"
              icon="el-icon-caret-top"
              circle
              @click="upRowEvent(row)"
            ></el-button>
            <el-button
              class="iconB"
              icon="el-icon-caret-bottom"
              circle
              @click="downRowEvent(row)"
            ></el-button>
            <i class="iconC el-icon-edit" @click="editRowEvent(row)"></i>
            <i @click="iconDelProduct(row)" class="iconC el-icon-delete"></i>
          </template>
        </vxe-table-column>
      </vxe-table>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <!-- <el-button
              type="primary"
              @click="cancel"
              class="iconfont kt-icon-baocun saveBtn"
              >确认</el-button
            > -->
            <el-button
              type="primary"
              class="clearBtn"
              @click="addElementAialogVisible = false"
              >关闭</el-button
            >
          </el-col>
        </el-row>
      </span>
    </JyDialog>
    <!-- 新增弹出层结束 -->

    <!-- 申报要素规则弹出层后期追加 -->
    <el-dialog
      title="匹配规则设置"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="MatchingAialogVisible"
      :before-close="ElementMatchinghandleClose"
      height="500px"
      width="1250px"
    >
      <el-row>
        <el-col class="secondBtn1">
          <div>
            系统里的产品名称必须对应匹配为报关商品名称,改变规则会是使之前已复核的数据需要重新复核
          </div>
        </el-col>
      </el-row>
      <vxe-table
        border
        ref="addMatchingElementTable"
        resizable
        stripe
        keep-source
        :auto-resize="true"
        style="margin-top: 11px"
        show-overflow="title"
        width="auto"
        :header-cell-class-name="hearderClass"
        :row-class-name="cellHeightClass"
        height="480"
        @checkbox-all="onMatchingDialogCheckboxAllChange"
        @checkbox-change="onMatchingDialogCheckboxChange"
        highlight-current-row
        :edit-config="{ trigger: 'manual', mode: 'row' }"
        :align="'center'"
        :data="queryMatchingElementList"
      >
        <vxe-table-column type="checkbox" width="40"></vxe-table-column>
        <vxe-table-column type="seq" width="50" title="序号"></vxe-table-column>
        <vxe-table-column
          min-width="260"
          align="left"
          field="chnName"
          title="HS报关商品名称"
        >
          <template slot-scope="{ row }">
            <span>{{ row.chnName }}</span>
            <br />
            <span>{{ row.engName }}</span>
          </template>
          <template v-slot:edit="{ row }">
            <vxe-input
              type="text"
              v-model="row.chnName"
              style="width: 240px"
            ></vxe-input>
            <vxe-input
              type="text"
              v-model="row.engName"
              style="width: 240px"
            ></vxe-input>
          </template>
        </vxe-table-column>
        <vxe-table-colgroup title="规则1">
          <vxe-table-column
            :edit-render="{ immediate: true, name: 'input' }"
            field="RuleKey1"
            title="关键字"
          ></vxe-table-column>
          <vxe-table-column
            :edit-render="{
              name: 'select',
              options: Contain,
              props: { clearable: true },
              optionProps: { value: 'value', label: 'label' },
            }"
            field="RuleSymbol1"
            title="操作符"
          ></vxe-table-column>
        </vxe-table-colgroup>
        <vxe-table-colgroup title="规则2">
          <vxe-table-column
            :edit-render="{ immediate: true, name: 'input' }"
            field="RuleKey2"
            title="关键字"
          ></vxe-table-column>
          <vxe-table-column
            :edit-render="{
              name: 'select',
              options: Contain,
              props: { clearable: true },
              optionProps: { value: 'value', label: 'label' },
            }"
            field="RuleSymbol2"
            title="操作符"
          ></vxe-table-column>
        </vxe-table-colgroup>
        <vxe-table-colgroup title="规则3">
          <vxe-table-column
            :edit-render="{ immediate: true, name: 'input' }"
            field="RuleKey3"
            title="关键字"
          ></vxe-table-column>
          <vxe-table-column
            :edit-render="{
              name: 'select',
              options: Contain,
              props: { clearable: true },
              optionProps: { value: 'value', label: 'label' },
            }"
            field="RuleSymbol3"
            title="操作符"
          ></vxe-table-column>
        </vxe-table-colgroup>

        <vxe-table-column width="120" title="操作">
          <template slot-scope="{ row }">
            <i
              v-if="row.ElementsId !== ''"
              class="iconC el-icon-circle-plus-outline"
              @click="iconAddProductRules(row)"
            ></i>
            <i class="iconC el-icon-edit" @click="editRowRulesEvent(row)"></i>
            <i
              @click="iconDelRulesProduct(row)"
              class="iconC el-icon-delete"
            ></i>
          </template>
        </vxe-table-column>
      </vxe-table>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              type="primary"
              :disabled="!isEdit ? true : false"
              class="iconfont kt-icon-baocun saveBtn"
              >确认</el-button
            >
            <el-button
              type="primary"
              class="clearBtn"
              @click="ElementMatchinghandleClose"
              >取消</el-button
            >
          </el-col>
        </el-row>
      </span>
    </el-dialog>

    <!-- 新增修改弹框 -->
    <el-dialog
      v-dialogDrag
      :title="IsAdd === 'add' ? '新增申报要素' : '编辑申报要素'"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="AddDialogVisible"
      @close="ElementMatchinghandleClose"
      width="800px"
      height="600px"
    >
      <el-form
        label-width="100px"
        :model="Addform"
        ref="formLabelAlignRef"
        :rules="formLabelAlignRules"
        class="rightFrom"
      >
        <el-row>
          <el-col :md="24" :lg="12" :xl="12">
            <el-form-item
              prop="hscode"
              label-width="150px"
              label="HS报关商品编码："
            >
              <el-input
                v-model="Addform.hscode"
                class="unifySize"
                clearable
                placeholder="产品号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12" :xl="12">
            <el-form-item
              prop="CDUnitPrice"
              label-width="100px"
              label="报关单价："
            >
              <el-input
                v-model.trim="Addform.CDUnitPrice"
                class="unifySize"
                clearable
                placeholder="报关单价"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="searchMargin9">
          <el-col :md="24" :lg="12" :xl="12">
            <el-form-item
              prop="CCLUnitPrice"
              label-width="150px"
              label="清关单价："
            >
              <el-input
                v-model.trim="Addform.CCLUnitPrice"
                class="unifySize"
                clearable
                placeholder="清关单价"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12" :xl="12">
            <el-form-item prop="Currency" label-width="100px" label="币种：">
              <el-select class="unifySize" v-model="Addform.Currency" clearable>
                <el-option
                  :key="index"
                  v-for="(item, index) in currencyList"
                  :label="item.chnName"
                  :value="item.currency"
                ></el-option>
              </el-select>
              <!-- <el-input
                v-model.trim="Addform.CCLUnitPrice"
                class="unifySize"
                clearable
                placeholder="清关单价"
              ></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="searchMargin9">
          <el-col :md="24" :lg="12" :xl="12">
            <el-form-item
              prop="GrossWeight"
              label-width="150px"
              label="毛重/片："
            >
              <el-input
                v-model="Addform.GrossWeight"
                class="unifySize"
                clearable
                placeholder="请输入数字"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12" :xl="12">
            <el-form-item
              prop="NetWeight"
              label-width="100px"
              label="净重/片："
            >
              <el-input
                v-model.trim="Addform.NetWeight"
                class="unifySize"
                clearable
                placeholder="请输入数字"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="searchMargin9">
          <el-col :md="24" :lg="12" :xl="12">
            <el-form-item prop="Volume" label-width="150px" label="体积/箱：">
              <el-input
                v-model="Addform.Volume"
                class="unifySize"
                clearable
                placeholder="请输入数字"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12" :xl="12">
            <el-form-item prop="Area" label-width="100px" label="面积/片：">
              <el-input
                v-model.trim="Addform.Area"
                class="unifySize"
                clearable
                placeholder="请输入数字"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="searchMargin9">
          <el-col :md="24" :lg="24" :xl="24">
            <el-form-item
              prop="chnName"
              label-width="150px"
              label="HS报关商品中文名："
            >
              <el-input
                v-model="Addform.chnName"
                class="unifySize"
                clearable
                placeholder="HS报关商品中文名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="24" :xl="24">
            <el-form-item
              prop="engName"
              class="searchMargin9"
              label-width="150px"
              label="HS报关商品英文名："
            >
              <el-input
                v-model="Addform.engName"
                class="unifySize"
                clearable
                placeholder="HS报关商品英文名"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="searchMargin10">
          <el-col :md="24" :lg="12" :xl="24">
            <el-form-item
              prop="DeclarationElements"
              label="申报要素："
              label-width="150px"
            >
              <el-input
                type="textarea"
                placeholder="请输入（必填）"
                v-model="Addform.DeclarationElements"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="footer">
        <el-button
          type="primary"
          @click="editSaveProduct"
          :loading="saveAddLoading"
          class="iconfont kt-icon-baocun saveBtn"
          >确认</el-button
        >
        <el-button
          type="primary"
          class="clearBtn"
          @click="ElementMatchinghandleClose"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import JyDialog from '@/components/JyDialog/index'
export default {
  name: 'InformationMaintenance',
  components: {
    JyDialog,
  },
  data() {
    return {
      // 主表类
      ReviewLoading: false,
      IsSearch: false, //loading
      hearderClass: 'hearderClass',
      cellClass: 'cellClass',
      cellHeightClass: 'cellHeightClass',
      cellChooseClass: 'cellChooseClass',
      cellChooseClassLeft: 'cellChooseClassLeft',
      columnsClass: 'columnsClass',
      // bottomTableLeft: [],
      // bottomTableRight: [],
      //主表对象数据参数
      QueryParamsTable: {
        // UserCode: '',
        BeginDate: '',
        EndDate: '',
        ProductNo: '', //条码/产品号
        chnName: '', // 产品名称
        HsStatus: '0', // 状态
        ProductType: '', // 大类
        Inputer: '', // 复核人
        ClassNo: '',
        query1: '',
        query2: '',
        // tree节点
      },
      pageInfo: {
        page: 1,
        pageSize: 500,
      },
      total: null,
      // 主表loading
      tableLoading: false,
      MainTableList: [], //主表数据
      HsStatus: [
        { label: '', value: '' },
        { label: '未复核', value: '0' },
        { label: '已复核', value: '1' },
      ],
      treeStatus: false,
      filterText: '', //过滤内容
      TreeList: [], //树状的接口数据
      ChooseTreeList: [],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      treeExpandData: [], //自己定义接受treeid的数组
      provincialCenterId: '',
      // filterList: [], //待筛选数
      currencyList: [],
      // footerCellClassName: 'footerCellClassName',
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        {
          width: '80',
          title: '是否复核',
          field: 'HsStatusName',
        },
        {
          width: '70',
          title: '站点',
          field: 'ShopName',
        },
        // {
        //   width: '100',
        //   title: '目录名',
        //   field: 'CatelogueName',
        // },
        {
          width: '180',
          title: '产品号',
          field: 'ProductNo',
        },
        {
          minWidth: '280',
          align: 'left',
          title: '产品名',
          field: 'ProductName',
        },
        {
          width: '100',
          title: '大类',
          field: 'BigClass',
        },
        {
          width: '100',
          title: '样式',
          field: 'CustStyle',
        },
        {
          width: '60',
          title: '颜色',
          field: 'Color',
        },
        {
          width: '80',
          title: '尺寸',
          field: 'chnSpec',
        },
        {
          width: '130',
          title: 'HS报关商品编码',
          field: 'HsCode',
        },
        {
          minWidth: '200',
          align: 'left',
          title: '报关商品名称',
          slots: { default: 'P_chnName' },
        },
        {
          width: '70',
          title: '复核人',
          field: 'HsUserName',
        },
        {
          width: '130',
          title: '复核时间',
          slots: { default: 'HsCheckTIme' },
        },
      ],
      RemindersDaialogVisible: false,
      // paging: { list: [], data: [], limit: 100, total: null, page: 1 }, //主表分页
      // choosePaging: { list: [], data: [], limit: 100, total: null, page: 1 }, //选择产品表的分页
      shopList: [],
      delArr: [],

      columnIcon: '◇', //列分隔符
      delLength: [],
      state: 'add', //判断是哪个按钮点击
      // 新增弹框
      addAialogVisible: false,
      isEdit: true,
      roleList: [], //下拉数据源
      // open:{
      //    value: 'ElementsId',
      //    label: 'chnName'
      // },
      reviewQuery: [], //复核查询需要的请求字段
      addProduceList: [],
      // 新增弹框结束
      // 申报要素维护弹框
      addElementAialogVisible: false,
      validRules: {
        hscode: [{ required: true, message: 'HS报关商品编码不能为空' }],
        chnName: [{ required: true, message: 'HS报关商品编码不能为空' }],
        DeclarationElements: [{ required: true, message: '申报要素不能为空' }],
        CDUnitPrice: [
          { required: true, message: '报关单价(USD)不能为空' },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值不能为负数且只能为数字且只保留两位小数',
          },
        ],
        CCLUnitPrice: [
          { required: true, message: '清关单价(USD)不能为空' },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值不能为负数且只能为数字且只保留两位小数',
          },
        ],
      },
      TreeList1: [], // tree数据
      Contain: [
        { value: '', label: '' },
        { value: '包含', label: '包含' },
        { value: '不包含', label: '不包含' },
      ],
      addElementList: [], //申报要素维护数据
      checkoutData: [], //弹框复选框选中的数据
      delDataList: [], //删除的id
      delList: [], //批量复选框的数据
      // 申报要素维护弹框结束
      //  批量复核弹框
      addBatchAialogVisible: false,
      // 批量复核参数对象
      BatchRuleForm: {
        ElementsId: '', //批量复核的value
        HsCode: '', // 下拉选择的code
      },
      BatchData: [], //主页面复选框选中的状态
      ProductNoList: [], //保存需要的id数组集合
      Batchrules: {
        ElementsId: [
          {
            required: true,
            message: '请选择HS报关商品品名',
            trigger: 'change',
          },
        ],
      },
      // 报批复核结束

      // 申报要素规则设置
      MatchingAialogVisible: false,
      queryMatchingElementList: [], //table数据源
      delRulesList: [], //删除的数据
      checkoutMatchingData: [], //复选框选中的
      // 新增或修改
      AddDialogVisible: false,
      Addform: {
        ElementsId: '',
        hscode: '',
        chnName: '',
        engName: '',
        DeclarationElements: '',
        CDUnitPrice: '',
        CCLUnitPrice: '',
        GrossWeight: '', //毛重/片
        NetWeight: '', //净重/片
        Volume: '', //体积/箱
        Area: '', //面积/片
        Currency: '',
        // 排序  Sort
      },
      // 请求数据数组
      addElement: [],
      formLabelAlignRules: {
        hscode: [{ required: true, message: 'HS报关商品编码不能为空' }],
        chnName: [{ required: true, message: 'HS报关商品中文名不能为空' }],
        engName: [{ required: true, message: 'HS报关商品英文名不能为空' }],
        DeclarationElements: [{ required: true, message: '申报要素不能为空' }],
        CDUnitPrice: [
          { required: true, message: '报关单价(USD)不能为空' },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值不能为负数且只能为数字且只保留两位小数',
          },
        ],
        CCLUnitPrice: [
          { required: true, message: '清关单价(USD)不能为空' },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值不能为负数且只能为数字且只保留两位小数',
          },
        ],
        Currency: [{ required: true, message: '币种不能为空' }],
        NetWeight: [
          { required: false },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值不能为负数且只能为数字且只保留两位小数',
          },
        ],
        GrossWeight: [
          { required: false },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值不能为负数且只能为数字且只保留两位小数',
          },
        ],
        Volume: [
          { required: false },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值不能为负数且只能为数字且只保留两位小数',
          },
        ],
        Area: [
          { required: false },
          {
            pattern: /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/,
            message: '值不能为负数且只能为数字且只保留两位小数',
          },
        ],
      },
      IsAdd: 'add', //判断是新增还是编辑
      elementLoading: false, //要素维护loading效果
      saveAddLoading: false, //确认
      BatchLoading: false, //批量确认
      gridHeight: 535,
    }
  },
  watch: {
    filterText(val) {
      this.$nextTick(() => {
        this.$refs.tree.filter(val)
      })
    },
  },
  methods: {
    resize() {
      this.$nextTick(() => {
        var card = document.getElementById('mainCard').offsetHeight
        var queryRow = document.getElementById('queryRow').offsetHeight
        this.gridHeight = card - queryRow - 80
      })
    },
    // 复核
    ToReview() {
      if (this.delLength.length < 1)
        return this.$message.error('请选择复选框数据')
      this.isEdit = true
      this.getSelectData()
      this.addAialogVisible = true
      this.addProduceList = this.delLength
      // console.log(this.delLength,this.addProduceList);
    },
    // 复核框下拉change事件
    roleChangeEvent(row) {
      console.log(row)
      let index = this.roleList.findIndex((item) => {
        return row.row.P_chnName == item.ElementsId
      })
      // console.log(index)
      row.row.HsCode = this.roleList[index].HsCode
      row.row.ElementsId = this.roleList[index].ElementsId
    },
    // //查看
    // ToSee() {
    //   if (this.delLength.length < 1)
    //     return this.$message.error('请选择复选框数据')
    //   this.getSelectData()
    //   this.isEdit = false
    //   this.addAialogVisible = true
    //   this.addProduceList = this.delLength
    // },
    // 申报要素维护
    addElementMaintain() {
      this.addElementAialogVisible = true
      this.checkoutData = []
      this.queryDialog()
    },
    // 获取查询的维护数据
    queryDialog() {
      this.checkoutData = []
      this.addElementList = []
      this.elementLoading = true
      this.$api.InformationMain.DialogQuery()
        .then((res) => {
          // console.log(res)
          if (res.statusCode !== 200) return this.$message(res.message)
          this.addElementList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.elementLoading = false
        })
    },
    // 申报维护复选框状态改变触发
    onDialogCheckboxChange(row) {
      if (row.checked) {
        this.checkoutData = this.$refs.addElementTable.getCheckboxRecords()
      } else {
        this.checkoutData = this.$refs.addElementTable.getCheckboxRecords()
      }
    },
    // 申报维护复选框状态改变触发
    onDialogCheckboxAllChange(row) {
      if (row.checked) {
        this.checkoutData = this.$refs.addElementTable.getCheckboxRecords()
      } else {
        this.checkoutData = []
      }
    },

    // 申报要素规则设置
    MatchingRules() {
      this.MatchingAialogVisible = true
      this.queryMatchingDialog()
    },
    // 获取查询的申报要素规则设置维护数据
    queryMatchingDialog() {
      // this.checkoutData = []
      this.$api.InformationMain.DialogQuery().then((res) => {
        // console.log(res)
        if (res.statusCode !== 200) return this.$message(res.message)
        this.queryMatchingElementList = res.data
      })
    },
    // 申报设置维护数据维护复选框状态改变触发
    onMatchingDialogCheckboxChange(row) {
      if (row.checked) {
        this.checkoutMatchingData = this.$refs.addElementTable.getCheckboxRecords()
      } else {
        this.checkoutMatchingData = this.$refs.addElementTable.getCheckboxRecords()
      }
    },
    // 申报设置维护数据维护复选框状态改变触发
    onMatchingDialogCheckboxAllChange(row) {
      if (row.checked) {
        this.checkoutMatchingData = this.$refs.addElementTable.getCheckboxRecords()
      } else {
        this.checkoutMatchingData = []
      }
    },
    checkMethodDisable(row) {
      return row.$rowIndex !== this.addProduceList.length - 1
    },
    // // 新增要素
    addProductRow() {
      this.IsAdd = 'add'
      this.reClose()
      this.$set(this.Addform, 'Currency', 'USD')
      this.AddDialogVisible = true
    },
    // 编辑要素图标
    editRowEvent(row) {
      this.IsAdd = 'edit'
      console.log(row)
      this.Addform.ElementsId = row.ElementsId
      this.Addform.hscode = row.hscode
      this.Addform.chnName = row.chnName
      this.Addform.engName = row.engName
      this.Addform.DeclarationElements = row.DeclarationElements
      this.Addform.CDUnitPrice = row.CDUnitPrice
      this.Addform.CCLUnitPrice = row.CCLUnitPrice
      this.Addform.GrossWeight = row.GrossWeight
      this.Addform.NetWeight = row.NetWeight
      this.Addform.Volume = row.Volume
      this.Addform.Area = row.Area
      this.Addform.Currency = row.Currency
      this.AddDialogVisible = true
    },
    // 向上排序
    upRowEvent(row) {
      console.log(row)
      console.log(row.Sort - 1)
      this.$api.InformationMain.getSort({
        elementsId: row.ElementsId,
        sort: row.Sort - 1,
      }).then((res) => {
        console.log(res)
        if (res.statusCode !== 200) return this.$message(res.message)
        this.queryDialog()
      })
    },
    // 向下排序
    downRowEvent(row) {
      // console.log(row)
      console.log(row.Sort + 1)
      this.$api.InformationMain.getSort({
        elementsId: row.ElementsId,
        sort: row.Sort + 1,
      }).then((res) => {
        console.log(res)
        if (res.statusCode !== 200) return this.$message(res.message)
        this.queryDialog()
      })
    },
    // 插槽中的数据新增
    // iconAddProduct(row) {
    //   let index = this.addElementList.findIndex((item) => {
    //     // console.log(item)
    //     return item.ElementsId === row.ElementsId
    //   })
    //   let nullObj = {
    //     ElementsId: '',
    //     hscode: '',
    //     DeclarationElements: '',
    //     chnName: '',
    //     engName: '',
    //     CDUnitPrice: '',
    //     CCLUnitPrice: '',
    //   }
    //   this.addElementList.splice(index + 1, 0, nullObj)
    // },
    // 插槽规则中的新增
    iconAddProductRules(row) {
      let index = this.queryMatchingElementList.findIndex((item) => {
        // console.log(item)
        return item.ElementsId === row.ElementsId
      })
      let nullObj = {
        ElementsId: '',
        hscode: '',
        DeclarationElements: '',
        chnName: '',
        engName: '',
        CDUnitPrice: '',
        CCLUnitPrice: '',
      }
      this.queryMatchingElementList.splice(index + 1, 0, nullObj)
      this.queryMatchingElementList[index + 1][
        'chnName'
      ] = this.queryMatchingElementList[index]['chnName']
    },
    // // 申报维护批量删除
    // manyDelete() {
    //   if (this.checkoutData.length < 1)
    //     return this.$message.error('请选择复选框数据')
    //   // console.log(this.checkoutData)
    //   this.checkoutData.forEach((item) => {
    //     if (item.ElementsId !== '') {
    //       this.delList.push(item.ElementsId)
    //     }
    //   })
    //   // console.log(this.delList)
    //   this.$confirm(
    //     '如果当前HS报关商品名称已完成信息复核匹配绑定! , 若删除，需重新复核绑定',
    //     '删除HS报关商品名称确认',
    //     {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning',
    //       center: true,
    //     }
    //   )
    //     .then(() => {
    //       this.$api.InformationMain.delData({
    //         ElementsIdList: this.delList,
    //       }).then((res) => {
    //         console.log(res)
    //         if (res.statusCode !== 200) return this.$message.error(res.message)
    //         this.addElementList = []
    //         this.$message.success('删除成功')
    //         this.checkoutData = []
    //         this.delList = []
    //         this.queryDialog()
    //       })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除',
    //       })
    //     })
    // },
    // 插槽中的图标删除
    iconDelProduct(row) {
      // console.log(row.ElementsId)
      console.log(row)
      // this.delDataList.push([row])
      this.delDataList.push([row.ElementsId])
      let Index = this.addElementList.findIndex((item) => {
        return item.ElementsId == row.ElementsId
      })
      this.$confirm(
        '如果当前HS报关商品名称已完成信息复核匹配绑定! , 若删除，需重新复核绑定?',
        '删除HS报关商品名称确认',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }
      )
        .then(() => {
          this.elementLoading = true
          this.$api.InformationMain.delData({
            ElementsIdList: this.delDataList[0],
          }).then((res) => {
            // console.log(res)
            if (res.statusCode !== 200) return this.$message(res.message)
            this.$message.success('删除成功')
            // this.addElementList.splice(Index, 1)
            this.elementLoading = false
            this.queryDialog()
          })
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!',
          // })
          this.delDataList = []
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
        .finally(() => {
          this.delDataList = []
          this.elementLoading = false
        })
    },

    // 申报要素维护修改新增保存
    async editSaveProduct() {
      this.$refs.formLabelAlignRef.validate((valid) => {
        if (!valid) return this.$message.error('请输入必填项')
        this.addElement.push(this.Addform)
        // console.log(this.Addform);
        // console.log(this.addElement);
        this.saveAddLoading = true
        this.$api.InformationMain.editMain({ model: this.addElement })
          .then((res) => {
            if (res.statusCode !== 200) return this.$message(res.message)
            this.$message.success('保存成功')
            this.Addform.ElementsId = ''
            this.Addform.hscode = ''
            this.Addform.chnName = ''
            this.Addform.engName = ''
            this.Addform.DeclarationElements = ''
            this.Addform.CDUnitPrice = ''
            this.Addform.CCLUnitPrice = ''
            this.Addform.GrossWeight = ''
            this.Addform.NetWeight = ''
            this.Addform.Volume = ''
            this.Addform.Area = ''
            this.Addform.Currency = ''
            this.addElement = []
            this.$refs.formLabelAlignRef.resetFields()
            this.AddDialogVisible = false
            this.queryDialog()
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.addElement = []
            this.saveAddLoading = false
          })
      })
    },
    // 要素维护取消按钮
    cancel() {
      this.addElementAialogVisible = false
      this.$refs.addElementTable.revertData()
    },
    // 新增关闭
    ElementMatchinghandleClose() {
      this.$refs.formLabelAlignRef.resetFields()
      this.reClose()
      this.AddDialogVisible = false
    },
    reClose() {
      this.Addform.ElementsId = ''
      this.Addform.hscode = ''
      this.Addform.chnName = ''
      this.Addform.engName = ''
      this.Addform.DeclarationElements = ''
      this.Addform.CDUnitPrice = ''
      this.Addform.CCLUnitPrice = ''
      this.Addform.GrossWeight = ''
      this.Addform.NetWeight = ''
      this.Addform.Volume = ''
      this.Addform.Area = ''
      this.Addform.Currency = ''
    },
    // 申报要素维护关闭
    ElementhandleClose() {
      this.addElementAialogVisible = false
      this.searchOrderList()
      this.getSelectData()
      this.$refs.addElementTable.revertData()
    },
    // 复核弹框取消
    reset() {
      this.addAialogVisible = false
      this.$refs.addTable.revertData()
    },
    // 复核保存
    saveProduct() {
      this.ReviewLoading = true
      this.addProduceList.forEach((item) => {
        this.reviewQuery.push({
          ProductNo: item.ProductNo,
          ElementsId: item.ElementsId,
          HsCode: item.HsCode,
        })
      })
      // console.log(this.reviewQuery)
      this.$api.InformationMain.ReviewQuery({ model: this.reviewQuery })
        .then((res) => {
          // console.log(res)
          if (res.statusCode !== 200) return this.$message(res.message)
          this.$message.success('复核保存成功')
          this.addAialogVisible = false
          this.addProduceList = []
          this.delLength = []
          this.reviewQuery = []
          this.searchOrderList()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.ReviewLoading = false
        })
    },
    // 批量复核弹框取消
    BatchReset() {
      this.addBatchAialogVisible = false
      this.$refs.BatchruleForm.resetFields()
    },
    // 复核弹框关闭
    handleClose() {
      this.addAialogVisible = false
      this.addProduceList = []
      this.$refs.addTable.revertData()
      this.searchOrderList()
    },
    // 批量复核按钮
    ToBatchReview() {
      if (this.BatchData.length < 1)
        return this.$message.error('请选择复选框数据')
      this.getSelectData()
      this.isEdit = true
      this.addBatchAialogVisible = true
    },
    // 批量复核弹框关闭
    BatchHandleClose() {
      this.addBatchAialogVisible = false
      this.$refs.BatchruleForm.resetFields()
    },
    // 批量确定保存事件
    BatchSaveProject() {
      this.$refs.BatchruleForm.validate((valid) => {
        if (!valid) return
        // this.IsSearch = true
        // this.tableLoading = true
        // 待调接口处理数据
        this.BatchLoading = true
        this.BatchData.forEach((item) => {
          this.ProductNoList.push(item.ProductNo)
        })
        let index = this.roleList.findIndex((item) => {
          return item.ElementsId === this.BatchRuleForm.ElementsId
        })
        this.BatchRuleForm.HsCode = this.roleList[index].HsCode
        this.$api.InformationMain.ManyReview({
          ProductNoList: this.ProductNoList,
          ElementsId: this.BatchRuleForm.ElementsId,
          HsCode: this.BatchRuleForm.HsCode,
        })
          .then((res) => {
            if (res.statusCode !== 200) return this.$message(res.message)
            this.$message.success('批量复核保存成功')
            this.BatchData = []
            this.delLength = []
            this.addProduceList = []
            this.ProductNoList = []
            this.addBatchAialogVisible = false
            this.$refs.BatchruleForm.resetFields()
            this.searchOrderList()
          })
          .catch((err) => {
            console.log(err)
            // this.BatchData = []
          })
          .finally(() => {
            this.BatchLoading = false
          })
      })
    },
    searchEnter(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.searchOrderList()
      }
    },
    // 主表查询
    searchOrderList() {
      this.IsSearch = true
      this.tableLoading = true
      this.MainTableList = []
      // 查询按钮事件
      this.delLength = []
      this.BatchData = []
      if (this.QueryParamsTable.BeginDate == null) {
        this.QueryParamsTable.BeginDate = ''
      }
      if (this.QueryParamsTable.EndDate == null) {
        this.QueryParamsTable.EndDate = ''
      }
      this.$api.InformationMain.getMainQuery({
        model: this.QueryParamsTable,
        pageInfo: this.pageInfo,
      })
        .then((res) => {
          // console.log(res)
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.MainTableList = res.data.data
            this.total = res.data.total
            this.IsSearch = false
            this.tableLoading = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.IsSearch = false
          this.tableLoading = false
        })
    },
    // 主表复选框状态改变触发
    onAdjustmentCheckboxChange(row) {
      if (row.checked) {
        this.BatchData = this.$refs.mainTable.getCheckboxRecords()
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
      } else {
        this.BatchData = this.$refs.mainTable.getCheckboxRecords()
        this.delLength = this.$refs.mainTable.getCheckboxRecords()
      }
    },
    onAdjustmentCheckboxAllChange(row) {
      if (row.checked) {
        this.BatchData = this.$refs.mainTable.getCheckboxRecords()
        this.delLength = this.delLength.concat(row.records)
      } else {
        this.delLength = []
        this.BatchData = []
      }
    },
    //过滤的事件
    filterNode(value, TreeList) {
      if (!value) return true
      // console.log(TreeList)
      return TreeList.label.indexOf(value) !== -1
    },
    // open() {
    //   this.treeStatus = true
    //   //改变每个节点的状态
    //   this.$nextTick(() => {
    //     this.changeTreeNodeStatus(this.$refs.tree.store.root)
    //   })
    // },
    // close() {
    //   //改变一个全局变量
    //   this.treeStatus = false
    //   //改变每个节点的状态
    //   this.$nextTick(() => {
    //     this.changeTreeNodeStatus(this.$refs.tree.store.root)
    //     // console.log(this.$refs.tree.store.root);
    //   })
    // },
    // //改变节点的状态
    // changeTreeNodeStatus(node) {
    //   node.expanded = this.treeStatus
    //   for (let i = 0; i < node.childNodes.length; i++) {
    //     //改变节点的自身expanded状态
    //     node.childNodes[i].expanded = this.treeStatus
    //     //看看他孩子的长度，有的话就调用自己往下找
    //     if (node.childNodes[i].childNodes.length > 0) {
    //       this.changeTreeNodeStatus(node.childNodes[i])
    //     }
    //   }
    // },
    // 当每页数量改变
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.searchOrderList()
    },
    // 当当前页改变
    handleCurrentChange(val) {
      this.pageInfo.page = val
      this.searchOrderList()
    },
    // 获取树形结构默认展开节点
    getRoleTreeRootNode(provincialCenterId) {
      this.treeExpandData.push(provincialCenterId)
    },
    // 获得tree列表
    getTreeData() {
      this.resetTree = true
      this.filterText = ''
      this.TreeList = []
      this.$api.InformationMain.getTree()
        .then((res) => {
          // console.log(res);
          if (res.statusCode === 200) {
            this.TreeList1 = res.data
            this.TreeList.push({
              label: '全部',
              id: '',
              children: this.TreeList1,
            })
            // console.log(this.TreeList[0].id)
            this.provincialCenterId = this.TreeList[0].id //默认展开第一个节点
            this.getRoleTreeRootNode(this.provincialCenterId)
            // console.log(this.TreeList[0])
          } else {
            return this.$message.error(res.message)
          }
        })
        .catch((r) => {
          return this.$message.error(r)
        })
    },
    // 点击tree节点
    handleNodeClick(data) {
      this.filterText = ''
      this.QueryParamsTable.ClassNo = data.id
      this.searchOrderList()
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
      var monthDate1 = monthDate.getMonth()
      var currentDate = monthDate.getDate()
      monthDate1 = monthDate1 < 10 ? '0' + monthDate1 : monthDate1
      currentDate = currentDate < 10 ? '0' + currentDate : currentDate
      var startTime =
        monthDate.getFullYear() + '-' + monthDate1 + '-' + currentDate
      // this.$set(this.QueryParamsTable, 'EndDate', toMonth)
      // this.$set(this.QueryParamsTable, 'BeginDate', startTime)
    },
    //获取报关商品名称下拉选择框数据
    getSelectData() {
      this.roleList = []
      this.$api.InformationMain.selectData().then((res) => {
        console.log(res)
        if (res.statusCode !== 200) return this.$message.error(res.message)
        res.data.forEach((item) => {
          item.chnName = item.chnName + '(' + item.Currency + ')'
        })
        this.roleList = res.data
      })
    },
    // 获取货币列表
    addProductCurrency() {
      this.$api.publicApi
        .bcCurrency()
        .then((res) => {
          console.log(res)
          if (res.statusCode !== 200) {
            this.$message({
              message: res.data.message,
              type: 'error',
            })
          } else {
            res.data.forEach((item) => {
              item.currency = item.currency.trim()
            })
            this.currencyList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
  },
  computed: {},
  created() {
    this.getNowDate()
    this.getTreeData()
    this.getSelectData()
    this.searchOrderList()
    this.addProductCurrency()
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
.leftMenu {
  position: relative;
  margin-top: 7px;
  overflow-y: auto;
  background: #f7f8ff;
  border: 1px solid #e4e7eb;
  height: 720px;
  width: 300px;
}
// .title {
//     position: sticky;
//     top: 135px;
//     z-index: 999;
//     width: 285px;
//     background-color: #d5deff;
//     height: 30px;
//     line-height: 30px;
//     font-size: 16px;
//     border: none;
//     text-align: right;
//   }
.title1 {
  z-index: 999;
  max-width: 290px;
  height: 34px;
  background: #d5deff;
  border: 1px solid #d2d8f2;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  border: none;
  text-align: center;
  .son {
    // height: 40px;
    // line-height: 40px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    text-align: center;
  }
  .refresh {
    position: absolute;
    top: 0;
    right: 10px;
    cursor: pointer;
  }
  .expand {
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }
  .open {
    position: absolute;
    top: 0;
    left: 100px;
    cursor: pointer;
  }
  //     >>> .el-input__inner {
  //       height: 30px !important;
  //     }
}
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
>>> .searchMargin9 {
  margin-top: 12px;
}
>>> .searchMargin10 {
  margin-top: 15px;
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
.textArea {
  height: 50px;
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
  // margin-left: 300px;
  flex: 1;
  height: 100%;
  width: 100%;
}

.delBtn {
  width: 70px !important;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
.delBtn1 {
  width: 90px !important;
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
.secondBtn1 {
  margin: 11px 0 11px 5px;
  font-size: 14px;
  color: #333;
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
    right: 0px;
  }
}
// >>> .vxe-input--extra-suffix,
// .vxe-input--prefix,
// .vxe-input--suffix {
//   right: 20px;
// }
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
>>> .cellHeightClass {
  font-family: 'Microsoft YaHei';
  height: 80px;
  white-space: pre-wrap;
}
.elementHeight {
  height: 200px;
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
// .delBtn {
//   background: #5473e8 !important;
// }
// .del2Btn {
//   background: #ccc !important;
// }
.saveBtn {
  width: 70px;
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
>>> .iconB {
  font-size: 10px;
  // border: 1px transparent #fff;
  color: #5473e8;
}
.addform >>> .el-input__inner {
  width: 135px;
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
.textTitle {
  padding: 20px 12px;
}
>>> [data-v-703b890d] .vxe-input--inner {
  position: absolute;
  top: -8px;
  width: 240px;
}
</style>