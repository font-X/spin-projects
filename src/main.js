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
import 'vxe-table/lib/style.css'
import serverConfig from '../static/serverConfig.json'
import MainContent from '@/views/layout/ContentWrapper/MainContent.vue'
import filter from './plugins/filter'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
import JyTextOpen from '@/components/JyTextOpen'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import JsonExcel from "vue-json-excel";




VXETable.use(VXETablePluginElement)
Vue.use(VXETable, {
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
  table: {
    animat: true,
    size: 'mini',
    // 当列大于 40 条时自动启用横向 X 滚动渲染
    scrollX: {
      gt: 20,
    },
    // 当数据大于 500 条时自动启用纵向 Y 滚动渲染
    scrollY: {
      gt: 50,
    }
  },


})

// v-dialogDrag: 弹窗拖拽属性
// Vue.directive('dialogDrag', {
//   bind(el, binding, vnode, oldVnode) {
//     const dialogHeaderEl = el.querySelector('.el-dialog__header');
//     const dragDom = el.querySelector('.el-dialog');
//     //dialogHeaderEl.style.cursor = 'move';
//     dialogHeaderEl.style.cssText += ';cursor:move;'
//     dragDom.style.cssText += ';top:0px;'

//     // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
//     const sty = (function () {
//       if (window.document.currentStyle) {
//         return (dom, attr) => dom.currentStyle[attr];
//       } else {
//         return (dom, attr) => getComputedStyle(dom, false)[attr];
//       }
//     })()

//     dialogHeaderEl.onmousedown = (e) => {
//       // 鼠标按下，计算当前元素距离可视区的距离
//       const disX = e.clientX - dialogHeaderEl.offsetLeft;
//       const disY = e.clientY - dialogHeaderEl.offsetTop;

//       const screenWidth = document.body.clientWidth; // body当前宽度
//       const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

//       const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
//       const dragDomheight = dragDom.offsetHeight; // 对话框高度

//       const minDragDomLeft = dragDom.offsetLeft;
//       const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

//       const minDragDomTop = dragDom.offsetTop;
//       const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;


//       // 获取到的值带px 正则匹配替换
//       let styL = sty(dragDom, 'left');
//       let styT = sty(dragDom, 'top');

//       // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
//       if (styL.includes('%')) {
//         styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
//         styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
//       } else {
//         styL = +styL.replace(/\px/g, '');
//         styT = +styT.replace(/\px/g, '');
//       };

//       document.onmousemove = function (e) {
//         // 通过事件委托，计算移动的距离
//         let left = e.clientX - disX;
//         let top = e.clientY - disY;

//         // 边界处理
//         if (-(left) > minDragDomLeft) {
//           left = -(minDragDomLeft);
//         } else if (left > maxDragDomLeft) {
//           left = maxDragDomLeft;
//         }

//         if (-(top) > minDragDomTop) {
//           top = -(minDragDomTop);
//         } else if (top > maxDragDomTop) {
//           top = maxDragDomTop;
//         }

//         // 移动当前元素
//         dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
//       };

//       document.onmouseup = function (e) {
//         document.onmousemove = null;
//         document.onmouseup = null;
//       };
//     }
//   }
// })

Vue.use(ElementUI)
Vue.use(api)
// 全局注册组件，不然循环调用(a 调用 b，b 调用 a)的时候回报错
Vue.component('main-content', MainContent)
Vue.component('jy-text-open', JyTextOpen)
// 禁用右击
Vue.directive('ban-save', {
  inserted(elem, vnode) {
    //console.log(arguments)
    elem.addEventListener('keydown', function (e) {
      if (e.keyCode == 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
      }
    })
    elem.oncontextmenu = function () {
      return false;
    }
    //   if(document.querySelector('iframe'))
    //     {document.querySelector('iframe').onload = function () {
    //       // iframe 禁用 右键
    //       this.contentWindow.document.oncontextmenu = function(){
    //           return false;
    //       }
    //       // iframe 禁用 ctrl + s
    //       this.contentWindow.addEventListener('keydown', function (e) {
    //           if(e.keyCode == 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)){
    //               e.preventDefault();
    //               e.stopPropagation();
    //           }
    //       }, true)
    //   }
    // }
  }
})
Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    //弹框可拉伸最小宽高
    let minWidth = 400;
    let minHeight = 300;
    //初始非全屏
    let isFullScreen = false;
    //当前宽高
    let nowWidth = 0;
    let nowHight = 0;
    //当前顶部高度
    let nowMarginTop = 0;
    //获取弹框头部（这部分可双击全屏）
    const dialogHeaderEl = el.querySelector('.el-dialog__header');
    //弹窗
    const dragDom = el.querySelector('.el-dialog');
    //给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog；
    dragDom.style.overflow = "auto";
    // 不让弹窗移出可视窗产生滚动条
    dragDom.parentNode.style.overflow = "hidden";
    //清除选择头部文字效果
    //dialogHeaderEl.onselectstart = new Function("return false");
    //头部加上可拖动cursor
    dialogHeaderEl.style.cursor = 'move';
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
    let moveDown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;
      // 获取到的值带px 正则匹配替换
      let styL, styT;
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
      } else {
        styL = +sty.left.replace(/\px/g, '');
        styT = +sty.top.replace(/\px/g, '');
      };
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX;
        const t = e.clientY - disY;
        let topValue = Math.max(t + styT, 0); // 不让向上移动出去
        // 移动当前元素 
        dragDom.style.left = `${l + styL}px`;
        dragDom.style.top = `${topValue}px`;
        //console.log(dragDom.offsetHeight)
        //将此时的位置传出去
        //binding.value({x:e.pageX,y:e.pageY})
      };
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
    dialogHeaderEl.onmousedown = moveDown;
    //双击头部全屏效果
    dialogHeaderEl.ondblclick = (e) => {
      if (isFullScreen == false) {
        nowHight = dragDom.clientHeight;
        nowWidth = dragDom.clientWidth;
        nowMarginTop = dragDom.style.marginTop;
        dragDom.style.left = 0;
        dragDom.style.top = 0;
        dragDom.style.height = "100VH";
        dragDom.style.width = "100VW";
        dragDom.style.marginTop = 0;
        isFullScreen = true;
        dialogHeaderEl.style.cursor = 'initial';
        dialogHeaderEl.onmousedown = null;
      } else {
        dragDom.style.height = "auto";
        dragDom.style.width = nowWidth + 'px';
        dragDom.style.marginTop = nowMarginTop;
        isFullScreen = false;
        dialogHeaderEl.style.cursor = 'move';
        dialogHeaderEl.onmousedown = moveDown;
      }
    }
    dragDom.onmousemove = function (e) {
      let moveE = e;
      if (e.clientX > dragDom.offsetLeft + dragDom.clientWidth - 10 || dragDom.offsetLeft + 10 > e.clientX) {
        dragDom.style.cursor = 'w-resize';
      } else if (el.scrollTop + e.clientY > dragDom.offsetTop + dragDom.clientHeight - 10) {
        dragDom.style.cursor = 's-resize';
      } else {
        dragDom.style.cursor = 'default';
        dragDom.onmousedown = null;
      }
      dragDom.onmousedown = (e) => {
        const clientX = e.clientX;
        const clientY = e.clientY;
        let elW = dragDom.clientWidth;
        let elH = dragDom.clientHeight;
        let EloffsetLeft = dragDom.offsetLeft;
        let EloffsetTop = dragDom.offsetTop;
        dragDom.style.userSelect = 'none';
        let ELscrollTop = el.scrollTop;
        //判断点击的位置是不是为头部
        if (clientX > EloffsetLeft && clientX < EloffsetLeft + elW && clientY > EloffsetTop && clientY < EloffsetTop + 100) {
          //如果是头部在此就不做任何动作，以上有绑定dialogHeaderEl.onmousedown = moveDown;
        } else {
          document.onmousemove = function (e) {
            e.preventDefault(); // 移动时禁用默认事件
            //左侧鼠标拖拽位置
            if (clientX > EloffsetLeft && clientX < EloffsetLeft + 10) {
              //往左拖拽
              if (clientX > e.clientX) {
                dragDom.style.width = elW + (clientX - e.clientX) * 2 + 'px';
              }
              //往右拖拽
              if (clientX < e.clientX) {
                if (dragDom.clientWidth < minWidth) {
                } else {
                  dragDom.style.width = elW - (e.clientX - clientX) * 2 + 'px';
                }
              }
            }
            //右侧鼠标拖拽位置
            if (clientX > EloffsetLeft + elW - 10 && clientX < EloffsetLeft + elW) {
              //往左拖拽
              if (clientX > e.clientX) {
                if (dragDom.clientWidth < minWidth) {
                } else {
                  dragDom.style.width = elW - (clientX - e.clientX) * 2 + 'px';
                }
              }
              //往右拖拽
              if (clientX < e.clientX) {
                dragDom.style.width = elW + (e.clientX - clientX) * 2 + 'px';
              }
            }
            //底部鼠标拖拽位置
            if (ELscrollTop + clientY > EloffsetTop + elH - 20 && ELscrollTop + clientY < EloffsetTop + elH) {
              //往上拖拽
              if (clientY > e.clientY) {
                if (dragDom.clientHeight < minHeight) {
                } else {
                  dragDom.style.height = elH - (clientY - e.clientY) * 2 + 'px';
                }
              }
              //往下拖拽
              if (clientY < e.clientY) {
                dragDom.style.height = elH + (e.clientY - clientY) * 2 + 'px';
              }
            }
          };
          //拉伸结束
          document.onmouseup = function (e) {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        }
      }
    }
  }
})

//Vue.prototype.global = global
//图片预览
Vue.use(preview)
//json导出excel
Vue.component("downloadExcel", JsonExcel);
Vue.use(jyBase)
Vue.prototype.$axios = axios
// 全局导入过滤器
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))
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