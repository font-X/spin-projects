<template>
  <transition name="dialog-fade">
    <jy-dialog
      v-dialogDrag
      v-if="showDialog"
      :title="dialogTitle"
      append-to-body
      :close-on-click-modal="false"
      class="dialog-component"
      :visible.sync="showDialog"
      width="1300px"
      @close="closeDialog(0)"
    >
      <el-container>
        <el-row style="width: 100%">
          <!-- 输入框 -->
          <el-col>
            <el-card class="cardMargin">
              <el-row>
                <el-col>
                  <el-form
                    ref="addForm"
                    :model="formInfo"
                    style="font-size：14px"
                    label-width="104px"
                  >
                    <el-row>
                      <el-col
                        style="display: flex; justify-content: space-between"
                      >
                        <!-- 文本域 -->
                        <el-form-item
                          prop="shop"
                          class="searchMargin marginR"
                          style="margin-bottom: 0px"
                          label="发货模式："
                        >
                          <el-select
                            v-model="formInfo.DeliveryMode"
                            class="unifySize marginLeft"
                            placeholder="请选择"
                          >
                            <el-option
                              :key="index"
                              v-for="(item, index) in deliveryModelList"
                              :label="item.name"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          prop="contractCode"
                          class="tipsLeft searchMargin marginR"
                          label="发货申请单号："
                        >
                          <vxe-input
                            v-model="formInfo.DeliveryPlanCode"
                            class="unifySize marginLeft"
                            placeholder="发货申请单号"
                          ></vxe-input>
                        </el-form-item>

                        <el-form-item
                          prop="contractCode"
                          class="tipsLeft searchMargin marginR"
                          label="货件编号："
                        >
                          <vxe-input
                            v-model="formInfo.BakField2"
                            class="unifySize marginLeft"
                            placeholder="货件编号"
                          ></vxe-input>
                        </el-form-item>
                        <el-form-item
                          prop="contractCode"
                          class="tipsLeft searchMargin marginR"
                          label="货件名称："
                        >
                          <vxe-input
                            v-model="formInfo.BakField3"
                            class="unifySize marginLeft"
                            placeholder="货件名称"
                          ></vxe-input>
                        </el-form-item>
                      </el-col>
                      <el-col
                        style="display: flex; justify-content: space-between"
                      >
                        <el-form-item
                          prop="shop"
                          class="searchMargin marginR"
                          style="margin-bottom: 0px"
                          label="站点："
                        >
                          <el-select
                            v-model="formInfo.shop"
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
                        <el-form-item
                          prop="BakField1"
                          class="tipsLeft searchMargin marginR"
                          label="海外仓编号："
                        >
                          <vxe-input
                            v-model="formInfo.BakField1"
                            class="unifySize marginLeft"
                            placeholder="货件编号"
                          ></vxe-input>
                        </el-form-item>

                        <el-form-item prop="DeliveryDate" label="发货日期：">
                          <el-date-picker
                            v-model="formInfo.DeliveryDate"
                            class="unifySize"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                          >
                          </el-date-picker>
                        </el-form-item>

                        <el-form-item prop="ETA" label="预计到货日期：">
                          <el-date-picker
                            v-model="formInfo.ETA"
                            class="unifySize"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                          >
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col style="justify-content: space-between">
                        <el-form-item class="searchMargin" label="海外仓贴标：">
                          <el-checkbox
                            value="1"
                            true-label="1"
                            false-label="0"
                            v-model="formInfo.isDetail"
                          ></el-checkbox>
                        </el-form-item>
                      </el-col>
                      <el-col style="height: 60px">
                        <!-- 文本域 -->
                        <el-form-item prop="remark" label="备注：">
                          <el-input
                            v-model="formInfo.remark"
                            type="textarea"
                            :rows="2"
                            placeholder="请输入备注信息"
                          >
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-col>

                <!-- 按钮区域 -->
                <el-col class="secondBtn">
                  <el-button
                    type="primary"
                    class="smBtn iconBtn el-icon-edit-outline"
                    >新增</el-button
                  >

                  <el-button
                    type="primary"
                    class="delBtn iconBtn el-icon-delete"
                    >删除</el-button
                  >
                  <el-button
                    type="primary"
                    class="secondBtn iconBtn el-icon-view"
                    @click="selectsku"
                    >选择货件sku</el-button
                  >
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
                width="auto"
                show-footer
                :auto-resize="true"
                show-overflow="title"
                :height="400"
                :columns="columns"
                @cell-dblclick="showBottomTable"
                @checkbox-all="onAdjustmentCheckboxAllChange"
                @checkbox-change="onAdjustmentCheckboxChange"
                highlight-current-row
                :config="{ render: 'scroll' }"
                :align="'center'"
                :checkbox-config="{ highlight: true, range: true }"
                :data="gridData"
              >
              </vxe-grid>
              <!-- 分页 -->
              <!-- <el-col class="closeTable">
            <el-pagination
              class="pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="paging.page"
              background
              :page-sizes="[20, 30, 40, 50]"
              :page-size="paging.limit"
              layout="prev,pager,next,total,sizes,jumper"
              :total="paging.total"
            >
            </el-pagination>
          </el-col> -->
            </el-card>
          </el-col>
        </el-row>
      </el-container>

      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button type="primary" class="saveBtn iconfont kt-icon-baocun"
              >保存</el-button
            >
            <el-button type="primary" class="clearBtn">取消</el-button>
          </el-col>
        </el-row>
      </span>
    </jy-dialog>

    <!--弹框组件开始-----------------------start-->
    <dialog-component
      v-if="showSelectDialog"
      ref="DialogComponent"
      :dialog-title="dialogTitle"
      :itemInfo="selectSkuItem"
      @closeDialog="closeDialog"
    ></dialog-component>
    <!--弹框组件开始-----------------------end-->
  </transition>
</template>
 
<script>
import DialogComponent from '../DeliveryRequest/selectSkuComponent'
import JyDialog from '@/components/JyDialog'
export default {
  name: 'selectsku',
  components: { DialogComponent, JyDialog },
  props: {
    dialogTitle: {
      type: String,
      default: '添加',
    },
    itemInfo: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      showDialog: false,
      showSelectDialog: false,
      formInfo: JSON.parse(JSON.stringify(this.itemInfo)),
      deliveryModelList: [
        { id: '1', name: '先出仓后建仓' },
        { id: '2', name: '先建仓后出仓' },
      ],
      shopList: [],
      addRules: {},
      gridData: [],
      columns: [
        { type: 'checkbox', width: '40' },
        { type: 'seq', width: '60', title: '序号' },
        { width: '60', title: '发货申请单号', field: '发货申请单号' },
        { width: '60', title: '海外仓编号', field: '海外仓编号' },
        { width: '100', title: '货件编号', field: '货件编号' },
        { width: '80', title: '货件名称', field: '货件名称' },
        { width: '60', title: '产品号', field: '产品号' },
        { width: '100', title: '产品名称', field: '产品名称' },
        { width: '100', title: '样式', field: '样式' },
        { width: '100', title: '色号', field: '色号' },
        { title: '颜色', field: '颜色' },
        { title: '生产下单片数', field: '生产下单片数' },
        { width: '100', title: '部门', field: '部门' },
        { width: '150', title: '制单人', field: '制单人' },
      ],
    }
  },
  methods: {
    // 关闭弹框
    closeDialog(flag) {
      //this.$refs['formInfo'].resetFields()
      this.showDialog = false
      this.$emit('closeDialog', flag)
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
          }
        })
        .catch((err) => console.log(err))
    },
    //选择suk
    selectsku() {
      if (this.formInfo.DeliveryMode == '1') {
        this.$message({
          message: '必须在先建仓后出仓模式下才能选择suk',
          type: 'error',
        })
        return
      }
      if (!this.formInfo.shop) {
        this.$message({
          message: '请先选择站点',
          type: 'error',
        })
        return
      }
      this.selectSkuItem = {}
      this.showSelectDialog = true
      this.$nextTick(() => {
        this.$refs['selectskuComponent'].showSelectDialog = true
      })
    },
    showBottomTable() {},
    onAdjustmentCheckboxAllChange() {},
    onAdjustmentCheckboxChange() {},
  },
  created() {
    this.addProductState()
  },
}
</script>
 
<style scoped lang="scss">
.dialog-fade-enter-active {
  -webkit-animation: dialog-fade-in 0.3s;
  animation: dialog-fade-in 0.3s;
}
.dialog-fade-leave-active {
  -webkit-animation: dialog-fade-out 0.3s;
  animation: dialog-fade-out 0.3s;
}
.secondBtn {
  margin-top: 11px;
  font-size: 14px;
  color: #333;
  .smBtn {
    width: 70px !important;
  }
  .delBtn {
    width: 70px !important;
    background: #ff9b22 !important;
    border: 1px solid #ff9b22 !important;
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
>>> .vxe-table--render-default.size--mini {
  user-select: text;
}
</style>
