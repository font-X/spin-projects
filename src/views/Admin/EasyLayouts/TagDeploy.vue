<template>
    <div>
       <el-dialog  :title="dialogParam.title" :top="'5px'" append-to-body :visible.sync="dialogParam.isShowDialog">
            <div class="jy-win-dialog" style="height:700px;overflow:auto">
                <el-row>
                    <el-col :span="6">
                        <el-input size="mini" class="sup-mini" placeholder="名称"
                          v-model="sName"></el-input>
                    </el-col>
                </el-row>
                <el-row style="height:50px">
                    <el-col :span="6">插入位置</el-col>
                    <el-col :span="18">
                        <el-radio v-model="insertType" label="1">插入子元素</el-radio>
                        <el-radio v-model="insertType" label="2">向前插入</el-radio>
                        <el-radio v-model="insertType" label="3">向后插入</el-radio>
                        <el-radio v-model="insertType" label="4">插入父元素</el-radio>
                    </el-col>
                </el-row>
                <el-collapse  v-model="activeCollapse">
                    <el-collapse-item :title="cm.title" :name="cm.title" v-for="cm in componentsList" :key="cm.title">
                        <el-tag :type="comp == activeTag ? 'primary' : 'info'"  class="jy-tag" size="small" 
                        @click="chooseTag(comp)" v-for="comp in cm.data" :key="comp.type">{{ comp.text }}</el-tag>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div slot="footer">
                <el-button type="primary" size="small" @click="modifyTag">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
const buttonObj = {
    query: {
            buttonType:"primary",
            icon:"el-icon-search",
            text: "查 询",
            type: "button",
            methodName: "",
            loading:false,
            name:"查 询"
        },
    add: {
            buttonType:"primary",
            type: "button",
            icon:"el-icon-edit",
            text: "新 增",
            name:"新 增",
            loading:false,
            methodName: "",
        },
     edit: {
            buttonType:"primary",
            icon:"el-icon-edit",
            type: "button",
            name:"修 改",
            methodName: "",
            loading:false,
        },
        save: {
            buttonType:"primary",
            type: "button",
            icon:"el-icon-edit",
            name:"保 存",
            loading:false,
            methodName: ""
        },
        close: {
            buttonType:"danger",
            icon: "",
            type: "button",
            name: "退 出",
            loading: false
        },
        delete: {
            buttonType:"danger",
            type: "button",
            icon:"el-icon-delete",
            name:"删 除",
            methodName: "m2",
            methodParam:{
                activeNav: {
                    MenuCode: "3333",
                    MenuName: "zzzz",
                    LinkUrl:"http://101.132.150.223:5656/web/Admin/basedata/MobileConfig.aspx"
                }
            }
        }
}
const buttonMethods ={
    save:{
        type: 'ajax',
        name: 'default_save',
        url: 'http://www.baidu.com'
    },
    query:{
        type: 'ajax',
        name: 'default_query',
        url: '/admin/liangqi/productinfo.aspx',
        targetGrid:'mygrid'
    },
    add:{
        name: 'default_add',
        type:"showDialog",
        activeNav:{
            MenuName: '新增',
            LinkUrl: 'Basic/PageDisplay?fmId=7C8128F6E80949BFBE4089BFCE56194D'
        }
    },
    edit:{
        name: 'default_edit',
        type:"showDialog",
        activeNav:{
            MenuName: '编辑',
            LinkUrl: 'Basic/PageDisplay?fmId=7C8128F6E80949BFBE4089BFCE56194D'
        }
    }
}
const baseEle={
    grid:{
      type: "jygrid",
      field:"",
      autofill:true,
      data: null,
      columns: null,
      width: "auto",
      height: "auto",
      resizable: true,
      stripe: true,
      border: true,
      round: true,
      loading: false,
    },
    normalButton: {
        buttonType:"edit",
        type: "button",
        name:"普通按钮",
        loading:false,
        methodName: "",
        methodParam:{
        }
    },
    normalInput:{
        type: 'input',
        field: "",
        value: "",
        name: '自定义',
        bindData: null,
        bigType: 'formcomponent',
        isShowName: 'inhert',
        selectedData: null,
        showField: null,
        realField: null,
        emptyHead: false,
        inputType: "text",
        text: "",
        disabled: false,
        visible: true,
        nameWidth: ""
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
            emptyHead: false,
            inputType: "text",
            text: "",
            disabled: false,
            visible: true,
            nameWidth: ""
        }
    },
    tree:{
      type: 'tree',
      field: "",
      value: "",
      data: null,
      "empty-text": "",
      props: null,
      "default-expand-all": false,
      "default-expanded-keys": "",
      "node-key": "",
      lazy: false,
      props:{
        children: 'Children',
        label: 'Label'
      }
    },
    tableInout: {
      type: "jytableinput",
      field:"",
      autofill:true,
      data: null,
      columns: [],
      width: "auto",
      height: "300px",
      resizable: true,
      stripe: true,
      border: true,
      round: true,
      loading: false,
    }
}
const composeEle = {
    normalInputList:{
            type: "inputlist",
            colSpan:4,
            isShowName: 1,
            nameWidth: "",
            designPart: null,
            searchMethod: '',
            buttonVisible: true,
            data:[
                baseEle.getFormComponent('input', '自定义1'),
                baseEle.getFormComponent('select', '自定义2'),
                baseEle.getFormComponent('textopen', '自定义3'),
                baseEle.getFormComponent('daterange', '自定义4', 8)
                ,{
                    type:"inputmap",
                    bigType: 'formcomponent',
                    name:"自定义5",
                    field: "dbbhzzz",
                    searchtype: "",
                    searchvalue: "",
                    designPart: null,
                    className: [],
                    isShowName: 1,
                    value: "",
                    data: [
                        baseEle.getFormComponent('input', '自定义51'),
                        baseEle.getFormComponent('input', '自定义52'),
                        baseEle.getFormComponent('input', '自定义53'),
                    ]
                }
            ]
    },
    queryButtonList:{
        type: "buttonlist",
        field:"",
        designPart:null,
        data: [
            buttonObj.query,
            buttonObj.add,
            buttonObj.edit,
            buttonObj.delete
        ]
    },
    saveButtonList:{
        type: "buttonlist",
        field:"",
        designPart:null,
        data:[
            buttonObj.save,
            buttonObj.close
        ]
    }
}

const commonProperty = {
    className: [],
    name: "",
    value: "",
    field: ""
}
export default {
    props:{
        dialogParam: Object
    },
    data: function(){
        let methodConfig = {...this.defaultMethod} || {};
        return {
            type: "",
            insertType: '1',
            activeCollapse:'常用',
            sName: '',
            componentsList:[
                {
                    title: "基础",
                    data: [
                        {
                            type: "adiv",
                            text: "card",
                            config:{
                                type: "card",
                                field: "",
                                children: []
                            }
                        },
                        {
                            type: "tabs",
                            text: "标签页",
                            config:{
                                type: "tabs",
                                field: "",
                                data: [
                                    {
                                      type: "tab",
                                      label: "标签一",
                                      disabled: false,
                                      name: "tab1",
                                      closable: false,
                                      lazy: false,
                                      children: []
                                    },
                                    {
                                      type: "tab",
                                      label: "标签二",
                                      disabled: false,
                                      name: "tab2",
                                      closable: false,
                                      lazy: false,
                                      children: []
                                    }
                                ]
                            }
                        }
                        // ,{
                        //     type: "",
                        //     text: "报批",
                        //     config: {
                        //         type: 'reportapproval',
                        //         ObjectCode: '',
                        //         ObjectKey: '',
                        //         showReportDialog: false
                        //     }
                        // }
                        ,{
                            type: "baserow",
                            text: "基本布局",
                            config: {
                                type: "row",
                                cols: [6, 6, 6, 6],
                                children:[
                                    {
                                        type: "col",
                                        span: 6
                                    },
                                    {
                                        type: "col",
                                        span: 6
                                    },
                                    {
                                        type: "col",
                                        span: 6
                                    },
                                    {
                                        type: "col",
                                        span: 6
                                    }
                                ]
                            }
                        },{
                            type: "inputList",
                            text: "输入区域",
                            config: composeEle.normalInputList
                        },{
                            type: "buttonList",
                            text: "按钮区域",
                            config: composeEle.queryButtonList
                        },{
                            type: "mygrid",
                            text: "表格",
                            config: baseEle.grid
                        },{
                            type: "normalButton",
                            text: "普通按钮",
                            config: baseEle.normalButton
                        },{
                            type: "normalInput",
                            text: "普通输入",
                            config: baseEle.normalInput
                        },{
                            type: "tree",
                            text: "树",
                            config: baseEle.tree
                        },{
                            type: "tableinput",
                            text: "编辑表格",
                            config: baseEle.tableInout
                        },{
                            type: "fileupload",
                            text: "图片上传",
                            config: {
                                type: "upload"
                            }
                        }
                    ]
                }
            ]
            ,
            activeTag:null
        }
    },
    created(){
        let codeObj = {},
            componentsList = this.componentsList;
        this.$api.pagedesign.getDesignDetail({}).then(data=>{
            if(data && data.length === 2){
                let detailList = data[0].data || data[0].Value.list,
                    typeList = data[1].data || data[1].Value.list;
                typeList.forEach(item=>{
                    componentsList.push({
                      title: item.Name,
                      data:[],
                      code: item.Code.trim()
                    });
                    codeObj[item.Code.trim()] = componentsList.length - 1;
                })
                detailList.forEach(item => {
                    let code = item.Class.trim();
                    if(codeObj[code] && item.PageData){
                        let pageConfig = JSON.parse(item.PageData),
                            last = componentsList[codeObj[code]];
                        last.data.push({
                            type: item.FmName,
                            text: item.FmName,
                            config: pageConfig.layout,
                            methods: pageConfig.methods,
                            fType: item.fType
                        })
                    }
                })
            }
      })
    },
    methods:{
        chooseTag(tag){
          tag.isActive = true;
          this.activeTag = tag;
        },
        modifyTag(){
            let tag =  JSON.parse(JSON.stringify(this.activeTag));
            for(var k in commonProperty){
                if(!tag.hasOwnProperty(k)){
                    tag[k] = commonProperty[k]
                }
            }
            this.$emit('modifyTag',
            {
              tag ,
              insertType: this.insertType
            } );
            this.activeTag = null;
            this.insertType = '1';
        }
    }
}
</script>
<style lang="scss" scoped>
.jy-tag{
    margin:  5px;
    cursor: pointer;
}

</style>
