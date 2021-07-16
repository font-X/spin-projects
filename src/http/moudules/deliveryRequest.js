import axios from '../axios'

//添加或修改发货申请单
export const save = (data)=>{
    return axios({
        url: 'DeliveryRequest/save',
        method: 'post',
        data
    })
}

// 获取发货申请列表
export const getList = (data) => {
    return axios({
        url: 'DeliveryRequest/GetRequestList',
        method: 'post',
        data
    })
}
//
export const getPageList = (data) => {
    return axios({
        url: 'DeliveryRequest/getRequestPageList',
        method: 'post',
        data
    })
}

//获取sku数据
export const GetFbaList =  (data) => {
    return axios({
        url: 'DeliveryRequest/GetFbaList',
        method: 'post',
        data
    })
}

export const getRequestInfoWithList = (data)=>{
    return axios({
        url: 'DeliveryRequest/GetRequestInfoWithList',
        method: 'post',
        data
    })
}
//删除数据
export const deleteItem = (data)=>{
    return axios({
        url: 'DeliveryRequest/deleteItem',
        method: 'post',
        data
    })
}
//fba复合
export const getFbalotEntity = (data)=>{
    return axios({
        url: 'DeliveryRequest/getFbalotEntity',
        method: 'post',
        data
    })
}
//fba复核获取条码清单
export const getBarCodeList = (data)=>{
    return axios({
        url: 'DeliveryRequest/getBarCodeList',
        method: 'post',
        data
    })
}
//fba复核
export const fbaCheck = (data)=>{
    return axios({
        url: 'DeliveryRequest/fbaCheck',
        method: 'post',
        data
    })
}
//取消fba复核
export const fbaUnCheck = (data)=>{
    return axios({
        url: 'DeliveryRequest/fbaUnCheck',
        method: 'post',
        data
    })
}
//发货完成 和取消发货完成
export const fbaAllCheck = (data)=>{
    return axios({
        url: 'DeliveryRequest/fbaAllCheck',
        method: 'post',
        data
    })
}
//打开fba复核页面执行
export const fbaUpd = (data)=>{
    return axios({
        url: 'DeliveryRequest/fbaUpd',
        method: 'post',
        data
    })
}
//fba 点击主表显示明细
export const getFbalotDetailList = (data)=>{
    return axios({
        url: 'DeliveryRequest/getFbalotDetailList',
        method: 'post',
        data
    })
}
//快速进仓
export const fbaInAddKS = (data)=>{
    return axios({
        url: 'DeliveryRequest/fbaInAddKS',
        method: 'post',
        data
    })
}
//取消快速进仓
export const fbaInCancel = (data)=>{
    return axios({
        url: 'DeliveryRequest/fbaInCancel',
        method: 'post',
        data
    })
}
//海外仓入库
export const GetHWDepotByDeliveryId = (data)=>{
    return axios({
        url: 'DeliveryRequest/GetHWDepotByDeliveryId',
        method: 'post',
        data
    })
}



//海外仓入库保存
export const HWDepotInAdd = (data)=>{
    return axios({
        url: 'DeliveryRequest/HWDepotInAdd',
        method: 'post',
        data
    })
}
//海外仓出库保存
export const HWDepotOutAdd = (data)=>{
    return axios({
        url: 'DeliveryRequest/HWDepotOutAdd',
        method: 'post',
        data
    })
}
//备注修改
export const UpdateDeliveryPlanRemark = (data)=>{
    return axios({
        url: 'DeliveryRequest/UpdateDeliveryPlanRemark',
        method: 'post',
        data
    })
}

//窗帘发货申请单FBA散货查询
export const GetFBACustomLabel = (data)=>{
    return axios({
        url: 'DeliveryRequest/GetFBACustomLabel',
        method: 'post',
        data
    })
}
//FBA散货数据存储
export const FBACustomLabelSave = (data)=>{
    return axios({
        url: 'DeliveryRequest/FBACustomLabelSave',
        method: 'post',
        data
    })
}
//获取发货申请单明细
export const GetRequestProductList = (data)=>{
    return axios({
        url: 'DeliveryRequest/GetRequestProductList',
        method: 'post',
        data
    })
}





