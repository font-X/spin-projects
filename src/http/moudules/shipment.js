import axios from '../axios'

/* 
 * 货运管理模块
 */

// 货运管理主表格数据
export const  shipment= data => {
    return axios({
        url: '/FbaShipment/GetFbaShipmentQuery',
        method: 'post',
        data
    })
}
// 货运管理保存
export const  saveShipment= data => {
    return axios({
        url: '/FbaShipment/FbaShipmentAdd',
        method: 'post',
        data
    })
}
// 货运管理 点击修改获取数据
export const  ShipmentEdit= data => {
    return axios({
        url: '/FbaShipment/GetUpdateFbaAddCodeQuery',
        method: 'post',
        data
    })
}
// 货运管理 点击删除
export const  ShipmentDel= data => {
    return axios({
        url: '/FbaShipment/DelFbaAddCode',
        method: 'post',
        data
    })
}
// 货运管理 修改配送地址代码
export const  EditAdress= data => {
    return axios({
        url: '/FbaShipment/UpdateFbaAddCode',
        method: 'post',
        data
    })
}
// 货运管理 批量修改产品号数据列表获取
export const  EditProduct= data => {
    return axios({
        url: '/FbaShipment/FindProductQuery',
        method: 'post',
        data
    })
}
// 货运管理 批量修改产品号
export const  UpdateFindProduct= data => {
    return axios({
        url: '/FbaShipment/UpdateFindProduct',
        method: 'post',
        data
    })
}
// 货运管理 批量标记
export const  BatchMark= data => {
    return axios({
        url: '/FbaShipment/UpdateFbabarCodeList',
        method: 'post',
        data
    })
}

// 货运管理 复核
export const  repeatedlyCheck= data => {
    return axios({
        url: '/FbaShipment/FbaShipmentCheck',
        method: 'post',
        data
    })
}
// 货运管理 取消复核
export const  cancelRepeatedlyCheck= data => {
    return axios({
        url: '/FbaShipment/FbaShipmentUnCheck',
        method: 'post',
        data
    })
}
// 货运管理 清空标签
export const  clearLable= data => {
    return axios({
        url: '/FbaShipment/DelFbabarCodeList',
        method: 'post',
        data
    })
}
// 货运管理 货件导入
export const  PdfImport= data => {
    return axios({
        url: '/FbaShipment/PdfImport',
        method: 'post',
        data
    })
}
// 货运管理 获取货件条码路径
export const  GetServer= data => {
    return axios({
        url: '/FbaShipment/GetServer',
        method: 'post',
        data
    })
}