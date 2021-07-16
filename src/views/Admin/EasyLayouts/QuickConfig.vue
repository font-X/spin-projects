<template>
  <div>
    <el-row>
      <el-col :span="8">模块名称:</el-col>
      <el-col :span="16">
          <el-input size="mini" class="sup-mini"
          v-model="moudleName" placeholder="模块名称"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">查询列表存储过程:</el-col>
      <el-col :span="16">
          <el-select size="mini" class="sup-mini"
          v-model="queryList" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in dboptions"
              :key="'l1' + index"
              :label="item.Id"
              :value="item.Id">
            </el-option>
          </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">查询明细存储过程:</el-col>
      <el-col :span="16">
          <el-select size="mini" class="sup-mini"
          v-model="queryDetail" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in dboptions"
              :key="'l2' + index"
              :label="item.Id"
              :value="item.Id">
            </el-option>
          </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">修改存储过程:</el-col>
      <el-col :span="16">
        <el-select size="mini" class="sup-mini"
          v-model="modifyRecord" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in dboptions"
              :key="'l3' + index"
              :label="item.Id"
              :value="item.Id">
            </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">删除列表存储过程:</el-col>
      <el-col :span="16">
         <el-select size="mini" class="sup-mini"
          v-model="deleteRecord" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in dboptions"
              :key="'l4' + index"
              :label="item.Id"
              :value="item.Id">
            </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-button type="primary"
      size="mini" icon="el-icon-edit"
      @click="getConfig">生成配置</el-button>
  </div>
</template>
<script>
export default {
  data(){
    return {
      queryList: "",
      queryDetail: "",
      modifyRecord: "",
      deleteRecord: "",
      moudleName: "",
      dboptions: []
    }
  },
  created(){
    this.$api.showReport.showReport({
      pars: {Row: 999999},
      code: "FunModule_Db_Query_ALL"
    }).then(res=>{
      this.dboptions = res.data;
    })
  },
  methods: {
    getConfig(){
      let searchPage = {"layout":{"type":"jydiv","field":"div1_jydiv_0","children":[{"type":"card","field":"div1_card_1","children":[{"type":"inputlist","colSpan":4,"isShowName":1,"data":[{"type":"input","field":"div1_card_1_inputlist_1_input_0","value":"","name":"自定义1","bindData":null,"className":[],"bigType":"formcomponent","isShowName":"inhert","selectedData":null,"showField":null,"realField":null,"disabled":false},{"type":"select","field":"div1_card_1_inputlist_1_select_1","value":"","name":"自定义2","bindData":null,"className":[],"bigType":"formcomponent","isShowName":"inhert","selectedData":null,"showField":null,"realField":null},{"type":"textopen","field":"div1_card_1_inputlist_1_textopen_2","value":"","name":"自定义3","bindData":null,"className":[],"bigType":"formcomponent","isShowName":"inhert","selectedData":null,"showField":null,"realField":null},{"type":"daterange","field":"div1_card_1_inputlist_1_daterange_3","value":"","name":"自定义4","bindData":null,"className":[],"bigType":"formcomponent","colSpan":8,"isShowName":"inhert","selectedData":null,"showField":null,"realField":null},{"type":"inputmap","bigType":"formcomponent","name":"自定义5","field":"dbbhzzz","searchtype":"","searchvalue":"","className":[],"isShowName":true,"value":"","data":[{"type":"input","name":"自定义51","field":"dbbh","value":""},{"type":"input","name":"自定义52","field":"color","value":""},{"type":"input","name":"自定义53","field":"factory","value":""}],"designPartIndex":-1}],"field":"div1_card_1_inputlist_1","className":[],"designPartIndex":-1},{"type":"buttonlist","field":"mybutton","data":[{"buttonType":"primary","icon":"el-icon-search","text":"查 询","type":"button","methodName":"initquery","loading":false,"name":"查 询","field":"mybutton_button_0"},{"buttonType":"primary","type":"button","icon":"el-icon-edit","text":"新 增","name":"新 增","loading":false,"methodName":"edit","field":"mybutton_button_1"},{"buttonType":"primary","icon":"el-icon-edit","type":"button","name":"修 改","methodName":"beforeEdit","loading":false,"field":"mybutton_button_2"},{"buttonType":"danger","type":"button","icon":"el-icon-delete","name":"删 除","methodName":"deleteRecord","methodParam":{"activeNav":{"MenuCode":"3333","MenuName":"zzzz","LinkUrl":"http://101.132.150.223:5656/web/Admin/basedata/MobileConfig.aspx"}},"field":"mybutton_button_3"}],"className":[],"designPartIndex":-1}],"className":[]},{"type":"card","field":"div1_card_2","children":[{"type":"jygrid","field":"mygrid","autofill":true,"data":null,"columns":null,"width":"auto","height":"auto","resizable":true,"stripe":true,"border":true,"round":true,"loading":false,"className":[]}],"className":[]}],"className":[]},"methods":{"initquery":{"name":"initquery","type":"ajax","params":{"code":"Xs_FunModule_db表的id","pars":{"参数一":"{{参数一.value}}","参数二":"{{参数二.value}}"}},"activeNav":{},"oldName":"initquery","requestType":"POST","url":"/Public/GetProcedureDataSet","success":{"name":"","type":"setValue","params":{"mygrid.data":"{{__JYRESULT.data}}"},"activeNav":{},"oldName":"","requestType":"POST"},"targetGrid":"mygrid","runbefore":"1"},"beforeEdit":{"name":"beforeEdit","type":"if","params":null,"activeNav":{},"oldName":"beforeEdit","requestType":"POST","trueCallBack":{"name":"","type":"setValue","params":{"openDialogType.value":"edit"},"activeNav":{},"oldName":"","requestType":"POST","definedMethodName":"default_edit","next":{"name":"","type":"doDefinedMethod","params":null,"activeNav":{},"oldName":"","requestType":"POST","definedMethodName":"edit"}},"term":"mygrid.checkboxRecords &&  mygrid.checkboxRecords.length === 1","falseCallBack":{"name":"","type":"doDefaultMethod","params":{"showClose":true,"message":"请选择一条记录","type":"error"},"activeNav":{},"oldName":"","requestType":"POST","defaultMethodName":"jy_default_message"}},"edit":{"name":"edit","type":"showDialog","params":{"p_id":"{{mygrid.getCheckedValue()}}","openDialogType":"{{openDialogType.value}}"},"activeNav":{"MenuName":"编辑","LinkUrl":"Basic/PageDisplay?fmId=7C8128F6E80949BFBE4089BFCE56194D"},"oldName":"edit","requestType":"POST"},"deleteRecord":{"name":"deleteRecord","type":"if","params":null,"activeNav":{},"oldName":"deleteRecord","requestType":"POST","term":"mygrid.checkboxRecords &&  mygrid.checkboxRecords.length === 1","falseCallBack":{"name":"","type":"doDefaultMethod","params":{"message":"请选择一条记录","type":"success"},"activeNav":{},"oldName":"","requestType":"POST","defaultMethodName":"jy_default_message"},"trueCallBack":{"name":"","type":"doDefaultMethod","params":{"message":"是否进行此操作","title":"提示","type":"warning"},"activeNav":{},"oldName":"","requestType":"POST","defaultMethodName":"jy_default_confirm","trueCallBack":{"name":"","type":"ajax","params":{"code":"xxx","pars":{"id":"{{mygrid.getCheckedValue()}}"}},"activeNav":{},"oldName":"","requestType":"POST","term":"__JYRESULT.data[0].intReval === -1","url":"/Public/GetProcedureDataSet","success":{"name":"","type":"if","params":null,"activeNav":{},"oldName":"","requestType":"POST","term":"__JYRESULT.data[0].intReval === -1","trueCallBack":{"name":"","type":"doDefaultMethod","params":{"message":"{{__JYRESULT.data[0].Message}}","type":"error"},"activeNav":{},"oldName":"","requestType":"POST","defaultMethodName":"jy_default_message"},"falseCallBack":{"name":"","type":"doDefaultMethod","params":{"message":"{{__JYRESULT.data[0].Message}}","type":"success"},"activeNav":{},"oldName":"","requestType":"POST","defaultMethodName":"jy_default_message","next":{"name":"","type":"doDefinedMethod","params":null,"activeNav":{},"oldName":"","requestType":"POST","definedMethodName":"initquery"}}}}}}}};
      let editPage = {"layout":{"type":"jydiv","field":"div1_jydiv_0","children":[{"type":"card","field":"div1_card_1","children":[{"type":"inputlist","colSpan":6,"isShowName":1,"data":[{"type":"input","field":"ColorNO","value":"","name":"颜色名称","bindData":null,"className":[],"bigType":"formcomponent","isShowName":true,"colSpan":6},{"type":"input","field":"Color","value":"","name":"颜色","bindData":null,"className":[],"bigType":"formcomponent","isShowName":true,"colSpan":6}],"field":"div1_card_1_inputlist_1","className":[],"buttonVisible":false,"designPartIndex":-1}],"className":[]},{"type":"card","field":"div1_card_2","children":[{"type":"jytableinput","field":"div1_card_2_jytableinput_1","autofill":true,"data":null,"columns":[{"field":"列一","title":"列一","jydefineType":"input","width":"100px","showOverflow":true,"editRender":{"name":"ElInput","events":[{"name":"input","method":"onLyChange"}]}},{"field":"列二","title":"列二","jydefineType":"input","width":"100px","showOverflow":true,"editRender":{"name":"ElInput"}}],"width":"auto","height":"300px","resizable":true,"stripe":true,"border":true,"round":true,"loading":false,"className":[]}],"className":[],"style":{"marginBottom":"","marginTop":"10px"}},{"type":"card","field":"div1_card_3","children":[{"type":"buttonlist","field":"mybutton","data":[{"buttonType":"primary","icon":"el-icon-edit","text":"查 询","type":"button","methodName":"save","loading":false,"name":"确定","field":"mybutton_button_0"},{"buttonType":"warning","type":"button","icon":"","text":"新 增","name":"退出","loading":false,"methodName":"closeDialog","field":"mybutton_button_1"}],"className":[],"designPartIndex":-1}],"className":[],"style":{"zIndex":"99999","textAlign":"right","right":"0","left":"0","bottom":"0","position":"absolute","top":""}},{"type":"card","field":"div1_jydiv_0_card_4","children":[],"className":[],"style":{"height":"68px","backgroundColor":"transparent"}}],"className":[]},"methods":{"closeDialog":{"name":"closeDialog","type":"doDefaultMethod","params":null,"activeNav":{},"oldName":"","requestType":"POST","defaultMethodName":"jy_default_emit","fatherMethodName":"closeDialog"},"initQuery":{"name":"initQuery","type":"ajax","params":{"code":"xxx","pars":{"xxx":"{{xxx.value}}"}},"activeNav":{},"oldName":"initQuery","requestType":"POST","url":"/Public/GetProcedureDataSet","runbefore":"","success":{"name":"","type":"setValue","params":{"xxx.value":"{__JYRESULT.data[0].xxx}}"},"activeNav":{},"oldName":"","requestType":"POST"}},"onLyChange":{"name":"onLyChange","type":"setValue","params":{"__JYRESULT.row.列二":"{{__JYRESULT.row.列一}}"},"activeNav":{},"oldName":"onLyChange","requestType":"POST"},"beforeQuery":{"name":"beforeQuery","type":"if","params":null,"activeNav":{},"oldName":"beforeQuery","requestType":"POST","term":"__hidParams.p_id","trueCallBack":{"name":"","type":"doDefinedMethod","params":null,"activeNav":{},"oldName":"","requestType":"POST","definedMethodName":"initQuery"},"runbefore":"1"},"save":{"name":"save","type":"ajax","params":{"code":"bas_ExecSqlByMap","pars":{"sqlId":"","strMessage":""}},"activeNav":{},"oldName":"执行语句","requestType":"POST","url":"/Public/GetProcedureDataSet","success":{"name":"","type":"doDefaultMethod","params":{"message":"保存成功","type":"success"},"activeNav":{},"oldName":"","requestType":"POST","defaultMethodName":"jy_default_message","next":{"name":"","type":"doDefinedMethod","params":null,"activeNav":{},"oldName":"","requestType":"POST","definedMethodName":"closeDialog"}},"fail":{"name":"","type":"doDefaultMethod","params":{"message":"{{__JYRESULT.message}}","type":"error"},"activeNav":{},"oldName":"","requestType":"POST","defaultMethodName":"jy_default_message"}}}};
      let inputList = searchPage.layout.children[0].children[0];
      let initQuery = searchPage.methods.initquery;
      let deleteQuery= searchPage.methods.deleteRecord.trueCallBack.trueCallBack;
      let openDialog = searchPage.methods.edit;
      let editPageGuid = this.guid();
      initQuery.params.code = this.queryList;
      deleteQuery.params.code = this.deleteRecord;
      let queryRecord = this.searchRecord(this.queryList);
      let queryDetailRecord = this.searchRecord(this.queryDetail);
      let modifyRecord = this.searchRecord(this.modifyRecord);
      let deleteRecord = this.searchRecord(this.deleteRecord);
      
      let promiseArray = [this.parseParams(queryRecord), 
      this.parseParams(queryDetailRecord),
      this.parseParams(modifyRecord),
      this.parseParams(deleteRecord)];
      Promise.all(promiseArray).then((values)=>{
        let queryPars = values[0].data,
          detailPars = values[1].data,
          modifyPars = values[2].data,
          deletePars = values[3].data;
        let pars = {};
        let querynewData = queryPars.filter(item=>{
          return item.ParamName && item.ParamName.toLowerCase() != 'usercode';
        }).map(item=>{
          pars[item.ParamName] = `{{${item.ParamName}.value}}`;
          return {
            type: "input",
            field: item.ParamName,
            value: "",
            name: item.ParamName,
            bindData: null,
            className:[],
            bigType: 'formcomponent',
            colSpan: '',
            isShowName: 'inhert',
            selectedData: null,
            showField: null,
            realField: null,
            emptyHead: false,
            inputType: "text",
            text: "",
            disabled: false,
            visible: true
        }
        })
        initQuery.params.pars = pars;
        inputList.data = querynewData;
        // 删除
        deleteQuery.params.pars = {
          [deletePars.filter(item=>{
          return item.ParamName && item.ParamName.toLowerCase() != 'usercode';
        })[0].ParamName]: "{{mygrid.getCheckedValue()}}"
        }

        // 编辑页面
        let editList = editPage.layout.children[0].children[0];
        let children = editPage.layout.children;
        let editQuery = editPage.methods.initQuery;
        let editQueryPars = {};
        let editSave = editPage.methods.save;
        // 去掉tableinput
        children.splice(1,1);
        // 明细页查询默认只传入主键
        editQuery.params.code = this.queryDetail;
        editQuery.params.pars = {}
        if(detailPars){
          editQuery.params.pars = {
            [detailPars[0].ParamName]: "{{__hidParams.p_id}}"
          }
        }
        editSave.params.code = this.modifyRecord;
        let editpars = {};
        let editnewData = modifyPars.filter(item=>{
          return item.ParamName && item.ParamName.toLowerCase() != 'usercode';
        }).map(item=>{
          editpars[item.ParamName] = `{{${item.ParamName}.value}}`;
          editQueryPars[item.ParamName + '.value'] = `{{__JYRESULT.data[0].${item.ParamName}}}`;
          return {
            type: "input",
            field: item.ParamName,
            value: "",
            name: item.ParamName,
            bindData: null,
            className:[],
            bigType: 'formcomponent',
            colSpan: '',
            isShowName: 'inhert',
            selectedData: null,
            showField: null,
            realField: null,
            emptyHead: false,
            inputType: "text",
            text: "",
            disabled: false,
            visible: true
          }
        })
        editSave.params.pars = editpars;
        editQuery.success.params = editQueryPars;
        editList.data = editnewData;
        return this.savePage(editPage, this.moudleName + '编辑页面');
      }).then(res=>{
        openDialog.activeNav.LinkUrl = `Basic/PageDisplay?fmId=${res.data}`;
        this.savePage(searchPage, this.moudleName + '管理页面');
      })
      // this.parseParams(queryRecord).then(res => {

      // }).then(res=>{

      //   }).then(()=>{
      //     return this.savePage(editPage, this.moudleName + '编辑页面');
      //     console.log(searchPage, editPage, 888888)
      //   }).then(res=>{
      //     // console.log(res, 111);
      //      openDialog.activeNav.LinkUrl = `Basic/PageDisplay?fmId=${res.data}`;
      //      this.savePage(searchPage, this.moudleName + '管理页面');
      //   })
      //})
    },
    savePage(pageData, moudleName){
        if(!window.confirm("确定保存？")) return;
        return this.$api.pagedesign.save({
            "model": {
                "FmId": "",
                "fmName": moudleName,
                "fType": "1",
                "fmGrade": 0,
                "p_FmId": "",
                "class": "",
                "subSystem": "",
                "pageType": "",
                "pagelayout": "",
                "pageData": JSON.stringify(pageData),
                "remark": "",
                "inputdate": "",
                "verNo": "",
                "verType": "",
                "objectCode": "",
                "note": ""
            }
        }).then(
        data =>{
            if(data){
                this.$message({
                    showClose: true,
                    message: data.message || ( data.isSucceed ? "保存成功" : "保存失败"),
                    type: data.isSucceed  ? "success" : "error"
                });
            }
            return  data;
        })
      },
      //生成随机 GUID 数
    guid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4()  + S4()  + S4()  + S4()  + S4() + S4() + S4());
    },
    parseParams(record){
      console.log(record, 222)
      let {FType, Id, FCode} = record;
      if(FType.toLowerCase() === "sql"){
        return new Promise(reslove=>{
          let array = FCode.match(/\{\{(.*?)\}\}/gi) || [];
          let res = {
            data: array.map(item=>{
              item = item.replace('{{', '').replace('}}', '');
              return {
                ParamName: item,
                ParamNameValue: `{{${item.ParamName}.value}}`
              }
            })
          }
          reslove(res);
        })
      }else{
        return this.$api.showReport.showReport({
        pars: {spname: FCode},
        code: "getpars"
      })
      }
    },
    searchRecord(value){
      let record =  this.dboptions.find(item=>{
        return item.Id === value
      });
      console.log(record, value)
      return record
    }
    }
  
}
</script>