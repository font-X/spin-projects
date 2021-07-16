import axios from '../axios'

/* 
 * 获取换货申请单管理列表
 */

// 获取换货数据查询
export const getExangeGoods = (data) => {
    return axios({
        url: '/Product/GetPlanList_Sql',
        method: 'post',
        data
    })
}

// 添加换货保存产品
export const saveProduct = (data) => {
    return axios({
        url: '/Product/AddDeliveryPlan_Sql',
        method: 'post',
        data
    })
}

// 添加换货保存产品
export const EditProduct = (data) => {
    return axios({
        url: '/Product/EditDeliveryPlan',
        method: 'post',
        data
    })
}

// 获取单个换货申请单
export const getOneProduct = (data) => {
    return axios({
        url: '/Product/GetDeliveryPlan',
        method: 'post',
        data
    })
}

// 删除换货申请单产品
export const delProduct = (data) => {
    return axios({
        url: '/Product/DeleteDeliveryPlan',
        method: 'post',
        data
    })
}
// 换货申请单确认查询
export const GetPlanConfirmQuery
    = (data) => {
        return axios({
            url: '/Product/GetPlanConfirmQuery',
            method: 'post',
            data
        })
    }
// 换货申请单确认换货申请单确认
export const PlanConfirm
    = (data) => {
        return axios({
            url: '/Product/PlanConfirm',
            method: 'post',
            data
        })
    }
// 换货申请单编辑获取库存
export const GetProductStockList
    = (data) => {
        return axios({
            url: '/Product/GetProductStockList',
            method: 'post',
            data
        })
    }
// 换货申请单提交
export const PlanConfirmSubmit
    = (data) => {
        return axios({
            url: '/Product/PlanConfirmSubmit',
            method: 'post',
            data
        })
    }


// 换货申请单提交
export const GetDeliveryPlanById
    = (data) => {
        return axios({
            url: '/DeliveryRequest/GetDeliveryPlanById',
            method: 'post',
            data
        })
    }
    
// 新增修改内换出站点
export const GetSiteList
    = (data) => {
        return axios({
            url: '/Product/GetSiteList',
            method: 'post',
            data
        })
    }