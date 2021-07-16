<template>
  <div>
    <el-dialog
      ref="PrintDialog"
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      v-dialogDrag="true"
      width="500px"
      center
    >
      <span slot="title" :style="{ color: 'white' }">
        <div style="padding: 15px 20px">{{ title }}</div>
      </span>
      <vxe-table
        border
        resizable
        stripe
        width="auto"
        :loading="IsSearch"
        :auto-resize="true"
        show-overflow
        show-header-overflow
        height="300px"
        class="mytable-scrollbar"
        highlight-current-row
        :config="{ render: 'scroll' }"
        :align="'center'"
        :checkbox-config="{ highlight: true }"
        :data="printdata"
        @cell-click="selectionRowsEvent"
      >
        <vxe-table-column type="seq" width="60" title="序号"></vxe-table-column>
        <vxe-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          v-bind="item"
        >
        </vxe-table-column>
      </vxe-table>
      <span align="right" slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          class="el-icon el-icon-print"
          size="mini"
          @click="printbtn"
          >打印</el-button
        >
        <el-button
          type="primary"
          class="el-icon el-icon-print"
          size="mini"
          @click="exportbtn"
          >导出XLS</el-button
        >
        <el-button
          class="el-icon el-icon-close"
          size="mini"
          @click="dialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import WSObject from '../common/js/utils/gesocket.js'
export default {
  name: 'PrintDialog',
  data() {
    return {
      dialogVisible: false,
      title: '打印列表',
      isDrag: true,
      IsSearch: false,
      printdata: [],
      tableColumns: [
        { field: '序号', title: '编号', width: '110' },
        { field: '模版名称', title: '单证名称', width: '140' },
        { field: '格式', title: '格式', width: '60' },
        { field: '是否默认', title: '是否默认', width: '90' },
      ],
      selectRow: null,
      ID: [],
      LableNo:'',
      Count:1
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    selectionRowsEvent(row) {
      this.selectRow = row.row
    },
    closeDialog() {
      this.dialogVisible = false
    },
    exportbtn() {
      this.IsSearch = true
      let LableNo = this.LableNo
      console.log(this.selectRow)
      if (LableNo == '') {
        if (this.selectRow == null) {
          alert('请选择打印标签')
          return
        }
        LableNo = this.selectRow.序号
      }
      this.$api.print
        .Export({
          param: {
            ID: this.ID,
            LableNo: LableNo,
            //Action: this.Action,
            //FileType: this.FileType,
            //RowCountMin: this.RowCountMin,
            //isPlan: this.isPlan,
          },
        })
        .then((res) => {
          console.info(res)
          if (res.status == 200) {
            let cont = res.headers['content-disposition']
            let fileName = '导出.xls'
            if (cont && cont.includes('filename=')) {
              fileName = decodeURI(cont.split(';')[1].split('=')[1])
            }
            // 将`blob`对象转化成一个可访问的`url`
            let url = window.URL.createObjectURL(new Blob([res.data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          } else {
            this.$message({
              message: res.statusText,
              type: 'error',
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.IsSearch = false
        })
    },
    PrintHandle(TempType, tempNote, labelNote) {
      //let ws=new WSObject();
      let ws = new WSObject('ws://localhost:8080/')
      ws.PrintSomeA(TempType, tempNote, labelNote, this.Count, '', false)
      //ws.PrintSomeA(2, tempNote, labelNote, 1, "Microsoft XPS Document Writer");
    },
    printDll(dllparam) {
      if(dllparam.Count) this.Count=dllparam.Count
      this.IsSearch = true
      this.$api.print
        .PrintDll({
          param: {
            ID: dllparam.ID || [],
            LabelType: dllparam.LabelType || '',
            LableNo: dllparam.LableNo || ''
          },
        })
        .then((res) => {
          console.info(res)
          if (res.statusCode == 200) {
            let labelNote = '◆Printstr◆#[]◇◆'
            if (res.data.TempNote == '') {
              alert('模板内容为空')
              return
            }
            if (res.data.Content != '') {
              labelNote = res.data.Content
            }
            //this.PrintDll(res.data.TempType, res.data.TempNote, res.data.Content)
            this.PrintHandle(res.data.TempType, res.data.TempNote, labelNote)
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
          this.IsSearch = false
          this.dialogVisible = false
        })
    },
    printbtn() {
      this.printXls()
    },
    printXls(xlsparam) {
      if(!xlsparam) xlsparam={}
      let LableNo = xlsparam.LableNo
      let ID = xlsparam.ID
      if (!LableNo) {
        if (this.selectRow == null) {
          alert('请选择打印标签')
          return
        }
        LableNo = this.selectRow.序号
        //if(/PrintXls/.test(this.selectRow.docfun)) TempType = 'xls'
      }
      if (!ID) ID = this.ID
      this.IsSearch = true
      this.$api.print
        .Print({
          param: {
            ID: ID,
            LableNo: LableNo,
            LabelType:xlsparam.LabelType || '',
            Action: xlsparam.Action || '',
            FileType: xlsparam.FileType || '',
            RowCountMin: xlsparam.RowCountMin || 0,
            isPlan: xlsparam.isPlan || false,
          },
        })
        .then((res) => {
          console.info(res)
          if (res.statusCode == 200) {
            let url = res.data.Path
            /*
              let pWin = window.open('', '', 'width=1200,height=900', true) //新打开一个空窗口
              pWin.document.write(res.data.Content)
              pWin.document.close()
              pWin.focus()
              setTimeout(function () {
                pWin.print() //打印
                pWin.close() //关闭窗口
              }, 100)
              */
            let pWin = window.open(url, '', 'width=1200,height=900', true) //新打开一个空窗口
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
          this.IsSearch = false
          this.dialogVisible = false
        })
    },
    printList(listparam) {
      this.ID = listparam.ID
      this.dialogVisible = true
      if (this.ID.length <= 0) this.ID = ['']
      this.IsSearch = true
      this.$api.print
        .PrintList({
          param: {
            Code: listparam.Code || '',
            TempType: listparam.TempType || '',
            IsDefault: '0',
            DataId: this.ID[0] || '',
            DataType: listparam.DataType || '',
          },
        })
        .then((res) => {
          console.info(res)
          if (res.statusCode == 200) {
            this.printdata = res.data
            this.pageList()
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
          this.IsSearch = false
        })
    },
  },
}
</script>
<style scoped>
.el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>