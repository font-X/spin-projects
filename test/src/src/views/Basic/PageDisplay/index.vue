<script>
import Axios from 'axios';
import JyInputList from '../../../components/JyInputList'
import JyButtonList from '../../../components/JyButtonList'
import JyDynamicInputMap from '../../../components/JyDynamicInputMap'
import JyGrid from '../../../components/JyGrid'
import JyDialog from '../../../components/JyDialog'
import { isNU, replaceNU } from '../../../common/js/utils/jy-base-util'
import Qs from 'qs'
export default {
    name:"PageDisplay",
    props: {
        pageconfig: Object,
        mode: String,
        fmId: String
    },
    components:{
        JyInputList,
        JyButtonList,
        JyGrid,
        JyDialog,
        JyDynamicInputMap
    },
    data: function(){
        let obj = {
            fieldList: {},
            isShowDialog: false,
            dialogParams: {},
            selfPageConfig: null
        };
        
        return obj;
    },
    async  created(){
        let v =await this.zzz1()
        this.initMenthod(); // 看看有没有渲染时执行的
       
        //this["mygrid"]["binddata"] = {tableData:[{name:"hhh", age: 19}]}
    },
    computed: {
        realPageConfig(){
            return  this.fmId ? this.selfPageConfig : this.pageconfig;
        }
    },
    watch:{
      mode(v){
          this.initData();
      },
      pageconfig:{
          handler:function(){
            this.initData();
          },
          deep: true
      }

    },
    methods: {

        async zzz(z){
          await  alert(z)
        },
        async zzz1(obj){
          if(this.fmId){
            await this.$api.http(`/admin/ceshi/test.aspx?methodName=getPageConfig&fmId=${this.fmId}`,'get').then(data=>{
                    if(data){
                        this.selfPageConfig = JSON.parse(data[0].PageData);
                        this.initData();
                    }
                })
            }else{
                this.initData();
            }
            
           // console.log(obj.realPageConfig.layout )
            
        },
        initData(){
            let fieldList = {...this.$attrs, ...this.$props, ...this.fieldList},
                realPageConfig = this.realPageConfig;
            this.setPageField(realPageConfig.layout, fieldList);
            this["pageMetohds"] = realPageConfig.methods;
            this.fieldList = {...fieldList}
        },
        setPageField(layout, fieldList ){
            if(layout.hasOwnProperty("field")){
                fieldList[layout.field] = layout;
            }
            if(layout.value){
                layout.value = this.parseValue(layout.value, this.$attrs);
            }
            layout.children && layout.children.forEach(item => {
                this.setPageField(item, fieldList);
            })
            if( layout.type === "inputlist" ){
                let cd = layout.data;
                cd && cd.forEach(item => {
                    this.setPageField(item, fieldList);
                })
            }
            if(layout.type === "inputmap" && layout.searchtype === "" && layout.children && layout.children[0]){
                layout.searchtype = layout.children[0].field;
                layout.searchvalue = layout.children[0].value;
            }
        },
        initMenthod(){
            let methods = this.pageMetohds;
            methods && Object.values(methods).forEach(item=>{
                if(item.runbefore){
                    this.methodCompile(item);
                }
            })
        },
        initPage(){
          let data = this.realPageConfig,
            layout = data && data.layout;
          if(layout){
            return this.compile(layout);
          }
        },
        compile(layout){
          
          let { type,bigType,children } = layout,
              array = [],
              that = this,
              event = {},
              mode = this.mode || "";
          if(layout.event){
              Object.keys(layout.event).forEach((item)=>{
                  event[item] = ()=>{
                    that.methodCompile(that.realPageConfig.methods[layout.event[item]])
                  }
              })
          }
          if( bigType === "formcomponent"){
                array.push(<jy-dynamic-input-map class={mode + " " + (layout.className && layout.className.join(" "))} data-field={layout.field} data={layout}
                ></jy-dynamic-input-map>)
          }else{
            switch(type){
                case "row":
                array.push(<el-row data-content-before="row" data-field={layout.field}  class={mode + " " + (layout.className && layout.className.join(" "))}>{ children && children.map((item, index)=>{
                    !item.hasOwnProperty("span") && (item.span = layout.cols[index])
                    return this.compile(item);
                })}</el-row>)
                break;
                case "col":
                array.push(<el-col data-field={layout.field} class={mode + " " + (layout.className && layout.className.join(" ")) } data-content-before="col"  span={layout.span}>{ layout.children && layout.children.map((item)=>{
                    return this.compile(item);
                })}</el-col>)
                break;
                case "jydiv":
                array.push(<div data-field={layout.field} data-content-before="jydiv" class={mode + " " + (layout.className && layout.className.join(" "))}>{ layout.children && layout.children.map((item)=>{
                    return this.compile(item);
                })}</div>)
                break;
                case "text":
                array.push(<div class="sup-mini-label"
                {...{on:event}}
                >{layout.text}</div>)
                break;
                case "inputlist":
                this.initInputList(layout);
                array.push(
                    <jy-input-list
                    data-content-before="输入列表"
                    data-field={layout.field}
                    class={mode + " " + (layout.className && layout.className.join(" "))}
                    onModifyData={(obj) => { this.modifyData(obj) }} configprop={layout}></jy-input-list>
                )
                break;
                case "buttonlist":
                array.push(
                    <jy-button-list
                    data-content-before="按钮列表"
                    data-field={layout.field}
                    class={mode + " " + (layout.className && layout.className.join(" "))}
                    onMethodCompile={(v)=>{ 
                        v.loading = true;
                        this.methodCompile(this.realPageConfig.methods[v.methodName], v.methodParam, v)
                        }
                        } configprop={layout}></jy-button-list>
                )
                break;
                case "jygrid":
                array.push(
                    <jy-grid 
                    data-content-before="展示表格"
                    data-field={layout.field}
                    class={mode + " " + (layout.className && layout.className.join(" "))}
                    onModifyData={(obj) => { this.modifyData(obj) }}
                    configprop={layout}></jy-grid>
                )
                break;
                default:
                break;
            }
          }

            return array;
        },
        initInputList(layout){
            let data = layout.configprop && layout.configprop.data;
            if(data){
                data.forEach(item => {
                    if(item.field){
                        this[ item.field ] = item.value;
                    }
                })
            }
        },
        buildRow(layout){
            let children = layout.children,
                cols = layout.cols;
            let array = children.map((item,index)=>{
                let ele = null;
                if(index < cols.length){
                    ele = <el-col span={cols[index]} key={"elcol" + index}>{this.compile(item)}</el-col>;
                }else{
                    ele = this.compile(item)
                }
                return ele;
            })
            return <el-row>{array}</el-row>;
        },
        modifyData(obj){
            let fieldList = this.fieldList,
                propertyName = obj.propertyName || "value",
                field = obj.field;
            fieldList[field][propertyName] = obj.value; 
            console.log(obj, fieldList, 888888888)
        },
        methodCompile(method, methodParam = {}, bItem){
            if(!method){
                console.error("方法不能为空");
                return;
            }
            let requestParam = {},
                params = method.params && Object.keys(method.params),
                { type, name } = method,
                fieldList = this.fieldList;
            if(!params || params.length === 0){
                fieldList && Object.keys(fieldList).forEach(item => {
                    this.getFactValue(fieldList[item], item, requestParam);
                })
            }else{
                params.forEach(item=>{
                    requestParam[item] =  this.parseValue(method.params[item], this.fieldList);
                })
            }
            console.log(this.fieldList, 2222222222, requestParam)
            switch(method.type){
                case "showDialog":
                    if(method.params){
                        let activeNav = method.activeNav || {};
                        activeNav.params = requestParam;
                        method.activeNav = activeNav;
                    }
                    this.showDialog(method);
                    bItem && (bItem.loading = false)
                break;
                case "ajax":
                    if(name === "default_save"){
                        this.jy_default_save(method).finally(res=>{
                            bItem && (bItem.loading = false)
                        });
                    }else if(name === "default_query"){
                        this.jy_default_query(method).finally(res=>{
                            bItem && (bItem.loading = false)
                        });
                    }
                    break;
                default:
                    this[name] && this[name](method);
            }
        },
        getFactValue(vnode, item, uData){
            if(vnode){
            let { value, type } = vnode;
                if(type === "inputmap"){
                    uData["searchtype"] = replaceNU(vnode.searchtype);
                    vnode.children && vnode.children.forEach(item => {
                        if(item.field === vnode.searchtype){
                            uData["searchvalue"] = replaceNU(item.value);
                        }
                    })
                }else{
                    uData[item] = replaceNU(value);
                }
            }
        },
        setResultValue(name, value){
            let array = name.split("."),
                fieldList = this.fieldList;
            if(array.length === 1){
                fieldList[name].value = value;
            }else{
                let field = array.shift(),
                    lastfield = array.pop(),
                    oldobj = {...fieldList[field]},
                    obj = oldobj;
                !obj && (obj = {})
                array.forEach(item =>{
                    !obj[item] && (obj[item] = {});
                    obj = obj[item];
                })
                obj[lastfield] = value;
                fieldList[field] = oldobj;
            }
        },
        showDialog(methodParam = {}){
            this.dialogParams = {
                isShowDialog: true,
                activeNav:methodParam.activeNav
            }
        },
        jy_default_save( method ){
            let {url, success, fail, params} = method;
            let data = this.getValueByParams(params);
            return Axios({
                headers:{'Content-Type':'application/x-www-form-urlencoded'},
                method: "post",
                url: url,
                data: Qs.stringify(data)
            }).then((res)=>{
                if(res.status == '200'){
                    if(success){

                    }else{
                      alert("成功");
                    }
                }else{
                    if(fail){
                        
                    }else{
                        alert("保存失败");
                    }
                }
            })
        },
        jy_default_query( method ){
            let {url, success, fail, params, targetGrid} = method;
            let data = this.getValueByParams(params);
            return this.$api.http(url, 'post', Qs.stringify(data)).then((data)=>{
                if(data){
                    if(success){

                    }else{
                       this.fieldList[targetGrid].tableData = data.Table
                    }
                }else{
                    if(fail){
                        
                    }else{
                        alert("保存失败");
                    }
                }
            })
        },
        getValueByParams(params, data){
            let uData = {};
           
            data = data || this.fieldList;

            params = params && Object.keys(params);
            if(!params || params.length === 0){
                data && Object.keys(data).forEach(item => {
                    this.getFactValue(data[item],item,uData);
                })
            }else{
                params.forEach(item=>{
                    this.getFactValue(data[ method.params[item] ],item,uData);
                })
            }
            return uData;
        },
        parseValue(str, obj){
            if(str){
                let that = this;
                return (str + "").replace(/\{\{(.*?)\}\}/gi,function(a, b){
                    return that.parseLineValue(b, obj);
                })
            }else{
                return str;
            }
        },
        /**
         * 解析链式属性 比如 a.b.c
         */
        parseLineValue(name, obj){
            let array = name.split("."),
                returnValue = obj || this.fieldList;
            array.forEach(item=>{
                if(returnValue){
                    returnValue = returnValue[item];
                }
                else{
                    returnValue = replaceNU(returnValue);
                }
            })
            return replaceNU(returnValue);
        }
    },
    render: function(h){
        return (
            <div ref="jypage">
                {this.initPage()}
                <jy-dialog params={ this.dialogParams }></jy-dialog>
            </div>
        )
    }
}
</script>
<style lang="scss" scoped>
.el-col{
    min-height: 1px;
}
.sup-mini-label{
        height:24px;
        line-height:24px;
        text-align: right;
        padding-right: 2px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
.design{
    padding: 25px  5px;
    border: 1px solid #ccc;
    position: relative;
}
.design:before{
    background-color: #F5F5F5;
    border: 1px solid #ddd;
    border-radius: 4px 0;
    color: #9DA0A4;
    content: attr(data-content-before);
    line-height: 1.3em;
    font-size: 12px;
    font-weight: bold;
    padding:3px 7px;
    left: -1px;
    top: -1px;
    position: absolute;

}
.el-input.design:before{
    background-color: #F5F5F5;
    border: 1px solid #ddd;
    border-radius: 4px 0;
    color: #9DA0A4;
    content: 'input';
    font-size: 12px;
    font-weight: bold;
    line-height: 1.3em;
    padding:3px 7px;
    left: -1px;
    top: -1px;
    position: absolute;

}
.design.isActive{
    border: 1px solid #22A5F1;
}
</style>