<!--
     工厂生产页面
-->
<template>
  <el-container v-bind:style="styleObject">
    <el-aside class="aside1" width="180px">
      <div class="leftdiv">
        <div>
          <img :src="require('../../../../assets/image/card/rt130.png')" />
        </div>
        <div style="margin-top: 22px">
          <label class="labName">{{ workerInfo.UserName }}</label>
        </div>
        <div style="margin-top: 22px">
          <el-row
            type="flex"
            justify="center"
            align="middle"
            v-on:click.native="clClick()"
          >
            <el-col :span="12">
              <img
                class="imgrt"
                :src="require('../../../../assets/image/card/jt.png')"
              />
            </el-col>
            <el-col :span="12">
              <el-row>
                <label class="labNum">{{
                  workerInfo.DayProduceQuantity
                }}</label>
              </el-row>
              <el-row><label class="labNumtip">今日已产</label></el-row>
            </el-col>
          </el-row>
          <el-row
            style="margin-top: 16px"
            type="flex"
            justify="center"
            align="middle"
          >
            <el-col :span="12">
              <img
                class="imgrt"
                :src="require('../../../../assets/image/card/rj.png')"
              />
            </el-col>
            <el-col :span="12">
              <el-row>
                <label class="labNum">{{
                  workerInfo.PerProduceQuantity
                }}</label>
              </el-row>
              <el-row><label class="labNumtip">日均生产</label></el-row>
            </el-col>
          </el-row>

          <el-row
            style="margin-top: 16px"
            type="flex"
            justify="center"
            align="middle"
          >
            <el-col :span="12">
              <img
                class="imgrt"
                :src="require('../../../../assets/image/card/hgl.png')"
              />
            </el-col>
            <el-col :span="12">
              <el-row>
                <label class="labNum">{{ workerInfo.QualifiedRate }}</label>
              </el-row>
              <el-row><label class="labNumtip">合格率(%)</label></el-row>
            </el-col>
          </el-row>
        </div>
      </div>
      <img
        class="imgcl"
        :src="require('../../../../assets/image/card/asback.png')"
      />
    </el-aside>
    <el-container v-loading="loading">
      <el-header height="60px" class="header1">
        <el-row type="flex" justify="center" align="middle">
          <el-col :span="5">
            <div @click="loginout">
              <el-row type="flex" justify="center" align="middle">
                <el-col :span="12">
                  <img
                    class="headimg"
                    :src="require('../../../../assets/image/card/back1.png')"
                  />
                </el-col>
                <el-col :span="12">
                  <div class="headtxt"><div>登出</div></div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="5">
            <div @click="changeList">
              <el-row type="flex" justify="center" align="middle">
                <el-col :span="12">
                  <img
                    class="headimg"
                    :src="require('../../../../assets/image/card/recut.png')"
                  />
                </el-col>
                <el-col :span="12">
                  <div class="headtxt"><div>切换</div></div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8"
            ><div @click="changeCrafs">
              <span>{{ CraftsName }}</span>
            </div></el-col
          >
          <el-col :span="6">
            <div>
              <el-row
                type="flex"
                justify="center"
                align="middle"
                v-on:click.native="workChange()"
              >
                <el-col :span="12">
                  <img
                    class="headimg"
                    :src="require('../../../../assets/image/card/person.png')"
                  />
                </el-col>
                <el-col :span="12">
                  <div class="headtxt">
                    <div>{{ workerInfo.UserName }}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-row v-if="isList == 0">
        <el-header height="167px" class="header2">
          <div>
            <el-row
              class="header2row1"
              type="flex"
              justify="center"
              align="middle"
            >
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
                ><el-button type="danger" @click="btnclaerclick"
                  >清除</el-button
                ></el-col
              >
            </el-row>
            <el-row
              class="header2row2"
              type="flex"
              justify="center"
              align="middle"
            >
              <el-col :span="2" class="fielitem"><div>卡号</div></el-col>
              <el-col :span="12" class="fielval"
                ><div>{{ model.LotCode }}</div></el-col
              >
              <el-col :span="2" class="fielitem"><div>样式</div></el-col>
              <el-col :span="3" class="fielval"
                ><div>{{ model.Style }}</div></el-col
              >
              <el-col :span="2" class="fielitem"><div>工艺</div></el-col>
              <el-col :span="3" class="fielval"
                ><div>{{ model.CraftsName }}</div></el-col
              >
            </el-row>
            <el-row
              class="header2row3"
              type="flex"
              justify="center"
              align="middle"
            >
              <el-col :span="2" class="fielitem"><div>订单</div></el-col>
              <el-col :span="12" class="fielval"
                ><div>{{ model.PlanNo }}</div></el-col
              >
              <el-col :span="2" class="fielitem"><div>颜色</div></el-col>
              <el-col :span="3" class="fielval"
                ><div>{{ model.Color }}</div></el-col
              >

              <el-col :span="2" class="fielitem"><div>数量</div></el-col>
              <el-col :span="3" class="fielval"
                ><div>{{ model.PlanQuantity }}</div></el-col
              >
            </el-row>

            <el-row
              class="header2row3"
              type="flex"
              justify="center"
              align="middle"
            >
              <el-col :span="2" class="fielitem"><div>产品号</div></el-col>
              <el-col :span="12" class="fielval"
                ><div>{{ model.ProductNo }}</div></el-col
              >
              <el-col :span="2" class="fielitem"><div>尺寸</div></el-col>
              <el-col :span="3" class="fielval"
                ><div>{{ model.Size }}</div></el-col
              >
              <el-col :span="5"></el-col>
            </el-row>
          </div>
        </el-header>
        <el-main class="elmain">
          <div>
            <el-row type="flex" justify="center" align="middle">
              <el-col :span="2" class="fielitem"><div>相差数量</div></el-col>
              <el-col :span="10" class="fielval"
                ><jy-input-num
                  disabled
                  :controls="false"
                  v-model="produnum.OverflowQuantity"
                  class="inputnum"
                ></jy-input-num
              ></el-col>
              <el-col :span="2" class="fielitem"><div>正品数量</div></el-col>
              <el-col :span="10" class="fielval"
                ><jy-input-num
                  disabled
                  :controls="false"
                  v-model="produnum.Qualified"
                  class="inputnum"
                ></jy-input-num
              ></el-col>
            </el-row>
            <el-row class="mainrow" type="flex" justify="center" align="middle">
              <el-col :span="2" class="fielitem"><div>次品数量</div></el-col>
              <el-col :span="10" class="fielval"
                ><jy-input-num
                  disabled
                  :controls="false"
                  class="inputnum"
                  v-model="produnum.Defective"
                ></jy-input-num
              ></el-col>
              <el-col :span="2" class="fielitem"><div>实际生产</div></el-col>
              <el-col :span="10" class="fielval"
                ><jy-input-num
                  v-model="produnum.ProduceQuantity"
                  :min="inputnumModel.produnumMin"
                  size="large"
                  class="inputnum"
                  @change="varlChange"
                ></jy-input-num
              ></el-col>
            </el-row>
            <el-row class="mainrow" type="flex" justify="center" align="middle">
              <el-col :span="2" class="fielitem"><div>不良原因</div></el-col>
              <el-col :span="22" class="fielval">
                <vxe-table
                  border
                  resizable
                  stripe
                  width="auto"
                  :height="tabelHeight"
                  :show-header="false"
                  :auto-resize="true"
                  :config="{ render: 'scroll' }"
                  :align="'center'"
                  ref="grid"
                  :data="gridData"
                >
                  <vxe-table-column field="BadReasons">
                    <template slot-scope="{ row, column }">
                      <label class="lab">{{ row[column.property] }}</label>
                    </template>
                  </vxe-table-column>
                  <vxe-table-column field="Defective">
                    <template slot-scope="{ row, column }">
                      <div class="tableinputnum">
                        <jy-input-num
                          :min="0"
                          :max="row['max']"
                          v-model="row[column.property]"
                          class="inputnum"
                          @change="varlChange"
                        ></jy-input-num>
                      </div>
                    </template>
                  </vxe-table-column>
                  <vxe-table-column field="Remark">
                    <template slot-scope="{ row, column }">
                      <div style="padding: 5px">
                        <el-input
                          v-model="row[column.property]"
                          placeholder="请输入备注信息"
                        ></el-input>
                      </div>
                    </template>
                  </vxe-table-column>
                </vxe-table>
              </el-col>
            </el-row>
            <el-row class="mainrow" type="flex" justify="center" align="middle">
              <el-col :span="2" class="fielitem"><div>备注</div></el-col>
              <el-col :span="12" class="fielval">
                <el-input
                  type="textarea"
                  v-model="model.Remark"
                  placeholder="请输入内容"
                ></el-input>
              </el-col>
              <el-col :span="12" style="text-align: center" class="upbtn"
                ><el-button
                  type="primary"
                  :disabled="unUpdate"
                  @click="btnclick"
                  >确定完工</el-button
                ></el-col
              >
            </el-row>
          </div>
        </el-main>
      </el-row>
      <!-- 批量扫描 -->
      <el-row el-row v-if="this.isList == 1">
        <trn-card-batch
          :CraftsCode="CraftsCode"
          @upsuccess="batchupsuccess"
        ></trn-card-batch>
      </el-row>
      <el-row el-row v-if="this.isList == 5">
        <trn-card-work-cl ref="TrnCardWorkCl" :CraftsCode="CraftsCode"></trn-card-work-cl>
      </el-row>
    </el-container>
    <work-change ref="WorkChange" :CraftsCode="CraftsCode" @okDialog="workChangeokDialog"></work-change>
    <change-crafs
      ref="ChangeCrafs"
      :currCrafs="CraftsCode"
      @okDialog="changeCrafsokDialog"
    ></change-crafs>
  </el-container>
</template>
<script>
import JyInputNum from './Components/JyInputNum'
import ChangeCrafs from './Components/ChangeCrafs'
import JyInput from './Components/JyInput'
import store from '../../../../store'
import Cookies from 'js-cookie'
import TrnCardBatch from './Components/TrnCardBatch.vue'
import TrnCardWorkCl from './Components/TrnCardWorkCl'
import WorkChange from './Components/WorkChange'
export default {
  components: {
    JyInputNum,
    JyInput,
    TrnCardBatch,
    ChangeCrafs,
    TrnCardWorkCl,
    WorkChange,
  },
  data() {
    return {
      CardNo: '',
      model: {
        updataCardNO: '-',
        PlanNo: '-',
        ProductNo: '-',
        Size: '-',
        Style: '-',
        Color: '-',
        PlanQuantity: 0,
        LotCode: '-',
        CraftsName: '-',
        Remark: '',
      },
      produnum: {
        ProduceQuantity: 0, //实际生产数
        Qualified: 0, //正品数
        Defective: 0, // 不良数
        OverflowQuantity: 0, //多件数
      },
      styleObject: {
        height: '400px',
        border: '1px solid #eee',
        'font-family': 'MicrosoftYaHei',
      },
      workerInfo: {
        UserName: '-',
        DayProduceQuantity: '-',
        PerProduceQuantity: '-',
        QualifiedRate: '-',
      },
      inputnumModel: {
        produnumMin: 0,
      },
      isList: 0, // 0 单个扫描 1 批量扫描  5员工产量
      gridData: [],
      craftList: [], //用户拥有的工艺
      CraftsCode: '',
      CraftsName: '未知',
      msg: '请刷码!',
      msgType: 'error', //success  #67c23a  warning  #e6a23c error #f56c6c
      unUpdate: true,
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
        this.craftsCodeChange()
      },
      deep: true,
      immediate: true,
    },
    isList: {
      handler() {
        this.isListChange()
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
        this.styleObject.height = h + 'px'
        this.tabelHeight = h - 478 + 'px'
      })
    },
    //查询后初始化
    initVal() {
      this.produnum.Defective = 0
      this.produnum.Decrease = 0
      this.gridData.forEach((t) => {
        t.Defective = 0
      })
      this.produnum.ProduceQuantity = this.model.PlanQuantity
      this.gridData.forEach((t) => {
        t.max = this.produnum.ProduceQuantity
      })
    },
    //数据变化
    varlChange() {
      let defsum = 0
      this.gridData.forEach((t) => {
        defsum += t.Defective
      })
      this.produnum.Defective = defsum
      this.produnum.OverflowQuantity =
        this.produnum.ProduceQuantity - this.model.PlanQuantity
      this.produnum.Qualified =
        this.produnum.ProduceQuantity - this.produnum.Defective
      this.inputnumModel.produnumMin = defsum
      this.gridData.forEach((t) => {
        t.max = t.Defective + this.produnum.Qualified
      })
    },
    //流转卡号变更
    cardChange() {
      this.unUpdate = true
      if (!this.CardNo) {
        this.msg = '请刷码!'
        this.msgType = 'error'
        this.loading = false
        Object.assign(this.$data.model, this.$options.data().model)
      } else if (this.CardNo.trim().length != 13) {
        this.msg = '请输入13位流转码!'
        this.msgType = 'error'
        this.loading = false
        Object.assign(this.$data.model, this.$options.data().model)
      } else {
        this.queryCard()
      }
    },
    //获取卡片信息
    queryCard() {
      this.loading = true
      this.$api.CardManage.GetTableCardInfoBycardNo({
        cardNo: this.CardNo,
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
              Object.assign(this.$data.model, this.$options.data().model)
              this.msg = '未找到流转卡!'
              this.msgType = 'warning'
            } else {
              this.model = res.data
              if (
                this.model.CraftsCode != this.CraftsCode ||
                !this.CraftsCode
              ) {
                this.msg = '工艺和人员不匹配!'
                this.msgType = 'error'
              } else {
                this.msg = '扫描成功!'
                this.msgType = 'success'
                this.unUpdate = false
                //this.updataCardNO = this.CardNo
              }
            }
            this.initVal()
            this.varlChange()
          }
        })
        .catch((err) => console.log(err))
    },
    changeCrafsokDialog(code, name) {
      this.CraftsCode = code
      this.CraftsName = name
      if(this.isList == 5)
       this.$nextTick(() => {
          this.$refs.TrnCardWorkCl.init()
        })
      if (this.isList == 0) {
        this.$nextTick(() => {
          this.$refs.card.focus()
        })
      }
    },
    //工艺变更
    craftsCodeChange() {
      this.getWorkercl()
      this.cardChange()
    },
    //获取人员产量
    getWorkercl() {
      if (!!this.CraftsCode) {
        this.$api.CardManage.GetWorkerProductInfo({
          CraftsCode: this.CraftsCode,
        })
          .then((res) => {
            if (!res.isSucceed) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.workerInfo = res.data
            }
          })
          .catch((err) => console.log(err))
      } else {
        Object.assign(this.$data.workerInfo, this.$options.data().workerInfo)
      }
    },
    //添加不良原因
    addBadReasonsList() {
      this.$api.CardManage.GetBadReasonsList()
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.gridData = []
            res.data.forEach((t) => {
              var item = {
                BadReasons: t.BadReasons,
                max: 0,
                Defective: 0,
                Remark: '',
              }
              this.gridData.push(item)
            })
          }
        })
        .catch((err) => console.log(err))
    },
    //获取员工工艺
    addWrokTrnCar() {
      this.$api.CardManage.GetWokerTrnCardList()
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.craftList = res.data
            if (!!res.data && this.craftList.length > 0) {
              this.CraftsCode = this.craftList[0].CraftsCode
              this.CraftsName = this.craftList[0].CraftsName
            }
          }
        })
        .catch((err) => console.log(err))
    },
    //点击确定按钮
    btnclick() {
      this.updateTrnCar()
    },
    //保存
    updateTrnCar(newcar, oldcard) {
      this.loading = true
      this.unUpdate = true
      let Qualified = this.produnum.Qualified
      this.$api.CardManage.UpdateTrnCar({
        model: {
          CardNo: this.CardNo, //oldcard ? oldcard : this.CardNo,
          CraftsCode: this.CraftsCode,
          ProduceQuantity: this.produnum.ProduceQuantity,
          Qualified: this.produnum.Qualified,
          Defective: this.produnum.Defective,
          OverflowQuantity: this.produnum.OverflowQuantity,
          Remark: this.model.Remark,
        },
        list: this.gridData,
      })
        .then((res) => {
          if (newcar) {
            this.CardNo = newcar
          } else {
            this.CardNo = ''
          }
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
            this.workerInfo.DayProduceQuantity += Qualified
            this.$refs.card.focus()
            this.CardNo = ''
            this.cardChange()
          }
        })
        .catch((this.loading = false))
    },
    //员工切换工序
    changeCrafs() {
      this.$refs.ChangeCrafs.showDialog = true
    },
    //查看员工产量
    clClick() {
      if (this.isList == 5) {
        this.isList = 0
      } else {
        this.isList = 5
      }
    },
    isListChange() {
      if (this.isList == 0) {
        this.$nextTick(() => {
          this.$refs.card.focus()
        })
      }
    },
    //员工切换
    workChange() {
      this.$refs.WorkChange.showDialog = true
    },
    //员工切换
    workChangeokDialog() {
      console.log(123)
      this.CraftsCode = ''
      this.CraftsName = ''
      this.addWrokTrnCar()
    },
    //
    changeList() {
      this.isList = this.isList == 1 ? 0 : 1
    },
    //批量操作完成之后
    batchupsuccess() {
      this.getWorkercl()()
    },
    //退出登录
    loginout() {
      this.$confirm('确认退出吗?', '提示', {
        type: 'warning',
      })
        .then(() => {
          sessionStorage.removeItem('user')
          Cookies.remove('token')
          this.$store.commit('setMenuList', [])
          this.$router.push('/login?redirect=TrnCard')
        })
        .catch((err) => {
          console.error(err)
        })
    },
    //全屏
    fullScreen() {
      var element = document.documentElement
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      }
    },
    //清楚
    btnclaerclick() {
      this.CardNo = ''
      this.unUpdate = true
      this.$refs.card.focus()
    },
  },

  created() {
    this.resize()
    this.addBadReasonsList()
    this.addWrokTrnCar()
    this.$nextTick(() => {
      this.fullScreen()
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
@import '../../../../common/stylus/jy-cardtablet.css';
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
  margin-top: 21px;
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
  font-size: 22px;
  padding: 17px 82px;
}
.msginput >>> .el-input__inner {
  border-left: 0px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
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