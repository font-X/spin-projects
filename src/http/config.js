
//import { baseURL } from '@/utils/global'
import serverConfig from '../../static/serverConfig.json'
export default {
  method: 'get',
  // 基础url前缀
  //baseURL: baseURL,
  //baseURL:localStorage.baseURL,
  baseURL: serverConfig.baseURL, //sessionStorage.baseURL,
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',//'application/json;charset=UTF-8',
    //'Access-Control-Allow-Origin': '*'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 30000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json'
}