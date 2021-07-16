<template>
    <div :class="{isdesign: isDesign, dynamicmap: true}" :data-content-before="data.type">
        <div v-if="(data.isShowName === 'inhert' ?  isShowName : data.isShowName) && data.name">
            <div :class="[isRequired ? 'is-required' : '','left-label']" :style="{width: c_nameWidth}">
                <el-select v-if="data.type === 'inputmap'"
                style="margin-left: 10px"
                size="mini"
                :value="data.searchtype" @change="modifyData(data.field, $event, data)" filterable placeholder="请选择">
                    <el-option
                    v-for="item in data.data"
                    :key="item.field"
                    :label="item.name"
                    :value="item.field">
                    </el-option>
                </el-select>
                <label v-else>{{data.name}}：</label>
            </div>
            <div class="right-input"  :style="{marginLeft: c_nameWidth}">
                <jy-dynamic-input v-on="listenerList" :data="currentData" 
                @modifyData="(v)=> modifyData(v, null ,data)"></jy-dynamic-input>
            </div>
        </div>
        <jy-dynamic-input  v-on="listenerList"
        v-else :data="currentData"
        @modifyData="(v)=> modifyData(v, null ,data)"></jy-dynamic-input>
    </div>
</template>
<script>
import JyTextOpen from '../JyTextOpen'
import JyDynamicInput from '../JyDynamicInput'
export default {
    props:{
        data: Object,
        isDesign: Boolean,
        nameWidth: String,
        isShowName: [String, Boolean, Number]
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
        },
        isRequired(){
            let flag = false,
                rules = this.data.rules;
            if(rules && rules.length){
                rules.every(rule => {
                    if (rule.required) {
                        flag = true;
                        return false;
                    }
                        return true;
                });
            }
            return flag;
        },
        listenerList(){
            let list = {...this.$listeners};
            delete list.modifyData;
            return list
        },
        c_nameWidth(){
            let width = this.nameWidth
            if(this.data.nameRatio) width = this.data.nameRatio / 24 * 100 + "%";
            if(this.data.nameWidth) width = this.data.nameWidth;
            !width && (width = "33%");
            return width;
        }
    },
    methods:{
        modifyData(field, value, data){
            if(value){
                this.$emit("modifyData", {
                    field ,
                    value ,
                    propertyName: "searchtype"
                })
                let searchValue = data.data.filter(item=>{
                    return item.field === value;
                })[0].value;
                this.$emit("modifyData", {
                    field ,
                    value: searchValue ,
                })
            }else{
                this.$emit("modifyData", field)
                if(data && data.type === 'inputmap'){
                    this.$nextTick(()=>{
                        this.$emit("modifyData", {
                            field: data.field,
                            value: field.value
                        })
                    })
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.isdesign{
    padding: 25px  5px;
    border: 1px solid #22A5F1;
    position: relative;
}
.isdesign:before{
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
.left-label{
    width: 33%;
    float: left;
    text-align: left;
    line-height: 28px;
    font-size: 14px;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    word-break: keep-all;
    text-overflow:ellipsis;
}
.right-input{
    position: relative;
    margin-left: 33%;
}
.dynamicmap{
    margin-bottom: 15px;
}
.is-required:before{
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
}
</style>