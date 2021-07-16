<!--
     员工产量
-->
<template>
  <el-row class="main">
    <el-row class="gclass"></el-row>

    <el-row class="itemclass">
      <div class="infinite-list" style="overflow: auto">
        <ul v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <li v-for="item in list" :key="item.ListNo" class="list-item">
            <el-row type="flex" justify="space-between" class="contenthead">
              <el-col :span="2"
                ><label class="lsh">{{ item.CardNo }}</label></el-col
              >
              <el-col :span="6"
                ><label class="finsj">{{ item.FinishTime }}</label></el-col
              >
            </el-row>
            <el-row class="content">
              <el-col :span="2"><label>卡号：</label></el-col>
              <el-col :span="5"
                ><div>{{ item.LotCode }}</div></el-col
              >
              <el-col :span="2"><label>订单号：</label></el-col>
              <el-col :span="6"
                ><div>{{ item.PlanNo }}</div></el-col
              >
              <el-col :span="2"><label>产品号：</label></el-col>
              <el-col :span="7"
                ><div>{{ item.sProductNo }}</div></el-col
              >
            </el-row>
            <el-row class="content">
              <el-col :span="2"><label>样式：</label></el-col>
              <el-col :span="5"
                ><div>{{ item.Style }}</div></el-col
              >
              <el-col :span="2"><label>卡数量：</label></el-col>
              <el-col :span="6"
                ><div>{{ item.PlanQuantity }}</div></el-col
              >
              <el-col :span="2"><label>生产数：</label></el-col>
              <el-col :span="7"
                ><div>{{ item.ProduceQuantity }}</div></el-col
              >
            </el-row>
            <el-row class="gclass content"></el-row>
          </li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="isnoMore">没有更多了</p>
      </div>
    </el-row>
  </el-row>
</template>
<script>
export default {
  props: {
    CraftsCode: String,
  },
  watch: {
    CraftsCode: {
      handler(newval, oldval) {
        this.init()
      },
      deep: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      noMore: false,
      tabelHeight: 300,
      pageInfo: {
        page: 1,
        pageSize: 20,
      },
    }
  },
  watch: {},
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
    init(){
 this.list = []
        this.load()
    },
    //加载数据
    load() {
      this.loading = true
      this.$api.CardManage.GetWorkerClPage({
        pageInfo: this.pageInfo,
        model: {
          CraftsCode: this.CraftsCode,
        },
      })
        .then((res) => {
          this.loading = false
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
            this.noMore = true
          } else {
            if (res.data && res.data.length > 0) {
              this.noMore = false
              this.pageInfo.page += 1
              this.list.push(...res.data)
            } else {
              this.noMore = true
            }
          }
        })
        .catch((err) => (this.loading = false))
    },
  },
  computed: {
    isnoMore() {
      return this.noMore
    },
    disabled() {
      return this.loading || this.noMore
    },
  },
  created() {},
}
</script>
<style lang="scss" scoped>
.main {
  font-family: 'MicrosoftYaHei';
}
.gclass {
  height: 10px;
  background-color: #eef1f6;
}
.itemclass {
  margin: 10px 10px;
}
.list-item {
}
.infinite-list {
  height: 600px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.content {
  margin-top: 10px;
}
.contenthead {
  margin-top: 15px;
}
.content label {
  font-size: 16px;
  color: #696a6e;
}
.content div {
  font-size: 16px;
  color: #2a2f33;
}
.lsh {
  font-size: 16px;
  color: #000000;
  background-color: #e8e9f2;
  padding: 3px 8px;
  border-radius: 4px;
}
.finsj {
  color: #5473e8;
  font-size: 14px;
}
</style>