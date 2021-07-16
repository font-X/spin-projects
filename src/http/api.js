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
import * as business from './moudules/business'
import * as sales from './moudules/sales'
import * as pagedesign from './moudules/pagedesign'
import * as publicApi from './moudules/publicApi'
import * as catelogue from './moudules/catelogue'
import * as exchangegoods from './moudules/exchangegoods'
import * as order from './moudules/order'
import * as reminder from './moudules/reminder'
import * as shipment from './moudules/shipment'
import * as deliveryRequest from './moudules/deliveryRequest'
import * as amazonImport from './moudules/amazonImport'
import * as curtainorder from './moudules/curtainorder'
import * as reportApproval from './moudules/reportApproval'
import * as showReport from './moudules/showReport'
import * as common from './moudules/common'
import * as productManage from './moudules/productManage'
import * as PackingRequest from './moudules/PackingRequest'
import * as zeroOrder from './moudules/zeroOrder'
import * as CardManage from './moudules/cardManage'
import * as CustomsDeclaration from './moudules/CustomsDeclaration'
import * as InformationMain from './moudules/InformationMain'
import * as logistics from './moudules/logistics'
import * as print from './moudules/print'
import * as delivery from './moudules/delivery'
import * as FreightManagement from './moudules/FreightManagement'
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
    sales,
    order,
    business,
    publicApi,
    pagedesign,
    catelogue,
    shipment,
    reminder,
    exchangegoods,
    deliveryRequest,
    amazonImport,
    curtainorder,
    reportApproval,
    showReport,
    common,
    productManage,
    PackingRequest,
    zeroOrder,
    CardManage,
    CustomsDeclaration,
    InformationMain,
    logistics,
    delivery,
    print,
    FreightManagement,
    http(url,method,data){
      let obj = {
        url: url,
        method: method,
        data
      }
      if(method && method.toLowerCase === "get"){
        obj.params = data;
      }
      return axios(obj)
    }
}
