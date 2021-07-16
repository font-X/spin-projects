<template>
  <div>
    <el-form
      ref="mainForm"
      :model="master"
      style="font-size：12px"
      label-width="84px"
      :inline="true"
    >
      <el-form-item label="指示单号">
        <vxe-input
          v-model="master.指示单号"
          placeholder="订单号"
          size="mini"
          :readonly="true"
          style="width:150px"
        ></vxe-input>
      </el-form-item>
      <el-form-item label="产品号">
        <vxe-input
          v-model="master.产品号"
          placeholder="产品号"
          size="mini"
          :readonly="true"
          style="width:150px"
        ></vxe-input>
      </el-form-item>
      <el-form-item label="品名">
        <vxe-input
          v-model="master.品名"
          placeholder="品名"
          size="mini"
          :readonly="true"
          style="width:150px"
        ></vxe-input>
      </el-form-item>
      <el-form-item label="业务员">
        <vxe-input
          v-model="master.业务员"
          placeholder="业务员"
          size="mini"
          :readonly="true"
          style="width:150px"
        ></vxe-input>
      </el-form-item>
      </el-form>
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
</template>
<script>
export default {
  name: 'PlanDayReport',
  data() {
    return {
      loading: false,
      master: {},
      detail: [],
      tableColumns: [
        {
          field: '指示单号',
          title: '指示单号',
          width: '90',
        },
        {
          field: '产品编码',
          title: '产品编码',
          width: '90',
        },
        {
          field: '产品名称',
          title: '产品名称',
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
          field: '花型',
          title: '花型',
          width: '90',
        },
        {
          field: '订单数量',
          title: '订单数量',
          width: '90',
        },
        {
          field: '正品米数',
          title: '正品米数',
          width: '90',
        },
        {
          field: 'A类匹数',
          title: 'A类匹数',
          width: '90',
        },
        {
          field: 'A类数',
          title: 'A类数',
          width: '90',
        },
        {
          field: 'B类数',
          title: 'B类数',
          width: '90',
        },
        {
          field: '经向数',
          title: '经向数',
          width: '90',
        },
        {
          field: '内衬数',
          title: '内衬数',
          width: '90',
        },
        {
          field: '次品数',
          title: '次品数',
          width: '90',
        },
        {
          field: '双层数',
          title: '双层数',
          width: '90',
        },
        {
          field: '留样数',
          title: '留样数',
          width: '90',
        },
        {
          field: '可压皱数',
          title: '可压皱数',
          width: '90',
        },
        {
          field: '边上有亮丝数',
          title: '边上有亮丝数',
          width: '120',
        },
        {
          field: '绣花数',
          title: '绣花数',
          width: '90',
        },
        {
          field: '总毛重',
          title: '总毛重',
          width: '90',
        },
        {
          field: '总净重',
          title: '总净重',
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
        .PlanDayReport({
          PlanNo: this.$attrs.PlanNo,
          BeginDate: '',
          EndDate: '',
        })
        .then((res) => {
          if (res.statusCode == 200) {
            this.master = res.data.master
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
    this.curHeight = h - 180
    this.initdata()
  },
}
</script>