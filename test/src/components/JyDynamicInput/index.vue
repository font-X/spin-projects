<template>
    <div>
        <el-date-picker
        v-if="computedData.type === 'date'"
        size= "mini"
        class="sup-mini"
        v-model = "data.value"
        type="date"
        placeholder="选择日期">
        </el-date-picker>

        <el-input size="mini" class="sup-mini" v-if="computedData.type === 'input'" :value="computedData.value" @input="modifyData(data.field, $event)" :placeholder="computedData.name"></el-input>  
        
        <el-select v-if="computedData.type === 'select'" :allow-create="data.allowCreate" filterable  size="mini" class="sup-mini" :value="data.value" 
         @change="modifyData(data.field, $event)" placeholder="请选择">
            <el-option
                v-for="item in computedData.bindData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>

        <jy-text-open v-if="computedData.type === 'textopen'" :data="computedData" ></jy-text-open>
        
        <el-date-picker
            v-if="computedData.type === 'daterange'"
            v-model="computedData.value"
            size="mini"
            class="sup-mini"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            >
        </el-date-picker> 
    </div>
</template>
<script>
import JyTextOpen from '../JyTextOpen'
export default {
    props:{
        data: Object
    },
    components:{
        JyTextOpen
    },
    data:function(){
        return {
            pickerOptions:{
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setMonth(end.getMonth() - 1);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setMonth(end.getMonth() - 3);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近六个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setMonth(end.getMonth() - 6);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一年',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setFullYear( end.getFullYear() - 1);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三年',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setFullYear( end.getFullYear() - 3);
                    picker.$emit('pick', [start, end]);
                    }
                }
                ]
            }
        }
    },
    computed: {
        computedData(){
            return this.data || {};
        }
    },
    methods:{
        modifyData(field, value){
            this.$emit("modifyData", {
                field ,
                value
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>