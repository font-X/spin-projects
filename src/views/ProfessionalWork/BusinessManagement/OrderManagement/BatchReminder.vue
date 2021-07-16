<template>
  <jy-dialog
    v-dialogDrag
    :title="dialogTitle"
    append-to-body
    :close-on-click-modal="false"
    class="dialog-component"
    :visible.sync="showDialog"
    width="60%"
    @close="closeDialog(0)"
    @open="openDialog()"
  >
    <el-form
      ref="mainForm"
      :model="mainTableParams"
      style="font-size：14px"
      label-width="84px"
    >
      <el-row class="mainForm">
        <el-col :md="6" :lg="7" :xl="7">
          <el-form-item style="margin-bottom: 0px" label="站点：">
            <el-select
              clearable
              v-model="mainTableParams.shop"
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
        <el-col :md="18" :lg="17" :xl="17">
          <el-button
            type="danger"
            class="searchBtn searchMargin"
            size="small"
            :loading="btnLoading"
            @click="editReminder"
            icon="iconfont kt-icon-sousuo_o"
            >编辑</el-button
          >
          <el-button
            type="danger"
            class="searchBtn searchMargin"
            size="small"
            :loading="btnLoading"
            @click="ECTdContractAllTo"
            icon="iconfont kt-icon-anniu_jiantouzhankai"
            >分配</el-button
          >
          <el-button
            type="danger"
            class="searchBtn searchMargin"
            size="small"
            :loading="btnLoading"
            @click="saveReminder"
            icon="iconfont kt-icon-anniu_jiantouzhankai"
            >保存</el-button
          >
        </el-col>
      </el-row>
      <el-row class="rowHeight">
        <JyTableInput
          border
          ref="batchReminder"
          resizable
          stripe
          keep-source
          show-footer
          @cell-click="cellclick"
          :footer-method="footerMethod"
          :footer-cell-class-name="footerCellClassName"
          :header-row-class-name="hearderClass"
          class="mytable-scrollbar"
          :auto-resize="true"
          style="margin-top: 11px"
          width="auto"
          height="700"
          :row-class-name="cellClass"
          highlight-current-row
          :edit-config="{ trigger: 'click', mode: 'cell' }"
          :align="'center'"
          :checkbox-config="{
            highlight: true,
          }"
          :columns="r_columns"
          :data.sync="batchReminderList"
        >
        </JyTableInput>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <!-- <el-button
              type="primary"
              class="saveAnd iconfont kt-icon-baocun"
              >确 定</el-button
            > -->
          <el-button type="primary" @click="cancleReminder" class="clearBtn"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </span>
    <!-- 催单编辑 -->
    <jy-dialog
      title="催单编辑"
      append-to-body
      :close-on-click-modal="false"
      class="dialog-component"
      :visible.sync="showeditDialog"
      width="60%"
    >
      <el-row class="rowHeight2">
        <vxe-table
          border
          ref="batchReminderedit"
          resizable
          stripe
          keep-source
          :header-row-class-name="hearderClass"
          class="mytable-scrollbar"
          :auto-resize="true"
          style="margin-top: 11px"
          show-overflow="title"
          width="auto"
          height="700"
          highlight-current-row
          :edit-config="{ trigger: 'click', mode: 'row' }"
          :align="'center'"
          :checkbox-config="{
            highlight: true,
          }"
          :data="batchRemindereditList"
        >
          <vxe-table-column
            type="seq"
            width="60"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column field="productno" title="产品号"></vxe-table-column>
          <vxe-table-column field="orderNo" title="订单号"></vxe-table-column>
          <vxe-table-column
            width="80"
            field="reminderQty"
            title="催单数量"
            :edit-render="{ name: 'input', attrs: { type: 'text' } }"
          >
            <template v-slot:edit="{ row }">
              <vxe-input
                type="number"
                :min="0"
                v-model="row.reminderQty"
              ></vxe-input>
            </template>
          </vxe-table-column>
        </vxe-table>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-form
              ref="remindeForm"
              :model="reminderN"
              style="font-size：14px"
              label-width="84px"
            >
              <el-form-item style="margin-bottom: 0px" label="催单数量：">
                <el-col :span="5">
                  <el-input
                    clearable
                    v-model="reminderN.reminderNum"
                    class="unifySize"
                    placeholder="催单数量"
                  >
                  </el-input>
                </el-col>
                <el-col :span="3">
                  <el-button
                    type="danger"
                    class="searchBtn searchMargin"
                    size="small"
                    @click="exceedECTdContractAllTo"
                    icon="iconfont kt-icon-anniu_jiantouzhankai"
                    >分配</el-button
                  >
                </el-col>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col>
            <el-button
              type="primary"
              :disabled="isremiinderState"
              @click="editFinish"
              class="saveAnd iconfont kt-icon-baocun"
              >确 定</el-button
            >
            <el-button
              type="primary"
              @click="showeditDialog = false"
              class="clearBtn"
              >取消</el-button
            >
          </el-col>
        </el-row>
      </span>
    </jy-dialog>
  </jy-dialog>
</template>
 
<script>
import JyTableInput from '@/components/JyTableInput/index'
import JyDialog from '@/components/JyDialog'
import { number } from 'echarts'
export default {
  components: { JyTableInput, JyDialog },
  data() {
    return {
      dialogTitle: '批量催单',
      showDialog: false,
      shopList: [],
      batchReminderList: [],
      batchRemindereditList: [], //催单编辑表
      mainTableParams: {
        shop: '',
      },
      reminderN: {
        reminderNum: '',
      },
      List: [],
      editList: [],
      // 优先级
      isexceed: false,
      isremiinderState: false,
      // r_columnsedit: [
      //   { title: '产品号', field: 'productno' },
      //   { title: '订单号', field: 'orderNo' },
      //   {
      //     width: '80',
      //     title: '催单数量',
      //     field: 'reminderQty',

      //   },
      // ],
      btnLoading: false,
      r_columns: [
        { width: '200', title: '产品号', field: 'productno' },
        {
          width: '80',
          title: '催单数量',
          field: 'reminderQty',
          editRender: {
            props: {
              type: number,
            },
            immediate: true,
          },
        },
        {
          width: '80',
          title: '优先级',
          field: '优先级',
          editRender: {
            name: 'input',
            immediate: true,
            autoselect: true,
          },
        },
        {
          width: '150',
          title: '备注',
          field: 'remark',
          editRender: {
            name: 'input',
            immediate: true,
            autoselect: true,
          },
        },
        {
          width: '80',
          title: '状态',
          field: 'allottypename',
        },
        {
          title: '催单明细',
          field: 'allotdesc1',
        },
      ],
      showeditDialog: false,
      hearderClass: 'hearderClass',
      footerCellClassName: 'footerCellClassName',
    }
  },
  methods: {
    //点击单元格
    cellclick(row) {
      this.editList = []
      this.editList.push(row.row)
    },
    // 编辑完成确定按钮
    editFinish() {
      var arr1 = []
      var srr2 = []
      var str = ''
      var str2 = ''
      if (this.isexceed) {
        this.List.forEach((item) => {
          arr1 = item.allotdesc.split('★')
          arr1.pop()
          str = ''
          str2 = ''
          arr1.forEach((subitem) => {
            this.batchRemindereditList.forEach((Sitem) => {
              if (
                subitem.split('☆')[0] === Sitem.productno &&
                subitem.split('☆')[2] === Sitem.orderNo
              ) {
                str +=
                  subitem.split('☆')[0] +
                  '☆' +
                  subitem.split('☆')[1] +
                  '☆' +
                  subitem.split('☆')[2] +
                  '☆' +
                  subitem.split('☆')[3] +
                  '☆' +
                  Sitem.reminderQty +
                  '★'

                item.allotdesc = str

                str2 +=
                  '订单号:' +
                  '' +
                  subitem.split('☆')[2] +
                  '【' +
                  Sitem.reminderQty +
                  '】'
                item.allotdesc1 = str2
              }
            })
          })
          // item.allotdesc1
          //   arr2 = item.allotdesc1.split('】')
          //   arr2.pop()
          //   arr2.forEach(item => {
          //   })
        })
        this.batchReminderList.forEach((subTtem) => {
          if (subTtem.productno === this.List[0].productno) {
            subTtem.allotdesc1 = this.List[0].allotdesc1
            subTtem.allotdesc = this.List[0].allotdesc
            subTtem.allottype = this.List[0].allottype
            subTtem.allottypename = this.List[0].allottypename
            subTtem.remark = this.List[0].remark
            subTtem.reminderQty = this.List[0].reminderQty
          }
        })
      } else {
        this.batchReminderList.forEach((item) => {
          arr1 = item.allotdesc.split('★')
          arr1.pop()
          str = ''
          str2 = ''
          arr1.forEach((subitem) => {
            this.batchRemindereditList.forEach((Sitem) => {
              if (
                subitem.split('☆')[0] === Sitem.productno &&
                subitem.split('☆')[2] === Sitem.orderNo
              ) {
                str +=
                  subitem.split('☆')[0] +
                  '☆' +
                  subitem.split('☆')[1] +
                  '☆' +
                  subitem.split('☆')[2] +
                  '☆' +
                  subitem.split('☆')[3] +
                  '☆' +
                  Sitem.reminderQty +
                  '★'

                item.allotdesc = str

                str2 +=
                  '订单号:' +
                  '' +
                  subitem.split('☆')[2] +
                  '【' +
                  Sitem.reminderQty +
                  '】'
                item.allotdesc1 = str2
              }
            })
          })
          // item.allotdesc1
          //   arr2 = item.allotdesc1.split('】')
          //   arr2.pop()
          //   arr2.forEach(item => {
          //   })
        })
      }
      this.isexceed = false
      this.showeditDialog = false
    },
    //
    cellClass(row) {
      if (row.row.allottype === '2') {
        return 'cellClass'
      } else {
        return 'cellClass2'
      }
    },
    editClick(row) {
      this.editList = []
      this.editList.push(row.row)
    },
    // 保存催单
    saveReminder() {
      var reminderIs = false

      this.batchReminderList.forEach((item) => {
        if (item.allottype !== '1') {
          reminderIs = true // 超崔状态
          return
        }
      })
      if (reminderIs) {
        this.$message.error('存在处于未催单或者超崔的订单,请编辑！')
      } else {
        reminderIs = false
        for (var i = 0; i < this.batchReminderList.length - 1; i++) {
          for (var j = i + 1; j < this.batchReminderList.length; j++) {
            if (
              this.batchReminderList[i].productno ===
              this.batchReminderList[j].productno
            ) {
              this.$message.error('有重复产品号请删除或者修改！')
              return
            }
          }
        }
        this.btnLoading = true
        var arr2 = []
        var str = ''
        this.batchReminderList.forEach((item) => {
          if (item.allottype !== '2') {
            arr2 = []
            var arr1 = item.allotdesc1.split('】')
            arr1.pop()
            arr1.forEach((subitem) => {
              arr2.push(subitem.split('【')[1])
            })
            var arr3 = item.allotdesc.split('★')
            arr3.pop()
            arr3.forEach((sitem, index) => {
              sitem =
                sitem.split('☆')[0] +
                '☆' +
                sitem.split('☆')[1] +
                '☆' +
                sitem.split('☆')[2] +
                '☆' +
                sitem.split('☆')[3] +
                '☆'
              str += sitem + arr2[index] + '★'
            })
            str = str + '◇' + item.优先级 + '◇' + item.remark + '◆'
          }
        })
        //   'NTUSBM11SD1-(1724P2032)C01☆0000001125☆1☆1★NTUSBM11SD1-(1724P2032)C01☆0000001124☆1☆19★◇grade◇ramark◆'
        this.$api.reminder
          .ECTdContractAllEdie({
            strMessage: '',
            UserCode: '',
            remindlist: str,
          })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
              this.btnLoading = false
            } else {
              this.$message({
                message: '保存成功',
                type: 'success',
              })
              this.btnLoading = false
              this.showDialog = false
            }
          })
          .catch((err) => {
            this.btnLoading = false
            console.log(err)
          })
          .finally(() => {
            this.btnLoading = false
          })
      }
    },
    // oneditCheckboxChange(row) {
    //   if (row.checked) {
    //     this.editList.push(row.row)
    //   } else {
    //     var Delindex = this.editList.findIndex((item, index) => {
    //       return item === row.row
    //     })
    //     this.editList.splice(Delindex, 1)
    //   }
    // },
    // oneditCheckboxAllChange(row) {
    //   if (row.checked) {
    //     this.editList = row.records
    //   } else {
    //     this.editList = []
    //   }
    // },
    // 批量催单取消
    cancleReminder() {
      this.editList = []
      this.showDialog = false
    },
    //编辑催单
    editReminder() {
      if (this.editList.length !== 1) {
        this.$message.error('请先选择编辑行！')
        return
      }
      if (this.editList[0].allottype === '2') {
        // 超崔
        this.batchRemindereditList = this.editList
        this.showeditDialog = true
      } else {
        // console.log(this.editList);
        // this.reminderN.reminderNum = ''
        console.log(this.editList[0].reminderQty)
        this.reminderN.reminderNum = this.editList[0].reminderQty
        var obj = {}
        var arr = []
        var arr1 = []
        this.editList.forEach((item, index) => {
          if (item.allottype !== '2') {
            arr1 = item.allotdesc.split('★')
            arr1.pop()
            arr1.forEach((subItem) => {
              var obj = {}
              obj.productno = item.productno
              obj.orderNo = subItem.split('☆')[2]
              obj.reminderQty = subItem.split('☆')[4]
              obj.allotdesc = item.allotdesc
              obj.allotdesc1 = item.allotdesc1
              arr.push(obj)
            })
          }
        })
        this.batchRemindereditList = arr
        this.showeditDialog = true
      }
    },
    // 超催分配
    exceedECTdContractAllTo() {
      if (this.editList[0].allottype === '2') {
        this.isexceed = true
      } else {
        this.isexceed = false
      }
      this.editList[0].reminderQty = Number(this.reminderN.reminderNum)

      // 分配
      var strlist = ''
      this.editList.forEach((item) => {
        strlist += item.productno + '◇' + item.reminderQty + '◆'
      })
      //获取催单分配明细
      this.$api.reminder
        .ECTdContractAllTo({
          shop: this.mainTableParams.shop,
          strlist: strlist,
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.data[2][0].message,
              type: 'error',
            })
          } else {
            this.batchRemindereditList = res.data[0]
            if (res.data[0][0].allottype === '2') {
              this.isremiinderState = true
              return this.$message.error('订单处于未催单或者超催状态')
            } else {
              this.isremiinderState = false
            }
            // 将数据映射到编辑列表中
            var obj = {}
            var arr = []
            var arr1 = []
            this.batchRemindereditList.forEach((item, index) => {
              if (item.allottype !== '2') {
                arr1 = item.allotdesc.split('★')
                arr1.pop()
                arr1.forEach((subItem) => {
                  var obj = {}
                  obj.productno = item.productno
                  obj.orderNo = subItem.split('☆')[2]
                  obj.reminderQty = subItem.split('☆')[4]
                  obj.allotdesc = item.allotdesc
                  obj.allotdesc1 = item.allotdesc1
                  obj.allottype = item.allottype
                  obj.allottypename = item.allottypename
                  obj.remark = item.remark
                  arr.push(obj)
                })
              }
            })
            this.batchRemindereditList = arr
            this.List = arr
          }
        })
        .catch((err) => console.log(err))
    },
    //批量催单分配
    ECTdContractAllTo() {
      for (var i = 0; i < this.batchReminderList.length - 1; i++) {
        for (var j = i + 1; j < this.batchReminderList.length; j++) {
          if (
            this.batchReminderList[i].productno ===
            this.batchReminderList[j].productno
          ) {
            this.$message.error('有重复产品号请删除或者修改！')
            return
          }
        }
      }
      this.$nextTick(() => {
        var strlist = ''
        this.batchReminderList.forEach((item) => {
          strlist += item.productno + '◇' + item.reminderQty + '◆'
        })
        //获取催单明细
        this.$api.reminder
          .ECTdContractAllTo({
            shop: this.mainTableParams.shop,
            strlist: strlist,
          })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.data[2][0].message,
                type: 'error',
              })
            } else {
              this.batchReminderList.forEach((item, index) => {
                item.allotdesc1 = res.data[0][index].allotdesc1
                item.allotdesc = res.data[0][index].allotdesc
                item.allottype = res.data[0][index].allottype
                item.allottypename = res.data[0][index].allottypename
                item.reminderQty = res.data[0][index].reminderQty
              })
              this.$message({
                message: res.data[2][0].message,
                type: 'success',
              })
            }
          })
          .catch((err) => console.log(err))
      })
    },
    // 关闭弹框
    closeDialog(flag) {
      this.showDialog = false
      this.$emit('closeDialog', flag)
    },
    openDialog() {},
    // 表尾合计
    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          }
          switch (column.property) {
            case 'reminderQty':
              var sums = 0
              for (let i = 0; i < data.length; i++) {
                sums += Number(data[i].reminderQty)
              }
              return sums
          }
          return null
        }),
      ]
      return footerData
    },

    // 获取站点列表
    addProductState() {
      this.$api.publicApi
        .basShop()
        .then((res) => {
          if (res.statusCode != 200) {
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
  },
  created() {
    this.addProductState()
  },
}
</script>
 
<style scoped lang="scss">
>>> .unifySize {
  height: 30px;
}
>>> .rowHeight {
  height: 520px;
}
>>> .rowHeight2 {
  height: 720px;
}
>>> .cellClass {
  height: 31px;
  color: red;
}
>>> .cellClass2 {
  height: 31px;
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
.searchBtn {
  width: 70px !important;
  height: 30px !important;
  line-height: 10px;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 22px;
}
>>> .searchMargin {
  margin-left: 15px;
  margin-top: 5px;
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
>>> .hearderClass {
  text-align: center;
  font-size: 14px;
  height: 36px !important;
  color: #333;
  background-color: #d5deff;
}
>>> .footerCellClassName {
  background: #d1f3ff;
  height: 36px;
}
>>> .vxe-header--column .vxe-cell--edit-icon,
.vxe-header--column .vxe-cell-help-icon {
  display: none;
}
>>> .vxe-input .vxe-input--extra-suffix,
.vxe-input .vxe-input--suffix {
  right: 0.2em;
  display: none;
}
>>> .jy-dialog .jy-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
>>> .cellClass2 {
  color: #333;
  font-family: 'Microsoft YaHei';
  height: 30px;
}
>>> .unifySize input {
  height: 30px;
}
>>> .el-icon-circle-plus-outline:before {
  content: '\E723';
  display: none;
}
</style>
