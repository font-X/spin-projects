import axios from '../axios'

/* 
 * 打印模块
 */

// 打印列表
export const PrintList = (data) => {
    return axios({
        url: 'Print/PrintList',
        method: 'post',
        data
    })
}
// 打印
export const Print = (data) => {
    return axios({
        url: 'Print/Print',
        method: 'post',
        data
    })
}
// DLL打印
export const PrintDll = (data) => {
    return axios({
        url: 'Print/PrintDll',
        method: 'post',
        data
    })
}
// 导出
export const Export = (data) => {
    return axios({
        url: 'Print/Export',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        responseType: 'arraybuffer',
        data
    },'header') //header:返回值不预处理
}
