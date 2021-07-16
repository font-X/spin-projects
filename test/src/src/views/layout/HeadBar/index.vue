<template> 
  <div class="jy-header" :class="{isFull:isFullScreen}">
      <div class="jy-logo"></div>
      <menu-list></menu-list>
  </div>
</template>

<script>
import store from '@/store'
import MenuList from './MenuList.vue'
import Axios from 'axios'
export default {
  components:{
    MenuList 
  },
  data() {
    return {
    
    }
  },
  methods: {
    
  },
  created(){
      this.$api.http(
          'admin/MenuList',
          'get').then(data=>{
            console.log(data);
              this.$store.commit("setMenuList", data);
      })
  },
  computed:{
   isFullScreen(){
        return store.state.app.isFullScreen
    }
  }
}
</script>

<style scoped lang="scss">
    .jy-header{
        height: 50px;
        background-color: #206CA4;
        table-layout: fixed;
        z-index: 2;

        .jy-logo{
            float: left;
            width: 100px;
            height: 100%;
            padding: 0 20px;
        }
    }
    .jy-header.isFull{
        display: none;
    }
</style>