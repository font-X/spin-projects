<template>
  <div class="query-list">
    <el-row>
      <el-col :span="24">
        <el-row>
          <el-col :span="+(data.colSpan || vconfigprop.colSpan)" v-for=" (data, n_Index) in c_data" :key="data.field" style="margin-bottom:5px">
            <el-row>
              <jy-dynamic-input-map
              v-on="$listeners"
              :isShowName="configprop.isShowName"
              :nameWidth="configprop.nameWidth"
              :data="data"
              :isDesign=" configprop.designPartIndex === n_Index || (data.className && data.className.indexOf('isActive') > -1)"></jy-dynamic-input-map>  
            </el-row>
          </el-col>
          <el-col v-if="buttonVisible" :span="restSpan">
            <el-button
            size="mini"
            type="primary"
            icon="el-icon-search"
            @click="search"
            >查询</el-button>
            <el-button v-show="status === 1"
            v-for="(item, index) in userButtons"
            :key="'user_button'+index"
            :type="item.btType"
            :icon="item.icon"
            size="mini"
            @click="handleuserClick(item.event)"
          >{{ item.label }}</el-button>
            <el-button
            size="mini"
            type="primary"
            :icon="status === 1 ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            @click="toggle"
            >{{status === 1 ? "收起" : "展开"}}</el-button>
          </el-col>
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
      configprop: Object,
      userButtons: {
        type: Array,
        default:()=>[]
      }
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
            vdata: obj,
            status: 1,  // 1 展开状态 2 收起状态
            leastSpan: this.userButtons.length|0+4
        }
    },
    computed: {
      vconfigprop:{
          get:function() {
          return this.configprop;
        }
      },
      c_data(){
        let vconfigprop = this.vconfigprop,
          status = this.status,
          sourceData = vconfigprop.data ? vconfigprop.data.filter(item=>{
            return !item.hasOwnProperty("visible") || item.visible;
          }): [],
          data = [];
        if(status === 2){
          let spanCount = 0;
          for(let i = 0; i < sourceData.length; i++){
            spanCount +=  +sourceData[i].colSpan || +vconfigprop.colSpan;
            if(spanCount <= 24){
              data.push(sourceData[i]);
            }else{
              break;
            }
          }
        }else{
          data = sourceData;
        }
        return data;
      },
      restSpan(){
        let total = 0,
          vconfigprop = this.vconfigprop,
          data = this.c_data;
        data.forEach(item=>{
          total += +item.colSpan || +vconfigprop.colSpan;
        })
        let r=24 - (total % 24 === 0 ? 24 : total % 24);
        if(r<this.leastSpan) r=this.leastSpan;
        return r;
      },
      buttonVisible(){
        return this.vconfigprop.buttonVisible;
      }
    },
    methods: {
      search(){
        this.$emit("search");
      },
      toggle(){
        this.status = this.status === 1 ? 2 : 1;

      },
      handleuserClick(event) {
        this.$emit("handleuserClick", event);
      },    
    },
    created(){
    }
}
</script>
<style lang="scss" scoped>
>>>.query-list{
  width: 100%;
}
</style>