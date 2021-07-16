<template>
  <div :style="{textAlign: configprop.align}">
    <el-button
    v-for="(bc, index) in buttonData"
    :key="'bc' + index"
    :type="bc.buttonType"
    :loading="bc.loading"
    size="mini"
    :icon="bc.icon"
    @click="onClicEvent(bc)">
    {{ bc.name || '按钮' }}
    </el-button>
  </div>
</template>
<script>
export default {
    components:{
        
    },
    props:{
      configprop: Object,
      align: {
        type: String,
        default: 'center'
      }
    },
    data:function(){
        return {
        }
    },
    computed: {
        buttonData(){
          return this.configprop ? this.configprop.data.filter((item)=>{
            return !item.hasOwnProperty("visible") || item.visible;
          }) : []
        }
    },
    methods:{
      onClicEvent(item){
        this.$emit('methodCompile', item)
      }
    },
    created(){
    }
}


</script>
<style lang="scss" scoped>
.button-list{

}
</style>