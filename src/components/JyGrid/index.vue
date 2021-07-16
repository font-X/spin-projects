<template>
  <div ref="jydatalist" class="" :style="outStyle">
    <vxe-grid
      ref="grid"
      class="jygrid"
      :row-style="getRowStyle"
      :footer-method="getFooter"
      border="full"
      align="center"
      v-bind="$attrs"
      show-overflow=""
      :columns="tableColumn"
      :checkbox-config="{highlight: true}"
      v-on="$listeners"
      @checkbox-all="onCheckboxChange"
      @checkbox-change="onCheckboxChange"
      @current-change="onCurrentChange"
      @cell-menu="onCellMenu"
      @cell-click="onCellClick"
      @cell-dblclick="onCellDblClick"
      height="auto"
      auto-resize
      size="mini"
      :show-header-overflow="true"
      show-footer-overflow
      show-header
      show-footer
      :resizable="true"
      :data="tableData"
      :export-config="{ filename: '导出数据' }"
    >
    </vxe-grid>
    <!-- <table>
            <tr v-for="d1 in tableData" :key="d1['ProductNo']">
                <td v-for="(value,key,index) in d1"
                :key="'td' + d1['ProductNo'] + index">{{value}}</td>
            </tr>
        </table> -->
  </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
const ANY_TYPE = [Object, Array, String, Number, Boolean, Symbol]
export default {
  props: {
    data: [Array, Object],
    columns: Array,
    height: [Number, String],
    //   height: {
    //     type: [Number, String],
    //     default: "auto"
    //   },
    //   width: [Number, String],
    //   configprop: Object,
    //   "max-height": [Number, String],
    //   "auto-resize": Boolean,
    //   "sync-resize": [Boolean, String, Number],
    //   resizable: Boolean,
    //   stripe: Boolean,
    //   border: [Boolean, String],
    //   round: Boolean,
    //   size: String,
    //   loading: Boolean,
    //   align: String,
    //   "header-align": String,
    //   "footer-align": String,
    //   "show-header": Boolean,
    //   "highlight-current-row": Boolean,
    //   "highlight-hover-row": Boolean,
    //   "highlight-current-column": Boolean,
    //   "highlight-hover-column": Boolean,
    //   "highlight-cell": Boolean,
    //   "row-class-name": String,
    //   "cell-class-name": String,
    //   "header-row-class-name": String,
    //   "header-cell-class-name": String,
    //   "footer-row-class-name": String,
    //   "footer-cell-class-name": String,
    //   "cell-style": ANY_TYPE,
    //   "header-cell-style": ANY_TYPE,
    //   "footer-cell-style": ANY_TYPE,
    //   "row-style": ANY_TYPE,
    //   "header-row-style": ANY_TYPE,
    //   "footer-row-style": ANY_TYPE,
    //   "show-footer": Boolean,
    //   "footer-method": ANY_TYPE,
    //   "merge-cells": Array,
    //   "merge-footer-items": Array,
    //   "span-method": ANY_TYPE,
    //   "footer-span-method": ANY_TYPE,
    //   "show-overflow": Boolean,
    //   "show-header-overflow": Boolean,
    //   "show-footer-overflow": Boolean,
    //   "column-key": Boolean,
    //   "row-key": Boolean,
    //   "row-id": String,
    //   "keep-source": Boolean,
    //   "column-config": ANY_TYPE,
    //   "resizable-config": Object,
    //   "seq-config": ANY_TYPE,
    //   "sort-config": ANY_TYPE,
    //   "filter-config": ANY_TYPE,
    //   "export-config": ANY_TYPE,
    //   "import-config": ANY_TYPE,
    //   "print-config": ANY_TYPE,
    //   "radio-config": ANY_TYPE,
    //   "checkbox-config": ANY_TYPE,
    //   "tooltip-config": ANY_TYPE,
    //   "expand-config": ANY_TYPE,
    //   "tree-config": ANY_TYPE,
    //   "menu-config": ANY_TYPE,
    //   "clip-config": ANY_TYPE,
    //   "fnr-config": ANY_TYPE,
    //   "mouse-config": ANY_TYPE,
    //   "area-config": ANY_TYPE,
    //   "keyboard-config": ANY_TYPE,
    //   "edit-config": ANY_TYPE,
    //   "valid-config": ANY_TYPE,
    //   "edit-rules": ANY_TYPE,
    //   "empty-text": String,
    //   "empty-render": ANY_TYPE,
    //   "custom-config": ANY_TYPE,
    //   "scroll-x": ANY_TYPE,
    //   "scroll-y": ANY_TYPE,
    //   "params": ANY_TYPE,
    //   "form-config": ANY_TYPE,
    //   "toolbar-config": ANY_TYPE,
    //   "pager-config": ANY_TYPE,
    //   "proxy-config": ANY_TYPE,
    //   "zoom-config": ANY_TYPE,

    //自己新增属性
    autofill: Boolean,
    field: String,
    showItem: [String, Array], // 显示列
    notShowItem: [String, Array], // 不显示列
    summaryFields: [String, Array, Object], // 合计列
    columnsConfig: Array,
    keepSearchCheckbox: Boolean //需要开启才会保留筛选后的选中
  },
  data: function () {
    return {
      gridprop: {},
      avHeight: this.height,
      tableToolbar: {
        export: true,
        zoom: true,
        custom: true,
      },
    }
  },
  computed: {
    tableData() {
      return this.data
    },
    tableColumn() {
      let v = this.columns || [],
        notShowItem = this.notShowItem,
        showItem = this.showItem,
        columnsConfig = this.columnsConfig //this.configprop && this.configprop.tableColumn;
      if (!v || v.length === 0) {
        v = this.initTableColumn(this.tableData)
      }
      // 老系统颜色列
      v.forEach((item) => {
        if (item.field && item.field.toLowerCase() === 'colorcolumn') {
          item.visible = false
        }
        if(!item.hasOwnProperty("sortable")){
          item.sortable = true;
        }
        //筛选
        // item.filters = [{
        //   data: ''
        // }]
        // item.filterMethod = (v)=>{
        //   console.log(v)
        // }
      })
      if (showItem) {
        if (typeof showItem === 'string') {
          showItem = showItem.split(',')
        }
        if (showItem.length > 0) {
          v.forEach((item) => {
            if (!showItem.includes(item.field)) {
              item.visible = false
            }
          })
        }
      }
      if (notShowItem) {
        if (typeof notShowItem === 'string') {
          notShowItem = notShowItem.split(',')
        }
        if (notShowItem.length > 0) {
          v.forEach((item) => {
            if (notShowItem.includes(item.field)) {
              item.visible = false
            }
          })
        }
      }
      if (columnsConfig && columnsConfig.length) {
        v.forEach((item, index) => {
          columnsConfig.forEach((nItem) => {
            if (nItem.field === item.field) {
              v[index] = { ...item, ...nItem }
            }
          })
        })
      }
      return v
    },
    outStyle() {
      let outStyle = {},
        height = this.avHeight
      if (height == 'auto') height = '100px'
      if (+height) {
        height = height + 'px'
      }
      outStyle.height = height || '100px'
      return outStyle
    },
  },
  created() {},
  updated(v) {},
  mounted() {
    this.initHeight()
  },
  methods: {
    zzz(zo) {
      alert(zo || 'zzz')
    },
    reloadData(data) {
      this.$refs.grid.reloadData(data)
    },
    initTableColumn(data) {
      let tableColumn = []
      if (data && data.length > 0) {
        tableColumn = Object.keys(data[0]).filter(item=>{
          return item != "_XID" && item != "__JYCHECKED"
        }).map((item, index) => {
          //图片等显示
          let t=''
          if(/<*\/>/.test(data[0][item])) t='html'
          return {
            type:t,
            field: item,
            title: item,
            showOverflow: true,
            showHeaderOverflow: true,
            minWidth: 100,
            //fixed: index === 0 ? 'left' : '',
          }
        })
        tableColumn.unshift({ type: 'checkbox', width: 50})
        tableColumn.unshift({ type: 'seq', width: 50 })
      }
      return tableColumn
    },
    onCheckboxChange(obj) {
      //this.$emit('checkbox-change', obj)
      if(this.keepSearchCheckbox){
        let checked = obj.checked;
        // 用于全局搜索（JyFilter）之后留下选中痕迹
        if(obj.row) obj.row.__JYCHECKED = obj.checked;
        else{
          this.tableData.forEach(item => {
            item.__JYCHECKED = checked;
          })
        }
      }
      this.$emit('modifyData', {
        propertyName: 'checkboxRecords',
        value: this.$refs.grid.getCheckboxRecords(),
        field: this.field,
      })
    },
    onCurrentChange(obj) {
      // this.$emit('current-change', obj)
    },
    onCellMenu(obj) {
      // this.$emit('cell-menu', obj)
    },
    onCellClick({row, $event }) {
      let target = $event.target;
      while( target.nodeName.toLowerCase() != 'td' && target.parentNode){
        target = target.parentNode;
      }
      if(target && target.className.split(' ').indexOf('col--checkbox') === -1){
        this.$refs.grid.clearCheckboxRow()
        this.$refs.grid.setCheckboxRow(row, true);
        this.onCheckboxChange();
      }
      // this.$emit('cell-click', obj)
    },
    onCellDblClick(obj) {
      // this.$emit('cell-dblclick', obj)
    },
    getCheckboxRecords() {
      return this.$refs.grid.getCheckboxRecords()
    },
    getCurrentRecord() {
      return this.$refs.grid.getCurrentRecord()
    },
    getFooter() {
      let summaryFields = this.summaryFields,
        data = this.tableData,
        columns = this.tableColumn.filter(item=>item.visible!=false),
        array = [],
        temp = [],
        fieldArray = [];
      if (summaryFields) {
        if(this.$XEUtils.isPlainObject(summaryFields)){
          fieldArray = Object.keys(summaryFields)
        }
        else if (typeof summaryFields == 'string') {
          fieldArray = summaryFields.split(',')
        }else{
          fieldArray = summaryFields;
        }
        columns.forEach((item, index) => {
          let n = null
          if (index === 0) {
            n = '合计'
          } else if (fieldArray.includes(item.field)) {
            n = 0
            temp.push({
              field: item.field,
              index: index,
            })
          }
          array.push(n)
        })
        if(this.$XEUtils.isPlainObject(summaryFields)){
          temp.forEach((nItem) => {
            array[nItem.index] = summaryFields[nItem.field];
          })
        }else{
          data.forEach((item) => {
            temp.forEach((nItem) => {
              array[nItem.index] += +item[nItem.field] || 0
            })
          })
        }
        array.forEach((item, index) => {
          if (item && item.toFixed) {
            array[index] = item.toFixed(2)
          }
        })
        array = [array];
      }
      return array
    },
    getRowClassName({ row, column }) {
      let color = row['ColorColumn'],
        className = ''
      if (color) {
        color = (color + "").trim()
        switch (color) {
          case '-1':
            className = 'black_row'
            break
          case '1':
            className = 'red_row'
            break
          case '-2':
            className = 'lblue_row'
            break
          case '-3':
            className = 'green_row'
            break
          case '-4':
            className = 'blue_row'
            break
          case '-5':
            className = 'orange_row'
          break
        }
      }
      return className
    },
    // 此方法处于评估阶段不知道什么时候就不能用了
    getRowStyle({row}){
      let color = row['ColorColumn'],
        result = "";
      if (color) {
        color = (color + "").trim()
        switch (color) {
          case '-1':
            result = '#000'
            break
          case '1':
            result = '#ff0000'
            break
          case '-2':
            result = '#00ffff'
            break
          case '-3':
            result = '#009933'
            break
          case '-4':
            result = '#0000ff'
            break
          case '-5':
            result = '#ffa500'
            break
          default:
            result = color
            break
        }
      }
      if(result)
        return 'color:' + result + ';'
    },
    /**
    * 自定义方法
    * -------------------------------------------------------------
    */
    

    // ---------------------------------------------------------------

    initHeight() {
      if (this.autofill || !this.avHeight) {
        let jydatalist = this.$refs.jydatalist,
          parent = jydatalist,
          jTop = jydatalist.getBoundingClientRect().top,
          jBottom = jydatalist.getBoundingClientRect().bottom,
          maxBottom = jBottom,
          diffHeight = 0
        while (
          parent &&
          parent.className != 'jy-win-dialog' &&
          parent.id != 'app' &&
          !(
            parent.className &&
            parent.className.split(' ').indexOf('h100p') > -1
          )
        ) {
          parent = parent.parentNode
          if (parent && parent.getBoundingClientRect) {
            let lastElementChildBottom = this.getLastChildBottom(parent);// parent.lastElementChild;
            let pComputedStyle = window.getComputedStyle(parent, null);
            diffHeight +=
              parent.getBoundingClientRect().bottom -
              pComputedStyle['padding-bottom'].replace('px', '') -
              lastElementChildBottom;
            // console.log(parent,parent.getBoundingClientRect().bottom,
            // lastElementChildBottom,diffHeight , '55555555');
          }
          //&& (maxBottom = window.Math.max(maxBottom, parent.lastElementChild.getBoundingClientRect().bottom));
        }
        // if(parent){
        //     let pBottom = parent.getBoundingClientRect().bottom;
        //     console.log(parent,maxBottom,parent.lastChild.getBoundingClientRect().bottom,pBottom, jTop, parent.getBoundingClientRect().top );
        //     jTop = fillwrapper.clientHeight + (pBottom - maxBottom);
        // }else{
        //     jTop = window.innerHeight -  jTop - (maxBottom - jBottom);
        //     console.log(parent,maxBottom, jBottom)
        // }
        jTop = jydatalist.clientHeight + diffHeight
        //console.log(window.innerHeight, document.body.getBoundingClientRect().bottom, maxBottom, jydatalist.getBoundingClientRect().bottom);
         this.avHeight = window.Math.max(jTop - 5, 10);
        // console.log(this.avHeight, 'opopopopop')
      }
    },
    exportDataEvent(pro,filename) {
      if(!filename) filename='导出'
      //this.$refs.grid.openExport(pro)
      const ws = XLSX.utils.json_to_sheet(this.tableData)
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, filename+'.xls',{ bookType: 'xls', bookSST: false, type: "array" });
    },
    getLastChildBottom(ele){
      let children = ele.children,
        bottom = 0;
      for(let i = children.length; i > -1 ; i--){
        if(children[i]
          && children[i].getBoundingClientRect
          && children[i].getBoundingClientRect().bottom){
            bottom = children[i].getBoundingClientRect().bottom
            break;
          }
      }
      return bottom
    }
  }
}
</script>
<style lang="scss"  scoped>
>>>.black_row {
  color: #000;
}
>>>.red_row {
  color: #ff0000;
}
>>>.lblue_row {
  color: #00ffff;
}
>>>.green_row {
  color: #009933;
}
>>>.blue_row {
  color: #0000ff;
}
>>>.orange_row {
  color: #ffa500;
}
>>> tr{
  cursor: pointer;
}
</style>