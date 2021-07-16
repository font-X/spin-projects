//流转卡管理
import axios from '../axios'

// 获取工艺流程
export const GetCraftsList = (data) => {
    return axios({
        url: '/WsTrnCard/GetCraftsList',
        method: 'post',
        data
    })
}
//分页获取流转卡信息
export const GetTrnCardPageList = (data) => {
    return axios({
        url: '/WsTrnCard/GetTrnCardPageList',
        method: 'post',
        data
    })
}
//流转作业查询 分页数据
export const GetTrnCardWorkPageList = (data) => {
    return axios({
        url: '/WsTrnCard/GetTrnCardWorkPageList',
        method: 'post',
        data
    })
}
//获取人员列表
export const GetWokerList = (data) => {
    return axios({
        url: '/WsTrnCard/GetWokerList',
        method: 'post',
        data
    })
}
//根据流转卡号获取信息
export const GetTableCardInfoBycardNo = (data) => {
    return axios({
        url: '/WsTrnCard/GetTableCardInfoBycardNo',
        method: 'post',
        data
    })
}
//获取不良编号
export const GetBadReasonsList = (data) => {
    return axios({
        url: '/WsTrnCard/GetBadReasonsList',
        method: 'post',
        data
    })
}
//获取用户工艺
export const GetWokerTrnCardList = (data) => {
    return axios({
        url: '/WsTrnCard/GetWokerTrnCardList',
        method: 'post',
        data
    })
}
//提交工艺
export const UpdateTrnCar = (data) => {
    return axios({
        url: '/WsTrnCard/UpdateTrnCar',
        method: 'post',
        data
    })
}
//批量提交
export const UpdateTrnCarList = (data) => {
    return axios({
        url: '/WsTrnCard/UpdateTrnCarList',
        method: 'post',
        data
    })
}
// 获取工人的 平均产量 和合格率
export const GetWorkerProductInfo = (data) => {
    return axios({
        url: '/WsTrnCard/GetWorkerProductInfo',
        method: 'post',
        data
    })
}
//获取工人名单
export const GetWorkList= (data) => {
    return axios({
        url: '/WsTrnCardWorkList/GetWorkList',
        method: 'post',
        data
    })
}
//保存工人工艺流程
export const SaveWorkList= (data) => {
    return axios({
        url: '/WsTrnCardWorkList/SaveWorkList',
        method: 'post',
        data
    })
}
//获取单个worklist
export const GetWorkListEntity = (data) => {
    return axios({
        url: '/WsTrnCardWorkList/GetWorkListEntity',
        method: 'post',
        data
    })
}
//获取单个worklist
export const DeleteWorkList = (data) => {
    return axios({
        url: '/WsTrnCardWorkList/DeleteWorkList',
        method: 'post',
        data
    })
}
//根据卡号获取信息 开卡用
export const GetRgPlanBySid = (data) => {
    return axios({
        url: '/Rg_PlanProduct/GetRgPlanBySid',
        method: 'post',
        data
    })
}
//获取流转开卡模板列表
export const GetLabelList = (data) => {
    return axios({
        url: '/Rg_PlanProduct/GetLabelList',
        method: 'post',
        data
    })
}
//根据工艺id获取详细列表
export const GetCraftsRoutinDetail = (data) => {
    return axios({
        url: '/Bas_CraftsRouting/GetCraftsRoutinDetail',
        method: 'post',
        data
    })
}
//AddWsTrnCard
export const AddWsTrnCard = (data) => {
    return axios({
        url: '/Rg_PlanProduct/AddWsTrnCard',
        method: 'post',
        data
    })
}
//删除流转卡
export const CardDelete = (data) => {
    return axios({
        url: '/WsTrnCard/DeleteWsTrnCard',
        method: 'post',
        data
    })
}
//根据id获取bom数据
export const GetSProductBom = (data) => {
    return axios({
        url: '/WsTrnCard/GetSProductBom',
        method: 'post',
        data
    })
}

//导入工资
export const ImprotWage = (data) => {
    return axios({
        url: '/Ws_WorkerWage/ImprotWage',
        method: 'post',
        data
    })
}
//删除工资结算
export const DeleteWage = (data) => {
    return axios({
        url: '/Ws_WorkerWage/DeleteWage',
        method: 'post',
        data
    })
}
//提交审批
export const ApprovalWage = (data) => {
    return axios({
        url: '/Ws_WorkerWage/ApprovalWage',
        method: 'post',
        data
    })
}
//提交审批
export const CancelApprovalWage = (data) => {
    return axios({
        url: '/Ws_WorkerWage/CancelApprovalWage',
        method: 'post',
        data
    })
}
//获取审批数据
export const GetApprovalWageList = (data) => {
    return axios({
        url: '/Ws_WorkerWage/GetApprovalWageList',
        method: 'post',
        data
    })
}
// 获取流转卡信息 拆分用
export const GetCardEntityBySplit = (data) => {
    return axios({
        url: '/WsTrnCard/GetCardEntityBySplit',
        method: 'post',
        data
    })
}

// 获取流转信息 拆分用
export const GetCardRoutingBySplit = (data) => {
    return axios({
        url: '/WsTrnCard/GetCardRoutingBySplit',
        method: 'post',
        data
    })
}

// 获取流转信息 拆分用
export const TrnCardAddSplit = (data) => {
    return axios({
        url: '/WsTrnCard/TrnCardAddSplit',
        method: 'post',
        data
    })
}
// 获取当前工艺,流转卡重置用
export const GetCurrRouting = (data) => {
    return axios({
        url: '/WsTrnCard/GetCurrRouting',
        method: 'post',
        data
    })
}
// 获取当前工艺,流转卡重置用
export const GetBasRoutingList = (data) => {
    return axios({
        url: '/Bas_CraftsRouting/GetRoutingList',
        method: 'post',
        data
    })
}
// 获取当前工艺,流转卡重置用
export const RoutChangeCheck = (data) => {
    return axios({
        url: '/WsTrnCard/RoutChangeCheck',
        method: 'post',
        data
    })
}
// 工艺流程重置
export const RoutChange = (data) => {
    return axios({
        url: '/WsTrnCard/RoutChange',
        method: 'post',
        data
    })
}
// 获取员工产量明细
export const GetWorkerClPage = (data) => {
    return axios({
        url: '/WsTrnCardWorkList/GetWorkerClPage',
        method: 'post',
        data
    })
}
// 获取员工产量明细
export const ChangeWork = (data) => {
    return axios({
        url: '/WsTrnCardWorkList/ChangeWork',
        method: 'post',
        data
    })
}
// 获取员工产量明细
export const CheckImprotWageList = (data) => {
    return axios({
        url: '/Ws_WorkerWage/CheckImprotWageList',
        method: 'post',
        data
    })
}
 


