<template>
  <el-row v-loading="loading">
    <vxe-grid
      border
      resizable
      stripe
      width="auto"
      :height="gridHeight"
      :show-footer="showfooter"
      :auto-resize="true"
      :columns="columns"
      highlight-hover-row
      :config="{ render: 'scroll' }"
      :align="'center'"
      :checkbox-config="{ highlight: true, range: true }"
      :sort-config="{ remote: true, sortMethod: sortquery }"
      :footer-method="footerMethod"
      ref="grid"
      :data="gridData"
      class="vxe-grid"
      @cell-click="cellclick"
      @sort-change="sortchange"
      @cell-dblclick="celldblclick"
    >
    </vxe-grid>
    <el-row id="pagin" v-if="isPage">
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.page"
        background
        :page-sizes="[100, 200, 500, 1000]"
        :page-size="pageInfo.pageSize"
        layout="prev,pager,next,total,sizes,jumper"
        :total="pageInfo.total"
      >
      </el-pagination>
    </el-row>
  </el-row>
</template>
<script>
export default {
  name: 'jy-page-tabl',
  watch: {
    height: {
      handler() {
        this.gridHeight = this.height - 80
      },
      immediate: true,
    },
    data: {
      handler(newval) {
        this.gridData = newval
      },
      immediate: true,
    },
    columns: {
      handler(newval) {
        this.columns = newval
      },
      immediate: true,
    },
  },
  props: {
    height: {
      data: Number,
      default() {
        return 600
      },
    },
    //是否允许多选
    multiple: {
      data: Boolean,
      default() {
        return true
      },
    },
    //是否分页
    isPage: {
      data: Boolean,
      default() {
        return true
      },
    },
    //是否显示汇总
    showfooter: {
      data: Boolean,
      default() {
        return true
      },
    },
    data: {
      data: Array,
      default() {
        return []
      },
    },
    querModel: {
      data: Object,
      default() {
        return {}
      },
    },
    columns: {
      data: Array,
      default() {
        return []
      },
    },
    action: {
      data: String,
    },
    exportAction: {
      data: String,
    },
  },
  data() {
    return {
      loading: false,
      gridData: [],
      gridHeight: 500,
      pageInfo: {
        page: 1,
        pageSize: 100,
        total: 0,
        data: [],
        exprotType: null,
      },
    }
  },
  methods: {
    //查询数据
    query() {
      this.$nextTick(() => {
        this.pageInfo.page = 1
        this.gridLoad()
      })
    },
    //加载数据
    gridLoad() {
      if (this.action) {
        this.loading = true
        this.pageInfo.exprotType = null
        this.$api.publicApi
          .dynamicurl(this.action, {
            model: { ...this.querModel },
            pageInfo: { ...this.pageInfo },
          })
          .then((res) => {
            this.loading = false
            if (!res.isSucceed) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              if (res.data != null) {
                this.pageInfo = res.data
                this.gridData = this.pageInfo.data
                delete this.pageInfo.data
              }
              // if (this.isPage) {
              //   this.pageInfo = res.data
              //   this.gridData = this.pageInfo.data
              //   delete this.pageInfo.data
              // } else {
              //   this.gridData = res.data
              // }
            }
          })
          .catch((err) => (this.loading = false))
      }
    },
    sortquery({ property, order }) {
      this.pageInfo.sortName = property
      this.pageInfo.sortOrder = order
      this.gridLoad()
      return null
    },
    //排序
    sortchange({ property, order }) {
      this.pageInfo.sortName = property
      this.pageInfo.sortOrder = order
      this.gridLoad()
    },
    //点击单元格
    cellclick(data) {
      if (data.columnIndex != 0) {
        var ischeck = this.$refs.grid.isCheckedByCheckboxRow(data.row) == false
        if (!this.multiple) {
          this.$refs.grid.setAllCheckboxRow(false)
        }
        this.$refs.grid.setCheckboxRow(data.row, ischeck)
      }
    },
    //双击单元格
    celldblclick(data) {
      console.log(data)
      this.$emit('cell-dblclick', data)
    },
    //切换一页数量
    handleSizeChange(val) {
      this.pageInfo.page = 1
      this.pageInfo.pageSize = val
      this.gridLoad()
    },
    //切换当前页码
    handleCurrentChange(val) {
      this.pageInfo.page = val
      this.gridLoad()
    },
    //获取选择行
    getCheckRow() {
      var data = []
      data.push(...this.$refs.grid.getCheckboxRecords())
      if (this.multiple) {
        return data
      } else {
        return data[0]
      }
    },
    //汇总
    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return '合计'
          } else {
            var data = { ...this.pageInfo.footerData }
            if (!data) {
              return null
            }
            if (!!data[column.property]) {
              return data[column.property]
            }
          }
          return null
        }),
      ]
      return footerData
    },
    //导出excel
    exportexcel(type) {
      if (this.pageInfo.total > 10000) {
        this.$confirm(
          '此表数据量有点大,建议搜索后再导出,仍需要导出该数据么？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
          }
        ).then(() => {
          this.exprotdata()
        })
      } else {
        this.exprotdata()
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    exprotdata() {
      if (this.isPage) {
        this.loading = true
        this.pageInfo.exprotType = 1
        this.$api.publicApi
          .dynamicurl(this.action, {
            model: { ...this.querModel },
            pageInfo: { ...this.pageInfo },
          })
          .then((res) => {
            this.loading = false
            if (!res.isSucceed) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.exportjsontoexcel(res.data.data)
            }
          })
          .catch((err) => (this.loading = false))
      }
      else{
        this.exportjsontoexcel(this.gridData)
      }
    },
    exportjsontoexcel(gridData) {
      console.log(gridData)
      import('@/vendor/Export2Excel').then((excel) => {
        let tHeader = []
        let filterVal = []
        this.columns.forEach((item) => {
          if (item.field) {
            tHeader.push(item.title)
            filterVal.push(item.field)
          }
        })
        const data = this.formatJson(filterVal, gridData)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '导出',
        })
      })
    },
  },
  created() {
    this.$nextTick(() => {
      this.query()
    })
  },
}
</script>
<style lang="scss" scoped>
.vxe-grid {
  margin-top: 10px;
}
.el-pagination {
  float: right;
  padding-top: 10px;
  padding-right: 20px;
}
</style>
