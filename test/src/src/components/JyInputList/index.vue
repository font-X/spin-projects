<template>
    <div class="query-list">
        <el-row :gutter="5">
            <el-col  :span="+(data.colSpan || vconfigprop.defColSpan)" v-for=" (data) in vconfigprop.data" :key="data.name">
                <el-row>
                    <jy-dynamic-input-map :data="data" :isDesign=" configprop.designPart === data || (data.className && data.className.indexOf('isActive') > -1)" @modifyData="modifyData"></jy-dynamic-input-map>  
                </el-row>
            </el-col>
        </el-row>            
    </div>
</template>
<script>
import JyTextOpen from '../JyTextOpen'
import JyDynamicInput from '../JyDynamicInput'
import JyDynamicInputMap from '../JyDynamicInputMap'
export default {
    components:{
        JyTextOpen,
        JyDynamicInput,
        JyDynamicInputMap
    },
    props:{
        configprop: Object
    },
    data:function(){
        let data = this.configprop && this.configprop.data,
            obj = {aaa:"hhh"};
        if(data){
            data.forEach(item => {
               item.field && (obj[ item.field ] = item.value )
            })
        }
        return {
            aaa: '',
            vdata: obj
            
        }
    },
    computed: {
        vconfigprop:{
             get:function() {
                return this.configprop; 
            },
            set:function(value) {
                
                alert(value)
            }
        }
    },
    methods: {
        modifyData(obj){
            this.$emit("modifyData", obj)
        }
    },
    created(){
    }
}
</script>
<style lang="scss" scoped>

</style>