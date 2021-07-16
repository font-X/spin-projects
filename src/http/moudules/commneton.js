import axios from '../axios'

/* 
 * 通用评论
 */

//提交评论
export const SaveCommentOn = (data) => {
    return axios({
        url: 'CommentOn/SaveCommentOn',
        method: 'post',
        data
    })
}

//查询评论
export const QueryCommentByCode = (data) => {
    return axios({
        url: 'CommentOn/QueryCommentByCode',
        method: 'post',
        data
    })
}

//提交收到按钮
export const SaveReceived = (data) => {
    return axios({
        url: 'CommentOn/SaveReceived',
        method: 'post',
        data
    })
}
//根据id 查询评论信息
export const QueryCommentById = (data) => {
    return axios({
        url: 'CommentOn/QueryCommentById',
        method: 'post',
        data
    })
}
//上传附件
export const Upload = (data) => {
    return axios({
        url: 'Public/GetPostFiles',
        method: 'post',
        data
    })
}
