<template>
    <div :class="{design: isDesign}" :data-content-before="data.type">
        <el-row v-if="data.name">
            <el-col :span="data.nameRatio  || 8" class="sup-mini-label">
                <el-select v-if="data.type === 'inputmap'"
                 size="mini"
                 class="sup-mini"
                 :value="data.searchtype" @change="modifyData(data.field, $event)" filterable placeholder="请选择">
                    <el-option
                    v-for="item in data.data"
                    :key="item.field"
                    :label="item.name"
                    :value="item.field">
                    </el-option>
                </el-select>
                <label v-else>{{data.name}}： </label>
            </el-col>
            <el-col :span="24 - (data.nameRatio  || 8)">
                <jy-dynamic-input :data="currentData" @modifyData="modifyData"></jy-dynamic-input>
            </el-col>     
        </el-row>
        <jy-dynamic-input v-else :data="currentData" @modifyData="modifyData"></jy-dynamic-input>
    </div>
</template>
<script>
import JyTextOpen from '../JyTextOpen'
import JyDynamicInput from '../JyDynamicInput'
export default {
    props:{
        data: Object,
        isDesign: Boolean
    },
    components:{
        JyTextOpen,
        JyDynamicInput
    },
    data:function(){
        return {

        }
    },
    computed: {
        currentData (){
            let ndata = this.data;
            if(ndata.type != "inputmap"){
                return ndata
            }else{
                let {data, searchtype} = ndata;
                let array = data.filter(item => {
                    return item.field === searchtype
                })
                return array && array.length > 0 ? array[0] : data[0];
            }
        }
    },
    methods:{
        modifyData(field, value){
            if(value){
                this.$emit("modifyData", {
                    field ,
                    value ,
                    propertyName: "searchtype"
                })
            }else{
                 this.$emit("modifyData", field)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.design{
    padding: 25px  5px;
    border: 1px solid #22A5F1;
    position: relative;
}
.design:before{
    background-color: #F5F5F5;
    border: 1px solid #ddd;
    border-radius: 4px 0;
    color: #9DA0A4;
    content: attr(data-content-before);
    line-height: 1.3em;
    font-size: 12px;
    font-weight: bold;
    padding:3px 7px;
    left: -1px;
    top: -1px;
    position: absolute;

}
</style>