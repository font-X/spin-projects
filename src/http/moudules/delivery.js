import axios from '../axios'

/* 
 * 报关单证
 */

// 报关单证查询功能
export const GetPickingPlanList = (data) => {
    return axios({
        url: '/PickingPlan/GetPickingPlanList',
        method: 'post',
        data
    })
}
// 根据PickingId获取待包装产品清单
export const GetUnPickingDetailList = (data) => {
    return axios({
        url: '/PickingPlan/GetUnPickingDetailList',
        method: 'post',
        data
    })
}
// 根据PickingId获取待拣货产品清单
export const GetLackPickingDetailList = (data) => {
    return axios({
        url: '/PickingPlan/GetLackPickingDetailList',
        method: 'post',
        data
    })
}
// 删除配送计划表
export const DeletePickingPlan = (data) => {
    return axios({
        url: '/PickingPlan/DeletePickingPlan',
        method: 'post',
        data
    })
}
// 完成配货
export const CompletePickingPlan = (data) => {
    return axios({
        url: '/PickingPlan/CompletePickingPlan',
        method: 'post',
        data
    })
}
// 新增配货计划
export const AddPickingPlan = (data) => {
    return axios({
        url: '/PickingPlan/AddPickingPlan',
        method: 'post',
        data
    })
}
// 编辑配货计划
export const EditPickingPlan = (data) => {
    return axios({
        url: '/PickingPlan/EditPickingPlan',
        method: 'post',
        data
    })
}
// 根据PickingId获取单个配货计划
export const GetPickingPlan = (data) => {
    return axios({
        url: '/PickingPlan/GetPickingPlan',
        method: 'post',
        data
    })
}
// 配货计划进度列表
export const GetPickingPlanListProgress = (data) => {
    return axios({
        url: '/PickingPlan/GetPickingPlanListProgress',
        method: 'post',
        data
    })
}
// 获取配货计划进度明细
export const GetProductListProgress = (data) => {
    return axios({
        url: '/PickingPlan/GetProductListProgress',
        method: 'post',
        data
    })
}
// 修改柜子颜色标
export const UpdatePickingPlanColorTag = (data) => {
    return axios({
        url: '/PickingPlan/UpdatePickingPlanColorTag',
        method: 'post',
        data
    })
}
// 仓库扫描打印出来的柜二维码，加载当前柜子数据
export const GetPickingContainer = (data) => {
    return axios({
        url: '/PickingPlan/GetPickingContainer',
        method: 'post',
        data
    })
}
// 找货扫描箱条码绑定柜子
export const SaveToLotList = (data) => {
    return axios({
        url: '/PickingPlan/SaveToLotList',
        method: 'post',
        data
    })
}
// 找货已扫描列表删除该箱与柜子绑定关系
export const RemoveToLotList = (data) => {
    return axios({
        url: '/PickingPlan/RemoveToLotList',
        method: 'post',
        data
    })
}
// 获取选中产品列表的各状态数量
export const GetProductListQuery = (data) => {
    return axios({
        url: '/PickingPlan/GetProductListQuery',
        method: 'post',
        data
    })
}
// 获取已完成配货的信息
export const GetPickingDetailListById = (data) => {
    return axios({
        url: '/PickingPlan/GetPickingDetailListById',
        method: 'post',
        data
    })
}
