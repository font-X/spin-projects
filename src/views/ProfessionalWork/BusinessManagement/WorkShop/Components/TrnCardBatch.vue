<template>
  <!-- 批量扫描 -->
  <el-row v-loading="loading">
    <el-header height="67px" class="header2">
      <div>
        <el-row class="header2row1" type="flex" justify="center" align="middle">
          <el-col :span="3" class="fielitem"><div>流转卡号：</div></el-col>
          <el-col :span="18"
            ><el-input ref="card" class="inputc" autofocus v-model="CardNo">
              <template slot="append">
                <jy-input
                  class="msginput"
                  :msgType="msgType"
                  readonly
                  v-model="msg"
                ></jy-input></template></el-input
          ></el-col>
          <el-col :span="3" style="text-align: center"
            ><el-button type="danger" @click="btnclearclick"
              >清空</el-button
            ></el-col
          >
        </el-row>
      </div>
    </el-header>
    <el-main class="elmain">
      <div>
        <el-row class="mainrow" type="flex" justify="center" align="middle">
          <el-col :span="24" class="fielval">
            <vxe-table
              border
              resizable
              stripe
              width="auto"
              :height="tabelHeight"
              :auto-resize="true"
              :config="{ render: 'scroll' }"
              :align="'center'"
              ref="grid"
              :data="gridData"
            >
              <vxe-table-column field="CardNo" title="流转卡号">
                <template slot-scope="{ row, column }">
                  <label class="lab">{{ row[column.property] }}</label>
                </template>
              </vxe-table-column>
              <vxe-table-column field="LotCode" title="卡号">
                <template slot-scope="{ row, column }">
                  <label class="lab">{{ row[column.property] }}</label>
                </template>
              </vxe-table-column>

              <!-- <vxe-table-column field="BadReasons1" title="颜色">
                <template slot-scope="{ row, column }">
                  <label class="lab">{{ row[column.property] }}</label>
                </template>
              </vxe-table-column>
              <vxe-table-column field="BadReasons2" title="样式">
                <template slot-scope="{ row, column }">
                  <label class="lab">{{ row[column.property] }}</label>
                </template>
              </vxe-table-column> -->

              <vxe-table-column width="80" field="PlanQuantity" title="卡数量">
                <template slot-scope="{ row, column }">
                  <label class="lab">{{ row[column.property] }}</label>
                </template>
              </vxe-table-column>

              <vxe-table-column field="ProduceQuantity" title="生产数">
                <template slot-scope="{ row, column }">
                  <div class="tableinputnum">
                    <jy-input-num
                      :min="0"
                      v-model="row[column.property]"
                      class="inputnum"
                      @change="varlChange"
                    ></jy-input-num>
                  </div>
                </template>
              </vxe-table-column>
              <vxe-table-column field="Defective" title="次品数">
                <template slot-scope="{ row, column }">
                  <div class="tableinputnum">
                    <jy-input-num
                      :min="0"
                      v-model="row[column.property]"
                      class="inputnum"
                      @change="varlChange(row)"
                    ></jy-input-num>
                  </div>
                </template>
              </vxe-table-column>
              <vxe-table-column width="50" title="操作">
                <template slot-scope="{ row, rowIndex }">
                  <el-row>
                    <img
                      @click="deleteRow(row, rowIndex)"
                      :src="
                        require('../../../../../assets/image/card/delete.png')
                      "
                  /></el-row>
                </template>
              </vxe-table-column>
            </vxe-table>
          </el-col>
        </el-row>
        <el-row class="mainrow" type="flex" align="middle">
          <el-col :span="2"> </el-col>
          <el-col :span="3">
            <label class="msglag">已扫码数量</label>
          </el-col>
          <el-col :span="2">
            <label class="msglag">{{ gridData.length }}</label>
          </el-col>
          <el-col :span="12"> </el-col>
          <el-col :span="12" style="text-align: center" class="upbtn"
            ><el-button :disabled="unUpdate" type="primary" @click="btnclick"
              >确定完工</el-button
            ></el-col
          >
        </el-row>
      </div>
    </el-main>
  </el-row>
</template>
<script>
import JyInputNum from './JyInputNum'
import JyInput from './JyInput'
import store from '../../../../../store'
import Cookies from 'js-cookie'
export default {
  components: { JyInputNum, JyInput },
  props: {
    CraftsCode: String,
  },
  data() {
    return {
      CardNo: '',
      isList: true,
      gridData: [],
      craftList: [], //用户拥有的工艺
      CraftsName: '未知',
      msg: '请刷码!',
      msgType: 'error', //success  #67c23a  warning  #e6a23c error #f56c6c
      unUpdate: false,
      loading: false,
      tabelHeight: 300,
    }
  },
  watch: {
    CardNo: {
      handler(newval, oldval) {
        this.cardChange()
      },
      deep: true,
    },
    CraftsCode: {
      handler() {
        this.gridData = []
        this.btnclearclick()
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    //自适应高度
    resize() {
      this.$nextTick(() => {
        var h =
          document.documentElement.clientHeight || document.body.clientHeight
        var s = window.innerHeight
        this.tabelHeight = h - 265 + 'px'
      })
    },
    //数据变化
    varlChange(row) {
      console.log(row)
    },
    //流转卡号变更
    cardChange() {
      if (!this.CardNo) {
        this.msg = '请刷码!'
        this.msgType = 'error'
        this.loading = false
      } else if (this.CardNo.trim().length != 13) {
        this.msg = '请输入13位流转码!'
        this.msgType = 'error'
        this.loading = false
      } else {
        this.queryCard(this.CardNo)
      }
    },
    //获取卡片信息
    queryCard(carNo) {
      this.loading = true
      this.$api.CardManage.GetTableCardInfoBycardNo({
        cardNo: carNo,
      })
        .then((res) => {
          this.loading = false
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            if (res.data == null) {
              this.msg = '未找到流转卡!'
              this.msgType = 'warning'
            } else {
              var data = res.data
              if (data.CraftsCode != this.CraftsCode || !this.CraftsCode) {
                this.msg = '工艺和人员不匹配!'
                this.msgType = 'error'
              } else {
                let b = false
                this.gridData.forEach((item) => {
                  if (item.CardNo.trim() == carNo.trim()) {
                    b = true
                  }
                })
                if (b) {
                  this.msg = '该扫码卡已经扫过!'
                  this.msgType = 'error'
                } else {
                  this.msg = '扫描成功!'
                  this.msgType = 'success'
                  var row = {}
                  row.CardNo = data.CardNo
                  row.LotCode = data.LotCode
                  row.PlanQuantity = data.PlanQuantity
                  row.ProduceQuantity = data.PlanQuantity
                  row.Defective = 0
                  row.OverflowQuantity = 0
                  this.gridData.unshift(row)
                  this.CardNo = ''
                  this.$refs.card.focus()
                  this.unUpdate = this.gridData.length == 0
                }
              }
            }
            this.varlChange()
          }
        })
        .catch((err) => console.log(err))
    },
    //点击确定按钮
    btnclick() {
      this.unUpdate = true
      this.loading = true
      this.updateTrnCar()
    },
    //删除
    deleteRow(row, index) {
      this.gridData.splice(index, 1)
    },
    //保存
    updateTrnCar(newcar, oldcard) {
      this.$api.CardManage.UpdateTrnCarList({ list: this.gridData })
        .then((res) => {
          this.loading = false
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              message: '提交成功',
              type: 'success',
            })
            this.gridData = []
            this.$emit('upsuccess')
          }
        })
        .catch((this.loading = false))
    },
    btnclearclick() {
      this.CardNo = ''
      this.$nextTick(() => {
        this.$refs.card.focus()
      })
    },
    //
    loginout2() {
      this.isList = !this.isList
    },
  },
  created() {
    this.resize()
    this.$nextTick(() => {
      this.$refs.card.focus()
    })
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
@import '../../../../../common/stylus/jy-cardtablet.css';
/* 右侧第一行 */
.header1 {
  background-color: #ffffff;
  font-size: 22px;
  text-align: center;
}
.header2 {
  background-color: #eef1f6;
  font-size: 18px;
}
.el-header {
  padding: 0px;
}
.tex {
  display: inline-block;
  padding-left: 10px;
}

.okbtn .el-button {
  padding: 14px 20px;
  font-size: 16px;
}
div .el-form-item__content {
  font-size: 18px;
  font-family: 'MicrosoftYaHei';
}
.fielitem {
  text-align: right;
  font-size: 14px;
  margin-right: 10px;
  color: #696a6e;
}
.fielval {
  font-size: 18px;
  color: #2a2f33;
  font-weight: 500;
}

.header2row2 {
  margin-top: 15px;
}
.header2row3 {
  margin-top: 4px;
}
.header2row1 {
  margin-top: 15px;
}
.header2row1 .inputc {
  padding-right: 2%;
}
.mainrow {
  margin-top: 8px;
}
.inputnum {
  width: 80%;
}
.elmain {
  background-color: #ffffff;
}
.lab {
  font-size: 16px;
  color: #2a2f33;
}
.msglag {
  font-size: 16px;
  color: #2a2f33;
  font-weight: 560;
}
.headimg {
  height: 28px;
  width: 32px;
  float: right;
}
.headtxt {
  float: left;
  margin-left: 10px;
}

.inputc >>> .el-input__inner {
  height: 50px;
  text-align: center;
  font-size: x-large;
  border-right: 0px;
}
.upbtn >>> .el-button {
  font-size: 20px;
  padding: 17px 62px;
}
.msginput >>> .el-input__inner {
  border-left: 0px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
>>> .el-main {
  padding: 2px;
}
>>> .el-input-group__append {
  width: 250px;
}
>>> .el-input-group__append,
.el-input-group__prepend {
  padding: 0px;
  border: 0px;
}
</style>