<template>
    <div>
       <el-dialog  :title="dialogParam.title" :top="'5px'" append-to-body :visible.sync="dialogParam.isShowDialog">
            <div class="jy-win-dialog" style="height:700px;overflow:auto">
                    <el-row>
                      <el-col :span="6">插入位置</el-col>
                      <el-col :span="18">
                            <el-radio v-model="insertType" label="1">插入子元素</el-radio>
                            <el-radio v-model="insertType" label="2">向前插入</el-radio>
                            <el-radio v-model="insertType" label="3">向后插入</el-radio>
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
            buttonType:"query",
            text: "查 询",
            type: "button",
            methodName: "default_query",
            loading:false,
            name:"查询按钮"
        },
    add: {
            buttonType:"edit",
            type: "button",
            text: "新 增",
            name:"新增按钮",
            loading:false,
            methodName: "default_add",
        },
     edit: {
            buttonType:"edit",
            text: "修 改",
            type: "button",
            name:"修改按钮",
            methodName: "default_edit",
            loading:false,
            
        },
        save: {
            buttonType:"edit",
            text: "保 存",
            type: "button",
            name:"保存按钮",
            loading:false,
            methodName: "default_save",
            methodParam:{
                activeNav: {
                    MenuCode: "3333",
                    MenuName: "zzzz",
                    LinkUrl:"http://101.132.150.223:5656/web/Admin/basedata/MobileConfig.aspx"
                }
            }
        },
        close: {
            buttonType:"close",
            text: "退 出",
            type: "button",
            name: "退出按钮",
            loading: false
           
        },
        delete: {
            buttonType:"edit",
            text: "删除",
            type: "button",
            name:"删除按钮",
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
        tableColumn: [],
        tableData: []
    },
    normalButton: {
        buttonType:"edit",
        text: "按钮",
        type: "button",
        name:"普通安妮",
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
        bigType: 'formcomponent'
    },
    getFormComponent: function(type, name){
        return {
            type: type,
            field: "",
            value: "",
            name: name,
            bindData: null,
            className:[],
            bigType: 'formcomponent'
        }
    }
       
}
const composeEle = {
    normalInputList:{

            type: "inputlist",
            defColSpan:4,
            designPart: null,
            data:[   
                baseEle.getFormComponent('input', '自定义1'),
                baseEle.getFormComponent('select', '自定义2'),
                baseEle.getFormComponent('textopen', '自定义3'),
                {
                    type: "daterange",
                    name: "自定义8",
                    field: ["beginDate","endDate"],
                    value: ['2020-08-12','2021-02-12'],
                    colSpan:8,
                    nameRatio: 4
                }
                ,{
                    type:"inputmap",
                    name:"自定义5",
                    field: "dbbhzzz",
                    searchtype: "",
                    searchvalue: "",
                    designPart: null,
                    className: [],
                    value: "",
                    data: [
                        {
                            type:"input",
                            name:"自定义51",
                            field:"dbbh",
                            value:""
                        },
                        {
                            type:"input",
                            name:"自定义52",
                            field:"color",
                            value:""
                        },
                        {
                            type:"input",
                            name:"自定义53",
                            field:"factory",
                            value:""
                        }
                    ]
                    
                }   
            ]      
    },
    queryButtonList:{
        type: "buttonlist",
        field:"mybutton",
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
            componentsList:[
                {
                    title: "基础",
                    data: [
                        {
                            type: "adiv",
                            text: "一行",
                            config:{
                                type: "jydiv"
                            }
                        },{
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
                            config: composeEle.queryButtonList,
                            methods: {
                                "default_query": buttonMethods.query, 
                                "default_add": buttonMethods.add,
                                "default_edit": buttonMethods.edit
                            }
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
                        },
                    ]
                }
            ]
            ,
            activeTag:null
        }
    },
    created(){
        this.$api.http(`/admin/ceshi/test.aspx?methodName=getDesignTagTypeList&isDetail=1`,'get').then(data=>{
            if(data){
                data.forEach(item=>{
                    let pageConfig = JSON.parse( item.PageData ),
                        title = item.Name,
                        componentsList = this.componentsList,
                        last = componentsList[ componentsList.length - 1 ];
                    if(last.title != title){
                        componentsList.push({
                            title: title,
                            data:[]
                        })
                        last = componentsList[ componentsList.length - 1 ];
                    }
                    last.data.push({
                        type: item.FmName,
                        text: item.FmName,
                        config: pageConfig.layout,
                        methods: pageConfig.methods
                    })
                    console.log(this.componentsList)
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
                // [{
                //     title: "模板",
                //     data: [
                //         {
                //             type: "queryTemplate",
                //             text: "查询页模板",
                //             config: {
                //                 type: "jydiv",
                //                 children:[
                //                     composeEle.normalInputList,
                //                     composeEle.queryButtonList,
                //                     baseEle.grid
                //                 ]
                //             },
                //             methods: buttonMethods.query
                //         },{
                //             type: "eidtTemplate",
                //             text: "编辑页模板",
                //             config: {
                //                 type: "jydiv",
                //                 children:[
                //                     composeEle.normalInputList,
                //                     composeEle.saveButtonList,
                //                     baseEle.grid
                //                 ]
                //             }
                //         }
                //     ]
                // },
                // {
                //     title: "布局",
                //     data: [
                //         {
                //                 type: 'jydiv',
                //                 text: '一行',
                //                 config: {
                //                     type: "jydiv",
                //                     cols: [4, 4, 4, 4, 4, 4]
                //                 }
                //             },
                //         {
                //                 type: 'Row1',
                //                 text: '6,6,6,6',
                //                 config: {
                //                     type: "row",
                //                     cols: [6, 6, 6, 6],
                //                     children:[
                //                         {
                //                             type: "col",
                //                             span: 6
                //                         },
                //                         {
                //                             type: "col",
                //                             span: 6
                //                         },
                //                         {
                //                             type: "col",
                //                             span: 6
                //                         },
                //                         {
                //                             type: "col",
                //                             span: 6
                //                         }
                //                     ]
                //                 }
                //             },
                //             {
                //                 type: 'Row2',
                //                 text: '4,4,4,4,4,4',
                //                 config: {
                //                     type: "row",
                //                     cols: [4, 4, 4, 4, 4, 4],
                //                     children:[{
                //                             type: "col",
                //                             span: 4
                //                         },
                //                         {
                //                             type: "col",
                //                             span: 4
                //                         },
                //                         {
                //                             type: "col",
                //                             span: 4
                //                         },
                //                         {
                //                             type: "col",
                //                             span: 4
                //                         },
                //                         {
                //                             type: "col",
                //                             span: 4
                //                         },
                //                         {
                //                             type: "col",
                //                             span: 4
                //                         },
                //                     ]
                                    
                //                 }
                //             },
                //             {
                //                 type: 'Row3',
                //                 text: '12,12',
                //                 config: {
                //                     type: "row",
                //                     cols: [12, 12],
                //                     children:[{
                //                             type: "col",
                //                             span: 12
                //                         },
                //                         {
                //                             type: "col",
                //                             span: 12
                //                         },
                //                     ]
                //                     }
                //             },
                //             {
                //                 type: 'Col1',
                //                 text: '跨三列',
                //                 config: {
                //                     type: "col",
                //                     span: 3
                //                 }
                //             },
                //             {
                //                 type: 'Col2',
                //                 text: '跨四列',
                //                 config: {
                //                     type: "col",
                //                     span: 4
                //                 }
                //             },
                //             {
                //                 type: 'Col3',
                //                 text: '跨六列',
                //                 config: {
                //                     type: "col",
                //                     span: 6
                //                 }
                //             },
                //             {
                //                 type: 'Col4',
                //                 text: '跨八列',
                //                 config: {
                //                     type: "col",
                //                     span: 8
                //                 }
                //             },
                //             {
                //                 type: 'Col5',
                //                 text: '跨十列',
                //                 config: {
                //                     type: "col",
                //                     span: 8
                //                 }
                //             },
                //             {
                //                 type: 'Col6',
                //                 text: '跨十二列',
                //                 config: {
                //                     type: "col",
                //                     span: 12
                //                 }
                //             },
                //             {
                //                 type: 'Col7',
                //                 text: '跨十六列',
                //                 config: {
                //                     type: "col",
                //                     span: 12
                //                 }
                //             },
                //     ]
                // },
                // {
                //     title:"常用",
                //     data:[
                            
                //             {
                //                 type: 'Input',
                //                 text: '输入框',
                //                 config: {
                //                     type: "input",
                //                     bigType: "formcomponent",
                //                     cols: [4, 4, 4, 4, 4, 4]
                //                 }
                //             },
                            
                //             {
                //                 type: 'inputlist',
                //                 text: '输入列表',
                //                 config: composeEle.normalInputList
                //             },
                //             {
                //             type: "jygrid",
                //             text: "表格",
                //             config:{
                //                     type: "jygrid",
                //                     field:"mygrid",
                //                     configprop:{
                //                         autofill:true,
                //                         tableColumn: null,
                //                         tableData: []
                //                     }
                                    
                //                 }
                //             }
                //         ]

                // },
                // {
                //     title: "按钮",
                //     data:[
                //             {
                //         type: 'empty_buttonList',
                //         text: '空按钮行',
                //         config: {
                //             type: "buttonlist",
                //             field:"",
                //             designPart:null,
                //             data:[]
                //             }
                //         },{
                //             type: 'query_buttonList',
                //             text: '查询页面按钮行',
                //             config: composeEle.queryButtonList
                //         },{
                //             type: 'save_buttonList',
                //             text: '保存页面按钮行',
                //             config: composeEle.saveButtonList,
                //             methods:{methods:buttonMethods.save}
                //         },{
                //             type: 'savebutton',
                //             text: '保存按钮',
                //             config: buttonObj.save,
                //             methods:buttonMethods.save
                //         }
                //     ]
                // }
                // ]
                
</script>
<style lang="scss" scoped>
.jy-tag{
    margin:  5px;
    cursor: pointer;
}

</style>
