/**
 * 嵌套页面IFrame模块
 */

//import { baseURL } from '@/utils/global'
import store from '@/store'
/**
 * 嵌套页面URL地址
 * @param {*} url
 */
export function getIFramePathNoheader(url){
  let iframeUrl = '';
  if (/^{url}\//.test(url)) {
    //iframeUrl = localStorage.baseURL+url.replace(/^{url}\//, '');
    iframeUrl = store.state.baseURL+url.replace(/^{url}\//, '');
    //alert(iframeUrl);
  }
  //alert(store.state.baseURL);
  return  iframeUrl;
}
export function getIFramePath(url) {
  let iframeUrl = ''
  if (/^iframe:.*/.test(url)) {
    iframeUrl = url.replace('iframe:', '')
  } else if (/^http[s]?:\/\/.*/.test(url)) {
    iframeUrl = url.replace('http://', '')
    if (iframeUrl.indexOf(":") != -1) {
      iframeUrl = iframeUrl.substring(iframeUrl.lastIndexOf(":") + 1)
    }
  }
  return iframeUrl
}

/**
 * 嵌套页面路由路径
 * @param {*} url
 */
export function getIFrameUrl(url) {
  let iframeUrl = ''
  if (/^iframe:.*/.test(url)) {
    iframeUrl = localStorage.baseURL + url.replace('iframe:', '')
  } else if (/^http[s]?:\/\/.*/.test(url)) {
    iframeUrl = url
  }
  return iframeUrl
}

