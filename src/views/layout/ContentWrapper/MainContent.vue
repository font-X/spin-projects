<template>
  <div class="h100p w_bg">
    <keep-alive ref="aaa">
      <component
        ref="componentList"
        v-on="$listeners"
        v-bind="urlHashMap"
        :key="currentTabComponent"
        :pageconfig="layoutdata"
        v-bind:is="currentTabComponent"
        class="h100p"></component>
    </keep-alive>
  </div>
</template>
<script>

import Vue from 'vue'
import Error404 from '@/views/Error/404.vue'
const  datamap = {},moduleNameMap = {};
export default {
    props:{
        activeNav: Object,
        isMain: {
          type: Boolean,
          default: false
        }
    },
    data:function(){
        return {
            currentTabComponent:"",
            layoutdata: null,
            urlHashMap: {}
        }
    },
    created(){
        this.loadModule();
    },
    mounted(){
    },
    components:{
        Error404
    },
    computed:{
      screenPages(){
        return this.$store.state.menu.screenPages
      },
      colsedNav(){
        return this.screenPages[this.$store.state.menu.activeScreenPageIndex].lastColsedNav;
      }
    },

    methods:{
        dw(){
            this.$refs.mya.scrollIntoView(true);
        },
        loadModule(){
            // import('../../ProfessionalWork/ModuleA').then((res)=>{
            //     console.log(res);
            //     that.components = {ModuleB}
            //     console.log(that)
            //     that.currentTabComponent = "ModuleB";
            // })
            // let startTime = Date.now();
            let activeNav = this.activeNav;
            // if(activeNav.MenuName === '花型统计'){
            //   activeNav.MenuUrl = 'Admin/DesignComponentList'
            // }
            if(activeNav){
                let MenuUrl = activeNav.MenuUrl || activeNav.LinkUrl,
                    menuCode = activeNav.MenuCode,
                    array = MenuUrl.split('?'),
                    hashMap = this.$jybase.getUrlHashMap(array[1]),
                    moduleName = "";
                MenuUrl = array[0]
                moduleName = MenuUrl.split("/").pop();
                if(activeNav.params){
                  hashMap = {...hashMap, ...activeNav.params};
                  delete hashMap[""];
                }
                this.urlHashMap = hashMap;
                if(activeNav.componentName){
                    this.layoutdata = datamap[activeNav.componentName];
                    this.currentTabComponent = activeNav.componentName;
                }else{
                    if(moduleNameMap[moduleName]){
                        moduleName = moduleName + (moduleNameMap[moduleName]++);
                    }else{
                        moduleNameMap[moduleName] = 1;
                    }
                    let linkArray = MenuUrl.split('/'),
                        mName = linkArray.pop();
                    import(/* webpackChunkName: "[request]" */'@/views/MoudleMap/' + linkArray.join('/')).then((res)=>{
                        Vue.component(
                            moduleName,
                            // 这个动态导入会返回一个 `Promise` 对象。
                            res.default[mName]
                            //() => import(MenuUrl).then(res=>{})
                        )
                        this.isMain && this.$store.commit("setNavComponentName", moduleName);
                        this.currentTabComponent =  moduleName
                        activeNav.currentTabComponent =  moduleName
                        // console.log(Date.now() - startTime)
                    }).catch(e=>{
                        console.log(e);
                        this.isMain && this.$store.commit("setNavComponentName", "Error404");
                        this.currentTabComponent =  "Error404"
                    })
                    // Axios({
                    //     headers:{'Content-Type':'application/x-www-form-urlencoded'},
                    //     method: "post",
                    //     url: "/test/admin/ceshi/test.aspx",
                    //     data: Qs.stringify({menucode: activeNav.MenuCode})
                    // }).then(res=>{
                    //     if(res.status == '200' && res.data){
                    //         this.currentTabComponent =  moduleName;
                    //         datamap[moduleName] = res.data;
                    //         this.layoutdata = datamap[moduleName];
                    //         Vue.component(
                    //         moduleName,
                    //         PageDisplay
                    //         // 这个动态导入会返回一个 `Promise` 对象。
                    //         // () => import('../../ProfessionalWork/' + moduleName)
                    //         )
                    //     }
                    // })
                }
            }
        },
        deleteModule(closedNav){
          if(closedNav){
            let {currentTabComponent} = closedNav,
            componentList = this.$refs.componentList;
            if(componentList.$vnode && componentList.$vnode.data.keepAlive){
                if(componentList.$vnode.parent
                && componentList.$vnode.parent.componentInstance
                && componentList.$vnode.parent.componentInstance.cache){
                    let cache = componentList.$vnode.parent.componentInstance.cache;
                    delete cache[currentTabComponent]
                    delete moduleNameMap[currentTabComponent];
                }
            }
          }
        }
    },
     watch:{
      activeNav:{
        handler(){
          this.loadModule();
        },
        deep:true
      },
      colsedNav:{
        handler(val, oldValue){
          //console.log(val,oldValue)
          // if(!oldValue || val.MenuCode != oldValue.MenuCode
          // || val.componentName != oldValue.componentName)
            this.deleteModule(this.colsedNav)
        },
        deep:true
      }
    }
}
</script>
<style lang="scss" scoped>
.h100p{
  height: 100%
}
.w_bg{
  background: #F5F8FF;
  padding: 10px;
}
</style>