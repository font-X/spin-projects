<template>
  <div>
    <el-card>
      <jy-input-list
        :configprop="inputListConfig"
        @search="queryList"
        @modifyData="modifyData"
        :userButtons="userButtons"
        @handleuserClick="handleuserClick">
      </jy-input-list>
    </el-card>
    <el-card v-if="isOver" style="margin-top:10px ">
      <jy-grid
        :loading="loading"
        autofill
        :notShowItem="notShowItem"
        :summaryFields = "summaryFields"
        :data.sync="tableData"
        @cell-dblclick="showDetailsPage"
        ref="grid"></jy-grid>
    </el-card>
    <jy-dialog title="显示明细"
      append-to-body
      v-if="isShowDialog"
      width="80%"
      :visible.sync="isShowDialog">
        <show-details
          v-bind="detail"
        ></show-details>
      </jy-dialog>
  </div>
</template>
<script>
import JyInputList from '@/components/JyInputList'
import JyGrid from '@/components/JyGrid'
import JyDialog from '@/components/JyDialog'
import ShowDetails from '../ShowDetails'
export default {
  data(){
    return {
      inputListConfig: {
        type: "inputlist",
        colSpan:4,
        buttonVisible: true,
        isShowName: true,
        data:[
        ]
      },
      isOver: false,
      loading: false,
      fieldList: {},
      tableData: [],
      notShowItem: [],
      summaryFields: "",
      isShowDialog: false,
      detail: {
        viewtype: 1,
        keyCode: "",
        queryCode: ""
      },
      userButtons: [
        {
          type: "button",
          label: "导出",
          btType: "primary",
          icon: "el-icon-plus",
          event: "exportdata",
          show: false
        }
      ]
    }
  },
  components:{
    JyInputList,
    JyGrid,
    ShowDetails,
    JyDialog
  },
  created(){
    var keyobj = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        keyobj.queryList();
      }
    }
    this.$api.showReport.getReportInfo(this.$attrs.ReportNo).then(res=>{
      if(res.isSucceed){
        let table2 = res.data.Table2,
          table1 = res.data.Table1,
          summaryFields = table1[0].SummaryFields,
          inputListConfig = this.inputListConfig,
          fieldList = this.fieldList,
          data = inputListConfig.data;
        this.summaryFields = summaryFields;
        this.detail.queryCode = this.getDetailCode(table1[0]["DetailCode"]);
        table2.forEach((item, index)=>{
          let control = null;
          if (item["type"] == "1"){
              control = this.getFormComponent("input", item.ParaName);
              control.value=item.cDefault
          }
          //日期
          if (item["type"] == "2")
          {
            control = this.getFormComponent("date", item.ParaName);
            if(item.cDefault!=''){
              control.value = this.$jybase.DateFormat(this.$moment().add(item.cDefault*1, 'month')._d);
            }
          }
            //下拉框
          if (item["type"] == "3"){
            control = this.getFormComponent("select", item.ParaName);
            this.$api.showReport.getReportSqlData({id: item.ParaNo}).then((res)=>{
              if(res.isSucceed){
                control.emptyHead = +item["DefineType"] < 4
                control.bindData = res.data;
              }
            })
            // DropDownList dropdownlist1 = CreateDropDownList();
            // string strSql = item["DefinePara"];
            // if (strSql != "")
            // {
            //     if (item["DefineType"] == "1")
            //     {
            //         Selection.SetDownlistItemWithHead(dropdownlist1, strSql);
            //     }
            //     if (item["DefineType"] == "2")
            //     {
            //         Selection.SetDownlistItemWithHeadByProc(dropdownlist1, strSql, null);
            //     }
            //     if (item["DefineType"] == "3")
            //     {
            //         strSql = strSql + "'" + CommonApplication.GetUserCode() + "'";
            //         Selection.SetDownlistItemWithHead(dropdownlist1, strSql);
            //     }
            //     if (item["DefineType"] == "4")
            //     {
            //         strSql = strSql + "'" + CommonApplication.GetUserCode() + "'";
            //         Selection.SetDownlistItem(dropdownlist1, strSql);
            //     }
            //     if (item["DefineType"] == "5")
            //     {
            //         Selection.SetDownlistItem(dropdownlist1, strSql);
            //     }
            //  }
          }
          control.field = 'field_' + index;
          data.push(control);
          fieldList[control.field] = control;
        })
        this.$nextTick(()=>{
          this.isOver = true;
        })
        this.queryList();
      }
      else{
        this.$message({
          message: res.message,
          type: 'error',
        })        
      }
    }).catch((err) => {           
          console.log(err)
    })
  },
  methods: {
    queryList(){
      let pars = {
        ReportNo: this.$attrs.ReportNo,
        ReportParaString:"",
        strMessage:""
      }
      Object.keys(this.fieldList).forEach((item, index)=>{
        item = this.fieldList[item];
        let value = item.value;
        if(item.type === "date" && value){
          //value = this.$XEUtils.toDateString(value)
          value = this.$jybase.DateFormat(value)
        }
        pars.ReportParaString += (value || "") + "◆";
      })
      console.log("dddddd",pars)
      this.loading = true;
      this.$api.showReport.showReport({
        pars,
        code:"i_ShowReport"
      }).then(res=>{
        if(res.isSucceed){
          let d = res.data.Table1;
          if(d){
            if(d[0]){
              this.notShowItem = [Object.keys(d[0])[0]]
            }
            this.tableData = d;
          }
        }
      }).finally(res=>{
        this.loading = false;
      })

    },
    showDetailsPage({row}){
      if(this.detail.queryCode){
        this.detail.keyCode = row[Object.keys(row)[0]];
        this.$nextTick(()=>{
          this.isShowDialog = true;
        })
      }
    },
    modifyData(obj){
      let fieldList = this.fieldList;
      if(!Array.isArray(obj)){
          obj = [obj]
      }
      obj.forEach(item=>{
        let propertyName = item.propertyName || "value",
            field = item.field;
        this.$set(fieldList[field], propertyName, item.value)
      })
    },
    getFormComponent: function(type, name, colSpan){
      return {
          type: type,
          field: "",
          value: "",
          name: name,
          bindData: null,
          className:[],
          bigType: 'formcomponent',
          colSpan:colSpan,
          isShowName: 'inhert',
          selectedData: null,
          showField: null,
          realField: null,
          emptyHead: false
      }
    },
    getDetailCode(str){
      try{
        if(str){
          let strArray = str.split("?");
          if(strArray && strArray.length > 1){
            str = strArray[1];
            strArray = str.split("&");
            strArray.forEach(item=>{
              let qArray = item.split("=");
              if(qArray && qArray.length > 0){
                if(qArray[0].toLowerCase() === "querycode"){
                  str = qArray[1];
                }
              }
            })
          }
        }
      }catch(e){

      }
      return str
    },
    handleuserClick (event){//自定义按钮事件
      switch(event){
        case 'exportdata':
          //this.$refs.grid.exportDataEvent({ types: ['csv'] })
          this.$refs.grid.exportDataEvent({ types: ['xls'] },this.$attrs.ReportNo)
          break;
      }
    }
  }
}
</script>