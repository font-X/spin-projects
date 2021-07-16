import axios from '../axios'

/* 
 * 系统登录模块
 */
// 获取公司信息
export const getCompanyInfo = () => {
    return axios({
        url: '/admin/GetCompanyInfo',
        method: 'get'
    })
}

// 登录
export const login = data => {
    return axios({
        url: '/User/Login',
        method: 'post',
        data
    })
}
//钉钉登陆
export const ddLogin = data => {
    return axios({
        url: '/User/DDLogin',
        method: 'post',
        data
    })
}
// 登出
export const logout = () => {
    return axios({
        url: 'logout',
        method: 'get'
    })
}

