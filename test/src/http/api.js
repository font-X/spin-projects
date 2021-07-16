/* 
 * 接口统一集成模块
 */
import * as login from './moudules/login'
import * as user from './moudules/user'
import * as dept from './moudules/dept'
import * as role from './moudules/role'
import * as menu from './moudules/menu'
import * as dict from './moudules/dictionary'
import * as log from './moudules/log'
import axios from './axios'

// 默认全部导出
export default {
    login,
    user,
    dept,
    role,
    menu,
    dict,
    log,
    http(url,method,data){
        return axios({
            url: url,
            method: method,
            data
        })        
    }
}
