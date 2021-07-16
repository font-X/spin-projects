<template>
  <Jy-fill-wrapper :autofill="autofill" :style="autofill ? {} : {height: avHeight}" ref="xTableInputWrap">
    <vxe-grid
      ref="xTableInput"
      class = "jytableinput"
      highlight-hover-row
      border
      resizable
      stripe
      round
      fit
      :height="avHeight"
      highlight-current-row
      width="auto"
      show-all-overflow
      :mouse-config="{selected: true}"
      :checkbox-config="{range: true}"
      :config="{render: 'scroll'}"
      :align="'left'"
      :edit-config="{trigger: 'click', mode: 'cell', autoClear: false}"
      :keyboard-config="{isArrow: true, isDel: true, isTab: true, isEdit: true, isChecked: true}"
      :columns="r_columns"
      v-bind="$attrs"
      @menu-click="contextMenuClickEvent"
      v-on="listenerList"
      :data.sync="data">
      <template #jyInput="{ row, rowIndex, column, columnIndex }" >
        <el-input size="mini" class="my-input"
        @keydown.native="roleFocusEvent({ row, rowIndex, column, columnIndex },$event)"
        v-model="row[column.property]" />
      </template>
      <template #jyLabel="{ row, column }" >
        <label>{{row[column.property]}}</label>
      </template>
        <template #right="{ row, rowIndex }" >
          <i v-if="permission.add" @click="addRow(row, rowIndex)" class="iconC el-icon-circle-plus-outline"></i>
          <i v-if="permission.delete" @click="deleteRow(row, rowIndex)" class="iconC el-icon-delete"></i>
        </template>
    </vxe-grid>
    <input type="hidden" ref="zzz" />
  </Jy-fill-wrapper>
</template>
<script>
import VXETable from 'vxe-table'
import JyTextOpen from '@/components/JyTextOpen'
import JyFillWrapper from '@/components/JyFillWrapper'
export default {
    props:{
      data: [Array, Object],
      columns: [Array],
      toolbar: {
        type: Object,
        default: ()=>{
          return {visible: true}
        }
      },  //
      height: {
        type: [String, Number],
        default: '300px'
      },
      events: [Object],
      autofill: {
        type: Boolean,
        default: false
      },
      isSeq: {
        type: Boolean,
        default: true
      },
      permission: {
        type: Object,
        default: ()=>{
          return {
            add: true,
            delete: true
          }
        }
      }
    },
    components:{
      JyTextOpen,
      JyFillWrapper
    },
    data: function(){
      return {
        loading: false,
        mergeCells: true,
        DEFAULT_RENDER: {
          input: {
            name:"ElInput",
            props: {class: "sup-mini"},
            nativeEvents:{
              keydown: this.roleFocusEvent
            }
          },
          select: {
            name: 'ElSelect',
            autoselect: true,
            autofocus: 'input.el-input__inner',
            props: {filterable: true},
            options: null,
            nativeEvents: {keydown: this.roleFocusEvent}
          },
          datePiceker: {
            name:"ElDatePicker",
            autoselect: true,
            autofocus: 'input.el-input__inner',
            nativeEvents:{
              keydown: this.roleFocusEvent
            }
          },
          textopen: {
            name: "JyTextOpen",
            nativeEvents:{
              keydown: this.roleFocusEvent
            }
          }
        },
        menuConfig: {
          className: 'my-menus',
          enabled: true,
          header: {
              options: [
                [
                  { code: 'exportAll', name: '导出所有.csv' }
                ]
              ]
            },
          body: {
              options: [
                [
                  { code: 'paste', name: '粘贴', prefixIcon: 'fa fa-copy', className: 'my-copy-item' }
                  ,{ code: 'pasteMul', name: '粘贴多行', prefixIcon: 'fa fa-copy', className: 'my-copy-item' }
                ],
                [
                ]
              ]
            }
        }
      }
    },
    mounted(){
      let vm = this;
      this.$refs.xTableInputWrap && this.$refs.xTableInputWrap.$el.addEventListener('paste', async (e) => {
        let {row, rowIndex, column, columnIndex} = vm.$refs.xTableInput.getActiveRecord(),
          columns = this.r_columns,
          data = [...this.data];
        var pastedText = "";
        if (window.clipboardData && window.clipboardData.getData) { // IE
            pastedText = window.clipboardData.getData('Text');
        } else {
            pastedText = e.clipboardData.getData('Text');//e.clipboardData.getData('text/plain');
        }
        if(pastedText){
          pastedText = pastedText.replace(/\r\n/g, '\n');
          let trDetailArry = pastedText.split('\n');
          if(trDetailArry.length > 0
          && !(trDetailArry.length == 1 && trDetailArry[0].split('\t').length == 1)){
            trDetailArry.forEach((item, index)=>{
              let tdDetailArry = item.split('\t');
              if(item && tdDetailArry && tdDetailArry.length > 1){
              if(!data[rowIndex + index]) {
                row = data[rowIndex + index] = vm.getNewItem();
              }
                tdDetailArry && tdDetailArry.forEach((nItem, nIndex)=>{
                  if(columns[columnIndex + nIndex])
                    data[rowIndex + index][columns[columnIndex + nIndex].field] = nItem;
                })
              }
            })
            this.$emit("update:data", data)
            // this.data = [...data];
            this.$nextTick(()=>{
              this.$refs.xTableInput.setActiveRow(row);
            })
            e.preventDefault();
            return false;
          }
        }
      });
    },
    created(){
      this.initdata();
    },
    updated(){
      this.initdata();
    },
    beforeCreate() {
      let that = this;
      VXETable.renderer.add('JyTextOpen', {
        autoselect: true,
        autofocus: 'input.el-input__inner',
    // 可编辑激活模板
        renderEdit (h, renderOpts, obj) {
          let { row, column } = obj,
            property = column.property,
            text = row[renderOpts.text];
          return [
            <jy-text-open
              pageUrl= {renderOpts.pageUrl}
              showField={renderOpts.showField}
              realField={renderOpts.realField}
              dialogConfig={renderOpts.dialogConfig || null}
              text={text}
              {...{on:{change:(v)=>{
                let firstObj = v;
                if(Array.isArray(firstObj)) firstObj = firstObj[0];
                row[property] = firstObj[renderOpts.realField];
                // if(renderOpts.showField){
                //   row[renderOpts.showField] = renderOpts[renderOpts.showField];
                // }
                // obj.row["hid_" + obj.column.property + "_selectData"] = v;
                let result = {...obj};
                result.jyTextopenObj = v
                renderOpts.events && renderOpts.events.change && renderOpts.events.change(result);
              },keydown:(event)=>{
                that.roleFocusEvent(obj, event)
              }}}}
              class="my-cell"/>
          ]
        },
        // 可编辑显示模板
        renderCell (h, renderOpts, { row, column }) {
          return [
            <span>{ row[renderOpts.text || column.property] }</span>
          ]
        },
        // 导出模板，例如导出插槽中自定义的内容
        exportMethod (params) {
          const { row, column } = params
          return '自定义内容'
        }
      })
    },
    computed: {
      r_columns(){
        let that = this;
        let rColumns = this.columns,
            data = this.data,
            toolbar = this.toolbar;
        if(!rColumns && data && data[0]){
            rColumns = Object.keys(data[0]).filter(item=>{
                return item !== '_XID'
            }).map(item=>{
                return {
                  field: item,
                  title: item
                }
            })
        }
        if(!rColumns) rColumns = []
        rColumns = [...rColumns];
          rColumns.forEach(item=>{
            let defaultRender = this.DEFAULT_RENDER[item.jydefineType]
              || this.DEFAULT_RENDER.input,
              newEditRender = {};
            defaultRender = this.$XEUtils.clone(defaultRender, true)
            this.$XEUtils.merge(newEditRender,defaultRender, item.editRender);
            if(item.jydefineType != "noedit"){
              item.editRender = newEditRender;
            }
            if(newEditRender.name === 'ElSelect' && newEditRender.options
            && newEditRender.options[0]){
              let keys = Object.keys(newEditRender.options[0]);
              newEditRender.options.forEach(nItem=>{
                if(!nItem.value) nItem.value = nItem[keys[0]] && (nItem[keys[0]] + "").trim();
                if(!nItem.label) nItem.label = nItem[keys[1]];
              })
            }
            if(newEditRender.events && Array.isArray(newEditRender.events)){
              let  realEvents = {}
              newEditRender.events.forEach(item=>{
                realEvents[item.name] = (v, colValue)=> {
                  that.methodCompile(v, item)
                };
              })
              newEditRender.events = realEvents;
            }
            // 处理插槽
            this.dealSlots(item);
          })
        if(toolbar.visible){
          rColumns.push(this.getTollbar());
        }
        if(this.isSeq){
          rColumns.unshift({ field: '__seq',type: 'seq', width: 50,fixed:"left" });
        }
        return rColumns;
      },
      editColumns(){
        let r_columns = this.r_columns,
          array = [];
        if(r_columns){
          array = r_columns.filter(item=>{
            return item.editRender;
          })
        }
        return array;
      },
      listenerList(){
        let vm = this,
        events = this.events,
        newEvents = {...this.$listeners};
        delete newEvents.modifyData;
        delete newEvents.methodCompile;
        if(events){
          events.forEach(item=>{
            newEvents[item.name] = function(v){
                vm.$emit('methodCompile',{
                    eventName: item.name,
                    eventData: vm.data,
                    methodName: item.method,
                    data: v
                })
            }
          })
        }
        return newEvents
      },
      avHeight(){
        if(this.autofill){
          return "auto";
        }
        return this.height;
      }
    },
    methods: {
      mf({row}){
        this.$emit('modify', row)
      },
      getTableData(){
        return this.$refs.xTableInput.getTableData();
      },
      getTollbar(){
        let tollbar = {
          field: '__jytollbar',
          title: '操作',
          width: 100,
          align: 'center',
          slots:{
            default: 'right'
          }
        };
        return tollbar;
      },
      contextMenuClickEvent (obj) {
        this.$emit("menu-click", obj)
        // switch (menu.code) {
        //   case 'paste':
        //     window.navigator.clipboard.readText().then(v=>{
        //       row[column.property] = v;
        //     });
        //     break
        //   default:
        //}
      },
    addRow(row, rowIndex){
      let data = this.data || [];
      if(this.permission.add){
        let newItem = this.getNewItem();
        // 插入
        if(row){
          data.splice(rowIndex + 1, 0, newItem);
        }else{
          data.push(newItem);
        }
        return newItem;
      }
    },
    isFirstEditColumn(columnIndex){
      return this.editColumns[0] === this.r_columns[columnIndex];
    },
    isLastEditColumn(columnIndex){
      return this.editColumns[this.editColumns.length - 1] === this.r_columns[columnIndex];
    },
    deleteRow(row, rowIndex){
      let  vm = this;
      if(this.permission.delete){
        this.$confirm('是否删除本行?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.data.splice(rowIndex, 1);
          if(this.data.length === 0){
            this.addRow();
          }
          setTimeout(() => {
            this.$refs.xTableInput.setActiveRow(vm.data[rowIndex]
            || vm.data[rowIndex - 1] )
          }, 0);
        }).catch(() => {
        });
      }
    },
    roleFocusEvent({ rowIndex,columnIndex, row, column }, event){
      let columns = this.r_columns,
        xTableInput = this.$refs.xTableInput,
        that = this,
        target = event.target || event.srcElement,
        poistion = -1,
        keyCode = event.keyCode;
      if (keyCode === 13) {
          if(this.isLastEditColumn(columnIndex)){
            if(rowIndex === this.data.length - 1){
              this.addRow();
            }
            setTimeout(() => {
              that.data[rowIndex + 1] && xTableInput.setActiveRow(that.data[rowIndex + 1])
            }, 0);
            // this.$nextTick(()=>{
            //   a = xTableInput.$el.innerHTML;
            //   console.log(v === xTableInput.$el.innerHTML)
            //   //xTableInput.setActiveRow(that.data[rowIndex + 1])
            //   //xTableInput.setActiveRow(this.data[rowIndex + 1])
            // })
          }else{
            xTableInput.setActiveCell(row, columns[columnIndex + 1].field);
          }
      }else if(keyCode === 37){
        poistion = this.getTxt1CursorPosition(target);
        if(poistion === 0){
          if(this.isFirstEditColumn(columnIndex) && rowIndex > 0){
             xTableInput.setActiveCell(that.data[rowIndex - 1],
                this.editColumns[this.editColumns.length - 1].field);
          }else{
            xTableInput.setActiveCell(row, columns[columnIndex - 1].field);
          }
        }
      }else if(keyCode === 39){
        poistion = this.getTxt1CursorPosition(target);
        if((!target.value || target.value.length === poistion)){
          if(!this.isLastEditColumn(columnIndex)){
            xTableInput.setActiveCell(row, columns[columnIndex + 1].field);
          }else{
            if(this.data[rowIndex + 1]){
               xTableInput.setActiveRow(this.data[rowIndex + 1])
            }
          }
        }
      }else if(keyCode === 38){
        if(rowIndex > -1){
          xTableInput.setActiveCell(that.data[rowIndex - 1], columns[columnIndex].field);
        }
      }else if(keyCode === 40){
        if(rowIndex < this.data.length - 1){
          xTableInput.setActiveCell(that.data[rowIndex + 1], columns[columnIndex].field);
        }
      }else if(keyCode === 46){
        //删除
        this.deleteRow(row, rowIndex);
      }
    },
    getNewItem(){
        let newItem = {};
        this.r_columns.forEach(item=>{
            newItem[item.field] = "";
        })
        return newItem;
    },
    getData(flag){
        let jObject = {};
        let jValue = this.data.map(item=>{
            jObject[ item["value"] ] = item["label"];
            return {
                value: item["value"],
                label: item["label"]
            }
        })
        if(flag === 'object'){
            jValue = jObject;
        }
        this.$emit("modifyData",jValue);
        this.jValue = JSON.stringify(jValue);
        this.isShowDialog = false;
    },
    initdata(){
      let rdata = this.data,
        rColumns = this.columns || this.r_columns;
      if(!rdata || rdata.length === 0){
        if(rColumns){
          let defData = this.addRow();
          defData && (rdata = [defData]);
        }
      }
      this.$emit("update:data", rdata);
      return rdata;
    },
    getTxt1CursorPosition(ele){
        var cursurPosition=0;
        if(ele.selectionStart){//非IE
            cursurPosition=ele.selectionStart;
        }else{//IE
            try{
                var range = document.selection.createRange();
                range.moveStart("character",-ele.value.length);
                cursurPosition=range.text.length;
            }catch(e){
                cursurPosition = 0;
            }
        }
        return cursurPosition;//打印当前索引
    },
    methodCompile(v, item){
      this.$emit('methodCompile',{
        eventName: item.name,
        eventData: this,
        methodName: item.method,
        data: v
      })
    },
    dealSlots(item){
      let slots = this.$slots,
        scopedSlots = this.$scopedSlots;
      if(item.slots){
        Object.keys(item.slots).forEach(ele =>{
          let value = item.slots[ele];
          if(typeof value === "string"){
            if(slots[value]){
              item.slots[ele] = ()=>{
                return slots[value];
              }
            }else if(scopedSlots[value]){
              item.slots[ele] = scopedSlots[value];
            }
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.iconC {
  font-size: 18px;
  color: #2B55EE;
}
</style>