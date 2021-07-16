
<!--
    /**
     * 分类编码树形选择框
       带搜索功能
       暂时不支持多选
     * 调用示例：
-->
<template>
  <jy-dialog
    :title="dialogTitle"
    append-to-body
    :close-on-click-modal="false"
    class="dialog-component"
    :visible.sync="showDialog"
    width="600px"
    @open="openDialog"
    @close="closeDialog(0)"
  >
    <el-container v-loading="loading">
      <el-row style="width: 100%">
        <el-card class="cardMargin">
          <el-row>
            <el-input
              placeholder="输入关键字进行过滤"
              size="mini"
              v-model="filterText"
            >
            </el-input>
          </el-row>
          <el-row>
            <el-tree
              :data="data"
              @node-click="handleNodeClick"
              default-expand-all
              highlight-current
              :filter-node-method="filterNode"
              ref="tree"
            ></el-tree>
          </el-row>
        </el-card>
      </el-row>
    </el-container>
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <el-button type="primary" size="mini" @click="okDialog()"
            >确定</el-button
          >
          <el-button type="primary" size="mini" @click="closeDialog()"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </span>
  </jy-dialog>
</template>
 
<script>
import JyDialog from '../../../components/JyDialog'
export default {
  components: { JyDialog },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
  },
  data() {
    return {
      dialogTitle: '选择产品编码',
      filterText: '',
      showDialog: false,
      loading: false,
      data: [],
    }
  },
  methods: {
    //初始化
    openDialog() {},
    // 关闭弹框
    closeDialog(flag) {
      this.showDialog = false
      this.filterText = ''
      this.$emit('closeDialog', flag)
    },
    //选择完数据
    okDialog() {
      let data = this.$refs.tree.getCurrentNode()
      console.log(data)
      if (!data) {
        this.$message({
          message: '未选择数据',
          type: 'error',
        })
        return
      }
      this.$emit('okDialog', data)
      this.showDialog = false
    },
    //点击事件
    handleNodeClick() {},
    //搜索事件
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    //查询数据
    queryProduct() {
      this.loading = true
      this.$api.publicApi
        .GetSelectProductTreeList()
        .then((res) => {
          this.loading = false
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.data = res.data
          }
        })
        .catch((err) => (this.loading = false))
    },
  },
  created() {
    this.queryProduct()
  },
}
</script>
 
<style scoped lang="scss">
.el-tree {
  margin-top: 20px;
  margin-left: 30px;
}
// /* 点击树结构项的选中颜色 */
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #d1d3d6;
}
</style>
