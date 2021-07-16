<template>
    <div>
        <jy-input-list  @modifyData="(obj) => { this.modifyData(obj) }" :configprop="inputConfigprop"></jy-input-list>
        <div class="button-list">
            <el-button type="primary" :loading="queryloading" size="mini" icon="el-icon-search" @click="queryJyDesian">查询</el-button>
            <el-button type="primary" :loading="queryloading" size="mini" icon="el-icon-edit" @click="editJyDesian(1)">新增</el-button>
            <el-button type="primary" :loading="queryloading" size="mini" icon="el-icon-edit" @click="editJyDesian(2)">修改</el-button>
            <el-button type="primary" :loading="queryloading" size="mini" icon="el-icon-edit" @click="editJyDesian(3)">效果显示</el-button>
            <el-button type="primary" :loading="queryloading" size="mini" icon="el-icon-edit" @click="quickConfig">快速生成</el-button>
        </div>
        <jy-grid @modifyData="(obj) => { this.modifyData(obj) }" :data="tableData" :loading="loading" autofill></jy-grid>
        <jy-dialog
            title="快速生成"
            append-to-body
            :visible.sync="showQuickDialog"
            v-if="showQuickDialog"
        >
        <quick-config></quick-config>
        </jy-dialog>
    </div>
</template>
<script>
import JyInputList from '../../../components/JyInputList'
import JyGrid from '../../../components/JyGrid'
import JyDialog from '@/components/JyDialog'
import QuickConfig from './QuickConfig'
export default {
    components:{
        JyInputList,
        JyGrid,
        JyDialog,
        QuickConfig
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
            tableData:[],

            loading: false,
            fieldList: {},
            showQuickDialog: false
        }
    },
    created(){
        this.initData(this.inputConfigprop, this.fieldList);
        this.queryJyDesian();
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
            if(obj.propertyName === 'checkboxRecords'){
                this.checkboxRecords = obj.value;
            }else{
              let fieldList = this.fieldList,
                propertyName = obj.propertyName || "value",
                field = obj.field ;
              fieldList[field][propertyName] = obj.value; 
            }
        },
        queryJyDesian(){
            let vm = this;
            this.loading = true;
            let fieldList = this.fieldList;
            this.$api.pagedesign.getList({}).then(data=>{
                if(data){
                    let result = data.data || data.Value.list;
                    result = result.filter(item=>{
                        return item.FmName.indexOf(fieldList.name.value) > -1
                    })
                    this.tableData = result;
                }
            }).finally(()=>{
              vm.loading = false;
            })
        },
        // 根据增删改查四个存储过程快速生成配置文件
        quickConfig(){
            this.showQuickDialog = true;
        },
        editJyDesian(flag){
            let checkboxRecords = this.checkboxRecords;
            if(flag == 1){
                    this.$store.commit("pushNavTree",{
                        MenuCode: "EasyLayouts",
                        MenuName: "添加组件设计",
                        LinkUrl: 'Admin/EasyLayouts'
                    });
            }else{
                let url = flag == 2 ? 'Admin/EasyLayouts' : 'Basic/PageDisplay';
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
                        MenuName: `${c.FmName}${flag == 2 ? '设计' : '效果显示'}`,
                        LinkUrl: `${url}?fmId=${c.FmId}`
                    });
                }
            }
        }
    }
}
</script>