<template>
    <div>
        <jy-input-list  @modifyData="(obj) => { this.modifyData(obj) }" :configprop="inputConfigprop"></jy-input-list>
        <div class="button-list">
            <el-button type="primary" :loading="queryloading" size="mini" icon="el-icon-search" @click="queryJyDesian">查询</el-button>
            <el-button type="primary" :loading="queryloading" size="mini" icon="el-icon-edit" @click="editJyDesian(1)">新增</el-button>
            <el-button type="primary" :loading="queryloading" size="mini" icon="el-icon-edit" @click="editJyDesian(2)">修改</el-button>
        </div>
        <jy-grid @modifyData="(obj) => { this.modifyData(obj) }" :configprop="tableConfigprop"></jy-grid>
    </div>
</template>
<script>
import JyInputList from '../../../components/JyInputList'
import JyGrid from '../../../components/JyGrid'
export default {
    components:{
        JyInputList,
        JyGrid
    },
    data: function(){
        return{
            queryloading: false,
            inputConfigprop:{
                type: "inputlist",
                defColSpan: 6,
                data:[
                    {
                        type:"input",
                        field:"name",
                        name:"名称",
                        value:""
                    }
                ]
            },
            tableConfigprop:{
                tableData: null,
                tableColumn: null,
                loading: false,
                autofill:true,
                field: "mygrid",
                type: "grid"
            },
            fieldList: {}
        }
    },
    created(){
        this.initData(this.inputConfigprop, this.fieldList);
        this.fieldList["mygrid"] = this.tableConfigprop;
        this.$api.http('/admin/ceshi/test.aspx?methodName=getDesign','get',{}).then(data=>{
                if(data){
                    this.tableConfigprop.tableData = data
                }
            })
    },
    methods:{
        initData(layout, fieldList){
            if(layout.hasOwnProperty("field")){
                fieldList[layout.field] = layout;
            }
            layout.children && layout.children.forEach(item => {
                this.initData(item, fieldList);
            })
            if( layout.type === "inputlist" ){
                let cd = layout.data;
                cd && cd.forEach(item => {
                    this.initData(item, fieldList);
                })
            }
            if(layout.type === "inputmap" && layout.searchtype === "" && layout.children && layout.children[0]){
                layout.searchtype = layout.children[0].field;
                layout.searchvalue = layout.children[0].value;
            }
        },
        modifyData(obj){
            let fieldList = this.fieldList,
                propertyName = obj.propertyName || "value",
                field = obj.field ;
            fieldList[field][propertyName] = obj.value; 
        },
        queryJyDesian(){
            this.$api.http('/admin/ceshi/test.aspx?methodName=getDesign','get',{}).then(data=>{
                if(data){
                    this.tableConfigprop.tableData = data
                }
            })
        },
        editJyDesian(flag){
            let checkboxRecords = this.fieldList.mygrid.checkboxRecords;
            if(flag == 1){
                    this.$store.commit("pushNavTree",{
                        MenuCode: "EasyLayouts",
                        MenuName: "组件设计页面",
                        LinkUrl: 'Admin/EasyLayouts'
                    });
            }else{
                if(!checkboxRecords){
                    this.$message({
                        showClose: true,
                        message: "请至少选择一条记录",
                        type: "error"
                    });
                }else if(checkboxRecords.length > 1){
                    this.$message({
                        showClose: true,
                        message: "最多选择一条记录",
                        type: "error"
                    });
                }else{
                    let c = checkboxRecords[0];
                    this.$store.commit("pushNavTree",{
                        MenuCode: "zdy" + c.FmId,
                        MenuName: "组件设计页面",
                        LinkUrl: 'Admin/EasyLayouts?fmId=' + c.FmId
                    });
                }
            }
        }
    }
}
</script>