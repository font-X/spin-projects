<template>
  <div >
    <el-dialog  title="编辑json"
    :top="'5px'"
    append-to-body
    :visible.sync="isShow"
    :close-on-click-modal="false"
    v-if="isShow"
    >
      <div class="jy-win-dialog" style="height:700px;overflow:auto">
        <jy-table-input
          ref="jytable"
          :data.sync="editdata"
          :columns="fColumns"
          :menu-config = "menuConfig"
          @menu-click="contextMenuClickEvent"
        ></jy-table-input>
      </div>
      <div slot="footer">
        <el-button type="primary" size="small" @click="setData()">保 存</el-button>
        <el-button v-if="!type" type="primary" size="small" @click="setData('object')">保存为对象</el-button>
        <el-button v-if="!type" type="primary" size="small" @click="setData('array')">保存为数组</el-button>
      </div>
    </el-dialog>
    <jy-json-edit-table
      v-if="isSonShowDialog"
      @modifyData="modifyData"
      :isShowDialog.sync="isSonShowDialog"
      :defData = "sonDefData || null"
      ></jy-json-edit-table>
  </div>
</template>
<script>
import JyTableInput from '@/components/JyTableInput'
import JyJsonEditTable from '@/components/JyJsonEditTable'
export default {
  name: "JyJsonEditTable",
  props:{
    defData: [Object, Array],
    type: String,
    isShowDialog: {
      type: Boolean,
      default: false
    },
    columns: Array
  },
  components:{
      JyTableInput,
      JyJsonEditTable
  },
  data: function(){
    return {
      jValue: JSON.stringify(this.defData),
      loading: false,
      menuConfig:{
          className: 'my-menus',
          enabled: true,
          body: {
            options: [
              [
                { code: 'editByJson', name: '编辑为json', prefixIcon: 'fa fa-copy', className: 'my-copy-item' }
              ]
            ]
          }
        },
      isShow: this.isShowDialog,
      sonDefData: [],
      isSonShowDialog: false,
      mergeCells: true,
      editdata: this.initData(),
      currRow:null,
      currField: ""
    }
  },
  computed: {
    fColumns(){
      let columns = this.columns;
      if(!columns && (!this.defData || !this.defData[0])){
        columns = [
          {field:'value',title:'value'},
          {field:'label',title:'label'}
        ]
      }
      return columns;
    }
  },
  watch: {
      defData(){
        this.editdata = this.initData();
      },
      isShowDialog(){
        this.isShow = this.isShowDialog;
      },
      isShow(){
        this.$emit("update:isShowDialog", this.isShow);
      }
  },
  methods: {
    showSon(){
      this.isSonShowDialog = true;
    },
    contextMenuClickEvent ({ menu, row, column }) {
      switch (menu.code) {
        case 'editByJson':
          let sonDefData = row[column.property];
          try{
            sonDefData = JSON.parse(sonDefData);
          }catch(e){}
          this.sonDefData = sonDefData;
          this.showSon();
          this.currRow = row;
          this.currField = column.property;
          break
        default:
          break;
      }
    },
    modifyData(o){
      this.currRow && (this.currRow[this.currField] = JSON.stringify(o))
    },
    setData(type){
      type = type || this.type || "object";
      let data = this.$refs.jytable.getTableData().fullData,
      columns = this.$refs.jytable.r_columns,
      jObject = {};
      let jValue = data.map(item=>{
        let label = item["label"];
        try{
          label = JSON.parse(label);
        }catch(e){

        }
        jObject[ item["value"] ] = label;
        if(columns){
          let newItem = {...item};
          delete newItem["_XID"];
          delete newItem["__seq"];
          delete newItem["__jytollbar"];
          return newItem;
        }else{
          return {
            value: item["value"] || "",
            label: label || ""
          }
        }
      })
      if(type.toLowerCase() === 'object'){
        jValue = jObject;
      }
      this.$emit("modifyData",jValue);
      this.isShow = false;
    },
    initData(){
      let defData = this.defData,
        edata = [];
      if(defData)
      {
        if(Array.isArray(defData) && defData.length > 0){
          edata = defData;
        }else{
          edata = Object.keys(defData).map(item=>{
            return {"value": item, "label": defData[item]};
          })
        }
      }
      edata.forEach(item=>{
        if(item.hasOwnProperty('value') && typeof item.value != "string"){
          try{
            item.value = JSON.stringify(item.value)
          }catch(e){
          }
        }
        if(item.hasOwnProperty('label') && typeof item.label != "string"){
          try{
            item.label = JSON.stringify(item.label)
          }catch(e){
          }
        }
      })
      return edata;
    }
  }
}
</script>
<style lang="scss" scoped>

</style>