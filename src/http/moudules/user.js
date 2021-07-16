import axios from '../axios'

/* 
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: 'api/user/UserEdit',
        method: 'post',
        data
    })
}
// 保存密码
export const PassWordModi = (data) => {
    return axios({
        url: 'api/user/PassWordModi',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/user/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const GetList = (data) => {
    return axios({
        url: 'api/user/GetList',
        method: 'get',
        data
    })
}
// 分页查询
export const GetList1 = (data) => {
    return axios({
        url: 'api/user/GetList1',
        method: 'get',
        data
    })
}// 查找用户的菜单权限标识集合
export const findPermissions = (params) => {
    return axios({
        url: 'api/user/Permissions',
        method: 'get',
        params
    })
}
//判断用户code是否在职
export const IsUserCodeOn = (data) => {
    return axios({
        url: '/user/IsUserCodeOn',
        method: 'post',
        data
    })
}