<template>
    <div>
        <jy-input-list :inputdata="inputdata"></jy-input-list>
        <div class="button-list">
            <el-button type="primary" size="mini" icon="el-icon-search" @click="print">查询</el-button>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="value6 = true">新增</el-button>
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
        </div>
        
        <div class="data-list">
          <jy-grid :binddata="gridData"></jy-grid>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import JyInputList from '../../../components/JyInputList'
import {stringifyData} from '../../../common/js/utils/jy-base-util'
import JyGrid from '../../../components/JyGrid'
export default {
    components:{
        JyInputList,
        JyGrid
    },
    created(){
        this.print();
    },
    data:function(){
        return {
           input:"",
           beginDate:"",
           gridData:{loading:true},
           inputdata:{
               defColSpan:4,
               data:[   
                    {
                      type:"input",
                      name:"产品号",
                      field:"productNo",
                      value:"car"
                      
                   },
                   {
                      type:"input",
                      name:"品名中英文",
                      field:"productName",
                      value:""
                      
                   },
                   {
                      type:"input",
                      name:"规格",
                      field:"p_spec",
                      value:""
                      
                   },
                   {
                      type:"input",
                      name:"成分",
                      field:"const",
                      value:""
                      
                   },
                   {
                      type:"input",
                      name:"克重",
                      field:"gram",
                      value:""
                      
                   },
                   {
                      type:"input",
                      name:"--",
                      field:"upgram",
                      value:""
                      
                   },
                    {
                      type: "daterange",
                      name: "来样时间",
                      field: ["beginDate","endDate"],
                      value: ['2020-08-12','2021-02-12'],
                      colSpan:8,
                      nameRatio: 4
                   },
                   {
                      type:"textopen",
                      name:"选择",
                      field:"productName111",
                      value:1234,
                      bindData:[
                            {name:"yu",age:"11111",page:"12123"},
                            {name:"yu1",age:"11111",page:"12123"},
                            {name:"yu12",age:"11111",page:"12123"},
                            {name:"yu13",age:"11111",page:"12123"},
                            {name:"yu14",age:"11111",page:"12123"},
                            {name:"y1u",age:"11111",page:"12123"},
                            {name:"y2u1",age:"11111",page:"12123"},
                            {name:"y3u12",age:"11111",page:"12123"},
                            {name:"y4u13",age:"11111",page:"12123"},
                            {name:"y5u14",age:"11111",page:"12123"},
                            {name:"y6u",age:"11111",page:"12123"},
                            {name:"y8u1",age:"11111",page:"12123"},
                            {name:"y7u12",age:"11111",page:"12123"},
                            {name:"y9u13",age:"11111",page:"12123"},
                            {name:"y99u14",age:"11111",page:"12123"},
                            {name:"y111u",age:"11111",page:"12123"},
                            {name:"y22u1",age:"11111",page:"12123"},
                            {name:"y33u12",age:"11111",page:"12123"},
                            {name:"y44u13",age:"11111",page:"12123"},
                            {name:"y344u14",age:"11111",page:"12123"},
                        ]
                   },
                   {
                      type:"date",
                      name:"结束时间",
                      field:"zzz",
                      value:"2021-01-01"
                   },
                   {
                      type:"input",
                      name:"产品号11",
                      field:"productNo",
                      value:"car"
                      
                   },
                   {
                        type:"textopen",
                        name:"产品名称",
                        field:"productName",
                        value:1234,
                        bindData:[
                            {name:"yu",age:"11111",page:"12123"},
                            {name:"yu1",age:"11111",page:"12123"},
                            {name:"yu12",age:"11111",page:"12123"},
                            {name:"yu13",age:"11111",page:"12123"},
                            {name:"yu14",age:"11111",page:"12123"}
                        ]
                   }
               ]
           }
        }
    },
    computed:{
    },
    methods:{
        print(){
            let gridData = {...this.gridData};
            gridData.loading = true;
            gridData.tableData = null;
            this.gridData = gridData;
            let inputdata = this.inputdata,
                querydatad = {};
            inputdata.data.forEach(item=>{
                let field = item.field;
                if( Array.isArray(field) ){
                    field.forEach((nItem,index) => {
                        let value = item.value[index];
                        querydatad[nItem] =  stringifyData(value);
                    })
                }else{
                    querydatad[item.field] = stringifyData(item.value);
                }
            })
            Axios.get("/admin/liangqi/ProductInfo.aspx",{
                params:querydatad
            }).then(res=>{
                if(res && res.status == 200){
                    gridData = {...this.gridData};
                    gridData.tableData = res.data.Table;
                    gridData.loading = false;
                    this.gridData = gridData;
                    //console.log(this.gridData, '22')
                }
            }).catch(res=>{
                gridData = {...this.gridData};
                gridData.loading = false;
                this.gridData = gridData;
            })
        }

    }
}
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
    

    
    .el-col{
        margin:2px 0;
    }
    .data-list{
        position: absolute;
        left: 0;
        top: 112px;
        bottom: 0px;
        right: 0;
    }
</style>