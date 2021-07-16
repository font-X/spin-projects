import axios from '../axios'
//import Cookies from "js-cookie";
/* 
 * 菜单管理模块
 */

 // 保存
export const save = (data) => {
    return axios({
        url: '/menu/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/menu/delete',
        method: 'post',
        data
    })
}
// 查找导航菜单树
export const findNavTree = (params) => {
    return axios({
        url: '/api/user/GetUserMenus',
        method: 'get',
        params
    })
   //return axios.get('/api/user/GetUserMenus',params,config);
}
// 查找导航菜单树
export const findMenuTree = () => {
    return axios({
        url: '/menu/findMenuTree',
        method: 'get'
    })
}

// 获取菜单树
export const getMenuList = () => {
    return axios({
        url: '/admin/MenuList',
        method: 'get'
    })
}