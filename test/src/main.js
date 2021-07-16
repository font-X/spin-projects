import Vue from 'vue'
import App from './App'
import router from './router'
import api from './http'
import axios from 'axios'
import i18n from './i18n'
import store from './store'
import jyBase from '@/common/js/jy-base.js'
//import global from '@/utils/global'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/iconfont/iconfont.css'
import '@/common/stylus/jy-base.css'
// vxe-table表格插件
//import './plugins/element'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import serverConfig from '../static/serverConfig.json'
import MainContent from '@/views/layout/ContentWrapper/MainContent.vue'
Vue.use(VXETable,{
    // 默认尺寸
    size: 'mini',
    fit: true,
    // 自定义图标配置
    iconMap: {
      sortAsc: 'vxe-icon--caret-top',
      sortDesc: 'vxe-icon--caret-bottom',
      filter: 'vxe-icon--funnel',
      edit: 'vxe-icon--edit-outline',
      tree: 'vxe-icon--caret-right',
      jumpPrev: 'vxe-icon--d-arrow-left',
      jumpNext: 'vxe-icon--d-arrow-right',
      prevPage: 'vxe-icon--arrow-left',
      nextPage: 'vxe-icon--arrow-right'
    },
    // 默认 tooltip 主题样式
    tooltipConfig: {
      theme: 'dark'
    },
    // 默认分页参数
    pager: {
      pageSize: 10,
      pagerCount: 7,
      pageSizes: [10, 15, 20, 50, 100],
      layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
    },
    // 默认优化配置项
    optimization : {
      animat: true,
      // 当列大于 40 条时自动启用横向 X 滚动渲染
      scrollX: {
        gt: 40,
        oSize: 5,
        rSize: 16
      },
      // 当数据大于 500 条时自动启用纵向 Y 滚动渲染
      scrollY: {
        gt: 100,
        oSize: 20,
        rSize: 80
      }
    }
})

Vue.use(ElementUI)
Vue.use(api)
// 全局注册组件，不然循环调用(a 调用 b，b 调用 a)的时候回报错
Vue.component('main-content',MainContent)
//Vue.prototype.global = global
Vue.use(jyBase)
let baseURL = serverConfig.baseURL;
//alert(baseURL);
store.state.baseURL = baseURL;
//localStorage.setItem("baseURL", baseURL);
sessionStorage.setItem("baseURL", baseURL);
//console.info(baseURL);
new Vue({
    el: '#app',
    i18n,
    store,
    router,
    render: h => h(App)
});
/*
  localStorage.setItem("baseURL", "http://localhost:5001");
  new Vue({
    el: '#app',
    i18n,
    router,
    store,
    render: h => h(App)
  });
*/