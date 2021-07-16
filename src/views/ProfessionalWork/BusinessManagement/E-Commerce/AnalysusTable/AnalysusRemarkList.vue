<template>
  <div>
    <el-form
      size="mini"
      ref="remarkInfoRulesRef"
      :model="real_remarkInfo"
      style="font-size：14px"
    >
      <el-row class="editRemark">
        <el-col :span="8">
          <el-form-item label-width="110px" label="开始时间:">
            <el-date-picker
              class="unifySize unifySizeDate"
              v-model="real_remarkInfo.begdate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="110px" label="结束时间:">
            <el-date-picker
              class="unifySize unifySizeDate"
              v-model="real_remarkInfo.enddate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="110px" label="站点:">
            <el-select v-model="real_remarkInfo.shop" placeholder="">
              <el-option
                :key="index"
                v-for="(item, index) in shopList"
                :label="item.Name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="100px" label="备注人:">
            <el-select
              v-model="real_remarkInfo.usercode"
              placeholder="请选择备注人!"
            >
              <el-option
                :key="index"
                v-for="(item, index) in personalList"
                :label="item.Name"
                :value="item.Inputer"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="100px" label="sku:">
            <el-input v-model="real_remarkInfo.productno"></el-input>
          </el-form-item>
        </el-col>
        <el-button
          type="danger"
          class="searchBtn"
          size="small"
          @click="getRemarkList"
          icon="iconfont kt-icon-sousuo_o"
          >查询</el-button
        >
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
            <template>
              <el-button
                type="primary"
                @click="delRemark(item)"
                class="delBtn el-icon-delete"
                >删除</el-button
              >
            </template>
          </el-col>
        </el-row>
        <el-row class="remarkListRow">
          <el-col :span="2" class="information"
            ><div class="remarTitle">备注人:</div></el-col
          >
          <el-col :span="10" class="information">{{ item['制单人'] }}</el-col>
          <el-col :span="2" class="information"
            ><div class="remarTitle">国家:</div></el-col
          >
          <el-col :span="10" class="country information">{{
            item['国家']
          }}</el-col>
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
          <el-button type="primary" @click="closeDialog" class="clearBtn"
            >取 消</el-button
          >
        </el-col>
      </el-row>
    </span>
  </div>
</template>
<script>
import XEUtils from 'xe-utils'
export default {
  props: {
    countryList: Array,
    shopList: Array,
    remarkListParams: Object,
  },
  data() {
    return {
      real_remarkInfo: { ...this.remarkListParams },
      remarkList: [],
      personalList: [],
      currentRowData: '',
    }
  },
  created() {
    this.getRemarkList()
    this.getRemarkPersonal()
  },
  methods: {
    // 获取备注人
    getRemarkPersonal() {
      this.$api.publicApi
        .PersonList()
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            console.log(res)
            this.personalList = res.data
          }
        })
        .catch((err) => console.log(err))
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
            this.getRemarkList()
          }
        })
      })
    },
    // 获取备注列表
    getRemarkList() {
      this.$api.sales
        .RemarksQuery({ model: this.real_remarkInfo })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message.error(res.message)
          } else {
            this.$nextTick(() => {
              this.remarkList = res.data
              console.log(this.remarkList)
            })
          }
        })
    },
    // getDateList() {
    //   let list = [],
    //     begdate = new Date(this.remarkInfo.begdate)
    //   for (let i = 0; i < 7; i++) {
    //     list.push({
    //       label: XEUtils.toDateString(begdate, 'yyyy-MM-dd'),
    //       value: XEUtils.toDateString(begdate, 'yyyy-MM-dd'),
    //     })
    //     begdate = new Date((begdate / 1000 + 86400) * 1000)
    //   }
    //   return list
    // },
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
  height: 650px;
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
  bottom: -50px;
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
.searchBtn {
  width: 70px !important;
  height: 30px !important;
  line-height: 10px;
  background: #ff9b22 !important;
  border: 1px solid #ff9b22 !important;
  margin-left: 22px;
}
[data-v-65eed968] .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item[data-v-65eed968] {
  margin-bottom: 8px;
  display: flex;
  justify-content: flex-start;
}
>>> .el-form-item__label {
  padding: 0px;
}
.informat {
  font-weight: 700;
}
</style>
