<template>
  <div>
    <el-form
      size="mini"
      :rules="remarkInfoRules"
      ref="remarkInfoRulesRef"
      :model="real_remarkInfo"
      label-width="110px"
      style="font-size：14px"
    >
      <el-row class="editRemark">
        <el-col :span="8">
          <el-form-item label-width="110px" label="备注日期:">
            <el-select
              @change="remarkDateChange"
              v-model="real_remarkInfo.notedate"
              placeholder=""
            >
              <el-option
                :key="item.value"
                v-for="item in dateList"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="110px" label="产品名:">
            <el-input v-model="real_remarkInfo.productName" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="110px" label="国家:">
            <el-select v-model="real_remarkInfo.country" placeholder="">
              <el-option
                :key="index"
                v-for="(item, index) in countryList"
                :label="item.StateChNm"
                :value="item.StateID"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="110px" label="是否断货:">
            <el-switch
              v-model="real_remarkInfo.outStock"
              active-value="1"
              inactive-value="0"
            ></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label-width="110px"
            label="断货天数:"
            prop="outStock_Days"
          >
            <el-input
              placeholder=" "
              v-model="real_remarkInfo.outStock_Days"
              :disabled="real_remarkInfo.outStock == '0'"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label-width="110px"
            label="断货原因:"
            prop="outStock_Reason"
          >
            <el-select
              v-model="real_remarkInfo.outStock_Reason"
              :disabled="real_remarkInfo.outStock == '0'"
            >
              <el-option
                :key="index"
                v-for="(item, index) in reasonList"
                :label="item.Name"
                :value="item.Code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label-width="80px" label="备注:">
            <el-input
              onselectstart="return true;"
              type="textarea"
              :rows="8"
              v-model="real_remarkInfo.notes"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label-width="110px" label="重要程度:" prop="color">
            <el-select v-model="real_remarkInfo.color" style="width: 80px">
              <el-option label="一般" value="03"></el-option>
              <el-option label="次要" value="02"></el-option>
              <el-option label="重要" value="01"></el-option>
            </el-select>
            <el-button type="primary" @click="showRemarkList" plain
              >显示列表</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="remarkContainer">
      <div :key="index" v-for="(item, index) in remarkList">
        <el-row class="remarkList">
          <el-col :span="2" class="information">信息:</el-col>
          <el-col :span="22">
            {{ item['制单人'] }}&nbsp;&nbsp;&nbsp;&nbsp;{{
              item['备注日期']
            }}&nbsp;&nbsp;&nbsp;&nbsp;<span class="informat">是否断货:</span
            >{{
              item['是否断货'] === '0' ? '否' : '是'
            }}&nbsp;&nbsp;&nbsp;&nbsp;<span class="informat">断货原因:</span
            >{{ item['断货原因'] }}&nbsp;&nbsp;&nbsp;&nbsp;<span
              class="informat"
              >预计断货天数:</span
            >{{ item['预计断货天数'] }}&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="informat">重要程度:</span
            >{{
              item['颜色'] === '01'
                ? '重要'
                : item['颜色'] === '02'
                ? '次要'
                : '一般'
            }}&nbsp;&nbsp;&nbsp;&nbsp;
            <div style="float: right">
              <el-button
                v-if="item['制单人'].trim() === name"
                type="primary"
                @click="delRemark(item)"
                class="delBtn el-icon-delete"
                >删除</el-button
              >
              <el-button
                type="primary"
                v-if="item['制单人'].trim() === name"
                @click="chooseRemark(item)"
                class="chooseBtn iconfont kt-icon-caidan"
                >选中</el-button
              >
            </div>
          </el-col>
        </el-row>
        <el-row class="remarkListRow">
          <el-col :span="2" class="information"
            ><div class="remarTitle">备注:</div></el-col
          >
          <el-col :span="22" class="information">{{ item['备注内容'] }}</el-col>
        </el-row>
      </div>
    </div>
    <span slot="footer" class="remarkFooter dialog-footer">
      <el-row>
        <el-col>
          <el-button
            type="primary"
            @click="saveRemark"
            class="saveBtn iconfont kt-icon-baocun"
            >确 定</el-button
          >
          <el-button type="primary" @click="closeDialog" class="clearBtn"
            >取 消</el-button
          >
        </el-col>
      </el-row>
    </span>
    <!-- dialog弹出层区域 -->
    <jy-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      class="noMarginBottom"
      :title="dialogParam.title"
      :visible.sync="dialogParam.isShowDialog"
      v-if="dialogParam.isShowDialog"
      :width="dialogParam.width"
      append-to-body
    >
      <div
        :style="{
          position: 'relative',
        }"
      >
        <analysus-remark-list
          :countryList="countryList"
          :shopList="shopList"
          :remarkListParams="remarkListParams"
          @closeDialog="closeDialog"
          v-if="dialogParam.name === 'AnalysusRemarkList'"
        ></analysus-remark-list>
      </div>
    </jy-dialog>
    <!-- <div>
      <el-divider></el-divider>
      <el-button size="small" @click="closeDialog">取 消</el-button>
      <el-button size="small" type="primary" @click="saveRemark"
        >确 定</el-button
      >
    </div> -->
  </div>
</template>
<script>
import XEUtils from 'xe-utils'
import AnalysusRemarkList from './AnalysusRemarkList.vue'
import Cookies from 'js-cookie'
import JyDialog from '@/components/JyDialog'
export default {
  components: {
    AnalysusRemarkList,
    JyDialog,
  },
  props: {
    remarkInfoRules: Object,
    remarkInfo: Object,
    countryList: Array,
    shopList: Array,
    selectedRow: Object,
    ckickRow: Object,
  },
  data() {
    return {
      real_remarkInfo: { ...this.remarkInfo },
      dateList: this.getDateList(),
      computedHeight: window.innerHeight - 100 + 'px',
      remarkList: [],
      reasonList: [],
      name: '',
      arr: '',
      remarkListParams: {},
      dialogParam: {
        title: '',
        type: '',
        name: '',
        width: '70%',
        isShowDialog: false,
      },
    }
  },
  created() {
    this.getReason()
    this.getRemark()
  },
  methods: {
    // 备注日期更改
    remarkDateChange() {
      var index = this.arr.findIndex((item) => {
        return item['备注日期'] === this.real_remarkInfo.notedate
      })
      if (index !== -1) {
        this.real_remarkInfo.notes = this.arr[index]['备注内容']
        this.real_remarkInfo.notedate = this.arr[index]['备注日期']
        this.real_remarkInfo.outStock_Reason = this.arr[index]['断货原因']
        this.real_remarkInfo.country = this.arr[index]['Country'].trim()
        this.real_remarkInfo.outStock = this.arr[index]['是否断货']
        this.real_remarkInfo.outStock_Days = this.arr[index]['预计断货天数']
        this.real_remarkInfo.id = this.arr[index]['Id']
        this.real_remarkInfo.method = 'edit'
        this.real_remarkInfo.color = this.arr[index]['颜色']
      } else {
        this.real_remarkInfo.notes = ''
        this.real_remarkInfo.country = ''
        this.real_remarkInfo.outStock_Reason = ''
        this.real_remarkInfo.outStock = '0'
        this.real_remarkInfo.outStock_Days = ''
        this.real_remarkInfo.id = ''
        this.real_remarkInfo.method = 'add'
        this.real_remarkInfo.color = '03'
      }
    },
    // 获取缺货原因
    getReason() {
      this.$api.publicApi
        .address({
          model: { type: 'code', query: { flag: 'OutStock_Reason' } },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.reasonList = res.data
          }
        })
        .catch((err) => console.log(err))
    },
    // 选中备注
    chooseRemark(row) {
      this.real_remarkInfo.notes = row['备注内容']
      this.real_remarkInfo.notedate = row['备注日期']
      this.real_remarkInfo.outStock_Reason = row['断货原因']
      this.real_remarkInfo.country = row['Country'].trim()
      this.real_remarkInfo.outStock = row['是否断货']
      this.real_remarkInfo.outStock_Days = row['预计断货天数']
      this.real_remarkInfo.id = row['Id']
      this.real_remarkInfo.method = 'edit'
      this.real_remarkInfo.color = row['颜色']
    },
    //删除备注信息
    delRemark(row) {
      this.$confirm('此操作将删除该条备注, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        this.$api.sales.DelRemarks({ id: row.Id }).then((res) => {
          if (!res.isSucceed) return this.$message.error(res.message)
          if (res.data && res.data.length > 0) {
            this.$message.success(res.data[0].message)
            // 删除成功后刷新备注列表
            this.getRemark()
          }
        })
      })
    },
    //显示备注明细列表
    showRemarkList() {
      var now = +new Date(this.real_remarkInfo.notedate)
      var date = new Date(now + 6 * 24 * 3600 * 1000)
      var year = date.getFullYear()
      var month = (date.getMonth() + 1).toString()
      if (month.length === 1) {
        month = '0' + month
      }
      var day = date.getDate().toString()
      if (day.length === 1) {
        day = '0' + day
      }
      var hour = date.getHours()
      if (hour < 10) {
        hour = '0' + hour
      }
      var minute = date.getMinutes()
      if (minute < 10) {
        minute = '0' + minute
      }
      var seconds = date.getSeconds()
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      var newDate =
        year +
        '-' +
        month +
        '-' +
        day +
        ' ' +
        hour +
        ':' +
        minute +
        ':' +
        seconds
      let remarkList = {
        usercode: '',
        shop: this.ckickRow.shop,
        begdate: this.real_remarkInfo.notedate,
        enddate: newDate,
        productno: this.ckickRow.sku_code,
      }
      this.remarkListParams = remarkList
      // shop: this.queryData.shopid,
      // productno: currentRowData.sku_code,
      // 开启备注列表
      this.dialogParam = {
        title: '备注列表',
        name: 'AnalysusRemarkList',
        type: '',
        width: '50%',
        isShowDialog: true,
      }
    },
    getDateList() {
      let list = [],
        begdate = new Date(this.remarkInfo.begdate)
      for (let i = 0; i < 7; i++) {
        list.push({
          label: XEUtils.toDateString(begdate, 'yyyy-MM-dd'),
          value: XEUtils.toDateString(begdate, 'yyyy-MM-dd'),
        })
        begdate = new Date((begdate / 1000 + 86400) * 1000)
      }
      return list
    },
    getRemark() {
      //待获取数据
      this.$api.sales.RemarksQuery({ model: this.remarkInfo }).then((res) => {
        if (!res.isSucceed) return this.$message.error(res.message)
        if (res.isSucceed) {
          this.remarkList = res.data
          let d = res.data[0]
          // this.name = sessionStorage.getItem('user').trim()
          this.name = Cookies.get('user')
          this.arr = this.remarkList.filter((item) => {
            return item['制单人'].trim() === this.name
          })
          if (this.arr.length !== 0) {
            console.log(this.arr[this.arr.length - 1])
            this.real_remarkInfo.notes =
              this.arr[this.arr.length - 1]['备注内容']
            this.real_remarkInfo.notedate =
              this.arr[this.arr.length - 1]['备注日期']
            this.real_remarkInfo.outStock_Reason =
              this.arr[this.arr.length - 1]['断货原因']
            this.real_remarkInfo.country =
              this.arr[this.arr.length - 1]['Country'].trim()
            this.real_remarkInfo.outStock =
              this.arr[this.arr.length - 1]['是否断货']
            this.real_remarkInfo.outStock_Days =
              this.arr[this.arr.length - 1]['预计断货天数']
            this.real_remarkInfo.id = this.arr[this.arr.length - 1]['Id']
            this.real_remarkInfo.method = 'edit'
            this.real_remarkInfo.color = this.arr[this.arr.length - 1]['颜色']
          } else {
            this.real_remarkInfo.notes = ''
            this.real_remarkInfo.country = ''
            this.real_remarkInfo.outStock_Reason = ''
            this.real_remarkInfo.outStock = '0'
            this.real_remarkInfo.outStock_Days = ''
            this.real_remarkInfo.id = ''
            this.real_remarkInfo.method = 'add'
            this.real_remarkInfo.color = '03'
          }
        }
      })
    },
    saveRemark() {
      this.$refs.remarkInfoRulesRef.validate((valid) => {
        if (!valid) return false
        if (this.real_remarkInfo.outStock === '0') {
          this.real_remarkInfo.outStock_Days = '0'
          this.real_remarkInfo.outStock_Reason = ''
        }
        this.$api.sales
          .SaveRemarks({ model: this.real_remarkInfo })
          .then((res) => {
            if (!res.isSucceed) return this.$message.error(res.message)
            this.$message.success('保存成功')
            this.$emit('faterMethod')
            this.$emit('closeDialog')
          })
      })
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
  },
}
</script>
<style lang="scss" scoped>
>>> .editRemark {
  .el-form-item__content {
    width: 100%;
    margin-left: 10px !important;
  }
  .el-select {
    width: 100%;
  }
}
>>> .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 8px;
}
// 备注列表
.remarkContainer {
  height: 465px;
  user-select: text;
  overflow-y: auto;
}
.remarkList {
  margin: 10px 10px 0 10px;
  border: 1px solid #ccc;
  .el-col:nth-child(1) {
    height: 30px;
    font-weight: 700;
    line-height: 30px;
    text-align: right;
    border-right: 1px solid #ccc;
  }
  .el-col:nth-child(2) {
    height: 30px;
    line-height: 30px;
  }
}
>>> .remarkFooter {
  position: absolute;
  bottom: -30px;
  right: 10px;
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
>>> .remarkListRow {
  height: 100%;
  margin-left: 10px;
  margin-right: 10px;
  border-left: 1px solid #ccc;
  // border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  .information {
    height: 100%;
    .remarTitle {
      height: 100%;
      font-weight: 700;
      text-align: right;
      width: 100%;
    }
  }
  .el-col:nth-child(2) {
    height: 100%;
    padding: 5px;
    white-space: pre-wrap;
    border-left: 1px solid #ccc;
  }
}
>>> .el-dialog .el-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
>>> .editRemark {
  .el-form-item__content {
    width: 100%;
    margin-left: 10px !important;
  }
  .el-select {
    width: 100%;
  }
}
>>> .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 8px;
}

// 备注列表
.remarkList {
  margin: 10px 10px 0 10px;
  border: 1px solid #ccc;
  .el-col:nth-child(1) {
    height: 30px;
    font-weight: 700;
    line-height: 30px;
    text-align: right;
    border-right: 1px solid #ccc;
  }
  .el-col:nth-child(2) {
    height: 30px;
    line-height: 30px;
  }
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
.delBtn {
  width: 60px !important;
  height: 25px;
  padding: 0px;
  border-radius: 2px;
  margin-left: 20px;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
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
>>> .remarkListRow {
  height: 100%;
  margin-left: 10px;
  margin-right: 10px;
  border-left: 1px solid #ccc;

  border-bottom: 1px solid #ccc;
  .information {
    height: 100%;
    .remarTitle {
      height: 100%;
      font-weight: 700;
      text-align: right;
      width: 100%;
    }
  }
  .country {
    height: 29px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 5px;
  }
  .el-col:nth-child(2) {
    height: 100%;
    padding: 5px;
    white-space: pre-wrap;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
}
.informat {
  font-weight: 700;
}

.searchBtn {
  width: 70px !important;
  height: 30px !important;
  line-height: 10px;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 22px;
}
.delBtn {
  width: 60px !important;
  height: 25px;
  padding: 0px;
  border-radius: 2px;
  margin-left: 20px;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
}
.chooseBtn {
  width: 60px !important;
  height: 25px;
  padding: 0px;
  font-size: 14px;
  border-radius: 2px;
  margin-left: 0px;
  margin-right: 10px;
  background: #5473e8 !important;
  border: 1px solid #5473e8 !important;
}
</style>
