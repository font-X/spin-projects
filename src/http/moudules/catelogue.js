import axios from '../axios'

/* 
 * 分类树状管理
 */

// // 获取树状数据
// export const getTreeList = (data) => {
//     return axios({
//         url: 'Product/GetProductTree',
//         method: 'post',
//         params:data
//     })
// }
// 获取树状数据
export const getTreeList = (data) => {
    return axios({
        url: 'productclass/GetTypeTreeTypeList',
        method: 'post',
        data
    })
}
/* 
 * 保存添加下级或编辑
 */

// 保存按钮编辑成功
export const addSubordinate = (data) => {
    return axios({
        url: 'productclass/ProductClassEditA',
        method: 'post',
        data
    })
}

/* 
 * 删除
 */

// 删除
export const DeteleData = (data) => {
    return axios({
        url: 'productclass/ProductClassDelA',
        method: 'post',
        data
    })
}
