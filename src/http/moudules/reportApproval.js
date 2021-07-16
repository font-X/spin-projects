import axios from '../axios'
//通用报批服务


//报批
export const ObjectUpLoad = (data) => {
  return axios({
    url: '/ReportApproval/ObjectUpLoad',
    method: 'post',
    data,
  })
}

//获取报批列表
export const GetReportList = (data) => {
  return axios({
    url: '/ReportApproval/GetReportList',
    method: 'post',
    data,
  })
}

//撤回报批
export const ObjectRepeal = (data) => {
  return axios({
    url: '/ReportApproval/ObjectRepeal',
    method: 'post',
    data,
  })
}
//取消审批
export const ApplyCancel = (data) => {
  return axios({
    url: '/ReportApproval/ApplyCancel',
    method: 'post',
    data,
  })
}
