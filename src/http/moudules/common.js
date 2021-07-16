import axios from '../axios'

/* 
 * 公共接口模块
 */

// 执行sql语句
export const execSqlByMap = (pars) => {
    return axios({
        url: '/Public/GetProcedureDataSet',
        method: 'post',
        data:{
          code:"1636005405" ,
          pars
        }
    })
}
// 执行存储过程
export const getProcedureDataSet = (data) => {
    return axios({
        url: '/Public/GetProcedureDataSet',
        method: 'post',
        data
    })
}

