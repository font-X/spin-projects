<template>
  <div style="margin-top: -10px">
    <el-row>
      <el-col :span="20">
        <el-steps
          :active="1"
          direction="horizontal"
          style="width: 100%"
          type="line"
          :text-inside="true"
        >
          <el-step
            :title="item.ShowName"
            icon="el-icon-location"
            v-for="(item, index) in Progress"
            :key="index"
            :status="item.status"
          ></el-step>
        </el-steps>
      </el-col>
      <el-col :span="4">
        <div style="color: red">当前进度：{{ Progress1.当前进度 }}</div>
        <div style="color: blue">下一进度：{{ Progress1.下一进度 }}</div>
      </el-col>
    </el-row>
    <div class="orderinfo">
      <div class="box-card" style="width: 39%">
        <div class="titlebar">总体情况</div>
        <table class="dettable">
          <tr v-for="(item, index) in allinfo" :key="index">
            <td>{{ item.item1 }}</td>
            <td>{{ item.value1 }}</td>
            <td>{{ item.item2 }}</td>
            <td>{{ item.value2 }}</td>
          </tr>
        </table>
      </div>
      <div class="box-card" style="width: 30%">
        <div class="titlebar">总结</div>
        <el-button style="float: right; padding: 3px 0" type="text"
          >上传附件</el-button
        >
        <table v-for="(item, index) in zj" :key="index" class="dettable">
          <tr>
            <td>状态</td>
            <td>{{ item.Schedule }}</td>
            <td>录入人</td>
            <td>{{ item.Inputer }}</td>
            <td>录入日期</td>
            <td>{{ item.Inputdate }}</td>
          </tr>
          <tr>
            <td colspan="6">{{ item.Note }}</td>
          </tr>
          <tr>
            <td colspan="6">{{ item.url }}</td>
          </tr>
        </table>
      </div>
      <div class="box-card" style="width: 30%">
        <div class="titlebar">注释</div>
        <table v-for="(item, index) in zr" :key="index" class="dettable">
          <tr>
            <td>录入人</td>
            <td>{{ item.Inputer }}</td>
            <td>录入日期</td>
            <td>{{ item.Inputdate }}</td>
            <td><button @click="deleteItem(item.logno)">删除</button></td>
          </tr>
          <tr>
            <td colspan="5">{{ item.Note }}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="detail">
      <div class="titlebar">详细数据</div>
      <vxe-table
        ref="detail"
        :height="curHeight"
        auto-resize
        size="mini"
        :resizable="true"
        :data="detail"
      >
        <vxe-table-column type="checkbox" width="40"></vxe-table-column>
        <vxe-table-column type="seq" width="60" title="序号"></vxe-table-column>
        <vxe-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          v-bind="item"
        >
        </vxe-table-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      Progress: [],
      Progress1: {},
      allinfo: [],
      zj: [],
      zs: [],
      detail: [],
      tableColumns: [
        {
          field: '指示单号',
          title: '指示单号',
          width: '90',
        },
        {
          field: '花型',
          title: '花型',
          width: '90',
        },
        {
          field: '色号',
          title: '色号',
          width: '90',
        },
        {
          field: '颜色',
          title: '颜色',
          width: '90',
        },
        {
          field: '订单数',
          title: '订单数',
          width: '90',
        },
        {
          field: '单位',
          title: '单位',
          width: '90',
        },
        {
          field: '到货匹数',
          title: '到货匹数',
          width: '90',
        },
        {
          field: '到货数',
          title: '到货数',
          width: '90',
        },
        {
          field: '实际到货数',
          title: '实际到货数',
          width: '90',
        },
        {
          field: '检验匹数',
          title: '检验匹数',
          width: '90',
        },
        {
          field: '检验数',
          title: '检验数',
          width: '90',
        },
        {
          field: '毛重',
          title: '毛重',
          width: '90',
        },
        {
          field: '净重',
          title: '净重',
          width: '90',
        },
        {
          field: '正品匹数',
          title: '正品匹数',
          width: '90',
        },
        {
          field: '正品数量',
          title: '正品数量',
          width: '90',
        },
        {
          field: 'B级匹数',
          title: 'B级匹数',
          width: '90',
        },
        {
          field: 'B级数量',
          title: 'B级数量',
          width: '90',
        },
        {
          field: '次品匹数',
          title: '次品匹数',
          width: '90',
        },
        {
          field: '次品数量',
          title: '次品数量',
          width: '90',
        },
        {
          field: '入库匹数',
          title: '入库匹数',
          width: '90',
        },
        {
          field: '入库数',
          title: '入库数',
          width: '90',
        },
        {
          field: '出货匹数',
          title: '出货匹数',
          width: '90',
        },
        {
          field: '出货数',
          title: '出货数',
          width: '90',
        },
        {
          field: '库存匹数',
          title: '库存匹数',
          width: '90',
        },
        {
          field: '库存数',
          title: '库存数',
          width: '90',
        },
        {
          field: '',
          title: '',
          width: '90',
        },
      ],
    }
  },
  methods: {
    deleteItem(logo) {},
    initdata() {
      this.loading = true
      this.$api.order
        .OrderInfo(this.$attrs.PlanNo)
        .then((res) => {
          if (res.statusCode == 200) {
            this.Progress = res.data.Progress
            this.Progress.forEach((element) => {
              if (element.IfFinish > 0) element.status = 'success'
              else element.status = 'wait'
            })
            this.Progress1 = res.data.Progress1
            this.allinfo = []
            res.data.allinfo.forEach((item) => {
              let obj = {}
              for (var key in item) {
                if (obj.item1) {
                  obj.item2 = key
                  obj.value2 = item[key]
                  this.allinfo.push(obj)
                  obj = {}
                } else {
                  obj.item1 = key
                  obj.value1 = item[key]
                }
              }
            })
            this.zj = res.data.zj
            this.zs = res.data.zs
            this.detail = res.data.detail
          } else {
            this.$message({
              message: res.message,
              type: 'error',
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  created() {
    var h = document.documentElement.clientHeight || document.body.clientHeight
    this.curHeight = h - 430
    this.initdata()
  },
}
</script>
<style lang="scss" scoped>
.orderinfo {
  width: 100%;
  padding: 0px;
  margin: 0px;
}
.box-card {
  height: 250px;
  display: inline-block;
  background-color: white;
  border: 1px solid rgb(186, 194, 193);
  margin: 0px;
  padding: 0px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.titlebar {
  background-color: rgb(224, 245, 236);
  width: 100%;
  height: 24px;
  font-size: 16px;
  font-weight: 800;
}
.detail {
  width: 100%;
  overflow: auto;
}
.dettable {
  font-size: 14px;
  padding: 5px;
}
</style>