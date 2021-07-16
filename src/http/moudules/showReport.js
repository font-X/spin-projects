import axios from '../axios'
/* 
 * 旧系统showReport
 */

//参数
export const getReportInfo = (reportNo) => {
  return axios({
    url: '/Public/GetProcedureDataSet',
    method: 'post',
    data:{
      code:"rp_GetReportInfo" ,
      pars:{
        ReportNo: reportNo,
        strMessage:""
      }}
  })
}


//列表
export const showReport = (data) => {
  return axios({
    url: '/Public/GetProcedureDataSet',
    method: 'post',
    data:data
  })
}

//获取下拉接口
export const getReportSqlData = (data) => {
  return axios({
    url: '/Public/GetReportSqlData',
    method: 'post',
    data:data
  })
}
