<template>
    <div class="h100p">
        <keep-alive>
            <component  v-bind="urlHashMap" :key="currentTabComponent" :pageconfig="layoutdata" v-bind:is="currentTabComponent" class="h100p" keep-alive></component>
        </keep-alive>
    </div>
</template>
<script>

import Vue from 'vue'
import Axios from 'axios'
import Qs from 'qs'
import Error404 from '@/views/Error/404.vue'
const  datamap = {},moduleNameMap = {};
export default {

    props:{
        activeNav: Object
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
    components:{
        Error404
    },
    computed:{
       
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
            let activeNav = this.activeNav;
            if(activeNav){
                let linkUrl = activeNav.LinkUrl,
                    menuCode = activeNav.MenuCode,
                    array = linkUrl.split('?'),
                    hashMap = this.$jybase.getUrlHashMap(array[1]),
                    moduleName = "";
                linkUrl = array[0]
                moduleName = linkUrl.split("/").pop();
                if(activeNav.params){
                    
                    hashMap = {...hashMap, ...activeNav.params}
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
                    let linkArray = linkUrl.split('/'),
                        mName = linkArray.pop();
                    import(/* webpackChunkName: "[request]" */'@/views/MoudleMap/' + linkArray.join('/')).then((res)=>{
                        Vue.component(
                            moduleName,
                            // 这个动态导入会返回一个 `Promise` 对象。
                            res.default[mName]
                            //() => import(linkUrl).then(res=>{})
                        )
                        this.$store.commit("setNavComponentName", moduleName);
                        this.currentTabComponent =  moduleName
                    }).catch(e=>{
                        this.$store.commit("setNavComponentName", "Error404");
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
        }
       
    },
     watch:{
            activeNav:{
                handler(){
                    this.loadModule();
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
</style>