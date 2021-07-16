<!--
     流转单开卡页面
-->
<template>
  <el-dialog
    v-if="showDialog"
    :visible.sync="showDialog"
    :title="dialogTitle"
    append-to-body
    :close-on-click-modal="false"
    class="dialog-component"
    width="1200px"
    @close="closeDialog(0)"
  >
    <el-container v-loading="loading">
      <el-row style="width: 100%">
        <el-card class="cardMargin">
          <el-row>
            <el-col>
              <el-form
                ref="addForm"
                style="font-size：14px"
                label-width="124px"
                size="mini"
              >
                <el-row>
                  <el-col :span="16">
                    <!-- 文本域 -->
                    <el-form-item label="条码：">
                      <el-input v-model="SID" ref="SID"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label-width="10px">
                      <label
                        :style="{
                          color:
                            cardmsgType == 'success'
                              ? '#67c23a'
                              : cardmsgType == 'error'
                              ? '#f56c6c'
                              : '#e6a23c',
                        }"
                        >{{ formInfo.Cardmsg }}</label
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="订单号:">
                      <el-input v-model="formInfo.PlanNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item prop="ProPrice" label="产品号:">
                      <el-input v-model="formInfo.ProductNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="产品名称:">
                      <el-input v-model="formInfo.chnName" readonly></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="样式:">
                      <el-input v-model="formInfo.Style" readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="色号:">
                      <el-input v-model="formInfo.ColorNo" readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="颜色:">
                      <el-input v-model="formInfo.Color" readonly></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="6">
                    <el-form-item label="尺寸:">
                      <el-input v-model="formInfo.Size" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-form-item label-width="10px">
                      <el-input
                        v-model="formInfo.SizeUnitName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="订单数量:">
                      <el-input v-model="formInfo.Quantity"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="已开卡数:">
                      <el-input v-model="formInfo.CardQuantity"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="裁床人:">
                      <el-input ref="CCUser" v-model="formUp.CCUser"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-form-item label-width="10px">
                      <label
                        :style="{
                          color:
                            usermsgType == 'success'
                              ? '#67c23a'
                              : usermsgType == 'error'
                              ? '#f56c6c'
                              : '#e6a23c',
                        }"
                        >{{ formUp.Usermsg }}</label
                      >
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="每卡数量:">
                      <el-input v-model="formUp.QuantityPerCard"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="卡数:">
                      <el-input v-model="formUp.CardNum"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="打印模板:">
                      <el-select v-model="LableNo">
                        <el-option
                          :key="index"
                          v-for="(item, index) in labelList"
                          :label="item.Name"
                          :value="item.LableNo"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="打印:">
                      <el-checkbox v-model="formUp.IsPrint"></el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"> </el-col>
                </el-row>
                <!-- <el-row>
                  <el-button @click="print"></el-button>
                </el-row> -->
              </el-form>
            </el-col>
          </el-row>
          <!-- 产品bom表 -->
          <el-row>
            <vxe-grid
              border
              resizable
              stripe
              width="auto"
              :columns="bomcolumns"
              :auto-resize="true"
              :edit-config="{ trigger: 'click', mode: 'cell' }"
              show-overflow="title"
              :height="160"
              highlight-current-row
              :config="{ render: 'scroll' }"
              :align="'center'"
              :checkbox-config="{ highlight: true, range: true }"
              :data="bomList"
              ref="bomgrid"
              @cell-click="cellclick"
            >
              <template #jyInput="{ row, column }">
                <el-input
                  size="mini"
                  class="my-input"
                  v-model="row[column.property]"
                />
              </template>
              <template #jyLabel="{ row, column, rowIndex }">
                <el-input
                  placeholder="点击选择工艺"
                  readonly
                  v-model="row[column.property]"
                  @focus="selectCrafts(rowIndex)"
                ></el-input>
              </template>
            </vxe-grid>
          </el-row>
          <el-row>
            <vxe-grid
              border
              resizable
              stripe
              width="auto"
              :columns="columns"
              :auto-resize="true"
              :edit-config="{ trigger: 'click', mode: 'cell' }"
              show-overflow="title"
              :height="160"
              highlight-current-row
              :config="{ render: 'scroll' }"
              :align="'center'"
              :checkbox-config="{ highlight: true, range: true }"
              :data="gridData"
              ref="grid"
            >
            </vxe-grid>
          </el-row>
        </el-card>
      </el-row>
    </el-container>
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <el-button
            type="primary"
            size="mini"
            @click="okDialog()"
            :disabled="!isupdate"
            >开卡</el-button
          >
          <el-button type="primary" size="mini" @click="closeDialog()"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </span>
    <choose-card-crafts ref="ChooseCardCrafts" @okDialog="crafsokDialog">
    </choose-card-crafts>
    <print-dialog
      ref="print"
      :TempType="TempType"
      :ID="ID"
      :LableNo="LableNo"
      :FileType="FileType"
    >
    </print-dialog>
  </el-dialog>
</template>
<script>
import ChooseCardCrafts from '@/views/Components/Chooses/ChooseCardCrafts'
import ChooseProductInfo from '@/views/Components/Chooses/ChooseProductInfo'
import {
  GetRgPlanBySid,
  GetLabelList,
  GetCraftsRoutinDetail,
  GetSProductBom,
} from '@/http/moudules/cardManage.js'
import { IsUserCodeOn } from '@/http/moudules/user.js'
import JyTableInput from '@/components/JyTableInput'
import PrintDialog from '@/components/PrintDialog'
export default {
  components: {
    ChooseProductInfo,
    JyTableInput,
    PrintDialog,
    ChooseCardCrafts,
  },
  watch: {
    showDialog: {
      handler(newval) {
        if (newval) {
          this.$nextTick(() => {
            this.addLabel()
            Object.assign(this.$data.formInfo, this.$options.data().formInfo)
            Object.assign(this.$data.formUp, this.$options.data().formUp)
            this.gridData = []
            this.bomList = []
            this.SID = ''
          })
        }
      },
    },
    SID: {
      handler(newval) {
        if (newval) {
          this.query(newval)
        } else {
          this.query('')
        }
      },
      immediate: true,
    },
    'formUp.CraftsRouting': {
      handler(newval) {
        if (newval) {
          this.queryCrafts(newval)
        } else {
          this.gridData = []
        }
      },
      immediate: true,
    },
    'formUp.QuantityPerCard': {
      handler(newval) {
        this.bomList.forEach((item) => {
          item.QuantityPerCard = newval
        })
      },
      immediate: true,
    },
    'formUp.CardNum': {
      handler(newval) {
        this.bomList.forEach((item) => {
          item.CardNum = newval
        })
      },
      immediate: true,
    },
    'formInfo.ProductNo': {
      handler(newval) {
        this.queryProbom(newval)
      },
      immediate: true,
    },
    'formUp.CCUser': {
      handler(newval) {
        if (newval) {
          this.isUserCodeOn(newval)
        }
      },
    },
  },
  data() {
    return {
      TempType: '27',
      ID: [],
      Actin: 'print',
      LableNo: '',
      FileType: 'html',
      dialogTitle: '添加',
      showDialog: false,
      loading: false,
      usermsgType: '',
      isupdate: false,
      SID: null,
      formInfo: {
        Cardmsg: null,
        ProductNo: null,
        PlanNo: null,
        chnName: null,
        Style: null,
        Color: null,
        ColorNo: null,
        Size: null,
        SizeUnitName: null,
        Quantity: null,
        CardQuantity: null,
      },
      formUp: {
        IsPrint: true,
        LableNo: '',
        QuantityPerCard: null,
        CardNum: null,
        CraftsRouting: null,
        CraftsRoutingName: null,
        CCUser: null,
        Usermsg: null,
      },
      gridData: [],
      bomList: [],
      labelList: [],
      selectIndex: 0, //选择工艺的行数
      columns: [
        { type: 'seq', width: '60', title: '序号' },
        { width: '180', title: '工序', field: 'CraftsName' },
        { width: '260', title: '工艺要求', field: 'Requirements' },
        { title: '备注', field: 'remak' },
      ],
      bomcolumns: [
        { type: 'checkbox', width: '40' }, 
        { type: 'seq', width: '60', title: '序号' },
        { width: '180', title: '生产产品编号', field: 'ProductNo' },
        { width: '260', title: '生产产品名称', field: 'chnName' },
        { width: '100', title: 'Bom数量', field: 'Quantity' },
        {
          width: '100',
          title: '每卡数量',
          field: 'QuantityPerCard',
          slots: {
            default: 'jyInput',
          },
        },
        {
          width: '100',
          title: '卡数',
          field: 'CardNum',
          slots: {
            default: 'jyInput',
          },
        },
        { width: '120', field: 'CraftsRouting', visible: false },
        {
          width: '120',
          title: '工序',
          field: 'CraftsRoutingName',
          slots: {
            default: 'jyLabel',
          },
        },
        { title: '备注', field: 'Remark' },
      ],
    }
  },
  methods: {
    print() {
      this.LableNo = '0000027475'
      this.ID = ['CM2009230006', '989']
      this.$refs.print.printDll({
        LableNo: '0000027476',
        ID: ['6000000625603', '6000000625604'],
        Count: 1,
      })
    },
    // 关闭弹框
    closeDialog(flag) {
      Object.assign(this.$data.formInfo, this.$options.data().formInfo)
      this.showDialog = false
      this.$emit('closeDialog', flag)
    },
    //点击保存 开卡
    okDialog() {
      if(!this.formUp.CCUser || this.usermsgType =="error")
      {
        this.$message({
              message: '请扫描裁床人',
              type: 'error',
            })
        return
      }
      this.isupdate = false
      this.loading = true
      this.formUp.Sid = this.SID
      this.formUp.LableNo = this.LableNo
      var updata = []
      updata.push(...this.$refs.bomgrid.getCheckboxRecords())
      this.$api.CardManage.AddWsTrnCard({
        model: this.formUp,
        list: updata,
      })
        .then((res) => {
          this.loading = false
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              message: '开卡成功',
              type: 'success',
            })
            if (this.formUp.IsPrint) {
              let data = []
              res.data.forEach((item) => {
                data.push({
                  ID: item,
                })
              })
              this.$refs.print.printDll({
                LableNo: this.formUp.LableNo,
                ID: data,
                Count: 1,
              })
              //this.closeDialog()
            }
            this.SID = ''
            this.$refs.SID.focus()
          }
        })
        .catch((err) => (this.loading = false))
    },
    //获取流转卡模板
    addLabel() {
      GetLabelList()
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.labelList = res.data
            if (res.data && res.data.length > 0) {
              this.LableNo = res.data[0].LableNo
            }
          }
        })
        .catch((err) => console.log(err))
    },
    // 获取工艺
    addCraftsList() {
      this.$api.CardManage.GetCraftsList()
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.craftsList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    //选择工艺
    selectCrafts(rowIndex) {
      this.selectIndex = rowIndex
      this.$refs.ChooseCardCrafts.showDialog = true
    },
    isUserCodeOn(val) {
      IsUserCodeOn({ code: val })
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            if (res.data) {
              this.formUp.Usermsg = '扫描正确!'
              this.usermsgType = 'success'
            } else {
              this.formUp.Usermsg = '扫描错误!'
              this.usermsgType = 'error'
            }
          }
        })
        .catch((err) => console.log(err))
    },
    cellclick(data) {
      if (data.columnIndex != 0) {
        this.formUp.CraftsRouting = data.row.CraftsRouting
      }
    },
    //查询工艺流转列表
    queryCrafts(val) {
      GetCraftsRoutinDetail({ id: val })
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.gridData = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    crafsokDialog(data) {
      // this.formUp.CraftsRoutingName = data.Name
      this.formUp.CraftsRouting = data.RoutingNo
      this.bomList[this.selectIndex].CraftsRouting = data.RoutingNo
      this.bomList[this.selectIndex].CraftsRoutingName = data.Name
    },
    //查询产品bom
    queryProbom(val) {
      GetSProductBom({ id: val })
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            if (res.data) {
              res.data.forEach((item) => {
                item.QuantityPerCard = 20
                item.CardNum = 1
              })
              this.bomList = res.data
              this.$refs.bomgrid.setCheckboxRow(this.bomList[0], true)
            } else {
              this.bomList = []
            }
          }
        })
        .catch((err) => console.log(err))
    },
    query(id) {
      this.loading = true
      GetRgPlanBySid({ sid: id })
        .then((res) => {
          this.loading = false
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            if (res.data) {
              this.formInfo = res.data
              this.formUp.QuantityPerCard = 1
              this.formUp.CardNum = 1
              this.formUp.CraftsRouting = res.data.CraftsRouting
              this.formUp.CraftsRoutingName = res.data.CraftsRoutingName
              this.formInfo.Cardmsg = '扫描成功!'
              this.cardmsgType = 'success'
              this.isupdate = true
              this.$refs.CCUser.focus()
            } else {
              Object.assign(this.$data.formInfo, this.$options.data().formInfo)
              Object.assign(this.$data.formUp, this.$options.data().formUp)
              this.formInfo.Cardmsg = '扫描错误!'
              this.cardmsgType = 'error'
              this.isupdate = false
              this.gridData = []
              this.bomList = []
            }
          }
        })
        .catch((err) => (this.loading = false))
    },
  },
  created() {},
}
</script>
 
<style scoped lang="scss">
.el-date-editor {
  width: 100%;
}
.el-input {
  width: 100%;
}
.el-select {
  width: 100%;
}
</style>
